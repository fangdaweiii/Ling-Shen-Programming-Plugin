# -*- coding: utf-8 -*-
"""
算法训练台 - 一键打包构建工具 (Packager)
将拆分后的 css/、data/、js/ 与 index.html 重新打包为独立单文件，便于离线分发。
生成文件：dist/算法训练台.html
运行方法：python build.py
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(ROOT, "index.html")
DIST_DIR = os.path.join(ROOT, "dist")
OUTPUT_PATH = os.path.join(DIST_DIR, "算法训练台.html")

os.makedirs(DIST_DIR, exist_ok=True)

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# 1. 内联 CSS
css_files = ["theme.css", "layout.css", "editor.css", "demo.css", "modal.css", "ai.css"]
bundled_css = []
for name in css_files:
    path = os.path.join(ROOT, "css", name)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            bundled_css.append(f"/* ===== {name} ===== */\n" + f.read())

css_tag = "<style>\n" + "\n\n".join(bundled_css) + "\n</style>"
# 移除所有 <link rel="stylesheet"> 并在 </head> 前插入打包后的 <style>
html = re.sub(r'<link\s+rel="stylesheet"\s+href="css/[^"]+">', '', html)
html = html.replace('</head>', css_tag + '\n</head>')

# 2. 内联 JS
js_files = [
    "data/modules.js",
    "data/knowledge.js",
    "data/problems.js",
    "js/interpreter.js",
    "js/state.js",
    "js/editor.js",
    "js/judge.js",
    "js/demo.js",
    "js/practice.js",
    "js/achievements.js",
    "js/complexity.js",
    "js/share.js",
    "js/ai.js",
    "js/app.js"
]

bundled_js = []
for rel in js_files:
    path = os.path.join(ROOT, rel.replace('/', os.sep))
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            bundled_js.append(f"/* ===== {rel} ===== */\n" + f.read())

js_tag = "<script>\n" + "\n\n".join(bundled_js) + "\n</script>"
# 移除所有模块引用 <script src="...">
html = re.sub(r'<script\s+src="(?:data|js)/[^"]+"></script>', '', html)
html = html.replace('</body>', js_tag + '\n</body>')

# 清理空行
html = re.sub(r'\n\s*\n\s*\n', '\n\n', html)

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write(html)

# 同步覆盖根目录的 算法训练台.html，确保开箱即用
with open(os.path.join(ROOT, "算法训练台.html"), "w", encoding="utf-8") as f:
    f.write(html)

size_kb = round(len(html.encode('utf-8')) / 1024, 1)
print(f"✓ 打包构建成功！已生成单文件独立分发包：\n  -> {OUTPUT_PATH} ({size_kb} KB)\n  -> {os.path.join(ROOT, '算法训练台.html')} (已同步更新)")
