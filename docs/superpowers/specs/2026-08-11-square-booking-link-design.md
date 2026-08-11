# Square Booking Link Integration — Design

**Date:** 2026-08-11
**Status:** Approved for implementation
**Branch:** `feature/square-booking-link`

## Context

Mirari Auto Detailing now has a live Square Appointments booking site:

```
https://book.squareup.com/appointments/grm1qwkz4v668f/location/L5XEW5P5QKT8K
```

Verified live and correct — page title `Mirari Auto Detailing | Book Appointments`, business
email matches the site's contact email, timezone `Australia/Melbourne`.

The Square catalogue mirrors the packages already advertised on the site:

| Square service                        | Service ID                 |
| ------------------------------------- | -------------------------- |
| Essentia (Interior Package)           | `XIG332YUDEMULRBPU5BOVPMX` |
| Claritas (Exterior Package)           | `M7BEF2P63VHJGIPJQUZOIIXG` |
| Ultima (Full Package) Small Car/Hatch | `IWUTCZKDRUZDMU7UK2VF6SE6` |
| Ultima (Large Sedan/SUV)              | `GBH3UJH3LF3CU5BWRGIRCYVR` |
| Ultima (Van/MPV/Ute)                  | `WH3WA6AUDRCWMLAISYD2LW7N` |
| Steam Cleaning (add-on)               | `CMMQENJMS6X44X3V475RULJN` |
| Car Wax (add-on)                      | `N42NHNGXEHI35Y6F6GUKOA4O` |

Per-service deep links of the form `<booking url>/services/<service id>` return HTTP 200.

### Site as it stands

Single-page React 19 + Vite app. Section order: Hero → Services → Portfolio → Reviews →
BookingContact (`#contact`) → Footer.

Every call to action — the navbar `BOOK NOW` button and the hero `READY TO BE MARVELLED`
button — scrolls to `#contact`, whose right column is a Web3Forms inquiry form. That form is
asynchronous lead capture: the customer submits, Calvin reads the email, and replies to arrange
a time.

## The problem

The site's strongest CTAs currently lead to the slowest conversion path. Square offers real
availability and instant confirmation; the site does not surface it anywhere.

Secondary issue found while exploring: on mobile the only `BOOK NOW` button is hidden inside the
hamburger dropdown, so a phone visitor sees no booking CTA until they open the menu.

## Decision

**Square becomes the primary conversion path. The inquiry form is demoted to a secondary,
collapsed channel — not deleted.**

The two channels do different jobs. Square is transactional (choose package, pick a slot, done).
The form is lead capture for visitors who are not ready to commit to a time: custom or unusual
vehicles, fleet enquiries, questions about a vehicle's condition, price negotiation. Deleting it
gives up that path for no gain; presenting both at equal visual weight creates the classic
two-CTA problem. The fix is hierarchy, not removal.

## Changes

### 1. `src/config/booking.js` (new)

Holds `BOOKING_URL`, the fallback every call to action points at, and
`bookingUrlForService(service)`.

**Per-package deep links are content, not code.** They live on a `bookingUrl` field on the Sanity
`service` document, so Calvin can repoint a package — or add a new one — without a code change,
and they survive Square services being recreated with new IDs. `bookingUrlForService` returns
that field when set and falls back to the main booking page when it is blank.

Ultima is deliberately left blank. It has three vehicle-size variants in Square, so deep-linking
would pick one on the customer's behalf; the main booking page lets them select the correct size.
Blank-means-fallback is the general rule, so a newly added package works from the moment it is
created and degrades gracefully rather than breaking.

### 1a. Sanity `service` schema

New optional `bookingUrl` field (type `url`, https only), described in the studio as: open the
Square booking site, click the package, copy the address bar. Blank sends customers to the main
booking page.

The front-end query is `*[_type == "service"]`, which already returns every field, so no query
change is needed.

### 2. Navbar (`src/components/Navbar.jsx`)

- Desktop and mobile-menu `BOOK NOW` become external links to `BOOKING_URL`
  (`target="_blank"`, `rel="noopener noreferrer"`, external-link icon).
- New compact `BOOK` pill on mobile, beside the hamburger, closing the mobile CTA gap.
- The `CONTACT` nav link still scrolls to `#contact` — that section remains the place for phone,
  email, service area, and the enquiry form.

### 3. Services (`src/components/Services.jsx`)

Each package card gains a primary `BOOK <TITLE>` button that deep-links to that package on
Square. The existing `Explore Package` disclosure stays as the secondary action, so the card now
reads: read the package → book it, or expand for inclusions.

### 4. BookingContact (`src/components/BookingContact.jsx`)

Left column keeps phone, email, and service area. Its intro copy is rewritten to lead with online
booking and offer call/email/enquiry as alternatives.

Right column is restructured into two stacked cards:

1. **BOOK ONLINE** (primary) — a three-step explainer (choose your package → pick a date and time
   → instant confirmation), a full-width button to `BOOKING_URL`, and a note that booking is
   handled securely by Square and opens in a new tab.
2. **Enquiry** (secondary) — a collapsed disclosure headed "Something custom in mind?" that
   expands the existing Web3Forms form, using the same `AnimatePresence` height animation already
   used by the service cards.

The form itself is unchanged functionally: same Web3Forms access key, same Sanity-driven service
dropdown, same success and error states.

### 5. Footer

Unchanged. The booking section sits directly above it; another link would be redundant.

## Alternatives considered

**Embed the Square booking flow in an iframe.** Technically possible — Square sends no
`X-Frame-Options` header and its CSP has no `frame-ancestors` directive, so the page is framable
today. Rejected: the white Square UI clashes with the site's dark, motion-heavy design; nested
scrolling is poor on mobile; payment steps carry more trust on Square's own domain and visible
URL; and Square could add `frame-ancestors` at any time, silently breaking the only booking path.

**Delete the inquiry form and replace it with the Square link.** Simplest possible hierarchy and
one less channel to monitor. Rejected: gives up lead capture from visitors who will not book
blind, and from custom, fleet, or unusual-vehicle jobs that need a conversation on price first.
The form already works and costs nothing to keep. Worth revisiting if submissions turn out to be
noise once booking is live.

**Send the hero CTA straight to Square.** Rejected: hero visitors have not seen the packages yet.
Pushing them off-site before they know what they are buying is premature. It continues to scroll
to `#contact`, where booking is now the primary action anyway.

## Acceptance criteria

- Navbar `BOOK NOW` (desktop and mobile menu) and the new mobile `BOOK` pill open the Square
  booking site in a new tab.
- A package with `bookingUrl` set deep-links to that Square service; a package with it blank
  opens the main booking page. Essentia and Claritas carry deep links, Ultima does not.
- `#contact` presents online booking as the primary action, with the enquiry form collapsed
  beneath it and expanding on click.
- The enquiry form still submits successfully through Web3Forms and still populates its service
  dropdown from Sanity.
- All external links use `target="_blank"` and `rel="noopener noreferrer"`.
- `npm run lint` and `npm run build` pass; dev server runs with no console errors.
