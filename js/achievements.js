/* achievements.js - 成就勋章系统 */
var ACHIEVEMENTS = [
  { id: 'first_ac', name: '初露锋芒', desc: '第一次成功通过一道题目', icon: '🎯', check: function() { return solvedCount() >= 1; } },
  { id: 'streak_3', name: '乘胜追击', desc: '连续刷题打卡达到 3 天', icon: '🔥', check: function() { return streak() >= 3; } },
  { id: 'streak_7', name: '持之以恒', desc: '连续刷题打卡达到 7 天', icon: '⚡', check: function() { return streak() >= 7; } },
  { id: 'ac_10', name: '渐入佳境', desc: '累计攻克 10 道算法题目', icon: '🛡️', check: function() { return solvedCount() >= 10; } },
  { id: 'ac_25', name: '身经百战', desc: '累计攻克 25 道算法题目', icon: '⚔️', check: function() { return solvedCount() >= 25; } },
  { id: 'mod_clear', name: '模块专家', desc: '完整通关任意一个算法模块', icon: '👑', check: function() {
      return MODULES.some(function(m) { return modDone(m.id); });
    }
  },
  { id: 'one_pass', name: '一发入魂', desc: '有一道题第一次提交就直接通过 (AC)', icon: '🌟', check: function() {
      return Object.keys(ST.ac).some(function(id) { return ST.tries[id] === 1; });
    }
  },
  { id: 'review_master', name: '温故知新', desc: '完成至少 1 道错题的回炉复习并通过', icon: '📚', check: function() {
      return Object.keys(ST.review || {}).some(function(id) { return ST.ac[id] && ST.review[id].stage > 0; });
    }
  },
  { id: 'diff_3', name: '硬核挑战', desc: '成功解出一道 3 星高难度题目', icon: '💎', check: function() {
      return Object.keys(ST.ac).some(function(id) {
        var p = probById(id); return p && p.diff >= 3;
      });
    }
  },
  { id: 'all_modules', name: '全能通晓', desc: '在每个已开放的模块中都至少解出一道题', icon: '🏆', check: function() {
      return MODULES.every(function(m) {
        var ps = probsOf(m.id);
        if (!ps.length) return true;
        return ps.some(function(p) { return ST.ac[p.id]; });
      });
    }
  },
  { id: 'newbie_graduate', name: '通关新手村', desc: '攻克灵神新手村 7 大核心阶段（Stage 0~7 各至少通过 1 题）', icon: '🌱', check: function() {
      var newbieStages = ['Stage 0', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'Stage 6', 'Stage 7'];
      return newbieStages.every(function(stg) {
        var mods = MODULES.filter(function(m) { return m.stage === stg; });
        return mods.some(function(m) {
          var ps = probsOf(m.id);
          return ps.some(function(p) { return ST.ac[p.id]; });
        });
      });
    }
  },
  { id: 'hot100_pioneer', name: 'Hot 100 标杆', desc: '累计攻克至少 10 道 LeetCode Hot 100 必刷经典题', icon: '🔥', check: function() {
      var hotSolved = 0;
      Object.keys(ST.ac).forEach(function(id) {
        var p = probById(id);
        if (p && p.hot100) hotSolved++;
      });
      return hotSolved >= 10;
    }
  }
];

function checkAchievements() {
  ST.achieved = ST.achieved || {};
  ACHIEVEMENTS.forEach(function(a) {
    if (!ST.achieved[a.id] && a.check()) {
      ST.achieved[a.id] = Date.now();
      toast('🎉 获得成就：【' + a.name + '】' + a.desc);
    }
  });
}

function openBadgeModal() {
  checkAchievements();
  var mask = $('badgeMask');
  if (!mask) return;
  var body = $('badgeBody');
  var html = '<div class="badgeGrid">';
  var unlockedCount = 0;
  ACHIEVEMENTS.forEach(function(a) {
    var got = !!(ST.achieved && ST.achieved[a.id]);
    if (got) unlockedCount++;
    html += '<div class="badgeCard ' + (got ? 'on' : 'locked') + '">' +
      '<div class="bIcon">' + a.icon + '</div>' +
      '<div class="bInfo">' +
      '<b class="bName">' + escHtml(a.name) + (got ? ' <span class="bTag">已解锁</span>' : ' <span class="bTag lock">未解锁</span>') + '</b>' +
      '<p class="bDesc">' + escHtml(a.desc) + '</p>' +
      '</div></div>';
  });
  html += '</div>';
  $('badgeSum').textContent = '已解锁 ' + unlockedCount + ' / ' + ACHIEVEMENTS.length + ' 个勋章';
  body.innerHTML = html;
  mask.classList.add('on');
}

function closeBadgeModal() {
  var mask = $('badgeMask');
  if (mask) mask.classList.remove('on');
}

/* 知识卡片面板渲染 */