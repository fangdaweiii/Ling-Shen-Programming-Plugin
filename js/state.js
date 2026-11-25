/* state.js - 本地状态存储与进度追踪 */
var LS = 'algo.trainer.v2';
function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function datePlus(n) { var d = new Date(); d.setDate(d.getDate() + n); return ymd(d); }
var TODAY = ymd(new Date());

function blankState() {
  return { v: 2, ac: {}, tries: {}, drafts: {}, hints: {}, errs: [], days: {}, cur: '', stdin: '',
    checks: {}, lastCode: {}, review: {}, engines: {} };
}
function loadState() {
  try {
    var raw = localStorage.getItem(LS);
    if (!raw) { return blankState(); }
    var s = JSON.parse(raw);
    if (!s || typeof s !== 'object') { return blankState(); }
    var b = blankState();
    Object.keys(b).forEach(function (k) { if (s[k] === undefined) { s[k] = b[k]; } });
    return s;
  } catch (e) { return blankState(); }
}
var ST = loadState();
var saveWarned = false;
function save() {
  try { localStorage.setItem(LS, JSON.stringify(ST)); }
  catch (e1) {
    /* 先扔掉较早的 AI 对话再试一次 */
    try {
      if (ST.ai && ST.ai.chats) {
        Object.keys(ST.ai.chats).forEach(function (k) {
          var l = ST.ai.chats[k];
          if (l && l.length > 12) { ST.ai.chats[k] = l.slice(-12); }
        });
      }
      localStorage.setItem(LS, JSON.stringify(ST));
    } catch (e2) {
      if (!saveWarned) {
        saveWarned = true;
        toast('本机存储写满，进度可能没存下：先去「数据 → 备份进度」留一份');
      }
    }
  }
}

/* ---------- 进度计算 ---------- */
function modDone(mid) {
  var ps = probsOf(mid);
  if (!ps.length) { return false; }
  return ps.every(function (p) { return !!ST.ac[p.id]; });
}
function modProg(mid) {
  var ps = probsOf(mid), done = 0;
  ps.forEach(function (p) { if (ST.ac[p.id]) { done++; } });
  return { done: done, total: ps.length };
}
function unlocked(i) {
  // 灵神科学刷题原则：支持跳跃与自由探索，所有模块默认对学员开放
  return true;
}
function orderList() {
  if (typeof filterProblemsList === 'function' && typeof FILTER !== 'undefined') {
    var isFiltering = FILTER.diff || FILTER.newbieOnly || FILTER.hot100Only || FILTER.wrongOnly || FILTER.tag;
    if (isFiltering) {
      var flist = filterProblemsList();
      if (flist && flist.length > 0) return flist;
    }
  }
  var arr = [];
  MODULES.forEach(function (m) { probsOf(m.id).forEach(function (p) { arr.push(p); }); });
  return arr;
}
function neighborOf(p, dir) {
  if (!p) { return null; }
  var arr = orderList(), i = -1;
  for (var k = 0; k < arr.length; k++) { if (arr[k].id === p.id) { i = k; break; } }
  if (i < 0) { return null; }
  return arr[i + dir] || null;
}
function navNeighbor(dir) { return CUR ? neighborOf(CUR, dir) : null; }
function nextProblem() {
  var list = orderList();
  for (var j = 0; j < list.length; j++) { if (!ST.ac[list[j].id]) { return list[j]; } }
  return null;
}
function solvedCount() { return Object.keys(ST.ac).length; }
function streak() {
  var n = 0, d = new Date();
  var key = TODAY;
  if (!ST.days[key]) { d.setDate(d.getDate() - 1); key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  while (ST.days[key]) {
    n++;
    d.setDate(d.getDate() - 1);
    key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  return n;
}

/* ---------- 回炉队列（1 / 3 / 7 天） ---------- */
function dueReviews() {
  var out = [];
  Object.keys(ST.review).forEach(function (pid) {
    var r = ST.review[pid], p = probById(pid);
    if (p && r && r.due <= TODAY) { out.push({ p: p, r: r }); }
  });
  return out.sort(function (a, b) { return a.r.due < b.r.due ? -1 : 1; });
}
function scheduleReview(pid, ok) {
  var r = ST.review[pid];
  if (ok) {
    var st = ((r && r.stage) || 0) + 1;
    if (st > 2) { delete ST.review[pid]; }
    else { ST.review[pid] = { stage: st, due: datePlus(st === 1 ? 3 : 7) }; }
    return;
  }
  ST.review[pid] = { stage: 0, due: datePlus(1) };
}
function currentEngine(p) { return (ST.engines && ST.engines[p.id]) === 'online' || p.engine === 'online' ? 'online' : 'interp'; }

/* ---------- DOM 小工具 ---------- */
function $(id) { return document.getElementById(id); }
function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var toastTimer = null;
function toast(msg) {
  var el = $('toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('on'); }, 2400);
}

/* ---------- 当前状态 ---------- */
var CUR = null, TAB = 'result', LAST = null, HINTN = 0, T0 = 0, tickTimer = null, CHARW = 8, BUSY = false;
var ERR_LINE = 0, STRESS = null, FIND = { on: false, hits: [], i: 0 };

/* ---------- 行标记 / 括号配对 ---------- */
function lineColAt(v, idx) {
  var pre = v.slice(0, idx);
  var line = pre.split('\n').length - 1;
  var col = pre.length - pre.lastIndexOf('\n') - 1;
  return { line: line, col: col };
}
function bracketMatch(v, pos) {
  var opens = '([{', closes = ')]}';
  var self = v.charAt(pos), prev = v.charAt(pos - 1);
  var ch = '', at = -1, dir = 1;
  if (opens.indexOf(prev) >= 0) { ch = prev; at = pos - 1; dir = 1; }
  else if (closes.indexOf(prev) >= 0) { ch = prev; at = pos - 1; dir = -1; }
  else if (opens.indexOf(self) >= 0) { ch = self; at = pos; dir = 1; }
  else if (closes.indexOf(self) >= 0) { ch = self; at = pos; dir = -1; }
  else { return null; }
  var isOpen = opens.indexOf(ch) >= 0;
  var pairOpen = isOpen ? ch : opens.charAt(closes.indexOf(ch));
  var pairClose = isOpen ? closes.charAt(opens.indexOf(ch)) : ch;
  var d = 0;
  for (var i = at; i >= 0 && i < v.length; i += dir) {
    var c = v.charAt(i);
    if (c === ch) { d++; }
    else if (c === (isOpen ? pairClose : pairOpen)) {
      d--;
      if (d === 0) { return [at, i]; }
    }
  }
  return null;
}
function renderMarks() {
  var box = $('marks');
  if (!box || !ta) { return; }
  var v = ta.value, html = '';
  var pos = ta.selectionStart;
  var lc = lineColAt(v, pos);
  var top = 11 + lc.line * 22 - ta.scrollTop;
  html += '<div class="curLine" style="top:' + top + 'px"></div>';
  if (ERR_LINE) {
    var et = 11 + (ERR_LINE - 1) * 22 - ta.scrollTop;
    if (et > -22 && et < box.clientHeight) { html += '<div class="errLine" style="top:' + et + 'px"></div>'; }
  }
  var m = bracketMatch(v, pos);
  if (m) {
    m.forEach(function (idx) {
      var c = lineColAt(v, idx);
      var l = 14 + c.col * CHARW - ta.scrollLeft;
      html += '<div class="brk" style="left:' + l + 'px;width:' + CHARW + 'px;top:' + (11 + c.line * 22 - ta.scrollTop) + 'px"></div>';
    });
  }
  box.innerHTML = html;
}

/* ---------- 代码内查找 ---------- */
function findOpen() {
  if (!ta) { return; }
  var f = $('findBar');
  f.classList.add('on');
  var q = $('findInput');
  q.value = q.value || '';
  q.focus(); q.select();
  findScan();
}
function findClose() {
  $('findBar').classList.remove('on');
  FIND.on = false;
  ta.focus();
}
function findScan() {
  var q = $('findInput').value;
  FIND.hits = [];
  FIND.i = 0;
  if (q) {
    var v = ta.value, idx = v.indexOf(q);
    while (idx >= 0 && FIND.hits.length < 500) {
      FIND.hits.push(idx);
      idx = v.indexOf(q, idx + Math.max(1, q.length));
    }
  }
  $('findCount').textContent = (FIND.hits.length ? (FIND.i + 1) : 0) + '/' + FIND.hits.length;
}
function findGo(dir) {
  if (!FIND.hits.length) { findScan(); }
  if (!FIND.hits.length) { return; }
  if (dir === 0) { FIND.i = 0; }
  else { FIND.i = (FIND.i + dir + FIND.hits.length) % FIND.hits.length; }
  var a = FIND.hits[FIND.i], q = $('findInput').value.length;
  ta.focus();
  ta.setSelectionRange(a, a + q);
  var c = lineColAt(ta.value, a);
  ta.scrollTop = Math.max(0, (c.line - 4) * 22);
  ta.scrollLeft = Math.max(0, (c.col - 6) * CHARW);
  highlight();
  $('findCount').textContent = (FIND.i + 1) + '/' + FIND.hits.length;
  updatePos();
}

/* ---------- 保存状态 ---------- */
var saveTimer = null;
function markSaved() {
  var el = $('saveInd');
  if (!el) { return; }
  var d = new Date();
  el.textContent = '已保存 ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  el.classList.add('on');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function () { el.classList.remove('on'); }, 2600);
}

/* ==================================================================
   左栏 + 头部
   ================================================================== */
function renderRail() {
  /* 今日任务 */
  var np = nextProblem();
  var titleEl = $('todayTitle'), metaEl = $('todayMeta'), cta = $('todayCta'), bar = $('todayBar');
  if (np) {
    var mi = modIndex(np.mod), mm = modProg(np.mod);
    titleEl.textContent = np.title;
    metaEl.innerHTML = '<span class="chip mint">' + MODULES[mi].name + '</span>' +
      '<span class="chip">第 ' + np.idx + ' 题</span>' +
      '<span class="chip' + (np.quiz ? ' coral' : '') + '">' + (np.quiz ? '模块检验' : '难度 ' + np.diff) + '</span>';
    bar.style.width = (mm.total ? Math.round(mm.done / mm.total * 100) : 0) + '%';
    cta.textContent = ST.drafts[np.id] ? '继续写这题' : '开始今日题';
    cta.disabled = false;
  } else {
    titleEl.textContent = '全部通关';
    metaEl.innerHTML = '<span class="chip mint">' + solvedCount() + ' / ' + PROBLEMS.length + '</span><span class="chip">等新模块接入</span>';
    bar.style.width = '100%';
    cta.textContent = '看学习报告';
    cta.disabled = false;
  }
  /* 今日卡：回看上一题 */
  var tn = $('todayNav');
  if (tn) {
    var back = neighborOf(CUR || np, -1);
    if (back) {
      tn.classList.add('on');
      tn.innerHTML = '回看上一题：<a data-jump="' + back.id + '">' + escHtml(back.title) + '</a>' +
        (ST.ac[back.id] ? ' <span class="tiny">已通过</span>' : '');
    } else { tn.classList.remove('on'); tn.innerHTML = ''; }
  }
  $('streakPill').textContent = '连续 ' + streak() + ' 天';

  /* 回炉卡 */
  var due = dueReviews(), rCard = $('reviewCard');
  if (rCard) {
    if (!due.length) { rCard.style.display = 'none'; }
    else {
      rCard.style.display = '';
      $('reviewSum').textContent = due.length + ' 道到期';
      $('reviewList').innerHTML = due.slice(0, 4).map(function (x) {
        var tag = ST.ac[x.p.id] ? '复习' : '重做';
        return '<div class="mrow" data-review="' + x.p.id + '"><i class="mdot cur"></i>' +
          '<span class="mname">' + escHtml(x.p.title) + '</span><span class="mnum">' + tag + '</span></div>';
      }).join('');
    }
  }

  /* 模块路线（按灵神路线分阶段呈现） */
  var box = $('modules'), html = '';
  var lastStage = '';
  MODULES.forEach(function (m, i) {
    if (m.stageName !== lastStage) {
      lastStage = m.stageName;
      var isAdv = m.stage && m.stage.indexOf('8') >= 0;
      html += '<div class="routeStageHead"><span>' + (isAdv ? '⚔️ ' : '🌱 ') + escHtml(m.stageName) + '</span><span class="stageBadge">' + (isAdv ? '进阶殿堂' : '新手村') + '</span></div>';
    }
    var pr = modProg(m.id), ok = modDone(m.id), lk = !unlocked(i);
    var cur = CUR && CUR.mod === m.id;
    var cls = 'mrow' + (cur ? ' on' : '') + (lk ? ' lock' : '');
    var dot = 'mdot' + (ok ? ' done' : (cur ? ' cur' : ''));
    html += '<div class="' + cls + '" data-mod="' + m.id + '">' +
      '<i class="' + dot + '"></i>' +
      '<span class="mname' + (lk ? ' lock' : '') + '">' + escHtml(m.name) + '</span>' +
      '<span class="mnum">' + (m.planned && !pr.total ? (lk ? '锁' : '待接入') : pr.done + '/' + pr.total) + '</span>' +
      '</div>';
  });
  box.innerHTML = html;
  var doneMods = MODULES.filter(function (m) { return modDone(m.id); }).length;
  $('routeSum').textContent = doneMods + ' / ' + MODULES.length + ' 模块';

  /* 统计 */
  $('stAc').textContent = solvedCount();
  var totalTries = 0, firstTry = 0, acN = 0;
  Object.keys(ST.tries).forEach(function (k) { totalTries += ST.tries[k]; });
  Object.keys(ST.ac).forEach(function (k) { acN++; if (ST.tries[k] === 1) { firstTry++; } });
  $('stRate').textContent = acN ? Math.round(firstTry / acN * 100) + '%' : '—';
  $('stTry').textContent = totalTries;
  $('stErr').textContent = ST.errs.length;
  renderRecent();
}

function renderHead() {
  var p = CUR;
  if (!p) { return; }
  var mi = modIndex(p.mod);
  var stagePrefix = (MODULES[mi] && MODULES[mi].stage) ? (MODULES[mi].stage + ' · ') : '';

  if (FILTER.blindBox) {
    $('crumb').textContent = '🎲 盲盒实战模式 · 隐去标签自主分析';
    $('pTitl').textContent = p.title;
    var blindChips = [
      '<span class="chip amber">🎲 盲盒挑战（已隐去算法分类与难度分）</span>'
    ];
    if (ST.ac[p.id]) { blindChips.push('<span class="chip mint">已通过</span>'); }
    $('pTags').innerHTML = blindChips.join('');
  } else {
    $('crumb').textContent = stagePrefix + MODULES[mi].name + ' · 第 ' + p.idx + ' 题 · ' + MODULES[mi].tag;
    $('pTitl').textContent = p.title;
    var chips = [
      '<span class="chip">' + p.lc + '</span>',
      '<span class="chip mint" title="力扣竞赛难度分">Rating ' + (p.rating || 1400) + '</span>'
    ];
    if (p.rating <= 1700) {
      chips.push('<span class="chip" title="灵神推荐新手村核心题">🌱 新手村</span>');
    } else {
      chips.push('<span class="chip coral" title="进阶高分题">⚔️ 进阶题</span>');
    }
    if (p.hot100) {
      chips.push('<span class="chip amber" title="LeetCode Hot 100 必刷经典">🔥 Hot 100</span>');
    }
    p.tags.forEach(function (t) { chips.push('<span class="chip">' + escHtml(t) + '</span>'); });
    if (ST.ac[p.id]) { chips.push('<span class="chip mint">已通过</span>'); }
    $('pTags').innerHTML = chips.join('');
  }
  $('fileName').textContent = p.id + '-' + p.title + '.cpp';

  /* 上一题 / 下一题 */
  var arr = orderList(), pos = 0;
  for (var k = 0; k < arr.length; k++) { if (arr[k].id === p.id) { pos = k + 1; break; } }
  var pr = navNeighbor(-1), nx = navNeighbor(1);
  var pb = $('prevProb'), nb = $('nextProb');
  if (pb) {
    pb.disabled = !pr;
    pb.setAttribute('title', pr ? ('上一题：' + pr.title + '（Alt+←）') : '已经是第一题');
  }
  if (nb) {
    nb.disabled = !nx;
    nb.setAttribute('title', nx ? ('下一题：' + nx.title + '（Alt+→）') : '已经是最后一题');
  }
  var pp = $('pPos');
  if (pp) { pp.textContent = pos + ' / ' + arr.length; }
}

function defaultRange(p) {
  var s = p.sig || '';
  if (/TreeNode/.test(s)) { return '节点数 0–200，节点值 ±1000；null 表示空节点'; }
  if (/ListNode/.test(s)) { return '节点数 0–100，节点值 ±1000'; }
  if (/string/.test(s)) { return '字符串长度 0–200'; }
  if (/vector<vector/.test(s)) { return '数组长度 ≤ 6，元素值 ±100（解释器步数上限 3000）'; }
  if (/vector/.test(s)) { return '数组长度 0–200，元素值 ±10^4'; }
  return '数值范围见题面；解释器步数上限 3000';
}
function renderProblem() {
  var p = CUR;
  if (!p) { return; }
  var ex = p.ex.map(function (e) {
    return '<div class="exRow"><span class="k">输入</span><span class="v">' + escHtml(e.i) + '</span>' +
      '<span class="k">输出</span><span class="v c">' + escHtml(e.o) + '</span></div>';
  }).join('');
  var ck = ST.checks[p.id] || {};
  var edge = '空输入 / 只有一个元素 / 全部相同，这三种边界都走过一遍';
  if (/ListNode/.test(p.sig || '')) { edge = '空链表 / 单节点 / 头节点被删，这三种边界都走过一遍'; }
  else if (/TreeNode/.test(p.sig || '')) { edge = '空树 / 只有根 / 单边斜树，这三种边界都走过一遍'; }
  else if (/string/.test(p.sig || '')) { edge = '空串 / 单字符 / 全相同字符，这三种边界都走过一遍'; }
  var items = (p.pitfalls || []).slice(0, 3).concat([edge]);
  var check = '<div class="checks"><div class="lab" style="margin-bottom:7px">提交前自检 · 先勾完再交</div>' +
    items.map(function (t, i) {
      return '<div class="ck' + (ck[i] ? ' done' : '') + '" data-ck="' + i + '"><i class="bx"></i><span>' + escHtml(t) + '</span></div>';
    }).join('') + '</div>';
  $('probCard').innerHTML =
    '<p class="brief">' + escHtml(p.brief) + '</p>' +
    '<div class="ioGrid">' +
    '<div><h4>输入</h4><p>' + escHtml(p.ioIn) + '</p></div>' +
    '<div><h4>输出</h4><p>' + escHtml(p.ioOut) + '</p></div>' +
    '</div>' +
    '<div class="ex">' + ex + '<div class="exRow"><span class="k">数据范围</span><span class="v">' + escHtml(p.range || defaultRange(p)) + '</span></div></div>' +
    (p.engine === 'online' ? '<div class="exRow" style="margin-top:8px"><span class="k">判题</span><span class="v c">在线编译（需要联网），提交后真实编译运行</span></div>' : '') +
    check;
}

/* ==================================================================
   编辑器
   ================================================================== */