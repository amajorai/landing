export const dynamic = "force-static";

export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: "https://amajor.ai/",
        "service-doc": [
          { href: "https://amajor.ai/llms.txt", type: "text/plain" },
        ],
        describedby: [
          {
            href: "https://amajor.ai/.well-known/ai-plugin.json",
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset), {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
