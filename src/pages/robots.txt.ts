export const prerender = true;

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://www.example.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
