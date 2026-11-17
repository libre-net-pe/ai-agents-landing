import { CANONICAL_URL } from '$lib/site';
import type { RequestHandler } from './$types';

// Sitemap generado en build (no a mano): así no se queda atrás cuando se
// agregue una ruta. `lastmod` es la fecha real en que se regeneró la página.
export const prerender = true;

const LASTMOD = new Date().toISOString().slice(0, 10);

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${CANONICAL_URL}</loc>
		<lastmod>${LASTMOD}</lastmod>
	</url>
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
};
