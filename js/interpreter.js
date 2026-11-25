/* interpreter.js - 内置 C++ 解释器核心引擎 */
/* ==================================================================
   内置 C++ 解释器 v2
   支持：数组 / vector / string / map / set / stack / queue、
        多函数与递归、常见 STL、指针链表与二叉树
   ================================================================== */
function preprocess(src) {
  var s = String(src).replace(/\r/g, '');
  s = s.replace(/\bstd\s*::\s*/g, '');
  s = s.replace(/\b(public|private|protected)\s*:/g, '');

  // 剥离力扣外层 class Solution { ... }; 包装，保留内部函数并保持行号对齐
  var clsMatch = s.match(/\bclass\s+[a-zA-Z0-9_]+\s*\{/);
  if (clsMatch) {
    var clsStart = clsMatch.index;
    var braceOpen = clsStart + clsMatch[0].length - 1;
    var cDepth = 0, braceClose = -1;
    for (var ci = braceOpen; ci < s.length; ci++) {
      if (s[ci] === '{') cDepth++;
      else if (s[ci] === '}') {
        cDepth--;
        if (cDepth === 0) { braceClose = ci; break; }
      }
    }
    var repTxt = '// class unwrapped';
    s = s.slice(0, clsStart) + repTxt + s.slice(braceOpen + 1);
    if (braceClose > braceOpen) {
      var adjClose = braceClose - ((braceOpen + 1) - (clsStart + repTxt.length));
      if (adjClose >= 0 && s[adjClose] === '}') {
        var semiMatch = s.slice(adjClose + 1).match(/^\s*;/);
        s = s.slice(0, adjClose) + s.slice(adjClose + 1 + (semiMatch ? semiMatch[0].length : 0));
      }
    }
  }

  // 若编辑器 DOM 虚拟滚动截断了末尾的闭合大括号，自动补齐以保证可正常解析
  var openCnt = 0, closeCnt = 0, inStr = 0, strCh = '';
  for (var bi2 = 0; bi2 < s.length; bi2++) {
    var ch2 = s[bi2];
    if (inStr) {
      if (ch2 === '\\') { bi2++; continue; }
      if (ch2 === strCh) inStr = 0;
      continue;
    }
    if (ch2 === '"' || ch2 === "'") { inStr = 1; strCh = ch2; continue; }
    if (ch2 === '/' && s[bi2 + 1] === '/') { while (bi2 < s.length && s[bi2] !== '\n') bi2++; continue; }
    if (ch2 === '{') openCnt++;
    else if (ch2 === '}') closeCnt++;
  }
  while (openCnt > closeCnt) {
    s += '\n}';
    closeCnt++;
  }

  s = s.replace(/\blong\s+long\b/g, 'long');
  s = s.replace(/\(\s*(?:int|long|double|float|char)\s*\)\s*(?=[a-zA-Z0-9_(])/g, '');
  s = s.replace(/\bINT_MAX\b/g, '2147483647').replace(/\bINT_MIN\b/g, '-2147483648');
  s = s.replace(/\*max_element\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*[a-zA-Z0-9_]+\.end\(\)\s*\)/g, '__max_elem($1)');
  s = s.replace(/\*min_element\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*[a-zA-Z0-9_]+\.end\(\)\s*\)/g, '__min_elem($1)');
  s = s.replace(/\baccumulate\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*[a-zA-Z0-9_]+\.end\(\)\s*,\s*([^)]+)\)/g, '__sum_arr($1, $2)');
  s = s.replace(/\blower_bound\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*[a-zA-Z0-9_]+\.end\(\)\s*,\s*([^)]+)\)\s*-\s*\1\.begin\(\)/g, '__lower_bound($1, $2)');
  s = s.replace(/\bupper_bound\s*\(\s*([a-zA-Z0-9_]+)\.begin\(\)\s*,\s*[a-zA-Z0-9_]+\.end\(\)\s*,\s*([^)]+)\)\s*-\s*\1\.begin\(\)/g, '__upper_bound($1, $2)');

  // 提取局部 lambda（支持嵌套大括号）到顶层独立函数
  var helpers = [];
  var lamRe = /auto\s+([a-zA-Z0-9_]+)\s*=\s*\[[^\]]*\]\s*\(([^)]*)\)\s*(?:->\s*([^{]+))?\s*\{/g;
  var m;
  while ((m = lamRe.exec(s)) !== null) {
    var startIdx = m.index;
    var braceStart = lamRe.lastIndex - 1;
    var depth = 0, endIdx = -1;
    for (var bi = braceStart; bi < s.length; bi++) {
      if (s[bi] === '{') depth++;
      else if (s[bi] === '}') {
        depth--;
        if (depth === 0) { endIdx = bi; break; }
      }
    }
    if (endIdx > braceStart) {
      var after = s.slice(endIdx + 1).match(/^\s*;/);
      if (after) {
        var name = m[1];
        var params = m[2].replace(/\bauto\s*&?\s*[a-zA-Z0-9_]+\s*,\s*/g, '');
        var retType = m[3] ? m[3].trim() : 'bool';
        var body = s.slice(braceStart + 1, endIdx);
        body = body.replace(/\bself\s*\(\s*self\s*,\s*/g, name + '(');
        helpers.push(retType + ' ' + name + '(' + params + ') {' + body + '}');
        var fullEnd = endIdx + 1 + after[0].length;
        s = s.slice(0, startIdx) + '// extracted helper ' + name + s.slice(fullEnd);
        s = s.replace(new RegExp('\\b' + name + '\\s*\\(\\s*' + name + '\\s*,\\s*', 'g'), name + '(');
        lamRe.lastIndex = 0;
      }
    }
  }
  if (helpers.length > 0) {
    s = helpers.join('\n') + '\n' + s;
  }

  var lines = s.split('\n'), out = [];
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    if (/^\s*#/.test(l)) { out.push(''); continue; }
    if (/^\s*using\s+namespace\b/.test(l)) { out.push(''); continue; }
    if (/^\s*typedef\b/.test(l)) { out.push(''); continue; }
    if (/^\s*template\s*</.test(l)) { out.push(''); continue; }
    out.push(l);
  }
  return out.join('\n');
}

function lex(src) {
  var toks = [], i = 0, line = 1;
  var TWO = { '==': 1, '!=': 1, '<=': 1, '>=': 1, '&&': 1, '||': 1, '->': 1, '++': 1, '--': 1,
    '+=': 1, '-=': 1, '*=': 1, '/=': 1, '%=': 1, '::': 1 };
  while (i < src.length) {
    var c = src[i];
    if (c === '\n') { line++; i++; continue; }
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') { i++; } continue; }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') { line++; } i++; }
      i += 2; continue;
    }
    if (c === '"' || c === "'") {
      var q = c, sv = ''; i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\') {
          i++;
          var e = src[i];
          sv += (e === 'n' ? '\n' : e === 't' ? '\t' : e === '0' ? '\0' : e);
        } else { sv += src[i]; }
        if (src[i] === '\n') { line++; }
        i++;
      }
      i++;
      toks.push({ t: 'str', v: sv, line: line });
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      var w = '';
      while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) { w += src[i++]; }
      toks.push({ t: 'id', v: w, line: line });
      continue;
    }
    if (/[0-9]/.test(c)) {
      var n = '';
      while (i < src.length && /[0-9.]/.test(src[i])) { n += src[i++]; }
      if (src[i] === 'f' || src[i] === 'L' || src[i] === 'u') { i++; }
      toks.push({ t: 'num', v: parseFloat(n), line: line });
      continue;
    }
    var pair = c + src[i + 1];
    if (TWO[pair]) { toks.push({ t: 'op', v: pair, line: line }); i += 2; continue; }
    toks.push({ t: 'op', v: c, line: line });
    i++;
  }
  toks.push({ t: 'eof', v: '', line: line });
  return toks;
}

function parseError(msg, line) {
  var e = new Error(msg);
  e.cpline = line;
  return e;
}

/* ==================================================================
   语法分析
   ================================================================== */
function parseProgram(toks) {
  var p = 0;
  var structs = {};
  var funcs = [];

  function peek(k) { return toks[p + (k || 0)]; }
  function isOp(v, k) { var t = peek(k); return t && t.t === 'op' && t.v === v; }
  function isId(v, k) { var t = peek(k); return t && t.t === 'id' && t.v === v; }
  function eat(v) { if (isOp(v)) { p++; return true; } return false; }
  function expect(v, what) {
    if (!isOp(v)) { throw parseError('这里缺少「' + (what || v) + '」', peek().line); }
    p++;
  }

  var TYPE_WORDS = {
    int: 1, long: 1, double: 1, float: 1, char: 1, bool: 1, void: 1, unsigned: 1, short: 1,
    string: 1, auto: 1, vector: 1, array: 1, map: 1, set: 1, unordered_map: 1, unordered_set: 1,
    stack: 1, queue: 1, deque: 1, priority_queue: 1, pair: 1, size_t: 1,
    ListNode: 1, TreeNode: 1, Node: 1
  };

  function looksLikeType(t) {
    if (!t || t.t !== 'id') { return false; }
    if (t.v === 'const') { return true; }
    return !!TYPE_WORDS[t.v] || /^[A-Z]/.test(t.v);
  }

  function typeName(ty) {
    return ty.name + (ty.args && ty.args.length ? '<' + ty.args.join(',') + '>' : '');
  }

  function parseTypeRef() {
    if (isId('const')) { p++; }
    var t = peek();
    if (!looksLikeType(t)) { throw parseError('这里应该是一个类型名', t.line); }
    var name = t.v, ptr = 0, ref = false, args = [];
    p++;
    if (isOp('<')) {
      p++;
      var depth = 1, cur = '';
      while (peek().t !== 'eof') {
        var tt = peek();
        if (tt.t === 'op' && tt.v === '<') { depth++; }
        if (tt.t === 'op' && tt.v === '>') {
          depth--;
          if (depth === 0) { p++; break; }
        }
        if (depth === 1 && tt.t === 'op' && tt.v === ',') { args.push(cur.trim()); cur = ''; p++; continue; }
        var piece = String(tt.v);
        if (cur && /[A-Za-z0-9_]$/.test(cur) && /^[A-Za-z0-9_]/.test(piece)) { cur += ' '; }
        cur += piece;
        p++;
      }
      if (cur.trim()) { args.push(cur.trim()); }
    }
    while (isOp('*')) { ptr++; p++; }
    if (isOp('&')) { ref = true; p++; if (isOp('&')) { p++; } }
    return { name: name, args: args, ptr: ptr, ref: ref, line: t.line };
  }

  function expr() { return ternary(); }

  function ternary() {
    var c = binLevel(0);
    if (isOp('?')) {
      p++;
      var a = expr();
      expect(':', '冒号');
      var b = expr();
      return { k: 'cond', c: c, a: a, b: b, line: c.line };
    }
    return c;
  }

  var BIN = [['||'], ['&&'], ['==', '!='], ['<', '>', '<=', '>='], ['+', '-'], ['*', '/', '%']];

  function binLevel(level) {
    if (level >= BIN.length) { return unary(); }
    var l = binLevel(level + 1);
    while (true) {
      var t = peek();
      if (!(t.t === 'op' && BIN[level].indexOf(t.v) >= 0)) { break; }
      p++;
      var r = binLevel(level + 1);
      l = { k: 'bin', op: t.v, l: l, r: r, line: t.line };
    }
    return l;
  }

  function unary() {
    var t = peek();
    if (t.t === 'op' && (t.v === '!' || t.v === '-' || t.v === '&' || t.v === '*' || t.v === '+')) {
      p++;
      return { k: 'un', op: t.v, e: unary(), line: t.line };
    }
    if (t.t === 'op' && (t.v === '++' || t.v === '--')) {
      p++;
      return { k: 'pre', op: t.v, e: unary(), line: t.line };
    }
    return postfix();
  }

  function args() {
    expect('(', '左括号');
    var list = [];
    if (!isOp(')')) {
      list.push(isOp('{') ? initList() : expr());
      while (eat(',')) { list.push(isOp('{') ? initList() : expr()); }
    }
    expect(')', '右括号');
    return list;
  }

  function initList() {
    var ln = peek().line;
    expect('{', '左花括号');
    var items = [];
    if (!isOp('}')) {
      items.push(isOp('{') ? initList() : expr());
      while (eat(',')) {
        if (isOp('}')) { break; }
        items.push(isOp('{') ? initList() : expr());
      }
    }
    expect('}', '右花括号');
    return { k: 'initlist', items: items, line: ln };
  }

  function postfix() {
    var e = primary();
    while (true) {
      var t = peek();
      if (t.t === 'op' && (t.v === '->' || t.v === '.')) {
        p++;
        var nt = peek();
        if (nt.t !== 'id') { throw parseError('后面应该是字段名或方法名', nt.line); }
        p++;
        var callArgs = null;
        if (isOp('(')) { callArgs = args(); }
        e = { k: 'mem', obj: e, name: nt.v, args: callArgs, line: t.line };
        continue;
      }
      if (t.t === 'op' && t.v === '[') {
        p++;
        var ix = expr();
        expect(']', '右方括号');
        e = { k: 'index', obj: e, idx: ix, line: t.line };
        continue;
      }
      if (t.t === 'op' && t.v === '(') {
        var a2 = args();
        e = { k: 'call', fn: e, args: a2, line: t.line };
        continue;
      }
      if (t.t === 'op' && (t.v === '++' || t.v === '--')) {
        p++;
        e = { k: 'post', op: t.v, e: e, line: t.line };
        continue;
      }
      break;
    }
    return e;
  }

  function primary() {
    var t = peek();
    if (t.t === 'num') { p++; return { k: 'num', v: t.v, line: t.line }; }
    if (t.t === 'str') { p++; return { k: 'str', v: t.v, line: t.line }; }
    if (t.t === 'id') {
      if (t.v === 'true' || t.v === 'false') { p++; return { k: 'bool', v: t.v === 'true', line: t.line }; }
      if (t.v === 'nullptr' || t.v === 'NULL' || t.v === 'null') { p++; return { k: 'null', line: t.line }; }
      if (t.v === 'new') {
        p++;
        var ty = parseTypeRef();
        var a3 = isOp('(') ? args() : [];
        return { k: 'new', type: ty, args: a3, line: t.line };
      }
      if (t.v === 'INT_MAX' || t.v === 'INT_MIN') {
        p++;
        return { k: 'num', v: t.v === 'INT_MAX' ? 2147483647 : -2147483648, line: t.line };
      }
      p++;
      return { k: 'id', name: t.v, line: t.line };
    }
    if (t.t === 'op' && t.v === '{') { return initList(); }
    if (t.t === 'op' && t.v === '(') {
      p++;
      var e = expr();
      expect(')', '右括号');
      return e;
    }
    throw parseError('无法识别的表达式', t.line);
  }

  function declTail(ty, name, ln) {
    var arrSize = null;
    if (isOp('[')) {
      p++;
      if (!isOp(']')) { arrSize = expr(); }
      expect(']', '右方括号');
    }
    var init = null;
    if (isOp('(')) {
      init = { k: 'ctor', args: args() };
    } else if (isOp('=')) {
      p++;
      init = isOp('{') ? initList() : expr();
    } else if (isOp('{')) {
      init = initList();
    }
    return { k: 'decl', type: ty, name: name, init: init, arrSize: arrSize, line: ln };
  }

  function tryDecl() {
    var t0 = peek();
    if (!looksLikeType(t0)) { return null; }
    var save = p;
    var ty;
    try { ty = parseTypeRef(); } catch (e) { p = save; return null; }
    var nameTok = peek();
    if (!(nameTok && nameTok.t === 'id')) { p = save; return null; }
    if (/^(while|if|for|return|else)$/.test(nameTok.v)) { p = save; return null; }
    p++;
    var items = [declTail(ty, nameTok.v, t0.line)];
    while (isOp(',')) {
      p++;
      var nt = peek();
      if (nt.t !== 'id') { throw parseError('逗号后面应该是变量名', nt.line); }
      p++;
      var ty2 = { name: ty.name, args: ty.args, ptr: 0, ref: ty.ref, line: nt.line };
      while (isOp('*')) { ty2.ptr++; p++; }
      items.push(declTail(ty2, nt.v, nt.line));
    }
    expect(';', '分号');
    if (items.length === 1) { return items[0]; }
    return { k: 'decls', items: items, line: t0.line };
  }

  function forInit() {
    var ln = peek().line;
    var d = tryDecl();
    if (d) { return d; }
    var list = [expr()];
    while (eat(',')) { list.push(expr()); }
    expect(';', '分号');
    return list.length === 1 ? { k: 'expr', e: list[0], line: ln } : { k: 'seq', items: list, line: ln };
  }

  function stmt() {
    var t = peek();
    var ln = t.line;
    if (isOp('{')) {
      p++;
      var body = [];
      while (!isOp('}') && !(peek().t === 'eof')) { body.push(stmt()); }
      expect('}', '右花括号');
      return { k: 'block', body: body, line: ln };
    }
    if (isOp(';')) { p++; return { k: 'empty', line: ln }; }
    if (t.t === 'id') {
      if (t.v === 'if') {
        p++; expect('(', '左括号');
        var c1 = expr();
        expect(')', '右括号');
        var thenS = stmt();
        var elseS = null;
        if (isId('else')) { p++; elseS = stmt(); }
        return { k: 'if', c: c1, then: thenS, els: elseS, line: ln };
      }
      if (t.v === 'while') {
        p++; expect('(', '左括号');
        var c2 = expr();
        expect(')', '右括号');
        return { k: 'while', c: c2, body: stmt(), line: ln };
      }
      if (t.v === 'do') {
        p++;
        var db = stmt();
        if (!isId('while')) { throw parseError('do 后面需要 while(条件)', peek().line); }
        p++; expect('(', '左括号');
        var dc = expr();
        expect(')', '右括号');
        expect(';', '分号');
        return { k: 'dowhile', c: dc, body: db, line: ln };
      }
      if (t.v === 'for') {
        p++; expect('(', '左括号');
        if (looksLikeType(peek())) {
          var save = p;
          var rty = null;
          try { rty = parseTypeRef(); } catch (e) { rty = null; }
          if (rty && peek().t === 'id' && isOp(':', 1)) {
            var rn = peek().v; p++; p++;
            var coll = expr();
            expect(')', '右括号');
            return { k: 'foreach', type: rty, name: rn, coll: coll, body: stmt(), line: ln };
          }
          p = save;
        }
        var init = null;
        if (!isOp(';')) { init = forInit(); } else { p++; }
        var cond = null;
        if (!isOp(';')) { cond = expr(); }
        expect(';', '分号');
        var step = null;
        if (!isOp(')')) {
          var sl = [expr()];
          while (eat(',')) { sl.push(expr()); }
          step = sl.length === 1 ? sl[0] : { k: 'seqexpr', items: sl, line: ln };
        }
        expect(')', '右括号');
        return { k: 'for', init: init, c: cond, step: step, body: stmt(), line: ln };
      }
      if (t.v === 'return') {
        p++;
        var re = null;
        if (!isOp(';')) { re = isOp('{') ? initList() : expr(); }
        expect(';', '分号');
        return { k: 'return', e: re, line: ln };
      }
      if (t.v === 'break') { p++; expect(';', '分号'); return { k: 'break', line: ln }; }
      if (t.v === 'continue') { p++; expect(';', '分号'); return { k: 'continue', line: ln }; }
      if (t.v === 'struct') { return parseStruct(); }
    }
    var d = tryDecl();
    if (d) { return d; }
    var e2 = expr();
    var t2 = peek();
    if (t2.t === 'op' && ['=', '+=', '-=', '*=', '/=', '%='].indexOf(t2.v) >= 0) {
      p++;
      var rhs = isOp('{') ? initList() : expr();
      expect(';', '分号');
      return { k: 'assign', lhs: e2, rhs: rhs, op: t2.v, line: ln };
    }
    expect(';', '分号');
    return { k: 'expr', e: e2, line: ln };
  }

  function parseStruct() {
    var ln = peek().line;
    p++;
    var nameTok = peek();
    if (nameTok.t !== 'id') { throw parseError('struct 后面应是结构体名', nameTok.line); }
    p++;
    expect('{', '左花括号');
    var fields = [];
    while (!isOp('}') && !(peek().t === 'eof')) {
      if (isOp(';')) { p++; continue; }
      var ft = parseTypeRef();
      var fn = peek();
      if (fn.t !== 'id') { throw parseError('字段名缺失', fn.line); }
      p++;
      fields.push({ name: fn.v, type: ft.name, ptr: ft.ptr });
      if (isOp('(')) { args(); }
      expect(';', '分号');
    }
    expect('}', '右花括号');
    eat(';');
    structs[nameTok.v] = { name: nameTok.v, fields: fields };
    return { k: 'empty', line: ln };
  }

  function parseFunction() {
    var rt = parseTypeRef();
    var nameTok = peek();
    if (nameTok.t !== 'id') { throw parseError('函数名缺失', nameTok.line); }
    p++;
    expect('(', '左括号');
    var params = [];
    if (!isOp(')')) {
      if (isId('void') && isOp(')', 1)) { p++; }
      else {
        while (true) {
          var pt = parseTypeRef();
          var pn = peek();
          if (pn.t !== 'id') { throw parseError('参数名缺失', pn.line); }
          p++;
          var arr = false;
          if (isOp('[')) { p++; if (!isOp(']')) { expr(); } expect(']', '右方括号'); arr = true; }
          params.push({ name: pn.v, type: pt.name, args: pt.args, ptr: pt.ptr, ref: pt.ref || arr, raw: typeName(pt) });
          if (!eat(',')) { break; }
          if (isOp(')')) { break; }
        }
      }
    }
    expect(')', '右括号');
    if (isOp(';')) { p++; return { k: 'proto', line: nameTok.line }; }
    if (isOp(':')) { while (!isOp('{') && peek().t !== 'eof') { p++; } }
    var body = stmt();
    funcs.push({ name: nameTok.v, ret: rt, params: params, body: body, line: nameTok.line });
    return { k: 'fn', line: nameTok.line };
  }

  function parseClassBody() {
    expect('{', '左花括号');
    while (!isOp('}') && peek().t !== 'eof') {
      if (isOp(';')) { p++; continue; }
      if (isId('struct')) { parseStruct(); continue; }
      parseFunction();
    }
    expect('}', '右花括号');
    eat(';');
  }

  while (peek().t !== 'eof') {
    if (isOp(';')) { p++; continue; }
    if (isId('struct')) {
      var save = p;
      p++;
      if (peek().t === 'id' && isOp('{', 1)) { p = save; parseStruct(); continue; }
      p = save;
      parseFunction();
      continue;
    }
    if (isId('class')) {
      p++;
      if (peek().t === 'id') { p++; }
      if (isOp(':')) { while (!isOp('{') && peek().t !== 'eof') { p++; } }
      parseClassBody();
      continue;
    }
    parseFunction();
  }
  return { structs: structs, funcs: funcs, lines: [] };
}

/* ==================================================================
   运行时
   ================================================================== */
var DEFAULT_STRUCTS = {
  ListNode: { name: 'ListNode', fields: [{ name: 'val', type: 'int', ptr: 0 }, { name: 'next', type: 'ListNode', ptr: 1 }] },
  TreeNode: { name: 'TreeNode', fields: [{ name: 'val', type: 'int', ptr: 0 }, { name: 'left', type: 'TreeNode', ptr: 1 }, { name: 'right', type: 'TreeNode', ptr: 1 }] },
  Node: { name: 'Node', fields: [{ name: 'val', type: 'int', ptr: 0 }, { name: 'next', type: 'Node', ptr: 1 }] }
};

var V = {
  num: function (v) { return { k: 'num', v: v }; },
  bool: function (v) { return { k: 'bool', v: !!v }; },
  null: function () { return { k: 'null' }; },
  ptr: function (id) { return { k: 'ptr', id: id }; },
  str: function (s) { return { k: 'str', v: String(s) }; },
  arr: function (items) { return { k: 'arr', items: items || [] }; },
  map: function () { return { k: 'map', m: {} }; },
  set: function () { return { k: 'set', s: {} }; }
};

function rtError(msg, line) {
  var e = new Error(msg);
  e.cpline = line;
  return e;
}

function analyze(src, paramsText, wantName) {
  var code = preprocess(src);
  var lines = code.split('\n');
  var toks = lex(code);
  var prog = parseProgram(toks);

  var structs = {};
  Object.keys(prog.structs).forEach(function (k) { structs[k] = prog.structs[k]; });
  Object.keys(DEFAULT_STRUCTS).forEach(function (k) { if (!structs[k]) { structs[k] = DEFAULT_STRUCTS[k]; } });
  function isStructName(n) { return !!structs[n]; }

  var funcs = prog.funcs;
  if (!funcs.length) { throw parseError('没有找到函数定义：至少写一个函数，例如 int search(vector<int>& nums, int target)', 1); }
  var fnMap = {};
  funcs.forEach(function (f) { if (!fnMap[f.name]) { fnMap[f.name] = f; } });

  /* 选入口函数：优先指定名 / main，其次「没有被别的函数调用过」的那个 */
  var called = {};
  function walkCalls(n) {
    if (!n || typeof n !== 'object') { return; }
    if (Array.isArray(n)) { n.forEach(walkCalls); return; }
    if (n.k === 'call' && n.fn && n.fn.k === 'id') { called[n.fn.name] = (called[n.fn.name] || 0) + 1; }
    Object.keys(n).forEach(function (k) { if (k !== 'line') { walkCalls(n[k]); } });
  }
  funcs.forEach(function (f) { walkCalls(f.body); });
  var selfOnly = {};
  funcs.forEach(function (f) {
    var c = called[f.name] || 0;
    var self = 0;
    (function countSelf(n) {
      if (!n || typeof n !== 'object') { return; }
      if (Array.isArray(n)) { n.forEach(countSelf); return; }
      if (n.k === 'call' && n.fn && n.fn.k === 'id' && n.fn.name === f.name) { self++; }
      Object.keys(n).forEach(function (k) { if (k !== 'line') { countSelf(n[k]); } });
    })(f.body);
    selfOnly[f.name] = (c - self) === 0;
  });
  var argN = String(paramsText || '').split('|').length;
  var target = null;
  if (wantName && fnMap[wantName]) { target = fnMap[wantName]; }
  if (!target && fnMap['main']) { target = fnMap['main']; }
  if (!target) {
    var roots = funcs.filter(function (f) { return selfOnly[f.name]; });
    var fit = roots.filter(function (f) { return f.params.length === argN || (argN === 1 && f.params.length === 0); });
    target = fit[fit.length - 1] || roots[roots.length - 1] || funcs[funcs.length - 1];
  }

  var heap = { n: 0, objs: {} };
  var frames = [{ name: target.name, vars: {} }];
  var steps = [];
  var curLine = target.line;
  var depth = 0, callCount = 0;
  var STEP_MAX = 3000, LOOP_MAX = 4000, DEPTH_MAX = 220;

  function top() { return frames[frames.length - 1]; }
  function lookupFrame(name) {
    for (var i = frames.length - 1; i >= 0; i--) { if (name in frames[i].vars) { return frames[i]; } }
    return null;
  }

  function copyVal(v) {
    if (!v) { return V.null(); }
    if (v.k === 'arr') { return { k: 'arr', items: v.items.map(copyVal) }; }
    if (v.k === 'map') { var m = {}; Object.keys(v.m).forEach(function (k) { m[k] = copyVal(v.m[k]); }); return { k: 'map', m: m }; }
    if (v.k === 'set') { var s = {}; Object.keys(v.s).forEach(function (k) { s[k] = 1; }); return { k: 'set', s: s }; }
    return v;
  }

  function mkObj(typeNameS, args) {
    var def = structs[typeNameS];
    if (!def) { throw rtError('未知的结构体类型 ' + typeNameS, curLine); }
    var o = { id: 'n' + (++heap.n), type: typeNameS, fields: {} };
    heap.objs[o.id] = o;
    def.fields.forEach(function (f, i) {
      var dflt = (f.ptr > 0 || isStructName(f.type)) ? V.null() : V.num(0);
      o.fields[f.name] = (args && args[i]) ? args[i] : dflt;
    });
    return o;
  }

  function snapVal(v) {
    if (!v) { return null; }
    if (v.k === 'arr') { return { k: 'arr', items: v.items.slice(0, 60).map(snapVal) }; }
    if (v.k === 'map') { var m = {}; Object.keys(v.m).slice(0, 40).forEach(function (k) { m[k] = snapVal(v.m[k]); }); return { k: 'map', m: m }; }
    if (v.k === 'set') { return { k: 'set', s: Object.keys(v.s).slice(0, 40) }; }
    return v;
  }
  function snapEnv() {
    var o = {}, vars = top().vars;
    Object.keys(vars).forEach(function (k) { o[k] = snapVal(vars[k]); });
    return o;
  }
  function snapHeap() {
    var o = {};
    Object.keys(heap.objs).forEach(function (id) {
      var ob = heap.objs[id], f = {};
      Object.keys(ob.fields).forEach(function (k) { f[k] = snapVal(ob.fields[k]); });
      o[id] = { id: id, type: ob.type, fields: f };
    });
    return o;
  }
  function pushStep(line, note, changed) {
    steps.push({ line: line, env: snapEnv(), heap: snapHeap(), note: note, changed: changed || null, depth: depth, fn: top().name });
    if (steps.length > STEP_MAX) {
      throw { ctrl: 'stop', msg: '执行步数超过 ' + STEP_MAX + ' 步，已停止（数据太大或死循环了）', line: line };
    }
  }

  function label(v) {
    if (!v) { return '—'; }
    if (v.k === 'null') { return 'nullptr'; }
    if (v.k === 'num') { return String(v.v); }
    if (v.k === 'bool') { return v.v ? 'true' : 'false'; }
    if (v.k === 'str') { return '"' + (v.v.length > 24 ? v.v.slice(0, 24) + '…' : v.v) + '"'; }
    if (v.k === 'arr') { return '[' + v.items.slice(0, 12).map(label).join(',') + (v.items.length > 12 ? ',…' : '') + ']'; }
    if (v.k === 'map') { return '{' + Object.keys(v.m).slice(0, 8).map(function (k) { return k + ':' + label(v.m[k]); }).join(',') + '}'; }
    if (v.k === 'set') { return '{' + (Array.isArray(v.s) ? v.s.slice(0, 8).join(',') : Object.keys(v.s).slice(0, 8).join(',')) + '}'; }
    if (v.k === 'ptr') {
      var ob = heap.objs[v.id];
      return v.id + '（' + (ob ? ob.type : '?') + '）';
    }
    return '?';
  }

  function truthy(v) {
    if (!v) { return false; }
    if (v.k === 'null') { return false; }
    if (v.k === 'num') { return v.v !== 0; }
    if (v.k === 'bool') { return v.v; }
    if (v.k === 'str') { return v.v.length > 0; }
    if (v.k === 'arr') { return v.items.length > 0; }
    return true;
  }
  function numOf(v, line) {
    if (v && v.k === 'num') { return v.v; }
    if (v && v.k === 'bool') { return v.v ? 1 : 0; }
    if (v && v.k === 'str' && v.v.length === 1) { return v.v.charCodeAt(0); }
    throw rtError('这里需要一个数字，拿到的是 ' + label(v), line);
  }

  function textOf(n) {
    if (!n) { return '…'; }
    switch (n.k) {
      case 'id': return n.name;
      case 'num': return String(n.v);
      case 'str': return '"' + n.v + '"';
      case 'null': return 'nullptr';
      case 'bool': return n.v ? 'true' : 'false';
      case 'mem': return textOf(n.obj) + '.' + n.name + (n.args ? '(…)' : '');
      case 'index': return textOf(n.obj) + '[' + textOf(n.idx) + ']';
      case 'bin': return textOf(n.l) + ' ' + n.op + ' ' + textOf(n.r);
      case 'un': return n.op + textOf(n.e);
      case 'post': return textOf(n.e) + n.op;
      case 'pre': return n.op + textOf(n.e);
      case 'cond': return textOf(n.c) + ' ? ' + textOf(n.a) + ' : ' + textOf(n.b);
      case 'call': return textOf(n.fn) + '(…)';
      case 'new': return 'new ' + n.type.name + '(…)';
      case 'initlist': return '{…}';
    }
    return '…';
  }

  function keyOf(v) {
    if (v.k === 'num') { return String(v.v); }
    if (v.k === 'str') { return v.v; }
    if (v.k === 'bool') { return v.v ? 'true' : 'false'; }
    return label(v);
  }
  function equalVal(a, b) {
    if (a.k === 'null' && b.k === 'null') { return true; }
    if (a.k === 'null' || b.k === 'null') { return false; }
    if (a.k === 'ptr' && b.k === 'ptr') { return a.id === b.id; }
    if (a.k === 'str' || b.k === 'str') { return keyOf(a) === keyOf(b); }
    if (a.k === 'arr' && b.k === 'arr') {
      if (a.items.length !== b.items.length) { return false; }
      return a.items.every(function (x, i) { return equalVal(x, b.items[i]); });
    }
    return numOf(a, curLine) === numOf(b, curLine);
  }

  function refOf(n) {
    if (n.k === 'id') {
      var fr = lookupFrame(n.name);
      if (!fr) { throw rtError('变量 ' + n.name + ' 还没声明就被使用了（是不是漏了定义？）', n.line); }
      return { get: function () { return fr.vars[n.name]; }, set: function (v) { fr.vars[n.name] = v; }, desc: n.name };
    }
    if (n.k === 'index') {
      var base = ev(n.obj), ixv = ev(n.idx);
      if (base.k === 'map') {
        var kk = keyOf(ixv);
        if (!(kk in base.m)) { base.m[kk] = V.num(0); }
        return { get: function () { return base.m[kk]; }, set: function (v) { base.m[kk] = v; }, desc: textOf(n) };
      }
      var ix = numOf(ixv, n.line);
      if (base.k === 'arr') {
        if (ix < 0 || ix >= base.items.length) {
          throw rtError('数组下标越界：' + textOf(n.obj) + '[' + ix + ']，当前长度 ' + base.items.length, n.line);
        }
        return { get: function () { return base.items[ix]; }, set: function (v) { base.items[ix] = v; }, desc: textOf(n) };
      }
      if (base.k === 'str') {
        if (ix < 0 || ix >= base.v.length) { throw rtError('字符串下标越界：位置 ' + ix, n.line); }
        return { get: function () { return V.str(base.v.charAt(ix)); }, set: function (v) {
          base.v = base.v.slice(0, ix) + String(v.k === 'str' ? v.v : String.fromCharCode(numOf(v, n.line))) + base.v.slice(ix + 1);
        }, desc: textOf(n) };
      }
      throw rtError(textOf(n.obj) + ' 不能用下标访问', n.line);
    }
    if (n.k === 'mem' && !n.args) {
      var b2 = ev(n.obj);
      if (b2.k === 'null') { throw rtError('空指针：' + textOf(n.obj) + ' 是 nullptr，不能访问 ' + n.name, n.line); }
      if (b2.k !== 'ptr') { throw rtError(textOf(n.obj) + ' 不是指针，不能访问字段', n.line); }
      var ob = heap.objs[b2.id];
      if (!ob) { throw rtError('对象已经不存在了', n.line); }
      if (!(n.name in ob.fields)) { throw rtError(ob.type + ' 没有字段 ' + n.name, n.line); }
      return { get: function () { return ob.fields[n.name]; }, set: function (v) { ob.fields[n.name] = v; },
        desc: textOf(n.obj) + '->' + n.name, obj: b2.id, field: n.name };
    }
    throw rtError('这个表达式不能放在等号左边', n.line);
  }

  function defaultValue(ty) {
    if (ty.name === 'vector' || ty.name === 'array' || ty.name === 'deque' || ty.name === 'stack' || ty.name === 'queue' || ty.name === 'priority_queue') { return V.arr([]); }
    if (ty.name === 'string') { return V.str(''); }
    if (ty.name === 'map' || ty.name === 'unordered_map') { return V.map(); }
    if (ty.name === 'set' || ty.name === 'unordered_set') { return V.set(); }
    if (ty.name === 'bool') { return V.bool(false); }
    if (ty.name === 'char') { return V.str(''); }
    if (ty.ptr > 0 || isStructName(ty.name)) { return V.null(); }
    return V.num(0);
  }

  function evalInitList(n) {
    return V.arr(n.items.map(function (it) { return it.k === 'initlist' ? evalInitList(it) : ev(it); }));
  }

  function callUser(f, argVals, line) {
    if (++callCount > 20000) { throw rtError('函数调用次数过多，可能有无限递归', line); }
    if (depth >= DEPTH_MAX) { throw rtError('递归太深（超过 ' + DEPTH_MAX + ' 层），检查递归出口', line); }
    if (f.params.length !== argVals.length) {
      throw rtError(f.name + ' 需要 ' + f.params.length + ' 个参数，你给了 ' + argVals.length + ' 个', line);
    }
    var vars = {};
    f.params.forEach(function (pp, i) { vars[pp.name] = pp.ref ? argVals[i] : copyVal(argVals[i]); });
    frames.push({ name: f.name, vars: vars });
    depth++;
    var out = V.null();
    try {
      runStmt(f.body);
    } catch (e) {
      if (e && e.ctrl === 'return') { out = e.v || V.null(); }
      else { depth--; frames.pop(); throw e; }
    }
    depth--;
    frames.pop();
    return out;
  }

  function methodCall(base, name, argNodes, line) {
    var A = function () { return argNodes.map(ev); };
    if (base.k === 'arr') {
      switch (name) {
        case 'size': case 'length': return V.num(base.items.length);
        case 'empty': return V.bool(base.items.length === 0);
        case 'push_back': case 'emplace_back': case 'push': {
          var av = A(); base.items.push(copyVal(av[0] != null ? av[0] : V.num(0))); return V.null();
        }
        case 'pop_back': case 'pop':
          if (base.mode === 'queue' || base.mode === 'deque') { base.items.shift(); } else { base.items.pop(); }
          return V.null();
        case 'back': case 'top':
          if (!base.items.length) { throw rtError('容器是空的，不能取 back/top', line); }
          return base.items[base.items.length - 1];
        case 'front':
          if (!base.items.length) { throw rtError('容器是空的，不能取 front', line); }
          return base.items[0];
        case 'clear': base.items.length = 0; return V.null();
        case 'at': { var ix = numOf(ev(argNodes[0]), line);
          if (ix < 0 || ix >= base.items.length) { throw rtError('下标越界：' + ix, line); }
          return base.items[ix]; }
        case 'begin': case 'end': case 'rbegin': case 'rend':
          return { k: 'iter', target: base, kind: name };
        case 'resize': { var nn = numOf(ev(argNodes[0]), line);
          while (base.items.length < nn) { base.items.push(V.num(0)); }
          base.items.length = nn; return V.null(); }
        case 'insert': { var av2 = A(); base.items.push(copyVal(av2[av2.length - 1])); return V.null(); }
        case 'erase': { var av3 = A();
          if (av3[0] && av3[0].k === 'iter') { base.items.length = 0; return V.null(); }
          var ix2 = numOf(av3[0], line); base.items.splice(ix2, 1); return V.null(); }
      }
      throw rtError('容器没有方法 ' + name + '()', line);
    }
    if (base.k === 'str') {
      switch (name) {
        case 'size': case 'length': return V.num(base.v.length);
        case 'empty': return V.bool(base.v.length === 0);
        case 'substr': { var av4 = A(); var st = numOf(av4[0], line);
          var ln = av4[1] ? numOf(av4[1], line) : base.v.length - st;
          return V.str(base.v.substr(st, ln)); }
        case 'push_back': { var av5 = A(); base.v += (av5[0].k === 'str' ? av5[0].v : String.fromCharCode(numOf(av5[0], line))); return V.null(); }
        case 'pop_back': base.v = base.v.slice(0, -1); return V.null();
        case 'back': return V.str(base.v.charAt(base.v.length - 1));
        case 'front': return V.str(base.v.charAt(0));
        case 'clear': base.v = ''; return V.null();
        case 'find': { var av6 = A(); var pos = base.v.indexOf(av6[0].k === 'str' ? av6[0].v : String(numOf(av6[0], line)));
          return V.num(pos < 0 ? -1 : pos); }
        case 'c_str': return base;
        case 'append': { var av7 = A(); base.v += av7[0].v; return base; }
      }
      throw rtError('string 没有方法 ' + name + '()', line);
    }
    if (base.k === 'map') {
      switch (name) {
        case 'size': return V.num(Object.keys(base.m).length);
        case 'empty': return V.bool(Object.keys(base.m).length === 0);
        case 'count': { var kv = keyOf(ev(argNodes[0])); return V.num(kv in base.m ? 1 : 0); }
        case 'find': { var kv2 = keyOf(ev(argNodes[0])); return V.bool(kv2 in base.m); }
        case 'erase': { delete base.m[keyOf(ev(argNodes[0]))]; return V.num(1); }
        case 'clear': base.m = {}; return V.null();
        case 'insert': { var av8 = A();
          if (av8[0] && av8[0].k === 'arr' && av8[0].items.length === 2) { base.m[keyOf(av8[0].items[0])] = av8[0].items[1]; }
          return V.null(); }
      }
      throw rtError('map 没有方法 ' + name + '()', line);
    }
    if (base.k === 'set') {
      switch (name) {
        case 'size': return V.num(Object.keys(base.s).length);
        case 'empty': return V.bool(Object.keys(base.s).length === 0);
        case 'count': case 'find': { return V.num(keyOf(ev(argNodes[0])) in base.s ? 1 : 0); }
        case 'insert': base.s[keyOf(ev(argNodes[0]))] = 1; return V.null();
        case 'erase': delete base.s[keyOf(ev(argNodes[0]))]; return V.num(1);
        case 'clear': base.s = {}; return V.null();
      }
      throw rtError('set 没有方法 ' + name + '()', line);
    }
    if (base.k === 'ptr') { throw rtError('结构体指针没有方法 ' + name + '()，字段直接用 ->' + name, line); }
    throw rtError('这种值没有方法 ' + name + '()', line);
  }

  function builtin(name, argNodes, line) {
    var A = function () { return argNodes.map(ev); };
    switch (name) {
      case 'max': { var a = A(); return numOf(a[0], line) >= numOf(a[1], line) ? a[0] : a[1]; }
      case 'min': { var a2 = A(); return numOf(a2[0], line) <= numOf(a2[1], line) ? a2[0] : a2[1]; }
      case 'abs': { var a3 = A(); return V.num(Math.abs(numOf(a3[0], line))); }
      case 'sqrt': { var a4 = A(); return V.num(Math.floor(Math.sqrt(numOf(a4[0], line)))); }
      case 'pow': { var a5 = A(); return V.num(Math.round(Math.pow(numOf(a5[0], line), numOf(a5[1], line)))); }
      case '__max_elem': {
        var amx = A()[0];
        if (!amx || amx.k !== 'arr' || !amx.items.length) return V.num(0);
        return V.num(Math.max.apply(null, amx.items.map(function (it) { return numOf(it, line); })));
      }
      case '__min_elem': {
        var amn = A()[0];
        if (!amn || amn.k !== 'arr' || !amn.items.length) return V.num(0);
        return V.num(Math.min.apply(null, amn.items.map(function (it) { return numOf(it, line); })));
      }
      case '__sum_arr': {
        var asum = A();
        var acc = asum[1] ? numOf(asum[1], line) : 0;
        if (asum[0] && asum[0].k === 'arr') {
          asum[0].items.forEach(function (it) { acc += numOf(it, line); });
        }
        return V.num(acc);
      }
      case '__lower_bound': {
        var alb = A();
        var vecLb = alb[0] && alb[0].k === 'arr' ? alb[0].items : [];
        var tgtLb = numOf(alb[1], line);
        var lo = 0, hi = vecLb.length;
        while (lo < hi) {
          var mid = (lo + hi) >> 1;
          if (numOf(vecLb[mid], line) < tgtLb) lo = mid + 1; else hi = mid;
        }
        return V.num(lo);
      }
      case '__upper_bound': {
        var aub = A();
        var vecUb = aub[0] && aub[0].k === 'arr' ? aub[0].items : [];
        var tgtUb = numOf(aub[1], line);
        var lo2 = 0, hi2 = vecUb.length;
        while (lo2 < hi2) {
          var mid2 = (lo2 + hi2) >> 1;
          if (numOf(vecUb[mid2], line) <= tgtUb) lo2 = mid2 + 1; else hi2 = mid2;
        }
        return V.num(lo2);
      }
      case 'swap': {
        var r1 = refOf(argNodes[0]), r2 = refOf(argNodes[1]);
        var t = r1.get(); r1.set(r2.get()); r2.set(t); return V.null();
      }
      case 'sort': case 'stable_sort': case 'reverse': {
        var av = A();
        var tgt = av[0] && av[0].k === 'iter' ? av[0].target : av[0];
        if (!tgt || tgt.k !== 'arr') { throw rtError(name + ' 需要容器，例如 sort(v.begin(), v.end())', line); }
        if (name === 'reverse') { tgt.items.reverse(); return V.null(); }
        var desc = av.some(function (x) { return x && x.k === 'cmp' && x.dir < 0; });
        tgt.items.sort(function (x, y) {
          if (x.k === 'arr' && y.k === 'arr') {
            var n = Math.min(x.items.length, y.items.length);
            for (var i = 0; i < n; i++) {
              var d = numOf(x.items[i], line) - numOf(y.items[i], line);
              if (d !== 0) { return desc ? -d : d; }
            }
            return x.items.length - y.items.length;
          }
          if (x.k === 'str' || y.k === 'str') { var c = keyOf(x) < keyOf(y) ? -1 : keyOf(x) > keyOf(y) ? 1 : 0; return desc ? -c : c; }
          var d2 = numOf(x, line) - numOf(y, line);
          return desc ? -d2 : d2;
        });
        return V.null();
      }
      case 'greater': return { k: 'cmp', dir: -1 };
      case 'less': return { k: 'cmp', dir: 1 };
      case 'to_string': { var a6 = A(); return V.str(String(numOf(a6[0], line))); }
      case 'stoi': { var a7 = A(); return V.num(parseInt(a7[0].v, 10) || 0); }
      case 'make_pair': { var a8 = A(); return V.arr([a8[0], a8[1]]); }
      case '__gcd': case 'gcd': { var a9 = A(); var x = Math.abs(numOf(a9[0], line)), y = Math.abs(numOf(a9[1], line));
        while (y) { var tt = x % y; x = y; y = tt; } return V.num(x); }
      case 'count': { var a10 = A(); var tg = a10[0] && a10[0].k === 'iter' ? a10[0].target : a10[0];
        if (!tg || tg.k !== 'arr') { throw rtError('count 需要容器', line); }
        var want = a10[a10.length - 1], c2 = 0;
        tg.items.forEach(function (it) { if (equalVal(it, want)) { c2++; } });
        return V.num(c2); }
    }
    return undefined;
  }

  function ev(n) {
    curLine = n.line;
    switch (n.k) {
      case 'num': return V.num(n.v);
      case 'bool': return V.bool(n.v);
      case 'str': return V.str(n.v);
      case 'null': return V.null();
      case 'initlist': return evalInitList(n);
      case 'id': {
        var fr = lookupFrame(n.name);
        if (!fr) { throw rtError('变量 ' + n.name + ' 还没声明就被使用了（是不是漏了定义？）', n.line); }
        return fr.vars[n.name];
      }
      case 'new': {
        var argsV = (n.args || []).map(ev);
        return V.ptr(mkObj(n.type.name, argsV).id);
      }
      case 'index': return refOf(n).get();
      case 'mem': {
        var base = ev(n.obj);
        if (n.args) { return methodCall(base, n.name, n.args, n.line); }
        if (base.k === 'null') { throw rtError('空指针：' + textOf(n.obj) + ' 是 nullptr，不能取 ->' + n.name, n.line); }
        if (base.k !== 'ptr') { throw rtError(textOf(n.obj) + ' 不是指针，不能用 ->', n.line); }
        var ob = heap.objs[base.id];
        if (!ob) { throw rtError('对象已经不存在了', n.line); }
        if (!(n.name in ob.fields)) { throw rtError(ob.type + ' 没有字段 ' + n.name, n.line); }
        return ob.fields[n.name];
      }
      case 'un': {
        var v = ev(n.e);
        if (n.op === '!') { return V.bool(!truthy(v)); }
        if (n.op === '-') { return V.num(-numOf(v, n.line)); }
        if (n.op === '+') { return v; }
        if (n.op === '&') { return v; }
        if (n.op === '*') {
          if (v.k === 'null') { throw rtError('对 nullptr 解引用', n.line); }
          return v;
        }
        throw rtError('不支持的一元运算 ' + n.op, n.line);
      }
      case 'bin': {
        if (n.op === '&&') { return V.bool(truthy(ev(n.l)) && truthy(ev(n.r))); }
        if (n.op === '||') { return V.bool(truthy(ev(n.l)) || truthy(ev(n.r))); }
        var l = ev(n.l), r = ev(n.r);
        if (n.op === '==') { return V.bool(equalVal(l, r)); }
        if (n.op === '!=') { return V.bool(!equalVal(l, r)); }
        if (n.op === '+' && (l.k === 'str' || r.k === 'str')) {
          return V.str((l.k === 'str' ? l.v : String(numOf(l, n.line))) + (r.k === 'str' ? r.v : String(numOf(r, n.line))));
        }
        if ((l.k === 'str' || r.k === 'str') && ['<', '>', '<=', '>='].indexOf(n.op) >= 0) {
          var a1 = keyOf(l), b1 = keyOf(r);
          if (n.op === '<') { return V.bool(a1 < b1); }
          if (n.op === '>') { return V.bool(a1 > b1); }
          if (n.op === '<=') { return V.bool(a1 <= b1); }
          return V.bool(a1 >= b1);
        }
        var a = numOf(l, n.line), b = numOf(r, n.line);
        if (n.op === '+') { return V.num(a + b); }
        if (n.op === '-') { return V.num(a - b); }
        if (n.op === '*') { return V.num(a * b); }
        if (n.op === '/') { return V.num(b === 0 ? 0 : Math.trunc(a / b)); }
        if (n.op === '%') { return V.num(b === 0 ? 0 : a % b); }
        if (n.op === '<') { return V.bool(a < b); }
        if (n.op === '>') { return V.bool(a > b); }
        if (n.op === '<=') { return V.bool(a <= b); }
        if (n.op === '>=') { return V.bool(a >= b); }
        throw rtError('不支持的运算符 ' + n.op, n.line);
      }
      case 'post':
      case 'pre': {
        var rf = refOf(n.e), tv = rf.get();
        var nv = numOf(tv, n.line) + (n.op === '++' ? 1 : -1);
        rf.set(V.num(nv));
        return n.k === 'post' ? tv : V.num(nv);
      }
      case 'cond': return truthy(ev(n.c)) ? ev(n.a) : ev(n.b);
      case 'seqexpr': { var last = V.null(); n.items.forEach(function (it) { last = ev(it); }); return last; }
      case 'call': {
        if (n.fn.k === 'id') {
          var nm = n.fn.name;
          var f = fnMap[nm];
          if (f) { return callUser(f, n.args.map(ev), n.line); }
          var bi = builtin(nm, n.args, n.line);
          if (bi !== undefined) { return bi; }
          if (isStructName(nm)) { return V.ptr(mkObj(nm, n.args.map(ev)).id); }
          throw rtError('没有这个函数：' + nm + '（先定义它，或检查拼写）', n.line);
        }
        if (n.fn.k === 'mem') {
          var b2 = ev(n.fn.obj);
          return methodCall(b2, n.fn.name, n.args, n.line);
        }
        throw rtError('这种写法不能当函数调用', n.line);
      }
    }
    throw rtError('无法求值的表达式', n.line);
  }

  function assignTo(lhs, val) {
    var rf = refOf(lhs);
    rf.set(val);
    return rf.obj ? { obj: rf.obj, field: rf.field } : null;
  }

  var retVal = { has: false, v: null };

  function runStmt(n) {
    curLine = n.line;
    switch (n.k) {
      case 'block': n.body.forEach(runStmt); break;
      case 'empty': break;
      case 'decls': n.items.forEach(runStmt); break;
      case 'seq': n.items.forEach(function (it) { ev(it); }); break;
      case 'decl': {
        var val;
        if (n.init && n.init.k === 'ctor') {
          var ca = n.init.args.map(ev);
          if (n.type.ptr > 0 || isStructName(n.type.name)) {
            val = V.ptr(mkObj(n.type.name, ca).id);
          } else if (n.type.name === 'string') {
            val = V.str(ca[0] ? (ca[0].k === 'str' ? ca[0].v : String(numOf(ca[0], n.line))) : '');
          } else if (n.type.name === 'vector' || n.type.name === 'array' || n.type.name === 'deque' ||
                     n.type.name === 'stack' || n.type.name === 'queue' || n.type.name === 'priority_queue') {
            if (ca[0] && ca[0].k === 'arr') { val = V.arr(ca[0].items.slice()); }
            else if (ca[0] && ca[0].k === 'iter') { val = V.arr(ca[0].target.items.slice()); }
            else {
              var sz = ca.length ? numOf(ca[0], n.line) : 0;
              var inner = n.type.args && n.type.args[0] ? n.type.args[0] : 'int';
              var dv = ca.length > 1 ? ca[1] : defaultValue({ name: inner, args: [], ptr: 0 });
              var its = [];
              for (var i = 0; i < sz; i++) { its.push(copyVal(dv)); }
              val = V.arr(its);
            }
          } else {
            val = ca.length ? ca[0] : defaultValue(n.type);
          }
          if (val && val.k === 'arr' && !val.mode) { val.mode = n.type.name; }
        } else if (n.init && n.init.k === 'initlist') {
          val = evalInitList(n.init);
          if (n.type.name === 'string') {
            val = V.str(val.items.map(function (x) { return x.k === 'str' ? x.v : String.fromCharCode(numOf(x, n.line)); }).join(''));
          }
        } else if (n.init) {
          val = ev(n.init);
          if (n.type.name === 'string' && val.k !== 'str') { val = V.str(val.k === 'num' ? String(val.v) : ''); }
          if (!n.type.ref) { val = copyVal(val); }
        } else if (n.arrSize) {
          var sz2 = numOf(ev(n.arrSize), n.line);
          var dv2 = defaultValue({ name: n.type.name, args: [], ptr: n.type.ptr });
          var its2 = [];
          for (var j = 0; j < sz2; j++) { its2.push(copyVal(dv2)); }
          val = V.arr(its2);
        } else if (n.type.ptr > 0) {
          val = V.null();
        } else if (isStructName(n.type.name)) {
          val = V.ptr(mkObj(n.type.name, []).id);
        } else {
          val = defaultValue(n.type);
        }
        if (n.type.name === 'priority_queue') {
          throw rtError('priority_queue（堆）内置解释器还没实现，这题请切到在线编译用真实 g++', n.line);
        }
        if (val && val.k === 'arr' && !val.mode &&
            ['vector', 'array', 'deque', 'stack', 'queue'].indexOf(n.type.name) >= 0) { val.mode = n.type.name; }
        top().vars[n.name] = val;
        pushStep(n.line, '声明 ' + n.name + ' = ' + label(val));
        break;
      }
      case 'assign': {
        var v2 = ev(n.rhs);
        if (n.op && n.op !== '=') {
          var old = refOf(n.lhs).get();
          var op = n.op.charAt(0);
          if (op === '+' && (old.k === 'str' || v2.k === 'str')) {
            v2 = V.str((old.k === 'str' ? old.v : String(numOf(old, n.line))) + (v2.k === 'str' ? v2.v : String(numOf(v2, n.line))));
          } else {
            var x = numOf(old, n.line), y = numOf(v2, n.line);
            v2 = V.num(op === '+' ? x + y : op === '-' ? x - y : op === '*' ? x * y : op === '/' ? (y === 0 ? 0 : Math.trunc(x / y)) : (y === 0 ? 0 : x % y));
          }
        }
        var ch = assignTo(n.lhs, v2);
        pushStep(n.line, textOf(n.lhs) + ' ← ' + label(v2), ch);
        break;
      }
      case 'expr': ev(n.e); pushStep(n.line, '执行：' + textOf(n.e)); break;
      case 'if': {
        var c = ev(n.c);
        pushStep(n.line, '条件 ' + textOf(n.c) + ' → ' + (truthy(c) ? '真' : '假'));
        if (truthy(c)) { runStmt(n.then); } else if (n.els) { runStmt(n.els); }
        break;
      }
      case 'while': {
        var guard = 0;
        while (true) {
          var cv = ev(n.c);
          pushStep(n.line, '判断 ' + textOf(n.c) + ' → ' + (truthy(cv) ? '真，进入循环' : '假，退出循环'));
          if (!truthy(cv)) { break; }
          try { runStmt(n.body); }
          catch (e) {
            if (e && e.ctrl === 'break') { break; }
            if (!(e && e.ctrl === 'continue')) { throw e; }
          }
          if (++guard > LOOP_MAX) { throw rtError('循环执行超过 ' + LOOP_MAX + ' 次，已停止', n.line); }
        }
        break;
      }
      case 'dowhile': {
        var g0 = 0;
        while (true) {
          try { runStmt(n.body); }
          catch (e) {
            if (e && e.ctrl === 'break') { break; }
            if (!(e && e.ctrl === 'continue')) { throw e; }
          }
          var cv0 = ev(n.c);
          pushStep(n.line, '判断 ' + textOf(n.c) + ' → ' + (truthy(cv0) ? '真，继续' : '假，退出'));
          if (!truthy(cv0)) { break; }
          if (++g0 > LOOP_MAX) { throw rtError('循环执行超过 ' + LOOP_MAX + ' 次，已停止', n.line); }
        }
        break;
      }
      case 'foreach': {
        var coll = ev(n.coll);
        var items;
        if (coll.k === 'arr') { items = coll.items.slice(); }
        else if (coll.k === 'str') { items = coll.v.split('').map(V.str); }
        else if (coll.k === 'set') { items = Object.keys(coll.s).map(function (k) { return /^-?\d+$/.test(k) ? V.num(Number(k)) : V.str(k); }); }
        else if (coll.k === 'map') { items = Object.keys(coll.m).map(function (k) { return V.arr([/^-?\d+$/.test(k) ? V.num(Number(k)) : V.str(k), coll.m[k]]); }); }
        else { throw rtError('范围 for 只能遍历数组 / vector / string / set / map', n.line); }
        for (var fi = 0; fi < items.length; fi++) {
          top().vars[n.name] = n.type.ref ? items[fi] : copyVal(items[fi]);
          pushStep(n.line, n.name + ' = ' + label(top().vars[n.name]) + '（遍历第 ' + (fi + 1) + ' 个）');
          try { runStmt(n.body); }
          catch (e) {
            if (e && e.ctrl === 'break') { break; }
            if (!(e && e.ctrl === 'continue')) { throw e; }
          }
          if (fi > LOOP_MAX) { throw rtError('遍历次数过多，已停止', n.line); }
        }
        break;
      }
      case 'for': {
        if (n.init) { runStmt(n.init); }
        var g2 = 0;
        while (true) {
          if (n.c) {
            var cv2 = ev(n.c);
            pushStep(n.line, '判断 ' + textOf(n.c) + ' → ' + (truthy(cv2) ? '真，进入循环' : '假，退出循环'));
            if (!truthy(cv2)) { break; }
          }
          try { runStmt(n.body); }
          catch (e) {
            if (e && e.ctrl === 'break') { break; }
            if (!(e && e.ctrl === 'continue')) { throw e; }
          }
          if (n.step) { ev(n.step); }
          if (++g2 > LOOP_MAX) { throw rtError('循环执行超过 ' + LOOP_MAX + ' 次，已停止', n.line); }
        }
        break;
      }
      case 'return': {
        var rv = n.e ? ev(n.e) : V.null();
        pushStep(n.line, 'return ' + label(rv));
        if (depth === 0) { retVal = { has: true, v: rv }; }
        throw { ctrl: 'return', v: rv };
      }
      case 'break': throw { ctrl: 'break' };
      case 'continue': throw { ctrl: 'continue' };
      default: throw rtError('暂不支持的语句类型 ' + n.k, n.line);
    }
  }

  /* ---- 参数 ---- */
  function parseLiteral(seg) {
    var s = String(seg).trim();
    if (!s) { return null; }
    if (s === 'null' || s === 'nullptr') { return null; }
    if (s === 'true') { return true; }
    if (s === 'false') { return false; }
    if (/^-?\d+(\.\d+)?$/.test(s)) { return Number(s); }
    if (s.charAt(0) === '[' || s.charAt(0) === '"' || s.charAt(0) === '{') {
      try { return JSON.parse(s); }
      catch (e) {
        try { return JSON.parse(s.replace(/'/g, '"')); }
        catch (e2) { throw parseError('参数不是合法的数组 / 字符串：' + s, target.line); }
      }
    }
    return s;
  }

  function jsToVal(x) {
    if (x === null || x === undefined) { return V.null(); }
    if (typeof x === 'number') { return V.num(x); }
    if (typeof x === 'boolean') { return V.bool(x); }
    if (typeof x === 'string') { return V.str(x); }
    if (Array.isArray(x)) { return V.arr(x.map(jsToVal)); }
    return V.num(0);
  }

  function chainOf(nums, typeNameS) {
    var objs = nums.map(function (x) { return mkObj(typeNameS, [V.num(x)]); });
    objs.forEach(function (o, i) { o.fields.next = i + 1 < objs.length ? V.ptr(objs[i + 1].id) : V.null(); });
    return objs.length ? V.ptr(objs[0].id) : V.null();
  }

  function treeOf(arr) {
    if (!arr.length || arr[0] === null) { return V.null(); }
    var nodes = arr.map(function (x) { return x === null ? null : mkObj('TreeNode', [V.num(x)]); });
    var qi = 0, kids = 1;
    while (qi < nodes.length && kids < nodes.length) {
      var nd = nodes[qi++];
      if (!nd) { continue; }
      if (kids < nodes.length) { nd.fields.left = nodes[kids] ? V.ptr(nodes[kids].id) : V.null(); kids++; }
      if (kids < nodes.length) { nd.fields.right = nodes[kids] ? V.ptr(nodes[kids].id) : V.null(); kids++; }
    }
    return V.ptr(nodes[0].id);
  }

  var raw = String(paramsText || '').split('|').map(function (s) { return s.trim(); });
  if (target.params.length > 0 && raw.length !== target.params.length) {
    throw parseError('这个函数有 ' + target.params.length + ' 个参数，请在参数框里用 | 分开（例如 [1,3,5] | 2）', target.line);
  }

  target.params.forEach(function (pr, i) {
    var seg = raw[i] || '';
    curLine = target.line;
    var lit = parseLiteral(seg);
    if (pr.ptr > 0 || isStructName(pr.type)) {
      if (!Array.isArray(lit)) { throw parseError('参数 ' + pr.name + ' 是' + (pr.type === 'TreeNode' ? '二叉树' : '链表') + '，请写成 [1,2,3] 的形式', target.line); }
      if (pr.type === 'TreeNode') {
        top().vars[pr.name] = treeOf(lit);
      } else {
        var nums = lit.filter(function (x) { return x !== null; }).map(Number);
        if (nums.some(function (x) { return !isFinite(x); })) { throw parseError('参数 ' + pr.name + ' 里有无法识别的数字', target.line); }
        top().vars[pr.name] = chainOf(nums.map(Math.round), pr.type);
      }
      return;
    }
    if (pr.type === 'string' || pr.type === 'char') {
      top().vars[pr.name] = V.str(lit == null ? '' : String(lit));
    } else if (pr.type === 'bool') {
      top().vars[pr.name] = V.bool(!!lit);
    } else if (pr.type === 'vector' || pr.type === 'array' || pr.type === 'deque' || pr.type === 'stack' || pr.type === 'queue') {
      if (!Array.isArray(lit)) { throw parseError('参数 ' + pr.name + ' 是数组，请写成 [1,2,3]', target.line); }
      top().vars[pr.name] = jsToVal(lit);
    } else if (pr.type === 'map' || pr.type === 'unordered_map' || pr.type === 'set' || pr.type === 'unordered_set') {
      var mv = (pr.type.indexOf('map') >= 0) ? V.map() : V.set();
      if (lit && typeof lit === 'object' && !Array.isArray(lit)) {
        Object.keys(lit).forEach(function (k) { if (mv.k === 'map') { mv.m[k] = jsToVal(lit[k]); } else { mv.s[k] = 1; } });
      }
      top().vars[pr.name] = mv;
    } else {
      var nv = Number(lit);
      if (!isFinite(nv)) { throw parseError('参数 ' + pr.name + ' 需要一个数字', target.line); }
      top().vars[pr.name] = V.num(nv);
    }
  });

  /* ---- 执行 ---- */
  var error = null, stopped = false;
  try {
    runStmt(target.body);
  } catch (e) {
    if (e && e.ctrl === 'return') { /* 正常返回 */ }
    else if (e && e.ctrl === 'break') { /* 忽略 */ }
    else if (e && e.ctrl === 'stop') { stopped = true; error = e; }
    else {
      error = e;
      var line = e.cpline || curLine;
      try {
        steps.push({ line: line, env: snapEnv(), heap: snapHeap(), note: '⛔ ' + e.message, changed: null, error: true });
      } catch (ignore) { /* 步数超限 */ }
    }
  }

  return {
    steps: steps,
    lines: lines,
    fnName: target.name,
    sig: target.name + '(' + target.params.map(function (pp) { return (pp.raw || pp.type) + (pp.ptr ? '*' : '') + ' ' + pp.name; }).join(', ') + ')',
    result: retVal,
    finalEnv: frames[0].vars,
    finalHeap: snapHeap(),
    error: error,
    stopped: stopped
  };
}

/* ---------- 智能参数自动生成器（根据函数签名与题型语义自动生成合法测例） ---------- */
function generateAutoParams(src, prob) {
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  var params = [];
  try {
    var code = preprocess(src || '');
    var toks = lex(code);
    var prog = parseProgram(toks);
    if (prog && prog.funcs && prog.funcs.length) {
      var target = prog.funcs[prog.funcs.length - 1];
      for (var i = prog.funcs.length - 1; i >= 0; i--) {
        if (prog.funcs[i].name !== 'main' && prog.funcs[i].params.length > 0) {
          target = prog.funcs[i];
          break;
        }
      }
      params = target.params || [];
    }
  } catch (e) {
    // 语法解析失败时退化为正则提取函数签名参数
    var m = String(src || '').match(/[a-zA-Z0-9_<>*&\s]+\s+[a-zA-Z0-9_]+\s*\(([^)]*)\)/);
    if (m && m[1].trim()) {
      params = m[1].split(',').map(function (seg) {
        var s = seg.trim().replace(/\s*&\s*/g, ' ').replace(/\bconst\b/g, '').trim();
        var parts = s.split(/\s+/);
        var name = parts.pop() || 'arg';
        var raw = parts.join(' ');
        var ptr = (raw.indexOf('*') >= 0 || name.indexOf('*') >= 0) ? 1 : 0;
        name = name.replace(/\*/g, '');
        var type = raw.replace(/\*/g, '').replace(/<.*>/, '').trim();
        return { type: type, raw: raw, name: name, ptr: ptr };
      });
    }
  }

  if (!params.length) { return ''; }

  var hint = ((prob && (prob.title + ' ' + prob.slug + ' ' + prob.mod)) || '').toLowerCase();
  var lastArr = null;
  var lastStr = null;

  var out = params.map(function (pr) {
    var raw = (pr.raw || pr.type || '').toLowerCase();
    var type = (pr.type || '').toLowerCase();
    var pname = (pr.name || '').toLowerCase();

    // 1. 二叉树 TreeNode*
    if (type === 'treenode' || raw.indexOf('treenode') >= 0) {
      if (/bst|二叉搜索树|搜索树/.test(hint)) {
        return JSON.stringify(pick([[4, 2, 7, 1, 3], [5, 3, 7, 2, 4, 6, 8], [6, 2, 8, 0, 4, 7, 9]]));
      }
      return JSON.stringify(pick([
        [3, 9, 20, null, null, 15, 7],
        [1, 2, 3, 4, 5, null, 6],
        [1, 2, 2, 3, 4, 4, 3],
        [1, 2, 3, null, 4, 5, null]
      ]));
    }

    // 2. 链表 ListNode*
    if (type === 'listnode' || pr.ptr > 0 || raw.indexOf('listnode') >= 0) {
      var len = randInt(4, 6);
      var list = [];
      if (/duplicate|merge|sort|重复|合并|有序/.test(hint)) {
        var cur = 1;
        for (var li = 0; li < len; li++) {
          list.push(cur);
          cur += randInt(0, 2);
        }
      } else {
        for (var lj = 0; lj < len; lj++) {
          list.push(randInt(1, 9));
        }
      }
      lastArr = list;
      return JSON.stringify(list);
    }

    // 3. 二维数组 vector<vector<int>>
    if (/vector\s*<\s*vector/.test(raw)) {
      if (/interval|区间|merge/.test(hint + pname)) {
        var ivs = [], st = 1;
        for (var ii = 0; ii < 4; ii++) {
          var ed = st + randInt(2, 4);
          ivs.push([st, ed]);
          st = ed + randInt(-1, 3);
        }
        return JSON.stringify(ivs);
      }
      if (/grid|island|岛|01|矩阵/.test(hint + pname)) {
        var g = [];
        for (var r = 0; r < 3; r++) {
          var row = [];
          for (var c = 0; c < 4; c++) { row.push(Math.random() < 0.45 ? 1 : 0); }
          g.push(row);
        }
        return JSON.stringify(g);
      }
      return JSON.stringify([[randInt(1, 5), randInt(1, 5), randInt(1, 5)], [randInt(1, 5), randInt(1, 5), randInt(1, 5)]]);
    }

    // 4. 字符串数组 vector<string>
    if (/vector\s*<\s*string/.test(raw)) {
      return JSON.stringify(pick([
        ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
        ['flower', 'flow', 'flight'],
        ['abc', 'bca', 'cab', 'xyz']
      ]));
    }

    // 5. 一维数组 vector<int> / arr
    if (type === 'vector' || raw.indexOf('vector') >= 0) {
      var vlen = randInt(5, 7);
      var vec = [];
      if (/binary|search|二分/.test(hint)) {
        var base = randInt(1, 3);
        for (var vi = 0; vi < vlen; vi++) {
          vec.push(base);
          base += randInt(1, 4);
        }
      } else if (/subarray|子数组|负数|maxsubarray|sum/.test(hint)) {
        for (var vj = 0; vj < vlen; vj++) {
          vec.push(randInt(-4, 8));
        }
      } else {
        for (var vk = 0; vk < vlen; vk++) {
          vec.push(randInt(1, 12));
        }
      }
      lastArr = vec;
      return JSON.stringify(vec);
    }

    // 6. 字符串 string
    if (type === 'string' || raw.indexOf('string') >= 0) {
      var sVal = '';
      if (/parenthes|bracket|括号/.test(hint)) {
        sVal = pick(['()[]{}', '({[]})', '((()))', '([)]']);
      } else if (/palindrom|回文/.test(hint)) {
        sVal = pick(['babad', 'cbbd', 'abccba', 'racecar']);
      } else if (/decode|解码|digit|ip/.test(hint)) {
        sVal = pick(['226', '11106', '1234', '2326']);
      } else if (/vowel|元音/.test(hint)) {
        var chs = 'aeioubcdfg';
        var slen = randInt(7, 9);
        for (var si = 0; si < slen; si++) { sVal += chs[randInt(0, chs.length - 1)]; }
      } else {
        var alpha = 'abcde';
        var slen2 = randInt(6, 8);
        for (var sj = 0; sj < slen2; sj++) { sVal += alpha[randInt(0, alpha.length - 1)]; }
      }
      lastStr = sVal;
      return '"' + sVal + '"';
    }

    // 7. 字符 / 布尔
    if (type === 'char') { return "'" + pick(['a', 'b', 'c', '1']) + "'"; }
    if (type === 'bool') { return Math.random() < 0.5 ? 'true' : 'false'; }

    // 8. 整型 / 数值参数 (上下文智能适配)
    if (/^(k|len|size|limit|w)$/.test(pname)) {
      var maxLen = lastArr ? lastArr.length : (lastStr ? lastStr.length : 6);
      return String(randInt(2, Math.max(2, Math.min(4, maxLen - 1))));
    }
    if (/^(target|val|x|key)$/.test(pname)) {
      if (lastArr && lastArr.length >= 2) {
        if (/twosum|两数之和/.test(hint)) {
          var i1 = randInt(0, lastArr.length - 2);
          var i2 = randInt(i1 + 1, lastArr.length - 1);
          return String(lastArr[i1] + lastArr[i2]);
        }
        if (Math.random() < 0.75) {
          return String(pick(lastArr));
        }
      }
      return String(randInt(1, 15));
    }
    if (/^(n|m|num|rows|cols|amount)$/.test(pname)) {
      return String(randInt(3, 7));
    }
    return String(randInt(1, 9));
  });

  return out.join(' | ');
}