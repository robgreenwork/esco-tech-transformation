// GitHub OAuth proxy for Decap CMS.
// Deployed to Cloudflare Workers. Two routes:
//   /auth       -> redirects to GitHub for sign-in
//   /callback   -> exchanges the code for a token and posts it back to Decap
//
// Required Worker secrets (set with `wrangler secret put ...`):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//
// The site that loads Decap (escotech.robgreen.work) is the only allowed
// postMessage target.

const ALLOWED_ORIGIN = 'https://escotech.robgreen.work';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const redirect = `${url.origin}/callback`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirect);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', state);
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenJson = await tokenRes.json();
      const token = tokenJson.access_token;

      const result = token
        ? { token, provider: 'github' }
        : { error: tokenJson.error_description || 'No token returned' };

      const status = token ? 'success' : 'error';
      const payload = JSON.stringify(result).replace(/</g, '\\u003c');

      // Decap listens for a message string of:
      //   authorization:github:<status>:<JSON payload>
      const html = `<!doctype html>
<html><body>
<script>
  (function () {
    function send() {
      window.opener && window.opener.postMessage(
        'authorization:github:${status}:' + ${JSON.stringify(payload)},
        '${ALLOWED_ORIGIN}'
      );
    }
    window.addEventListener('message', function (e) {
      if (e.data === 'authorizing:github') send();
    });
    send();
  })();
</script>
You can close this window.
</body></html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('ESco Tech CMS OAuth proxy', { status: 200 });
  },
};
