      # FABBY LUXE admin setup

The redesigned admin screen is available at `http://localhost:3000/admin` after the storefront is running. It requires the API in `server/` to be running and an admin account configured through `server/.env`.

1. Follow the API setup in `README.md`.
2. Generate a bcrypt password hash with:

   ```bash
   cd server
   node -e "require('bcryptjs').hash('REPLACE_WITH_A_LONG_UNIQUE_PASSWORD', 12).then(console.log)"
   ```

3. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and a strong `JWT_SECRET` in `server/.env`.
4. Sign in at `/admin` using the configured email and original password.

The starter supports product creation and viewing products/orders. Editing/deleting products, editing order status from the UI, image uploads, user/customer management, analytics dashboards and audit logs are not yet connected. Do not expose the admin publicly until the API is configured and security-reviewed.
