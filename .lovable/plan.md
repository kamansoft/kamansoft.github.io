# Section switches, simpler contact, floating WhatsApp bubble

## What you get
1. **One settings file to turn sections on/off** — a simple list (Hero, Services, Approach, Process, Portfolio, Team, Blog, Contact, Footer) each set to on or off. Changing a value shows/hides that section and its menu link.
2. **Hidden for now:** "Proven Success Stories" (Portfolio) — switched off, menu link removed.
3. **New "Get In Touch" section without the form** — the form is removed; instead three big, clickable contact cards:
   - Email: contact@kamansoft.com (opens mail)
   - WhatsApp (opens a chat)
   - Instagram (opens the profile)
   The old invented phone, office address and hours are removed.
4. **Floating WhatsApp bubble** — a round green WhatsApp button in the bottom-right corner that fades in once the visitor scrolls down to the Get In Touch section, then stays visible over the site. Clicking it opens a WhatsApp chat with a short pre-written greeting.

## Needed from you
- Your WhatsApp number (with country code, e.g. +57 ...)
- Your Instagram handle
Until provided, I'll use clearly marked placeholders.

## Technical details
- New `src/data/site.json` with `sections: { hero: true, portfolio: false, ... }`, read via a `SiteConfigJsonAdapter` + `SiteConfigService` (matches existing adapter/service pattern). `Index.tsx` renders sections from an ordered registry filtered by the config; `Navigation.tsx` builds its links from the same config.
- `contact.json` rewritten: header + `channels` (email, whatsapp, instagram with href, label, icon). `Contact.tsx` renders channel cards; form code removed. `ContactDataService` updated types.
- New `WhatsAppBubble.tsx`: IntersectionObserver on `#contact`; once seen, sets visible (fixed bottom-6 right-6, z-50, fade/scale-in, respects reduced motion). Number/message from `contact.json`. Only renders if the contact section is enabled.
- Update placeholders memory and AGENTS.md rule for the section config.
