/* ═══════════════════════════════════════════════
   DATA FORGE — Immersive JavaScript
   Matrix rain · Cursor · Terminal typing · Reveal
   Gate Loader · Scroll Animations
   ═══════════════════════════════════════════════ */

// ── Gate Loader — Sci-Fi Entry ───────────────
(function() {
  const gate = document.getElementById('gate-loader');
  if (!gate) return;

  // After loader bar finishes (~2.2s), trigger gate open
  setTimeout(() => {
    gate.classList.add('gate-open');
  }, 2200);

  // After gate fully opens (~3.5s total), remove it and unlock scroll
  setTimeout(() => {
    gate.remove();
    document.body.classList.remove('gate-active');
  }, 3500);
})();

// ── Custom cursor ────────────────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = -100, my = -100, tx = -100, ty = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function trailTick() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top  = ty + 'px';
  requestAnimationFrame(trailTick);
}
trailTick();

// ── Matrix rain canvas ───────────────────────
const canvas = document.getElementById('matrixCanvas');
const ctx    = canvas.getContext('2d');
let W, H, columns = [];
const CHARS = 'DATAFORGEANALYTICSML01ΨΩΔΛαβδεζηθ∑∞∂∫√π';

function resetColumn(col) {
  col.x = Math.random() * W;
  col.y = -Math.random() * 20; // Start above screen
  col.depth = 0.1 + Math.random() * 0.9; // Depth factor (0.1 to 1.0)
  col.fontSize = Math.floor(8 + col.depth * 9); // Font size 8px to 17px based on depth
  col.speed = 0.35 + col.depth * 1.45; // Speed based on depth for parallax 3D effect
  col.opacity = 0.15 + col.depth * 0.85; // Opacity based on depth
  col.trailLength = Math.floor(10 + col.depth * 18); // Trail length 10 to 28 characters
  col.glow = col.depth > 0.72; // Only foreground columns have glowing leads
  col.chars = Array.from({ length: 40 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
}

function initMatrix() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  // Dynamic column density based on width, giving it a rich, dense matrix-vibe
  const colsCount = Math.floor(W / 12);
  columns = [];
  for (let i = 0; i < colsCount; i++) {
    const col = {};
    resetColumn(col);
    // Stagger Y so the rain is immediately dispersed on load
    col.y = Math.random() * (H / col.fontSize);
    columns.push(col);
  }
}
initMatrix();
window.addEventListener('resize', initMatrix, { passive: true });

function drawMatrix() {
  // Clear transparently so elements behind or on top render flawlessly
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];

    for (let j = 0; j < col.trailLength; j++) {
      const yGrid = Math.floor(col.y) - j;
      if (yGrid < 0) continue;

      const yPixel = yGrid * col.fontSize;
      if (yPixel > H + col.fontSize) continue;

      // Calculate alpha fading as it goes up the trail
      const trailFactor = 1 - (j / col.trailLength);
      const alpha = trailFactor * col.opacity;

      ctx.font = `bold ${col.fontSize}px 'Space Mono', monospace`;

      if (j === 0) {
        // Glowing lead character: bright white/light-green
        ctx.fillStyle = `rgba(220, 255, 230, ${col.opacity})`;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = col.glow ? 12 : 0;
      } else {
        // Trail characters: vibrant neon green
        ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
        ctx.shadowBlur = 0; // Turn off glow for trail characters for high FPS
      }

      const ch = col.chars[yGrid % col.chars.length];
      ctx.fillText(ch, col.x, yPixel);
    }

    // Update position
    col.y += col.speed;

    // Reset column if it goes fully off-screen
    if ((col.y - col.trailLength) * col.fontSize > H) {
      resetColumn(col);
    }
  }

  // Ensure shadowBlur is reset for other canvas operations
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

// ── Navbar sticky ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

// ── Hamburger ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ── Terminal typing animation ─────────────────
const phrases = [
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
  const phrase = phrases[phraseIdx];

  if (!deleting) {
    termEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeTerminal, 2200);
      return;
    }
    setTimeout(typeTerminal, 52);
  } else {
    termEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeTerminal, 400);
      return;
    }
    setTimeout(typeTerminal, 26);
  }
}
setTimeout(typeTerminal, 1200);

// ── Scroll reveal ────────────────────────────
const revealSelectors = '.reveal-up, .reveal-left, .reveal-right, .reveal-bento';
const revealEls = document.querySelectorAll(revealSelectors);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

// Stagger bento / dcard children
document.querySelectorAll('.obj-bento .bento-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.07).toFixed(2);
});
document.querySelectorAll('.act-grid .act-card').forEach((el, i) => {
  el.dataset.delay = (i * 0.08).toFixed(2);
});

revealEls.forEach(el => revealObs.observe(el));

// ── Horizontal drag scroll (domains) ─────────
const scrollWrap = document.getElementById('domainsScroll');
if (scrollWrap) {
  let isDown = false, startX, scrollLeft;

  scrollWrap.addEventListener('mousedown', e => {
    isDown = true;
    scrollWrap.classList.add('grabbing');
    startX    = e.pageX - scrollWrap.offsetLeft;
    scrollLeft = scrollWrap.scrollLeft;
  });
  document.addEventListener('mouseup',    () => { isDown = false; scrollWrap.classList.remove('grabbing'); });
  scrollWrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - scrollWrap.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollWrap.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX, touchScrollLeft;
  scrollWrap.addEventListener('touchstart', e => {
    touchStartX    = e.touches[0].pageX;
    touchScrollLeft = scrollWrap.scrollLeft;
  }, { passive: true });
  scrollWrap.addEventListener('touchmove', e => {
    const x    = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.2;
    scrollWrap.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
}

// ── Active nav highlight ──────────────────────
const sections  = document.querySelectorAll('section[id], div[id="join"]');
const navAnchors = document.querySelectorAll('.nav-menu a:not(.nav-btn)');
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section[id]').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--g)' : '';
  });
}, { passive: true });

// ── Tilt effect on dcard hover ────────────────
document.querySelectorAll('.dcard, .bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Particle burst on CTA click ───────────────
document.querySelectorAll('.cta-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('span');
      p.style.cssText = `
        position:fixed;
        left:${e.clientX}px;
        top:${e.clientY}px;
        width:${4 + Math.random()*4}px;
        height:${4 + Math.random()*4}px;
        background:${Math.random()>.5?'#39ff14':'#00f5d4'};
        border-radius:50%;
        pointer-events:none;
        z-index:9999;
        transition:transform 0.7s ease, opacity 0.7s ease;
      `;
      document.body.appendChild(p);
      const angle = (i / 14) * Math.PI * 2;
      const dist  = 60 + Math.random() * 80;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`;
        p.style.opacity   = '0';
      });
      setTimeout(() => p.remove(), 800);
    }
  });
});
