import { defineMiddleware } from 'astro:middleware';

const USERNAME = import.meta.env.AUTH_USERNAME ?? 'handover';
const PASSWORD = import.meta.env.AUTH_PASSWORD ?? 'EscoTech2024';

const REALM = 'Esco Tech Transformation';

export const onRequest = defineMiddleware((context, next) => {
  // Skip auth in dev if env var opted out (useful for local editing)
  if (import.meta.env.DEV && import.meta.env.AUTH_BYPASS === 'true') {
    return next();
  }

  const authHeader = context.request.headers.get('Authorization');

  if (authHeader?.startsWith('Basic ')) {
    const encoded = authHeader.slice(6);
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(':');
    if (user === USERNAME && pass === PASSWORD) {
      return next();
    }
  }

  return new Response('Unauthorised', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
    },
  });
});
