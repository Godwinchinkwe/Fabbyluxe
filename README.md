# FABBY LUXE — Style That Speaks Luxury

A redesigned Nigerian fashion storefront based on the uploaded Geeluxe React prototype. It includes a responsive luxury-inspired storefront, product discovery, cart and wishlist persistence, checkout/order-request UX, policy page, and a separate Express/MongoDB API starter for future production wiring.

> **Honest status:** the storefront UI is implemented and works with the bundled prototype products. The API starter includes MongoDB-backed product/order endpoints and Paystack test-mode initialization/verification, but the React checkout is not yet wired to those endpoints. Customer authentication, admin CRUD UI/API wiring, stock reservation, email/SMS notifications, image-upload storage, coupons, reviews, and analytics integration are documented as unfinished. Do not accept live payments until those pieces are connected and end-to-end tested.

## What was reused

- React 18 + Create React App setup and dependencies.
- Existing product catalogue data and image assets under `src/data/ProductImage/`.
- Existing cart/wishlist context with localStorage persistence.
- Existing project assets and package lockfile.

The previous UI was replaced with the FABBY LUXE visual system. The previous admin UI was retained in source for reference, but the new storefront does not expose it as a completed production admin portal.

## Requirements

- Node.js 20+ recommended (Node 18+ minimum for the API's built-in `fetch`).
- npm.
- MongoDB Atlas cluster for API development.
- Paystack test keys only while testing.

## Run the storefront locally

1. Extract this ZIP.
2. Open a terminal in the extracted project folder.
3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env` (PowerShell: `Copy-Item .env.example .env`). The default API URL is `http://localhost:5000/api`.
5. Start the storefront:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000`.

The storefront can be browsed without the API running. The current demo cart and wishlist are stored in the browser. The checkout creates a local order request and directs the customer to WhatsApp for confirmation; the Paystack option is clearly labelled as pending backend wiring.

## Run the API starter

1. Create a MongoDB Atlas database and allow access from your development IP. Create a database user with a strong password.
2. In a second terminal:

   ```bash
   cd server
   npm install
   ```

3. Copy `server/.env.example` to `server/.env` and fill in `MONGODB_URI`, `JWT_SECRET`, admin credentials, and the Paystack **test** secret key. Do not commit `.env` files.
4. Set `ADMIN_PASSWORD_HASH` to a bcrypt hash for the admin password. Generate one locally with:

   ```bash
   node -e "require('bcryptjs').hash('REPLACE_WITH_A_LONG_UNIQUE_PASSWORD', 12).then(console.log)"
   ```

   Put the resulting hash into `server/.env`; never put the plain password in the environment file.
5. Start the API:

   ```bash
   npm run dev
   ```

6. Check `http://localhost:5000/api/health`.
7. Optional: add demo products to Atlas with `npm run seed` from the `server` folder.

### API routes included

- `GET /api/health`
- `GET /api/products`, `GET /api/products/:id`
- `POST /api/admin/login`
- `POST /api/admin/products`, `PATCH /api/admin/products/:id`, `DELETE /api/admin/products/:id` (JWT-protected)
- `GET /api/admin/orders`, `PATCH /api/admin/orders/:id` (JWT-protected)
- `POST /api/orders`
- `POST /api/payments/paystack/initialize`
- `GET /api/payments/paystack/verify/:reference`

For Paystack, the server initializes the transaction and checks the verified transaction status, amount, currency and customer email before marking an order paid. The frontend still needs to call these routes using MongoDB product IDs and handle redirects/callback states before this flow is usable from the storefront.

## FABBY LUXE business settings

- Brand: FABBY LUXE
- Tagline: Style That Speaks Luxury.
- WhatsApp: `+2347062760201` (wa.me uses `2347062760201`)
- Customer service: `Agbafabby@outlook.com`
- Pickup: Lagos Port Complex, Apapa
- Categories: Fashion & Accessories, Shoes & Bags, Jewellery
- Currency: NGN (₦)

## Store policies included

- Online orders must be paid before dispatch.
- Delivery or store pickup is available.
- Delivery charges depend on destination and should be confirmed before payment.
- Orders process after payment confirmation.
- Damaged, defective or incorrect items should be reported promptly; exchanges are subject to policy and stock.

## Before production launch — required work

1. **Wire the frontend to the API:** fetch catalogue from MongoDB; use database ObjectIds in order payloads; handle loading, errors, empty states and retries.
2. **Payment checkout:** create order only after validating products/prices on the server; confirm final delivery fee; initialize Paystack; redirect to authorization URL; verify callback server-side; handle cancelled/failed/duplicate callbacks idempotently. Never trust an amount supplied by the browser.
3. **Bank transfer:** configure the actual business account details, show them only at the appropriate checkout stage, and implement manual reconciliation or a verified bank-transfer provider. Never automatically mark transfers paid from a customer screenshot.
4. **Customer accounts:** registration/login, password reset, secure session/token strategy, customer-specific order history and wishlist sync. This starter does not yet implement customer authentication.
5. **Admin dashboard:** connect product/order CRUD to the API, implement image uploads using a private upload signature or trusted storage, add role checks, pagination, audit trail and server-side validation. Existing dashboard components are retained but not integrated into this new UI.
6. **Inventory safety:** reserve/decrement stock atomically when orders are paid; release reservations on timeout/cancellation; prevent overselling.
7. **Coupons, flash sales, reviews, notifications and analytics:** store rules/data in the database and validate eligibility server-side. Add email provider credentials and consent/opt-out handling for notifications.
8. **Delivery and returns:** configure actual service areas, delivery fee table, estimated timelines and a complete returns/exchange policy.
9. **Security:** use strong unique secrets, HTTPS, rate limits on auth/payment routes, validate all request payloads, restrict CORS to the deployed domain, add monitoring/backups, and never commit `.env` files.
10. **QA:** test mobile layouts, image fallbacks, checkout failure paths, Paystack test cards, duplicate callbacks, stock race conditions, accessibility and browser refresh/deep links.

## Deploy later

The selected deployment for this phase is local development. For launch, deploy the frontend (e.g. Vercel) and API (e.g. Render or another Node host), use MongoDB Atlas, configure environment variables in each hosting dashboard, add the production domain to CORS, and switch from Paystack test keys only after successful end-to-end testing and business verification.

## Existing logo

The uploaded prototype contains `public/gee.png`, which appears to be a stylized “G” mark rather than a confirmed FABBY LUXE logo. It is preserved as an asset but is not presented as the brand logo. Replace it with the approved FABBY LUXE logo file when available.
