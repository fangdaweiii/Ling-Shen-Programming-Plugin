/* share.js - 学习打卡战报卡片生成器 */
var QUOTES = [
  '路虽远，行则将至；事虽难，做则必成。',
  '每天一道算法题，面试从容不破。',
  '复杂的问题，由一个个清晰的子问题构筑。',
  '思维的深度，决定了代码的广度。',
  '没有一次通过的侥幸，只有千百次调试的从容。'
];

function openShareCard() {
  var mask = $('shareMask');
  if (!mask) return;
  mask.classList.add('on');
  drawShareCanvas();
}

function closeShareCard() {
  var mask = $('shareMask');
  if (mask) mask.classList.remove('on');
}

function drawShareCanvas() {
  var cvs = $('shareCanvas');
  if (!cvs) return;
  var ctx = cvs.getContext('2d');
  var W = cvs.width, H = cvs.height;
  
  // 背景渐变
  var grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#091916');
  grad.addColorStop(0.5, '#0C201C');
  grad.addColorStop(1, '#05100E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  
  // 装饰微光
  ctx.strokeStyle = 'rgba(110, 212, 183, 0.18)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, W - 40, H - 40);
  
  // 标题
  ctx.fillStyle = '#6ED4B7';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText('算法训练台 · 学习打卡', 44, 70);
  
  ctx.fillStyle = '#8FA9A2';
  ctx.font = '13px monospace';
  var now = new Date();
  var dateStr = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 · 坚持打卡第 ' + streak() + ' 天';
  ctx.fillText(dateStr, 44, 102);
  
  // 分隔线
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.moveTo(44, 125);
  ctx.lineTo(W - 44, 125);
  ctx.stroke();
  
  // 数据卡片网格
  var stats = [
    { label: '已解题数', val: solvedCount() + ' 题' },
    { label: '连续天数', val: streak() + ' 天' },
    { label: '一次通过率', val: $('stRate').textContent },
    { label: '累计提交', val: $('stTry').textContent + ' 次' }
  ];
  
  stats.forEach(function(s, idx) {
    var x = 44 + (idx % 2) * 260;
    var y = 150 + Math.floor(idx / 2) * 90;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.fillRect(x, y, 240, 72);
    ctx.strokeStyle = 'rgba(110, 212, 183, 0.15)';
    ctx.strokeRect(x, y, 240, 72);
    
    ctx.fillStyle = '#6ED4B7';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(s.val, x + 16, y + 36);
    
    ctx.fillStyle = '#8FA9A2';
    ctx.font = '12px sans-serif';
    ctx.fillText(s.label, x + 16, y + 58);
  });
  
  // 当前正在攻坚的题目
  ctx.fillStyle = '#F2A64D';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('⚡ 今日攻坚题目', 44, 370);
  
  ctx.fillStyle = '#E6F1ED';
  ctx.font = 'bold 20px sans-serif';
  var curTitle = CUR ? (CUR.idx + '. ' + CUR.title + ' (' + CUR.lc + ' · Rating ' + (CUR.rating || 1400) + ')') : '自主进阶';
  ctx.fillText(curTitle, 44, 405);
  
  ctx.fillStyle = '#8FA9A2';
  ctx.font = '13px sans-serif';
  var curBrief = CUR ? CUR.brief.slice(0, 36) + '…' : '持之以恒，终有回响。';
  ctx.fillText(curBrief, 44, 435);
  
  // 已解锁勋章展示
  ctx.fillStyle = '#6ED4B7';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('🎖️ 荣誉勋章', 44, 490);
  
  var unlocked = ACHIEVEMENTS.filter(function(a) { return ST.achieved && ST.achieved[a.id]; });
  var badgeStr = unlocked.length ? unlocked.map(function(a) { return a.icon + ' ' + a.name; }).slice(0, 4).join('   ') : '🎯 初露锋芒 正在冲刺中';
  ctx.fillStyle = '#C9DCD6';
  ctx.font = '14px sans-serif';
  ctx.fillText(badgeStr, 44, 524);
  
  // 底部励志金句
  var quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  ctx.fillStyle = 'rgba(110, 212, 183, 0.1)';
  ctx.fillRect(44, 570, W - 88, 70);
  ctx.strokeStyle = 'rgba(110, 212, 183, 0.3)';
  ctx.strokeRect(44, 570, W - 88, 70);
  
  ctx.fillStyle = '#E6F1ED';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('“ ' + quote + ' ”', 66, 612);
  
  // 水印与签名
  ctx.fillStyle = '#5F7A73';
  ctx.font = '11px monospace';
  ctx.fillText('C++ 算法训练台 · CodeTeacher · 保持思考，终身学习', 44, 690);
}

function downloadShareImage() {
  var cvs = $('shareCanvas');
  if (!cvs) return;
  var a = document.createElement('a');
  a.download = '算法训练打卡_' + TODAY + '.png';
  a.href = cvs.toDataURL('image/png');
  a.click();
  toast('📸 打卡卡片已下载！');
}

function copyShareImage() {
  var cvs = $('shareCanvas');
  if (!cvs || !navigator.clipboard) { toast('请使用下载按钮'); return; }
  cvs.toBlob(function(blob) {
    if (!blob) return;
    try {
      var item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]).then(function() {
        toast('📋 图片已成功复制到剪贴板！');
      }).catch(function() {
        toast('请直接使用「下载打卡图片」');
      });
    } catch(e) {
      toast('浏览器拦截了图片剪贴，请点下载');
    }
  });
}

/* 7. 移动端抽屉交互 */