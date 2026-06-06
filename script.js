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
const CHARS  = '0110101001101100110100111010110011010101101001011010110011010011010100';
const fontSize = 16;
let W, H, yPositions = [], frameSkips = [], currentFrames = [];
let matrixAnimId;

function initMatrix() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const count = Math.floor(W / fontSize) + 1;
  yPositions = Array(count).fill(0).map(() => Math.random() * H);
  frameSkips = Array(count).fill(0).map(() => Math.floor(Math.random() * 3) + 1);
  currentFrames = Array(count).fill(0);
}
initMatrix();
window.addEventListener('resize', initMatrix, { passive: true });

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, W, H);
  ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
  
  for (let i = 0; i < yPositions.length; i++) {
    currentFrames[i]++;
    if (currentFrames[i] < frameSkips[i]) continue;
    currentFrames[i] = 0;

    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    const x = i * fontSize;
    const y = yPositions[i];

    ctx.fillStyle = 'rgba(0, 255, 65, 0.85)';
    ctx.fillText(char, x, y - fontSize);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(char, x, y);

    yPositions[i] += fontSize;
    if (yPositions[i] > H && Math.random() > 0.975) {
      yPositions[i] = 0;
      frameSkips[i] = Math.floor(Math.random() * 3) + 1;
    }
  }
  matrixAnimId = requestAnimationFrame(drawMatrix);
}
drawMatrix();

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(matrixAnimId);
  } else {
    drawMatrix();
  }
});


// ══════════════════════════════════════════════
// 4. NAVBAR — sticky + active link highlight
// ══════════════════════════════════════════════
const navbar     = document.getElementById('navbar');
const navAnchors = document.querySelectorAll('.nav-menu a:not(.nav-btn)');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 80 && currentScrollY > lastScrollY) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }
  
  navbar.classList.toggle('scrolled', currentScrollY > 50);
  lastScrollY = currentScrollY;

  // Highlight active section link
  let current = '';
  document.querySelectorAll('section[id], div[id]').forEach(sec => {
    if (currentScrollY >= sec.offsetTop - 140) current = sec.id;
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
  '.reveal-up, .reveal-left, .reveal-right, .reveal-bento, .scroll-section'
);

// Stagger delays for grid children
document.querySelectorAll('.obj-bento .bento-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.07).toFixed(2);
});
document.querySelectorAll('.act-grid .act-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.08).toFixed(2);
});

const scrollSections = document.querySelectorAll('.scroll-section');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseFloat(e.target.dataset.delay || 0);
    setTimeout(() => e.target.classList.add('visible'), delay * 1000);
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

revealEls.forEach(el => revealObs.observe(el));
scrollSections.forEach(el => revealObs.observe(el));


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
//     • Global waypoint timeline progress
// ══════════════════════════════════════════════
(function () {
  /* ── Elements ───────────────────────────── */
  const gridScanner = document.querySelector('.scroll-grid-scanner');
  const ball1       = document.querySelector('.ball-1');
  const ball2       = document.querySelector('.ball-2');
  const ball3       = document.querySelector('.ball-3');
  
  const globalTimelineSecs = ['hero', 'about', 'vision', 'domains', 'activities', 'join'];
  const dots = document.querySelectorAll('.global-scroll-timeline .timeline-dot');
  const activeTrack = document.getElementById('globalActiveTrack');
  let pathLength = 0;

  if (activeTrack) {
    pathLength = activeTrack.getTotalLength();
    activeTrack.style.strokeDasharray = pathLength;
    activeTrack.style.strokeDashoffset = pathLength;
  }

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

    // 3. Global waypoint timeline progress
    if (activeTrack && dots.length > 0) {
      let currentIdx = -1;
      
      globalTimelineSecs.forEach((secId, i) => {
        const sec = document.getElementById(secId);
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        // Highlight if top of section is above the middle of screen
        if (rect.top <= window.innerHeight * 0.5) {
          currentIdx = i;
        }
      });
      
      dots.forEach((dot, i) => {
        if (i <= currentIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      
      if (currentIdx >= 0) {
        const targetDot = dots[currentIdx];
        const dotTop = parseInt(targetDot.style.top); // e.g. 50px
        const trackHeight = 700; // 750 - 50
        const progress = (dotTop - 50) / trackHeight;
        activeTrack.style.strokeDashoffset = pathLength * (1 - progress);
      } else {
        activeTrack.style.strokeDashoffset = pathLength;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(onScroll, 150);
})();

// ══════════════════════════════════════════════
// 8. DOMAINS CAROUSEL NAV
// ══════════════════════════════════════════════
(function() {
  const scrollWrap = document.getElementById('domainsScroll');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const dotsContainer = document.getElementById('domainsDots');
  if (!scrollWrap || !dotsContainer) return;
  
  const cards = scrollWrap.querySelectorAll('.dcard');
  const cardWidth = 300; // approx 280 + 16 gap
  
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.dot');
  
  function updateDots() {
    const scrollLeft = scrollWrap.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  scrollWrap.addEventListener('scroll', updateDots, { passive: true });
  
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      scrollWrap.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      scrollWrap.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }
})();
