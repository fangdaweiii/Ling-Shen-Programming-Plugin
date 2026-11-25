const fs = require('fs');
const path = require('path');
const vm = require('vm');

const problemsPath = path.join(__dirname, '..', 'data', 'problems.js');
const rawCode = fs.readFileSync(problemsPath, 'utf8');

const sandbox = { PROBLEMS: [] };
vm.createContext(sandbox);
vm.runInContext(rawCode, sandbox);

const RATINGS = {
  // list-basic
  'l1': { rating: 1150, hot100: true },
  'l2': { rating: 1180, hot100: true },
  'l8': { rating: 1100, hot100: false },
  'l3': { rating: 1150, hot100: false },
  'l4': { rating: 1200, hot100: false },
  'l5': { rating: 1230, hot100: false },
  'l6': { rating: 1320, hot100: false },
  'l7': { rating: 1350, hot100: true },

  // two-pointers
  'tp1': { rating: 1120, hot100: false },
  'tp2': { rating: 1150, hot100: true },
  'tp3': { rating: 1550, hot100: true },
  'tp4': { rating: 1460, hot100: true },

  // binary-search
  'bs1': { rating: 1150, hot100: false },
  'bs2': { rating: 1200, hot100: false },
  'bs4': { rating: 1420, hot100: true },
  'bs5': { rating: 1510, hot100: true },
  'bs3': { rating: 1680, hot100: true },

  // stack-queue
  'sq1': { rating: 1180, hot100: true },
  'sq3': { rating: 1200, hot100: false },
  'sq2': { rating: 1480, hot100: true },

  // heap
  'hp3': { rating: 1220, hot100: false },
  'hp1': { rating: 1520, hot100: true },
  'hp2': { rating: 1580, hot100: true },

  // tree-basic
  't3': { rating: 1150, hot100: true },
  't1': { rating: 1180, hot100: true },
  't2': { rating: 1220, hot100: true },

  // tree-adv
  'ta2': { rating: 1280, hot100: false },
  'ta1': { rating: 1350, hot100: true },

  // graph
  'gr3': { rating: 1450, hot100: false },
  'gr1': { rating: 1500, hot100: true },
  'gr2': { rating: 1680, hot100: true },

  // backtrack
  'bt2': { rating: 1350, hot100: true },
  'bt4': { rating: 1350, hot100: true },
  'bt1': { rating: 1400, hot100: true },
  'bt3': { rating: 1500, hot100: true },

  // dp
  'd1': { rating: 1150, hot100: true },
  'd6': { rating: 1320, hot100: true },
  'd2': { rating: 1380, hot100: true },
  'd4': { rating: 1380, hot100: true },
  'd3': { rating: 1720, hot100: true },
  'd5': { rating: 1780, hot100: true },

  // list-adv
  'a6': { rating: 1450, hot100: false },
  'a3': { rating: 1450, hot100: false },
  'a4': { rating: 1480, hot100: false },
  'a5': { rating: 1520, hot100: false },
  'a1': { rating: 1540, hot100: false },
  'a2': { rating: 1590, hot100: false },

  // hash
  'h1': { rating: 1100, hot100: true },
  'h2': { rating: 1150, hot100: false },
  'h3': { rating: 1180, hot100: false },

  // greedy
  'g1': { rating: 1200, hot100: true },
  'g2': { rating: 1550, hot100: true },

  // dsu-trie
  'dt1': { rating: 1180, hot100: false },
  'dt2': { rating: 1650, hot100: false }
};

// 为每道题注入 rating 与 hot100，并按 module 分组后按 rating 升序分配 idx
const byMod = {};
sandbox.PROBLEMS.forEach(p => {
  const meta = RATINGS[p.id] || { rating: 1400, hot100: false };
  p.rating = meta.rating;
  p.hot100 = meta.hot100;
  if (!byMod[p.mod]) byMod[p.mod] = [];
  byMod[p.mod].push(p);
});

// 对每个模块内的题目按 rating 排序并重新赋 idx
Object.keys(byMod).forEach(mod => {
  byMod[mod].sort((a, b) => a.rating - b.rating);
  byMod[mod].forEach((p, i) => {
    p.idx = i + 1;
  });
});

// 重组 PROBLEMS 数组，保持模块顺序（按 modules.js 中的顺序）
const modOrder = [
  'list-basic', 'two-pointers', 'binary-search', 'stack-queue', 'heap',
  'tree-basic', 'tree-adv', 'graph', 'backtrack', 'dp',
  'list-adv', 'hash', 'greedy', 'dsu-trie'
];

let finalProblems = [];
modOrder.forEach(mod => {
  if (byMod[mod]) {
    finalProblems = finalProblems.concat(byMod[mod]);
  }
});

const outCode = '/* problems.js - 算法题库（包含 LeetCode Contest Rating 难度分与 Hot 100 标记） */\nvar PROBLEMS = ' +
  JSON.stringify(finalProblems, null, 2) + ';\n';

fs.writeFileSync(problemsPath, outCode, 'utf8');
console.log('Successfully updated problems.js! Total problems:', finalProblems.length);
