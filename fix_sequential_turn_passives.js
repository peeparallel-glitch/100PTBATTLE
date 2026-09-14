const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Move Turn 1 passive trigger to executeTurnActions BEFORE any action starts, and wait for completion
const oldExecuteTurnActions = `function executeTurnActions(pCmd, eCmd, playerFirst) {
  const actions = playerFirst 
    ? [ { side: 'p', cmd: pCmd, otherCmd: eCmd }, { side: 'e', cmd: eCmd, otherCmd: pCmd } ]
    : [ { side: 'e', cmd: eCmd, otherCmd: pCmd }, { side: 'p', cmd: pCmd, otherCmd: eCmd } ];

  executeSingleAction(actions[0].side, actions[0].cmd, actions[1].side, actions[1].cmd, () => {`;

const newExecuteTurnActions = `function executeTurnActions(pCmd, eCmd, playerFirst) {
  const actions = playerFirst 
    ? [ { side: 'p', cmd: pCmd, otherCmd: eCmd }, { side: 'e', cmd: eCmd, otherCmd: pCmd } ]
    : [ { side: 'e', cmd: eCmd, otherCmd: pCmd }, { side: 'p', cmd: pCmd, otherCmd: eCmd } ];

  const startTurnActions = () => {
    executeSingleAction(actions[0].side, actions[0].cmd, actions[1].side, actions[1].cmd, () => {
      if (pState.cur > 0 && eState.cur > 0) {
        executeSingleAction(actions[1].side, actions[1].cmd, actions[0].side, actions[0].cmd, () => {
          if (pState.cur > 0 && eState.cur > 0) {
            const t = setTimeout(() => nextTurn(), delay(400));
            activeTimers.push(t);
          } else {
            const t = setTimeout(() => checkBattleEnd(), delay(400));
            activeTimers.push(t);
          }
        });
      } else {
        const t = setTimeout(() => checkBattleEnd(), delay(400));
        activeTimers.push(t);
      }
    });
  };

  // Turn 1 Passives: evaluated ONCE at turn start in order of speed before any attack/action starts
  if (currentTurn === 1 && !pState._turn1PassiveChecked && !eState._turn1PassiveChecked) {
    pState._turn1PassiveChecked = true;
    eState._turn1PassiveChecked = true;
    const pSpd = getEffectiveSpeed(pState);
    const eSpd = getEffectiveSpeed(eState);
    const pFirst = pSpd > eSpd || (pSpd === eSpd && pState.luck >= eState.luck);
    const firstActor = pFirst ? { side: "p", state: pState, oppSide: "e", oppState: eState } : { side: "e", state: eState, oppSide: "p", oppState: pState };
    const secondActor = pFirst ? { side: "e", state: eState, oppSide: "p", oppState: pState } : { side: "p", state: pState, oppSide: "e", oppState: eState };
    
    checkAutoPassiveTrigger(firstActor.side, firstActor.state, firstActor.oppSide, firstActor.oppState, () => {
      checkAutoPassiveTrigger(secondActor.side, secondActor.state, secondActor.oppSide, secondActor.oppState, () => {
        startTurnActions();
      });
    });
  } else {
    startTurnActions();
  }
}`;

if (html.includes(oldExecuteTurnActions)) {
  // We need to replace the entire executeTurnActions function up to line 8717
  const lines = html.split('\r\n');
  const startIdx = lines.findIndex(l => l.includes('function executeTurnActions(pCmd, eCmd, playerFirst) {'));
  lines.splice(startIdx, 22, ...newExecuteTurnActions.split('\r\n'));
  html = lines.join('\r\n');
  console.log('Successfully updated executeTurnActions!');
}

// 2. Remove Turn 1 passive trigger inside _execSingleActionInner so it doesn't run again during action 1 or action 2
const oldT1InSingleAction = `  // Turn 1 passive trigger: evaluated in order of speed (faster first, then slower) without duplication
  if (currentTurn === 1 && !pState._turn1PassiveChecked && !eState._turn1PassiveChecked) {
    pState._turn1PassiveChecked = true;
    eState._turn1PassiveChecked = true;
    const pSpd = getEffectiveSpeed(pState);
    const eSpd = getEffectiveSpeed(eState);
    const pFirst = pSpd > eSpd || (pSpd === eSpd && pState.luck >= eState.luck);
    const firstActor = pFirst ? { side: "p", state: pState, oppSide: "e", oppState: eState } : { side: "e", state: eState, oppSide: "p", oppState: pState };
    const secondActor = pFirst ? { side: "e", state: eState, oppSide: "p", oppState: pState } : { side: "p", state: pState, oppSide: "e", oppState: eState };
    
    checkAutoPassiveTrigger(firstActor.side, firstActor.state, firstActor.oppSide, firstActor.oppState, () => {
      checkAutoPassiveTrigger(secondActor.side, secondActor.state, secondActor.oppSide, secondActor.oppState);
    });
  }`;

if (html.includes(oldT1InSingleAction)) {
  html = html.replace(oldT1InSingleAction, '');
  console.log('Successfully removed inner Turn 1 passive check from _execSingleActionInner!');
}

fs.writeFileSync(filePath, html, 'utf8');
