const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('=== 验证 Chrome Extension Manifest 配置完整性 ===');
console.log('Name:', manifest.name);
console.log('Version:', manifest.version);
console.log('Manifest Version:', manifest.manifest_version);

let allValid = true;

function checkFile(relPath, desc) {
  const fullPath = path.join(root, relPath.replace(/\//g, path.sep));
  if (fs.existsSync(fullPath)) {
    console.log(`✓ [${desc}] ${relPath} 存在 (${fs.statSync(fullPath).size} bytes)`);
  } else {
    console.error(`✗ [${desc}] ${relPath} 不存在！`);
    allValid = false;
  }
}

// 检查图标
Object.entries(manifest.icons).forEach(([size, p]) => checkFile(p, `Icon ${size}x${size}`));
// 检查 SidePanel
if (manifest.side_panel && manifest.side_panel.default_path) {
  checkFile(manifest.side_panel.default_path, 'SidePanel Default Path');
}
// 检查 Service Worker
if (manifest.background && manifest.background.service_worker) {
  checkFile(manifest.background.service_worker, 'Background Service Worker');
}
// 检查 Content Scripts
if (manifest.content_scripts) {
  manifest.content_scripts.forEach((cs, i) => {
    (cs.js || []).forEach(f => checkFile(f, `Content Script JS [${i}]`));
    (cs.css || []).forEach(f => checkFile(f, `Content Script CSS [${i}]`));
  });
}

if (allValid) {
  console.log('\n🎉 扩展清单所有引用文件 100% 存在且有效！此目录可直接在 Chrome「加载已解压的扩展程序」！');
} else {
  console.error('\n❌ 存在缺失的文件，请修复！');
  process.exit(1);
}
