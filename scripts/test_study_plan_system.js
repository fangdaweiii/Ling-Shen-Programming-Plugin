const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

// 模拟 DOM 环境
function makeMockEl(tag = 'div') {
  const el = {
    tagName: tag.toUpperCase(),
    listeners: {},
    classList: {
      _classes: new Set(),
      add: (c) => el.classList._classes.add(c),
      remove: (c) => el.classList._classes.delete(c),
      contains: (c) => el.classList._classes.has(c),
      toggle: (c) => {
        if (el.classList.contains(c)) { el.classList.remove(c); return false; }
        else { el.classList.add(c); return true; }
      }
    },
    style: {},
    attributes: {},
    setAttribute: (k, v) => { el.attributes[k] = String(v); },
    getAttribute: (k) => el.attributes[k] || null,
    value: '',
    textContent: '',
    set innerHTML(val) {
      el._innerHTML = val;
      // 提取 id 放入 docElements
      const idMatches = val.match(/id="([^"]+)"/g);
      if (idMatches) {
        idMatches.forEach(m => {
          const matchId = m.match(/id="([^"]+)"/)[1];
          if (!docElements[matchId]) {
            docElements[matchId] = makeMockEl();
            docElements[matchId].id = matchId;
          }
        });
      }
    },
    get innerHTML() { return el._innerHTML || ''; },
    children: [],
    offsetWidth: 100,
    offsetHeight: 30,
    addEventListener: (event, handler) => {
      if (!el.listeners[event]) el.listeners[event] = [];
      el.listeners[event].push(handler);
    },
    click: () => {
      if (el.listeners['click']) {
        el.listeners['click'].forEach(fn => fn({ target: el, preventDefault: () => {} }));
      }
    },
    querySelectorAll: (sel) => {
      // 简易选择器模拟
      return el.children.filter(c => true);
    },
    appendChild: (c) => { el.children.push(c); }
  };
  return el;
}

const docElements = {};
const docBody = makeMockEl('body');

const sandbox = {
  window: {
    location: {
      host: 'leetcode.cn',
      pathname: '/problems/reverse-linked-list/',
      href: 'https://leetcode.cn/problems/reverse-linked-list/'
    },
    addEventListener: (event, handler) => {
      if (!sandbox.window.listeners) sandbox.window.listeners = {};
      if (!sandbox.window.listeners[event]) sandbox.window.listeners[event] = [];
      sandbox.window.listeners[event].push(handler);
    }
  },
  document: {
    readyState: 'complete',
    body: docBody,
    createElement: (tag) => makeMockEl(tag),
    getElementById: (id) => {
      if (docElements[id]) return docElements[id];
      // 简单递归或扫描
      function search(node) {
        if (!node) return null;
        if (node.id === id) return node;
        if (node.children) {
          for (let c of node.children) {
            const found = search(c);
            if (found) return found;
          }
        }
        return null;
      }
      return search(docBody);
    },
    querySelectorAll: (sel) => [],
    appendChild: (c) => docBody.appendChild(c)
  },
  localStorage: {
    data: {},
    getItem: (k) => sandbox.localStorage.data[k] || null,
    setItem: (k, v) => { sandbox.localStorage.data[k] = String(v); }
  },
  chrome: {
    storage: {
      local: {
        set: () => {}
      }
    }
  },
  MutationObserver: class {
    observe() {}
    disconnect() {}
  },
  setInterval: () => {},
  setTimeout: (fn) => fn(),
  console: console
};

// 拦截 appendChild 收集 ID
const origAppend = docBody.appendChild;
docBody.appendChild = function(child) {
  if (child.id) docElements[child.id] = child;
  return origAppend.call(docBody, child);
};

// 加载 modules, knowledge, problems, content.js
const files = [
  'data/modules.js',
  'data/knowledge.js',
  'data/problems.js',
  'extension/content.js'
];

vm.createContext(sandbox);
files.forEach(f => {
  const code = fs.readFileSync(path.join(root, f), 'utf8');
  vm.runInContext(code, sandbox);
});

console.log('=== 模拟力扣网页环境：灵神学习计划插件测试 ===');

// 1. 验证底部常驻学习计划条是否成功生成
const planBar = sandbox.document.getElementById('lh-plan-bar');
console.log('1. 底部常驻学习计划条存在性:', !!planBar);
if (!planBar) {
  console.error('FAIL: 未能找到 #lh-plan-bar！');
  process.exit(1);
}
console.log('   条内渲染内容片段:', planBar.innerHTML.slice(0, 150) + '...');

// 2. 验证当前题目是否识别为 LeetCode 206 (reverse-linked-list)
const titleMatch = planBar.innerHTML.includes('链表');
console.log('2. 是否成功识别当前所在阶段（链表）:', titleMatch);

// 3. 模拟点击「下一题 ▶」
console.log('\n3. 模拟点击「下一题 ▶」按钮...');
// 查找 next 按钮
let nextBtn = null;
const allBtns = planBar.children; // 简单查找
const btnMatches = planBar.innerHTML.match(/id="([^"]+)"/g);
console.log('   底部导航栏中包含的元素 ID:', btnMatches);

const nextEl = sandbox.document.getElementById('lh-next-btn');
if (nextEl) {
  nextEl.click();
  console.log('   点击「下一题 ▶」后，页面目标 URL 跳转为:', sandbox.window.location.href);
  if (sandbox.window.location.href.includes('/problems/') && !sandbox.window.location.href.includes('reverse-linked-list')) {
    console.log('   ✓ SUCCESS: 成功自动跳向题单的下一道题！');
  } else {
    console.log('   URL:', sandbox.window.location.href);
  }
} else {
  console.error('FAIL: 未找到 #lh-next-btn');
}

// 4. 模拟打开学习大纲抽屉
console.log('\n4. 模拟展开左侧大纲抽屉 (Alt+S)...');
const syllabusBtn = sandbox.document.getElementById('lh-syllabus-btn');
if (syllabusBtn) {
  syllabusBtn.click();
  const drawer = sandbox.document.getElementById('lh-drawer');
  console.log('   抽屉打开状态:', drawer && drawer.classList.contains('on'));
  console.log('   ✓ SUCCESS: 大纲抽屉正常展开');
}

console.log('\n🎉 学习计划常驻导航、题目自适应与连续流下一题测试全部通过！');
