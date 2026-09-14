const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\r\n');

const skillIdx = lines.findIndex(l => l.includes("} else if (cmd === 'skill') {"));

console.log('Skill branch found at line:', skillIdx + 1);

const oldSkillBlockStart = lines.slice(skillIdx, skillIdx + 18).join('\r\n');

const newSkillBlockStart = `  } else if (cmd === 'skill') {
    playSkillCutin(actorSide, actor.skill, () => {
      actor.mp = Math.max(0, (actor.mp || 0) - 8);
      setMp(actorSide, actor);
      const sk = actor.skill;
      // Reveal enemy skill on first use
      if (actor === eState && !actor.skillRevealed && sk !== 'none' && SKILLS[sk]) {
        actor.skillRevealed = true;
        const enemySkillEl = document.getElementById('enemy-skill-name');
        if (enemySkillEl) {
          enemySkillEl.textContent = SKILLS[sk].icon + ' ' + SKILLS[sk].name;
          enemySkillEl.classList.remove('glitch-text');
          enemySkillEl.removeAttribute('data-text');
        }
        addLog('💡 ' + actor.name + ' の隠された技が判明！ ➔ ' + SKILLS[sk].icon + ' 『' + SKILLS[sk].name + '』', 'log-crit');
      }

      oppLastActiveSkill(target, sk); // Store last skill for copycat
      addLog('✨ ' + actor.name + ' の『' + ((SKILLS[sk]||SKILLS.none).name) + '』！（MP -8 / MP:' + actor.mp + '）', 'log-skill');`;

lines.splice(skillIdx, 18, newSkillBlockStart);

// Find end of executeSingleAction to close playSkillCutin callback
const actionEndIdx = lines.findIndex((l, idx) => idx > skillIdx && l === '    onComplete();' && lines[idx+1] === '  });');

console.log('Closing playSkillCutin callback before line:', actionEndIdx + 1);

lines.splice(actionEndIdx + 1, 0, '    }); // End playSkillCutin callback');

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log('Successfully wired playSkillCutin to skill execution!');
