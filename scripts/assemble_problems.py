# -*- coding: utf-8 -*-
"""
assemble_problems.py
聚合 12 大专题所有题目，并与现有 54 题数据无缝融合，输出全新的 data/problems.js
"""
import os
import sys
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

from problems_data.topic1_twopointers import TOPIC_TWO_POINTERS
from problems_data.topic2_binarysearch import TOPIC_BINARY_SEARCH
from problems_data.topic3_monotonicstack import TOPIC_MONOTONIC_STACK
from problems_data.topic4_gridsearch import TOPIC_GRID_SEARCH
from problems_data.topic5_treebacktrack import TOPIC_TREE_BACKTRACK
from problems_data.topic6_dp import TOPIC_DP
from problems_data.topic7_datastructures import TOPIC_DATA_STRUCTURES
from problems_data.topic8_graph import TOPIC_GRAPH
from problems_data.topic9_bitmanipulation import TOPIC_BIT_MANIPULATION
from problems_data.topic10_greedy import TOPIC_GREEDY
from problems_data.topic11_string import TOPIC_STRING
from problems_data.topic12_math import TOPIC_MATH

MODULE_TOPIC_MAP = [
    ("two-pointers", TOPIC_TWO_POINTERS),
    ("binary-search", TOPIC_BINARY_SEARCH),
    ("monotonic-stack", TOPIC_MONOTONIC_STACK),
    ("grid-search", TOPIC_GRID_SEARCH),
    ("tree-backtrack", TOPIC_TREE_BACKTRACK),
    ("dp", TOPIC_DP),
    ("data-structures", TOPIC_DATA_STRUCTURES),
    ("graph", TOPIC_GRAPH),
    ("bit-manipulation", TOPIC_BIT_MANIPULATION),
    ("greedy", TOPIC_GREEDY),
    ("string", TOPIC_STRING),
    ("math", TOPIC_MATH),
]

# 读取已有 data/problems.js
problems_js_path = os.path.join(ROOT, "data", "problems.js")
with open(problems_js_path, "r", encoding="utf-8") as f:
    content = f.read()

# 提取现有 JSON
m = re.search(r'var\s+PROBLEMS\s*=\s*(\[[\s\S]*\])\s*;?', content)
existing_probs = json.loads(m.group(1)) if m else []
existing_map = {p.get("lcNum"): p for p in existing_probs if "lcNum" in p}
print(f"Loaded {len(existing_probs)} existing problems from data/problems.js")

final_problems = []
seen_lc_nums = set()

# 映射旧模块到新模块
def map_old_mod(old_mod, lc_num):
    if old_mod in ["list-basic", "list-adv", "tree-basic", "tree-adv", "backtrack"]:
        return "tree-backtrack"
    if old_mod == "two-pointers":
        return "two-pointers"
    if old_mod == "binary-search":
        return "binary-search"
    if old_mod == "stack-queue":
        return "monotonic-stack"
    if old_mod in ["heap", "hash", "dsu-trie"]:
        return "data-structures"
    if old_mod == "graph":
        if lc_num in [200, 695, 994, 463, 130, 542, 1091]:
            return "grid-search"
        return "graph"
    if old_mod == "dp":
        return "dp"
    if old_mod == "greedy":
        return "greedy"
    return "two-pointers"

# 遍历 12 大专题加入
for mod_id, prob_list in MODULE_TOPIC_MAP:
    for idx, item in enumerate(prob_list, 1):
        lc_num = item["lcNum"]
        seen_lc_nums.add(lc_num)
        
        # 融合已有题目的测试用例
        old_data = existing_map.get(lc_num, {})
        
        rating = item.get("rating", old_data.get("rating", 1400))
        diff = 1 if rating < 1500 else (2 if rating <= 1900 else 3)
        
        prob = {
            "id": old_data.get("id", f"p_{lc_num}"),
            "mod": mod_id,
            "idx": idx,
            "title": item["title"],
            "lc": f"LeetCode {lc_num}",
            "lcNum": lc_num,
            "diff": diff,
            "tags": item.get("tags", old_data.get("tags", [])),
            "by": old_data.get("by", "return"),
            "brief": item.get("brief", old_data.get("brief", "")),
            "ioIn": old_data.get("ioIn", f"输入参见题目描述与示例。"),
            "ioOut": old_data.get("ioOut", f"返回符合题目要求的输出。"),
            "ex": old_data.get("ex", [{"i": "示例输入", "o": "示例输出"}]),
            "params": old_data.get("params", ["[]"]),
            "sig": old_data.get("sig", f"// LeetCode {lc_num} 函数签名"),
            "template": old_data.get("template", f"// LeetCode {lc_num} {item['title']}\n"),
            "hints": old_data.get("hints", [item.get("note", "")]),
            "ref": item.get("ref", old_data.get("ref", [])),
            "note": item.get("note", old_data.get("note", "")),
            "complexity": item.get("complexity", old_data.get("complexity", "时间 O(n)，空间 O(1)。")),
            "pitfalls": item.get("pitfalls", old_data.get("pitfalls", ["注意边界情况处理。"])),
            "rating": rating,
            "hot100": item.get("hot100", old_data.get("hot100", False)),
            "slug": item.get("slug", old_data.get("slug", ""))
        }
        final_problems.append(prob)

# 将现有 54 题中未在 12 大专题主列表的遗漏题目也归类并入
extra_count = 0
for old_p in existing_probs:
    lc_num = old_p.get("lcNum")
    if lc_num and lc_num not in seen_lc_nums:
        seen_lc_nums.add(lc_num)
        new_mod = map_old_mod(old_p.get("mod"), lc_num)
        old_p["mod"] = new_mod
        final_problems.append(old_p)
        extra_count += 1

print(f"Assembled {len(final_problems)} problems in total (included {extra_count} extra existing problems).")

# 格式化输出到 data/problems.js
js_content = "/* problems.js - 算法题库（完整对齐灵神《如何科学刷题？》12 大专题全景题库） */\n"
js_content += "var PROBLEMS = " + json.dumps(final_problems, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
js_content += "  module.exports = { PROBLEMS };\n"
js_content += "}\n"

with open(problems_js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully wrote {len(final_problems)} problems to {problems_js_path}!")
