// Shared UI translations for chrome (Header, Footer, language switcher).
// Page-level content is translated inline in each /en/*.astro file.

import type { Lang } from './routes';

export const ui = {
  de: {
    'nav.angebot': 'Angebot',
    'nav.arbeitsweise': 'Arbeitsweise',
    'nav.ueber-mich': 'Über mich',
    'nav.kontakt': 'Kontakt',
    'nav.menu-open': 'Menü öffnen',
    'footer.tagline': 'Strategische Video- und Content-Produktion für Unternehmen.',
    'footer.nav-heading': 'Navigation',
    'footer.contact-heading': 'Kontakt',
    'footer.legal-heading': 'Rechtliches',
    'footer.legal-imprint': 'Impressum',
    'footer.legal-privacy': 'Datenschutz',
    'footer.location': 'Deutschland',
    'footer.also-for': 'Auch für Hochzeiten:',
    'lang.switcher-aria': 'Sprache wechseln',
    'lang.de': 'DE',
    'lang.en': 'EN',
  },
  en: {
    'nav.angebot': 'Services',
    'nav.arbeitsweise': 'Approach',
    'nav.ueber-mich': 'About',
    'nav.kontakt': 'Contact',
    'nav.menu-open': 'Open menu',
    'footer.tagline': 'Strategic video and content production for companies.',
    'footer.nav-heading': 'Navigation',
    'footer.contact-heading': 'Contact',
    'footer.legal-heading': 'Legal',
    'footer.legal-imprint': 'Imprint',
    'footer.legal-privacy': 'Privacy',
    'footer.location': 'Germany',
    'footer.also-for': 'Also for weddings:',
    'lang.switcher-aria': 'Switch language',
    'lang.de': 'DE',
    'lang.en': 'EN',
  },
} as const;

export type UIKey = keyof typeof ui.de;

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.de[key];
}
