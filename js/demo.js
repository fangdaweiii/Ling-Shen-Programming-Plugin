/* demo.js - 逐行调试与可视化执行动画 */
var DM = {
  pid: '', steps: [], idx: 0, occ: {}, lines: [], timer: null,
  playing: false, speed: 900, nodeEls: {}, run: null, err: ''
};
var DMW = { NW: 74, NH: 48, GAP: 46, X0: 58 };

function dmEl(id) { return document.getElementById(id); }
function dmP() { return probById(DM.pid) || CUR; }

/* ---------- 打开 / 关闭 ---------- */
function demoOpen(srcOverride) {
  var p = CUR;
  if (!p) { return; }
  DM.pid = p.id;
  dmEl('dSub').textContent = MODULES[modIndex(p.mod)].name + ' · ' + p.title + ' · ' + p.lc;
  dmEl('dMask').classList.add('on');
  document.body.style.overflow = 'hidden';

  var pm = dmEl('dParams');
  pm.value = (p.params && p.params[0]) || '';
  pm.classList.toggle('bad', !(p.params && p.params.length));

  var chips = dmEl('dParamChips'), html = '';
  (p.params || []).slice(0, 4).forEach(function (t) {
    html += '<button type="button" class="dptag" data-p="' + escHtml(t) + '">' + escHtml(t) + '</button>';
  });
  chips.innerHTML = html;
  chips.style.display = (p.params && p.params.length) ? '' : 'none';

  demoRun(srcOverride || ta.value || p.template);
}

function demoClose() {
  dmEl('dMask').classList.remove('on');
  document.body.style.overflow = '';
  dmPause();
}

/* ---------- 解析 + 生成步骤 ---------- */
function demoRun(srcOverride) {
  var p = dmP();
  var hasRealCode = ta && ta.value && ta.value.trim().replace(/\/\/[^\n]*/g, '').trim().length > 0;
  var src = srcOverride || (hasRealCode ? ta.value : (p.ref ? p.ref.join('\n') : p.template));
  var params = (dmEl('dParams').value || '').trim();
  if (!params) {
    if (p.params && p.params.length) {
      params = p.params[0];
    } else if (typeof generateAutoParams === 'function') {
      params = generateAutoParams(src, p);
    }
    if (params) { dmEl('dParams').value = params; }
  }
  dmPause();
  DM.steps = []; DM.idx = 0; DM.err = ''; DM.occ = {}; DM.nodeEls = {};
  DM.lines = String(src).split('\n');

  var expArgs = p.params && p.params.length ? p.params[0].split('|').length : 1;
  var gotArgs = params ? params.split('|').length : 0;
  if (params && p.params && p.params.length && gotArgs !== expArgs) {
    DM.err = '参数个数不对：这个函数有 ' + expArgs + ' 个参数，你写了 ' + gotArgs + ' 个';
    dmBuildCode(); dmClearScene();
    dmEl('dErr').style.display = 'block';
    dmEl('dErr').innerHTML = '<b>参数格式不对</b><br>' + escHtml(DM.err) +
      '<div style="margin-top:6px;color:var(--mute)">照这个写：' + escHtml((p.params && p.params[0]) || '[1,2,3]') + '</div>';
    dmEl('dBadge').textContent = '—'; dmEl('dNote').textContent = ''; dmEl('dVars').innerHTML = '';
    dmEl('dCounter').textContent = '0 / 0'; dmEl('dBar').style.width = '0'; dmEl('dResult').style.display = 'none';
    return;
  }

  var r = null;
  try { r = analyze(src, params); }
  catch (e) { DM.err = (e && e.message) || '代码解析失败'; }

  if (r && r.error) { DM.err = r.error.message || '执行出错'; }
  if (r && r.steps && r.steps.length) {
    DM.run = r; DM.steps = r.steps; DM.lines = r.lines || DM.lines;
    DM.steps.forEach(function (s, i) {
      DM.occ[s.line] = DM.occ[s.line] || [];
      DM.occ[s.line].push(i);
    });
  }

  dmEl('dErr').style.display = DM.err ? 'block' : 'none';
  dmEl('dErr').innerHTML = DM.err ? (
    '<b>演示失败</b><br>' + escHtml(DM.err) +
    '<div style="margin-top:8px;color:var(--mute)">演示支持链表、二叉树、数组 / vector、字符串和递归；跑不动通常是语法或数据太大。' +
    '<br>可以点下面的按钮换题解代码试试，或者直接用「在线编译」跑这题。</div>' +
    '<div style="display:flex;gap:8px;margin-top:10px"><button class="btn sm" id="dUseRef" type="button">载入题解代码</button>' +
    '<button class="btn sm" id="dBack" type="button">先关掉</button></div>'
  ) : '';

  dmBuildCode();
  if (!DM.steps.length) {
    dmClearScene();
    dmEl('dBadge').textContent = '—';
    dmEl('dNote').textContent = '';
    dmEl('dNote').classList.remove('bad');
    dmEl('dVars').innerHTML = '';
    dmEl('dResult').style.display = 'none';
    dmEl('dBar').style.width = '0';
    dmEl('dCounter').textContent = '0 / 0';
  }
  if (DM.steps.length) {
    dmEl('dEmpty').style.display = 'none';
    dmRender();
  } else {
    dmEl('dEmpty').style.display = '';
    dmEl('dEmpty').textContent = '没有可播放的步骤。';
    dmEl('dCounter').textContent = '0 / 0';
  }
  var ref = dmEl('dUseRef');
  if (ref) { ref.addEventListener('click', function () { demoRun(p.ref ? p.ref.join('\n') : ''); }); }
  var back = dmEl('dBack');
  if (back) { back.addEventListener('click', demoClose); }
}

function dmClearScene() {
  dmEl('dLanes').innerHTML = '';
  dmEl('dChips').innerHTML = '';
  dmEl('dLabels').innerHTML = '';
  dmEl('dArrows').innerHTML = '';
  DM.nodeEls = {};
  var plane = dmEl('dPlane');
  plane.style.width = '100%';
  plane.style.height = '240px';
}

/* ---------- 代码面板 ---------- */
function dmHl(line) {
  var idx = line.indexOf('//'), code = idx >= 0 ? line.slice(0, idx) : line, cm = idx >= 0 ? line.slice(idx) : '';
  var out = escHtml(code)
    .replace(/\b(while|for|if|else|return|break|continue|new|nullptr|true|false|struct|const|auto)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(int|bool|char|double|long|void|ListNode|TreeNode|vector|string|queue|stack|unordered_map|unordered_set|set|map)\b/g, '<span class="ty">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  return out + (cm ? '<span class="cm">' + escHtml(cm) + '</span>' : '');
}
function dmBuildCode() {
  var box = dmEl('dCode'), html = '';
  DM.lines.forEach(function (line, i) {
    var n = i + 1;
    html += '<div class="drow" data-line="' + n + '"><span class="dln">' + n + '</span>' +
      '<span class="dsrc">' + (dmHl(line) || '&nbsp;') + '</span></div>';
  });
  box.innerHTML = html;
  Array.prototype.forEach.call(box.children, function (row) {
    row.addEventListener('click', function () { dmJump(Number(row.getAttribute('data-line'))); });
  });
}

/* ---------- 场景推导（链表 / 树 / 散点） ---------- */
function dmBuildScene(step) {
  var comps = [], chips = [], visited = {};
  var vars = Object.keys(step.env);
  var ids = Object.keys(step.heap);

  /* 无向邻接：把 next / left / right 都当边，才能把"指回去"的节点收进同一组 */
  var adj = {}, rev = {};
  ids.forEach(function (id) { adj[id] = []; rev[id] = []; });
  ids.forEach(function (id) {
    var ob = step.heap[id];
    ['next', 'left', 'right'].forEach(function (fk) {
      var f = ob.fields[fk];
      if (f && f.k === 'ptr' && step.heap[f.id]) { adj[id].push(f.id); rev[f.id].push(id); }
    });
  });

  function varsAt(id) {
    return vars.filter(function (n) {
      var v = step.env[n];
      return v && v.k === 'ptr' && v.id === id;
    });
  }
  vars.forEach(function (name) {
    var v = step.env[name];
    if (!v || v.k !== 'ptr' || !step.heap[v.id]) { return; }
    chips.push({ name: name, id: v.id });
  });

  function collect(startId) {
    var order = [], seen = {}, q = [startId], isTree = false;
    while (q.length) {
      var id = q.shift();
      if (seen[id] || !step.heap[id]) { continue; }
      seen[id] = 1; order.push(id); visited[id] = 1;
      var ob = step.heap[id];
      if ('left' in ob.fields || 'right' in ob.fields) { isTree = true; }
      adj[id].concat(rev[id]).forEach(function (n) { if (!seen[n]) { q.push(n); } });
    }
    return { order: order, isTree: isTree };
  }

  /* 先从变量出发分组，剩下的算脱链节点 */
  vars.forEach(function (name) {
    var v = step.env[name];
    if (!v || v.k !== 'ptr' || !step.heap[v.id] || visited[v.id]) { return; }
    var c = collect(v.id);
    var lab = varsAt(v.id).join(' / ');
    comps.push({ kind: c.isTree ? 'tree' : 'chain', root: v.id, ids: ordChain(c.order),
      label: lab || '链表', orphan: false });
  });
  ids.forEach(function (id) {
    if (visited[id] || !step.heap[id]) { return; }
    var c = collect(id);
    comps.push({ kind: c.isTree ? 'tree' : 'chain', root: id, ids: ordChain(c.order), label: '已脱链', orphan: true });
  });

  return { comps: comps, chips: chips };
}

function ordChain(ids) {
  var arr = ids.slice();
  var allNum = arr.every(function (id) { return /^\D*\d+$/.test(id); });
  if (!allNum) { return arr; }
  arr.sort(function (a, b) { return numbers(a) - numbers(b); });
  return arr;
}
function numbers(id) { var m = /\d+$/.exec(id); return m ? Number(m[0]) : 0; }

function dmLayout(sc, step) {
  var NW = DMW.NW, NH = DMW.NH, GAP = DMW.GAP, X0 = DMW.X0;
  var pos = {}, y = 34, maxX = 0, labels = [];

  sc.comps.forEach(function (c) {
    labels.push({ label: c.label, y: y + NH / 2, kind: c.orphan ? 'orphan' : '' });
    if (c.kind === 'tree') {
      var idx = 0, tmp = {}, depthMax = 0;
      (function walk(id, d) {
        if (!id || !step.heap[id] || tmp[id]) { return; }
        var o = step.heap[id];
        walk(o.fields.left && o.fields.left.k === 'ptr' ? o.fields.left.id : null, d + 1);
        tmp[id] = { i: idx++, d: d };
        depthMax = Math.max(depthMax, d);
        walk(o.fields.right && o.fields.right.k === 'ptr' ? o.fields.right.id : null, d + 1);
      })(c.root, 0);
      c.ids.forEach(function (id) { if (!tmp[id]) { tmp[id] = { i: idx++, d: 0 }; } });
      Object.keys(tmp).forEach(function (id) {
        pos[id] = { x: X0 + tmp[id].i * (NW + 66), y: y + tmp[id].d * (NH + 38) + NH / 2 };
      });
      maxX = Math.max(maxX, X0 + idx * (NW + 66));
      y += (depthMax + 1) * (NH + 38) + 46;
    } else {
      c.ids.forEach(function (id, i) { pos[id] = { x: X0 + i * (NW + GAP), y: y + NH / 2 }; });
      maxX = Math.max(maxX, X0 + c.ids.length * (NW + GAP));
      y += NH + 84;
    }
  });

  return { pos: pos, width: Math.max(maxX + NW + 20, 360), height: y + 18, labels: labels };
}

/* ---------- 渲染一步 ---------- */
function dmRender() {
  var NW = DMW.NW, NH = DMW.NH;
  var step = DM.steps[DM.idx];
  if (!step) { return; }
  var sc = dmBuildScene(step), L = dmLayout(sc, step);
  DM.kind = {};
  sc.comps.forEach(function (c) { c.ids.forEach(function (id) { DM.kind[id] = c.kind; }); });
  var plane = dmEl('dPlane');

  var noPtr = Object.keys(step.heap).length === 0;
  plane.style.width = Math.max(L.width, dmEl('dWrap').clientWidth) + 'px';
  plane.style.height = noPtr ? '92px' : Math.max(L.height, 240) + 'px';
  var arrBox = dmEl('dArrays');
  if (arrBox) { arrBox.classList.toggle('big', noPtr); }
  var wrap = dmEl('dWrap');
  if (wrap) {
    wrap.style.flex = noPtr ? '0 0 auto' : '';
    wrap.style.minHeight = noPtr ? '0' : '';
    wrap.style.overflow = noPtr ? 'visible' : '';
  }
  var pl = dmEl('dPlane');
  if (pl) { pl.style.minHeight = noPtr ? '72px' : ''; }
  if (!noPtr) {
    var hint = dmEl('dLanes').querySelector('.dsceneHint');
    if (hint) { hint.parentNode.removeChild(hint); }
  }
  if (noPtr) {
    DM.nodeEls = {};
    dmEl('dLanes').innerHTML = '<div class="dsceneHint">这题没有指针：看下面的数组，每格一个元素，橙色是本步改动。</div>';
    dmEl('dLabels').innerHTML = '';
    dmEl('dArrows').innerHTML = '';
    dmEl('dChips').innerHTML = '';
  }

  var seen = {};
  Object.keys(L.pos).forEach(function (id) {
    var p = L.pos[id], ob = step.heap[id];
    if (!ob) { return; }
    seen[id] = 1;
    var el = DM.nodeEls[id];
    if (!el) {
      el = document.createElement('div');
      el.className = 'dnode';
      el.innerHTML = '<span class="v"></span><span class="k"></span>';
      el.style.opacity = '0';
      dmEl('dLanes').appendChild(el);
      DM.nodeEls[id] = el;
    }
    var vf = ob.fields.val;
    el.querySelector('.v').textContent = (vf && vf.k === 'num') ? String(vf.v) : (ob.type || 'node');
    el.querySelector('.k').textContent = id;
    el.style.opacity = '1';
    el.style.width = NW + 'px';
    el.style.height = NH + 'px';
    el.style.transform = 'translate(' + p.x + 'px,' + (p.y - NH / 2) + 'px)';
    var ch = step.changed && step.changed.obj === id;
    el.classList.toggle('chg', !!ch);
    el.classList.toggle('orp', DM.kind[id] === 'orphan');
  });
  Object.keys(DM.nodeEls).forEach(function (id) {
    if (!seen[id]) { DM.nodeEls[id].style.opacity = '0'; }
  });

  dmEl('dLabels').innerHTML = (L.labels || []).map(function (r) {
    return '<div class="dlabel' + (r.kind === 'orphan' ? ' orp' : '') + '" style="top:' + r.y + 'px">' + escHtml(r.label) + '</div>';
  }).join('');

  var rowsAt = {}, chipHtml = '';
  sc.chips.forEach(function (c) {
    var p = L.pos[c.id];
    if (!p) { return; }
    rowsAt[c.id] = (rowsAt[c.id] || 0) + 1;
    chipHtml += '<span class="dbadge" style="transform:translate(' + (p.x + NW / 2) + 'px,' +
      (p.y + NH / 2 + 8 + (rowsAt[c.id] - 1) * 22) + 'px) translateX(-50%)">' + escHtml(c.name) + '</span>';
  });
  dmEl('dChips').innerHTML = chipHtml;

  dmArrows(step, sc, L);
  dmVars(step);
  dmArrays(step, DM.steps[DM.idx - 1] || null);

  var lb = dmEl('dBadge');
  lb.textContent = '第 ' + (step.line || 1) + ' 行' + (step.depth ? ' · 递归第 ' + step.depth + ' 层' : '');
  dmEl('dNote').textContent = (step.depth ? '[' + (step.fn || '函数') + '] ' : '') + (step.note || '');
  dmEl('dNote').classList.toggle('bad', !!step.error);
  dmEl('dCounter').textContent = (DM.idx + 1) + ' / ' + DM.steps.length;
  dmEl('dBar').style.width = (DM.steps.length > 1 ? (DM.idx / (DM.steps.length - 1)) * 100 : 0) + '%';

  var res = dmEl('dResult');
  if (DM.idx === DM.steps.length - 1 && DM.run && DM.run.result && DM.run.result.has) {
    res.style.display = 'block';
    res.textContent = '返回：' + dmDescribe(DM.run.result.v, step);
  } else { res.style.display = 'none'; }

  Array.prototype.forEach.call(dmEl('dCode').children, function (row) {
    var l = Number(row.getAttribute('data-line'));
    var on = l === step.line;
    row.classList.toggle('on', on);
    if (on) {
      var top = row.offsetTop, bottom = top + row.offsetHeight, box = dmEl('dCode');
      if (top < box.scrollTop + 4) { box.scrollTop = top - 8; }
      else if (bottom > box.scrollTop + box.clientHeight - 4) { box.scrollTop = bottom - box.clientHeight + 8; }
    }
  });

  dmUpdatePlay();
}

function dmDescribe(v, step) {
  if (!v) { return '—'; }
  if (v.k === 'null') { return 'nullptr'; }
  if (v.k === 'num') { return String(v.v); }
  if (v.k === 'bool') { return v.v ? 'true' : 'false'; }
  if (v.k === 'ptr') {
    var vals = [], cur = v.id, guard = 0;
    while (cur && step.heap[cur] && guard++ < 24) {
      var f = step.heap[cur].fields, vf = f.val;
      if (vf && vf.k === 'num') { vals.push(vf.v); }
      cur = (f.next && f.next.k === 'ptr') ? f.next.id : null;
    }
    return vals.length ? '[' + vals.join(', ') + ']' : (v.id + '（空节点）');
  }
  return '?';
}

function dmVars(step) {
  var cells = Object.keys(step.env).map(function (name) {
    var v = step.env[name], txt = 'nullptr';
    if (v && v.k === 'num') { txt = String(v.v); }
    else if (v && v.k === 'bool') { txt = v.v ? 'true' : 'false'; }
    else if (v && v.k === 'ptr') {
      var ob = step.heap[v.id], vf = ob && ob.fields.val;
      txt = v.id + (vf && vf.k === 'num' ? '·' + vf.v : '');
    }
    else if (v && v.k === 'arr') { txt = '[' + v.items.length + ' 项]'; }
    else if (v && v.k === 'str') { txt = '"' + (v.v.length > 18 ? v.v.slice(0, 18) + '…' : v.v) + '"'; }
    else if (v && v.k === 'map') { txt = '{' + Object.keys(v.m).length + ' 键}'; }
    else if (v && v.k === 'set') { txt = '{' + (Array.isArray(v.s) ? v.s.length : Object.keys(v.s).length) + ' 元素}'; }
    var ch = step.changed && step.changed.name === name;
    return '<span class="dcell' + (ch ? ' chg' : '') + '"><b>' + escHtml(name) + '</b><i>=</i>' + escHtml(txt) + '</span>';
  });
  dmEl('dVars').innerHTML = cells.join('') || '<span class="dcell">无局部变量</span>';
}

function dmCellText(v) {
  if (!v || v.k === 'null') { return 'null'; }
  if (v.k === 'num') { return String(v.v); }
  if (v.k === 'bool') { return v.v ? 'T' : 'F'; }
  if (v.k === 'str') { return v.v; }
  if (v.k === 'arr') { return '[' + v.items.map(dmCellText).join(',') + ']'; }
  if (v.k === 'ptr') { return v.id; }
  return '?';
}
function dmArrays(step, prev) {
  var box = dmEl('dArrays');
  if (!box) { return; }
  var rows = [];
  Object.keys(step.env).forEach(function (name) {
    var v = step.env[name];
    if (!v) { return; }
    var items = null, isStr = false, label = name;
    if (v.k === 'arr') { items = v.items; }
    else if (v.k === 'str') { items = v.v.split(''); isStr = true; }
    else if (v.k === 'map') { items = Object.keys(v.m).map(function (k) { return k + '→' + dmCellText(v.m[k]); }); isStr = true; }
    else if (v.k === 'set') { items = Array.isArray(v.s) ? v.s : Object.keys(v.s); isStr = true; }
    if (!items) { return; }
    var old = prev && prev.env ? prev.env[name] : null;
    var oldItems = null;
    if (old) {
      if (old.k === 'arr') { oldItems = old.items; }
      else if (old.k === 'str') { oldItems = old.v.split(''); }
      else if (old.k === 'map') { oldItems = Object.keys(old.m).map(function (k) { return k + '→' + dmCellText(old.m[k]); }); }
      else if (old.k === 'set') { oldItems = Array.isArray(old.s) ? old.s : Object.keys(old.s); }
    }
    var shown = items.slice(0, 24);
    var cells = shown.map(function (it, i) {
      var txt = typeof it === 'string' ? it : dmCellText(it);
      var oldTxt = oldItems && i < oldItems.length ? (typeof oldItems[i] === 'string' ? oldItems[i] : dmCellText(oldItems[i])) : null;
      var ch = oldItems ? (oldTxt !== txt) : false;
      return '<span class="ac' + (ch ? ' chg' : '') + (isStr ? ' str' : '') + '"><s>' + i + '</s>' + escHtml(txt) + '</span>';
    }).join('');
    rows.push('<div class="darr"><span class="an">' + escHtml(label) + '</span><span class="cells">' + cells +
      (items.length > shown.length ? '<span class="more">…共 ' + items.length + ' 项</span>' : '') +
      (items.length === 0 ? '<span class="more">空</span>' : '') + '</span></div>');
  });
  box.innerHTML = rows.join('');
}

function dmArrows(step, sc, L) {
  var NW = DMW.NW, NH = DMW.NH;
  var s = '';
  Object.keys(L.pos).forEach(function (id) {
    var p = L.pos[id], ob = step.heap[id];
    if (!ob) { return; }
    ['next', 'left', 'right'].forEach(function (fk) {
      if (!(fk in ob.fields)) { return; }
      var fv = ob.fields[fk];
      var ch = step.changed && step.changed.obj === id && step.changed.field === fk;
      var color = ch ? 'var(--amber)' : 'var(--mint)';
      var mk = ch ? 'url(#dArA)' : 'url(#dArM)';
      if (!fv || fv.k === 'null') {
        if (fk === 'next') {
          s += '<path d="M ' + (p.x + NW + 3) + ' ' + p.y + ' l 16 0" stroke="' + color +
            '" stroke-width="1.4" stroke-dasharray="4 4" opacity=".5"/>' +
            '<text x="' + (p.x + NW + 22) + '" y="' + (p.y + 4) + '" class="dnul">null</text>';
        }
        return;
      }
      if (fv.k !== 'ptr' || !L.pos[fv.id]) { return; }
      var tp = L.pos[fv.id], x1 = p.x + NW / 2, y1 = p.y, x2 = tp.x, y2 = tp.y;
      var dx = x2 - x1, dy = y2 - y1, dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var ang = Math.atan2(dy, dx) * 180 / Math.PI;
      if (fk === 'next' && x2 < x1) {
        var cx = (x1 + x2) / 2, cy = y1 - 76;
        s += '<path d="M ' + x1 + ' ' + (y1 - NH / 2 + 2) + ' Q ' + cx + ' ' + cy + ' ' +
          (x2 + 4) + ' ' + (y2 + NH / 2 - 4) + '" stroke="' + color + '" stroke-width="' + (ch ? 2.4 : 1.6) +
          '" fill="none" marker-end="' + mk + '"/>';
        return;
      }
      s += '<path d="M ' + (x1 + dx / dist * 30) + ' ' + (y1 + dy / dist * 24) + ' L ' +
        (x2 - dx / dist * 34) + ' ' + (y2 - dy / dist * 26) + '" stroke="' + color +
        '" stroke-width="' + (ch ? 2.4 : 1.6) + '" fill="none" marker-end="' + mk + '"/>';
    });
  });
  dmEl('dArrows').innerHTML =
    '<defs>' +
    '<marker id="dArM" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#6ED4B7"/></marker>' +
    '<marker id="dArA" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#F2A64D"/></marker>' +
    '</defs>' + s;
  dmEl('dArrows').setAttribute('height', String(Math.max(L.height, 240)));
}

/* ---------- 播放控制 ---------- */
function dmPlay() {
  if (!DM.steps.length || DM.playing) { return; }
  if (DM.idx >= DM.steps.length - 1) { DM.idx = 0; dmRender(); }
  DM.playing = true;
  dmUpdatePlay();
  dmTick();
}
function dmTick() {
  clearTimeout(DM.timer);
  DM.timer = setTimeout(function () {
    if (!DM.playing) { return; }
    if (DM.idx < DM.steps.length - 1) { DM.idx++; dmRender(); dmTick(); }
    else { DM.playing = false; dmUpdatePlay(); }
  }, DM.speed);
}
function dmPause() {
  DM.playing = false;
  clearTimeout(DM.timer);
  dmUpdatePlay();
}
function dmGo(n) {
  if (!DM.steps.length) { return; }
  dmPause();
  DM.idx = Math.max(0, Math.min(DM.steps.length - 1, n));
  dmRender();
}
function dmStep(d) { dmGo(DM.idx + d); }
function dmJump(line) {
  var list = DM.occ[line];
  if (!list || !list.length) { return; }
  dmPause();
  var p = list.indexOf(DM.idx);
  DM.idx = (p >= 0 && p < list.length - 1) ? list[p + 1] : list[0];
  dmRender();
}
function dmUpdatePlay() {
  var b = dmEl('dPlay');
  if (!b) { return; }
  b.textContent = DM.playing ? '暂停' : '播放';
  b.classList.toggle('primary', !DM.playing);
}

/* ---------- 事件 ---------- */
(function wireDemo() {
  var mask = dmEl('dMask');
  if (!mask) { return; }
  dmEl('dClose').addEventListener('click', demoClose);
  mask.addEventListener('click', function (e) { if (e.target === mask) { demoClose(); } });
  dmEl('dPlay').addEventListener('click', function () { DM.playing ? dmPause() : dmPlay(); });
  dmEl('dPrev').addEventListener('click', function () { dmStep(-1); });
  dmEl('dNext').addEventListener('click', function () { dmStep(1); });
  dmEl('dFirst').addEventListener('click', function () { dmGo(0); });
  dmEl('dLast').addEventListener('click', function () { dmGo(DM.steps.length - 1); });
  dmEl('dSpeed').addEventListener('change', function (e) {
    DM.speed = Number(e.target.value) || 900;
  });
  var dRand = dmEl('dRandParam');
  if (dRand) {
    dRand.addEventListener('click', function () {
      var p = dmP();
      var hasReal = ta && ta.value && ta.value.trim().replace(/\/\/[^\n]*/g, '').trim().length > 0;
      var src = hasReal ? ta.value : (p && p.ref ? p.ref.join('\n') : (p && p.template ? p.template : ''));
      if (typeof generateAutoParams === 'function') {
        var autoP = generateAutoParams(src, p);
        if (autoP) {
          dmEl('dParams').value = autoP;
          demoRun(src);
        }
      }
    });
  }
  dmEl('dRerun').addEventListener('click', function () { demoRun(); });
  dmEl('dParams').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); demoRun(); }
  });
  dmEl('dParamChips').addEventListener('click', function (e) {
    var b = e.target.closest('.dptag');
    if (!b) { return; }
    dmEl('dParams').value = b.getAttribute('data-p');
    demoRun();
  });
  document.addEventListener('keydown', function (e) {
    if (!mask.classList.contains('on')) { return; }
    if (e.key === 'Escape') { demoClose(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); dmStep(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); dmStep(-1); }
    else if (e.key === ' ') { e.preventDefault(); DM.playing ? dmPause() : dmPlay(); }
  });
})();

var dmBtn = document.getElementById('demoBtn');
if (dmBtn) { dmBtn.addEventListener('click', function () { demoOpen(); }); }
var dmBtn2 = document.getElementById('demoBtn2');
if (dmBtn2) { dmBtn2.addEventListener('click', function () { demoOpen(); }); }





/* ==================================================================
   AI 助教 · 对话窗口
   ================================================================== */