/* SparkStudioLab — interactions: 3D tilt, parallax, reveal, cursor glow */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 900px)').matches;

  /* ---------- scroll reveal (IntersectionObserver) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  if (reduceMotion) return; // stop here: no tilt/parallax/glow

  /* ---------- 3D tilt on hero glass stage ---------- */
  var stage = document.getElementById('glass-stage');
  var panels = stage ? stage.querySelectorAll('.glass-panel') : [];
  var tiltX = 0, tiltY = 0, curX = 0, curY = 0, rafTilt = null;

  function renderTilt() {
    curX += (tiltX - curX) * 0.09;
    curY += (tiltY - curY) * 0.09;
    panels.forEach(function (p) {
      var d = parseFloat(p.getAttribute('data-depth')) || 1;
      p.style.transform =
        'rotateY(' + (curX * 7 * d) + 'deg) rotateX(' + (-curY * 6 * d) + 'deg)' +
        ' translateX(' + (curX * 10 * d) + 'px) translateY(' + (curY * 8 * d) + 'px)';
    });
    if (Math.abs(tiltX - curX) > 0.001 || Math.abs(tiltY - curY) > 0.001) {
      rafTilt = requestAnimationFrame(renderTilt);
    } else {
      rafTilt = null;
    }
  }
  function queueTilt() { if (!rafTilt) rafTilt = requestAnimationFrame(renderTilt); }

  if (stage && !isMobile) {
    window.addEventListener('mousemove', function (ev) {
      tiltX = (ev.clientX / window.innerWidth - 0.5) * 2;  // -1..1
      tiltY = (ev.clientY / window.innerHeight - 0.5) * 2;
      queueTilt();
    }, { passive: true });
  }

  /* ---------- parallax orbs + subtle stage drift on scroll ---------- */
  var orbs = document.querySelectorAll('[data-parallax]');
  var rafScroll = null;
  function onScroll() {
    if (rafScroll) return;
    rafScroll = requestAnimationFrame(function () {
      var y = window.scrollY;
      orbs.forEach(function (o) {
        var f = parseFloat(o.getAttribute('data-parallax')) || 0.1;
        o.style.transform = 'translateY(' + (y * f) + 'px)';
      });
      if (stage && isMobile) {
        // mobile: no mouse — gentle scroll-based tilt instead
        tiltY = Math.max(-1, Math.min(1, (y / window.innerHeight) - 0.2));
        tiltX = 0;
        queueTilt();
      }
      rafScroll = null;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- cursor-follow glow on glass cards ---------- */
  if (!isMobile) {
    document.querySelectorAll('.glass-card').forEach(function (card) {
      card.addEventListener('mousemove', function (ev) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }
})();
