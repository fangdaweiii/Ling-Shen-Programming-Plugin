const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== 验证 12 专题全景题库心法与题解体系 ===');

// 加载 modules, knowledge, problems
const modulesCode = fs.readFileSync(path.join(__dirname, '../data/modules.js'), 'utf-8');
const knowledgeCode = fs.readFileSync(path.join(__dirname, '../data/knowledge.js'), 'utf-8');
const problemsCode = fs.readFileSync(path.join(__dirname, '../data/problems.js'), 'utf-8');
const contentJsCode = fs.readFileSync(path.join(__dirname, '../extension/content.js'), 'utf-8');

// 创建全局沙箱
const sandbox = {
  window: {},
  document: {
    createElement: (tag) => ({
      tagName: tag,
      innerHTML: '',
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      querySelectorAll: () => [],
      addEventListener: () => {}
    }),
    body: { appendChild: () => {} },
    head: { appendChild: () => {} },
    getElementById: () => null,
    querySelectorAll: () => []
  },
  location: { pathname: '/problems/reverse-linked-list/', href: 'https://leetcode.cn/problems/reverse-linked-list/' },
  chrome: { storage: { local: { get: (k, cb) => cb({}), set: () => {} } } },
  MutationObserver: function() { return { observe: () => {}, disconnect: () => {} }; },
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  escapeHtml: (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  modalEl: null,
  console: console
};

vm.createContext(sandbox);
vm.runInContext(modulesCode, sandbox);
vm.runInContext(knowledgeCode, sandbox);
vm.runInContext(problemsCode, sandbox);

const probs = sandbox.PROBLEMS;
console.log(`题库总题数: ${probs.length}`);

// 1. 验证 12 专题每道题的双解法体系数据
let missingLingshen = 0, missingOfficial = 0, missingRef = 0;
probs.forEach((p, idx) => {
  if (!p.lingshen || !p.lingshen.code || p.lingshen.code.length === 0) missingLingshen++;
  if (!p.ref || p.ref.length === 0) missingRef++;
});

console.log(`- 缺少 lingshen 灵神解法题目数: ${missingLingshen}`);
console.log(`- 缺少 ref 官方参考解法题目数: ${missingRef}`);

if (missingLingshen === 0 && missingRef === 0) {
  console.log('✓ 12 专题全景数据完整度 100%！每道题目均拥有完整的【灵神解法】与【官方参考解法】！');
} else {
  throw new Error('存在缺失解法的题目！');
}

// 2. 模拟 content.js 中的心法与双解法渲染逻辑
let modalContentHtml = '';
sandbox.showModal = (title, html) => {
  modalContentHtml = html;
};

// 抽取出 showMindsetModal
const fnMatch = contentJsCode.match(/function showMindsetModal\([\s\S]*?^  \}/m);
if (!fnMatch) {
  throw new Error('未在 content.js 中找到 showMindsetModal 函数！');
}

vm.runInContext(fnMatch[0], sandbox);

// 对全部题目逐一运行 showMindsetModal 测试
probs.forEach((p) => {
  sandbox.showMindsetModal(p);
  if (!modalContentHtml.includes('灵神精选解法') || !modalContentHtml.includes('官方标准参考解法')) {
    throw new Error(`题目 ${p.id} ${p.title} 渲染双解法模态框异常！`);
  }
});
console.log(`✓ 全部 ${probs.length} 道题目逐一触发 showMindsetModal 测试成功，均正确生成【灵神解法】与【官方解法】双 Tab 体系！`);

console.log('🎉 验证全部通过！');
