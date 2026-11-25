/* problems.js - 算法题库（包含官方标准参考解法与灵神精选解法双体系） */
var PROBLEMS = [
  {
    "id": "p_1456",
    "mod": "two-pointers",
    "idx": 1,
    "title": "定长子串中元音的最大数目",
    "lc": "LeetCode 1456",
    "lcNum": 1456,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "字符串"
    ],
    "by": "return",
    "brief": "给你字符串 s 和整数 k，返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"icfifec\" | 3",
      "\"cdacagcdb\" | 2"
    ],
    "sig": "// LeetCode 1456 函数签名",
    "template": "// LeetCode 1456 定长子串中元音的最大数目\n",
    "hints": [
      "定长滑动窗口经典母题。先统计前 k 个字母中元音个数作为初始窗口；随后向右滑动窗口：右边进一个新字符如果为元音则 count++，左边出一个旧字符如果为元音则 count--，每步更新最大值。"
    ],
    "ref": [
      "int maxVowels(string s, int k) {",
      "    auto isVowel = [](char c) {",
      "        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';",
      "    };",
      "    int cur = 0, ans = 0;",
      "    for (int i = 0; i < s.size(); ++i) {",
      "        if (isVowel(s[i])) cur++;",
      "        if (i < k - 1) continue;",
      "        ans = max(ans, cur);",
      "        if (isVowel(s[i - k + 1])) cur--;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "定长滑动窗口经典母题。先统计前 k 个字母中元音个数作为初始窗口；随后向右滑动窗口：右边进一个新字符如果为元音则 count++，左边出一个旧字符如果为元音则 count--，每步更新最大值。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "注意元音包括 a, e, i, o, u 五个小写字母。",
      "滑窗维护时注意左边界为 i - k + 1。"
    ],
    "rating": 1263,
    "hot100": false,
    "slug": "maximum-number-of-vowels-in-a-substring-of-given-length",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 定长子串中元音的最大数目",
      "desc": "【灵神心法点拨】：定长滑动窗口经典母题。先统计前 k 个字母中元音个数作为初始窗口；随后向右滑动窗口：右边进一个新字符如果为元音则 count++，左边出一个旧字符如果为元音则 count--，每步更新最大值。",
      "code": [
        "int maxVowels(string s, int k) {",
        "    auto isVowel = [](char c) {",
        "        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';",
        "    };",
        "    int cur = 0, ans = 0;",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        if (isVowel(s[i])) cur++;",
        "        if (i < k - 1) continue;",
        "        ans = max(ans, cur);",
        "        if (isVowel(s[i - k + 1])) cur--;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1456）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxVowels(string s, int k) {",
        "    auto isVowel = [](char c) {",
        "        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';",
        "    };",
        "    int cur = 0, ans = 0;",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        if (isVowel(s[i])) cur++;",
        "        if (i < k - 1) continue;",
        "        ans = max(ans, cur);",
        "        if (isVowel(s[i - k + 1])) cur--;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_643",
    "mod": "two-pointers",
    "idx": 2,
    "title": "子数组最大平均数 I",
    "lc": "LeetCode 643",
    "lcNum": 643,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "给你一个由 n 个元素组成的整数数组 nums 和一个整数 k，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,6,-3,5,7] | 2",
      "[1,0,-4,2,0,3,-4] | 3"
    ],
    "sig": "// LeetCode 643 函数签名",
    "template": "// LeetCode 643 子数组最大平均数 I\n",
    "hints": [
      "维护固定长度为 k 的连续子数组元素和。最大化平均数等价于最大化长度为 k 的子数组之和。右进左出累加更新 ans = max(ans, sum)。"
    ],
    "ref": [
      "double findMaxAverage(vector<int>& nums, int k) {",
      "    int sum = 0;",
      "    for (int i = 0; i < k; ++i) sum += nums[i];",
      "    int maxSum = sum;",
      "    for (int i = k; i < nums.size(); ++i) {",
      "        sum += nums[i] - nums[i - k];",
      "        maxSum = max(maxSum, sum);",
      "    }",
      "    return (double)maxSum / k;",
      "}"
    ],
    "note": "维护固定长度为 k 的连续子数组元素和。最大化平均数等价于最大化长度为 k 的子数组之和。右进左出累加更新 ans = max(ans, sum)。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "最终返回值除以 double(k)，注意浮点精度。",
      "初始累加避免多次求和。"
    ],
    "rating": 1150,
    "hot100": false,
    "slug": "maximum-average-subarray-i",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 子数组最大平均数 I",
      "desc": "【灵神心法点拨】：维护固定长度为 k 的连续子数组元素和。最大化平均数等价于最大化长度为 k 的子数组之和。右进左出累加更新 ans = max(ans, sum)。",
      "code": [
        "double findMaxAverage(vector<int>& nums, int k) {",
        "    int sum = 0;",
        "    for (int i = 0; i < k; ++i) sum += nums[i];",
        "    int maxSum = sum;",
        "    for (int i = k; i < nums.size(); ++i) {",
        "        sum += nums[i] - nums[i - k];",
        "        maxSum = max(maxSum, sum);",
        "    }",
        "    return (double)maxSum / k;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 643）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "double findMaxAverage(vector<int>& nums, int k) {",
        "    int sum = 0;",
        "    for (int i = 0; i < k; ++i) sum += nums[i];",
        "    int maxSum = sum;",
        "    for (int i = k; i < nums.size(); ++i) {",
        "        sum += nums[i] - nums[i - k];",
        "        maxSum = max(maxSum, sum);",
        "    }",
        "    return (double)maxSum / k;",
        "}"
      ]
    }
  },
  {
    "id": "p_1343",
    "mod": "two-pointers",
    "idx": 3,
    "title": "大小为 K 且平均值大于等于阈值的子数组数目",
    "lc": "LeetCode 1343",
    "lcNum": 1343,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "返回大小为 k 且平均值大于等于 threshold 的子数组数目。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-1,1,-2,7,-1] | 3 | 2",
      "[-1,7,1,-2,-3,5,-1] | 3 | 7"
    ],
    "sig": "// LeetCode 1343 函数签名",
    "template": "// LeetCode 1343 大小为 K 且平均值大于等于阈值的子数组数目\n",
    "hints": [
      "平均值 >= threshold 等价于 窗口和 >= k * threshold。维护固定长度 k 的滑动窗口元素和，遇到大于等于目标值的窗口则计数器加一。"
    ],
    "ref": [
      "int numOfSubarrays(vector<int>& nums, int k, int threshold) {",
      "    int target = k * threshold, sum = 0, ans = 0;",
      "    for (int i = 0; i < nums.size(); ++i) {",
      "        sum += nums[i];",
      "        if (i < k - 1) continue;",
      "        if (sum >= target) ans++;",
      "        sum -= nums[i - k + 1];",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "平均值 >= threshold 等价于 窗口和 >= k * threshold。维护固定长度 k 的滑动窗口元素和，遇到大于等于目标值的窗口则计数器加一。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "先计算 target = k * threshold，避免浮点数除法误差。"
    ],
    "rating": 1317,
    "hot100": false,
    "slug": "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 大小为 K 且平均值大于等于阈值的子数组数目",
      "desc": "【灵神心法点拨】：平均值 >= threshold 等价于 窗口和 >= k * threshold。维护固定长度 k 的滑动窗口元素和，遇到大于等于目标值的窗口则计数器加一。",
      "code": [
        "int numOfSubarrays(vector<int>& nums, int k, int threshold) {",
        "    int target = k * threshold, sum = 0, ans = 0;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        sum += nums[i];",
        "        if (i < k - 1) continue;",
        "        if (sum >= target) ans++;",
        "        sum -= nums[i - k + 1];",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1343）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int numOfSubarrays(vector<int>& nums, int k, int threshold) {",
        "    int target = k * threshold, sum = 0, ans = 0;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        sum += nums[i];",
        "        if (i < k - 1) continue;",
        "        if (sum >= target) ans++;",
        "        sum -= nums[i - k + 1];",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_2090",
    "mod": "two-pointers",
    "idx": 4,
    "title": "半径为 k 的子数组平均值",
    "lc": "LeetCode 2090",
    "lcNum": 2090,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "前缀和"
    ],
    "by": "return",
    "brief": "构建并返回一个长度为 n 的数组 avgs，其中 avgs[i] 是以 i 为中心的子数组半径为 k 的平均值，若不足半径则置为 -1。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[4,0,6,7,-1,-4] | 2",
      "[8,0,0,-2,-4] | 4"
    ],
    "sig": "// LeetCode 2090 函数签名",
    "template": "// LeetCode 2090 半径为 k 的子数组平均值\n",
    "hints": [
      "窗口固定大小为 2k + 1。当下标到达 2k 时，中心下标正好为 i - k。滑动窗口累加和用 long long 防止溢出，除以 2k+1 填入结果。"
    ],
    "ref": [
      "vector<int> getAverages(vector<int>& nums, int k) {",
      "    int n = nums.size(), len = 2 * k + 1;",
      "    vector<int> ans(n, -1);",
      "    if (n < len) return ans;",
      "    long long sum = 0;",
      "    for (int i = 0; i < n; ++i) {",
      "        sum += nums[i];",
      "        if (i < len - 1) continue;",
      "        ans[i - k] = sum / len;",
      "        sum -= nums[i - len + 1];",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "窗口固定大小为 2k + 1。当下标到达 2k 时，中心下标正好为 i - k。滑动窗口累加和用 long long 防止溢出，除以 2k+1 填入结果。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "注意 sum 会超过 32 位整型范围，必须用 long long 存储。"
    ],
    "rating": 1358,
    "hot100": false,
    "slug": "k-radius-subarray-averages",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 半径为 k 的子数组平均值",
      "desc": "【灵神心法点拨】：窗口固定大小为 2k + 1。当下标到达 2k 时，中心下标正好为 i - k。滑动窗口累加和用 long long 防止溢出，除以 2k+1 填入结果。",
      "code": [
        "vector<int> getAverages(vector<int>& nums, int k) {",
        "    int n = nums.size(), len = 2 * k + 1;",
        "    vector<int> ans(n, -1);",
        "    if (n < len) return ans;",
        "    long long sum = 0;",
        "    for (int i = 0; i < n; ++i) {",
        "        sum += nums[i];",
        "        if (i < len - 1) continue;",
        "        ans[i - k] = sum / len;",
        "        sum -= nums[i - len + 1];",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2090）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> getAverages(vector<int>& nums, int k) {",
        "    int n = nums.size(), len = 2 * k + 1;",
        "    vector<int> ans(n, -1);",
        "    if (n < len) return ans;",
        "    long long sum = 0;",
        "    for (int i = 0; i < n; ++i) {",
        "        sum += nums[i];",
        "        if (i < len - 1) continue;",
        "        ans[i - k] = sum / len;",
        "        sum -= nums[i - len + 1];",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_2379",
    "mod": "two-pointers",
    "idx": 5,
    "title": "得到 K 个黑块的最少涂色次数",
    "lc": "LeetCode 2379",
    "lcNum": 2379,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "字符串"
    ],
    "by": "return",
    "brief": "给你一个长度为 n 下标从 0 开始的字符串 blocks，其中 blocks[i] 要么是 'W' 要么是 'B'。返回出现至少一个连续 k 个黑色块的最少涂色次数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"dceadc\" | 3",
      "\"ebbdadca\" | 4"
    ],
    "sig": "// LeetCode 2379 函数签名",
    "template": "// LeetCode 2379 得到 K 个黑块的最少涂色次数\n",
    "hints": [
      "求连续 k 个块中最少有多少个白色块 'W'。维护长度为 k 的滑动窗口，统计窗口内 'W' 的最小个数即可。"
    ],
    "ref": [
      "int minimumRecolors(string blocks, int k) {",
      "    int w = 0;",
      "    for (int i = 0; i < k; ++i) if (blocks[i] == 'W') w++;",
      "    int ans = w;",
      "    for (int i = k; i < blocks.size(); ++i) {",
      "        if (blocks[i] == 'W') w++;",
      "        if (blocks[i - k] == 'W') w--;",
      "        ans = min(ans, w);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "求连续 k 个块中最少有多少个白色块 'W'。维护长度为 k 的滑动窗口，统计窗口内 'W' 的最小个数即可。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "长度为 k 的固定窗口滑动，初始最小值为 k。"
    ],
    "rating": 1360,
    "hot100": false,
    "slug": "minimum-recolors-to-get-k-consecutive-black-blocks",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 得到 K 个黑块的最少涂色次数",
      "desc": "【灵神心法点拨】：求连续 k 个块中最少有多少个白色块 'W'。维护长度为 k 的滑动窗口，统计窗口内 'W' 的最小个数即可。",
      "code": [
        "int minimumRecolors(string blocks, int k) {",
        "    int w = 0;",
        "    for (int i = 0; i < k; ++i) if (blocks[i] == 'W') w++;",
        "    int ans = w;",
        "    for (int i = k; i < blocks.size(); ++i) {",
        "        if (blocks[i] == 'W') w++;",
        "        if (blocks[i - k] == 'W') w--;",
        "        ans = min(ans, w);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2379）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minimumRecolors(string blocks, int k) {",
        "    int w = 0;",
        "    for (int i = 0; i < k; ++i) if (blocks[i] == 'W') w++;",
        "    int ans = w;",
        "    for (int i = k; i < blocks.size(); ++i) {",
        "        if (blocks[i] == 'W') w++;",
        "        if (blocks[i - k] == 'W') w--;",
        "        ans = min(ans, w);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1052",
    "mod": "two-pointers",
    "idx": 6,
    "title": "爱生气的书店老板",
    "lc": "LeetCode 1052",
    "lcNum": 1052,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "老板可以控制自己连续 minutes 分钟不生气。请你返回这一天营业额满意的顾客的最大数量。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[10,8,12,2,10] | [7,9,8,4,6,5,7] | 4",
      "[2,11,1,10,9] | [7,9,3,8,8] | 6"
    ],
    "sig": "// LeetCode 1052 函数签名",
    "template": "// LeetCode 1052 爱生气的书店老板\n",
    "hints": [
      "先计算原本就不生气时能拿到的所有顾客之和；再用长度为 minutes 的滑动窗口，计算如果在该窗口内使用技能（把原本生气的顾客挽回）能带来的额外收益，求最大额外收益。"
    ],
    "ref": [
      "int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {",
      "    int total = 0, extra = 0, maxExtra = 0;",
      "    for (int i = 0; i < customers.size(); ++i) {",
      "        if (!grumpy[i]) total += customers[i];",
      "        if (grumpy[i]) extra += customers[i];",
      "        if (i >= minutes && grumpy[i - minutes]) extra -= customers[i - minutes];",
      "        maxExtra = max(maxExtra, extra);",
      "    }",
      "    return total + maxExtra;",
      "}"
    ],
    "note": "先计算原本就不生气时能拿到的所有顾客之和；再用长度为 minutes 的滑动窗口，计算如果在该窗口内使用技能（把原本生气的顾客挽回）能带来的额外收益，求最大额外收益。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "区分基础收益和窗口额外挽回收益，不要重复计算。"
    ],
    "rating": 1418,
    "hot100": false,
    "slug": "grumpy-bookstore-owner",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 爱生气的书店老板",
      "desc": "【灵神心法点拨】：先计算原本就不生气时能拿到的所有顾客之和；再用长度为 minutes 的滑动窗口，计算如果在该窗口内使用技能（把原本生气的顾客挽回）能带来的额外收益，求最大额外收益。",
      "code": [
        "int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {",
        "    int total = 0, extra = 0, maxExtra = 0;",
        "    for (int i = 0; i < customers.size(); ++i) {",
        "        if (!grumpy[i]) total += customers[i];",
        "        if (grumpy[i]) extra += customers[i];",
        "        if (i >= minutes && grumpy[i - minutes]) extra -= customers[i - minutes];",
        "        maxExtra = max(maxExtra, extra);",
        "    }",
        "    return total + maxExtra;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1052）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {",
        "    int total = 0, extra = 0, maxExtra = 0;",
        "    for (int i = 0; i < customers.size(); ++i) {",
        "        if (!grumpy[i]) total += customers[i];",
        "        if (grumpy[i]) extra += customers[i];",
        "        if (i >= minutes && grumpy[i - minutes]) extra -= customers[i - minutes];",
        "        maxExtra = max(maxExtra, extra);",
        "    }",
        "    return total + maxExtra;",
        "}"
      ]
    }
  },
  {
    "id": "p_2461",
    "mod": "two-pointers",
    "idx": 7,
    "title": "长度为 K 子数组中的最大和",
    "lc": "LeetCode 2461",
    "lcNum": 2461,
    "diff": 2,
    "tags": [
      "定长滑窗",
      "哈希表"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums 和一个整数 k。请你找出一个长度为 k 且所有元素互不相同的子数组的最大和。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,6,-2,4,3] | 4",
      "[-4,0,5,4,7,6,5] | 2"
    ],
    "sig": "// LeetCode 2461 函数签名",
    "template": "// LeetCode 2461 长度为 K 子数组中的最大和\n",
    "hints": [
      "定长滑动窗口配合哈希表记录频次。当哈希表的大小等于 k 时说明窗口内没有重复元素，此时更新最大子数组和。"
    ],
    "ref": [
      "long long maximumSubarraySum(vector<int>& nums, int k) {",
      "    long long sum = 0, ans = 0;",
      "    unordered_map<int, int> cnt;",
      "    for (int i = 0; i < nums.size(); ++i) {",
      "        sum += nums[i];",
      "        cnt[nums[i]]++;",
      "        if (i >= k) {",
      "            int out = nums[i - k];",
      "            sum -= out;",
      "            if (--cnt[out] == 0) cnt.erase(out);",
      "        }",
      "        if (cnt.size() == k) ans = max(ans, sum);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "定长滑动窗口配合哈希表记录频次。当哈希表的大小等于 k 时说明窗口内没有重复元素，此时更新最大子数组和。",
    "complexity": "时间 O(n)，空间 O(k)。",
    "pitfalls": [
      "元素移出窗口时若计数降为 0 必须从哈希表中 erase，否则 size 统计错误。"
    ],
    "rating": 1553,
    "hot100": false,
    "slug": "maximum-sum-of-distinct-subarrays-with-length-k",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 长度为 K 子数组中的最大和",
      "desc": "【灵神心法点拨】：定长滑动窗口配合哈希表记录频次。当哈希表的大小等于 k 时说明窗口内没有重复元素，此时更新最大子数组和。",
      "code": [
        "long long maximumSubarraySum(vector<int>& nums, int k) {",
        "    long long sum = 0, ans = 0;",
        "    unordered_map<int, int> cnt;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        sum += nums[i];",
        "        cnt[nums[i]]++;",
        "        if (i >= k) {",
        "            int out = nums[i - k];",
        "            sum -= out;",
        "            if (--cnt[out] == 0) cnt.erase(out);",
        "        }",
        "        if (cnt.size() == k) ans = max(ans, sum);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2461）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "long long maximumSubarraySum(vector<int>& nums, int k) {",
        "    long long sum = 0, ans = 0;",
        "    unordered_map<int, int> cnt;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        sum += nums[i];",
        "        cnt[nums[i]]++;",
        "        if (i >= k) {",
        "            int out = nums[i - k];",
        "            sum -= out;",
        "            if (--cnt[out] == 0) cnt.erase(out);",
        "        }",
        "        if (cnt.size() == k) ans = max(ans, sum);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_438",
    "mod": "two-pointers",
    "idx": 8,
    "title": "找到字符串中所有字母异位词",
    "lc": "LeetCode 438",
    "lcNum": 438,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "哈希表",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"cbdedcdb\" | \"ddaecee\"",
      "\"abbcee\" | \"ebabecab\""
    ],
    "sig": "// LeetCode 438 函数签名",
    "template": "// LeetCode 438 找到字符串中所有字母异位词\n",
    "hints": [
      "异位词意味着子串长度必须与 p 相等且各字符频次完全一致。用两个大小为 26 的数组记录频次，滑动固定长度 p.size() 的窗口比对数组即可。"
    ],
    "ref": [
      "vector<int> findAnagrams(string s, string p) {",
      "    vector<int> ans;",
      "    if (s.size() < p.size()) return ans;",
      "    vector<int> cntP(26, 0), cntS(26, 0);",
      "    for (char c : p) cntP[c - 'a']++;",
      "    int k = p.size();",
      "    for (int i = 0; i < s.size(); ++i) {",
      "        cntS[s[i] - 'a']++;",
      "        if (i >= k) cntS[s[i - k] - 'a']--;",
      "        if (cntS == cntP) ans.push_back(i - k + 1);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "异位词意味着子串长度必须与 p 相等且各字符频次完全一致。用两个大小为 26 的数组记录频次，滑动固定长度 p.size() 的窗口比对数组即可。",
    "complexity": "时间 O(n)，空间 O(1) (26 个字符)。",
    "pitfalls": [
      "窗口长度固定为 p.length()，直接数组比较即可。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "find-all-anagrams-in-a-string",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 找到字符串中所有字母异位词",
      "desc": "【灵神心法点拨】：异位词意味着子串长度必须与 p 相等且各字符频次完全一致。用两个大小为 26 的数组记录频次，滑动固定长度 p.size() 的窗口比对数组即可。",
      "code": [
        "vector<int> findAnagrams(string s, string p) {",
        "    vector<int> ans;",
        "    if (s.size() < p.size()) return ans;",
        "    vector<int> cntP(26, 0), cntS(26, 0);",
        "    for (char c : p) cntP[c - 'a']++;",
        "    int k = p.size();",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        cntS[s[i] - 'a']++;",
        "        if (i >= k) cntS[s[i - k] - 'a']--;",
        "        if (cntS == cntP) ans.push_back(i - k + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 438）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> findAnagrams(string s, string p) {",
        "    vector<int> ans;",
        "    if (s.size() < p.size()) return ans;",
        "    vector<int> cntP(26, 0), cntS(26, 0);",
        "    for (char c : p) cntP[c - 'a']++;",
        "    int k = p.size();",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        cntS[s[i] - 'a']++;",
        "        if (i >= k) cntS[s[i - k] - 'a']--;",
        "        if (cntS == cntP) ans.push_back(i - k + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_567",
    "mod": "two-pointers",
    "idx": 9,
    "title": "字符串的排列",
    "lc": "LeetCode 567",
    "lcNum": 567,
    "diff": 1,
    "tags": [
      "定长滑窗",
      "双指针"
    ],
    "by": "return",
    "brief": "给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"deebbb\" | \"cdbcaaa\"",
      "\"ddaeecec\" | \"cbcbcb\""
    ],
    "sig": "// LeetCode 567 函数签名",
    "template": "// LeetCode 567 字符串的排列\n",
    "hints": [
      "与 LC 438 完全一致：检查 s2 中是否存在一个长度为 s1.size() 的窗口，其字符频次与 s1 相同。"
    ],
    "ref": [
      "bool checkInclusion(string s1, string s2) {",
      "    if (s1.size() > s2.size()) return false;",
      "    vector<int> c1(26, 0), c2(26, 0);",
      "    for (char c : s1) c1[c - 'a']++;",
      "    int k = s1.size();",
      "    for (int i = 0; i < s2.size(); ++i) {",
      "        c2[s2[i] - 'a']++;",
      "        if (i >= k) c2[s2[i - k] - 'a']--;",
      "        if (c1 == c2) return true;",
      "    }",
      "    return false;",
      "}"
    ],
    "note": "与 LC 438 完全一致：检查 s2 中是否存在一个长度为 s1.size() 的窗口，其字符频次与 s1 相同。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "如果 s1.size() > s2.size() 直接返回 false。"
    ],
    "rating": 1450,
    "hot100": false,
    "slug": "permutation-in-string",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 字符串的排列",
      "desc": "【灵神心法点拨】：与 LC 438 完全一致：检查 s2 中是否存在一个长度为 s1.size() 的窗口，其字符频次与 s1 相同。",
      "code": [
        "bool checkInclusion(string s1, string s2) {",
        "    if (s1.size() > s2.size()) return false;",
        "    vector<int> c1(26, 0), c2(26, 0);",
        "    for (char c : s1) c1[c - 'a']++;",
        "    int k = s1.size();",
        "    for (int i = 0; i < s2.size(); ++i) {",
        "        c2[s2[i] - 'a']++;",
        "        if (i >= k) c2[s2[i - k] - 'a']--;",
        "        if (c1 == c2) return true;",
        "    }",
        "    return false;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 567）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool checkInclusion(string s1, string s2) {",
        "    if (s1.size() > s2.size()) return false;",
        "    vector<int> c1(26, 0), c2(26, 0);",
        "    for (char c : s1) c1[c - 'a']++;",
        "    int k = s1.size();",
        "    for (int i = 0; i < s2.size(); ++i) {",
        "        c2[s2[i] - 'a']++;",
        "        if (i >= k) c2[s2[i - k] - 'a']--;",
        "        if (c1 == c2) return true;",
        "    }",
        "    return false;",
        "}"
      ]
    }
  },
  {
    "id": "tp4",
    "mod": "two-pointers",
    "idx": 10,
    "title": "无重复字符的最长子串",
    "lc": "LeetCode 3",
    "lcNum": 3,
    "diff": 1,
    "tags": [
      "不定长滑窗",
      "哈希表",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。",
    "ioIn": "s：输入字符串。",
    "ioOut": "返回最长无重复字符子串长度。",
    "ex": [
      {
        "i": "\"abcabcbb\"",
        "o": "3"
      },
      {
        "i": "\"bbbbb\"",
        "o": "1"
      },
      {
        "i": "\"pwwkew\"",
        "o": "3"
      }
    ],
    "params": [
      "\"abcabcbb\"",
      "\"bbbbb\"",
      "\"pwwkew\"",
      "\"\"",
      "\" \""
    ],
    "sig": "int lengthOfLongestSubstring(string s)",
    "template": "int lengthOfLongestSubstring(string s) {\n    int l = 0, best = 0;\n    // 滑动窗口：用 set 维护窗口 [l, r] 内的无重复字符\n    return best;\n}",
    "hints": [
      "经典滑动窗口：右指针 r 探索新字符，左指针 l 负责在重复时收缩收紧。",
      "遇到重复字符时，左指针不断前进并从 set 中移除字符，直到窗口内没有重复。",
      "每一步更新 best = max(best, r - l + 1)。"
    ],
    "ref": [
      "int lengthOfLongestSubstring(string s) {",
      "    unordered_map<char, int> cnt;",
      "    int left = 0, ans = 0;",
      "    for (int right = 0; right < s.size(); ++right) {",
      "        cnt[s[right]]++;",
      "        while (cnt[s[right]] > 1) {",
      "            cnt[s[left]]--;",
      "            left++;",
      "        }",
      "        ans = max(ans, right - left + 1);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "不定长滑动窗口万能模板：右指针扩张引入 s[right]，哈希表记录频次；当发现 s[right] 频次 > 1 时收缩左指针 left 直到频次降为 1。在合法状态下更新 ans = max(ans, right - left + 1)。",
    "complexity": "时间 O(n)，空间 O(|Σ|)（ASCII 字符集）。",
    "pitfalls": [
      "收缩必须用 while (cnt[s[right]] > 1) 逐步左移 left 并递减频次。"
    ],
    "rating": 1450,
    "hot100": true,
    "slug": "longest-substring-without-repeating-characters",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 无重复字符的最长子串",
      "desc": "【灵神心法点拨】：不定长滑动窗口万能模板：右指针扩张引入 s[right]，哈希表记录频次；当发现 s[right] 频次 > 1 时收缩左指针 left 直到频次降为 1。在合法状态下更新 ans = max(ans, right - left + 1)。",
      "code": [
        "int lengthOfLongestSubstring(string s) {",
        "    unordered_map<char, int> cnt;",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        cnt[s[right]]++;",
        "        while (cnt[s[right]] > 1) {",
        "            cnt[s[left]]--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 3）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int lengthOfLongestSubstring(string s) {",
        "    unordered_map<char, int> cnt;",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        cnt[s[right]]++;",
        "        while (cnt[s[right]] > 1) {",
        "            cnt[s[left]]--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1493",
    "mod": "two-pointers",
    "idx": 11,
    "title": "删掉一个元素以后全为 1 的最长子数组",
    "lc": "LeetCode 1493",
    "lcNum": 1493,
    "diff": 1,
    "tags": [
      "不定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "给你一个二进制数组 nums，你需要从中删掉一个元素。返回满足条件的只包含 1 的非空子数组的最大长度。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-3,-3,0,7,-2]",
      "[3,0,-3,4,-2]"
    ],
    "sig": "// LeetCode 1493 函数签名",
    "template": "// LeetCode 1493 删掉一个元素以后全为 1 的最长子数组\n",
    "hints": [
      "等价于求最多包含 1 个 0 的最长子数组长度，答案为子数组长度减 1。滑窗内维护 0 的个数，当 0 的个数 > 1 时收缩 left。"
    ],
    "ref": [
      "int longestSubarray(vector<int>& nums) {",
      "    int left = 0, zeros = 0, ans = 0;",
      "    for (int right = 0; right < nums.size(); ++right) {",
      "        if (nums[right] == 0) zeros++;",
      "        while (zeros > 1) {",
      "            if (nums[left] == 0) zeros--;",
      "            left++;",
      "        }",
      "        ans = max(ans, right - left);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "等价于求最多包含 1 个 0 的最长子数组长度，答案为子数组长度减 1。滑窗内维护 0 的个数，当 0 的个数 > 1 时收缩 left。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "最后必须删掉一个元素，即便全为 1 也要减一，因此 ans = max(ans, right - left)。"
    ],
    "rating": 1423,
    "hot100": false,
    "slug": "longest-subarray-of-1s-after-deleting-one-element",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 删掉一个元素以后全为 1 的最长子数组",
      "desc": "【灵神心法点拨】：等价于求最多包含 1 个 0 的最长子数组长度，答案为子数组长度减 1。滑窗内维护 0 的个数，当 0 的个数 > 1 时收缩 left。",
      "code": [
        "int longestSubarray(vector<int>& nums) {",
        "    int left = 0, zeros = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        if (nums[right] == 0) zeros++;",
        "        while (zeros > 1) {",
        "            if (nums[left] == 0) zeros--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1493）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int longestSubarray(vector<int>& nums) {",
        "    int left = 0, zeros = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        if (nums[right] == 0) zeros++;",
        "        while (zeros > 1) {",
        "            if (nums[left] == 0) zeros--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_904",
    "mod": "two-pointers",
    "idx": 12,
    "title": "水果成篮",
    "lc": "LeetCode 904",
    "lcNum": 904,
    "diff": 2,
    "tags": [
      "不定长滑窗",
      "哈希表"
    ],
    "by": "return",
    "brief": "你只有两个篮子，每个篮子只能装单一类型的水果。求你能采摘水果的最大总数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,5,4,6,10,1,6]",
      "[12,5,3,11,7]"
    ],
    "sig": "// LeetCode 904 函数签名",
    "template": "// LeetCode 904 水果成篮\n",
    "hints": [
      "等价于求最多包含 2 种不同元素的最长连续子数组长度。哈希表记录窗口内各种水果的数量，当种类数 > 2 时收缩左边界。"
    ],
    "ref": [
      "int totalFruit(vector<int>& fruits) {",
      "    unordered_map<int, int> cnt;",
      "    int left = 0, ans = 0;",
      "    for (int right = 0; right < fruits.size(); ++right) {",
      "        cnt[fruits[right]]++;",
      "        while (cnt.size() > 2) {",
      "            if (--cnt[fruits[left]] == 0) cnt.erase(fruits[left]);",
      "            left++;",
      "        }",
      "        ans = max(ans, right - left + 1);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "等价于求最多包含 2 种不同元素的最长连续子数组长度。哈希表记录窗口内各种水果的数量，当种类数 > 2 时收缩左边界。",
    "complexity": "时间 O(n)，空间 O(1) (最多 3 种水果)。",
    "pitfalls": [
      "当某种水果数量减到 0 时，务必从哈希表中 erase。"
    ],
    "rating": 1516,
    "hot100": false,
    "slug": "fruit-into-baskets",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 水果成篮",
      "desc": "【灵神心法点拨】：等价于求最多包含 2 种不同元素的最长连续子数组长度。哈希表记录窗口内各种水果的数量，当种类数 > 2 时收缩左边界。",
      "code": [
        "int totalFruit(vector<int>& fruits) {",
        "    unordered_map<int, int> cnt;",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < fruits.size(); ++right) {",
        "        cnt[fruits[right]]++;",
        "        while (cnt.size() > 2) {",
        "            if (--cnt[fruits[left]] == 0) cnt.erase(fruits[left]);",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 904）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int totalFruit(vector<int>& fruits) {",
        "    unordered_map<int, int> cnt;",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < fruits.size(); ++right) {",
        "        cnt[fruits[right]]++;",
        "        while (cnt.size() > 2) {",
        "            if (--cnt[fruits[left]] == 0) cnt.erase(fruits[left]);",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1004",
    "mod": "two-pointers",
    "idx": 13,
    "title": "最大连续 1 的个数 III",
    "lc": "LeetCode 1004",
    "lcNum": 1004,
    "diff": 2,
    "tags": [
      "不定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回数组中连续 1 的最大个数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[6,5,2,4,5] | 4",
      "[5,8,4,7,6] | 4"
    ],
    "sig": "// LeetCode 1004 函数签名",
    "template": "// LeetCode 1004 最大连续 1 的个数 III\n",
    "hints": [
      "滑动窗口维护包含最多 k 个 0 的最长区间。右进 0 则 count++；当 count > k 时左出，若出的是 0 则 count--，更新最大长度。"
    ],
    "ref": [
      "int longestOnes(vector<int>& nums, int k) {",
      "    int left = 0, zeros = 0, ans = 0;",
      "    for (int right = 0; right < nums.size(); ++right) {",
      "        if (nums[right] == 0) zeros++;",
      "        while (zeros > k) {",
      "            if (nums[left] == 0) zeros--;",
      "            left++;",
      "        }",
      "        ans = max(ans, right - left + 1);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "滑动窗口维护包含最多 k 个 0 的最长区间。右进 0 则 count++；当 count > k 时左出，若出的是 0 则 count--，更新最大长度。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "不需要显式翻转数组，仅记录 0 的个数即可。"
    ],
    "rating": 1655,
    "hot100": false,
    "slug": "max-consecutive-ones-iii",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 最大连续 1 的个数 III",
      "desc": "【灵神心法点拨】：滑动窗口维护包含最多 k 个 0 的最长区间。右进 0 则 count++；当 count > k 时左出，若出的是 0 则 count--，更新最大长度。",
      "code": [
        "int longestOnes(vector<int>& nums, int k) {",
        "    int left = 0, zeros = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        if (nums[right] == 0) zeros++;",
        "        while (zeros > k) {",
        "            if (nums[left] == 0) zeros--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1004）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int longestOnes(vector<int>& nums, int k) {",
        "    int left = 0, zeros = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        if (nums[right] == 0) zeros++;",
        "        while (zeros > k) {",
        "            if (nums[left] == 0) zeros--;",
        "            left++;",
        "        }",
        "        ans = max(ans, right - left + 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1658",
    "mod": "two-pointers",
    "idx": 14,
    "title": "将 x 减到 0 的最小操作数",
    "lc": "LeetCode 1658",
    "lcNum": 1658,
    "diff": 2,
    "tags": [
      "逆向思维",
      "不定长滑窗"
    ],
    "by": "return",
    "brief": "每次操作可以移除最左侧或最右侧的元素并从 x 中扣除其值。返回使 x 恰好为 0 的最小操作数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[12,9,12,2,9,10,12] | 9",
      "[10,6,1,5,4,11,1] | 13"
    ],
    "sig": "// LeetCode 1658 函数签名",
    "template": "// LeetCode 1658 将 x 减到 0 的最小操作数\n",
    "hints": [
      "【逆向思维】：从两端拿走和为 x 的最小元素个数，等价于在数组中间保留和为 (sum - x) 的最长连续子数组！求出最长子数组长度 len，答案即为 n - len。"
    ],
    "ref": [
      "int minOperations(vector<int>& nums, int x) {",
      "    long long target = 0;",
      "    for (int v : nums) target += v;",
      "    target -= x;",
      "    if (target < 0) return -1;",
      "    if (target == 0) return nums.size();",
      "    int left = 0, cur = 0, maxLen = -1, n = nums.size();",
      "    for (int right = 0; right < n; ++right) {",
      "        cur += nums[right];",
      "        while (cur > target) cur -= nums[left++];",
      "        if (cur == target) maxLen = max(maxLen, right - left + 1);",
      "    }",
      "    return maxLen == -1 ? -1 : n - maxLen;",
      "}"
    ],
    "note": "【逆向思维】：从两端拿走和为 x 的最小元素个数，等价于在数组中间保留和为 (sum - x) 的最长连续子数组！求出最长子数组长度 len，答案即为 n - len。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "如果 sum < x，直接返回 -1；如果 sum == x，直接返回 n。"
    ],
    "rating": 1817,
    "hot100": false,
    "slug": "minimum-operations-to-reduce-x-to-zero",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 将 x 减到 0 的最小操作数",
      "desc": "【灵神心法点拨】：【逆向思维】：从两端拿走和为 x 的最小元素个数，等价于在数组中间保留和为 (sum - x) 的最长连续子数组！求出最长子数组长度 len，答案即为 n - len。",
      "code": [
        "int minOperations(vector<int>& nums, int x) {",
        "    long long target = 0;",
        "    for (int v : nums) target += v;",
        "    target -= x;",
        "    if (target < 0) return -1;",
        "    if (target == 0) return nums.size();",
        "    int left = 0, cur = 0, maxLen = -1, n = nums.size();",
        "    for (int right = 0; right < n; ++right) {",
        "        cur += nums[right];",
        "        while (cur > target) cur -= nums[left++];",
        "        if (cur == target) maxLen = max(maxLen, right - left + 1);",
        "    }",
        "    return maxLen == -1 ? -1 : n - maxLen;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1658）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minOperations(vector<int>& nums, int x) {",
        "    long long target = 0;",
        "    for (int v : nums) target += v;",
        "    target -= x;",
        "    if (target < 0) return -1;",
        "    if (target == 0) return nums.size();",
        "    int left = 0, cur = 0, maxLen = -1, n = nums.size();",
        "    for (int right = 0; right < n; ++right) {",
        "        cur += nums[right];",
        "        while (cur > target) cur -= nums[left++];",
        "        if (cur == target) maxLen = max(maxLen, right - left + 1);",
        "    }",
        "    return maxLen == -1 ? -1 : n - maxLen;",
        "}"
      ]
    }
  },
  {
    "id": "p_209",
    "mod": "two-pointers",
    "idx": 15,
    "title": "长度最小的子数组",
    "lc": "LeetCode 209",
    "lcNum": 209,
    "diff": 1,
    "tags": [
      "不定长滑窗",
      "数组"
    ],
    "by": "return",
    "brief": "找出该数组中满足其总和大于等于 target 的长度最小的子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "14 | [3,7,-3,2,5]",
      "4 | [6,5,5,2,6,2,7]"
    ],
    "sig": "// LeetCode 209 函数签名",
    "template": "// LeetCode 209 长度最小的子数组\n",
    "hints": [
      "不定长求最小：右进累加 sum；while 循环在 (sum >= target) 时不断收缩左指针并更新最小长度 ans = min(ans, right - left + 1)，然后 sum -= nums[left++]。"
    ],
    "ref": [
      "int minSubArrayLen(int target, vector<int>& nums) {",
      "    int left = 0, sum = 0, ans = INT_MAX;",
      "    for (int right = 0; right < nums.size(); ++right) {",
      "        sum += nums[right];",
      "        while (sum >= target) {",
      "            ans = min(ans, right - left + 1);",
      "            sum -= nums[left++];",
      "        }",
      "    }",
      "    return ans == INT_MAX ? 0 : ans;",
      "}"
    ],
    "note": "不定长求最小：右进累加 sum；while 循环在 (sum >= target) 时不断收缩左指针并更新最小长度 ans = min(ans, right - left + 1)，然后 sum -= nums[left++]。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "若找不到满足条件的子数组，需返回 0 而非 INT_MAX。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "minimum-size-subarray-sum",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 长度最小的子数组",
      "desc": "【灵神心法点拨】：不定长求最小：右进累加 sum；while 循环在 (sum >= target) 时不断收缩左指针并更新最小长度 ans = min(ans, right - left + 1)，然后 sum -= nums[left++]。",
      "code": [
        "int minSubArrayLen(int target, vector<int>& nums) {",
        "    int left = 0, sum = 0, ans = INT_MAX;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        sum += nums[right];",
        "        while (sum >= target) {",
        "            ans = min(ans, right - left + 1);",
        "            sum -= nums[left++];",
        "        }",
        "    }",
        "    return ans == INT_MAX ? 0 : ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 209）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minSubArrayLen(int target, vector<int>& nums) {",
        "    int left = 0, sum = 0, ans = INT_MAX;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        sum += nums[right];",
        "        while (sum >= target) {",
        "            ans = min(ans, right - left + 1);",
        "            sum -= nums[left++];",
        "        }",
        "    }",
        "    return ans == INT_MAX ? 0 : ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_76",
    "mod": "two-pointers",
    "idx": 16,
    "title": "最小覆盖子串",
    "lc": "LeetCode 76",
    "lcNum": 76,
    "diff": 3,
    "tags": [
      "不定长滑窗",
      "哈希表",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 \"\" 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"eeeebe\" | \"abadddc\"",
      "\"eedabdca\" | \"bcdcded\""
    ],
    "sig": "// LeetCode 76 函数签名",
    "template": "// LeetCode 76 最小覆盖子串\n",
    "hints": [
      "用 need 统计 t 中字符频次并记录所需字符总数 count = t.size()。右移 right，若字符在 need 中且 need[c] > 0 则 count--，need[c]--。当 count == 0 时说明完全覆盖，开始收缩 left 并记录最小长度与起始位置。"
    ],
    "ref": [
      "string minWindow(string s, string t) {",
      "    vector<int> need(128, 0);",
      "    for (char c : t) need[c]++;",
      "    int count = t.size(), left = 0, start = 0, minLen = INT_MAX;",
      "    for (int right = 0; right < s.size(); ++right) {",
      "        if (need[s[right]] > 0) count--;",
      "        need[s[right]]--;",
      "        while (count == 0) {",
      "            if (right - left + 1 < minLen) {",
      "                minLen = right - left + 1;",
      "                start = left;",
      "            }",
      "            if (need[s[left]] == 0) count++;",
      "            need[s[left]]++;",
      "            left++;",
      "        }",
      "    }",
      "    return minLen == INT_MAX ? \"\" : s.substr(start, minLen);",
      "}"
    ],
    "note": "用 need 统计 t 中字符频次并记录所需字符总数 count = t.size()。右移 right，若字符在 need 中且 need[c] > 0 则 count--，need[c]--。当 count == 0 时说明完全覆盖，开始收缩 left 并记录最小长度与起始位置。",
    "complexity": "时间 O(|s| + |t|)，空间 O(128)。",
    "pitfalls": [
      "只有 need[s[right]] > 0 时才减少 count；收缩 left 时只有 need[s[left]] == 0 时才增加 count。"
    ],
    "rating": 2100,
    "hot100": true,
    "slug": "minimum-window-substring",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 最小覆盖子串",
      "desc": "【灵神心法点拨】：用 need 统计 t 中字符频次并记录所需字符总数 count = t.size()。右移 right，若字符在 need 中且 need[c] > 0 则 count--，need[c]--。当 count == 0 时说明完全覆盖，开始收缩 left 并记录最小长度与起始位置。",
      "code": [
        "string minWindow(string s, string t) {",
        "    vector<int> need(128, 0);",
        "    for (char c : t) need[c]++;",
        "    int count = t.size(), left = 0, start = 0, minLen = INT_MAX;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        if (need[s[right]] > 0) count--;",
        "        need[s[right]]--;",
        "        while (count == 0) {",
        "            if (right - left + 1 < minLen) {",
        "                minLen = right - left + 1;",
        "                start = left;",
        "            }",
        "            if (need[s[left]] == 0) count++;",
        "            need[s[left]]++;",
        "            left++;",
        "        }",
        "    }",
        "    return minLen == INT_MAX ? \"\" : s.substr(start, minLen);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 76）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "string minWindow(string s, string t) {",
        "    vector<int> need(128, 0);",
        "    for (char c : t) need[c]++;",
        "    int count = t.size(), left = 0, start = 0, minLen = INT_MAX;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        if (need[s[right]] > 0) count--;",
        "        need[s[right]]--;",
        "        while (count == 0) {",
        "            if (right - left + 1 < minLen) {",
        "                minLen = right - left + 1;",
        "                start = left;",
        "            }",
        "            if (need[s[left]] == 0) count++;",
        "            need[s[left]]++;",
        "            left++;",
        "        }",
        "    }",
        "    return minLen == INT_MAX ? \"\" : s.substr(start, minLen);",
        "}"
      ]
    }
  },
  {
    "id": "p_713",
    "mod": "two-pointers",
    "idx": 17,
    "title": "乘积小于 K 的子数组",
    "lc": "LeetCode 713",
    "lcNum": 713,
    "diff": 1,
    "tags": [
      "不定长滑窗",
      "数学"
    ],
    "by": "return",
    "brief": "给你一个正整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[7,3,-3,8,2,2,1] | 4",
      "[4,-1,4,-4,7] | 3"
    ],
    "sig": "// LeetCode 713 函数签名",
    "template": "// LeetCode 713 乘积小于 K 的子数组\n",
    "hints": [
      "【越短越合法】：以 right 结尾的合法子数组数目正好是 right - left + 1。当乘积 prod >= k 时，收缩 left 直到合法，每次累加 (right - left + 1)。"
    ],
    "ref": [
      "int numSubarrayProductLessThanK(vector<int>& nums, int k) {",
      "    if (k <= 1) return 0;",
      "    int prod = 1, left = 0, ans = 0;",
      "    for (int right = 0; right < nums.size(); ++right) {",
      "        prod *= nums[right];",
      "        while (prod >= k) prod /= nums[left++];",
      "        ans += right - left + 1;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "【越短越合法】：以 right 结尾的合法子数组数目正好是 right - left + 1。当乘积 prod >= k 时，收缩 left 直到合法，每次累加 (right - left + 1)。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "如果 k <= 1，因为每个元素都是正整数，积不可能严格小于 1，直接返回 0。"
    ],
    "rating": 1466,
    "hot100": false,
    "slug": "subarray-product-less-than-k",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 乘积小于 K 的子数组",
      "desc": "【灵神心法点拨】：【越短越合法】：以 right 结尾的合法子数组数目正好是 right - left + 1。当乘积 prod >= k 时，收缩 left 直到合法，每次累加 (right - left + 1)。",
      "code": [
        "int numSubarrayProductLessThanK(vector<int>& nums, int k) {",
        "    if (k <= 1) return 0;",
        "    int prod = 1, left = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        prod *= nums[right];",
        "        while (prod >= k) prod /= nums[left++];",
        "        ans += right - left + 1;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 713）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int numSubarrayProductLessThanK(vector<int>& nums, int k) {",
        "    if (k <= 1) return 0;",
        "    int prod = 1, left = 0, ans = 0;",
        "    for (int right = 0; right < nums.size(); ++right) {",
        "        prod *= nums[right];",
        "        while (prod >= k) prod /= nums[left++];",
        "        ans += right - left + 1;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1358",
    "mod": "two-pointers",
    "idx": 18,
    "title": "包含所有三种字符的子字符串数目",
    "lc": "LeetCode 1358",
    "lcNum": 1358,
    "diff": 2,
    "tags": [
      "不定长滑窗",
      "计数"
    ],
    "by": "return",
    "brief": "给你一个只包含字符 a, b 和 c 的字符串 s ，请你返回其中包含至少一个 a, b 和 c 的子字符串的数目。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"eabedeba\"",
      "\"eeeadbee\""
    ],
    "sig": "// LeetCode 1358 函数签名",
    "template": "// LeetCode 1358 包含所有三种字符的子字符串数目\n",
    "hints": [
      "【越长越合法】：当窗口 [left, right] 已经包含 a, b, c 时，以 right 结尾且左端点在 0..left 的子串都必然包含 a, b, c！收缩 left 并累加 left + 1。"
    ],
    "ref": [
      "int numberOfSubstrings(string s) {",
      "    vector<int> cnt(3, 0);",
      "    int left = 0, ans = 0;",
      "    for (int right = 0; right < s.size(); ++right) {",
      "        cnt[s[right] - 'a']++;",
      "        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {",
      "            cnt[s[left++] - 'a']--;",
      "        }",
      "        ans += left;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "【越长越合法】：当窗口 [left, right] 已经包含 a, b, c 时，以 right 结尾且左端点在 0..left 的子串都必然包含 a, b, c！收缩 left 并累加 left + 1。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "注意每次窗口合法时，右端点向后扩展的所有子串也合法，或者固定右端点累加合法的左端点个数。"
    ],
    "rating": 1646,
    "hot100": false,
    "slug": "number-of-substrings-containing-all-three-characters",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 包含所有三种字符的子字符串数目",
      "desc": "【灵神心法点拨】：【越长越合法】：当窗口 [left, right] 已经包含 a, b, c 时，以 right 结尾且左端点在 0..left 的子串都必然包含 a, b, c！收缩 left 并累加 left + 1。",
      "code": [
        "int numberOfSubstrings(string s) {",
        "    vector<int> cnt(3, 0);",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        cnt[s[right] - 'a']++;",
        "        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {",
        "            cnt[s[left++] - 'a']--;",
        "        }",
        "        ans += left;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1358）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int numberOfSubstrings(string s) {",
        "    vector<int> cnt(3, 0);",
        "    int left = 0, ans = 0;",
        "    for (int right = 0; right < s.size(); ++right) {",
        "        cnt[s[right] - 'a']++;",
        "        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {",
        "            cnt[s[left++] - 'a']--;",
        "        }",
        "        ans += left;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_167",
    "mod": "two-pointers",
    "idx": 19,
    "title": "两数之和 II - 输入有序数组",
    "lc": "LeetCode 167",
    "lcNum": 167,
    "diff": 1,
    "tags": [
      "相向双指针",
      "数组"
    ],
    "by": "return",
    "brief": "给你一个下标从 1 开始的整数数组 numbers ，该数组已按非递减顺序排列，请你从数组中找出满足相加之和等于目标数 target 的两个数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-4,6,3,6,2] | 8",
      "[-3,-3,7,5,-4,-3,7] | 12"
    ],
    "sig": "// LeetCode 167 函数签名",
    "template": "// LeetCode 167 两数之和 II - 输入有序数组\n",
    "hints": [
      "相向双指针母题。由于数组有序，设 left = 0, right = n - 1。若和小于 target 则 left++，若大于则 right--，等于则返回下标。"
    ],
    "ref": [
      "vector<int> twoSum(vector<int>& numbers, int target) {",
      "    int left = 0, right = numbers.size() - 1;",
      "    while (left < right) {",
      "        int sum = numbers[left] + numbers[right];",
      "        if (sum == target) return {left + 1, right + 1};",
      "        else if (sum < target) left++;",
      "        else right--;",
      "    }",
      "    return {};",
      "}"
    ],
    "note": "相向双指针母题。由于数组有序，设 left = 0, right = n - 1。若和小于 target 则 left++，若大于则 right--，等于则返回下标。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "注意返回下标从 1 开始，需要对下标加 1。"
    ],
    "rating": 1250,
    "hot100": false,
    "slug": "two-sum-ii-input-array-is-sorted",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 两数之和 II - 输入有序数组",
      "desc": "【灵神心法点拨】：相向双指针母题。由于数组有序，设 left = 0, right = n - 1。若和小于 target 则 left++，若大于则 right--，等于则返回下标。",
      "code": [
        "vector<int> twoSum(vector<int>& numbers, int target) {",
        "    int left = 0, right = numbers.size() - 1;",
        "    while (left < right) {",
        "        int sum = numbers[left] + numbers[right];",
        "        if (sum == target) return {left + 1, right + 1};",
        "        else if (sum < target) left++;",
        "        else right--;",
        "    }",
        "    return {};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 167）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> twoSum(vector<int>& numbers, int target) {",
        "    int left = 0, right = numbers.size() - 1;",
        "    while (left < right) {",
        "        int sum = numbers[left] + numbers[right];",
        "        if (sum == target) return {left + 1, right + 1};",
        "        else if (sum < target) left++;",
        "        else right--;",
        "    }",
        "    return {};",
        "}"
      ]
    }
  },
  {
    "id": "p_15",
    "mod": "two-pointers",
    "idx": 20,
    "title": "三数之和",
    "lc": "LeetCode 15",
    "lcNum": 15,
    "diff": 2,
    "tags": [
      "相向双指针",
      "排序",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,-1,6,3,-4,7,-2]",
      "[2,-2,-1,0,5,8]"
    ],
    "sig": "// LeetCode 15 函数签名",
    "template": "// LeetCode 15 三数之和\n",
    "hints": [
      "先排序。固定第一重循环 i；对后半段使用相向双指针 left, right 寻找 nums[left] + nums[right] == -nums[i]。注意对三处指针分别跳过连续相同元素以去重。"
    ],
    "ref": [
      "vector<vector<int>> threeSum(vector<int>& nums) {",
      "    sort(nums.begin(), nums.end());",
      "    vector<vector<int>> ans;",
      "    int n = nums.size();",
      "    for (int i = 0; i < n - 2; ++i) {",
      "        if (nums[i] > 0) break;",
      "        if (i > 0 && nums[i] == nums[i - 1]) continue;",
      "        int left = i + 1, right = n - 1;",
      "        while (left < right) {",
      "            int sum = nums[i] + nums[left] + nums[right];",
      "            if (sum == 0) {",
      "                ans.push_back({nums[i], nums[left], nums[right]});",
      "                while (left < right && nums[left] == nums[left + 1]) left++;",
      "                while (left < right && nums[right] == nums[right - 1]) right--;",
      "                left++; right--;",
      "            } else if (sum < 0) left++;",
      "            else right--;",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "先排序。固定第一重循环 i；对后半段使用相向双指针 left, right 寻找 nums[left] + nums[right] == -nums[i]。注意对三处指针分别跳过连续相同元素以去重。",
    "complexity": "时间 O(n^2)，空间 O(1)。",
    "pitfalls": [
      "三处去重：i > 0 且 nums[i] == nums[i-1] 跳过；匹配成功后 left 和 right 都要移动并跳过重复项。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "3sum",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 三数之和",
      "desc": "【灵神心法点拨】：先排序。固定第一重循环 i；对后半段使用相向双指针 left, right 寻找 nums[left] + nums[right] == -nums[i]。注意对三处指针分别跳过连续相同元素以去重。",
      "code": [
        "vector<vector<int>> threeSum(vector<int>& nums) {",
        "    sort(nums.begin(), nums.end());",
        "    vector<vector<int>> ans;",
        "    int n = nums.size();",
        "    for (int i = 0; i < n - 2; ++i) {",
        "        if (nums[i] > 0) break;",
        "        if (i > 0 && nums[i] == nums[i - 1]) continue;",
        "        int left = i + 1, right = n - 1;",
        "        while (left < right) {",
        "            int sum = nums[i] + nums[left] + nums[right];",
        "            if (sum == 0) {",
        "                ans.push_back({nums[i], nums[left], nums[right]});",
        "                while (left < right && nums[left] == nums[left + 1]) left++;",
        "                while (left < right && nums[right] == nums[right - 1]) right--;",
        "                left++; right--;",
        "            } else if (sum < 0) left++;",
        "            else right--;",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 15）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> threeSum(vector<int>& nums) {",
        "    sort(nums.begin(), nums.end());",
        "    vector<vector<int>> ans;",
        "    int n = nums.size();",
        "    for (int i = 0; i < n - 2; ++i) {",
        "        if (nums[i] > 0) break;",
        "        if (i > 0 && nums[i] == nums[i - 1]) continue;",
        "        int left = i + 1, right = n - 1;",
        "        while (left < right) {",
        "            int sum = nums[i] + nums[left] + nums[right];",
        "            if (sum == 0) {",
        "                ans.push_back({nums[i], nums[left], nums[right]});",
        "                while (left < right && nums[left] == nums[left + 1]) left++;",
        "                while (left < right && nums[right] == nums[right - 1]) right--;",
        "                left++; right--;",
        "            } else if (sum < 0) left++;",
        "            else right--;",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "tp3",
    "mod": "two-pointers",
    "idx": 21,
    "title": "盛最多水的容器",
    "lc": "LeetCode 11",
    "lcNum": 11,
    "diff": 2,
    "tags": [
      "相向双指针",
      "贪心",
      "Hot100"
    ],
    "by": "return",
    "brief": "找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。",
    "ioIn": "height：非负整数数组。",
    "ioOut": "返回最大面积。",
    "ex": [
      {
        "i": "[1,8,6,2,5,4,8,3,7]",
        "o": "49"
      },
      {
        "i": "[1,1]",
        "o": "1"
      }
    ],
    "params": [
      "[1,8,6,2,5,4,8,3,7]",
      "[1,1]",
      "[4,3,2,1,4]",
      "[1,2,1]"
    ],
    "sig": "int maxArea(vector<int>& height)",
    "template": "int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1;\n    // 面积 = 宽 × 短板；每次移动哪一边？\n    return 0;\n}",
    "hints": [
      "面积由短板决定：min(height[l], height[r]) × (r - l)。",
      "宽度只会变小，所以想变大只能换掉短板：移动矮的那一侧。",
      "移动高的那一侧一定不会更优，这就是对撞指针能一次扫完的原因。"
    ],
    "ref": [
      "int maxArea(vector<int>& height) {",
      "    int left = 0, right = height.size() - 1, ans = 0;",
      "    while (left < right) {",
      "        ans = max(ans, min(height[left], height[right]) * (right - left));",
      "        if (height[left] < height[right]) left++;",
      "        else right--;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "容器面积由短板决定：area = min(h[l], h[r]) * (r - l)。移动长板只会让宽度减小且高度不可能超过原短板，所以只能移动短板向内收缩，不断逼近最大容量。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "每次必须移动较矮的一边指针。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "container-with-most-water",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 盛最多水的容器",
      "desc": "【灵神心法点拨】：容器面积由短板决定：area = min(h[l], h[r]) * (r - l)。移动长板只会让宽度减小且高度不可能超过原短板，所以只能移动短板向内收缩，不断逼近最大容量。",
      "code": [
        "int maxArea(vector<int>& height) {",
        "    int left = 0, right = height.size() - 1, ans = 0;",
        "    while (left < right) {",
        "        ans = max(ans, min(height[left], height[right]) * (right - left));",
        "        if (height[left] < height[right]) left++;",
        "        else right--;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 11）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxArea(vector<int>& height) {",
        "    int left = 0, right = height.size() - 1, ans = 0;",
        "    while (left < right) {",
        "        ans = max(ans, min(height[left], height[right]) * (right - left));",
        "        if (height[left] < height[right]) left++;",
        "        else right--;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_42",
    "mod": "two-pointers",
    "idx": 22,
    "title": "接雨水",
    "lc": "LeetCode 42",
    "lcNum": 42,
    "diff": 2,
    "tags": [
      "相向双指针",
      "前后缀",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[10,3,5,7,11]",
      "[5,11,8,10,10,2]"
    ],
    "sig": "// LeetCode 42 函数签名",
    "template": "// LeetCode 42 接雨水\n",
    "hints": [
      "每个位置能接的雨水量由 min(左侧最高, 右侧最高) - 当前高度 决定。用双指针维护 preMax 和 sufMax，哪侧的前缀/后缀最值小，就结算哪侧并往内移动。"
    ],
    "ref": [
      "int trap(vector<int>& height) {",
      "    int left = 0, right = height.size() - 1;",
      "    int preMax = 0, sufMax = 0, ans = 0;",
      "    while (left < right) {",
      "        preMax = max(preMax, height[left]);",
      "        sufMax = max(sufMax, height[right]);",
      "        if (preMax < sufMax) {",
      "            ans += preMax - height[left++];",
      "        } else {",
      "            ans += sufMax - height[right--];",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "每个位置能接的雨水量由 min(左侧最高, 右侧最高) - 当前高度 决定。用双指针维护 preMax 和 sufMax，哪侧的前缀/后缀最值小，就结算哪侧并往内移动。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "注意当 preMax < sufMax 时，左侧水深完全由 preMax 确定，可以安全结算 left。"
    ],
    "rating": 1800,
    "hot100": true,
    "slug": "trapping-rain-water",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 接雨水",
      "desc": "【灵神心法点拨】：每个位置能接的雨水量由 min(左侧最高, 右侧最高) - 当前高度 决定。用双指针维护 preMax 和 sufMax，哪侧的前缀/后缀最值小，就结算哪侧并往内移动。",
      "code": [
        "int trap(vector<int>& height) {",
        "    int left = 0, right = height.size() - 1;",
        "    int preMax = 0, sufMax = 0, ans = 0;",
        "    while (left < right) {",
        "        preMax = max(preMax, height[left]);",
        "        sufMax = max(sufMax, height[right]);",
        "        if (preMax < sufMax) {",
        "            ans += preMax - height[left++];",
        "        } else {",
        "            ans += sufMax - height[right--];",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 42）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int trap(vector<int>& height) {",
        "    int left = 0, right = height.size() - 1;",
        "    int preMax = 0, sufMax = 0, ans = 0;",
        "    while (left < right) {",
        "        preMax = max(preMax, height[left]);",
        "        sufMax = max(sufMax, height[right]);",
        "        if (preMax < sufMax) {",
        "            ans += preMax - height[left++];",
        "        } else {",
        "            ans += sufMax - height[right--];",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_228",
    "mod": "two-pointers",
    "idx": 23,
    "title": "汇总区间",
    "lc": "LeetCode 228",
    "lcNum": 228,
    "diff": 1,
    "tags": [
      "分组循环",
      "数组"
    ],
    "by": "return",
    "brief": "给定一个无重复元素的有序整数数组 nums 。返回恰好覆盖数组中所有数字的最小有序区间范围列表。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-3,5,-3,2,-4]",
      "[5,8,-1,8,1]"
    ],
    "sig": "// LeetCode 228 函数签名",
    "template": "// LeetCode 228 汇总区间\n",
    "hints": [
      "分组循环标准范式：外层循环遍历 i，内层 while 寻找与 nums[start] 连续递增的段 nums[i] + 1 == nums[i+1]，跳出内层后构造区间并更新 i。"
    ],
    "ref": [
      "vector<string> summaryRanges(vector<int>& nums) {",
      "    vector<string> ans;",
      "    int i = 0, n = nums.size();",
      "    while (i < n) {",
      "        int start = i;",
      "        while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;",
      "        if (start == i) ans.push_back(to_string(nums[start]));",
      "        else ans.push_back(to_string(nums[start]) + \"->\" + to_string(nums[i]));",
      "        i++;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "分组循环标准范式：外层循环遍历 i，内层 while 寻找与 nums[start] 连续递增的段 nums[i] + 1 == nums[i+1]，跳出内层后构造区间并更新 i。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "单个数字格式为 \"a\"，区间格式为 \"a->b\"。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "summary-ranges",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 汇总区间",
      "desc": "【灵神心法点拨】：分组循环标准范式：外层循环遍历 i，内层 while 寻找与 nums[start] 连续递增的段 nums[i] + 1 == nums[i+1]，跳出内层后构造区间并更新 i。",
      "code": [
        "vector<string> summaryRanges(vector<int>& nums) {",
        "    vector<string> ans;",
        "    int i = 0, n = nums.size();",
        "    while (i < n) {",
        "        int start = i;",
        "        while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;",
        "        if (start == i) ans.push_back(to_string(nums[start]));",
        "        else ans.push_back(to_string(nums[start]) + \"->\" + to_string(nums[i]));",
        "        i++;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 228）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<string> summaryRanges(vector<int>& nums) {",
        "    vector<string> ans;",
        "    int i = 0, n = nums.size();",
        "    while (i < n) {",
        "        int start = i;",
        "        while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;",
        "        if (start == i) ans.push_back(to_string(nums[start]));",
        "        else ans.push_back(to_string(nums[start]) + \"->\" + to_string(nums[i]));",
        "        i++;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1578",
    "mod": "two-pointers",
    "idx": 24,
    "title": "使绳子变成彩色的最短时间",
    "lc": "LeetCode 1578",
    "lcNum": 1578,
    "diff": 2,
    "tags": [
      "分组循环",
      "贪心"
    ],
    "by": "return",
    "brief": "相邻两个气球颜色相同时需要移除其中一个。求移除气球的最短总耗时。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"dbdadcbc\" | [12,7,6,4,2]",
      "\"deeeedcb\" | [4,12,11,5,9,1,6]"
    ],
    "sig": "// LeetCode 1578 函数签名",
    "template": "// LeetCode 1578 使绳子变成彩色的最短时间\n",
    "hints": [
      "分组循环找到所有颜色相同的连续段。对于每个连续段，为了总耗时最小，必然保留其中耗费时间最大的气球，移除其余所有气球（段总和减去段最大值）。"
    ],
    "ref": [
      "int minCost(string colors, vector<int>& neededTime) {",
      "    int ans = 0, i = 0, n = colors.size();",
      "    while (i < n) {",
      "        int sum = 0, mx = 0;",
      "        char c = colors[i];",
      "        while (i < n && colors[i] == c) {",
      "            sum += neededTime[i];",
      "            mx = max(mx, neededTime[i]);",
      "            i++;",
      "        }",
      "        ans += sum - mx;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "分组循环找到所有颜色相同的连续段。对于每个连续段，为了总耗时最小，必然保留其中耗费时间最大的气球，移除其余所有气球（段总和减去段最大值）。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "内层循环维护连续相同颜色段的 sum 和 maxCost。"
    ],
    "rating": 1574,
    "hot100": false,
    "slug": "minimum-time-to-make-rope-colorful",
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 使绳子变成彩色的最短时间",
      "desc": "【灵神心法点拨】：分组循环找到所有颜色相同的连续段。对于每个连续段，为了总耗时最小，必然保留其中耗费时间最大的气球，移除其余所有气球（段总和减去段最大值）。",
      "code": [
        "int minCost(string colors, vector<int>& neededTime) {",
        "    int ans = 0, i = 0, n = colors.size();",
        "    while (i < n) {",
        "        int sum = 0, mx = 0;",
        "        char c = colors[i];",
        "        while (i < n && colors[i] == c) {",
        "            sum += neededTime[i];",
        "            mx = max(mx, neededTime[i]);",
        "            i++;",
        "        }",
        "        ans += sum - mx;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1578）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minCost(string colors, vector<int>& neededTime) {",
        "    int ans = 0, i = 0, n = colors.size();",
        "    while (i < n) {",
        "        int sum = 0, mx = 0;",
        "        char c = colors[i];",
        "        while (i < n && colors[i] == c) {",
        "            sum += neededTime[i];",
        "            mx = max(mx, neededTime[i]);",
        "            i++;",
        "        }",
        "        ans += sum - mx;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "bs1",
    "mod": "binary-search",
    "idx": 1,
    "title": "二分查找",
    "lc": "LeetCode 704",
    "lcNum": 704,
    "diff": 1,
    "tags": [
      "二分查找",
      "红蓝染色"
    ],
    "by": "return",
    "brief": "给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。",
    "ioIn": "nums：升序且不重复的数组；target：目标值。",
    "ioOut": "返回下标或 -1。",
    "ex": [
      {
        "i": "[-1,0,3,5,9,12] | 9",
        "o": "4"
      },
      {
        "i": "[-1,0,3,5,9,12] | 2",
        "o": "-1"
      }
    ],
    "params": [
      "[-1,0,3,5,9,12] | 9",
      "[-1,0,3,5,9,12] | 2",
      "[5] | 5",
      "[1,3] | 0"
    ],
    "sig": "int search(vector<int>& nums, int target)",
    "template": "int search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    // 闭区间 [l, r]：循环条件和边界更新要配套\n    return -1;\n}",
    "hints": [
      "先决定区间口径：闭区间 [l, r] 就配 while (l <= r)。",
      "nums[mid] 小了说明答案在右边：l = mid + 1；大了：r = mid - 1。",
      "mid 用 l + (r - l) / 2 防溢出，这是习惯问题也是面试细节。"
    ],
    "ref": [
      "int search(vector<int>& nums, int target) {",
      "    int left = 0, right = (int)nums.size() - 1;",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        if (nums[mid] == target) return mid;",
      "        else if (nums[mid] < target) left = mid + 1;",
      "        else right = mid - 1;",
      "    }",
      "    return -1;",
      "}"
    ],
    "note": "灵神红蓝染色二分模板（闭区间）：left = 0, right = n - 1。mid = left + (right - left) / 2。当 nums[mid] < target 时 left = mid + 1，反之 right = mid - 1。循环结束检查 left 下标。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "计算 mid 时用 left + (right - left) / 2 防止整型溢出。"
    ],
    "rating": 1000,
    "hot100": false,
    "slug": "binary-search",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 二分查找",
      "desc": "【灵神心法点拨】：灵神红蓝染色二分模板（闭区间）：left = 0, right = n - 1。mid = left + (right - left) / 2。当 nums[mid] < target 时 left = mid + 1，反之 right = mid - 1。循环结束检查 left 下标。",
      "code": [
        "int search(vector<int>& nums, int target) {",
        "    int left = 0, right = (int)nums.size() - 1;",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (nums[mid] == target) return mid;",
        "        else if (nums[mid] < target) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return -1;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 704）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int search(vector<int>& nums, int target) {",
        "    int left = 0, right = (int)nums.size() - 1;",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (nums[mid] == target) return mid;",
        "        else if (nums[mid] < target) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return -1;",
        "}"
      ]
    }
  },
  {
    "id": "bs2",
    "mod": "binary-search",
    "idx": 2,
    "title": "搜索插入位置",
    "lc": "LeetCode 35",
    "lcNum": 35,
    "diff": 1,
    "tags": [
      "二分查找",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。",
    "ioIn": "nums：升序不重复数组；target：目标值。",
    "ioOut": "返回下标或插入位置。",
    "ex": [
      {
        "i": "[1,3,5,6] | 5",
        "o": "2"
      },
      {
        "i": "[1,3,5,6] | 2",
        "o": "1"
      },
      {
        "i": "[1,3,5,6] | 7",
        "o": "4"
      }
    ],
    "params": [
      "[1,3,5,6] | 5",
      "[1,3,5,6] | 2",
      "[1,3,5,6] | 7",
      "[1,3,5,6] | 0",
      "[1] | 1"
    ],
    "sig": "int searchInsert(vector<int>& nums, int target)",
    "template": "int searchInsert(vector<int>& nums, int target) {\n    // 找第一个 >= target 的位置\n    return 0;\n}",
    "hints": [
      "这题问的是\"第一个不小于 target 的位置\"，也就是 lower_bound。",
      "用左闭右开 [l, r)：r 初始为 nums.size()，循环 while (l < r)。",
      "nums[mid] < target 时 l = mid + 1，否则 r = mid；结束时 l 就是答案。"
    ],
    "ref": [
      "int searchInsert(vector<int>& nums, int target) {",
      "    int left = 0, right = (int)nums.size() - 1;",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        if (nums[mid] >= target) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "等价于求满足 nums[i] >= target 的最小下标（即 lower_bound）。闭区间循环结束后，left 指针正好停在第一个 >= target 的位置上。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "当 target 大于所有元素时，最终返回值为 n，即 nums.size()。"
    ],
    "rating": 1050,
    "hot100": true,
    "slug": "search-insert-position",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 搜索插入位置",
      "desc": "【灵神心法点拨】：等价于求满足 nums[i] >= target 的最小下标（即 lower_bound）。闭区间循环结束后，left 指针正好停在第一个 >= target 的位置上。",
      "code": [
        "int searchInsert(vector<int>& nums, int target) {",
        "    int left = 0, right = (int)nums.size() - 1;",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (nums[mid] >= target) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 35）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int searchInsert(vector<int>& nums, int target) {",
        "    int left = 0, right = (int)nums.size() - 1;",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (nums[mid] >= target) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "bs4",
    "mod": "binary-search",
    "idx": 3,
    "title": "在排序数组中查找元素的第一个和最后一个位置",
    "lc": "LeetCode 34",
    "lcNum": 34,
    "diff": 1,
    "tags": [
      "二分查找",
      "边界",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。如果数组中不存在目标值 target，返回 [-1, -1]。",
    "ioIn": "nums：非递减顺序数组；target：目标值。",
    "ioOut": "返回包含两端点的数组 [start, end]。",
    "ex": [
      {
        "i": "[5,7,7,8,8,10] | 8",
        "o": "[3,4]"
      },
      {
        "i": "[5,7,7,8,8,10] | 6",
        "o": "[-1,-1]"
      }
    ],
    "params": [
      "[5,7,7,8,8,10] | 8",
      "[5,7,7,8,8,10] | 6",
      "[] | 0",
      "[1] | 1"
    ],
    "sig": "vector<int> searchRange(vector<int>& nums, int target)",
    "template": "vector<int> searchRange(vector<int>& nums, int target) {\n    // 两次二分：分别寻找左边界和右边界\n    return {-1, -1};\n}",
    "hints": [
      "用二分找左边界：nums[mid] >= target 时持续往左收缩 r = mid - 1。",
      "用二分找右边界：nums[mid] <= target 时持续往右收缩 l = mid + 1。",
      "最后确认找到的下标确实等于 target。"
    ],
    "ref": [
      "vector<int> searchRange(vector<int>& nums, int target) {",
      "    auto lowerBound = [&](int tar) {",
      "        int left = 0, right = (int)nums.size() - 1;",
      "        while (left <= right) {",
      "            int mid = left + (right - left) / 2;",
      "            if (nums[mid] >= tar) right = mid - 1;",
      "            else left = mid + 1;",
      "        }",
      "        return left;",
      "    };",
      "    int start = lowerBound(target);",
      "    if (start == nums.size() || nums[start] != target) return {-1, -1};",
      "    int end = lowerBound(target + 1) - 1;",
      "    return {start, end};",
      "}"
    ],
    "note": "两次二分法：第一次求 lower_bound(target) 得到左边界 start；第二次求 lower_bound(target + 1) - 1 得到右边界 end。验证 start 位置是否等于 target。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "必须检查 start 是否合法（start < n && nums[start] == target）。"
    ],
    "rating": 1300,
    "hot100": true,
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 在排序数组中查找元素的第一个和最后一个位置",
      "desc": "【灵神心法点拨】：两次二分法：第一次求 lower_bound(target) 得到左边界 start；第二次求 lower_bound(target + 1) - 1 得到右边界 end。验证 start 位置是否等于 target。",
      "code": [
        "vector<int> searchRange(vector<int>& nums, int target) {",
        "    auto lowerBound = [&](int tar) {",
        "        int left = 0, right = (int)nums.size() - 1;",
        "        while (left <= right) {",
        "            int mid = left + (right - left) / 2;",
        "            if (nums[mid] >= tar) right = mid - 1;",
        "            else left = mid + 1;",
        "        }",
        "        return left;",
        "    };",
        "    int start = lowerBound(target);",
        "    if (start == nums.size() || nums[start] != target) return {-1, -1};",
        "    int end = lowerBound(target + 1) - 1;",
        "    return {start, end};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 34）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> searchRange(vector<int>& nums, int target) {",
        "    auto lowerBound = [&](int tar) {",
        "        int left = 0, right = (int)nums.size() - 1;",
        "        while (left <= right) {",
        "            int mid = left + (right - left) / 2;",
        "            if (nums[mid] >= tar) right = mid - 1;",
        "            else left = mid + 1;",
        "        }",
        "        return left;",
        "    };",
        "    int start = lowerBound(target);",
        "    if (start == nums.size() || nums[start] != target) return {-1, -1};",
        "    int end = lowerBound(target + 1) - 1;",
        "    return {start, end};",
        "}"
      ]
    }
  },
  {
    "id": "p_2300",
    "mod": "binary-search",
    "idx": 4,
    "title": "咒语和药水的成功对数",
    "lc": "LeetCode 2300",
    "lcNum": 2300,
    "diff": 1,
    "tags": [
      "二分查找",
      "排序"
    ],
    "by": "return",
    "brief": "如果咒语和药水强度的乘积大于等于 success ，则认为这对组合是成功的。返回一个长度为 n 的整数数组 pairs，表示每个咒语的成功对数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[2,4,6,9,11] | [2,3,7,9,13,14,16] | 6",
      "[2,5,6,8,9,12,16] | [3,4,8,9,10,14] | 4"
    ],
    "sig": "// LeetCode 2300 函数签名",
    "template": "// LeetCode 2300 咒语和药水的成功对数\n",
    "hints": [
      "先对药水数组 potions 排序。对于每个咒语 s，计算所需的最小药水强度 minP = ceil(success / s)。在 potions 中用二分查找 lower_bound，下标为 idx，则成功对数为 m - idx。"
    ],
    "ref": [
      "vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {",
      "    sort(potions.begin(), potions.end());",
      "    int m = potions.size();",
      "    vector<int> ans;",
      "    for (long long s : spells) {",
      "        long long target = (success + s - 1) / s;",
      "        auto it = lower_bound(potions.begin(), potions.end(), target);",
      "        ans.push_back(potions.end() - it);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "先对药水数组 potions 排序。对于每个咒语 s，计算所需的最小药水强度 minP = ceil(success / s)。在 potions 中用二分查找 lower_bound，下标为 idx，则成功对数为 m - idx。",
    "complexity": "时间 O(m log m + n log m)，空间 O(1)。",
    "pitfalls": [
      "计算 minP 时用 (success + s - 1) / s 向上取整，且防溢出用 long long。"
    ],
    "rating": 1476,
    "hot100": false,
    "slug": "successful-pairs-of-spells-and-potions",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 咒语和药水的成功对数",
      "desc": "【灵神心法点拨】：先对药水数组 potions 排序。对于每个咒语 s，计算所需的最小药水强度 minP = ceil(success / s)。在 potions 中用二分查找 lower_bound，下标为 idx，则成功对数为 m - idx。",
      "code": [
        "vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {",
        "    sort(potions.begin(), potions.end());",
        "    int m = potions.size();",
        "    vector<int> ans;",
        "    for (long long s : spells) {",
        "        long long target = (success + s - 1) / s;",
        "        auto it = lower_bound(potions.begin(), potions.end(), target);",
        "        ans.push_back(potions.end() - it);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2300）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {",
        "    sort(potions.begin(), potions.end());",
        "    int m = potions.size();",
        "    vector<int> ans;",
        "    for (long long s : spells) {",
        "        long long target = (success + s - 1) / s;",
        "        auto it = lower_bound(potions.begin(), potions.end(), target);",
        "        ans.push_back(potions.end() - it);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_875",
    "mod": "binary-search",
    "idx": 5,
    "title": "爱吃香蕉的珂珂",
    "lc": "LeetCode 875",
    "lcNum": 875,
    "diff": 2,
    "tags": [
      "二分答案",
      "单调性"
    ],
    "by": "return",
    "brief": "珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,4,7,8,9] | 1",
      "[2,5,9,12,14] | 8"
    ],
    "sig": "// LeetCode 875 函数签名",
    "template": "// LeetCode 875 爱吃香蕉的珂珂\n",
    "hints": [
      "二分答案母题。吃香蕉速度 k 越快，耗时越少，具有严格单调性。二分范围 k ∈ [1, max(piles)]。check(k) 计算总耗时 sum((p + k - 1) / k)，若耗时 <= h 则说明 k 可行，缩减右边界。"
    ],
    "ref": [
      "int minEatingSpeed(vector<int>& piles, int h) {",
      "    int left = 1, right = *max_element(piles.begin(), piles.end());",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        long long time = 0;",
      "        for (int p : piles) time += (p + mid - 1) / mid;",
      "        if (time <= h) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "二分答案母题。吃香蕉速度 k 越快，耗时越少，具有严格单调性。二分范围 k ∈ [1, max(piles)]。check(k) 计算总耗时 sum((p + k - 1) / k)，若耗时 <= h 则说明 k 可行，缩减右边界。",
    "complexity": "时间 O(n log(max_pile))，空间 O(1)。",
    "pitfalls": [
      "向上取整用 (p + k - 1) / k；总耗时累加可能溢出整型，用 long long。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "koko-eating-bananas",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 爱吃香蕉的珂珂",
      "desc": "【灵神心法点拨】：二分答案母题。吃香蕉速度 k 越快，耗时越少，具有严格单调性。二分范围 k ∈ [1, max(piles)]。check(k) 计算总耗时 sum((p + k - 1) / k)，若耗时 <= h 则说明 k 可行，缩减右边界。",
      "code": [
        "int minEatingSpeed(vector<int>& piles, int h) {",
        "    int left = 1, right = *max_element(piles.begin(), piles.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        long long time = 0;",
        "        for (int p : piles) time += (p + mid - 1) / mid;",
        "        if (time <= h) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 875）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minEatingSpeed(vector<int>& piles, int h) {",
        "    int left = 1, right = *max_element(piles.begin(), piles.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        long long time = 0;",
        "        for (int p : piles) time += (p + mid - 1) / mid;",
        "        if (time <= h) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_1283",
    "mod": "binary-search",
    "idx": 6,
    "title": "使结果不超过阈值的最小除数",
    "lc": "LeetCode 1283",
    "lcNum": 1283,
    "diff": 2,
    "tags": [
      "二分答案",
      "数学"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums 和一个正整数 threshold ，请你选择一个正整数作为除数，除法结果大于 0 的每个数都向上取整后求和。求满足结果和小于等于 threshold 的最小除数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,7,10,14,15,16,20] | 3",
      "[1,5,7,9,13,14,15] | 4"
    ],
    "sig": "// LeetCode 1283 函数签名",
    "template": "// LeetCode 1283 使结果不超过阈值的最小除数\n",
    "hints": [
      "除数 d 越大，商的和越小，具有单调性。二分范围 d ∈ [1, max(nums)]，验证 sum((x + d - 1) / d) <= threshold。"
    ],
    "ref": [
      "int smallestDivisor(vector<int>& nums, int threshold) {",
      "    int left = 1, right = *max_element(nums.begin(), nums.end());",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        int sum = 0;",
      "        for (int x : nums) sum += (x + mid - 1) / mid;",
      "        if (sum <= threshold) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "除数 d 越大，商的和越小，具有单调性。二分范围 d ∈ [1, max(nums)]，验证 sum((x + d - 1) / d) <= threshold。",
    "complexity": "时间 O(n log(max_val))，空间 O(1)。",
    "pitfalls": [
      "上界设为 max(nums) 即可，因为除数大于最大值时每个数商都为 1。"
    ],
    "rating": 1542,
    "hot100": false,
    "slug": "find-the-smallest-divisor-given-a-threshold",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 使结果不超过阈值的最小除数",
      "desc": "【灵神心法点拨】：除数 d 越大，商的和越小，具有单调性。二分范围 d ∈ [1, max(nums)]，验证 sum((x + d - 1) / d) <= threshold。",
      "code": [
        "int smallestDivisor(vector<int>& nums, int threshold) {",
        "    int left = 1, right = *max_element(nums.begin(), nums.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int sum = 0;",
        "        for (int x : nums) sum += (x + mid - 1) / mid;",
        "        if (sum <= threshold) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1283）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int smallestDivisor(vector<int>& nums, int threshold) {",
        "    int left = 1, right = *max_element(nums.begin(), nums.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int sum = 0;",
        "        for (int x : nums) sum += (x + mid - 1) / mid;",
        "        if (sum <= threshold) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_2187",
    "mod": "binary-search",
    "idx": 7,
    "title": "完成旅途的最少时间",
    "lc": "LeetCode 2187",
    "lcNum": 2187,
    "diff": 2,
    "tags": [
      "二分答案",
      "贪心"
    ],
    "by": "return",
    "brief": "每辆公交车完成一趟旅途需要固定的时间 time[i]。返回完成至少 totalTrips 趟旅途需要花费的最少时间。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,4,6,9,10,12,16] | 2",
      "[3,6,9,10,13] | 9"
    ],
    "sig": "// LeetCode 2187 函数签名",
    "template": "// LeetCode 2187 完成旅途的最少时间\n",
    "hints": [
      "时间越长，所有公交车完成的旅途总和单调递增。二分时间 t ∈ [1, min(time) * totalTrips]。check(t) 计算 sum(t / time[i]) 是否 >= totalTrips。"
    ],
    "ref": [
      "long long minimumTime(vector<int>& time, int totalTrips) {",
      "    long long minT = *min_element(time.begin(), time.end());",
      "    long long left = 1, right = minT * totalTrips;",
      "    while (left <= right) {",
      "        long long mid = left + (right - left) / 2;",
      "        long long trips = 0;",
      "        for (int t : time) {",
      "            trips += mid / t;",
      "            if (trips >= totalTrips) break;",
      "        }",
      "        if (trips >= totalTrips) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "时间越长，所有公交车完成的旅途总和单调递增。二分时间 t ∈ [1, min(time) * totalTrips]。check(t) 计算 sum(t / time[i]) 是否 >= totalTrips。",
    "complexity": "时间 O(n log(min(time) * totalTrips))，空间 O(1)。",
    "pitfalls": [
      "二分上界必须是 long long，否则当 totalTrips = 10^7 时会溢出 32 位整型。"
    ],
    "rating": 1641,
    "hot100": false,
    "slug": "minimum-time-to-complete-trips",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 完成旅途的最少时间",
      "desc": "【灵神心法点拨】：时间越长，所有公交车完成的旅途总和单调递增。二分时间 t ∈ [1, min(time) * totalTrips]。check(t) 计算 sum(t / time[i]) 是否 >= totalTrips。",
      "code": [
        "long long minimumTime(vector<int>& time, int totalTrips) {",
        "    long long minT = *min_element(time.begin(), time.end());",
        "    long long left = 1, right = minT * totalTrips;",
        "    while (left <= right) {",
        "        long long mid = left + (right - left) / 2;",
        "        long long trips = 0;",
        "        for (int t : time) {",
        "            trips += mid / t;",
        "            if (trips >= totalTrips) break;",
        "        }",
        "        if (trips >= totalTrips) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2187）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "long long minimumTime(vector<int>& time, int totalTrips) {",
        "    long long minT = *min_element(time.begin(), time.end());",
        "    long long left = 1, right = minT * totalTrips;",
        "    while (left <= right) {",
        "        long long mid = left + (right - left) / 2;",
        "        long long trips = 0;",
        "        for (int t : time) {",
        "            trips += mid / t;",
        "            if (trips >= totalTrips) break;",
        "        }",
        "        if (trips >= totalTrips) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_1011",
    "mod": "binary-search",
    "idx": 8,
    "title": "在 D 天内送达包裹的能力",
    "lc": "LeetCode 1011",
    "lcNum": 1011,
    "diff": 2,
    "tags": [
      "二分答案",
      "贪心"
    ],
    "by": "return",
    "brief": "传送带上的包裹必须在 days 天内运送完毕。返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,6,9,12,14,17] | 5",
      "[2,4,5,8,12,15] | 7"
    ],
    "sig": "// LeetCode 1011 函数签名",
    "template": "// LeetCode 1011 在 D 天内送达包裹的能力\n",
    "hints": [
      "运载能力越高所需天数越少。二分运载能力 cap ∈ [max(weights), sum(weights)]。用贪心模拟装船过程计算所需天数，若天数 <= days 则往左缩。"
    ],
    "ref": [
      "int shipWithinDays(vector<int>& weights, int days) {",
      "    int left = *max_element(weights.begin(), weights.end());",
      "    int right = accumulate(weights.begin(), weights.end(), 0);",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        int cur = 0, needDays = 1;",
      "        for (int w : weights) {",
      "            if (cur + w > mid) { needDays++; cur = 0; }",
      "            cur += w;",
      "        }",
      "        if (needDays <= days) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "运载能力越高所需天数越少。二分运载能力 cap ∈ [max(weights), sum(weights)]。用贪心模拟装船过程计算所需天数，若天数 <= days 则往左缩。",
    "complexity": "时间 O(n log(sum))，空间 O(1)。",
    "pitfalls": [
      "下界必须是 max(weights)，否则连最重的单个包裹都装不下。"
    ],
    "rating": 1725,
    "hot100": false,
    "slug": "capacity-to-ship-packages-within-d-days",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 在 D 天内送达包裹的能力",
      "desc": "【灵神心法点拨】：运载能力越高所需天数越少。二分运载能力 cap ∈ [max(weights), sum(weights)]。用贪心模拟装船过程计算所需天数，若天数 <= days 则往左缩。",
      "code": [
        "int shipWithinDays(vector<int>& weights, int days) {",
        "    int left = *max_element(weights.begin(), weights.end());",
        "    int right = accumulate(weights.begin(), weights.end(), 0);",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int cur = 0, needDays = 1;",
        "        for (int w : weights) {",
        "            if (cur + w > mid) { needDays++; cur = 0; }",
        "            cur += w;",
        "        }",
        "        if (needDays <= days) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1011）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int shipWithinDays(vector<int>& weights, int days) {",
        "    int left = *max_element(weights.begin(), weights.end());",
        "    int right = accumulate(weights.begin(), weights.end(), 0);",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int cur = 0, needDays = 1;",
        "        for (int w : weights) {",
        "            if (cur + w > mid) { needDays++; cur = 0; }",
        "            cur += w;",
        "        }",
        "        if (needDays <= days) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_410",
    "mod": "binary-search",
    "idx": 9,
    "title": "分割数组的最大值",
    "lc": "LeetCode 410",
    "lcNum": 410,
    "diff": 2,
    "tags": [
      "二分答案",
      "最小化最大值",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组。使得这 k 个子数组各自和的最大值最小。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,4,5,6,9,13] | 3",
      "[3,5,9,13,14] | 3"
    ],
    "sig": "// LeetCode 410 函数签名",
    "template": "// LeetCode 410 分割数组的最大值\n",
    "hints": [
      "【最小化最大值】：二分试探子数组最大和 S。通过贪心将数组连续切分，使得每段和 <= S，统计切分出的段数 count。若 count <= k，说明阈值 S 可行，缩小右界寻找更小的可能。"
    ],
    "ref": [
      "int splitArray(vector<int>& nums, int k) {",
      "    long long left = *max_element(nums.begin(), nums.end());",
      "    long long right = accumulate(nums.begin(), nums.end(), 0LL);",
      "    while (left <= right) {",
      "        long long mid = left + (right - left) / 2;",
      "        long long cur = 0, count = 1;",
      "        for (int x : nums) {",
      "            if (cur + x > mid) { count++; cur = 0; }",
      "            cur += x;",
      "        }",
      "        if (count <= k) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "【最小化最大值】：二分试探子数组最大和 S。通过贪心将数组连续切分，使得每段和 <= S，统计切分出的段数 count。若 count <= k，说明阈值 S 可行，缩小右界寻找更小的可能。",
    "complexity": "时间 O(n log(sum))，空间 O(1)。",
    "pitfalls": [
      "下界为 max(nums)，上界为 sum(nums)。"
    ],
    "rating": 1800,
    "hot100": true,
    "slug": "split-array-largest-sum",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 分割数组的最大值",
      "desc": "【灵神心法点拨】：【最小化最大值】：二分试探子数组最大和 S。通过贪心将数组连续切分，使得每段和 <= S，统计切分出的段数 count。若 count <= k，说明阈值 S 可行，缩小右界寻找更小的可能。",
      "code": [
        "int splitArray(vector<int>& nums, int k) {",
        "    long long left = *max_element(nums.begin(), nums.end());",
        "    long long right = accumulate(nums.begin(), nums.end(), 0LL);",
        "    while (left <= right) {",
        "        long long mid = left + (right - left) / 2;",
        "        long long cur = 0, count = 1;",
        "        for (int x : nums) {",
        "            if (cur + x > mid) { count++; cur = 0; }",
        "            cur += x;",
        "        }",
        "        if (count <= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 410）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int splitArray(vector<int>& nums, int k) {",
        "    long long left = *max_element(nums.begin(), nums.end());",
        "    long long right = accumulate(nums.begin(), nums.end(), 0LL);",
        "    while (left <= right) {",
        "        long long mid = left + (right - left) / 2;",
        "        long long cur = 0, count = 1;",
        "        for (int x : nums) {",
        "            if (cur + x > mid) { count++; cur = 0; }",
        "            cur += x;",
        "        }",
        "        if (count <= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_1552",
    "mod": "binary-search",
    "idx": 10,
    "title": "两球之间的磁力",
    "lc": "LeetCode 1552",
    "lcNum": 1552,
    "diff": 3,
    "tags": [
      "二分答案",
      "最大化最小值",
      "贪心"
    ],
    "by": "return",
    "brief": "将 m 个球放入 position 篮子中，使得任意两个球之间的最小磁力最大。返回最大的最小磁力。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,7,8,9,12] | 3",
      "[2,6,9,11,12,16,17] | 7"
    ],
    "sig": "// LeetCode 1552 函数签名",
    "template": "// LeetCode 1552 两球之间的磁力\n",
    "hints": [
      "【最大化最小值】：先排序 position。二分最小间距 d ∈ [1, (max - min) / (m - 1)]。贪心验证：第一个球放 position[0]，每次寻找距离当前球至少 d 的下一个篮子放置，若能放满 m 个球则扩大左边界。"
    ],
    "ref": [
      "int maxDistance(vector<int>& position, int m) {",
      "    sort(position.begin(), position.end());",
      "    int left = 1, right = position.back() - position.front();",
      "    auto check = [&](int d) {",
      "        int count = 1, last = position[0];",
      "        for (int i = 1; i < position.size(); ++i) {",
      "            if (position[i] - last >= d) { count++; last = position[i]; }",
      "        }",
      "        return count >= m;",
      "    };",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        if (check(mid)) left = mid + 1;",
      "        else right = mid - 1;",
      "    }",
      "    return right;",
      "}"
    ],
    "note": "【最大化最小值】：先排序 position。二分最小间距 d ∈ [1, (max - min) / (m - 1)]。贪心验证：第一个球放 position[0]，每次寻找距离当前球至少 d 的下一个篮子放置，若能放满 m 个球则扩大左边界。",
    "complexity": "时间 O(n log n + n log(max_dist))，空间 O(1)。",
    "pitfalls": [
      "必须先排序 position；求最大值满足条件时是 left = mid + 1，最终返回 right。"
    ],
    "rating": 1920,
    "hot100": false,
    "slug": "magnetic-force-between-two-balls",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 两球之间的磁力",
      "desc": "【灵神心法点拨】：【最大化最小值】：先排序 position。二分最小间距 d ∈ [1, (max - min) / (m - 1)]。贪心验证：第一个球放 position[0]，每次寻找距离当前球至少 d 的下一个篮子放置，若能放满 m 个球则扩大左边界。",
      "code": [
        "int maxDistance(vector<int>& position, int m) {",
        "    sort(position.begin(), position.end());",
        "    int left = 1, right = position.back() - position.front();",
        "    auto check = [&](int d) {",
        "        int count = 1, last = position[0];",
        "        for (int i = 1; i < position.size(); ++i) {",
        "            if (position[i] - last >= d) { count++; last = position[i]; }",
        "        }",
        "        return count >= m;",
        "    };",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (check(mid)) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return right;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1552）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxDistance(vector<int>& position, int m) {",
        "    sort(position.begin(), position.end());",
        "    int left = 1, right = position.back() - position.front();",
        "    auto check = [&](int d) {",
        "        int count = 1, last = position[0];",
        "        for (int i = 1; i < position.size(); ++i) {",
        "            if (position[i] - last >= d) { count++; last = position[i]; }",
        "        }",
        "        return count >= m;",
        "    };",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        if (check(mid)) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return right;",
        "}"
      ]
    }
  },
  {
    "id": "p_2560",
    "mod": "binary-search",
    "idx": 11,
    "title": "打家劫舍 IV",
    "lc": "LeetCode 2560",
    "lcNum": 2560,
    "diff": 3,
    "tags": [
      "二分答案",
      "动态规划",
      "贪心"
    ],
    "by": "return",
    "brief": "偷盗的最高金额称为小偷的窃取能力。返回小偷窃取至少 k 间房屋的最小窃取能力。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,6,9,13,16,18] | 2",
      "[2,4,8,11,12,16] | 4"
    ],
    "sig": "// LeetCode 2560 函数签名",
    "template": "// LeetCode 2560 打家劫舍 IV\n",
    "hints": [
      "二分窃取能力 cap。对于固定的 cap，我们只能偷窃金额 <= cap 且不能相邻的房屋。贪心策略：能偷就偷并跳过下一间。若总共偷到的房屋数 >= k，则 cap 合法，向左缩小查找更小能力。"
    ],
    "ref": [
      "int minCapability(vector<int>& nums, int k) {",
      "    int left = *min_element(nums.begin(), nums.end());",
      "    int right = *max_element(nums.begin(), nums.end());",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        int count = 0;",
      "        for (int i = 0; i < nums.size(); ++i) {",
      "            if (nums[i] <= mid) { count++; i++; }",
      "        }",
      "        if (count >= k) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "二分窃取能力 cap。对于固定的 cap，我们只能偷窃金额 <= cap 且不能相邻的房屋。贪心策略：能偷就偷并跳过下一间。若总共偷到的房屋数 >= k，则 cap 合法，向左缩小查找更小能力。",
    "complexity": "时间 O(n log(max_val))，空间 O(1)。",
    "pitfalls": [
      "贪心原则：能选则选必然不劣于跳过（贪心等价于最优 DP）。"
    ],
    "rating": 2081,
    "hot100": false,
    "slug": "house-robber-iv",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 打家劫舍 IV",
      "desc": "【灵神心法点拨】：二分窃取能力 cap。对于固定的 cap，我们只能偷窃金额 <= cap 且不能相邻的房屋。贪心策略：能偷就偷并跳过下一间。若总共偷到的房屋数 >= k，则 cap 合法，向左缩小查找更小能力。",
      "code": [
        "int minCapability(vector<int>& nums, int k) {",
        "    int left = *min_element(nums.begin(), nums.end());",
        "    int right = *max_element(nums.begin(), nums.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int count = 0;",
        "        for (int i = 0; i < nums.size(); ++i) {",
        "            if (nums[i] <= mid) { count++; i++; }",
        "        }",
        "        if (count >= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 2560）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minCapability(vector<int>& nums, int k) {",
        "    int left = *min_element(nums.begin(), nums.end());",
        "    int right = *max_element(nums.begin(), nums.end());",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int count = 0;",
        "        for (int i = 0; i < nums.size(); ++i) {",
        "            if (nums[i] <= mid) { count++; i++; }",
        "        }",
        "        if (count >= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "p_378",
    "mod": "binary-search",
    "idx": 12,
    "title": "有序矩阵中第 K 小的元素",
    "lc": "LeetCode 378",
    "lcNum": 378,
    "diff": 2,
    "tags": [
      "二分答案",
      "矩阵"
    ],
    "by": "return",
    "brief": "给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,1,0,0],[1,1,0,1],[0,1,0,0]] | 3",
      "[[0,0,1,1],[0,0,1,0],[1,1,1,0]] | 2"
    ],
    "sig": "// LeetCode 378 函数签名",
    "template": "// LeetCode 378 有序矩阵中第 K 小的元素\n",
    "hints": [
      "值域二分：元素值范围在 [matrix[0][0], matrix[n-1][n-1]]。利用矩阵从左到右、从上到下的单调性，从左下角出发在 O(n) 时间内数出矩阵中小于等于 mid 的元素个数 count。若 count >= k 则往左缩小。"
    ],
    "ref": [
      "int kthSmallest(vector<vector<int>>& matrix, int k) {",
      "    int n = matrix.size();",
      "    int left = matrix[0][0], right = matrix[n - 1][n - 1];",
      "    while (left <= right) {",
      "        int mid = left + (right - left) / 2;",
      "        int count = 0, i = n - 1, j = 0;",
      "        while (i >= 0 && j < n) {",
      "            if (matrix[i][j] <= mid) { count += i + 1; j++; }",
      "            else i--;",
      "        }",
      "        if (count >= k) right = mid - 1;",
      "        else left = mid + 1;",
      "    }",
      "    return left;",
      "}"
    ],
    "note": "值域二分：元素值范围在 [matrix[0][0], matrix[n-1][n-1]]。利用矩阵从左到右、从上到下的单调性，从左下角出发在 O(n) 时间内数出矩阵中小于等于 mid 的元素个数 count。若 count >= k 则往左缩小。",
    "complexity": "时间 O(n log(max - min))，空间 O(1)。",
    "pitfalls": [
      "利用左下角坐标 (i, j)，若 matrix[i][j] <= mid 则该列上方所有元素都 <= mid，数量累加 i + 1，同时向右 j++。"
    ],
    "rating": 1700,
    "hot100": false,
    "slug": "kth-smallest-element-in-a-sorted-matrix",
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 有序矩阵中第 K 小的元素",
      "desc": "【灵神心法点拨】：值域二分：元素值范围在 [matrix[0][0], matrix[n-1][n-1]]。利用矩阵从左到右、从上到下的单调性，从左下角出发在 O(n) 时间内数出矩阵中小于等于 mid 的元素个数 count。若 count >= k 则往左缩小。",
      "code": [
        "int kthSmallest(vector<vector<int>>& matrix, int k) {",
        "    int n = matrix.size();",
        "    int left = matrix[0][0], right = matrix[n - 1][n - 1];",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int count = 0, i = n - 1, j = 0;",
        "        while (i >= 0 && j < n) {",
        "            if (matrix[i][j] <= mid) { count += i + 1; j++; }",
        "            else i--;",
        "        }",
        "        if (count >= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 378）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int kthSmallest(vector<vector<int>>& matrix, int k) {",
        "    int n = matrix.size();",
        "    int left = matrix[0][0], right = matrix[n - 1][n - 1];",
        "    while (left <= right) {",
        "        int mid = left + (right - left) / 2;",
        "        int count = 0, i = n - 1, j = 0;",
        "        while (i >= 0 && j < n) {",
        "            if (matrix[i][j] <= mid) { count += i + 1; j++; }",
        "            else i--;",
        "        }",
        "        if (count >= k) right = mid - 1;",
        "        else left = mid + 1;",
        "    }",
        "    return left;",
        "}"
      ]
    }
  },
  {
    "id": "sq2",
    "mod": "monotonic-stack",
    "idx": 1,
    "title": "每日温度",
    "lc": "LeetCode 739",
    "lcNum": 739,
    "diff": 1,
    "tags": [
      "单调栈",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。",
    "ioIn": "temperatures：温度数组。",
    "ioOut": "返回等长的答案数组。",
    "ex": [
      {
        "i": "[73,74,75,71,69,72,76,73]",
        "o": "[1,1,4,2,1,1,0,0]"
      },
      {
        "i": "[30,40,50,60]",
        "o": "[1,1,1,0]"
      }
    ],
    "params": [
      "[73,74,75,71,69,72,76,73]",
      "[30,40,50,60]",
      "[30,60,90]",
      "[50]"
    ],
    "sig": "vector<int> dailyTemperatures(vector<int>& temperatures)",
    "template": "vector<int> dailyTemperatures(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> res(n, 0);\n    // 栈里存下标，保持温度递减\n    return res;\n}",
    "hints": [
      "栈里存的是\"还没等到更暖那天\"的下标，不是温度值。",
      "当前温度比栈顶那天高，就说明栈顶那天等到了答案：差值就是下标之差。",
      "一天可能一次性解决栈里好几天，所以用 while 而不是 if。"
    ],
    "ref": [
      "vector<int> dailyTemperatures(vector<int>& temperatures) {",
      "    int n = temperatures.size();",
      "    vector<int> ans(n, 0);",
      "    stack<int> st;",
      "    for (int i = 0; i < n; ++i) {",
      "        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {",
      "            int prev = st.top();",
      "            st.pop();",
      "            ans[prev] = i - prev;",
      "        }",
      "        st.push(i);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "单调栈母题。维护一个单调递减栈（存储下标）。遍历每天温度，若当前温度大于栈顶下标对应的温度，说明找到了栈顶元素的下一个更高温度，弹出栈顶并结算距离 i - prevIdx。最后将当前下标入栈。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "栈内存储的是下标，而不是温度本身，方便计算天数差。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "daily-temperatures",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 每日温度",
      "desc": "【灵神心法点拨】：单调栈母题。维护一个单调递减栈（存储下标）。遍历每天温度，若当前温度大于栈顶下标对应的温度，说明找到了栈顶元素的下一个更高温度，弹出栈顶并结算距离 i - prevIdx。最后将当前下标入栈。",
      "code": [
        "vector<int> dailyTemperatures(vector<int>& temperatures) {",
        "    int n = temperatures.size();",
        "    vector<int> ans(n, 0);",
        "    stack<int> st;",
        "    for (int i = 0; i < n; ++i) {",
        "        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {",
        "            int prev = st.top();",
        "            st.pop();",
        "            ans[prev] = i - prev;",
        "        }",
        "        st.push(i);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 739）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> dailyTemperatures(vector<int>& temperatures) {",
        "    int n = temperatures.size();",
        "    vector<int> ans(n, 0);",
        "    stack<int> st;",
        "    for (int i = 0; i < n; ++i) {",
        "        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {",
        "            int prev = st.top();",
        "            st.pop();",
        "            ans[prev] = i - prev;",
        "        }",
        "        st.push(i);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_496",
    "mod": "monotonic-stack",
    "idx": 2,
    "title": "下一个更大元素 I",
    "lc": "LeetCode 496",
    "lcNum": 496,
    "diff": 1,
    "tags": [
      "单调栈",
      "哈希表"
    ],
    "by": "return",
    "brief": "nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。找出 nums1 中每个元素在 nums2 中的下一个更大元素。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[2,8,9,2,9,10,12] | [8,10,1,7,9,12,8]",
      "[11,5,4,11,9,3] | [9,1,1,2,11,11]"
    ],
    "sig": "// LeetCode 496 函数签名",
    "template": "// LeetCode 496 下一个更大元素 I\n",
    "hints": [
      "先用单调栈处理 nums2，使用哈希表 map[num] = nextGreater 记录 nums2 中每个元素右侧第一个更大元素。随后遍历 nums1 直接从哈希表中查表输出。"
    ],
    "ref": [
      "vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {",
      "    unordered_map<int, int> mp;",
      "    stack<int> st;",
      "    for (int x : nums2) {",
      "        while (!st.empty() && x > st.top()) {",
      "            mp[st.top()] = x;",
      "            st.pop();",
      "        }",
      "        st.push(x);",
      "    }",
      "    vector<int> ans;",
      "    for (int x : nums1) {",
      "        ans.push_back(mp.count(x) ? mp[x] : -1);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "先用单调栈处理 nums2，使用哈希表 map[num] = nextGreater 记录 nums2 中每个元素右侧第一个更大元素。随后遍历 nums1 直接从哈希表中查表输出。",
    "complexity": "时间 O(n + m)，空间 O(m)。",
    "pitfalls": [
      "如果不存在更大元素，哈希表中设为 -1。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "next-greater-element-i",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 下一个更大元素 I",
      "desc": "【灵神心法点拨】：先用单调栈处理 nums2，使用哈希表 map[num] = nextGreater 记录 nums2 中每个元素右侧第一个更大元素。随后遍历 nums1 直接从哈希表中查表输出。",
      "code": [
        "vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {",
        "    unordered_map<int, int> mp;",
        "    stack<int> st;",
        "    for (int x : nums2) {",
        "        while (!st.empty() && x > st.top()) {",
        "            mp[st.top()] = x;",
        "            st.pop();",
        "        }",
        "        st.push(x);",
        "    }",
        "    vector<int> ans;",
        "    for (int x : nums1) {",
        "        ans.push_back(mp.count(x) ? mp[x] : -1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 496）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {",
        "    unordered_map<int, int> mp;",
        "    stack<int> st;",
        "    for (int x : nums2) {",
        "        while (!st.empty() && x > st.top()) {",
        "            mp[st.top()] = x;",
        "            st.pop();",
        "        }",
        "        st.push(x);",
        "    }",
        "    vector<int> ans;",
        "    for (int x : nums1) {",
        "        ans.push_back(mp.count(x) ? mp[x] : -1);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_503",
    "mod": "monotonic-stack",
    "idx": 3,
    "title": "下一个更大元素 II",
    "lc": "LeetCode 503",
    "lcNum": 503,
    "diff": 2,
    "tags": [
      "单调栈",
      "循环数组"
    ],
    "by": "return",
    "brief": "给定一个循环数组 nums（nums[nums.length - 1] 的下一个元素是 nums[0]），返回 nums 中每个元素的 下一个更大元素 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,7,8,9,2,8,8]",
      "[8,5,4,11,5,10,5]"
    ],
    "sig": "// LeetCode 503 函数签名",
    "template": "// LeetCode 503 下一个更大元素 II\n",
    "hints": [
      "【循环数组破环成链】：遍历两遍数组（下标从 0 遍历到 2n - 1，通过 i % n 取模访问元素）。单调栈逻辑不变，只在第一轮（i < n）时入栈，两轮均可结算弹出。"
    ],
    "ref": [
      "vector<int> nextGreaterElements(vector<int>& nums) {",
      "    int n = nums.size();",
      "    vector<int> ans(n, -1);",
      "    stack<int> st;",
      "    for (int i = 0; i < 2 * n; ++i) {",
      "        int x = nums[i % n];",
      "        while (!st.empty() && x > nums[st.top()]) {",
      "            ans[st.top()] = x;",
      "            st.pop();",
      "        }",
      "        if (i < n) st.push(i);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "【循环数组破环成链】：遍历两遍数组（下标从 0 遍历到 2n - 1，通过 i % n 取模访问元素）。单调栈逻辑不变，只在第一轮（i < n）时入栈，两轮均可结算弹出。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "数组下标取模 i % n；答案数组初始全置为 -1。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "next-greater-element-ii",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 下一个更大元素 II",
      "desc": "【灵神心法点拨】：【循环数组破环成链】：遍历两遍数组（下标从 0 遍历到 2n - 1，通过 i % n 取模访问元素）。单调栈逻辑不变，只在第一轮（i < n）时入栈，两轮均可结算弹出。",
      "code": [
        "vector<int> nextGreaterElements(vector<int>& nums) {",
        "    int n = nums.size();",
        "    vector<int> ans(n, -1);",
        "    stack<int> st;",
        "    for (int i = 0; i < 2 * n; ++i) {",
        "        int x = nums[i % n];",
        "        while (!st.empty() && x > nums[st.top()]) {",
        "            ans[st.top()] = x;",
        "            st.pop();",
        "        }",
        "        if (i < n) st.push(i);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 503）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> nextGreaterElements(vector<int>& nums) {",
        "    int n = nums.size();",
        "    vector<int> ans(n, -1);",
        "    stack<int> st;",
        "    for (int i = 0; i < 2 * n; ++i) {",
        "        int x = nums[i % n];",
        "        while (!st.empty() && x > nums[st.top()]) {",
        "            ans[st.top()] = x;",
        "            st.pop();",
        "        }",
        "        if (i < n) st.push(i);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_901",
    "mod": "monotonic-stack",
    "idx": 4,
    "title": "股票价格跨度",
    "lc": "LeetCode 901",
    "lcNum": 901,
    "diff": 2,
    "tags": [
      "单调栈",
      "在线算法"
    ],
    "by": "return",
    "brief": "设计一个算法收集某些股票的每日报价，并返回该股票当日价格的 跨度（从今天往回数连续小于或等于今天价格的最大天数）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      ""
    ],
    "sig": "// LeetCode 901 函数签名",
    "template": "// LeetCode 901 股票价格跨度\n",
    "hints": [
      "维护单调递减栈，栈中保存 pair(价格, 跨度)。当新来价格 price >= 栈顶价格时，弹出栈顶并累加其跨度，直到栈顶价格 > price。将 (price, 累加跨度) 入栈并返回。"
    ],
    "ref": [
      "class StockSpanner {",
      "    stack<pair<int, int>> st;",
      "public:",
      "    StockSpanner() {}",
      "    int next(int price) {",
      "        int span = 1;",
      "        while (!st.empty() && price >= st.top().first) {",
      "            span += st.top().second;",
      "            st.pop();",
      "        }",
      "        st.push({price, span});",
      "        return span;",
      "    }",
      "};"
    ],
    "note": "维护单调递减栈，栈中保存 pair(价格, 跨度)。当新来价格 price >= 栈顶价格时，弹出栈顶并累加其跨度，直到栈顶价格 > price。将 (price, 累加跨度) 入栈并返回。",
    "complexity": "均摊时间 O(1)，空间 O(n)。",
    "pitfalls": [
      "跨度包含当天自身，初始跨度为 1。"
    ],
    "rating": 1708,
    "hot100": false,
    "slug": "online-stock-span",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 股票价格跨度",
      "desc": "【灵神心法点拨】：维护单调递减栈，栈中保存 pair(价格, 跨度)。当新来价格 price >= 栈顶价格时，弹出栈顶并累加其跨度，直到栈顶价格 > price。将 (price, 累加跨度) 入栈并返回。",
      "code": [
        "class StockSpanner {",
        "    stack<pair<int, int>> st;",
        "public:",
        "    StockSpanner() {}",
        "    int next(int price) {",
        "        int span = 1;",
        "        while (!st.empty() && price >= st.top().first) {",
        "            span += st.top().second;",
        "            st.pop();",
        "        }",
        "        st.push({price, span});",
        "        return span;",
        "    }",
        "};"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 901）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "class StockSpanner {",
        "    stack<pair<int, int>> st;",
        "public:",
        "    StockSpanner() {}",
        "    int next(int price) {",
        "        int span = 1;",
        "        while (!st.empty() && price >= st.top().first) {",
        "            span += st.top().second;",
        "            st.pop();",
        "        }",
        "        st.push({price, span});",
        "        return span;",
        "    }",
        "};"
      ]
    }
  },
  {
    "id": "p_84",
    "mod": "monotonic-stack",
    "idx": 5,
    "title": "柱状图中最大的矩形",
    "lc": "LeetCode 84",
    "lcNum": 84,
    "diff": 2,
    "tags": [
      "单调栈",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。求在该柱状图中，能够勾勒出来的矩形的最大面积。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[10,12,11,12,2,6]",
      "[4,3,11,1,4,10,2]"
    ],
    "sig": "// LeetCode 84 函数签名",
    "template": "// LeetCode 84 柱状图中最大的矩形\n",
    "hints": [
      "以每个柱子 heights[i] 为高的最大矩形，其宽度由左右两侧第一个比它矮的柱子下标决定。两端添加高度为 0 的哨兵节点。维护单调递增栈，当遇到较矮柱子弹出栈顶 mid，其高为 heights[mid]，左边界为弹出后的栈顶，右边界为当前 i，面积 = h * (i - st.top() - 1)。"
    ],
    "ref": [
      "int largestRectangleArea(vector<int>& heights) {",
      "    heights.insert(heights.begin(), 0);",
      "    heights.push_back(0);",
      "    stack<int> st;",
      "    int maxArea = 0;",
      "    for (int i = 0; i < heights.size(); ++i) {",
      "        while (!st.empty() && heights[i] < heights[st.top()]) {",
      "            int h = heights[st.top()];",
      "            st.pop();",
      "            int w = i - st.top() - 1;",
      "            maxArea = max(maxArea, h * w);",
      "        }",
      "        st.push(i);",
      "    }",
      "    return maxArea;",
      "}"
    ],
    "note": "以每个柱子 heights[i] 为高的最大矩形，其宽度由左右两侧第一个比它矮的柱子下标决定。两端添加高度为 0 的哨兵节点。维护单调递增栈，当遇到较矮柱子弹出栈顶 mid，其高为 heights[mid]，左边界为弹出后的栈顶，右边界为当前 i，面积 = h * (i - st.top() - 1)。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "在 heights 首尾各补一个 0 哨兵，保证所有柱子都能在最后被弹出结算。"
    ],
    "rating": 1800,
    "hot100": true,
    "slug": "largest-rectangle-in-histogram",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 柱状图中最大的矩形",
      "desc": "【灵神心法点拨】：以每个柱子 heights[i] 为高的最大矩形，其宽度由左右两侧第一个比它矮的柱子下标决定。两端添加高度为 0 的哨兵节点。维护单调递增栈，当遇到较矮柱子弹出栈顶 mid，其高为 heights[mid]，左边界为弹出后的栈顶，右边界为当前 i，面积 = h * (i - st.top() - 1)。",
      "code": [
        "int largestRectangleArea(vector<int>& heights) {",
        "    heights.insert(heights.begin(), 0);",
        "    heights.push_back(0);",
        "    stack<int> st;",
        "    int maxArea = 0;",
        "    for (int i = 0; i < heights.size(); ++i) {",
        "        while (!st.empty() && heights[i] < heights[st.top()]) {",
        "            int h = heights[st.top()];",
        "            st.pop();",
        "            int w = i - st.top() - 1;",
        "            maxArea = max(maxArea, h * w);",
        "        }",
        "        st.push(i);",
        "    }",
        "    return maxArea;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 84）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int largestRectangleArea(vector<int>& heights) {",
        "    heights.insert(heights.begin(), 0);",
        "    heights.push_back(0);",
        "    stack<int> st;",
        "    int maxArea = 0;",
        "    for (int i = 0; i < heights.size(); ++i) {",
        "        while (!st.empty() && heights[i] < heights[st.top()]) {",
        "            int h = heights[st.top()];",
        "            st.pop();",
        "            int w = i - st.top() - 1;",
        "            maxArea = max(maxArea, h * w);",
        "        }",
        "        st.push(i);",
        "    }",
        "    return maxArea;",
        "}"
      ]
    }
  },
  {
    "id": "p_85",
    "mod": "monotonic-stack",
    "idx": 6,
    "title": "最大矩形",
    "lc": "LeetCode 85",
    "lcNum": 85,
    "diff": 3,
    "tags": [
      "单调栈",
      "动态规划",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[4,2,3],[4,4,4]]",
      "[[3,5,2],[3,1,3]]"
    ],
    "sig": "// LeetCode 85 函数签名",
    "template": "// LeetCode 85 最大矩形\n",
    "hints": [
      "将二维矩阵转化为逐行的柱状图！对于第 i 行，维护 heights[j]：如果 matrix[i][j] == '1' 则高度加一，否则高度重置为 0。每算完一行，直接套用 LC 84 的单调栈求柱状图最大矩形。"
    ],
    "ref": [
      "int maximalRectangle(vector<vector<char>>& matrix) {",
      "    if (matrix.empty()) return 0;",
      "    int m = matrix.size(), n = matrix[0].size(), ans = 0;",
      "    vector<int> heights(n + 2, 0);",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            heights[j + 1] = (matrix[i][j] == '1') ? heights[j + 1] + 1 : 0;",
      "        }",
      "        stack<int> st;",
      "        for (int k = 0; k < heights.size(); ++k) {",
      "            while (!st.empty() && heights[k] < heights[st.top()]) {",
      "                int h = heights[st.top()]; st.pop();",
      "                ans = max(ans, h * (k - st.top() - 1));",
      "            }",
      "            st.push(k);",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "将二维矩阵转化为逐行的柱状图！对于第 i 行，维护 heights[j]：如果 matrix[i][j] == '1' 则高度加一，否则高度重置为 0。每算完一行，直接套用 LC 84 的单调栈求柱状图最大矩形。",
    "complexity": "时间 O(m * n)，空间 O(n)。",
    "pitfalls": [
      "遇到 '0' 时当前列高度必须归 0，不能沿用上一行高度。"
    ],
    "rating": 2100,
    "hot100": true,
    "slug": "maximal-rectangle",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 最大矩形",
      "desc": "【灵神心法点拨】：将二维矩阵转化为逐行的柱状图！对于第 i 行，维护 heights[j]：如果 matrix[i][j] == '1' 则高度加一，否则高度重置为 0。每算完一行，直接套用 LC 84 的单调栈求柱状图最大矩形。",
      "code": [
        "int maximalRectangle(vector<vector<char>>& matrix) {",
        "    if (matrix.empty()) return 0;",
        "    int m = matrix.size(), n = matrix[0].size(), ans = 0;",
        "    vector<int> heights(n + 2, 0);",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            heights[j + 1] = (matrix[i][j] == '1') ? heights[j + 1] + 1 : 0;",
        "        }",
        "        stack<int> st;",
        "        for (int k = 0; k < heights.size(); ++k) {",
        "            while (!st.empty() && heights[k] < heights[st.top()]) {",
        "                int h = heights[st.top()]; st.pop();",
        "                ans = max(ans, h * (k - st.top() - 1));",
        "            }",
        "            st.push(k);",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 85）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maximalRectangle(vector<vector<char>>& matrix) {",
        "    if (matrix.empty()) return 0;",
        "    int m = matrix.size(), n = matrix[0].size(), ans = 0;",
        "    vector<int> heights(n + 2, 0);",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            heights[j + 1] = (matrix[i][j] == '1') ? heights[j + 1] + 1 : 0;",
        "        }",
        "        stack<int> st;",
        "        for (int k = 0; k < heights.size(); ++k) {",
        "            while (!st.empty() && heights[k] < heights[st.top()]) {",
        "                int h = heights[st.top()]; st.pop();",
        "                ans = max(ans, h * (k - st.top() - 1));",
        "            }",
        "            st.push(k);",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_907",
    "mod": "monotonic-stack",
    "idx": 7,
    "title": "子数组的最小值之和",
    "lc": "LeetCode 907",
    "lcNum": 907,
    "diff": 3,
    "tags": [
      "单调栈",
      "贡献法"
    ],
    "by": "return",
    "brief": "给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。结果对 10^9 + 7 取模。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-1,1,-2,2,6]",
      "[-2,-3,7,-1,2]"
    ],
    "sig": "// LeetCode 907 函数签名",
    "template": "// LeetCode 907 子数组的最小值之和\n",
    "hints": [
      "【贡献法】：计算每个元素 arr[i] 作为最小值的连续子数组个数。用单调栈求出左侧第一个小于等于 arr[i] 的下标 left[i]，以及右侧第一个严格小于 arr[i] 的下标 right[i]（一边取等一边严格小于以防重复计数）。arr[i] 的总贡献为 arr[i] * (i - left[i]) * (right[i] - i)。"
    ],
    "ref": [
      "int sumSubarrayMins(vector<int>& arr) {",
      "    int n = arr.size(), MOD = 1e9 + 7;",
      "    vector<int> left(n, -1), right(n, n);",
      "    stack<int> st;",
      "    for (int i = 0; i < n; ++i) {",
      "        while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();",
      "        if (!st.empty()) left[i] = st.top();",
      "        st.push(i);",
      "    }",
      "    while (!st.empty()) st.pop();",
      "    for (int i = n - 1; i >= 0; --i) {",
      "        while (!st.empty() && arr[st.top()] > arr[i]) st.pop();",
      "        if (!st.empty()) right[i] = st.top();",
      "        st.push(i);",
      "    }",
      "    long long ans = 0;",
      "    for (int i = 0; i < n; ++i) {",
      "        long long cnt = (long long)(i - left[i]) * (right[i] - i) % MOD;",
      "        ans = (ans + cnt * arr[i]) % MOD;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "【贡献法】：计算每个元素 arr[i] 作为最小值的连续子数组个数。用单调栈求出左侧第一个小于等于 arr[i] 的下标 left[i]，以及右侧第一个严格小于 arr[i] 的下标 right[i]（一边取等一边严格小于以防重复计数）。arr[i] 的总贡献为 arr[i] * (i - left[i]) * (right[i] - i)。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "为了避免相同元素重复计算，一侧用 <=，另一侧必须严格用 <。"
    ],
    "rating": 1975,
    "hot100": false,
    "slug": "sum-of-subarray-minimums",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 子数组的最小值之和",
      "desc": "【灵神心法点拨】：【贡献法】：计算每个元素 arr[i] 作为最小值的连续子数组个数。用单调栈求出左侧第一个小于等于 arr[i] 的下标 left[i]，以及右侧第一个严格小于 arr[i] 的下标 right[i]（一边取等一边严格小于以防重复计数）。arr[i] 的总贡献为 arr[i] * (i - left[i]) * (right[i] - i)。",
      "code": [
        "int sumSubarrayMins(vector<int>& arr) {",
        "    int n = arr.size(), MOD = 1e9 + 7;",
        "    vector<int> left(n, -1), right(n, n);",
        "    stack<int> st;",
        "    for (int i = 0; i < n; ++i) {",
        "        while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();",
        "        if (!st.empty()) left[i] = st.top();",
        "        st.push(i);",
        "    }",
        "    while (!st.empty()) st.pop();",
        "    for (int i = n - 1; i >= 0; --i) {",
        "        while (!st.empty() && arr[st.top()] > arr[i]) st.pop();",
        "        if (!st.empty()) right[i] = st.top();",
        "        st.push(i);",
        "    }",
        "    long long ans = 0;",
        "    for (int i = 0; i < n; ++i) {",
        "        long long cnt = (long long)(i - left[i]) * (right[i] - i) % MOD;",
        "        ans = (ans + cnt * arr[i]) % MOD;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 907）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int sumSubarrayMins(vector<int>& arr) {",
        "    int n = arr.size(), MOD = 1e9 + 7;",
        "    vector<int> left(n, -1), right(n, n);",
        "    stack<int> st;",
        "    for (int i = 0; i < n; ++i) {",
        "        while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();",
        "        if (!st.empty()) left[i] = st.top();",
        "        st.push(i);",
        "    }",
        "    while (!st.empty()) st.pop();",
        "    for (int i = n - 1; i >= 0; --i) {",
        "        while (!st.empty() && arr[st.top()] > arr[i]) st.pop();",
        "        if (!st.empty()) right[i] = st.top();",
        "        st.push(i);",
        "    }",
        "    long long ans = 0;",
        "    for (int i = 0; i < n; ++i) {",
        "        long long cnt = (long long)(i - left[i]) * (right[i] - i) % MOD;",
        "        ans = (ans + cnt * arr[i]) % MOD;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_402",
    "mod": "monotonic-stack",
    "idx": 8,
    "title": "移掉 K 位数字",
    "lc": "LeetCode 402",
    "lcNum": 402,
    "diff": 2,
    "tags": [
      "单调栈",
      "贪心"
    ],
    "by": "return",
    "brief": "给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"1234\" | 2",
      "\"226\" | 2"
    ],
    "sig": "// LeetCode 402 函数签名",
    "template": "// LeetCode 402 移掉 K 位数字\n",
    "hints": [
      "贪心思想：高位数字越小，整个数值越小。使用单调递增栈，当新数字小于栈顶时，弹出栈顶（相当于删除较大的高位数字）并 k--，直到 k == 0。随后处理前导零并构建结果字符串。"
    ],
    "ref": [
      "string removeKdigits(string num, int k) {",
      "    string st;",
      "    for (char c : num) {",
      "        while (!st.empty() && k > 0 && st.back() > c) {",
      "            st.pop_back();",
      "            k--;",
      "        }",
      "        st.push_back(c);",
      "    }",
      "    while (k-- > 0 && !st.empty()) st.pop_back();",
      "    int idx = 0;",
      "    while (idx < st.size() && st[idx] == '0') idx++;",
      "    string ans = st.substr(idx);",
      "    return ans.empty() ? \"0\" : ans;",
      "}"
    ],
    "note": "贪心思想：高位数字越小，整个数值越小。使用单调递增栈，当新数字小于栈顶时，弹出栈顶（相当于删除较大的高位数字）并 k--，直到 k == 0。随后处理前导零并构建结果字符串。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "若删除次数还有剩余（如递增序列 12345），从末尾继续弹出；处理前导零，空串返回 \"0\"。"
    ],
    "rating": 1600,
    "hot100": false,
    "slug": "remove-k-digits",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 移掉 K 位数字",
      "desc": "【灵神心法点拨】：贪心思想：高位数字越小，整个数值越小。使用单调递增栈，当新数字小于栈顶时，弹出栈顶（相当于删除较大的高位数字）并 k--，直到 k == 0。随后处理前导零并构建结果字符串。",
      "code": [
        "string removeKdigits(string num, int k) {",
        "    string st;",
        "    for (char c : num) {",
        "        while (!st.empty() && k > 0 && st.back() > c) {",
        "            st.pop_back();",
        "            k--;",
        "        }",
        "        st.push_back(c);",
        "    }",
        "    while (k-- > 0 && !st.empty()) st.pop_back();",
        "    int idx = 0;",
        "    while (idx < st.size() && st[idx] == '0') idx++;",
        "    string ans = st.substr(idx);",
        "    return ans.empty() ? \"0\" : ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 402）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "string removeKdigits(string num, int k) {",
        "    string st;",
        "    for (char c : num) {",
        "        while (!st.empty() && k > 0 && st.back() > c) {",
        "            st.pop_back();",
        "            k--;",
        "        }",
        "        st.push_back(c);",
        "    }",
        "    while (k-- > 0 && !st.empty()) st.pop_back();",
        "    int idx = 0;",
        "    while (idx < st.size() && st[idx] == '0') idx++;",
        "    string ans = st.substr(idx);",
        "    return ans.empty() ? \"0\" : ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_316",
    "mod": "monotonic-stack",
    "idx": 9,
    "title": "去除重复字母",
    "lc": "LeetCode 316",
    "lcNum": 316,
    "diff": 2,
    "tags": [
      "单调栈",
      "贪心",
      "字符串"
    ],
    "by": "return",
    "brief": "给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（不得打乱其他字符的相对位置）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"dcabab\"",
      "\"ddabcce\""
    ],
    "sig": "// LeetCode 316 函数签名",
    "template": "// LeetCode 316 去除重复字母\n",
    "hints": [
      "用 last 数组记录每个字母最后出现的下标；用 inStack 记录字母是否已在栈中。遍历字符，若其已在栈中则跳过；否则若栈顶字符大于当前字符且栈顶字符在后续还会出现（last[top] > i），则弹出栈顶。当前字符入栈。"
    ],
    "ref": [
      "string removeDuplicateLetters(string s) {",
      "    vector<int> last(26, 0);",
      "    for (int i = 0; i < s.size(); ++i) last[s[i] - 'a'] = i;",
      "    vector<bool> inStack(26, false);",
      "    string st;",
      "    for (int i = 0; i < s.size(); ++i) {",
      "        int c = s[i] - 'a';",
      "        if (inStack[c]) continue;",
      "        while (!st.empty() && st.back() > s[i] && last[st.back() - 'a'] > i) {",
      "            inStack[st.back() - 'a'] = false;",
      "            st.pop_back();",
      "        }",
      "        st.push_back(s[i]);",
      "        inStack[c] = true;",
      "    }",
      "    return st;",
      "}"
    ],
    "note": "用 last 数组记录每个字母最后出现的下标；用 inStack 记录字母是否已在栈中。遍历字符，若其已在栈中则跳过；否则若栈顶字符大于当前字符且栈顶字符在后续还会出现（last[top] > i），则弹出栈顶。当前字符入栈。",
    "complexity": "时间 O(n)，空间 O(26)。",
    "pitfalls": [
      "必须维护 inStack 数组，如果当前字符已存在于答案栈中，直接跳过不能重复入栈。"
    ],
    "rating": 1785,
    "hot100": false,
    "slug": "remove-duplicate-letters",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 去除重复字母",
      "desc": "【灵神心法点拨】：用 last 数组记录每个字母最后出现的下标；用 inStack 记录字母是否已在栈中。遍历字符，若其已在栈中则跳过；否则若栈顶字符大于当前字符且栈顶字符在后续还会出现（last[top] > i），则弹出栈顶。当前字符入栈。",
      "code": [
        "string removeDuplicateLetters(string s) {",
        "    vector<int> last(26, 0);",
        "    for (int i = 0; i < s.size(); ++i) last[s[i] - 'a'] = i;",
        "    vector<bool> inStack(26, false);",
        "    string st;",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        int c = s[i] - 'a';",
        "        if (inStack[c]) continue;",
        "        while (!st.empty() && st.back() > s[i] && last[st.back() - 'a'] > i) {",
        "            inStack[st.back() - 'a'] = false;",
        "            st.pop_back();",
        "        }",
        "        st.push_back(s[i]);",
        "        inStack[c] = true;",
        "    }",
        "    return st;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 316）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "string removeDuplicateLetters(string s) {",
        "    vector<int> last(26, 0);",
        "    for (int i = 0; i < s.size(); ++i) last[s[i] - 'a'] = i;",
        "    vector<bool> inStack(26, false);",
        "    string st;",
        "    for (int i = 0; i < s.size(); ++i) {",
        "        int c = s[i] - 'a';",
        "        if (inStack[c]) continue;",
        "        while (!st.empty() && st.back() > s[i] && last[st.back() - 'a'] > i) {",
        "            inStack[st.back() - 'a'] = false;",
        "            st.pop_back();",
        "        }",
        "        st.push_back(s[i]);",
        "        inStack[c] = true;",
        "    }",
        "    return st;",
        "}"
      ]
    }
  },
  {
    "id": "p_239",
    "mod": "monotonic-stack",
    "idx": 10,
    "title": "滑动窗口最大值",
    "lc": "LeetCode 239",
    "lcNum": 239,
    "diff": 3,
    "tags": [
      "单调队列",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。返回滑动窗口中的最大值。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[6,10,3,11,7] | 2",
      "[1,5,3,9,6,3] | 2"
    ],
    "sig": "// LeetCode 239 函数签名",
    "template": "// LeetCode 239 滑动窗口最大值\n",
    "hints": [
      "单调双端队列模板。维护一个单调递减的双端队列 deque（存储下标）：入队时将队尾小于当前元素的全部弹出（及时淘汰不如新元素的旧值）；检查队首是否离开窗口范围（i - k >= dq.front()）；当 i >= k - 1 时队首即为当前窗口最大值。"
    ],
    "ref": [
      "vector<int> maxSlidingWindow(vector<int>& nums, int k) {",
      "    deque<int> dq;",
      "    vector<int> ans;",
      "    for (int i = 0; i < nums.size(); ++i) {",
      "        while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();",
      "        dq.push_back(i);",
      "        if (dq.front() <= i - k) dq.pop_front();",
      "        if (i >= k - 1) ans.push_back(nums[dq.front()]);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "单调双端队列模板。维护一个单调递减的双端队列 deque（存储下标）：入队时将队尾小于当前元素的全部弹出（及时淘汰不如新元素的旧值）；检查队首是否离开窗口范围（i - k >= dq.front()）；当 i >= k - 1 时队首即为当前窗口最大值。",
    "complexity": "时间 O(n)，空间 O(k)。",
    "pitfalls": [
      "双端队列存下标，方便判断是否过期。"
    ],
    "rating": 2100,
    "hot100": true,
    "slug": "sliding-window-maximum",
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 滑动窗口最大值",
      "desc": "【灵神心法点拨】：单调双端队列模板。维护一个单调递减的双端队列 deque（存储下标）：入队时将队尾小于当前元素的全部弹出（及时淘汰不如新元素的旧值）；检查队首是否离开窗口范围（i - k >= dq.front()）；当 i >= k - 1 时队首即为当前窗口最大值。",
      "code": [
        "vector<int> maxSlidingWindow(vector<int>& nums, int k) {",
        "    deque<int> dq;",
        "    vector<int> ans;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();",
        "        dq.push_back(i);",
        "        if (dq.front() <= i - k) dq.pop_front();",
        "        if (i >= k - 1) ans.push_back(nums[dq.front()]);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 239）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> maxSlidingWindow(vector<int>& nums, int k) {",
        "    deque<int> dq;",
        "    vector<int> ans;",
        "    for (int i = 0; i < nums.size(); ++i) {",
        "        while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();",
        "        dq.push_back(i);",
        "        if (dq.front() <= i - k) dq.pop_front();",
        "        if (i >= k - 1) ans.push_back(nums[dq.front()]);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "gr1",
    "mod": "grid-search",
    "idx": 1,
    "title": "岛屿数量",
    "lc": "LeetCode 200",
    "lcNum": 200,
    "diff": 1,
    "tags": [
      "网格图",
      "DFS",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。",
    "ioIn": "grid：二维字符/整数网格。",
    "ioOut": "返回岛屿总数。",
    "ex": [
      {
        "i": "[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]",
        "o": "1"
      },
      {
        "i": "[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]",
        "o": "3"
      }
    ],
    "params": [
      "[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]",
      "[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]",
      "[[1]]",
      "[[0]]"
    ],
    "sig": "int numIslands(vector<vector<int>>& grid)",
    "template": "void dfs(vector<vector<int>>& grid, int r, int c) {\n    // 越界或水域时返回；否则原地标记并向四周扩散\n}\n\nint numIslands(vector<vector<int>>& grid) {\n    int count = 0;\n    // 遍历所有格子，遇到 1 累加并启动 dfs\n    return count;\n}",
    "hints": [
      "经典网格 DFS：遍历整个二维网格，只要发现陆地 1，岛屿数就加 1。",
      "为了不重复计数，立刻用 DFS 将该陆地连通的所有 1 染成 0（俗称\"沉岛法\"）。",
      "DFS 出口：行或列下标越界，或者当前格值不是 1。"
    ],
    "ref": [
      "int numIslands(vector<vector<char>>& grid) {",
      "    int m = grid.size(), n = grid[0].size(), count = 0;",
      "    auto dfs = [&](auto self, int r, int c) -> void {",
      "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;",
      "        grid[r][c] = '0';",
      "        self(self, r + 1, c); self(self, r - 1, c);",
      "        self(self, r, c + 1); self(self, r, c - 1);",
      "    };",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (grid[i][j] == '1') { count++; dfs(dfs, i, j); }",
      "        }",
      "    }",
      "    return count;",
      "}"
    ],
    "note": "网格图连通块搜索母题。遍历矩阵，每当遇到 '1' 则岛屿计数加一，并启动 DFS/BFS 将与该陆地四方向相连的所有 '1' 淹没（直接修改为 '0' 免开额外 visited 数组）。",
    "complexity": "时间 O(m * n)，空间 O(m * n)（递归栈深度）。",
    "pitfalls": [
      "递归必须有越界检查与是否为 '1' 的剪枝；注意行列坐标 (r, c) 范围。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "number-of-islands",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 岛屿数量",
      "desc": "【灵神心法点拨】：网格图连通块搜索母题。遍历矩阵，每当遇到 '1' 则岛屿计数加一，并启动 DFS/BFS 将与该陆地四方向相连的所有 '1' 淹没（直接修改为 '0' 免开额外 visited 数组）。",
      "code": [
        "int numIslands(vector<vector<char>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), count = 0;",
        "    auto dfs = [&](auto self, int r, int c) -> void {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;",
        "        grid[r][c] = '0';",
        "        self(self, r + 1, c); self(self, r - 1, c);",
        "        self(self, r, c + 1); self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == '1') { count++; dfs(dfs, i, j); }",
        "        }",
        "    }",
        "    return count;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 200）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int numIslands(vector<vector<char>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), count = 0;",
        "    auto dfs = [&](auto self, int r, int c) -> void {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;",
        "        grid[r][c] = '0';",
        "        self(self, r + 1, c); self(self, r - 1, c);",
        "        self(self, r, c + 1); self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == '1') { count++; dfs(dfs, i, j); }",
        "        }",
        "    }",
        "    return count;",
        "}"
      ]
    }
  },
  {
    "id": "p_695",
    "mod": "grid-search",
    "idx": 2,
    "title": "岛屿的最大面积",
    "lc": "LeetCode 695",
    "lcNum": 695,
    "diff": 1,
    "tags": [
      "网格图",
      "DFS"
    ],
    "by": "return",
    "brief": "给你一个大小为 m x n 的二进制矩阵 grid 。岛屿是由一些相邻的 1 (代表土地) 构成的组合。计算并返回 grid 中最大的岛屿面积。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[0,0,1,0],[1,1,0,0],[0,1,1,1]]",
      "[[0,0,1,1],[1,1,1,1],[0,0,1,1]]"
    ],
    "sig": "// LeetCode 695 函数签名",
    "template": "// LeetCode 695 岛屿的最大面积\n",
    "hints": [
      "与岛屿数量类似，DFS 返回以 (r, c) 为起点的连通块大小。递归式为：当前格子贡献 1 + 四方向相邻土地面积总和。访问过的格子置为 0。"
    ],
    "ref": [
      "int maxAreaOfIsland(vector<vector<int>>& grid) {",
      "    int m = grid.size(), n = grid[0].size(), maxArea = 0;",
      "    auto dfs = [&](auto self, int r, int c) -> int {",
      "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != 1) return 0;",
      "        grid[r][c] = 0;",
      "        return 1 + self(self, r + 1, c) + self(self, r - 1, c) + self(self, r, c + 1) + self(self, r, c - 1);",
      "    };",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (grid[i][j] == 1) maxArea = max(maxArea, dfs(dfs, i, j));",
      "        }",
      "    }",
      "    return maxArea;",
      "}"
    ],
    "note": "与岛屿数量类似，DFS 返回以 (r, c) 为起点的连通块大小。递归式为：当前格子贡献 1 + 四方向相邻土地面积总和。访问过的格子置为 0。",
    "complexity": "时间 O(m * n)，空间 O(m * n)。",
    "pitfalls": [
      "访问后立即标记为 0，防止重复访问死循环。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "max-area-of-island",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 岛屿的最大面积",
      "desc": "【灵神心法点拨】：与岛屿数量类似，DFS 返回以 (r, c) 为起点的连通块大小。递归式为：当前格子贡献 1 + 四方向相邻土地面积总和。访问过的格子置为 0。",
      "code": [
        "int maxAreaOfIsland(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), maxArea = 0;",
        "    auto dfs = [&](auto self, int r, int c) -> int {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != 1) return 0;",
        "        grid[r][c] = 0;",
        "        return 1 + self(self, r + 1, c) + self(self, r - 1, c) + self(self, r, c + 1) + self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 1) maxArea = max(maxArea, dfs(dfs, i, j));",
        "        }",
        "    }",
        "    return maxArea;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 695）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxAreaOfIsland(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), maxArea = 0;",
        "    auto dfs = [&](auto self, int r, int c) -> int {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != 1) return 0;",
        "        grid[r][c] = 0;",
        "        return 1 + self(self, r + 1, c) + self(self, r - 1, c) + self(self, r, c + 1) + self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 1) maxArea = max(maxArea, dfs(dfs, i, j));",
        "        }",
        "    }",
        "    return maxArea;",
        "}"
      ]
    }
  },
  {
    "id": "p_463",
    "mod": "grid-search",
    "idx": 3,
    "title": "岛屿的周长",
    "lc": "LeetCode 463",
    "lcNum": 463,
    "diff": 1,
    "tags": [
      "网格图",
      "数学"
    ],
    "by": "return",
    "brief": "给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地。求岛屿的周长。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,1,1,0],[1,1,0,1],[1,1,0,0]]",
      "[[1,0,0,1],[1,1,1,1],[1,1,0,0]]"
    ],
    "sig": "// LeetCode 463 函数签名",
    "template": "// LeetCode 463 岛屿的周长\n",
    "hints": [
      "每个陆地格子默认有 4 条边。遍历矩阵中的每个陆地格子，若其四邻域超出边界或是水域，则贡献 1 条边；或者公式法：周长 = 4 * 陆地数 - 2 * (相邻陆地对数)。"
    ],
    "ref": [
      "int islandPerimeter(vector<vector<int>>& grid) {",
      "    int m = grid.size(), n = grid[0].size(), ans = 0;",
      "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (grid[i][j] == 1) {",
      "                for (auto& d : dirs) {",
      "                    int ni = i + d[0], nj = j + d[1];",
      "                    if (ni < 0 || ni >= m || nj < 0 || nj >= n || grid[ni][nj] == 0) ans++;",
      "                }",
      "            }",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "每个陆地格子默认有 4 条边。遍历矩阵中的每个陆地格子，若其四邻域超出边界或是水域，则贡献 1 条边；或者公式法：周长 = 4 * 陆地数 - 2 * (相邻陆地对数)。",
    "complexity": "时间 O(m * n)，空间 O(1)。",
    "pitfalls": [
      "边界外的方向直接算作周长边。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "island-perimeter",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 岛屿的周长",
      "desc": "【灵神心法点拨】：每个陆地格子默认有 4 条边。遍历矩阵中的每个陆地格子，若其四邻域超出边界或是水域，则贡献 1 条边；或者公式法：周长 = 4 * 陆地数 - 2 * (相邻陆地对数)。",
      "code": [
        "int islandPerimeter(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), ans = 0;",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 1) {",
        "                for (auto& d : dirs) {",
        "                    int ni = i + d[0], nj = j + d[1];",
        "                    if (ni < 0 || ni >= m || nj < 0 || nj >= n || grid[ni][nj] == 0) ans++;",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 463）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int islandPerimeter(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), ans = 0;",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 1) {",
        "                for (auto& d : dirs) {",
        "                    int ni = i + d[0], nj = j + d[1];",
        "                    if (ni < 0 || ni >= m || nj < 0 || nj >= n || grid[ni][nj] == 0) ans++;",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_130",
    "mod": "grid-search",
    "idx": 4,
    "title": "被围绕的区域",
    "lc": "LeetCode 130",
    "lcNum": 130,
    "diff": 1,
    "tags": [
      "网格图",
      "DFS",
      "边界扩散"
    ],
    "by": "return",
    "brief": "给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' 组成，捕获所有被围绕的区域：找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[0,1,0,0],[1,0,1,0],[1,0,0,0]]",
      "[[0,1,0,1],[0,0,1,1],[0,1,0,0]]"
    ],
    "sig": "// LeetCode 130 函数签名",
    "template": "// LeetCode 130 被围绕的区域\n",
    "hints": [
      "【正难则反】：任何与矩阵四条边连通的 'O' 都不能被捕获！先从四条边界的所有 'O' 出发做 DFS，将其标记为暂存字符 '#'；随后遍历整个矩阵，将剩余的 'O' 替换为 'X'（被完全包围），将 '#' 恢复为 'O'。"
    ],
    "ref": [
      "void solve(vector<vector<char>>& board) {",
      "    int m = board.size(), n = board[0].size();",
      "    auto dfs = [&](auto self, int r, int c) -> void {",
      "        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != 'O') return;",
      "        board[r][c] = '#';",
      "        self(self, r + 1, c); self(self, r - 1, c);",
      "        self(self, r, c + 1); self(self, r, c - 1);",
      "    };",
      "    for (int i = 0; i < m; ++i) {",
      "        if (board[i][0] == 'O') dfs(dfs, i, 0);",
      "        if (board[i][n - 1] == 'O') dfs(dfs, i, n - 1);",
      "    }",
      "    for (int j = 0; j < n; ++j) {",
      "        if (board[0][j] == 'O') dfs(dfs, 0, j);",
      "        if (board[m - 1][j] == 'O') dfs(dfs, m - 1, j);",
      "    }",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (board[i][j] == '#') board[i][j] = 'O';",
      "            else if (board[i][j] == 'O') board[i][j] = 'X';",
      "        }",
      "    }",
      "}"
    ],
    "note": "【正难则反】：任何与矩阵四条边连通的 'O' 都不能被捕获！先从四条边界的所有 'O' 出发做 DFS，将其标记为暂存字符 '#'；随后遍历整个矩阵，将剩余的 'O' 替换为 'X'（被完全包围），将 '#' 恢复为 'O'。",
    "complexity": "时间 O(m * n)，空间 O(m * n)。",
    "pitfalls": [
      "注意必须从四条外边界上的 'O' 发起搜索。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "surrounded-regions",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 被围绕的区域",
      "desc": "【灵神心法点拨】：【正难则反】：任何与矩阵四条边连通的 'O' 都不能被捕获！先从四条边界的所有 'O' 出发做 DFS，将其标记为暂存字符 '#'；随后遍历整个矩阵，将剩余的 'O' 替换为 'X'（被完全包围），将 '#' 恢复为 'O'。",
      "code": [
        "void solve(vector<vector<char>>& board) {",
        "    int m = board.size(), n = board[0].size();",
        "    auto dfs = [&](auto self, int r, int c) -> void {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != 'O') return;",
        "        board[r][c] = '#';",
        "        self(self, r + 1, c); self(self, r - 1, c);",
        "        self(self, r, c + 1); self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        if (board[i][0] == 'O') dfs(dfs, i, 0);",
        "        if (board[i][n - 1] == 'O') dfs(dfs, i, n - 1);",
        "    }",
        "    for (int j = 0; j < n; ++j) {",
        "        if (board[0][j] == 'O') dfs(dfs, 0, j);",
        "        if (board[m - 1][j] == 'O') dfs(dfs, m - 1, j);",
        "    }",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (board[i][j] == '#') board[i][j] = 'O';",
        "            else if (board[i][j] == 'O') board[i][j] = 'X';",
        "        }",
        "    }",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 130）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "void solve(vector<vector<char>>& board) {",
        "    int m = board.size(), n = board[0].size();",
        "    auto dfs = [&](auto self, int r, int c) -> void {",
        "        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != 'O') return;",
        "        board[r][c] = '#';",
        "        self(self, r + 1, c); self(self, r - 1, c);",
        "        self(self, r, c + 1); self(self, r, c - 1);",
        "    };",
        "    for (int i = 0; i < m; ++i) {",
        "        if (board[i][0] == 'O') dfs(dfs, i, 0);",
        "        if (board[i][n - 1] == 'O') dfs(dfs, i, n - 1);",
        "    }",
        "    for (int j = 0; j < n; ++j) {",
        "        if (board[0][j] == 'O') dfs(dfs, 0, j);",
        "        if (board[m - 1][j] == 'O') dfs(dfs, m - 1, j);",
        "    }",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (board[i][j] == '#') board[i][j] = 'O';",
        "            else if (board[i][j] == 'O') board[i][j] = 'X';",
        "        }",
        "    }",
        "}"
      ]
    }
  },
  {
    "id": "p_994",
    "mod": "grid-search",
    "idx": 5,
    "title": "腐烂的橘子",
    "lc": "LeetCode 994",
    "lcNum": 994,
    "diff": 1,
    "tags": [
      "多源BFS",
      "Hot100"
    ],
    "by": "return",
    "brief": "值 0 代表空单元格；值 1 代表新鲜橘子；值 2 代表腐烂的橘子。每分钟腐烂的橘子周围 4 个方向的新鲜橘子都会腐烂。返回直到单元格中没有新鲜橘子为止所经过的最小分钟数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,0,1,1],[1,1,1,1],[1,0,0,1]]",
      "[[1,1,0,1],[1,0,0,0],[1,1,1,1]]"
    ],
    "sig": "// LeetCode 994 函数签名",
    "template": "// LeetCode 994 腐烂的橘子\n",
    "hints": [
      "多源 BFS 经典母题。将初始所有腐烂的橘子 (2) 一齐入队，并统计新鲜橘子的总数 fresh。按层遍历队列扩散，每扩散一层分钟数加一并扣减 fresh。最终若 fresh == 0 返回总分钟数，否则返回 -1。"
    ],
    "ref": [
      "int orangesRotting(vector<vector<int>>& grid) {",
      "    int m = grid.size(), n = grid[0].size(), fresh = 0;",
      "    queue<pair<int, int>> q;",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (grid[i][j] == 2) q.push({i, j});",
      "            else if (grid[i][j] == 1) fresh++;",
      "        }",
      "    }",
      "    if (fresh == 0) return 0;",
      "    int minutes = -1, dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
      "    while (!q.empty()) {",
      "        int sz = q.size();",
      "        minutes++;",
      "        while (sz--) {",
      "            auto [r, c] = q.front(); q.pop();",
      "            for (auto& d : dirs) {",
      "                int nr = r + d[0], nc = c + d[1];",
      "                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {",
      "                    grid[nr][nc] = 2; fresh--;",
      "                    q.push({nr, nc});",
      "                }",
      "            }",
      "        }",
      "    }",
      "    return fresh == 0 ? minutes : -1;",
      "}"
    ],
    "note": "多源 BFS 经典母题。将初始所有腐烂的橘子 (2) 一齐入队，并统计新鲜橘子的总数 fresh。按层遍历队列扩散，每扩散一层分钟数加一并扣减 fresh。最终若 fresh == 0 返回总分钟数，否则返回 -1。",
    "complexity": "时间 O(m * n)，空间 O(m * n)。",
    "pitfalls": [
      "如果一开始 fresh == 0，直接返回 0。"
    ],
    "rating": 1450,
    "hot100": true,
    "slug": "rotting-oranges",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 腐烂的橘子",
      "desc": "【灵神心法点拨】：多源 BFS 经典母题。将初始所有腐烂的橘子 (2) 一齐入队，并统计新鲜橘子的总数 fresh。按层遍历队列扩散，每扩散一层分钟数加一并扣减 fresh。最终若 fresh == 0 返回总分钟数，否则返回 -1。",
      "code": [
        "int orangesRotting(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), fresh = 0;",
        "    queue<pair<int, int>> q;",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 2) q.push({i, j});",
        "            else if (grid[i][j] == 1) fresh++;",
        "        }",
        "    }",
        "    if (fresh == 0) return 0;",
        "    int minutes = -1, dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!q.empty()) {",
        "        int sz = q.size();",
        "        minutes++;",
        "        while (sz--) {",
        "            auto [r, c] = q.front(); q.pop();",
        "            for (auto& d : dirs) {",
        "                int nr = r + d[0], nc = c + d[1];",
        "                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {",
        "                    grid[nr][nc] = 2; fresh--;",
        "                    q.push({nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return fresh == 0 ? minutes : -1;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 994）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int orangesRotting(vector<vector<int>>& grid) {",
        "    int m = grid.size(), n = grid[0].size(), fresh = 0;",
        "    queue<pair<int, int>> q;",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (grid[i][j] == 2) q.push({i, j});",
        "            else if (grid[i][j] == 1) fresh++;",
        "        }",
        "    }",
        "    if (fresh == 0) return 0;",
        "    int minutes = -1, dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!q.empty()) {",
        "        int sz = q.size();",
        "        minutes++;",
        "        while (sz--) {",
        "            auto [r, c] = q.front(); q.pop();",
        "            for (auto& d : dirs) {",
        "                int nr = r + d[0], nc = c + d[1];",
        "                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {",
        "                    grid[nr][nc] = 2; fresh--;",
        "                    q.push({nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return fresh == 0 ? minutes : -1;",
        "}"
      ]
    }
  },
  {
    "id": "p_542",
    "mod": "grid-search",
    "idx": 6,
    "title": "01 矩阵",
    "lc": "LeetCode 542",
    "lcNum": 542,
    "diff": 2,
    "tags": [
      "多源BFS",
      "矩阵"
    ],
    "by": "return",
    "brief": "给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,0,0,1],[0,1,1,1],[1,0,0,1]]",
      "[[0,1,0,0],[1,1,0,0],[0,1,0,0]]"
    ],
    "sig": "// LeetCode 542 函数签名",
    "template": "// LeetCode 542 01 矩阵\n",
    "hints": [
      "多源 BFS：从所有 0 出发向外扩散寻找 1！初始化距离矩阵，所有 0 的距离为 0 并入队，所有 1 的距离设为 -1。从队列中不断弹出坐标向四方向拓展，若邻居为 -1 则 dist[nr][nc] = dist[r][c] + 1 并入队。"
    ],
    "ref": [
      "vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {",
      "    int m = mat.size(), n = mat[0].size();",
      "    vector<vector<int>> dist(m, vector<int>(n, -1));",
      "    queue<pair<int, int>> q;",
      "    for (int i = 0; i < m; ++i) {",
      "        for (int j = 0; j < n; ++j) {",
      "            if (mat[i][j] == 0) { dist[i][j] = 0; q.push({i, j}); }",
      "        }",
      "    }",
      "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
      "    while (!q.empty()) {",
      "        auto [r, c] = q.front(); q.pop();",
      "        for (auto& d : dirs) {",
      "            int nr = r + d[0], nc = c + d[1];",
      "            if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {",
      "                dist[nr][nc] = dist[r][c] + 1;",
      "                q.push({nr, nc});",
      "            }",
      "        }",
      "    }",
      "    return dist;",
      "}"
    ],
    "note": "多源 BFS：从所有 0 出发向外扩散寻找 1！初始化距离矩阵，所有 0 的距离为 0 并入队，所有 1 的距离设为 -1。从队列中不断弹出坐标向四方向拓展，若邻居为 -1 则 dist[nr][nc] = dist[r][c] + 1 并入队。",
    "complexity": "时间 O(m * n)，空间 O(m * n)。",
    "pitfalls": [
      "从 0 找 1 比从 1 找 0 复杂度低得多（只需一次全源 BFS）。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "01-matrix",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 01 矩阵",
      "desc": "【灵神心法点拨】：多源 BFS：从所有 0 出发向外扩散寻找 1！初始化距离矩阵，所有 0 的距离为 0 并入队，所有 1 的距离设为 -1。从队列中不断弹出坐标向四方向拓展，若邻居为 -1 则 dist[nr][nc] = dist[r][c] + 1 并入队。",
      "code": [
        "vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {",
        "    int m = mat.size(), n = mat[0].size();",
        "    vector<vector<int>> dist(m, vector<int>(n, -1));",
        "    queue<pair<int, int>> q;",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (mat[i][j] == 0) { dist[i][j] = 0; q.push({i, j}); }",
        "        }",
        "    }",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!q.empty()) {",
        "        auto [r, c] = q.front(); q.pop();",
        "        for (auto& d : dirs) {",
        "            int nr = r + d[0], nc = c + d[1];",
        "            if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {",
        "                dist[nr][nc] = dist[r][c] + 1;",
        "                q.push({nr, nc});",
        "            }",
        "        }",
        "    }",
        "    return dist;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 542）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {",
        "    int m = mat.size(), n = mat[0].size();",
        "    vector<vector<int>> dist(m, vector<int>(n, -1));",
        "    queue<pair<int, int>> q;",
        "    for (int i = 0; i < m; ++i) {",
        "        for (int j = 0; j < n; ++j) {",
        "            if (mat[i][j] == 0) { dist[i][j] = 0; q.push({i, j}); }",
        "        }",
        "    }",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!q.empty()) {",
        "        auto [r, c] = q.front(); q.pop();",
        "        for (auto& d : dirs) {",
        "            int nr = r + d[0], nc = c + d[1];",
        "            if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {",
        "                dist[nr][nc] = dist[r][c] + 1;",
        "                q.push({nr, nc});",
        "            }",
        "        }",
        "    }",
        "    return dist;",
        "}"
      ]
    }
  },
  {
    "id": "p_1091",
    "mod": "grid-search",
    "idx": 7,
    "title": "二进制矩阵中的最短路径",
    "lc": "LeetCode 1091",
    "lcNum": 1091,
    "diff": 1,
    "tags": [
      "BFS",
      "八连通"
    ],
    "by": "return",
    "brief": "给你一个 n x n 的二进制矩阵 grid（0 表示畅通，1 表示障碍）。返回从左上角 (0, 0) 到右下角 (n - 1, n - 1) 的最短畅通路径的长度（八连通）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,0,0,1],[1,0,1,0],[1,0,0,1]]",
      "[[0,1,0,0],[1,1,0,1],[0,1,1,1]]"
    ],
    "sig": "// LeetCode 1091 函数签名",
    "template": "// LeetCode 1091 二进制矩阵中的最短路径\n",
    "hints": [
      "网格图单源 BFS 最短路。注意是 8 个方向（包括对角线）。队列记录坐标与步数，从 (0, 0) 开始向 8 个邻居扩展，访问过的点立即标记为 1 避免重复入队。"
    ],
    "ref": [
      "int shortestPathBinaryMatrix(vector<vector<int>>& grid) {",
      "    int n = grid.size();",
      "    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;",
      "    if (n == 1) return 1;",
      "    queue<pair<int, int>> q;",
      "    q.push({0, 0}); grid[0][0] = 1;",
      "    int step = 1;",
      "    int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};",
      "    while (!q.empty()) {",
      "        int sz = q.size(); step++;",
      "        while (sz--) {",
      "            auto [r, c] = q.front(); q.pop();",
      "            for (auto& d : dirs) {",
      "                int nr = r + d[0], nc = c + d[1];",
      "                if (nr == n - 1 && nc == n - 1) return step;",
      "                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {",
      "                    grid[nr][nc] = 1; q.push({nr, nc});",
      "                }",
      "            }",
      "        }",
      "    }",
      "    return -1;",
      "}"
    ],
    "note": "网格图单源 BFS 最短路。注意是 8 个方向（包括对角线）。队列记录坐标与步数，从 (0, 0) 开始向 8 个邻居扩展，访问过的点立即标记为 1 避免重复入队。",
    "complexity": "时间 O(n^2)，空间 O(n^2)。",
    "pitfalls": [
      "必须检查起点 grid[0][0] 和终点 grid[n-1][n-1] 是否为 1，若为 1 直接返回 -1。"
    ],
    "rating": 1458,
    "hot100": false,
    "slug": "shortest-path-in-binary-matrix",
    "lingshen": {
      "name": "灵神方向数组沉没法 / 多源拓扑扩散 · 二进制矩阵中的最短路径",
      "desc": "【灵神心法点拨】：网格图单源 BFS 最短路。注意是 8 个方向（包括对角线）。队列记录坐标与步数，从 (0, 0) 开始向 8 个邻居扩展，访问过的点立即标记为 1 避免重复入队。",
      "code": [
        "int shortestPathBinaryMatrix(vector<vector<int>>& grid) {",
        "    int n = grid.size();",
        "    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;",
        "    if (n == 1) return 1;",
        "    queue<pair<int, int>> q;",
        "    q.push({0, 0}); grid[0][0] = 1;",
        "    int step = 1;",
        "    int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};",
        "    while (!q.empty()) {",
        "        int sz = q.size(); step++;",
        "        while (sz--) {",
        "            auto [r, c] = q.front(); q.pop();",
        "            for (auto& d : dirs) {",
        "                int nr = r + d[0], nc = c + d[1];",
        "                if (nr == n - 1 && nc == n - 1) return step;",
        "                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {",
        "                    grid[nr][nc] = 1; q.push({nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return -1;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1091）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int shortestPathBinaryMatrix(vector<vector<int>>& grid) {",
        "    int n = grid.size();",
        "    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;",
        "    if (n == 1) return 1;",
        "    queue<pair<int, int>> q;",
        "    q.push({0, 0}); grid[0][0] = 1;",
        "    int step = 1;",
        "    int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};",
        "    while (!q.empty()) {",
        "        int sz = q.size(); step++;",
        "        while (sz--) {",
        "            auto [r, c] = q.front(); q.pop();",
        "            for (auto& d : dirs) {",
        "                int nr = r + d[0], nc = c + d[1];",
        "                if (nr == n - 1 && nc == n - 1) return step;",
        "                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {",
        "                    grid[nr][nc] = 1; q.push({nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return -1;",
        "}"
      ]
    }
  },
  {
    "id": "l1",
    "mod": "tree-backtrack",
    "idx": 1,
    "title": "反转链表",
    "lc": "LeetCode 206",
    "lcNum": 206,
    "diff": 1,
    "tags": [
      "链表",
      "双指针",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。",
    "ioIn": "head：链表头节点，节点值都是整数。",
    "ioOut": "返回反转后的新头节点。",
    "ex": [
      {
        "i": "[1,2,3,4]",
        "o": "[4,3,2,1]"
      },
      {
        "i": "[]",
        "o": "[]"
      }
    ],
    "params": [
      "[1,2,3,4]",
      "[1,2]",
      "[1]",
      "[]"
    ],
    "sig": "ListNode* reverseList(ListNode* head)",
    "template": "ListNode* reverseList(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "反转的本质：让每个节点的 next 指向它前面的节点，而不是后面的。",
      "需要一个 prev 记住\"已经反转好的那一段的头\"，初始是 nullptr；再准备 cur 从 head 出发。",
      "关键一步是先存 nxt = cur->next 再改 cur->next，否则链就断了 —— 这是新手最容易踩的坑。"
    ],
    "ref": [
      "ListNode* reverseList(ListNode* head) {",
      "    ListNode* prev = nullptr;",
      "    ListNode* cur = head;",
      "    while (cur != nullptr) {",
      "        ListNode* nxt = cur->next;",
      "        cur->next = prev;",
      "        prev = cur;",
      "        cur = nxt;",
      "    }",
      "    return prev;",
      "}"
    ],
    "note": "双指针经典迭代法：维护 prev = nullptr 和 cur = head。在循环中，先用 nxt 暂存 cur->next，然后反转指针 cur->next = prev，随后向后平移 prev = cur, cur = nxt。遍历结束返回 prev。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "必须先存好 nxt = cur->next，否则反转后链表断裂无法继续遍历。"
    ],
    "rating": 1000,
    "hot100": true,
    "slug": "reverse-linked-list",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 反转链表",
      "desc": "【灵神心法点拨】：双指针经典迭代法：维护 prev = nullptr 和 cur = head。在循环中，先用 nxt 暂存 cur->next，然后反转指针 cur->next = prev，随后向后平移 prev = cur, cur = nxt。遍历结束返回 prev。",
      "code": [
        "ListNode* reverseList(ListNode* head) {",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    return prev;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 206）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* reverseList(ListNode* head) {",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    return prev;",
        "}"
      ]
    }
  },
  {
    "id": "a1",
    "mod": "tree-backtrack",
    "idx": 2,
    "title": "反转链表 II",
    "lc": "LeetCode 92",
    "lcNum": 92,
    "diff": 1,
    "tags": [
      "链表",
      "区间反转"
    ],
    "by": "return",
    "brief": "给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回反转后的链表。",
    "ioIn": "head：链表；left、right：区间端点（1 ≤ left ≤ right ≤ 长度）。",
    "ioOut": "返回反转后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,4,5] | 2 | 4",
        "o": "[1,4,3,2,5]"
      }
    ],
    "params": [
      "[1,2,3,4,5] | 2 | 4",
      "[5] | 1 | 1",
      "[3,5] | 1 | 2"
    ],
    "sig": "ListNode* reverseBetween(ListNode* head, int left, int right)",
    "template": "ListNode* reverseBetween(ListNode* head, int left, int right) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "先用哑节点，再走 left-1 步到\"区间前一个节点\" pre，区间从 pre->next 开始。",
      "不需要整段反转后再接回去，可以头插：每次把区间里当前的 cur 后面那个节点摘下来，插到 pre 后面。",
      "执行 right-left 次就够了。"
    ],
    "ref": [
      "ListNode* reverseBetween(ListNode* head, int left, int right) {",
      "    ListNode dummy(0, head);",
      "    ListNode* p0 = &dummy;",
      "    for (int i = 0; i < left - 1; ++i) p0 = p0->next;",
      "    ListNode* prev = nullptr;",
      "    ListNode* cur = p0->next;",
      "    for (int i = 0; i < right - left + 1; ++i) {",
      "        ListNode* nxt = cur->next;",
      "        cur->next = prev;",
      "        prev = cur;",
      "        cur = nxt;",
      "    }",
      "    p0->next->next = cur;",
      "    p0->next = prev;",
      "    return dummy.next;",
      "}"
    ],
    "note": "使用虚拟头节点 dummy 简化 left = 1 的边界情况。找到待反转区间的前驱节点 p0，随后在 [left, right] 内部进行局部反转，最后将 p0->next 和内部反转后的尾节点重新拼接。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "哨兵节点 dummy->next = head 能统一 left = 1 时头节点改变的处理。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "reverse-linked-list-ii",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 反转链表 II",
      "desc": "【灵神心法点拨】：使用虚拟头节点 dummy 简化 left = 1 的边界情况。找到待反转区间的前驱节点 p0，随后在 [left, right] 内部进行局部反转，最后将 p0->next 和内部反转后的尾节点重新拼接。",
      "code": [
        "ListNode* reverseBetween(ListNode* head, int left, int right) {",
        "    ListNode dummy(0, head);",
        "    ListNode* p0 = &dummy;",
        "    for (int i = 0; i < left - 1; ++i) p0 = p0->next;",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = p0->next;",
        "    for (int i = 0; i < right - left + 1; ++i) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    p0->next->next = cur;",
        "    p0->next = prev;",
        "    return dummy.next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 92）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* reverseBetween(ListNode* head, int left, int right) {",
        "    ListNode dummy(0, head);",
        "    ListNode* p0 = &dummy;",
        "    for (int i = 0; i < left - 1; ++i) p0 = p0->next;",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = p0->next;",
        "    for (int i = 0; i < right - left + 1; ++i) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    p0->next->next = cur;",
        "    p0->next = prev;",
        "    return dummy.next;",
        "}"
      ]
    }
  },
  {
    "id": "p_141",
    "mod": "tree-backtrack",
    "idx": 3,
    "title": "环形链表",
    "lc": "LeetCode 141",
    "lcNum": 141,
    "diff": 1,
    "tags": [
      "快慢指针",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个链表的头节点 head ，判断链表中是否有环。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[7,5,3,3,4]",
      "[2,5,9,7,5]"
    ],
    "sig": "// LeetCode 141 函数签名",
    "template": "// LeetCode 141 环形链表\n",
    "hints": [
      "快慢指针判环母题（Floyd 判圈算法）：slow 每次走一步，fast 每次走两步。若链表无环，fast 最终会到达 nullptr；若有环，fast 必然在环内以相对速度 1 追赶上 slow 并相遇。"
    ],
    "ref": [
      "bool hasCycle(ListNode *head) {",
      "    ListNode *slow = head, *fast = head;",
      "    while (fast != nullptr && fast->next != nullptr) {",
      "        slow = slow->next;",
      "        fast = fast->next->next;",
      "        if (slow == fast) return true;",
      "    }",
      "    return false;",
      "}"
    ],
    "note": "快慢指针判环母题（Floyd 判圈算法）：slow 每次走一步，fast 每次走两步。若链表无环，fast 最终会到达 nullptr；若有环，fast 必然在环内以相对速度 1 追赶上 slow 并相遇。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "循环条件必须是 fast != nullptr && fast->next != nullptr。"
    ],
    "rating": 1150,
    "hot100": true,
    "slug": "linked-list-cycle",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 环形链表",
      "desc": "【灵神心法点拨】：快慢指针判环母题（Floyd 判圈算法）：slow 每次走一步，fast 每次走两步。若链表无环，fast 最终会到达 nullptr；若有环，fast 必然在环内以相对速度 1 追赶上 slow 并相遇。",
      "code": [
        "bool hasCycle(ListNode *head) {",
        "    ListNode *slow = head, *fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "        if (slow == fast) return true;",
        "    }",
        "    return false;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 141）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool hasCycle(ListNode *head) {",
        "    ListNode *slow = head, *fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "        if (slow == fast) return true;",
        "    }",
        "    return false;",
        "}"
      ]
    }
  },
  {
    "id": "p_142",
    "mod": "tree-backtrack",
    "idx": 4,
    "title": "环形链表 II",
    "lc": "LeetCode 142",
    "lcNum": 142,
    "diff": 1,
    "tags": [
      "快慢指针",
      "数学",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个链表的头节点 head ，返回链表开始入环的第一个节点。如果链表无环，则返回 null。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "2",
      "1"
    ],
    "sig": "// LeetCode 142 函数签名",
    "template": "// LeetCode 142 环形链表 II\n",
    "hints": [
      "数学推导：设头到环入口距离为 a，环内入口到相遇点为 b，剩余环长为 c。快指针路程 2(a+b) = a+b+k(b+c) => a = c + (k-1)(b+c)。因此相遇后，将 slow 重置回 head，两指针同速走 a 步必在入口处相遇。"
    ],
    "ref": [
      "ListNode *detectCycle(ListNode *head) {",
      "    ListNode *slow = head, *fast = head;",
      "    while (fast != nullptr && fast->next != nullptr) {",
      "        slow = slow->next;",
      "        fast = fast->next->next;",
      "        if (slow == fast) {",
      "            ListNode *p = head;",
      "            while (p != slow) { p = p->next; slow = slow->next; }",
      "            return p;",
      "        }",
      "    }",
      "    return nullptr;",
      "}"
    ],
    "note": "数学推导：设头到环入口距离为 a，环内入口到相遇点为 b，剩余环长为 c。快指针路程 2(a+b) = a+b+k(b+c) => a = c + (k-1)(b+c)。因此相遇后，将 slow 重置回 head，两指针同速走 a 步必在入口处相遇。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "找到快慢相遇点后，必须将其中一个指针放回 head，然后两指针每次走一步。"
    ],
    "rating": 1450,
    "hot100": true,
    "slug": "linked-list-cycle-ii",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 环形链表 II",
      "desc": "【灵神心法点拨】：数学推导：设头到环入口距离为 a，环内入口到相遇点为 b，剩余环长为 c。快指针路程 2(a+b) = a+b+k(b+c) => a = c + (k-1)(b+c)。因此相遇后，将 slow 重置回 head，两指针同速走 a 步必在入口处相遇。",
      "code": [
        "ListNode *detectCycle(ListNode *head) {",
        "    ListNode *slow = head, *fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "        if (slow == fast) {",
        "            ListNode *p = head;",
        "            while (p != slow) { p = p->next; slow = slow->next; }",
        "            return p;",
        "        }",
        "    }",
        "    return nullptr;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 142）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode *detectCycle(ListNode *head) {",
        "    ListNode *slow = head, *fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "        if (slow == fast) {",
        "            ListNode *p = head;",
        "            while (p != slow) { p = p->next; slow = slow->next; }",
        "            return p;",
        "        }",
        "    }",
        "    return nullptr;",
        "}"
      ]
    }
  },
  {
    "id": "l2",
    "mod": "tree-backtrack",
    "idx": 5,
    "title": "合并两个有序链表",
    "lc": "LeetCode 21",
    "lcNum": 21,
    "diff": 1,
    "tags": [
      "链表",
      "双指针",
      "Hot100"
    ],
    "by": "return",
    "brief": "将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。",
    "ioIn": "a、b：两个升序链表头节点。",
    "ioOut": "返回合并后的新头节点。",
    "ex": [
      {
        "i": "[1,3,5] | [2,4,6]",
        "o": "[1,2,3,4,5,6]"
      }
    ],
    "params": [
      "[1,3,5] | [2,4,6]",
      "[] | [1]",
      "[1,2] | []",
      "[1] | [2]"
    ],
    "sig": "ListNode* mergeTwoLists(ListNode* a, ListNode* b)",
    "template": "ListNode* mergeTwoLists(ListNode* a, ListNode* b) {\n    // 你的代码\n    return a ? a : b;\n}",
    "hints": [
      "两条链各有一个游标，每次比较两个头，谁小就把谁接到结果链尾。",
      "用哑节点 ListNode dummy(0) 让\"结果链的头\"不需要特判，最后返回 dummy.next。",
      "一条链走完后，把另一条剩下的整段直接接上，不要再循环。"
    ],
    "ref": [
      "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {",
      "    ListNode dummy(0);",
      "    ListNode* tail = &dummy;",
      "    while (list1 && list2) {",
      "        if (list1->val < list2->val) { tail->next = list1; list1 = list1->next; }",
      "        else { tail->next = list2; list2 = list2->next; }",
      "        tail = tail->next;",
      "    }",
      "    tail->next = list1 ? list1 : list2;",
      "    return dummy.next;",
      "}"
    ],
    "note": "双指针与哑节点：创建 dummy 节点。遍历比较 list1 与 list2 当前节点的值，较小者接入 tail->next 并移动对应链表指针。最后将未遍历完的一条链表直接接在尾部。",
    "complexity": "时间 O(n + m)，空间 O(1)。",
    "pitfalls": [
      "退出 while 循环后，直接接入非空的那条链表尾部。"
    ],
    "rating": 1050,
    "hot100": true,
    "slug": "merge-two-sorted-lists",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 合并两个有序链表",
      "desc": "【灵神心法点拨】：双指针与哑节点：创建 dummy 节点。遍历比较 list1 与 list2 当前节点的值，较小者接入 tail->next 并移动对应链表指针。最后将未遍历完的一条链表直接接在尾部。",
      "code": [
        "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {",
        "    ListNode dummy(0);",
        "    ListNode* tail = &dummy;",
        "    while (list1 && list2) {",
        "        if (list1->val < list2->val) { tail->next = list1; list1 = list1->next; }",
        "        else { tail->next = list2; list2 = list2->next; }",
        "        tail = tail->next;",
        "    }",
        "    tail->next = list1 ? list1 : list2;",
        "    return dummy.next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 21）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {",
        "    ListNode dummy(0);",
        "    ListNode* tail = &dummy;",
        "    while (list1 && list2) {",
        "        if (list1->val < list2->val) { tail->next = list1; list1 = list1->next; }",
        "        else { tail->next = list2; list2 = list2->next; }",
        "        tail = tail->next;",
        "    }",
        "    tail->next = list1 ? list1 : list2;",
        "    return dummy.next;",
        "}"
      ]
    }
  },
  {
    "id": "t1",
    "mod": "tree-backtrack",
    "idx": 6,
    "title": "二叉树的最大深度",
    "lc": "LeetCode 104",
    "lcNum": 104,
    "diff": 1,
    "tags": [
      "二叉树",
      "递归",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个二叉树 root ，返回其最大深度。最大深度是指从根节点到最远叶子节点的最长路径上的节点数。",
    "ioIn": "一行层序序列，空格分隔，`#` 表示空节点，例如 `3 9 20 # # 15 7`。",
    "ioOut": "一个整数，表示最大深度。",
    "ex": [
      {
        "i": "3 9 20 # # 15 7",
        "o": "3"
      },
      {
        "i": "1 # 2",
        "o": "2"
      },
      {
        "i": "#",
        "o": "0"
      }
    ],
    "params": [
      "[3,9,20,null,null,15,7]",
      "[1,null,2]",
      "[]",
      "[1,2,3,4]"
    ],
    "sig": "int maxDepth(TreeNode* root)",
    "template": "int maxDepth(TreeNode* root) {\n    // 空树返回 0；否则左右子树深度取大 + 1\n    return 0;\n}",
    "hints": [
      "树的深度 = 左右子树深度的较大值 + 1，这一句就是整个递归。",
      "递归出口只有一个：节点为空时深度是 0。",
      "先算左右子树再合并，就是后序遍历的顺序（左、右、根）。"
    ],
    "ref": [
      "int maxDepth(TreeNode* root) {",
      "    if (root == nullptr) return 0;",
      "    return 1 + max(maxDepth(root->left), maxDepth(root->right));",
      "}"
    ],
    "note": "递归三问母题：子问题是什么（求左右子树的最大深度）；当前做什么（取两者最大值 + 1）；返回什么（返回当前树的最大深度）。基底条件：root == nullptr 返回 0。",
    "complexity": "时间 O(n)，空间 O(h)（树高）。",
    "pitfalls": [
      "空节点返回 0；不要漏掉加 1。"
    ],
    "rating": 1000,
    "hot100": true,
    "slug": "maximum-depth-of-binary-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 二叉树的最大深度",
      "desc": "【灵神心法点拨】：递归三问母题：子问题是什么（求左右子树的最大深度）；当前做什么（取两者最大值 + 1）；返回什么（返回当前树的最大深度）。基底条件：root == nullptr 返回 0。",
      "code": [
        "int maxDepth(TreeNode* root) {",
        "    if (root == nullptr) return 0;",
        "    return 1 + max(maxDepth(root->left), maxDepth(root->right));",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 104）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxDepth(TreeNode* root) {",
        "    if (root == nullptr) return 0;",
        "    return 1 + max(maxDepth(root->left), maxDepth(root->right));",
        "}"
      ]
    }
  },
  {
    "id": "p_100",
    "mod": "tree-backtrack",
    "idx": 7,
    "title": "相同的树",
    "lc": "LeetCode 100",
    "lcNum": 100,
    "diff": 1,
    "tags": [
      "二叉树",
      "递归"
    ],
    "by": "return",
    "brief": "给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,2,3,4,5,null,6] | [1,2,3,4,5,null,6]",
      "[1,2,3,null,4,5,null] | [3,9,20,null,null,15,7]"
    ],
    "sig": "// LeetCode 100 函数签名",
    "template": "// LeetCode 100 相同的树\n",
    "hints": [
      "同步递归遍历两棵树：若都为空返回 true；若一个为空另一个不为空返回 false；若值不相等返回 false；递归检查左子树与右子树是否同时相同。"
    ],
    "ref": [
      "bool isSameTree(TreeNode* p, TreeNode* q) {",
      "    if (!p && !q) return true;",
      "    if (!p || !q || p->val != q->val) return false;",
      "    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);",
      "}"
    ],
    "note": "同步递归遍历两棵树：若都为空返回 true；若一个为空另一个不为空返回 false；若值不相等返回 false；递归检查左子树与右子树是否同时相同。",
    "complexity": "时间 O(min(n, m))，空间 O(min(h1, h2))。",
    "pitfalls": [
      "必须先判断空节点逻辑，再判断 val 是否相等，防止空指针解引用。"
    ],
    "rating": 1000,
    "hot100": false,
    "slug": "same-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 相同的树",
      "desc": "【灵神心法点拨】：同步递归遍历两棵树：若都为空返回 true；若一个为空另一个不为空返回 false；若值不相等返回 false；递归检查左子树与右子树是否同时相同。",
      "code": [
        "bool isSameTree(TreeNode* p, TreeNode* q) {",
        "    if (!p && !q) return true;",
        "    if (!p || !q || p->val != q->val) return false;",
        "    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 100）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool isSameTree(TreeNode* p, TreeNode* q) {",
        "    if (!p && !q) return true;",
        "    if (!p || !q || p->val != q->val) return false;",
        "    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);",
        "}"
      ]
    }
  },
  {
    "id": "t3",
    "mod": "tree-backtrack",
    "idx": 8,
    "title": "翻转二叉树",
    "lc": "LeetCode 226",
    "lcNum": 226,
    "diff": 1,
    "tags": [
      "二叉树",
      "递归",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。",
    "ioIn": "root：二叉树根节点，层序数组写法，null 表示空节点。",
    "ioOut": "返回翻转后的根节点（同样按层序展示）。",
    "ex": [
      {
        "i": "[4,2,7,1,3,6,9]",
        "o": "[4,7,2,9,6,3,1]"
      },
      {
        "i": "[2,1,3]",
        "o": "[2,3,1]"
      }
    ],
    "params": [
      "[4,2,7,1,3,6,9]",
      "[2,1,3]",
      "[1]",
      "[]"
    ],
    "sig": "TreeNode* invertTree(TreeNode* root)",
    "template": "TreeNode* invertTree(TreeNode* root) {\n    // 空节点直接返回；否则交换左右，再递归\n    return root;\n}",
    "hints": [
      "翻转 = 每个节点都把左右孩子交换一次，一个节点都不能漏。",
      "先递归翻转左右子树，再交换根的两个指针；先交换再递归也对，但别交换两次。",
      "出口只有一句：root 为空就返回 nullptr。"
    ],
    "ref": [
      "TreeNode* invertTree(TreeNode* root) {",
      "    if (root == nullptr) return nullptr;",
      "    TreeNode* l = invertTree(root->left);",
      "    TreeNode* r = invertTree(root->right);",
      "    root->left = r;",
      "    root->right = l;",
      "    return root;",
      "}"
    ],
    "note": "自底向上后序遍历：先递归翻转左子树，再递归翻转右子树，最后交换当前节点的 left 和 right 指针。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "注意交换指针的暂存，不能直接连续覆盖。"
    ],
    "rating": 1000,
    "hot100": true,
    "slug": "invert-binary-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 翻转二叉树",
      "desc": "【灵神心法点拨】：自底向上后序遍历：先递归翻转左子树，再递归翻转右子树，最后交换当前节点的 left 和 right 指针。",
      "code": [
        "TreeNode* invertTree(TreeNode* root) {",
        "    if (root == nullptr) return nullptr;",
        "    TreeNode* l = invertTree(root->left);",
        "    TreeNode* r = invertTree(root->right);",
        "    root->left = r;",
        "    root->right = l;",
        "    return root;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 226）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "TreeNode* invertTree(TreeNode* root) {",
        "    if (root == nullptr) return nullptr;",
        "    TreeNode* l = invertTree(root->left);",
        "    TreeNode* r = invertTree(root->right);",
        "    root->left = r;",
        "    root->right = l;",
        "    return root;",
        "}"
      ]
    }
  },
  {
    "id": "p_543",
    "mod": "tree-backtrack",
    "idx": 9,
    "title": "二叉树的直径",
    "lc": "LeetCode 543",
    "lcNum": 543,
    "diff": 1,
    "tags": [
      "二叉树",
      "递归",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一棵二叉树的根节点，返回该树的 直径 。二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,9,20,null,null,15,7]",
      "[1,2,2,3,4,4,3]"
    ],
    "sig": "// LeetCode 543 函数签名",
    "template": "// LeetCode 543 二叉树的直径\n",
    "hints": [
      "任意路径的最高拐点必然是某个节点。以该节点为拐点的最长路径为：左子树最大深度 + 右子树最大深度。在递归计算深度的同时，用全局变量 maxDiameter = max(maxDiameter, left + right) 更新答案。"
    ],
    "ref": [
      "int diameterOfBinaryTree(TreeNode* root) {",
      "    int ans = 0;",
      "    auto maxDepth = [&](auto self, TreeNode* node) -> int {",
      "        if (!node) return 0;",
      "        int l = self(self, node->left);",
      "        int r = self(self, node->right);",
      "        ans = max(ans, l + r);",
      "        return 1 + max(l, r);",
      "    };",
      "    maxDepth(maxDepth, root);",
      "    return ans;",
      "}"
    ],
    "note": "任意路径的最高拐点必然是某个节点。以该节点为拐点的最长路径为：左子树最大深度 + 右子树最大深度。在递归计算深度的同时，用全局变量 maxDiameter = max(maxDiameter, left + right) 更新答案。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "返回给父节点的是单侧深度 max(left, right) + 1，而更新全局直径是用 left + right（路径边数）。"
    ],
    "rating": 1250,
    "hot100": true,
    "slug": "diameter-of-binary-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 二叉树的直径",
      "desc": "【灵神心法点拨】：任意路径的最高拐点必然是某个节点。以该节点为拐点的最长路径为：左子树最大深度 + 右子树最大深度。在递归计算深度的同时，用全局变量 maxDiameter = max(maxDiameter, left + right) 更新答案。",
      "code": [
        "int diameterOfBinaryTree(TreeNode* root) {",
        "    int ans = 0;",
        "    auto maxDepth = [&](auto self, TreeNode* node) -> int {",
        "        if (!node) return 0;",
        "        int l = self(self, node->left);",
        "        int r = self(self, node->right);",
        "        ans = max(ans, l + r);",
        "        return 1 + max(l, r);",
        "    };",
        "    maxDepth(maxDepth, root);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 543）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int diameterOfBinaryTree(TreeNode* root) {",
        "    int ans = 0;",
        "    auto maxDepth = [&](auto self, TreeNode* node) -> int {",
        "        if (!node) return 0;",
        "        int l = self(self, node->left);",
        "        int r = self(self, node->right);",
        "        ans = max(ans, l + r);",
        "        return 1 + max(l, r);",
        "    };",
        "    maxDepth(maxDepth, root);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_236",
    "mod": "tree-backtrack",
    "idx": 10,
    "title": "二叉树的最近公共祖先",
    "lc": "LeetCode 236",
    "lcNum": 236,
    "diff": 1,
    "tags": [
      "二叉树",
      "递归",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个二叉树, 找到该树中两个指定节点 p 和 q 的最近公共祖先 (LCA)。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,2,2,3,4,4,3] | [1,2,3,null,4,5,null] | [3,9,20,null,null,15,7]",
      "[3,9,20,null,null,15,7] | [3,9,20,null,null,15,7] | [3,9,20,null,null,15,7]"
    ],
    "sig": "// LeetCode 236 函数签名",
    "template": "// LeetCode 236 二叉树的最近公共祖先\n",
    "hints": [
      "递归后序遍历：若当前节点为空或等于 p 或 q，直接返回当前节点。递归在左子树与右子树中寻找。若左右子树均返回非空指针，说明 p 和 q 分布在两侧，当前节点即为 LCA；若只有一侧非空，则返回该侧结果。"
    ],
    "ref": [
      "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {",
      "    if (!root || root == p || root == q) return root;",
      "    TreeNode* l = lowestCommonAncestor(root->left, p, q);",
      "    TreeNode* r = lowestCommonAncestor(root->right, p, q);",
      "    if (l && r) return root;",
      "    return l ? l : r;",
      "}"
    ],
    "note": "递归后序遍历：若当前节点为空或等于 p 或 q，直接返回当前节点。递归在左子树与右子树中寻找。若左右子树均返回非空指针，说明 p 和 q 分布在两侧，当前节点即为 LCA；若只有一侧非空，则返回该侧结果。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "base case: root == nullptr || root == p || root == q 时直接返回 root。"
    ],
    "rating": 1450,
    "hot100": true,
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 二叉树的最近公共祖先",
      "desc": "【灵神心法点拨】：递归后序遍历：若当前节点为空或等于 p 或 q，直接返回当前节点。递归在左子树与右子树中寻找。若左右子树均返回非空指针，说明 p 和 q 分布在两侧，当前节点即为 LCA；若只有一侧非空，则返回该侧结果。",
      "code": [
        "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {",
        "    if (!root || root == p || root == q) return root;",
        "    TreeNode* l = lowestCommonAncestor(root->left, p, q);",
        "    TreeNode* r = lowestCommonAncestor(root->right, p, q);",
        "    if (l && r) return root;",
        "    return l ? l : r;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 236）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {",
        "    if (!root || root == p || root == q) return root;",
        "    TreeNode* l = lowestCommonAncestor(root->left, p, q);",
        "    TreeNode* r = lowestCommonAncestor(root->right, p, q);",
        "    if (l && r) return root;",
        "    return l ? l : r;",
        "}"
      ]
    }
  },
  {
    "id": "p_98",
    "mod": "tree-backtrack",
    "idx": 11,
    "title": "验证二叉搜索树",
    "lc": "LeetCode 98",
    "lcNum": 98,
    "diff": 1,
    "tags": [
      "二叉搜索树",
      "中序遍历",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[6,2,8,0,4,7,9]"
    ],
    "sig": "// LeetCode 98 函数签名",
    "template": "// LeetCode 98 验证二叉搜索树\n",
    "hints": [
      "BST 的核心性质：中序遍历（左中右）得到严格单调递增序列。遍历时维护上一个访问节点的值 prev，若当前节点 val <= prev 则不是有效 BST。或传递开区间 (low, high) 范围。"
    ],
    "ref": [
      "bool isValidBST(TreeNode* root) {",
      "    long long prev = LLONG_MIN;",
      "    auto inorder = [&](auto self, TreeNode* node) -> bool {",
      "        if (!node) return true;",
      "        if (!self(self, node->left)) return false;",
      "        if (node->val <= prev) return false;",
      "        prev = node->val;",
      "        return self(self, node->right);",
      "    };",
      "    return inorder(inorder, root);",
      "}"
    ],
    "note": "BST 的核心性质：中序遍历（左中右）得到严格单调递增序列。遍历时维护上一个访问节点的值 prev，若当前节点 val <= prev 则不是有效 BST。或传递开区间 (low, high) 范围。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "必须是严格大于（nums[i] > prev），相等也返回 false；prev 初值用 LONG_MIN 防止节点取 INT_MIN。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "validate-binary-search-tree",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 验证二叉搜索树",
      "desc": "【灵神心法点拨】：BST 的核心性质：中序遍历（左中右）得到严格单调递增序列。遍历时维护上一个访问节点的值 prev，若当前节点 val <= prev 则不是有效 BST。或传递开区间 (low, high) 范围。",
      "code": [
        "bool isValidBST(TreeNode* root) {",
        "    long long prev = LLONG_MIN;",
        "    auto inorder = [&](auto self, TreeNode* node) -> bool {",
        "        if (!node) return true;",
        "        if (!self(self, node->left)) return false;",
        "        if (node->val <= prev) return false;",
        "        prev = node->val;",
        "        return self(self, node->right);",
        "    };",
        "    return inorder(inorder, root);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 98）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool isValidBST(TreeNode* root) {",
        "    long long prev = LLONG_MIN;",
        "    auto inorder = [&](auto self, TreeNode* node) -> bool {",
        "        if (!node) return true;",
        "        if (!self(self, node->left)) return false;",
        "        if (node->val <= prev) return false;",
        "        prev = node->val;",
        "        return self(self, node->right);",
        "    };",
        "    return inorder(inorder, root);",
        "}"
      ]
    }
  },
  {
    "id": "bt2",
    "mod": "tree-backtrack",
    "idx": 12,
    "title": "子集",
    "lc": "LeetCode 78",
    "lcNum": 78,
    "diff": 1,
    "tags": [
      "回溯",
      "选或不选",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。解集 不能 包含重复的子集。",
    "ioIn": "nums：互不相同的整数数组（长度不超过 5）。",
    "ioOut": "返回全部子集组成的二维数组。",
    "ex": [
      {
        "i": "[1,2,3]",
        "o": "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]"
      },
      {
        "i": "[0]",
        "o": "[[],[0]]"
      }
    ],
    "params": [
      "[1,2,3]",
      "[0]",
      "[1,2]"
    ],
    "sig": "vector<vector<int>> subsets(vector<int>& nums)",
    "template": "void pick(vector<int>& nums, int start, vector<int>& path, vector<vector<int>>& res) {\n    // 每到一个状态就是一个子集\n}\n\nvector<vector<int>> subsets(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    pick(nums, 0, path, res);\n    return res;\n}",
    "hints": [
      "和排列不同：子集不看顺序，用 start 保证只往后选，天然去重。",
      "每进入一次递归就收一个答案（包括空集），不需要等到长度满。",
      "循环从 start 开始，递归传 i + 1。"
    ],
    "ref": [
      "vector<vector<int>> subsets(vector<int>& nums) {",
      "    vector<vector<int>> ans;",
      "    vector<int> path;",
      "    auto dfs = [&](auto self, int i) -> void {",
      "        if (i == nums.size()) { ans.push_back(path); return; }",
      "        self(self, i + 1);",
      "        path.push_back(nums[i]);",
      "        self(self, i + 1);",
      "        path.pop_back();",
      "    };",
      "    dfs(dfs, 0);",
      "    return ans;",
      "}"
    ],
    "note": "视角一（选或不选）：对每个下标 i，可以选择加入 path 并递归，也可以不选直接递归下一个元素。当 i == n 时将 path 加入答案并回溯。",
    "complexity": "时间 O(n * 2^n)，空间 O(n)。",
    "pitfalls": [
      "回溯必须有恢复现场操作（path.pop_back()）。"
    ],
    "rating": 1300,
    "hot100": true,
    "slug": "subsets",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 子集",
      "desc": "【灵神心法点拨】：视角一（选或不选）：对每个下标 i，可以选择加入 path 并递归，也可以不选直接递归下一个元素。当 i == n 时将 path 加入答案并回溯。",
      "code": [
        "vector<vector<int>> subsets(vector<int>& nums) {",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    auto dfs = [&](auto self, int i) -> void {",
        "        if (i == nums.size()) { ans.push_back(path); return; }",
        "        self(self, i + 1);",
        "        path.push_back(nums[i]);",
        "        self(self, i + 1);",
        "        path.pop_back();",
        "    };",
        "    dfs(dfs, 0);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 78）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> subsets(vector<int>& nums) {",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    auto dfs = [&](auto self, int i) -> void {",
        "        if (i == nums.size()) { ans.push_back(path); return; }",
        "        self(self, i + 1);",
        "        path.push_back(nums[i]);",
        "        self(self, i + 1);",
        "        path.pop_back();",
        "    };",
        "    dfs(dfs, 0);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_77",
    "mod": "tree-backtrack",
    "idx": 13,
    "title": "组合",
    "lc": "LeetCode 77",
    "lcNum": 77,
    "diff": 1,
    "tags": [
      "回溯",
      "剪枝"
    ],
    "by": "return",
    "brief": "给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "3 | 4",
      "4 | 2"
    ],
    "sig": "// LeetCode 77 函数签名",
    "template": "// LeetCode 77 组合\n",
    "hints": [
      "视角二（枚举当前选哪个）：从 start 到 n 循环挑选数字入 path。带剪枝：如果剩余可用数字 n - j + 1 小于还需要的数字个数 k - path.size()，直接 break 剪枝。"
    ],
    "ref": [
      "vector<vector<int>> combine(int n, int k) {",
      "    vector<vector<int>> ans;",
      "    vector<int> path;",
      "    auto dfs = [&](auto self, int start) -> void {",
      "        if (path.size() == k) { ans.push_back(path); return; }",
      "        for (int i = start; i <= n - (k - path.size()) + 1; ++i) {",
      "            path.push_back(i);",
      "            self(self, i + 1);",
      "            path.pop_back();",
      "        }",
      "    };",
      "    dfs(dfs, 1);",
      "    return ans;",
      "}"
    ],
    "note": "视角二（枚举当前选哪个）：从 start 到 n 循环挑选数字入 path。带剪枝：如果剩余可用数字 n - j + 1 小于还需要的数字个数 k - path.size()，直接 break 剪枝。",
    "complexity": "时间 O(C(n, k) * k)，空间 O(k)。",
    "pitfalls": [
      "关键剪枝：for 循环上界不要写死为 n，写为 n - (k - path.size()) + 1 大幅提升效率。"
    ],
    "rating": 1300,
    "hot100": false,
    "slug": "combinations",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 组合",
      "desc": "【灵神心法点拨】：视角二（枚举当前选哪个）：从 start 到 n 循环挑选数字入 path。带剪枝：如果剩余可用数字 n - j + 1 小于还需要的数字个数 k - path.size()，直接 break 剪枝。",
      "code": [
        "vector<vector<int>> combine(int n, int k) {",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    auto dfs = [&](auto self, int start) -> void {",
        "        if (path.size() == k) { ans.push_back(path); return; }",
        "        for (int i = start; i <= n - (k - path.size()) + 1; ++i) {",
        "            path.push_back(i);",
        "            self(self, i + 1);",
        "            path.pop_back();",
        "        }",
        "    };",
        "    dfs(dfs, 1);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 77）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> combine(int n, int k) {",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    auto dfs = [&](auto self, int start) -> void {",
        "        if (path.size() == k) { ans.push_back(path); return; }",
        "        for (int i = start; i <= n - (k - path.size()) + 1; ++i) {",
        "            path.push_back(i);",
        "            self(self, i + 1);",
        "            path.pop_back();",
        "        }",
        "    };",
        "    dfs(dfs, 1);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "bt1",
    "mod": "tree-backtrack",
    "idx": 14,
    "title": "全排列",
    "lc": "LeetCode 46",
    "lcNum": 46,
    "diff": 1,
    "tags": [
      "回溯",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。",
    "ioIn": "nums：互不相同的整数数组（长度不超过 6）。",
    "ioOut": "返回 vector<vector<int>>，包含全部排列。",
    "ex": [
      {
        "i": "[1,2,3]",
        "o": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        "i": "[1]",
        "o": "[[1]]"
      }
    ],
    "params": [
      "[1,2,3]",
      "[1]",
      "[0,1]",
      "[1,2,3,4]"
    ],
    "sig": "vector<vector<int>> permute(vector<int>& nums)",
    "template": "void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {\n    // 选一个没用的数 → 递归 → 撤销选择\n}\n\nvector<vector<int>> permute(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    vector<bool> used(nums.size(), false);\n    dfs(nums, path, used, res);\n    return res;\n}",
    "hints": [
      "回溯三步：做选择、递归、撤销选择。撤销那一步最容易漏。",
      "path 长度等于 nums 长度时说明凑齐一个排列，收进 res（收的是拷贝）。",
      "used 数组标记谁已经在 path 里，避免同一个数用两次。"
    ],
    "ref": [
      "vector<vector<int>> permute(vector<int>& nums) {",
      "    int n = nums.size();",
      "    vector<vector<int>> ans;",
      "    vector<int> path;",
      "    vector<bool> used(n, false);",
      "    auto dfs = [&](auto self) -> void {",
      "        if (path.size() == n) { ans.push_back(path); return; }",
      "        for (int i = 0; i < n; ++i) {",
      "            if (used[i]) continue;",
      "            used[i] = true; path.push_back(nums[i]);",
      "            self(self);",
      "            path.pop_back(); used[i] = false;",
      "        }",
      "    };",
      "    dfs(dfs);",
      "    return ans;",
      "}"
    ],
    "note": "排列问题与组合的区别在于顺序相关。使用 used 数组记录哪些元素已经在 path 中。每次从 0 到 n - 1 枚举未使用的元素入栈，递归深搜，回溯时撤销 used 标记与 path。",
    "complexity": "时间 O(n * n!)，空间 O(n)。",
    "pitfalls": [
      "每次循环从 0 开始遍历整个数组，而不是从 start 开始；使用 used 数组判重。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "permutations",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 全排列",
      "desc": "【灵神心法点拨】：排列问题与组合的区别在于顺序相关。使用 used 数组记录哪些元素已经在 path 中。每次从 0 到 n - 1 枚举未使用的元素入栈，递归深搜，回溯时撤销 used 标记与 path。",
      "code": [
        "vector<vector<int>> permute(vector<int>& nums) {",
        "    int n = nums.size();",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    vector<bool> used(n, false);",
        "    auto dfs = [&](auto self) -> void {",
        "        if (path.size() == n) { ans.push_back(path); return; }",
        "        for (int i = 0; i < n; ++i) {",
        "            if (used[i]) continue;",
        "            used[i] = true; path.push_back(nums[i]);",
        "            self(self);",
        "            path.pop_back(); used[i] = false;",
        "        }",
        "    };",
        "    dfs(dfs);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 46）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> permute(vector<int>& nums) {",
        "    int n = nums.size();",
        "    vector<vector<int>> ans;",
        "    vector<int> path;",
        "    vector<bool> used(n, false);",
        "    auto dfs = [&](auto self) -> void {",
        "        if (path.size() == n) { ans.push_back(path); return; }",
        "        for (int i = 0; i < n; ++i) {",
        "            if (used[i]) continue;",
        "            used[i] = true; path.push_back(nums[i]);",
        "            self(self);",
        "            path.pop_back(); used[i] = false;",
        "        }",
        "    };",
        "    dfs(dfs);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_51",
    "mod": "tree-backtrack",
    "idx": 15,
    "title": "N 皇后",
    "lc": "LeetCode 51",
    "lcNum": 51,
    "diff": 2,
    "tags": [
      "回溯",
      "位运算/集合",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "5",
      "3"
    ],
    "sig": "// LeetCode 51 函数签名",
    "template": "// LeetCode 51 N 皇后\n",
    "hints": [
      "按行放置皇后：第 r 行放置在第 c 列。利用三个集合标记冲突：列 col[c]、主对角线 diag1[r + c]、副对角线 diag2[r - c]。无冲突时放置并在下一行递归。"
    ],
    "ref": [
      "vector<vector<string>> solveNQueens(int n) {",
      "    vector<vector<string>> ans;",
      "    vector<int> col(n, 0);",
      "    vector<bool> onPath(n, false), diag1(2 * n, false), diag2(2 * n, false);",
      "    auto dfs = [&](auto self, int r) -> void {",
      "        if (r == n) {",
      "            vector<string> board(n, string(n, '.'));",
      "            for (int i = 0; i < n; ++i) board[i][col[i]] = 'Q';",
      "            ans.push_back(board); return;",
      "        }",
      "        for (int c = 0; c < n; ++c) {",
      "            int d1 = r + c, d2 = r - c + n;",
      "            if (onPath[c] || diag1[d1] || diag2[d2]) continue;",
      "            col[r] = c; onPath[c] = diag1[d1] = diag2[d2] = true;",
      "            self(self, r + 1);",
      "            onPath[c] = diag1[d1] = diag2[d2] = false;",
      "        }",
      "    };",
      "    dfs(dfs, 0);",
      "    return ans;",
      "}"
    ],
    "note": "按行放置皇后：第 r 行放置在第 c 列。利用三个集合标记冲突：列 col[c]、主对角线 diag1[r + c]、副对角线 diag2[r - c]。无冲突时放置并在下一行递归。",
    "complexity": "时间 O(n!)，空间 O(n)。",
    "pitfalls": [
      "副对角线 r - c 可能为负数，数组存储时需加偏移量 + n。"
    ],
    "rating": 1900,
    "hot100": true,
    "slug": "n-queens",
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · N 皇后",
      "desc": "【灵神心法点拨】：按行放置皇后：第 r 行放置在第 c 列。利用三个集合标记冲突：列 col[c]、主对角线 diag1[r + c]、副对角线 diag2[r - c]。无冲突时放置并在下一行递归。",
      "code": [
        "vector<vector<string>> solveNQueens(int n) {",
        "    vector<vector<string>> ans;",
        "    vector<int> col(n, 0);",
        "    vector<bool> onPath(n, false), diag1(2 * n, false), diag2(2 * n, false);",
        "    auto dfs = [&](auto self, int r) -> void {",
        "        if (r == n) {",
        "            vector<string> board(n, string(n, '.'));",
        "            for (int i = 0; i < n; ++i) board[i][col[i]] = 'Q';",
        "            ans.push_back(board); return;",
        "        }",
        "        for (int c = 0; c < n; ++c) {",
        "            int d1 = r + c, d2 = r - c + n;",
        "            if (onPath[c] || diag1[d1] || diag2[d2]) continue;",
        "            col[r] = c; onPath[c] = diag1[d1] = diag2[d2] = true;",
        "            self(self, r + 1);",
        "            onPath[c] = diag1[d1] = diag2[d2] = false;",
        "        }",
        "    };",
        "    dfs(dfs, 0);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 51）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<string>> solveNQueens(int n) {",
        "    vector<vector<string>> ans;",
        "    vector<int> col(n, 0);",
        "    vector<bool> onPath(n, false), diag1(2 * n, false), diag2(2 * n, false);",
        "    auto dfs = [&](auto self, int r) -> void {",
        "        if (r == n) {",
        "            vector<string> board(n, string(n, '.'));",
        "            for (int i = 0; i < n; ++i) board[i][col[i]] = 'Q';",
        "            ans.push_back(board); return;",
        "        }",
        "        for (int c = 0; c < n; ++c) {",
        "            int d1 = r + c, d2 = r - c + n;",
        "            if (onPath[c] || diag1[d1] || diag2[d2]) continue;",
        "            col[r] = c; onPath[c] = diag1[d1] = diag2[d2] = true;",
        "            self(self, r + 1);",
        "            onPath[c] = diag1[d1] = diag2[d2] = false;",
        "        }",
        "    };",
        "    dfs(dfs, 0);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "d1",
    "mod": "dp",
    "idx": 1,
    "title": "爬楼梯",
    "lc": "LeetCode 70",
    "lcNum": 70,
    "diff": 1,
    "tags": [
      "动态规划",
      "斐波那契",
      "Hot100"
    ],
    "by": "return",
    "brief": "假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？",
    "ioIn": "n：台阶数（1 ≤ n ≤ 40）。",
    "ioOut": "返回方法数。",
    "ex": [
      {
        "i": "2",
        "o": "2"
      },
      {
        "i": "3",
        "o": "3"
      },
      {
        "i": "5",
        "o": "8"
      }
    ],
    "params": [
      "2",
      "3",
      "5",
      "1",
      "10"
    ],
    "sig": "int climbStairs(int n)",
    "template": "int climbStairs(int n) {\n    // f(n) = f(n-1) + f(n-2)，想想为什么\n    return 0;\n}",
    "hints": [
      "最后一步要么跨 1 阶要么跨 2 阶，所以 f(n) = f(n-1) + f(n-2)。",
      "边界：f(1)=1，f(2)=2，别让 n=1 时越界。",
      "只需要两个变量滚动，不用开整个数组。"
    ],
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
    ],
    "note": "DP 入门基石：到第 n 阶的方法只能从第 n-1 阶（跨 1 步）或第 n-2 阶（跨 2 步）转移过来。状态转移方程：dp[i] = dp[i-1] + dp[i-2]。滚动变量优化空间至 O(1)。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "初始化：dp[0] = 1, dp[1] = 1 或从 1, 2 开始。"
    ],
    "rating": 1000,
    "hot100": true,
    "slug": "climbing-stairs",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 爬楼梯",
      "desc": "【灵神心法点拨】：DP 入门基石：到第 n 阶的方法只能从第 n-1 阶（跨 1 步）或第 n-2 阶（跨 2 步）转移过来。状态转移方程：dp[i] = dp[i-1] + dp[i-2]。滚动变量优化空间至 O(1)。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 70）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "d4",
    "mod": "dp",
    "idx": 2,
    "title": "打家劫舍",
    "lc": "LeetCode 198",
    "lcNum": 198,
    "diff": 1,
    "tags": [
      "动态规划",
      "线性DP",
      "Hot100"
    ],
    "by": "return",
    "brief": "如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。计算你 不触动报警装置的情况下 ，一夜之内能够偷窃到的最高金额。",
    "ioIn": "nums：每个房间存放金额的数组。",
    "ioOut": "返回能盗取的最高金额。",
    "ex": [
      {
        "i": "[1,2,3,1]",
        "o": "4"
      },
      {
        "i": "[2,7,9,3,1]",
        "o": "12"
      }
    ],
    "params": [
      "[1,2,3,1]",
      "[2,7,9,3,1]",
      "[2,1]",
      "[5]"
    ],
    "sig": "int rob(vector<int>& nums)",
    "template": "int rob(vector<int>& nums) {\n    // dp[i] = max(偷第i间: dp[i-2]+nums[i], 不偷第i间: dp[i-1])\n    return 0;\n}",
    "hints": [
      "对第 i 间屋子只有两种选择：偷或者不偷。",
      "若偷第 i 间，则不能偷 i-1 间，总收益为 dp[i-2] + nums[i]。",
      "若不偷第 i 间，则总收益为 dp[i-1]。两者取最大值即可。"
    ],
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
    ],
    "note": "选或不选模型：对第 i 间房屋，若不偷则最大金额为 dp[i-1]；若偷则不能偷 i-1，金额为 dp[i-2] + nums[i]。转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。滚动两个变量即可。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "边界处理：只有一间房屋时直接返回 nums[0]。"
    ],
    "rating": 1300,
    "hot100": true,
    "slug": "house-robber",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 打家劫舍",
      "desc": "【灵神心法点拨】：选或不选模型：对第 i 间房屋，若不偷则最大金额为 dp[i-1]；若偷则不能偷 i-1，金额为 dp[i-2] + nums[i]。转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。滚动两个变量即可。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 198）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_213",
    "mod": "dp",
    "idx": 3,
    "title": "打家劫舍 II",
    "lc": "LeetCode 213",
    "lcNum": 213,
    "diff": 1,
    "tags": [
      "动态规划",
      "环形"
    ],
    "by": "return",
    "brief": "这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。给定一个代表每个房屋存放金额的非负整数数组，计算你能够偷窃到的最高金额。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[5,8,9,11,2,10]",
      "[9,1,2,1,2,6,7]"
    ],
    "sig": "// LeetCode 213 函数签名",
    "template": "// LeetCode 213 打家劫舍 II\n",
    "hints": [
      "【环形拆解】：首尾不能同时偷。情况 1：不偷首房屋，偷窃范围为 [1, n-1]；情况 2：不偷尾房屋，偷窃范围为 [0, n-2]。对这两个单链区间分别跑一次常规打家劫舍，取最大值。"
    ],
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
    ],
    "note": "【环形拆解】：首尾不能同时偷。情况 1：不偷首房屋，偷窃范围为 [1, n-1]；情况 2：不偷尾房屋，偷窃范围为 [0, n-2]。对这两个单链区间分别跑一次常规打家劫舍，取最大值。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "n = 1 时特判返回 nums[0]。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "house-robber-ii",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 打家劫舍 II",
      "desc": "【灵神心法点拨】：【环形拆解】：首尾不能同时偷。情况 1：不偷首房屋，偷窃范围为 [1, n-1]；情况 2：不偷尾房屋，偷窃范围为 [0, n-2]。对这两个单链区间分别跑一次常规打家劫舍，取最大值。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 213）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_740",
    "mod": "dp",
    "idx": 4,
    "title": "删除并获得点数",
    "lc": "LeetCode 740",
    "lcNum": 740,
    "diff": 2,
    "tags": [
      "动态规划",
      "值域转换"
    ],
    "by": "return",
    "brief": "每次操作中，选择任意一个 nums[i] 删除它并获得 nums[i] 的点数，之后必须删除所有等于 nums[i] - 1 和 nums[i] + 1 的元素。求最大点数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,4,10,10,10]",
      "[9,3,11,12,10,12]"
    ],
    "sig": "// LeetCode 740 函数签名",
    "template": "// LeetCode 740 删除并获得点数\n",
    "hints": [
      "【值域转换】：选了 x 就不能选 x-1 和 x+1，这正是打家劫舍！统计每个数值 x 的总点数 sum[x] = x * count(x)。在值域 [0, max_val] 上做一次打家劫舍。"
    ],
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
    ],
    "note": "【值域转换】：选了 x 就不能选 x-1 和 x+1，这正是打家劫舍！统计每个数值 x 的总点数 sum[x] = x * count(x)。在值域 [0, max_val] 上做一次打家劫舍。",
    "complexity": "时间 O(n + max_val)，空间 O(max_val)。",
    "pitfalls": [
      "值域范围根据数组最大值开辟数组空间。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "delete-and-earn",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 删除并获得点数",
      "desc": "【灵神心法点拨】：【值域转换】：选了 x 就不能选 x-1 和 x+1，这正是打家劫舍！统计每个数值 x 的总点数 sum[x] = x * count(x)。在值域 [0, max_val] 上做一次打家劫舍。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 740）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_416",
    "mod": "dp",
    "idx": 5,
    "title": "分割等和子集",
    "lc": "LeetCode 416",
    "lcNum": 416,
    "diff": 2,
    "tags": [
      "0-1背包",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[-2,3,2,5,1]",
      "[3,0,3,6,2,8]"
    ],
    "sig": "// LeetCode 416 函数签名",
    "template": "// LeetCode 416 分割等和子集\n",
    "hints": [
      "转化为 0-1 背包问题：是否能从数组中挑选若干数字，恰好装满容量为 target = sum / 2 的背包。定义 dp[j] 表示容量为 j 是否能被凑出。外层遍历物品，内层倒序遍历容量 j ∈ [target, x]：dp[j] = dp[j] || dp[j - x]。"
    ],
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
    ],
    "note": "转化为 0-1 背包问题：是否能从数组中挑选若干数字，恰好装满容量为 target = sum / 2 的背包。定义 dp[j] 表示容量为 j 是否能被凑出。外层遍历物品，内层倒序遍历容量 j ∈ [target, x]：dp[j] = dp[j] || dp[j - x]。",
    "complexity": "时间 O(n * target)，空间 O(target)。",
    "pitfalls": [
      "如果总和 sum 为奇数，不可能等分，直接返回 false；内层循环必须倒序以保证每个物品只选一次。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "partition-equal-subset-sum",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 分割等和子集",
      "desc": "【灵神心法点拨】：转化为 0-1 背包问题：是否能从数组中挑选若干数字，恰好装满容量为 target = sum / 2 的背包。定义 dp[j] 表示容量为 j 是否能被凑出。外层遍历物品，内层倒序遍历容量 j ∈ [target, x]：dp[j] = dp[j] || dp[j - x]。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 416）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "d3",
    "mod": "dp",
    "idx": 6,
    "title": "零钱兑换",
    "lc": "LeetCode 322",
    "lcNum": 322,
    "diff": 2,
    "tags": [
      "完全背包",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。",
    "ioIn": "coins：面额数组；amount：目标金额。",
    "ioOut": "返回最少枚数，凑不出返回 -1。",
    "ex": [
      {
        "i": "[1,2,5] | 11",
        "o": "3"
      },
      {
        "i": "[2] | 3",
        "o": "-1"
      },
      {
        "i": "[1] | 0",
        "o": "0"
      }
    ],
    "params": [
      "[1,2,5] | 11",
      "[2] | 3",
      "[1] | 0",
      "[1,3,4] | 6"
    ],
    "sig": "int coinChange(vector<int>& coins, int amount)",
    "template": "int coinChange(vector<int>& coins, int amount) {\n    // dp[i]：凑出 i 需要的最少硬币数\n    return -1;\n}",
    "hints": [
      "dp[i] = min(dp[i - coin] + 1)，对每个面额都试一次。",
      "初始化成一个\"够不到的大数\"（比如 amount + 1），最后还等于它就说明凑不出。",
      "dp[0] = 0 是整套转移的地基。"
    ],
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
    ],
    "note": "完全背包（每种硬币可选无限次）求最小枚数：dp[j] 表示凑齐金额 j 的最少硬币数。初始化 dp 全设为无穷大，dp[0] = 0。遍历硬币，正序遍历容量 j ∈ [coin, amount]：dp[j] = min(dp[j], dp[j - coin] + 1)。",
    "complexity": "时间 O(n * amount)，空间 O(amount)。",
    "pitfalls": [
      "完全背包内层正序遍历；初始值设为 amount + 1 避免溢出。",
      "若 dp[amount] > amount 说明无法凑出返回 -1。"
    ],
    "rating": 1550,
    "hot100": true,
    "slug": "coin-change",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 零钱兑换",
      "desc": "【灵神心法点拨】：完全背包（每种硬币可选无限次）求最小枚数：dp[j] 表示凑齐金额 j 的最少硬币数。初始化 dp 全设为无穷大，dp[0] = 0。遍历硬币，正序遍历容量 j ∈ [coin, amount]：dp[j] = min(dp[j], dp[j - coin] + 1)。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 322）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_518",
    "mod": "dp",
    "idx": 7,
    "title": "零钱兑换 II",
    "lc": "LeetCode 518",
    "lcNum": 518,
    "diff": 2,
    "tags": [
      "完全背包",
      "组合数"
    ],
    "by": "return",
    "brief": "给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "4 | [5,12,5,5,8,4,6]",
      "7 | [11,3,2,4,8]"
    ],
    "sig": "// LeetCode 518 函数签名",
    "template": "// LeetCode 518 零钱兑换 II\n",
    "hints": [
      "完全背包求组合数：dp[j] 表示金额 j 的组合方案数。外层遍历硬币，内层正序遍历容量：dp[j] += dp[j - coin]。先遍历物品后遍历背包保证求的是组合数而非排列数。"
    ],
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
    ],
    "note": "完全背包求组合数：dp[j] 表示金额 j 的组合方案数。外层遍历硬币，内层正序遍历容量：dp[j] += dp[j - coin]。先遍历物品后遍历背包保证求的是组合数而非排列数。",
    "complexity": "时间 O(n * amount)，空间 O(amount)。",
    "pitfalls": [
      "外层遍历硬币保证无顺序重复；方案数可能较大，C++ 中用 unsigned int 防止溢出。"
    ],
    "rating": 1600,
    "hot100": false,
    "slug": "coin-change-ii",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 零钱兑换 II",
      "desc": "【灵神心法点拨】：完全背包求组合数：dp[j] 表示金额 j 的组合方案数。外层遍历硬币，内层正序遍历容量：dp[j] += dp[j - coin]。先遍历物品后遍历背包保证求的是组合数而非排列数。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 518）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "d5",
    "mod": "dp",
    "idx": 8,
    "title": "最长递增子序列",
    "lc": "LeetCode 300",
    "lcNum": 300,
    "diff": 2,
    "tags": [
      "LIS",
      "动态规划",
      "二分查找",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。",
    "ioIn": "nums：整数数组。",
    "ioOut": "返回最长递增子序列的长度。",
    "ex": [
      {
        "i": "[10,9,2,5,3,7,101,18]",
        "o": "4"
      },
      {
        "i": "[0,1,0,3,2,3]",
        "o": "4"
      }
    ],
    "params": [
      "[10,9,2,5,3,7,101,18]",
      "[0,1,0,3,2,3]",
      "[7,7,7,7]",
      "[1]"
    ],
    "sig": "int lengthOfLIS(vector<int>& nums)",
    "template": "int lengthOfLIS(vector<int>& nums) {\n    // dp[i] 表示以 nums[i] 结尾的最长递增子序列长度\n    return 0;\n}",
    "hints": [
      "状态定义：dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。",
      "状态转移：向前枚举 j (0 ≤ j < i)，若 nums[i] > nums[j]，则 dp[i] = max(dp[i], dp[j] + 1)。",
      "每个元素自身至少长度为 1，初始全部置为 1。"
    ],
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
    ],
    "note": "方法一：动态规划 O(n^2)，dp[i] 表示以 nums[i] 结尾的 LIS 长度，枚举前驱 j < i 转移 dp[i] = max(dp[i], dp[j] + 1)。方法二：贪心+二分 O(n log n)，维护 g 数组记录各长度结尾的最小值，用 lower_bound 查找并替换。",
    "complexity": "时间 O(n log n)，空间 O(n)。",
    "pitfalls": [
      "题目要求严格递增，二分时使用 lower_bound（找第一个 >= x 的位置替换）。"
    ],
    "rating": 1550,
    "hot100": true,
    "slug": "longest-increasing-subsequence",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 最长递增子序列",
      "desc": "【灵神心法点拨】：方法一：动态规划 O(n^2)，dp[i] 表示以 nums[i] 结尾的 LIS 长度，枚举前驱 j < i 转移 dp[i] = max(dp[i], dp[j] + 1)。方法二：贪心+二分 O(n log n)，维护 g 数组记录各长度结尾的最小值，用 lower_bound 查找并替换。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 300）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_1143",
    "mod": "dp",
    "idx": 9,
    "title": "最长公共子序列",
    "lc": "LeetCode 1143",
    "lcNum": 1143,
    "diff": 2,
    "tags": [
      "LCS",
      "双序列DP",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"cccdee\" | \"dbecebce\"",
      "\"bbdcecbe\" | \"deacece\""
    ],
    "sig": "// LeetCode 1143 函数签名",
    "template": "// LeetCode 1143 最长公共子序列\n",
    "hints": [
      "双序列 DP 经典母题：dp[i][j] 表示 text1[0..i-1] 与 text2[0..j-1] 的 LCS 长度。若 text1[i-1] == text2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1；否则继承 max(dp[i-1][j], dp[i][j-1])。"
    ],
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
    ],
    "note": "双序列 DP 经典母题：dp[i][j] 表示 text1[0..i-1] 与 text2[0..j-1] 的 LCS 长度。若 text1[i-1] == text2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1；否则继承 max(dp[i-1][j], dp[i][j-1])。",
    "complexity": "时间 O(m * n)，空间 O(m * n)（可滚动数组优化）。",
    "pitfalls": [
      "dp 数组下标开 (m+1) x (n+1)，空串边界值为 0。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "longest-common-subsequence",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 最长公共子序列",
      "desc": "【灵神心法点拨】：双序列 DP 经典母题：dp[i][j] 表示 text1[0..i-1] 与 text2[0..j-1] 的 LCS 长度。若 text1[i-1] == text2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1；否则继承 max(dp[i-1][j], dp[i][j-1])。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1143）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_72",
    "mod": "dp",
    "idx": 10,
    "title": "编辑距离",
    "lc": "LeetCode 72",
    "lcNum": 72,
    "diff": 2,
    "tags": [
      "动态规划",
      "字符串",
      "Hard",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。你可以对一个单词进行三种操作：插入、删除、替换一个字符。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"dbcebed\" | \"deaeadd\"",
      "\"cdbdcadc\" | \"cebebcb\""
    ],
    "sig": "// LeetCode 72 函数签名",
    "template": "// LeetCode 72 编辑距离\n",
    "hints": [
      "dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最少步数。若 word1[i-1] == word2[j-1] 则无需操作 dp[i-1][j-1]；否则取 替换(dp[i-1][j-1])、删除(dp[i-1][j])、插入(dp[i][j-1]) 的最小值 + 1。"
    ],
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
    ],
    "note": "dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最少步数。若 word1[i-1] == word2[j-1] 则无需操作 dp[i-1][j-1]；否则取 替换(dp[i-1][j-1])、删除(dp[i-1][j])、插入(dp[i][j-1]) 的最小值 + 1。",
    "complexity": "时间 O(m * n)，空间 O(m * n)。",
    "pitfalls": [
      "初始化：dp[i][0] = i, dp[0][j] = j（空串变为长度为 k 的串需 k 步插入/删除）。"
    ],
    "rating": 1850,
    "hot100": true,
    "slug": "edit-distance",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 编辑距离",
      "desc": "【灵神心法点拨】：dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最少步数。若 word1[i-1] == word2[j-1] 则无需操作 dp[i-1][j-1]；否则取 替换(dp[i-1][j-1])、删除(dp[i-1][j])、插入(dp[i][j-1]) 的最小值 + 1。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 72）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "g1",
    "mod": "dp",
    "idx": 11,
    "title": "买卖股票的最佳时机",
    "lc": "LeetCode 121",
    "lcNum": 121,
    "diff": 1,
    "tags": [
      "状态机",
      "贪心",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易，设计一个算法来计算你所能获取的最大利润。",
    "ioIn": "prices：每天价格。",
    "ioOut": "返回最大利润。",
    "ex": [
      {
        "i": "[7,1,5,3,6,4]",
        "o": "5"
      },
      {
        "i": "[7,6,4,3,1]",
        "o": "0"
      }
    ],
    "params": [
      "[7,1,5,3,6,4]",
      "[7,6,4,3,1]",
      "[1,2]",
      "[2,4,1]"
    ],
    "sig": "int maxProfit(vector<int>& prices)",
    "template": "int maxProfit(vector<int>& prices) {\n    // 维护\"到今天为止的最低价\"\n    return 0;\n}",
    "hints": [
      "卖出日固定时，最好的买入日就是它之前的最低价。",
      "一次遍历同时维护最低价和最大差值即可。",
      "利润不能为负：不交易就是 0。"
    ],
    "ref": [
      "int maxProfit(vector<int>& prices) {",
      "    int minPrice = INT_MAX, maxProfit = 0;",
      "    for (int p : prices) {",
      "        minPrice = min(minPrice, p);",
      "        maxProfit = max(maxProfit, p - minPrice);",
      "    }",
      "    return maxProfit;",
      "}"
    ],
    "note": "维护遍历到当前天为止的历史最低进价 minPrice。以当前价格卖出能获得的利润为 prices[i] - minPrice，不断更新全局最大利润 ans = max(ans, profit)。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "只能先买后卖，minPrice 必须是当前天之前的最小值。"
    ],
    "rating": 1150,
    "hot100": true,
    "slug": "best-time-to-buy-and-sell-stock",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 买卖股票的最佳时机",
      "desc": "【灵神心法点拨】：维护遍历到当前天为止的历史最低进价 minPrice。以当前价格卖出能获得的利润为 prices[i] - minPrice，不断更新全局最大利润 ans = max(ans, profit)。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 121）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxProfit(vector<int>& prices) {",
        "    int minPrice = INT_MAX, maxProfit = 0;",
        "    for (int p : prices) {",
        "        minPrice = min(minPrice, p);",
        "        maxProfit = max(maxProfit, p - minPrice);",
        "    }",
        "    return maxProfit;",
        "}"
      ]
    }
  },
  {
    "id": "p_122",
    "mod": "dp",
    "idx": 12,
    "title": "买卖股票的最佳时机 II",
    "lc": "LeetCode 122",
    "lcNum": 122,
    "diff": 1,
    "tags": [
      "状态机",
      "贪心"
    ],
    "by": "return",
    "brief": "给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。在每一天，你可以决定是否购买和/或出售股票。返回你能获得的最大利润。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[12,10,10,9,9,12]",
      "[2,6,5,7,5,12]"
    ],
    "sig": "// LeetCode 122 函数签名",
    "template": "// LeetCode 122 买卖股票的最佳时机 II\n",
    "hints": [
      "可交易无限次。贪心法：只要今天的价格比昨天高（prices[i] > prices[i-1]），我们就把这一段正收益累加起来；DP法：维护持有股票和未持有股票两个状态。"
    ],
    "ref": [
      "int maxProfit(vector<int>& prices) {",
      "    int profit = 0;",
      "    for (int i = 1; i < prices.size(); ++i) {",
      "        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];",
      "    }",
      "    return profit;",
      "}"
    ],
    "note": "可交易无限次。贪心法：只要今天的价格比昨天高（prices[i] > prices[i-1]），我们就把这一段正收益累加起来；DP法：维护持有股票和未持有股票两个状态。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "可以同一天先卖再买，等价于收集所有相邻递增差值。"
    ],
    "rating": 1250,
    "hot100": false,
    "slug": "best-time-to-buy-and-sell-stock-ii",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 买卖股票的最佳时机 II",
      "desc": "【灵神心法点拨】：可交易无限次。贪心法：只要今天的价格比昨天高（prices[i] > prices[i-1]），我们就把这一段正收益累加起来；DP法：维护持有股票和未持有股票两个状态。",
      "code": [
        "int maxProfit(vector<int>& prices) {",
        "    int profit = 0;",
        "    for (int i = 1; i < prices.size(); ++i) {",
        "        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];",
        "    }",
        "    return profit;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 122）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxProfit(vector<int>& prices) {",
        "    int profit = 0;",
        "    for (int i = 1; i < prices.size(); ++i) {",
        "        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];",
        "    }",
        "    return profit;",
        "}"
      ]
    }
  },
  {
    "id": "p_516",
    "mod": "dp",
    "idx": 13,
    "title": "最长回文子序列",
    "lc": "LeetCode 516",
    "lcNum": 516,
    "diff": 2,
    "tags": [
      "区间DP"
    ],
    "by": "return",
    "brief": "给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"babad\"",
      "\"cbbd\""
    ],
    "sig": "// LeetCode 516 函数签名",
    "template": "// LeetCode 516 最长回文子序列\n",
    "hints": [
      "区间 DP 经典模板：定义 dp[i][j] 表示子串 s[i..j] 的最长回文子序列长度。若 s[i] == s[j]，则 dp[i][j] = dp[i+1][j-1] + 2；否则两端收缩取最大 max(dp[i+1][j], dp[i][j-1])。按区间长度从小到大枚举转移。"
    ],
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
    ],
    "note": "区间 DP 经典模板：定义 dp[i][j] 表示子串 s[i..j] 的最长回文子序列长度。若 s[i] == s[j]，则 dp[i][j] = dp[i+1][j-1] + 2；否则两端收缩取最大 max(dp[i+1][j], dp[i][j-1])。按区间长度从小到大枚举转移。",
    "complexity": "时间 O(n^2)，空间 O(n^2)。",
    "pitfalls": [
      "外层遍历 i 从 n-1 到 0 倒序，内层 j 从 i+1 到 n-1 正序。"
    ],
    "rating": 1650,
    "hot100": false,
    "slug": "longest-palindromic-subsequence",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 最长回文子序列",
      "desc": "【灵神心法点拨】：区间 DP 经典模板：定义 dp[i][j] 表示子串 s[i..j] 的最长回文子序列长度。若 s[i] == s[j]，则 dp[i][j] = dp[i+1][j-1] + 2；否则两端收缩取最大 max(dp[i+1][j], dp[i][j-1])。按区间长度从小到大枚举转移。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 516）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_233",
    "mod": "dp",
    "idx": 14,
    "title": "数字 1 的个数",
    "lc": "LeetCode 233",
    "lcNum": 233,
    "diff": 2,
    "tags": [
      "数位DP",
      "Hard"
    ],
    "by": "return",
    "brief": "给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "6",
      "4"
    ],
    "sig": "// LeetCode 233 函数签名",
    "template": "// LeetCode 233 数字 1 的个数\n",
    "hints": [
      "灵神数位 DP 万能记忆化模板：dfs(i, cnt1, isLimit, isNum)。i 表示当前填第几个数位；cnt1 记录已经填了多少个 1；isLimit 表示当前是否受 n 的对应数位限制；isNum 表示前面是否填了数字。使用 memo[i][cnt1] 进行记忆化缓存。"
    ],
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
    ],
    "note": "灵神数位 DP 万能记忆化模板：dfs(i, cnt1, isLimit, isNum)。i 表示当前填第几个数位；cnt1 记录已经填了多少个 1；isLimit 表示当前是否受 n 的对应数位限制；isNum 表示前面是否填了数字。使用 memo[i][cnt1] 进行记忆化缓存。",
    "complexity": "时间 O(log10(n) * 10)，空间 O(log10(n)^2)。",
    "pitfalls": [
      "只有当 !isLimit && isNum 时才能读写 memo 数组。"
    ],
    "rating": 1850,
    "hot100": false,
    "slug": "number-of-digit-one",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 数字 1 的个数",
      "desc": "【灵神心法点拨】：灵神数位 DP 万能记忆化模板：dfs(i, cnt1, isLimit, isNum)。i 表示当前填第几个数位；cnt1 记录已经填了多少个 1；isLimit 表示当前是否受 n 的对应数位限制；isNum 表示前面是否填了数字。使用 memo[i][cnt1] 进行记忆化缓存。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 233）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_337",
    "mod": "dp",
    "idx": 15,
    "title": "打家劫舍 III",
    "lc": "LeetCode 337",
    "lcNum": 337,
    "diff": 2,
    "tags": [
      "树形DP",
      "Hot100"
    ],
    "by": "return",
    "brief": "房屋形成了一棵二叉树。如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。计算小偷一晚能够盗取的最高金额。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[1,2,3,4,5,null,6]",
      "[1,2,2,3,4,4,3]"
    ],
    "sig": "// LeetCode 337 函数签名",
    "template": "// LeetCode 337 打家劫舍 III\n",
    "hints": [
      "树形 DP 经典模板：后序遍历返回 pair<notRob, rob>。notRob 表示不偷当前节点的最大收益，此时左右子节点偷不偷都行：max(l.first, l.second) + max(r.first, r.second)；rob 表示偷当前节点，则子节点绝对不能偷：root->val + l.first + r.first。"
    ],
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
    ],
    "note": "树形 DP 经典模板：后序遍历返回 pair<notRob, rob>。notRob 表示不偷当前节点的最大收益，此时左右子节点偷不偷都行：max(l.first, l.second) + max(r.first, r.second)；rob 表示偷当前节点，则子节点绝对不能偷：root->val + l.first + r.first。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "不偷当前节点时，子节点可以偷也可以不偷，必须取 max(子偷, 子不偷)。"
    ],
    "rating": 1600,
    "hot100": true,
    "slug": "house-robber-iii",
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 打家劫舍 III",
      "desc": "【灵神心法点拨】：树形 DP 经典模板：后序遍历返回 pair<notRob, rob>。notRob 表示不偷当前节点的最大收益，此时左右子节点偷不偷都行：max(l.first, l.second) + max(r.first, r.second)；rob 表示偷当前节点，则子节点绝对不能偷：root->val + l.first + r.first。",
      "code": [
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
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 337）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
  },
  {
    "id": "p_303",
    "mod": "data-structures",
    "idx": 1,
    "title": "区域和检索 - 数组不可变",
    "lc": "LeetCode 303",
    "lcNum": 303,
    "diff": 1,
    "tags": [
      "前缀和",
      "基础"
    ],
    "by": "return",
    "brief": "给定一个整数数组 nums，处理以下类型的多个查询：计算索引 left 和 right 之间元素的总和，包含两端点。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,0,5,7,-4,1]",
      "[7,7,2,1,0]"
    ],
    "sig": "// LeetCode 303 函数签名",
    "template": "// LeetCode 303 区域和检索 - 数组不可变\n",
    "hints": [
      "前缀和母题：定义 s[0] = 0, s[i+1] = s[i] + nums[i]。则任意区间 [left, right] 的和可以在 O(1) 时间内计算出来：s[right + 1] - s[left]。"
    ],
    "ref": [
      "class NumArray {",
      "    vector<int> s;",
      "public:",
      "    NumArray(vector<int>& nums) {",
      "        s.resize(nums.size() + 1, 0);",
      "        for (int i = 0; i < nums.size(); ++i) s[i + 1] = s[i] + nums[i];",
      "    }",
      "    int sumRange(int left, int right) {",
      "        return s[right + 1] - s[left];",
      "    }",
      "};"
    ],
    "note": "前缀和母题：定义 s[0] = 0, s[i+1] = s[i] + nums[i]。则任意区间 [left, right] 的和可以在 O(1) 时间内计算出来：s[right + 1] - s[left]。",
    "complexity": "预处理 O(n)，单次查询 O(1)，空间 O(n)。",
    "pitfalls": [
      "s 数组开 n+1 大小，注意下标偏移。"
    ],
    "rating": 1050,
    "hot100": false,
    "slug": "range-sum-query-immutable",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 区域和检索 - 数组不可变",
      "desc": "【灵神心法点拨】：前缀和母题：定义 s[0] = 0, s[i+1] = s[i] + nums[i]。则任意区间 [left, right] 的和可以在 O(1) 时间内计算出来：s[right + 1] - s[left]。",
      "code": [
        "class NumArray {",
        "    vector<int> s;",
        "public:",
        "    NumArray(vector<int>& nums) {",
        "        s.resize(nums.size() + 1, 0);",
        "        for (int i = 0; i < nums.size(); ++i) s[i + 1] = s[i] + nums[i];",
        "    }",
        "    int sumRange(int left, int right) {",
        "        return s[right + 1] - s[left];",
        "    }",
        "};"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 303）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "class NumArray {",
        "    vector<int> s;",
        "public:",
        "    NumArray(vector<int>& nums) {",
        "        s.resize(nums.size() + 1, 0);",
        "        for (int i = 0; i < nums.size(); ++i) s[i + 1] = s[i] + nums[i];",
        "    }",
        "    int sumRange(int left, int right) {",
        "        return s[right + 1] - s[left];",
        "    }",
        "};"
      ]
    }
  },
  {
    "id": "p_560",
    "mod": "data-structures",
    "idx": 2,
    "title": "和为 K 的子数组",
    "lc": "LeetCode 560",
    "lcNum": 560,
    "diff": 2,
    "tags": [
      "前缀和",
      "哈希表",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[8,6,0,2,3,1] | 3",
      "[-2,2,5,5,-1,8] | 3"
    ],
    "sig": "// LeetCode 560 函数签名",
    "template": "// LeetCode 560 和为 K 的子数组\n",
    "hints": [
      "前缀和 + 哈希表：子数组和 s[j] - s[i] == k 等价于寻找历史前缀和 s[i] == s[j] - k 的频次。哈希表记录每个前缀和出现的次数，初始化 mp[0] = 1，边走边累加 ans += mp[curSum - k]。"
    ],
    "ref": [
      "int subarraySum(vector<int>& nums, int k) {",
      "    unordered_map<int, int> mp;",
      "    mp[0] = 1;",
      "    int cur = 0, ans = 0;",
      "    for (int x : nums) {",
      "        cur += x;",
      "        if (mp.count(cur - k)) ans += mp[cur - k];",
      "        mp[cur]++;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "前缀和 + 哈希表：子数组和 s[j] - s[i] == k 等价于寻找历史前缀和 s[i] == s[j] - k 的频次。哈希表记录每个前缀和出现的次数，初始化 mp[0] = 1，边走边累加 ans += mp[curSum - k]。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "必须初始化 mp[0] = 1，以处理从第 0 个元素开始的和恰为 k 的子数组。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "subarray-sum-equals-k",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 和为 K 的子数组",
      "desc": "【灵神心法点拨】：前缀和 + 哈希表：子数组和 s[j] - s[i] == k 等价于寻找历史前缀和 s[i] == s[j] - k 的频次。哈希表记录每个前缀和出现的次数，初始化 mp[0] = 1，边走边累加 ans += mp[curSum - k]。",
      "code": [
        "int subarraySum(vector<int>& nums, int k) {",
        "    unordered_map<int, int> mp;",
        "    mp[0] = 1;",
        "    int cur = 0, ans = 0;",
        "    for (int x : nums) {",
        "        cur += x;",
        "        if (mp.count(cur - k)) ans += mp[cur - k];",
        "        mp[cur]++;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 560）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int subarraySum(vector<int>& nums, int k) {",
        "    unordered_map<int, int> mp;",
        "    mp[0] = 1;",
        "    int cur = 0, ans = 0;",
        "    for (int x : nums) {",
        "        cur += x;",
        "        if (mp.count(cur - k)) ans += mp[cur - k];",
        "        mp[cur]++;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1094",
    "mod": "data-structures",
    "idx": 3,
    "title": "拼车",
    "lc": "LeetCode 1094",
    "lcNum": 1094,
    "diff": 1,
    "tags": [
      "一维差分",
      "数组"
    ],
    "by": "return",
    "brief": "车上最初有 capacity 个空座位。车只能向一个方向行驶。给你 trips 数组，判断是否能顺利接送所有乘客而始终不超载。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[4,4,4],[5,3,4]] | 3",
      "[[2,2,4],[1,5,4]] | 1"
    ],
    "sig": "// LeetCode 1094 函数签名",
    "template": "// LeetCode 1094 拼车\n",
    "hints": [
      "一维差分经典题：对每个区间 [from, to) 增加 num 乘客，差分数组操作为 diff[from] += num, diff[to] -= num（在 to 站乘客已下车，所以右端点是开区间）。遍历差分数组还原前缀和并检查是否超过 capacity。"
    ],
    "ref": [
      "bool carPooling(vector<vector<int>>& trips, int capacity) {",
      "    int diff[1001] = {0};",
      "    for (auto& t : trips) {",
      "        diff[t[1]] += t[0];",
      "        diff[t[2]] -= t[0];",
      "    }",
      "    int cur = 0;",
      "    for (int i = 0; i <= 1000; ++i) {",
      "        cur += diff[i];",
      "        if (cur > capacity) return false;",
      "    }",
      "    return true;",
      "}"
    ],
    "note": "一维差分经典题：对每个区间 [from, to) 增加 num 乘客，差分数组操作为 diff[from] += num, diff[to] -= num（在 to 站乘客已下车，所以右端点是开区间）。遍历差分数组还原前缀和并检查是否超过 capacity。",
    "complexity": "时间 O(n + max_pos)，空间 O(max_pos)。",
    "pitfalls": [
      "乘客在 to 站已经下车，减法是在 diff[to] 上执行，而不是 diff[to + 1]。"
    ],
    "rating": 1441,
    "hot100": false,
    "slug": "car-pooling",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 拼车",
      "desc": "【灵神心法点拨】：一维差分经典题：对每个区间 [from, to) 增加 num 乘客，差分数组操作为 diff[from] += num, diff[to] -= num（在 to 站乘客已下车，所以右端点是开区间）。遍历差分数组还原前缀和并检查是否超过 capacity。",
      "code": [
        "bool carPooling(vector<vector<int>>& trips, int capacity) {",
        "    int diff[1001] = {0};",
        "    for (auto& t : trips) {",
        "        diff[t[1]] += t[0];",
        "        diff[t[2]] -= t[0];",
        "    }",
        "    int cur = 0;",
        "    for (int i = 0; i <= 1000; ++i) {",
        "        cur += diff[i];",
        "        if (cur > capacity) return false;",
        "    }",
        "    return true;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1094）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool carPooling(vector<vector<int>>& trips, int capacity) {",
        "    int diff[1001] = {0};",
        "    for (auto& t : trips) {",
        "        diff[t[1]] += t[0];",
        "        diff[t[2]] -= t[0];",
        "    }",
        "    int cur = 0;",
        "    for (int i = 0; i <= 1000; ++i) {",
        "        cur += diff[i];",
        "        if (cur > capacity) return false;",
        "    }",
        "    return true;",
        "}"
      ]
    }
  },
  {
    "id": "hp1",
    "mod": "data-structures",
    "idx": 4,
    "title": "数组中的第K个最大元素",
    "lc": "LeetCode 215",
    "lcNum": 215,
    "diff": 2,
    "tags": [
      "小顶堆",
      "快速选择",
      "Hot100"
    ],
    "by": "return",
    "brief": "给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。",
    "ioIn": "nums：整数数组；k：名次（1 ≤ k ≤ nums.size()）。",
    "ioOut": "返回第 k 大的值。",
    "ex": [
      {
        "i": "[3,2,1,5,6,4] | 2",
        "o": "5"
      },
      {
        "i": "[3,2,3,1,2,4,5,5,6] | 4",
        "o": "4"
      }
    ],
    "params": [
      "[3,2,1,5,6,4] | 2",
      "[3,2,3,1,2,4,5,5,6] | 4",
      "[1] | 1",
      "[2,1] | 2"
    ],
    "sig": "int findKthLargest(vector<int>& nums, int k)",
    "template": "int findKthLargest(vector<int>& nums, int k) {\n    // 降序排序后取下标 k-1，或者使用快速选择思想\n    return 0;\n}",
    "hints": [
      "最直观解法：将数组从大到小排序，第 k 个最大的元素下标就是 k - 1。",
      "进阶优化可以使用大小为 k 的小顶堆，扫完后堆顶即为第 k 大。",
      "注意内置解释器已原生支持 sort(nums.begin(), nums.end())。"
    ],
    "ref": [
      "int findKthLargest(vector<int>& nums, int k) {",
      "    priority_queue<int, vector<int>, greater<int>> pq;",
      "    for (int x : nums) {",
      "        pq.push(x);",
      "        if (pq.size() > k) pq.pop();",
      "    }",
      "    return pq.top();",
      "}"
    ],
    "note": "维护大小固定为 k 的小顶堆 priority_queue<int, vector<int>, greater<int>>。遍历数组元素入堆，当堆大小超过 k 时弹出堆顶较小者。遍历结束后堆顶元素即为第 k 大元素。",
    "complexity": "时间 O(n log k)，空间 O(k)。",
    "pitfalls": [
      "找第 k 大维护大小为 k 的【小顶堆】，堆顶是前 k 大里面的最小值。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "kth-largest-element-in-an-array",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 数组中的第K个最大元素",
      "desc": "【灵神心法点拨】：维护大小固定为 k 的小顶堆 priority_queue<int, vector<int>, greater<int>>。遍历数组元素入堆，当堆大小超过 k 时弹出堆顶较小者。遍历结束后堆顶元素即为第 k 大元素。",
      "code": [
        "int findKthLargest(vector<int>& nums, int k) {",
        "    priority_queue<int, vector<int>, greater<int>> pq;",
        "    for (int x : nums) {",
        "        pq.push(x);",
        "        if (pq.size() > k) pq.pop();",
        "    }",
        "    return pq.top();",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 215）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int findKthLargest(vector<int>& nums, int k) {",
        "    priority_queue<int, vector<int>, greater<int>> pq;",
        "    for (int x : nums) {",
        "        pq.push(x);",
        "        if (pq.size() > k) pq.pop();",
        "    }",
        "    return pq.top();",
        "}"
      ]
    }
  },
  {
    "id": "hp2",
    "mod": "data-structures",
    "idx": 5,
    "title": "前 K 个高频元素",
    "lc": "LeetCode 347",
    "lcNum": 347,
    "diff": 1,
    "tags": [
      "哈希表",
      "堆",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。",
    "ioIn": "nums：整数数组；k：需要的前 k 个高频数。",
    "ioOut": "返回前 k 个高频元素构成的升序数组。",
    "ex": [
      {
        "i": "[1,1,1,2,2,3] | 2",
        "o": "[1,2]"
      },
      {
        "i": "[1] | 1",
        "o": "[1]"
      }
    ],
    "params": [
      "[1,1,1,2,2,3] | 2",
      "[1] | 1",
      "[4,1,-1,2,-1,2,3] | 2"
    ],
    "sig": "vector<int> topKFrequent(vector<int>& nums, int k)",
    "template": "vector<int> topKFrequent(vector<int>& nums, int k) {\n    // 1. 用 unordered_map 统计每个数字出现的频次\n    // 2. 挑出频次最高的 k 个元素\n    return {};\n}",
    "hints": [
      "第一步：哈希表 map<int, int> 记录 元素 -> 频次。",
      "第二步：把所有 (频次, 元素) 二元组收集并排序，或者基于桶排序。",
      "取频次最高的 k 个数字返回。"
    ],
    "ref": [
      "vector<int> topKFrequent(vector<int>& nums, int k) {",
      "    unordered_map<int, int> cnt;",
      "    for (int x : nums) cnt[x]++;",
      "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
      "    for (auto& [val, freq] : cnt) {",
      "        pq.push({freq, val});",
      "        if (pq.size() > k) pq.pop();",
      "    }",
      "    vector<int> ans;",
      "    while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }",
      "    return ans;",
      "}"
    ],
    "note": "先哈希表统计频次。维护大小为 k 的小顶堆，堆元素为 pair<频次, 元素值>。当堆内元素个数超过 k 时弹出频次最低的堆顶，最终堆中剩余的即为前 k 个高频元素。",
    "complexity": "时间 O(n log k)，空间 O(n)。",
    "pitfalls": [
      "堆内比较的是频次 pair.first，因此存入格式为 pair<count, val>。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "top-k-frequent-elements",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 前 K 个高频元素",
      "desc": "【灵神心法点拨】：先哈希表统计频次。维护大小为 k 的小顶堆，堆元素为 pair<频次, 元素值>。当堆内元素个数超过 k 时弹出频次最低的堆顶，最终堆中剩余的即为前 k 个高频元素。",
      "code": [
        "vector<int> topKFrequent(vector<int>& nums, int k) {",
        "    unordered_map<int, int> cnt;",
        "    for (int x : nums) cnt[x]++;",
        "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
        "    for (auto& [val, freq] : cnt) {",
        "        pq.push({freq, val});",
        "        if (pq.size() > k) pq.pop();",
        "    }",
        "    vector<int> ans;",
        "    while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 347）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> topKFrequent(vector<int>& nums, int k) {",
        "    unordered_map<int, int> cnt;",
        "    for (int x : nums) cnt[x]++;",
        "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
        "    for (auto& [val, freq] : cnt) {",
        "        pq.push({freq, val});",
        "        if (pq.size() > k) pq.pop();",
        "    }",
        "    vector<int> ans;",
        "    while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "gr3",
    "mod": "data-structures",
    "idx": 6,
    "title": "省份数量",
    "lc": "LeetCode 547",
    "lcNum": 547,
    "diff": 1,
    "tags": [
      "并查集",
      "图论"
    ],
    "by": "return",
    "brief": "有 n 个城市，其中一些彼此相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。返回省份（连通分量）的总数。",
    "ioIn": "isConnected：n × n 的邻接矩阵。",
    "ioOut": "返回连通分量（省份）个数。",
    "ex": [
      {
        "i": "[[1,1,0],[1,1,0],[0,0,1]]",
        "o": "2"
      },
      {
        "i": "[[1,0,0],[0,1,0],[0,0,1]]",
        "o": "3"
      }
    ],
    "params": [
      "[[1,1,0],[1,1,0],[0,0,1]]",
      "[[1,0,0],[0,1,0],[0,0,1]]",
      "[[1]]",
      "[[1,1],[1,1]]"
    ],
    "sig": "int findCircleNum(vector<vector<int>>& isConnected)",
    "template": "void dfs(vector<vector<int>>& isConnected, vector<bool>& vis, int i) {\n    // 遍历城市 i 的所有邻接城市\n}\n\nint findCircleNum(vector<vector<int>>& isConnected) {\n    int n = isConnected.size(), ans = 0;\n    // 对每个未访问的城市发起一次 DFS 探索整个省份\n    return ans;\n}",
    "hints": [
      "求无向图连通分量的数量。",
      "用一个 visited 数组记录已经属于某个省份的城市。",
      "遍历每个城市 i，只要未访问过，就说明发现了一个新省份，答案加 1，并用 DFS/BFS 访问其所有能到达的城市。"
    ],
    "ref": [
      "int findCircleNum(vector<vector<int>>& isConnected) {",
      "    int n = isConnected.size(), count = n;",
      "    vector<int> parent(n);",
      "    iota(parent.begin(), parent.end(), 0);",
      "    auto find = [&](auto self, int x) -> int {",
      "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
      "    };",
      "    for (int i = 0; i < n; ++i) {",
      "        for (int j = i + 1; j < n; ++j) {",
      "            if (isConnected[i][j]) {",
      "                int rootI = find(find, i), rootJ = find(find, j);",
      "                if (rootI != rootJ) { parent[rootI] = rootJ; count--; }",
      "            }",
      "        }",
      "    }",
      "    return count;",
      "}"
    ],
    "note": "并查集连通分量计数：初始化并查集 parent[i] = i，集合个数 count = n。若 isConnected[i][j] == 1 且 find(i) != find(j)，则合并两集合并将 count 减一。最终返回 count。",
    "complexity": "时间 O(n^2 * α(n))，空间 O(n)。",
    "pitfalls": [
      "使用路径压缩 find(x)：parent[x] = find(parent[x]) 保证常数级别查询效率。"
    ],
    "rating": 1350,
    "hot100": false,
    "slug": "number-of-provinces",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 省份数量",
      "desc": "【灵神心法点拨】：并查集连通分量计数：初始化并查集 parent[i] = i，集合个数 count = n。若 isConnected[i][j] == 1 且 find(i) != find(j)，则合并两集合并将 count 减一。最终返回 count。",
      "code": [
        "int findCircleNum(vector<vector<int>>& isConnected) {",
        "    int n = isConnected.size(), count = n;",
        "    vector<int> parent(n);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    for (int i = 0; i < n; ++i) {",
        "        for (int j = i + 1; j < n; ++j) {",
        "            if (isConnected[i][j]) {",
        "                int rootI = find(find, i), rootJ = find(find, j);",
        "                if (rootI != rootJ) { parent[rootI] = rootJ; count--; }",
        "            }",
        "        }",
        "    }",
        "    return count;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 547）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int findCircleNum(vector<vector<int>>& isConnected) {",
        "    int n = isConnected.size(), count = n;",
        "    vector<int> parent(n);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    for (int i = 0; i < n; ++i) {",
        "        for (int j = i + 1; j < n; ++j) {",
        "            if (isConnected[i][j]) {",
        "                int rootI = find(find, i), rootJ = find(find, j);",
        "                if (rootI != rootJ) { parent[rootI] = rootJ; count--; }",
        "            }",
        "        }",
        "    }",
        "    return count;",
        "}"
      ]
    }
  },
  {
    "id": "dt2",
    "mod": "data-structures",
    "idx": 7,
    "title": "冗余连接",
    "lc": "LeetCode 684",
    "lcNum": 684,
    "diff": 2,
    "tags": [
      "并查集",
      "树与图"
    ],
    "by": "return",
    "brief": "树可以看成是一个连通且 无环 的 无向 图。给定往一棵树中添加一条边后的图，找出并返回一条可以删去的边，使得结果图是一个有着 N 个节点的树。",
    "ioIn": "edges：边列表，每条边是 [u, v]。",
    "ioOut": "返回导致环的边 [u, v]。",
    "ex": [
      {
        "i": "[[1,2],[1,3],[2,3]]",
        "o": "[2,3]"
      },
      {
        "i": "[[1,2],[2,3],[3,4],[1,4],[1,5]]",
        "o": "[1,4]"
      }
    ],
    "params": [
      "[[1,2],[1,3],[2,3]]",
      "[[1,2],[2,3],[3,4],[1,4],[1,5]]",
      "[[1,2],[2,3],[1,3]]"
    ],
    "sig": "vector<int> findRedundantConnection(vector<vector<int>>& edges)",
    "template": "int findRoot(vector<int>& parent, int x) {\n    // 查根节点\n    return x;\n}\n\nvector<int> findRedundantConnection(vector<vector<int>>& edges) {\n    // 并查集：若边的两端点已有相同根，说明加入此边会成环\n    return {};\n}",
    "hints": [
      "并查集经典应用：每条边把两个集合连通。",
      "在加入一条边 (u, v) 之前，先查 u 和 v 的根：如果它们已经在同一个集合中，则该边必然成环！",
      "按顺序遍历边，第一条导致连通冲突的边就是题意要求的答案。"
    ],
    "ref": [
      "vector<int> findRedundantConnection(vector<vector<int>>& edges) {",
      "    int n = edges.size();",
      "    vector<int> parent(n + 1);",
      "    iota(parent.begin(), parent.end(), 0);",
      "    auto find = [&](auto self, int x) -> int {",
      "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
      "    };",
      "    for (auto& e : edges) {",
      "        int r1 = find(find, e[0]), r2 = find(find, e[1]);",
      "        if (r1 == r2) return e;",
      "        parent[r1] = r2;",
      "    }",
      "    return {};",
      "}"
    ],
    "note": "加边判环：遍历每条边 [u, v]。若 find(u) == find(v)，说明 u 和 v 已经在同一个连通块中了，再加上这条边就会产生环，因此这条边就是导致成环的冗余连接，直接返回！",
    "complexity": "时间 O(n * α(n))，空间 O(n)。",
    "pitfalls": [
      "节点编号从 1 开始到 n，数组大小需要开 n + 1。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "redundant-connection",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 冗余连接",
      "desc": "【灵神心法点拨】：加边判环：遍历每条边 [u, v]。若 find(u) == find(v)，说明 u 和 v 已经在同一个连通块中了，再加上这条边就会产生环，因此这条边就是导致成环的冗余连接，直接返回！",
      "code": [
        "vector<int> findRedundantConnection(vector<vector<int>>& edges) {",
        "    int n = edges.size();",
        "    vector<int> parent(n + 1);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    for (auto& e : edges) {",
        "        int r1 = find(find, e[0]), r2 = find(find, e[1]);",
        "        if (r1 == r2) return e;",
        "        parent[r1] = r2;",
        "    }",
        "    return {};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 684）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> findRedundantConnection(vector<vector<int>>& edges) {",
        "    int n = edges.size();",
        "    vector<int> parent(n + 1);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    for (auto& e : edges) {",
        "        int r1 = find(find, e[0]), r2 = find(find, e[1]);",
        "        if (r1 == r2) return e;",
        "        parent[r1] = r2;",
        "    }",
        "    return {};",
        "}"
      ]
    }
  },
  {
    "id": "p_208",
    "mod": "data-structures",
    "idx": 8,
    "title": "实现 Trie (前缀树)",
    "lc": "LeetCode 208",
    "lcNum": 208,
    "diff": 1,
    "tags": [
      "字典树",
      "字符串",
      "Hot100"
    ],
    "by": "return",
    "brief": "Trie（发音类似 \"try\"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。实现 Trie 类。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      ""
    ],
    "sig": "// LeetCode 208 函数签名",
    "template": "// LeetCode 208 实现 Trie (前缀树)\n",
    "hints": [
      "字典树节点结构包含 children[26] 指针数组和一个 isEnd 标记。insert 顺着字符分支往下走，无分支则新建；search 顺着走到底检查 isEnd；startsWith 顺着走到底只要中途不断即可返回 true。"
    ],
    "ref": [
      "class Trie {",
      "    struct Node {",
      "        Node* next[26] = {nullptr};",
      "        bool isEnd = false;",
      "    };",
      "    Node* root;",
      "public:",
      "    Trie() { root = new Node(); }",
      "    void insert(string word) {",
      "        Node* cur = root;",
      "        for (char c : word) {",
      "            if (!cur->next[c - 'a']) cur->next[c - 'a'] = new Node();",
      "            cur = cur->next[c - 'a'];",
      "        }",
      "        cur->isEnd = true;",
      "    }",
      "    bool search(string word) {",
      "        Node* cur = root;",
      "        for (char c : word) {",
      "            if (!cur->next[c - 'a']) return false;",
      "            cur = cur->next[c - 'a'];",
      "        }",
      "        return cur->isEnd;",
      "    }",
      "    bool startsWith(string prefix) {",
      "        Node* cur = root;",
      "        for (char c : prefix) {",
      "            if (!cur->next[c - 'a']) return false;",
      "            cur = cur->next[c - 'a'];",
      "        }",
      "        return true;",
      "    }",
      "};"
    ],
    "note": "字典树节点结构包含 children[26] 指针数组和一个 isEnd 标记。insert 顺着字符分支往下走，无分支则新建；search 顺着走到底检查 isEnd；startsWith 顺着走到底只要中途不断即可返回 true。",
    "complexity": "插入/查询时间 O(L)，空间 O(L * 26)。",
    "pitfalls": [
      "析构或者智能指针避免内存泄漏。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "implement-trie-prefix-tree",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 实现 Trie (前缀树)",
      "desc": "【灵神心法点拨】：字典树节点结构包含 children[26] 指针数组和一个 isEnd 标记。insert 顺着字符分支往下走，无分支则新建；search 顺着走到底检查 isEnd；startsWith 顺着走到底只要中途不断即可返回 true。",
      "code": [
        "class Trie {",
        "    struct Node {",
        "        Node* next[26] = {nullptr};",
        "        bool isEnd = false;",
        "    };",
        "    Node* root;",
        "public:",
        "    Trie() { root = new Node(); }",
        "    void insert(string word) {",
        "        Node* cur = root;",
        "        for (char c : word) {",
        "            if (!cur->next[c - 'a']) cur->next[c - 'a'] = new Node();",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        cur->isEnd = true;",
        "    }",
        "    bool search(string word) {",
        "        Node* cur = root;",
        "        for (char c : word) {",
        "            if (!cur->next[c - 'a']) return false;",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        return cur->isEnd;",
        "    }",
        "    bool startsWith(string prefix) {",
        "        Node* cur = root;",
        "        for (char c : prefix) {",
        "            if (!cur->next[c - 'a']) return false;",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        return true;",
        "    }",
        "};"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 208）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "class Trie {",
        "    struct Node {",
        "        Node* next[26] = {nullptr};",
        "        bool isEnd = false;",
        "    };",
        "    Node* root;",
        "public:",
        "    Trie() { root = new Node(); }",
        "    void insert(string word) {",
        "        Node* cur = root;",
        "        for (char c : word) {",
        "            if (!cur->next[c - 'a']) cur->next[c - 'a'] = new Node();",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        cur->isEnd = true;",
        "    }",
        "    bool search(string word) {",
        "        Node* cur = root;",
        "        for (char c : word) {",
        "            if (!cur->next[c - 'a']) return false;",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        return cur->isEnd;",
        "    }",
        "    bool startsWith(string prefix) {",
        "        Node* cur = root;",
        "        for (char c : prefix) {",
        "            if (!cur->next[c - 'a']) return false;",
        "            cur = cur->next[c - 'a'];",
        "        }",
        "        return true;",
        "    }",
        "};"
      ]
    }
  },
  {
    "id": "p_307",
    "mod": "data-structures",
    "idx": 9,
    "title": "区域和检索 - 数组可修改",
    "lc": "LeetCode 307",
    "lcNum": 307,
    "diff": 2,
    "tags": [
      "树状数组",
      "线段树"
    ],
    "by": "return",
    "brief": "给你一个数组 nums ，请你完成两类查询：更新数组特定位置的值；计算数组索引 left 到 right 之间元素的总和。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "7",
      "5"
    ],
    "sig": "// LeetCode 307 函数签名",
    "template": "// LeetCode 307 区域和检索 - 数组可修改\n",
    "hints": [
      "单点修改 + 区间查询经典数据结构。树状数组使用 lowbit(x) = x & (-x) 进行跳跃更新与求前缀和。区间和等价于 query(right) - query(left - 1)。单次修改与查询均只需 O(log n)。"
    ],
    "ref": [
      "class NumArray {",
      "    vector<int> tree, nums;",
      "    int n;",
      "    int lowbit(int x) { return x & (-x); }",
      "    void add(int i, int delta) {",
      "        for (; i <= n; i += lowbit(i)) tree[i] += delta;",
      "    }",
      "    int query(int i) {",
      "        int sum = 0;",
      "        for (; i > 0; i -= lowbit(i)) sum += tree[i];",
      "        return sum;",
      "    }",
      "public:",
      "    NumArray(vector<int>& _nums) : nums(_nums), n(_nums.size()), tree(_nums.size() + 1, 0) {",
      "        for (int i = 0; i < n; ++i) add(i + 1, nums[i]);",
      "    }",
      "    void update(int index, int val) {",
      "        add(index + 1, val - nums[index]);",
      "        nums[index] = val;",
      "    }",
      "    int sumRange(int left, int right) {",
      "        return query(right + 1) - query(left);",
      "    }",
      "};"
    ],
    "note": "单点修改 + 区间查询经典数据结构。树状数组使用 lowbit(x) = x & (-x) 进行跳跃更新与求前缀和。区间和等价于 query(right) - query(left - 1)。单次修改与查询均只需 O(log n)。",
    "complexity": "修改 O(log n)，查询 O(log n)，空间 O(n)。",
    "pitfalls": [
      "树状数组下标从 1 开始，单点更新时计算增量 delta = val - nums[index]。"
    ],
    "rating": 1650,
    "hot100": false,
    "slug": "range-sum-query-mutable",
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 区域和检索 - 数组可修改",
      "desc": "【灵神心法点拨】：单点修改 + 区间查询经典数据结构。树状数组使用 lowbit(x) = x & (-x) 进行跳跃更新与求前缀和。区间和等价于 query(right) - query(left - 1)。单次修改与查询均只需 O(log n)。",
      "code": [
        "class NumArray {",
        "    vector<int> tree, nums;",
        "    int n;",
        "    int lowbit(int x) { return x & (-x); }",
        "    void add(int i, int delta) {",
        "        for (; i <= n; i += lowbit(i)) tree[i] += delta;",
        "    }",
        "    int query(int i) {",
        "        int sum = 0;",
        "        for (; i > 0; i -= lowbit(i)) sum += tree[i];",
        "        return sum;",
        "    }",
        "public:",
        "    NumArray(vector<int>& _nums) : nums(_nums), n(_nums.size()), tree(_nums.size() + 1, 0) {",
        "        for (int i = 0; i < n; ++i) add(i + 1, nums[i]);",
        "    }",
        "    void update(int index, int val) {",
        "        add(index + 1, val - nums[index]);",
        "        nums[index] = val;",
        "    }",
        "    int sumRange(int left, int right) {",
        "        return query(right + 1) - query(left);",
        "    }",
        "};"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 307）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "class NumArray {",
        "    vector<int> tree, nums;",
        "    int n;",
        "    int lowbit(int x) { return x & (-x); }",
        "    void add(int i, int delta) {",
        "        for (; i <= n; i += lowbit(i)) tree[i] += delta;",
        "    }",
        "    int query(int i) {",
        "        int sum = 0;",
        "        for (; i > 0; i -= lowbit(i)) sum += tree[i];",
        "        return sum;",
        "    }",
        "public:",
        "    NumArray(vector<int>& _nums) : nums(_nums), n(_nums.size()), tree(_nums.size() + 1, 0) {",
        "        for (int i = 0; i < n; ++i) add(i + 1, nums[i]);",
        "    }",
        "    void update(int index, int val) {",
        "        add(index + 1, val - nums[index]);",
        "        nums[index] = val;",
        "    }",
        "    int sumRange(int left, int right) {",
        "        return query(right + 1) - query(left);",
        "    }",
        "};"
      ]
    }
  },
  {
    "id": "gr2",
    "mod": "graph",
    "idx": 1,
    "title": "课程表",
    "lc": "LeetCode 207",
    "lcNum": 207,
    "diff": 1,
    "tags": [
      "拓扑排序",
      "有向图判环",
      "Hot100"
    ],
    "by": "return",
    "brief": "你这个学期必须选修 numCourses 门课程。先修课程按数组 prerequisites 给出。请你判断是否可能完成所有课程的学习？",
    "ioIn": "numCourses：课程数；prerequisites：先修关系二维数组。",
    "ioOut": "能修完返回 true，有环返回 false。",
    "ex": [
      {
        "i": "2 | [[1,0]]",
        "o": "true"
      },
      {
        "i": "2 | [[1,0],[0,1]]",
        "o": "false"
      }
    ],
    "params": [
      "2 | [[1,0]]",
      "2 | [[1,0],[0,1]]",
      "3 | [[1,0],[2,1]]",
      "1 | []"
    ],
    "sig": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites)",
    "template": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    // 建立入度表 inDegree 和邻接表\n    // 用队列进行 BFS 拓扑排序\n    return true;\n}",
    "hints": [
      "拓扑排序经典题：先修依赖是有向边 b -> a。",
      "统计每门课程的入度（依赖数量），把入度为 0 的课程全部推入队列。",
      "出队一门课，就把它指向的所有后继课程入度减 1；若减到 0 则入队。最后看学完的课程数是否等于 numCourses。"
    ],
    "ref": [
      "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {",
      "    vector<vector<int>> g(numCourses);",
      "    vector<int> inDegree(numCourses, 0);",
      "    for (auto& p : prerequisites) {",
      "        g[p[1]].push_back(p[0]);",
      "        inDegree[p[0]]++;",
      "    }",
      "    queue<int> q;",
      "    for (int i = 0; i < numCourses; ++i) {",
      "        if (inDegree[i] == 0) q.push(i);",
      "    }",
      "    int visited = 0;",
      "    while (!q.empty()) {",
      "        int u = q.front(); q.pop();",
      "        visited++;",
      "        for (int v : g[u]) {",
      "            if (--inDegree[v] == 0) q.push(v);",
      "        }",
      "    }",
      "    return visited == numCourses;",
      "}"
    ],
    "note": "有向图判环母题（Kahn 拓扑排序算法）：统计每个节点的入度 inDegree。将所有入度为 0 的节点入队。不断从队列弹出节点，将其指向的所有邻接点的入度减一，若邻接点入度减为 0 则入队。最终出队节点总数若等于 numCourses 说明是有向无环图 (DAG)，否则有环。",
    "complexity": "时间 O(V + E)，空间 O(V + E)。",
    "pitfalls": [
      "注意 prerequisites[i] = [a, b] 表示选 a 之前必须先修 b，边是有向边 b -> a。"
    ],
    "rating": 1450,
    "hot100": true,
    "slug": "course-schedule",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 课程表",
      "desc": "【灵神心法点拨】：有向图判环母题（Kahn 拓扑排序算法）：统计每个节点的入度 inDegree。将所有入度为 0 的节点入队。不断从队列弹出节点，将其指向的所有邻接点的入度减一，若邻接点入度减为 0 则入队。最终出队节点总数若等于 numCourses 说明是有向无环图 (DAG)，否则有环。",
      "code": [
        "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {",
        "    vector<vector<int>> g(numCourses);",
        "    vector<int> inDegree(numCourses, 0);",
        "    for (auto& p : prerequisites) {",
        "        g[p[1]].push_back(p[0]);",
        "        inDegree[p[0]]++;",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < numCourses; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    int visited = 0;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        visited++;",
        "        for (int v : g[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    return visited == numCourses;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 207）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {",
        "    vector<vector<int>> g(numCourses);",
        "    vector<int> inDegree(numCourses, 0);",
        "    for (auto& p : prerequisites) {",
        "        g[p[1]].push_back(p[0]);",
        "        inDegree[p[0]]++;",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < numCourses; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    int visited = 0;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        visited++;",
        "        for (int v : g[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    return visited == numCourses;",
        "}"
      ]
    }
  },
  {
    "id": "p_210",
    "mod": "graph",
    "idx": 2,
    "title": "课程表 II",
    "lc": "LeetCode 210",
    "lcNum": 210,
    "diff": 2,
    "tags": [
      "拓扑排序",
      "图论"
    ],
    "by": "return",
    "brief": "给定课程总量以及先修条件列表，返回你为了学完所有课程所安排的学习顺序。如果不可能完成，返回一个空数组。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "4 | [[2,1,1],[1,2,1]]",
      "7 | [[4,5,3],[5,3,4]]"
    ],
    "sig": "// LeetCode 210 函数签名",
    "template": "// LeetCode 210 课程表 II\n",
    "hints": [
      "拓扑排序记录输出序列：按照 Kahn 算法流程，每次从队列中弹出入度为 0 的课程时，将其追加到答案数组 ans 中。最终检查 ans.size() 是否等于 numCourses。"
    ],
    "ref": [
      "vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {",
      "    vector<vector<int>> g(numCourses);",
      "    vector<int> inDegree(numCourses, 0);",
      "    for (auto& p : prerequisites) {",
      "        g[p[1]].push_back(p[0]);",
      "        inDegree[p[0]]++;",
      "    }",
      "    queue<int> q;",
      "    for (int i = 0; i < numCourses; ++i) {",
      "        if (inDegree[i] == 0) q.push(i);",
      "    }",
      "    vector<int> ans;",
      "    while (!q.empty()) {",
      "        int u = q.front(); q.pop();",
      "        ans.push_back(u);",
      "        for (int v : g[u]) {",
      "            if (--inDegree[v] == 0) q.push(v);",
      "        }",
      "    }",
      "    return ans.size() == numCourses ? ans : vector<int>{};",
      "}"
    ],
    "note": "拓扑排序记录输出序列：按照 Kahn 算法流程，每次从队列中弹出入度为 0 的课程时，将其追加到答案数组 ans 中。最终检查 ans.size() 是否等于 numCourses。",
    "complexity": "时间 O(V + E)，空间 O(V + E)。",
    "pitfalls": [
      "有环时必须返回空数组 {}。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "course-schedule-ii",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 课程表 II",
      "desc": "【灵神心法点拨】：拓扑排序记录输出序列：按照 Kahn 算法流程，每次从队列中弹出入度为 0 的课程时，将其追加到答案数组 ans 中。最终检查 ans.size() 是否等于 numCourses。",
      "code": [
        "vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {",
        "    vector<vector<int>> g(numCourses);",
        "    vector<int> inDegree(numCourses, 0);",
        "    for (auto& p : prerequisites) {",
        "        g[p[1]].push_back(p[0]);",
        "        inDegree[p[0]]++;",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < numCourses; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    vector<int> ans;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        ans.push_back(u);",
        "        for (int v : g[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    return ans.size() == numCourses ? ans : vector<int>{};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 210）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {",
        "    vector<vector<int>> g(numCourses);",
        "    vector<int> inDegree(numCourses, 0);",
        "    for (auto& p : prerequisites) {",
        "        g[p[1]].push_back(p[0]);",
        "        inDegree[p[0]]++;",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < numCourses; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    vector<int> ans;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        ans.push_back(u);",
        "        for (int v : g[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    return ans.size() == numCourses ? ans : vector<int>{};",
        "}"
      ]
    }
  },
  {
    "id": "p_802",
    "mod": "graph",
    "idx": 3,
    "title": "找到最终的安全状态",
    "lc": "LeetCode 802",
    "lcNum": 802,
    "diff": 2,
    "tags": [
      "反向拓扑排序",
      "三色标记"
    ],
    "by": "return",
    "brief": "若一个节点无法到达任何环，则该节点是安全的。返回一个由图中所有安全的节点组成的数组，并按升序排列。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,2,4],[3,4,2]]",
      "[[4,3,3],[3,1,5]]"
    ],
    "sig": "// LeetCode 802 函数签名",
    "template": "// LeetCode 802 找到最终的安全状态\n",
    "hints": [
      "【反向建图 + 拓扑排序】：终端节点出度为 0。反向建图后，终端节点的入度为 0。沿着反向边做拓扑排序，能被拓扑遍历到的节点必然不能到达任何环，即为安全节点！"
    ],
    "ref": [
      "vector<int> eventualSafeNodes(vector<vector<int>>& graph) {",
      "    int n = graph.size();",
      "    vector<vector<int>> rg(n);",
      "    vector<int> inDegree(n, 0);",
      "    for (int u = 0; u < n; ++u) {",
      "        for (int v : graph[u]) {",
      "            rg[v].push_back(u);",
      "        }",
      "        inDegree[u] = graph[u].size();",
      "    }",
      "    queue<int> q;",
      "    for (int i = 0; i < n; ++i) {",
      "        if (inDegree[i] == 0) q.push(i);",
      "    }",
      "    vector<int> ans;",
      "    while (!q.empty()) {",
      "        int u = q.front(); q.pop();",
      "        ans.push_back(u);",
      "        for (int v : rg[u]) {",
      "            if (--inDegree[v] == 0) q.push(v);",
      "        }",
      "    }",
      "    sort(ans.begin(), ans.end());",
      "    return ans;",
      "}"
    ],
    "note": "【反向建图 + 拓扑排序】：终端节点出度为 0。反向建图后，终端节点的入度为 0。沿着反向边做拓扑排序，能被拓扑遍历到的节点必然不能到达任何环，即为安全节点！",
    "complexity": "时间 O(V + E)，空间 O(V + E)。",
    "pitfalls": [
      "建立反向图 rg，统计原图的出度作为反向图的入度。最终结果按升序排序输出。"
    ],
    "rating": 1690,
    "hot100": false,
    "slug": "find-eventual-safe-states",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 找到最终的安全状态",
      "desc": "【灵神心法点拨】：【反向建图 + 拓扑排序】：终端节点出度为 0。反向建图后，终端节点的入度为 0。沿着反向边做拓扑排序，能被拓扑遍历到的节点必然不能到达任何环，即为安全节点！",
      "code": [
        "vector<int> eventualSafeNodes(vector<vector<int>>& graph) {",
        "    int n = graph.size();",
        "    vector<vector<int>> rg(n);",
        "    vector<int> inDegree(n, 0);",
        "    for (int u = 0; u < n; ++u) {",
        "        for (int v : graph[u]) {",
        "            rg[v].push_back(u);",
        "        }",
        "        inDegree[u] = graph[u].size();",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < n; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    vector<int> ans;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        ans.push_back(u);",
        "        for (int v : rg[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    sort(ans.begin(), ans.end());",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 802）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> eventualSafeNodes(vector<vector<int>>& graph) {",
        "    int n = graph.size();",
        "    vector<vector<int>> rg(n);",
        "    vector<int> inDegree(n, 0);",
        "    for (int u = 0; u < n; ++u) {",
        "        for (int v : graph[u]) {",
        "            rg[v].push_back(u);",
        "        }",
        "        inDegree[u] = graph[u].size();",
        "    }",
        "    queue<int> q;",
        "    for (int i = 0; i < n; ++i) {",
        "        if (inDegree[i] == 0) q.push(i);",
        "    }",
        "    vector<int> ans;",
        "    while (!q.empty()) {",
        "        int u = q.front(); q.pop();",
        "        ans.push_back(u);",
        "        for (int v : rg[u]) {",
        "            if (--inDegree[v] == 0) q.push(v);",
        "        }",
        "    }",
        "    sort(ans.begin(), ans.end());",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_743",
    "mod": "graph",
    "idx": 4,
    "title": "网络延迟时间",
    "lc": "LeetCode 743",
    "lcNum": 743,
    "diff": 2,
    "tags": [
      "Dijkstra",
      "单源最短路"
    ],
    "by": "return",
    "brief": "有 n 个网络节点，标记为 1 到 n 。给你一个列表 times ，表示信号经过有向边的传递时间。求从节点 k 发出的信号使所有节点都收到信号的最短时间。若不能则返回 -1。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,5,3],[4,5,5]] | 6 | 3",
      "[[5,4,2],[2,1,4]] | 4 | 3"
    ],
    "sig": "// LeetCode 743 函数签名",
    "template": "// LeetCode 743 网络延迟时间\n",
    "hints": [
      "堆优化 Dijkstra 经典母题：维护小顶堆 pq 保存 pair<dist, node>，初始化 dist[k] = 0，其余为无穷大。每次弹出距离最小的节点，若该距离大于 dist[u] 则跳过；松弛相连邻居并入堆。最终返回 max(dist)，若存在不可达节点返回 -1。"
    ],
    "ref": [
      "int networkDelayTime(vector<vector<int>>& times, int n, int k) {",
      "    vector<vector<pair<int, int>>> g(n + 1);",
      "    for (auto& t : times) g[t[0]].push_back({t[1], t[2]});",
      "    vector<int> dist(n + 1, INT_MAX);",
      "    dist[k] = 0;",
      "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
      "    pq.push({0, k});",
      "    while (!pq.empty()) {",
      "        auto [d, u] = pq.top(); pq.pop();",
      "        if (d > dist[u]) continue;",
      "        for (auto& [v, w] : g[u]) {",
      "            if (dist[u] + w < dist[v]) {",
      "                dist[v] = dist[u] + w;",
      "                pq.push({dist[v], v});",
      "            }",
      "        }",
      "    }",
      "    int ans = 0;",
      "    for (int i = 1; i <= n; ++i) {",
      "        if (dist[i] == INT_MAX) return -1;",
      "        ans = max(ans, dist[i]);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "堆优化 Dijkstra 经典母题：维护小顶堆 pq 保存 pair<dist, node>，初始化 dist[k] = 0，其余为无穷大。每次弹出距离最小的节点，若该距离大于 dist[u] 则跳过；松弛相连邻居并入堆。最终返回 max(dist)，若存在不可达节点返回 -1。",
    "complexity": "时间 O(E log E)，空间 O(V + E)。",
    "pitfalls": [
      "节点编号从 1 开始；小顶堆优先弹出最小距离，比较器格式 priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>>。"
    ],
    "rating": 1600,
    "hot100": false,
    "slug": "network-delay-time",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 网络延迟时间",
      "desc": "【灵神心法点拨】：堆优化 Dijkstra 经典母题：维护小顶堆 pq 保存 pair<dist, node>，初始化 dist[k] = 0，其余为无穷大。每次弹出距离最小的节点，若该距离大于 dist[u] 则跳过；松弛相连邻居并入堆。最终返回 max(dist)，若存在不可达节点返回 -1。",
      "code": [
        "int networkDelayTime(vector<vector<int>>& times, int n, int k) {",
        "    vector<vector<pair<int, int>>> g(n + 1);",
        "    for (auto& t : times) g[t[0]].push_back({t[1], t[2]});",
        "    vector<int> dist(n + 1, INT_MAX);",
        "    dist[k] = 0;",
        "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
        "    pq.push({0, k});",
        "    while (!pq.empty()) {",
        "        auto [d, u] = pq.top(); pq.pop();",
        "        if (d > dist[u]) continue;",
        "        for (auto& [v, w] : g[u]) {",
        "            if (dist[u] + w < dist[v]) {",
        "                dist[v] = dist[u] + w;",
        "                pq.push({dist[v], v});",
        "            }",
        "        }",
        "    }",
        "    int ans = 0;",
        "    for (int i = 1; i <= n; ++i) {",
        "        if (dist[i] == INT_MAX) return -1;",
        "        ans = max(ans, dist[i]);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 743）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int networkDelayTime(vector<vector<int>>& times, int n, int k) {",
        "    vector<vector<pair<int, int>>> g(n + 1);",
        "    for (auto& t : times) g[t[0]].push_back({t[1], t[2]});",
        "    vector<int> dist(n + 1, INT_MAX);",
        "    dist[k] = 0;",
        "    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;",
        "    pq.push({0, k});",
        "    while (!pq.empty()) {",
        "        auto [d, u] = pq.top(); pq.pop();",
        "        if (d > dist[u]) continue;",
        "        for (auto& [v, w] : g[u]) {",
        "            if (dist[u] + w < dist[v]) {",
        "                dist[v] = dist[u] + w;",
        "                pq.push({dist[v], v});",
        "            }",
        "        }",
        "    }",
        "    int ans = 0;",
        "    for (int i = 1; i <= n; ++i) {",
        "        if (dist[i] == INT_MAX) return -1;",
        "        ans = max(ans, dist[i]);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_1631",
    "mod": "graph",
    "idx": 5,
    "title": "最小体力消耗路径",
    "lc": "LeetCode 1631",
    "lcNum": 1631,
    "diff": 3,
    "tags": [
      "Dijkstra",
      "网格最短路"
    ],
    "by": "return",
    "brief": "路径的体力消耗定义为相邻格子高度差绝对值的最大值。返回从左上角到达右下角所需的 最小 体力消耗值。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,4,5],[2,1,5]]",
      "[[1,4,1],[4,5,5]]"
    ],
    "sig": "// LeetCode 1631 函数签名",
    "template": "// LeetCode 1631 最小体力消耗路径\n",
    "hints": [
      "将每一步的权重定义为高度差。使用 Dijkstra 算法维护 dist[r][c] 表示从 (0, 0) 到达该点路径上的最大落差。松弛方程为 newEffort = max(d, abs(h[r][c] - h[nr][nc]))，若小于 dist[nr][nc] 则更新并入堆。"
    ],
    "ref": [
      "int minimumEffortPath(vector<vector<int>>& heights) {",
      "    int m = heights.size(), n = heights[0].size();",
      "    vector<vector<int>> dist(m, vector<int>(n, INT_MAX));",
      "    dist[0][0] = 0;",
      "    using Tuple = tuple<int, int, int>;",
      "    priority_queue<Tuple, vector<Tuple>, greater<Tuple>> pq;",
      "    pq.push({0, 0, 0});",
      "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
      "    while (!pq.empty()) {",
      "        auto [d, r, c] = pq.top(); pq.pop();",
      "        if (d > dist[r][c]) continue;",
      "        if (r == m - 1 && c == n - 1) return d;",
      "        for (auto& dir : dirs) {",
      "            int nr = r + dir[0], nc = c + dir[1];",
      "            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {",
      "                int effort = max(d, abs(heights[r][c] - heights[nr][nc]));",
      "                if (effort < dist[nr][nc]) {",
      "                    dist[nr][nc] = effort;",
      "                    pq.push({effort, nr, nc});",
      "                }",
      "            }",
      "        }",
      "    }",
      "    return 0;",
      "}"
    ],
    "note": "将每一步的权重定义为高度差。使用 Dijkstra 算法维护 dist[r][c] 表示从 (0, 0) 到达该点路径上的最大落差。松弛方程为 newEffort = max(d, abs(h[r][c] - h[nr][nc]))，若小于 dist[nr][nc] 则更新并入堆。",
    "complexity": "时间 O(R * C log(R * C))，空间 O(R * C)。",
    "pitfalls": [
      "不是求路径和最小，而是求路径上的落差最大值最小。"
    ],
    "rating": 1948,
    "hot100": false,
    "slug": "path-with-minimum-effort",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 最小体力消耗路径",
      "desc": "【灵神心法点拨】：将每一步的权重定义为高度差。使用 Dijkstra 算法维护 dist[r][c] 表示从 (0, 0) 到达该点路径上的最大落差。松弛方程为 newEffort = max(d, abs(h[r][c] - h[nr][nc]))，若小于 dist[nr][nc] 则更新并入堆。",
      "code": [
        "int minimumEffortPath(vector<vector<int>>& heights) {",
        "    int m = heights.size(), n = heights[0].size();",
        "    vector<vector<int>> dist(m, vector<int>(n, INT_MAX));",
        "    dist[0][0] = 0;",
        "    using Tuple = tuple<int, int, int>;",
        "    priority_queue<Tuple, vector<Tuple>, greater<Tuple>> pq;",
        "    pq.push({0, 0, 0});",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!pq.empty()) {",
        "        auto [d, r, c] = pq.top(); pq.pop();",
        "        if (d > dist[r][c]) continue;",
        "        if (r == m - 1 && c == n - 1) return d;",
        "        for (auto& dir : dirs) {",
        "            int nr = r + dir[0], nc = c + dir[1];",
        "            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {",
        "                int effort = max(d, abs(heights[r][c] - heights[nr][nc]));",
        "                if (effort < dist[nr][nc]) {",
        "                    dist[nr][nc] = effort;",
        "                    pq.push({effort, nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return 0;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1631）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minimumEffortPath(vector<vector<int>>& heights) {",
        "    int m = heights.size(), n = heights[0].size();",
        "    vector<vector<int>> dist(m, vector<int>(n, INT_MAX));",
        "    dist[0][0] = 0;",
        "    using Tuple = tuple<int, int, int>;",
        "    priority_queue<Tuple, vector<Tuple>, greater<Tuple>> pq;",
        "    pq.push({0, 0, 0});",
        "    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};",
        "    while (!pq.empty()) {",
        "        auto [d, r, c] = pq.top(); pq.pop();",
        "        if (d > dist[r][c]) continue;",
        "        if (r == m - 1 && c == n - 1) return d;",
        "        for (auto& dir : dirs) {",
        "            int nr = r + dir[0], nc = c + dir[1];",
        "            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {",
        "                int effort = max(d, abs(heights[r][c] - heights[nr][nc]));",
        "                if (effort < dist[nr][nc]) {",
        "                    dist[nr][nc] = effort;",
        "                    pq.push({effort, nr, nc});",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return 0;",
        "}"
      ]
    }
  },
  {
    "id": "p_1584",
    "mod": "graph",
    "idx": 6,
    "title": "连接所有点的最小费用",
    "lc": "LeetCode 1584",
    "lcNum": 1584,
    "diff": 2,
    "tags": [
      "最小生成树",
      "Kruskal",
      "并查集"
    ],
    "by": "return",
    "brief": "给你一个 points 数组，表示 2D 平面上的一些点。连接两点成本为曼哈顿距离。返回将所有点连接在一起的最小总费用。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[3,3,2],[2,2,5]]",
      "[[5,2,1],[4,3,3]]"
    ],
    "sig": "// LeetCode 1584 函数签名",
    "template": "// LeetCode 1584 连接所有点的最小费用\n",
    "hints": [
      "Kruskal 最小生成树算法：计算所有点对之间的曼哈顿距离并构建边列表。按边权从小到大排序。利用并查集遍历每条边，若两端点不在同一连通块则合并并累加费用，直到连接了 n - 1 条边。"
    ],
    "ref": [
      "int minCostConnectPoints(vector<vector<int>>& points) {",
      "    int n = points.size();",
      "    struct Edge { int u, v, w; };",
      "    vector<Edge> edges;",
      "    for (int i = 0; i < n; ++i) {",
      "        for (int j = i + 1; j < n; ++j) {",
      "            int w = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);",
      "            edges.push_back({i, j, w});",
      "        }",
      "    }",
      "    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });",
      "    vector<int> parent(n);",
      "    iota(parent.begin(), parent.end(), 0);",
      "    auto find = [&](auto self, int x) -> int {",
      "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
      "    };",
      "    int totalCost = 0, count = 0;",
      "    for (auto& e : edges) {",
      "        int r1 = find(find, e.u), r2 = find(find, e.v);",
      "        if (r1 != r2) {",
      "            parent[r1] = r2;",
      "            totalCost += e.w;",
      "            if (++count == n - 1) break;",
      "        }",
      "    }",
      "    return totalCost;",
      "}"
    ],
    "note": "Kruskal 最小生成树算法：计算所有点对之间的曼哈顿距离并构建边列表。按边权从小到大排序。利用并查集遍历每条边，若两端点不在同一连通块则合并并累加费用，直到连接了 n - 1 条边。",
    "complexity": "时间 O(n^2 log(n^2))，空间 O(n^2)。",
    "pitfalls": [
      "曼哈顿距离公式 abs(x1 - x2) + abs(y1 - y2)；成功连入 n - 1 条边即可提前退出。"
    ],
    "rating": 1650,
    "hot100": false,
    "slug": "min-cost-to-connect-all-points",
    "lingshen": {
      "name": "灵神 Kahn 拓扑排序 / 堆优化 Dijkstra · 连接所有点的最小费用",
      "desc": "【灵神心法点拨】：Kruskal 最小生成树算法：计算所有点对之间的曼哈顿距离并构建边列表。按边权从小到大排序。利用并查集遍历每条边，若两端点不在同一连通块则合并并累加费用，直到连接了 n - 1 条边。",
      "code": [
        "int minCostConnectPoints(vector<vector<int>>& points) {",
        "    int n = points.size();",
        "    struct Edge { int u, v, w; };",
        "    vector<Edge> edges;",
        "    for (int i = 0; i < n; ++i) {",
        "        for (int j = i + 1; j < n; ++j) {",
        "            int w = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);",
        "            edges.push_back({i, j, w});",
        "        }",
        "    }",
        "    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });",
        "    vector<int> parent(n);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    int totalCost = 0, count = 0;",
        "    for (auto& e : edges) {",
        "        int r1 = find(find, e.u), r2 = find(find, e.v);",
        "        if (r1 != r2) {",
        "            parent[r1] = r2;",
        "            totalCost += e.w;",
        "            if (++count == n - 1) break;",
        "        }",
        "    }",
        "    return totalCost;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1584）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minCostConnectPoints(vector<vector<int>>& points) {",
        "    int n = points.size();",
        "    struct Edge { int u, v, w; };",
        "    vector<Edge> edges;",
        "    for (int i = 0; i < n; ++i) {",
        "        for (int j = i + 1; j < n; ++j) {",
        "            int w = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);",
        "            edges.push_back({i, j, w});",
        "        }",
        "    }",
        "    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });",
        "    vector<int> parent(n);",
        "    iota(parent.begin(), parent.end(), 0);",
        "    auto find = [&](auto self, int x) -> int {",
        "        return parent[x] == x ? x : parent[x] = self(self, parent[x]);",
        "    };",
        "    int totalCost = 0, count = 0;",
        "    for (auto& e : edges) {",
        "        int r1 = find(find, e.u), r2 = find(find, e.v);",
        "        if (r1 != r2) {",
        "            parent[r1] = r2;",
        "            totalCost += e.w;",
        "            if (++count == n - 1) break;",
        "        }",
        "    }",
        "    return totalCost;",
        "}"
      ]
    }
  },
  {
    "id": "p_136",
    "mod": "bit-manipulation",
    "idx": 1,
    "title": "只出现一次的数字",
    "lc": "LeetCode 136",
    "lcNum": 136,
    "diff": 1,
    "tags": [
      "位运算",
      "异或",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[8,3,12,1,3]",
      "[3,4,6,1,7,10,4]"
    ],
    "sig": "// LeetCode 136 函数签名",
    "template": "// LeetCode 136 只出现一次的数字\n",
    "hints": [
      "异或运算三大性质：x ^ x = 0；x ^ 0 = x；满足交换律与结合律。将数组所有元素异或在一起，出现两次的数字两两抵消归零，最终剩下的就是唯一的单身数字。"
    ],
    "ref": [
      "int singleNumber(vector<int>& nums) {",
      "    int ans = 0;",
      "    for (int x : nums) ans ^= x;",
      "    return ans;",
      "}"
    ],
    "note": "异或运算三大性质：x ^ x = 0；x ^ 0 = x；满足交换律与结合律。将数组所有元素异或在一起，出现两次的数字两两抵消归零，最终剩下的就是唯一的单身数字。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "必须保证其余元素恰好出现两次。"
    ],
    "rating": 1000,
    "hot100": true,
    "slug": "single-number",
    "lingshen": {
      "name": "灵神拆位法 / lowbit 最低位提取 · 只出现一次的数字",
      "desc": "【灵神心法点拨】：异或运算三大性质：x ^ x = 0；x ^ 0 = x；满足交换律与结合律。将数组所有元素异或在一起，出现两次的数字两两抵消归零，最终剩下的就是唯一的单身数字。",
      "code": [
        "int singleNumber(vector<int>& nums) {",
        "    int ans = 0;",
        "    for (int x : nums) ans ^= x;",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 136）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int singleNumber(vector<int>& nums) {",
        "    int ans = 0;",
        "    for (int x : nums) ans ^= x;",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_137",
    "mod": "bit-manipulation",
    "idx": 2,
    "title": "只出现一次的数字 II",
    "lc": "LeetCode 137",
    "lcNum": 137,
    "diff": 1,
    "tags": [
      "位运算",
      "拆位法"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[3,9,1,8,2,4]",
      "[4,2,3,7,12]"
    ],
    "sig": "// LeetCode 137 函数签名",
    "template": "// LeetCode 137 只出现一次的数字 II\n",
    "hints": [
      "【拆位法】：统计所有数字在二进制第 i 位（0..31）上 1 的个数之和 sum。若某个元素出现 3 次，它在第 i 位的 1 也会贡献 3 次；因此 sum % 3 的余数必然来自那个只出现一次的数字！将各位的余数重新拼装即得答案。"
    ],
    "ref": [
      "int singleNumber(vector<int>& nums) {",
      "    int ans = 0;",
      "    for (int i = 0; i < 32; ++i) {",
      "        int cnt = 0;",
      "        for (int x : nums) {",
      "            if ((x >> i) & 1) cnt++;",
      "        }",
      "        if (cnt % 3) ans |= (1U << i);",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "【拆位法】：统计所有数字在二进制第 i 位（0..31）上 1 的个数之和 sum。若某个元素出现 3 次，它在第 i 位的 1 也会贡献 3 次；因此 sum % 3 的余数必然来自那个只出现一次的数字！将各位的余数重新拼装即得答案。",
    "complexity": "时间 O(32 * n)，空间 O(1)。",
    "pitfalls": [
      "注意符号位处理，C++ 中 1 << 31 需防止有符号溢出，转为 (1U << i)。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "single-number-ii",
    "lingshen": {
      "name": "灵神拆位法 / lowbit 最低位提取 · 只出现一次的数字 II",
      "desc": "【灵神心法点拨】：【拆位法】：统计所有数字在二进制第 i 位（0..31）上 1 的个数之和 sum。若某个元素出现 3 次，它在第 i 位的 1 也会贡献 3 次；因此 sum % 3 的余数必然来自那个只出现一次的数字！将各位的余数重新拼装即得答案。",
      "code": [
        "int singleNumber(vector<int>& nums) {",
        "    int ans = 0;",
        "    for (int i = 0; i < 32; ++i) {",
        "        int cnt = 0;",
        "        for (int x : nums) {",
        "            if ((x >> i) & 1) cnt++;",
        "        }",
        "        if (cnt % 3) ans |= (1U << i);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 137）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int singleNumber(vector<int>& nums) {",
        "    int ans = 0;",
        "    for (int i = 0; i < 32; ++i) {",
        "        int cnt = 0;",
        "        for (int x : nums) {",
        "            if ((x >> i) & 1) cnt++;",
        "        }",
        "        if (cnt % 3) ans |= (1U << i);",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_260",
    "mod": "bit-manipulation",
    "idx": 3,
    "title": "只出现一次的数字 III",
    "lc": "LeetCode 260",
    "lcNum": 260,
    "diff": 2,
    "tags": [
      "位运算",
      "分组异或"
    ],
    "by": "return",
    "brief": "给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[4,9,12,9,6]",
      "[6,8,7,12,1,11]"
    ],
    "sig": "// LeetCode 260 函数签名",
    "template": "// LeetCode 260 只出现一次的数字 III\n",
    "hints": [
      "全部异或得到 xorSum = a ^ b（a != b 所以 xorSum != 0）。利用 lowbit(xorSum) = xorSum & (-xorSum) 提取最低位的 1，说明 a 和 b 在该二进制位上必然一个为 1 一个为 0。按该位是否为 1 将整个数组划分为两组异或，分别得到 a 和 b。"
    ],
    "ref": [
      "vector<int> singleNumber(vector<int>& nums) {",
      "    unsigned int xorSum = 0;",
      "    for (int x : nums) xorSum ^= x;",
      "    unsigned int lowbit = xorSum & (-xorSum);",
      "    int a = 0, b = 0;",
      "    for (int x : nums) {",
      "        if (x & lowbit) a ^= x;",
      "        else b ^= x;",
      "    }",
      "    return {a, b};",
      "}"
    ],
    "note": "全部异或得到 xorSum = a ^ b（a != b 所以 xorSum != 0）。利用 lowbit(xorSum) = xorSum & (-xorSum) 提取最低位的 1，说明 a 和 b 在该二进制位上必然一个为 1 一个为 0。按该位是否为 1 将整个数组划分为两组异或，分别得到 a 和 b。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "当 xorSum 为 INT_MIN 时 -xorSum 会溢出，需转换为 unsigned int。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "single-number-iii",
    "lingshen": {
      "name": "灵神拆位法 / lowbit 最低位提取 · 只出现一次的数字 III",
      "desc": "【灵神心法点拨】：全部异或得到 xorSum = a ^ b（a != b 所以 xorSum != 0）。利用 lowbit(xorSum) = xorSum & (-xorSum) 提取最低位的 1，说明 a 和 b 在该二进制位上必然一个为 1 一个为 0。按该位是否为 1 将整个数组划分为两组异或，分别得到 a 和 b。",
      "code": [
        "vector<int> singleNumber(vector<int>& nums) {",
        "    unsigned int xorSum = 0;",
        "    for (int x : nums) xorSum ^= x;",
        "    unsigned int lowbit = xorSum & (-xorSum);",
        "    int a = 0, b = 0;",
        "    for (int x : nums) {",
        "        if (x & lowbit) a ^= x;",
        "        else b ^= x;",
        "    }",
        "    return {a, b};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 260）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> singleNumber(vector<int>& nums) {",
        "    unsigned int xorSum = 0;",
        "    for (int x : nums) xorSum ^= x;",
        "    unsigned int lowbit = xorSum & (-xorSum);",
        "    int a = 0, b = 0;",
        "    for (int x : nums) {",
        "        if (x & lowbit) a ^= x;",
        "        else b ^= x;",
        "    }",
        "    return {a, b};",
        "}"
      ]
    }
  },
  {
    "id": "p_191",
    "mod": "bit-manipulation",
    "idx": 4,
    "title": "位 1 的个数",
    "lc": "LeetCode 191",
    "lcNum": 191,
    "diff": 1,
    "tags": [
      "位运算",
      "汉明重量"
    ],
    "by": "return",
    "brief": "编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位为 '1' 的个数（也被称为汉明重量）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "5",
      "6"
    ],
    "sig": "// LeetCode 191 函数签名",
    "template": "// LeetCode 191 位 1 的个数\n",
    "hints": [
      "经典位操作：n & (n - 1) 能够精准消除二进制中最低位的 1。通过不断执行 n &= (n - 1) 并累加计数，循环次数正好等于 1 的个数！"
    ],
    "ref": [
      "int hammingWeight(uint32_t n) {",
      "    int count = 0;",
      "    while (n) {",
      "        n &= (n - 1);",
      "        count++;",
      "    }",
      "    return count;",
      "}"
    ],
    "note": "经典位操作：n & (n - 1) 能够精准消除二进制中最低位的 1。通过不断执行 n &= (n - 1) 并累加计数，循环次数正好等于 1 的个数！",
    "complexity": "时间 O(k)（k 为 1 的个数），空间 O(1)。",
    "pitfalls": [
      "使用 n &= (n - 1) 比逐位移位 32 次更高效。"
    ],
    "rating": 1050,
    "hot100": false,
    "slug": "number-of-1-bits",
    "lingshen": {
      "name": "灵神拆位法 / lowbit 最低位提取 · 位 1 的个数",
      "desc": "【灵神心法点拨】：经典位操作：n & (n - 1) 能够精准消除二进制中最低位的 1。通过不断执行 n &= (n - 1) 并累加计数，循环次数正好等于 1 的个数！",
      "code": [
        "int hammingWeight(uint32_t n) {",
        "    int count = 0;",
        "    while (n) {",
        "        n &= (n - 1);",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 191）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int hammingWeight(uint32_t n) {",
        "    int count = 0;",
        "    while (n) {",
        "        n &= (n - 1);",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ]
    }
  },
  {
    "id": "p_231",
    "mod": "bit-manipulation",
    "idx": 5,
    "title": "2 的幂",
    "lc": "LeetCode 231",
    "lcNum": 231,
    "diff": 1,
    "tags": [
      "位运算",
      "性质"
    ],
    "by": "return",
    "brief": "给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "7",
      "6"
    ],
    "sig": "// LeetCode 231 函数签名",
    "template": "// LeetCode 231 2 的幂\n",
    "hints": [
      "2 的幂在二进制下有且仅有一个 1。利用性质：若 n > 0 且 (n & (n - 1)) == 0，则必定是 2 的幂。"
    ],
    "ref": [
      "bool isPowerOfTwo(int n) {",
      "    return n > 0 && (n & (n - 1)) == 0;",
      "}"
    ],
    "note": "2 的幂在二进制下有且仅有一个 1。利用性质：若 n > 0 且 (n & (n - 1)) == 0，则必定是 2 的幂。",
    "complexity": "时间 O(1)，空间 O(1)。",
    "pitfalls": [
      "必须先判断 n > 0，因为 0 和负数不是 2 的幂。"
    ],
    "rating": 1050,
    "hot100": false,
    "slug": "power-of-two",
    "lingshen": {
      "name": "灵神拆位法 / lowbit 最低位提取 · 2 的幂",
      "desc": "【灵神心法点拨】：2 的幂在二进制下有且仅有一个 1。利用性质：若 n > 0 且 (n & (n - 1)) == 0，则必定是 2 的幂。",
      "code": [
        "bool isPowerOfTwo(int n) {",
        "    return n > 0 && (n & (n - 1)) == 0;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 231）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool isPowerOfTwo(int n) {",
        "    return n > 0 && (n & (n - 1)) == 0;",
        "}"
      ]
    }
  },
  {
    "id": "p_435",
    "mod": "greedy",
    "idx": 1,
    "title": "无重叠区间",
    "lc": "LeetCode 435",
    "lcNum": 435,
    "diff": 2,
    "tags": [
      "区间调度",
      "贪心"
    ],
    "by": "return",
    "brief": "给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回需要移除区间的最小数量，使剩余区间互不重叠。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,4],[5,9],[9,11],[14,16]]",
      "[[1,4],[3,5],[5,9],[9,13]]"
    ],
    "sig": "// LeetCode 435 函数签名",
    "template": "// LeetCode 435 无重叠区间\n",
    "hints": [
      "区间调度母题：移除最少区间等价于保留最多互不重叠的区间！将所有区间按【右端点 end】升序排序。遍历区间，若当前区间的 start >= 上一个保留区间的 end，则保留该区间并更新 end；最终移除数 = n - 保留数。"
    ],
    "ref": [
      "int eraseOverlapIntervals(vector<vector<int>>& intervals) {",
      "    if (intervals.empty()) return 0;",
      "    sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {",
      "        return a[1] < b[1];",
      "    });",
      "    int count = 1, end = intervals[0][1];",
      "    for (int i = 1; i < intervals.size(); ++i) {",
      "        if (intervals[i][0] >= end) {",
      "            count++;",
      "            end = intervals[i][1];",
      "        }",
      "    }",
      "    return intervals.size() - count;",
      "}"
    ],
    "note": "区间调度母题：移除最少区间等价于保留最多互不重叠的区间！将所有区间按【右端点 end】升序排序。遍历区间，若当前区间的 start >= 上一个保留区间的 end，则保留该区间并更新 end；最终移除数 = n - 保留数。",
    "complexity": "时间 O(n log n)，空间 O(1)。",
    "pitfalls": [
      "必须按右端点排序，右端点越小留给后面的空间越大。"
    ],
    "rating": 1500,
    "hot100": false,
    "slug": "non-overlapping-intervals",
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 无重叠区间",
      "desc": "【灵神心法点拨】：区间调度母题：移除最少区间等价于保留最多互不重叠的区间！将所有区间按【右端点 end】升序排序。遍历区间，若当前区间的 start >= 上一个保留区间的 end，则保留该区间并更新 end；最终移除数 = n - 保留数。",
      "code": [
        "int eraseOverlapIntervals(vector<vector<int>>& intervals) {",
        "    if (intervals.empty()) return 0;",
        "    sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {",
        "        return a[1] < b[1];",
        "    });",
        "    int count = 1, end = intervals[0][1];",
        "    for (int i = 1; i < intervals.size(); ++i) {",
        "        if (intervals[i][0] >= end) {",
        "            count++;",
        "            end = intervals[i][1];",
        "        }",
        "    }",
        "    return intervals.size() - count;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 435）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int eraseOverlapIntervals(vector<vector<int>>& intervals) {",
        "    if (intervals.empty()) return 0;",
        "    sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {",
        "        return a[1] < b[1];",
        "    });",
        "    int count = 1, end = intervals[0][1];",
        "    for (int i = 1; i < intervals.size(); ++i) {",
        "        if (intervals[i][0] >= end) {",
        "            count++;",
        "            end = intervals[i][1];",
        "        }",
        "    }",
        "    return intervals.size() - count;",
        "}"
      ]
    }
  },
  {
    "id": "p_452",
    "mod": "greedy",
    "idx": 2,
    "title": "用最少数量的箭引爆气球",
    "lc": "LeetCode 452",
    "lcNum": 452,
    "diff": 2,
    "tags": [
      "区间调度",
      "贪心"
    ],
    "by": "return",
    "brief": "有一些球形气球贴在一堵墙上。弓箭可以垂直向上发射。一支箭射穿在 x 处的气球需要其 xstart <= x <= xend。返回引爆所有气球所必须射出的 最小 弓箭数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[2,1,3],[5,4,1]]",
      "[[1,1,3],[5,1,2]]"
    ],
    "sig": "// LeetCode 452 函数签名",
    "template": "// LeetCode 452 用最少数量的箭引爆气球\n",
    "hints": [
      "按右端点升序排序。第一支箭射在第一个气球的右端点。遍历后续气球，若其左端点大于当前箭的位置，则这支箭无法引爆它，必须新加一支箭射在该气球的右端点。"
    ],
    "ref": [
      "int findMinArrowShots(vector<vector<int>>& points) {",
      "    if (points.empty()) return 0;",
      "    sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {",
      "        return a[1] < b[1];",
      "    });",
      "    int arrows = 1, pos = points[0][1];",
      "    for (int i = 1; i < points.size(); ++i) {",
      "        if (points[i][0] > pos) {",
      "            arrows++;",
      "            pos = points[i][1];",
      "        }",
      "    }",
      "    return arrows;",
      "}"
    ],
    "note": "按右端点升序排序。第一支箭射在第一个气球的右端点。遍历后续气球，若其左端点大于当前箭的位置，则这支箭无法引爆它，必须新加一支箭射在该气球的右端点。",
    "complexity": "时间 O(n log n)，空间 O(1)。",
    "pitfalls": [
      "按 points[i][1] 升序排序；注意区间端点是闭区间，等于也可以引爆。"
    ],
    "rating": 1550,
    "hot100": false,
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 用最少数量的箭引爆气球",
      "desc": "【灵神心法点拨】：按右端点升序排序。第一支箭射在第一个气球的右端点。遍历后续气球，若其左端点大于当前箭的位置，则这支箭无法引爆它，必须新加一支箭射在该气球的右端点。",
      "code": [
        "int findMinArrowShots(vector<vector<int>>& points) {",
        "    if (points.empty()) return 0;",
        "    sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {",
        "        return a[1] < b[1];",
        "    });",
        "    int arrows = 1, pos = points[0][1];",
        "    for (int i = 1; i < points.size(); ++i) {",
        "        if (points[i][0] > pos) {",
        "            arrows++;",
        "            pos = points[i][1];",
        "        }",
        "    }",
        "    return arrows;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 452）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int findMinArrowShots(vector<vector<int>>& points) {",
        "    if (points.empty()) return 0;",
        "    sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {",
        "        return a[1] < b[1];",
        "    });",
        "    int arrows = 1, pos = points[0][1];",
        "    for (int i = 1; i < points.size(); ++i) {",
        "        if (points[i][0] > pos) {",
        "            arrows++;",
        "            pos = points[i][1];",
        "        }",
        "    }",
        "    return arrows;",
        "}"
      ]
    }
  },
  {
    "id": "p_56",
    "mod": "greedy",
    "idx": 3,
    "title": "合并区间",
    "lc": "LeetCode 56",
    "lcNum": 56,
    "diff": 1,
    "tags": [
      "区间合并",
      "Hot100"
    ],
    "by": "return",
    "brief": "以数组 intervals 表示若干个区间的集合。请你合并所有重叠的区间，并返回 一个不重叠的区间数组 ，该数组需恰好覆盖输入中的所有区间 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[[1,4],[3,7],[8,11],[12,14]]",
      "[[1,4],[6,9],[8,11],[14,17]]"
    ],
    "sig": "// LeetCode 56 函数签名",
    "template": "// LeetCode 56 合并区间\n",
    "hints": [
      "先按区间的【左端点 start】升序排序。维护当前合并区间 [l, r]。遍历下一个区间 [curL, curR]，若 curL <= r 说明重叠，扩展右界 r = max(r, curR)；若 curL > r 说明不重叠，将 [l, r] 存入答案并开启新区间。"
    ],
    "ref": [
      "vector<vector<int>> merge(vector<vector<int>>& intervals) {",
      "    if (intervals.empty()) return {};",
      "    sort(intervals.begin(), intervals.end());",
      "    vector<vector<int>> ans;",
      "    ans.push_back(intervals[0]);",
      "    for (int i = 1; i < intervals.size(); ++i) {",
      "        if (intervals[i][0] <= ans.back()[1]) {",
      "            ans.back()[1] = max(ans.back()[1], intervals[i][1]);",
      "        } else {",
      "            ans.push_back(intervals[i]);",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "先按区间的【左端点 start】升序排序。维护当前合并区间 [l, r]。遍历下一个区间 [curL, curR]，若 curL <= r 说明重叠，扩展右界 r = max(r, curR)；若 curL > r 说明不重叠，将 [l, r] 存入答案并开启新区间。",
    "complexity": "时间 O(n log n)，空间 O(n)。",
    "pitfalls": [
      "合并重叠区间必须按左端点升序排序。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "merge-intervals",
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 合并区间",
      "desc": "【灵神心法点拨】：先按区间的【左端点 start】升序排序。维护当前合并区间 [l, r]。遍历下一个区间 [curL, curR]，若 curL <= r 说明重叠，扩展右界 r = max(r, curR)；若 curL > r 说明不重叠，将 [l, r] 存入答案并开启新区间。",
      "code": [
        "vector<vector<int>> merge(vector<vector<int>>& intervals) {",
        "    if (intervals.empty()) return {};",
        "    sort(intervals.begin(), intervals.end());",
        "    vector<vector<int>> ans;",
        "    ans.push_back(intervals[0]);",
        "    for (int i = 1; i < intervals.size(); ++i) {",
        "        if (intervals[i][0] <= ans.back()[1]) {",
        "            ans.back()[1] = max(ans.back()[1], intervals[i][1]);",
        "        } else {",
        "            ans.push_back(intervals[i]);",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 56）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> merge(vector<vector<int>>& intervals) {",
        "    if (intervals.empty()) return {};",
        "    sort(intervals.begin(), intervals.end());",
        "    vector<vector<int>> ans;",
        "    ans.push_back(intervals[0]);",
        "    for (int i = 1; i < intervals.size(); ++i) {",
        "        if (intervals[i][0] <= ans.back()[1]) {",
        "            ans.back()[1] = max(ans.back()[1], intervals[i][1]);",
        "        } else {",
        "            ans.push_back(intervals[i]);",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_462",
    "mod": "greedy",
    "idx": 4,
    "title": "最少移动次数使数组元素相等 II",
    "lc": "LeetCode 462",
    "lcNum": 462,
    "diff": 1,
    "tags": [
      "中位数贪心",
      "数学"
    ],
    "by": "return",
    "brief": "给你一个大小为 n 的整数数组 nums ，在每次操作中，你可以使数组中的一个元素加 1 或减 1。求使所有元素相等的最小操作次数。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "[7,3,12,4,2,11]",
      "[5,1,8,6,11,6,1]"
    ],
    "sig": "// LeetCode 462 函数签名",
    "template": "// LeetCode 462 最少移动次数使数组元素相等 II\n",
    "hints": [
      "【货仓选址 / 绝对值不等式】：点 x 到数组所有点的距离之和 ∑|nums[i] - x| 在 x 为数组【中位数】时取得最小值！对数组排序取中位数 mid = nums[n / 2]，累加 abs(nums[i] - mid)。"
    ],
    "ref": [
      "int minMoves2(vector<int>& nums) {",
      "    sort(nums.begin(), nums.end());",
      "    int mid = nums[nums.size() / 2], ans = 0;",
      "    for (int x : nums) ans += abs(x - mid);",
      "    return ans;",
      "}"
    ],
    "note": "【货仓选址 / 绝对值不等式】：点 x 到数组所有点的距离之和 ∑|nums[i] - x| 在 x 为数组【中位数】时取得最小值！对数组排序取中位数 mid = nums[n / 2]，累加 abs(nums[i] - mid)。",
    "complexity": "时间 O(n log n)，空间 O(1)。",
    "pitfalls": [
      "目标值必然是中位数，无需枚举平均值或其它点。"
    ],
    "rating": 1400,
    "hot100": false,
    "slug": "minimum-moves-to-equal-array-elements-ii",
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 最少移动次数使数组元素相等 II",
      "desc": "【灵神心法点拨】：【货仓选址 / 绝对值不等式】：点 x 到数组所有点的距离之和 ∑|nums[i] - x| 在 x 为数组【中位数】时取得最小值！对数组排序取中位数 mid = nums[n / 2]，累加 abs(nums[i] - mid)。",
      "code": [
        "int minMoves2(vector<int>& nums) {",
        "    sort(nums.begin(), nums.end());",
        "    int mid = nums[nums.size() / 2], ans = 0;",
        "    for (int x : nums) ans += abs(x - mid);",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 462）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minMoves2(vector<int>& nums) {",
        "    sort(nums.begin(), nums.end());",
        "    int mid = nums[nums.size() / 2], ans = 0;",
        "    for (int x : nums) ans += abs(x - mid);",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_871",
    "mod": "greedy",
    "idx": 5,
    "title": "最低加油次数",
    "lc": "LeetCode 871",
    "lcNum": 871,
    "diff": 3,
    "tags": [
      "反悔贪心",
      "大顶堆",
      "Hard"
    ],
    "by": "return",
    "brief": "汽车从 startFuel 升汽油出发前往 target。沿途有若干加油站 stations。求到达目的地所需的最少加油次数。如果无法到达则返回 -1。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "6 | 4 | [[2,3,4],[3,5,2]]",
      "5 | 5 | [[5,4,4],[1,3,4]]"
    ],
    "sig": "// LeetCode 871 函数签名",
    "template": "// LeetCode 871 最低加油次数\n",
    "hints": [
      "【反悔贪心】：汽车尽可能一直往前开。每路过一个加油站，先把它的油量存入大顶堆 pq 中（暂时不加）。当当前剩余油量不足以到达下一个加油站时，从大顶堆中取出之前路过油量最大的加油站“反悔补加”，直到能到达或堆空返回 -1。"
    ],
    "ref": [
      "int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {",
      "    priority_queue<int> pq;",
      "    stations.push_back({target, 0});",
      "    int curFuel = startFuel, stops = 0, prevPos = 0;",
      "    for (auto& s : stations) {",
      "        int pos = s[0], fuel = s[1];",
      "        curFuel -= pos - prevPos;",
      "        while (!pq.empty() && curFuel < 0) {",
      "            curFuel += pq.top(); pq.pop();",
      "            stops++;",
      "        }",
      "        if (curFuel < 0) return -1;",
      "        pq.push(fuel);",
      "        prevPos = pos;",
      "    }",
      "    return stops;",
      "}"
    ],
    "note": "【反悔贪心】：汽车尽可能一直往前开。每路过一个加油站，先把它的油量存入大顶堆 pq 中（暂时不加）。当当前剩余油量不足以到达下一个加油站时，从大顶堆中取出之前路过油量最大的加油站“反悔补加”，直到能到达或堆空返回 -1。",
    "complexity": "时间 O(n log n)，空间 O(n)。",
    "pitfalls": [
      "将 target 看作油量为 0 的最后一个加油站加入 stations 末尾统一处理。"
    ],
    "rating": 2074,
    "hot100": false,
    "slug": "minimum-number-of-refueling-stops",
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 最低加油次数",
      "desc": "【灵神心法点拨】：【反悔贪心】：汽车尽可能一直往前开。每路过一个加油站，先把它的油量存入大顶堆 pq 中（暂时不加）。当当前剩余油量不足以到达下一个加油站时，从大顶堆中取出之前路过油量最大的加油站“反悔补加”，直到能到达或堆空返回 -1。",
      "code": [
        "int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {",
        "    priority_queue<int> pq;",
        "    stations.push_back({target, 0});",
        "    int curFuel = startFuel, stops = 0, prevPos = 0;",
        "    for (auto& s : stations) {",
        "        int pos = s[0], fuel = s[1];",
        "        curFuel -= pos - prevPos;",
        "        while (!pq.empty() && curFuel < 0) {",
        "            curFuel += pq.top(); pq.pop();",
        "            stops++;",
        "        }",
        "        if (curFuel < 0) return -1;",
        "        pq.push(fuel);",
        "        prevPos = pos;",
        "    }",
        "    return stops;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 871）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {",
        "    priority_queue<int> pq;",
        "    stations.push_back({target, 0});",
        "    int curFuel = startFuel, stops = 0, prevPos = 0;",
        "    for (auto& s : stations) {",
        "        int pos = s[0], fuel = s[1];",
        "        curFuel -= pos - prevPos;",
        "        while (!pq.empty() && curFuel < 0) {",
        "            curFuel += pq.top(); pq.pop();",
        "            stops++;",
        "        }",
        "        if (curFuel < 0) return -1;",
        "        pq.push(fuel);",
        "        prevPos = pos;",
        "    }",
        "    return stops;",
        "}"
      ]
    }
  },
  {
    "id": "p_28",
    "mod": "string",
    "idx": 1,
    "title": "找出字符串中第一个匹配项的下标",
    "lc": "LeetCode 28",
    "lcNum": 28,
    "diff": 1,
    "tags": [
      "KMP",
      "字符串匹配"
    ],
    "by": "return",
    "brief": "给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回 -1 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"eadeeca\" | \"aaccbd\"",
      "\"aceeae\" | \"edbcaeb\""
    ],
    "sig": "// LeetCode 28 函数签名",
    "template": "// LeetCode 28 找出字符串中第一个匹配项的下标\n",
    "hints": [
      "KMP 经典母题：预处理模式串 needle 的最长公共真前后缀数组 pi (前缀函数)。在匹配过程中，当发生失配时，通过 pi 数组将模式串指针回跳，主串指针不回退，实现线性时间匹配。"
    ],
    "ref": [
      "int strStr(string haystack, string needle) {",
      "    int n = haystack.size(), m = needle.size();",
      "    if (m == 0) return 0;",
      "    vector<int> pi(m, 0);",
      "    for (int i = 1, j = 0; i < m; ++i) {",
      "        while (j > 0 && needle[i] != needle[j]) j = pi[j - 1];",
      "        if (needle[i] == needle[j]) j++;",
      "        pi[i] = j;",
      "    }",
      "    for (int i = 0, j = 0; i < n; ++i) {",
      "        while (j > 0 && haystack[i] != needle[j]) j = pi[j - 1];",
      "        if (haystack[i] == needle[j]) j++;",
      "        if (j == m) return i - m + 1;",
      "    }",
      "    return -1;",
      "}"
    ],
    "note": "KMP 经典母题：预处理模式串 needle 的最长公共真前后缀数组 pi (前缀函数)。在匹配过程中，当发生失配时，通过 pi 数组将模式串指针回跳，主串指针不回退，实现线性时间匹配。",
    "complexity": "时间 O(n + m)，空间 O(m)。",
    "pitfalls": [
      "pi 数组计算时，当字符不匹配时通过 j = pi[j - 1] 迭代回跳。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "find-the-index-of-the-first-occurrence-in-a-string",
    "lingshen": {
      "name": "灵神 KMP 前缀函数 / Manacher 半径加速 · 找出字符串中第一个匹配项的下标",
      "desc": "【灵神心法点拨】：KMP 经典母题：预处理模式串 needle 的最长公共真前后缀数组 pi (前缀函数)。在匹配过程中，当发生失配时，通过 pi 数组将模式串指针回跳，主串指针不回退，实现线性时间匹配。",
      "code": [
        "int strStr(string haystack, string needle) {",
        "    int n = haystack.size(), m = needle.size();",
        "    if (m == 0) return 0;",
        "    vector<int> pi(m, 0);",
        "    for (int i = 1, j = 0; i < m; ++i) {",
        "        while (j > 0 && needle[i] != needle[j]) j = pi[j - 1];",
        "        if (needle[i] == needle[j]) j++;",
        "        pi[i] = j;",
        "    }",
        "    for (int i = 0, j = 0; i < n; ++i) {",
        "        while (j > 0 && haystack[i] != needle[j]) j = pi[j - 1];",
        "        if (haystack[i] == needle[j]) j++;",
        "        if (j == m) return i - m + 1;",
        "    }",
        "    return -1;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 28）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int strStr(string haystack, string needle) {",
        "    int n = haystack.size(), m = needle.size();",
        "    if (m == 0) return 0;",
        "    vector<int> pi(m, 0);",
        "    for (int i = 1, j = 0; i < m; ++i) {",
        "        while (j > 0 && needle[i] != needle[j]) j = pi[j - 1];",
        "        if (needle[i] == needle[j]) j++;",
        "        pi[i] = j;",
        "    }",
        "    for (int i = 0, j = 0; i < n; ++i) {",
        "        while (j > 0 && haystack[i] != needle[j]) j = pi[j - 1];",
        "        if (haystack[i] == needle[j]) j++;",
        "        if (j == m) return i - m + 1;",
        "    }",
        "    return -1;",
        "}"
      ]
    }
  },
  {
    "id": "p_459",
    "mod": "string",
    "idx": 2,
    "title": "重复的子字符串",
    "lc": "LeetCode 459",
    "lcNum": 459,
    "diff": 1,
    "tags": [
      "KMP",
      "周期性"
    ],
    "by": "return",
    "brief": "给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"bdadcd\"",
      "\"debeca\""
    ],
    "sig": "// LeetCode 459 函数签名",
    "template": "// LeetCode 459 重复的子字符串\n",
    "hints": [
      "KMP 周期定理：计算 s 的前缀函数最后一个值 len = pi[n - 1]。若 len > 0 且 n % (n - len) == 0，则 s 具有长度为 n - len 的循环节，可由该子串重复构成！或一行巧解：(s + s).find(s, 1) < s.size()。"
    ],
    "ref": [
      "bool repeatedSubstringPattern(string s) {",
      "    int n = s.size();",
      "    vector<int> pi(n, 0);",
      "    for (int i = 1, j = 0; i < n; ++i) {",
      "        while (j > 0 && s[i] != s[j]) j = pi[j - 1];",
      "        if (s[i] == s[j]) j++;",
      "        pi[i] = j;",
      "    }",
      "    int len = pi[n - 1];",
      "    return len > 0 && n % (n - len) == 0;",
      "}"
    ],
    "note": "KMP 周期定理：计算 s 的前缀函数最后一个值 len = pi[n - 1]。若 len > 0 且 n % (n - len) == 0，则 s 具有长度为 n - len 的循环节，可由该子串重复构成！或一行巧解：(s + s).find(s, 1) < s.size()。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "如果 len == 0 则不能由子串重复构成。"
    ],
    "rating": 1300,
    "hot100": false,
    "slug": "repeated-substring-pattern",
    "lingshen": {
      "name": "灵神 KMP 前缀函数 / Manacher 半径加速 · 重复的子字符串",
      "desc": "【灵神心法点拨】：KMP 周期定理：计算 s 的前缀函数最后一个值 len = pi[n - 1]。若 len > 0 且 n % (n - len) == 0，则 s 具有长度为 n - len 的循环节，可由该子串重复构成！或一行巧解：(s + s).find(s, 1) < s.size()。",
      "code": [
        "bool repeatedSubstringPattern(string s) {",
        "    int n = s.size();",
        "    vector<int> pi(n, 0);",
        "    for (int i = 1, j = 0; i < n; ++i) {",
        "        while (j > 0 && s[i] != s[j]) j = pi[j - 1];",
        "        if (s[i] == s[j]) j++;",
        "        pi[i] = j;",
        "    }",
        "    int len = pi[n - 1];",
        "    return len > 0 && n % (n - len) == 0;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 459）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool repeatedSubstringPattern(string s) {",
        "    int n = s.size();",
        "    vector<int> pi(n, 0);",
        "    for (int i = 1, j = 0; i < n; ++i) {",
        "        while (j > 0 && s[i] != s[j]) j = pi[j - 1];",
        "        if (s[i] == s[j]) j++;",
        "        pi[i] = j;",
        "    }",
        "    int len = pi[n - 1];",
        "    return len > 0 && n % (n - len) == 0;",
        "}"
      ]
    }
  },
  {
    "id": "p_5",
    "mod": "string",
    "idx": 3,
    "title": "最长回文子串",
    "lc": "LeetCode 5",
    "lcNum": 5,
    "diff": 1,
    "tags": [
      "Manacher",
      "中心扩展",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个字符串 s，找到 s 中最长的 回文 子串。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"abccba\"",
      "\"cbbd\""
    ],
    "sig": "// LeetCode 5 函数签名",
    "template": "// LeetCode 5 最长回文子串\n",
    "hints": [
      "方法一：中心扩展法 O(n^2)，枚举每个字符及字符间隙作为回文中心向外扩展；方法二：Manacher 马拉车算法 O(n)，在字符间插入 '#' 统一奇偶长度，维护当前最右回文右边界 r 和对应中心 c，利用对称点半径加速扩展。"
    ],
    "ref": [
      "string longestPalindrome(string s) {",
      "    string t = \"^#\";",
      "    for (char c : s) { t += c; t += '#'; }",
      "    t += \"$\";",
      "    int n = t.size(), c = 0, r = 0, maxLen = 0, center = 0;",
      "    vector<int> p(n, 0);",
      "    for (int i = 1; i < n - 1; ++i) {",
      "        int iMirror = 2 * c - i;",
      "        if (r > i) p[i] = min(r - i, p[iMirror]);",
      "        while (t[i + 1 + p[i]] == t[i - 1 - p[i]]) p[i]++;",
      "        if (i + p[i] > r) { c = i; r = i + p[i]; }",
      "        if (p[i] > maxLen) { maxLen = p[i]; center = i; }",
      "    }",
      "    return s.substr((center - maxLen) / 2, maxLen);",
      "}"
    ],
    "note": "方法一：中心扩展法 O(n^2)，枚举每个字符及字符间隙作为回文中心向外扩展；方法二：Manacher 马拉车算法 O(n)，在字符间插入 '#' 统一奇偶长度，维护当前最右回文右边界 r 和对应中心 c，利用对称点半径加速扩展。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "插字符构造形如 \"^#a#b#a#$\" 防止越界；原串起始位置由 (center - maxLen) / 2 计算。"
    ],
    "rating": 1400,
    "hot100": true,
    "slug": "longest-palindromic-substring",
    "lingshen": {
      "name": "灵神 KMP 前缀函数 / Manacher 半径加速 · 最长回文子串",
      "desc": "【灵神心法点拨】：方法一：中心扩展法 O(n^2)，枚举每个字符及字符间隙作为回文中心向外扩展；方法二：Manacher 马拉车算法 O(n)，在字符间插入 '#' 统一奇偶长度，维护当前最右回文右边界 r 和对应中心 c，利用对称点半径加速扩展。",
      "code": [
        "string longestPalindrome(string s) {",
        "    string t = \"^#\";",
        "    for (char c : s) { t += c; t += '#'; }",
        "    t += \"$\";",
        "    int n = t.size(), c = 0, r = 0, maxLen = 0, center = 0;",
        "    vector<int> p(n, 0);",
        "    for (int i = 1; i < n - 1; ++i) {",
        "        int iMirror = 2 * c - i;",
        "        if (r > i) p[i] = min(r - i, p[iMirror]);",
        "        while (t[i + 1 + p[i]] == t[i - 1 - p[i]]) p[i]++;",
        "        if (i + p[i] > r) { c = i; r = i + p[i]; }",
        "        if (p[i] > maxLen) { maxLen = p[i]; center = i; }",
        "    }",
        "    return s.substr((center - maxLen) / 2, maxLen);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 5）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "string longestPalindrome(string s) {",
        "    string t = \"^#\";",
        "    for (char c : s) { t += c; t += '#'; }",
        "    t += \"$\";",
        "    int n = t.size(), c = 0, r = 0, maxLen = 0, center = 0;",
        "    vector<int> p(n, 0);",
        "    for (int i = 1; i < n - 1; ++i) {",
        "        int iMirror = 2 * c - i;",
        "        if (r > i) p[i] = min(r - i, p[iMirror]);",
        "        while (t[i + 1 + p[i]] == t[i - 1 - p[i]]) p[i]++;",
        "        if (i + p[i] > r) { c = i; r = i + p[i]; }",
        "        if (p[i] > maxLen) { maxLen = p[i]; center = i; }",
        "    }",
        "    return s.substr((center - maxLen) / 2, maxLen);",
        "}"
      ]
    }
  },
  {
    "id": "p_647",
    "mod": "string",
    "idx": 4,
    "title": "回文子串",
    "lc": "LeetCode 647",
    "lcNum": 647,
    "diff": 1,
    "tags": [
      "中心扩展",
      "动态规划",
      "Hot100"
    ],
    "by": "return",
    "brief": "给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "\"racecar\""
    ],
    "sig": "// LeetCode 647 函数签名",
    "template": "// LeetCode 647 回文子串\n",
    "hints": [
      "中心扩展法：字符串长度为 n，共有 2n - 1 个回文中心（n 个单字符中心和 n - 1 个双字符中心）。从每个中心同时向左右扩展，只要左右字符相等答案就加一，不等则停止扩展。"
    ],
    "ref": [
      "int countSubstrings(string s) {",
      "    int n = s.size(), ans = 0;",
      "    for (int i = 0; i < 2 * n - 1; ++i) {",
      "        int l = i / 2, r = (i + 1) / 2;",
      "        while (l >= 0 && r < n && s[l] == s[r]) {",
      "            ans++;",
      "            l--; r++;",
      "        }",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "中心扩展法：字符串长度为 n，共有 2n - 1 个回文中心（n 个单字符中心和 n - 1 个双字符中心）。从每个中心同时向左右扩展，只要左右字符相等答案就加一，不等则停止扩展。",
    "complexity": "时间 O(n^2)，空间 O(1)。",
    "pitfalls": [
      "枚举中心 i 从 0 到 2n-2，左右指针分别初始化为 i / 2 和 (i + 1) / 2。"
    ],
    "rating": 1300,
    "hot100": true,
    "slug": "palindromic-substrings",
    "lingshen": {
      "name": "灵神 KMP 前缀函数 / Manacher 半径加速 · 回文子串",
      "desc": "【灵神心法点拨】：中心扩展法：字符串长度为 n，共有 2n - 1 个回文中心（n 个单字符中心和 n - 1 个双字符中心）。从每个中心同时向左右扩展，只要左右字符相等答案就加一，不等则停止扩展。",
      "code": [
        "int countSubstrings(string s) {",
        "    int n = s.size(), ans = 0;",
        "    for (int i = 0; i < 2 * n - 1; ++i) {",
        "        int l = i / 2, r = (i + 1) / 2;",
        "        while (l >= 0 && r < n && s[l] == s[r]) {",
        "            ans++;",
        "            l--; r++;",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 647）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int countSubstrings(string s) {",
        "    int n = s.size(), ans = 0;",
        "    for (int i = 0; i < 2 * n - 1; ++i) {",
        "        int l = i / 2, r = (i + 1) / 2;",
        "        while (l >= 0 && r < n && s[l] == s[r]) {",
        "            ans++;",
        "            l--; r++;",
        "        }",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_204",
    "mod": "math",
    "idx": 1,
    "title": "计数质数",
    "lc": "LeetCode 204",
    "lcNum": 204,
    "diff": 1,
    "tags": [
      "数论",
      "埃氏筛"
    ],
    "by": "return",
    "brief": "给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "6",
      "7"
    ],
    "sig": "// LeetCode 204 函数签名",
    "template": "// LeetCode 204 计数质数\n",
    "hints": [
      "埃拉托斯特尼筛法（埃氏筛）：开辟大小为 n 的布尔数组 isPrime，初始全置为 true。从 2 开始遍历，若 isPrime[i] 为 true 则计数器加一，并将其倍数 i * i, i * (i+1), ... 全部标记为 false（从 i * i 开始标记避免重复）。"
    ],
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
    ],
    "note": "埃拉托斯特尼筛法（埃氏筛）：开辟大小为 n 的布尔数组 isPrime，初始全置为 true。从 2 开始遍历，若 isPrime[i] 为 true 则计数器加一，并将其倍数 i * i, i * (i+1), ... 全部标记为 false（从 i * i 开始标记避免重复）。",
    "complexity": "时间 O(n log log n)，空间 O(n)。",
    "pitfalls": [
      "i * i 可能溢出 32 位整型，因此使用 (long long)i * i 循环判断。"
    ],
    "rating": 1300,
    "hot100": false,
    "slug": "count-primes",
    "lingshen": {
      "name": "灵神埃氏质数筛 / 二进制快速幂 / 巴什博弈 · 计数质数",
      "desc": "【灵神心法点拨】：埃拉托斯特尼筛法（埃氏筛）：开辟大小为 n 的布尔数组 isPrime，初始全置为 true。从 2 开始遍历，若 isPrime[i] 为 true 则计数器加一，并将其倍数 i * i, i * (i+1), ... 全部标记为 false（从 i * i 开始标记避免重复）。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 204）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "p_50",
    "mod": "math",
    "idx": 2,
    "title": "Pow(x, n)",
    "lc": "LeetCode 50",
    "lcNum": 50,
    "diff": 1,
    "tags": [
      "数学",
      "快速幂"
    ],
    "by": "return",
    "brief": "实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，x^n ）。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "10 | 5",
      "1 | 3"
    ],
    "sig": "// LeetCode 50 函数签名",
    "template": "// LeetCode 50 Pow(x, n)\n",
    "hints": [
      "二进制快速幂：将指数 n 拆解为二进制位。循环检查 n 的最低位，若为 1 则将当前基底 x 乘入结果 ans；随后基底平方 x *= x，指数右移 n >>= 1。若 n 为负数，先取倒数 x = 1 / x，并将 n 转为正数（用 long long 防 INT_MIN 溢出）。"
    ],
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
    ],
    "note": "二进制快速幂：将指数 n 拆解为二进制位。循环检查 n 的最低位，若为 1 则将当前基底 x 乘入结果 ans；随后基底平方 x *= x，指数右移 n >>= 1。若 n 为负数，先取倒数 x = 1 / x，并将 n 转为正数（用 long long 防 INT_MIN 溢出）。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "n 为 INT_MIN (-2147483648) 取负数会溢出，必须使用 long long N = n。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "powx-n",
    "lingshen": {
      "name": "灵神埃氏质数筛 / 二进制快速幂 / 巴什博弈 · Pow(x, n)",
      "desc": "【灵神心法点拨】：二进制快速幂：将指数 n 拆解为二进制位。循环检查 n 的最低位，若为 1 则将当前基底 x 乘入结果 ans；随后基底平方 x *= x，指数右移 n >>= 1。若 n 为负数，先取倒数 x = 1 / x，并将 n 转为正数（用 long long 防 INT_MIN 溢出）。",
      "code": [
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
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 50）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
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
    }
  },
  {
    "id": "d6",
    "mod": "math",
    "idx": 3,
    "title": "不同路径",
    "lc": "LeetCode 62",
    "lcNum": 62,
    "diff": 1,
    "tags": [
      "组合数学",
      "动态规划",
      "Hot100"
    ],
    "by": "return",
    "brief": "一个机器人位于一个 m x n 网格的左上角。机器人每次只能向下或向右移动一步。机器人试图达到网格的右下角。问总共有多少条不同的路径？",
    "ioIn": "m：行数；n：列数。",
    "ioOut": "返回不同路径数。",
    "ex": [
      {
        "i": "3 | 7",
        "o": "28"
      },
      {
        "i": "3 | 2",
        "o": "3"
      }
    ],
    "params": [
      "3 | 7",
      "3 | 2",
      "1 | 1",
      "7 | 3"
    ],
    "sig": "int uniquePaths(int m, int n)",
    "template": "int uniquePaths(int m, int n) {\n    // dp[i][j] = dp[i-1][j] + dp[i][j-1]\n    return 0;\n}",
    "hints": [
      "只能向下或向右走，所以到达 (i, j) 只能来自上方 (i-1, j) 或左方 (i, j-1)。",
      "第一行和第一列全部只有 1 条直行路径。",
      "转移方程：dp[i][j] = dp[i-1][j] + dp[i][j-1]。"
    ],
    "ref": [
      "int uniquePaths(int m, int n) {",
      "    long long ans = 1;",
      "    for (int x = 1, y = m + n - 2; x < min(m, n); ++x, --y) {",
      "        ans = ans * y / x;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "机器人总共需要向下走 m - 1 步，向右走 n - 1 步，总步数为 (m - 1) + (n - 1)。问题等价于在总步数中选取 m - 1 步向下，即组合数 C(m + n - 2, m - 1)。边乘边除计算组合数。",
    "complexity": "时间 O(min(m, n))，空间 O(1)。",
    "pitfalls": [
      "边乘边除计算组合数时，使用 long long 防止中间结果溢出。"
    ],
    "rating": 1200,
    "hot100": true,
    "slug": "unique-paths",
    "lingshen": {
      "name": "灵神埃氏质数筛 / 二进制快速幂 / 巴什博弈 · 不同路径",
      "desc": "【灵神心法点拨】：机器人总共需要向下走 m - 1 步，向右走 n - 1 步，总步数为 (m - 1) + (n - 1)。问题等价于在总步数中选取 m - 1 步向下，即组合数 C(m + n - 2, m - 1)。边乘边除计算组合数。",
      "code": [
        "int uniquePaths(int m, int n) {",
        "    long long ans = 1;",
        "    for (int x = 1, y = m + n - 2; x < min(m, n); ++x, --y) {",
        "        ans = ans * y / x;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 62）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int uniquePaths(int m, int n) {",
        "    long long ans = 1;",
        "    for (int x = 1, y = m + n - 2; x < min(m, n); ++x, --y) {",
        "        ans = ans * y / x;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "p_292",
    "mod": "math",
    "idx": 4,
    "title": "Nim 游戏",
    "lc": "LeetCode 292",
    "lcNum": 292,
    "diff": 1,
    "tags": [
      "博弈论",
      "巴什博弈"
    ],
    "by": "return",
    "brief": "桌子上有一堆石头。每次可以拿走 1 到 3 块石头。拿走最后一块石头的人就是获胜者。假设双方都采取最优策略，判断你是否能赢得比赛。",
    "ioIn": "输入参见题目描述与示例。",
    "ioOut": "返回符合题目要求的输出。",
    "ex": [
      {
        "i": "示例输入",
        "o": "示例输出"
      }
    ],
    "params": [
      "5",
      "7"
    ],
    "sig": "// LeetCode 292 函数签名",
    "template": "// LeetCode 292 Nim 游戏\n",
    "hints": [
      "巴什博弈母题：每次最多拿 3 块。如果石头数量是 4 的倍数，无论先手拿 1、2 或 3 块，后手总能拿 3、2 或 1 块凑成 4，最终让石头总数始终保持 4 的倍数，后手必胜！因此先手必胜条件为 n % 4 != 0。"
    ],
    "ref": [
      "bool canWinNim(int n) {",
      "    return n % 4 != 0;",
      "}"
    ],
    "note": "巴什博弈母题：每次最多拿 3 块。如果石头数量是 4 的倍数，无论先手拿 1、2 或 3 块，后手总能拿 3、2 或 1 块凑成 4，最终让石头总数始终保持 4 的倍数，后手必胜！因此先手必胜条件为 n % 4 != 0。",
    "complexity": "时间 O(1)，空间 O(1)。",
    "pitfalls": [
      "结论极为简洁：直接返回 n % 4 != 0。"
    ],
    "rating": 1100,
    "hot100": false,
    "slug": "nim-game",
    "lingshen": {
      "name": "灵神埃氏质数筛 / 二进制快速幂 / 巴什博弈 · Nim 游戏",
      "desc": "【灵神心法点拨】：巴什博弈母题：每次最多拿 3 块。如果石头数量是 4 的倍数，无论先手拿 1、2 或 3 块，后手总能拿 3、2 或 1 块凑成 4，最终让石头总数始终保持 4 的倍数，后手必胜！因此先手必胜条件为 n % 4 != 0。",
      "code": [
        "bool canWinNim(int n) {",
        "    return n % 4 != 0;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 292）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool canWinNim(int n) {",
        "    return n % 4 != 0;",
        "}"
      ]
    }
  },
  {
    "id": "l8",
    "mod": "tree-backtrack",
    "idx": 1,
    "title": "二进制链表转整数",
    "lc": "LeetCode 1290",
    "diff": 1,
    "tags": [
      "遍历",
      "进位累积"
    ],
    "by": "return",
    "brief": "链表每个节点存一位二进制（0 或 1），头节点是最高位。把这条链表表示的二进制数转成十进制返回。",
    "ioIn": "head：链表头节点，每个节点的 val 只会是 0 或 1，链表非空。",
    "ioOut": "返回对应的十进制整数。",
    "ex": [
      {
        "i": "[1,0,1]",
        "o": "5"
      },
      {
        "i": "[0]",
        "o": "0"
      },
      {
        "i": "[1,1,0,1]",
        "o": "13"
      }
    ],
    "params": [
      "[1,0,1]",
      "[0]",
      "[1]",
      "[1,1,0,1]",
      "[0,0,1]"
    ],
    "sig": "int getDecimalValue(ListNode* head)",
    "template": "int getDecimalValue(ListNode* head) {\n    // 从高位往低位走，边走边把结果左移一位\n    return 0;\n}",
    "hints": [
      "二进制从高位读到低位：每读一位，先把已经攒下的结果乘 2，再加上当前位。",
      "这就是十进制里 ans = ans * 10 + digit 的同一套套路，只是底数换成 2。",
      "不需要先求长度，也不需要递归：一次遍历、一个变量就够。"
    ],
    "ref": [
      "int getDecimalValue(ListNode* head) {",
      "    int ans = 0;",
      "    while (head != nullptr) {",
      "        ans = ans * 2 + head->val;",
      "        head = head->next;",
      "    }",
      "    return ans;",
      "}"
    ],
    "note": "「按位累积」是进制转换的通用模板：ans = ans * base + digit。链表只能从前往后走，正好和从高位到低位的读法一致，所以不用先数长度。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "先乘 2 还是先加当前位写反，结果会差一位。",
      "忘了 head = head->next，死循环。",
      "用 pow(2, i) 逐位算权重，需要先知道长度，多此一举。"
    ],
    "rating": 1100,
    "hot100": false,
    "slug": "convert-binary-number-in-a-linked-list-to-integer",
    "lcNum": 1290,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 二进制链表转整数",
      "desc": "【灵神心法点拨】：「按位累积」是进制转换的通用模板：ans = ans * base + digit。链表只能从前往后走，正好和从高位到低位的读法一致，所以不用先数长度。",
      "code": [
        "int getDecimalValue(ListNode* head) {",
        "    int ans = 0;",
        "    while (head != nullptr) {",
        "        ans = ans * 2 + head->val;",
        "        head = head->next;",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1290）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int getDecimalValue(ListNode* head) {",
        "    int ans = 0;",
        "    while (head != nullptr) {",
        "        ans = ans * 2 + head->val;",
        "        head = head->next;",
        "    }",
        "    return ans;",
        "}"
      ]
    }
  },
  {
    "id": "l3",
    "mod": "tree-backtrack",
    "idx": 3,
    "title": "删除排序链表中的重复元素",
    "lc": "LeetCode 83",
    "diff": 1,
    "tags": [
      "遍历",
      "去重"
    ],
    "by": "return",
    "brief": "给定已排序链表，删除所有重复的元素，使每个元素只出现一次，返回头节点。",
    "ioIn": "head：升序链表头节点。",
    "ioOut": "返回去重后的头节点。",
    "ex": [
      {
        "i": "[1,1,2]",
        "o": "[1,2]"
      },
      {
        "i": "[1,1,2,3,3]",
        "o": "[1,2,3]"
      }
    ],
    "params": [
      "[1,1,2]",
      "[1,1,2,3,3]",
      "[1]",
      "[]"
    ],
    "sig": "ListNode* deleteDuplicates(ListNode* head)",
    "template": "ListNode* deleteDuplicates(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "因为已经排好序，重复元素一定相邻，比较 cur 和 cur->next 就够了。",
      "相等时做的是\"删掉 next\"，所以 cur 不动；不等时才 cur 前移。",
      "先想清楚 while 的条件要同时判 cur 和 cur->next 非空。"
    ],
    "ref": [
      "ListNode* deleteDuplicates(ListNode* head) {",
      "    ListNode* cur = head;",
      "    while (cur != nullptr && cur->next != nullptr) {",
      "        if (cur->val == cur->next->val) {",
      "            cur->next = cur->next->next;",
      "        } else {",
      "            cur = cur->next;",
      "        }",
      "    }",
      "    return head;",
      "}"
    ],
    "note": "相等时把 cur->next 跳过一格（相当于删掉重复的那个），cur 原地不动继续比；不相等才前进。哨兵条件两个都要判，否则在最后一个节点处 cur->next 为空会崩。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "只判 cur != nullptr，循环里 cur->next->val 会空指针。",
      "相等时也把 cur 前移了，会漏掉连续三个重复的情况。",
      "头节点不需要特殊处理，因为它不会被删。"
    ],
    "rating": 1150,
    "hot100": false,
    "slug": "remove-duplicates-from-sorted-list",
    "lcNum": 83,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 删除排序链表中的重复元素",
      "desc": "【灵神心法点拨】：相等时把 cur->next 跳过一格（相当于删掉重复的那个），cur 原地不动继续比；不相等才前进。哨兵条件两个都要判，否则在最后一个节点处 cur->next 为空会崩。",
      "code": [
        "ListNode* deleteDuplicates(ListNode* head) {",
        "    ListNode* cur = head;",
        "    while (cur != nullptr && cur->next != nullptr) {",
        "        if (cur->val == cur->next->val) {",
        "            cur->next = cur->next->next;",
        "        } else {",
        "            cur = cur->next;",
        "        }",
        "    }",
        "    return head;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 83）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* deleteDuplicates(ListNode* head) {",
        "    ListNode* cur = head;",
        "    while (cur != nullptr && cur->next != nullptr) {",
        "        if (cur->val == cur->next->val) {",
        "            cur->next = cur->next->next;",
        "        } else {",
        "            cur = cur->next;",
        "        }",
        "    }",
        "    return head;",
        "}"
      ]
    }
  },
  {
    "id": "l4",
    "mod": "tree-backtrack",
    "idx": 5,
    "title": "移除链表元素",
    "lc": "LeetCode 203",
    "diff": 2,
    "tags": [
      "哑节点",
      "删除"
    ],
    "by": "return",
    "brief": "删除链表中所有值等于 val 的节点，返回新的头节点。头节点本身也可能被删。",
    "ioIn": "head：链表头节点；val：要删除的值。",
    "ioOut": "返回删除后的头节点。",
    "ex": [
      {
        "i": "[1,2,6,3,4,5,6] | 6",
        "o": "[1,2,3,4,5]"
      },
      {
        "i": "[7,7,7] | 7",
        "o": "[]"
      }
    ],
    "params": [
      "[1,2,6,3,4,5,6] | 6",
      "[] | 7",
      "[7,7,7] | 7",
      "[1,2] | 1"
    ],
    "sig": "ListNode* removeElements(ListNode* head, int val)",
    "template": "ListNode* removeElements(ListNode* head, int val) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "要删的可能是第一个节点，直接操作 head 会很难写 —— 先用哑节点把\"头\"变成普通节点。",
      "prev 永远指向\"最后一个确认保留的节点\"，删除就是 prev->next = cur->next。",
      "cur 无论删不删都要前进，否则会死循环。"
    ],
    "ref": [
      "ListNode* removeElements(ListNode* head, int val) {",
      "    ListNode dummy(0);",
      "    dummy.next = head;",
      "    ListNode* prev = &dummy;",
      "    ListNode* cur = head;",
      "    while (cur != nullptr) {",
      "        if (cur->val == val) {",
      "            prev->next = cur->next;",
      "        } else {",
      "            prev = cur;",
      "        }",
      "        cur = cur->next;",
      "    }",
      "    return dummy.next;",
      "}"
    ],
    "note": "哑节点统一了\"删头\"和\"删中间\"。注意删除时 prev 不动，因为新的后继还没确认是否也要删。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "删完之后 cur 忘了前进，遇到连续的相同值会卡住（死循环）。",
      "返回了 dummy 而不是 dummy.next。",
      "删头时直接改 head，尾部再出现相同值又漏删。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "remove-linked-list-elements",
    "lcNum": 203,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 移除链表元素",
      "desc": "【灵神心法点拨】：哑节点统一了\"删头\"和\"删中间\"。注意删除时 prev 不动，因为新的后继还没确认是否也要删。",
      "code": [
        "ListNode* removeElements(ListNode* head, int val) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* prev = &dummy;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->val == val) {",
        "            prev->next = cur->next;",
        "        } else {",
        "            prev = cur;",
        "        }",
        "        cur = cur->next;",
        "    }",
        "    return dummy.next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 203）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* removeElements(ListNode* head, int val) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* prev = &dummy;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->val == val) {",
        "            prev->next = cur->next;",
        "        } else {",
        "            prev = cur;",
        "        }",
        "        cur = cur->next;",
        "    }",
        "    return dummy.next;",
        "}"
      ]
    }
  },
  {
    "id": "l5",
    "mod": "tree-backtrack",
    "idx": 6,
    "title": "链表的中间结点",
    "lc": "LeetCode 876",
    "diff": 2,
    "tags": [
      "快慢指针"
    ],
    "by": "return",
    "brief": "返回链表的中间结点；如果有两个中间结点，返回第二个。",
    "ioIn": "head：链表头节点。",
    "ioOut": "返回中间结点（从它开始的链就是答案）。",
    "ex": [
      {
        "i": "[1,2,3,4,5]",
        "o": "[3,4,5]"
      },
      {
        "i": "[1,2,3,4]",
        "o": "[3,4]"
      }
    ],
    "params": [
      "[1,2,3,4,5]",
      "[1,2,3,4]",
      "[1]"
    ],
    "sig": "ListNode* middleNode(ListNode* head)",
    "template": "ListNode* middleNode(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "最直接的办法是先数长度再走一半，但要走两遍。",
      "快慢指针：慢的走一步，快的走两步，快的到终点时慢的正好在中间。",
      "循环条件写成 fast != nullptr && fast->next != nullptr，才能对齐\"第二个中间结点\"的要求。"
    ],
    "ref": [
      "ListNode* middleNode(ListNode* head) {",
      "    ListNode* slow = head;",
      "    ListNode* fast = head;",
      "    while (fast != nullptr && fast->next != nullptr) {",
      "        slow = slow->next;",
      "        fast = fast->next->next;",
      "    }",
      "    return slow;",
      "}"
    ],
    "note": "快慢指针一步到位。偶数个节点时，fast->next 为空即停，slow 正好落在第 n/2+1 个（第二个中间结点），和题意一致。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "只判 fast != nullptr 就访问 fast->next->next，会空指针。",
      "先 fast = fast->next->next 再 slow = slow->next 顺序无所谓，但两者都要在循环内。",
      "奇数长度的最后一个节点也要能正常返回它自己。"
    ],
    "rating": 1230,
    "hot100": false,
    "slug": "middle-of-the-linked-list",
    "lcNum": 876,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 链表的中间结点",
      "desc": "【灵神心法点拨】：快慢指针一步到位。偶数个节点时，fast->next 为空即停，slow 正好落在第 n/2+1 个（第二个中间结点），和题意一致。",
      "code": [
        "ListNode* middleNode(ListNode* head) {",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "    }",
        "    return slow;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 876）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* middleNode(ListNode* head) {",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    while (fast != nullptr && fast->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "    }",
        "    return slow;",
        "}"
      ]
    }
  },
  {
    "id": "l6",
    "mod": "tree-backtrack",
    "idx": 7,
    "title": "两两交换链表中的节点",
    "lc": "LeetCode 24",
    "diff": 2,
    "quiz": true,
    "tags": [
      "模块检验",
      "哑节点"
    ],
    "by": "return",
    "brief": "两两交换相邻节点，返回交换后的头节点。不能只改值，必须真的改指针。",
    "ioIn": "head：链表头节点。",
    "ioOut": "返回交换后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,4]",
        "o": "[2,1,4,3]"
      },
      {
        "i": "[1,2,3]",
        "o": "[2,1,3]"
      }
    ],
    "params": [
      "[1,2,3,4]",
      "[]",
      "[1]",
      "[1,2,3]"
    ],
    "sig": "ListNode* swapPairs(ListNode* head)",
    "template": "ListNode* swapPairs(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "还是哑节点：把\"交换前两个\"变成\"交换 prev 后面的两个\"，就不用特判头节点。",
      "每一轮标记三个位置：prev、a = prev->next、b = a->next；交换后 prev 应该落到 a 上（因为 a 变成了这一对的后一个）。",
      "循环条件必须同时保证 prev->next 和 prev->next->next 存在。"
    ],
    "ref": [
      "ListNode* swapPairs(ListNode* head) {",
      "    ListNode dummy(0);",
      "    dummy.next = head;",
      "    ListNode* prev = &dummy;",
      "    while (prev->next != nullptr && prev->next->next != nullptr) {",
      "        ListNode* a = prev->next;",
      "        ListNode* b = a->next;",
      "        a->next = b->next;",
      "        b->next = a;",
      "        prev->next = b;",
      "        prev = a;",
      "    }",
      "    return dummy.next;",
      "}"
    ],
    "note": "局部交换，四条指针各改一次：a 跳过 b 接到后面、b 指向 a、prev 指向 b、prev 前移到 a。顺序错了会互相覆盖。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "先改 prev->next 再取 b，会找不到原来的第二个节点。",
      "交换完忘记 prev = a，下一轮会从头开始死循环。",
      "奇数长度时最后一个节点要原样保留。"
    ],
    "rating": 1320,
    "hot100": false,
    "slug": "swap-nodes-in-pairs",
    "lcNum": 24,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 两两交换链表中的节点",
      "desc": "【灵神心法点拨】：局部交换，四条指针各改一次：a 跳过 b 接到后面、b 指向 a、prev 指向 b、prev 前移到 a。顺序错了会互相覆盖。",
      "code": [
        "ListNode* swapPairs(ListNode* head) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* prev = &dummy;",
        "    while (prev->next != nullptr && prev->next->next != nullptr) {",
        "        ListNode* a = prev->next;",
        "        ListNode* b = a->next;",
        "        a->next = b->next;",
        "        b->next = a;",
        "        prev->next = b;",
        "        prev = a;",
        "    }",
        "    return dummy.next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 24）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* swapPairs(ListNode* head) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* prev = &dummy;",
        "    while (prev->next != nullptr && prev->next->next != nullptr) {",
        "        ListNode* a = prev->next;",
        "        ListNode* b = a->next;",
        "        a->next = b->next;",
        "        b->next = a;",
        "        prev->next = b;",
        "        prev = a;",
        "    }",
        "    return dummy.next;",
        "}"
      ]
    }
  },
  {
    "id": "l7",
    "mod": "tree-backtrack",
    "idx": 8,
    "title": "删除链表的倒数第 N 个结点",
    "lc": "LeetCode 19",
    "diff": 3,
    "quiz": true,
    "tags": [
      "模块检验",
      "快慢指针"
    ],
    "by": "return",
    "brief": "删除倒数第 n 个节点并返回头节点。要求只遍历一次。",
    "ioIn": "head：链表；n：倒数序号（1 ≤ n ≤ 长度）。",
    "ioOut": "返回删除后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,4,5] | 2",
        "o": "[1,2,3,5]"
      },
      {
        "i": "[1] | 1",
        "o": "[]"
      }
    ],
    "params": [
      "[1,2,3,4,5] | 2",
      "[1] | 1",
      "[1,2] | 1",
      "[1,2,3] | 3"
    ],
    "sig": "ListNode* removeNthFromEnd(ListNode* head, int n)",
    "template": "ListNode* removeNthFromEnd(ListNode* head, int n) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "要删的是 slow->next，所以 slow 应该停在\"倒数第 n+1 个\"，这样才够得着。",
      "让 fast 先从哑节点出发走 n 步，然后 fast 和 slow 同步走，fast 到尾时 slow 正好到位。",
      "slow 从哑节点出发，是为了处理\"删除第一个节点\"的情况。"
    ],
    "ref": [
      "ListNode* removeNthFromEnd(ListNode* head, int n) {",
      "    ListNode dummy(0);",
      "    dummy.next = head;",
      "    ListNode* fast = &dummy;",
      "    ListNode* slow = &dummy;",
      "    for (int i = 0; i < n; i++) {",
      "        fast = fast->next;",
      "    }",
      "    while (fast->next != nullptr) {",
      "        fast = fast->next;",
      "        slow = slow->next;",
      "    }",
      "    slow->next = slow->next->next;",
      "    return dummy.next;",
      "}"
    ],
    "note": "快慢指针拉开 n 步的固定距离，这个距离保持不变，所以 fast 到尾时 slow 落后 n 个，正好是要删节点的前一个。哑节点让\"删头\"不求人。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "slow 从 head 出发，删第一个节点时会崩。",
      "循环写成 while (fast != nullptr)，slow 会多走一步，删错位置。",
      "返回 head 而不是 dummy.next，删头时会出错。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "remove-nth-node-from-end-of-list",
    "lcNum": 19,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 删除链表的倒数第 N 个结点",
      "desc": "【灵神心法点拨】：快慢指针拉开 n 步的固定距离，这个距离保持不变，所以 fast 到尾时 slow 落后 n 个，正好是要删节点的前一个。哑节点让\"删头\"不求人。",
      "code": [
        "ListNode* removeNthFromEnd(ListNode* head, int n) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* fast = &dummy;",
        "    ListNode* slow = &dummy;",
        "    for (int i = 0; i < n; i++) {",
        "        fast = fast->next;",
        "    }",
        "    while (fast->next != nullptr) {",
        "        fast = fast->next;",
        "        slow = slow->next;",
        "    }",
        "    slow->next = slow->next->next;",
        "    return dummy.next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 19）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* removeNthFromEnd(ListNode* head, int n) {",
        "    ListNode dummy(0);",
        "    dummy.next = head;",
        "    ListNode* fast = &dummy;",
        "    ListNode* slow = &dummy;",
        "    for (int i = 0; i < n; i++) {",
        "        fast = fast->next;",
        "    }",
        "    while (fast->next != nullptr) {",
        "        fast = fast->next;",
        "        slow = slow->next;",
        "    }",
        "    slow->next = slow->next->next;",
        "    return dummy.next;",
        "}"
      ]
    }
  },
  {
    "id": "tp1",
    "mod": "two-pointers",
    "idx": 1,
    "title": "删除有序数组中的重复项",
    "lc": "LeetCode 26",
    "diff": 1,
    "tags": [
      "快慢指针",
      "原地"
    ],
    "by": "return",
    "brief": "升序数组原地去重，让前 k 个元素是去重后的结果，返回 k。",
    "ioIn": "nums：升序数组。",
    "ioOut": "返回去重后的长度 k（数组前 k 位就是答案）。",
    "ex": [
      {
        "i": "[1,1,2]",
        "o": "2"
      },
      {
        "i": "[0,0,1,1,1,2,2,3,3,4]",
        "o": "5"
      }
    ],
    "params": [
      "[1,1,2]",
      "[0,0,1,1,1,2,2,3,3,4]",
      "[1]",
      "[1,1,1]"
    ],
    "sig": "int removeDuplicates(vector<int>& nums)",
    "template": "int removeDuplicates(vector<int>& nums) {\n    // k 指向\"已保留区\"的下一个位置\n    return 0;\n}",
    "hints": [
      "慢指针 k 表示\"已经保留了多少个不同的数\"，快指针 i 负责往前扫。",
      "只有 nums[i] 和已保留区最后一个不同，才写入 nums[k] 并让 k++。",
      "数组是有序的，所以只需和最后一个保留值比，不用回头查全部。"
    ],
    "ref": [
      "int removeDuplicates(vector<int>& nums) {",
      "    if (nums.empty()) { return 0; }",
      "    int k = 1;",
      "    for (int i = 1; i < nums.size(); i++) {",
      "        if (nums[i] != nums[k - 1]) {",
      "            nums[k] = nums[i];",
      "            k++;",
      "        }",
      "    }",
      "    return k;",
      "}"
    ],
    "note": "快慢指针在数组上的形态：快指针读，慢指针写。写入位置永远不超过读取位置，所以原地安全。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "和 nums[i-1] 比而不是和 nums[k-1] 比，去重后区会被污染。",
      "k 从 0 开始又先自增，第一个元素被跳过。",
      "返回 nums.size() 而不是 k。"
    ],
    "rating": 1120,
    "hot100": false,
    "slug": "remove-duplicates-from-sorted-array",
    "lcNum": 26,
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 删除有序数组中的重复项",
      "desc": "【灵神心法点拨】：快慢指针在数组上的形态：快指针读，慢指针写。写入位置永远不超过读取位置，所以原地安全。",
      "code": [
        "int removeDuplicates(vector<int>& nums) {",
        "    if (nums.empty()) { return 0; }",
        "    int k = 1;",
        "    for (int i = 1; i < nums.size(); i++) {",
        "        if (nums[i] != nums[k - 1]) {",
        "            nums[k] = nums[i];",
        "            k++;",
        "        }",
        "    }",
        "    return k;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 26）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int removeDuplicates(vector<int>& nums) {",
        "    if (nums.empty()) { return 0; }",
        "    int k = 1;",
        "    for (int i = 1; i < nums.size(); i++) {",
        "        if (nums[i] != nums[k - 1]) {",
        "            nums[k] = nums[i];",
        "            k++;",
        "        }",
        "    }",
        "    return k;",
        "}"
      ]
    }
  },
  {
    "id": "tp2",
    "mod": "two-pointers",
    "idx": 2,
    "title": "移动零",
    "lc": "LeetCode 283",
    "diff": 1,
    "tags": [
      "快慢指针",
      "原地"
    ],
    "by": "var:nums",
    "brief": "把数组里所有 0 移到末尾，同时保持非零元素的相对顺序，必须原地修改。",
    "ioIn": "nums：整数数组。",
    "ioOut": "没有返回值，判题看修改后的 nums。",
    "ex": [
      {
        "i": "[0,1,0,3,12]",
        "o": "[1,3,12,0,0]"
      },
      {
        "i": "[0]",
        "o": "[0]"
      }
    ],
    "params": [
      "[0,1,0,3,12]",
      "[0]",
      "[1,2,3]",
      "[0,0,1]"
    ],
    "sig": "void moveZeroes(vector<int>& nums)",
    "template": "void moveZeroes(vector<int>& nums) {\n    // 先把非零元素依次前移，再把剩下的位置补 0\n}",
    "hints": [
      "第一遍：慢指针 k 只接收非零元素，顺序自然就保住了。",
      "第二遍：从 k 到末尾统统填 0。",
      "也可以边扫边 swap(nums[i], nums[k])，一次遍历搞定，本质相同。"
    ],
    "ref": [
      "void moveZeroes(vector<int>& nums) {",
      "    int k = 0;",
      "    for (int i = 0; i < nums.size(); i++) {",
      "        if (nums[i] != 0) {",
      "            nums[k] = nums[i];",
      "            k++;",
      "        }",
      "    }",
      "    for (int i = k; i < nums.size(); i++) {",
      "        nums[i] = 0;",
      "    }",
      "}"
    ],
    "note": "\"压缩 + 补位\"两段式最好想：先保证非零顺序，再处理尾巴。判题比的是 nums 本身，不是返回值。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "用 erase 删除 0，下标会错位。",
      "只前移不补 0，尾巴留着旧值。",
      "交换写法里 k 只在非零时才自增。"
    ],
    "rating": 1150,
    "hot100": true,
    "slug": "move-zeroes",
    "lcNum": 283,
    "lingshen": {
      "name": "灵神定长/不定长滑窗万能模板 · 移动零",
      "desc": "【灵神心法点拨】：\"压缩 + 补位\"两段式最好想：先保证非零顺序，再处理尾巴。判题比的是 nums 本身，不是返回值。",
      "code": [
        "void moveZeroes(vector<int>& nums) {",
        "    int k = 0;",
        "    for (int i = 0; i < nums.size(); i++) {",
        "        if (nums[i] != 0) {",
        "            nums[k] = nums[i];",
        "            k++;",
        "        }",
        "    }",
        "    for (int i = k; i < nums.size(); i++) {",
        "        nums[i] = 0;",
        "    }",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 283）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "void moveZeroes(vector<int>& nums) {",
        "    int k = 0;",
        "    for (int i = 0; i < nums.size(); i++) {",
        "        if (nums[i] != 0) {",
        "            nums[k] = nums[i];",
        "            k++;",
        "        }",
        "    }",
        "    for (int i = k; i < nums.size(); i++) {",
        "        nums[i] = 0;",
        "    }",
        "}"
      ]
    }
  },
  {
    "id": "bs5",
    "mod": "binary-search",
    "idx": 4,
    "title": "寻找峰值",
    "lc": "LeetCode 162",
    "diff": 2,
    "quiz": true,
    "tags": [
      "二分极值",
      "峰值走势"
    ],
    "by": "return",
    "brief": "峰值元素是指其值严格大于左右相邻值的元素。给一个整数数组 nums，找到任何一个峰值并返回其索引。要求 O(log n)。",
    "ioIn": "nums：任何两个相邻元素都不相等。",
    "ioOut": "返回任意一个峰值的下标。",
    "ex": [
      {
        "i": "[1,2,3,1]",
        "o": "2"
      },
      {
        "i": "[1,2,1,3,5,6,4]",
        "o": "5"
      }
    ],
    "params": [
      "[1,2,3,1]",
      "[1,2,1,3,5,6,4]",
      "[1]",
      "[1,2]"
    ],
    "sig": "int findPeakElement(vector<int>& nums)",
    "template": "int findPeakElement(vector<int>& nums) {\n    // 若 nums[mid] < nums[mid+1]，说明右侧必定上坡有峰值\n    return 0;\n}",
    "hints": [
      "二分不一定要求全局有序，只要能明确\"丢弃哪一半\"。",
      "比较 nums[mid] 和 nums[mid + 1]：如果 mid < mid+1，说明向右处于爬坡走势，右侧必定存在峰值！",
      "反之处于下坡走势，左侧（包含 mid）必然存在峰值。"
    ],
    "ref": [
      "int findPeakElement(vector<int>& nums) {",
      "    int l = 0, r = nums.size() - 1;",
      "    while (l < r) {",
      "        int mid = l + (r - l) / 2;",
      "        if (nums[mid] < nums[mid + 1]) {",
      "            l = mid + 1;",
      "        } else {",
      "            r = mid;",
      "        }",
      "    }",
      "    return l;",
      "}"
    ],
    "note": "二分本质就是\"二分选择导向性\"。只要上坡，坡顶或前方就必定有峰，因而可以成倍缩小搜寻范围。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "写 l <= r 会导致 mid+1 越界。",
      "条件更新时 r = mid 而不是 mid-1。"
    ],
    "rating": 1510,
    "hot100": true,
    "slug": "find-peak-element",
    "lcNum": 162,
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 寻找峰值",
      "desc": "【灵神心法点拨】：二分本质就是\"二分选择导向性\"。只要上坡，坡顶或前方就必定有峰，因而可以成倍缩小搜寻范围。",
      "code": [
        "int findPeakElement(vector<int>& nums) {",
        "    int l = 0, r = nums.size() - 1;",
        "    while (l < r) {",
        "        int mid = l + (r - l) / 2;",
        "        if (nums[mid] < nums[mid + 1]) {",
        "            l = mid + 1;",
        "        } else {",
        "            r = mid;",
        "        }",
        "    }",
        "    return l;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 162）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int findPeakElement(vector<int>& nums) {",
        "    int l = 0, r = nums.size() - 1;",
        "    while (l < r) {",
        "        int mid = l + (r - l) / 2;",
        "        if (nums[mid] < nums[mid + 1]) {",
        "            l = mid + 1;",
        "        } else {",
        "            r = mid;",
        "        }",
        "    }",
        "    return l;",
        "}"
      ]
    }
  },
  {
    "id": "bs3",
    "mod": "binary-search",
    "idx": 5,
    "title": "搜索旋转排序数组",
    "lc": "LeetCode 33",
    "diff": 2,
    "tags": [
      "二分",
      "有序段判断"
    ],
    "by": "return",
    "quiz": true,
    "fn": "search",
    "brief": "升序数组被旋转过（如 [4,5,6,7,0,1,2]），在里面找 target，返回下标或 -1，要求 O(log n)。",
    "ioIn": "nums：旋转后的不重复数组；target：目标值。",
    "ioOut": "返回下标或 -1。",
    "ex": [
      {
        "i": "[4,5,6,7,0,1,2] | 0",
        "o": "4"
      },
      {
        "i": "[4,5,6,7,0,1,2] | 3",
        "o": "-1"
      },
      {
        "i": "[1] | 0",
        "o": "-1"
      }
    ],
    "params": [
      "[4,5,6,7,0,1,2] | 0",
      "[4,5,6,7,0,1,2] | 3",
      "[1] | 0",
      "[3,1] | 1"
    ],
    "sig": "int search(vector<int>& nums, int target)",
    "template": "int search(vector<int>& nums, int target) {\n    // 先判断哪一半是有序的，再决定去哪一半\n    return -1;\n}",
    "hints": [
      "旋转数组一分为二后，至少有一半是完全有序的。",
      "用 nums[l] <= nums[mid] 判断左半是否有序；有序那半能直接判断 target 在不在里面。",
      "在有序半里就缩到那半，否则去另一半，仍然是每轮砍一半。"
    ],
    "ref": [
      "int search(vector<int>& nums, int target) {",
      "    int l = 0, r = nums.size() - 1;",
      "    while (l <= r) {",
      "        int mid = l + (r - l) / 2;",
      "        if (nums[mid] == target) { return mid; }",
      "        if (nums[l] <= nums[mid]) {",
      "            if (nums[l] <= target && target < nums[mid]) { r = mid - 1; }",
      "            else { l = mid + 1; }",
      "        } else {",
      "            if (nums[mid] < target && target <= nums[r]) { l = mid + 1; }",
      "            else { r = mid - 1; }",
      "        }",
      "    }",
      "    return -1;",
      "}"
    ],
    "note": "二分的本质不是\"必须整体有序\"，而是\"每轮能确定丢掉哪一半\"。旋转数组靠\"哪半有序\"来做这个判断。",
    "complexity": "时间 O(log n)，空间 O(1)。",
    "pitfalls": [
      "判断有序写成 nums[l] < nums[mid]，l == mid 时走错分支。",
      "区间判断少了等号，边界值找不到。",
      "先排序再二分，破坏了原下标也超了复杂度。"
    ],
    "rating": 1680,
    "hot100": true,
    "slug": "search-in-rotated-sorted-array",
    "lcNum": 33,
    "lingshen": {
      "name": "灵神闭区间红蓝染色二分法 · 搜索旋转排序数组",
      "desc": "【灵神心法点拨】：二分的本质不是\"必须整体有序\"，而是\"每轮能确定丢掉哪一半\"。旋转数组靠\"哪半有序\"来做这个判断。",
      "code": [
        "int search(vector<int>& nums, int target) {",
        "    int l = 0, r = nums.size() - 1;",
        "    while (l <= r) {",
        "        int mid = l + (r - l) / 2;",
        "        if (nums[mid] == target) { return mid; }",
        "        if (nums[l] <= nums[mid]) {",
        "            if (nums[l] <= target && target < nums[mid]) { r = mid - 1; }",
        "            else { l = mid + 1; }",
        "        } else {",
        "            if (nums[mid] < target && target <= nums[r]) { l = mid + 1; }",
        "            else { r = mid - 1; }",
        "        }",
        "    }",
        "    return -1;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 33）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int search(vector<int>& nums, int target) {",
        "    int l = 0, r = nums.size() - 1;",
        "    while (l <= r) {",
        "        int mid = l + (r - l) / 2;",
        "        if (nums[mid] == target) { return mid; }",
        "        if (nums[l] <= nums[mid]) {",
        "            if (nums[l] <= target && target < nums[mid]) { r = mid - 1; }",
        "            else { l = mid + 1; }",
        "        } else {",
        "            if (nums[mid] < target && target <= nums[r]) { l = mid + 1; }",
        "            else { r = mid - 1; }",
        "        }",
        "    }",
        "    return -1;",
        "}"
      ]
    }
  },
  {
    "id": "sq1",
    "mod": "monotonic-stack",
    "idx": 1,
    "title": "有效的括号",
    "lc": "LeetCode 20",
    "diff": 1,
    "tags": [
      "栈",
      "字符串"
    ],
    "by": "return",
    "brief": "给一个只含 ()[]{} 的字符串，判断括号是否有效：类型对应、顺序正确、每个左括号都被闭合。",
    "ioIn": "s：只含六种括号字符的字符串。",
    "ioOut": "有效返回 true，否则 false。",
    "ex": [
      {
        "i": "\"()[]{}\"",
        "o": "true"
      },
      {
        "i": "\"(]\"",
        "o": "false"
      },
      {
        "i": "\"([)]\"",
        "o": "false"
      }
    ],
    "params": [
      "\"()[]{}\"",
      "\"(]\"",
      "\"([)]\"",
      "\"{[]}\"",
      "\"\"",
      "\"(\""
    ],
    "sig": "bool isValid(string s)",
    "template": "bool isValid(string s) {\n    stack<char> st;\n    // 左括号入栈，右括号比对栈顶\n    return st.empty();\n}",
    "hints": [
      "栈天然表达\"最近打开的必须先关闭\"。",
      "遇到右括号先看栈空不空：空说明没有对应的左括号，直接 false。",
      "扫完字符串还要检查栈是否为空，剩下左括号说明没闭合。"
    ],
    "ref": [
      "bool isValid(string s) {",
      "    stack<char> st;",
      "    for (int i = 0; i < s.size(); i++) {",
      "        char c = s[i];",
      "        if (c == '(' || c == '[' || c == '{') {",
      "            st.push(c);",
      "        } else {",
      "            if (st.empty()) { return false; }",
      "            char t = st.top();",
      "            st.pop();",
      "            if (c == ')' && t != '(') { return false; }",
      "            if (c == ']' && t != '[') { return false; }",
      "            if (c == '}' && t != '{') { return false; }",
      "        }",
      "    }",
      "    return st.empty();",
      "}"
    ],
    "note": "栈顶永远是\"最近一个还没闭合的左括号\"。右括号只需要和它比一次，比完就弹掉。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "右括号来了不判栈空，直接 top() 会出错。",
      "只数左右括号个数，不管顺序，\"([)]\" 会被判成有效。",
      "结束时忘了检查栈是否清空。"
    ],
    "rating": 1180,
    "hot100": true,
    "slug": "valid-parentheses",
    "lcNum": 20,
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 有效的括号",
      "desc": "【灵神心法点拨】：栈顶永远是\"最近一个还没闭合的左括号\"。右括号只需要和它比一次，比完就弹掉。",
      "code": [
        "bool isValid(string s) {",
        "    stack<char> st;",
        "    for (int i = 0; i < s.size(); i++) {",
        "        char c = s[i];",
        "        if (c == '(' || c == '[' || c == '{') {",
        "            st.push(c);",
        "        } else {",
        "            if (st.empty()) { return false; }",
        "            char t = st.top();",
        "            st.pop();",
        "            if (c == ')' && t != '(') { return false; }",
        "            if (c == ']' && t != '[') { return false; }",
        "            if (c == '}' && t != '{') { return false; }",
        "        }",
        "    }",
        "    return st.empty();",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 20）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool isValid(string s) {",
        "    stack<char> st;",
        "    for (int i = 0; i < s.size(); i++) {",
        "        char c = s[i];",
        "        if (c == '(' || c == '[' || c == '{') {",
        "            st.push(c);",
        "        } else {",
        "            if (st.empty()) { return false; }",
        "            char t = st.top();",
        "            st.pop();",
        "            if (c == ')' && t != '(') { return false; }",
        "            if (c == ']' && t != '[') { return false; }",
        "            if (c == '}' && t != '{') { return false; }",
        "        }",
        "    }",
        "    return st.empty();",
        "}"
      ]
    }
  },
  {
    "id": "sq3",
    "mod": "monotonic-stack",
    "idx": 2,
    "title": "用栈实现队列",
    "lc": "LeetCode 232",
    "diff": 1,
    "tags": [
      "双栈倒腾",
      "平摊分析"
    ],
    "by": "return",
    "brief": "请你仅使用两个栈实现先入先出队列。支持 push、pop、peek、empty 操作。输入为操作序列，返回每次 pop/peek 的数值数组。",
    "ioIn": "ops：操作序列数组。",
    "ioOut": "返回对应的弹出结果数组。",
    "ex": [
      {
        "i": "[1, 2, 3]",
        "o": "[1, 2, 3]"
      }
    ],
    "params": [
      "[1, 2, 3]",
      "[1]",
      "[5, 8, 2]"
    ],
    "sig": "vector<int> simulateQueue(vector<int>& ops)",
    "template": "vector<int> simulateQueue(vector<int>& ops) {\n    stack<int> inSt, outSt;\n    // 用两个栈实现 FIFO\n    return {};\n}",
    "hints": [
      "inStack 只负责接收输入，outStack 负责输出。",
      "当 outStack 为空时，将 inStack 所有元素逐个弹出并压入 outStack，顺序正好完成颠倒！"
    ],
    "ref": [
      "vector<int> simulateQueue(vector<int>& ops) {",
      "    stack<int> inSt, outSt;",
      "    for (int x : ops) { inSt.push(x); }",
      "    vector<int> res;",
      "    while (!inSt.empty()) {",
      "        outSt.push(inSt.top());",
      "        inSt.pop();",
      "    }",
      "    while (!outSt.empty()) {",
      "        res.push_back(outSt.top());",
      "        outSt.pop();",
      "    }",
      "    return res;",
      "}"
    ],
    "note": "负负得正：两个 LIFO 栈串联即还原为 FIFO 队列。每个元素最多进出栈各两次，均摊复杂度 O(1)。",
    "complexity": "均摊时间 O(1)，空间 O(n)。",
    "pitfalls": [
      "倒腾条件：只有当 outStack 为空时才能从 inStack 倒入，否则顺序会被打乱。"
    ],
    "rating": 1200,
    "hot100": false,
    "slug": "implement-queue-using-stacks",
    "lcNum": 232,
    "lingshen": {
      "name": "灵神单调栈及时淘汰法 · 用栈实现队列",
      "desc": "【灵神心法点拨】：负负得正：两个 LIFO 栈串联即还原为 FIFO 队列。每个元素最多进出栈各两次，均摊复杂度 O(1)。",
      "code": [
        "vector<int> simulateQueue(vector<int>& ops) {",
        "    stack<int> inSt, outSt;",
        "    for (int x : ops) { inSt.push(x); }",
        "    vector<int> res;",
        "    while (!inSt.empty()) {",
        "        outSt.push(inSt.top());",
        "        inSt.pop();",
        "    }",
        "    while (!outSt.empty()) {",
        "        res.push_back(outSt.top());",
        "        outSt.pop();",
        "    }",
        "    return res;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 232）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> simulateQueue(vector<int>& ops) {",
        "    stack<int> inSt, outSt;",
        "    for (int x : ops) { inSt.push(x); }",
        "    vector<int> res;",
        "    while (!inSt.empty()) {",
        "        outSt.push(inSt.top());",
        "        inSt.pop();",
        "    }",
        "    while (!outSt.empty()) {",
        "        res.push_back(outSt.top());",
        "        outSt.pop();",
        "    }",
        "    return res;",
        "}"
      ]
    }
  },
  {
    "id": "hp3",
    "mod": "data-structures",
    "idx": 1,
    "title": "最后一块石头的重量",
    "lc": "LeetCode 1046",
    "diff": 1,
    "quiz": true,
    "tags": [
      "大顶堆模拟",
      "贪心"
    ],
    "by": "return",
    "brief": "有一堆石头，每回合选出最重的两块 x 和 y（x <= y）粉碎。若 x == y 两块完全粉碎；若 x != y 则剩 y - x 放回。直到最多剩一块石头，求其重量。",
    "ioIn": "stones：石头重量数组。",
    "ioOut": "返回最后剩下的石头重量，没剩下返回 0。",
    "ex": [
      {
        "i": "[2,7,4,1,8,1]",
        "o": "1"
      },
      {
        "i": "[1]",
        "o": "1"
      }
    ],
    "params": [
      "[2,7,4,1,8,1]",
      "[1]",
      "[2,2]",
      "[3,7,2]"
    ],
    "sig": "int lastStoneWeight(vector<int>& stones)",
    "template": "int lastStoneWeight(vector<int>& stones) {\n    // 循环：每次选两块最重的粉碎，将差值塞回\n    return 0;\n}",
    "hints": [
      "大顶堆的应用原型：每次需要最高效地取出集合中的最大值。",
      "每轮排序后，数组末尾两位就是最重的两块石头。",
      "将它们 pop 出去，若差值 > 0，再 push 进数组继续循环，直到数组长度 ≤ 1。"
    ],
    "ref": [
      "int lastStoneWeight(vector<int>& stones) {",
      "    while (stones.size() > 1) {",
      "        sort(stones.begin(), stones.end());",
      "        int n = stones.size();",
      "        int y = stones[n - 1];",
      "        int x = stones[n - 2];",
      "        stones.pop_back();",
      "        stones.pop_back();",
      "        if (y > x) {",
      "            stones.push_back(y - x);",
      "        }",
      "    }",
      "    return stones.empty() ? 0 : stones[0];",
      "}"
    ],
    "note": "优先队列天然适合这种\"动态插入、极值提取\"的博弈模拟。",
    "complexity": "时间 O(n² log n)，空间 O(1)。",
    "pitfalls": [
      "最后全部粉碎时返回 0，注意判断 stones.empty()。",
      "只剩一块石头时直接退出。"
    ],
    "rating": 1220,
    "hot100": false,
    "slug": "last-stone-weight",
    "lcNum": 1046,
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 最后一块石头的重量",
      "desc": "【灵神心法点拨】：优先队列天然适合这种\"动态插入、极值提取\"的博弈模拟。",
      "code": [
        "int lastStoneWeight(vector<int>& stones) {",
        "    while (stones.size() > 1) {",
        "        sort(stones.begin(), stones.end());",
        "        int n = stones.size();",
        "        int y = stones[n - 1];",
        "        int x = stones[n - 2];",
        "        stones.pop_back();",
        "        stones.pop_back();",
        "        if (y > x) {",
        "            stones.push_back(y - x);",
        "        }",
        "    }",
        "    return stones.empty() ? 0 : stones[0];",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1046）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int lastStoneWeight(vector<int>& stones) {",
        "    while (stones.size() > 1) {",
        "        sort(stones.begin(), stones.end());",
        "        int n = stones.size();",
        "        int y = stones[n - 1];",
        "        int x = stones[n - 2];",
        "        stones.pop_back();",
        "        stones.pop_back();",
        "        if (y > x) {",
        "            stones.push_back(y - x);",
        "        }",
        "    }",
        "    return stones.empty() ? 0 : stones[0];",
        "}"
      ]
    }
  },
  {
    "id": "t2",
    "mod": "tree-backtrack",
    "idx": 3,
    "title": "对称二叉树",
    "lc": "LeetCode 101",
    "diff": 2,
    "by": "return",
    "fn": "isSymmetric",
    "tags": [
      "递归",
      "镜像"
    ],
    "selfCheck": false,
    "brief": "判断一棵二叉树是否轴对称：左右两边互为镜像。",
    "ioIn": "一行层序序列，空格分隔，`#` 表示空节点，例如 `1 2 2 3 4 4 3`。",
    "ioOut": "输出 `true` 或 `false`。",
    "ex": [
      {
        "i": "1 2 2 3 4 4 3",
        "o": "true"
      },
      {
        "i": "1 2 2 # 3 # 3",
        "o": "false"
      },
      {
        "i": "1",
        "o": "true"
      }
    ],
    "cases": [
      {
        "in": "1 2 2 3 4 4 3",
        "out": "true"
      },
      {
        "in": "1 2 2 # 3 # 3",
        "out": "false"
      },
      {
        "in": "1",
        "out": "true"
      }
    ],
    "range": "节点数 0–10^4，节点值 -100–100；空树用 `#` 表示",
    "sig": "bool isSymmetric(TreeNode* root)",
    "params": [
      "[1,2,2,3,4,4,3]",
      "[1,2,2,null,3,null,3]",
      "[1]",
      "[]"
    ],
    "ref": [
      "bool check(TreeNode* a, TreeNode* b) {",
      "    if (a == nullptr && b == nullptr) { return true; }",
      "    if (a == nullptr || b == nullptr) { return false; }",
      "    if (a->val != b->val) { return false; }",
      "    return check(a->left, b->right) && check(a->right, b->left);",
      "}",
      "",
      "bool isSymmetric(TreeNode* root) {",
      "    if (root == nullptr) { return true; }",
      "    return check(root->left, root->right);",
      "}"
    ],
    "template": "bool check(TreeNode* a, TreeNode* b) {\n    // 两个都空 / 只有一个空 / 值不等，三个出口先写\n    return true;\n}\n\nbool isSymmetric(TreeNode* root) {\n    if (root == nullptr) { return true; }\n    return check(root->left, root->right);\n}",
    "templateOnline": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <string>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nbool check(TreeNode* a, TreeNode* b) {\n    // 两个节点互为镜像要满足什么？把出口先写全\n    return true;\n}\n\nbool isSymmetric(TreeNode* root) {\n    if (root == nullptr) { return true; }\n    return check(root->left, root->right);\n}\n\nTreeNode* build(const vector<string>& t) {\n    if (t.empty() || t[0] == \"#\") { return nullptr; }\n    TreeNode* root = new TreeNode(stoi(t[0]));\n    queue<TreeNode*> q; q.push(root); int i = 1;\n    while (!q.empty() && i < (int)t.size()) {\n        TreeNode* cur = q.front(); q.pop();\n        if (i < (int)t.size()) { if (t[i] != \"#\") { cur->left = new TreeNode(stoi(t[i])); q.push(cur->left); } i++; }\n        if (i < (int)t.size()) { if (t[i] != \"#\") { cur->right = new TreeNode(stoi(t[i])); q.push(cur->right); } i++; }\n    }\n    return root;\n}\n\nint main() {\n    string s; vector<string> t;\n    while (cin >> s) { t.push_back(s); }\n    cout << (isSymmetric(build(t)) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
    "program": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <string>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nbool check(TreeNode* a, TreeNode* b) {\n    if (a == nullptr && b == nullptr) { return true; }\n    if (a == nullptr || b == nullptr) { return false; }\n    if (a->val != b->val) { return false; }\n    return check(a->left, b->right) && check(a->right, b->left);\n}\n\nbool isSymmetric(TreeNode* root) {\n    if (root == nullptr) { return true; }\n    return check(root->left, root->right);\n}\n\nTreeNode* build(const vector<string>& t) {\n    if (t.empty() || t[0] == \"#\") { return nullptr; }\n    TreeNode* root = new TreeNode(stoi(t[0]));\n    queue<TreeNode*> q; q.push(root); int i = 1;\n    while (!q.empty() && i < (int)t.size()) {\n        TreeNode* cur = q.front(); q.pop();\n        if (i < (int)t.size()) { if (t[i] != \"#\") { cur->left = new TreeNode(stoi(t[i])); q.push(cur->left); } i++; }\n        if (i < (int)t.size()) { if (t[i] != \"#\") { cur->right = new TreeNode(stoi(t[i])); q.push(cur->right); } i++; }\n    }\n    return root;\n}\n\nint main() {\n    string s; vector<string> t;\n    while (cin >> s) { t.push_back(s); }\n    cout << (isSymmetric(build(t)) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
    "hints": [
      "别去比较\"左子树和右子树本身是否相等\"，要比它们互为镜像。",
      "写辅助函数 check(a, b)：值相等，并且 a 的左对 b 的右、a 的右对 b 的左。",
      "两个都空 → true，只有一个空 → false，这两个出口先写，剩下的交给递归。"
    ],
    "note": "镜像的定义是\"交叉对应\"：a 的左边配 b 的右边。把这一条写进递归的参数顺序里，剩下的交给递归。",
    "complexity": "时间 O(n)（成对访问节点），空间 O(h) 递归栈。",
    "pitfalls": [
      "写成 check(a->left, b->left)，比的是同侧不是镜像。",
      "两个都空和只有一个空的出口顺序写反，会把 false 判成 true。",
      "值不等要及时返回 false，别继续往下递归。"
    ],
    "rating": 1220,
    "hot100": true,
    "slug": "symmetric-tree",
    "lcNum": 101,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 对称二叉树",
      "desc": "【灵神心法点拨】：镜像的定义是\"交叉对应\"：a 的左边配 b 的右边。把这一条写进递归的参数顺序里，剩下的交给递归。",
      "code": [
        "bool check(TreeNode* a, TreeNode* b) {",
        "    if (a == nullptr && b == nullptr) { return true; }",
        "    if (a == nullptr || b == nullptr) { return false; }",
        "    if (a->val != b->val) { return false; }",
        "    return check(a->left, b->right) && check(a->right, b->left);",
        "}",
        "",
        "bool isSymmetric(TreeNode* root) {",
        "    if (root == nullptr) { return true; }",
        "    return check(root->left, root->right);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 101）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool check(TreeNode* a, TreeNode* b) {",
        "    if (a == nullptr && b == nullptr) { return true; }",
        "    if (a == nullptr || b == nullptr) { return false; }",
        "    if (a->val != b->val) { return false; }",
        "    return check(a->left, b->right) && check(a->right, b->left);",
        "}",
        "",
        "bool isSymmetric(TreeNode* root) {",
        "    if (root == nullptr) { return true; }",
        "    return check(root->left, root->right);",
        "}"
      ]
    }
  },
  {
    "id": "ta2",
    "mod": "tree-backtrack",
    "idx": 1,
    "title": "路径总和",
    "lc": "LeetCode 112",
    "diff": 2,
    "tags": [
      "递归",
      "根到叶"
    ],
    "by": "return",
    "quiz": true,
    "brief": "判断是否存在一条从根到叶子的路径，路径上节点值之和等于 targetSum。",
    "ioIn": "root：二叉树根节点；targetSum：目标和。",
    "ioOut": "存在返回 true，否则 false。",
    "ex": [
      {
        "i": "[5,4,8,11,null,13,4,7,2,null,null,null,1] | 22",
        "o": "true"
      },
      {
        "i": "[1,2,3] | 5",
        "o": "false"
      }
    ],
    "params": [
      "[5,4,8,11,null,13,4,7,2,null,null,null,1] | 22",
      "[1,2,3] | 5",
      "[1,2] | 1",
      "[] | 0"
    ],
    "sig": "bool hasPathSum(TreeNode* root, int targetSum)",
    "template": "bool hasPathSum(TreeNode* root, int targetSum) {\n    // 叶子怎么判？剩余额度怎么往下传？\n    return false;\n}",
    "hints": [
      "把问题变小：往下走一层，需要的和就变成 targetSum - root->val。",
      "叶子的定义是左右都为空；只有到叶子时才判断剩余额度是否等于当前值。",
      "空节点返回 false（空树没有任何路径），这一句同时兜住了空树。"
    ],
    "ref": [
      "bool hasPathSum(TreeNode* root, int targetSum) {",
      "    if (root == nullptr) { return false; }",
      "    if (root->left == nullptr && root->right == nullptr) {",
      "        return root->val == targetSum;",
      "    }",
      "    int rest = targetSum - root->val;",
      "    return hasPathSum(root->left, rest) || hasPathSum(root->right, rest);",
      "}"
    ],
    "note": "\"到叶子才结算\"是这题的分水岭。中途就判等会把中间节点误当答案，尤其是有负数时。",
    "complexity": "时间 O(n)，空间 O(h)。",
    "pitfalls": [
      "在中途节点就判 sum 相等。",
      "空节点返回 true，导致空树也算有路径。",
      "只用左子树的结果，漏了右子树。"
    ],
    "rating": 1280,
    "hot100": false,
    "slug": "path-sum",
    "lcNum": 112,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 路径总和",
      "desc": "【灵神心法点拨】：\"到叶子才结算\"是这题的分水岭。中途就判等会把中间节点误当答案，尤其是有负数时。",
      "code": [
        "bool hasPathSum(TreeNode* root, int targetSum) {",
        "    if (root == nullptr) { return false; }",
        "    if (root->left == nullptr && root->right == nullptr) {",
        "        return root->val == targetSum;",
        "    }",
        "    int rest = targetSum - root->val;",
        "    return hasPathSum(root->left, rest) || hasPathSum(root->right, rest);",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 112）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool hasPathSum(TreeNode* root, int targetSum) {",
        "    if (root == nullptr) { return false; }",
        "    if (root->left == nullptr && root->right == nullptr) {",
        "        return root->val == targetSum;",
        "    }",
        "    int rest = targetSum - root->val;",
        "    return hasPathSum(root->left, rest) || hasPathSum(root->right, rest);",
        "}"
      ]
    }
  },
  {
    "id": "ta1",
    "mod": "tree-backtrack",
    "idx": 2,
    "title": "二叉树的层序遍历",
    "lc": "LeetCode 102",
    "diff": 2,
    "tags": [
      "BFS",
      "队列"
    ],
    "by": "return",
    "brief": "按层从上到下、每层从左到右访问二叉树，返回二维数组，每一层是一个数组。",
    "ioIn": "root：二叉树根节点（层序数组，null 表示空）。",
    "ioOut": "返回 vector<vector<int>>，第 i 个数组是第 i 层。",
    "ex": [
      {
        "i": "[3,9,20,null,null,15,7]",
        "o": "[[3],[9,20],[15,7]]"
      },
      {
        "i": "[1]",
        "o": "[[1]]"
      }
    ],
    "params": [
      "[3,9,20,null,null,15,7]",
      "[1]",
      "[]",
      "[1,2,3,4,null,null,5]"
    ],
    "sig": "vector<vector<int>> levelOrder(TreeNode* root)",
    "template": "vector<vector<int>> levelOrder(TreeNode* root) {\n    vector<vector<int>> res;\n    // 用 queue<TreeNode*> 一层一层地取\n    return res;\n}",
    "hints": [
      "BFS 的骨架：队列里放节点，每次先记下当前队列长度 sz，那就是一层的节点数。",
      "内层循环恰好跑 sz 次，把这一层收进一个 vector，再把孩子推进队列。",
      "空树直接返回空的 res，不要往队列里塞 nullptr。"
    ],
    "ref": [
      "vector<vector<int>> levelOrder(TreeNode* root) {",
      "    vector<vector<int>> res;",
      "    if (root == nullptr) { return res; }",
      "    queue<TreeNode*> q;",
      "    q.push(root);",
      "    while (!q.empty()) {",
      "        int sz = q.size();",
      "        vector<int> level;",
      "        for (int i = 0; i < sz; i++) {",
      "            TreeNode* cur = q.front();",
      "            q.pop();",
      "            level.push_back(cur->val);",
      "            if (cur->left != nullptr) { q.push(cur->left); }",
      "            if (cur->right != nullptr) { q.push(cur->right); }",
      "        }",
      "        res.push_back(level);",
      "    }",
      "    return res;",
      "}"
    ],
    "note": "关键在\"先固定这一层的大小\"。不记 sz 就会把下一层的孩子也算进本层，层与层混在一起。",
    "complexity": "时间 O(n)，空间 O(w)，w 是最大层宽。",
    "pitfalls": [
      "不记 sz，直接 while 队列非空就收，层会串。",
      "把 nullptr 也推进队列，后面取 val 会崩。",
      "忘记把 level 收进 res。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "binary-tree-level-order-traversal",
    "lcNum": 102,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 二叉树的层序遍历",
      "desc": "【灵神心法点拨】：关键在\"先固定这一层的大小\"。不记 sz 就会把下一层的孩子也算进本层，层与层混在一起。",
      "code": [
        "vector<vector<int>> levelOrder(TreeNode* root) {",
        "    vector<vector<int>> res;",
        "    if (root == nullptr) { return res; }",
        "    queue<TreeNode*> q;",
        "    q.push(root);",
        "    while (!q.empty()) {",
        "        int sz = q.size();",
        "        vector<int> level;",
        "        for (int i = 0; i < sz; i++) {",
        "            TreeNode* cur = q.front();",
        "            q.pop();",
        "            level.push_back(cur->val);",
        "            if (cur->left != nullptr) { q.push(cur->left); }",
        "            if (cur->right != nullptr) { q.push(cur->right); }",
        "        }",
        "        res.push_back(level);",
        "    }",
        "    return res;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 102）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<vector<int>> levelOrder(TreeNode* root) {",
        "    vector<vector<int>> res;",
        "    if (root == nullptr) { return res; }",
        "    queue<TreeNode*> q;",
        "    q.push(root);",
        "    while (!q.empty()) {",
        "        int sz = q.size();",
        "        vector<int> level;",
        "        for (int i = 0; i < sz; i++) {",
        "            TreeNode* cur = q.front();",
        "            q.pop();",
        "            level.push_back(cur->val);",
        "            if (cur->left != nullptr) { q.push(cur->left); }",
        "            if (cur->right != nullptr) { q.push(cur->right); }",
        "        }",
        "        res.push_back(level);",
        "    }",
        "    return res;",
        "}"
      ]
    }
  },
  {
    "id": "bt4",
    "mod": "tree-backtrack",
    "idx": 2,
    "title": "电话号码的字母组合",
    "lc": "LeetCode 17",
    "diff": 2,
    "quiz": true,
    "tags": [
      "回溯",
      "多路搜索树"
    ],
    "by": "return",
    "brief": "给定一个仅包含数字 2-9 的字符串 digits，返回所有它能表示的字母组合。电话按键映射同手机键盘。",
    "ioIn": "digits：数字字符串（长度 0-4）。",
    "ioOut": "返回所有字母组合列表。",
    "ex": [
      {
        "i": "\"23\"",
        "o": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      },
      {
        "i": "\"\"",
        "o": "[]"
      }
    ],
    "params": [
      "\"23\"",
      "\"\"",
      "\"2\""
    ],
    "sig": "vector<string> letterCombinations(string digits)",
    "template": "vector<string> letterCombinations(string digits) {\n    // 建立 2-9 到字母集合的映射表，逐层展开搜索\n    return {};\n}",
    "hints": [
      "用数组记录按键映射：如 2 -> \"abc\", 3 -> \"def\"。",
      "搜索深度由 digits 的长度决定，每层对应一个数字，横向遍历其对应的字母。"
    ],
    "ref": [
      "void dfs(string& digits, int idx, string& path, vector<string>& mapping, vector<string>& res) {",
      "    if (idx == digits.size()) {",
      "        res.push_back(path);",
      "        return;",
      "    }",
      "    string letters = mapping[digits[idx] - \"0\"];",
      "    for (int i = 0; i < letters.size(); i++) {",
      "        path.push_back(letters[i]);",
      "        dfs(digits, idx + 1, path, mapping, res);",
      "        path.pop_back();",
      "    }",
      "}",
      "",
      "vector<string> letterCombinations(string digits) {",
      "    vector<string> res;",
      "    if (digits.empty()) { return res; }",
      "    vector<string> mapping(10, \"\");",
      "    mapping[2] = \"abc\"; mapping[3] = \"def\"; mapping[4] = \"ghi\";",
      "    mapping[5] = \"jkl\"; mapping[6] = \"mno\"; mapping[7] = \"pqrs\";",
      "    mapping[8] = \"tuv\"; mapping[9] = \"wxyz\";",
      "    string path = \"\";",
      "    dfs(digits, 0, path, mapping, res);",
      "    return res;",
      "}"
    ],
    "note": "固定深度的全组合搜索：每个字符位置相当于树的一层，层深确定，叶子节点收集答案。",
    "complexity": "时间 O(3^m × 4^n)，空间 O(m + n)。",
    "pitfalls": [
      "输入为空字符串 \"\" 时应该返回空数组，而不是返回含有一个空字符串的数组 [\"\"]。"
    ],
    "rating": 1350,
    "hot100": true,
    "slug": "letter-combinations-of-a-phone-number",
    "lcNum": 17,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 电话号码的字母组合",
      "desc": "【灵神心法点拨】：固定深度的全组合搜索：每个字符位置相当于树的一层，层深确定，叶子节点收集答案。",
      "code": [
        "void dfs(string& digits, int idx, string& path, vector<string>& mapping, vector<string>& res) {",
        "    if (idx == digits.size()) {",
        "        res.push_back(path);",
        "        return;",
        "    }",
        "    string letters = mapping[digits[idx] - \"0\"];",
        "    for (int i = 0; i < letters.size(); i++) {",
        "        path.push_back(letters[i]);",
        "        dfs(digits, idx + 1, path, mapping, res);",
        "        path.pop_back();",
        "    }",
        "}",
        "",
        "vector<string> letterCombinations(string digits) {",
        "    vector<string> res;",
        "    if (digits.empty()) { return res; }",
        "    vector<string> mapping(10, \"\");",
        "    mapping[2] = \"abc\"; mapping[3] = \"def\"; mapping[4] = \"ghi\";",
        "    mapping[5] = \"jkl\"; mapping[6] = \"mno\"; mapping[7] = \"pqrs\";",
        "    mapping[8] = \"tuv\"; mapping[9] = \"wxyz\";",
        "    string path = \"\";",
        "    dfs(digits, 0, path, mapping, res);",
        "    return res;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 17）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "void dfs(string& digits, int idx, string& path, vector<string>& mapping, vector<string>& res) {",
        "    if (idx == digits.size()) {",
        "        res.push_back(path);",
        "        return;",
        "    }",
        "    string letters = mapping[digits[idx] - \"0\"];",
        "    for (int i = 0; i < letters.size(); i++) {",
        "        path.push_back(letters[i]);",
        "        dfs(digits, idx + 1, path, mapping, res);",
        "        path.pop_back();",
        "    }",
        "}",
        "",
        "vector<string> letterCombinations(string digits) {",
        "    vector<string> res;",
        "    if (digits.empty()) { return res; }",
        "    vector<string> mapping(10, \"\");",
        "    mapping[2] = \"abc\"; mapping[3] = \"def\"; mapping[4] = \"ghi\";",
        "    mapping[5] = \"jkl\"; mapping[6] = \"mno\"; mapping[7] = \"pqrs\";",
        "    mapping[8] = \"tuv\"; mapping[9] = \"wxyz\";",
        "    string path = \"\";",
        "    dfs(digits, 0, path, mapping, res);",
        "    return res;",
        "}"
      ]
    }
  },
  {
    "id": "bt3",
    "mod": "tree-backtrack",
    "idx": 4,
    "title": "组合总和",
    "lc": "LeetCode 39",
    "diff": 2,
    "tags": [
      "回溯",
      "元素可复选",
      "剪枝"
    ],
    "by": "return",
    "brief": "给你一个无重复元素的整数数组 candidates 和一个目标整数 target，找出 candidates 中可以使数字和为目标数 target 的所有不同组合。同一数字可以无限制重复被选取。",
    "ioIn": "candidates：正整数数组；target：目标和。",
    "ioOut": "返回所有可行组合。",
    "ex": [
      {
        "i": "[2,3,6,7] | 7",
        "o": "[[2,2,3],[7]]"
      },
      {
        "i": "[2,3,5] | 8",
        "o": "[[2,2,2,2],[2,3,3],[3,5]]"
      }
    ],
    "params": [
      "[2,3,6,7] | 7",
      "[2,3,5] | 8",
      "[2] | 1"
    ],
    "sig": "vector<vector<int>> combinationSum(vector<int>& candidates, int target)",
    "template": "void dfs(vector<int>& c, int start, int target, vector<int>& path, vector<vector<int>>& res) {\n    // 剪枝 + 收集答案\n}\n\nvector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    vector<vector<int>> res; vector<int> path;\n    dfs(candidates, 0, target, path, res);\n    return res;\n}",
    "hints": [
      "为了避免 [2,2,3] 和 [2,3,2] 产生重复，使用 start 索引，保证后续只能选当前或更后面的数字。",
      "因为数字可以无限复选，递归时下一次搜索依然从 i 开始，而不是 i + 1。",
      "若 target < 0 直接剪枝返回；若 target == 0 收集当前 path。"
    ],
    "ref": [
      "void dfs(vector<int>& c, int start, int remain, vector<int>& path, vector<vector<int>>& res) {",
      "    if (remain == 0) {",
      "        res.push_back(path);",
      "        return;",
      "    }",
      "    if (remain < 0) { return; }",
      "    for (int i = start; i < c.size(); i++) {",
      "        path.push_back(c[i]);",
      "        dfs(c, i, remain - c[i], path, res);",
      "        path.pop_back();",
      "    }",
      "}",
      "",
      "vector<vector<int>> combinationSum(vector<int>& candidates, int target) {",
      "    vector<vector<int>> res;",
      "    vector<int> path;",
      "    dfs(candidates, 0, target, path, res);",
      "    return res;",
      "}"
    ],
    "note": "可复选组合的核心：递归传入当前索引 i（而不是 i+1）。结合 remain < 0 进行可行性剪枝。",
    "complexity": "时间 O(S)（S 为所有可行解长度和），空间 O(target) 递归深度。",
    "pitfalls": [
      "递归写成 dfs(..., i + 1, ...) 导致无法重复利用同一元素。",
      "忘记在返回时 path.pop_back() 撤销选择。"
    ],
    "rating": 1500,
    "hot100": true,
    "slug": "combination-sum",
    "lcNum": 39,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 组合总和",
      "desc": "【灵神心法点拨】：可复选组合的核心：递归传入当前索引 i（而不是 i+1）。结合 remain < 0 进行可行性剪枝。",
      "code": [
        "void dfs(vector<int>& c, int start, int remain, vector<int>& path, vector<vector<int>>& res) {",
        "    if (remain == 0) {",
        "        res.push_back(path);",
        "        return;",
        "    }",
        "    if (remain < 0) { return; }",
        "    for (int i = start; i < c.size(); i++) {",
        "        path.push_back(c[i]);",
        "        dfs(c, i, remain - c[i], path, res);",
        "        path.pop_back();",
        "    }",
        "}",
        "",
        "vector<vector<int>> combinationSum(vector<int>& candidates, int target) {",
        "    vector<vector<int>> res;",
        "    vector<int> path;",
        "    dfs(candidates, 0, target, path, res);",
        "    return res;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 39）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "void dfs(vector<int>& c, int start, int remain, vector<int>& path, vector<vector<int>>& res) {",
        "    if (remain == 0) {",
        "        res.push_back(path);",
        "        return;",
        "    }",
        "    if (remain < 0) { return; }",
        "    for (int i = start; i < c.size(); i++) {",
        "        path.push_back(c[i]);",
        "        dfs(c, i, remain - c[i], path, res);",
        "        path.pop_back();",
        "    }",
        "}",
        "",
        "vector<vector<int>> combinationSum(vector<int>& candidates, int target) {",
        "    vector<vector<int>> res;",
        "    vector<int> path;",
        "    dfs(candidates, 0, target, path, res);",
        "    return res;",
        "}"
      ]
    }
  },
  {
    "id": "d2",
    "mod": "dp",
    "idx": 3,
    "title": "最大子数组和",
    "lc": "LeetCode 53",
    "diff": 2,
    "tags": [
      "线性 DP",
      "Kadane"
    ],
    "by": "return",
    "brief": "找出一个连续子数组，使它的和最大，返回这个最大和。",
    "ioIn": "nums：整数数组（可能全为负）。",
    "ioOut": "返回最大子数组和。",
    "ex": [
      {
        "i": "[-2,1,-3,4,-1,2,1,-5,4]",
        "o": "6"
      },
      {
        "i": "[1]",
        "o": "1"
      },
      {
        "i": "[5,4,-1,7,8]",
        "o": "23"
      }
    ],
    "params": [
      "[-2,1,-3,4,-1,2,1,-5,4]",
      "[1]",
      "[5,4,-1,7,8]",
      "[-1]",
      "[-2,-1]"
    ],
    "sig": "int maxSubArray(vector<int>& nums)",
    "template": "int maxSubArray(vector<int>& nums) {\n    // cur：以当前元素结尾的最大和\n    return 0;\n}",
    "hints": [
      "定义状态：cur 表示\"必须以 i 结尾\"的最大子数组和。",
      "转移只有两种选择：接在前面（cur + x），或者另起炉灶（x）。取较大者。",
      "答案是所有 cur 的最大值，不是最后一个 cur。"
    ],
    "ref": [
      "int maxSubArray(vector<int>& nums) {",
      "    int best = nums[0];",
      "    int cur = nums[0];",
      "    for (int i = 1; i < nums.size(); i++) {",
      "        cur = max(nums[i], cur + nums[i]);",
      "        best = max(best, cur);",
      "    }",
      "    return best;",
      "}"
    ],
    "note": "\"以 i 结尾\"这个限定让状态之间能接上；如果不加限定，就无法写出转移。这是线性 DP 最常见的设法。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "best 初始化成 0，全负数组会错答 0。",
      "只返回 cur，漏掉中途出现过的最大值。",
      "把子数组理解成子序列（可以不连续）。"
    ],
    "rating": 1380,
    "hot100": true,
    "slug": "maximum-subarray",
    "lcNum": 53,
    "lingshen": {
      "name": "灵神递归翻译递推 / 空间滚动压缩 · 最大子数组和",
      "desc": "【灵神心法点拨】：\"以 i 结尾\"这个限定让状态之间能接上；如果不加限定，就无法写出转移。这是线性 DP 最常见的设法。",
      "code": [
        "int maxSubArray(vector<int>& nums) {",
        "    int best = nums[0];",
        "    int cur = nums[0];",
        "    for (int i = 1; i < nums.size(); i++) {",
        "        cur = max(nums[i], cur + nums[i]);",
        "        best = max(best, cur);",
        "    }",
        "    return best;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 53）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "int maxSubArray(vector<int>& nums) {",
        "    int best = nums[0];",
        "    int cur = nums[0];",
        "    for (int i = 1; i < nums.size(); i++) {",
        "        cur = max(nums[i], cur + nums[i]);",
        "        best = max(best, cur);",
        "    }",
        "    return best;",
        "}"
      ]
    }
  },
  {
    "id": "a3",
    "mod": "tree-backtrack",
    "idx": 1,
    "title": "奇偶链表",
    "lc": "LeetCode 328",
    "diff": 2,
    "tags": [
      "双指针",
      "拆分重组"
    ],
    "by": "return",
    "brief": "把所有奇数位置节点和偶数位置节点分别连起来，再拼回一条链表。要求原地完成，不新建节点。",
    "ioIn": "head：链表头节点（位置从 1 开始数）。",
    "ioOut": "返回重排后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,4,5]",
        "o": "[1,3,5,2,4]"
      },
      {
        "i": "[2,1,3,5,6,4,7]",
        "o": "[2,3,6,7,1,5,4]"
      }
    ],
    "params": [
      "[1,2,3,4,5]",
      "[2,1,3,5,6,4,7]",
      "[1]",
      "[]",
      "[1,2]"
    ],
    "sig": "ListNode* oddEvenList(ListNode* head)",
    "template": "ListNode* oddEvenList(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "位置是\"第几个节点\"，不是节点值；奇数位和偶数位各自连成一条链。",
      "odd 从 head 走，even 从 head->next 走，用 evenHead 记住偶数链的头，最后 odd->next = evenHead。",
      "循环条件要同时判 even 和 even->next：偶数链先走完时奇数链也就走完了。"
    ],
    "ref": [
      "ListNode* oddEvenList(ListNode* head) {",
      "    if (head == nullptr || head->next == nullptr) {",
      "        return head;",
      "    }",
      "    ListNode* odd = head;",
      "    ListNode* even = head->next;",
      "    ListNode* evenHead = even;",
      "    while (even != nullptr && even->next != nullptr) {",
      "        odd->next = even->next;",
      "        odd = odd->next;",
      "        even->next = odd->next;",
      "        even = even->next;",
      "    }",
      "    odd->next = evenHead;",
      "    return head;",
      "}"
    ],
    "note": "两条链同时往前推：odd 串奇数位，even 串偶数位。even 先到链尾，这时奇数链一定也已到尾，把 odd 尾巴接上 evenHead 即可。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "循环条件漏判 even，偶数节点为最后一个时会解引用空指针。",
      "忘记保存 evenHead，偶数链就找不回来了。",
      "末尾忘了 odd->next = evenHead，偶数链整体丢失。"
    ],
    "rating": 1450,
    "hot100": false,
    "slug": "odd-even-linked-list",
    "lcNum": 328,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 奇偶链表",
      "desc": "【灵神心法点拨】：两条链同时往前推：odd 串奇数位，even 串偶数位。even 先到链尾，这时奇数链一定也已到尾，把 odd 尾巴接上 evenHead 即可。",
      "code": [
        "ListNode* oddEvenList(ListNode* head) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return head;",
        "    }",
        "    ListNode* odd = head;",
        "    ListNode* even = head->next;",
        "    ListNode* evenHead = even;",
        "    while (even != nullptr && even->next != nullptr) {",
        "        odd->next = even->next;",
        "        odd = odd->next;",
        "        even->next = odd->next;",
        "        even = even->next;",
        "    }",
        "    odd->next = evenHead;",
        "    return head;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 328）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* oddEvenList(ListNode* head) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return head;",
        "    }",
        "    ListNode* odd = head;",
        "    ListNode* even = head->next;",
        "    ListNode* evenHead = even;",
        "    while (even != nullptr && even->next != nullptr) {",
        "        odd->next = even->next;",
        "        odd = odd->next;",
        "        even->next = odd->next;",
        "        even = even->next;",
        "    }",
        "    odd->next = evenHead;",
        "    return head;",
        "}"
      ]
    }
  },
  {
    "id": "a6",
    "mod": "tree-backtrack",
    "idx": 2,
    "title": "旋转链表",
    "lc": "LeetCode 61",
    "diff": 3,
    "quiz": true,
    "tags": [
      "模块检验",
      "成环再断开"
    ],
    "by": "return",
    "brief": "把链表每个节点向右移动 k 个位置，k 可能大于链表长度。",
    "ioIn": "head：链表；k：右移位数（k ≥ 0）。",
    "ioOut": "返回旋转后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,4,5] | 2",
        "o": "[4,5,1,2,3]"
      },
      {
        "i": "[0,1,2] | 4",
        "o": "[2,0,1]"
      }
    ],
    "params": [
      "[1,2,3,4,5] | 2",
      "[0,1,2] | 4",
      "[1] | 0",
      "[] | 1",
      "[1,2] | 1"
    ],
    "sig": "ListNode* rotateRight(ListNode* head, int k)",
    "template": "ListNode* rotateRight(ListNode* head, int k) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "先数长度 n，同时把 tail 记下来；k 对 n 取模，取模后为 0 就是原样。",
      "把链先接成环（tail->next = head），这样\"断在哪里\"就决定新头。",
      "新头是第 n-k 个节点的下一个；用快慢指针错开 k 步，fast 到尾时 slow 正好停在新头的上一个。"
    ],
    "ref": [
      "ListNode* rotateRight(ListNode* head, int k) {",
      "    if (head == nullptr || head->next == nullptr) {",
      "        return head;",
      "    }",
      "    int n = 1;",
      "    ListNode* tail = head;",
      "    while (tail->next != nullptr) {",
      "        tail = tail->next;",
      "        n++;",
      "    }",
      "    k = k % n;",
      "    if (k == 0) {",
      "        return head;",
      "    }",
      "    ListNode* slow = head;",
      "    ListNode* fast = head;",
      "    for (int i = 0; i < k; i++) {",
      "        fast = fast->next;",
      "    }",
      "    while (fast->next != nullptr) {",
      "        fast = fast->next;",
      "        slow = slow->next;",
      "    }",
      "    ListNode* newHead = slow->next;",
      "    slow->next = nullptr;",
      "    tail->next = head;",
      "    return newHead;",
      "}"
    ],
    "note": "长度 n、取模 k 之后，新链表 = 后 k 个节点 + 前 n-k 个节点。快指针先走 k 步，两个指针一起走到尾，slow 就落在断点（新头的前一个）上，断链再把尾接回头。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "k 没取模：k 大于长度时指针会走飞。",
      "k % n == 0 时还要旋转，把链断错位置。",
      "空表或单节点要直接返回，否则 tail->next 逻辑会出错。"
    ],
    "rating": 1450,
    "hot100": false,
    "slug": "rotate-list",
    "lcNum": 61,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 旋转链表",
      "desc": "【灵神心法点拨】：长度 n、取模 k 之后，新链表 = 后 k 个节点 + 前 n-k 个节点。快指针先走 k 步，两个指针一起走到尾，slow 就落在断点（新头的前一个）上，断链再把尾接回头。",
      "code": [
        "ListNode* rotateRight(ListNode* head, int k) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return head;",
        "    }",
        "    int n = 1;",
        "    ListNode* tail = head;",
        "    while (tail->next != nullptr) {",
        "        tail = tail->next;",
        "        n++;",
        "    }",
        "    k = k % n;",
        "    if (k == 0) {",
        "        return head;",
        "    }",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    for (int i = 0; i < k; i++) {",
        "        fast = fast->next;",
        "    }",
        "    while (fast->next != nullptr) {",
        "        fast = fast->next;",
        "        slow = slow->next;",
        "    }",
        "    ListNode* newHead = slow->next;",
        "    slow->next = nullptr;",
        "    tail->next = head;",
        "    return newHead;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 61）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* rotateRight(ListNode* head, int k) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return head;",
        "    }",
        "    int n = 1;",
        "    ListNode* tail = head;",
        "    while (tail->next != nullptr) {",
        "        tail = tail->next;",
        "        n++;",
        "    }",
        "    k = k % n;",
        "    if (k == 0) {",
        "        return head;",
        "    }",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    for (int i = 0; i < k; i++) {",
        "        fast = fast->next;",
        "    }",
        "    while (fast->next != nullptr) {",
        "        fast = fast->next;",
        "        slow = slow->next;",
        "    }",
        "    ListNode* newHead = slow->next;",
        "    slow->next = nullptr;",
        "    tail->next = head;",
        "    return newHead;",
        "}"
      ]
    }
  },
  {
    "id": "a4",
    "mod": "tree-backtrack",
    "idx": 3,
    "title": "分隔链表",
    "lc": "LeetCode 86",
    "diff": 2,
    "tags": [
      "哑节点",
      "双链"
    ],
    "by": "return",
    "brief": "给定 head 和 x，把所有小于 x 的节点排在其余节点之前，两段内部保持原有相对顺序。",
    "ioIn": "head：链表；x：分界值。",
    "ioOut": "返回分隔后的头节点。",
    "ex": [
      {
        "i": "[1,4,3,2,5,2] | 3",
        "o": "[1,2,2,4,3,5]"
      },
      {
        "i": "[2,1] | 2",
        "o": "[1,2]"
      }
    ],
    "params": [
      "[1,4,3,2,5,2] | 3",
      "[2,1] | 2",
      "[] | 1",
      "[1] | 0",
      "[3,1,2] | 3"
    ],
    "sig": "ListNode* partition(ListNode* head, int x)",
    "template": "ListNode* partition(ListNode* head, int x) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "最省心的做法不是原地插来插去，而是建两条哑链：一条挂小于 x 的，一条挂其余的。",
      "遍历原链表，按 cur->val < x 决定接到 small 还是 large 的尾部，然后 cur 后移。",
      "收尾两步：large 的尾巴置空（否则可能接回旧节点形成环），small 的尾巴接上 large 的头。"
    ],
    "ref": [
      "ListNode* partition(ListNode* head, int x) {",
      "    ListNode* ds = new ListNode(0);",
      "    ListNode* dl = new ListNode(0);",
      "    ListNode* small = ds;",
      "    ListNode* large = dl;",
      "    ListNode* cur = head;",
      "    while (cur != nullptr) {",
      "        if (cur->val < x) {",
      "            small->next = cur;",
      "            small = cur;",
      "        } else {",
      "            large->next = cur;",
      "            large = cur;",
      "        }",
      "        cur = cur->next;",
      "    }",
      "    large->next = nullptr;",
      "    small->next = dl->next;",
      "    return ds->next;",
      "}"
    ],
    "note": "两条哑链分别收集小于 x 和大于等于 x 的节点，遍历完把大链尾巴断开、小链接上大链头。哑节点省掉了\"第一段为空/整条都小于 x\"的讨论。",
    "complexity": "时间 O(n)，空间 O(1)（只用了常数个指针，哑节点不算规模）。",
    "pitfalls": [
      "忘记 large->next = nullptr，原链尾还指着旧节点，会成环。",
      "返回 ds 而不是 ds->next。",
      "把 large 接到 small 上时顺序写反。"
    ],
    "rating": 1480,
    "hot100": false,
    "slug": "partition-list",
    "lcNum": 86,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 分隔链表",
      "desc": "【灵神心法点拨】：两条哑链分别收集小于 x 和大于等于 x 的节点，遍历完把大链尾巴断开、小链接上大链头。哑节点省掉了\"第一段为空/整条都小于 x\"的讨论。",
      "code": [
        "ListNode* partition(ListNode* head, int x) {",
        "    ListNode* ds = new ListNode(0);",
        "    ListNode* dl = new ListNode(0);",
        "    ListNode* small = ds;",
        "    ListNode* large = dl;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->val < x) {",
        "            small->next = cur;",
        "            small = cur;",
        "        } else {",
        "            large->next = cur;",
        "            large = cur;",
        "        }",
        "        cur = cur->next;",
        "    }",
        "    large->next = nullptr;",
        "    small->next = dl->next;",
        "    return ds->next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 86）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* partition(ListNode* head, int x) {",
        "    ListNode* ds = new ListNode(0);",
        "    ListNode* dl = new ListNode(0);",
        "    ListNode* small = ds;",
        "    ListNode* large = dl;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->val < x) {",
        "            small->next = cur;",
        "            small = cur;",
        "        } else {",
        "            large->next = cur;",
        "            large = cur;",
        "        }",
        "        cur = cur->next;",
        "    }",
        "    large->next = nullptr;",
        "    small->next = dl->next;",
        "    return ds->next;",
        "}"
      ]
    }
  },
  {
    "id": "a5",
    "mod": "tree-backtrack",
    "idx": 4,
    "title": "删除排序链表中的重复元素 II",
    "lc": "LeetCode 82",
    "diff": 3,
    "tags": [
      "哑节点",
      "整段跳过"
    ],
    "by": "return",
    "brief": "删除所有重复出现的节点，只保留只出现一次的值。链表已升序。",
    "ioIn": "head：升序链表。",
    "ioOut": "返回删除后的头节点。",
    "ex": [
      {
        "i": "[1,2,3,3,4,4,5]",
        "o": "[1,2,5]"
      },
      {
        "i": "[1,1,1,2,3]",
        "o": "[2,3]"
      }
    ],
    "params": [
      "[1,2,3,3,4,4,5]",
      "[1,1,1,2,3]",
      "[]",
      "[1,1]",
      "[1,2,2]"
    ],
    "sig": "ListNode* deleteDuplicates(ListNode* head)",
    "template": "ListNode* deleteDuplicates(ListNode* head) {\n    // 你的代码\n    return head;\n}",
    "hints": [
      "和 83 题不同，这里重复的值一个都不留，所以需要一个\"确定保留\"的 prev。",
      "发现 cur 与 cur->next 值相同，就记住这个值，用内层 while 把整段相同值的节点全部跳过。",
      "prev 只在确定 cur 唯一时才前移；删头很常见，所以 prev 从哑节点出发。"
    ],
    "ref": [
      "ListNode* deleteDuplicates(ListNode* head) {",
      "    ListNode* dummy = new ListNode(0);",
      "    dummy->next = head;",
      "    ListNode* prev = dummy;",
      "    ListNode* cur = head;",
      "    while (cur != nullptr) {",
      "        if (cur->next != nullptr && cur->val == cur->next->val) {",
      "            int v = cur->val;",
      "            while (cur != nullptr && cur->val == v) {",
      "                cur = cur->next;",
      "            }",
      "            prev->next = cur;",
      "        } else {",
      "            prev = cur;",
      "            cur = cur->next;",
      "        }",
      "    }",
      "    return dummy->next;",
      "}"
    ],
    "note": "两个分支：遇到重复就把整段同值节点跳过，prev 不动；不重复才让 prev 前移。prev 始终指向\"最后一个确定保留的节点\"，所以删头也安全。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "只跳过一个节点，剩下那个仍留在链上。",
      "把 prev = cur 放进两个分支都执行，删完头后 prev 指向了已删除节点。",
      "忘记判 cur->next 是否为空就访问 cur->next->val。"
    ],
    "rating": 1520,
    "hot100": false,
    "slug": "remove-duplicates-from-sorted-list-ii",
    "lcNum": 82,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 删除排序链表中的重复元素 II",
      "desc": "【灵神心法点拨】：两个分支：遇到重复就把整段同值节点跳过，prev 不动；不重复才让 prev 前移。prev 始终指向\"最后一个确定保留的节点\"，所以删头也安全。",
      "code": [
        "ListNode* deleteDuplicates(ListNode* head) {",
        "    ListNode* dummy = new ListNode(0);",
        "    dummy->next = head;",
        "    ListNode* prev = dummy;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->next != nullptr && cur->val == cur->next->val) {",
        "            int v = cur->val;",
        "            while (cur != nullptr && cur->val == v) {",
        "                cur = cur->next;",
        "            }",
        "            prev->next = cur;",
        "        } else {",
        "            prev = cur;",
        "            cur = cur->next;",
        "        }",
        "    }",
        "    return dummy->next;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 82）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "ListNode* deleteDuplicates(ListNode* head) {",
        "    ListNode* dummy = new ListNode(0);",
        "    dummy->next = head;",
        "    ListNode* prev = dummy;",
        "    ListNode* cur = head;",
        "    while (cur != nullptr) {",
        "        if (cur->next != nullptr && cur->val == cur->next->val) {",
        "            int v = cur->val;",
        "            while (cur != nullptr && cur->val == v) {",
        "                cur = cur->next;",
        "            }",
        "            prev->next = cur;",
        "        } else {",
        "            prev = cur;",
        "            cur = cur->next;",
        "        }",
        "    }",
        "    return dummy->next;",
        "}"
      ]
    }
  },
  {
    "id": "a2",
    "mod": "tree-backtrack",
    "idx": 6,
    "title": "重排链表",
    "lc": "LeetCode 143",
    "diff": 3,
    "tags": [
      "找中点",
      "反转",
      "合并"
    ],
    "by": "head",
    "brief": "把 L0→L1→…→Ln 重排成 L0→Ln→L1→Ln-1→…。要求原地修改，不能只改值。函数返回 void。",
    "ioIn": "head：链表头节点。",
    "ioOut": "无返回值，直接改链表；判题看最终 head 指向的链。",
    "ex": [
      {
        "i": "[1,2,3,4]",
        "o": "[1,4,2,3]"
      },
      {
        "i": "[1,2,3,4,5]",
        "o": "[1,5,2,4,3]"
      }
    ],
    "params": [
      "[1,2,3,4]",
      "[1,2,3,4,5]",
      "[1]"
    ],
    "sig": "void reorderList(ListNode* head)",
    "template": "void reorderList(ListNode* head) {\n    // 你的代码\n}",
    "hints": [
      "这题是三道基本功的组合：找中点 → 反转后半段 → 两条链交替合并。",
      "中点用快慢指针，反转用三指针；第二步反转时记得把 slow->next 置空，把链切成两段。",
      "合并时保存 an = a->next、bn = b->next 再改指针，否则接上 b 之后 a 的后继就丢了。"
    ],
    "ref": [
      "void reorderList(ListNode* head) {",
      "    if (head == nullptr || head->next == nullptr) {",
      "        return;",
      "    }",
      "    ListNode* slow = head;",
      "    ListNode* fast = head;",
      "    while (fast->next != nullptr && fast->next->next != nullptr) {",
      "        slow = slow->next;",
      "        fast = fast->next->next;",
      "    }",
      "    ListNode* prev = nullptr;",
      "    ListNode* cur = slow->next;",
      "    slow->next = nullptr;",
      "    while (cur != nullptr) {",
      "        ListNode* nxt = cur->next;",
      "        cur->next = prev;",
      "        prev = cur;",
      "        cur = nxt;",
      "    }",
      "    ListNode* a = head;",
      "    ListNode* b = prev;",
      "    while (b != nullptr) {",
      "        ListNode* an = a->next;",
      "        ListNode* bn = b->next;",
      "        a->next = b;",
      "        b->next = an;",
      "        a = an;",
      "        b = bn;",
      "    }",
      "}"
    ],
    "note": "拆成三步各自都是你练过的：876 找中点、206 反转、21 合并。难点在\"接完之后 a 的后继被覆盖\"，所以要先存 an。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "切链时忘了 slow->next = nullptr，后半段还连着前半段，合并会成环。",
      "合并时没有先存 an/bn，指针被覆盖导致死循环。",
      "头部两个节点的情况要提前返回。"
    ],
    "rating": 1590,
    "hot100": false,
    "slug": "reorder-list",
    "lcNum": 143,
    "lingshen": {
      "name": "灵神递归三问 / 回溯选与不选视角 · 重排链表",
      "desc": "【灵神心法点拨】：拆成三步各自都是你练过的：876 找中点、206 反转、21 合并。难点在\"接完之后 a 的后继被覆盖\"，所以要先存 an。",
      "code": [
        "void reorderList(ListNode* head) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return;",
        "    }",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    while (fast->next != nullptr && fast->next->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "    }",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = slow->next;",
        "    slow->next = nullptr;",
        "    while (cur != nullptr) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    ListNode* a = head;",
        "    ListNode* b = prev;",
        "    while (b != nullptr) {",
        "        ListNode* an = a->next;",
        "        ListNode* bn = b->next;",
        "        a->next = b;",
        "        b->next = an;",
        "        a = an;",
        "        b = bn;",
        "    }",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 143）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "void reorderList(ListNode* head) {",
        "    if (head == nullptr || head->next == nullptr) {",
        "        return;",
        "    }",
        "    ListNode* slow = head;",
        "    ListNode* fast = head;",
        "    while (fast->next != nullptr && fast->next->next != nullptr) {",
        "        slow = slow->next;",
        "        fast = fast->next->next;",
        "    }",
        "    ListNode* prev = nullptr;",
        "    ListNode* cur = slow->next;",
        "    slow->next = nullptr;",
        "    while (cur != nullptr) {",
        "        ListNode* nxt = cur->next;",
        "        cur->next = prev;",
        "        prev = cur;",
        "        cur = nxt;",
        "    }",
        "    ListNode* a = head;",
        "    ListNode* b = prev;",
        "    while (b != nullptr) {",
        "        ListNode* an = a->next;",
        "        ListNode* bn = b->next;",
        "        a->next = b;",
        "        b->next = an;",
        "        a = an;",
        "        b = bn;",
        "    }",
        "}"
      ]
    }
  },
  {
    "id": "h1",
    "mod": "data-structures",
    "idx": 1,
    "title": "两数之和",
    "lc": "LeetCode 1",
    "diff": 1,
    "tags": [
      "哈希表",
      "一次遍历"
    ],
    "by": "return",
    "brief": "在数组里找出两个数，使它们的和等于 target，返回这两个数的下标。",
    "ioIn": "nums：整数数组；target：目标和。假设有且只有一组答案。",
    "ioOut": "返回两个下标组成的数组。",
    "ex": [
      {
        "i": "[2,7,11,15] | 9",
        "o": "[0,1]"
      },
      {
        "i": "[3,2,4] | 6",
        "o": "[1,2]"
      }
    ],
    "params": [
      "[2,7,11,15] | 9",
      "[3,2,4] | 6",
      "[3,3] | 6",
      "[-1,0,1,2] | 1"
    ],
    "sig": "vector<int> twoSum(vector<int>& nums, int target)",
    "template": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int,int> mp;\n    // 边走边查：需要的另一半出现过吗？\n    return {};\n}",
    "hints": [
      "把\"找两个数\"变成\"找一个数\"：遍历到 x 时，只问 target - x 之前有没有出现。",
      "哈希表存 值 → 下标，查询是 O(1)。",
      "先查再存，避免自己和自己配对（[3,3] 这种用例专门卡这个）。"
    ],
    "ref": [
      "vector<int> twoSum(vector<int>& nums, int target) {",
      "    unordered_map<int,int> mp;",
      "    for (int i = 0; i < nums.size(); i++) {",
      "        int need = target - nums[i];",
      "        if (mp.count(need)) {",
      "            return {mp[need], i};",
      "        }",
      "        mp[nums[i]] = i;",
      "    }",
      "    return {};",
      "}"
    ],
    "note": "哈希表把\"回头找\"变成\"随手查\"。先查后存的顺序保证两个下标一定不同。",
    "complexity": "时间 O(n)，空间 O(n)。",
    "pitfalls": [
      "先存后查，同一个元素被用了两次。",
      "返回的是值而不是下标。",
      "用两重循环也能过，但 O(n²) 不是这题想练的东西。"
    ],
    "rating": 1100,
    "hot100": true,
    "slug": "two-sum",
    "lcNum": 1,
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 两数之和",
      "desc": "【灵神心法点拨】：哈希表把\"回头找\"变成\"随手查\"。先查后存的顺序保证两个下标一定不同。",
      "code": [
        "vector<int> twoSum(vector<int>& nums, int target) {",
        "    unordered_map<int,int> mp;",
        "    for (int i = 0; i < nums.size(); i++) {",
        "        int need = target - nums[i];",
        "        if (mp.count(need)) {",
        "            return {mp[need], i};",
        "        }",
        "        mp[nums[i]] = i;",
        "    }",
        "    return {};",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 1）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> twoSum(vector<int>& nums, int target) {",
        "    unordered_map<int,int> mp;",
        "    for (int i = 0; i < nums.size(); i++) {",
        "        int need = target - nums[i];",
        "        if (mp.count(need)) {",
        "            return {mp[need], i};",
        "        }",
        "        mp[nums[i]] = i;",
        "    }",
        "    return {};",
        "}"
      ]
    }
  },
  {
    "id": "h2",
    "mod": "data-structures",
    "idx": 2,
    "title": "有效的字母异位词",
    "lc": "LeetCode 242",
    "diff": 1,
    "tags": [
      "计数",
      "字符串"
    ],
    "by": "return",
    "brief": "判断 t 是否是 s 的字母异位词：字母种类和每个字母出现次数都相同，只是顺序不同。",
    "ioIn": "s、t：只含小写字母的字符串。",
    "ioOut": "是返回 true，否则 false。",
    "ex": [
      {
        "i": "\"anagram\" | \"nagaram\"",
        "o": "true"
      },
      {
        "i": "\"rat\" | \"car\"",
        "o": "false"
      }
    ],
    "params": [
      "\"anagram\" | \"nagaram\"",
      "\"rat\" | \"car\"",
      "\"a\" | \"ab\"",
      "\"\" | \"\""
    ],
    "sig": "bool isAnagram(string s, string t)",
    "template": "bool isAnagram(string s, string t) {\n    // 长度不同直接 false；然后统计每个字母出现次数\n    return false;\n}",
    "hints": [
      "异位词的本质是\"每个字母的计数完全一致\"，和顺序无关。",
      "用 unordered_map<char,int> 计数：s 里 +1，t 里 -1，最后全为 0 就是异位词。",
      "先比长度能省掉一大堆无用统计。"
    ],
    "ref": [
      "bool isAnagram(string s, string t) {",
      "    if (s.size() != t.size()) { return false; }",
      "    unordered_map<char,int> cnt;",
      "    for (int i = 0; i < s.size(); i++) { cnt[s[i]] = cnt[s[i]] + 1; }",
      "    for (int i = 0; i < t.size(); i++) { cnt[t[i]] = cnt[t[i]] - 1; }",
      "    for (int i = 0; i < t.size(); i++) {",
      "        if (cnt[t[i]] != 0) { return false; }",
      "    }",
      "    return true;",
      "}"
    ],
    "note": "计数法比排序法更快：排序 O(n log n)，计数 O(n)。加减抵消是计数题的通用套路。",
    "complexity": "时间 O(n)，空间 O(字符种类)。",
    "pitfalls": [
      "只比较字母集合，不看次数（\"aab\" 和 \"abb\" 会误判）。",
      "忘了先比长度。",
      "统计完只检查 s 的字母，t 里多出来的字母漏检。"
    ],
    "rating": 1150,
    "hot100": false,
    "slug": "valid-anagram",
    "lcNum": 242,
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 有效的字母异位词",
      "desc": "【灵神心法点拨】：计数法比排序法更快：排序 O(n log n)，计数 O(n)。加减抵消是计数题的通用套路。",
      "code": [
        "bool isAnagram(string s, string t) {",
        "    if (s.size() != t.size()) { return false; }",
        "    unordered_map<char,int> cnt;",
        "    for (int i = 0; i < s.size(); i++) { cnt[s[i]] = cnt[s[i]] + 1; }",
        "    for (int i = 0; i < t.size(); i++) { cnt[t[i]] = cnt[t[i]] - 1; }",
        "    for (int i = 0; i < t.size(); i++) {",
        "        if (cnt[t[i]] != 0) { return false; }",
        "    }",
        "    return true;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 242）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool isAnagram(string s, string t) {",
        "    if (s.size() != t.size()) { return false; }",
        "    unordered_map<char,int> cnt;",
        "    for (int i = 0; i < s.size(); i++) { cnt[s[i]] = cnt[s[i]] + 1; }",
        "    for (int i = 0; i < t.size(); i++) { cnt[t[i]] = cnt[t[i]] - 1; }",
        "    for (int i = 0; i < t.size(); i++) {",
        "        if (cnt[t[i]] != 0) { return false; }",
        "    }",
        "    return true;",
        "}"
      ]
    }
  },
  {
    "id": "h3",
    "mod": "data-structures",
    "idx": 3,
    "title": "两个数组的交集",
    "lc": "LeetCode 349",
    "diff": 1,
    "tags": [
      "集合",
      "去重"
    ],
    "by": "return",
    "quiz": true,
    "brief": "返回两个数组的交集，结果里每个元素只出现一次，顺序不限（本题按升序比对）。",
    "ioIn": "nums1、nums2：整数数组。",
    "ioOut": "返回去重后的交集数组（升序）。",
    "ex": [
      {
        "i": "[1,2,2,1] | [2,2]",
        "o": "[2]"
      },
      {
        "i": "[4,9,5] | [9,4,9,8,4]",
        "o": "[4,9]"
      }
    ],
    "params": [
      "[1,2,2,1] | [2,2]",
      "[4,9,5] | [9,4,9,8,4]",
      "[1] | [2]",
      "[] | [1]"
    ],
    "sig": "vector<int> intersection(vector<int>& nums1, vector<int>& nums2)",
    "template": "vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\n    // 一个集合装 nums1，另一个集合收答案，天然去重\n    return {};\n}",
    "hints": [
      "集合（set）自带去重，正好对上\"结果每个元素只出现一次\"。",
      "先把 nums1 全塞进 set，再遍历 nums2，命中就放进答案 set。",
      "最后把答案 set 转成 vector 并排序，保证输出稳定。"
    ],
    "ref": [
      "vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {",
      "    unordered_set<int> a;",
      "    for (int i = 0; i < nums1.size(); i++) { a.insert(nums1[i]); }",
      "    set<int> both;",
      "    for (int i = 0; i < nums2.size(); i++) {",
      "        if (a.count(nums2[i])) { both.insert(nums2[i]); }",
      "    }",
      "    vector<int> res;",
      "    for (int v : both) { res.push_back(v); }",
      "    return res;",
      "}"
    ],
    "note": "\"去重 + 判存在\"是集合的两件本职工作。用有序 set 收答案还能顺手排好序。",
    "complexity": "时间 O(n+m)，空间 O(n)。",
    "pitfalls": [
      "答案里出现重复元素。",
      "只遍历 nums1 判 nums2，方向反了也一样，但别两边都塞进同一个集合。",
      "忘记排序导致和期望顺序不一致。"
    ],
    "rating": 1180,
    "hot100": false,
    "slug": "intersection-of-two-arrays",
    "lcNum": 349,
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 两个数组的交集",
      "desc": "【灵神心法点拨】：\"去重 + 判存在\"是集合的两件本职工作。用有序 set 收答案还能顺手排好序。",
      "code": [
        "vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {",
        "    unordered_set<int> a;",
        "    for (int i = 0; i < nums1.size(); i++) { a.insert(nums1[i]); }",
        "    set<int> both;",
        "    for (int i = 0; i < nums2.size(); i++) {",
        "        if (a.count(nums2[i])) { both.insert(nums2[i]); }",
        "    }",
        "    vector<int> res;",
        "    for (int v : both) { res.push_back(v); }",
        "    return res;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 349）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {",
        "    unordered_set<int> a;",
        "    for (int i = 0; i < nums1.size(); i++) { a.insert(nums1[i]); }",
        "    set<int> both;",
        "    for (int i = 0; i < nums2.size(); i++) {",
        "        if (a.count(nums2[i])) { both.insert(nums2[i]); }",
        "    }",
        "    vector<int> res;",
        "    for (int v : both) { res.push_back(v); }",
        "    return res;",
        "}"
      ]
    }
  },
  {
    "id": "g2",
    "mod": "greedy",
    "idx": 2,
    "title": "跳跃游戏",
    "lc": "LeetCode 55",
    "diff": 2,
    "tags": [
      "贪心",
      "可达边界"
    ],
    "by": "return",
    "quiz": true,
    "brief": "每个元素表示在该位置最多能跳几步，从下标 0 出发，判断能否到达最后一个下标。",
    "ioIn": "nums：非负整数数组。",
    "ioOut": "能到达返回 true，否则 false。",
    "ex": [
      {
        "i": "[2,3,1,1,4]",
        "o": "true"
      },
      {
        "i": "[3,2,1,0,4]",
        "o": "false"
      }
    ],
    "params": [
      "[2,3,1,1,4]",
      "[3,2,1,0,4]",
      "[0]",
      "[1,0,1]"
    ],
    "sig": "bool canJump(vector<int>& nums)",
    "template": "bool canJump(vector<int>& nums) {\n    // 维护\"目前能到达的最远下标\"\n    return false;\n}",
    "hints": [
      "维护 far 表示当前能摸到的最远下标，边走边扩张。",
      "如果某个 i 已经超过 far，说明它根本走不到，直接 false。",
      "far 一旦覆盖 n-1 就可以提前返回 true。"
    ],
    "ref": [
      "bool canJump(vector<int>& nums) {",
      "    int far = 0;",
      "    int n = nums.size();",
      "    for (int i = 0; i < n; i++) {",
      "        if (i > far) { return false; }",
      "        if (i + nums[i] > far) { far = i + nums[i]; }",
      "        if (far >= n - 1) { return true; }",
      "    }",
      "    return true;",
      "}"
    ],
    "note": "不需要知道具体怎么跳，只需要知道\"能覆盖到哪\"。可达区间是连续的，所以一个 far 就够。",
    "complexity": "时间 O(n)，空间 O(1)。",
    "pitfalls": [
      "用 DFS 枚举跳法，指数级超时。",
      "忘记判 i > far，隔着 0 也当成能跳过去。",
      "n = 1 时应直接 true。"
    ],
    "rating": 1550,
    "hot100": true,
    "slug": "jump-game",
    "lcNum": 55,
    "lingshen": {
      "name": "灵神区间调度右端点排序 / 反悔大顶堆 · 跳跃游戏",
      "desc": "【灵神心法点拨】：不需要知道具体怎么跳，只需要知道\"能覆盖到哪\"。可达区间是连续的，所以一个 far 就够。",
      "code": [
        "bool canJump(vector<int>& nums) {",
        "    int far = 0;",
        "    int n = nums.size();",
        "    for (int i = 0; i < n; i++) {",
        "        if (i > far) { return false; }",
        "        if (i + nums[i] > far) { far = i + nums[i]; }",
        "        if (far >= n - 1) { return true; }",
        "    }",
        "    return true;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 55）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "bool canJump(vector<int>& nums) {",
        "    int far = 0;",
        "    int n = nums.size();",
        "    for (int i = 0; i < n; i++) {",
        "        if (i > far) { return false; }",
        "        if (i + nums[i] > far) { far = i + nums[i]; }",
        "        if (far >= n - 1) { return true; }",
        "    }",
        "    return true;",
        "}"
      ]
    }
  },
  {
    "id": "dt1",
    "mod": "data-structures",
    "idx": 1,
    "title": "最长公共前缀",
    "lc": "LeetCode 14",
    "diff": 1,
    "tags": [
      "Trie 思想",
      "字符串前缀"
    ],
    "by": "return",
    "brief": "编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 \"\"。",
    "ioIn": "strs：字符串数组。",
    "ioOut": "返回公共前缀。",
    "ex": [
      {
        "i": "[\"flower\",\"flow\",\"flight\"]",
        "o": "\"fl\""
      },
      {
        "i": "[\"dog\",\"racecar\",\"car\"]",
        "o": "\"\""
      }
    ],
    "params": [
      "[\"flower\",\"flow\",\"flight\"]",
      "[\"dog\",\"racecar\",\"car\"]",
      "[\"a\"]",
      "[\"interstellar\",\"internet\",\"internal\"]"
    ],
    "sig": "string longestCommonPrefix(vector<string>& strs)",
    "template": "string longestCommonPrefix(vector<string>& strs) {\n    // 以第一个字符串为基准，纵向比较每个字符\n    return \"\";\n}",
    "hints": [
      "纵向扫描：以第一个字符串作为基准，逐个字符比对后续所有字符串。",
      "某一位上如果有字符串到达末尾或者字符不匹配，即可截断返回当前前缀。"
    ],
    "ref": [
      "string longestCommonPrefix(vector<string>& strs) {",
      "    if (strs.empty()) { return \"\"; }",
      "    string base = strs[0];",
      "    for (int i = 0; i < base.size(); i++) {",
      "        char c = base[i];",
      "        for (int j = 1; j < strs.size(); j++) {",
      "            if (i >= strs[j].size() || strs[j][i] != c) {",
      "                return base.substr(0, i);",
      "            }",
      "        }",
      "    }",
      "    return base;",
      "}"
    ],
    "note": "Trie 字典树最基础的前缀匹配形态：所有词在树的根路径上的重合分支即公共前缀。",
    "complexity": "时间 O(s)（s 为所有字符总数），空间 O(1)。",
    "pitfalls": [
      "数组为空或只有一个字符串的特判。",
      "下标越界：strs[j] 的长度可能比 base 短。"
    ],
    "rating": 1180,
    "hot100": false,
    "slug": "longest-common-prefix",
    "lcNum": 14,
    "lingshen": {
      "name": "灵神前缀差分互逆 / 并查集路径压缩 · 最长公共前缀",
      "desc": "【灵神心法点拨】：Trie 字典树最基础的前缀匹配形态：所有词在树的根路径上的重合分支即公共前缀。",
      "code": [
        "string longestCommonPrefix(vector<string>& strs) {",
        "    if (strs.empty()) { return \"\"; }",
        "    string base = strs[0];",
        "    for (int i = 0; i < base.size(); i++) {",
        "        char c = base[i];",
        "        for (int j = 1; j < strs.size(); j++) {",
        "            if (i >= strs[j].size() || strs[j][i] != c) {",
        "                return base.substr(0, i);",
        "            }",
        "        }",
        "    }",
        "    return base;",
        "}"
      ]
    },
    "official": {
      "name": "官方标准参考实现（C++ · LeetCode 14）",
      "desc": "LeetCode 官方标准教科书解法，采用传统面向对象或标准库经典实现，便于与灵神解法对照分析。",
      "code": [
        "string longestCommonPrefix(vector<string>& strs) {",
        "    if (strs.empty()) { return \"\"; }",
        "    string base = strs[0];",
        "    for (int i = 0; i < base.size(); i++) {",
        "        char c = base[i];",
        "        for (int j = 1; j < strs.size(); j++) {",
        "            if (i >= strs[j].size() || strs[j][i] != c) {",
        "                return base.substr(0, i);",
        "            }",
        "        }",
        "    }",
        "    return base;",
        "}"
      ]
    }
  }
];
