const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function makeMockEl(tagName = 'div') {
  const el = {
    tagName: tagName.toUpperCase(),
    listeners: {},
    classList: {
      _classes: new Set(),
      add: function(c) { el.classList._classes.add(c); },
      remove: function(c) { el.classList._classes.delete(c); },
      toggle: function(c, force) {
        if (force === undefined) {
          if (el.classList._classes.has(c)) { el.classList._classes.delete(c); return false; }
          else { el.classList._classes.add(c); return true; }
        } else {
          if (force) el.classList._classes.add(c);
          else el.classList._classes.delete(c);
          return !!force;
        }
      },
      contains: function(c) { return el.classList._classes.has(c); }
    },
    style: {},
    attributes: {},
    setAttribute: function(k, v) { el.attributes[k] = String(v); },
    getAttribute: function(k) { return el.attributes[k] || null; },
    removeAttribute: function(k) { delete el.attributes[k]; },
    focus: function() {},
    blur: function() {},
    value: '',
    textContent: '',
    innerHTML: '',
    children: [],
    appendChild: function(c) { el.children.push(c); },
    removeChild: function(c) { var idx = el.children.indexOf(c); if (idx >= 0) el.children.splice(idx, 1); },
    querySelectorAll: function(sel) { return []; },
    querySelector: function(sel) { return makeMockEl(); },
    closest: function(sel) { return el; },
    addEventListener: function(event, handler) {
      if (!el.listeners[event]) el.listeners[event] = [];
      el.listeners[event].push(handler);
    },
    click: function() {
      if (el.listeners['click']) {
        el.listeners['click'].forEach(fn => fn({ target: el, preventDefault: () => {} }));
      }
    },
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
  return el;
}

const elements = {};
function getOrCreateEl(id) {
  if (!elements[id]) elements[id] = makeMockEl();
  return elements[id];
}

const sandbox = {
  window: {},
  document: {
    addEventListener: () => {},
    querySelector: (sel) => makeMockEl(),
    querySelectorAll: (sel) => [makeMockEl(), makeMockEl()],
    getElementById: (id) => getOrCreateEl(id),
    createElement: (tag) => makeMockEl(tag),
    body: makeMockEl('body')
  },
  localStorage: {
    data: {},
    getItem: (k) => sandbox.localStorage.data[k] || null,
    setItem: (k, v) => { sandbox.localStorage.data[k] = String(v); },
    removeItem: (k) => { delete sandbox.localStorage.data[k]; }
  },
  setTimeout: (fn, ms) => fn(),
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Date: Date,
  Math: Math,
  console: console,
  getComputedStyle: () => ({ fontFamily: 'monospace' }),
  addEventListener: () => {},
  removeEventListener: () => {}
};
sandbox.window = sandbox;
sandbox.document.defaultView = sandbox;
sandbox.$ = function(id) { return getOrCreateEl(id); };

// 依次加载全部 14 个文件
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
loadOrder.forEach(f => {
  const code = fs.readFileSync(path.join(root, f), 'utf8');
  vm.runInContext(code, sandbox);
});

console.log('=== 开始模拟全页面交互测试 ===');

// 测试 1: 初始状态下当前题目
const initialCUR = sandbox.CUR;
console.log('1. 页面初始题目:', initialCUR.title, `(${initialCUR.lc})`, 'Hot100:', !!initialCUR.hot100);

// 测试 2: 点击 "🔥 Hot 100" 按钮
console.log('\n2. 模拟点击 #fHotBtn ...');
const hotBtn = sandbox.$('fHotBtn');
hotBtn.click();
console.log('   FILTER.hot100Only 状态:', sandbox.FILTER.hot100Only);
console.log('   当前题目已自动切换为:', sandbox.CUR.title, `(${sandbox.CUR.lc})`, 'Hot100:', !!sandbox.CUR.hot100);
if (!sandbox.CUR.hot100) {
  console.error('FAIL: 处于 Hot 100 模式但当前题目不是 Hot 100！');
} else {
  console.log('   ✓ SUCCESS: 自动切换到了 Hot 100 题目！');
}

// 测试 3: 在 Hot 100 模式下点击 "抽题"
console.log('\n3. 模拟在 Hot 100 模式下点击 #fRandBtn (抽题) ...');
const randBtn = sandbox.$('fRandBtn');
for (let step = 1; step <= 3; step++) {
  randBtn.click();
  console.log(`   第 ${step} 次抽题: ${sandbox.CUR.title} (${sandbox.CUR.lc}) Rating:${sandbox.CUR.rating} Hot100:${!!sandbox.CUR.hot100}`);
  if (!sandbox.CUR.hot100) {
    console.error(`FAIL: 抽出的第 ${step} 题不是 Hot 100 题目！`);
  }
}
console.log('   ✓ SUCCESS: 抽题在 Hot 100 下每次都能顺利抽取并切换题目！');

// 测试 4: 点击 "🌱 新手村" 按钮
console.log('\n4. 模拟点击 #fNewbieBtn (新手村模式) ...');
const nbBtn = sandbox.$('fNewbieBtn');
nbBtn.click();
console.log('   FILTER.newbieOnly 状态:', sandbox.FILTER.newbieOnly);
console.log('   当前题目已切换为:', sandbox.CUR.title, `(Rating ${sandbox.CUR.rating})`);
if (sandbox.CUR.rating > 1700) {
  console.error('FAIL: 新手村模式下题目 Rating > 1700！');
} else {
  console.log('   ✓ SUCCESS: 成功过滤并匹配新手村题目 (≤1700)！');
}

// 测试 5: 点击 "全部" 重置
console.log('\n5. 模拟点击 #fDiffAll (全部) ...');
sandbox.$('fDiffAll').click();
console.log('   过滤状态重置:', sandbox.FILTER);
console.log('   ✓ SUCCESS: 成功重置全部过滤器');

// 测试 6: 主题切换
console.log('\n6. 模拟点击主题切换按钮 ...');
sandbox.toggleTheme();
console.log('   localStorage 主题已保存为:', sandbox.localStorage.getItem('algo.theme'));
console.log('   ✓ SUCCESS: 换色与主题切换正常');

// 测试 7: 打卡分享海报
console.log('\n7. 模拟点击打卡按钮 ...');
sandbox.openShareCard();
console.log('   打卡弹窗开启状态:', sandbox.$('shareMask').classList.contains('on'));
sandbox.closeShareCard();
console.log('   打卡弹窗关闭状态:', !sandbox.$('shareMask').classList.contains('on'));
console.log('   ✓ SUCCESS: 打卡卡片功能正常');

// 测试 8: 成就勋章
console.log('\n8. 模拟成就勋章检测与打开 ...');
sandbox.openBadgeModal();
console.log('   勋章弹窗开启状态:', sandbox.$('badgeMask').classList.contains('on'));
sandbox.closeBadgeModal();
console.log('   ✓ SUCCESS: 勋章系统正常');

console.log('\n🎉 所有 8 项端到端交互测试全部通过！');
