const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update confirmPlayerName to play SE and execute after 500ms delay
const oldConfirmName = `function confirmPlayerName() {`;
const newConfirmName = `function confirmPlayerName() {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    _execConfirmPlayerName();
  }, 500);
}

function _execConfirmPlayerName() {`;

if (html.includes(oldConfirmName)) {
  html = html.replace(oldConfirmName, newConfirmName);
  console.log('Updated confirmPlayerName with SE + 500ms delay!');
} else {
  console.log('oldConfirmName not found!');
}

// 2. Update closeSaveSlotModal to play SE + 500ms delay
const oldCloseSaveModal = `function closeSaveSlotModal() {
  const overlay = document.getElementById('save-slot-overlay');
  if (overlay) overlay.style.display = 'none';
}`;

const newCloseSaveModal = `function closeSaveSlotModal() {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    const overlay = document.getElementById('save-slot-overlay');
    if (overlay) overlay.style.display = 'none';
  }, 500);
}`;

if (html.includes(oldCloseSaveModal)) {
  html = html.replace(oldCloseSaveModal, newCloseSaveModal);
  console.log('Updated closeSaveSlotModal with SE + 500ms delay!');
}

// 3. Update loadGameFromSlot SE to senntaku_kettei.mp3 (was OP_STRT.mp3)
const oldLoadSlotSE = `function loadGameFromSlot(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/OP_STRT.mp3'); } catch(e) {}
  }`;

const newLoadSlotSE = `function loadGameFromSlot(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }`;

if (html.includes(oldLoadSlotSE)) {
  html = html.replace(oldLoadSlotSE, newLoadSlotSE);
  console.log('Updated loadGameFromSlot SE to senntaku_kettei.mp3!');
}

// 4. Update manualSaveToSlot to play SE + 500ms delay
const oldManualSave = `function manualSaveToSlot(slotId) {
  activeSlotId = slotId;
  save();
  renderSaveSlots();
  alert('SLOT ' + slotId + ' に保存しました！');
}`;

const newManualSave = `function manualSaveToSlot(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    activeSlotId = slotId;
    save();
    renderSaveSlots();
    alert('SLOT ' + slotId + ' に保存しました！');
  }, 500);
}`;

if (html.includes(oldManualSave)) {
  html = html.replace(oldManualSave, newManualSave);
  console.log('Updated manualSaveToSlot with SE + 500ms delay!');
}

// 5. Update deleteSlotConfirm to play SE + 500ms delay
const oldDeleteConfirm = `async function deleteSlotConfirm(slotId) {`;
const newDeleteConfirm = `async function deleteSlotConfirm(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    _execDeleteSlotConfirm(slotId);
  }, 500);
}

async function _execDeleteSlotConfirm(slotId) {`;

if (html.includes(oldDeleteConfirm)) {
  html = html.replace(oldDeleteConfirm, newDeleteConfirm);
  console.log('Updated deleteSlotConfirm with SE + 500ms delay!');
}

// 6. Update startNewGameInSlot SE to senntaku_kettei.mp3 and delay to 500ms (was 1000ms & OP_STRT.mp3)
const oldStartNewSlot = `function startNewGameInSlot(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/OP_STRT.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    activeSlotId = slotId;
    deleteSlotData(slotId);
    resetMemoryState();
    closeSaveSlotModal();
    showNameDialog();
  }, 1000);
}`;

const newStartNewSlot = `function startNewGameInSlot(slotId) {
  if (window.soundManager && typeof window.soundManager.playSE === 'function') {
    try { playSE('./SE1/senntaku_kettei.mp3'); } catch(e) {}
  }
  setTimeout(() => {
    activeSlotId = slotId;
    deleteSlotData(slotId);
    resetMemoryState();
    closeSaveSlotModal();
    showNameDialog();
  }, 500);
}`;

if (html.includes(oldStartNewSlot)) {
  html = html.replace(oldStartNewSlot, newStartNewSlot);
  console.log('Updated startNewGameInSlot SE to senntaku_kettei.mp3 and 500ms delay!');
}

fs.writeFileSync(filePath, html, 'utf8');
