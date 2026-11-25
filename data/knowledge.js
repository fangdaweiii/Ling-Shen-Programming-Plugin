/* knowledge.js - 灵神《如何科学刷题？》12 大专题知识卡片与心法代码模板 */
var MODULE_SUMMARIES = {
  "two-pointers": {
    "title": "专题一 · 滑动窗口与双指针（灵神核心主线）",
    "concepts": [
      "【同向双指针（滑动窗口）】：维护区间 [left, right]，right 负责主动探索进窗，left 负责被动收缩出窗。",
      "【定长滑窗三步法】：1. 右端元素进窗并更新状态；2. 当右端下标达到 k - 1 时记录答案；3. 左端元素出窗并恢复状态。",
      "【不定长滑窗（求最长）】：进窗后，只要当前窗口「不满足题目约束」，就不断移动 left 缩小窗口，重新合法后再更新最大窗口。",
      "【不定长滑窗（求最短）】：进窗后，只要当前窗口「已经满足约束」，就不断更新当前极小长度，并尝试向右收缩 left 直到打破约束。",
      "【子数组个数】：越短越合法（每次累加 right - left + 1）；越长越合法（每次累加 left + 1）。",
      "【相向双指针】：数组有序或具有单调夹逼性质时，从两端向中间对撞（如盛水最多的容器、两数之和、三数之和）。",
      "【分组循环】：外层 while i < n，内层 while 处理连续同值/连续递增段，跳出内层后结算并更新 i。"
    ],
    "templates": [
      {
        "name": "定长滑动窗口标准模板",
        "code": "int cur = 0, ans = 0;\nfor (int i = 0; i < nums.size(); ++i) {\n    cur += nums[i]; // 1. 入窗\n    if (i < k - 1) continue;\n    ans = max(ans, cur); // 2. 达到固定窗口大小，更新答案\n    cur -= nums[i - k + 1]; // 3. 出窗\n}\nreturn ans;"
      },
      {
        "name": "不定长滑动窗口模板（求最长子串/数组）",
        "code": "int left = 0, ans = 0;\nunordered_map<char, int> cnt;\nfor (int right = 0; right < s.size(); ++right) {\n    cnt[s[right]]++; // 1. 扩大窗口\n    while (cnt[s[right]] > 1) { // 2. 违反约束，收缩左端\n        cnt[s[left]]--;\n        left++;\n    }\n    ans = max(ans, right - left + 1); // 3. 此时窗口合法，更新最值\n}\nreturn ans;"
      },
      {
        "name": "相向双指针夹逼模板（盛水最多的容器）",
        "code": "int left = 0, right = height.size() - 1, maxArea = 0;\nwhile (left < right) {\n    int h = min(height[left], height[right]);\n    maxArea = max(maxArea, h * (right - left));\n    if (height[left] < height[right]) left++; // 谁短谁移动\n    else right--;\n}\nreturn maxArea;"
      },
      {
        "name": "分组循环通用模板",
        "code": "int i = 0, n = nums.size();\nwhile (i < n) {\n    int start = i;\n    while (i + 1 < n && isSameGroup(nums[i], nums[i + 1])) {\n        i++;\n    }\n    // [start, i] 为一个完整连续段，在此结算\n    processGroup(start, i);\n    i++; // 开启下一段\n}"
      }
    ]
  },
  "binary-search": {
    "title": "专题二 · 二分查找与二分答案（灵神红蓝染色法）",
    "concepts": [
      "【二分的本质】：不是“数组有序”，而是“定义域具有二段性”——整个区间能被某个条件分割为【不满足】和【满足】两半。",
      "【闭区间红蓝染色法】：设置 [left, right] = [0, n - 1]。红色区域代表不满足条件，蓝色区域代表满足条件。",
      "【红蓝不重不漏】：mid = left + (right - left) / 2。若 mid 满足条件则向左压缩蓝区（right = mid - 1），否则向右扩大红区（left = mid + 1）。",
      "【循环结束状态】：while (left <= right) 结束时，left 必然停在第一个满足条件的蓝色位置（lower_bound）！",
      "【二分答案】：若题目求“最小化的最大值”或“最大化的最小值”，直接将答案值域作为二分区间，通过 check(mid) 验证可行性。"
    ],
    "templates": [
      {
        "name": "闭区间二分查找 lower_bound 模板",
        "code": "int lower_bound(vector<int>& nums, int target) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] >= target) right = mid - 1; // 染蓝，左缩\n        else left = mid + 1; // 染红，右扩\n    }\n    return left; // left 为首个 >= target 的位置\n}"
      },
      {
        "name": "二分答案·求最小（单调可行性）",
        "code": "long long left = min_ans, right = max_ans;\nwhile (left <= right) {\n    long long mid = left + (right - left) / 2;\n    if (check(mid)) right = mid - 1; // 满足条件，尝试更小值\n    else left = mid + 1; // 不满足，必须增大\n}\nreturn left; // 返回最小满足条件的答案"
      },
      {
        "name": "二分答案·求最大（最大化最小值）",
        "code": "long long left = min_ans, right = max_ans;\nwhile (left <= right) {\n    long long mid = left + (right - left) / 2;\n    if (check(mid)) left = mid + 1; // 满足条件，尝试更大值\n    else right = mid - 1;\n}\nreturn right; // 返回最大满足条件的答案"
      }
    ]
  },
  "monotonic-stack": {
    "title": "专题三 · 单调栈与单调队列（及时淘汰法）",
    "concepts": [
      "【单调栈的核心思维】：及时淘汰！当新元素进入时，若以往的旧元素在未来不可能成为最优解，则立即弹出淘汰。",
      "【下一个更大/更小元素】：求下一个更大用单调递减栈；求下一个更小用单调递增栈。栈内存储数组下标。",
      "【矩形面积与柱状图】：每个柱子作为高时，向左右两边寻找第一个比它矮的柱子确定宽度。在数组两端添加 0 哨兵可避免特判。",
      "【子数组贡献法】：求每个元素作为极值的区间范围，总贡献 = arr[i] * (i - left[i]) * (right[i] - i)。为防重复，一侧取等号一侧严格小于。",
      "【单调双端队列】：维护滑动窗口内的最大值/最小值。新元素进队时从队尾淘汰比它差的元素，队首检查是否滑出窗口。"
    ],
    "templates": [
      {
        "name": "单调栈·下一个更大元素模板（每日温度）",
        "code": "vector<int> dailyTemperatures(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> ans(n, 0);\n    stack<int> st; // 存下标\n    for (int i = 0; i < n; ++i) {\n        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n            int prev = st.top(); st.pop();\n            ans[prev] = i - prev;\n        }\n        st.push(i);\n    }\n    return ans;\n}"
      },
      {
        "name": "单调栈·柱状图最大矩形（哨兵机制）",
        "code": "int largestRectangleArea(vector<int>& heights) {\n    heights.insert(heights.begin(), 0); // 左哨兵\n    heights.push_back(0); // 右哨兵\n    stack<int> st;\n    int maxArea = 0;\n    for (int i = 0; i < heights.size(); ++i) {\n        while (!st.empty() && heights[i] < heights[st.top()]) {\n            int h = heights[st.top()]; st.pop();\n            int w = i - st.top() - 1;\n            maxArea = max(maxArea, h * w);\n        }\n        st.push(i);\n    }\n    return maxArea;\n}"
      },
      {
        "name": "单调双端队列·滑动窗口最大值",
        "code": "vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    deque<int> dq;\n    vector<int> ans;\n    for (int i = 0; i < nums.size(); ++i) {\n        while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();\n        dq.push_back(i);\n        if (dq.front() <= i - k) dq.pop_front();\n        if (i >= k - 1) ans.push_back(nums[dq.front()]);\n    }\n    return ans;\n}"
      }
    ]
  },
  "grid-search": {
    "title": "专题四 · 网格图搜索 (DFS / BFS)",
    "concepts": [
      "【方向数组】：使用 int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}} 规范遍历四邻域，消除重复代码。",
      "【沉没法标记】：遍历到的陆地直接就地修改为 '0'（或其他标志位），避免开辟 O(m*n) 的 visited 布尔矩阵。",
      "【正难则反（边界扩散）】：求被包围的区域时，从矩阵四条边界上的起点发起搜索，未被触及的内部格子必然被完全包围。",
      "【多源 BFS 最短路】：腐烂橘子、01 矩阵。将所有初始源头同时放入队列，按层扩散，自然实现最短步数。"
    ],
    "templates": [
      {
        "name": "网格图 DFS 连通块沉没模板（岛屿数量）",
        "code": "void dfs(vector<vector<char>>& grid, int r, int c) {\n    int m = grid.size(), n = grid[0].size();\n    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n    grid[r][c] = '0'; // 沉没\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}"
      },
      {
        "name": "多源 BFS 拓扑扩散模板（腐烂橘子）",
        "code": "int multiSourceBFS(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size(), fresh = 0;\n    queue<pair<int, int>> q;\n    for (int i = 0; i < m; ++i)\n        for (int j = 0; j < n; ++j)\n            if (grid[i][j] == 2) q.push({i, j});\n            else if (grid[i][j] == 1) fresh++;\n    int step = 0, dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};\n    while (!q.empty() && fresh > 0) {\n        step++;\n        int sz = q.size();\n        while (sz--) {\n            auto [r, c] = q.front(); q.pop();\n            for (auto& d : dirs) {\n                int nr = r + d[0], nc = c + d[1];\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                    grid[nr][nc] = 2; fresh--;\n                    q.push({nr, nc});\n                }\n            }\n        }\n    }\n    return fresh == 0 ? step : -1;\n}"
      }
    ]
  },
  "tree-backtrack": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "dp": {
    "title": "专题六 · 动态规划专题 (DP)",
    "concepts": [
      "【记忆化搜索到递推】：所有 DP 本质都是带备忘录的回溯！从暴搜递归树出发，加一个 memo 缓存，然后 1:1 翻译成递推数组。",
      "【0-1 背包 vs 完全背包】：0-1 背包内层倒序遍历容量（防重复选取）；完全背包内层正序遍历容量（允许重复选取）。",
      "【状态机 DP】：股票买卖系列。持有股票与不持有股票两个状态相互转换，滚动变量消除空间复杂度。",
      "【数位 DP 万能模板】：记忆化搜索 dfs(i, mask, isLimit, isNum)，极速解决数字构造与计数问题。"
    ],
    "templates": [
      {
        "name": "打家劫舍空间优化模板",
        "code": "int rob(vector<int>& nums) {\n    int f0 = 0, f1 = 0;\n    for (int x : nums) {\n        int newF = max(f1, f0 + x);\n        f0 = f1;\n        f1 = newF;\n    }\n    return f1;\n}"
      },
      {
        "name": "0-1 背包一维滚动数组模板",
        "code": "vector<bool> dp(target + 1, false);\ndp[0] = true;\nfor (int x : nums) {\n    for (int j = target; j >= x; --j) { // 必须倒序遍历\n        dp[j] = dp[j] || dp[j - x];\n    }\n}\nreturn dp[target];"
      },
      {
        "name": "LIS 最长递增子序列（贪心 + 二分）",
        "code": "int lengthOfLIS(vector<int>& nums) {\n    vector<int> g;\n    for (int x : nums) {\n        auto it = lower_bound(g.begin(), g.end(), x);\n        if (it == g.end()) g.push_back(x);\n        else *it = x;\n    }\n    return g.size();\n}"
      }
    ]
  },
  "data-structures": {
    "title": "专题七 · 常用数据结构",
    "concepts": [
      "【前缀和与差分】：互为逆运算。前缀和在 O(1) 查询区间和，差分在 O(1) 执行区间增减修改。",
      "【前缀和 + 哈希表】：寻找满足 s[j] - s[i] == k 的子数组，等价于记录 s[i] == s[j] - k 的历史频次。",
      "【堆（优先队列）】：求第 K 大用大小为 K 的小顶堆；求第 K 小用大小为 K 的大顶堆。",
      "【并查集】：路径压缩与按秩合并，常数级维护连通分量与判环。",
      "【树状数组】：利用 lowbit(x) = x & (-x) 在 O(log n) 时间内实现单点修改与前缀和查询。"
    ],
    "templates": [
      {
        "name": "前缀和 + 哈希表（和为 K 的子数组）",
        "code": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> mp;\n    mp[0] = 1; // 哨兵\n    int cur = 0, ans = 0;\n    for (int x : nums) {\n        cur += x;\n        if (mp.count(cur - k)) ans += mp[cur - k];\n        mp[cur]++;\n    }\n    return ans;\n}"
      },
      {
        "name": "并查集路径压缩模板",
        "code": "struct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }\n    bool unite(int x, int y) {\n        int rx = find(x), ry = find(y);\n        if (rx == ry) return false;\n        parent[rx] = ry;\n        return true;\n    }\n};"
      },
      {
        "name": "小顶堆 TopK 模板",
        "code": "int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for (int x : nums) {\n        pq.push(x);\n        if (pq.size() > k) pq.pop();\n    }\n    return pq.top();\n}"
      }
    ]
  },
  "graph": {
    "title": "专题八 · 图论算法",
    "concepts": [
      "【拓扑排序 (Kahn 算法)】：统计入度，入度为 0 入队，弹出节点并扣减邻居入度。若出队总数等于点数则无环。",
      "【反向拓扑排序】：从出度为 0 的终端节点出发反向寻找安全节点。",
      "【Dijkstra 最短路】：小顶堆贪心选择当前最近未访问节点，松弛邻居，适用于非负权图。",
      "【最小生成树 (Kruskal)】：边权升序排序，借助并查集贪心合并，直到连满 V - 1 条边。"
    ],
    "templates": [
      {
        "name": "拓扑排序 Kahn 算法模板",
        "code": "bool canFinish(int n, vector<vector<int>>& edges) {\n    vector<vector<int>> g(n); vector<int> in(n, 0);\n    for (auto& e : edges) { g[e[1]].push_back(e[0]); in[e[0]]++; }\n    queue<int> q;\n    for (int i = 0; i < n; ++i) if (in[i] == 0) q.push(i);\n    int count = 0;\n    while (!q.empty()) {\n        int u = q.front(); q.pop(); count++;\n        for (int v : g[u]) if (--in[v] == 0) q.push(v);\n    }\n    return count == n;\n}"
      },
      {
        "name": "堆优化 Dijkstra 最短路模板",
        "code": "vector<int> dijkstra(int n, int start, vector<vector<pair<int, int>>>& g) {\n    vector<int> dist(n + 1, INT_MAX);\n    dist[start] = 0;\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    pq.push({0, start});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto& [v, w] : g[u]) {\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}"
      }
    ]
  },
  "bit-manipulation": {
    "title": "专题九 · 位运算与状态压缩",
    "concepts": [
      "【异或运算三特性】：x ^ x = 0; x ^ 0 = x; 满足交换律结合律，常用于消除成对出现的数字。",
      "【lowbit 操作】：x & (-x) 可快速提取 x 二进制表示中最低位的 1。",
      "【消除最低位 1】：x & (x - 1) 精准抹去最低位的 1，用于高效统计二进制中 1 的个数。",
      "【拆位法】：将每个数字按 32 个二进制位拆开统计，位之间相互独立，将复杂问题转化为二进制 0/1 统计问题。"
    ],
    "templates": [
      {
        "name": "异或消对与 lowbit 模板",
        "code": "int singleNumber(vector<int>& nums) {\n    int ans = 0;\n    for (int x : nums) ans ^= x;\n    return ans;\n}\nint lowbit(int x) { return x & (-x); }"
      },
      {
        "name": "抹去最低位 1 统计汉明重量",
        "code": "int countBits(int n) {\n    int cnt = 0;\n    while (n) {\n        n &= (n - 1);\n        cnt++;\n    }\n    return cnt;\n}"
      }
    ]
  },
  "greedy": {
    "title": "专题十 · 贪心与思维题",
    "concepts": [
      "【区间调度贪心】：求最多不重叠区间，按【右端点升序】排序，右端点越小为后方留出的空间越大。",
      "【中位数贪心（货仓选址）】：到所有点的距离绝对值之和在取【中位数】时达到极小值。",
      "【反悔贪心】：先做贪心选择，若后续发现违规，使用大顶堆/小顶堆反悔撤销之前做出的最差选择。"
    ],
    "templates": [
      {
        "name": "区间调度无重叠贪心模板",
        "code": "int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });\n    int count = 1, end = intervals[0][1];\n    for (int i = 1; i < intervals.size(); ++i) {\n        if (intervals[i][0] >= end) {\n            count++; end = intervals[i][1];\n        }\n    }\n    return intervals.size() - count;\n}"
      },
      {
        "name": "中位数贪心模板",
        "code": "int minMoves2(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    int mid = nums[nums.size() / 2], ans = 0;\n    for (int x : nums) ans += abs(x - mid);\n    return ans;\n}"
      }
    ]
  },
  "string": {
    "title": "专题十一 · 字符串算法",
    "concepts": [
      "【KMP 前缀函数】：pi[i] 表示子串 s[0..i] 的最长公共真前后缀长度。发生失配时主串不回退，模式串利用 pi 回跳。",
      "【KMP 周期定理】：若 n % (n - pi[n-1]) == 0 且 pi[n-1] > 0，则字符串由长度为 n - pi[n-1] 的子串重复构成。",
      "【Manacher 马拉车】：插入 '#' 统一奇偶回文，维护最右回文右边界 r 与对称点半径加速，将回文搜索优化至 O(n)。"
    ],
    "templates": [
      {
        "name": "KMP 前缀函数与模式匹配模板",
        "code": "int strStr(string s, string p) {\n    int n = s.size(), m = p.size();\n    if (m == 0) return 0;\n    vector<int> pi(m, 0);\n    for (int i = 1, j = 0; i < m; ++i) {\n        while (j > 0 && p[i] != p[j]) j = pi[j - 1];\n        if (p[i] == p[j]) j++;\n        pi[i] = j;\n    }\n    for (int i = 0, j = 0; i < n; ++i) {\n        while (j > 0 && s[i] != p[j]) j = pi[j - 1];\n        if (s[i] == p[j]) j++;\n        if (j == m) return i - m + 1;\n    }\n    return -1;\n}"
      }
    ]
  },
  "math": {
    "title": "专题十二 · 数学与数论",
    "concepts": [
      "【埃拉托斯特尼筛法】：从 2 开始遍历质数，将其平方倍数 i * i, i * (i + 1)... 标记为合数，O(n log log n) 筛选质数。",
      "【二进制快速幂】：按二进制位分解指数，O(log n) 解决 a^b 幂运算与模运算。",
      "【巴什博弈】：每次最多拿 3 块，若总数是 4 的倍数则后手必胜，先手必胜条件为 n % 4 != 0。"
    ],
    "templates": [
      {
        "name": "埃氏质数筛模板",
        "code": "int countPrimes(int n) {\n    if (n <= 2) return 0;\n    vector<bool> isPrime(n, true);\n    int count = 0;\n    for (int i = 2; i < n; ++i) {\n        if (isPrime[i]) {\n            count++;\n            if ((long long)i * i < n) {\n                for (int j = i * i; j < n; j += i) isPrime[j] = false;\n            }\n        }\n    }\n    return count;\n}"
      },
      {
        "name": "二进制快速幂模板",
        "code": "double myPow(double x, long long n) {\n    if (n < 0) { x = 1 / x; n = -n; }\n    double ans = 1.0, base = x;\n    while (n > 0) {\n        if (n & 1) ans *= base;\n        base *= base;\n        n >>= 1;\n    }\n    return ans;\n}"
      }
    ]
  },
  "list-basic": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "list-adv": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "tree-basic": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "tree-adv": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "backtrack": {
    "title": "专题五 · 链表、二叉树与回溯（深入理解递归）",
    "concepts": [
      "【链表哨兵节点】：dummy 节点统一头节点处理，避免对 head 是否为空或被删的烦琐特判。",
      "【递归三问】：1. 子问题是什么；2. 当前节点做什么；3. 返回什么给父节点。",
      "【二叉搜索树】：BST 的中序遍历（左中右）结果必然是严格递增序列。",
      "【回溯算法双重视角】：",
      "  - 视角一（选或不选）：每个元素面临选或不选两种分支（用于子集问题）。",
      "  - 视角二（枚举当前选哪个）：从剩余可用元素中挑选一个放入当前位置（用于排列、组合问题）。"
    ],
    "templates": [
      {
        "name": "链表三指针原地反转模板",
        "code": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr, *cur = head;\n    while (cur != nullptr) {\n        ListNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}"
      },
      {
        "name": "二叉树递归遍历（求直径与深度）",
        "code": "int maxDepth(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int l = maxDepth(root->left, maxDiameter);\n    int r = maxDepth(root->right, maxDiameter);\n    maxDiameter = max(maxDiameter, l + r); // 更新路径最大长度\n    return 1 + max(l, r); // 返回当前子树深度\n}"
      },
      {
        "name": "回溯暴搜模板（子集/选与不选）",
        "code": "void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n    if (i == nums.size()) { ans.push_back(path); return; }\n    dfs(i + 1, nums, path, ans); // 不选\n    path.push_back(nums[i]); // 选\n    dfs(i + 1, nums, path, ans);\n    path.pop_back(); // 恢复现场\n}"
      }
    ]
  },
  "stack-queue": {
    "title": "专题三 · 单调栈与单调队列（及时淘汰法）",
    "concepts": [
      "【单调栈的核心思维】：及时淘汰！当新元素进入时，若以往的旧元素在未来不可能成为最优解，则立即弹出淘汰。",
      "【下一个更大/更小元素】：求下一个更大用单调递减栈；求下一个更小用单调递增栈。栈内存储数组下标。",
      "【矩形面积与柱状图】：每个柱子作为高时，向左右两边寻找第一个比它矮的柱子确定宽度。在数组两端添加 0 哨兵可避免特判。",
      "【子数组贡献法】：求每个元素作为极值的区间范围，总贡献 = arr[i] * (i - left[i]) * (right[i] - i)。为防重复，一侧取等号一侧严格小于。",
      "【单调双端队列】：维护滑动窗口内的最大值/最小值。新元素进队时从队尾淘汰比它差的元素，队首检查是否滑出窗口。"
    ],
    "templates": [
      {
        "name": "单调栈·下一个更大元素模板（每日温度）",
        "code": "vector<int> dailyTemperatures(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> ans(n, 0);\n    stack<int> st; // 存下标\n    for (int i = 0; i < n; ++i) {\n        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n            int prev = st.top(); st.pop();\n            ans[prev] = i - prev;\n        }\n        st.push(i);\n    }\n    return ans;\n}"
      },
      {
        "name": "单调栈·柱状图最大矩形（哨兵机制）",
        "code": "int largestRectangleArea(vector<int>& heights) {\n    heights.insert(heights.begin(), 0); // 左哨兵\n    heights.push_back(0); // 右哨兵\n    stack<int> st;\n    int maxArea = 0;\n    for (int i = 0; i < heights.size(); ++i) {\n        while (!st.empty() && heights[i] < heights[st.top()]) {\n            int h = heights[st.top()]; st.pop();\n            int w = i - st.top() - 1;\n            maxArea = max(maxArea, h * w);\n        }\n        st.push(i);\n    }\n    return maxArea;\n}"
      },
      {
        "name": "单调双端队列·滑动窗口最大值",
        "code": "vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    deque<int> dq;\n    vector<int> ans;\n    for (int i = 0; i < nums.size(); ++i) {\n        while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();\n        dq.push_back(i);\n        if (dq.front() <= i - k) dq.pop_front();\n        if (i >= k - 1) ans.push_back(nums[dq.front()]);\n    }\n    return ans;\n}"
      }
    ]
  },
  "heap": {
    "title": "专题七 · 常用数据结构",
    "concepts": [
      "【前缀和与差分】：互为逆运算。前缀和在 O(1) 查询区间和，差分在 O(1) 执行区间增减修改。",
      "【前缀和 + 哈希表】：寻找满足 s[j] - s[i] == k 的子数组，等价于记录 s[i] == s[j] - k 的历史频次。",
      "【堆（优先队列）】：求第 K 大用大小为 K 的小顶堆；求第 K 小用大小为 K 的大顶堆。",
      "【并查集】：路径压缩与按秩合并，常数级维护连通分量与判环。",
      "【树状数组】：利用 lowbit(x) = x & (-x) 在 O(log n) 时间内实现单点修改与前缀和查询。"
    ],
    "templates": [
      {
        "name": "前缀和 + 哈希表（和为 K 的子数组）",
        "code": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> mp;\n    mp[0] = 1; // 哨兵\n    int cur = 0, ans = 0;\n    for (int x : nums) {\n        cur += x;\n        if (mp.count(cur - k)) ans += mp[cur - k];\n        mp[cur]++;\n    }\n    return ans;\n}"
      },
      {
        "name": "并查集路径压缩模板",
        "code": "struct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }\n    bool unite(int x, int y) {\n        int rx = find(x), ry = find(y);\n        if (rx == ry) return false;\n        parent[rx] = ry;\n        return true;\n    }\n};"
      },
      {
        "name": "小顶堆 TopK 模板",
        "code": "int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for (int x : nums) {\n        pq.push(x);\n        if (pq.size() > k) pq.pop();\n    }\n    return pq.top();\n}"
      }
    ]
  },
  "hash": {
    "title": "专题七 · 常用数据结构",
    "concepts": [
      "【前缀和与差分】：互为逆运算。前缀和在 O(1) 查询区间和，差分在 O(1) 执行区间增减修改。",
      "【前缀和 + 哈希表】：寻找满足 s[j] - s[i] == k 的子数组，等价于记录 s[i] == s[j] - k 的历史频次。",
      "【堆（优先队列）】：求第 K 大用大小为 K 的小顶堆；求第 K 小用大小为 K 的大顶堆。",
      "【并查集】：路径压缩与按秩合并，常数级维护连通分量与判环。",
      "【树状数组】：利用 lowbit(x) = x & (-x) 在 O(log n) 时间内实现单点修改与前缀和查询。"
    ],
    "templates": [
      {
        "name": "前缀和 + 哈希表（和为 K 的子数组）",
        "code": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> mp;\n    mp[0] = 1; // 哨兵\n    int cur = 0, ans = 0;\n    for (int x : nums) {\n        cur += x;\n        if (mp.count(cur - k)) ans += mp[cur - k];\n        mp[cur]++;\n    }\n    return ans;\n}"
      },
      {
        "name": "并查集路径压缩模板",
        "code": "struct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }\n    bool unite(int x, int y) {\n        int rx = find(x), ry = find(y);\n        if (rx == ry) return false;\n        parent[rx] = ry;\n        return true;\n    }\n};"
      },
      {
        "name": "小顶堆 TopK 模板",
        "code": "int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for (int x : nums) {\n        pq.push(x);\n        if (pq.size() > k) pq.pop();\n    }\n    return pq.top();\n}"
      }
    ]
  },
  "dsu-trie": {
    "title": "专题七 · 常用数据结构",
    "concepts": [
      "【前缀和与差分】：互为逆运算。前缀和在 O(1) 查询区间和，差分在 O(1) 执行区间增减修改。",
      "【前缀和 + 哈希表】：寻找满足 s[j] - s[i] == k 的子数组，等价于记录 s[i] == s[j] - k 的历史频次。",
      "【堆（优先队列）】：求第 K 大用大小为 K 的小顶堆；求第 K 小用大小为 K 的大顶堆。",
      "【并查集】：路径压缩与按秩合并，常数级维护连通分量与判环。",
      "【树状数组】：利用 lowbit(x) = x & (-x) 在 O(log n) 时间内实现单点修改与前缀和查询。"
    ],
    "templates": [
      {
        "name": "前缀和 + 哈希表（和为 K 的子数组）",
        "code": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> mp;\n    mp[0] = 1; // 哨兵\n    int cur = 0, ans = 0;\n    for (int x : nums) {\n        cur += x;\n        if (mp.count(cur - k)) ans += mp[cur - k];\n        mp[cur]++;\n    }\n    return ans;\n}"
      },
      {
        "name": "并查集路径压缩模板",
        "code": "struct DSU {\n    vector<int> parent;\n    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }\n    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }\n    bool unite(int x, int y) {\n        int rx = find(x), ry = find(y);\n        if (rx == ry) return false;\n        parent[rx] = ry;\n        return true;\n    }\n};"
      },
      {
        "name": "小顶堆 TopK 模板",
        "code": "int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for (int x : nums) {\n        pq.push(x);\n        if (pq.size() > k) pq.pop();\n    }\n    return pq.top();\n}"
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MODULE_SUMMARIES };
}
