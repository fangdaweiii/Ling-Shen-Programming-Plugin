/* practice.js - 灵神科学刷题专项练习与过滤控制器 */
var FILTER = {
  diff: 0,
  tag: '',
  wrongOnly: false,
  newbieOnly: false, // 灵神新手村模式：rating <= 1700
  hot100Only: false, // Hot 100 突击模式
  blindBox: false    // 盲盒去标签实战模式
};

function filterProblemsList() {
  return PROBLEMS.filter(function (p) {
    if (FILTER.diff && p.diff !== FILTER.diff) return false;
    if (FILTER.newbieOnly && p.rating > 1700) return false;
    if (FILTER.hot100Only && !p.hot100) return false;
    if (FILTER.tag && p.tags.indexOf(FILTER.tag) < 0) return false;
    if (FILTER.wrongOnly) {
      var hasErr = ST.errs.some(function(e) { return e.pid === p.id; });
      if (!hasErr) return false;
    }
    return true;
  });
}

function pickRandomProblem() {
  var list = filterProblemsList();
  if (!list.length) { toast('当前筛选条件下没有匹配题目'); return; }
  var p = list[Math.floor(Math.random() * list.length)];
  if (typeof openProblem === 'function') {
    openProblem(p.id);
  } else if (typeof switchProb === 'function') {
    switchProb(p.id);
  }
  if (FILTER.blindBox) {
    toast('🎲 盲盒出题：题型与标签已隐去，请独立分析解法！');
  } else {
    var tagStr = p.hot100 ? ' · 🔥 Hot 100' : (p.rating <= 1700 ? ' · 🌱 新手村' : '');
    toast('已为你抽取：' + p.title + ' (Rating ' + p.rating + tagStr + ')');
  }
}

// 全局兼容别名：防止任何遗留代码调用 switchProb 时报错
if (typeof window !== 'undefined') {
  window.switchProb = function(id) {
    if (typeof openProblem === 'function') openProblem(id);
  };
}
