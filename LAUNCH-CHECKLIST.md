# Launch Checklist — First Up Productions

Step-by-step list of everything that still needs to happen between "code is ready" and "live with custom domain". Tick off as you go.

## 1. Code & repo

- [x] `npm run build` succeeds locally.
- [x] `/impressum` and `/datenschutz` exist with real address.
- [x] Footer links to `/impressum` and `/datenschutz`.
- [x] Layout has Open Graph + Twitter Card + canonical.
- [x] Favicon exists (`/favicon.svg`).
- [x] Contact form rebuilt as Web3Forms-ready with all required fields, honeypot, inline status, privacy note.
- [x] Git repo initialized with first commit.
- [ ] **Confirm or correct e-mail address.** Production currently uses `firstaproductions.media@gmail.com` everywhere; previous code used `firstupproductions.media@gmail.com`. If the new spelling is the real address, no action needed. If it was a typo, do a project-wide find-replace.
- [ ] Create a GitHub repo and push (commands below).

## 2. Web3Forms access key

- [ ] Go to [web3forms.com](https://web3forms.com) and enter `firstaproductions.media@gmail.com` (or whichever final address you confirm).
- [ ] Click **Create Access Key**, confirm via the email Web3Forms sends.
- [ ] Open `src/pages/kontakt.astro` and replace `YOUR_WEB3FORMS_PRODUCTIONS_ACCESS_KEY` with the real key.
- [ ] Commit & push — Cloudflare rebuilds automatically.
- [ ] On the live URL, send one real test submission. Confirm the message arrives at the Gmail inbox.

## 3. GitHub

After creating an empty GitHub repo (private is fine):

```bash
cd C:\Users\Adem\Desktop\FirstUp\productions
git remote add origin git@github.com:<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

(Or use HTTPS: `https://github.com/<user>/<repo>.git`)

## 4. Cloudflare Pages

- [ ] Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
- [ ] **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
- [ ] Build settings:
  - Framework preset: **Astro**
  - Build command: `npm run build`
  - Output directory: `dist`
  - Root directory: `productions` (only if monorepo)
  - Environment variable: `NODE_VERSION = 20`
- [ ] Save & Deploy. Wait ~1 min. Open the `*.pages.dev` URL — site should appear.

## 5. .de domain (external registrar)

- [ ] Buy `firstupproductions.de` at INWX, Strato, IONOS, Namecheap, Hetzner, etc.
- [ ] In Cloudflare → **Websites → Add a site → `firstupproductions.de` → Free plan**.
- [ ] Cloudflare gives you **two nameservers** (e.g. `xena.ns.cloudflare.com`, `walt.ns.cloudflare.com`).
- [ ] In the registrar's control panel: find **Nameservers** and replace the registrar's defaults with the two Cloudflare nameservers.
- [ ] Wait for propagation (5 min – 24 h). Cloudflare emails you when the zone is **Active**.

## 6. Connect custom domain to Cloudflare Pages

Once the Cloudflare zone is active:

- [ ] In Cloudflare Pages → your project → **Custom domains → Set up a custom domain → `firstupproductions.de`**.
- [ ] Cloudflare auto-creates the DNS records.
- [ ] Optionally also add `www.firstupproductions.de` and set a redirect to the apex.
- [ ] HTTPS is provisioned automatically (Cloudflare Universal SSL).
- [ ] Open `https://firstupproductions.de` and confirm the live site loads.

## 7. Legal pages — final review

- [ ] Re-read both pages end-to-end after launch.
- [ ] Have a lawyer or [eRecht24](https://www.e-recht24.de) review them. The current text is a starting point, **not legally final**.
- [ ] Decide whether to keep the phone number publicly visible.

## 8. Business / tax (Germany)

- [ ] Check whether a **Gewerbeanmeldung** is required before charging clients for paid corporate video work — generally yes the moment recurring paid work starts.
- [ ] If yes: register at the local Gewerbeamt (~30 €), then update the Impressum.
- [ ] Check **Kleinunternehmerregelung (§ 19 UStG)**. If applicable, add the standard hint to the Impressum.
- [ ] Optional: research **Künstlersozialkasse** — corporate filmmakers often qualify.

## 9. Mobile / SEO smoke test

- [ ] Open every page on a real phone.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL — aim for >90 mobile.
- [ ] Verify autoplay videos start within a couple of seconds.
- [ ] Submit the URL to Google Search Console once the domain is live.

## 10. Final pre-launch

- [ ] Re-check every email and phone number on the site (Header, Footer, Kontakt, Impressum, Datenschutz).
- [ ] Re-check social links (Instagram + TikTok `@firstupproductions`).
- [ ] Confirm `astro.config.mjs` `site:` matches the live domain.
- [ ] Tag a release commit (`git tag v1.0.0`).
- [ ] Announce.

---

## Files added during launch prep

- `src/pages/impressum.astro` — Impressum (natural person)
- `src/pages/datenschutz.astro` — Datenschutzerklärung (Cloudflare Pages, Web3Forms, Gmail/Google, Google Fonts)
- `public/favicon.svg` — minimal P-mark favicon in brand gold
- `README.md` — full deployment guide for external registrar + Cloudflare DNS workflow
- `.gitignore` — Astro/Node defaults
- `LAUNCH-CHECKLIST.md` — this file

## Files updated during launch prep

- `astro.config.mjs` — added `site: 'https://firstupproductions.de'`
- `src/layouts/Layout.astro` — Open Graph + Twitter Card + canonical + favicon fallbacks + ogImage prop
- `src/pages/kontakt.astro` — `mailto:` form replaced with Web3Forms (placeholder access key, honeypot, inline status, privacy note); new fields: company, project_type select, timeline, budget; required = name, email, message
- `src/components/Footer.astro` — email switched to `firstaproductions.media@gmail.com`
