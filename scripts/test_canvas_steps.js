const fs = require('fs');
const vm = require('vm');
const m = fs.readFileSync('data/modules.js', 'utf8');
const k = fs.readFileSync('data/knowledge.js', 'utf8');
const p = fs.readFileSync('data/problems.js', 'utf8');
const interp = fs.readFileSync('js/interpreter.js', 'utf8');

const s = { window: {}, console: console };
vm.runInNewContext(m + '\n' + k + '\n' + p + '\n' + interp, s);

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatVar(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') return String(val);
  if (val.k === 'num') return String(val.v);
  if (val.k === 'str') return `"${val.v !== undefined ? val.v : val.s}"`;
  if (val.k === 'char') return `'${val.c}'`;
  if (val.k === 'bool') return val.b ? 'true' : 'false';
  if (val.k === 'arr') {
    const items = (val.items || []).slice(0, 8).map(formatVar);
    return '[' + items.join(',') + (val.items && val.items.length > 8 ? '...' : '') + ']';
  }
  if (val.k === 'ptr') return val.addr ? `0x${val.addr.toString(16)}` : 'nullptr';
  if (val.v !== undefined) return String(val.v);
  return JSON.stringify(val);
}

function simulateCanvas(st) {
  let html = '';
  const env = st.env || {};
  const heap = st.heap || {};
  const ptrs = {};
  let leftVal = null, rightVal = null, kVal = null;

  const ptrVarNames = /^(i|j|k|left|right|l|r|mid|start|end|p|idx|p1|p2|pos|low|high|head|tail)$/i;
  Object.keys(env).forEach(k => {
    const v = env[k];
    if (v && v.k === 'num') {
      const num = v.v;
      if (ptrVarNames.test(k)) {
        if (!ptrs[num]) ptrs[num] = [];
        ptrs[num].push(k);
      }
      if (k === 'left' || k === 'l') leftVal = num;
      if (k === 'right' || k === 'r' || k === 'i') rightVal = num;
      if (k === 'k') kVal = num;
    }
  });

  if (kVal !== null && rightVal !== null && leftVal === null && rightVal >= kVal - 1) {
    leftVal = rightVal - kVal + 1;
  }

  Object.keys(env).forEach(name => {
    const valObj = env[name];
    if (!valObj) return;
    let items = null;
    if (valObj.k === 'arr') {
      items = (valObj.items || []).map(formatVar);
    } else if (valObj.k === 'str') {
      items = String(valObj.v !== undefined ? valObj.v : (valObj.s || '')).split('');
    }
    if (items && items.length > 0) {
      const maxShow = Math.min(items.length, 16);
      const cellsHtml = items.slice(0, maxShow).map((item, idx) => {
        const hasPtr = !!ptrs[idx];
        const ptrLabel = hasPtr ? ptrs[idx].join('/') + ' ⬇' : '';
        const inWin = (leftVal !== null && rightVal !== null && idx >= leftVal && idx <= rightVal);
        return `[Cell ${idx}: '${item}', inWin:${inWin}, ptr:${ptrLabel || '-'}]`;
      }).join(' ');

      html += `Array/String '${name}': ${cellsHtml}\n`;
    }
  });

  const heapIds = Object.keys(heap);
  if (heapIds.length > 0) {
    const listPtrs = {};
    Object.keys(env).forEach(name => {
      const v = env[name];
      if (v && v.k === 'ptr' && v.id) {
        if (!listPtrs[v.id]) listPtrs[v.id] = [];
        listPtrs[v.id].push(name);
      }
    });

    const nodes = heapIds.slice(0, 10).map((id) => {
      const ob = heap[id];
      const valObj = ob.fields && ob.fields.val;
      const nodeVal = valObj ? formatVar(valObj) : id;
      const tag = listPtrs[id] ? listPtrs[id].join('/') + ' ⬇' : '';
      const hasNext = (ob.fields && ob.fields.next && ob.fields.next.k === 'ptr' && ob.fields.next.id);
      return `(Node ${nodeVal} [${tag || '-'}]) ${hasNext ? '──▶' : '──▶ NULL'}`;
    }).join(' ');
    html += `Linked List: ${nodes}\n`;
  }

  return html;
}

const p0 = s.PROBLEMS[0]; // LC 1456
const res0 = s.analyze(p0.ref.join('\n'), '"abciiidef"|3');
console.log('--- LC 1456 Step 15 Canvas Simulation ---');
console.log(simulateCanvas(res0.steps[15]));

const p206 = s.PROBLEMS.find(p => p.lcNum === 206);
const res206 = s.analyze(p206.ref.join('\n'), '[1,2,3,4,5]');
console.log('--- LC 206 Step 10 Canvas Simulation ---');
console.log(simulateCanvas(res206.steps[10]));
