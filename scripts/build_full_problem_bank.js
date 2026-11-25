/**
 * build_full_problem_bank.js
 * 构建与灵神 12 大专题 1:1 对齐的完整题库（约 260 题）
 * 包含：精细 Rating 难度分、Hot 100 标记、LeetCode Slug、题意速览、算法心法、复杂度分析、避坑指南、C++ 官方参考解法
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. 读取现有 54 题数据
const existingProblemsCode = fs.readFileSync(path.join(__dirname, '../data/problems.js'), 'utf-8');
const sandbox = { window: {} };
vm.runInNewContext(existingProblemsCode, sandbox);
const existingProbs = sandbox.PROBLEMS || [];
const existingMap = new Map();
existingProbs.forEach(p => {
  existingMap.set(p.lcNum, p);
});

console.log(`现有题库中包含 ${existingProbs.length} 道题目已建档。`);

// 模块映射映射表（将旧 module 映射到灵神 12 大专题）
function mapOldModToNew(oldMod, lcNum) {
  if (oldMod === 'list-basic' || oldMod === 'list-adv') return 'tree-backtrack';
  if (oldMod === 'two-pointers') return 'two-pointers';
  if (oldMod === 'binary-search') return 'binary-search';
  if (oldMod === 'stack-queue') return 'monotonic-stack';
  if (oldMod === 'heap') return 'data-structures';
  if (oldMod === 'tree-basic' || oldMod === 'tree-adv' || oldMod === 'backtrack') return 'tree-backtrack';
  if (oldMod === 'graph') {
    // 区分网格图与图论
    if ([200, 695, 994, 463, 130, 542].includes(lcNum)) return 'grid-search';
    return 'graph';
  }
  if (oldMod === 'dp') return 'dp';
  if (oldMod === 'hash') return 'data-structures';
  if (oldMod === 'greedy') return 'greedy';
  if (oldMod === 'dsu-trie') return 'data-structures';
  return 'two-pointers';
}

module.exports = { existingMap, mapOldModToNew };
