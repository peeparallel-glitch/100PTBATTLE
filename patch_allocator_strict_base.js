const fs = require('fs');
let t = fs.readFileSync('index.html', 'utf8');

// ================================================================
// 1. Refactor Step 1 Action in creatorNext() to set creatorTemp.stats
//    to (Basic Minimum + System Base points) and bonusLeft to 98.
// ================================================================
const oldStep1Action = `    // Copy the selected system type's base status
    const sysId = document.getElementById('creator-system-select').value;
    const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 1, attack: 1, defense: 1, speed: 1, luck: 1 } };
    
    // Initialize stats to base values and give 98 points
    creatorTemp.stats = {
      hp: Number(typeInfo.base.hp) || 1,
      attack: Number(typeInfo.base.attack) || 1,
      defense: Number(typeInfo.base.defense) || 1,
      speed: Number(typeInfo.base.speed) || 1,
      luck: Number(typeInfo.base.luck) || 1
    };
    creatorTemp.bonusLeft = 98;`;

const newStep1Action = `    // Copy the selected system type's base status and add basic minimum
    const sysId = document.getElementById('creator-system-select').value;
    const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
    
    // Minimum boundary: HP:1, ATK:1, others:0 plus system-specific base values
    const minHp = 1 + (Number(typeInfo.base.hp) || 0);
    const minAtk = 1 + (Number(typeInfo.base.attack) || 0);
    const minDef = 0 + (Number(typeInfo.base.defense) || 0);
    const minSpd = 0 + (Number(typeInfo.base.speed) || 0);
    const minLck = 0 + (Number(typeInfo.base.luck) || 0);

    creatorTemp.stats = {
      hp: minHp,
      attack: minAtk,
      defense: minDef,
      speed: minSpd,
      luck: minLck
    };
    creatorTemp.bonusLeft = 98;`;

t = t.replace(oldStep1Action, newStep1Action);

// ================================================================
// 2. Update buildCreatorStatAllocator() minimum limits
//    Set minimum boundary to (Basic Minimum + System Base points)
// ================================================================
const newAllocator = `function buildCreatorStatAllocator() {
  const container = document.getElementById('stat-allocator-container');
  container.innerHTML = '';
  
  const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  const labels = { hp: '❤️ HP', attack: '⚔️ 攻撃', defense: '🛡️ 防御', speed: '💨 素早', luck: '⭐ 運' };
  
  const sysSelect = document.getElementById('creator-system-select');
  const sysId = sysSelect ? sysSelect.value : 'dragon';
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
  
  // Enforce base limits
  statKeys.forEach(k => {
    const basicMin = (k === 'hp' || k === 'attack') ? 1 : 0;
    const minVal = basicMin + (Number(typeInfo.base[k]) || 0);
    if (creatorTemp.stats[k] < minVal) {
      creatorTemp.stats[k] = minVal;
    }
  });
  
  Object.entries(labels).forEach(([statKey, labelText]) => {
    const basicMin = (statKey === 'hp' || statKey === 'attack') ? 1 : 0;
    const minVal = basicMin + (Number(typeInfo.base[statKey]) || 0);
    
    const row = document.createElement('div');
    row.className = 'alloc-row';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'alloc-label';
    labelSpan.textContent = labelText;
    
    const controls = document.createElement('div');
    controls.className = 'alloc-controls';
    controls.style = 'display: flex; align-items: center; gap: 6px;';
    
    // -10 Button
    const minus10Btn = document.createElement('button');
    minus10Btn.className = 'alloc-btn';
    minus10Btn.style = 'width: 36px; font-size: 11px;';
    minus10Btn.textContent = '-10';
    minus10Btn.id = \`btn-minus10-\${statKey}\`;
    minus10Btn.onclick = () => {
      const current = Number(creatorTemp.stats[statKey]);
      const target = Math.max(minVal, current - 10);
      creatorTemp.stats[statKey] = target;
      updateAllocatorUI();
    };

    // -1 Button
    const minusBtn = document.createElement('button');
    minusBtn.className = 'alloc-btn';
    minusBtn.textContent = '－';
    minusBtn.id = \`btn-minus-\${statKey}\`;
    minusBtn.onclick = () => {
      const current = Number(creatorTemp.stats[statKey]);
      if (current > minVal) {
        creatorTemp.stats[statKey] = current - 1;
        updateAllocatorUI();
      }
    };
    
    // Value Label
    const valSpan = document.createElement('span');
    valSpan.className = 'alloc-value';
    valSpan.id = 'creator-alloc-val-' + statKey;
    valSpan.textContent = creatorTemp.stats[statKey];
    
    // +1 Button
    const plusBtn = document.createElement('button');
    plusBtn.className = 'alloc-btn';
    plusBtn.textContent = '＋';
    plusBtn.id = \`btn-plus-\${statKey}\`;
    plusBtn.onclick = () => {
      if (creatorTemp.bonusLeft > 0) {
        creatorTemp.stats[statKey] = Number(creatorTemp.stats[statKey]) + 1;
        updateAllocatorUI();
      }
    };

    // +10 Button
    const plus10Btn = document.createElement('button');
    plus10Btn.className = 'alloc-btn';
    plus10Btn.style = 'width: 36px; font-size: 11px;';
    plus10Btn.textContent = '+10';
    plus10Btn.id = \`btn-plus10-\${statKey}\`;
    plus10Btn.onclick = () => {
      const addAmt = Math.min(10, creatorTemp.bonusLeft);
      creatorTemp.stats[statKey] = Number(creatorTemp.stats[statKey]) + addAmt;
      updateAllocatorUI();
    };
    
    controls.appendChild(minus10Btn);
    controls.appendChild(minusBtn);
    controls.appendChild(valSpan);
    controls.appendChild(plusBtn);
    controls.appendChild(plus10Btn);
    
    row.appendChild(labelSpan);
    row.appendChild(controls);
    container.appendChild(row);

    // Visual gauge
    const gaugeWrap = document.createElement('div');
    gaugeWrap.className = 'mini-gauge-container';
    gaugeWrap.style.margin = '4px 0 10px 0';
    
    const gaugeFill = document.createElement('div');
    gaugeFill.className = 'mini-gauge-fill fill-' + (statKey === 'hp' ? 'hp' : (statKey === 'attack' ? 'atk' : (statKey === 'defense' ? 'def' : (statKey === 'speed' ? 'spd' : 'lck'))));
    gaugeFill.id = 'creator-alloc-gauge-' + statKey;
    
    gaugeWrap.appendChild(gaugeFill);
    container.appendChild(gaugeWrap);
  });
  
  updateAllocatorUI();
}`;

// We replace buildCreatorStatAllocator block
const oldAllocStart = t.indexOf('function buildCreatorStatAllocator()');
const oldUpdateUIStart = t.indexOf('function updateAllocatorUI()');

if (oldAllocStart >= 0 && oldUpdateUIStart > oldAllocStart) {
  t = t.substring(0, oldAllocStart) + newAllocator + '\n\n' + t.substring(oldUpdateUIStart);
  console.log('[2] Replaced buildCreatorStatAllocator with custom base limits.');
}

// ================================================================
// 3. Update updateAllocatorUI()
//    Deduct allocated points correctly relative to (Basic Minimum + System Base points)
// ================================================================
const newUpdateUI = `function updateAllocatorUI() {
  const statKeys = ['hp', 'attack', 'defense', 'speed', 'luck'];
  
  const sysSelect = document.getElementById('creator-system-select');
  const sysId = sysSelect ? sysSelect.value : 'dragon';
  const typeInfo = MONSTER_TYPES[sysId] || { base: { hp: 0, attack: 0, defense: 0, speed: 0, luck: 0 } };
  
  // Calculate allocated bonus points based on (currentVal - minVal)
  let allocatedPoints = 0;
  statKeys.forEach(k => {
    const basicMin = (k === 'hp' || k === 'attack') ? 1 : 0;
    const minVal = basicMin + (Number(typeInfo.base[k]) || 0);
    const currentVal = Number(creatorTemp.stats[k]);
    allocatedPoints += Math.max(0, currentVal - minVal);
  });
  
  const remaining = Math.max(0, 98 - allocatedPoints);
  creatorTemp.bonusLeft = remaining;
  
  const bonusPtsDisplay = document.getElementById('creator-bonus-pts');
  if (bonusPtsDisplay) {
    bonusPtsDisplay.textContent = remaining;
  }
  
  statKeys.forEach(statKey => {
    const basicMin = (statKey === 'hp' || statKey === 'attack') ? 1 : 0;
    const minVal = basicMin + (Number(typeInfo.base[statKey]) || 0);
    const currentVal = Number(creatorTemp.stats[statKey]);
    
    const valSpan = document.getElementById('creator-alloc-val-' + statKey);
    if (valSpan) {
      valSpan.textContent = currentVal;
    }
    
    const m10Btn = document.getElementById(\`btn-minus10-\${statKey}\`);
    const mBtn = document.getElementById(\`btn-minus-\${statKey}\`);
    const pBtn = document.getElementById(\`btn-plus-\${statKey}\`);
    const p10Btn = document.getElementById(\`btn-plus10-\${statKey}\`);
    
    if (m10Btn) m10Btn.disabled = currentVal <= minVal;
    if (mBtn) mBtn.disabled = currentVal <= minVal;
    
    if (pBtn) pBtn.disabled = remaining <= 0;
    if (p10Btn) p10Btn.disabled = remaining <= 0;

    // Dynamically adjust visual gauge width (relative to a max scale of 100)
    const gaugeEl = document.getElementById('creator-alloc-gauge-' + statKey);
    if (gaugeEl) {
      gaugeEl.style.width = Math.min(100, (currentVal / 100) * 100) + '%';
    }
  });
}`;

// Replace updateAllocatorUI
const oldUpdateUIEnd = t.indexOf('function buildCreatorSkillSelector()');
if (oldUpdateUIStart >= 0 && oldUpdateUIEnd > oldUpdateUIStart) {
  t = t.substring(0, oldUpdateUIStart) + newUpdateUI + '\n\n' + t.substring(oldUpdateUIEnd);
  console.log('[3] Replaced updateAllocatorUI with correct relative calculation.');
}

fs.writeFileSync('index.html', t, 'utf8');
console.log('Done!');
