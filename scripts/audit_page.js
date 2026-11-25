const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. 提取所有 HTML 中的 id
const idRegex = /id=["']([^"']+)["']/g;
const ids = new Set();
let m;
while ((m = idRegex.exec(html)) !== null) {
  ids.add(m[1]);
}

// 2. 扫描所有 js 文件中引用的 $('id') 或 getElementById('id')
const jsDir = path.join(root, 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

const missingIds = [];
const usedListeners = [];

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
  
  // 查找 $('xxx')
  const dollarRegex = /\$\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = dollarRegex.exec(content)) !== null) {
    const id = m[1];
    if (!ids.has(id)) {
      missingIds.push({ id, file });
    }
  }

  // 查找 addEventListener
  const listenerRegex = /\$\(\s*['"]([^'"]+)['"]\s*\)\s*(\&\&[^\.]*)?\.addEventListener\(\s*['"]([^'"]+)['"]\s*,\s*([^,\)]+)/g;
  while ((m = listenerRegex.exec(content)) !== null) {
    usedListeners.push({ id: m[1], event: m[3], handler: m[4].trim(), file });
  }
});

console.log('=== 1. HTML 中未定义但在 JS 中被引用的 ID ===');
if (missingIds.length === 0) console.log('None! All IDs exist in HTML.');
else missingIds.forEach(x => console.log(`- ID "${x.id}" referenced in ${x.file} NOT in HTML`));

console.log('\n=== 2. 已绑定的监听器列表 ===');
usedListeners.forEach(x => console.log(`- #${x.id} on ${x.event} -> ${x.handler} (${x.file})`));

// 3. 检查 HTML 中所有 <button> 是否有 id 或监听
console.log('\n=== 3. 检查 HTML 中的所有按钮 ===');
const btnRegex = /<button[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/button>/gs;
const buttonIds = [];
while ((m = btnRegex.exec(html)) !== null) {
  buttonIds.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
}
console.log(`Total buttons with ID in HTML: ${buttonIds.length}`);

// 4. 检查是否有未定义的函数被全局调用或绑定
console.log('\n=== 4. 模拟在 JSDOM / Node 环境下加载全部 JS 文件并检查全局作用域 ===');
const vm = require('vm');
const sandbox = {
  window: {
    addEventListener: () => {},
    removeEventListener: () => {}
  },
  document: {
    addEventListener: () => {},
    querySelector: () => makeMockEl(),
    querySelectorAll: () => [makeMockEl()],
    getElementById: (id) => makeMockEl(),
    createElement: () => makeMockEl(),
    body: {
      classList: { add: () => {}, remove: () => {}, toggle: () => false },
      appendChild: () => {},
      removeChild: () => {}
    }
  },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Date: Date,
  Math: Math,
  console: console,
  getComputedStyle: () => ({ fontFamily: 'monospace' }),
  addEventListener: () => {},
  removeEventListener: () => {}
};
sandbox.window = sandbox;
sandbox.document.defaultView = sandbox;
function makeMockEl() {
  return {
    addEventListener: () => {},
    classList: { add: () => {}, remove: () => {}, toggle: () => false },
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    querySelectorAll: () => [],
    focus: () => {},
    value: '',
    textContent: '',
    innerHTML: '',
    children: [],
    scrollTop: 0,
    scrollLeft: 0,
    width: 600,
    height: 800,
    getBoundingClientRect: () => ({ width: 80, height: 20, top: 0, left: 0 }),
    getContext: () => ({
      createLinearGradient: () => ({ addColorStop: () => {} }),
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {}
    })
  };
}

sandbox.$ = function(id) {
  return makeMockEl();
};
sandbox.ta = makeMockEl();
sandbox.hlEl = makeMockEl();
sandbox.gutEl = makeMockEl();
sandbox.acEl = makeMockEl();

const loadOrder = [
  'data/modules.js',
  'data/knowledge.js',
  'data/problems.js',
  'js/interpreter.js',
  'js/state.js',
  'js/editor.js',
  'js/judge.js',
  'js/demo.js',
  'js/practice.js',
  'js/achievements.js',
  'js/complexity.js',
  'js/share.js',
  'js/ai.js',
  'js/app.js'
];

vm.createContext(sandbox);
let loadError = null;
try {
  loadOrder.forEach(f => {
    const code = fs.readFileSync(path.join(root, f), 'utf8');
    vm.runInContext(code, sandbox);
  });
  console.log('All 14 scripts loaded successfully into VM without runtime errors!');
} catch (e) {
  console.error('Error loading scripts:', e);
  loadError = e;
}

// 5. 校验核心函数是否定义在沙箱内
const requiredFunctions = [
  'initTheme', 'toggleTheme', 'openShareCard', 'closeShareCard', 'downloadShareImage', 'copyShareImage',
  'formatCppCode', 'cycleFontSize', 'openBadgeModal', 'closeBadgeModal',
  'pickRandomProblem', 'filterProblemsList', 'applyFilterUI', 'updateFilterBtnStates',
  'openProblem', 'renderHead', 'renderProblem', 'setCode', 'runAllCases', 'openDemo',
  'setupTestbench', 'setupMobileDrawer', 'setDiffFilter'
];

console.log('\n=== 5. 核心全局函数存在性检测 ===');
requiredFunctions.forEach(fn => {
  const exists = typeof sandbox[fn] === 'function';
  console.log(`- ${fn}: ${exists ? 'OK' : 'MISSING!'}`);
});
