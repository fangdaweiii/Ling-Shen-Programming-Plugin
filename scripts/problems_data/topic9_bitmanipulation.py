# -*- coding: utf-8 -*-
"""
专题九：位运算题单
包含基础位运算与恒等式、拆位法、子集状压枚举
"""

TOPIC_BIT_MANIPULATION = [
    {
        "lcNum": 136,
        "title": "只出现一次的数字",
        "slug": "single-number",
        "rating": 1000,
        "hot100": True,
        "tags": ["位运算", "异或", "Hot100"],
        "brief": "给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。",
        "note": "异或运算三大性质：x ^ x = 0；x ^ 0 = x；满足交换律与结合律。将数组所有元素异或在一起，出现两次的数字两两抵消归零，最终剩下的就是唯一的单身数字。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["必须保证其余元素恰好出现两次。"],
        "ref": [
            "int singleNumber(vector<int>& nums) {",
            "    int ans = 0;",
            "    for (int x : nums) ans ^= x;",
            "    return ans;",
            "}"
        ]
    },
    {
        "lcNum": 137,
        "title": "只出现一次的数字 II",
        "slug": "single-number-ii",
        "rating": 1400,
        "hot100": False,
        "tags": ["位运算", "拆位法"],
        "brief": "给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。",
        "note": "【拆位法】：统计所有数字在二进制第 i 位（0..31）上 1 的个数之和 sum。若某个元素出现 3 次，它在第 i 位的 1 也会贡献 3 次；因此 sum % 3 的余数必然来自那个只出现一次的数字！将各位的余数重新拼装即得答案。",
        "complexity": "时间 O(32 * n)，空间 O(1)。",
        "pitfalls": ["注意符号位处理，C++ 中 1 << 31 需防止有符号溢出，转为 (1U << i)。"],
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
        ]
    },
    {
        "lcNum": 260,
        "title": "只出现一次的数字 III",
        "slug": "single-number-iii",
        "rating": 1500,
        "hot100": False,
        "tags": ["位运算", "分组异或"],
        "brief": "给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。",
        "note": "全部异或得到 xorSum = a ^ b（a != b 所以 xorSum != 0）。利用 lowbit(xorSum) = xorSum & (-xorSum) 提取最低位的 1，说明 a 和 b 在该二进制位上必然一个为 1 一个为 0。按该位是否为 1 将整个数组划分为两组异或，分别得到 a 和 b。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "pitfalls": ["当 xorSum 为 INT_MIN 时 -xorSum 会溢出，需转换为 unsigned int。"],
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
        ]
    },
    {
        "lcNum": 191,
        "title": "位 1 的个数",
        "slug": "number-of-1-bits",
        "rating": 1050,
        "hot100": False,
        "tags": ["位运算", "汉明重量"],
        "brief": "编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位为 '1' 的个数（也被称为汉明重量）。",
        "note": "经典位操作：n & (n - 1) 能够精准消除二进制中最低位的 1。通过不断执行 n &= (n - 1) 并累加计数，循环次数正好等于 1 的个数！",
        "complexity": "时间 O(k)（k 为 1 的个数），空间 O(1)。",
        "pitfalls": ["使用 n &= (n - 1) 比逐位移位 32 次更高效。"],
        "ref": [
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
    {
        "lcNum": 231,
        "title": "2 的幂",
        "slug": "power-of-two",
        "rating": 1050,
        "hot100": False,
        "tags": ["位运算", "性质"],
        "brief": "给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。",
        "note": "2 的幂在二进制下有且仅有一个 1。利用性质：若 n > 0 且 (n & (n - 1)) == 0，则必定是 2 的幂。",
        "complexity": "时间 O(1)，空间 O(1)。",
        "pitfalls": ["必须先判断 n > 0，因为 0 和负数不是 2 的幂。"],
        "ref": [
            "bool isPowerOfTwo(int n) {",
            "    return n > 0 && (n & (n - 1)) == 0;",
            "}"
        ]
    }
]
