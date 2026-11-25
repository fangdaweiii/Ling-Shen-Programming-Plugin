/* app.js - 应用主程序、视图路由与事件绑定 */

function modOf(id) { for (var i = 0; i < MODULES.length; i++) { if (MODULES[i].id === id) { return MODULES[i]; } } return null; }
function modIndex(id) { for (var i = 0; i < MODULES.length; i++) { if (MODULES[i].id === id) { return i; } } return -1; }
function probsOf(mod) {
  return PROBLEMS.filter(function (p) { return p.mod === mod; }).sort(function (a, b) { return a.idx - b.idx; });
}
function probById(id) { for (var i = 0; i < PROBLEMS.length; i++) { if (PROBLEMS[i].id === id) { return PROBLEMS[i]; } } return null; }

/* 1. 主题切换管理 */
function initTheme() {
  var saved = localStorage.getItem('algo.theme') || 'dark';
  if (saved === 'light') {
    document.body.classList.add('light-theme');
    updateThemeBtns(true);
  }
}
function toggleTheme() {
  var isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('algo.theme', isLight ? 'light' : 'dark');
  updateThemeBtns(isLight);
  toast(isLight ? '已切换至清新浅色模式' : '已切回深色极客模式');
}
function updateThemeBtns(isLight) {
  var tb = $('themeToggleBtn');
  if (tb) tb.textContent = isLight ? '🌙 深色' : '☀️ 浅色';
  var mb = $('mobThemeBtn');
  if (mb) mb.textContent = isLight ? '🌙' : '☀️';
}

/* 5. 丰富解法与解法对比面板 */
var SOL_TAB = 0; // 0: 官方推荐解, 1: 替代解法/优化解, 2: 优劣势与复杂度横向对比

function getAlternativeSolution(p) {
  // 根据题目特征生成第二种经典解法
  var id = p.id;
  if (id === 'l1') {
    return {
      name: '解法二：递归回溯法',
      desc: '自底向上递归翻转：先递归到达链表最后一个节点作为新头，在回溯过程中把 head->next->next = head 原地倒扣。',
      time: 'O(n)', space: 'O(n) 递归深度',
      code: [
        'ListNode* reverseList(ListNode* head) {',
        '    if (head == nullptr || head->next == nullptr) {',
        '        return head;',
        '    }',
        '    ListNode* newHead = reverseList(head->next);',
        '    head->next->next = head;',
        '    head->next = nullptr;',
        '    return newHead;',
        '}'
      ]
    };
  }
  if (id === 'bs1' || id === 'bs4') {
    return {
      name: '解法二：左闭右开区间写法 [l, r)',
      desc: '以右开区间规范实现，循环条件 l < r，右端点初始化为 nums.size()，更适合直接对接 STL lower_bound 语义。',
      time: 'O(log n)', space: 'O(1)',
      code: [
        'int search(vector<int>& nums, int target) {',
        '    int l = 0, r = nums.size();',
        '    while (l < r) {',
        '        int mid = l + (r - l) / 2;',
        '        if (nums[mid] == target) return mid;',
        '        else if (nums[mid] < target) l = mid + 1;',
        '        else r = mid;',
        '    }',
        '    return -1;',
        '}'
      ]
    };
  }
  if (id === 'd1' || id === 'd4') {
    return {
      name: '解法二：常规 DP 数组实现 (显式记忆)',
      desc: '使用完整的 vector<int> dp(n+1) 数组存储所有子问题的最优解，结构更直观便于回溯打印路径。',
      time: 'O(n)', space: 'O(n)',
      code: [
        'int climbStairs(int n) {',
        '    if (n <= 2) return n;',
        '    vector<int> dp(n + 1, 0);',
        '    dp[1] = 1; dp[2] = 2;',
        '    for (int i = 3; i <= n; i++) {',
        '        dp[i] = dp[i - 1] + dp[i - 2];',
        '    }',
        '    return dp[n];',
        '}'
      ]
    };
  }
  if (id === 'h1') {
    return {
      name: '解法二：双指针排序夹逼 (适用于不求原下标的情形)',
      desc: '将元素与下标绑定后排序，使用对撞双指针从左右两端向中间夹逼，空间开销更小。',
      time: 'O(n log n)', space: 'O(n)',
      code: [
        'vector<int> twoSum(vector<int>& nums, int target) {',
        '    vector<vector<int>> arr;',
        '    for (int i = 0; i < nums.size(); i++) arr.push_back({nums[i], i});',
        '    sort(arr.begin(), arr.end());',
        '    int l = 0, r = arr.size() - 1;',
        '    while (l < r) {',
        '        int s = arr[l][0] + arr[r][0];',
        '        if (s == target) return {arr[l][1], arr[r][1]};',
        '        else if (s < target) l++;',
        '        else r--;',
        '    }',
        '    return {};',
        '}'
      ]
    };
  }
  return null;
}

// 重新构建多解法对比视图
function paneSol() {
  var p = CUR;
  var tried = ST.tries[p.id] || 0;
  if (!tried && !ST.ac[p.id]) {
    return '<div class="solLock">题解在提交一次后解锁。<br>先自己写一版，哪怕不对 —— 判题会告诉你错在哪个用例。</div>';
  }
  
  var alt = getAlternativeSolution(p);
  var html = '<div class="solSeg">' +
    '<button type="button" class="' + (SOL_TAB === 0 ? 'on' : '') + '" data-sol="0">解法一：标准主推</button>' +
    (alt ? '<button type="button" class="' + (SOL_TAB === 1 ? 'on' : '') + '" data-sol="1">' + escHtml(alt.name) + '</button>' : '') +
    '<button type="button" class="' + (SOL_TAB === 2 ? 'on' : '') + '" data-sol="2">📊 解法横向对比</button>' +
    '</div>';
    
  if (SOL_TAB === 0) {
    var code1 = p.ref.join('\n');
    var pitfalls = p.pitfalls ? '<div class="solNote" style="margin-top:12px"><b>避坑指南与常见易错点</b><br>' +
      p.pitfalls.map(function (x) { return '· ' + escHtml(x); }).join('<br>') + '</div>' : '';
    html += '<div class="solActions"><button class="btn sm ghost" id="loadSolBtn" data-code="main" title="将此解法载入编辑器">📋 载入此解法到编辑器</button></div>' +
      '<div class="solNote">' + escHtml(p.note) + '</div>' +
      '<div class="solNote"><b>复杂度：</b>' + escHtml(p.complexity) + '</div>' +
      '<pre class="code">' + escHtml(code1) + '</pre>' + pitfalls;
  } else if (SOL_TAB === 1 && alt) {
    var code2 = alt.code.join('\n');
    html += '<div class="solActions"><button class="btn sm ghost" id="loadSolBtn" data-code="alt" title="将替代解法载入编辑器测试">📋 载入此解法到编辑器</button></div>' +
      '<div class="solNote">' + escHtml(alt.desc) + '</div>' +
      '<div class="solNote"><b>复杂度：</b>时间 ' + escHtml(alt.time) + ' · 空间 ' + escHtml(alt.space) + '</div>' +
      '<pre class="code">' + escHtml(code2) + '</pre>';
  } else {
    // 方案对比表
    var t1 = p.complexity || 'O(n)';
    var t2 = alt ? ('时间 ' + alt.time + ' · 空间 ' + alt.space) : '暴力遍历 / 备选策略';
    html += '<div class="solNote"><b>多解法架构与设计取舍对比：</b></div>' +
      '<table class="solCmpTable">' +
      '<tr><th>维度</th><th>主推解法</th><th>备选 / 拓展解法</th></tr>' +
      '<tr><td>核心思想</td><td>' + escHtml(p.tags.join(' + ')) + '</td><td>' + (alt ? escHtml(alt.name) : '拓展分治/动态优化') + '</td></tr>' +
      '<tr><td>时空效率</td><td>' + escHtml(t1) + '</td><td>' + escHtml(t2) + '</td></tr>' +
      '<tr><td>工程实战取舍</td><td>实现紧凑、内存友好、边界清晰</td><td>提供不同数学推导与架构视角</td></tr>' +
      '</table>' +
      '<div class="solNote" style="margin-top:10px">💡 <b>面试建议：</b>面试时应先给出最稳妥、最易编码的解法，再主动向面试官分析更优时空折中的备选思路。</div>';
  }
  return html;
}

// 代理 pane 内的多解法事件
function wireSolEvents() {
  Array.prototype.forEach.call(document.querySelectorAll('.solSeg button'), function(b) {
    b.addEventListener('click', function() {
      SOL_TAB = parseInt(b.getAttribute('data-sol'), 10);
      renderPane();
    });
  });
  var loadBtn = $('loadSolBtn');
  if (loadBtn) {
    loadBtn.addEventListener('click', function() {
      var kind = loadBtn.getAttribute('data-code');
      var p = CUR;
      if (kind === 'main') {
        setCode(p.ref.join('\n'));
        toast('已将标准解法载入代码编辑器');
      } else {
        var alt = getAlternativeSolution(p);
        if (alt) {
          setCode(alt.code.join('\n'));
          toast('已将' + alt.name + '载入代码编辑器');
        }
      }
    });
  }
}

/* 6. 打卡卡片生成 (HTML5 Canvas 纯前端绘制) */

function renderTab() {
  Array.prototype.forEach.call($('tabs').children, function (b) {
    b.classList.toggle('on', b.getAttribute('data-tab') === TAB);
  });
}
function syncErrLine() {
  ERR_LINE = 0;
  if (!LAST || !LAST.fail) { renderMarks(); return; }
  var f = LAST.fail;
  if (f.err && (f.err.line || f.err.cpline)) { ERR_LINE = f.err.line || f.err.cpline; }
  else if (f.ce) {
    var m = /(?:main\.cpp|prog\.cpp|solution\.cpp)?:(\d+):/.exec(f.ce);
    if (m) { ERR_LINE = parseInt(m[1], 10); }
  }
  renderMarks();
}
function renderPane() {
  var el = $('pane'), p = CUR;
  if (!p) { el.innerHTML = ''; return; }
  syncErrLine();
  if (TAB === 'ai') { renderAiPane(); return; }
  el.className = 'pane';
  if (TAB === 'result') {
    el.innerHTML = paneResult();
    if (LAST && LAST.verdict === 'ac' && CUR) { wireComplexityQuiz(CUR); }
  }
  else if (TAB === 'hint') { el.innerHTML = paneHint(); }
  else if (TAB === 'sol') { el.innerHTML = paneSol(); }
  else if (TAB === 'kb') { el.innerHTML = paneKb(); }
  else { el.innerHTML = paneErr(); }
  wirePane();
}
function paneResult() {
  var p = CUR;
  if (!LAST) {
    return '<div class="empty">还没有运行结果。<br>先点「运行自测」看第一组用例的输出，确认结构对了再「提交判题」跑全部用例。</div>';
  }
  if (LAST.mode === 'self' || LAST.verdict === 'off') {
    if (ST.ac[p.id]) {
      return '<div class="verdict"><span class="vbadge ac">已通过</span><span class="vtext">自评题 · 已记为通过</span></div>' +
        '<div class="empty">这题靠你自己对照题解确认过，继续往下走。</div>';
    }
    return '<div class="verdict"><span class="vbadge off">自评</span><span class="vtext">这题没有内置用例，判题不参与。</span></div>' +
      '<div class="empty">对照「题解」页的参考实现，确认自己的思路和边界都对，再点下面的按钮记为通过。</div>' +
      '<button class="btn primary wide" id="markSelfBtn" type="button" style="margin-top:12px">标记为已通过</button>';
  }
  var v = LAST.verdict;
  var VB = { ac: ['ac', 'AC 通过'], wa: ['wa', 'WA 答案不对'], re: ['re', 'RE 运行出错'],
    ce: ['re', 'CE 编译失败'], net: ['wa', 'NET 编译器连不上'], run: ['off', '已运行'] };
  var vb = VB[v] || VB.run;
  var head = '<div class="verdict"><span class="vbadge ' + vb[0] + '">' + vb[1] + '</span>' +
    '<span class="vtext">' + (LAST.mode === 'submit' ? '提交' : '自测') + ' · ' + LAST.cases.length + ' 个用例 · ' + LAST.ms + ' ms · ' +
    (LAST.engine === 'online' ? '在线编译' : '内置解释器') + '</span></div>';
  if (LAST.badCode) { head += '<div class="empty">' + escHtml(LAST.badCode.msg) + '</div>'; }

  var body = LAST.cases.map(function (c) {
    var stTxt = { ac: '通过', wa: '答案不对', re: '运行出错', ce: '编译失败', net: '连不上', run: '已运行' }[c.st] || c.st;
    var extra = '';
    if (c.ce) {
      var ln = compileLine(c.ce);
      extra = '<pre class="code" style="margin:6px 0 0;max-height:170px">' + escHtml(trimmed(c.ce)) + '</pre>' +
        (ln ? '<div class="kv"><b>定位</b> <a data-goline="' + ln + '" style="cursor:pointer;color:var(--mint)">跳到第 ' + ln + ' 行</a></div>' : '');
    } else if (c.st === 're' && c.err) {
      var why = whyOf(c.err);
      extra = '<div class="kv"><b>错误</b> <span class="got">' + escHtml(c.err.message || c.err.msg) + '</span>' +
        (c.err.line ? '（第 ' + c.err.line + ' 行）' : '') + '</div>' +
        (why ? '<div class="kv"><b>怎么改</b> ' + escHtml(why) + '</div>' : '');
    } else if (c.pe) {
      extra = '<pre class="code" style="margin:6px 0 0;max-height:170px">' + escHtml(trimmed(c.pe)) + '</pre>';
    } else if (c.st === 'wa') {
      extra = '<div class="kv"><b>期望</b> <span class="exp">' + escHtml(trimmed(String(c.want))) + '</span></div>' +
        '<div class="kv"><b>你的</b> <span class="got">' + escHtml(trimmed(c.got)) + '</span></div>';
      if (LAST.fail && LAST.fail.i === c.i) { extra += '<div class="kv"><b>建议</b> ' + escHtml(adviceFor(String(c.want), c.got)) + '</div>'; }
    } else if (c.st === 'run') {
      extra = '<div class="kv"><b>输出</b> ' + (c.got ? '<span class="exp">' + escHtml(trimmed(c.got)) + '</span>' : '（没有输出）') + '</div>';
    } else if (c.st === 'net') {
      extra = '<div class="kv"><b>说明</b> ' + escHtml(c.err || '在线编译器暂时连不上') + '　可以稍后重试，或切回内置解释器。</div>';
    }
    return '<div class="case ' + (c.st === 'ac' ? 'good' : 'bad') + '">' +
      '<div class="caseTop"><span>用例 ' + (c.i + 1) + (c.inStr ? ' · ' + escHtml(trimmed(c.inStr)) : '') + '</span>' +
      '<span class="s ' + (c.st === 'ac' ? 'ac' : 'wa') + '">' + stTxt + '</span></div>' + extra + '</div>';
  }).join('');

  var diff = '';
  if (LAST.prevCode && LAST.prevCode !== ta.value) {
    var ops = diffLines(LAST.prevCode, ta.value);
    if (ops) {
      var addN = ops.filter(function (o) { return o.t === 'add'; }).length;
      var delN = ops.filter(function (o) { return o.t === 'del'; }).length;
      if (addN + delN > 0) {
        var changed = ops.filter(function (o) { return o.t !== 'same'; }).slice(0, 40);
        diff = '<details class="diffBox"><summary>与上次提交相比：<span class="addMark">+' + addN + '</span> <span class="delMark">−' + delN + '</span></summary>' +
          '<div class="diff">' + changed.map(function (o) {
            return '<div class="d ' + (o.t === 'add' ? 'add' : 'del') + '">' + escHtml((o.t === 'add' ? '+ ' : '− ') + o.s) + '</div>';
          }).join('') + '</div></details>';
      }
    }
  }

  var foot = '';
  if (LAST.engine !== 'online') {
    foot += '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<button class="btn sm" id="stressBtn" type="button">随机对拍 20 组</button>' +
      '<span class="tiny">自动造用例，抓固定用例漏掉的边界</span></div>';
  }
  if (v !== 'ac' && LAST.engine !== 'online') {
    foot += '<div style="margin-top:10px"><button class="btn sm" id="demoBtn2" type="button">逐行演示这段代码</button>' +
      '<span class="tiny" style="margin-left:8px">看指针一步步怎么动</span></div>';
  }
  if (LAST.cached) {
    foot += '<div style="margin-top:10px"><button class="btn sm" id="recompBtn" type="button">重新编译</button>' +
      '<span class="tiny" style="margin-left:8px">这次结果来自 10 分钟内的缓存</span></div>';
  }
  if (v === 'ac' && LAST.mode === 'submit') {
    var nx = nextProblem();
    foot = '<div class="empty" style="margin-top:10px">已记录通过。' + (nx ? '下一题：' + escHtml(nx.title) : '这个模块通关了。') + '</div>' +
      (nx ? '<button class="btn primary wide" id="nextBtn2" type="button" style="margin-top:8px">做下一题</button>' : '');
  }
  return head + body + stressBlock() + diff + foot;
}
function compileLine(txt) {
  var m = /:(\d+):\d+:/.exec(txt) || /main\.cpp:(\d+)/.exec(txt);
  return m ? parseInt(m[1], 10) : 0;
}
function paneHint() {
  var p = CUR;
  var shown = Math.min(HINTN, p.hints.length);
  var html = p.hints.slice(0, shown).map(function (h, i) {
    return '<div class="hintItem"><span class="n">提示 ' + (i + 1) + '</span>' + escHtml(h) + '</div>';
  }).join('');
  if (!shown) { html = '<div class="empty">先自己想 10 分钟，卡住了再看提示。<br>提示只给方向，不给代码。</div>'; }
  if (shown < p.hints.length) {
    html += '<button class="btn wide" id="moreHint" type="button" style="margin-top:6px">' +
      (shown ? '再看一条提示' : '给第一条提示') + '</button>';
  } else {
    html += '<div class="empty" style="margin-top:6px">提示已经给完了。真做不出来，就先提交看题解。</div>';
  }
  return html;
}
function paneSol() {
  var p = CUR;
  var tried = ST.tries[p.id] || 0;
  if (!tried && !ST.ac[p.id]) {
    return '<div class="solLock">题解在提交一次后解锁。<br>先自己写一版，哪怕不对 —— 判题会告诉你错在哪个用例。</div>';
  }
  var code = p.ref.join('\n');
  var pitfalls = p.pitfalls ? '<div class="solNote" style="margin-top:12px"><b>易错点</b><br>' +
    p.pitfalls.map(function (x) { return '· ' + escHtml(x); }).join('<br>') + '</div>' : '';
  return '<div class="solNote">' + escHtml(p.note) + '</div>' +
    '<div class="solNote"><b>复杂度</b>　' + escHtml(p.complexity) + '</div>' +
    '<pre class="code">' + escHtml(code) + '</pre>' + pitfalls;
}
function paneErr() {
  var list = ST.errs;
  if (!list.length) {
    return '<div class="empty">还没有错题记录。<br>每次提交失败都会自动记下来，包括错的用例和错误类型。</div>';
  }
  var html = '';
  list.slice(0, 20).forEach(function (e) {
    var p = probById(e.pid);
    if (!p) { return; }
    var d = new Date(e.t);
    var hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    html += '<div class="errItem"><span class="t">' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + hm + '</span>' +
      '<span class="m"><b>' + escHtml(p.title) + '</b>' + (e.cat ? '<span class="errType">' + escHtml(e.cat) + '</span>' : '') + '<br>' + escHtml(e.msg) +
      (e.why ? '<br><i>' + escHtml(e.why) + '</i>' : '') + '</span>' +
      '<a data-open="' + p.id + '">重做</a></div>';
  });
  return html;
}

function wirePane() {
  wireSolEvents();
  var ms = $('markSelfBtn');
  if (ms) { ms.addEventListener('click', markSelf); }
  var d2 = $('demoBtn2');
  if (d2) { d2.addEventListener('click', function () { demoOpen(); }); }
  var sb = $('stressBtn');
  if (sb) { sb.addEventListener('click', runStress); }
  var rb = $('recompBtn');
  if (rb) { rb.addEventListener('click', function () { doRunOnline(LAST.mode, true); }); }
  var nx = $('nextBtn2');
  if (nx) {
    nx.addEventListener('click', function () {
      var n = nextProblem();
      if (n) { openProblem(n.id); }
    });
  }
  var mh = $('moreHint');
  if (mh) {
    mh.addEventListener('click', function () {
      HINTN = Math.min(HINTN + 1, CUR.hints.length);
      ST.hints[CUR.id] = HINTN; save();
      renderPane();
    });
  }
  Array.prototype.forEach.call($('pane').querySelectorAll('[data-open]'), function (a) {
    a.addEventListener('click', function () { openProblem(a.getAttribute('data-open')); });
  });
  Array.prototype.forEach.call($('pane').querySelectorAll('[data-goline]'), function (a) {
    a.addEventListener('click', function () { gotoLine(parseInt(a.getAttribute('data-goline'), 10)); });
  });
}

/* ==================================================================
   打开题目 / 草稿 / 计时
   ================================================================== */
var draftTimer = null;
function saveDraft() {
  if (!CUR) { return; }
  ST.drafts[CUR.id] = ta.value;
  save();
  markSaved();
}
function saveDraftSoon() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 700);
}

function pushRecent(id) {
  ST.recent = (ST.recent || []).filter(function (x) { return x.id !== id; });
  ST.recent.unshift({ id: id, t: Date.now() });
  if (ST.recent.length > 6) { ST.recent.length = 6; }
  renderRecent();
}
function renderRecent() {
  var card = $('recentCard'), list = $('recentList');
  if (!card || !list) { return; }
  var items = (ST.recent || []).filter(function (x) { return probById(x.id); });
  if (!items.length) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  list.innerHTML = items.map(function (x) {
    var p = probById(x.id);
    return '<div class="recentItem" data-open="' + p.id + '"><span>' + escHtml(p.title) + '</span>' +
      '<span class="st">' + (ST.ac[p.id] ? 'AC' : '未过') + '</span></div>';
  }).join('');
  Array.prototype.forEach.call(list.querySelectorAll('[data-open]'), function (el) {
    el.addEventListener('click', function () { openProblem(el.getAttribute('data-open')); });
  });
}
function searchProblems(q) {
  var low = q.trim().toLowerCase();
  if (!low) { return []; }
  return PROBLEMS.filter(function (p) {
    return (p.title + ' ' + p.lc + ' ' + (p.tags || []).join(' ') + ' ' + p.id).toLowerCase().indexOf(low) >= 0;
  }).slice(0, 8);
}
function renderSearch() {
  var box = $('probSearch'), list = $('searchList');
  if (!box || !list) { return; }
  var q = box.value, hits = searchProblems(q);
  if (!q.trim() || !hits.length) {
    list.classList.toggle('on', !!q.trim());
    list.innerHTML = q.trim() ? '<div class="searchItem sm">没找到，换个关键词试试</div>' : '';
    return;
  }
  list.classList.add('on');
  list.innerHTML = hits.map(function (p) {
    return '<div class="searchItem" data-p="' + p.id + '">' + escHtml(p.title) +
      ' <span class="sm">' + escHtml(p.lc) + ' · ' + escHtml(MODULES[modIndex(p.mod)].name) + (ST.ac[p.id] ? ' · AC' : '') + '</span></div>';
  }).join('');
  Array.prototype.forEach.call(list.querySelectorAll('[data-p]'), function (el) {
    el.addEventListener('click', function () {
      openProblem(el.getAttribute('data-p'));
      box.value = ''; list.classList.remove('on');
    });
  });
}
function openProblem(id) {
  saveDraft();
  CUR = probById(id);
  if (!CUR) { return; }
  ST.cur = id;
  save();
  HINTN = ST.hints[id] || 0;
  LAST = null;
  TAB = 'result';
  renderHead();
  renderProblem();
  setCode(ST.drafts[id] || CUR.template);
  if (CUR.templateOnline && currentEngine(CUR) === 'interp' &&
      ta.value.trim() === String(CUR.templateOnline).trim()) {
    setCode(CUR.template);
    ST.drafts[id] = CUR.template;
    save();
  }
  renderTab();
  renderPane();
  renderRail();
  renderEngine();
  T0 = Date.now();
  startTimer();
  acHide();
  pushRecent(id);
}

/* ---------- 引擎切换 ---------- */
function renderEngine() {
  if (!CUR) { return; }
  var eng = currentEngine(CUR);
  var segs = $('segEngine');
  if (segs) {
    Array.prototype.forEach.call(segs.children, function (b) { b.classList.toggle('on', b.getAttribute('data-eng') === eng); });
  }
  var hasCases = !!(CUR.cases && CUR.cases.length);
  var row = $('stdinRow');
  if (row) { row.style.display = (eng === 'online' && hasCases) ? 'none' : ''; }
  var hint = $('engHint');
  if (hint) { hint.textContent = eng === 'online' ? '真实 g++ 编译运行：代码会发到 Wandbox 公共编译服务，别放隐私内容' : '内置解释器：数组 / vector / string / map / 递归 / 链表 / 二叉树都能离线判'; }
  var chip = $('engChip');
  if (chip) { chip.textContent = eng === 'online' ? '在线编译' : '内置判题'; }
  var box = $('stdinBox');
  if (box && box.value !== (ST.stdin || '')) { box.value = ST.stdin || ''; }
}
function markEngine(eng) {
  if (!CUR) { return; }
  if (eng === 'interp' && !(CUR.params && CUR.params.length)) {
    toast('这题没有内置用例，只能走在线编译');
    renderEngine();
    return;
  }
  var oldEng = currentEngine(CUR);
  var oldTpl = oldEng === 'online' ? (CUR.templateOnline || CUR.template) : CUR.template;
  var newTpl = eng === 'online' ? (CUR.templateOnline || CUR.template) : CUR.template;
  ST.engines[CUR.id] = eng;
  save();
  if (newTpl && oldTpl && ta.value.trim() === String(oldTpl).trim() && newTpl !== oldTpl) {
    setCode(newTpl);
    ST.drafts[CUR.id] = newTpl;
    save();
  }
  renderEngine();
  if (eng === 'online' && !CUR.templateOnline && CUR.cases && CUR.cases.length) {
    toast('在线模式要提交完整程序（含 main），当前代码只有函数体');
  } else {
    toast(eng === 'online' ? '已切到在线编译（需要联网）' : '已切回内置解释器');
  }
}

/* ---------- 跳到指定行 ---------- */
function gotoLine(n) {
  if (!n) { return; }
  var lines = ta.value.split('\n'), pos = 0;
  for (var i = 0; i < n - 1 && i < lines.length; i++) { pos += lines[i].length + 1; }
  var end = pos + (lines[n - 1] || '').length;
  ta.focus();
  ta.setSelectionRange(pos, end);
  var lh = parseFloat(getComputedStyle(ta).lineHeight) || 22;
  ta.scrollTop = Math.max(0, (n - 4) * lh);
  highlight(); buildGutter(); updatePos();
  toast('已跳到第 ' + n + ' 行');
}

/* ---------- 代码 diff（按行 LCS） ---------- */
function diffLines(a, b) {
  var A = String(a).split('\n'), B = String(b).split('\n');
  var n = A.length, m = B.length;
  if (n > 260 || m > 260) { return null; }
  var dp = [];
  for (var i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(0)); }
  for (var i2 = n - 1; i2 >= 0; i2--) {
    for (var j2 = m - 1; j2 >= 0; j2--) {
      dp[i2][j2] = A[i2] === B[j2] ? dp[i2 + 1][j2 + 1] + 1 : Math.max(dp[i2 + 1][j2], dp[i2][j2 + 1]);
    }
  }
  var out = [], x = 0, y = 0;
  while (x < n && y < m) {
    if (A[x] === B[y]) { out.push({ t: 'same', s: A[x] }); x++; y++; }
    else if (dp[x + 1][y] >= dp[x][y + 1]) { out.push({ t: 'del', s: A[x] }); x++; }
    else { out.push({ t: 'add', s: B[y] }); y++; }
  }
  while (x < n) { out.push({ t: 'del', s: A[x] }); x++; }
  while (y < m) { out.push({ t: 'add', s: B[y] }); y++; }
  return out;
}

function startTimer() {
  clearInterval(tickTimer);
  var el = $('timer');
  function paint() {
    var s = Math.floor((Date.now() - T0) / 1000);
    el.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  paint();
  tickTimer = setInterval(paint, 1000);
}

/* ==================================================================
   导入导出
   ================================================================== */
function exportBackup() {
  saveDraft();
  var payload = { app: 'algo-trainer', v: 2, savedAt: new Date().toISOString(), state: ST };
  var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '算法训练台-备份-' + TODAY + '.json';
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
  toast('已备份：进度、草稿、错题、AI 对话都在里面');
}

function exportReport() {
  saveDraft();
  var lines = ['# 算法训练台 · 学习报告', '', '生成时间：' + new Date().toLocaleString('zh-CN'), '',
    '## 概览', '', '- 已解决：' + solvedCount() + ' / ' + PROBLEMS.length, '- 连续打卡：' + streak() + ' 天',
    '- 总提交：' + $('stTry').textContent + '　一次通过率：' + $('stRate').textContent, '',
    '## 模块进度', ''];
  MODULES.forEach(function (m) {
    var pr = modProg(m.id);
    if (!pr.total) { return; }
    lines.push('- ' + m.name + '：' + pr.done + '/' + pr.total + (modDone(m.id) ? ' ✅' : ''));
  });
  lines.push('', '## 题目状态', '', '| 题目 | 模块 | 状态 | 提交次数 |', '| --- | --- | --- | --- |');
  PROBLEMS.forEach(function (p) {
    lines.push('| ' + p.title + ' (' + p.lc + ') | ' + modOf(p.mod).name + ' | ' +
      (ST.ac[p.id] ? '通过' : (ST.tries[p.id] ? '未通过' : '未做')) + ' | ' + (ST.tries[p.id] || 0) + ' |');
  });
  var et = ST.errTypes || {};
  var eks = Object.keys(et).sort(function (a, b) { return et[b] - et[a]; });
  if (eks.length) {
    lines.push('', '## 错误类型分布', '');
    eks.forEach(function (k) { lines.push('- ' + k + '：' + et[k] + ' 次'); });
  }
  if (ST.errs.length) {
    lines.push('', '## 错题记录', '');
    ST.errs.slice(0, 20).forEach(function (e) {
      var p = probById(e.pid);
      lines.push('- ' + new Date(e.t).toLocaleString('zh-CN') + '　' + (p ? p.title : e.pid) + '：' + e.msg + (e.why ? '（' + e.why + '）' : ''));
    });
  }
  var blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '算法训练报告-' + TODAY + '.md';
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
  toast('学习报告已导出（Markdown）');
}

/* ==================================================================
   事件绑定
   ================================================================== */
var tnav = $('todayNav');
if (tnav) {
  tnav.addEventListener('click', function (e) {
    var a = e.target.closest('[data-jump]');
    if (a) { openProblem(a.getAttribute('data-jump')); }
  });
}
$('todayCta').addEventListener('click', function () {
  var np = nextProblem();
  if (np) { openProblem(np.id); } else { openReport(); }
});
$('repBtn').addEventListener('click', openReport);
$('repClose').addEventListener('click', closeReport);
$('repExport').addEventListener('click', function () { exportReport(); });
$('repMask').addEventListener('click', function (e) { if (e.target === $('repMask')) { closeReport(); } });
(function () {
  var ps = $('probSearch');
  if (!ps) { return; }
  ps.addEventListener('input', renderSearch);
  ps.addEventListener('focus', renderSearch);
  ps.addEventListener('keydown', function (e) { if (e.key === 'Escape') { ps.value = ''; $('searchList').classList.remove('on'); ps.blur(); } });
  ps.addEventListener('blur', function () { setTimeout(function () { $('searchList').classList.remove('on'); }, 150); });
})();
$('modules').addEventListener('click', function (e) {
  var row = e.target.closest('.mrow');
  if (!row) { return; }
  var mid = row.getAttribute('data-mod');
  var i = modIndex(mid), ps = probsOf(mid);
  if (!unlocked(i)) { toast('先通过上一模块，才能解锁「' + MODULES[i].name + '」'); return; }
  if (!ps.length) { toast('『' + MODULES[i].name + '』题库待接入，先把链路走顺'); return; }
  
  // 处于过滤模式时，优先选取当前模块内匹配条件的题目
  var cand = ps;
  if (typeof filterProblemsList === 'function') {
    var matchIds = {};
    filterProblemsList().forEach(function(p) { matchIds[p.id] = true; });
    var matchedInMod = ps.filter(function(p) { return matchIds[p.id]; });
    if (matchedInMod.length > 0) cand = matchedInMod;
  }

  var target = null;
  for (var j = 0; j < cand.length; j++) { if (!ST.ac[cand[j].id]) { target = cand[j]; break; } }
  if (!target) { target = cand[cand.length - 1]; }
  openProblem(target.id);
});

$('tabs').addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (!b) { return; }
  TAB = b.getAttribute('data-tab');
  renderTab();
  renderPane();
});
$('probCard').addEventListener('click', function (e) {
  var ck = e.target.closest('.ck');
  if (!ck || !CUR) { return; }
  var i = ck.getAttribute('data-ck');
  ST.checks[CUR.id] = ST.checks[CUR.id] || {};
  ST.checks[CUR.id][i] = !ST.checks[CUR.id][i];
  ck.classList.toggle('done', !!ST.checks[CUR.id][i]);
  save();
});
var segE = $('segEngine');
if (segE) {
  segE.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) { return; }
    var eng = b.getAttribute('data-eng');
    if (eng === currentEngine(CUR)) { return; }
    markEngine(eng);
  });
}
var rl = $('reviewList');
if (rl) {
  rl.addEventListener('click', function (e) {
    var r = e.target.closest('[data-review]');
    if (r) { openProblem(r.getAttribute('data-review')); }
  });
}
var sb = $('stdinBox');
if (sb) { sb.addEventListener('input', function () { clearTimeout(sb._t); sb._t = setTimeout(function () { ST.stdin = sb.value; save(); }, 600); }); }
var pvb = $('prevProb'), nvb = $('nextProb');
if (pvb) { pvb.addEventListener('click', function () { var q = navNeighbor(-1); if (q) { openProblem(q.id); } }); }
if (nvb) { nvb.addEventListener('click', function () { var q = navNeighbor(1); if (q) { openProblem(q.id); } }); }
document.addEventListener('keydown', function (e) {
  if (!e.altKey || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) { return; }
  var mask = document.getElementById('dMask');
  if (mask && mask.classList.contains('on')) { return; }
  e.preventDefault();
  var q = navNeighbor(e.key === 'ArrowLeft' ? -1 : 1);
  if (q) { openProblem(q.id); }
  else { toast(e.key === 'ArrowLeft' ? '已经是第一题了' : '已经是最后一题了'); }
});
$('btnRun').addEventListener('click', function () { doRun('run'); });
$('btnSubmit').addEventListener('click', function () { doRun('submit'); });
$('resetCodeBtn').addEventListener('click', function () {
  if (!CUR) { return; }
  if (!confirm('恢复为本题初始模板？你写的内容会被覆盖。')) { return; }
  ST.drafts[CUR.id] = '';
  setCode(CUR.template);
  saveDraft();
  toast('已重置为初始模板');
});
$('expBtn').addEventListener('click', exportReport);
$('expJsonBtn').addEventListener('click', exportBackup);
$('impBtn').addEventListener('click', function () { $('impFile').click(); });
$('impFile').addEventListener('change', function (e) {
  var f = e.target.files[0];
  if (!f) { return; }
  var fr = new FileReader();
  fr.onload = function () {
    try {
      var raw = fr.result.trim();
      if (raw.charAt(0) === '#') { throw new Error('这是 Markdown 学习报告，不能恢复进度；要恢复请用「备份进度」导出的 .json'); }
      var obj = JSON.parse(raw);
      var st = obj && obj.state ? obj.state : obj;
      if (!st || typeof st !== 'object' || (!st.ac && !st.drafts)) { throw new Error('文件里没有进度数据'); }
      Object.keys(st).forEach(function (k) { if (k === 'v' || ST[k] !== undefined) { ST[k] = st[k]; } });
      save();
      if (ST.cur && probById(ST.cur)) { openProblem(ST.cur); } else { renderRail(); }
      renderTab(); renderPane();
      var n = Object.keys(ST.ac || {}).length, d = Object.keys(ST.drafts || {}).length;
      toast('已恢复：' + n + ' 道通过 · ' + d + ' 份草稿');
    } catch (err) {
      toast('恢复失败：' + (err && err.message ? err.message : '文件读不了'));
    }
    e.target.value = '';
  };
  fr.readAsText(f);
});
$('wipeBtn').addEventListener('click', function () {
  if (!confirm('清空所有进度、草稿和错题？这个操作不可撤销。')) { return; }
  ST = blankState();
  save();
  HINTN = 0; LAST = null;
  var first = PROBLEMS[0];
  openProblem(first.id);
  toast('已清空');
});

document.addEventListener('keydown', function (e) {
  var inTA = document.activeElement === ta;
  if (inTA) {
    if (acEl.classList.contains('on')) {
      if (e.key === 'Escape') { e.preventDefault(); acHide(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        ACSEL = (ACSEL + 1) % ACMATCH.length; ACMAN = true; acDraw(); return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        ACSEL = (ACSEL + ACMATCH.length - 1) % ACMATCH.length; ACMAN = true; acDraw(); return;
      }
      if ((e.key === 'Enter' || e.key === 'Tab') && (ACSEL >= 0 || ACMAN)) {
        e.preventDefault(); acAccept(ACSEL >= 0 ? ACSEL : 0); return;
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (ta.selectionStart !== ta.selectionEnd) { indentBlock(e.shiftKey ? -1 : 1); }
      else if (e.shiftKey) { indentBlock(-1); }
      else { insertText('    '); }
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      var pos = ta.selectionStart;
      if (pos !== ta.selectionEnd) { return; }
      var pre = ta.value.slice(0, pos), rest = ta.value.slice(pos);
      var lineStart = pre.lastIndexOf('\n') + 1;
      var cur = pre.slice(lineStart);
      var ind = (/^\s*/.exec(cur) || [''])[0];
      var opens = /\{\s*$/.test(cur);
      e.preventDefault();
      if (opens) {
        var ind2 = ind + '    ';
        if (rest.charAt(0) === '}') {
          insertText('\n' + ind2 + '\n' + ind);
          ta.setSelectionRange(pos + 1 + ind2.length, pos + 1 + ind2.length);
        } else { insertText('\n' + ind2); }
      } else if (bracketDepth(pre, '(', ')') > 0 || bracketDepth(pre, '[', ']') > 0) {
        /* 括号里的续行：多缩进一级，别把右括号顶到行首 */
        insertText('\n' + ind + '    ');
      } else {
        insertText('\n' + ind);
      }
      return;
    }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key === 'Backspace') {
      var ba = ta.selectionStart, bb = ta.selectionEnd, bv = ta.value;
      if (ba === bb && ba > 0 && AI_PAIRS[bv.charAt(ba - 1)] === bv.charAt(ba)) {
        e.preventDefault();
        ta.setSelectionRange(ba - 1, ba + 1);
        replaceSelection('');
        return;
      }
    }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && !e.isComposing) {
      if (autoPairKey(e)) { return; }
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) { e.preventDefault(); findOpen(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); toggleComment(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === ' ') { e.preventDefault(); acUpdate(true); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveDraft(); toast('草稿已保存'); return; }
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    if (e.shiftKey) { doRun('submit'); } else { doRun('run'); }
  }
});
document.addEventListener('visibilitychange', function () {
  if (document.hidden) { clearInterval(tickTimer); }
  else if (CUR) { startTimer(); }
});
window.addEventListener('resize', function () { measureChar(); acPlace(); });

/* ==================================================================
   启动
   ================================================================== */
function boot() {
  measureChar();
  var id = (ST.cur && probById(ST.cur)) ? ST.cur : '';
  if (id && ST.ac[id]) {
    var nx = nextProblem();
    if (nx) { id = nx.id; }
  }
  if (!id) {
    var np = nextProblem();
    id = np ? np.id : PROBLEMS[0].id;
  }
  CUR = probById(id);
  /* 先渲染，再进入题目（openProblem 会覆盖 CUR） */
  if (CUR) {
    ST.cur = id;
    HINTN = ST.hints[id] || 0;
    renderHead();
    renderProblem();
    setCode(ST.drafts[id] || CUR.template);
  if (CUR.templateOnline && currentEngine(CUR) === 'interp' &&
      ta.value.trim() === String(CUR.templateOnline).trim()) {
    setCode(CUR.template);
    ST.drafts[id] = CUR.template;
    save();
  }
    renderTab();
    renderPane();
    renderRail();
    T0 = Date.now();
    startTimer();
  }
}
/* ---------- 学习报告 ---------- */
function ymdOffset(back) { var d = new Date(); d.setDate(d.getDate() - back); return ymd(d); }
function buildReport() {
  var ac = solvedCount(), total = PROBLEMS.length;
  var tries = 0, first = 0, acN = 0;
  Object.keys(ST.tries).forEach(function (k) { tries += ST.tries[k]; });
  Object.keys(ST.ac).forEach(function (k) { acN++; if (ST.tries[k] === 1) { first++; } });
  var rate = acN ? Math.round(first / acN * 100) + '%' : '—';
  var html = '<div class="rGrid">' +
    '<div class="rStat"><b>' + ac + '/' + total + '</b><span>已通过</span></div>' +
    '<div class="rStat"><b>' + rate + '</b><span>一次通过率</span></div>' +
    '<div class="rStat"><b>' + tries + '</b><span>总提交</span></div>' +
    '<div class="rStat"><b>' + streak() + '</b><span>连续天数</span></div>' +
    '</div>';
  html += '<div><div class="rSec">模块进度</div><div class="rBars">';
  var pending = 0;
  MODULES.forEach(function (m) {
    var pr = modProg(m.id);
    if (!pr.total) { pending++; return; }
    var pct = Math.round(pr.done / pr.total * 100);
    html += '<div class="rBar"><span class="nm">' + escHtml(m.name) + '</span><span class="bg"><i style="width:' + pct + '%"></i></span>' +
      '<span class="vl">' + pr.done + '/' + pr.total + '</span></div>';
  });
  if (pending) { html += '<div class="tiny">其余 ' + pending + ' 个模块待接入。</div>'; }
  html += '</div></div>';
  var bars = '';
  for (var i = 6; i >= 0; i--) {
    var k = ymdOffset(i), on = !!ST.days[k];
    bars += '<i class="' + (on ? 'on' : '') + '" style="height:' + (on ? '100%' : '18%') + '" title="' + k + '"></i>';
  }
  html += '<div><div class="rSec">最近 7 天</div><div class="rDays">' + bars + '</div></div>';
  var et = ST.errTypes || {};
  var keys = Object.keys(et).sort(function (a, b) { return et[b] - et[a]; }).slice(0, 6);
  html += '<div><div class="rSec">错误类型分布</div>';
  if (!keys.length) { html += '<div class="tiny">还没有失败记录，继续保持。</div>'; }
  else { html += '<div class="rTags">' + keys.map(function (k) { return '<span class="rTag">' + escHtml(k) + ' <b>' + et[k] + '</b></span>'; }).join('') + '</div>'; }
  html += '</div>';
  var weak = PROBLEMS.filter(function (p) { return !ST.ac[p.id] && (ST.tries[p.id] || 0) > 0; })
    .sort(function (a, b) { return (ST.tries[b.id] || 0) - (ST.tries[a.id] || 0); }).slice(0, 5);
  html += '<div><div class="rSec">最该回炉</div>';
  if (!weak.length) { html += '<div class="tiny">没有卡住的题。</div>'; }
  else {
    html += '<div class="rWeak">' + weak.map(function (p) {
      return '<div class="rWeakRow" data-open="' + p.id + '"><span>' + escHtml(p.title) + '</span><span class="n">提交 ' + (ST.tries[p.id] || 0) + ' 次</span></div>';
    }).join('') + '</div>';
  }
  html += '</div>';
  var due = dueReviews();
  html += '<div><div class="rSec">到期复习</div><div class="tiny">' +
    (due.length ? due.length + ' 道：' + due.slice(0, 4).map(function (x) { return escHtml(x.p.title); }).join('、') : '暂无到期，按 1/3/7 天节奏自动排') + '</div></div>';
  return html;
}
function openReport() {
  if (!$('repBody')) { return; }
  var box = $('repBody');
  box.innerHTML = buildReport();
  Array.prototype.forEach.call(box.querySelectorAll('[data-open]'), function (el) {
    el.addEventListener('click', function () { closeReport(); openProblem(el.getAttribute('data-open')); });
  });
  $('repMask').classList.add('on');
}
function closeReport() { var m = $('repMask'); if (m) { m.classList.remove('on'); } }

boot();






/* ==================================================================
   逐行演示（代码 → 按行执行 → 指针/链表动画）
   ================================================================== */

function setupMobileDrawer() {
  var openBtn = $('mobDrawerOpen');
  var backdrop = $('railBackdrop');
  var rail = document.querySelector('.rail');
  if (!openBtn || !rail) return;
  
  openBtn.addEventListener('click', function() {
    rail.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('on');
  });
  
  if (backdrop) {
    backdrop.addEventListener('click', function() {
      rail.classList.remove('drawer-open');
      backdrop.classList.remove('on');
    });
  }
}

/* 绑定专项练习筛选和成就按钮 */
(function() {
  $('badgeBtn') && $('badgeBtn').addEventListener('click', openBadgeModal);
  $('badgeClose') && $('badgeClose').addEventListener('click', closeBadgeModal);
  $('badgeMask') && $('badgeMask').addEventListener('click', function(e) { if (e.target === $('badgeMask')) closeBadgeModal(); });
  
  $('fDiffAll') && $('fDiffAll').addEventListener('click', function() {
    FILTER.diff = 0;
    FILTER.newbieOnly = false;
    FILTER.hot100Only = false;
    FILTER.wrongOnly = false;
    FILTER.blindBox = false;
    updateFilterBtnStates();
    renderHead();
    applyFilterUI();
  });
  $('fNewbieBtn') && $('fNewbieBtn').addEventListener('click', function() {
    FILTER.newbieOnly = !FILTER.newbieOnly;
    if (FILTER.newbieOnly) FILTER.diff = 0;
    updateFilterBtnStates();
    applyFilterUI(true);
  });
  $('fHotBtn') && $('fHotBtn').addEventListener('click', function() {
    FILTER.hot100Only = !FILTER.hot100Only;
    if (FILTER.hot100Only) FILTER.diff = 0;
    updateFilterBtnStates();
    applyFilterUI(true);
  });
  $('fWrongBtn') && $('fWrongBtn').addEventListener('click', function() {
    FILTER.wrongOnly = !FILTER.wrongOnly;
    updateFilterBtnStates();
    applyFilterUI(true);
  });
  $('fBlindBtn') && $('fBlindBtn').addEventListener('click', function() {
    FILTER.blindBox = !FILTER.blindBox;
    updateFilterBtnStates();
    renderHead();
    if (FILTER.blindBox) {
      pickRandomProblem();
    } else {
      toast('已退出盲盒模式，恢复正常知识标签与难度分');
    }
  });
  $('fRandBtn') && $('fRandBtn').addEventListener('click', pickRandomProblem);

  // Phase 2 初始化钩子与事件监听（页面加载时立即执行）
  initTheme();
  setupTestbench();
  setupMobileDrawer();
  $('themeToggleBtn') && $('themeToggleBtn').addEventListener('click', toggleTheme);
  $('mobThemeBtn') && $('mobThemeBtn').addEventListener('click', toggleTheme);
  $('formatCodeBtn') && $('formatCodeBtn').addEventListener('click', formatCppCode);
  $('fontSizeBtn') && $('fontSizeBtn').addEventListener('click', cycleFontSize);
  $('shareCardBtn') && $('shareCardBtn').addEventListener('click', openShareCard);
  $('shareClose') && $('shareClose').addEventListener('click', closeShareCard);
  $('shareMask') && $('shareMask').addEventListener('click', function(e) { if (e.target === $('shareMask')) closeShareCard(); });
  $('shareDownloadBtn') && $('shareDownloadBtn').addEventListener('click', downloadShareImage);
  $('shareCopyBtn') && $('shareCopyBtn').addEventListener('click', copyShareImage);
})();

function updateFilterBtnStates() {
  var isAll = !FILTER.diff && !FILTER.newbieOnly && !FILTER.hot100Only && !FILTER.wrongOnly && !FILTER.blindBox;
  $('fDiffAll') && $('fDiffAll').classList.toggle('on', isAll);
  $('fNewbieBtn') && $('fNewbieBtn').classList.toggle('on', FILTER.newbieOnly);
  $('fHotBtn') && $('fHotBtn').classList.toggle('on', FILTER.hot100Only);
  $('fWrongBtn') && $('fWrongBtn').classList.toggle('on', FILTER.wrongOnly);
  $('fBlindBtn') && $('fBlindBtn').classList.toggle('on', FILTER.blindBox);
}

function setDiffFilter(d) {
  FILTER.diff = d;
  FILTER.newbieOnly = false;
  FILTER.hot100Only = false;
  updateFilterBtnStates();
  applyFilterUI(true);
}

function applyFilterUI(autoSwitch) {
  var list = filterProblemsList();
  var matchIds = {};
  list.forEach(function(p) { matchIds[p.id] = true; });

  // 1. 更新侧边栏模块列表的高亮与计数
  var modEls = document.querySelectorAll('#modules .mrow');
  var isFiltering = FILTER.diff || FILTER.newbieOnly || FILTER.hot100Only || FILTER.wrongOnly;
  
  Array.prototype.forEach.call(modEls, function(el) {
    var mid = el.getAttribute('data-mod');
    if (!mid) return;
    var ps = probsOf(mid);
    var matchCount = 0, matchDone = 0;
    ps.forEach(function(p) {
      if (matchIds[p.id]) {
        matchCount++;
        if (ST.ac[p.id]) matchDone++;
      }
    });
    el.style.opacity = matchCount > 0 ? '1' : (isFiltering ? '0.25' : '1');
    var numEl = el.querySelector('.mnum');
    if (numEl) {
      if (isFiltering) {
        numEl.textContent = matchCount > 0 ? (matchDone + '/' + matchCount) : '—';
      } else {
        var pr = modProg(mid);
        numEl.textContent = pr.done + '/' + pr.total;
      }
    }
  });

  // 2. 更新 routeSum 汇总提示
  var routeSumEl = $('routeSum');
  if (routeSumEl) {
    if (FILTER.hot100Only) {
      var hotDone = 0;
      list.forEach(function(p) { if (ST.ac[p.id]) hotDone++; });
      routeSumEl.textContent = '🔥 Hot100: ' + hotDone + '/' + list.length + ' 题';
    } else if (FILTER.newbieOnly) {
      var nbDone = 0;
      list.forEach(function(p) { if (ST.ac[p.id]) nbDone++; });
      routeSumEl.textContent = '🌱 新手村: ' + nbDone + '/' + list.length + ' 题';
    } else if (FILTER.wrongOnly) {
      routeSumEl.textContent = '📝 错题: ' + list.length + ' 题';
    } else if (FILTER.diff) {
      routeSumEl.textContent = FILTER.diff + '★: ' + list.length + ' 题';
    } else {
      var doneMods = MODULES.filter(function (m) { return modDone(m.id); }).length;
      routeSumEl.textContent = doneMods + ' / ' + MODULES.length + ' 模块';
    }
  }

  // 3. 如果开启了过滤，且当前题目不在过滤结果中，自动切换到符合条件的第一题！
  if (autoSwitch && list.length > 0 && CUR && !matchIds[CUR.id]) {
    var nextTarget = null;
    for (var i = 0; i < list.length; i++) {
      if (!ST.ac[list[i].id]) { nextTarget = list[i]; break; }
    }
    if (!nextTarget) nextTarget = list[0];
    openProblem(nextTarget.id);
  } else {
    renderHead(); // 刷新头部 pPos 与 chips
  }

  // 4. 统计状态提示
  var desc = '已筛选出 ' + list.length + ' 道题目';
  if (FILTER.newbieOnly) desc = '🌱 灵神新手村模式：共 ' + list.length + ' 道基础核心题 (≤1700分)';
  else if (FILTER.hot100Only) desc = '🔥 Hot 100 突击模式：共 ' + list.length + ' 道高频经典题';
  else if (FILTER.wrongOnly) desc = '📝 错题回炉模式：共 ' + list.length + ' 道待复习题';
  toast(desc);
}