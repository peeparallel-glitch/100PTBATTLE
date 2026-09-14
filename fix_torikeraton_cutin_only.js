const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Update CSS rules for cutin image container:
// Revert all cutin image container CSS rules so all monsters (player & enemy) use default un-flipped orientation in cutin.
// Add a specific flip ONLY for Torikeraton (08torikeran) when displayed in the cutin container (whether player or enemy).

const oldCutinRule = `    .cutin-overlay.enemy-cutin #cutin-image-container img {
      transform: scaleX(-1) scale(2.2) translateY(18%) !important;
    }
    .cutin-overlay.enemy-cutin #cutin-image-container div {
      transform: scaleX(-1) scale(2.2) translateY(15%) !important;
    }
    /* Specific flip rule ONLY for Torikeraton (トリケラトン / 08torikeran) in enemy cutin */
    .cutin-overlay.enemy-cutin #cutin-image-container img[src*="08torikeran"] {
      transform: scaleX(-1) scale(2.2) translateY(18%) !important;
    }`;

// Check what CSS exists around cutin-image-container img
const lines = html.split('\r\n');
const startIdx = lines.findIndex(l => l.includes('#cutin-image-container img {'));
console.log('Found #cutin-image-container img at line:', startIdx + 1);

lines.slice(startIdx, startIdx + 20).forEach((l, i) => console.log((startIdx + 1 + i) + ': ' + l));

// Target section to replace
const cssSectionOld = lines.slice(startIdx - 1, startIdx + 22).join('\r\n');

const cssSectionNew = `    #cutin-image-container img {
      max-height: 280px !important;
      height: 280px !important;
      object-fit: contain !important;
      transform: scale(2.2) translateY(18%) !important;
      transform-origin: top center !important;
      filter: drop-shadow(0 0 25px rgba(245,158,11,0.9)) contrast(1.25) !important;
    }
    #cutin-image-container div {
      transform: scale(2.2) translateY(15%) !important;
      transform-origin: top center !important;
    }
    /* Specific flip rule ONLY for Torikeraton (08torikeran) inside skill cutin */
    #cutin-image-container img[src*="08torikeran"] {
      transform: scaleX(-1) scale(2.2) translateY(18%) !important;
    }`;

lines.splice(startIdx, 20, ...cssSectionNew.split('\r\n'));

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log('Successfully updated cutin CSS: normal battle standing sprites untouched, ONLY Torikeraton image flipped inside skill cutin!');
