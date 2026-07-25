import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

/* ══════════════════════════════════════════════════════════════════════
 * ⚠️  KONTAK — PERLU DIISI MANUAL
 * ══════════════════════════════════════════════════════════════════════
 * Nomor WhatsApp SparkStudioLab BELUM tersedia dari owner.
 * Selama nilainya masih string kosong, tombol "Chat WhatsApp" TIDAK
 * dirender sama sekali (biar nggak ada tombol mati di production).
 * Begitu diisi, tombolnya muncul otomatis — nggak perlu ubah apa-apa lagi.
 *
 * Format: kode negara tanpa "+", tanpa spasi/strip. Contoh: '6281234567890'
 */
const WA_NUMBER = '' // ← ganti nomor WA asli di sini

/* Instagram: handle di bawah SUDAH TERKONFIRMASI akun asli & aktif.
 * BUKAN placeholder — jangan diubah. */
const IG_HANDLE = 'sparkstudiolab'

const IG_URL = `https://instagram.com/${IG_HANDLE}`
const WA_URL = WA_NUMBER
  ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo SparkStudioLab, saya mau tanya soal demo landing page untuk usaha saya.')}`
  : ''

const SITE_URL = 'https://sparkstudiolab.pages.dev'
const SITE_TITLE = 'SparkStudioLab — Studio Desain Web Purwokerto'
const SITE_DESC = 'SparkStudioLab bikinin demo landing page gratis buat UMKM dan komunitas di Purwokerto. Lihat dulu hasil jadinya — baru mikir mau lanjut atau nggak.'

/* Favicon inline (data-URI) — nol request tambahan, sekaligus mematikan
 * 404 /favicon.ico yang muncul sebagai console error. */
const FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#110E0C"/><text x="32" y="45" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="40" fill="#C9A15A" text-anchor="middle">S</text></svg>`
)}`

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${SITE_TITLE}</title>
<meta name="description" content="${SITE_DESC}">
<meta name="theme-color" content="#110E0C">
<link rel="canonical" href="${SITE_URL}/">
<link rel="icon" href="${FAVICON}">
<link rel="apple-touch-icon" href="/static/og.png">

<!-- Open Graph / Twitter — penting: jalur utama kontak lewat DM Instagram,
     jadi link ini sering dibagikan di chat & sosial. -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="SparkStudioLab">
<meta property="og:locale" content="id_ID">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:title" content="${SITE_TITLE}">
<meta property="og:description" content="${SITE_DESC}">
<meta property="og:image" content="${SITE_URL}/static/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="SparkStudioLab — website yang bikin usaha lokal kelihatan sudah lama besar.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${SITE_TITLE}">
<meta name="twitter:description" content="${SITE_DESC}">
<meta name="twitter:image" content="${SITE_URL}/static/og.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet">
</head>
<body>

<a href="#main-content" class="skip-link">Lompat ke konten utama</a>

<div id="ambient-ribbon" aria-hidden="true"></div>

<header id="site-header">
  <nav id="main-nav" aria-label="Navigasi utama">
    <a href="#hero-section" class="nav-wordmark">Spark<span>Studio</span>Lab</a>
    <div class="nav-links">
      <a href="#portofolio" class="nav-pill">Portofolio</a>
      <a href="#proses" class="nav-pill">Proses</a>
      <a href="#kontak" class="nav-pill">Kontak</a>
    </div>
    <a href="${IG_URL}" target="_blank" rel="noopener" class="btn btn-outline nav-ig">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      Instagram
      <span class="sr-only">(buka di tab baru)</span>
    </a>
  </nav>
</header>

<main id="main-content">
  <!-- ============ HERO ============ -->
  <section id="hero-section">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow reveal" data-stagger="1">Studio desain web — Purwokerto</p>
        <h1 class="hero-headline reveal" data-stagger="2">Website yang bikin usaha lokal <em>kelihatan sudah lama besar.</em></h1>
        <p class="hero-sub reveal" data-stagger="3">SparkStudioLab bikinin demo landing page gratis buat UMKM dan komunitas di Purwokerto. Kamu lihat dulu hasil jadinya — baru mikir mau lanjut atau nggak.</p>
        <div class="hero-cta reveal" data-stagger="4">
          <a href="#portofolio" class="btn btn-gold">Lihat portofolio</a>
          <a href="${IG_URL}" target="_blank" rel="noopener" class="btn btn-ghost">DM kami di Instagram<span class="sr-only"> (buka di tab baru)</span></a>
        </div>
        <p class="trust-line reveal" data-stagger="5">Berbasis di Purwokerto&ensp;·&ensp;Proses lewat demo langsung, bukan proposal PDF</p>
      </div>

      <!-- Signature: floating glass panels, 3D tilt -->
      <div class="hero-visual reveal" data-stagger="3" aria-hidden="true" role="presentation">
        <div id="glass-stage">
          <div class="glass-panel panel-back" data-depth="0.4">
            <div class="gp-bar"><i></i><i></i><i></i></div>
            <div class="gp-lines"><span style="width:70%"></span><span style="width:45%"></span><span style="width:58%"></span></div>
          </div>
          <div class="glass-panel panel-main" data-depth="1">
            <div class="gp-bar"><i></i><i></i><i></i></div>
            <div class="gp-hero-block"></div>
            <div class="gp-lines"><span style="width:82%"></span><span style="width:60%"></span></div>
            <div class="gp-chip">kedai-sedulur-demo.pages.dev</div>
            <div class="gp-sheen"></div>
          </div>
          <div class="glass-panel panel-front" data-depth="1.6">
            <span class="badge badge-live"><i class="dot"></i>Live</span>
          </div>
        </div>
      </div>
    </div>
    <div class="parallax-orb orb-gold" data-parallax="0.15" aria-hidden="true"></div>
    <div class="parallax-orb orb-mint" data-parallax="-0.1" aria-hidden="true"></div>
  </section>

  <!-- ============ PORTOFOLIO ============ -->
  <section id="portofolio">
    <div class="section-head reveal">
      <p class="eyebrow">Bukti kerja</p>
      <h2>Portofolio</h2>
      <p class="section-sub">Dua studi kasus — ditampilkan apa adanya.</p>
    </div>
    <div class="case-grid">
      <article class="case-card glass-card reveal" data-stagger="1">
        <div class="case-top">
          <span class="case-num">01</span>
          <span class="badge badge-live"><i class="dot"></i>Live</span>
        </div>
        <h3 class="case-title">Kedai Sedulur Kalibener</h3>
        <p class="case-tag">Kedai kopi lokal</p>
        <p class="case-desc">Demo landing page buat kedai kopi di Kalibener — fokus ke suasana yang hangat dan info yang gampang dicari: menu, jam buka, lokasi.</p>
        <a href="https://kedai-sedulur-demo.pages.dev" target="_blank" rel="noopener" class="case-link">Buka demo live
          <span class="sr-only">— Kedai Sedulur Kalibener (buka di tab baru)</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>
        </a>
      </article>
      <article class="case-card glass-card reveal" data-stagger="2">
        <div class="case-top">
          <span class="case-num">02</span>
          <span class="badge badge-sent"><i class="dot"></i>Demo terkirim</span>
        </div>
        <h3 class="case-title">Gowes Cantik Purwokerto</h3>
        <p class="case-tag">Komunitas gowes</p>
        <p class="case-desc">Demo buat komunitas gowes cewek di Purwokerto — dibikin buat nunjukin kegiatan komunitas dan bikin calon anggota gampang gabung.</p>
        <span class="case-status">Demo terkirim, nunggu balesan</span>
      </article>
    </div>
  </section>

  <!-- ============ PROSES ============ -->
  <section id="proses">
    <div class="section-head reveal">
      <p class="eyebrow">Cara kerja</p>
      <h2>Tiga langkah, tanpa ribet</h2>
    </div>
    <ol class="steps-grid">
      <li class="step-card glass-card reveal" data-stagger="1">
        <span class="step-num">1</span>
        <h3>Ceritain usahamu</h3>
        <p>Kirim info singkat soal usaha atau komunitas kamu lewat DM — nggak perlu brief yang formal.</p>
      </li>
      <li class="step-card glass-card reveal" data-stagger="2">
        <span class="step-num">2</span>
        <h3>Kami bikinin demo</h3>
        <p>Kami desain landing page-nya dari nol, biasanya selesai dalam beberapa hari.</p>
      </li>
      <li class="step-card glass-card reveal" data-stagger="3">
        <span class="step-num">3</span>
        <h3>Kamu yang putuskan</h3>
        <p>Suka hasilnya? Kita lanjut ngobrol. Belum pas? Nggak ada kewajiban apa-apa.</p>
      </li>
    </ol>
  </section>

  <!-- ============ KONTAK ============ -->
  <section id="kontak">
    <div class="contact-panel glass-card reveal">
      <div class="contact-sheen" aria-hidden="true"></div>
      <h2>Mau usahamu jadi <em>studi kasus berikutnya?</em></h2>
      <p class="section-sub">Nggak ada paket harga baku — tiap project kita mulai dari ngobrol dan lihat kebutuhan kamu dulu.</p>
      <div class="contact-cta">
        <a href="${IG_URL}" target="_blank" rel="noopener" class="btn btn-gold">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          DM lewat Instagram
          <span class="sr-only">(buka di tab baru)</span>
        </a>
        ${WA_URL ? `<a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-ghost">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.7-1.3 1.3-1.8 1.3-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.9-.5 1.2.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .1 0 .8-.2 1.3Z"/></svg>
          Chat WhatsApp
          <span class="sr-only">(buka di tab baru)</span>
        </a>` : ''}
      </div>
      <p class="contact-handle">Instagram: <strong>@${IG_HANDLE}</strong></p>
    </div>
  </section>
</main>

<footer id="site-footer">
  <div class="footer-inner">
    <a href="#hero-section" class="nav-wordmark footer-mark">Spark<span>Studio</span>Lab</a>
    <p class="footer-tag">Website yang bikin usaha lokal kelihatan sudah lama besar.</p>
    <p class="footer-loc">Purwokerto, Jawa Tengah</p>
    <p class="footer-copy">© 2026 SparkStudioLab</p>
  </div>
</footer>

<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SparkStudioLab',
  description: SITE_DESC,
  url: SITE_URL,
  areaServed: { '@type': 'City', name: 'Purwokerto' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Purwokerto',
    addressRegion: 'Jawa Tengah',
    addressCountry: 'ID'
  },
  sameAs: [IG_URL]
})}</script>

<script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
