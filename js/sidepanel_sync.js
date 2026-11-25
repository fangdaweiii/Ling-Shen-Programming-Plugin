/* js/sidepanel_sync.js - 侧边栏与力扣页面双向同步与联动 */

(function () {
  'use strict';

  // 1. 在顶部导航栏注入「在力扣打开本题」快捷按钮
  function injectLeetCodeNavBtn() {
    var headActions = document.querySelector('.headActions');
    if (!headActions || document.getElementById('openInLeetCodeBtn')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn sm primary';
    btn.id = 'openInLeetCodeBtn';
    btn.innerHTML = '🚀 在力扣打开本题';
    btn.title = '让当前激活的浏览器标签页跳转到本题的力扣页面';
    btn.style.marginLeft = '4px';

    btn.addEventListener('click', function () {
      if (!CUR || !CUR.slug) {
        toast('本题暂无对应的力扣链接');
        return;
      }
      var url = 'https://leetcode.cn/problems/' + CUR.slug + '/';
      if (chrome && chrome.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs && tabs[0]) {
            chrome.tabs.update(tabs[0].id, { url: url });
          } else {
            window.open(url, '_blank');
          }
        });
      } else {
        window.open(url, '_blank');
      }
    });

    headActions.insertBefore(btn, headActions.firstChild);
  }

  // 2. 检测当前激活标签页是否在力扣某道题目上，若是则自动同步
  function syncFromActiveTab() {
    if (!chrome || !chrome.tabs) return;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || !tabs[0] || !tabs[0].url) return;
      var url = tabs[0].url;
      var match = url.match(/\/problems\/([^\/]+)/);
      if (!match) return;

      var slug = match[1];
      if (typeof PROBLEMS === 'undefined') return;

      var found = PROBLEMS.find(function (p) {
        return p.slug === slug || (p.lcNum && ('lc' + p.lcNum) === slug);
      });

      if (found && (!CUR || CUR.id !== found.id)) {
        if (typeof openProblem === 'function') {
          openProblem(found.id);
          toast('⚡ 已自动同步力扣当前题目：' + found.title);
        }
      }
    });
  }

  // 3. 监听浏览器标签页切换或 URL 变化
  if (chrome && chrome.tabs && chrome.tabs.onUpdated) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.url && changeInfo.url.includes('/problems/')) {
        syncFromActiveTab();
      }
    });
  }

  if (chrome && chrome.tabs && chrome.tabs.onActivated) {
    chrome.tabs.onActivated.addListener(function () {
      syncFromActiveTab();
    });
  }

  // 页面就绪后启动
  window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      injectLeetCodeNavBtn();
      syncFromActiveTab();
    }, 300);
  });
})();
