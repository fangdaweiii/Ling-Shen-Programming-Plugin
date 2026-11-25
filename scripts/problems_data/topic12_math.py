# -*- coding: utf-8 -*-
"""
专题十二：数学与数论题单
包含质数筛法（埃氏筛/欧拉筛）、快速幂、组合数学、博弈论
"""

TOPIC_MATH = [
    # 1. 质数与因数
    {
        "lcNum": 204,
        "title": "计数质数",
        "slug": "count-primes",
        "rating": 1300,
        "hot100": False,
        "tags": ["数论", "埃氏筛"],
        "brief": "给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。",
        "note": "埃拉托斯特尼筛法（埃氏筛）：开辟大小为 n 的布尔数组 isPrime，初始全置为 true。从 2 开始遍历，若 isPrime[i] 为 true 则计数器加一，并将其倍数 i * i, i * (i+1), ... 全部标记为 false（从 i * i 开始标记避免重复）。",
        "complexity": "时间 O(n log log n)，空间 O(n)。",
        "pitfalls": ["i * i 可能溢出 32 位整型，因此使用 (long long)i * i 循环判断。"],
        "ref": [
            "int countPrimes(int n) {",
            "    if (n <= 2) return 0;",
            "    vector<bool> isPrime(n, true);",
            "    int count = 0;",
            "    for (int i = 2; i < n; ++i) {",
            "        if (isPrime[i]) {",
            "            count++;",
            "            if ((long long)i * i < n) {",
            "                for (int j = i * i; j < n; j += i) isPrime[j] = false;",
            "            }",
            "        }",
            "    }",
            "    return count;",
            "}"
        ]
    },

    # 2. 快速幂
    {
        "lcNum": 50,
        "title": "Pow(x, n)",
        "slug": "powx-n",
        "rating": 1200,
        "hot100": False,
        "tags": ["数学", "快速幂"],
        "brief": "实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，x^n ）。",
        "note": "二进制快速幂：将指数 n 拆解为二进制位。循环检查 n 的最低位，若为 1 则将当前基底 x 乘入结果 ans；随后基底平方 x *= x，指数右移 n >>= 1。若 n 为负数，先取倒数 x = 1 / x，并将 n 转为正数（用 long long 防 INT_MIN 溢出）。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "pitfalls": ["n 为 INT_MIN (-2147483648) 取负数会溢出，必须使用 long long N = n。"],
        "ref": [
            "double myPow(double x, int n) {",
            "    long long N = n;",
            "    if (N < 0) { x = 1 / x; N = -N; }",
            "    double ans = 1.0, base = x;",
            "    while (N > 0) {",
            "        if (N & 1) ans *= base;",
            "        base *= base;",
            "        N >>= 1;",
            "    }",
            "    return ans;",
            "}"
        ]
    },

    # 3. 组合数学
    {
        "lcNum": 62,
        "title": "不同路径",
        "slug": "unique-paths",
        "rating": 1200,
        "hot100": True,
        "tags": ["组合数学", "动态规划", "Hot100"],
        "brief": "一个机器人位于一个 m x n 网格的左上角。机器人每次只能向下或向右移动一步。机器人试图达到网格的右下角。问总共有多少条不同的路径？",
        "note": "机器人总共需要向下走 m - 1 步，向右走 n - 1 步，总步数为 (m - 1) + (n - 1)。问题等价于在总步数中选取 m - 1 步向下，即组合数 C(m + n - 2, m - 1)。边乘边除计算组合数。",
        "complexity": "时间 O(min(m, n))，空间 O(1)。",
        "pitfalls": ["边乘边除计算组合数时，使用 long long 防止中间结果溢出。"],
        "ref": [
            "int uniquePaths(int m, int n) {",
            "    long long ans = 1;",
            "    for (int x = 1, y = m + n - 2; x < min(m, n); ++x, --y) {",
            "        ans = ans * y / x;",
            "    }",
            "    return ans;",
            "}"
        ]
    },

    # 4. 博弈论
    {
        "lcNum": 292,
        "title": "Nim 游戏",
        "slug": "nim-game",
        "rating": 1100,
        "hot100": False,
        "tags": ["博弈论", "巴什博弈"],
        "brief": "桌子上有一堆石头。每次可以拿走 1 到 3 块石头。拿走最后一块石头的人就是获胜者。假设双方都采取最优策略，判断你是否能赢得比赛。",
        "note": "巴什博弈母题：每次最多拿 3 块。如果石头数量是 4 的倍数，无论先手拿 1、2 或 3 块，后手总能拿 3、2 或 1 块凑成 4，最终让石头总数始终保持 4 的倍数，后手必胜！因此先手必胜条件为 n % 4 != 0。",
        "complexity": "时间 O(1)，空间 O(1)。",
        "pitfalls": ["结论极为简洁：直接返回 n % 4 != 0。"],
        "ref": [
            "bool canWinNim(int n) {",
            "    return n % 4 != 0;",
            "}"
        ]
    }
]
