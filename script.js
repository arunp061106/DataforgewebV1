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
  const bgPath         = document.getElementById('timelineTrackBg');
  const activePath     = document.getElementById('timelineTrackActive');
  const railGlowDot    = document.getElementById('railGlowDot');
  const timelineRows   = document.querySelectorAll('.timeline-row');
  const dot1           = document.querySelector('#node-vision .timeline-dot-anchor');
  const dot2           = document.querySelector('#node-domains .timeline-dot-anchor');
  const dot3           = document.querySelector('#node-activities .timeline-dot-anchor');

  /* ── Winding Path Generator ─────────────── */
  function updateTimelinePath() {
    if (!timelineSec || !bgPath || !activePath || !dot1 || !dot2 || !dot3) return;

    const containerRect = timelineSec.getBoundingClientRect();
    const w = containerRect.width;
    const h = containerRect.height;

    // Helper to get center coordinates of a dot relative to timeline section
    function getDotCenter(dot) {
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      };
    }

    const p1 = getDotCenter(dot1);
    const p2 = getDotCenter(dot2);
    const p3 = getDotCenter(dot3);

    // Start at top left rail
    const xStart = w > 768 ? 60 : 25;
    const yStart = 0;
    const yEnd   = h;

    // Helper for s-curve path calculation
    function sCurve(xA, yA, xB, yB) {
      const dy = yB - yA;
      const cp1y = yA + dy * 0.45;
      const cp2y = yB - dy * 0.45;
      return `C ${xA} ${cp1y}, ${xB} ${cp2y}, ${xB} ${yB}`;
    }

    // Generate path
    const pathStart = `M ${xStart} ${yStart}`;
    const curve1    = sCurve(xStart, yStart, p1.x, p1.y);
    const curve2    = sCurve(p1.x, p1.y, p2.x, p2.y);
    const curve3    = sCurve(p2.x, p2.y, p3.x, p3.y);

    // Dynamic loop at bottom transitioning from left rail to center screen
    const hDiff = yEnd - p3.y;
    const xCenter = w / 2;
    const loopWidth = Math.min(120, w * 0.25);
    const loop = `
      C ${p3.x} ${p3.y + hDiff * 0.25}, ${xCenter - loopWidth} ${p3.y + hDiff * 0.2}, ${xCenter - loopWidth} ${p3.y + hDiff * 0.5}
      C ${xCenter - loopWidth} ${p3.y + hDiff * 0.75}, ${xCenter + loopWidth} ${p3.y + hDiff * 0.65}, ${xCenter + loopWidth} ${p3.y + hDiff * 0.8}
      C ${xCenter + loopWidth} ${p3.y + hDiff * 0.95}, ${xCenter} ${p3.y + hDiff * 0.95}, ${xCenter} ${yEnd}
    `;

    const d = `${pathStart} ${curve1} ${curve2} ${curve3} ${loop}`;
    bgPath.setAttribute('d', d);
    activePath.setAttribute('d', d);

    // Update active path dash offset bounds
    const pathLength = activePath.getTotalLength();
    activePath.style.strokeDasharray = pathLength;
  }

  window.addEventListener('resize', updateTimelinePath, { passive: true });

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

    // 3. Winding rail progress line + glow dot
    if (timelineSec && activePath && railGlowDot) {
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

      const pathLength = activePath.getTotalLength();
      activePath.style.strokeDashoffset = pathLength * (1 - progress);

      if (pathLength > 0) {
        const point = activePath.getPointAtLength(progress * pathLength);
        railGlowDot.style.left = `${point.x}px`;
        railGlowDot.style.top  = `${point.y}px`;
      }
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
    updateTimelinePath();
    onScroll();
  }, 150);

  // Re-check layout after images/styles load
  setTimeout(updateTimelinePath, 700);
  setTimeout(updateTimelinePath, 1800);

})();
