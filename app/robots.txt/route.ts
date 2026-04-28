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

User-agent: Google-Extended
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: ChatGPT-User
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Applebot-Extended
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: Meta-ExternalAgent
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: DuckAssistBot
Allow: /
Disallow: /private/
Disallow: /api/

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: omgili
Disallow: /

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
