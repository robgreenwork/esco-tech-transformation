# CMS OAuth proxy

Tiny Cloudflare Worker that lets Decap CMS sign you in via GitHub.

## One-time setup

### 1. Create a GitHub OAuth App
Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**

- Application name: `ESco Tech CMS`
- Homepage URL: `https://escotech.robgreen.work`
- Authorization callback URL: `https://escotech-cms-auth.robgreen-work.workers.dev/callback`

Click **Register application**. On the next page, copy the **Client ID**, then click
**Generate a new client secret** and copy that too.

### 2. Install Wrangler (Cloudflare CLI) and sign in
```
npm install -g wrangler
wrangler login
```

(Free Cloudflare account is fine — no credit card required.)

### 3. Deploy the worker
From this `oauth-worker/` folder:
```
wrangler deploy
```

This will publish the worker at `https://escotech-cms-auth.<your-subdomain>.workers.dev`.
If your subdomain isn't `robgreen-work`, edit `site/public/admin/config.yml` to match the
actual URL Wrangler prints.

### 4. Add the secrets
```
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
```

Paste each value when prompted.

### 5. Done
Visit https://escotech.robgreen.work/admin/ — click **Login with GitHub**, authorize the
OAuth app, and you're in. Edits commit to `main` and the site redeploys automatically
within ~2 minutes.
