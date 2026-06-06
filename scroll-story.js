/* ═══════════════════════════════════════════════════════════════
   DATA FORGE — SCROLL STORY ENGINE
   Each "chapter" is pinned for a scroll distance, then hands off
   to the next via a Srijan-style winding SVG train animation.
   ═══════════════════════════════════════════════════════════════ */

// Wait for gate loader to complete before starting story (gate finishes at ~3.6s)
setTimeout(function startStory() {
  'use strict';

  /* ─── Story chapters ────────────────────────────────────────── */
  const CHAPTERS = [
    {
      id: 'chapter-hero',
      headline: 'We Are<br><span class="st-accent">Data</span><br><span class="st-stroke">Forge.</span>',
      sub: 'The official Data Science Club of SRM IST, Tiruchirapalli.',
      tag: '// hello world',
      icon: '⚡',
    },
    {
      id: 'chapter-empower',
      headline: 'Built to<br><span class="st-accent">Empower</span>',
      sub: 'Fostering data-driven thinking and analytical innovation for every B.Tech student.',
      tag: '// our vision',
      icon: '🎯',
    },
    {
      id: 'chapter-domains',
      headline: 'Every<br>Branch.<br><span class="st-accent">Every Story.</span>',
      sub: 'CS · ECE · Mech · Civil · Business · Healthcare · Finance — data connects them all.',
      tag: '// domains',
      icon: '🌐',
    },
    {
      id: 'chapter-activities',
      headline: 'Learn.<br>Build.<br><span class="st-accent">Compete.</span>',
      sub: 'Workshops, Datathons, Research Circles, and Analytics Challenges — every week.',
      tag: '// activities',
      icon: '🏆',
    },
    {
      id: 'chapter-join',
      headline: 'Your Data<br>Story<br><span class="st-accent">Starts Here.</span>',
      sub: 'Join Data Forge — open to all branches, all years, all skill levels.',
      tag: '// ready?',
      icon: '🚀',
      isFinal: true,
    },
  ];

  /* ─── Mount overlay container ────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'scroll-story-overlay';
  overlay.innerHTML = `
    <canvas id="storyMatrixCanvas"></canvas>

    <!-- Winding SVG train -->
    <svg id="storyTrainSvg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path id="storyTrainPath" fill="none" stroke="rgba(57,255,20,0.18)" stroke-width="0.5" stroke-dasharray="3 3"/>
      <path id="storyTrainActive" fill="none" stroke="#00ff41" stroke-width="1.2"
            stroke-linecap="round"
            style="filter:drop-shadow(0 0 6px #00ff41);"/>
      <circle id="storyTrainDot" r="2" fill="#fff"
              style="filter:drop-shadow(0 0 8px #00ff41) drop-shadow(0 0 20px #00ff41);"/>
    </svg>

    <!-- Chapter slides -->
    <div id="storySlides">
      ${CHAPTERS.map((ch, i) => `
        <div class="story-slide ${i === 0 ? 'active' : ''}" id="${ch.id}" data-index="${i}">
          <div class="story-tag">${ch.tag}</div>
          <div class="story-icon">${ch.icon}</div>
          <h2 class="story-headline">${ch.headline}</h2>
          <p class="story-sub">${ch.sub}</p>
          ${ch.isFinal ? `
            <a href="https://chat.whatsapp.com/CGwok6lCSwt1DEIfCUHXso"
               target="_blank" rel="noopener noreferrer"
               class="story-cta">
              <span>Join WhatsApp Group</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <div class="story-final-particles" id="finalParticles"></div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <!-- Progress dots -->
    <div id="storyProgress">
      ${CHAPTERS.map((_, i) => `<div class="sp-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
    </div>

    <!-- Skip button -->
    <button id="storySkip">Skip intro ↓</button>
  `;
  document.body.appendChild(overlay);

  /* ─── Inject CSS ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    #scroll-story-overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      background: #030a03;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Mini matrix canvas ── */
    #storyMatrixCanvas {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      opacity: 0.12;
      pointer-events: none;
    }

    /* ── Winding SVG train ── */
    #storyTrainSvg {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      pointer-events: none;
    }

    /* ── Slides ── */
    #storySlides {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 860px;
      padding: 0 40px;
      text-align: center;
    }

    .story-slide {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 40px;
      opacity: 0;
      transform: translateY(60px) scale(0.94);
      transition: none;
      pointer-events: none;
    }
    .story-slide.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
      transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                  transform 0.9s cubic-bezier(0.16,1,0.3,1);
    }
    .story-slide.exit-up {
      opacity: 0;
      transform: translateY(-70px) scale(0.93);
      pointer-events: none;
      transition: opacity 0.6s ease-in, transform 0.6s ease-in;
    }
    .story-slide.enter-down {
      opacity: 0;
      transform: translateY(70px) scale(0.94);
      transition: none;
    }

    .story-tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      color: #39ff14;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0.75;
    }
    .story-icon {
      font-size: 3.5rem;
      animation: iconPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }
    @keyframes iconPop {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    .story-headline {
      font-family: 'Orbitron', monospace;
      font-size: clamp(2.6rem, 7vw, 5.5rem);
      font-weight: 900;
      color: #ffffff;
      line-height: 1.08;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .st-accent {
      color: #39ff14;
      text-shadow: 0 0 30px rgba(57,255,20,0.5);
    }
    .st-stroke {
      -webkit-text-stroke: 2px #39ff14;
      color: transparent;
    }
    .story-sub {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(0.9rem, 2vw, 1.15rem);
      color: rgba(255,255,255,0.6);
      line-height: 1.85;
      max-width: 580px;
      margin: 0 auto;
    }

    /* ── CTA button ── */
    .story-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      padding: 16px 40px;
      background: linear-gradient(135deg, #39ff14, #00c8a0);
      color: #000;
      font-family: 'Orbitron', monospace;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      border-radius: 100px;
      text-decoration: none;
      box-shadow: 0 0 40px rgba(57,255,20,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      animation: ctaPulse 2s ease-in-out infinite;
    }
    .story-cta:hover {
      transform: scale(1.06);
      box-shadow: 0 0 60px rgba(57,255,20,0.6);
    }
    @keyframes ctaPulse {
      0%,100% { box-shadow: 0 0 40px rgba(57,255,20,0.4); }
      50%     { box-shadow: 0 0 70px rgba(57,255,20,0.7); }
    }

    /* ── Final particles ── */
    .story-final-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .fp { position: absolute; border-radius: 50%; animation: fpFloat linear infinite; }
    @keyframes fpFloat {
      0%   { transform: translateY(100vh) scale(0); opacity: 1; }
      100% { transform: translateY(-20vh) scale(1); opacity: 0; }
    }

    /* ── Progress dots ── */
    #storyProgress {
      position: absolute;
      right: 28px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 20;
    }
    .sp-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: rgba(57,255,20,0.2);
      border: 1.5px solid rgba(57,255,20,0.3);
      cursor: pointer;
      transition: all 0.35s ease;
    }
    .sp-dot.active {
      background: #39ff14;
      border-color: #39ff14;
      box-shadow: 0 0 10px #39ff14;
      transform: scale(1.4);
    }

    /* ── Skip button ── */
    #storySkip {
      position: absolute;
      bottom: 28px;
      right: 28px;
      background: rgba(57,255,20,0.08);
      border: 1px solid rgba(57,255,20,0.2);
      color: rgba(57,255,20,0.6);
      font-family: 'Space Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      padding: 8px 18px;
      border-radius: 100px;
      cursor: pointer;
      z-index: 30;
      transition: all 0.25s;
    }
    #storySkip:hover {
      background: rgba(57,255,20,0.15);
      color: #39ff14;
    }

    /* ── Transition flash ── */
    #storyFlash {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(57,255,20,0.22) 0%, transparent 70%);
      pointer-events: none;
      opacity: 0;
      z-index: 15;
    }

    /* ── Overlay exit ── */
    #scroll-story-overlay.dismissed {
      opacity: 0;
      transform: scale(1.04);
      pointer-events: none;
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    @media (max-width: 600px) {
      .story-slide { padding: 20px; }
      #storyProgress { right: 12px; }
      #storySkip { right: 12px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ─── Flash element ─────────────────────────────────────────── */
  const flash = document.createElement('div');
  flash.id = 'storyFlash';
  overlay.appendChild(flash);

  /* ─── Mini Matrix Rain ──────────────────────────────────────── */
  const sCanvas = document.getElementById('storyMatrixCanvas');
  const sCtx = sCanvas.getContext('2d');
  let sW, sH, sCols, sYpos;
  function initStoryMatrix() {
    sW = sCanvas.width = window.innerWidth;
    sH = sCanvas.height = window.innerHeight;
    sCols = Math.floor(sW / 18);
    sYpos = Array(sCols).fill(0).map(() => Math.random() * sH);
  }
  initStoryMatrix();
  window.addEventListener('resize', initStoryMatrix);
  let sFrame = 0;
  (function drawStoryMatrix() {
    if (!overlay.parentNode) return;
    sFrame++;
    if (sFrame % 2 === 0) {
      sCtx.fillStyle = 'rgba(0,0,0,0.06)';
      sCtx.fillRect(0, 0, sW, sH);
      sCtx.font = '14px "Space Mono", monospace';
      for (let i = 0; i < sCols; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        sCtx.fillStyle = 'rgba(57,255,20,0.7)';
        sCtx.fillText(char, i * 18, sYpos[i]);
        sYpos[i] += 18;
        if (sYpos[i] > sH && Math.random() > 0.97) sYpos[i] = 0;
      }
    }
    requestAnimationFrame(drawStoryMatrix);
  })();

  /* ─── SVG Winding Train ─────────────────────────────────────── */
  const trainPath = document.getElementById('storyTrainPath');
  const trainActive = document.getElementById('storyTrainActive');
  const trainDot = document.getElementById('storyTrainDot');

  // S-curve winding path across 100x100 viewbox
  const FULL_PATH = 'M 15 5 C 15 25, 85 25, 85 40 C 85 55, 15 55, 15 70 C 15 82, 50 90, 50 98';
  trainPath.setAttribute('d', FULL_PATH);
  trainActive.setAttribute('d', FULL_PATH);

  let trainLen = 0;
  // Use requestAnimationFrame to wait for SVG to render
  requestAnimationFrame(() => {
    trainLen = trainActive.getTotalLength();
    trainActive.style.strokeDasharray = trainLen;
    trainActive.style.strokeDashoffset = trainLen;
  });

  /* ─── State ─────────────────────────────────────────────────── */
  let current = 0;
  let transitioning = false;
  const slides = document.querySelectorAll('.story-slide');
  const progressDots = document.querySelectorAll('.sp-dot');

  /* ─── Spawn final particles ──────────────────────────────────── */
  function spawnParticles() {
    const container = document.getElementById('finalParticles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'fp';
      const size = 4 + Math.random() * 8;
      const hue = Math.random() > 0.5 ? '#39ff14' : '#00f5d4';
      p.style.cssText = `
        width:${size}px;height:${size}px;
        background:${hue};
        left:${Math.random() * 100}%;
        bottom:-20px;
        animation-duration:${2.5 + Math.random() * 3}s;
        animation-delay:${Math.random() * 2}s;
        opacity:0.8;
      `;
      container.appendChild(p);
    }
  }

  /* ─── Train animation helper ─────────────────────────────────── */
  function animateTrain(fromProgress, toProgress, onDone) {
    const duration = 900;
    const start = performance.now();
    const totalLen = trainLen || 400;

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Easing: ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const progress = fromProgress + (toProgress - fromProgress) * eased;
      const drawn = progress * totalLen;

      // Update active stroke
      trainActive.style.strokeDashoffset = totalLen - drawn;

      // Move dot along path
      if (totalLen > 0) {
        const pt = trainActive.getPointAtLength(drawn);
        const svgRect = document.getElementById('storyTrainSvg').getBoundingClientRect();
        const scaleX = svgRect.width / 100;
        const scaleY = svgRect.height / 100;
        trainDot.setAttribute('cx', pt.x);
        trainDot.setAttribute('cy', pt.y);
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        onDone && onDone();
      }
    }
    requestAnimationFrame(step);
  }

  /* ─── Chapter transition ─────────────────────────────────────── */
  function goTo(next) {
    if (transitioning || next === current || next < 0 || next >= CHAPTERS.length) return;
    transitioning = true;

    const fromSlide = slides[current];
    const toSlide   = slides[next];
    const isForward = next > current;

    // 1. Flash pulse
    flash.style.transition = 'opacity 0.15s ease';
    flash.style.opacity = '1';
    setTimeout(() => { flash.style.opacity = '0'; }, 200);

    // 2. Exit current slide
    fromSlide.classList.remove('active');
    fromSlide.classList.add('exit-up');

    // 3. Prime next slide below
    toSlide.classList.add('enter-down');
    toSlide.style.opacity = '0';
    toSlide.style.transform = isForward ? 'translateY(70px) scale(0.94)' : 'translateY(-70px) scale(0.94)';

    // 4. Train from current progress → next progress
    const fromP = current / (CHAPTERS.length - 1);
    const toP   = next   / (CHAPTERS.length - 1);

    animateTrain(fromP, toP, () => {
      // 5. Enter next slide after train finishes
      fromSlide.classList.remove('exit-up');
      toSlide.classList.remove('enter-down');
      toSlide.style.opacity = '';
      toSlide.style.transform = '';
      toSlide.classList.add('active');

      current = next;
      transitioning = false;

      // Update progress dots
      progressDots.forEach((d, i) => d.classList.toggle('active', i === current));

      // Spawn particles on final chapter
      if (CHAPTERS[current].isFinal) spawnParticles();
    });
  }

  /* ─── Scroll to advance chapters ─────────────────────────────── */
  let scrollBuffer = 0;
  let lastWheelTime = 0;

  function handleWheel(e) {
    const now = Date.now();
    if (now - lastWheelTime < 80) return; // debounce
    scrollBuffer += e.deltaY;
    if (Math.abs(scrollBuffer) > 60) {
      if (scrollBuffer > 0) goTo(current + 1);
      else                  goTo(current - 1);
      scrollBuffer = 0;
      lastWheelTime = now;
    }
  }

  // Touch swipe
  let touchStartY = 0;
  overlay.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) {
      goTo(dy > 0 ? current + 1 : current - 1);
    }
  });

  overlay.addEventListener('wheel', handleWheel, { passive: true });

  /* ─── Keyboard ───────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (!overlay.parentNode) return;
    if (e.key === 'ArrowDown' || e.key === ' ')  goTo(current + 1);
    if (e.key === 'ArrowUp')                      goTo(current - 1);
    if (e.key === 'Escape')                        dismiss();
  });

  /* ─── Progress dot clicks ────────────────────────────────────── */
  progressDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  /* ─── Skip / Dismiss ─────────────────────────────────────────── */
  function dismiss() {
    overlay.classList.add('dismissed');
    setTimeout(() => {
      overlay.remove();
      style.remove();
      document.body.style.overflow = '';
      // Smooth scroll to top of main content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 850);
  }

  document.getElementById('storySkip').addEventListener('click', dismiss);

  // Watch for reaching final chapter — auto-dismiss after 5s
  const finalObserver = setInterval(() => {
    if (current === CHAPTERS.length - 1) {
      clearInterval(finalObserver);
      setTimeout(dismiss, 5000);
    }
  }, 500);

  /* ─── Lock scroll on main page while overlay active ─────────── */
  document.body.style.overflow = 'hidden';

  /* ─── Init train position ────────────────────────────────────── */
  setTimeout(() => {
    trainLen = trainActive.getTotalLength ? trainActive.getTotalLength() : 400;
    trainActive.style.strokeDasharray = trainLen;
    trainActive.style.strokeDashoffset = trainLen;
    // Draw initial dot at very start of path
    if (trainLen > 0) {
      const pt = trainActive.getPointAtLength(0);
      trainDot.setAttribute('cx', pt.x);
      trainDot.setAttribute('cy', pt.y);
    }
    // Tiny animation to show train "arriving" at chapter 1
    animateTrain(0, 0.02, null);
  }, 300);

}, 3700); // Run after gate loader finishes (~3.6s)
