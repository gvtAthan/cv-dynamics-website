# C&V Dynamics website

The public website for C&V Dynamics Inc., built from the approved Figma mockup
([UI Mockup – C&V](https://www.figma.com/design/EzyuKDuiZXzQQchzycDXqI/UI-Mockup---C-V)).

Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript. All pages are static;
the only server code is the form endpoint at `/api/contact`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

Node 20.9 or newer.

## Forms

The Contact and Rental forms post to `/api/contact`, which emails the team through
[Resend](https://resend.com). Copy `.env.example` to `.env.local` (or set the same variables
on the host) and fill in:

| Variable | What it is |
|---|---|
| `RESEND_API_KEY` | API key from Resend |
| `CONTACT_TO_EMAIL` | Address(es) that receive messages, comma separated |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend (optional) |

Without the key the forms still validate, but sending shows an error with the phone number and
email address so no visitor is stuck.

## Where things live

| Path | Contents |
|---|---|
| `src/app/` | One folder per page, plus `api/contact`, `sitemap.ts`, `robots.ts` and `not-found.tsx` |
| `src/data/site.ts` | Company details, phone numbers, emails, social links, navigation |
| `src/data/products.ts` | The product catalogue shown on the Products page |
| `src/data/company.ts` | Advantages, core values, software, rental devices, inquiry types |
| `src/components/` | Header, footer, buttons, cards, category bar, forms |
| `src/app/globals.css` | Design tokens (colours, type scale, spacing) from the Figma design system |
| `public/images/` | Product photos, page images and logos |

To add or change a product, edit `src/data/products.ts` and put its photo in
`public/images/products/` with the same name.

## Content still needed from C&V

These show as placeholders on the site until they are filled in (`src/data/site.ts` unless noted):

- Final domain (`cvdynamics.com.ph` or `cvdynamicsinc.com.ph`)
- Facebook and LinkedIn page URLs
- Business hours (Contact page)
- GVT Enterprises Inc. website URL (footer)
- V-Dyna WMS package names and pricing (`src/app/software/v-dyna-wms/page.tsx`)
- Rental terms (`src/app/rentals/page.tsx`)
- Logos as SVG (the site uses the PNGs from the company profile)
