const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\r\n');

// Restore OP screen HTML right after <body> (line 3236)
const opScreenHTML = [
  '<!-- OP（オープニング）画面（フルスクリーン表示） -->',
  '<div id="op-screen" style="position: absolute; inset: 0; width: 100%; height: 100%; background: #000; z-index: 20000; overflow: hidden; cursor: pointer; user-select: none;">',
  '  <!-- OP背景フルスクリーン画像 -->',
  '  <img id="op-image" src="./IMGTITLE/OP IMG.jpg" alt="OP Image" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;">',
  '  <!-- ゆっくり点滅するスタートテキスト -->',
  '  <div id="op-start-text" class="blink-start-text" style="position: absolute; bottom: 18%; left: 50%; transform: translateX(-50%); color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: 3px; text-shadow: 0 0 12px #00d2ff, 0 0 20px #000, 2px 2px 4px #000; white-space: nowrap; z-index: 10;">',
  '    - PRESS TAP TO START -',
  '  </div>',
  '</div>'
];

const bodyIdx = lines.findIndex(l => l.includes('<!-- ============ MONSTER SELECT MODAL'));
console.log('Found body modal start at line:', bodyIdx + 1);

lines.splice(bodyIdx, 0, ...opScreenHTML);

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log('Successfully restored OP screen HTML!');
