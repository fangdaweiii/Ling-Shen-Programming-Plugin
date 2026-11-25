/* ai.js - AI 算法助教系统 */
var AI_CFG_DEF = {
  mode: 'local',            /* local | api */
  preset: 'openai',
  url: 'https://api.openai.com/v1',
  key: '',
  model: 'gpt-4o-mini',
  ctx: true
};
var AI_PRESETS = {
  openai: { url: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
  deepseek: { url: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  ark: { url: 'https://ark.cn-beijing.volces.com/api/v3', model: 'deepseek-v4-1-flash-261017' },
  custom: { url: '', model: '' }
};
var AI_BUSY = false;

function aiCfg() {
  if (!ST.ai) { ST.ai = { cfg: JSON.parse(JSON.stringify(AI_CFG_DEF)), chats: {} }; }
  if (!ST.ai.cfg) { ST.ai.cfg = JSON.parse(JSON.stringify(AI_CFG_DEF)); }
  if (!ST.ai.chats) { ST.ai.chats = {}; }
  var c = ST.ai.cfg;
  Object.keys(AI_CFG_DEF).forEach(function (k) { if (!(k in c)) { c[k] = AI_CFG_DEF[k]; } });
  return c;
}
function aiChats(pid) {
  var A = ST.ai;
  if (!A.chats) { A.chats = {}; }
  if (!A.chats[pid]) { A.chats[pid] = []; }
  return A.chats[pid];
}
function aiPush(pid, role, content, isHtml) {
  if (!pid) { return null; }
  var list = aiChats(pid);
  var m = { r: role, t: content, h: !!isHtml };
  list.push(m);
  if (list.length > 60) { list.splice(0, list.length - 60); }
  save();
  return m;
}

/* ---------- 小工具 ---------- */
function aiEsc(s) { return escHtml(String(s == null ? '' : s)); }
function aiCode(t) { return '<pre class="aiCode">' + aiEsc(t) + '</pre>'; }
function aiP(t) { return '<p class="aiP">' + aiEsc(t) + '</p>'; }
function aiTag(t) { return '<div class="aiTagline">' + aiEsc(t) + '</div>'; }
function aiPlain(html) {
  return String(html).replace(/<pre class="aiCode">([\s\S]*?)<\/pre>/g, function (_, c) {
    return c.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  }).replace(/<\/p>|<br>/g, '\n').replace(/<[^>]+>/g, '');
}
/* 轻量 markdown：围栏代码 + 行内 code + 粗体 + 换行 */
function aiMd(s) {
  var out = aiEsc(s);
  var fences = [];
  out = out.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, function (_, c) {
    fences.push(c.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));
    return '\u0000F' + (fences.length - 1) + '\u0000';
  });
  out = out.replace(/`([^`\n]+)`/g, '<code class="aiInline">$1</code>');
  out = out.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
  out = out.replace(/\n/g, '<br>');
  out = out.replace(/\u0000F(\d+)\u0000/g, function (_, i) {
    return '<pre class="aiCode">' + aiEsc(fences[+i]) + '</pre>';
  });
  return '<div class="aiP">' + out + '</div>';
}

/* ---------- 上下文 ---------- */
function aiLastSummary() {
  if (!LAST || !LAST.cases) { return ''; }
  var bad = LAST.fail;
  var s = LAST.verdict === 'ac' ? '全部用例通过' :
    (bad ? ('用例 ' + (bad.i + 1) + ' 未通过（' + bad.st.toUpperCase() + '）：输入 ' + bad.inStr +
      '，期望 ' + bad.want + '，实际 ' + bad.got + (bad.err ? '，报错 ' + (bad.err.msg || bad.err.message || '') : '') ) : '暂无结果');
  return s;
}

/* ---------- 本地助教 ---------- */
var AI_CONCEPTS = [
  { re: /指针|引用|&|区别/, q: '指针和引用有什么区别', a: '指针是变量，存地址，可以为空、可以改指向，用 `->` 取成员，用 `*p` 取值；引用是别名，一旦绑定不能换目标，也不能为空。刷题里"返回 ListNode*"这种就是指针，参数写 `ListNode*&` 才是"可以改调用方指针"的引用。' },
  { re: /->|箭头|点号/, q: '-> 和 . 怎么用', a: '`p->next` 等于 `(*p).next`：p 是指针时用 `->`；对象本身（比如 `ListNode node;`）用 `node.next`。写成 `p.next` 会报"不是指针"或"没有字段"。' },
  { re: /nullptr|空指针|NULL|判空/, q: 'nullptr 注意什么', a: '任何 `cur->next = ...` 之前都要确认 cur 不是空；循环条件写 `while (cur != nullptr)`，别写 `while (cur->next)` 当心空表进不去。返回空表的题直接 `return nullptr`。' },
  { re: /哑节点|dummy|哨兵/, q: '哑节点什么时候用', a: '只要可能改动头节点（删除、合并、区间反转），就先建 `ListNode* dummy = new ListNode(0); dummy->next = head;`，操作完 `return dummy->next`。好处是不用为"删的是头"单独写分支。' },
  { re: /快慢|slow|fast|中点|环/, q: '快慢指针原理', a: 'slow 每次 1 步、fast 每次 2 步。fast 到尾时 slow 正好在中点（偶数个节点时停在前半最后一个）；如果有环，两者必在环内相遇。' },
  { re: /递归|迭代|区别/, q: '递归和迭代怎么选', a: '链表题能用迭代就别递归：迭代 O(1) 空间、不用想边界返回；递归好在写起来短（反转、合并、树的深度），但要考虑栈深度。本页内置解释器现在支持递归和自定义函数，树题可以直接离线判。' },
  { re: /复杂度|O\(|时间|空间/, q: '复杂度怎么估', a: '看指针走了几遍链表：一遍 O(n)、嵌套两遍 O(n²)；只用了几个指针变量就是 O(1) 额外空间，新建了链表/数组/递归栈就不是。' },
  { re: /头节点|head|返回/, q: '返回什么', a: '题目要求"返回新链表头"就返回真正的新头（比如反转后的 prev、合并后的 dummy->next）；`head` 往往已经变成尾节点，返回它是常见 WA 原因。' }
];

function aiConceptHit(q) {
  for (var i = 0; i < AI_CONCEPTS.length; i++) {
    if (AI_CONCEPTS[i].re.test(q)) { return AI_CONCEPTS[i]; }
  }
  return null;
}

function aiLocalAnswer(q, p0, code0) {
  var p = p0 || CUR;
  if (!p) { return { html: aiP('先在学习路线里选一道题，我就能贴着这道题回答。') }; }
  var t = String(q || '').trim();
  var code = code0 != null ? code0 : ta.value;
  var low = t.toLowerCase();
  var h = [];

  /* 1. 直接要答案 / 题解 */
  if (/答案|题解|完整代码|参考代码|怎么写|给我代码/.test(t) && !/不要答案|别给答案/.test(t)) {
    h.push(aiTag('参考实现 · ' + p.sig));
    h.push(aiCode(p.ref.join('\n')));
    h.push(aiP(p.note));
    if (p.complexity) { h.push(aiP(p.complexity)); }
    h.push(aiP('建议先按自己的思路写一遍再对答案；打开「逐行演示」可以看到这段代码每一步指针怎么动。'));
    return { html: h.join('') };
  }

  /* 2. 要提示 */
  if (/提示|hint|下一步|卡住|没思路|怎么想|思路|不会/.test(t)) {
    var n = Math.min((ST.hints[p.id] || 0) + 1, p.hints.length);
    ST.hints[p.id] = n; save();
    h.push(aiTag('第 ' + n + ' / ' + p.hints.length + ' 条提示'));
    h.push(aiP(p.hints[n - 1]));
    if (n < p.hints.length) {
      h.push(aiP('还不够的话，再说一句“再来一条提示”，或者直接问“我的代码错在哪”。'));
    } else {
      h.push(aiP('提示已经给完了。要不要我直接讲参考实现？'));
    }
    return { html: h.join('') };
  }

  /* 3. 看代码 / 为什么不对 */
  if (/代码|错|不对|为什么|调试|看看|跑|wa|re|ac|报错|失败/.test(low)) {
    return { html: aiCheckCode(p, code) };
  }

  /* 4. 复杂度 / 坑 / 例子 */
  if (/复杂度|时间|空间/.test(t)) {
    h.push(aiTag('复杂度'));
    h.push(aiP(p.complexity || '这道题按常规解法是 O(n) 时间。'));
    h.push(aiP('判断方法：指针/节点被访问一遍是 O(n)，两重循环才是 O(n²)；额外只开常数个指针就是 O(1) 空间。'));
    return { html: h.join('') };
  }
  if (/坑|注意|边界|容易|踩/.test(t)) {
    h.push(aiTag('这道题的常见坑'));
    p.pitfalls.forEach(function (x) { h.push('<div class="aiLi">· ' + aiEsc(x) + '</div>'); });
    return { html: h.join('') };
  }
  if (/例子|示例|输入|用例/.test(t)) {
    h.push(aiTag('示例走一遍'));
    p.ex.forEach(function (e, i) {
      h.push('<div class="aiLi"><b>例 ' + (i + 1) + '</b>　输入 ' + '<code class="aiInline">' + aiEsc(e.i) + '</code> → 输出 <code class="aiInline">' + aiEsc(e.o) + '</code></div>');
    });
    h.push(aiP('第一组示例就是"运行自测"默认跑的那组，可以边改边看。'));
    return { html: h.join('') };
  }

  /* 5. 概念问答 */
  var cc = aiConceptHit(t);
  if (cc) {
    return { html: aiTag(cc.q) + aiMd(cc.a) };
  }

  /* 6. 今天做什么 */
  if (/今天|下一题|接下来|进度|学什么/.test(t)) {
    var np = nextProblem();
    h.push(aiTag('学习进度'));
    if (np) {
      h.push(aiP('当前模块：' + MODULES[modIndex(np.mod)].name + '（第 ' + np.idx + ' 题还没过）。今天的题是「' + np.title + '」，' + np.lc + '，难度 ' + np.diff + '。'));
      h.push(aiP('做完这题会进到「' + (neighborOf(np, 1) ? neighborOf(np, 1).title : '下一个模块') + '」。'));
    } else {
      h.push(aiP('题库里能判的题都过了，去错题本按 1/3/7 天回炉一下。'));
    }
    h.push(aiP('累计通过 ' + solvedCount() + ' / ' + PROBLEMS.length + ' 题。'));
    return { html: h.join('') };
  }

  /* 7. 兜底 */
  return { html: aiFallback(p) };
}

function aiFallback(p) {
  var h = [];
  h.push(aiTag('我可以贴着这道题回答'));
  h.push('<div class="aiLi">· <b>这题怎么想</b>：按顺序给提示，不直接甩答案</div>');
  h.push('<div class="aiLi">· <b>我的代码错在哪</b>：用内置判题跑一遍，指出哪组用例、差在哪</div>');
  h.push('<div class="aiLi">· <b>讲复杂度 / 常见坑 / 过一遍示例</b>：直接说这道题的</div>');
  h.push('<div class="aiLi">· <b>概念</b>：指针和引用、<code class="aiInline">-&gt;</code> 和点号、哑节点、快慢指针…</div>');
  h.push(aiP('也可以直接说人话，比如「我卡在循环退出条件了」。'));
  h.push(aiP('想要更自由的问答，点右上角齿轮填一个模型 API Key，就切成真模型对话。'));
  return h.join('');
}

/* 真跑一次代码，给出可操作的诊断 */
function aiCheckCode(p, code) {
  var h = [];
  if (!code || /\/\/ 你的代码/.test(code) || code.trim() === p.template.trim()) {
    h.push(aiTag('这题还没开始写'));
    h.push(aiP('编辑器里现在还是模板。先按第一条提示动手：'));
    h.push(aiP(p.hints[0]));
    return h.join('');
  }
  var cs = p.params[0];
  var got = runCase(code, cs, p.by);
  var want = runCase(p.ref.join('\n'), cs, p.by);
  if (!got.ok) {
    var em = (got.err && (got.err.msg || got.err.message)) || '执行中断';
    h.push(aiTag('第一个用例就中断了'));
    h.push('<div class="aiLi">输入 <code class="aiInline">' + aiEsc(cs) + '</code></div>');
    h.push('<div class="aiLi">报错：<span class="aiErr">' + aiEsc(em) + '</span></div>');
    if (got.err && got.err.line) { h.push('<div class="aiLi">第 ' + got.err.line + ' 行</div>'); }
    var why = (typeof whyOf === 'function') ? whyOf(got.err) : '';
    if (why) { h.push(aiP('怎么改：' + why)); }
    if (/暂不支持|还没实现|priority_queue/.test(em)) {
      h.push(aiP('这句写法内置解释器还不认（例如堆 priority_queue）：切「在线编译」用真 g++ 跑，或换成等价的基础写法。'));
    }
    return h.join('');
  }
  if (want.ok && got.out !== want.out) {
    h.push(aiTag('结果不对（第一个用例）'));
    h.push('<div class="aiLi">输入 <code class="aiInline">' + aiEsc(cs) + '</code></div>');
    h.push('<div class="aiLi">期望 <span class="aiOk">' + aiEsc(want.out) + '</span>，你返回 <span class="aiErr">' + aiEsc(got.out) + '</span></div>');
    h.push(aiP('按这个顺序查：'));
    p.pitfalls.slice(0, 2).forEach(function (x, i) {
      h.push('<div class="aiLi">' + (i + 1) + '. ' + aiEsc(x) + '</div>');
    });
    h.push(aiP('想看清指针在哪一步走偏，点「逐行演示」，一步步看 cur / prev 的指向。'));
    return h.join('');
  }
  h.push(aiTag('第一个用例通过了'));
  h.push(aiP('输入 ' + cs + ' → ' + got.out + '，和期望一致。' + (p.params.length > 1 ? '但提交会跑全部 ' + p.params.length + ' 组用例，边界情况还没验证。' : '')));
  if (p.pitfalls[0]) { h.push(aiP('提交前瞄一眼最常见的坑：' + p.pitfalls[0])); }
  h.push(aiP('可以直接点「提交判题」，或者先按 Alt+→ 看下一题。'));
  return h.join('');
}

/* ---------- 远端模型 ---------- */
function aiSystemPrompt(p, code0, last) {
  var ctx = '正在练习的题目：' + p.title + '（' + p.lc + '，模块 ' + MODULES[modIndex(p.mod)].name + '，第 ' + p.idx + ' 题）\n' +
    '题意：' + p.brief + '\n输入输出：' + p.ioIn + ' / ' + p.ioOut + '\n' +
    '示例：' + p.ex.map(function (e) { return e.i + ' -> ' + e.o; }).join('　') + '\n' +
    '函数签名：' + p.sig + '\n' +
    '官方提示（由浅入深）：' + p.hints.join(' | ') + '\n' +
    '参考实现：\n' + p.ref.join('\n') + '\n' +
    '讲解：' + p.note + '\n复杂度：' + p.complexity + '\n常见坑：' + p.pitfalls.join(' | ');
  var code = aiCfg().ctx ? (code0 || '') : '';
  var extra = code ? ('\n\n学习者当前代码（C++）：\n' + code) : '';
  last = aiCfg().ctx ? (last || '') : '';
  if (last) { extra += '\n最近一次运行结果：' + last; }
  return '你是「算法训练台」里的 C++ 算法助教，学生是算法新手。' + ctx + extra +
    '\n\n回答要求：中文；先给可执行的下一步，再解释原因；默认只给提示和方向，除非学生明确要完整代码；' +
    '解释代码时指出具体行；不确定的地方直说。总长度控制在 200 字以内，除非要贴代码。';
}
function aiHistory(p) {
  var list = aiChats(p.id).filter(function (m) { return m.r === 'u' || (m.r === 'a' && !m.err); });
  var last = list.slice(-6);
  return last.map(function (m) {
    return { role: m.r === 'u' ? 'user' : 'assistant', content: m.h ? aiPlain(m.t) : m.t };
  });
}
function aiEndpoints() {
  var c = aiCfg();
  var base = (c.url || '').replace(/\/+$/, '');
  if (!/\/chat\/completions$/.test(base)) { base += '/chat/completions'; }
  return base;
}
function aiApiErrorText(status, body) {
  var b = String(body || '');
  if (status === 401 || status === 403) { return 'Key 无效或没权限（HTTP ' + status + '）。检查一下 Key 是否复制完整。'; }
  if (status === 404) { return '接口地址不对（HTTP 404）。确认 Base URL 是 .../v1 这种，不含 /chat/completions。'; }
  if (status === 429) { return '请求太频繁或额度用尽（HTTP 429）。等一会儿再试。'; }
  if (b.indexOf('Failed to fetch') >= 0 || b.indexOf('NetworkError') >= 0) { return '请求没发出去：浏览器被 CORS 或网络代理拦住了。'; }
  return '请求失败（HTTP ' + status + '）：' + b.slice(0, 160);
}
async function aiRemoteAsk(q, pid, p, code, lastTxt, onDelta, ctrl) {
  var c = aiCfg();
  if (!c.key) { throw new Error('NO_KEY'); }
  var body = {
    model: c.model,
    stream: true,
    temperature: 0.5,
    messages: [{ role: 'system', content: aiSystemPrompt(p, code, lastTxt) }].concat(aiHistory(pid)).concat([{ role: 'user', content: q }])
  };
  var to = ctrl ? setTimeout(function () { ctrl.__timeout = true; ctrl.abort(); }, 25000) : null;
  var res;
  try {
    res = await fetch(aiEndpoints(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
      body: JSON.stringify(body),
      signal: ctrl ? ctrl.signal : undefined
    });
  } catch (e) {
    if (to) { clearTimeout(to); }
    if (e && e.name === 'AbortError') {
      if (ctrl && ctrl.__userAbort) { throw new Error('已停止生成'); }
      throw new Error('请求超时（25 秒没响应），可能被网络或代理卡住了。');
    }
    throw new Error('请求没发出去：CORS 或网络被拦（' + ((e && e.message) || 'unknown') + '）。');
  }
  if (to) { clearTimeout(to); }
  if (!res.ok) {
    var txt = '';
    try { txt = await res.text(); } catch (e) { txt = ''; }
    throw new Error(aiApiErrorText(res.status, txt));
  }
  var ctype = (res.headers.get('content-type') || '');
  if (!/event-stream/.test(ctype) || !res.body) {
    var data = await res.json();
    var mm = data.choices && data.choices[0] && data.choices[0].message;
    var msg = (mm && (mm.content || mm.reasoning_content)) || '';
    onDelta(msg, true, false);
    return msg;
  }
  var reader = res.body.getReader(), dec = new TextDecoder('utf-8'), buf = '', all = '';
  while (true) {
    var r = await reader.read();
    if (r.done) { break; }
    buf += dec.decode(r.value, { stream: true });
    var lines = buf.split('\n');
    buf = lines.pop();
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i].trim();
      if (!ln || ln.indexOf('data:') !== 0) { continue; }
      var payload = ln.slice(5).trim();
      if (payload === '[DONE]') { continue; }
      try {
        var j = JSON.parse(payload);
        var d = j.choices && j.choices[0] && (j.choices[0].delta || j.choices[0].message);
        if (!d) { continue; }
        if (d.reasoning_content) { if (to) { clearTimeout(to); to = null; } onDelta(d.reasoning_content, false, true); }
        if (d.content) { if (to) { clearTimeout(to); to = null; } all += d.content; onDelta(d.content, false, false); }
      } catch (e) { /* 忽略半包 */ }
    }
  }
  return all;
}

/* ---------- 豆包转发（零配置连真模型） ---------- */
function aiBridgePrompt(q) {
  var p = CUR;
  var code = aiCfg().ctx ? ta.value : '';
  last = aiCfg().ctx ? (last || '') : '';
  var s = '【算法训练台 · 求教】\n' +
    '我正在做「' + p.title + '」（' + p.lc + '，' + MODULES[modIndex(p.mod)].name + ' 第 ' + p.idx + ' 题）。\n' +
    '题意：' + p.brief + '\n' +
    '函数签名：' + p.sig + '\n';
  if (code) { s += '我的代码：\n```cpp\n' + code + '\n```\n'; }
  if (last) { s += '最近结果：' + last + '\n'; }
  s += '我的问题：' + q + '\n\n' +
    '请当我的 C++ 算法助教回答：先给下一步动作，再解释原因；指代码就说到具体行；除非我明确要，否则先别给完整答案。';
  return s;
}
function aiCopyText(text, cb) {
  function fallback() {
    try {
      var t = document.createElement('textarea');
      t.value = text;
      t.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(t);
      t.select();
      var ok = document.execCommand && document.execCommand('copy');
      document.body.removeChild(t);
      cb(!!ok, !ok ? '浏览器不让自动复制，请手动长按选中这段文字' : '');
    } catch (e) { cb(false, '浏览器不让自动复制，请手动选中这段文字'); }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { cb(true); }, function () { fallback(); });
  } else { fallback(); }
}
function aiRunBridge(q, pid, p, code, lastTxt) {
  pid = pid || (CUR && CUR.id);
  var prompt = aiBridgePrompt(q, p, code, lastTxt);
  ST.ai.lastPrompt = prompt;
  aiCfg().mode = 'bridge';
  save();
  var h = '<div class="aiBridgeTag">已打包成提示词 · 去豆包发我</div>' +
    '<pre class="aiCode aiPrompt">' + aiEsc(prompt) + '</pre>' +
    '<div class="aiBridgeBtns">' +
      '<button class="aiMini primary" data-copy="1" type="button">复制提示词</button>' +
      '<button class="aiMini" data-paste="1" type="button">粘回豆包的回答</button>' +
    '</div>' +
    '<div class="aiBridgeHint" id="aiCopyOut">点「复制提示词」→ 打开豆包对话粘贴发送 → 再把我的回答粘回来，这段对话就留在题目里了。</div>';
  aiAppendMsgTo(pid, 'a', h, true, false);
  aiCopyText(prompt, function (ok, why) {
    var out = $('aiCopyOut');
    if (!out) { return; }
    out.innerHTML = ok ? '<span class="aiOk">提示词已复制，去豆包粘贴发送吧。</span>' : aiEsc(why || '复制失败，请手动选中。');
  });
}
function aiPasteReply() {
  var msgs = $('aiMsgs');
  if (!msgs) { return; }
  var old = $('aiPaste');
  if (old) { old.parentNode.removeChild(old); return; }
  var box = document.createElement('div');
  box.id = 'aiPaste';
  box.className = 'aiPaste';
  box.innerHTML = '<div class="aiPasteT">把豆包的回答粘进来（会作为一条 AI 消息存进这道题）</div>' +
    '<textarea id="aiPasteBox" rows="4" placeholder="粘贴回答…"></textarea>' +
    '<div class="aiPasteBtns"><button class="aiMini" id="aiPasteCancel" type="button">取消</button>' +
    '<button class="aiMini primary" id="aiPasteSave" type="button">存进对话</button></div>';
  msgs.parentNode.insertBefore(box, msgs.nextSibling);
  var ta2 = $('aiPasteBox');
  ta2.focus();
  $('aiPasteCancel').addEventListener('click', function () { box.parentNode.removeChild(box); });
  $('aiPasteSave').addEventListener('click', function () {
    var txt = ta2.value.trim();
    if (!txt) { toast('先粘贴点内容'); return; }
    aiAppendMsg('a', txt, false);
    box.parentNode.removeChild(box);
    toast('已存进这道题的对话');
  });
}

/* ---------- 界面 ---------- */
function aiBubble(m, idx) {
  var cls = m.r === 'u' ? 'me' : (m.r === 's' ? 'sys' : 'bot');
  var body = m.h ? m.t : aiMd(m.t);
  if (m.r === 's') {
    return '<div class="aiMsg sys" data-i="' + idx + '"><div class="aiBody">' + aiEsc(m.t) + '</div>' +
      '<div class="aiActs"><button type="button" data-retry="1">重试</button></div></div>';
  }
  return '<div class="aiMsg ' + cls + '" data-i="' + idx + '">' +
    '<div class="aiWho">' + (m.r === 'u' ? '我' : 'AI 助教') + '</div>' +
    '<div class="aiBody">' + body + '</div>' +
    (m.r === 'a' ? '<div class="aiActs"><button type="button" data-copy-ans="1">复制</button>' +
      '<button type="button" data-regen="1">重新生成</button></div>' : '') +
    '</div>';
}
function renderAiPane() {
  var p = CUR;
  if (!p) { $('pane').innerHTML = '<div class="empty">先选一道题。</div>'; return; }
  var c = aiCfg();
  var list = aiChats(p.id).filter(function (m) { return !(m.h && /aiTyping/.test(String(m.t))); });
  var msgs = list.length ? list.map(aiBubble).join('') : '<div class="aiHello">' +
    '<div class="aiHiT">AI 助教 · ' + aiEsc(p.title) + '</div>' +
    '<div class="aiHiP">我看得到这道题的描述、你的代码和最近一次判题结果。不会写就问「这题怎么想」，写完就问「我的代码错在哪」。</div></div>';
  var modeTag = c.mode === 'api' && c.key ? ('<span class="aiChip on">' + aiEsc(c.model || 'API') + '</span>') :
    (c.mode === 'bridge' ? '<span class="aiChip on">豆包 · 复制转发</span>' : '<span class="aiChip">本地助教 · 离线</span>');
  var pane = $('pane');
  pane.className = 'pane aiPane';
  pane.innerHTML =
    '<div class="aiHead">' +
      '<div class="aiHeadL"><span class="aiDot"></span><b>AI 助教</b>' + modeTag + '</div>' +
      '<div class="aiHeadR">' +
        '<button class="aiIcon stop" id="aiStopBtn" type="button" title="停止生成">■</button>' +
        '<button class="aiIcon" id="aiSetBtn" type="button" title="模型设置">⚙</button>' +
        '<button class="aiIcon" id="aiClearBtn" type="button" title="清空这段对话">⟲</button>' +
      '</div>' +
    '</div>' +
    '<div class="aiCtx" id="aiCtx">' +
      '<span class="aiCtxI">已带上：题目 · ' + (c.ctx ? '你的代码 · ' : '') + '最近结果</span>' +
      '<label class="aiCtxSw"><input type="checkbox" id="aiCtxChk"' + (c.ctx ? ' checked' : '') + '>带上代码</label>' +
    '</div>' +
    '<div class="aiMsgs" id="aiMsgs">' + msgs + '</div>' +
    '<div class="aiChips">' +
      '<button class="aiPill" data-q="这题怎么想？" type="button">这题怎么想</button>' +
      '<button class="aiPill" data-q="我的代码错在哪？" type="button">代码错在哪</button>' +
      '<button class="aiPill" data-q="再来一条提示" type="button">再来一条提示</button>' +
      '<button class="aiPill" data-q="讲一下复杂度和常见坑" type="button">复杂度 / 坑</button>' +
      '<button class="aiPill" data-q="过一遍示例" type="button">过一遍示例</button>' +
    '</div>' +
    '<div class="aiInputRow">' +
      '<textarea id="aiInput" rows="2" placeholder="问点什么…（Enter 发送，Shift+Enter 换行）"></textarea>' +
      '<button class="btn primary sm" id="aiSend" type="button">发送</button>' +
    '</div>' +
    '<div class="aiFoot" id="aiFoot"></div>';
  wireAiPane();
  aiScroll();
}
function aiScroll() {
  var m = $('aiMsgs');
  if (m) { m.scrollTop = m.scrollHeight; }
}
function wireAiPane() {
  var input = $('aiInput'), send = $('aiSend');
  if (send) { send.addEventListener('click', function () { aiSendMsg(); }); }
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); aiSendMsg(); }
    });
    setTimeout(function () { input.focus(); }, 60);
  }
  Array.prototype.forEach.call(document.querySelectorAll('#pane .aiPill'), function (b) {
    b.addEventListener('click', function () {
      var q = b.getAttribute('data-q');
      if (q) { aiSendMsg(q); }
    });
  });
  var stopB = $('aiStopBtn');
  if (stopB) {
    stopB.style.display = AI_BUSY ? 'inline-block' : 'none';
    stopB.addEventListener('click', aiStopGen);
  }
  var sb = $('aiSetBtn');
  if (sb) { sb.addEventListener('click', aiToggleSettings); }
  var cb = $('aiClearBtn');
  if (cb) {
    cb.addEventListener('click', function () {
      if (!CUR) { return; }
      aiChats(CUR.id).length = 0; save();
      renderAiPane(); toast('对话已清空');
    });
  }
  var msgsEl = $('aiMsgs');
  if (msgsEl) {
    msgsEl.addEventListener('click', function (e) {
      var cp = e.target.closest('[data-copy]');
      if (cp) {
        var txt = (ST.ai && ST.ai.lastPrompt) || '';
        if (!txt) { toast('这段对话没有可复制的提示词'); return; }
        aiCopyText(txt, function (ok, why) {
          cp.textContent = ok ? '已复制' : '复制失败';
          if (!ok && why) { toast(why); }
          setTimeout(function () { cp.textContent = '复制提示词'; }, 1600);
        });
        return;
      }
      if (e.target.closest('[data-paste]')) { aiPasteReply(); return; }
      var ca = e.target.closest('[data-copy-ans]');
      if (ca) {
        var msg = ca.closest('.aiMsg'), bodyEl = msg && msg.querySelector('.aiBody');
        var txt = bodyEl ? bodyEl.innerText : '';
        aiCopyText(txt, function (ok, why) {
          ca.textContent = ok ? '已复制' : '复制失败';
          if (!ok && why) { toast(why); }
          setTimeout(function () { ca.textContent = '复制'; }, 1500);
        });
        return;
      }
      if (e.target.closest('[data-regen]') || e.target.closest('[data-retry]')) {
        aiRegenFrom(CUR ? CUR.id : (ST.ai && ST.ai.curPid));
        return;
      }
    });
  }
  var chk = $('aiCtxChk');
  if (chk) {
    chk.addEventListener('change', function () {
      aiCfg().ctx = chk.checked; save();
      $('aiCtx').querySelector('.aiCtxI').textContent = '已带上：题目 · ' + (chk.checked ? '你的代码 · ' : '') + '最近结果';
    });
  }
  aiBindSettings();
}

function aiAppendMsgTo(pid, role, content, isHtml, ephemeral) {
  if (!ephemeral) { aiPush(pid, role, content, isHtml); }
  if (!CUR || CUR.id !== pid || TAB !== 'ai') { return null; }
  var m = $('aiMsgs');
  if (!m) { return null; }
  var data = ephemeral ? { r: role, t: content, h: !!isHtml } : { r: role, t: content, h: !!isHtml };
  var div = document.createElement('div');
  div.innerHTML = aiBubble(data, -1);
  var el = div.firstChild;
  m.appendChild(el);
  aiScroll();
  return el;
}
function aiAppendMsg(role, content, isHtml) {
  return aiAppendMsgTo(CUR ? CUR.id : null, role, content, isHtml, false);
}
function aiTypingEl(pid) {
  return aiAppendMsgTo(pid, 'a', '<span class="aiTyping"><i></i><i></i><i></i></span>', true, true);
}
function aiBusyUI(on) {
  var sb = $('aiStopBtn');
  if (sb) { sb.style.display = on ? 'inline-block' : 'none'; }
  var send = $('aiSend');
  if (send) { send.disabled = !!on; }
}
function aiStopGen() {
  if (!AI_ABORT) { return; }
  AI_ABORT.__userAbort = true;
  try { AI_ABORT.abort(); } catch (e) {}
}

function aiSendMsg(text) {
  if (!CUR || AI_BUSY) { return; }
  var input = $('aiInput');
  var q = (text != null ? text : (input ? input.value : '')).trim();
  if (!q) { return; }
  if (input && text == null) { input.value = ''; }
  var pid = CUR.id, p = CUR, code = ta.value, lastTxt = aiLastSummary();
  aiAppendMsgTo(pid, 'u', q, false);
  var c = aiCfg();
  if (c.mode === 'api' && c.key) { aiRunRemote(q, pid, p, code, lastTxt); }
  else if (c.mode === 'bridge') { aiRunBridge(q, pid, p, code, lastTxt); }
  else { aiRunLocal(q, pid, p, code); }
}

function aiLastUser(pid) {
  var list = aiChats(pid), q = '';
  for (var i = list.length - 1; i >= 0; i--) { if (list[i].r === 'u') { q = list[i].t; break; } }
  return q;
}
function aiRegenFrom(pid) {
  if (AI_BUSY) { toast('正在生成，先等这条结束'); return; }
  var p = probById(pid) || CUR, code = ST.drafts[pid] || '', q = aiLastUser(pid);
  if (!p || !q) { toast('没有可重新生成的问题'); return; }
  var c = aiCfg(), lastTxt = aiLastSummary();
  if (c.mode === 'api' && c.key) { aiRunRemote(q, pid, p, code, lastTxt); }
  else if (c.mode === 'bridge') { aiRunBridge(q, pid, p, code, lastTxt); }
  else { aiRunLocal(q, pid, p, code); }
}

function aiDeliverAnswer(pid, q, html, p) {
  var el = aiAppendMsgTo(pid, 'a', html, true, false);
  if (!el && CUR && CUR.id !== pid) { toast('回答已存到「' + p.title + '」的对话里'); }
  return el;
}

function aiRunLocal(q, pid, p, code) {
  AI_BUSY = true;
  aiBusyUI(true);
  var foot = $('aiFoot');
  if (foot) { foot.textContent = '正在看这道题…'; }
  var typing = aiTypingEl(pid);
  setTimeout(function () {
    var out = aiLocalAnswer(q, p, code);
    AI_BUSY = false;
    aiBusyUI(false);
    if (typing && typing.parentNode) { typing.parentNode.removeChild(typing); }
    var el = aiAppendMsgTo(pid, 'a', out.html, true, false);
    if (!el && CUR && CUR.id !== pid) { toast('回答已存到「' + p.title + '」的对话里'); }
    if (foot) { foot.textContent = ''; }
  }, 340);
}

async function aiRunRemote(q, pid, p, code, lastTxt) {
  AI_BUSY = true;
  aiBusyUI(true);
  var foot = $('aiFoot');
  if (foot) { foot.textContent = '正在生成…（可点 ■ 停止）'; }
  var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
  AI_ABORT = ctrl;
  var el = aiTypingEl(pid);
  var acc = '', reason = 0, rtxt = '';
  try {
    await aiRemoteAsk(q, pid, p, code, lastTxt, function (delta, done, isReason) {
      var body = el && el.querySelector('.aiBody');
      if (isReason) {
        reason += delta.length;
        rtxt += delta;
        if (body) { body.innerHTML = '<span class="aiThink">思考中 · 已推理 ' + reason + ' 字…</span>'; aiScroll(); }
        return;
      }
      acc += delta;
      if (body) {
        body.innerHTML = aiMd(acc) + (reason ? '<div class="aiThinkDone">（模型先推理了 ' + reason + ' 字，已略）</div>' : '');
        aiScroll();
      }
    }, ctrl);
    if (el && el.parentNode) { el.parentNode.removeChild(el); }
    var answer = acc || '(模型没有返回内容)';
    if (rtxt) {
      answer = aiMd(answer) + '<details class="aiReason"><summary>模型的推理过程（' + reason + ' 字）</summary><pre>' + aiEsc(rtxt) + '</pre></details>';
      aiAppendMsgTo(pid, 'a', answer, true, false);
    } else {
      aiAppendMsgTo(pid, 'a', answer, false, false);
    }
    if (ctrl && ctrl.__userAbort) { toast('已停止生成'); }
  } catch (e) {
    if (el && el.parentNode) { el.parentNode.removeChild(el); }
    var aborted = ctrl && (ctrl.__userAbort || ctrl.__timeout);
    if (acc && aborted) {
      aiAppendMsgTo(pid, 'a', acc + '\n\n（生成被中断，以上是已收到的部分）', false, false);
    } else if (ctrl && ctrl.__userAbort) {
      aiAppendMsgTo(pid, 's', '已停止生成。', false, false);
    } else {
      var msg = e && e.message === 'NO_KEY' ? '还没填 API Key。' : (e && e.message ? e.message : '请求失败');
      aiAppendMsgTo(pid, 's', msg, false, false);
      if (foot && CUR && CUR.id === pid) { foot.textContent = '已退回本地助教回答'; }
      var out = aiLocalAnswer(q, p, code);
      aiAppendMsgTo(pid, 'a', out.html, true, false);
      if (CUR && CUR.id !== pid) { toast('请求失败，回答已存到「' + p.title + '」'); }
    }
    AI_BUSY = false;
    aiBusyUI(false);
    AI_ABORT = null;
    if (foot) { setTimeout(function () { foot.textContent = ''; }, 2600); }
    return;
  }
  AI_BUSY = false;
  aiBusyUI(false);
  AI_ABORT = null;
  if (foot) { foot.textContent = ''; }
}
/* ---------- 设置面板 ---------- */
function aiToggleSettings() {
  var box = $('aiSet');
  if (box) { box.parentNode.removeChild(box); return; }
  var c = aiCfg();
  var wrap = document.createElement('div');
  wrap.id = 'aiSet';
  wrap.className = 'aiSet';
  wrap.innerHTML =
    '<div class="aiSetT">模型设置 <span class="aiSetX" id="aiSetX">✕</span></div>' +
    '<div class="aiSeg"><button type="button" data-m="local"' + (c.mode !== 'api' ? ' class="on"' : '') + '>本地助教</button>' +
      '<button type="button" data-m="api"' + (c.mode === 'api' ? ' class="on"' : '') + '>接入大模型</button>' +
      '<button type="button" data-m="bridge"' + (c.mode === 'bridge' ? ' class="on"' : '') + '>豆包转发</button></div>' +
    '<div class="aiSetNote">本地助教不联网、不需要 Key；接入大模型是自由问答（Key 只存本机浏览器）；豆包转发会把题目+代码打包成提示词，你粘到豆包发我即可，回答也能粘回这里存着。</div>' +
    '<label class="aiF"><span>服务商</span><select id="aiPreset">' +
      '<option value="openai">OpenAI</option><option value="deepseek">DeepSeek</option>' +
      '<option value="ark">火山方舟（豆包）</option><option value="custom">自定义</option></select></label>' +
    '<label class="aiF"><span>Base URL</span><input id="aiUrl" spellcheck="false" placeholder="https://api.openai.com/v1"></label>' +
    '<label class="aiF"><span>API Key</span><input id="aiKey" spellcheck="false" type="password" placeholder="sk-..."></label>' +
    '<label class="aiF"><span>模型</span><input id="aiModel" spellcheck="false" placeholder="gpt-4o-mini"></label>' +
    '<div class="aiSetBtns"><button class="btn sm" id="aiTest" type="button">测试连接</button>' +
      '<button class="btn primary sm" id="aiSaveCfg" type="button">保存</button></div>' +
    '<div class="aiTestOut" id="aiTestOut"></div>';
  $('pane').appendChild(wrap);
  var b = $('aiSet');
  b.querySelector('#aiSetX').addEventListener('click', function () { b.parentNode.removeChild(b); });
  var preset = b.querySelector('#aiPreset');
  preset.value = c.preset || 'openai';
  b.querySelector('#aiUrl').value = c.url || '';
  b.querySelector('#aiKey').value = c.key || '';
  b.querySelector('#aiModel').value = c.model || '';
  Array.prototype.forEach.call(b.querySelectorAll('.aiSeg button'), function (x) {
    x.addEventListener('click', function () {
      Array.prototype.forEach.call(b.querySelectorAll('.aiSeg button'), function (y) { y.classList.remove('on'); });
      x.classList.add('on');
      b.setAttribute('data-mode', x.getAttribute('data-m'));
    });
  });
  b.setAttribute('data-mode', c.mode === 'bridge' ? 'bridge' : (c.mode === 'api' ? 'api' : 'local'));
  preset.addEventListener('change', function () {
    var pp = AI_PRESETS[preset.value];
    if (pp) {
      if (pp.url) { b.querySelector('#aiUrl').value = pp.url; }
      if (pp.model) { b.querySelector('#aiModel').value = pp.model; }
      if (preset.value === 'ark') {
        b.querySelector('#aiTestOut').textContent = '方舟的「模型」填模型名（如 deepseek-v4-1-flash-261017）或推理接入点 ID（ep- 开头）。';
      }
    }
  });
  b.querySelector('#aiSaveCfg').addEventListener('click', function () { aiSaveSettings(b, true); });
  b.querySelector('#aiTest').addEventListener('click', function () { aiSaveSettings(b, false); aiTestConn(); });
}
function aiBindSettings() { /* 设置面板是动态插入的，事件在 aiToggleSettings 里绑 */ }
function aiSaveSettings(box, closeAfter) {
  var c = aiCfg();
  var mode = box.getAttribute('data-mode') || 'local';
  c.mode = mode;
  c.preset = box.querySelector('#aiPreset').value;
  c.url = box.querySelector('#aiUrl').value.trim();
  c.key = box.querySelector('#aiKey').value.trim();
  c.model = box.querySelector('#aiModel').value.trim();
  save();
  if (closeAfter) {
    box.parentNode.removeChild(box);
    renderAiPane();
    toast(c.mode === 'api' ? (c.key ? '已切到大模型：' + (c.model || '') : '还没有填 Key，仍用本地助教') :
      (c.mode === 'bridge' ? '已切到豆包转发：问题会打包成提示词' : '已切回本地助教'));
  }
}
async function aiTestConn() {
  var out = $('aiTestOut');
  if (!out) { return; }
  var c = aiCfg();
  if (!c.key) { out.textContent = '先填 Key 再测。'; return; }
  out.textContent = '正在请求…';
  try {
    var res = await fetch(aiEndpoints(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
      body: JSON.stringify({ model: c.model, max_tokens: 24, messages: [{ role: 'user', content: '回复"ok"两个字符' }] })
    });
    if (!res.ok) { var t = ''; try { t = await res.text(); } catch (e2) {} out.innerHTML = '<span class="aiErr">' + aiEsc(aiApiErrorText(res.status, t)) + '</span>'; return; }
    var d = await res.json();
    var txt = d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    out.innerHTML = '<span class="aiOk">连接成功' + (txt ? '：' + aiEsc(String(txt).slice(0, 30)) : '') + '</span>';
  } catch (e) {
    out.innerHTML = '<span class="aiErr">请求没发出去（CORS / 网络代理 / 地址写错）。浏览器直连第三方 API 时，个别服务会拦跨域。</span>';
  }
}

/* Alt+A 跳到 AI 助教 */
document.addEventListener('keydown', function (e) {
  if (e.altKey && (e.key === 'a' || e.key === 'A')) {
    e.preventDefault();
    if (TAB !== 'ai') { TAB = 'ai'; renderTab(); renderPane(); }
    var i = $('aiInput'); if (i) { i.focus(); }
  }
});