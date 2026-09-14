const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const oldCode = `    card.onclick = () => {
      if (p2pFormat === 'single') {
        p2pSelectedMonsters = [idx];
      } else {
        const existIdx = p2pSelectedMonsters.indexOf(idx);
        if (existIdx !== -1) {
          p2pSelectedMonsters.splice(existIdx, 1);
        } else {
          if (p2pSelectedMonsters.length < 3) {
            p2pSelectedMonsters.push(idx);
          } else {
            alert('チームメンバーは最大3体まで選択可能です。');
            return;
          }
        }
      }
      renderP2PMonsterSelection();
      updateP2PMonsterNextBtn();
    };`;

const newCode = `    card.onclick = () => {
      if(window.soundManager && typeof window.soundManager.playSE==='function'){try{playSE('./SE1/senntaku_kettei.mp3');}catch(e){}}
      setTimeout(() => {
        if (p2pFormat === 'single') {
          p2pSelectedMonsters = [idx];
        } else {
          const existIdx = p2pSelectedMonsters.indexOf(idx);
          if (existIdx !== -1) {
            p2pSelectedMonsters.splice(existIdx, 1);
          } else {
            if (p2pSelectedMonsters.length < 3) {
              p2pSelectedMonsters.push(idx);
            } else {
              alert('チームメンバーは最大3体まで選択可能です。');
              return;
            }
          }
        }
        renderP2PMonsterSelection();
        updateP2PMonsterNextBtn();
      }, 500);
    };`;

if (html.includes(oldCode)) {
  html = html.replace(oldCode, newCode);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully replaced P2P card onclick with SE + 0.5s delay!');
} else {
  console.log('oldCode string match failed');
}
