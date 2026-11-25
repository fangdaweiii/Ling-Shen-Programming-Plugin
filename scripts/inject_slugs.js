const fs = require('fs');
const path = require('path');
const vm = require('vm');

const problemsPath = path.join(__dirname, '..', 'data', 'problems.js');
const rawCode = fs.readFileSync(problemsPath, 'utf8');

const sandbox = { PROBLEMS: [] };
vm.createContext(sandbox);
vm.runInContext(rawCode, sandbox);

const SLUGS = {
  'l1': { slug: 'reverse-linked-list', num: 206 },
  'l2': { slug: 'merge-two-sorted-lists', num: 21 },
  'l8': { slug: 'convert-binary-number-in-a-linked-list-to-integer', num: 1290 },
  'l3': { slug: 'remove-duplicates-from-sorted-list', num: 83 },
  'l4': { slug: 'remove-linked-list-elements', num: 203 },
  'l5': { slug: 'middle-of-the-linked-list', num: 876 },
  'l6': { slug: 'swap-nodes-in-pairs', num: 24 },
  'l7': { slug: 'remove-nth-node-from-end-of-list', num: 19 },
  'tp1': { slug: 'remove-duplicates-from-sorted-array', num: 26 },
  'tp2': { slug: 'move-zeroes', num: 283 },
  'tp4': { slug: 'longest-substring-without-repeating-characters', num: 3 },
  'tp3': { slug: 'container-with-most-water', num: 11 },
  'bs1': { slug: 'binary-search', num: 704 },
  'bs2': { slug: 'search-insert-position', num: 35 },
  'bs4': { slug: 'find-first-and-last-position-of-element-in-sorted-array', num: 34 },
  'bs5': { slug: 'find-peak-element', num: 162 },
  'bs3': { slug: 'search-in-rotated-sorted-array', num: 33 },
  'sq1': { slug: 'valid-parentheses', num: 20 },
  'sq3': { slug: 'implement-queue-using-stacks', num: 232 },
  'sq2': { slug: 'daily-temperatures', num: 739 },
  'hp3': { slug: 'last-stone-weight', num: 1046 },
  'hp1': { slug: 'kth-largest-element-in-an-array', num: 215 },
  'hp2': { slug: 'top-k-frequent-elements', num: 347 },
  't3': { slug: 'invert-binary-tree', num: 226 },
  't1': { slug: 'maximum-depth-of-binary-tree', num: 104 },
  't2': { slug: 'symmetric-tree', num: 101 },
  'ta2': { slug: 'path-sum', num: 112 },
  'ta1': { slug: 'binary-tree-level-order-traversal', num: 102 },
  'gr3': { slug: 'number-of-provinces', num: 547 },
  'gr1': { slug: 'number-of-islands', num: 200 },
  'gr2': { slug: 'course-schedule', num: 207 },
  'bt2': { slug: 'subsets', num: 78 },
  'bt4': { slug: 'letter-combinations-of-a-phone-number', num: 17 },
  'bt1': { slug: 'permutations', num: 46 },
  'bt3': { slug: 'combination-sum', num: 39 },
  'd1': { slug: 'climbing-stairs', num: 70 },
  'd6': { slug: 'unique-paths', num: 62 },
  'd2': { slug: 'maximum-subarray', num: 53 },
  'd4': { slug: 'house-robber', num: 198 },
  'd3': { slug: 'coin-change', num: 322 },
  'd5': { slug: 'longest-increasing-subsequence', num: 300 },
  'a3': { slug: 'odd-even-linked-list', num: 328 },
  'a6': { slug: 'rotate-list', num: 61 },
  'a4': { slug: 'partition-list', num: 86 },
  'a5': { slug: 'remove-duplicates-from-sorted-list-ii', num: 82 },
  'a1': { slug: 'reverse-linked-list-ii', num: 92 },
  'a2': { slug: 'reorder-list', num: 143 },
  'h1': { slug: 'two-sum', num: 1 },
  'h2': { slug: 'valid-anagram', num: 242 },
  'h3': { slug: 'intersection-of-two-arrays', num: 349 },
  'g1': { slug: 'best-time-to-buy-and-sell-stock', num: 121 },
  'g2': { slug: 'jump-game', num: 55 },
  'dt1': { slug: 'longest-common-prefix', num: 14 },
  'dt2': { slug: 'redundant-connection', num: 684 }
};

sandbox.PROBLEMS.forEach(p => {
  const meta = SLUGS[p.id];
  if (meta) {
    p.slug = meta.slug;
    p.lcNum = meta.num;
  }
});

const outCode = '/* problems.js - 算法题库（包含 LeetCode Contest Rating 难度分、Hot 100 标记与 Slug 映射） */\nvar PROBLEMS = ' +
  JSON.stringify(sandbox.PROBLEMS, null, 2) + ';\n';

fs.writeFileSync(problemsPath, outCode, 'utf8');
console.log('Successfully injected slugs to all', sandbox.PROBLEMS.length, 'problems!');
