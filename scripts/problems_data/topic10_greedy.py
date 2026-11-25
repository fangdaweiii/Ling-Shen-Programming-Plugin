# -*- coding: utf-8 -*-
"""
专题十：贪心与思维题单
包含区间调度贪心、中位数贪心、反悔贪心、排序不等式
"""

TOPIC_GREEDY = [
    # 1. 区间调度
    {
        "lcNum": 435,
        "title": "无重叠区间",
        "slug": "non-overlapping-intervals",
        "rating": 1500,
        "hot100": False,
        "tags": ["区间调度", "贪心"],
        "brief": "给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回需要移除区间的最小数量，使剩余区间互不重叠。",
        "note": "区间调度母题：移除最少区间等价于保留最多互不重叠的区间！将所有区间按【右端点 end】升序排序。遍历区间，若当前区间的 start >= 上一个保留区间的 end，则保留该区间并更新 end；最终移除数 = n - 保留数。",
        "complexity": "时间 O(n log n)，空间 O(1)。",
        "pitfalls": ["必须按右端点排序，右端点越小留给后面的空间越大。"],
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
        ]
    },
    {
        "lcNum": 452,
        "title": "用最少数量的箭引爆气球",
        "slug": "minimum-number-of-arrows-to-burst-balloons",
        "rating": 1550,
        "hot100": False,
        "tags": ["区间调度", "贪心"],
        "brief": "有一些球形气球贴在一堵墙上。弓箭可以垂直向上发射。一支箭射穿在 x 处的气球需要其 xstart <= x <= xend。返回引爆所有气球所必须射出的 最小 弓箭数。",
        "note": "按右端点升序排序。第一支箭射在第一个气球的右端点。遍历后续气球，若其左端点大于当前箭的位置，则这支箭无法引爆它，必须新加一支箭射在该气球的右端点。",
        "complexity": "时间 O(n log n)，空间 O(1)。",
        "pitfalls": ["按 points[i][1] 升序排序；注意区间端点是闭区间，等于也可以引爆。"],
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
        ]
    },
    {
        "lcNum": 56,
        "title": "合并区间",
        "slug": "merge-intervals",
        "rating": 1400,
        "hot100": True,
        "tags": ["区间合并", "Hot100"],
        "brief": "以数组 intervals 表示若干个区间的集合。请你合并所有重叠的区间，并返回 一个不重叠的区间数组 ，该数组需恰好覆盖输入中的所有区间 。",
        "note": "先按区间的【左端点 start】升序排序。维护当前合并区间 [l, r]。遍历下一个区间 [curL, curR]，若 curL <= r 说明重叠，扩展右界 r = max(r, curR)；若 curL > r 说明不重叠，将 [l, r] 存入答案并开启新区间。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "pitfalls": ["合并重叠区间必须按左端点升序排序。"],
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
        ]
    },

    # 2. 中位数贪心
    {
        "lcNum": 462,
        "title": "最少移动次数使数组元素相等 II",
        "slug": "minimum-moves-to-equal-array-elements-ii",
        "rating": 1400,
        "hot100": False,
        "tags": ["中位数贪心", "数学"],
        "brief": "给你一个大小为 n 的整数数组 nums ，在每次操作中，你可以使数组中的一个元素加 1 或减 1。求使所有元素相等的最小操作次数。",
        "note": "【货仓选址 / 绝对值不等式】：点 x 到数组所有点的距离之和 ∑|nums[i] - x| 在 x 为数组【中位数】时取得最小值！对数组排序取中位数 mid = nums[n / 2]，累加 abs(nums[i] - mid)。",
        "complexity": "时间 O(n log n)，空间 O(1)。",
        "pitfalls": ["目标值必然是中位数，无需枚举平均值或其它点。"],
        "ref": [
            "int minMoves2(vector<int>& nums) {",
            "    sort(nums.begin(), nums.end());",
            "    int mid = nums[nums.size() / 2], ans = 0;",
            "    for (int x : nums) ans += abs(x - mid);",
            "    return ans;",
            "}"
        ]
    },

    # 3. 反悔贪心
    {
        "lcNum": 871,
        "title": "最低加油次数",
        "slug": "minimum-number-of-refueling-stops",
        "rating": 2074,
        "hot100": False,
        "tags": ["反悔贪心", "大顶堆", "Hard"],
        "brief": "汽车从 startFuel 升汽油出发前往 target。沿途有若干加油站 stations。求到达目的地所需的最少加油次数。如果无法到达则返回 -1。",
        "note": "【反悔贪心】：汽车尽可能一直往前开。每路过一个加油站，先把它的油量存入大顶堆 pq 中（暂时不加）。当当前剩余油量不足以到达下一个加油站时，从大顶堆中取出之前路过油量最大的加油站“反悔补加”，直到能到达或堆空返回 -1。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "pitfalls": ["将 target 看作油量为 0 的最后一个加油站加入 stations 末尾统一处理。"],
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
        ]
    }
]
