/* SparkStudioLab — interactions: 3D tilt, parallax, reveal, cursor glow */
(function () {
  'use strict';

  var mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqCoarse = window.matchMedia('(hover: none), (max-width: 900px)');

  var reduceMotion = mqMotion.matches;
  var isCoarse = mqCoarse.matches;

  var stage = document.getElementById('glass-stage');
  var panels = stage ? stage.querySelectorAll('.glass-panel') : [];
  var orbs = document.querySelectorAll('[data-parallax]');
  var reveals = document.querySelectorAll('.reveal');

  /* ---------- scroll reveal (IntersectionObserver) ---------- */
  function showAllReveals() {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-visible');
  }

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
    showAllReveals();
  }

  /* ---------- 3D tilt on hero glass stage ---------- */
  /* Damping hanya di sini (CSS transition di .glass-panel sudah dilepas),
     jadi gerakannya responsif tapi tetap halus. */
  var tiltX = 0, tiltY = 0, curX = 0, curY = 0, rafTilt = null;
  var EASE = 0.12;

  function renderTilt() {
    curX += (tiltX - curX) * EASE;
    curY += (tiltY - curY) * EASE;

    for (var i = 0; i < panels.length; i++) {
      var p = panels[i];
      var d = parseFloat(p.getAttribute('data-depth')) || 1;
      p.style.transform =
        'rotateY(' + (curX * 7 * d).toFixed(3) + 'deg) rotateX(' + (-curY * 6 * d).toFixed(3) + 'deg)' +
        ' translate3d(' + (curX * 10 * d).toFixed(2) + 'px,' + (curY * 8 * d).toFixed(2) + 'px,0)';
    }

    if (Math.abs(tiltX - curX) > 0.0008 || Math.abs(tiltY - curY) > 0.0008) {
      rafTilt = requestAnimationFrame(renderTilt);
    } else {
      // snap ke target biar nggak ada sisa sub-pixel yang menggantung
      curX = tiltX; curY = tiltY;
      rafTilt = null;
    }
  }

  function queueTilt() {
    if (reduceMotion) return;
    if (!rafTilt) rafTilt = requestAnimationFrame(renderTilt);
  }

  function resetTilt() {
    tiltX = 0; tiltY = 0;
    queueTilt();
  }

  function clearTilt() {
    if (rafTilt) { cancelAnimationFrame(rafTilt); rafTilt = null; }
    tiltX = tiltY = curX = curY = 0;
    for (var i = 0; i < panels.length; i++) panels[i].style.transform = '';
  }

  function onPointerMove(ev) {
    if (reduceMotion || isCoarse || !stage) return;
    tiltX = (ev.clientX / window.innerWidth - 0.5) * 2;  // -1..1
    tiltY = (ev.clientY / window.innerHeight - 0.5) * 2;
    queueTilt();
  }

  if (stage) {
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    // Bug sebelumnya: panel nyangkut miring saat kursor keluar window / tab hilang fokus.
    document.addEventListener('mouseleave', resetTilt);
    window.addEventListener('blur', resetTilt);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) resetTilt();
    });
  }

  /* ---------- parallax orbs + scroll-tilt di layar sentuh ---------- */
  var rafScroll = null;
  function onScroll() {
    if (reduceMotion || rafScroll) return;
    rafScroll = requestAnimationFrame(function () {
      var y = window.scrollY;

      for (var i = 0; i < orbs.length; i++) {
        var o = orbs[i];
        var f = parseFloat(o.getAttribute('data-parallax')) || 0.1;
        o.style.transform = 'translate3d(0,' + (y * f).toFixed(2) + 'px,0)';
      }

      if (stage && isCoarse) {
        // nggak ada mouse di layar sentuh — pakai tilt lembut berbasis scroll
        tiltY = Math.max(-1, Math.min(1, (y / window.innerHeight) - 0.2));
        tiltX = 0;
        queueTilt();
      }
      rafScroll = null;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- cursor-follow glow on glass cards ---------- */
  var cards = document.querySelectorAll('.glass-card');
  function onCardMove(ev) {
    if (reduceMotion || isCoarse) return;
    var card = ev.currentTarget;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (ev.clientX - r.left).toFixed(1) + 'px');
    card.style.setProperty('--my', (ev.clientY - r.top).toFixed(1) + 'px');
  }
  for (var c = 0; c < cards.length; c++) {
    cards[c].addEventListener('mousemove', onCardMove, { passive: true });
  }

  /* ---------- react ke perubahan preferensi & ukuran layar ----------
     Sebelumnya reduceMotion/isMobile cuma dibaca sekali saat load, jadi
     resize window atau ganti setting OS nggak pernah ke-apply. */
  function applyMotionPref() {
    reduceMotion = mqMotion.matches;
    if (reduceMotion) {
      clearTilt();
      for (var i = 0; i < orbs.length; i++) orbs[i].style.transform = '';
      showAllReveals();
    }
  }
  function applyPointerPref() {
    var was = isCoarse;
    isCoarse = mqCoarse.matches;
    if (was !== isCoarse) resetTilt();
  }

  if (mqMotion.addEventListener) {
    mqMotion.addEventListener('change', applyMotionPref);
    mqCoarse.addEventListener('change', applyPointerPref);
  } else if (mqMotion.addListener) { // Safari lama
    mqMotion.addListener(applyMotionPref);
    mqCoarse.addListener(applyPointerPref);
  }

  applyMotionPref();
})();
