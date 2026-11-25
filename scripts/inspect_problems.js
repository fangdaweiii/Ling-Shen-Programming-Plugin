const fs = require('fs');
const content = fs.readFileSync('D:/CodeTeacher/data/problems.js', 'utf8');
const vm = require('vm');
const sandbox = { PROBLEMS: [] };
vm.createContext(sandbox);
vm.runInContext(content, sandbox);
sandbox.PROBLEMS.forEach((p, i) => {
  console.log((i+1) + '. [' + p.mod + '] id:' + p.id + ' | ' + p.lc + ' | diff:' + p.diff + ' | ' + p.title);
});
