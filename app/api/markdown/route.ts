import type { NextRequest } from "next/server";

const MARKDOWN: Record<string, string> = {
  "/": `# A Major

A Major is a Singapore software agency specializing in web apps, mobile, SaaS, and AI agent development.

## Services
- Web design and development
- Mobile app development
- SaaS product development
- AI agent and MCP server development
- Enterprise software consultancy

## Contact
- Email: contact@amajor.ai
- Book a call: https://cal.com/jiaweing/amajor
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

Technical articles on web development, AI agents, SaaS, and software engineering.

Visit: https://amajor.ai/blog
`,
  "/projects": `# A Major — Projects

A selection of products and client work built by A Major.

Visit: https://amajor.ai/projects
`,
};

const FALLBACK = `# A Major

Singapore software agency. Web apps, mobile, SaaS, AI agents.

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
