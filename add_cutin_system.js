const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\r\n');

// 1. CSS for Cut-in Effect
const cutinCSS = `
    /* Cut-in Overlay & Animations */
    .cutin-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      z-index: 10000;
      overflow: hidden;
      pointer-events: none;
    }
    .cutin-background {
      position: absolute;
      width: 160%;
      height: 35%;
      background: linear-gradient(90deg, rgba(0,0,0,0.9), rgba(15,23,42,0.95), rgba(0,0,0,0.9));
      border-top: 3px solid var(--accent-gold);
      border-bottom: 3px solid var(--accent-gold);
      box-shadow: 0 0 30px rgba(245,158,11,0.5);
      transform: rotate(-12deg);
      opacity: 0;
    }
    .cutin-overlay.active .cutin-background {
      animation: bg-in-out 0.65s ease-out forwards;
    }
    .cutin-image-wrap {
      position: absolute;
      width: 100%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-12deg);
      opacity: 0;
      overflow: hidden;
    }
    .cutin-overlay.active .cutin-image-wrap {
      animation: image-slide-in 0.35s 0.05s ease-out forwards;
    }
    .cutin-image {
      max-height: 180px;
      object-fit: contain;
      filter: drop-shadow(0 0 15px rgba(245,158,11,0.8)) contrast(1.2);
    }
    .cutin-text {
      position: absolute;
      bottom: 22%;
      font-size: 32px;
      font-weight: 900;
      color: #fff;
      text-shadow: 0 0 15px rgba(245,158,11,0.9), 2px 2px 4px #000;
      letter-spacing: 3px;
      background: linear-gradient(90deg, rgba(245,158,11,0.2), rgba(0,0,0,0.8), rgba(245,158,11,0.2));
      padding: 6px 28px;
      border-radius: 20px;
      border: 1px solid var(--accent-gold);
      opacity: 0;
    }
    .cutin-overlay.active .cutin-text {
      animation: text-fade-in 0.4s 0.15s ease-out forwards;
    }

    @keyframes bg-in-out {
      0% { opacity: 0; transform: rotate(-12deg) scaleY(0.1); }
      15% { opacity: 0.95; transform: rotate(-12deg) scaleY(1); }
      80% { opacity: 0.95; transform: rotate(-12deg) scaleY(1); }
      100% { opacity: 0; transform: rotate(-12deg) scaleY(0); }
    }
    @keyframes image-slide-in {
      0% { transform: translateX(-100%) rotate(-12deg); opacity: 0; }
      100% { transform: translateX(0%) rotate(-12deg); opacity: 1; }
    }
    @keyframes text-fade-in {
      0% { opacity: 0; transform: translateY(20px) scale(0.9); }
      100% { opacity: 1; transform: translateY(0px) scale(1); }
    }
`;

const styleEndIdx = lines.findIndex(l => l.includes('</style>'));
lines.splice(styleEndIdx, 0, cutinCSS);

// 2. Add Cut-in HTML Overlay inside #battle-screen (inside battle-wrapper-169)
const cutinHTML = [
  '    <!-- SKILL CUT-IN OVERLAY -->',
  '    <div id="cutin-overlay" class="cutin-overlay hidden">',
  '      <div class="cutin-background"></div>',
  '      <div class="cutin-image-wrap">',
  '        <div id="cutin-image-container"></div>',
  '      </div>',
  '      <div class="cutin-text" id="cutin-skill-text">【瞬殺の魔眼】</div>',
  '    </div>'
];

const battleHeaderIdx = lines.findIndex(l => l.includes('class="battle-marquee-header"'));
lines.splice(battleHeaderIdx, 0, ...cutinHTML);

// 3. Add JS function playSkillCutin(actorSide, skillId, callback)
const cutinJS = [
  'function playSkillCutin(actorSide, skillId, callback) {',
  '  const overlay = document.getElementById("cutin-overlay");',
  '  const imgContainer = document.getElementById("cutin-image-container");',
  '  const textEl = document.getElementById("cutin-skill-text");',
  '  if (!overlay || !imgContainer || !textEl) { callback(); return; }',
  '  ',
  '  const actorState = (actorSide === "p" ? pState : eState);',
  '  const actorMon = (actorSide === "p" ? activeLabMonsters[selBattle] : currentEnemy);',
  '  const sk = SKILLS[skillId] || SKILLS.none;',
  '  ',
  '  const monName = (actorMon && (actorMon.monsterClass || actorMon.name)) || (actorState && actorState.name) || "";',
  '  const sysType = (actorMon && actorMon.systemType) || "";',
  '  ',
  '  if (actorSide === "e" && currentEnemy) {',
  '    imgContainer.innerHTML = getEnemyImageHTML(currentEnemy);',
  '  } else {',
  '    imgContainer.innerHTML = getMonsterVisualHTML(monName, sysType, "160px");',
  '  }',
  '  ',
  '  textEl.textContent = sk.icon + " 【" + sk.name + "】";',
  '  ',
  '  // Play slash SE',
  '  if (window.soundManager && typeof window.soundManager.playSE === "function") {',
  '    try { playSE("./SE1/kaisin.mp3"); } catch(e) {}',
  '  }',
  '  ',
  '  // Trigger animation',
  '  overlay.classList.remove("hidden");',
  '  overlay.classList.remove("active");',
  '  void overlay.offsetWidth; // force reflow',
  '  overlay.classList.add("active");',
  '  ',
  '  setTimeout(() => {',
  '    overlay.classList.remove("active");',
  '    overlay.classList.add("hidden");',
  '    callback();',
  '  }, 650);',
  '}'
];

const checkEndIdx = lines.findIndex(l => l.includes('function executeSingleAction('));
lines.splice(checkEndIdx, 0, ...cutinJS);

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log('Added cutin HTML, CSS, and JS helper!');
