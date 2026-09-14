const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Update CSS rules: cutin-band has overflow:hidden and clip-path/border so monster is masked strictly inside the band
const oldCSS = `    /* Cut-in Overlay & Animations */
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
    /* Cut-in Image Container: Full height, unclipped image sliding in */
    .cutin-image-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }
    .cutin-overlay.active .cutin-image-wrap {
      animation: full-image-slide-in 0.35s 0.05s ease-out forwards;
    }
    #cutin-image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-12deg);
    }
    #cutin-image-container img {
      max-height: 340px !important;
      height: 340px !important;
      transform: scale(2.2) translateY(-10%) !important;
      transform-origin: center center !important;
      filter: drop-shadow(0 0 25px rgba(245,158,11,0.9)) contrast(1.25) !important;
    }
    #cutin-image-container div {
      transform: scale(2.0) translateY(-8%) !important;
      transform-origin: center center !important;
    }

    @keyframes full-image-slide-in {
      0% { transform: translateX(-100%); opacity: 0; }
      100% { transform: translateX(0%); opacity: 1; }
    }`;

const newCSS = `    /* Cut-in Overlay & Animations - Masked inside diagonal band */
    .cutin-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      z-index: 10000;
      overflow: hidden;
      pointer-events: none;
    }
    
    /* Diagonal Band Mask Container */
    .cutin-band {
      position: absolute;
      width: 160%;
      height: 36%;
      background: linear-gradient(90deg, rgba(0,0,0,0.95), rgba(15,23,42,0.98), rgba(0,0,0,0.95));
      border-top: 3px solid var(--accent-gold);
      border-bottom: 3px solid var(--accent-gold);
      box-shadow: 0 0 35px rgba(245,158,11,0.6);
      transform: rotate(-12deg);
      opacity: 0;
      overflow: hidden; /* STRICT CLIPPING: Monster image will ONLY be visible inside this band! */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cutin-overlay.active .cutin-band {
      animation: bg-in-out 0.65s ease-out forwards;
    }

    /* Monster image sliding inside the band */
    .cutin-image-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }
    .cutin-overlay.active .cutin-image-wrap {
      animation: inner-image-slide 0.35s 0.05s ease-out forwards;
    }

    #cutin-image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #cutin-image-container img {
      max-height: 260px !important;
      height: 260px !important;
      transform: scale(2.0) translateY(-8%) !important;
      transform-origin: center center !important;
      filter: drop-shadow(0 0 20px rgba(245,158,11,0.8)) contrast(1.25) !important;
    }
    #cutin-image-container div {
      transform: scale(1.8) translateY(-6%) !important;
      transform-origin: center center !important;
    }

    @keyframes inner-image-slide {
      0% { transform: translateX(-80%); opacity: 0; }
      100% { transform: translateX(0%); opacity: 1; }
    }`;

if (html.includes(oldCSS)) {
  html = html.replace(oldCSS, newCSS);
  console.log('Successfully updated cutin CSS to mask monster strictly inside diagonal band!');
} else {
  console.log('oldCSS pattern not found!');
}

// Update Cutin HTML structure
const oldCutinHTML = `    <!-- SKILL CUT-IN OVERLAY -->
    <div id="cutin-overlay" class="cutin-overlay hidden">
      <div class="cutin-background"></div>
      <div class="cutin-image-wrap">
        <div id="cutin-image-container"></div>
      </div>
      <div class="cutin-text" id="cutin-skill-text">【瞬殺の魔眼】</div>
    </div>`;

const newCutinHTML = `    <!-- SKILL CUT-IN OVERLAY -->
    <div id="cutin-overlay" class="cutin-overlay hidden">
      <div class="cutin-band">
        <div class="cutin-image-wrap">
          <div id="cutin-image-container"></div>
        </div>
      </div>
      <div class="cutin-text" id="cutin-skill-text">【瞬殺の魔眼】</div>
    </div>`;

if (html.includes(oldCutinHTML)) {
  html = html.replace(oldCutinHTML, newCutinHTML);
  console.log('Successfully updated cutin HTML structure!');
} else {
  console.log('oldCutinHTML pattern not found!');
}

fs.writeFileSync(filePath, html, 'utf8');
