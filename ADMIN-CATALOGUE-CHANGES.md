# FABBY-LUXE admin catalogue changes

The active app now reads public products and categories from the backend API. The admin dashboard routes are `/admin/login`, `/admin`, `/admin/products`, and `/admin/categories`.

## First-time setup
1. Configure the backend environment using `.env.example` as a template. Never upload a real `.env` file.
2. Set `REACT_APP_API_URL` in your frontend hosting environment to the deployed backend API root ending in `/api`.
3. Set `CLIENT_URL` in the backend to the frontend's exact origin.
4. For production image uploads, configure the three Cloudinary environment variables listed in the backend `.env.example`.
5. Deploy/restart the backend, then deploy the frontend.
6. Visit `/admin/login`, sign in, open **Products**, and click **Import Existing Products** to migrate the old hardcoded catalogue into MongoDB.
7. Verify the product catalogue before removing the old product data file.

The import skips matching name/category pairs, so it can be safely retried if it is interrupted. Review any duplicate-looking products after import because the legacy catalogue may contain different products with identical names.

## Category deletion
Deleting a category does not delete its products. The backend changes those products' category to `uncategorized`, as requested. Assign them to a new category from the product editor when convenient.
