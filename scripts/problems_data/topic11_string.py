# -*- coding: utf-8 -*-
"""
专题十一：字符串算法题单
包含 KMP 算法前缀函数、Z 函数 (扩展 KMP)、Manacher 马拉车回文、字符串哈希
"""

TOPIC_STRING = [
    # 1. KMP 算法
    {
        "lcNum": 28,
        "title": "找出字符串中第一个匹配项的下标",
        "slug": "find-the-index-of-the-first-occurrence-in-a-string",
        "rating": 1200,
        "hot100": False,
        "tags": ["KMP", "字符串匹配"],
        "brief": "给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回 -1 。",
        "note": "KMP 经典母题：预处理模式串 needle 的最长公共真前后缀数组 pi (前缀函数)。在匹配过程中，当发生失配时，通过 pi 数组将模式串指针回跳，主串指针不回退，实现线性时间匹配。",
        "complexity": "时间 O(n + m)，空间 O(m)。",
        "pitfalls": ["pi 数组计算时，当字符不匹配时通过 j = pi[j - 1] 迭代回跳。"],
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
        ]
    },
    {
        "lcNum": 459,
        "title": "重复的子字符串",
        "slug": "repeated-substring-pattern",
        "rating": 1300,
        "hot100": False,
        "tags": ["KMP", "周期性"],
        "brief": "给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。",
        "note": "KMP 周期定理：计算 s 的前缀函数最后一个值 len = pi[n - 1]。若 len > 0 且 n % (n - len) == 0，则 s 具有长度为 n - len 的循环节，可由该子串重复构成！或一行巧解：(s + s).find(s, 1) < s.size()。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "pitfalls": ["如果 len == 0 则不能由子串重复构成。"],
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
        ]
    },

    # 2. Manacher 马拉车算法
    {
        "lcNum": 5,
        "title": "最长回文子串",
        "slug": "longest-palindromic-substring",
        "rating": 1400,
        "hot100": True,
        "tags": ["Manacher", "中心扩展", "Hot100"],
        "brief": "给你一个字符串 s，找到 s 中最长的 回文 子串。",
        "note": "方法一：中心扩展法 O(n^2)，枚举每个字符及字符间隙作为回文中心向外扩展；方法二：Manacher 马拉车算法 O(n)，在字符间插入 '#' 统一奇偶长度，维护当前最右回文右边界 r 和对应中心 c，利用对称点半径加速扩展。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "pitfalls": ["插字符构造形如 \"^#a#b#a#$\" 防止越界；原串起始位置由 (center - maxLen) / 2 计算。"],
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
        ]
    },
    {
        "lcNum": 647,
        "title": "回文子串",
        "slug": "palindromic-substrings",
        "rating": 1300,
        "hot100": True,
        "tags": ["中心扩展", "动态规划", "Hot100"],
        "brief": "给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。",
        "note": "中心扩展法：字符串长度为 n，共有 2n - 1 个回文中心（n 个单字符中心和 n - 1 个双字符中心）。从每个中心同时向左右扩展，只要左右字符相等答案就加一，不等则停止扩展。",
        "complexity": "时间 O(n^2)，空间 O(1)。",
        "pitfalls": ["枚举中心 i 从 0 到 2n-2，左右指针分别初始化为 i / 2 和 (i + 1) / 2。"],
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
        ]
    }
]
