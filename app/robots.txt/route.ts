export const dynamic = "force-static";

export function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: GPTBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Claude-Web
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Anthropic-AI
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Amazonbot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Bytespider
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: cohere-ai
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Applebot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: FacebookBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Googlebot-Extended
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: CCBot
Allow: /
Disallow: /private/
Disallow: /api/

Content-Signal: ai-train=yes, search=yes, ai-input=yes

Sitemap: https://amajor.ai/sitemap.xml
LLMs: https://amajor.ai/llms.txt
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
