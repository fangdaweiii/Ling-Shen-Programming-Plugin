const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let sideHtml = indexHtml.replace('</title>', ' · 力扣侧边栏助教</title>');
sideHtml = sideHtml.replace(
  '<script src="js/app.js"></script>',
  '<script src="js/app.js"></script>\n  <script src="js/sidepanel_sync.js"></script>'
);

fs.writeFileSync(path.join(root, 'sidepanel.html'), sideHtml, 'utf8');
console.log('Successfully created sidepanel.html!');
