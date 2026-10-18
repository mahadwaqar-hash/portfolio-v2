export const RATE_LIMIT_HEADERS: Record<string, string> = {
  // RFC IETF draft standard rate limit headers
  'RateLimit-Limit': '120',
  'RateLimit-Remaining': '119',
  'RateLimit-Reset': '60',
  'RateLimit-Policy': '"120;w=60"',
  // De facto industry standard headers
  'X-RateLimit-Limit': '120',
  'X-RateLimit-Remaining': '119',
  'X-RateLimit-Reset': '60',
};

export const VERSION_HEADERS: Record<string, string> = {
  // REST API Versioning & RFC 8594 Sunset / Deprecation Policy
  'API-Version': '2026-04-01',
  'X-API-Version': '1.0.0',
  'Sunset': 'Wed, 31 Dec 2031 23:59:59 GMT',
  'Deprecation': '@1956527999',
  'Link': '<https://mahad-works.vercel.app/docs#versioning>; rel="deprecation"',
};

export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Sandbox, X-API-Key',
  'Vary': 'Accept',
  ...RATE_LIMIT_HEADERS,
  ...VERSION_HEADERS,
};

export function getEnvironmentHeaders(req?: Request): Record<string, string> {
  if (!req) return {};
  const isSandbox =
    req.headers.get('x-sandbox') === 'true' ||
    req.headers.get('authorization')?.includes('sandbox') ||
    new URL(req.url).searchParams.get('sandbox') === 'true';

  return isSandbox ? { 'X-Environment': 'sandbox' } : { 'X-Environment': 'production' };
}

export function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export function jsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
  req?: Request
): Response {
  const envHeaders = getEnvironmentHeaders(req);
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
      ...envHeaders,
      ...extraHeaders,
    },
  });
}

export function errorResponse(
  code: string,
  message: string,
  hint: string,
  status = 400,
  extraHeaders: Record<string, string> = {},
  req?: Request
): Response {
  const envHeaders = getEnvironmentHeaders(req);
  const rateHeaders: Record<string, string> = { ...extraHeaders };
  if (status === 429) {
    rateHeaders['Retry-After'] = '60';
  }

  return new Response(
    JSON.stringify(
      {
        error: {
          code,
          message,
          hint,
          status,
        },
      },
      null,
      2
    ),
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...CORS_HEADERS,
        ...envHeaders,
        ...rateHeaders,
      },
    }
  );
}
