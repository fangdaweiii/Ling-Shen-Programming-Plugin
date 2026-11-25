/* complexity.js - 复杂度互动自测训练组件 */
function renderComplexityQuiz(p) {
  var id = p.id;
  return '<div class="cplxCard" id="cplxBox_' + id + '">' +
    '<div class="cplxHead"><span>🧠 复杂度挑战 · 这道题你的解法时间/空间复杂度是多少？</span></div>' +
    '<div class="cplxRow">' +
    '<span class="lab">时间:</span>' +
    '<div class="cplxOpts" data-type="time">' +
    '<button type="button" class="btn sm" data-val="O(1)">O(1)</button>' +
    '<button type="button" class="btn sm" data-val="O(log n)">O(log n)</button>' +
    '<button type="button" class="btn sm" data-val="O(n)">O(n)</button>' +
    '<button type="button" class="btn sm" data-val="O(n log n)">O(n log n)</button>' +
    '<button type="button" class="btn sm" data-val="O(n^2)">O(n²)</button>' +
    '</div></div>' +
    '<div class="cplxRow" style="margin-top:6px">' +
    '<span class="lab">空间:</span>' +
    '<div class="cplxOpts" data-type="space">' +
    '<button type="button" class="btn sm" data-val="O(1)">O(1)</button>' +
    '<button type="button" class="btn sm" data-val="O(log n)">O(log n)</button>' +
    '<button type="button" class="btn sm" data-val="O(n)">O(n)</button>' +
    '</div></div>' +
    '<div class="cplxAct" style="margin-top:9px">' +
    '<button class="btn sm primary" type="button" id="cplxSubmitBtn">核对复杂度</button>' +
    '</div>' +
    '<div class="cplxAns" id="cplxAns" style="display:none;margin-top:8px"></div>' +
    '</div>';
}

function wireComplexityQuiz(p) {
  var box = $('cplxBox_' + p.id);
  if (!box) return;
  var selTime = '', selSpace = '';
  Array.prototype.forEach.call(box.querySelectorAll('[data-type="time"] button'), function(b) {
    b.addEventListener('click', function() {
      Array.prototype.forEach.call(box.querySelectorAll('[data-type="time"] button'), function(x) { x.classList.remove('primary'); });
      b.classList.add('primary');
      selTime = b.getAttribute('data-val');
    });
  });
  Array.prototype.forEach.call(box.querySelectorAll('[data-type="space"] button'), function(b) {
    b.addEventListener('click', function() {
      Array.prototype.forEach.call(box.querySelectorAll('[data-type="space"] button'), function(x) { x.classList.remove('primary'); });
      b.classList.add('primary');
      selSpace = b.getAttribute('data-val');
    });
  });
  var subBtn = box.querySelector('#cplxSubmitBtn');
  if (subBtn) {
    subBtn.addEventListener('click', function() {
      if (!selTime && !selSpace) { toast('请先选出你估计的时间或空间复杂度'); return; }
      var ansEl = box.querySelector('#cplxAns');
      ansEl.style.display = 'block';
      ansEl.innerHTML = '<div class="cplxRes"><b>标准理论分析：</b>' + escHtml(p.complexity || '参见题解说明') + '</div>' +
        '<div class="tiny" style="color:var(--mint);margin-top:4px">💡 你的选择：时间 ' + (selTime || '未选') + ' · 空间 ' + (selSpace || '未选') + '</div>';
    });
  }
}


/* 题库查询辅助 */