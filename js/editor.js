/* editor.js - 代码编辑器、高亮、补全、格式化与字号缩放 */
var ta = $('ta'), hlEl = $('hl'), gutEl = $('gutter'), acEl = $('ac');
var KW = { if: 1, else: 1, while: 1, for: 1, return: 1, break: 1, continue: 1, new: 1, nullptr: 1, true: 1, false: 1, struct: 1, const: 1, auto: 1, void: 1, int: 1, bool: 1, char: 1, double: 1, long: 1 };
var TY = { ListNode: 1, TreeNode: 1 };
var SNIPPETS = [
  { t: 'ListNode dummy(0);', k: '模板' },
  { t: 'ListNode* tail = &dummy;', k: '模板' },
  { t: 'ListNode* cur = head;', k: '模板' },
  { t: 'ListNode* prev = nullptr;', k: '模板' },
  { t: 'ListNode* nxt = cur->next;', k: '模板' },
  { t: 'ListNode* slow = head;', k: '模板' },
  { t: 'ListNode* fast = head;', k: '模板' },
  { t: 'while (cur != nullptr) {', k: '模板' },
  { t: 'while (cur != nullptr && cur->next != nullptr) {', k: '模板' },
  { t: 'if (cur->val == val) {', k: '模板' },
  { t: 'return dummy.next;', k: '模板' },
  { t: 'return prev;', k: '模板' }
];

function measureChar() {
  var span = document.createElement('span');
  span.style.cssText = 'position:absolute;visibility:hidden;font:400 13px/22px ' + getComputedStyle(ta).fontFamily + ';white-space:pre';
  span.textContent = 'MMMMMMMMMM';
  document.body.appendChild(span);
  CHARW = span.getBoundingClientRect().width / 10;
  document.body.removeChild(span);
}

function hlLine(line) {
  var idx = line.indexOf('//'), code = idx >= 0 ? line.slice(0, idx) : line, cm = idx >= 0 ? line.slice(idx) : '';
  var out = '', re = /([A-Za-z_][A-Za-z0-9_]*)|(\d+)|(\s+)|([^\w\s]+)/g, m;
  while ((m = re.exec(code))) {
    var tk = m[0];
    if (m[1]) {
      var cls = KW[tk] ? 'kw' : (TY[tk] ? 'ty' : '');
      if (!cls && code.charAt(re.lastIndex) === '(') { cls = 'fn'; }
      out += cls ? '<span class="' + cls + '">' + tk + '</span>' : tk;
    } else if (m[2]) {
      out += '<span class="num">' + tk + '</span>';
    } else {
      out += escHtml(tk);
    }
  }
  return out + (cm ? '<span class="cm">' + escHtml(cm) + '</span>' : '');
}
function highlight() {
  var lines = ta.value.split('\n'), out = [];
  for (var i = 0; i < lines.length; i++) { out.push(hlLine(lines[i]) || ' '); }
  hlEl.innerHTML = out.join('\n');
  hlEl.scrollTop = ta.scrollTop;
  hlEl.scrollLeft = ta.scrollLeft;
  renderMarks();
}
function buildGutter() {
  var n = ta.value.split('\n').length, html = '';
  for (var i = 1; i <= n; i++) { html += '<div>' + i + '</div>'; }
  gutEl.innerHTML = html;
  gutEl.scrollTop = ta.scrollTop;
}
function updatePos() {
  renderMarks();
  var pos = ta.selectionStart, pre = ta.value.slice(0, pos);
  var line = pre.split('\n').length, col = pre.length - pre.lastIndexOf('\n');
  $('posInfo').textContent = '行 ' + line + '，列 ' + col + '　·　括号自动补齐 · { 后回车自动缩进 · Ctrl+空格 补全　·　Ctrl+Enter 运行';
}
function setCode(text) {
  ta.value = text;
  highlight();
  buildGutter();
  updatePos();
}

/* ---- 输入类操作（尽量走 execCommand，保住撤销栈） ---- */
function insertText(t) {
  ta.focus();
  var ok = false;
  try { ok = document.execCommand('insertText', false, t); } catch (e) { ok = false; }
  if (!ok) {
    ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, 'end');
    ta.dispatchEvent(new Event('input'));
    if (ta.selectionStart !== undefined) { /* 光标已在 end */ }
  } else { syncEditor(); }
}
/* 用选区 + 删除/插入，保证一次 Ctrl+Z 就能整块回退 */
function replaceSelection(t) {
  ta.focus();
  if (t) { insertText(t); return; }
  try {
    if (!document.execCommand('delete')) { throw new Error('no'); }
    syncEditor();
  } catch (e) {
    ta.setRangeText('', ta.selectionStart, ta.selectionEnd, 'end');
    syncEditor();
  }
}
function syncEditor() {
  highlight();
  buildGutter();
  updatePos();
  saveDraftSoon();
  acUpdate();
}

function indentBlock(dir) {
  var v = ta.value, a = ta.selectionStart, b = ta.selectionEnd;
  var s = v.lastIndexOf('\n', a - 1) + 1;
  var e = v.indexOf('\n', b); if (e < 0) { e = v.length; }
  var cut0 = 0;   /* 第一行被删掉的字符数，用来校正光标 */
  var shift = 0;
  var seg = v.slice(s, e).split('\n').map(function (l, i) {
    var nl;
    if (dir > 0) { nl = '    ' + l; shift += 4; }
    else if (l.slice(0, 4) === '    ') { nl = l.slice(4); shift -= 4; }
    else if (l.charAt(0) === '\t') { nl = l.slice(1); shift -= 1; }
    else { nl = l.replace(/^\s{1,4}/, ''); shift -= (l.length - nl.length); }
    if (i === 0) { cut0 = l.length - nl.length; }
    return nl;
  }).join('\n');
  ta.setSelectionRange(s, e);
  insertText(seg);
  var na = Math.max(s, a - cut0), nb = Math.max(na, b + shift);
  ta.setSelectionRange(na, nb);
  updatePos();
}
function toggleComment() {
  var v = ta.value, a = ta.selectionStart, b = ta.selectionEnd;
  var s = v.lastIndexOf('\n', a - 1) + 1;
  var e = v.indexOf('\n', b); if (e < 0) { e = v.length; }
  var lines = v.slice(s, e).split('\n');
  var allCmt = lines.every(function (l) { return l.trim() === '' || /^\s*\/\//.test(l); });
  var seg = lines.map(function (l) {
    if (allCmt) { return l.replace(/^(\s*)\/\/ ?/, '$1'); }
    return l.replace(/^(\s*)/, '$1// ');
  }).join('\n');
  ta.value = v.slice(0, s) + seg + v.slice(e);
  ta.setSelectionRange(s, s + seg.length);
  syncEditor();
}

/* ---- 括号自动补齐 / 自动缩进 ---- */
var AI_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };

/* 统计未闭合的括号深度，跳过字符串内容 */
function bracketDepth(str, open, close) {
  var d = 0, q = '';
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (q) { if (c === '\\' && (q === '"' || q === "'")) { i++; continue; } if (c === q) { q = ''; } continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === open) { d++; } else if (c === close) { d = Math.max(0, d - 1); }
  }
  return d;
}

function autoPairKey(e) {
  var k = e.key, v = ta.value, a = ta.selectionStart, b = ta.selectionEnd;
  if (k === ')' || k === ']' || k === '}' || k === '"' || k === "'") {
    if (a === b && v.charAt(a) === k) {
      e.preventDefault();
      if (k === '}') {
        var ls0 = v.lastIndexOf('\n', a - 1) + 1, lead0 = v.slice(ls0, a);
        if (/^\s{4,}$/.test(lead0)) {
          var cut = lead0.slice(0, lead0.length - 4);
          ta.setSelectionRange(ls0, a);
          insertText(cut);
          ta.setSelectionRange(ls0 + cut.length + 1, ls0 + cut.length + 1);
          updatePos();
          return true;
        }
      }
      ta.setSelectionRange(a + 1, a + 1);
      updatePos();
      return true;
    }
    if (k === '}') { return dedentBrace(e); }
    return false;
  }
  var close = AI_PAIRS[k];
  if (!close) { return false; }
  /* 大括号不自动补后半，避免回车后出现两个 }；小括号/方括号/引号照常补 */
  if (k === '{') { return false; }
  /* 引号后面紧跟字母数字时不自动闭合（避免把撇号、类型名搞乱） */
  if ((k === '"' || k === "'") && /[A-Za-z0-9_]/.test(v.charAt(a))) { return false; }
  e.preventDefault();
  if (a !== b) {
    var sel = v.slice(a, b);
    insertText(k + sel + close);
    ta.setSelectionRange(a + 1, a + 1 + sel.length);
  } else {
    insertText(k + close);
    ta.setSelectionRange(a + 1, a + 1);
  }
  return true;
}

function dedentBrace(e) {
  var v = ta.value, a = ta.selectionStart;
  var ls = v.lastIndexOf('\n', a - 1) + 1;
  var lead = v.slice(ls, a);
  if (!/^\s*$/.test(lead)) { return false; }
  e.preventDefault();
  var newLead = lead.length >= 4 ? lead.slice(0, lead.length - 4) : '';
  ta.setSelectionRange(ls, a);
  insertText(newLead + '}');
  ta.setSelectionRange(ls + newLead.length + 1, ls + newLead.length + 1);
  updatePos();
  return true;
}

ta.addEventListener('input', syncEditor);
ta.addEventListener('click', function () { updatePos(); acHide(); });
ta.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { updatePos(); }
});
ta.addEventListener('scroll', function () {
  hlEl.scrollTop = ta.scrollTop; hlEl.scrollLeft = ta.scrollLeft;
  gutEl.scrollTop = ta.scrollTop;
  renderMarks();
  acHide();
});
ta.addEventListener('blur', function () { setTimeout(acHide, 120); });

/* 查找条 */
(function () {
  var fi = $('findInput');
  if (!fi) { return; }
  fi.addEventListener('input', function () { FIND.i = 0; findScan(); findGo(0); });
  fi.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); findGo(e.shiftKey ? -1 : 1); }
    else if (e.key === 'Escape') { e.preventDefault(); findClose(); }
  });
  $('findNext').addEventListener('click', function () { findGo(1); });
  $('findPrev').addEventListener('click', function () { findGo(-1); });
  $('findClose').addEventListener('click', findClose);
})();

/* 移动端输入条 */
Array.prototype.forEach.call(document.querySelectorAll('#mobBar button'), function (b) {
  b.addEventListener('click', function (e) {
    e.preventDefault();
    ta.focus();
    var v = b.getAttribute('data-ins');
    if (v === 'tab') { indentBlock(1); } else { insertText(v); }
  });
});

/* ==================================================================
   自动补全
   ================================================================== */
var ACN = 0, ACSEL = -1, ACMATCH = [], ACSTART = 0, ACMAN = false;
function collectIds(text) {
  var ids = {}, re = /[A-Za-z_][A-Za-z0-9_]*/g, m;
  while ((m = re.exec(text))) { if (!KW[m[0]] && !TY[m[0]]) { ids[m[0]] = 1; } }
  return Object.keys(ids);
}
function acCandidates(prefix) {
  var low = prefix.toLowerCase(), list = [];
  Object.keys(KW).forEach(function (k) {
    if (k.toLowerCase().indexOf(low) === 0) { list.push({ t: k, k: '关键字' }); }
  });
  Object.keys(TY).forEach(function (k) {
    if (k.toLowerCase().indexOf(low) === 0) { list.push({ t: k, k: '类型' }); }
  });
  collectIds(ta.value).forEach(function (id) {
    if (id.toLowerCase().indexOf(low) === 0 && id !== prefix) { list.push({ t: id, k: '变量' }); }
  });
  var wordRe = new RegExp('\\b' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  SNIPPETS.forEach(function (s) {
    if (s.t.toLowerCase().indexOf(low) === 0 || wordRe.test(s.t)) { list.push({ t: s.t, k: s.k }); }
  });
  return list.slice(0, 8);
}
function acUpdate(force) {
  var pos = ta.selectionStart;
  var pre = ta.value.slice(0, pos);
  var m = /([A-Za-z_][A-Za-z0-9_]*)$/.exec(pre);
  if (!m) { acHide(); return; }
  var prefix = m[1];
  /* 自动弹出要求至少 2 个字母，单字母不打扰；Ctrl+空格 可强制弹出 */
  if (!force && prefix.length < 2) { acHide(); return; }
  ACMATCH = acCandidates(prefix);
  if (!ACMATCH.length) { acHide(); return; }
  ACSTART = pos - prefix.length;
  ACMAN = !!force;
  ACSEL = -1;
  acDraw(prefix);
  acPlace();
}
function acDraw() {
  var html = '';
  ACMATCH.forEach(function (it, i) {
    html += '<div class="acItem' + (i === ACSEL ? ' on' : '') + '" data-i="' + i + '">' +
      '<span>' + escHtml(it.t.length > 30 ? it.t.slice(0, 30) + '…' : it.t) + '</span>' +
      '<span class="t">' + it.k + '</span></div>';
  });
  acEl.innerHTML = html;
  acEl.classList.add('on');
  Array.prototype.forEach.call(acEl.querySelectorAll('.acItem'), function (el) {
    el.addEventListener('mousedown', function (e) {
      e.preventDefault();
      acAccept(parseInt(el.getAttribute('data-i'), 10));
    });
  });
}
function acPlace() {
  var pre = ta.value.slice(0, ACSTART);
  var line = pre.split('\n').length - 1;
  var col = pre.length - pre.lastIndexOf('\n') - 1;
  var left = 14 + col * CHARW - ta.scrollLeft;
  var top = 11 + (line + 1) * 22 - ta.scrollTop;
  var bodyW = $('edbody').clientWidth;
  acEl.style.left = Math.max(4, Math.min(left, bodyW - 210)) + 'px';
  acEl.style.top = Math.min(top, 392 - 40) + 'px';
}
function acHide() { acEl.classList.remove('on'); ACMATCH = []; ACSEL = -1; ACMAN = false; }
function acAccept(i) {
  if (!ACMATCH[i]) { acHide(); return; }
  var item = ACMATCH[i];
  var tail = ta.value.slice(ta.selectionStart);
  var add = '';
  if (item.k === '模板' && !/\s$/.test(item.t)) { add = ''; }
  ta.setSelectionRange(ACSTART, ta.selectionStart);
  insertText(item.t + add);
  ta.setSelectionRange(ACSTART + item.t.length + add.length, ACSTART + item.t.length + add.length);
  acHide();
}

/* ==================================================================
   判题
   ================================================================== */

/* 2. C++ 智能代码格式化与排版 */
function formatCppCode() {
  if (!ta) return;
  var code = ta.value;
  var lines = code.split('\n');
  var indent = 0;
  var formatted = [];
  
  for (var i = 0; i < lines.length; i++) {
    var raw = lines[i].trim();
    if (!raw) {
      formatted.push('');
      continue;
    }
    // 如果该行以闭括号开头，先减一级缩进
    var closeMatches = raw.match(/^\}/);
    if (closeMatches) {
      indent = Math.max(0, indent - 1);
    }
    
    var pad = '    '.repeat(indent);
    formatted.push(pad + raw);
    
    // 计算花括号净增量
    var openCount = (raw.match(/\{/g) || []).length;
    var closeCount = (raw.match(/\}/g) || []).length;
    var net = openCount - closeCount;
    if (closeMatches) {
      net++; // 前面已经扣除了开头的一个闭括号
    }
    indent = Math.max(0, indent + net);
  }
  
  var newCode = formatted.join('\n');
  if (newCode !== code) {
    ta.value = newCode;
    syncEditor();
    toast('✨ 代码缩进格式化完成');
  } else {
    toast('代码缩进已非常整齐');
  }
}

/* 3. 编辑器字号切换 (12px ~ 17px) */
var FONT_SIZES = [12, 13, 14, 16, 17];
var curFontIdx = 1;
function cycleFontSize() {
  curFontIdx = (curFontIdx + 1) % FONT_SIZES.length;
  var sz = FONT_SIZES[curFontIdx];
  var lh = Math.round(sz * 1.68);
  ta.style.fontSize = sz + 'px';
  ta.style.lineHeight = lh + 'px';
  hlEl.style.fontSize = sz + 'px';
  hlEl.style.lineHeight = lh + 'px';
  gutEl.style.fontSize = Math.max(11, sz - 1) + 'px';
  gutEl.style.lineHeight = lh + 'px';
  
  // 重新测量单个字符宽度
  measureChar();
  highlight();
  buildGutter();
  renderMarks();
  toast('代码字号已调整为 ' + sz + 'px');
}