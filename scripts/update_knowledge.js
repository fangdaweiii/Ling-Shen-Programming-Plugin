const fs = require('fs');
const path = require('path');

const knowledgePath = path.join(__dirname, '..', 'data', 'knowledge.js');

const MODULE_SUMMARIES = {
  'list-basic': {
    title: 'Stage 0 · 链表与指针基本功',
    concepts: [
      '指针与内存本质：链表是通过 next 指针在堆内存中串联的离散节点，不支持随机访问，但局部插删只需 O(1)。',
      '哑节点（Dummy Node）：链表题第一神技，统一头节点与普通节点处理，免去对 head 是否为空或被删的繁琐特判。',
      '快慢双指针：快走两步、慢走一步。快指针到尾时，慢指针自然落在链表中点；若成环则必定相遇。'
    ],
    templates: [
      { 
        name: '三指针原地反转（经典模版）', 
        code: 'ListNode* prev = nullptr;\nListNode* cur = head;\nwhile (cur != nullptr) {\n    ListNode* nxt = cur->next;\n    cur->next = prev;\n    prev = cur;\n    cur = nxt;\n}\nreturn prev;' 
      },
      { 
        name: '哨兵哑节点保护', 
        code: 'ListNode dummy(0);\ndummy.next = head;\nListNode* tail = &dummy;\n// 在 tail 后面追加、拼接或删除\nreturn dummy.next;' 
      }
    ],
    complexity: [
      { op: '查找第 k 个元素', time: 'O(k)', space: 'O(1)' },
      { op: '插入/删除已知节点', time: 'O(1)', space: 'O(1)' },
      { op: '反转全部节点', time: 'O(n)', space: 'O(1)' }
    ],
    connections: '二进制转整数(1290) → 反转链表(206) → 合并链表(21) → 快慢指针找中点(876) → 倒数第N个(19)'
  },

  'two-pointers': {
    title: 'Stage 1 · 滑动窗口与双指针（灵神核心主线）',
    concepts: [
      '【灵神心法】同向双指针（滑动窗口）：维护一个区间 [left, right]，right 负责主动探索进窗，left 负责被动收缩出窗。',
      '【定长滑窗三步法】：1. 右端元素进窗并更新状态；2. 当右端下标达到 k - 1 时记录答案；3. 左端元素出窗并恢复状态。',
      '【不定长滑窗收缩法】：进窗后，只要当前窗口「不满足题目约束」，就不断移动 left 缩小窗口，直到重新合法后再更新最优解。',
      '相向双指针（对撞指针）：数组有序或具有单调夹逼性质时，从两端向中间推进（如盛水最多的容器、两数之和）。'
    ],
    templates: [
      {
        name: '灵神不定长滑窗标准模板（求最长子串）',
        code: 'int left = 0, ans = 0;\nunordered_map<char, int> cnt;\nfor (int right = 0; right < s.size(); right++) {\n    cnt[s[right]]++;\n    while (cnt[s[right]] > 1) { // 不符合条件，收缩左端\n        cnt[s[left]]--;\n        left++;\n    }\n    ans = max(ans, right - left + 1); // 维护最大窗口\n}\nreturn ans;'
      },
      {
        name: '相向双指针夹逼模板（盛水容器）',
        code: 'int left = 0, right = height.size() - 1, maxArea = 0;\nwhile (left < right) {\n    int h = min(height[left], height[right]);\n    maxArea = max(maxArea, h * (right - left));\n    if (height[left] < height[right]) left++; // 谁短谁移动\n    else right--;\n}\nreturn maxArea;'
      }
    ],
    complexity: [
      { op: '滑动窗口全局扫描', time: 'O(n) 每个元素进出各一次', space: 'O(1) 或 O(字符集)' },
      { op: '相向双指针', time: 'O(n)', space: 'O(1)' }
    ],
    connections: '移动零(283) → 无重复最长子串(3) → 盛最多水的容器(11) | 配套精讲：灵神《基础算法精讲 01~03》'
  },

  'binary-search': {
    title: 'Stage 2 · 二分查找与二分答案（灵神红蓝染色法）',
    concepts: [
      '【二分的本质】：不是“有序”，而是“单调性与二段性”——整个定义域能被某个条件分割为【不满足】和【满足】两部分。',
      '【灵神独创 · 红蓝染色法】：将开区间设为 (left, right) = (-1, n)。红色代表不满足条件，蓝色代表满足条件。',
      '红蓝不重不漏：若 mid 满足条件则染蓝（right = mid），否则染红（left = mid）。循环结束时 left 必为最右红，right 必为最左蓝！',
      '【二分答案】：如果题目求“最小化的最大值”或“最大化的最小值”，直接将答案空间作为二分区间，写一个 check(ans) 函数检验可行性。'
    ],
    templates: [
      {
        name: '灵神开区间红蓝染色二分模板（彻底告别死循环）',
        code: '// 开区间 (-1, n)，left 和 right 永远不会越界\nint left = -1, right = nums.size();\nwhile (left + 1 < right) { // 区间不为空\n    int mid = left + (right - left) / 2;\n    if (isBlue(mid)) {\n        right = mid; // 满足条件，染成蓝色\n    } else {\n        left = mid;  // 不满足条件，染成红色\n    }\n}\n// 循环结束时：left 是最后一个红，right 是第一个蓝\nreturn right;'
      },
      {
        name: '在排序数组中查找首尾位置（利用红蓝界限）',
        code: 'int lower_bound(vector<int>& nums, int target) {\n    int l = -1, r = nums.size();\n    while (l + 1 < r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] >= target) r = mid;\n        else l = mid;\n    }\n    return r; // >= target 的第一个位置\n}'
      }
    ],
    complexity: [
      { op: '折半二分检索', time: 'O(log n)', space: 'O(1)' },
      { op: '二分答案', time: 'O(log(Range) * checkTime)', space: 'O(1)' }
    ],
    connections: '二分查找(704) → 搜索插入位置(35) → 查找首尾位置(34) → 寻找峰值(162) → 旋转数组(33) | 配套精讲：灵神《基础算法精讲 04~06》'
  },

  'stack-queue': {
    title: 'Stage 3 · 前缀和与单调栈（结构转换神技）',
    concepts: [
      '前缀和与差分互为逆运算：前缀和用来 O(1) 查询任意连续子数组的和；差分用来 O(1) 批量修改区间增减。',
      '【单调栈心法】：及时排除无用数据。当新元素到来时，如果破坏了单调性，就把前面的元素弹栈。',
      '解决什么问题？“寻找下一个更大/更小元素”的标准杀手锏！每个元素入栈一次、出栈一次，均摊时间严格 O(n)。',
      '括号匹配：栈的“后进先出”天然契合对称匹配与作用域嵌套。'
    ],
    templates: [
      {
        name: '单调递减栈（求下一个更大元素）',
        code: 'vector<int> nextGreater(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 0);\n    stack<int> st; // 存储下标\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && nums[i] > nums[st.top()]) {\n            int prevIdx = st.top();\n            st.pop();\n            res[prevIdx] = i - prevIdx; // 或 nums[i]\n        }\n        st.push(i);\n    }\n    return res;\n}'
      }
    ],
    complexity: [
      { op: '前缀和区间查询', time: 'O(1)', space: 'O(n) 前缀数组' },
      { op: '单调栈线性扫描', time: 'O(n) 均摊', space: 'O(n)' }
    ],
    connections: '有效括号(20) → 栈模拟队列(232) → 每日温度(739) → 柱状图最大矩形(84)'
  },

  'heap': {
    title: 'Stage 3 · 堆与优先队列（动态极值维护）',
    concepts: [
      '堆的本质是完全二叉树：大顶堆根节点最大，小顶堆根节点最小。能在 O(log k) 内插入与取出极值。',
      '【TopK 问题黄金法则】：求前 K 个最大值，维护大小为 K 的小顶堆；求前 K 个最小值，维护大顶堆！',
      '频次统计结合堆：哈希表负责计数，优先队列按频次排序，实现 O(n log k) 过滤。'
    ],
    templates: [
      {
        name: 'TopK 经典小顶堆维护模板',
        code: 'priority_queue<int, vector<int>, greater<int>> minHeap;\nfor (int x : nums) {\n    minHeap.push(x);\n    if (minHeap.size() > k) {\n        minHeap.pop(); // 始终保持堆内只剩最大的 k 个\n    }\n}\nreturn minHeap.top(); // 堆顶即第 k 大'
      }
    ],
    complexity: [
      { op: '维护大小为 k 的堆', time: 'O(n log k)', space: 'O(k)' },
      { op: '建堆操作 make_heap', time: 'O(n)', space: 'O(1) 原地' }
    ],
    connections: '最后石头(1046) → 第K大元素(215) → 前K高频(347)'
  },

  'tree-basic': {
    title: 'Stage 4 · 二叉树 DFS 基础（深入理解递归）',
    concepts: [
      '【灵神心法 · 递归三问】：',
      ' 1. 当前节点要做什么？（计算自身、比较值、左右分支合并）',
      ' 2. 什么时候递归结束（Base Case）？（通常是遇到 nullptr 返回 0/true/空）',
      ' 3. 返回什么给父节点？（返回深度、子树是否合法、子树的最优累加值）',
      '自顶向下 vs 自底向上：自顶向下类似先序遍历（往下带参数）；自底向上类似后序遍历（向上汇聚返回值，为动态规划奠基）。'
    ],
    templates: [
      {
        name: '后序自底向上汇聚（求树深度）',
        code: 'int maxDepth(TreeNode* root) {\n    if (root == nullptr) return 0; // Base case\n    int leftDepth = maxDepth(root->left);  // 左子树结果\n    int rightDepth = maxDepth(root->right); // 右子树结果\n    return max(leftDepth, rightDepth) + 1;  // 向上返回\n}'
      },
      {
        name: '双树对称比对模板',
        code: 'bool isSymmetricHelp(TreeNode* p, TreeNode* q) {\n    if (!p && !q) return true;\n    if (!p || !q || p->val != q->val) return false;\n    return isSymmetricHelp(p->left, q->right) && isSymmetricHelp(p->right, q->left);\n}'
      }
    ],
    complexity: [
      { op: '访问每个节点一次', time: 'O(n)', space: 'O(h) 树高递归栈' }
    ],
    connections: '翻转二叉树(226) → 树的最大深度(104) → 对称二叉树(101) | 配套精讲：灵神《基础算法精讲 09~12》'
  },

  'tree-adv': {
    title: 'Stage 4 · 二叉树进阶与 BST（层序与路径）',
    concepts: [
      '广度优先搜索（BFS 层序遍历）：利用队列，外层记录队列当前长度，实现一层一层的严格剥离。',
      '二叉搜索树（BST）特性：中序遍历是严格单调递增的！根据 root->val 与 target 大小可像二分一样剪枝。',
      '回溯路径总和：递归深入时将 path 压栈，返回父节点时弹出，保持现场干净。'
    ],
    templates: [
      {
        name: '队列标准层序遍历（按层分组）',
        code: 'vector<vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector<vector<int>> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> curLevel;\n        for (int i = 0; i < sz; i++) {\n            TreeNode* node = q.front(); q.pop();\n            curLevel.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(curLevel);\n    }\n    return res;\n}'
      }
    ],
    complexity: [
      { op: '层序遍历', time: 'O(n)', space: 'O(w) 树的最大宽度' },
      { op: 'BST 查找与插入', time: 'O(h)', space: 'O(1) 迭代 / O(h) 递归' }
    ],
    connections: '路径总和(112) → 层序遍历(102) → 最近公共祖先(236)'
  },

  'graph': {
    title: 'Stage 5 · 网格图搜索与 BFS/DFS（建模与连通性）',
    concepts: [
      '网格图是特殊的无向/有向图：每个格子与上下左右四个邻居连通，方向数组 `dirs = {{-1,0},{1,0},{0,-1},{0,1}}`。',
      '沉岛法（DFS 标记连通块）：访问过的陆地原地修改为 \'0\'，避免开辟额外的 visited 数组。',
      '拓扑排序（有向无环图 DAG）：入度为 0 的节点入队，出队时将其后继邻居入度 -1，若入度降为 0 则加入队列。'
    ],
    templates: [
      {
        name: '网格图方向数组 DFS 沉岛模板',
        code: 'int dirs[4][2] = {{-1,0}, {1,0}, {0,-1}, {0,1}};\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n    grid[r][c] = \'0\'; // 标记已访问（沉岛）\n    for (auto& d : dirs) {\n        int nr = r + d[0], nc = c + d[1];\n        if (nr >= 0 && nr < grid.size() && nc >= 0 && nc < grid[0].size() && grid[nr][nc] == \'1\') {\n            dfs(grid, nr, nc);\n        }\n    }\n}'
      }
    ],
    complexity: [
      { op: '网格图连通块全局遍历', time: 'O(R * C)', space: 'O(R * C) 递归深度' },
      { op: '拓扑排序 Kahn 算法', time: 'O(V + E)', space: 'O(V + E)' }
    ],
    connections: '省份数量(547) → 岛屿数量(200) → 课程表(207) | 掌握网格搜索与依赖拓扑'
  },

  'backtrack': {
    title: 'Stage 6 · 回溯算法（选与不选双重视角）',
    concepts: [
      '【灵神心法 · 回溯双重视角】：',
      ' 1. 输入视角（选还是不选？）：每个数字有两个抉择：选或者不选。特别适合子集问题。',
      ' 2. 答案视角（当前位置枚举选哪个？）：当前坑位从可选池中枚举挑一个放入，然后递归下一个坑位。适合全排列与组合总和。',
      '回溯核心三部曲：做出选择 -> 递归下一层 -> 撤销选择（恢复现场）。剪枝是回溯通过的关键！'
    ],
    templates: [
      {
        name: '灵神视角一：选或不选（子集问题）',
        code: 'vector<vector<int>> ans;\nvector<int> path;\nvoid dfs(int i, vector<int>& nums) {\n    if (i == nums.size()) {\n        ans.push_back(path);\n        return;\n    }\n    // 不选 nums[i]\n    dfs(i + 1, nums);\n    // 选 nums[i]\n    path.push_back(nums[i]);\n    dfs(i + 1, nums);\n    path.pop_back(); // 恢复现场\n}'
      },
      {
        name: '灵神视角二：枚举选哪个（全排列问题）',
        code: 'void dfs(int depth, vector<int>& nums, vector<bool>& used, vector<int>& path, vector<vector<int>>& ans) {\n    if (depth == nums.size()) {\n        ans.push_back(path); return;\n    }\n    for (int i = 0; i < nums.size(); i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.push_back(nums[i]);\n        dfs(depth + 1, nums, used, path, ans);\n        path.pop_back();\n        used[i] = false; // 恢复现场\n    }\n}'
      }
    ],
    complexity: [
      { op: '子集生成', time: 'O(2^n)', space: 'O(n) 递归栈' },
      { op: '全排列', time: 'O(n!)', space: 'O(n)' }
    ],
    connections: '子集(78) → 电话号码组合(17) → 全排列(46) → 组合总和(39) | 配套精讲：灵神《基础算法精讲 13~16》'
  },

  'dp': {
    title: 'Stage 7 · 动态规划入门（灵神三步演化法）',
    concepts: [
      '【灵神破除 DP 恐惧心法】：动态规划绝不是凭空想出 dp 数组，而是从回溯递归自然演化而来！',
      '【三步走标准演化】：',
      ' 1. 第一步：先写带返回值的暴力回溯 dfs(i)',
      ' 2. 第二步：发现重复子问题，加上 memo[i] 备忘录缓存（记忆化搜索）',
      ' 3. 第三步：将 dfs(i) 1:1 翻译成递推数组 dp[i]，把递归改写为自底向上的 for 循环！',
      '常见模型：0-1背包（选与不选）、完全背包（可重复选）、LIS 最长递增子序列（枚举上一个转移点）。'
    ],
    templates: [
      {
        name: '灵神三步法之：打家劫舍递推（空间压缩）',
        code: '// 状态转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])\nint rob(vector<int>& nums) {\n    int f0 = 0, f1 = 0;\n    for (int x : nums) {\n        int new_f = max(f1, f0 + x);\n        f0 = f1;\n        f1 = new_f;\n    }\n    return f1;\n}'
      },
      {
        name: '完全背包模型（零钱兑换）',
        code: 'int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i >= c) dp[i] = min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}'
      }
    ],
    complexity: [
      { op: '记忆化搜索 / 线性递推', time: 'O(n)', space: 'O(1) 滚动数组' },
      { op: '完全背包', time: 'O(amount * coins.size())', space: 'O(amount)' }
    ],
    connections: '爬楼梯(70) → 不同路径(62) → 最大子数组和(53) → 打家劫舍(198) → 零钱兑换(322) → 最长递增子序列(300) | 配套精讲：灵神《基础算法精讲 17~20》'
  },

  'list-adv': {
    title: 'Stage 8+ · 链表进阶与重排（高阶专题）',
    concepts: [
      '头插法区间反转（反转链表 II）：原地把待反转区间内的后继依次摘下来插到 pre 节点之后。',
      '拆分再缝合（重排链表/奇偶链表）：先将一条链拆成两条，各自加工后双指针交替缝合。',
      '旋转与断环：把尾部指向头部成环，走指定步数后断开，避免繁琐下标计算。'
    ],
    templates: [
      {
        name: '头插法区间就地反转',
        code: 'ListNode* cur = pre->next;\nfor (int i = 0; i < right - left; i++) {\n    ListNode* nxt = cur->next;\n    cur->next = nxt->next;\n    nxt->next = pre->next;\n    pre->next = nxt;\n}'
      }
    ],
    complexity: [
      { op: '区间就地反转', time: 'O(n)', space: 'O(1)' }
    ],
    connections: '奇偶链表(328) → 旋转链表(61) → 分隔链表(86) → 删除重复(82) → 区间反转(92) → 重排链表(143)'
  },

  'hash': {
    title: 'Stage 8+ · 哈希表与进阶枚举（高阶专题）',
    concepts: [
      '哈希表以空间换时间：O(1) 期望查询与插入。',
      '空间降维与定长频次数组：当字符集固定为小写字母时，直接用 `int cnt[26]` 代替 unordered_map，性能提升 5 倍以上。',
      '边遍历边查询：两数之和只扫一遍，避免存入与查询相互干扰。'
    ],
    templates: [
      {
        name: '两数之和单遍哈希检索',
        code: 'unordered_map<int, int> pos;\nfor (int i = 0; i < nums.size(); i++) {\n    int complement = target - nums[i];\n    if (pos.count(complement)) return {pos[complement], i};\n    pos[nums[i]] = i;\n}\nreturn {};'
      }
    ],
    complexity: [
      { op: '哈希插入与查找', time: 'O(1) 期望', space: 'O(n)' }
    ],
    connections: '两数之和(1) → 字母异位词(242) → 数组交集(349)'
  },

  'greedy': {
    title: 'Stage 8+ · 贪心与思维题（局部最优到全局最优）',
    concepts: [
      '贪心本质：每一步都做出当前看起来最好的选择，并且当前选择不会影响后续最优解的可达性（无后效性）。',
      '跳跃游戏与覆盖范围：维护当前能够到达的最远右边界，若当前位置超出右边界则不可达。',
      '区间调度：按结束时间最早排序，留给后续区间的空间最大。'
    ],
    templates: [
      {
        name: '跳跃游戏最远边界维护',
        code: 'int maxReach = 0;\nfor (int i = 0; i < nums.size(); i++) {\n    if (i > maxReach) return false;\n    maxReach = max(maxReach, i + nums[i]);\n}\nreturn true;'
      }
    ],
    complexity: [
      { op: '单遍扫描贪心决策', time: 'O(n)', space: 'O(1)' }
    ],
    connections: '买卖股票最佳时机(121) → 跳跃游戏(55)'
  },

  'dsu-trie': {
    title: 'Stage 8+ · 并查集与字典树（高级图论与字符串结构）',
    concepts: [
      '并查集（Disjoint Set Union）：高效处理动态连通性与环检测。路径压缩将树高降到接近 O(1)（阿克曼逆函数）。',
      '字典树（Trie）：利用公共前缀减少字符比较，前缀匹配、单词查找树的标准实现。'
    ],
    templates: [
      {
        name: '路径压缩并查集模板',
        code: 'struct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) {\n        if (parent[x] == x) return x;\n        return parent[x] = find(parent[x]); // 路径压缩\n    }\n    bool unite(int x, int y) {\n        int rx = find(x), ry = find(y);\n        if (rx == ry) return false; // 已在同一集合，成环\n        parent[rx] = ry;\n        return true;\n    }\n};'
      }
    ],
    complexity: [
      { op: '并查集查找与合并', time: 'O(α(n)) ≈ O(1)', space: 'O(n)' }
    ],
    connections: '最长公共前缀(14) → 冗余连接(684)'
  }
};

const output = '/* knowledge.js - 14 大核心模块知识卡片与灵神心法思维模板 */\nvar MODULE_SUMMARIES = ' +
  JSON.stringify(MODULE_SUMMARIES, null, 2) + ';\n';

fs.writeFileSync(knowledgePath, output, 'utf8');
console.log('Successfully updated data/knowledge.js!');
