export interface MultiComparisonRow {
  category: string;
  values: Record<string, string>; // contestant.id -> description
  bestFor?: string; // contestant.id that "wins"
}

export interface MultiComparisonGroup {
  groupTitle: string;
  groupDescription?: string;
  contestants: {
    id: string;
    name: string;
    logo?: string | null;
    logoDark?: string | null;
    badge?: string;
    /** Hex colour used for the initial avatar when no logo exists */
    color?: string;
  }[];
  points: MultiComparisonRow[];
  useCases: { contestant: string; reasons: string[] }[];
}

export interface MultiComparisonConfig {
  slug: string;
  category: "llm" | "agent";
  title: string;
  tagline: string;
  description: string;
  overview: string;
  groups: MultiComparisonGroup[];
  verdict: string;
  verdictDetail: string;
  references: { title: string; url: string; note?: string }[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const multiCompareConfig: MultiComparisonConfig[] = [
  // ─── LLM COMPARISON ──────────────────────────────────────────────
  {
    slug: "llm-comparison",
    category: "llm",
    title: "LLM Comparison 2026",
    tagline:
      "Claude Opus 4.6, GPT-5.4, Gemini 2.5 Pro, DeepSeek V4, Llama 4 Maverick, Mistral Large 3, and Grok 4 — benchmarks, pricing, and real-world performance",
    description:
      "An honest, benchmark-backed comparison of the leading large language models in April 2026: Claude Opus 4.6, GPT-5.4, Gemini 2.5 Pro, DeepSeek V4, Llama 4 Maverick, Mistral Large 3, and Grok 4. Covers context window, pricing, coding ability, reasoning, multimodal support, and open-weights availability.",
    overview:
      "LLM API costs dropped ~80% between early 2025 and April 2026 as open-weight and cost-optimised models matured. Frontier models now cluster above 88% MMLU, making SWE-bench Verified the primary differentiator for engineering teams. This comparison draws from SWE-bench, Artificial Analysis, LMSYS Chatbot Arena, and official provider documentation.",
    groups: [
      {
        groupTitle: "Frontier LLMs",
        groupDescription:
          "The leading large language models as of April 2026, evaluated across key dimensions for production use.",
        contestants: [
          {
            id: "claude",
            name: "Claude Opus 4.6",
            badge: "API Only",
            color: "#D97706",
            logo: "/logos/ai/anthropic_black.svg",
            logoDark: "/logos/ai/anthropic_white.svg",
          },
          {
            id: "gpt",
            name: "GPT-5.4",
            badge: "API Only",
            color: "#10A37F",
            logo: "/logos/ai/openai.svg",
            logoDark: "/logos/ai/openai_dark.svg",
          },
          {
            id: "gemini",
            name: "Gemini 2.5 Pro",
            badge: "API Only",
            color: "#4285F4",
            logo: "/logos/ai/gemini.svg",
          },
          {
            id: "deepseek",
            name: "DeepSeek V4",
            badge: "Open Source",
            color: "#2563EB",
            logo: "/logos/ai/deepseek.svg",
          },
          {
            id: "llama",
            name: "Llama 4 Maverick",
            badge: "Open Weights",
            color: "#0866FF",
            logo: "/logos/ai/meta.svg",
          },
          {
            id: "mistral",
            name: "Mistral Large 3",
            badge: "Open Source",
            color: "#FF7000",
            logo: "/logos/ai/mistral-ai_logo.svg",
          },
          {
            id: "grok",
            name: "Grok 4",
            badge: "Commercial",
            color: "#1D1D1D",
            logo: "/logos/ai/grok-light.svg",
            logoDark: "/logos/ai/grok-dark.svg",
          },
        ],
        points: [
          {
            category: "Context window",
            values: {
              claude: "1M tokens",
              gpt: "128K tokens",
              gemini: "2M tokens",
              deepseek: "1M tokens",
              llama: "10M tokens",
              mistral: "262K tokens",
              grok: "256K tokens",
            },
            bestFor: "llama",
          },
          {
            category: "Input price (per 1M tokens)",
            values: {
              claude: "$5.00",
              gpt: "$2.50",
              gemini: "$1.50",
              deepseek: "$0.30",
              llama: "$0.05–$0.90 (third-party)",
              mistral: "$0.50",
              grok: "$3.00",
            },
            bestFor: "llama",
          },
          {
            category: "Output price (per 1M tokens)",
            values: {
              claude: "$25.00",
              gpt: "$15.00",
              gemini: "$6.00",
              deepseek: "$0.50",
              llama: "Free (self-host) or third-party rates",
              mistral: "$1.50",
              grok: "$15.00",
            },
            bestFor: "llama",
          },
          {
            category: "SWE-bench Verified",
            values: {
              claude: "80.8% (Opus 4.6)",
              gpt: "76.9% (GPT-5.4)",
              gemini: "80.6% (Gemini 2.5 Pro, April 2026)",
              deepseek: "81% (DeepSeek V4)",
              llama: "~65% (Maverick, self-reported)",
              mistral: "~50% (Codestral 2508)",
              grok: "~72% (Grok 4, xAI estimate)",
            },
            bestFor: "deepseek",
          },
          {
            category: "Reasoning (MMLU / GPQA)",
            values: {
              claude: "90.5% MMLU — strong multi-step chain-of-thought",
              gpt: "91.4% MMLU, 92.0% GPQA — top-tier across benchmarks",
              gemini: "94.1% MMLU, 94.3% GPQA Diamond (Gemini 3.1 Pro)",
              deepseek: "~89% MMLU — near-frontier at fraction of cost",
              llama: "~85% MMLU — competitive open-weight reasoning",
              mistral: "~82% MMLU — solid for open-source tier",
              grok: "~88% MMLU — strong real-time data advantage",
            },
            bestFor: "gemini",
          },
          {
            category: "Multimodal support",
            values: {
              claude: "Text + images",
              gpt: "Text + images + audio + video (GPT-5.4)",
              gemini: "Text + images + audio + video (native 2M context)",
              deepseek: "Text only (V4); DeepSeek-VL2 for vision",
              llama: "Text + images + video (Maverick is natively multimodal)",
              mistral: "Text only (Pixtral for vision, separate model)",
              grok: "Text + images",
            },
            bestFor: "gemini",
          },
          {
            category: "Open weights",
            values: {
              claude: "No",
              gpt: "No",
              gemini: "No (Gemma series is open)",
              deepseek: "Yes — Apache 2.0 (V3 series); V4 pending",
              llama: "Yes — Meta Llama license (Maverick & Scout)",
              mistral: "Yes — Apache 2.0",
              grok: "No",
            },
            bestFor: "llama",
          },
          {
            category: "API availability",
            values: {
              claude: "Anthropic API, AWS Bedrock, Google Vertex",
              gpt: "OpenAI API, Azure OpenAI",
              gemini: "Google AI API, Vertex AI",
              deepseek: "DeepSeek API, many third-party providers",
              llama: "Together AI, Groq, Fireworks, Hugging Face, self-host",
              mistral: "Mistral API, Azure, self-host",
              grok: "xAI API only",
            },
            bestFor: "llama",
          },
          {
            category: "Best for",
            values: {
              claude:
                "Long-context reasoning, code generation, autonomous coding agents",
              gpt: "General-purpose tasks, broad ecosystem, audio/voice apps",
              gemini: "Multimodal tasks, Google Workspace, 2M-context analysis",
              deepseek: "Cost-sensitive coding and reasoning at scale",
              llama:
                "Privacy-first self-hosting, ultra-long context (10M tokens)",
              mistral:
                "European data residency, open-source stacks, coding (Codestral)",
              grok: "Real-time data via X platform, 256K reasoning tasks",
            },
          },
        ],
        useCases: [
          {
            contestant: "claude",
            reasons: [
              "Full-repo autonomous coding via Claude Code (80.8% SWE-bench)",
              "1M-context analysis of large codebases or legal documents",
              "Enterprise reasoning with strong instruction following",
              "Agentic multi-step workflows via the Anthropic API",
            ],
          },
          {
            contestant: "gpt",
            reasons: [
              "General-purpose assistant tasks across any domain",
              "Teams already in the OpenAI / Azure ecosystem",
              "Audio input and voice-enabled applications",
              "Broadest third-party plugin and integration support",
            ],
          },
          {
            contestant: "gemini",
            reasons: [
              "Analysing images, audio, and video in a single 2M-context prompt",
              "Google Workspace automation and Docs / Sheets integration",
              "Projects needing the largest context window from a closed model",
              "Cost-optimised inference via Gemini Flash variants",
            ],
          },
          {
            contestant: "deepseek",
            reasons: [
              "High-volume coding or reasoning at 1/10th the cost of GPT-5.4",
              "81% SWE-bench score — highest among budget models",
              "Self-hosted deployments via open-weight V3 series",
              "Teams wanting near-frontier performance on a tight budget",
            ],
          },
          {
            contestant: "llama",
            reasons: [
              "Privacy-sensitive workloads requiring on-premise deployment",
              "Ultra-long context tasks — 10M tokens (Maverick)",
              "Air-gapped or regulated environments",
              "Lowest cost per token at scale via self-hosting",
            ],
          },
          {
            contestant: "mistral",
            reasons: [
              "European data residency and GDPR-first deployments",
              "Multilingual applications across EU languages",
              "Code-heavy tasks via Codestral 2508 (256K context)",
              "Open-source stacks requiring Apache 2.0 licensed models",
            ],
          },
          {
            contestant: "grok",
            reasons: [
              "Real-time social media monitoring and X platform integration",
              "Applications needing live web data without retrieval plugins",
              "Teams on the xAI platform with $25 free credits",
            ],
          },
        ],
      },
    ],
    verdict: "Context-dependent",
    verdictDetail:
      "No single model wins across all dimensions in April 2026. For autonomous coding, DeepSeek V4 (81% SWE-bench) and Claude Opus 4.6 (80.8%) lead on benchmarks — with DeepSeek winning on price. For multimodal and long-context tasks, Gemini 2.5 Pro's 2M context and native video support are unmatched. For privacy-first or constrained budgets, Llama 4 Maverick (open weights, 10M context) is the standout. Mistral remains the top European-compliance open-source pick.",
    references: [
      {
        title: "SWE-bench Leaderboard",
        url: "https://www.swebench.com/",
        note: "Canonical benchmark for evaluating LLMs on real-world software engineering tasks",
      },
      {
        title: "Artificial Analysis — LLM Benchmarks & Pricing",
        url: "https://artificialanalysis.ai/",
        note: "Independent quality, speed, and price comparisons across providers",
      },
      {
        title: "LMSYS Chatbot Arena",
        url: "https://chat.lmsys.org/",
        note: "Human preference rankings via blind A/B comparisons",
      },
      {
        title: "Anthropic Pricing",
        url: "https://www.anthropic.com/pricing",
        note: "Official Claude model pricing (Claude Opus 4.6: $5/$25 per 1M)",
      },
      {
        title: "OpenAI API Pricing",
        url: "https://openai.com/api/pricing/",
        note: "Official GPT model pricing (GPT-5.4: $2.50/$15 per 1M)",
      },
      {
        title: "Google Gemini API Docs",
        url: "https://ai.google.dev/gemini-api/docs/models/",
        note: "Gemini 2.5 Pro: 2M context, $1.50/$6.00 per 1M tokens",
      },
      {
        title: "DeepSeek API Pricing",
        url: "https://api-docs.deepseek.com/quick_start/pricing/",
        note: "DeepSeek V4: $0.30/$0.50 per 1M tokens, 1M context",
      },
      {
        title: "Meta Llama 4 — Maverick & Scout",
        url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
        note: "Llama 4 Maverick: 10M context, open weights, natively multimodal",
      },
      {
        title: "Mistral AI Pricing",
        url: "https://mistral.ai/pricing",
        note: "Mistral Large 3: $0.50/$1.50; Codestral 2508: $0.60/$1.80 per 1M",
      },
      {
        title: "xAI API — Grok",
        url: "https://x.ai/api",
        note: "Grok 4: $3.00/$15.00 per 1M tokens, 256K context",
      },
    ],
    faq: [
      {
        question: "Which LLM has the best SWE-bench score in April 2026?",
        answer:
          "DeepSeek V4 leads at 81% on SWE-bench Verified, closely followed by Claude Opus 4.6 (80.8%) and Gemini 2.5 Pro (80.6%). What's remarkable is that DeepSeek achieves this at $0.30/$0.50 per 1M tokens — roughly 1/50th the cost of Claude. For coding agents using Claude Code, the paired score rises to 92.4% with Claude Sonnet 5.",
      },
      {
        question: "What does 'open weights' mean and why does it matter?",
        answer:
          "Open-weights models release their trained parameters publicly, allowing you to run the model on your own infrastructure. This matters for data privacy (no data sent to a third party), cost at scale (no per-token API fees), and regulatory compliance in jurisdictions with strict data residency requirements. In April 2026, Llama 4 Maverick and DeepSeek V3 are the strongest open-weight options.",
      },
      {
        question: "Is Gemini 2.5 Pro worth it over GPT-5.4?",
        answer:
          "Yes, for multimodal tasks — Gemini 2.5 Pro's 2M native context and support for images, audio, and video in a single prompt is unmatched by GPT-5.4. It's also significantly cheaper ($1.50 vs $2.50 input, $6 vs $15 output). For text-only reasoning, GPT-5.4 and Claude Opus 4.6 are generally preferred based on Chatbot Arena human-preference rankings.",
      },
      {
        question: "Has LLM pricing changed significantly?",
        answer:
          "Yes — dramatically. API costs dropped approximately 80% between early 2025 and April 2026, driven by DeepSeek's cost-efficiency research and competitive pressure. DeepSeek V4 at $0.30/$0.50 per 1M tokens delivers performance that would have required $15–$25 output pricing a year ago. Most frontier models now score above 88% MMLU, making price and context window the primary differentiators.",
      },
      {
        question: "Can I self-host GPT-5.4 or Claude?",
        answer:
          "No — GPT-5.4 (OpenAI) and Claude Opus 4.6 (Anthropic) are closed-source, API-only models. For self-hosting, Llama 4 Maverick and Mistral Large 3 are open-weights and can be run on your own infrastructure via Ollama, vLLM, or Hugging Face TGI. DeepSeek V3 (the predecessor to V4) is also available as open-weight.",
      },
    ],
    relatedSlugs: ["react-vs-vue", "nextjs-vs-nuxt", "vercel-vs-netlify"],
  },

  // ─── AGENT COMPARISON ────────────────────────────────────────────
  {
    slug: "agent-comparison",
    category: "agent",
    title: "AI Agent Comparison 2026",
    tagline:
      "Coding agents (Claude Code, Cursor, Copilot, OpenHands, Aider, Devin) and self-hosted personal AI assistants (Claw ecosystem)",
    description:
      "A benchmark-backed comparison of the leading AI agents in April 2026. Covers coding agents — Claude Code, Cursor Agent, GitHub Copilot Agent, OpenHands, Aider, and Devin — plus the Claw ecosystem of self-hosted personal AI assistants: OpenClaw, ZeroClaw, and IronClaw.",
    overview:
      "AI coding agents have undergone a dramatic shift in 2026: foundation model performance now exceeds purpose-built agent tools on SWE-bench Verified. Claude Code paired with Sonnet 5 scores 92.4%, while IDE-native tools like Cursor sit at 51.7%. This comparison covers both coding agents (SWE-bench benchmarked) and the Claw ecosystem of lightweight self-hosted AI assistants.",
    groups: [
      {
        groupTitle: "Coding Agents",
        groupDescription:
          "Autonomous coding agents evaluated on SWE-bench Verified (April 2026), pricing, openness, and workflow integration.",
        contestants: [
          {
            id: "claudecode",
            name: "Claude Code",
            badge: "CLI Tool",
            color: "#D97706",
            logo: "/logos/ai/anthropic_black.svg",
            logoDark: "/logos/ai/anthropic_white.svg",
          },
          {
            id: "cursor",
            name: "Cursor Agent",
            badge: "IDE",
            color: "#000000",
            logo: "/logos/ai/cursor_light.svg",
            logoDark: "/logos/ai/cursor_dark.svg",
          },
          {
            id: "copilot",
            name: "GitHub Copilot",
            badge: "IDE Plugin",
            color: "#6E40C9",
            logo: "/logos/ai/copilot.svg",
            logoDark: "/logos/ai/copilot_dark.svg",
          },
          {
            id: "openhands",
            name: "OpenHands",
            badge: "Open Source",
            color: "#059669",
          },
          {
            id: "aider",
            name: "Aider",
            badge: "Open Source",
            color: "#2563EB",
          },
          { id: "devin", name: "Devin", badge: "Commercial", color: "#7C3AED" },
        ],
        points: [
          {
            category: "SWE-bench Verified (Apr 2026)",
            values: {
              claudecode: "92.4% (Sonnet 5) / 80.9% (Opus 4.6)",
              cursor: "51.7%",
              copilot: "~55% (Copilot Workspace)",
              openhands: "72% (CodeAct architecture)",
              aider: "~42% (polyglot benchmark)",
              devin: "~40% (original; superseded by foundation models)",
            },
            bestFor: "claudecode",
          },
          {
            category: "Pricing model",
            values: {
              claudecode: "Free CLI; pay Anthropic API directly (~$3–15/task)",
              cursor: "$20/mo Pro, $40/mo Business — model credits included",
              copilot: "$10/mo Individual, $19/mo Business",
              openhands: "Free / self-hosted; pay LLM API costs only",
              aider: "Free / open source; pay LLM API costs only",
              devin: "$500/mo — ACUs (compute units) bundled",
            },
            bestFor: "openhands",
          },
          {
            category: "Open source",
            values: {
              claudecode: "No — Anthropic proprietary CLI",
              cursor: "No — proprietary VS Code fork",
              copilot: "No — GitHub/Microsoft proprietary",
              openhands: "Yes — Apache 2.0 (All Hands AI)",
              aider: "Yes — Apache 2.0",
              devin: "No — Cognition AI proprietary",
            },
            bestFor: "openhands",
          },
          {
            category: "IDE / workflow integration",
            values: {
              claudecode: "Terminal-native; works with any editor via shell",
              cursor: "Deep — VS Code fork with native agent panel",
              copilot: "VS Code, JetBrains, Neovim, Visual Studio",
              openhands: "Web UI + VS Code extension",
              aider: "Terminal-native, git-first workflow",
              devin: "Web UI, Slack integration",
            },
            bestFor: "cursor",
          },
          {
            category: "Model flexibility",
            values: {
              claudecode: "Claude only (Anthropic API)",
              cursor: "Cursor routing + GPT, Claude, Gemini options",
              copilot: "GPT, Claude, Gemini toggleable in settings",
              openhands: "Any OpenAI-compatible API — full model freedom",
              aider: "Any LLM with API; optimised for Claude and GPT",
              devin: "Cognition AI proprietary model, no swap",
            },
            bestFor: "openhands",
          },
          {
            category: "Autonomous scope",
            values: {
              claudecode: "Full repo + terminal + bash execution",
              cursor: "Multi-file, PR-level changes with review gates",
              copilot: "Multi-file, GitHub PR workflow (Copilot Workspace)",
              openhands: "Full repo — sandboxed Docker environment",
              aider: "Multi-file, git-commit level",
              devin: "Full repo + terminal + browser + cloud deployments",
            },
            bestFor: "devin",
          },
          {
            category: "Terminal / shell access",
            values: {
              claudecode: "Yes — full bash in your environment",
              cursor: "Yes — integrated terminal commands",
              copilot: "Limited — Workspace manages it",
              openhands: "Yes — sandboxed Docker container",
              aider: "Yes — runs locally in your shell",
              devin: "Yes — full shell + browser automation",
            },
            bestFor: "claudecode",
          },
          {
            category: "Human-in-the-loop",
            values: {
              claudecode: "Yes — permission prompts for destructive actions",
              cursor: "Yes — review gates before applying diffs",
              copilot: "Yes — PR review workflow",
              openhands: "Configurable — can run fully autonomous",
              aider: "Yes — confirms before each commit",
              devin: "Minimal — reports back after task completion",
            },
            bestFor: "claudecode",
          },
        ],
        useCases: [
          {
            contestant: "claudecode",
            reasons: [
              "Highest SWE-bench score (92.4% with Sonnet 5) — best raw performance",
              "Full-repo tasks where bash and file access are needed alongside edits",
              "Teams already using Anthropic API and wanting direct cost control",
              "Projects requiring careful permission gates on destructive actions",
            ],
          },
          {
            contestant: "cursor",
            reasons: [
              "VS Code users who want a seamless all-in-one IDE experience",
              "Projects requiring multi-file refactors with inline AI review",
              "Developers comfortable with a subscription that bundles model costs",
              "Teams wanting to switch between GPT, Claude, and Gemini backends",
            ],
          },
          {
            contestant: "copilot",
            reasons: [
              "Teams already on GitHub and wanting tight PR integration",
              "Organisations with existing GitHub Enterprise agreements",
              "JetBrains users who need IDE-native AI suggestions",
              "Developers who want flexibility across GPT, Claude, and Gemini",
            ],
          },
          {
            contestant: "openhands",
            reasons: [
              "Teams that want full model flexibility without vendor lock-in",
              "Open-source projects where budget is critical",
              "Enterprise environments requiring self-hosted AI agents",
              "Developers wanting to inspect and modify the agent's code",
            ],
          },
          {
            contestant: "aider",
            reasons: [
              "Developers who prefer a terminal-first, git-native workflow",
              "Projects where you want to control every commit message",
              "Budget-conscious teams — pay only for LLM API calls",
              "Open-source contributors needing lightweight local tooling",
            ],
          },
          {
            contestant: "devin",
            reasons: [
              "Teams needing fully autonomous end-to-end task execution",
              "Projects involving browser automation alongside code changes",
              "Cloud deployment tasks requiring agent-driven infrastructure changes",
              "Organisations willing to pay premium ($500/mo) for minimal supervision",
            ],
          },
        ],
      },
      {
        groupTitle: "Claw Ecosystem — Self-Hosted Personal AI Assistants",
        groupDescription:
          "Lightweight, self-hosted AI assistants designed to run on your own hardware. Evaluated on architecture, resource footprint, and security model.",
        contestants: [
          { id: "openclaw", name: "OpenClaw", color: "#DC2626" },
          { id: "zeroclaw", name: "ZeroClaw", color: "#2563EB" },
          { id: "ironclaw", name: "IronClaw", color: "#374151" },
        ],
        points: [
          {
            category: "Language / runtime",
            values: {
              openclaw: "Python — ~430K LOC, rich feature set",
              zeroclaw: "Rust — single binary, 3.4MB",
              ironclaw: "Rust + WASM — sandboxed plugin architecture",
            },
            bestFor: "zeroclaw",
          },
          {
            category: "RAM footprint",
            values: {
              openclaw: "~1.52GB baseline",
              zeroclaw: "<5MB",
              ironclaw: "~20MB (sandboxed)",
            },
            bestFor: "zeroclaw",
          },
          {
            category: "Startup time",
            values: {
              openclaw: "~6 seconds",
              zeroclaw: "~15ms",
              ironclaw: "~200ms",
            },
            bestFor: "zeroclaw",
          },
          {
            category: "Security model",
            values: {
              openclaw: "Default-on integrations — broad access by design",
              zeroclaw: "Deny-by-default — minimal attack surface",
              ironclaw: "WASM sandbox + credential isolation per plugin",
            },
            bestFor: "ironclaw",
          },
          {
            category: "Messaging integrations",
            values: {
              openclaw: "WhatsApp, Telegram, Slack, Discord, and more",
              zeroclaw: "Minimal — API-first, no bundled integrations",
              ironclaw: "None built-in — add via sandboxed WASM plugins",
            },
            bestFor: "openclaw",
          },
          {
            category: "Best for",
            values: {
              openclaw:
                "Comprehensive personal assistant with broad messaging support",
              zeroclaw:
                "Ultra-constrained hardware (IoT, edge devices, embedded)",
              ironclaw:
                "Secure enterprise deployments, plugin-based extensibility",
            },
          },
        ],
        useCases: [
          {
            contestant: "openclaw",
            reasons: [
              "Personal assistant use cases needing WhatsApp or Telegram integration",
              "Developers comfortable with Python who want to extend functionality",
              "Home lab setups where RAM is not a constraint",
              "Broad messaging platform support out of the box",
            ],
          },
          {
            contestant: "zeroclaw",
            reasons: [
              "IoT or edge devices with <64MB RAM",
              "Embedded systems requiring a single static binary",
              "Security-conscious users who want deny-by-default behaviour",
              "Sub-100ms response latency requirements",
            ],
          },
          {
            contestant: "ironclaw",
            reasons: [
              "Enterprise environments requiring plugin isolation and credential separation",
              "Teams building custom plugins without risking host system access",
              "Projects where WASM sandboxing is a compliance requirement",
              "Mixed-trust environments where third-party plugins must be contained",
            ],
          },
        ],
      },
    ],
    verdict: "Context-dependent",
    verdictDetail:
      "For coding agents in April 2026, Claude Code leads decisively on SWE-bench Verified (92.4% with Sonnet 5) — a significant jump from IDE-native tools like Cursor (51.7%) and GitHub Copilot (~55%). OpenHands (72%) is the top open-source pick with full model flexibility. For the Claw ecosystem: ZeroClaw wins on raw performance and minimal footprint; IronClaw on security architecture; OpenClaw on out-of-the-box messaging integrations.",
    references: [
      {
        title: "SWE-bench Verified Leaderboard",
        url: "https://www.swebench.com/",
        note: "Canonical benchmark for evaluating coding agents on real GitHub issues",
      },
      {
        title: "Claude Code vs GitHub Copilot 2026",
        url: "https://tech-insider.org/claude-code-vs-github-copilot-2026/",
        note: "Independent comparison of Claude Code and Copilot SWE-bench scores",
      },
      {
        title: "Cursor vs Claude Code vs GitHub Copilot 2026",
        url: "https://www.nxcode.io/resources/news/cursor-vs-claude-code-vs-github-copilot-2026-ultimate-comparison",
        note: "Comprehensive 2026 coding agent benchmark comparison",
      },
      {
        title: "OpenHands Documentation",
        url: "https://docs.all-hands.dev/",
        note: "All Hands AI — OpenHands (formerly OpenDevin) official docs",
      },
      {
        title: "Aider LLM Leaderboard",
        url: "https://aider.chat/docs/leaderboards/",
        note: "Aider's polyglot benchmark results across LLM backends",
      },
      {
        title: "Devin SWE-bench Technical Report",
        url: "https://www.cognition.ai/blog/swe-bench-technical-report",
        note: "Cognition AI's Devin benchmark methodology",
      },
      {
        title: "GitHub Copilot Documentation",
        url: "https://docs.github.com/en/copilot",
        note: "Official GitHub Copilot Workspace and Agent docs",
      },
      {
        title: "Claude Code Documentation",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        note: "Official Anthropic Claude Code docs",
      },
      {
        title: "Claw Ecosystem Overview",
        url: "https://evoailabs.medium.com/openclaw-nanobot-picoclaw-ironclaw-and-zeroclaw-this-claw-craziness-is-continuing-87c72456e6dc",
        note: "Overview of OpenClaw, IronClaw, and ZeroClaw from EvoAI Labs",
      },
      {
        title: "ZeroClaw",
        url: "https://zeroclaw.net/",
        note: "Official ZeroClaw project page",
      },
      {
        title: "Self-Hosted AI Agents Compared (LushBinary)",
        url: "https://lushbinary.com/blog/best-self-hosted-ai-agents-hermes-openclaw-ironclaw-compared/",
        note: "Independent comparison of OpenClaw, IronClaw, and alternatives",
      },
    ],
    faq: [
      {
        question:
          "Why does Claude Code score so much higher than Cursor in 2026?",
        answer:
          "Claude Code at 92.4% (Sonnet 5) reflects the maturity of Anthropic's model paired with a terminal-native scaffold that can read full repos and execute bash. Cursor at 51.7% is optimised for interactive IDE experience rather than autonomous SWE-bench-style task completion. The gap reflects different design goals — Cursor is excellent for daily interactive coding; Claude Code is better for autonomous multi-step engineering tasks.",
      },
      {
        question: "What is SWE-bench Verified and why does it matter?",
        answer:
          "SWE-bench Verified is a curated subset of 500 manually verified GitHub issues where an AI agent must write code changes, run tests, and produce a passing pull request — without human assistance. It's the most credible public benchmark for autonomous coding capability as of 2026.",
      },
      {
        question: "Is Devin still worth it at $500/month?",
        answer:
          "Devin's original SWE-bench advantage (~40%) has been eclipsed by Claude Code (92.4%) and OpenHands (72%). Devin's value proposition is now its end-to-end autonomy for longer-horizon tasks involving browser automation and cloud deployments — not raw coding benchmarks. Teams with those specific needs may still find it useful; for pure code generation, OpenHands or Claude Code are better value.",
      },
      {
        question: "What is the Claw ecosystem?",
        answer:
          "The Claw ecosystem is a family of self-hosted personal AI assistants: OpenClaw (Python, feature-rich, ~1.5GB), ZeroClaw (Rust, ultra-lightweight, <5MB), and IronClaw (Rust + WASM, security-focused). They're designed to run on your own hardware, making them suited for privacy-sensitive or resource-constrained environments.",
      },
      {
        question: "Can I run OpenHands or Aider with a local model?",
        answer:
          "Yes — both OpenHands and Aider support any OpenAI-compatible API endpoint, including locally-hosted models via Ollama, LM Studio, or vLLM. Pairing either with Llama 4 Maverick or DeepSeek V3 gives you a fully offline, open-source coding agent stack.",
      },
    ],
    relatedSlugs: ["react-vs-vue", "nextjs-vs-nuxt", "supabase-vs-firebase"],
  },
];

export function getMultiComparisonBySlug(
  slug: string
): MultiComparisonConfig | undefined {
  return multiCompareConfig.find((c) => c.slug === slug);
}
