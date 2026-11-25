/* extension/content.js - 灵神力扣原生学习计划系统核心控制器 */

(function () {
  'use strict';

  // 1. 本地进度缓存与计划模式
  const STORAGE_KEY = 'ling_study_plan_ac_v1';
  const FILTER_KEY = 'ling_study_plan_filter_v1';

  let acMap = {};
  let currentFilter = 'newbie'; // 默认：'newbie' (新手村 <=1700), 'all' (全部), 'hot100' (Hot 100)
  let currentSlug = '';
  let curProblem = null;
  let isDrawerOpen = false;

  // DOM 容器
  let barEl = null;
  let drawerEl = null;
  let backdropEl = null;
  let toastEl = null;
  let modalEl = null;

  // ------------------------------------------------------------------
  // 数据与状态读取
  // ------------------------------------------------------------------
  function loadState() {
    try {
      const savedAc = localStorage.getItem(STORAGE_KEY);
      if (savedAc) acMap = JSON.parse(savedAc);
      
      // 也同步读一份训练台原版的进度 (algo.state.v1)
      const algoState = localStorage.getItem('algo.state.v1');
      if (algoState) {
        const parsed = JSON.parse(algoState);
        if (parsed.ac) {
          Object.keys(parsed.ac).forEach(id => { acMap[id] = true; });
        }
      }

      const savedFilter = localStorage.getItem(FILTER_KEY);
      if (savedFilter) currentFilter = savedFilter;
    } catch (e) {
      console.warn('[灵神助教] 读取缓存失败:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acMap));
      localStorage.setItem(FILTER_KEY, currentFilter);
      if (chrome && chrome.storage && chrome.storage.local) {
        const todayStr = new Date().toISOString().slice(0, 10);
        chrome.storage.local.set({
          [STORAGE_KEY]: acMap,
          [FILTER_KEY]: currentFilter,
          last_ac_date: todayStr
        });
      }
      try {
        chrome.runtime?.sendMessage?.({ action: 'UPDATE_BADGE' });
      } catch (e) {}
    } catch (e) {}
  }

  function getProblemSlug() {
    const match = window.location.pathname.match(/\/problems\/([^\/]+)/);
    return match ? match[1] : '';
  }

  function findProblemBySlug(slug) {
    if (!slug || typeof PROBLEMS === 'undefined') return null;
    return PROBLEMS.find(p => p.slug === slug || (p.lcNum && ('lc' + p.lcNum) === slug));
  }

  function getFilteredProblems() {
    if (typeof PROBLEMS === 'undefined') return [];
    return PROBLEMS.filter(p => {
      if (currentFilter === 'newbie') return p.rating <= 1700;
      if (currentFilter === 'hot100') return !!p.hot100;
      return true;
    });
  }

  function getNeighborProblem(dir) {
    const list = getFilteredProblems();
    if (!list.length) return null;
    let idx = -1;
    if (curProblem) {
      idx = list.findIndex(p => p.id === curProblem.id);
    }
    if (idx < 0) {
      // 当前题目不在当前计划中，返回第一题
      return list[0];
    }
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= list.length) return null;
    return list[targetIdx];
  }

  function jumpToProblem(prob) {
    if (!prob || !prob.slug) return;
    const isCn = window.location.host.includes('.cn');
    const domain = isCn ? 'leetcode.cn' : 'leetcode.com';
    window.location.href = `https://${domain}/problems/${prob.slug}/`;
  }

  // ------------------------------------------------------------------
  // UI 渲染：左下角原生学习计划浮动栏
  // ------------------------------------------------------------------
  function renderPlanBar() {
    if (!barEl) {
      barEl = document.createElement('div');
      barEl.id = 'lh-plan-bar';
      document.body.appendChild(barEl);
    }

    const list = getFilteredProblems();
    let solvedCount = 0;
    list.forEach(p => { if (acMap[p.id]) solvedCount++; });
    const percent = list.length ? Math.round((solvedCount / list.length) * 100) : 0;

    const prevProb = getNeighborProblem(-1);
    const nextProb = getNeighborProblem(1);

    // 模式标签与阶段文本
    let planTag = '🌱 灵神新手村';
    if (currentFilter === 'hot100') planTag = '🔥 Hot 100 必刷';
    else if (currentFilter === 'all') planTag = '📚 灵神全景路线';

    let currentStageText = '自由探索';
    let currentInStageText = '';
    if (curProblem) {
      const curMod = (typeof MODULES !== 'undefined') ? MODULES.find(m => m.id === curProblem.mod) : null;
      if (curMod) {
        const modProbs = list.filter(p => p.mod === curMod.id);
        const myIndexInMod = modProbs.findIndex(p => p.id === curProblem.id) + 1;
        currentStageText = curMod.name;
        currentInStageText = `(${myIndexInMod || 1}/${modProbs.length})`;
      }
    }

    barEl.innerHTML = `
      <div class="lh-plan-brand" id="lh-brand-click" title="点击展开学习计划大纲 (Alt+S)">
        <span>${planTag}</span>
      </div>
      <div class="lh-plan-divider"></div>
      <div class="lh-plan-info" id="lh-info-click" title="点击查看学习大纲与进度">
        <div class="lh-plan-title-row">
          <span class="lh-plan-title">${currentStageText} ${currentInStageText}</span>
          ${curProblem ? `<span class="lh-plan-badge" title="本题难度分">Rating ${curProblem.rating}</span>` : ''}
          ${curProblem && curProblem.hot100 ? `<span class="lh-plan-badge amber">Hot100</span>` : ''}
        </div>
        <div class="lh-plan-progress-row">
          <div class="lh-plan-progress-bar">
            <div class="lh-plan-progress-fill" style="width: ${percent}%;"></div>
          </div>
          <span>进度 ${solvedCount}/${list.length} (${percent}%)</span>
        </div>
      </div>
      <div class="lh-nav-btns">
        <button type="button" class="lh-nav-btn" id="lh-prev-btn" ${prevProb ? '' : 'disabled'} title="${prevProb ? '上一题：' + prevProb.title + ' (Alt+←)' : '已经是第一题'}">
          ◀ 上一题
        </button>
        <button type="button" class="lh-nav-btn primary" id="lh-next-btn" ${nextProb ? '' : 'disabled'} title="${nextProb ? '下一题：' + nextProb.title + ' (Alt+→)' : '已完成本计划全部题目'}">
          下一题 ▶
        </button>
        <button type="button" class="lh-nav-btn" id="lh-syllabus-btn" title="查看题单完整大纲 (Alt+S)">📑 大纲</button>
        <button type="button" class="lh-nav-btn" id="lh-mindset-btn" title="速查本题所属模块的灵神心法模板 (Alt+M)">💡 心法</button>
        <button type="button" class="lh-nav-btn" id="lh-workbench-btn" title="打开独立算法逐行演示台 (Alt+D)">▶️ 演示台</button>
        <button type="button" class="lh-nav-btn" id="lh-ai-btn" title="唤起 AI 算法助教 (Alt+A)">🤖 AI助教</button>
        <button type="button" class="lh-nav-btn" id="lh-bar-collapse-btn" title="折叠/展开底部助教条" style="padding:4px 7px;">➖</button>
      </div>
    `;

    // 绑定事件
    document.getElementById('lh-brand-click')?.addEventListener('click', () => {
      if (barEl.classList.contains('collapsed')) {
        barEl.classList.remove('collapsed');
      } else {
        toggleDrawer();
      }
    });
    document.getElementById('lh-info-click')?.addEventListener('click', toggleDrawer);
    document.getElementById('lh-syllabus-btn')?.addEventListener('click', toggleDrawer);
    document.getElementById('lh-prev-btn')?.addEventListener('click', () => jumpToProblem(prevProb));
    document.getElementById('lh-next-btn')?.addEventListener('click', () => jumpToProblem(nextProb));
    document.getElementById('lh-mindset-btn')?.addEventListener('click', openCurrentMindset);
    document.getElementById('lh-workbench-btn')?.addEventListener('click', () => openWorkbench(curProblem, 'lingshen', false));
    document.getElementById('lh-ai-btn')?.addEventListener('click', toggleAiPanel);
    document.getElementById('lh-bar-collapse-btn')?.addEventListener('click', () => {
      barEl.classList.toggle('collapsed');
    });
  }

  // ------------------------------------------------------------------
  // UI 渲染：左侧可折叠原生大纲抽屉 (Syllabus Drawer)
  // ------------------------------------------------------------------
  function renderDrawer() {
    if (!drawerEl) {
      backdropEl = document.createElement('div');
      backdropEl.id = 'lh-drawer-backdrop';
      document.body.appendChild(backdropEl);

      drawerEl = document.createElement('div');
      drawerEl.id = 'lh-drawer';
      document.body.appendChild(drawerEl);

      backdropEl.addEventListener('click', closeDrawer);
    }

    const list = getFilteredProblems();
    let solvedCount = 0;
    list.forEach(p => { if (acMap[p.id]) solvedCount++; });
    const percent = list.length ? Math.round((solvedCount / list.length) * 100) : 0;

    // 阶段分组生成
    const stageGroups = {};
    if (typeof MODULES !== 'undefined') {
      MODULES.forEach(m => {
        const mProbs = list.filter(p => p.mod === m.id);
        if (mProbs.length > 0) {
          const sName = m.stageName || m.name;
          if (!stageGroups[sName]) stageGroups[sName] = { name: sName, stage: m.stage, modules: [] };
          stageGroups[sName].modules.push({ mod: m, probs: mProbs });
        }
      });
    }

    let stagesHtml = '';
    Object.keys(stageGroups).forEach(sKey => {
      const group = stageGroups[sKey];
      let groupTotal = 0, groupAc = 0;
      let probsListHtml = '';

      group.modules.forEach(sub => {
        sub.probs.forEach(p => {
          groupTotal++;
          const isAc = !!acMap[p.id];
          if (isAc) groupAc++;
          const isCur = curProblem && curProblem.id === p.id;

          probsListHtml += `
            <div class="lh-prob-item ${isCur ? 'current' : ''}" data-slug="${p.slug}">
              <div class="lh-prob-left">
                <span class="lh-prob-status ${isAc ? 'ac' : 'unac'}">${isAc ? '✓' : '○'}</span>
                <span class="lh-prob-name" title="${escapeHtml(p.title)}">${p.lcNum || ''}. ${escapeHtml(p.title)}</span>
              </div>
              <div class="lh-prob-right">
                ${isCur ? '<span class="lh-plan-badge" style="background:#0E8F6F;color:#FFF;border:none">正在攻坚</span>' : ''}
                <span class="lh-plan-badge ${p.rating > 1700 ? 'coral' : ''}">R ${p.rating}</span>
                ${p.hot100 ? '<span class="lh-plan-badge amber">Hot</span>' : ''}
                <button type="button" class="lh-prob-sol-btn" data-sol-id="${p.id}" title="查看本题解法与心法">💡 解法</button>
              </div>
            </div>
          `;
        });
      });

      const isAdv = group.stage && group.stage.includes('8');
      stagesHtml += `
        <div class="lh-stage-sec">
          <div class="lh-stage-head ${isAdv ? 'adv' : ''}">
            <span>${escapeHtml(group.name)}</span>
            <span class="lh-stage-count">${groupAc}/${groupTotal} 通过</span>
          </div>
          <div class="lh-stage-body">
            ${probsListHtml}
          </div>
        </div>
      `;
    });

    drawerEl.innerHTML = `
      <div class="lh-drawer-head">
        <div class="lh-drawer-head-top">
          <span class="lh-drawer-title">🌱 灵神《如何科学刷题》学习计划</span>
          <button type="button" class="lh-drawer-close" id="lh-drawer-close-btn">✕</button>
        </div>
        <div class="lh-drawer-tabs">
          <button type="button" class="lh-drawer-tab ${currentFilter === 'newbie' ? 'on' : ''}" data-filter="newbie">🌱 新手村 (≤1700)</button>
          <button type="button" class="lh-drawer-tab ${currentFilter === 'hot100' ? 'on' : ''}" data-filter="hot100">🔥 Hot 100 必刷</button>
          <button type="button" class="lh-drawer-tab ${currentFilter === 'all' ? 'on' : ''}" data-filter="all">📚 12 专题全景题单</button>
        </div>
        <div class="lh-drawer-stats">
          <span>当前计划达成：${solvedCount} / ${list.length} 题 (${percent}%)</span>
          <span>按 Alt+← / Alt+→ 快速切题</span>
        </div>
      </div>
      <div class="lh-drawer-body">
        ${stagesHtml}
      </div>
    `;

    // 绑定抽屉事件
    document.getElementById('lh-drawer-close-btn')?.addEventListener('click', closeDrawer);
    
    // 切换模式 tab
    drawerEl.querySelectorAll('.lh-drawer-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        if (filter) {
          currentFilter = filter;
          saveState();
          renderPlanBar();
          renderDrawer();
        }
      });
    });

    // 点击题解按钮直接查看心法与完整解法
    drawerEl.querySelectorAll('.lh-prob-sol-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-sol-id');
        const targetProb = (typeof PROBLEMS !== 'undefined') ? PROBLEMS.find(p => p.id === pid) : null;
        if (targetProb) {
          showMindsetModal(targetProb);
        }
      });
    });

    // 点击题目直接在力扣跳转
    drawerEl.querySelectorAll('.lh-prob-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.lh-prob-sol-btn')) return;
        const slug = item.getAttribute('data-slug');
        if (slug) {
          closeDrawer();
          const targetProb = findProblemBySlug(slug);
          jumpToProblem(targetProb);
        }
      });
    });
  }

  function toggleDrawer() {
    if (isDrawerOpen) closeDrawer();
    else openDrawer();
  }

  function openDrawer() {
    isDrawerOpen = true;
    renderDrawer();
    drawerEl?.classList.add('on');
    backdropEl?.classList.add('on');
  }

  function closeDrawer() {
    isDrawerOpen = false;
    drawerEl?.classList.remove('on');
    backdropEl?.classList.remove('on');
  }

  // ------------------------------------------------------------------
  // 灵神解题心法与题解弹窗（支持全景 54 题所有题目的思路、避坑、复杂度与 C++ 参考实现）
  // ------------------------------------------------------------------
  function showMindsetModal(prob) {
    if (!prob) return;
    const summary = (typeof MODULE_SUMMARIES !== 'undefined') ? MODULE_SUMMARIES[prob.mod] : null;
    const modTitle = summary ? summary.title : prob.mod;
    const concepts = summary && summary.concepts ? summary.concepts : [];
    const templates = summary && summary.templates ? summary.templates : [];

    // 1. 题意解析与思路点拨 (prob.brief, prob.note)
    const briefHtml = prob.brief ? `<div class="lh-sol-note" style="margin-bottom:6px;"><strong>📖 题意速览：</strong>${escapeHtml(prob.brief)}</div>` : '';
    const noteHtml = prob.note ? `<div class="lh-sol-note"><strong>💡 思路点拨：</strong>${escapeHtml(prob.note)}</div>` : '';

    // 2. 复杂度与避坑点 (prob.complexity, prob.pitfalls)
    const complexityHtml = prob.complexity ? `<div class="lh-sol-meta"><span>⏱️ <strong>复杂度分析：</strong>${escapeHtml(prob.complexity)}</span></div>` : '';
    let pitfallsHtml = '';
    if (prob.pitfalls && prob.pitfalls.length > 0) {
      pitfallsHtml = `
        <div style="margin-top:6px; font-size:12.5px; color:#E6F1ED;">
          <strong style="color:#FFA116;">⚠️ 避坑与易错点：</strong>
          <ul style="margin:4px 0 0 18px; padding:0; color:#C9DCD6; line-height:1.6;">
            ${prob.pitfalls.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // 3. 双解法体系：🧠 灵神精选解法 vs 🎯 官方标准参考
    const lingshenData = prob.lingshen || {
      name: `灵神精选解法 · ${prob.title}`,
      desc: `【灵神心法点拨】：${prob.note || ''}`,
      code: prob.ref || []
    };
    const officialData = prob.official || {
      name: `官方标准参考解法（C++ · ${prob.lc || ''}）`,
      desc: `LeetCode 官方标准教科书解法。`,
      code: prob.ref || []
    };

    const lingshenCodeStr = (lingshenData.code || []).join('\n');
    const officialCodeStr = (officialData.code || []).join('\n');

    const solutionsCardHtml = `
      <div class="lh-sol-card">
        <div class="lh-sol-subhead">
          <span>🎯 本题算法解法（双解法对照）</span>
        </div>
        <div class="lh-sol-tabs">
          <button type="button" class="lh-sol-tab-btn active" data-sol-tab="lingshen">🧠 灵神精选解法（极简优雅）</button>
          <button type="button" class="lh-sol-tab-btn" data-sol-tab="official">🎯 官方标准参考解法</button>
        </div>

        <!-- 灵神解法区 -->
        <div class="lh-sol-pane active" id="lh-pane-lingshen">
          <div style="margin-bottom:6px;font-size:13px;color:#6ED4B7;font-weight:600;">
            ${escapeHtml(lingshenData.name)}
          </div>
          <div style="margin-bottom:8px;font-size:12.5px;color:#C9DCD6;line-height:1.6;">
            ${escapeHtml(lingshenData.desc)}
          </div>
          <div class="lh-code-wrap">
            <div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:6px;">
              <button type="button" class="lh-demo-btn" data-sol-target="lingshen">▶️ 侧边并排演示台</button>
              <button type="button" class="lh-copy-btn" data-code="${encodeURIComponent(lingshenCodeStr)}">📋 复制灵神代码</button>
            </div>
            <pre class="lh-code-block"><code>${escapeHtml(lingshenCodeStr)}</code></pre>
          </div>
        </div>

        <!-- 官方解法区 -->
        <div class="lh-sol-pane" id="lh-pane-official">
          <div style="margin-bottom:6px;font-size:13px;color:#8FA9A2;font-weight:600;">
            ${escapeHtml(officialData.name)}
          </div>
          <div style="margin-bottom:8px;font-size:12.5px;color:#8FA9A2;line-height:1.6;">
            ${escapeHtml(officialData.desc)}
          </div>
          <div class="lh-code-wrap">
            <div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:6px;">
              <button type="button" class="lh-demo-btn" data-sol-target="official">▶️ 侧边并排演示台</button>
              <button type="button" class="lh-copy-btn" data-code="${encodeURIComponent(officialCodeStr)}">📋 复制官方代码</button>
            </div>
            <pre class="lh-code-block"><code>${escapeHtml(officialCodeStr)}</code></pre>
          </div>
        </div>
      </div>
    `;

    // 4. 考点与灵神套路 (concepts)
    let conceptsHtml = '';
    if (concepts.length > 0) {
      conceptsHtml = `
        <div class="lh-sol-card">
          <div class="lh-sol-subhead">
            <span>🧠 灵神解题心法套路 · ${escapeHtml(modTitle)}</span>
          </div>
          <ul style="margin:4px 0 0 18px; padding:0; color:#C9DCD6; line-height:1.7;">
            ${concepts.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // 5. 核心代码模板 (templates)
    let templatesHtml = '';
    if (templates.length > 0) {
      templatesHtml = templates.map((tpl) => `
        <div class="lh-sol-card">
          <div class="lh-sol-subhead">
            <span>📌 核心代码模板：${escapeHtml(tpl.name)}</span>
            <button type="button" class="lh-copy-btn" data-code="${encodeURIComponent(tpl.code)}">📋 复制模板</button>
          </div>
          <div class="lh-code-wrap">
            <pre class="lh-code-block"><code>${escapeHtml(tpl.code)}</code></pre>
          </div>
        </div>
      `).join('');
    }

    const modalTitle = `💡 灵神心法与题解 · ${prob.lcNum ? prob.lcNum + '. ' : ''}${escapeHtml(prob.title)}`;
    const fullHtml = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
        <span class="lh-plan-badge ${prob.rating > 1700 ? 'coral' : ''}">Rating ${prob.rating}</span>
        ${prob.hot100 ? '<span class="lh-plan-badge amber">🔥 Hot 100</span>' : ''}
        <span class="lh-plan-badge">${escapeHtml(modTitle)}</span>
        <span style="font-size:12px; color:#8FA9A2; margin-left:auto;">${escapeHtml(prob.lc)}</span>
      </div>

      <div class="lh-sol-card">
        <div class="lh-sol-subhead">
          <span>⚡ 核心考点与解题思路</span>
        </div>
        ${briefHtml}
        ${noteHtml}
        ${complexityHtml}
        ${pitfallsHtml}
      </div>

      ${solutionsCardHtml}
      ${conceptsHtml}
      ${templatesHtml}
    `;

    showModal(modalTitle, fullHtml);

    // 绑定解法 Tab 切换
    if (modalEl) {
      modalEl.querySelectorAll('.lh-sol-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
          const tab = tabBtn.getAttribute('data-sol-tab');
          modalEl.querySelectorAll('.lh-sol-tab-btn').forEach(b => b.classList.remove('active'));
          tabBtn.classList.add('active');
          
          // 切换 tab 时暂停所有后台逐行动画
          modalEl.querySelectorAll('.lh-demo-container').forEach(c => {
            if (c._cleanup) c._cleanup();
          });

          const paneLingshen = modalEl.querySelector('#lh-pane-lingshen');
          const paneOfficial = modalEl.querySelector('#lh-pane-official');
          if (tab === 'lingshen') {
            paneLingshen?.classList.add('active');
            paneOfficial?.classList.remove('active');
          } else {
            paneOfficial?.classList.add('active');
            paneLingshen?.classList.remove('active');
          }
        });
      });
    }

    // 绑定侧边并排逐行演示台按钮
    if (modalEl) {
      modalEl.querySelectorAll('.lh-demo-btn').forEach(demoBtn => {
        demoBtn.addEventListener('click', () => {
          const targetType = demoBtn.getAttribute('data-sol-target') || 'lingshen';
          openWorkbench(prob, targetType, true);
        });
      });
    }

    // 绑定复制代码按钮
    if (modalEl) {
      modalEl.querySelectorAll('.lh-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rawCode = decodeURIComponent(btn.getAttribute('data-code') || '');
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCode).then(() => {
              const origText = btn.textContent;
              btn.textContent = '✓ 已复制!';
              btn.style.background = '#0E8F6F';
              btn.style.color = '#FFF';
              setTimeout(() => {
                btn.textContent = origText;
                btn.style.background = '';
                btn.style.color = '';
              }, 1500);
            });
          }
        });
      });
    }
  }

  // ==================================================================
  // 独立算法逐行演示台 (Workbench) 核心引擎 · 双窗并排支持
  // ==================================================================
  let workbenchEl = null;
  const WB = {
    prob: null,
    curTab: 'lingshen',
    steps: [],
    idx: 0,
    occ: {},
    lines: [],
    timer: null,
    playing: false,
    speed: 900,
    nodeEls: {},
    run: null,
    err: '',
    kind: {}
  };
  const WBDW = { NW: 86, NH: 56, GAP: 52, X0: 64 };

  function wbEl(id) {
    return document.getElementById(id);
  }

  function readLeetCodeEditorCode() {
    try {
      const lines = document.querySelectorAll('.monaco-editor .view-lines .view-line');
      if (lines && lines.length > 0) {
        const sorted = Array.from(lines).sort((a, b) => {
          const ta = parseFloat(a.style.top || '0');
          const tb = parseFloat(b.style.top || '0');
          return ta - tb;
        });
        const arr = sorted.map(el => el.innerText.replace(/\u00a0/g, ' '));
        const joined = arr.join('\n').trim();
        if (joined) return joined;
      }
    } catch (e) {}
    return '';
  }

  function getProbCode(prob, type) {
    if (type === 'mine') {
      const myCode = readLeetCodeEditorCode();
      if (myCode) return myCode;
      return prob && prob.template ? prob.template : '// 暂未从力扣编辑器读取到代码，请先在右侧编辑器输入代码';
    }
    if (!prob) return '';
    if (type === 'official') {
      const off = (typeof KNOWLEDGE !== 'undefined' && KNOWLEDGE.officialSolutions) ? KNOWLEDGE.officialSolutions[prob.id] : null;
      if (off && off.code && off.code.length) return off.code.join('\n');
    }
    const ling = (typeof KNOWLEDGE !== 'undefined' && KNOWLEDGE.lingshenSolutions) ? KNOWLEDGE.lingshenSolutions[prob.id] : null;
    if (ling && ling.code && ling.code.length) return ling.code.join('\n');
    return prob.ref ? prob.ref.join('\n') : (prob.template || '');
  }

  function wbBuildScene(step) {
    const comps = [], chips = [], visited = {};
    const vars = Object.keys(step.env || {});
    const ids = Object.keys(step.heap || {});

    const adj = {}, rev = {};
    ids.forEach(id => { adj[id] = []; rev[id] = []; });
    ids.forEach(id => {
      const ob = step.heap[id];
      ['next', 'left', 'right'].forEach(fk => {
        const f = ob.fields && ob.fields[fk];
        if (f && f.k === 'ptr' && step.heap[f.id]) {
          adj[id].push(f.id);
          rev[f.id].push(id);
        }
      });
    });

    function varsAt(id) {
      return vars.filter(n => {
        const v = step.env[n];
        return v && v.k === 'ptr' && v.id === id;
      });
    }

    vars.forEach(name => {
      const v = step.env[name];
      if (!v || v.k !== 'ptr' || !step.heap[v.id]) return;
      chips.push({ name: name, id: v.id });
    });

    function collect(startId) {
      const order = [], seen = {}, q = [startId];
      let isTree = false;
      while (q.length) {
        const id = q.shift();
        if (seen[id] || !step.heap[id]) continue;
        seen[id] = 1;
        order.push(id);
        visited[id] = 1;
        const ob = step.heap[id];
        if (ob.fields && ('left' in ob.fields || 'right' in ob.fields)) isTree = true;
        (adj[id] || []).concat(rev[id] || []).forEach(n => {
          if (!seen[n]) q.push(n);
        });
      }
      return { order: order, isTree: isTree };
    }

    vars.forEach(name => {
      const v = step.env[name];
      if (!v || v.k !== 'ptr' || !step.heap[v.id] || visited[v.id]) return;
      const c = collect(v.id);
      const lab = varsAt(v.id).join(' / ');
      comps.push({
        kind: c.isTree ? 'tree' : 'chain',
        root: v.id,
        ids: wbOrdChain(c.order),
        label: lab || '链表',
        orphan: false
      });
    });

    ids.forEach(id => {
      if (visited[id] || !step.heap[id]) return;
      const c = collect(id);
      comps.push({
        kind: c.isTree ? 'tree' : 'chain',
        root: id,
        ids: wbOrdChain(c.order),
        label: '已脱链',
        orphan: true
      });
    });

    return { comps: comps, chips: chips };
  }

  function wbOrdChain(ids) {
    const arr = ids.slice();
    const allNum = arr.every(id => /^\D*\d+$/.test(id));
    if (!allNum) return arr;
    arr.sort((a, b) => {
      const ma = /\d+$/.exec(a), mb = /\d+$/.exec(b);
      return (ma ? Number(ma[0]) : 0) - (mb ? Number(mb[0]) : 0);
    });
    return arr;
  }

  function wbLayout(sc, step) {
    const NW = WBDW.NW, NH = WBDW.NH, GAP = WBDW.GAP, X0 = WBDW.X0;
    const pos = {};
    let y = 34, maxX = 0;
    const labels = [];

    sc.comps.forEach(c => {
      labels.push({ label: c.label, y: y + NH / 2, kind: c.orphan ? 'orphan' : '' });
      if (c.kind === 'tree') {
        let idx = 0;
        const tmp = {};
        let depthMax = 0;
        (function walk(id, d) {
          if (!id || !step.heap[id] || tmp[id]) return;
          const o = step.heap[id];
          walk(o.fields?.left && o.fields.left.k === 'ptr' ? o.fields.left.id : null, d + 1);
          tmp[id] = { i: idx++, d: d };
          depthMax = Math.max(depthMax, d);
          walk(o.fields?.right && o.fields.right.k === 'ptr' ? o.fields.right.id : null, d + 1);
        })(c.root, 0);

        c.ids.forEach(id => { if (!tmp[id]) tmp[id] = { i: idx++, d: 0 }; });
        Object.keys(tmp).forEach(id => {
          pos[id] = { x: X0 + tmp[id].i * (NW + 66), y: y + tmp[id].d * (NH + 38) + NH / 2 };
        });
        maxX = Math.max(maxX, X0 + idx * (NW + 66));
        y += (depthMax + 1) * (NH + 38) + 46;
      } else {
        c.ids.forEach((id, i) => {
          pos[id] = { x: X0 + i * (NW + GAP), y: y + NH / 2 };
        });
        maxX = Math.max(maxX, X0 + c.ids.length * (NW + GAP));
        y += NH + 84;
      }
    });

    return { pos: pos, width: Math.max(maxX + NW + 20, 360), height: y + 18, labels: labels };
  }

  function wbArrows(step, sc, L) {
    const NW = WBDW.NW, NH = WBDW.NH;
    let s = '';
    Object.keys(L.pos).forEach(id => {
      const p = L.pos[id], ob = step.heap[id];
      if (!ob) return;
      ['next', 'left', 'right'].forEach(fk => {
        if (!ob.fields || !(fk in ob.fields)) return;
        const fv = ob.fields[fk];
        const ch = step.changed && step.changed.obj === id && step.changed.field === fk;
        const color = ch ? '#F2A64D' : '#6ED4B7';
        const mk = ch ? 'url(#wbArA)' : 'url(#wbArM)';
        if (!fv || fv.k === 'null') {
          if (fk === 'next') {
            s += `<path d="M ${p.x + NW + 3} ${p.y} l 16 0" stroke="${color}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".5"/>` +
                 `<text x="${p.x + NW + 22}" y="${p.y + 4}" class="lh-wb-nul">null</text>`;
          }
          return;
        }
        if (fv.k !== 'ptr' || !L.pos[fv.id]) return;
        const tp = L.pos[fv.id], x1 = p.x + NW / 2, y1 = p.y, x2 = tp.x, y2 = tp.y;
        const dx = x2 - x1, dy = y2 - y1, dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (fk === 'next' && x2 < x1) {
          const cx = (x1 + x2) / 2, cy = y1 - 76;
          s += `<path d="M ${x1} ${y1 - NH / 2 + 2} Q ${cx} ${cy} ${x2 + 4} ${y2 + NH / 2 - 4}" stroke="${color}" stroke-width="${ch ? 2.4 : 1.6}" fill="none" marker-end="${mk}"/>`;
          return;
        }
        s += `<path d="M ${x1 + dx / dist * 30} ${y1 + dy / dist * 24} L ${x2 - dx / dist * 34} ${y2 - dy / dist * 26}" stroke="${color}" stroke-width="${ch ? 2.4 : 1.6}" fill="none" marker-end="${mk}"/>`;
      });
    });

    const svgEl = wbEl('lh-wb-arrows');
    if (svgEl) {
      svgEl.innerHTML = `
        <defs>
          <marker id="wbArM" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#6ED4B7"/></marker>
          <marker id="wbArA" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#F2A64D"/></marker>
        </defs>
        ${s}
      `;
      svgEl.setAttribute('height', String(Math.max(L.height, 220)));
    }
  }

  function wbCellText(v) {
    if (!v || v.k === 'null') return 'null';
    if (v.k === 'num') return String(v.v);
    if (v.k === 'bool') return v.v ? 'T' : 'F';
    if (v.k === 'str') return v.v !== undefined ? v.v : v.s;
    if (v.k === 'arr') return '[' + (v.items || []).map(wbCellText).join(',') + ']';
    if (v.k === 'ptr') return v.id;
    if (v.v !== undefined) return String(v.v);
    return JSON.stringify(v);
  }

  function wbArrays(step, prev) {
    const box = wbEl('lh-wb-arrays');
    if (!box) return;
    const rows = [];
    const env = step.env || {};

    const ptrMap = {};
    const ptrNames = /^(i|j|k|left|right|l|r|mid|start|end|p|idx|p1|p2|pos|low|high|head|tail)$/i;
    let leftVal = null, rightVal = null, kVal = null;
    Object.keys(env).forEach(k => {
      const v = env[k];
      if (v && v.k === 'num') {
        const num = v.v;
        if (ptrNames.test(k)) {
          if (!ptrMap[num]) ptrMap[num] = [];
          ptrMap[num].push(k);
        }
        if (k === 'left' || k === 'l') leftVal = num;
        if (k === 'right' || k === 'r' || k === 'i') rightVal = num;
        if (k === 'k') kVal = num;
      }
    });

    if (kVal !== null && rightVal !== null && leftVal === null && rightVal >= kVal - 1) {
      leftVal = rightVal - kVal + 1;
    }

    Object.keys(env).forEach(name => {
      const v = env[name];
      if (!v) return;
      let items = null, isStr = false;
      if (v.k === 'arr') {
        items = (v.items || []).map(wbCellText);
      } else if (v.k === 'str') {
        items = String(v.v !== undefined ? v.v : (v.s || '')).split('');
        isStr = true;
      } else if (v.k === 'map') {
        items = Object.keys(v.m || {}).map(k => k + '→' + wbCellText(v.m[k]));
        isStr = true;
      } else if (v.k === 'set') {
        items = Array.isArray(v.s) ? v.s : Object.keys(v.s || {});
        isStr = true;
      }
      if (!items) return;

      const shown = items.slice(0, 24);
      const cells = shown.map((txt, i) => {
        const ptrsHere = ptrMap[i];
        const ptrTag = ptrsHere ? ptrsHere.join('/') + ' ⬇' : '';
        const inWin = (leftVal !== null && rightVal !== null && i >= leftVal && i <= rightVal);
        const isChg = step.changed && (step.changed.name === name || step.changed === name);
        return `
          <div class="lh-demo-cell ${ptrsHere ? 'active-ptr' : ''} ${inWin ? 'in-window' : ''} ${isChg ? 'changed' : ''}">
            <span class="lh-demo-cell-tag">${escapeHtml(ptrTag)}</span>
            <span class="lh-demo-cell-val">${escapeHtml(txt)}</span>
            <span class="lh-demo-cell-idx">${i}</span>
          </div>
        `;
      }).join('');

      rows.push(`
        <div class="lh-demo-arr-row">
          <span class="lh-demo-arr-name">${escapeHtml(name)}</span>
          <div class="lh-demo-cells">
            ${cells}
            ${items.length > shown.length ? `<span style="align-self:center;font-size:10px;color:#8FA9A2;">…共${items.length}项</span>` : ''}
          </div>
        </div>
      `);
    });

    box.innerHTML = rows.join('');
  }

  function wbVars(step) {
    const box = wbEl('lh-wb-vars');
    if (!box) return;
    const cells = Object.keys(step.env || {}).map(name => {
      const v = step.env[name];
      let txt = 'nullptr';
      if (v && v.k === 'num') txt = String(v.v);
      else if (v && v.k === 'bool') txt = v.v ? 'true' : 'false';
      else if (v && v.k === 'str') txt = `"${v.v !== undefined ? v.v : v.s}"`;
      else if (v && v.k === 'ptr') {
        const ob = step.heap && step.heap[v.id];
        const vf = ob && ob.fields && ob.fields.val;
        txt = v.id + (vf && vf.k === 'num' ? '·' + vf.v : '');
      } else if (v && v.k === 'arr') {
        txt = `[${(v.items || []).length} 项]`;
      }
      const ch = step.changed && (step.changed.name === name || step.changed === name);
      return `<span class="lh-wb-cell ${ch ? 'chg' : ''}"><b>${escapeHtml(name)}:</b>${escapeHtml(txt)}</span>`;
    });
    box.innerHTML = cells.join('') || '<span class="lh-wb-cell">暂无局部变量</span>';
  }

  function wbHl(line) {
    const idx = line.indexOf('//');
    const code = idx >= 0 ? line.slice(0, idx) : line;
    const cm = idx >= 0 ? line.slice(idx) : '';
    const out = escapeHtml(code)
      .replace(/\b(while|for|if|else|return|break|continue|new|nullptr|true|false|struct|const|auto)\b/g, '<span class="kw">$1</span>')
      .replace(/\b(int|bool|char|double|long|void|ListNode|TreeNode|vector|string|queue|stack|unordered_map|unordered_set|set|map)\b/g, '<span class="ty">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
    return out + (cm ? `<span class="cm">${escapeHtml(cm)}</span>` : '');
  }

  function wbBuildCode() {
    const box = wbEl('lh-wb-code');
    if (!box) return;
    let html = '';
    WB.lines.forEach((line, i) => {
      const n = i + 1;
      html += `
        <div class="lh-wb-row" data-line="${n}">
          <span class="lh-wb-ln">${n}</span>
          <span class="lh-wb-src">${wbHl(line) || '&nbsp;'}</span>
        </div>
      `;
    });
    box.innerHTML = html;
    box.querySelectorAll('.lh-wb-row').forEach(row => {
      row.addEventListener('click', () => {
        wbJump(Number(row.getAttribute('data-line')));
      });
    });
  }

  function wbRender() {
    const NW = WBDW.NW, NH = WBDW.NH;
    const step = WB.steps[WB.idx];
    if (!step) return;

    const sc = wbBuildScene(step);
    const L = wbLayout(sc, step);
    WB.kind = {};
    sc.comps.forEach(c => { c.ids.forEach(id => { WB.kind[id] = c.kind; }); });

    const plane = wbEl('lh-wb-plane');
    const stage = wbEl('lh-wb-stage');
    const arraysBox = wbEl('lh-wb-arrays');
    const noPtr = Object.keys(step.heap || {}).length === 0;
    if (stage) {
      stage.style.display = noPtr ? 'none' : '';
      stage.style.flex = noPtr ? '0 0 auto' : '1';
    }
    if (arraysBox) {
      arraysBox.style.flex = noPtr ? '1' : '';
      arraysBox.style.padding = noPtr ? '18px 20px' : '4px 14px 10px';
    }
    if (plane) {
      plane.style.width = Math.max(L.width, 360) + 'px';
      plane.style.height = noPtr ? '0px' : Math.max(L.height, 220) + 'px';
    }

    const lanes = wbEl('lh-wb-lanes');
    if (lanes) {
      if (noPtr) {
        WB.nodeEls = {};
        lanes.innerHTML = '<div style="font-size:11.5px;color:#8FA9A2;padding:12px 6px;">💡 当前步骤在数组/基础变量区执行：观察下方动态数组格子、双指针移动与滑窗高亮。</div>';
        const arrSvg = wbEl('lh-wb-arrows');
        if (arrSvg) arrSvg.innerHTML = '';
        const chipL = wbEl('lh-wb-chips-layer');
        if (chipL) chipL.innerHTML = '';
      } else {
        lanes.innerHTML = '';
        Object.keys(L.pos).forEach(id => {
          const p = L.pos[id], ob = step.heap[id];
          if (!ob) return;
          let el = WB.nodeEls[id];
          if (!el) {
            el = document.createElement('div');
            el.className = 'lh-wb-node';
            el.innerHTML = '<span class="v"></span><span class="k"></span>';
            lanes.appendChild(el);
            WB.nodeEls[id] = el;
          }
          const vf = ob.fields && ob.fields.val;
          el.querySelector('.v').textContent = (vf && vf.k === 'num') ? String(vf.v) : (ob.type || 'node');
          el.querySelector('.k').textContent = id;
          el.style.width = NW + 'px';
          el.style.height = NH + 'px';
          el.style.transform = `translate(${p.x}px, ${p.y - NH / 2}px)`;
          const ch = step.changed && step.changed.obj === id;
          el.classList.toggle('chg', !!ch);
          lanes.appendChild(el);
        });

        let chipHtml = '';
        const rowsAt = {};
        sc.chips.forEach(c => {
          const p = L.pos[c.id];
          if (!p) return;
          rowsAt[c.id] = (rowsAt[c.id] || 0) + 1;
          chipHtml += `<span class="lh-wb-badge" style="transform:translate(${p.x + NW / 2}px, ${p.y + NH / 2 + 6 + (rowsAt[c.id] - 1) * 20}px) translateX(-50%)">${escapeHtml(c.name)}</span>`;
        });
        const chipL = wbEl('lh-wb-chips-layer');
        if (chipL) chipL.innerHTML = chipHtml;
        wbArrows(step, sc, L);
      }
    }

    wbVars(step);
    wbArrays(step, WB.steps[WB.idx - 1] || null);

    const stepLb = wbEl('lh-wb-badge-step');
    if (stepLb) {
      stepLb.textContent = `第 ${step.line || 1} 行` + (step.depth ? ` · 递归第 ${step.depth} 层` : '');
    }
    const noteEl = wbEl('lh-wb-note');
    if (noteEl) {
      noteEl.textContent = (step.depth ? `[${step.fn || '递归'}] ` : '') + (step.note || '执行代码行');
    }
    const counterEl = wbEl('lh-wb-counter');
    if (counterEl) {
      counterEl.textContent = `${WB.idx + 1} / ${WB.steps.length}`;
    }
    const barEl = wbEl('lh-wb-prog-bar');
    if (barEl) {
      barEl.style.width = (WB.steps.length > 1 ? (WB.idx / (WB.steps.length - 1)) * 100 : 0) + '%';
    }

    const resEl = wbEl('lh-wb-result');
    if (resEl) {
      if (WB.idx === WB.steps.length - 1 && WB.run && WB.run.result && WB.run.result.has) {
        resEl.style.display = 'block';
        resEl.textContent = '🎉 算法运行返回：' + wbCellText(WB.run.result.v);
      } else {
        resEl.style.display = 'none';
      }
    }

    const codeBox = wbEl('lh-wb-code');
    if (codeBox) {
      codeBox.querySelectorAll('.lh-wb-row').forEach(row => {
        const l = Number(row.getAttribute('data-line'));
        const on = (l === step.line);
        row.classList.toggle('on', on);
        if (on) {
          const top = row.offsetTop, bottom = top + row.offsetHeight;
          if (top < codeBox.scrollTop + 4) codeBox.scrollTop = top - 8;
          else if (bottom > codeBox.scrollTop + codeBox.clientHeight - 4) codeBox.scrollTop = bottom - codeBox.clientHeight + 8;
        }
      });
    }

    wbUpdatePlayBtn();
  }

  function wbUpdatePlayBtn() {
    const b = wbEl('lh-wb-play');
    if (b) b.textContent = WB.playing ? '⏸ 暂停' : '▶ 播放';
  }

  function wbPlay() {
    if (!WB.steps.length || WB.playing) return;
    if (WB.idx >= WB.steps.length - 1) {
      WB.idx = 0;
      wbRender();
    }
    WB.playing = true;
    wbUpdatePlayBtn();
    wbTick();
  }

  function wbTick() {
    clearTimeout(WB.timer);
    WB.timer = setTimeout(() => {
      if (!WB.playing) return;
      if (WB.idx < WB.steps.length - 1) {
        WB.idx++;
        wbRender();
        wbTick();
      } else {
        WB.playing = false;
        wbUpdatePlayBtn();
      }
    }, WB.speed);
  }

  function wbPause() {
    WB.playing = false;
    clearTimeout(WB.timer);
    wbUpdatePlayBtn();
  }

  function wbTogglePlay() {
    if (WB.playing) wbPause();
    else wbPlay();
  }

  function wbGo(n) {
    if (!WB.steps.length) return;
    wbPause();
    WB.idx = Math.max(0, Math.min(WB.steps.length - 1, n));
    wbRender();
  }

  function wbStep(d) {
    wbGo(WB.idx + d);
  }

  function wbJump(line) {
    const list = WB.occ[line];
    if (!list || !list.length) return;
    wbPause();
    const p = list.indexOf(WB.idx);
    WB.idx = (p >= 0 && p < list.length - 1) ? list[p + 1] : list[0];
    wbRender();
  }

  function wbRun(codeOverride, paramsOverride) {
    const p = WB.prob;
    if (!p) return;
    const src = codeOverride !== undefined ? codeOverride : getProbCode(p, WB.curTab);
    const paramsInput = wbEl('lh-wb-params');
    let params = paramsOverride !== undefined ? paramsOverride : (paramsInput ? paramsInput.value.trim() : '');
    if (!params) {
      if (p.params && p.params.length) {
        params = p.params[0];
      } else if (typeof generateAutoParams === 'function') {
        params = generateAutoParams(src, p);
      }
      if (paramsInput && params) paramsInput.value = params;
    }

    wbPause();
    WB.steps = []; WB.idx = 0; WB.err = ''; WB.occ = {}; WB.nodeEls = {};
    WB.lines = String(src).split('\n');

    let r = null;
    if (typeof analyze === 'function') {
      try {
        r = analyze(src, params);
      } catch (err) {
        WB.err = err.message || '代码解析失败';
      }
    }

    if (r && r.error) {
      WB.err = r.error.message || '执行出错';
    }

    if (r && r.steps && r.steps.length) {
      WB.run = r;
      WB.steps = r.steps;
      WB.lines = r.lines || WB.lines;
      WB.steps.forEach((s, i) => {
        WB.occ[s.line] = WB.occ[s.line] || [];
        WB.occ[s.line].push(i);
      });
    } else {
      // 智能后备语法步进：确保任何代码都能完整单步演练
      WB.lines.forEach((l, idx) => {
        const trimmed = l.trim();
        if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed.startsWith('//')) return;
        let note = '执行本行语句';
        if (trimmed.includes('for (') || trimmed.includes('for(')) note = '循环变量迭代与边界条件检查';
        else if (trimmed.includes('while (') || trimmed.includes('while(')) note = '循环条件检查';
        else if (trimmed.includes('if (') || trimmed.includes('if(')) note = '分支逻辑判断';
        else if (trimmed.includes('return')) note = '计算完成，返回最终结果';
        else if (trimmed.includes('=')) note = '状态转移或指针/变量值更新';

        WB.steps.push({
          line: idx + 1,
          note: (WB.err ? `[语法步进模式：${WB.err}] ` : '') + note,
          env: { '行号': idx + 1 },
          heap: {},
          changed: null
        });
      });
      WB.steps.forEach((s, i) => {
        WB.occ[s.line] = WB.occ[s.line] || [];
        WB.occ[s.line].push(i);
      });
    }

    wbBuildCode();
    if (WB.steps.length) {
      wbRender();
    }
  }

  function openWorkbench(prob, initialTab, isDual) {
    if (!prob) {
      if (curProblem) prob = curProblem;
      else if (typeof PROBLEMS !== 'undefined' && PROBLEMS.length) prob = PROBLEMS[0];
      else return;
    }

    WB.prob = prob;
    WB.curTab = initialTab || 'lingshen';

    if (!workbenchEl) {
      workbenchEl = document.createElement('div');
      workbenchEl.id = 'lh-workbench-mask';
      workbenchEl.innerHTML = `
        <div class="lh-workbench">
          <div class="lh-wb-head">
            <div class="lh-wb-head-left">
              <span class="lh-wb-tag">WORKBENCH</span>
              <span class="lh-wb-title" id="lh-wb-title">算法逐行演示台</span>
              <div class="lh-wb-tabs">
                <button type="button" class="lh-wb-tab active" data-tab="lingshen" id="lh-wb-tab-lingshen">🧠 灵神解法</button>
                <button type="button" class="lh-wb-tab" data-tab="official" id="lh-wb-tab-official">🎯 官方解法</button>
                <button type="button" class="lh-wb-tab" data-tab="mine" id="lh-wb-tab-mine" title="读取你在力扣编辑器中写的代码进行演示">💻 我的代码</button>
              </div>
            </div>
            <div class="lh-wb-head-right">
              <div class="lh-wb-legend">
                <span><i style="background:#6ED4B7"></i>指针 / 链表</span>
                <span><i style="background:#F2A64D"></i>本步修改</span>
              </div>
              <button type="button" class="lh-wb-close" id="lh-wb-close-btn" title="关闭演示台 (Esc)">✕</button>
            </div>
          </div>
          <div class="lh-wb-body">
            <div class="lh-wb-left">
              <div class="lh-wb-tool">
                <label>参数</label>
                <input type="text" id="lh-wb-params" placeholder="输入测试样例" spellcheck="false">
                <button type="button" id="lh-wb-rand" title="智能自动生成合法随机参数" style="padding:4px 8px;font-size:11.5px;background:rgba(110,212,183,0.15);border:1px solid rgba(110,212,183,0.35);color:#6ED4B7;border-radius:5px;cursor:pointer;white-space:nowrap;">🎲 随机</button>
                <button type="button" id="lh-wb-rerun" style="padding:4px 10px;font-size:11.5px;background:#0E8F6F;border:none;color:#FFF;border-radius:5px;cursor:pointer;white-space:nowrap;">重算</button>
              </div>
              <div class="lh-wb-chips" id="lh-wb-chips"></div>
              <div class="lh-wb-code" id="lh-wb-code"></div>
              <div class="lh-wb-tip">点任意代码行直接跳转 · ← → 单步 · 空格 播放/暂停</div>
            </div>
            <div class="lh-wb-right">
              <div class="lh-wb-stage" id="lh-wb-stage">
                <div class="lh-wb-plane" id="lh-wb-plane">
                  <div id="lh-wb-lanes"></div>
                  <div id="lh-wb-chips-layer"></div>
                  <svg class="lh-wb-arrows" id="lh-wb-arrows"></svg>
                </div>
              </div>
              <div class="lh-wb-meta">
                <span class="lh-wb-badge-step" id="lh-wb-badge-step">第 1 行</span>
                <span class="lh-wb-note" id="lh-wb-note"></span>
                <span class="lh-wb-counter" id="lh-wb-counter">0 / 0</span>
              </div>
              <div class="lh-wb-vars" id="lh-wb-vars"></div>
              <div class="lh-wb-arrays" id="lh-wb-arrays"></div>
              <div class="lh-wb-result" id="lh-wb-result"></div>
            </div>
          </div>
          <div class="lh-wb-foot">
            <div class="lh-wb-prog"><div class="lh-wb-prog-bar" id="lh-wb-prog-bar"></div></div>
            <div class="lh-wb-ctrl">
              <button type="button" id="lh-wb-first" title="首步">⏮</button>
              <button type="button" id="lh-wb-prev" title="上一步 (←)">◀</button>
              <button type="button" id="lh-wb-play" class="primary" title="播放/暂停 (空格)">播放</button>
              <button type="button" id="lh-wb-next" title="下一步 (→)">▶</button>
              <button type="button" id="lh-wb-last" title="尾步">⏭</button>
              <select id="lh-wb-speed">
                <option value="1400">慢速</option>
                <option value="900" selected>中速</option>
                <option value="450">快速</option>
              </select>
              <span class="tip" id="lh-wb-mode-tip">独立全屏推演台</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(workbenchEl);

      // 事件绑定
      wbEl('lh-wb-close-btn')?.addEventListener('click', closeWorkbench);
      wbEl('lh-wb-first')?.addEventListener('click', () => wbGo(0));
      wbEl('lh-wb-prev')?.addEventListener('click', () => wbStep(-1));
      wbEl('lh-wb-play')?.addEventListener('click', wbTogglePlay);
      wbEl('lh-wb-next')?.addEventListener('click', () => wbStep(1));
      wbEl('lh-wb-last')?.addEventListener('click', () => wbGo(WB.steps.length - 1));
      wbEl('lh-wb-speed')?.addEventListener('change', (e) => {
        WB.speed = Number(e.target.value) || 900;
      });
      wbEl('lh-wb-rand')?.addEventListener('click', () => {
        if (typeof generateAutoParams === 'function') {
          const code = getProbCode(WB.prob, WB.curTab);
          const autoP = generateAutoParams(code, WB.prob);
          const pInput = wbEl('lh-wb-params');
          if (pInput) pInput.value = autoP;
          wbRun(code, autoP);
        }
      });
      wbEl('lh-wb-rerun')?.addEventListener('click', () => {
        const pInput = wbEl('lh-wb-params');
        wbRun(undefined, pInput ? pInput.value.trim() : '');
      });
      wbEl('lh-wb-tab-lingshen')?.addEventListener('click', () => {
        WB.curTab = 'lingshen';
        wbEl('lh-wb-tab-lingshen')?.classList.add('active');
        wbEl('lh-wb-tab-official')?.classList.remove('active');
        wbEl('lh-wb-tab-mine')?.classList.remove('active');
        wbRun();
      });
      wbEl('lh-wb-tab-official')?.addEventListener('click', () => {
        WB.curTab = 'official';
        wbEl('lh-wb-tab-official')?.classList.add('active');
        wbEl('lh-wb-tab-lingshen')?.classList.remove('active');
        wbEl('lh-wb-tab-mine')?.classList.remove('active');
        wbRun();
      });
      wbEl('lh-wb-tab-mine')?.addEventListener('click', () => {
        WB.curTab = 'mine';
        wbEl('lh-wb-tab-mine')?.classList.add('active');
        wbEl('lh-wb-tab-lingshen')?.classList.remove('active');
        wbEl('lh-wb-tab-official')?.classList.remove('active');
        wbRun();
      });
      workbenchEl.addEventListener('click', (e) => {
        if (e.target === workbenchEl && !workbenchEl.classList.contains('lh-dual-right')) {
          closeWorkbench();
        }
      });
    }

    // 标题与 Tab 状态
    const titleEl = wbEl('lh-wb-title');
    if (titleEl) {
      titleEl.textContent = `算法逐行演示台 · ${prob.lcNum ? prob.lcNum + '. ' : ''}${prob.title}`;
    }
    wbEl('lh-wb-tab-lingshen')?.classList.toggle('active', WB.curTab === 'lingshen');
    wbEl('lh-wb-tab-official')?.classList.toggle('active', WB.curTab === 'official');
    wbEl('lh-wb-tab-mine')?.classList.toggle('active', WB.curTab === 'mine');

    // 测例 Chips
    const chipsBox = wbEl('lh-wb-chips');
    if (chipsBox) {
      const pList = prob.params || [];
      if (pList.length > 0) {
        chipsBox.innerHTML = pList.slice(0, 4).map(paramStr => `
          <button type="button" class="lh-wb-chip" data-p="${escapeHtml(paramStr)}">${escapeHtml(paramStr)}</button>
        `).join('');
        chipsBox.querySelectorAll('.lh-wb-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            const val = chip.getAttribute('data-p');
            const pInput = wbEl('lh-wb-params');
            if (pInput) pInput.value = val;
            wbRun(undefined, val);
          });
        });
      } else {
        chipsBox.innerHTML = '';
      }
    }

    // 双窗并排排版模式检测
    const isModalOpen = (modalEl && modalEl.classList.contains('on'));
    const modeTip = wbEl('lh-wb-mode-tip');
    if (isDual || isModalOpen) {
      modalEl?.classList.add('lh-dual-left');
      workbenchEl.classList.add('lh-dual-right');
      if (modeTip) modeTip.textContent = '⚡ 双窗并排已激活：左侧心法 · 右侧实战推演';
    } else {
      modalEl?.classList.remove('lh-dual-left');
      workbenchEl.classList.remove('lh-dual-right');
      if (modeTip) modeTip.textContent = '⚡ 独立全景推演台';
    }

    workbenchEl.classList.add('on');
    updateOverlayState();
    wbRun();
  }

  function updateOverlayState() {
    const isModalBlocking = !!(modalEl && modalEl.classList.contains('on') && !modalEl.classList.contains('lh-pinned'));
    const isWb = !!(workbenchEl && workbenchEl.classList.contains('on'));
    if (isModalBlocking || isWb) {
      document.body.classList.add('lh-overlay-open');
    } else {
      document.body.classList.remove('lh-overlay-open');
    }
  }

  function closeWorkbench() {
    if (!workbenchEl) return;
    wbPause();
    workbenchEl.classList.remove('on');
    workbenchEl.classList.remove('lh-dual-right');
    if (modalEl) {
      modalEl.classList.remove('lh-dual-left');
    }
    updateOverlayState();
  }

  // 当处于非题单题目时，展示 14 专题全部 54 道题目的心法与解法索引
  function showAllMindsetDirectory() {
    let modsHtml = '';
    if (typeof MODULES !== 'undefined') {
      MODULES.forEach(m => {
        const mProbs = (typeof PROBLEMS !== 'undefined') ? PROBLEMS.filter(p => p.mod === m.id) : [];
        if (mProbs.length === 0) return;
        const chipsHtml = mProbs.map(p => `
          <div class="lh-mod-prob-chip" data-prob-id="${p.id}" title="${escapeHtml(p.brief || p.title)}">
            <span>${p.lcNum ? p.lcNum + '.' : ''} ${escapeHtml(p.title)}</span>
            <span class="lh-plan-badge ${p.rating > 1700 ? 'coral' : ''}" style="padding:1px 5px;font-size:10.5px;">${p.rating}</span>
            ${p.hot100 ? '<span style="color:#FFA116;font-size:10px;">★</span>' : ''}
          </div>
        `).join('');

        modsHtml += `
          <div class="lh-mod-dir-sec">
            <div class="lh-mod-dir-title">
              <span>${escapeHtml(m.stageName || m.name)}</span>
              <span style="font-size:11.5px;color:#8FA9A2;font-weight:normal;">${mProbs.length} 题</span>
            </div>
            <div class="lh-mod-prob-grid">
              ${chipsHtml}
            </div>
          </div>
        `;
      });
    }

    showModal('💡 灵神心法与题解大全（12 专题全景题单）', `
      <p style="color:#8FA9A2;font-size:12.5px;margin:0 0 12px 0;">
        当前题目不在精选题单中。点击下方任意题目，即可直接查阅该题的<strong>解题思路、避坑指南、复杂度与 C++ 参考题解</strong>：
      </p>
      ${modsHtml}
    `);

    // 绑定点击题目 chip 弹出题解
    if (modalEl) {
      modalEl.querySelectorAll('.lh-mod-prob-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const pid = chip.getAttribute('data-prob-id');
          const targetProb = (typeof PROBLEMS !== 'undefined') ? PROBLEMS.find(p => p.id === pid) : null;
          if (targetProb) {
            showMindsetModal(targetProb);
          }
        });
      });
    }
  }

  let isMindsetPinned = true;
  try {
    isMindsetPinned = localStorage.getItem('ling_mindset_pinned') !== 'false';
  } catch (e) {}

  function openCurrentMindset() {
    if (modalEl && modalEl.classList.contains('on')) {
      modalEl.classList.remove('on');
      modalEl.classList.remove('lh-dual-left');
      if (workbenchEl && workbenchEl.classList.contains('on')) {
        workbenchEl.classList.remove('lh-dual-right');
      }
      updateOverlayState();
      return;
    }
    if (!curProblem) {
      showAllMindsetDirectory();
      return;
    }
    showMindsetModal(curProblem);
  }

  function showModal(title, contentHtml) {
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'lh-modal-mask';
      document.body.appendChild(modalEl);
    }
    modalEl.innerHTML = `
      <div class="lh-modal">
        <div class="lh-modal-head">
          <h3>${title}</h3>
          <div class="lh-modal-actions">
            <button type="button" class="lh-modal-pin ${isMindsetPinned ? 'active' : ''}" id="lh-modal-pin-btn" title="切换【边看边写（固定左侧不挡代码）】或【居中弹窗】">${isMindsetPinned ? '📌 边看边写中' : '⬜ 居中模式'}</button>
            <button type="button" class="lh-modal-close" id="lh-modal-close-btn">✕</button>
          </div>
        </div>
        <div class="lh-modal-body">${contentHtml}</div>
        <div class="lh-modal-foot">
          <span style="font-size:11.5px;color:#8FA9A2;margin-right:auto;">${isMindsetPinned ? '✨ 已停靠左侧：可直接点击右侧编辑器敲代码 (Alt+M 快速开关)' : '💡 提示：点击右上角「📌 边看边写」即可边看心法边敲代码'}</span>
          <button type="button" class="lh-nav-btn primary" id="lh-modal-ok-btn">收起</button>
        </div>
      </div>
    `;
    modalEl.classList.toggle('lh-pinned', isMindsetPinned);
    modalEl.classList.add('on');
    updateOverlayState();

    const closeModal = () => {
      modalEl.classList.remove('on');
      modalEl.classList.remove('lh-dual-left');
      if (workbenchEl && workbenchEl.classList.contains('on')) {
        workbenchEl.classList.remove('lh-dual-right');
      }
      updateOverlayState();
    };
    document.getElementById('lh-modal-pin-btn')?.addEventListener('click', (e) => {
      isMindsetPinned = !isMindsetPinned;
      try { localStorage.setItem('ling_mindset_pinned', isMindsetPinned ? 'true' : 'false'); } catch (err) {}
      modalEl.classList.toggle('lh-pinned', isMindsetPinned);
      const btn = e.currentTarget;
      btn.classList.toggle('active', isMindsetPinned);
      btn.textContent = isMindsetPinned ? '📌 边看边写中' : '⬜ 居中模式';
      updateOverlayState();
    });
    document.getElementById('lh-modal-close-btn')?.addEventListener('click', closeModal);
    document.getElementById('lh-modal-ok-btn')?.addEventListener('click', closeModal);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl && !modalEl.classList.contains('lh-pinned')) closeModal();
    });
  }

  // ------------------------------------------------------------------
  // 力扣原生提交监听：捕获 AC (通过) 并自动打勾
  // ------------------------------------------------------------------
  function observeLeetCodeSubmissions() {
    let lastProcessedText = '';
    const observer = new MutationObserver(() => {
      // 力扣提交结果通常包含：'通过' 或 'Accepted'
      const acElements = document.querySelectorAll('[data-e2e-tracking-id="console-result"], .text-green-s, span, div');
      for (let el of acElements) {
        const txt = el.textContent ? el.textContent.trim() : '';
        if ((txt === '通过' || txt === 'Accepted') && el.offsetWidth > 0 && el.offsetHeight > 0) {
          if (curProblem && !acMap[curProblem.id]) {
            acMap[curProblem.id] = Date.now();
            saveState();
            renderPlanBar();
            triggerAcToast();
          }
          break;
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function triggerAcToast() {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'lh-ac-toast';
      document.body.appendChild(toastEl);
    }
    const nextProb = getNeighborProblem(1);
    toastEl.innerHTML = `
      <span>🎉 恭喜通过！已计入【灵神学习计划】进度</span>
      ${nextProb ? `<button type="button" class="lh-ac-btn" id="lh-toast-next-btn">做下一题 ▶</button>` : ''}
    `;
    toastEl.classList.add('on');
    document.getElementById('lh-toast-next-btn')?.addEventListener('click', () => {
      toastEl.classList.remove('on');
      jumpToProblem(nextProb);
    });

    setTimeout(() => {
      toastEl.classList.remove('on');
    }, 6000);
  }

  // ==================================================================
  // 内置 AI 算法助教面板（支持本地智能诊断 + OpenAI/DeepSeek/Ark API）
  // ==================================================================
  let aiPanelEl = null;
  const AI_CFG_KEY = 'ling_ai_cfg_v1';
  const AI_CHAT_KEY = 'ling_ai_chats_v1';
  const AI_PRESETS = {
    deepseek: { url: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
    openai: { url: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
    ark: { url: 'https://ark.cn-beijing.volces.com/api/v3', model: 'deepseek-v3-241226' },
    custom: { url: '', model: '' }
  };
  let aiCfgState = { mode: 'local', preset: 'deepseek', url: 'https://api.deepseek.com/v1', key: '', model: 'deepseek-chat', side: 'left' };
  let aiChatsMap = {};
  let aiBusy = false;

  try {
    const savedCfg = localStorage.getItem(AI_CFG_KEY);
    if (savedCfg) Object.assign(aiCfgState, JSON.parse(savedCfg));
    const savedChats = localStorage.getItem(AI_CHAT_KEY);
    if (savedChats) aiChatsMap = JSON.parse(savedChats);
  } catch (e) {}

  function saveAiState() {
    try {
      localStorage.setItem(AI_CFG_KEY, JSON.stringify(aiCfgState));
      localStorage.setItem(AI_CHAT_KEY, JSON.stringify(aiChatsMap));
    } catch (e) {}
  }

  function aiMdFormat(s) {
    let out = escapeHtml(s || '');
    const fences = [];
    out = out.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, (_, c) => {
      fences.push(c);
      return `\u0000F${fences.length - 1}\u0000`;
    });
    out = out.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
    out = out.replace(/\n/g, '<br>');
    out = out.replace(/\u0000F(\d+)\u0000/g, (_, i) => `<pre>${fences[+i]}</pre>`);
    return out;
  }

  function aiLocalReply(query, prob, userCode) {
    const q = (query || '').trim();
    const ling = (prob && typeof KNOWLEDGE !== 'undefined' && KNOWLEDGE.lingshenSolutions) ? KNOWLEDGE.lingshenSolutions[prob.id] : null;
    const mod = (prob && typeof MODULES !== 'undefined') ? MODULES.find(m => m.id === prob.mod) : null;

    // 1. 帮我查错 / 代码诊断
    if (/查错|bug|错在哪|运行|我的代码|诊断/.test(q)) {
      if (!userCode || userCode.length < 15) {
        return '暂未检测到你编辑器里的代码，请先在右侧力扣代码框里写几行代码，我就能直接帮你逐行诊断边界与逻辑漏洞！';
      }
      const tips = [];
      if (/while\s*\(\s*[a-zA-Z_]\w*\s*->\s*next\s*\)/.test(userCode) && !/!=\s*nullptr/.test(userCode)) {
        tips.push('检测到 `while (cur->next)`，如果传入空链表 `head == nullptr` 可能会空指针崩溃，建议先判空或写 `while (cur && cur->next)`。');
      }
      if (/if\s*\([^=]*[^=!<>]=[^=][^)]*\)/.test(userCode)) {
        tips.push('注意 `if (...)` 条件中疑似出现了单等号 `=` 赋值操作，检查是否应该写成双等号 `==`！');
      }
      if (/int\s+\w+\s*=/.test(userCode) && prob && /sum|乘积|pow|二分|距离/.test(prob.title + (prob.note || '')) && !/long\s+long/.test(userCode)) {
        tips.push('本题数值累加/乘法可能超出 `int` 范围（2e9），注意检查是否需要 `long long`。');
      }
      if (/return\s+/.test(userCode) === false) {
        tips.push('代码中似乎缺少 `return` 语句，请检查函数是否有正确的返回值。');
      }
      if (typeof analyze === 'function') {
        try {
          const pStr = (prob && prob.params && prob.params[0]) || generateAutoParams(userCode, prob);
          const res = analyze(userCode, pStr);
          if (res && res.error) {
            tips.push(`在内置解释器试跑样例 \`${pStr}\` 时发现问题：**${res.error.message}**（第 ${res.error.cpline || '?'} 行）。`);
          } else if (res && res.result && res.result.has) {
            tips.push(`使用样例 \`${pStr}\` 试跑成功，输出结果为：\`${JSON.stringify(res.result.v.v !== undefined ? res.result.v.v : res.result.v)}\`。建议点击「▶️ 演示台 -> 💻 我的代码」一步步核对指针位置！`);
          }
        } catch (err) {
          tips.push(`试跑语法解析提示：**${err.message}**`);
        }
      }
      if (!tips.length) {
        tips.push('静态语法结构看起来很规整！建议重点核对：**循环起始/终止边界（如 `< k - 1` 或 `left <= right`）**以及**空输入/单元素边界**。');
      }
      return `**🔍 代码诊断报告（基于当前编辑器内容）：**\n\n` + tips.map((t, i) => `${i + 1}. ${t}`).join('\n') +
        (prob && prob.pitfalls && prob.pitfalls.length ? `\n\n**⚠️ 本题高频坑点提醒：**\n- ${prob.pitfalls.join('\n- ')}` : '');
    }

    // 2. 给点思路 / 怎么写
    if (/思路|提示|怎么|不会|心法/.test(q)) {
      if (!prob) return '当前不在具体题单页面中，你可以点击「📑 大纲」挑选一道题开始，或在代码框输入问题。';
      return `**💡 【${prob.title}】灵神破题心法：**\n\n` +
        `- **核心套路**：${mod ? mod.name : '算法基础'}\n` +
        `- **题意与切入点**：${prob.brief || ''}\n` +
        `- **关键步骤**：${prob.note || (ling ? ling.desc : '拆解状态转移或指针不变式。')}\n\n` +
        `你可以先按这个方向写个雏形，然后点「**🔍 帮我查错**」或去「**▶️ 演示台 -> 💻 我的代码**」看动画验证！`;
    }

    // 3. 避坑
    if (/坑|注意|边界|易错/.test(q)) {
      if (prob && prob.pitfalls && prob.pitfalls.length) {
        return `**⚠️ 【${prob.title}】高频避坑指南：**\n\n- ` + prob.pitfalls.join('\n- ');
      }
      return '刷题常见三大边界坑：\n1. 空数组 / 空字符串 / 空链表 `nullptr` 判空\n2. 滑动窗口入窗与出窗的先后顺序\n3. 整数相加或二分 `mid` 计算溢出（推荐 `left + (right - left) / 2`）';
    }

    // 4. 复杂度
    if (/复杂度|时间|空间|O\(/.test(q)) {
      if (prob && prob.complexity) {
        return `**⏱️ 【${prob.title}】复杂度分析：**\n\n${prob.complexity}\n\n估算技巧：单层遍历/双指针通常为 $O(n)$；二分查找为 $O(\\log n)$；嵌套枚举为 $O(n^2)$。`;
      }
      return '复杂度速算：看每个元素最多入队/入窗/被指针访问几次。每个元素最多进出各一次就是 $O(n)$ 时间，$O(1)$ 或 $O(k)$ 空间。';
    }

    // 5. 看参考代码
    if (/代码|参考|题解|答案/.test(q)) {
      const code = getProbCode(prob, 'lingshen');
      if (code) {
        return `**🧠 灵神精选参考实现：**\n\`\`\`cpp\n${code}\n\`\`\`\n建议先自己敲一遍，再对照「**▶️ 演示台**」理解每一行的指针变化。`;
      }
    }

    // 兜底回答
    return `我是你的 **AI 算法助教（当前为本地零配置模式）**！针对当前题目 **${prob ? prob.title : '力扣刷题'}**，你可以直接点击上方的快捷问题按钮（如 **💡 给点思路**、**🔍 帮我查错**、**⚠️ 避坑指南**），或者点击右上角 **⚙️ API** 接入 DeepSeek / OpenAI 进行自由深度对话。`;
  }

  async function aiCallRemoteApi(userText, prob, userCode) {
    const sysPrompt = `你是灵神（灵茶山艾府）风格的 C++ 算法助教，擅长用最通俗直观的“三问/红蓝染色/循环不变式”启发学生，不直接灌输答案除非对方明确要求。
当前题目：${prob ? `${prob.lc} ${prob.title} (Rating ${prob.rating})` : '未知题目'}
核心思路：${prob ? (prob.brief + ' ' + (prob.note || '')) : ''}
当前学生在力扣编辑器中的代码：
\`\`\`cpp
${userCode || '// 尚未输入代码'}
\`\`\``;

    const pid = prob ? prob.id : '_global';
    const history = (aiChatsMap[pid] || []).slice(-8).map(m => ({
      role: m.r === 'user' ? 'user' : 'assistant',
      content: m.raw || m.t
    }));

    const baseUrl = (aiCfgState.url || '').replace(/\/+$/, '');
    const resp = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiCfgState.key}`
      },
      body: JSON.stringify({
        model: aiCfgState.model || 'deepseek-chat',
        messages: [{ role: 'system', content: sysPrompt }, ...history],
        temperature: 0.4
      })
    });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}: ${await resp.text()}`);
    }
    const data = await resp.json();
    return data.choices?.[0]?.message?.content || '（API 返回为空）';
  }

  function renderAiMessages() {
    if (!aiPanelEl) return;
    const box = aiPanelEl.querySelector('#lh-ai-msgs');
    if (!box) return;
    const pid = curProblem ? curProblem.id : '_global';
    const list = aiChatsMap[pid] || [];
    if (list.length === 0) {
      const title = curProblem ? `${curProblem.lcNum || ''}. ${curProblem.title}` : '力扣刷题';
      box.innerHTML = `
        <div class="lh-ai-msg bot">
          你好！我是你的 **AI 算法助教** 🤖<br><br>
          当前正在攻克：**${escapeHtml(title)}**。<br>
          我会自动读取你在力扣编辑器里写的代码——遇到卡壳、WA 或需要思路启发时，随时点击下方快捷按钮或直接向我提问！
        </div>
      `;
      return;
    }
    box.innerHTML = list.map(m => `<div class="lh-ai-msg ${m.r === 'user' ? 'user' : 'bot'}">${aiMdFormat(m.t)}</div>`).join('');
    box.scrollTop = box.scrollHeight;
  }

  async function sendAiMessage(text) {
    const q = (text || '').trim();
    if (!q || aiBusy) return;
    const pid = curProblem ? curProblem.id : '_global';
    if (!aiChatsMap[pid]) aiChatsMap[pid] = [];
    aiChatsMap[pid].push({ r: 'user', t: q, raw: q });
    saveAiState();
    renderAiMessages();

    const inputEl = aiPanelEl?.querySelector('#lh-ai-input');
    if (inputEl) inputEl.value = '';

    const sendBtn = aiPanelEl?.querySelector('#lh-ai-send');
    const userCode = readLeetCodeEditorCode();

    if (aiCfgState.mode === 'api' && aiCfgState.key && aiCfgState.url) {
      aiBusy = true;
      if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = '思考中…'; }
      try {
        const reply = await aiCallRemoteApi(q, curProblem, userCode);
        aiChatsMap[pid].push({ r: 'bot', t: reply, raw: reply });
      } catch (err) {
        const fallback = aiLocalReply(q, curProblem, userCode);
        aiChatsMap[pid].push({
          r: 'bot',
          t: `⚠️ 远程 API 请求失败（${err.message}），已自动切换本地助教回复：\n\n${fallback}`
        });
      } finally {
        aiBusy = false;
        if (sendBtn) { sendBtn.disabled = false; sendBtn.textContent = '发送'; }
        saveAiState();
        renderAiMessages();
      }
    } else {
      const reply = aiLocalReply(q, curProblem, userCode);
      aiChatsMap[pid].push({ r: 'bot', t: reply, raw: reply });
      saveAiState();
      renderAiMessages();
    }
  }

  function toggleAiPanel() {
    if (!aiPanelEl) {
      aiPanelEl = document.createElement('div');
      aiPanelEl.id = 'lh-ai-mask';
      aiPanelEl.innerHTML = `
        <div class="lh-ai-panel">
          <div class="lh-ai-head">
            <div class="lh-ai-title">
              <span>🤖 AI 算法助教</span>
              <span class="lh-ai-mode-badge" id="lh-ai-mode-badge">本地助教</span>
            </div>
            <div class="lh-ai-head-btns">
              <button type="button" class="lh-ai-icon-btn" id="lh-ai-side-btn" title="切换左侧/右侧停靠">⇄ 换边</button>
              <button type="button" class="lh-ai-icon-btn" id="lh-ai-cfg-btn" title="配置 DeepSeek / OpenAI API">⚙️ API</button>
              <button type="button" class="lh-ai-icon-btn" id="lh-ai-clear-btn" title="清空当前对话">🗑️</button>
              <button type="button" class="lh-ai-icon-btn" id="lh-ai-close-btn" title="关闭 (Alt+A)">✕</button>
            </div>
          </div>
          <div class="lh-ai-cfg" id="lh-ai-cfg">
            <div class="lh-ai-cfg-row">
              <label>模式</label>
              <select id="lh-ai-mode-sel">
                <option value="local">本地零配置助教（免费秒回）</option>
                <option value="api">外部大模型 API（DeepSeek/OpenAI）</option>
              </select>
            </div>
            <div class="lh-ai-cfg-row">
              <label>预设</label>
              <select id="lh-ai-preset-sel">
                <option value="deepseek">DeepSeek</option>
                <option value="openai">OpenAI</option>
                <option value="ark">火山引擎 Ark</option>
                <option value="custom">自定义兼容接口</option>
              </select>
            </div>
            <div class="lh-ai-cfg-row">
              <label>BaseURL</label>
              <input type="text" id="lh-ai-url-in" placeholder="https://api.deepseek.com/v1">
            </div>
            <div class="lh-ai-cfg-row">
              <label>API Key</label>
              <input type="password" id="lh-ai-key-in" placeholder="sk-...">
            </div>
            <div class="lh-ai-cfg-row">
              <label>Model</label>
              <input type="text" id="lh-ai-model-in" placeholder="deepseek-chat">
            </div>
            <div style="display:flex;justify-content:flex-end;">
              <button type="button" id="lh-ai-cfg-save" style="background:#0E8F6F;border:none;color:#FFF;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:12px;">保存配置</button>
            </div>
          </div>
          <div class="lh-ai-quick">
            <button type="button" class="lh-ai-qchip" data-q="给点思路">💡 给点思路</button>
            <button type="button" class="lh-ai-qchip" data-q="帮我查错">🔍 帮我查错</button>
            <button type="button" class="lh-ai-qchip" data-q="这题有哪些避坑点">⚠️ 避坑指南</button>
            <button type="button" class="lh-ai-qchip" data-q="时间空间复杂度是多少">⏱️ 复杂度</button>
            <button type="button" class="lh-ai-qchip" data-q="看看灵神参考代码">🧠 参考代码</button>
          </div>
          <div class="lh-ai-msgs" id="lh-ai-msgs"></div>
          <div class="lh-ai-input-bar">
            <textarea id="lh-ai-input" placeholder="问我思路、边界或贴报错（Enter 发送）..."></textarea>
            <button type="button" class="lh-ai-send-btn" id="lh-ai-send">发送</button>
          </div>
        </div>
      `;
      document.body.appendChild(aiPanelEl);

      // 绑定事件
      aiPanelEl.querySelector('#lh-ai-close-btn')?.addEventListener('click', () => aiPanelEl.classList.remove('on'));
      aiPanelEl.querySelector('#lh-ai-side-btn')?.addEventListener('click', () => {
        aiCfgState.side = aiCfgState.side === 'right' ? 'left' : 'right';
        aiPanelEl.classList.toggle('right-side', aiCfgState.side === 'right');
        saveAiState();
      });
      aiPanelEl.querySelector('#lh-ai-cfg-btn')?.addEventListener('click', () => {
        aiPanelEl.querySelector('#lh-ai-cfg')?.classList.toggle('on');
      });
      aiPanelEl.querySelector('#lh-ai-clear-btn')?.addEventListener('click', () => {
        const pid = curProblem ? curProblem.id : '_global';
        aiChatsMap[pid] = [];
        saveAiState();
        renderAiMessages();
      });
      aiPanelEl.querySelector('#lh-ai-preset-sel')?.addEventListener('change', (e) => {
        const p = AI_PRESETS[e.target.value];
        if (p && p.url) {
          aiPanelEl.querySelector('#lh-ai-url-in').value = p.url;
          aiPanelEl.querySelector('#lh-ai-model-in').value = p.model;
        }
      });
      aiPanelEl.querySelector('#lh-ai-cfg-save')?.addEventListener('click', () => {
        aiCfgState.mode = aiPanelEl.querySelector('#lh-ai-mode-sel').value;
        aiCfgState.preset = aiPanelEl.querySelector('#lh-ai-preset-sel').value;
        aiCfgState.url = aiPanelEl.querySelector('#lh-ai-url-in').value.trim();
        aiCfgState.key = aiPanelEl.querySelector('#lh-ai-key-in').value.trim();
        aiCfgState.model = aiPanelEl.querySelector('#lh-ai-model-in').value.trim();
        saveAiState();
        aiPanelEl.querySelector('#lh-ai-mode-badge').textContent = aiCfgState.mode === 'api' ? `API · ${aiCfgState.model}` : '本地助教';
        aiPanelEl.querySelector('#lh-ai-cfg')?.classList.remove('on');
      });
      aiPanelEl.querySelectorAll('.lh-ai-qchip').forEach(btn => {
        btn.addEventListener('click', () => sendAiMessage(btn.getAttribute('data-q')));
      });
      aiPanelEl.querySelector('#lh-ai-send')?.addEventListener('click', () => {
        sendAiMessage(aiPanelEl.querySelector('#lh-ai-input')?.value);
      });
      aiPanelEl.querySelector('#lh-ai-input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendAiMessage(e.target.value);
        }
      });
    }

    // 同步配置 UI 状态
    aiPanelEl.classList.toggle('right-side', aiCfgState.side === 'right');
    aiPanelEl.querySelector('#lh-ai-mode-sel').value = aiCfgState.mode || 'local';
    aiPanelEl.querySelector('#lh-ai-preset-sel').value = aiCfgState.preset || 'deepseek';
    aiPanelEl.querySelector('#lh-ai-url-in').value = aiCfgState.url || '';
    aiPanelEl.querySelector('#lh-ai-key-in').value = aiCfgState.key || '';
    aiPanelEl.querySelector('#lh-ai-model-in').value = aiCfgState.model || '';
    aiPanelEl.querySelector('#lh-ai-mode-badge').textContent = aiCfgState.mode === 'api' ? `API · ${aiCfgState.model}` : '本地助教';

    aiPanelEl.classList.toggle('on');
    if (aiPanelEl.classList.contains('on')) {
      renderAiMessages();
    }
  }

  // ------------------------------------------------------------------
  // 快捷键支持 (Alt+← / Alt+→ 切题, Alt+S 唤起大纲)
  // ------------------------------------------------------------------
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (!e.altKey && e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.altKey) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextProb = getNeighborProblem(1);
          if (nextProb) jumpToProblem(nextProb);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevProb = getNeighborProblem(-1);
          if (prevProb) jumpToProblem(prevProb);
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          toggleDrawer();
        } else if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          toggleAiPanel();
        } else if (e.key.toLowerCase() === 'm') {
          e.preventDefault();
          openCurrentMindset();
        } else if (e.key.toLowerCase() === 'd') {
          e.preventDefault();
          if (workbenchEl && workbenchEl.classList.contains('on')) {
            closeWorkbench();
          } else {
            openWorkbench(curProblem, 'lingshen', !!(modalEl && modalEl.classList.contains('on')));
          }
        }
      } else if (workbenchEl && workbenchEl.classList.contains('on')) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); wbStep(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); wbStep(1); }
        else if (e.key === ' ') { e.preventDefault(); wbTogglePlay(); }
        else if (e.key === 'Escape') { e.preventDefault(); closeWorkbench(); }
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ------------------------------------------------------------------
  // 初始化与 URL 监听
  // ------------------------------------------------------------------
  function updateStateFromUrl() {
    const slug = getProblemSlug();
    if (slug === currentSlug && curProblem) return;
    currentSlug = slug;
    curProblem = findProblemBySlug(slug);

    renderPlanBar();
    if (isDrawerOpen) renderDrawer();
  }

  function init() {
    loadState();
    updateStateFromUrl();
    observeLeetCodeSubmissions();
    setupKeyboardShortcuts();
    setInterval(updateStateFromUrl, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
