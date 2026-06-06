/* ═══════════════════════════════════════════════════════════════
   DATA FORGE — Premium Scroll Effects Engine v2
   Professional scroll animations per section:
   • Scroll progress bar (shimmer)
   • About: 3D code card flip + letter stagger
   • Vision: Glitch headline + bento card cascade
   • Domains: Perspective card rise with stagger
   • Activities: Spring physics card cascade
   • Join: Clip-circle explosion + particle burst
   • Marquee: Sweep scan light
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── WAIT FOR DOM ────────────────────────────────────────── */
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {

    /* ══════════════════════════════════════════════════════════
       STEP 1 — Strip out old basic reveal classes so we take over
       ══════════════════════════════════════════════════════════ */
    document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-bento').forEach(el => {
      el.classList.remove('reveal-up', 'reveal-left', 'reveal-right', 'reveal-bento');
      el.style.opacity = '';
      el.style.transform = '';
    });

    /* ══════════════════════════════════════════════════════════
       UTILITY FUNCTIONS
       ══════════════════════════════════════════════════════════ */

    // Glitch text: scrambles then resolves to real text
    function glitchIn(el, duration) {
      duration = duration || 900;
      const original = el.textContent;
      const pool = '!<>-_\\/[]{}=+*^?#$%&01▓░▒█▌';
      let frame = 0;
      const total = Math.ceil(duration / 28);
      const id = setInterval(function () {
        el.textContent = original.split('').map(function (ch, i) {
          if (ch === ' ') return ' ';
          return i < (frame / total) * original.length
            ? original[i]
            : pool[Math.floor(Math.random() * pool.length)];
        }).join('');
        frame++;
        if (frame >= total) { clearInterval(id); el.textContent = original; }
      }, 28);
    }

    // Set a group of elements to hidden initial state
    function hide(els, cssText) {
      els.forEach(function (el) {
        if (!el) return;
        el.style.cssText += cssText;
      });
    }

    // Show (animate in) by clearing transforms
    function show(el, extra) {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = extra || 'none';
      el.style.clipPath = '';
      el.style.filter = '';
    }

    // One-shot IntersectionObserver
    function onEnter(el, threshold, callback) {
      if (!el) return;
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          obs.unobserve(el);
          callback();
        });
      }, { threshold: threshold || 0.12, rootMargin: '-30px 0px' });
      obs.observe(el);
    }

    // Delay helper
    function after(ms, fn) { return setTimeout(fn, ms); }

    // Spawn particles around a center point
    function spawnParticles(cx, cy, count) {
      count = count || 24;
      for (var i = 0; i < count; i++) {
        (function (idx) {
          var p = document.createElement('div');
          var size = 3 + Math.random() * 7;
          var color = Math.random() > 0.5 ? '#39ff14' : '#00f5d4';
          var angle = (idx / count) * Math.PI * 2 + Math.random() * 0.5;
          var dist = 80 + Math.random() * 180;
          p.style.cssText = [
            'position:fixed',
            'width:' + size + 'px',
            'height:' + size + 'px',
            'background:' + color,
            'border-radius:50%',
            'pointer-events:none',
            'z-index:9999',
            'left:' + cx + 'px',
            'top:' + cy + 'px',
            'transform:translate(-50%,-50%)',
            'box-shadow:0 0 6px ' + color,
            'transition:transform 1s cubic-bezier(0.16,1,0.3,1),opacity 1s ease'
          ].join(';');
          document.body.appendChild(p);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              p.style.transform = 'translate(calc(-50% + ' + (Math.cos(angle) * dist) + 'px), calc(-50% + ' + (Math.sin(angle) * dist) + 'px)) scale(0)';
              p.style.opacity = '0';
            });
          });
          setTimeout(function () { p.remove(); }, 1100);
        })(i);
      }
    }

    /* ══════════════════════════════════════════════════════════
       1. SCROLL PROGRESS BAR
       ══════════════════════════════════════════════════════════ */
    var progressBar = document.createElement('div');
    progressBar.id = 'df-progress-bar';
    progressBar.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'height:3px',
      'width:0%',
      'z-index:9999',
      'pointer-events:none',
      'background:linear-gradient(90deg,#39ff14,#00f5d4,#39ff14)',
      'background-size:200% 100%',
      'box-shadow:0 0 12px rgba(57,255,20,0.7)',
      'transition:width 0.08s linear'
    ].join(';');
    document.body.appendChild(progressBar);

    var pbarStyle = document.createElement('style');
    pbarStyle.textContent = '#df-progress-bar { animation: dfprogShimmer 1.8s linear infinite; } @keyframes dfprogShimmer { 0%{background-position:0 0} 100%{background-position:200% 0} }';
    document.head.appendChild(pbarStyle);

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      progressBar.style.width = Math.min(scrolled * 100, 100) + '%';
    }, { passive: true });

    /* ══════════════════════════════════════════════════════════
       2. MARQUEE — Sweep scan light
       ══════════════════════════════════════════════════════════ */
    var marquee = document.querySelector('.marquee-strip');
    if (marquee) {
      marquee.style.position = 'relative';
      var sweep = document.createElement('div');
      sweep.style.cssText = [
        'position:absolute',
        'inset:0',
        'background:linear-gradient(90deg,transparent 0%,rgba(57,255,20,0.18) 50%,transparent 100%)',
        'animation:dfSweep 3.5s ease-in-out infinite',
        'pointer-events:none',
        'z-index:2'
      ].join(';');
      marquee.appendChild(sweep);
      var sweepStyle = document.createElement('style');
      sweepStyle.textContent = '@keyframes dfSweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}';
      document.head.appendChild(sweepStyle);
    }

    /* ══════════════════════════════════════════════════════════
       3. ABOUT SECTION — 3D card flip + line stagger
       ══════════════════════════════════════════════════════════ */
    (function () {
      var sec = document.getElementById('about');
      if (!sec) return;

      var tag   = sec.querySelector('.section-tag');
      var h2    = sec.querySelector('.section-h2');
      var body  = sec.querySelector('.about-body');
      var pills = sec.querySelectorAll('.pill');
      var card  = sec.querySelector('.code-card');
      var lines = sec.querySelectorAll('.code-line');

      var T = 'transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);will-change:transform,opacity;';

      // Initial hidden states
      if (tag)  tag.style.cssText  += 'opacity:0;transform:translateX(-60px);' + T;
      if (body) body.style.cssText += 'opacity:0;transform:translateX(-50px);' + T;
      if (card) card.style.cssText += 'opacity:0;transform:perspective(1200px) rotateY(35deg) translateX(80px);' + T;

      if (h2) {
        h2.querySelectorAll('span').forEach(function (sp, i) {
          sp.style.cssText += 'display:inline-block;opacity:0;transform:translateY(55px) skewY(6deg);transition:opacity .65s cubic-bezier(.16,1,.3,1) ' + (.05 + i * .14) + 's,transform .65s cubic-bezier(.16,1,.3,1) ' + (.05 + i * .14) + 's;';
        });
      }

      pills.forEach(function (p, i) {
        p.style.cssText += 'opacity:0;transform:scale(.7) translateY(16px);transition:opacity .4s ease ' + (.35 + i * .06) + 's,transform .4s cubic-bezier(.34,1.56,.64,1) ' + (.35 + i * .06) + 's;';
      });

      lines.forEach(function (l) { l.style.opacity = '0'; });

      onEnter(sec, 0.12, function () {
        // Tag slides in
        if (tag) { tag.style.opacity = '1'; tag.style.transform = 'translateX(0)'; }

        // H2 spans stagger up
        if (h2) {
          h2.querySelectorAll('span').forEach(function (sp) {
            sp.style.opacity = '1'; sp.style.transform = 'translateY(0) skewY(0)';
          });
        }

        // Body + pills
        after(180, function () {
          if (body) { body.style.opacity = '1'; body.style.transform = 'translateX(0)'; }
          pills.forEach(function (p) { p.style.opacity = '1'; p.style.transform = 'scale(1) translateY(0)'; });
        });

        // Code card 3D flip
        after(250, function () {
          if (card) { card.style.opacity = '1'; card.style.transform = 'perspective(1200px) rotateY(0) translateX(0)'; }

          // Type code lines sequentially
          lines.forEach(function (line, i) {
            after(550 + i * 70, function () {
              line.style.transition = 'opacity .25s ease';
              line.style.opacity = '1';
            });
          });
        });
      });
    })();

    /* ══════════════════════════════════════════════════════════
       4. VISION SECTION — Glitch headline + multi-direction bento
       ══════════════════════════════════════════════════════════ */
    (function () {
      var sec = document.getElementById('vision');
      if (!sec) return;

      var tag    = sec.querySelector('.section-tag');
      var h2     = sec.querySelector('.section-h2');
      var accent = h2 ? h2.querySelector('.accent-fill') : null;
      var quote  = sec.querySelector('.vision-quote');
      var cards  = sec.querySelectorAll('.bento-card');

      var T = 'will-change:transform,opacity;transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);';

      if (tag)   tag.style.cssText   += 'opacity:0;transform:translateY(-35px);' + T;
      if (h2)    h2.style.cssText    += 'opacity:0;' + T;
      if (quote) quote.style.cssText += 'opacity:0;transform:scaleX(0);transform-origin:left;transition:opacity .8s ease .3s,transform .9s cubic-bezier(.76,0,.24,1) .3s;';

      // Bento cards — 8 different entry directions
      var dirs = [
        'translateY(-70px) translateX(-50px) scale(.85)',
        'translateY(-70px) scale(.85)',
        'translateY(-70px) translateX(50px) scale(.85)',
        'translateX(-80px) scale(.88)',
        'translateX(80px) scale(.88)',
        'translateY(70px) translateX(-50px) scale(.85)',
        'translateY(70px) scale(.85)',
        'translateY(70px) translateX(50px) scale(.85)',
      ];
      cards.forEach(function (c, i) {
        c.style.cssText += 'opacity:0;transform:' + dirs[i % 8] + ';transition:opacity .65s cubic-bezier(.16,1,.3,1) ' + (.05 + i * .07) + 's,transform .65s cubic-bezier(.16,1,.3,1) ' + (.05 + i * .07) + 's;will-change:transform,opacity;';
      });

      onEnter(sec, 0.10, function () {
        if (tag) { tag.style.opacity = '1'; tag.style.transform = 'translateY(0)'; }

        // Glitch the "Empower" / accent text
        after(80, function () {
          if (h2) {
            h2.style.opacity = '1';
            if (accent) glitchIn(accent, 750);
          }
        });

        // Clip-reveal quote
        after(300, function () {
          if (quote) { quote.style.opacity = '1'; quote.style.transform = 'scaleX(1)'; }
        });

        // Bento cascade
        cards.forEach(function (c) {
          c.style.opacity = '1';
          c.style.transform = 'translateY(0) translateX(0) scale(1)';
        });
      });
    })();

    /* ══════════════════════════════════════════════════════════
       5. DOMAINS SECTION — Perspective card rise
       ══════════════════════════════════════════════════════════ */
    (function () {
      var sec   = document.getElementById('domains');
      if (!sec) return;

      var tag   = sec.querySelector('.section-tag');
      var h2    = sec.querySelector('.section-h2');
      var sub   = sec.querySelector('.section-sub');
      var dcards = sec.querySelectorAll('.dcard');

      var T = 'will-change:transform,opacity;';

      if (tag) tag.style.cssText += 'opacity:0;transform:translateX(-50px);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);' + T;
      if (h2)  h2.style.cssText  += 'opacity:0;transform:translateX(70px) skewX(-8deg);transition:opacity .7s cubic-bezier(.16,1,.3,1) .1s,transform .7s cubic-bezier(.16,1,.3,1) .1s;' + T;
      if (sub) sub.style.cssText += 'opacity:0;transform:translateY(24px);transition:opacity .55s ease .25s,transform .55s ease .25s;' + T;

      // Cards rise up with 3D tilt + stagger
      dcards.forEach(function (c, i) {
        c.style.cssText += [
          'opacity:0',
          'transform:perspective(800px) translateY(90px) rotateX(-20deg) scale(.9)',
          'transition:opacity .65s cubic-bezier(.16,1,.3,1) ' + (i * .055) + 's,transform .65s cubic-bezier(.16,1,.3,1) ' + (i * .055) + 's',
          T
        ].join(';');
      });

      onEnter(sec, 0.10, function () {
        if (tag) { tag.style.opacity = '1'; tag.style.transform = 'translateX(0)'; }
        if (h2)  { h2.style.opacity  = '1'; h2.style.transform  = 'translateX(0) skewX(0)'; }
        if (sub) { sub.style.opacity = '1'; sub.style.transform  = 'translateY(0)'; }

        dcards.forEach(function (c) {
          c.style.opacity = '1';
          c.style.transform = 'perspective(800px) translateY(0) rotateX(0) scale(1)';
        });
      });
    })();

    /* ══════════════════════════════════════════════════════════
       6. ACTIVITIES SECTION — Spring cascade from alternating sides
       ══════════════════════════════════════════════════════════ */
    (function () {
      var sec   = document.getElementById('activities');
      if (!sec) return;

      var tag   = sec.querySelector('.section-tag');
      var h2    = sec.querySelector('.section-h2');
      var cards = sec.querySelectorAll('.act-card');

      var T = 'will-change:transform,opacity;';
      var SPRING = 'cubic-bezier(.34,1.56,.64,1)';

      if (tag) tag.style.cssText += 'opacity:0;transform:translateY(-30px);transition:opacity .5s ease,transform .5s ' + SPRING + ';' + T;
      if (h2)  h2.style.cssText  += 'opacity:0;transform:translateY(45px);transition:opacity .65s ease .08s,transform .65s ' + SPRING + ' .08s;' + T;

      // Alternating left/right cascade; featured card zooms from center
      var transforms = [
        'scale(.55) translateY(60px)',          // featured: zoom up
        'translateX(-110px) translateY(30px)',  // left
        'translateX(110px) translateY(30px)',   // right
        'translateX(-110px) translateY(30px)',  // left
        'translateY(80px) scale(.88)',           // up center
        'translateY(80px) scale(.88)',           // up center
      ];

      cards.forEach(function (c, i) {
        c.style.cssText += [
          'opacity:0',
          'transform:' + (transforms[i] || 'translateY(60px)'),
          'transition:opacity .7s ' + SPRING + ' ' + (.04 + i * .08) + 's,transform .7s ' + SPRING + ' ' + (.04 + i * .08) + 's',
          T
        ].join(';');
      });

      onEnter(sec, 0.10, function () {
        if (tag) { tag.style.opacity = '1'; tag.style.transform = 'translateY(0)'; }
        if (h2)  { h2.style.opacity  = '1'; h2.style.transform  = 'translateY(0)'; }

        cards.forEach(function (c) {
          c.style.opacity = '1';
          c.style.transform = 'scale(1) translateY(0) translateX(0)';
        });
      });
    })();

    /* ══════════════════════════════════════════════════════════
       7. JOIN SECTION — Clip-circle explosion + particles + glitch
       ══════════════════════════════════════════════════════════ */
    (function () {
      var sec     = document.getElementById('join');
      if (!sec) return;

      var content = sec.querySelector('.join-content');
      var h2      = sec.querySelector('.join-h2');
      var accentJ = h2 ? h2.querySelector('.accent-fill') : null;
      var sub     = sec.querySelector('.join-sub');
      var facts   = sec.querySelectorAll('.jf-item');
      var cta     = sec.querySelector('.cta-large');

      // Content box: clip-circle reveal
      if (content) {
        content.style.cssText += [
          'opacity:1',
          'clip-path:circle(0% at 50% 50%)',
          'transition:clip-path 1.1s cubic-bezier(.76,0,.24,1)',
          'will-change:clip-path'
        ].join(';');
      }

      // Inner elements start hidden
      var T2 = 'opacity:0;will-change:transform,opacity;';
      [h2, sub].forEach(function (el) { if (el) el.style.cssText += T2; });
      facts.forEach(function (f)      { f.style.cssText += T2 + 'transform:translateY(18px);'; });
      if (cta) cta.style.cssText += 'opacity:0;transform:scale(.8);will-change:transform,opacity;';

      onEnter(sec, 0.15, function () {
        // 1. Circle explosion reveal
        if (content) {
          content.style.clipPath = 'circle(150% at 50% 50%)';
        }

        // 2. Particle burst from center of join section
        var rect = sec.getBoundingClientRect();
        spawnParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          28
        );

        // 3. Headline fade + glitch
        after(350, function () {
          if (h2) {
            h2.style.transition = 'opacity .7s ease';
            h2.style.opacity = '1';
            if (accentJ) after(100, function () { glitchIn(accentJ, 700); });
          }
        });

        // 4. Subtitle
        after(550, function () {
          if (sub) {
            sub.style.transition = 'opacity .6s ease';
            sub.style.opacity = '1';
          }
        });

        // 5. Facts stagger
        facts.forEach(function (f, i) {
          after(650 + i * 100, function () {
            f.style.transition = 'opacity .45s ease,transform .45s cubic-bezier(.34,1.56,.64,1)';
            f.style.opacity = '1';
            f.style.transform = 'translateY(0)';
          });
        });

        // 6. CTA pop
        after(850, function () {
          if (cta) {
            cta.style.transition = 'opacity .5s ease,transform .5s cubic-bezier(.34,1.56,.64,1)';
            cta.style.opacity = '1';
            cta.style.transform = 'scale(1)';
          }
        });
      });
    })();

    /* ══════════════════════════════════════════════════════════
       8. FOOTER — Slide up softly
       ══════════════════════════════════════════════════════════ */
    (function () {
      var footer = document.getElementById('footer');
      if (!footer) return;
      footer.style.cssText += 'opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1);will-change:transform,opacity;';
      onEnter(footer, 0.05, function () {
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
      });
    })();

    /* ══════════════════════════════════════════════════════════
       9. SECTION HEADINGS — 3D letter drop for h2 with split spans
          (for sections that have standalone h2, not already handled)
       ══════════════════════════════════════════════════════════ */

    /* ══════════════════════════════════════════════════════════
       10. BACKGROUND SCAN LINE — subtle horizontal scan on each section
       ══════════════════════════════════════════════════════════ */
    (function () {
      var style = document.createElement('style');
      style.textContent = [
        '.section::after {',
        '  content:"";',
        '  position:absolute;',
        '  left:0; right:0; height:1px;',
        '  background:linear-gradient(90deg,transparent,rgba(57,255,20,0.08),transparent);',
        '  top:var(--scan-y,50%);',
        '  pointer-events:none;',
        '  z-index:1;',
        '  opacity:0;',
        '  transition:opacity .3s;',
        '}',
        '.section:hover::after { opacity:1; }'
      ].join('');
      document.head.appendChild(style);
    })();

    /* ══════════════════════════════════════════════════════════
       11. CARD MAGNETIC HOVER (subtle 3D tilt on ALL cards)
       ══════════════════════════════════════════════════════════ */
    document.querySelectorAll('.bento-card, .act-card, .dcard').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r   = card.getBoundingClientRect();
        var x   = (e.clientX - r.left) / r.width  - 0.5;
        var y   = (e.clientY - r.top)  / r.height - 0.5;
        var rot = 7;
        card.style.transform = [
          'translateY(-6px)',
          'rotateX(' + (-y * rot) + 'deg)',
          'rotateY(' + (x * rot) + 'deg)',
          'scale(1.02)'
        ].join(' ');
        card.style.transition = 'transform .1s ease, border-color .2s, box-shadow .2s';
        card.style.boxShadow  = '0 20px 60px rgba(0,0,0,.6), 0 0 30px rgba(57,255,20,.18)';
        card.style.borderColor = 'rgba(57,255,20,.5)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s';
        card.style.transform  = '';
        card.style.boxShadow  = '';
        card.style.borderColor = '';
      });
    });

    /* ══════════════════════════════════════════════════════════
       12. HERO — glitch flicker on DATA text every ~7s
       ══════════════════════════════════════════════════════════ */
    (function () {
      var heroH1 = document.getElementById('heroH1');
      if (!heroH1) return;
      var dataSpan = heroH1.querySelector('.h1-outline');
      if (!dataSpan) return;
      function scheduleGlitch() {
        var wait = 5000 + Math.random() * 5000;
        setTimeout(function () {
          glitchIn(dataSpan, 400);
          scheduleGlitch();
        }, wait);
      }
      scheduleGlitch();
    })();

  }); // end onReady

})();
