# SparkStudioLab — Landing Page

## Project Overview
- **Name**: SparkStudioLab Landing Page
- **Goal**: Landing page premium/glossy/sophisticated untuk SparkStudioLab — studio yang bikinin demo landing page gratis buat UMKM & komunitas lokal di Purwokerto. Audiens: calon klien yang nimbang kredibilitas studio.
- **Built with**: skill `sparkstudiolab-landing-builder` v1.0.0 (copy, tokens, dan aturan CRO/UX dipatuhi apa adanya)

## URLs
- **Sandbox Preview**: https://3000-ilnfmalfz6xnycu8zofvq-2e77fc33.sandbox.novita.ai
- **Production**: (belum di-deploy — lihat "Recommended Next Steps")

## Fitur Selesai
- ✅ Hero dengan headline outcome + CTA "Lihat portofolio" / "DM kami di Instagram" + trust line
- ✅ **Signature 3D**: panel kaca mengambang (CSS 3D + JS tilt mengikuti mouse, scroll-tilt di mobile) dengan light sheen sweep seperti pantulan kaca
- ✅ Portofolio 2 studi kasus riil: Kedai Sedulur Kalibener (badge **Live** + link demo asli) & Gowes Cantik Purwokerto (badge **Demo terkirim**, tanpa link palsu)
- ✅ Cara kerja 3 langkah (glass cards)
- ✅ Kontak/CTA penutup (Instagram + WhatsApp, tanpa tabel harga)
- ✅ Layer animasi: page-load staggered reveal, scroll-triggered reveal (IntersectionObserver), hover micro-interaction (kartu terangkat + glow ngikutin cursor)
- ✅ Parallax orbs (beda kecepatan dari konten)
- ✅ Efek kain/glossy ambient: ribbon gradient bergerak lembut di background + sheen sweep di panel kontak
- ✅ Design tokens sesuai brief: ink/surface/gold/glass/text + Fraunces·Manrope·JetBrains Mono
- ✅ CRO/UX: kontras AA, focus-visible di semua interaktif, tap target ≥44px, `prefers-reduced-motion` dihormati, responsif penuh, semantic HTML

## Entry URIs
| Path | Deskripsi |
|---|---|
| `/` | Landing page lengkap (hero → portofolio → proses → kontak) |
| `/static/style.css` | Stylesheet (design tokens + animasi) |
| `/static/app.js` | Interaksi: 3D tilt, parallax, reveal, cursor glow |

## Data Architecture
- Situs statis murni — **tidak ada database/storage** (tidak dibutuhkan).

## Belum Diimplementasikan
- Deploy production ke Cloudflare Pages
- Link Instagram/WhatsApp masih placeholder generik (`instagram.com/sparkstudiolab`, `wa.me/`) — ganti dengan handle & nomor asli

## Recommended Next Steps
1. Isi handle Instagram & nomor WhatsApp asli
2. Deploy ke Cloudflare Pages (BYOK via Deploy panel, atau Genspark hosted deploy)
3. (Opsional) Push ke GitHub untuk CI deploy

## Asumsi yang Diambil (sesuai aturan skill "cek unknown")
1. **3D tilt**: dibuat halus (maks ±7° rotasi, lerp 0.09) — signature tapi nggak bikin pusing; pakai CSS 3D + vanilla JS, bukan Three.js, biar ringan & tanpa dependency.
2. **Parallax**: hanya orb dekoratif background (faktor 0.1–0.15), konten utama tidak bergerak.
3. **Mobile**: tilt mouse diganti scroll-based tilt lembut, orb parallax disembunyikan di reduced-motion, nav links di-collapse (tombol Instagram tetap sebagai jalur kontak utama).

## Deployment
- **Platform**: Cloudflare Pages (target) — sandbox preview aktif via wrangler pages dev + PM2
- **Status**: ✅ Sandbox aktif · ❌ Production belum
- **Tech Stack**: Hono + TypeScript + Vanilla CSS/JS (tanpa framework frontend, tanpa CDN berat)
- **Last Updated**: 2026-07-25
