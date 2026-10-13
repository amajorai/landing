import type { NextRequest } from "next/server";

const MARKDOWN: Record<string, string> = {
  "/": `# A Major

A Major is a software company for the agent era, based in Singapore.

## Ryu

Ryu is a managed platform for AI agents, built on open-source infrastructure. Start without building from scratch, add tools with plugins, and turn your agents into apps. Monitor every run and control what your agents can access.

- Product page: https://amajor.ai/products/ryu
- Homepage: https://ryuhq.com

## Contact
- Email: contact@amajor.ai
- Website: https://amajor.ai
`,
  "/services": `# A Major — Services

We build software that scales. Our core services:

## Web Development
Custom web apps, landing pages, and full-stack SaaS platforms.

## Mobile Development
iOS and Android apps built with React Native and Expo.

## AI & Agents
MCP server development, AI agent pipelines, and LLM integrations.

## Consultancy
Technical advisory, architecture reviews, and team augmentation for Singapore enterprises.

Learn more: https://amajor.ai/services
`,
  "/blog": `# A Major — Blog

Articles and insights from the A Major team.

Visit: https://amajor.ai/blog
`,
  "/products": `# A Major — Products

Most AI agents didn't deliver. We build the ones that do — starting with Ryu, a managed platform for AI agents.

Visit: https://amajor.ai/products
`,
};

const FALLBACK = `# A Major

A software company for the agent era. We build Ryu, a managed platform for AI agents.

Contact: contact@amajor.ai
Website: https://amajor.ai
`;

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const body = MARKDOWN[path] ?? FALLBACK;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
