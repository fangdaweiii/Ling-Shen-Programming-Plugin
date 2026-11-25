const fs = require('fs');
const vm = require('vm');

const problemsCode = fs.readFileSync('data/problems.js', 'utf8');
const bgCode = fs.readFileSync('background.js', 'utf8')
  .replace("importScripts('data/problems.js');", "// importScripts");

let badgeText = '';
let badgeColor = '';
let actionTitle = '';
let createdTabs = [];
let storageData = {};

const mockChrome = {
  sidePanel: { setPanelBehavior: () => Promise.resolve() },
  action: {
    setBadgeText: (opt) => { badgeText = opt.text; },
    setBadgeBackgroundColor: (opt) => { badgeColor = opt.color; },
    setTitle: (opt) => { actionTitle = opt.title; },
    onClicked: { addListener: (fn) => { mockChrome.action._onClicked = fn; } }
  },
  storage: {
    local: {
      get: (keys, cb) => {
        const res = {};
        keys.forEach(k => { res[k] = storageData[k]; });
        cb(res);
      },
      set: (obj, cb) => {
        Object.assign(storageData, obj);
        if (cb) cb();
      }
    },
    onChanged: { addListener: () => {} }
  },
  windows: {
    update: () => {}
  },
  tabs: {
    query: (opt, cb) => { cb([]); },
    update: (tabId, opt, cb) => {
      createdTabs.push(opt);
      if (cb) cb();
    },
    create: (opt, cb) => {
      createdTabs.push(opt);
      if (cb) cb();
    }
  },
  runtime: {
    onStartup: { addListener: (fn) => { mockChrome._onStartup = fn; } },
    onInstalled: { addListener: (fn) => { mockChrome._onInstalled = fn; } },
    onMessage: { addListener: () => {} }
  },
  alarms: {
    create: () => {},
    onAlarm: { addListener: () => {} }
  }
};

const sandbox = {
  chrome: mockChrome,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  importScripts: () => {}
};

// 1. 运行并测试初始化未打卡状态
vm.runInNewContext(problemsCode + '\n' + bgCode, sandbox);

console.log('--- 测试 1: 今日未打卡状态 ---');
console.log('Badge Text:', badgeText);
console.log('Badge Color:', badgeColor);
console.log('Action Title:', actionTitle);
if (badgeText === '1' && badgeColor === '#E9785F') {
  console.log('✓ SUCCESS: 红点角标正确显示 1！');
} else {
  console.error('✗ FAILED: 角标状态不符合预期');
}

// 2. 模拟启动自动开题
console.log('\n--- 测试 2: 模拟浏览器开机启动触发自动开题 ---');
mockChrome._onStartup();
setTimeout(() => {
  console.log('Created Tabs Count:', createdTabs.length);
  if (createdTabs.length > 0) {
    console.log('Target URL:', createdTabs[0].url);
    console.log('✓ SUCCESS: 浏览器启动成功自动新建今日题目标签页！');
  } else {
    console.error('✗ FAILED: 未成功自动开题');
  }

  // 3. 模拟今天已打卡状态
  console.log('\n--- 测试 3: 模拟今日通过 (AC) 打卡 ---');
  storageData['last_ac_date'] = new Date().toISOString().slice(0, 10);
  sandbox.updateBadge();

  setTimeout(() => {
    console.log('Badge Text after AC:', badgeText);
    console.log('Badge Color after AC:', badgeColor);
    console.log('Action Title after AC:', actionTitle);
    if (badgeText === '✓' && badgeColor === '#0E8F6F') {
      console.log('✓ SUCCESS: 打卡后角标成功变为绿色对勾 ✓！');
    } else {
      console.error('✗ FAILED: 打卡后角标状态未变');
    }

    // 4. 模拟用户点击扩展栏图标
    console.log('\n--- 测试 4: 模拟用户点击扩展图标（点击直接开始） ---');
    createdTabs = [];
    storageData['last_ac_date'] = null; // 恢复未完成状态
    mockChrome.action._onClicked({ id: 1, url: 'chrome://newtab/' });

    setTimeout(() => {
      console.log('Clicked action opened tab URL:', createdTabs[0]?.url);
      if (createdTabs[0]?.url?.includes('leetcode.cn/problems/')) {
        console.log('✓ SUCCESS: 点击扩展图标直接打开力扣今日真题（而非训练台侧边栏）！');
      } else {
        console.error('✗ FAILED: 点击未直达力扣题目');
      }
    }, 50);
  }, 50);
}, 50);
