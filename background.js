/* background.js - 灵神算法助教 Chrome 扩展后台服务 */

try {
  importScripts('data/problems.js');
} catch (e) {
  console.warn('background importScripts failed:', e);
}

const STORAGE_KEY = 'ling_study_plan_ac_v1';
const AUTO_OPEN_KEY = 'ling_auto_open_enabled';
const LAST_OPEN_DATE_KEY = 'ling_last_auto_open_date';

// 1. 设置点击扩展栏图标行为：禁用默认侧边栏覆盖，绑定为直接跳转今日力扣真题
if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: false })
    .catch((error) => console.error('SidePanel config error:', error));
}

// 绑定扩展图标点击事件：点击直接打开力扣对应的今日攻坚题目
chrome.action.onClicked.addListener((tab) => {
  getDailyStatus(({ isDoneToday, nextProb }) => {
    if (!nextProb) {
      nextProb = (typeof PROBLEMS !== 'undefined' && PROBLEMS.length) ? PROBLEMS[0] : null;
    }
    if (!nextProb) return;

    const targetUrl = `https://leetcode.cn/problems/${nextProb.slug}/`;

    // 如果当前标签页是空白页/新标签页，直接在当前标签页打开
    if (tab && (tab.url === 'chrome://newtab/' || tab.url === 'edge://newtab/' || tab.url === 'about:blank')) {
      chrome.tabs.update(tab.id, { url: targetUrl });
      return;
    }

    // 检查当前窗口是否已经打开了力扣对应题目的标签页
    chrome.tabs.query({ url: `*://leetcode.cn/problems/${nextProb.slug}/*` }, (existingTabs) => {
      if (existingTabs && existingTabs.length > 0) {
        // 激活已有题目窗口
        chrome.tabs.update(existingTabs[0].id, { active: true });
        if (existingTabs[0].windowId && chrome.windows) {
          chrome.windows.update(existingTabs[0].windowId, { focused: true });
        }
      } else {
        // 新建并激活标签页直达今日题目
        chrome.tabs.create({ url: targetUrl, active: true });
      }
    });
  });
});

// 2. 检查当天是否已经 AC 打卡，并获取今日攻坚题目
function getDailyStatus(callback) {
  chrome.storage.local.get([STORAGE_KEY, 'last_ac_date'], (res) => {
    const acMap = res[STORAGE_KEY] || {};
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    let isDoneToday = false;
    if (res.last_ac_date === todayStr) {
      isDoneToday = true;
    } else {
      // 检查 acMap 中的时间戳是否有属于今天的
      for (const id in acMap) {
        const val = acMap[id];
        if (typeof val === 'number') {
          const d = new Date(val);
          if (d.getFullYear() === now.getFullYear() &&
              d.getMonth() === now.getMonth() &&
              d.getDate() === now.getDate()) {
            isDoneToday = true;
            break;
          }
        }
      }
    }

    // 寻找今日第一道待攻坚题目
    let nextProb = null;
    if (typeof PROBLEMS !== 'undefined' && Array.isArray(PROBLEMS)) {
      for (let i = 0; i < PROBLEMS.length; i++) {
        const p = PROBLEMS[i];
        if (!acMap[p.id]) {
          nextProb = p;
          break;
        }
      }
      if (!nextProb && PROBLEMS.length > 0) {
        nextProb = PROBLEMS[0];
      }
    }

    callback({ isDoneToday, nextProb, todayStr });
  });
}

// 3. 更新扩展图标红点角标与说明
function updateBadge() {
  getDailyStatus(({ isDoneToday, nextProb }) => {
    if (isDoneToday) {
      // 今日已打卡：显示绿色对勾 ✓
      chrome.action.setBadgeText({ text: '✓' });
      chrome.action.setBadgeBackgroundColor({ color: '#0E8F6F' });
      chrome.action.setTitle({ title: '灵神力扣算法助教 · 今日任务已达成！连续打卡中 🔥' });
    } else {
      // 今日未打卡：显示红色数字角标 1
      chrome.action.setBadgeText({ text: '1' });
      chrome.action.setBadgeBackgroundColor({ color: '#E9785F' });
      const probTitle = nextProb ? `${nextProb.lcNum || ''}. ${nextProb.title}` : '今日算法任务待完成';
      chrome.action.setTitle({ title: `灵神力扣算法助教 · 今日待攻坚：${probTitle}（点击直接开始）` });
    }
  });
}

// 4. 浏览器启动时自动开题（若今日未开过且未打卡）
function autoOpenTodayProblem() {
  chrome.storage.local.get([AUTO_OPEN_KEY, LAST_OPEN_DATE_KEY], (cfg) => {
    // 默认开启：只要未显式设为 false 即生效
    const isAutoOpenEnabled = cfg[AUTO_OPEN_KEY] !== false;
    if (!isAutoOpenEnabled) return;

    getDailyStatus(({ isDoneToday, nextProb, todayStr }) => {
      // 如果今日已经打卡，或者今日已经自动打开过，则不再自动弹开
      if (isDoneToday || cfg[LAST_OPEN_DATE_KEY] === todayStr || !nextProb) {
        return;
      }

      const targetUrl = `https://leetcode.cn/problems/${nextProb.slug}/`;

      // 检查当前窗口是否已经打开了力扣题目页面，避免重复开标签
      chrome.tabs.query({ url: '*://leetcode.cn/problems/*' }, (existingTabs) => {
        if (existingTabs && existingTabs.length > 0) {
          // 已经有力扣题目标签页，无需重复新建
          chrome.storage.local.set({ [LAST_OPEN_DATE_KEY]: todayStr });
          return;
        }

        // 新建标签页打开今日题目
        chrome.tabs.create({ url: targetUrl, active: true }, () => {
          chrome.storage.local.set({ [LAST_OPEN_DATE_KEY]: todayStr });
          console.log('[灵神助教] 浏览器启动自动为用户打开今日任务:', nextProb.title);
        });
      });
    });
  });
}

// 5. 监听浏览器启动与扩展加载
chrome.runtime.onStartup.addListener(() => {
  updateBadge();
  autoOpenTodayProblem();
});

chrome.runtime.onInstalled.addListener(() => {
  updateBadge();
  autoOpenTodayProblem();
});

// 定时每天/每小时检查角标与跨天重置
if (chrome.alarms) {
  chrome.alarms.create('check_daily_badge', { periodInMinutes: 60 });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'check_daily_badge') {
      updateBadge();
    }
  });
}

// 6. 监听存储变动（内容脚本 AC 打卡后实时刷新角标）
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes[STORAGE_KEY] || changes.last_ac_date)) {
    updateBadge();
  }
});

// 7. 监听来自内容脚本 (content.js) 或 侧边栏 (sidepanel.js) 的通信请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'OPEN_SIDEPANEL') {
    if (sender.tab && sender.tab.windowId && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId }).then(() => {
        sendResponse({ ok: true });
      }).catch(err => {
        sendResponse({ ok: false, error: err.message });
      });
      return true;
    }
  } else if (request.action === 'NAVIGATE_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        chrome.tabs.update(tabs[0].id, { url: request.url }, () => {
          sendResponse({ ok: true });
        });
      }
    });
    return true;
  } else if (request.action === 'UPDATE_BADGE') {
    updateBadge();
    sendResponse({ ok: true });
    return true;
  }
});

// 首次加载立即初始化角标
updateBadge();
