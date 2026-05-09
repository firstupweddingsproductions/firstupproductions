# First Up Productions

Cinematic video production brand site for corporate clients, built with Astro + Tailwind. Fully static, deployed on Cloudflare Pages.

## Local development

```bash
npm install
npm run dev      # serves on http://localhost:4321
npm run build    # static output to dist/
npm run preview  # preview the production build locally on http://localhost:4321
```

Node version: 18+ recommended (20+ is fine).

## Deployment on Cloudflare Pages with an external .de registrar

The domain (`firstupproductions.de`) is bought from an external registrar (e.g. INWX, Strato, IONOS, Namecheap, Hetzner), but **DNS is delegated to Cloudflare** so that Cloudflare Pages can serve the site under the apex domain with HTTPS. Hosting stays free on Cloudflare Pages.

### Step 1 — Push to GitHub

1. Create a new GitHub repository (private is fine).
2. Push this `productions/` folder. If the repo also contains `weddings/`, set Cloudflare Pages **Root directory** to `productions`.
3. Confirm `npm run build` works locally.

### Step 2 — Cloudflare Pages project

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the GitHub repo and authorize Cloudflare.
4. Build configuration:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `productions` (only if monorepo)
   - **Environment variables (Production):** `NODE_VERSION = 20`
5. Save & Deploy. Cloudflare runs `npm install && npm run build` and uploads `dist/`. The site is reachable at `https://<project-name>.pages.dev` within ~1 minute.

### Step 3 — Add the domain to Cloudflare as a site / DNS zone

This step is needed because the registrar is external. It moves DNS management to Cloudflare so the apex domain can be pointed at Cloudflare Pages.

1. In Cloudflare → **Websites → Add a site → enter `firstupproductions.de` → Free plan**.
2. Cloudflare scans existing DNS records (probably empty for a new domain).
3. Cloudflare shows you **two nameservers** like `xena.ns.cloudflare.com` and `walt.ns.cloudflare.com`.

### Step 4 — Change nameservers at the external registrar

1. Log into the .de registrar (where the domain was bought).
2. Find the section for **Nameservers / DNS / Nameserver-Einstellungen**.
3. Replace the registrar's default nameservers with the **two Cloudflare nameservers** from Step 3.
4. Save. Propagation usually takes 5 minutes – 24 hours.
5. Cloudflare will email you when the zone goes active (status: ✅ Active).

### Step 5 — Connect the custom domain to Cloudflare Pages

Once the zone is active in Cloudflare:

1. In Cloudflare Pages → your project → **Custom domains → Set up a custom domain → `firstupproductions.de`**.
2. Cloudflare auto-creates the necessary CNAME / AAAA records inside the zone.
3. Repeat for `www.firstupproductions.de` if you want both apex and www. (Recommend: redirect www → apex.)
4. HTTPS is provisioned automatically. No extra setup.

### Step 6 — Verify

- Visit `https://firstupproductions.de` — should serve the live site.
- Test the contact form on `/kontakt` — submit one message and confirm it arrives at `firstupproductions.media@gmail.com`.
- Test on a phone (mobile autoplay, layout).

After every push to `main`, Cloudflare auto-rebuilds. Branch pushes get preview deployments at `<branch>.<project>.pages.dev`.

### Asset size limits

Cloudflare Pages enforces **25 MiB per file**. Current assets:
- `public/showreel.mp4` — 6.0 MB ✅
- `public/portrait.jpg` — 232 KB ✅
- `public/logo.png` — 18 KB ✅

## Video export — recommended settings

For autoplay/background loops on the web:

- **Resolution:** 1080p max (1920×1080).
- **Codec:** H.264 (`libx264`), pixel format `yuv420p` (universal browser support).
- **Bitrate:** ~3–6 Mbit/s for 1080p loops. CRF 23–26 with `-preset slow` is a good balance.
- **Audio:** drop the audio track (`-an`) — hero videos are always `muted`.
- **Faststart:** add `-movflags +faststart` so playback starts before the file is fully loaded.
- **Length:** 10–30 s loop with start/end frames that match closely.
- **Target file size:** 5–20 MB for a hero loop. Avoid huge 4K autoplay files — they waste bandwidth and battery.

**Example ffmpeg command:**
```bash
ffmpeg -i source.mp4 \
  -t 16 \
  -c:v libx264 -crf 25 -preset slow \
  -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  -vf "scale=1920:-2" \
  output.mp4
```

For each video, also extract a poster image:
```bash
ffmpeg -ss 1 -i video.mp4 -frames:v 1 -q:v 4 video-poster.jpg
```

## Contact form (Web3Forms)

The form on `/kontakt` uses [Web3Forms](https://web3forms.com) — no backend needed.

**One-time setup:**
1. Go to [web3forms.com](https://web3forms.com) and enter `firstupproductions.media@gmail.com`.
2. Click **Create Access Key**, confirm via the email Web3Forms sends.
3. Copy the access key.
4. Open `src/pages/kontakt.astro` and replace `YOUR_WEB3FORMS_PRODUCTIONS_ACCESS_KEY` with the real key.
5. Commit & push — Cloudflare rebuilds automatically.

The form includes:
- name, email (required); phone, company, project type, timeline, budget (optional); message (required)
- hidden honeypot field (`botcheck`) for spam protection
- inline success / error feedback, no redirect
- short privacy note linking to `/datenschutz`

If the access key ever needs to be rotated, generate a new one at web3forms.com and replace the value of the `access_key` hidden input.

## Legal pages

`/impressum` and `/datenschutz` are written for a natural person (Adem Kocyigit), **not** for a registered company. Before going live:

- Decide whether to keep the phone number publicly visible.
- Confirm whether a Gewerbeanmeldung (business registration) is required before invoicing — generally yes the moment recurring paid work starts in Germany.
- Once registered, add Gewerbeanmeldung / VAT details to the Impressum.
- Have a lawyer or service like [eRecht24](https://www.e-recht24.de) review both pages before launch.

The current text is a starting point, not legally final.

## Project structure

```
productions/
├── public/                 # static assets served as-is
│   ├── *.jpg, *.png, *.mp4
│   ├── favicon.svg
│   └── logo.png
├── src/
│   ├── components/         # Header, Footer
│   ├── layouts/            # Layout.astro (head, OG tags, fonts)
│   ├── pages/              # one .astro file per route
│   └── styles/             # global.css (Tailwind + custom utilities)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Manual to-dos before launch

See `LAUNCH-CHECKLIST.md`.
