const fs = require('fs');
const vm = require('vm');

const modulesCode = fs.readFileSync('./data/modules.js', 'utf-8');
const problemsCode = fs.readFileSync('./data/problems.js', 'utf-8');
const interpreterCode = fs.readFileSync('./js/interpreter.js', 'utf-8');

const s = { window: {}, console: console };
vm.runInNewContext(modulesCode + '\n' + problemsCode + '\n' + interpreterCode, s);

console.log('analyze function type:', typeof s.analyze);

const p0 = s.PROBLEMS[0];
console.log('Problem 0:', p0.lcNum, p0.title);
console.log('p0 ref code:\n' + p0.ref.join('\n'));

function preprocessTest(src) {
  var s = String(src).replace(/\r/g, '');
  var helpers = [];
  s = s.replace(/auto\s+([a-zA-Z0-9_]+)\s*=\s*\[[^\]]*\]\s*\(([^)]*)\)\s*(?:->\s*([^{]+))?\s*\{([^}]*)\}\s*;/g, function(match, name, params, ret, body) {
    var retType = ret ? ret.trim() : 'bool';
    helpers.push(retType + ' ' + name + '(' + params + ') {' + body + '}');
    return '// extracted helper ' + name;
  });
  if (helpers.length > 0) {
    s = helpers.join('\n') + '\n' + s;
  }
  return s;
}

const origCode = p0.ref.join('\n');
const processed = preprocessTest(origCode);
console.log('Processed code:\n' + processed);

try {
  const res3 = s.analyze(processed, '"abciiidef"|3');
  console.log('Processed lambda analyze steps:', res3 ? (res3.steps ? res3.steps.length : 'no steps') : 'null');
  if (res3 && res3.error) console.log('Processed lambda error:', res3.error);
} catch (e) {
  console.log('Processed lambda caught error:', e.message);
}



// Let's test a problem with simple pointers (e.g. reverse list 206)
const p206 = s.PROBLEMS.find(p => p.lcNum === 206);
if (p206) {
  console.log('Problem 206:', p206.title);
  try {
    const res2 = s.analyze(p206.ref.join('\n'), '[1,2,3,4,5]');
    console.log('p206 analyze steps:', res2 ? (res2.steps ? res2.steps.length : 'no steps') : 'null');
    if (res2 && res2.error) console.log('p206 error:', res2.error);
  } catch (e) {
    console.log('p206 caught error:', e.message);
  }
}
