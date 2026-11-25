/* modules.js - 算法训练台 核心模块体系（1:1 完整对齐灵神《如何科学刷题？》12 大专题） */
var MODULES = [
  // ===== 新手村（前 7 大专题 · 循序渐进打牢根基） =====
  { id: 'two-pointers', stage: 'Stage 1', stageName: '专题一 · 滑动窗口与双指针', name: '滑动窗口与双指针', tag: '区间维护', desc: '定长滑窗、不定长滑窗（最长/最短/个数）、相向双指针、分组循环' },
  { id: 'binary-search', stage: 'Stage 2', stageName: '专题二 · 二分算法', name: '二分查找与二分答案', tag: '红蓝染色法', desc: '红蓝染色闭区间二分、二分答案求最小/最大、第 K 小/大' },
  { id: 'monotonic-stack', stage: 'Stage 3', stageName: '专题三 · 单调栈与单调队列', name: '单调栈与单调队列', tag: '及时淘汰', desc: '下一个更大元素、矩形面积、子数组极值贡献法、字典序最值、滑动窗口最大值' },
  { id: 'grid-search', stage: 'Stage 4', stageName: '专题四 · 网格图专题', name: '网格图搜索 (DFS/BFS)', tag: '矩阵与连通性', desc: '岛屿数量连通块、沉没法、多源 BFS 拓扑扩散、带状态网格搜索' },
  { id: 'tree-backtrack', stage: 'Stage 5', stageName: '专题五 · 链表、二叉树与回溯', name: '链表、二叉树与回溯', tag: '深入理解递归', desc: '链表反转合并、二叉树遍历与直径/LCA、BST、回溯暴搜选/不选' },
  { id: 'dp', stage: 'Stage 6', stageName: '专题六 · 动态规划专题', name: '动态规划 (DP)', tag: '记忆化到递推', desc: '线性DP、背包、LIS/LCS、状态机股票、区间DP、状压DP、数位DP、树形DP' },
  { id: 'data-structures', stage: 'Stage 7', stageName: '专题七 · 常用数据结构', name: '常用数据结构', tag: '效率工具箱', desc: '一维/二维前缀和与差分、大根堆/小根堆 TopK、并查集连通性、字典树、树状数组/线段树' },

  // ===== 高阶进阶殿堂（后 5 大专题 · 竞赛与大厂进阶） =====
  { id: 'graph', stage: 'Stage 8', stageName: '专题八 · 图论算法', name: '图论算法', tag: '图论建模', desc: '拓扑排序 Kahn 判环、Dijkstra 堆优化最短路、0-1 BFS、基环树、最小生成树' },
  { id: 'bit-manipulation', stage: 'Stage 9', stageName: '专题九 · 位运算', name: '位运算与状态压缩', tag: '二进制思维', desc: '异或性质、lowbit 操作、拆位法、子集状压枚举' },
  { id: 'greedy', stage: 'Stage 10', stageName: '专题十 · 贪心与思维题', name: '贪心与思维题', tag: '局部最优', desc: '区间调度无重叠、中位数贪心货仓选址、堆维护反悔贪心、排序不等式' },
  { id: 'string', stage: 'Stage 11', stageName: '专题十一 · 字符串算法', name: '字符串算法', tag: '模式匹配', desc: 'KMP 前缀函数、Z 函数扩展 KMP、Manacher 马拉车回文、字符串哈希' },
  { id: 'math', stage: 'Stage 12', stageName: '专题十二 · 数学与数论', name: '数学与数论', tag: '数论与博弈', desc: '质数筛法、快速幂与模逆元、组合数学、博弈论' }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MODULES };
}
