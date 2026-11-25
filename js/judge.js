/* judge.js - 判题系统、在线编译与测试台支持 */
function fmtVal(v) {
  if (!v) { return '?'; }
  if (v.k === 'num') { return String(v.v); }
  if (v.k === 'bool') { return String(v.v); }
  if (v.k === 'null') { return 'null'; }
  return '?';
}
function treeToArr(v, objs) {
  var out = [], q = [v.id], guard = 0;
  while (q.length && guard++ < 600) {
    var id = q.shift();
    if (!id) { out.push(null); continue; }
    var ob = objs[id];
    if (!ob) { out.push(null); continue; }
    out.push(ob.fields.val ? ob.fields.val.v : null);
    q.push(ob.fields.left && ob.fields.left.k === 'ptr' ? ob.fields.left.id : null);
    q.push(ob.fields.right && ob.fields.right.k === 'ptr' ? ob.fields.right.id : null);
  }
  while (out.length && out[out.length - 1] === null) { out.pop(); }
  return out;
}
function valToJs(v, objs, guard) {
  guard = guard || 0;
  if (!v || v.k === 'null') { return null; }
  if (v.k === 'num') { return v.v; }
  if (v.k === 'bool') { return v.v; }
  if (v.k === 'str') { return v.v; }
  if (guard > 6) { return '…'; }
  if (v.k === 'arr') { return v.items.map(function (x) { return valToJs(x, objs, guard + 1); }); }
  if (v.k === 'map') { var o = {}; Object.keys(v.m).forEach(function (k) { o[k] = valToJs(v.m[k], objs, guard + 1); }); return o; }
  if (v.k === 'set') { return Object.keys(v.s); }
  if (v.k === 'ptr') {
    var ob = objs[v.id];
    if (!ob) { return null; }
    if (ob.type === 'TreeNode') { return treeToArr(v, objs); }
    var out = [], id = v.id, seen = {}, g = 0;
    while (id && g++ < 400) {
      if (seen[id]) { out.push('~环'); break; }
      seen[id] = 1;
      var o2 = objs[id];
      if (!o2) { break; }
      out.push(o2.fields && o2.fields.val ? o2.fields.val.v : null);
      var nx = o2.fields ? o2.fields.next : null;
      id = (nx && nx.k === 'ptr') ? nx.id : null;
    }
    return out;
  }
  return null;
}
function serializeValue(v, heap) {
  if (!v) { return 'null'; }
  var js = valToJs(v, heap || {}, 0);
  if (js === null) { return 'null'; }
  if (typeof js === 'number' || typeof js === 'boolean') { return String(js); }
  return JSON.stringify(js);
}
function runCase(codeStr, paramsStr, by, wantName) {
  var t0 = Date.now();
  var r;
  try { r = analyze(codeStr, paramsStr, wantName); }
  catch (e) { return { ok: false, err: e, ms: Date.now() - t0, out: '' }; }
  var env = r.finalEnv || {};
  var heap = r.finalHeap || {};
  var val;
  if (by === 'head') { val = env.head; }
  else if (by && by.indexOf('var:') === 0) { val = env[by.slice(4)]; }
  else { val = r.result ? r.result.v : null; }
  var out = serializeValue(val, heap);
  return { ok: !r.error, err: r.error, out: out, ms: Date.now() - t0, steps: r.steps.length };
}

var TIPS = [
  { re: /空指针|nullptr/, msg: '解引用前先判空：while (cur != nullptr) 或 if (p == nullptr) return;。' },
  { re: /步数|死循环|超过/, msg: '循环里的指针没有前进：检查是不是漏了 cur = cur->next，或把赋值写进了某个分支里。' },
  { re: /还没声明/, msg: '变量名拼错或忘了声明，注意大小写。' },
  { re: /下标越界/, msg: '下标先判范围：循环条件写 i < nums.size()，访问前确认数组非空。' },
  { re: /递归太深|调用次数过多/, msg: '递归出口没兜住：确认空节点 / 边界情形会直接 return，而不是继续往下递归。' },
  { re: /没有这个函数/, msg: '函数名拼错了，或者 helper 还没定义；内置解释器支持自定义函数和递归。' },
  { re: /缺少|语法|不认识|暂不支持/, msg: '这句写法解释器还不认：换成等价的基础写法，或切到在线编译用真实 g++。' },
  { re: /没有字段/, msg: '访问了结构体里不存在的字段，检查是 ->next 还是 ->left。' }
];
function whyOf(err) {
  var msg = (err && (err.message || err.msg)) || '';
  for (var i = 0; i < TIPS.length; i++) { if (TIPS[i].re.test(msg)) { return TIPS[i].msg; } }
  return '';
}

function parseArr(s) {
  if (typeof s !== 'string' || s.charAt(0) !== '[') { return null; }
  var inner = s.slice(1, -1);
  if (!inner) { return []; }
  return inner.split(',');
}
function adviceFor(want, got) {
  if (got === 'null') { return '你返回了 nullptr：检查最后是不是返回了旧头，或者空链表时没兜住。'; }
  var w = parseArr(want), g = parseArr(got);
  if (w && g) {
    if (g.length < w.length) { return '结果比期望短：可能有节点没接上，检查 tail 是否每轮前移、最后有没有接上剩下那一段。'; }
    if (g.length > w.length) { return '结果比期望长：可能把同一个节点接了两次，形成了多余的链接。'; }
    if (w.slice().sort().join(',') === g.slice().sort().join(',')) { return '元素都对，但顺序不对：反转/交换时指针的赋值方向反了。'; }
    if (w.join(',') === g.slice().reverse().join(',')) { return '结果正好是倒着的：返回值或接链的方向搞反了。'; }
  }
  return '先盯第一个用例：你的输出和期望从哪一位开始不一样，那里就是断点。';
}
function trimmed(s) { return s.length > 120 ? s.slice(0, 117) + '…' : s; }

function setBusy(b) {
  BUSY = b;
  $('btnRun').disabled = b;
  $('btnSubmit').disabled = b;
  $('btnRun').textContent = b ? '编译中…' : '运行自测';
  $('btnSubmit').textContent = b ? '请稍候' : '提交判题';
}
function doRun(mode) {
  if (!CUR || BUSY) { return; }
  STRESS = null;
  if (mode === 'submit') {
    var ck = ST.checks[CUR.id] || {}, n = 0;
    Object.keys(ck).forEach(function (k) { if (ck[k]) { n++; } });
    if (n < 4) { toast('自检清单还有没勾的项，先看一眼再交'); }
  }
  if (currentEngine(CUR) === 'online') { doRunOnline(mode); }
  else { doRunInterp(mode); }
}

function sigTypes(p) {
  var s = String(p.sig || '');
  var i = s.indexOf('(');
  if (i < 0) { return []; }
  var inner = s.slice(i + 1, s.lastIndexOf(')'));
  var out = [], depth = 0, cur = '';
  for (var k = 0; k < inner.length; k++) {
    var ch = inner.charAt(k);
    if (ch === '<') { depth++; }
    if (ch === '>') { depth--; }
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) { out.push(cur.trim()); }
  return out.map(function (t) {
    var ty = t.replace(/\b[A-Za-z_][A-Za-z0-9_]*$/, '').trim();
    return ty.replace(/\s+/g, '');
  });
}
function randTree() {
  var n = 1 + Math.floor(Math.random() * 6);
  var arr = [Math.floor(Math.random() * 9) + 1];
  for (var i = 1; i < n; i++) {
    arr.push(Math.random() < 0.25 ? null : Math.floor(Math.random() * 9) + 1);
  }
  return JSON.stringify(arr);
}
function genParams(p) {
  var tpl = p.params[0];
  var toks = tpl.split('|').map(function (s) { return s.trim(); });
  var types = sigTypes(p);
  var lastLen = 3;
  return toks.map(function (t, i) {
    var ty = types[i] || '';
    if (/ListNode\*|Node\*/.test(ty)) {
      var old = [];
      try { old = JSON.parse(t); } catch (e) { old = [1, 2, 3]; }
      var sorted = old.every(function (v, j) { return j === 0 || old[j - 1] <= v; });
      var len = 1 + Math.floor(Math.random() * 6), arr = [];
      for (var k = 0; k < len; k++) { arr.push(Math.floor(Math.random() * 9) + (sorted ? 0 : -3)); }
      if (sorted) { arr.sort(function (a, b) { return a - b; }); }
      lastLen = arr.length;
      return JSON.stringify(arr);
    }
    if (/TreeNode\*/.test(ty)) { return randTree(); }
    if (/vector<vector/.test(ty)) {
      var rows = 1 + Math.floor(Math.random() * 3), out = [];
      for (var r = 0; r < rows; r++) {
        var row = [], cn = 1 + Math.floor(Math.random() * 3);
        for (var c = 0; c < cn; c++) { row.push(Math.floor(Math.random() * 7) + 1); }
        out.push(row);
      }
      return JSON.stringify(out);
    }
    if (/vector|\[\]/.test(ty) || t.charAt(0) === '[') {
      var old2 = [];
      try { old2 = JSON.parse(t); } catch (e) { old2 = [1, 2, 3]; }
      var sorted2 = old2.every(function (v, j) { return j === 0 || old2[j - 1] <= v; });
      var len2 = 1 + Math.floor(Math.random() * 7), arr2 = [];
      for (var k2 = 0; k2 < len2; k2++) { arr2.push(Math.floor(Math.random() * 13) - 4); }
      if (sorted2) { arr2.sort(function (a, b) { return a - b; }); }
      lastLen = arr2.length;
      return JSON.stringify(arr2);
    }
    if (/string|char/.test(ty)) {
      var base = t.replace(/^"|"$/g, '') || 'abc';
      var pool = base.split('');
      var ln = 1 + Math.floor(Math.random() * 8), s = '';
      for (var q = 0; q < ln; q++) { s += pool[Math.floor(Math.random() * pool.length)]; }
      return JSON.stringify(s);
    }
    if (/bool/.test(ty)) { return Math.random() < 0.5 ? 'true' : 'false'; }
    var n0 = parseInt(t, 10);
    if (isNaN(n0)) { return t; }
    return String(Math.floor(Math.random() * (lastLen + 3)) - 1);
  }).join(' | ');
}
function runStress() {
  var p = CUR, code = ta.value, bad = [], skipped = 0, i;
  if (currentEngine(p) !== 'interp') { toast('随机对拍只支持内置解释器的题'); return; }
  saveDraft();
  for (i = 0; i < 20; i++) {
    var cs = genParams(p);
    var want = runCase(p.ref.join('\n'), cs, p.by, p.fn);
    if (!want.ok) { skipped++; continue; }
    var got = runCase(code, cs, p.by, p.fn);
    if (!got.ok) {
      bad.push({ in: cs, want: want.out, got: '运行出错：' + ((got.err && (got.err.message || got.err.msg)) || ''), err: got.err });
    } else if (got.out !== want.out) {
      bad.push({ in: cs, want: want.out, got: got.out });
    }
  }
  STRESS = { n: 20, tried: 20 - skipped, bad: bad, cfgBad: skipped >= 20 };
  renderPane();
}
function stressBlock() {
  if (!STRESS) { return ''; }
  var s = STRESS;
  if (s.cfgBad) {
    return '<div class="case bad"><div class="caseTop"><span>随机对拍</span><span class="s wa">配置异常</span></div>' +
      '<div class="kv">题目参考实现跑不通随机用例，先按固定用例判题。</div></div>';
  }
  var head = '<div class="case ' + (s.bad.length ? 'bad' : 'good') + '"><div class="caseTop">' +
    '<span>随机对拍 ' + s.tried + ' 组</span><span class="s ' + (s.bad.length ? 'wa' : 'ac') + '">' +
    (s.bad.length ? s.bad.length + ' 组不一致' : '全部一致') + '</span></div>';
  if (!s.bad.length) {
    return head + '<div class="kv">随机长度和数值都对上了，边界基本稳。</div></div>';
  }
  var rows = s.bad.slice(0, 3).map(function (b) {
    return '<div class="kv"><b>输入</b> <span class="exp">' + escHtml(b.in) + '</span></div>' +
      '<div class="kv"><b>期望</b> <span class="exp">' + escHtml(trimmed(b.want)) + '</span></div>' +
      '<div class="kv"><b>你的</b> <span class="got">' + escHtml(trimmed(b.got)) + '</span></div>';
  }).join('<div class="kv" style="opacity:.4">·</div>');
  return head + rows + (s.bad.length > 3 ? '<div class="kv">还有 ' + (s.bad.length - 3) + ' 组没列出。</div>' : '') + '</div>';
}

function doRunInterp(mode) {
  var code = ta.value, p = CUR, prev = ST.lastCode[p.id];
  saveDraft();
  var list = mode === 'submit' ? p.params : p.params.slice(0, 1);
  var cases = [], fail = null, badCode = null;
  var t0 = Date.now();
  list.forEach(function (cs, i) {
    var want = runCase(p.ref.join('\n'), cs, p.by, p.fn);
    var got = runCase(code, cs, p.by, p.fn);
    if (!want.ok) { badCode = { type: 'ref', msg: '题目配置异常：参考实现跑不通这个用例。' }; }
    var st = !got.ok ? 're' : (want.ok && got.out === want.out ? 'ac' : 'wa');
    var c = { i: i, inStr: cs, want: want.out, got: got.out, st: st, err: got.err };
    cases.push(c);
    if (!fail && st !== 'ac') { fail = c; }
  });
  var ms = Date.now() - t0, verdict;
  if (badCode || !cases.length) { verdict = 're'; }
  else if (cases.every(function (c) { return c.st === 'ac'; })) { verdict = 'ac'; }
  else if (cases.some(function (c) { return c.st === 're'; })) { verdict = 're'; }
  else { verdict = 'wa'; }

  LAST = { mode: mode, engine: 'interp', verdict: verdict, cases: cases, ms: ms, badCode: badCode, fail: fail, prevCode: prev };
  if (mode === 'submit') { recordSubmit(p, verdict, fail); }
  TAB = 'result';
  renderTab(); renderPane();
}

function classifyErr(msg) {
  var m = String(msg || '');
  if (/空指针|nullptr/.test(m)) { return '空指针解引用'; }
  if (/下标越界/.test(m)) { return '数组越界'; }
  if (/递归太深|调用次数过多/.test(m)) { return '递归没出口'; }
  if (/没有这个函数|没有方法|没有字段/.test(m)) { return '名字写错'; }
  if (/步数|死循环|超过/.test(m)) { return '循环不终止'; }
  if (/还没声明|没有字段|不认识|暂不支持|缺少/.test(m)) { return '语法 / 能力边界'; }
  if (/编译/.test(m)) { return '编译错误'; }
  if (/连接|网络|超时/.test(m)) { return '网络 / 编译器'; }
  if (/答案不对|用例/.test(m)) { return '返回值不对'; }
  return '其它';
}
function recordSubmit(p, verdict, fail) {
  ST.tries[p.id] = (ST.tries[p.id] || 0) + 1;
  if (verdict === 'ac') {
    if (!ST.ac[p.id]) { ST.ac[p.id] = Date.now(); }
    checkAchievements();
    ST.days[TODAY] = 1;
    scheduleReview(p.id, true);
    var mm = modProg(p.mod);
    if (modDone(p.mod)) { toast('『' + MODULES[modIndex(p.mod)].name + '』全部通过，下一模块已解锁'); }
    else { toast('通过 ' + (LAST.cases.length) + '/' + (LAST.cases.length) + '　·　' + MODULES[modIndex(p.mod)].name + ' ' + mm.done + '/' + mm.total); }
  } else {
    scheduleReview(p.id, false);
    var why = '运行出错';
    if (fail) {
      if (fail.st === 're') { why = fail.err ? (fail.err.message || fail.err.msg) : '运行出错'; }
      else if (fail.st === 'ce') { why = '编译失败：' + (fail.ce || '').split('\n')[0]; }
      else if (fail.st === 'wa') { why = '第 ' + (fail.i + 1) + ' 个用例答案不对'; }
      else if (fail.st === 'net') { why = '在线编译器连接失败'; }
    }
    var cat = classifyErr(why);
    ST.errTypes = ST.errTypes || {};
    ST.errTypes[cat] = (ST.errTypes[cat] || 0) + 1;
    ST.errs.unshift({ t: Date.now(), pid: p.id, msg: why, c: fail ? fail.inStr : '', why: (fail && fail.st === 're') ? whyOf(fail.err) : '', cat: cat });
    if (ST.errs.length > 40) { ST.errs.length = 40; }
    toast(verdict === 'ac' ? '' : (verdict === 'ce' ? '编译没通过，看命令行报错' : (verdict === 'net' ? '编译器连不上，稍后重试或切回内置解释器' : '没过，看右侧对比')));
  }
  ST.lastCode[p.id] = ta.value;
  save();
  renderRail();
  renderHead();
}

/* ---------- 在线编译（Wandbox，真实 g++） ---------- */
var WB_URL = 'https://wandbox.org/api/compile.json';
function wbRun(code, stdin) {
  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 12000) : 0;
  return fetch(WB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compiler: 'gcc-head', code: code, stdin: stdin || '' }),
    signal: ctrl ? ctrl.signal : undefined
  }).then(function (r) {
    clearTimeout(timer);
    if (!r.ok) { throw new Error('HTTP ' + r.status); }
    return r.json();
  }).catch(function (e) {
    clearTimeout(timer);
    throw new Error(e && e.name === 'AbortError' ? '编译器 12 秒没有响应' : ((e && e.message) || '网络不通'));
  });
}
function wbOnce(code, stdin) {
  return wbRun(code, stdin).then(function (res) {
    if (!res || typeof res !== 'object') { throw new Error('编译器返回异常'); }
    return res;
  }).catch(function (e) {
    return new Promise(function (ok) { setTimeout(ok, 800); }).then(function () { return wbRun(code, stdin); });
  });
}
function normOut(s) {
  return String(s || '').replace(/\r/g, '').split('\n').map(function (l) { return l.replace(/\s+$/, ''); }).join('\n').replace(/\n+$/, '');
}
var WB_CACHE = {};
function doRunOnline(mode, force) {
  var p = CUR, code = ta.value, prev = ST.lastCode[p.id];
  saveDraft();
  var custom = ($('stdinBox').value || '').trim();
  var ck = p.id + '|' + mode + '|' + custom + '|' + code;
  var ent = (!force && WB_CACHE[ck] && (Date.now() - WB_CACHE[ck].t < 600000)) ? WB_CACHE[ck] : null;
  if (ent) {
    LAST = { mode: mode, engine: 'online', verdict: ent.verdict, cases: ent.cases, ms: ent.ms, fail: ent.fail, prevCode: prev, cached: true };
    TAB = 'result'; renderTab(); renderPane();
    toast('相同代码 10 分钟内的结果，点「重新编译」可强制重跑');
    return;
  }
  var list = custom ? [{ in: custom, out: null }] : (mode === 'submit' ? (p.cases || []) : (p.cases || []).slice(0, 1));
  if (!list.length) { list = [{ in: '', out: null }]; }

  if (!/main\s*\(/.test(code) && (p.cases || []).length) {
    toast('这题要提交完整程序（含 main 读入），模板里已经写好了');
  }
  setBusy(true);
  var t0 = Date.now(), results = [], i = 0;

  function step() {
    if (i >= list.length) { finish(); return; }
    var cs = list[i];
    wbOnce(code, cs.in).then(function (res) {
      var ce = normOut(res.compiler_error || ''), pe = normOut(res.program_error || ''), out = normOut(res.program_output || '');
      var st = ce ? 'ce' : (pe ? 're' : (cs.out === null ? 'run' : (out === normOut(cs.out) ? 'ac' : 'wa')));
      results.push({ i: i, inStr: cs.in, want: cs.out, got: out, st: st, ce: ce, pe: pe });
      i++;
      if (st === 'ce' || st === 're') { finish(); } else { step(); }
    }).catch(function (e) {
      results.push({ i: i, inStr: cs.in, st: 'net', err: e.message });
      finish();
    });
  }
  function finish() {
    setBusy(false);
    renderEngine();
    var ms = Date.now() - t0, verdict, fail = null;
    results.forEach(function (c) { if (!fail && c.st !== 'ac') { fail = c; } });
    if (results.some(function (c) { return c.st === 'ce'; })) { verdict = 'ce'; }
    else if (results.some(function (c) { return c.st === 'net'; })) { verdict = 'net'; }
    else if (results.some(function (c) { return c.st === 're'; })) { verdict = 're'; }
    else if (results.every(function (c) { return c.st === 'run'; })) { verdict = 'run'; }
    else if (results.every(function (c) { return c.st === 'ac'; })) { verdict = 'ac'; }
    else { verdict = 'wa'; }
    LAST = { mode: mode, engine: 'online', verdict: verdict, cases: results, ms: ms, fail: fail, prevCode: prev };
    WB_CACHE[ck] = { t: Date.now(), verdict: verdict, cases: results, ms: ms, fail: fail };
    var ks = Object.keys(WB_CACHE);
    if (ks.length > 8) { ks.slice(0, ks.length - 8).forEach(function (k) { delete WB_CACHE[k]; }); }
    if (mode === 'submit') { recordSubmit(p, verdict, fail); }
    TAB = 'result';
    renderTab(); renderPane();
  }
  step();
}

/* 自评题标记通过 */
function markSelf() {
  if (!CUR) { return; }
  ST.tries[CUR.id] = (ST.tries[CUR.id] || 0) + 1;
  ST.ac[CUR.id] = Date.now();
  ST.days[TODAY] = 1;
  save();
  renderHead();
  renderRail();
  toast('已标记通过：' + CUR.title);
  renderPane();
}

/* ==================================================================
   右侧面板
   ================================================================== */

/* 4. 测试台快捷填充与样例支持 */
function setupTestbench() {
  var b1 = $('tbSample1Btn');
  if (b1) {
    b1.addEventListener('click', function() {
      if (CUR && CUR.ex && CUR.ex[0]) {
        $('stdinBox').value = CUR.ex[0].i;
        toast('已填入样例 1: ' + CUR.ex[0].i);
      }
    });
  }
  var b2 = $('tbSample2Btn');
  if (b2) {
    b2.addEventListener('click', function() {
      if (CUR && CUR.ex && CUR.ex[1]) {
        $('stdinBox').value = CUR.ex[1].i;
        toast('已填入样例 2: ' + CUR.ex[1].i);
      } else {
        toast('本题没有第二组示例');
      }
    });
  }
  var br = $('tbRandBtn');
  if (br) {
    br.addEventListener('click', function() {
      if (CUR) {
        var r = genParams(CUR);
        $('stdinBox').value = r;
        toast('已根据题目参数生成随机测试数据');
      }
    });
  }
  var bc = $('tbClearBtn');
  if (bc) {
    bc.addEventListener('click', function() {
      $('stdinBox').value = '';
      toast('测试输入已清空，将运行默认用例');
    });
  }
}