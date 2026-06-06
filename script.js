/* ═══════════════════════════════════════════════
   DATA FORGE — Immersive JavaScript (Final Build)
   Gate Loader · Matrix Rain · Cursor · Terminal
   Scroll Animations · Rail Timeline · Reveals
   ═══════════════════════════════════════════════ */

// ══════════════════════════════════════════════
// 1. GATE LOADER — Sci-Fi Entry
// ══════════════════════════════════════════════
(function () {
  const gate = document.getElementById('gate-loader');
  if (!gate) return;

  // Fill bar completes at 2.0s → open gates
  setTimeout(() => gate.classList.add('gate-open'), 2000);

  // Fade out overlay
  setTimeout(() => gate.classList.add('gate-hidden'), 3200);

  // Remove from DOM, unlock scroll
  setTimeout(() => {
    gate.remove();
    document.body.classList.remove('gate-active');
  }, 3600);
})();


// ══════════════════════════════════════════════
// 2. CUSTOM CURSOR
// ══════════════════════════════════════════════
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = -200, my = -200, tx = -200, ty = -200;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function trailLoop() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top  = ty + 'px';
  requestAnimationFrame(trailLoop);
})();


// ══════════════════════════════════════════════
// 3. GLOBAL MATRIX RAIN (background canvas)
// ══════════════════════════════════════════════
const canvas = document.getElementById('matrixCanvas');
const ctx    = canvas.getContext('2d');
let W, H, columns = [];
const CHARS = 'DATAFORGEANALYTICSML01ΨΩΔΛαβδεζη∑∞∂∫√π';

function resetColumn(col) {
  col.x          = Math.random() * W;
  col.y          = -Math.random() * 20;
  col.depth      = 0.1 + Math.random() * 0.9;
  col.fontSize   = Math.floor(8 + col.depth * 9);
  col.speed      = 0.35 + col.depth * 1.45;
  col.opacity    = 0.15 + col.depth * 0.85;
  col.trailLen   = Math.floor(10 + col.depth * 18);
  col.glow       = col.depth > 0.72;
  col.chars      = Array.from({ length: 40 }, () =>
    CHARS[Math.floor(Math.random() * CHARS.length)]);
}

function initMatrix() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  columns = [];
  const count = Math.floor(W / 12);
  for (let i = 0; i < count; i++) {
    const col = {};
    resetColumn(col);
    col.y = Math.random() * (H / col.fontSize);
    columns.push(col);
  }
}
initMatrix();
window.addEventListener('resize', initMatrix, { passive: true });

function drawMatrix() {
  ctx.clearRect(0, 0, W, H);
  for (const col of columns) {
    for (let j = 0; j < col.trailLen; j++) {
      const yGrid  = Math.floor(col.y) - j;
      if (yGrid < 0) continue;
      const yPx = yGrid * col.fontSize;
      if (yPx > H + col.fontSize) continue;

      const tFactor = 1 - j / col.trailLen;
      const alpha   = tFactor * col.opacity;
      ctx.font = `bold ${col.fontSize}px 'Space Mono', monospace`;

      if (j === 0) {
        ctx.fillStyle  = `rgba(220,255,230,${col.opacity})`;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur  = col.glow ? 12 : 0;
      } else {
        ctx.fillStyle = `rgba(0,255,102,${alpha})`;
        ctx.shadowBlur = 0;
      }
      ctx.fillText(col.chars[yGrid % col.chars.length], col.x, yPx);
    }
    col.y += col.speed;
    if ((col.y - col.trailLen) * col.fontSize > H) resetColumn(col);
  }
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawMatrix);
}
drawMatrix();


// ══════════════════════════════════════════════
// 4. NAVBAR — sticky + active link highlight
// ══════════════════════════════════════════════
const navbar     = document.getElementById('navbar');
const navAnchors = document.querySelectorAll('.nav-menu a:not(.nav-btn)');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 50);

  // Highlight active section link
  let current = '';
  document.querySelectorAll('section[id], div[id]').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--g)' : '';
  });
}, { passive: true });

// Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});


// ══════════════════════════════════════════════
// 5. TERMINAL TYPING ANIMATION
// ══════════════════════════════════════════════
const PHRASES = [
  'forging the future through data...',
  'data science · analytics · big data',
  'open to all branches, all years.',
  'turning curiosity into capability.',
  'from raw data to refined insight.',
];
const termEl = document.getElementById('terminalText');
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeTerminal() {
  if (!termEl) return;
  const phrase = PHRASES[phraseIdx];
  if (!deleting) {
    termEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(typeTerminal, 2200); return; }
    setTimeout(typeTerminal, 52);
  } else {
    termEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % PHRASES.length;
      setTimeout(typeTerminal, 400);
      return;
    }
    setTimeout(typeTerminal, 26);
  }
}
setTimeout(typeTerminal, 1200);


// ══════════════════════════════════════════════
// 6. UNIVERSAL SCROLL REVEAL
// ══════════════════════════════════════════════
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, .reveal-bento'
);

// Stagger delays for grid children
document.querySelectorAll('.obj-bento .bento-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.07).toFixed(2);
});
document.querySelectorAll('.act-grid .act-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.08).toFixed(2);
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseFloat(e.target.dataset.delay || 0);
    setTimeout(() => e.target.classList.add('visible'), delay * 1000);
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

revealEls.forEach(el => revealObs.observe(el));


// ══════════════════════════════════════════════
// 7. HORIZONTAL DRAG SCROLL (Domains)
// ══════════════════════════════════════════════
const scrollWrap = document.getElementById('domainsScroll');
if (scrollWrap) {
  let isDown = false, startX, scrollLeft;
  scrollWrap.addEventListener('mousedown', e => {
    isDown = true;
    scrollWrap.classList.add('grabbing');
    startX     = e.pageX - scrollWrap.offsetLeft;
    scrollLeft = scrollWrap.scrollLeft;
  });
  document.addEventListener('mouseup', () => {
    isDown = false;
    scrollWrap.classList.remove('grabbing');
  });
  scrollWrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - scrollWrap.offsetLeft - startX) * 1.4;
    scrollWrap.scrollLeft = scrollLeft - walk;
  });
  // Touch
  let tStartX, tScrollLeft;
  scrollWrap.addEventListener('touchstart', e => {
    tStartX     = e.touches[0].pageX;
    tScrollLeft = scrollWrap.scrollLeft;
  }, { passive: true });
  scrollWrap.addEventListener('touchmove', e => {
    scrollWrap.scrollLeft = tScrollLeft + (tStartX - e.touches[0].pageX) * 1.2;
  }, { passive: true });
}


// ══════════════════════════════════════════════
// 8. CARD TILT EFFECT (bento + domain cards)
// ══════════════════════════════════════════════
document.querySelectorAll('.dcard, .bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});


// ══════════════════════════════════════════════
// 9. CTA PARTICLE BURST
// ══════════════════════════════════════════════
document.querySelectorAll('.cta-primary').forEach(btn => {
  btn.addEventListener('click', e => {
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('span');
      const size = 4 + Math.random() * 4;
      p.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:${size}px;height:${size}px;
        background:${Math.random() > .5 ? '#39ff14' : '#00f5d4'};
        border-radius:50%;pointer-events:none;z-index:9999;
        transition:transform .75s ease,opacity .75s ease;
      `;
      document.body.appendChild(p);
      const angle = (i / 16) * Math.PI * 2;
      const dist  = 60 + Math.random() * 90;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0)`;
        p.style.opacity   = '0';
      });
      setTimeout(() => p.remove(), 900);
    }
  });
});


// ══════════════════════════════════════════════
// 10. SCROLL-LINKED SYSTEM
//     • Grid scanner line (full page)
//     • Ambient glow parallax
//     • Rail timeline progress + dot
//     • Timeline node activation + connector lines
//     • Rail canvas matrix rain
// ══════════════════════════════════════════════
(function () {

  /* ── Elements ───────────────────────────── */
  const gridScanner    = document.querySelector('.scroll-grid-scanner');
  const ball1          = document.querySelector('.ball-1');
  const ball2          = document.querySelector('.ball-2');
  const ball3          = document.querySelector('.ball-3');
  const timelineSec    = document.getElementById('features-timeline-section');
  const activeLine     = document.getElementById('activeRailLine');
  const railGlowDot    = document.getElementById('railGlowDot');
  const timelineRows   = document.querySelectorAll('.timeline-row');

  /* ── Rail Canvas Matrix Rain ────────────── */
  const railCanvas = document.getElementById('railCanvas');
  let railCtx, rW = 0, rH = 0, railCols = [];
  const RAIL_CHARS = '010101DATAFORGEANALYTICSMLΨΩΔΛ';
  let railAnimId   = null;

  function initRailMatrix() {
    if (!railCanvas) return;
    if (!railCtx) railCtx = railCanvas.getContext('2d');
    const track = railCanvas.parentElement;
    if (!track) return;
    const nW = track.clientWidth;
    const nH = track.clientHeight;
    if (nW === rW && nH === rH && railCols.length > 0) return;
    rW = railCanvas.width  = nW;
    rH = railCanvas.height = nH;
    const count = Math.floor(rW / 8) + 1;
    railCols = [];
    for (let i = 0; i < count; i++) {
      railCols.push({
        x:       i * 8,
        y:       Math.random() * rH,
        speed:   1.2 + Math.random() * 2.8,
        fontSize:7 + Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.45,
      });
    }
  }

  function drawRailMatrix() {
    if (!railCanvas || !railCtx) return;
    railCtx.fillStyle = 'rgba(4,9,4,0.18)';
    railCtx.fillRect(0, 0, rW, rH);
    for (const col of railCols) {
      railCtx.font      = `bold ${col.fontSize}px 'Space Mono', monospace`;
      railCtx.fillStyle = Math.random() > 0.85
        ? `rgba(0,245,212,${col.opacity})`
        : `rgba(57,255,20,${col.opacity})`;
      railCtx.fillText(
        RAIL_CHARS[Math.floor(Math.random() * RAIL_CHARS.length)],
        col.x, col.y
      );
      col.y += col.speed;
      if (col.y > rH) { col.y = -20; col.speed = 1.2 + Math.random() * 2.8; }
    }
    railAnimId = requestAnimationFrame(drawRailMatrix);
  }

  window.addEventListener('resize', initRailMatrix, { passive: true });

  /* ── Scroll handler ─────────────────────── */
  function onScroll() {
    const scrollTop    = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const pct = scrollTop / scrollHeight;

    // 1. Grid scanner line
    if (gridScanner) gridScanner.style.top = `${pct * 100}%`;

    // 2. Ambient glow parallax
    if (ball1) ball1.style.transform = `translate(${pct*120}px,${pct*-90}px) scale(${1+pct*.25})`;
    if (ball2) ball2.style.transform = `translate(${pct*-140}px,${pct*110}px) scale(${1-pct*.15})`;
    if (ball3) ball3.style.transform = `translate(${pct*80}px,${pct*140}px) scale(${1+pct*.3})`;

    // 3. Rail progress line + glow dot
    if (timelineSec && activeLine && railGlowDot) {
      const secTop    = timelineSec.offsetTop;
      const secHeight = timelineSec.offsetHeight;
      const vh        = window.innerHeight;
      const start     = secTop - vh * 0.55;
      const end       = secTop + secHeight - vh * 0.4;

      let progress = 0;
      if (scrollTop >= start && scrollTop <= end) {
        progress = (scrollTop - start) / (end - start);
      } else if (scrollTop > end) {
        progress = 1;
      }
      progress = Math.min(1, Math.max(0, progress));

      activeLine.style.height = `${progress * 100}%`;
      railGlowDot.style.top   = `${progress * 100}%`;
    }

    // 4. Activate timeline rows + connector lines
    timelineRows.forEach(row => {
      const card = row.querySelector('.timeline-card-wrapper');
      if (!card) return;
      const top   = card.getBoundingClientRect().top;
      const trigger = window.innerHeight * 0.80;
      if (top < trigger) {
        row.classList.add('node-active');
        card.classList.add('active');
      } else {
        row.classList.remove('node-active');
        card.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Init ───────────────────────────────── */
  setTimeout(() => {
    initRailMatrix();
    drawRailMatrix();
    onScroll();
  }, 150);

  // Re-check layout after images load
  setTimeout(initRailMatrix, 700);
  setTimeout(initRailMatrix, 1800);

})();
