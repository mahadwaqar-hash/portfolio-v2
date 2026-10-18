import { handleOptions, errorResponse } from './_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  const url = new URL(req.url);
  return errorResponse(
    'ENDPOINT_NOT_FOUND',
    `The requested API endpoint '${url.pathname}' does not exist on this server.`,
    'Consult https://mahad-works.vercel.app/openapi.json or https://mahad-works.vercel.app/docs for available endpoints.',
    404
  );
}
