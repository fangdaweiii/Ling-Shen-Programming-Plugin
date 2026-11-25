# -*- coding: utf-8 -*-
"""
专题六：动态规划专题 (DP)
包含入门与线性 DP、背包 DP、经典序列模型（LIS/LCS/编辑距离）、状态机股票系列、区间 DP、状压 DP、数位 DP、树形 DP
"""

TOPIC_DP = [
    # 1. 线性 DP
    {
        "lcNum": 70,
        "title": "爬楼梯",
        "slug": "climbing-stairs",
        "rating": 1000,
        "hot100": True,
        "tags": ["动态规划", "斐波那契", "Hot100"],
        "brief": "假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？",
        "note": "DP 入门基石：到第 n 阶的方法只能从第 n-1 阶（跨 1 步）或第 n-2 阶（跨 2 步）转移过来。状态转移方程：dp[i] = dp[i-1] + dp[i-2]。滚动变量优化空间至 O(1)。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["初始化：dp[0] = 1, dp[1] = 1 或从 1, 2 开始。"],
        "ref": [
            "int climbStairs(int n) {",
            "    int a = 1, b = 1;",
            "    for (int i = 2; i <= n; ++i) {",
            "        int c = a + b;",
            "        a = b;",
            "        b = c;",
            "    }",
            "    return b;",
            "}"
        ]
    },
    {
        "lcNum": 198,
        "title": "打家劫舍",
        "slug": "house-robber",
        "rating": 1300,
        "hot100": True,
        "tags": ["动态规划", "线性DP", "Hot100"],
        "brief": "如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。计算你 不触动报警装置的情况下 ，一夜之内能够偷窃到的最高金额。",
        "note": "选或不选模型：对第 i 间房屋，若不偷则最大金额为 dp[i-1]；若偷则不能偷 i-1，金额为 dp[i-2] + nums[i]。转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。滚动两个变量即可。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["边界处理：只有一间房屋时直接返回 nums[0]。"],
        "ref": [
            "int rob(vector<int>& nums) {",
            "    int f0 = 0, f1 = 0;",
            "    for (int x : nums) {",
            "        int newF = max(f1, f0 + x);",
            "        f0 = f1;",
            "        f1 = newF;",
            "    }",
            "    return f1;",
            "}"
        ]
    },
    {
        "lcNum": 213,
        "title": "打家劫舍 II",
        "slug": "house-robber-ii",
        "rating": 1400,
        "hot100": False,
        "tags": ["动态规划", "环形"],
        "brief": "这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。给定一个代表每个房屋存放金额的非负整数数组，计算你能够偷窃到的最高金额。",
        "note": "【环形拆解】：首尾不能同时偷。情况 1：不偷首房屋，偷窃范围为 [1, n-1]；情况 2：不偷尾房屋，偷窃范围为 [0, n-2]。对这两个单链区间分别跑一次常规打家劫舍，取最大值。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["n = 1 时特判返回 nums[0]。"],
        "ref": [
            "int rob(vector<int>& nums) {",
            "    int n = nums.size();",
            "    if (n == 1) return nums[0];",
            "    auto robRange = [&](int l, int r) {",
            "        int f0 = 0, f1 = 0;",
            "        for (int i = l; i <= r; ++i) {",
            "            int newF = max(f1, f0 + nums[i]);",
            "            f0 = f1; f1 = newF;",
            "        }",
            "        return f1;",
            "    };",
            "    return max(robRange(0, n - 2), robRange(1, n - 1));",
            "}"
        ]
    },
    {
        "lcNum": 740,
        "title": "删除并获得点数",
        "slug": "delete-and-earn",
        "rating": 1500,
        "hot100": False,
        "tags": ["动态规划", "值域转换"],
        "brief": "每次操作中，选择任意一个 nums[i] 删除它并获得 nums[i] 的点数，之后必须删除所有等于 nums[i] - 1 和 nums[i] + 1 的元素。求最大点数。",
        "note": "【值域转换】：选了 x 就不能选 x-1 和 x+1，这正是打家劫舍！统计每个数值 x 的总点数 sum[x] = x * count(x)。在值域 [0, max_val] 上做一次打家劫舍。",
        "complexity": "时间 O(n + max_val)，空间 O(max_val)。",
        "pitfalls": ["值域范围根据数组最大值开辟数组空间。"],
        "ref": [
            "int deleteAndEarn(vector<int>& nums) {",
            "    int mx = *max_element(nums.begin(), nums.end());",
            "    vector<int> sum(mx + 1, 0);",
            "    for (int x : nums) sum[x] += x;",
            "    int f0 = 0, f1 = 0;",
            "    for (int i = 0; i <= mx; ++i) {",
            "        int newF = max(f1, f0 + sum[i]);",
            "        f0 = f1; f1 = newF;",
            "    }",
            "    return f1;",
            "}"
        ]
    },

    # 2. 背包 DP
    {
        "lcNum": 416,
        "title": "分割等和子集",
        "slug": "partition-equal-subset-sum",
        "rating": 1500,
        "hot100": True,
        "tags": ["0-1背包", "Hot100"],
        "brief": "给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。",
        "note": "转化为 0-1 背包问题：是否能从数组中挑选若干数字，恰好装满容量为 target = sum / 2 的背包。定义 dp[j] 表示容量为 j 是否能被凑出。外层遍历物品，内层倒序遍历容量 j ∈ [target, x]：dp[j] = dp[j] || dp[j - x]。",
        "complexity": "时间 O(n * target)，空间 O(target)。",
        "pitfalls": ["如果总和 sum 为奇数，不可能等分，直接返回 false；内层循环必须倒序以保证每个物品只选一次。"],
        "ref": [
            "bool canPartition(vector<int>& nums) {",
            "    int total = accumulate(nums.begin(), nums.end(), 0);",
            "    if (total % 2 != 0) return false;",
            "    int target = total / 2;",
            "    vector<bool> dp(target + 1, false);",
            "    dp[0] = true;",
            "    for (int x : nums) {",
            "        for (int j = target; j >= x; --j) {",
            "            dp[j] = dp[j] || dp[j - x];",
            "        }",
            "    }",
            "    return dp[target];",
            "}"
        ]
    },
    {
        "lcNum": 322,
        "title": "零钱兑换",
        "slug": "coin-change",
        "rating": 1550,
        "hot100": True,
        "tags": ["完全背包", "Hot100"],
        "brief": "给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。",
        "note": "完全背包（每种硬币可选无限次）求最小枚数：dp[j] 表示凑齐金额 j 的最少硬币数。初始化 dp 全设为无穷大，dp[0] = 0。遍历硬币，正序遍历容量 j ∈ [coin, amount]：dp[j] = min(dp[j], dp[j - coin] + 1)。",
        "complexity": "时间 O(n * amount)，空间 O(amount)。",
        "pitfalls": ["完全背包内层正序遍历；初始值设为 amount + 1 避免溢出。", "若 dp[amount] > amount 说明无法凑出返回 -1。"],
        "ref": [
            "int coinChange(vector<int>& coins, int amount) {",
            "    vector<int> dp(amount + 1, amount + 1);",
            "    dp[0] = 0;",
            "    for (int c : coins) {",
            "        for (int j = c; j <= amount; ++j) {",
            "            dp[j] = min(dp[j], dp[j - c] + 1);",
            "        }",
            "    }",
            "    return dp[amount] > amount ? -1 : dp[amount];",
            "}"
        ]
    },
    {
        "lcNum": 518,
        "title": "零钱兑换 II",
        "slug": "coin-change-ii",
        "rating": 1600,
        "hot100": False,
        "tags": ["完全背包", "组合数"],
        "brief": "给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。",
        "note": "完全背包求组合数：dp[j] 表示金额 j 的组合方案数。外层遍历硬币，内层正序遍历容量：dp[j] += dp[j - coin]。先遍历物品后遍历背包保证求的是组合数而非排列数。",
        "complexity": "时间 O(n * amount)，空间 O(amount)。",
        "pitfalls": ["外层遍历硬币保证无顺序重复；方案数可能较大，C++ 中用 unsigned int 防止溢出。"],
        "ref": [
            "int change(int amount, vector<int>& coins) {",
            "    vector<unsigned int> dp(amount + 1, 0);",
            "    dp[0] = 1;",
            "    for (int c : coins) {",
            "        for (int j = c; j <= amount; ++j) {",
            "            dp[j] += dp[j - c];",
            "        }",
            "    }",
            "    return dp[amount];",
            "}"
        ]
    },

    # 3. 经典序列模型
    {
        "lcNum": 300,
        "title": "最长递增子序列",
        "slug": "longest-increasing-subsequence",
        "rating": 1550,
        "hot100": True,
        "tags": ["LIS", "动态规划", "二分查找", "Hot100"],
        "brief": "给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。",
        "note": "方法一：动态规划 O(n^2)，dp[i] 表示以 nums[i] 结尾的 LIS 长度，枚举前驱 j < i 转移 dp[i] = max(dp[i], dp[j] + 1)。方法二：贪心+二分 O(n log n)，维护 g 数组记录各长度结尾的最小值，用 lower_bound 查找并替换。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "pitfalls": ["题目要求严格递增，二分时使用 lower_bound（找第一个 >= x 的位置替换）。"],
        "ref": [
            "int lengthOfLIS(vector<int>& nums) {",
            "    vector<int> g;",
            "    for (int x : nums) {",
            "        auto it = lower_bound(g.begin(), g.end(), x);",
            "        if (it == g.end()) g.push_back(x);",
            "        else *it = x;",
            "    }",
            "    return g.size();",
            "}"
        ]
    },
    {
        "lcNum": 1143,
        "title": "最长公共子序列",
        "slug": "longest-common-subsequence",
        "rating": 1500,
        "hot100": True,
        "tags": ["LCS", "双序列DP", "Hot100"],
        "brief": "给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。",
        "note": "双序列 DP 经典母题：dp[i][j] 表示 text1[0..i-1] 与 text2[0..j-1] 的 LCS 长度。若 text1[i-1] == text2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1；否则继承 max(dp[i-1][j], dp[i][j-1])。",
        "complexity": "时间 O(m * n)，空间 O(m * n)（可滚动数组优化）。",
        "pitfalls": ["dp 数组下标开 (m+1) x (n+1)，空串边界值为 0。"],
        "ref": [
            "int longestCommonSubsequence(string text1, string text2) {",
            "    int m = text1.size(), n = text2.size();",
            "    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));",
            "    for (int i = 1; i <= m; ++i) {",
            "        for (int j = 1; j <= n; ++j) {",
            "            if (text1[i - 1] == text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;",
            "            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);",
            "        }",
            "    }",
            "    return dp[m][n];",
            "}"
        ]
    },
    {
        "lcNum": 72,
        "title": "编辑距离",
        "slug": "edit-distance",
        "rating": 1850,
        "hot100": True,
        "tags": ["动态规划", "字符串", "Hard", "Hot100"],
        "brief": "给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。你可以对一个单词进行三种操作：插入、删除、替换一个字符。",
        "note": "dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最少步数。若 word1[i-1] == word2[j-1] 则无需操作 dp[i-1][j-1]；否则取 替换(dp[i-1][j-1])、删除(dp[i-1][j])、插入(dp[i][j-1]) 的最小值 + 1。",
        "complexity": "时间 O(m * n)，空间 O(m * n)。",
        "pitfalls": ["初始化：dp[i][0] = i, dp[0][j] = j（空串变为长度为 k 的串需 k 步插入/删除）。"],
        "ref": [
            "int minDistance(string word1, string word2) {",
            "    int m = word1.size(), n = word2.size();",
            "    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));",
            "    for (int i = 0; i <= m; ++i) dp[i][0] = i;",
            "    for (int j = 0; j <= n; ++j) dp[0][j] = j;",
            "    for (int i = 1; i <= m; ++i) {",
            "        for (int j = 1; j <= n; ++j) {",
            "            if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];",
            "            else dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;",
            "        }",
            "    }",
            "    return dp[m][n];",
            "}"
        ]
    },

    # 4. 状态机股票系列
    {
        "lcNum": 121,
        "title": "买卖股票的最佳时机",
        "slug": "best-time-to-buy-and-sell-stock",
        "rating": 1150,
        "hot100": True,
        "tags": ["状态机", "贪心", "Hot100"],
        "brief": "给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易，设计一个算法来计算你所能获取的最大利润。",
        "note": "维护遍历到当前天为止的历史最低进价 minPrice。以当前价格卖出能获得的利润为 prices[i] - minPrice，不断更新全局最大利润 ans = max(ans, profit)。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["只能先买后卖，minPrice 必须是当前天之前的最小值。"],
        "ref": [
            "int maxProfit(vector<int>& prices) {",
            "    int minPrice = INT_MAX, maxProfit = 0;",
            "    for (int p : prices) {",
            "        minPrice = min(minPrice, p);",
            "        maxProfit = max(maxProfit, p - minPrice);",
            "    }",
            "    return maxProfit;",
            "}"
        ]
    },
    {
        "lcNum": 122,
        "title": "买卖股票的最佳时机 II",
        "slug": "best-time-to-buy-and-sell-stock-ii",
        "rating": 1250,
        "hot100": False,
        "tags": ["状态机", "贪心"],
        "brief": "给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。在每一天，你可以决定是否购买和/或出售股票。返回你能获得的最大利润。",
        "note": "可交易无限次。贪心法：只要今天的价格比昨天高（prices[i] > prices[i-1]），我们就把这一段正收益累加起来；DP法：维护持有股票和未持有股票两个状态。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["可以同一天先卖再买，等价于收集所有相邻递增差值。"],
        "ref": [
            "int maxProfit(vector<int>& prices) {",
            "    int profit = 0;",
            "    for (int i = 1; i < prices.size(); ++i) {",
            "        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];",
            "    }",
            "    return profit;",
            "}"
        ]
    },

    # 5. 区间 DP
    {
        "lcNum": 516,
        "title": "最长回文子序列",
        "slug": "longest-palindromic-subsequence",
        "rating": 1650,
        "hot100": False,
        "tags": ["区间DP"],
        "brief": "给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。",
        "note": "区间 DP 经典模板：定义 dp[i][j] 表示子串 s[i..j] 的最长回文子序列长度。若 s[i] == s[j]，则 dp[i][j] = dp[i+1][j-1] + 2；否则两端收缩取最大 max(dp[i+1][j], dp[i][j-1])。按区间长度从小到大枚举转移。",
        "complexity": "时间 O(n^2)，空间 O(n^2)。",
        "pitfalls": ["外层遍历 i 从 n-1 到 0 倒序，内层 j 从 i+1 到 n-1 正序。"],
        "ref": [
            "int longestPalindromeSubseq(string s) {",
            "    int n = s.size();",
            "    vector<vector<int>> dp(n, vector<int>(n, 0));",
            "    for (int i = n - 1; i >= 0; --i) {",
            "        dp[i][i] = 1;",
            "        for (int j = i + 1; j < n; ++j) {",
            "            if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;",
            "            else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);",
            "        }",
            "    }",
            "    return dp[0][n - 1];",
            "}"
        ]
    },

    # 6. 数位 DP
    {
        "lcNum": 233,
        "title": "数字 1 的个数",
        "slug": "number-of-digit-one",
        "rating": 1850,
        "hot100": False,
        "tags": ["数位DP", "Hard"],
        "brief": "给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。",
        "note": "灵神数位 DP 万能记忆化模板：dfs(i, cnt1, isLimit, isNum)。i 表示当前填第几个数位；cnt1 记录已经填了多少个 1；isLimit 表示当前是否受 n 的对应数位限制；isNum 表示前面是否填了数字。使用 memo[i][cnt1] 进行记忆化缓存。",
        "complexity": "时间 O(log10(n) * 10)，空间 O(log10(n)^2)。",
        "pitfalls": ["只有当 !isLimit && isNum 时才能读写 memo 数组。"],
        "ref": [
            "int countDigitOne(int n) {",
            "    string s = to_string(n);",
            "    int m = s.size();",
            "    vector<vector<int>> memo(m, vector<int>(m, -1));",
            "    auto dfs = [&](auto self, int i, int cnt1, bool isLimit) -> int {",
            "        if (i == m) return cnt1;",
            "        if (!isLimit && memo[i][cnt1] != -1) return memo[i][cnt1];",
            "        int res = 0, up = isLimit ? s[i] - '0' : 9;",
            "        for (int d = 0; d <= up; ++d) {",
            "            res += self(self, i + 1, cnt1 + (d == 1), isLimit && (d == up));",
            "        }",
            "        if (!isLimit) memo[i][cnt1] = res;",
            "        return res;",
            "    };",
            "    return dfs(dfs, 0, 0, true);",
            "}"
        ]
    },

    # 7. 树形 DP
    {
        "lcNum": 337,
        "title": "打家劫舍 III",
        "slug": "house-robber-iii",
        "rating": 1600,
        "hot100": True,
        "tags": ["树形DP", "Hot100"],
        "brief": "房屋形成了一棵二叉树。如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。计算小偷一晚能够盗取的最高金额。",
        "note": "树形 DP 经典模板：后序遍历返回 pair<notRob, rob>。notRob 表示不偷当前节点的最大收益，此时左右子节点偷不偷都行：max(l.first, l.second) + max(r.first, r.second)；rob 表示偷当前节点，则子节点绝对不能偷：root->val + l.first + r.first。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "pitfalls": ["不偷当前节点时，子节点可以偷也可以不偷，必须取 max(子偷, 子不偷)。"],
        "ref": [
            "int rob(TreeNode* root) {",
            "    auto dfs = [&](auto self, TreeNode* node) -> pair<int, int> {",
            "        if (!node) return {0, 0};",
            "        auto [lNot, lRob] = self(self, node->left);",
            "        auto [rNot, rRob] = self(self, node->right);",
            "        int notRob = max(lNot, lRob) + max(rNot, rRob);",
            "        int rob = node->val + lNot + rNot;",
            "        return {notRob, rob};",
            "    };",
            "    auto [a, b] = dfs(dfs, root);",
            "    return max(a, b);",
            "}"
        ]
    }
]
