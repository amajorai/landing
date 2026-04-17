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
  /** Short preview string shown on the /compare index card */
  previewText?: string;
  groups: MultiComparisonGroup[];
  verdict: string;
  verdictDetail: string;
  references: { title: string; url: string; note?: string }[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const multiCompareConfig: MultiComparisonConfig[] = [
  // ─── PROPRIETARY LLMs ────────────────────────────────────────────
  {
    slug: "proprietary-llm-comparison",
    category: "llm",
    title: "Proprietary LLM Comparison 2026",
    tagline:
      "Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok 4.20 — benchmarks, pricing, and real-world performance",
    description:
      "An honest, benchmark-backed comparison of the leading closed-source language models in April 2026: Claude Opus 4.6 (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 Pro (Google), and Grok 4.20 (xAI). Covers context window, pricing, coding ability, reasoning, multimodal support, and real-time data access.",
    overview:
      "All four frontier proprietary models now score above 72% on SWE-bench Verified, but they diverge sharply on price, context window, and specialised strengths. Gemini 3.1 Pro leads reasoning benchmarks (94.3% GPQA Diamond) and offers the cheapest output pricing at $12/1M tokens for prompts under 200K. Claude Opus 4.6 leads on SWE-bench (80.8%) and agentic coding. GPT-5.4 introduces native computer-use — the first general-purpose model with built-in GUI and browser control. Grok 4.20 offers the largest context window (2M tokens) at the lowest output price ($6/1M) with live web access via X.",
    previewText: "Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok 4.20",
    groups: [
      {
        groupTitle: "Closed-Source Frontier LLMs",
        groupDescription:
          "API-only models from the major AI labs as of April 2026, evaluated across pricing, benchmarks, and real-world strengths.",
        contestants: [
          {
            id: "claude",
            name: "Claude Opus 4.6",
            badge: "Anthropic",
            color: "#D97706",
            logo: "/logos/ai/anthropic_black.svg",
            logoDark: "/logos/ai/anthropic_white.svg",
          },
          {
            id: "gpt",
            name: "GPT-5.4",
            badge: "OpenAI",
            color: "#10A37F",
            logo: "/logos/ai/openai.svg",
            logoDark: "/logos/ai/openai_dark.svg",
          },
          {
            id: "gemini",
            name: "Gemini 3.1 Pro",
            badge: "Google",
            color: "#4285F4",
            logo: "/logos/ai/gemini.svg",
          },
          {
            id: "grok",
            name: "Grok 4.20",
            badge: "xAI",
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
              gpt: "272K (standard) — up to 1M via extended config",
              gemini: "1M tokens",
              grok: "2M tokens",
            },
            bestFor: "grok",
          },
          {
            category: "Input price (per 1M tokens)",
            values: {
              claude: "$5.00",
              gpt: "$2.50 (≤272K) / $5.00 (>272K)",
              gemini: "$2.00 (≤200K) / $4.00 (>200K)",
              grok: "$2.00",
            },
            bestFor: "grok",
          },
          {
            category: "Output price (per 1M tokens)",
            values: {
              claude: "$25.00",
              gpt: "$15.00",
              gemini: "$12.00 (≤200K) / $18.00 (>200K)",
              grok: "$6.00",
            },
            bestFor: "grok",
          },
          {
            category: "SWE-bench Verified",
            values: {
              claude: "80.8%",
              gpt: "~74.9%",
              gemini: "~80.6% (variance across evaluators — some report 63.8%)",
              grok: "72–75% (Grok 4 Code; not yet confirmed by benchmark org)",
            },
            bestFor: "claude",
          },
          {
            category: "Reasoning (GPQA Diamond)",
            values: {
              claude: "91.3%",
              gpt: "92.0%",
              gemini: "94.3% — highest of the four",
              grok: "~87.5%",
            },
            bestFor: "gemini",
          },
          {
            category: "Multimodal input",
            values: {
              claude: "Text + images",
              gpt: "Text + images + native computer-use (GUI / browser control)",
              gemini: "Text + images + audio + video",
              grok: "Text + images + video (via grok-imagine suite)",
            },
            bestFor: "gemini",
          },
          {
            category: "Real-time data access",
            values: {
              claude: "No — knowledge cutoff Aug 2025",
              gpt: "No — static training data",
              gemini: "No — static training data",
              grok: "Yes — live X/web data access built in",
            },
            bestFor: "grok",
          },
          {
            category: "API availability",
            values: {
              claude: "Anthropic API, AWS Bedrock, Google Vertex AI",
              gpt: "OpenAI API, Azure OpenAI",
              gemini:
                "Google AI API, Vertex AI (preview status as of Apr 2026)",
              grok: "xAI API only",
            },
            bestFor: "claude",
          },
          {
            category: "Best for",
            values: {
              claude:
                "Autonomous coding agents, large-context document analysis, agentic workflows",
              gpt: "Computer-use automation, broad ecosystem, voice/audio applications",
              gemini:
                "Reasoning benchmarks, multimodal tasks, cost-sensitive long-context inference",
              grok: "Real-time data apps, lowest output cost, 2M-token analysis",
            },
          },
        ],
        useCases: [
          {
            contestant: "claude",
            reasons: [
              "Autonomous coding via Claude Code (80.8% SWE-bench Verified — highest of the four)",
              "1M-context analysis of large codebases, contracts, or research papers",
              "Enterprise agentic workflows needing careful permission controls",
              "Teams using AWS Bedrock or Google Vertex AI infrastructure",
            ],
          },
          {
            contestant: "gpt",
            reasons: [
              "Computer-use automation — the only general-purpose model with native screen/browser control",
              "Teams deep in the OpenAI or Azure OpenAI ecosystem",
              "Voice and audio applications via GPT-5.4 audio input",
              "Broadest third-party plugin and integration ecosystem",
            ],
          },
          {
            contestant: "gemini",
            reasons: [
              "Projects needing the highest reasoning accuracy (94.3% GPQA Diamond)",
              "Multimodal analysis combining images, audio, and video in one prompt",
              "Cost-sensitive inference — cheapest output price ($12/1M) for prompts under 200K",
              "Google Workspace integration and Vertex AI deployment",
            ],
          },
          {
            contestant: "grok",
            reasons: [
              "Applications needing live social media data or real-time web context",
              "Largest context window (2M tokens) at the lowest output cost ($6/1M)",
              "Social listening, market monitoring, and trend analysis via X platform",
              "Multi-agent tasks using Grok 4.20 Heavy (16-agent specialist system)",
            ],
          },
        ],
      },
    ],
    verdict: "Context-dependent",
    verdictDetail:
      "No proprietary model wins across all dimensions in April 2026. Gemini 3.1 Pro leads on reasoning (94.3% GPQA) and offers the lowest output price at $12/1M. Claude Opus 4.6 leads autonomous coding at 80.8% SWE-bench. GPT-5.4 uniquely offers native computer-use. Grok 4.20 has the largest context window (2M tokens), lowest output cost ($6/1M), and live web/X data access. Choose based on primary workload: coding → Claude, reasoning/multimodal → Gemini, computer-use → GPT, real-time data → Grok.",
    references: [
      {
        title: "Anthropic Model Docs — Claude Opus 4.6",
        url: "https://platform.claude.com/docs/en/about-claude/models/overview",
        note: "Official model specifications, pricing, and context window",
      },
      {
        title: "OpenAI — Introducing GPT-5.4",
        url: "https://openai.com/index/introducing-gpt-5-4/",
        note: "Official announcement; March 5, 2026",
      },
      {
        title: "Google AI — Gemini 3.1 Pro Models Page",
        url: "https://ai.google.dev/gemini-api/docs/models",
        note: "Released February 19, 2026; preview status",
      },
      {
        title: "Google AI — Gemini API Pricing",
        url: "https://ai.google.dev/gemini-api/docs/pricing",
        note: "Official tiered pricing for Gemini 3.1 Pro",
      },
      {
        title: "xAI API — Models and Pricing",
        url: "https://docs.x.ai/developers/models",
        note: "Grok 4.20: $2.00/$6.00 per 1M tokens, 2M context window",
      },
      {
        title: "SWE-bench Leaderboard",
        url: "https://www.swebench.com/",
        note: "Canonical benchmark for autonomous software engineering tasks",
      },
      {
        title: "Artificial Analysis — LLM Benchmarks",
        url: "https://artificialanalysis.ai/",
        note: "Independent quality, speed, and price comparisons across providers",
      },
    ],
    faq: [
      {
        question: "Which proprietary LLM is cheapest in April 2026?",
        answer:
          "Grok 4.20 offers the lowest output price at $6.00 per 1M tokens with a $2.00 input price. Gemini 3.1 Pro is cheapest for shorter prompts at $2.00 input / $12.00 output for prompts under 200K tokens. Claude Opus 4.6 is the most expensive at $5.00 / $25.00 per 1M tokens.",
      },
      {
        question: "Which model has the largest context window?",
        answer:
          "Grok 4.20 leads with 2M tokens. Claude Opus 4.6 and Gemini 3.1 Pro both support 1M tokens. GPT-5.4 defaults to 272K but supports up to 1M tokens via an extended context configuration at a higher input rate ($5.00/1M).",
      },
      {
        question: "Is Gemini 3.1 Pro stable enough for production?",
        answer:
          "As of April 2026, Gemini 3.1 Pro carries a 'preview' label (model ID: gemini-3.1-pro-preview). For production workloads requiring stability guarantees, Gemini 2.5 Pro remains the GA option — though Gemini 3.1 Pro outperforms it on every major benchmark.",
      },
      {
        question: "What is GPT-5.4's native computer-use capability?",
        answer:
          "GPT-5.4 is the first general-purpose LLM with built-in computer-use — it can see and interact with a desktop GUI, web browser, or application directly, without external scaffolding. This differentiates it from Claude (which uses a separate computer-use tool API) and Gemini/Grok (which lack this natively).",
      },
    ],
    relatedSlugs: ["open-weight-llm-comparison", "coding-agent-comparison"],
  },

  // ─── OPEN-WEIGHT LLMs ────────────────────────────────────────────
  {
    slug: "open-weight-llm-comparison",
    category: "llm",
    title: "Open-Weight LLM Comparison 2026",
    tagline:
      "Llama 4, DeepSeek V3.2, Gemma 4, MiniMax M2.5, Mistral Small 4, Qwen3.5 — self-hostable models compared on SWE-bench, licensing, and cost",
    description:
      "A comprehensive comparison of the leading open-weight language models in April 2026: Meta Llama 4 Maverick and Scout, DeepSeek V3.2, Google Gemma 4 31B, MiniMax M2.5, Mistral Small 4, and Alibaba Qwen3.5. Covers context window, license restrictions, self-hosting GPU requirements, third-party API pricing, SWE-bench scores, and multimodal capabilities. Note: DeepSeek V4 has not been released as of April 2026.",
    overview:
      "Open-weight models closed the gap with closed models dramatically in 2026. MiniMax M2.5 hits 80.2% on SWE-bench Verified — on par with Claude Opus 4.6 — at $0.30/$1.20 per 1M tokens. Meta Llama 4 Scout offers a 10M-token context window on a single H100. Gemma 4 31B is the cleanest Apache 2.0 model on the market: no MAU caps, no EU restrictions, runs on a single H100. DeepSeek V3.2 remains the cheapest frontier API at $0.28/$0.42 per 1M tokens under an MIT license.",
    previewText:
      "Llama 4 Maverick & Scout, DeepSeek V3.2, Gemma 4, MiniMax M2.5, Mistral Small 4, Qwen3.5",
    groups: [
      {
        groupTitle: "Open-Weight Frontier Models",
        groupDescription:
          "Self-hostable models with public weights, evaluated on licensing, cost, benchmarks, and deployment requirements as of April 2026.",
        contestants: [
          {
            id: "maverick",
            name: "Llama 4 Maverick",
            badge: "Meta",
            color: "#0866FF",
            logo: "/logos/ai/meta.svg",
          },
          {
            id: "scout",
            name: "Llama 4 Scout",
            badge: "Meta",
            color: "#0866FF",
            logo: "/logos/ai/meta.svg",
          },
          {
            id: "deepseek",
            name: "DeepSeek V3.2",
            badge: "MIT",
            color: "#2563EB",
            logo: "/logos/ai/deepseek.svg",
          },
          {
            id: "gemma4",
            name: "Gemma 4 31B",
            badge: "Apache 2.0",
            color: "#4285F4",
            logo: "/logos/ai/gemini.svg",
          },
          {
            id: "minimax",
            name: "MiniMax M2.5",
            badge: "Modified MIT",
            color: "#7C3AED",
          },
          {
            id: "mistral",
            name: "Mistral Small 4",
            badge: "Apache 2.0",
            color: "#FF7000",
            logo: "/logos/ai/mistral-ai_logo.svg",
          },
          {
            id: "qwen",
            name: "Qwen3.5-397B",
            badge: "Apache 2.0",
            color: "#6B21A8",
          },
        ],
        points: [
          {
            category: "Context window",
            values: {
              maverick: "1M tokens",
              scout: "10M tokens — largest of any production model",
              deepseek: "163,840 tokens",
              gemma4: "Up to 262K tokens",
              minimax: "1M input + 1M output tokens",
              mistral: "256K tokens",
              qwen: "262K native (extensible to ~1M tokens)",
            },
            bestFor: "scout",
          },
          {
            category: "License",
            values: {
              maverick:
                "Meta Llama 4 Community — EU entities prohibited; >700M MAU needs Meta agreement",
              scout:
                "Meta Llama 4 Community — EU entities prohibited; >700M MAU needs Meta agreement",
              deepseek: "MIT — unrestricted commercial use",
              gemma4: "Apache 2.0 — no MAU caps, no EU restriction",
              minimax:
                "Modified MIT — attribution clause for large-scale commercial",
              mistral: "Apache 2.0 — unrestricted commercial use",
              qwen: "Apache 2.0 — unrestricted commercial use",
            },
            bestFor: "gemma4",
          },
          {
            category: "API input price (per 1M tokens)",
            values: {
              maverick: "~$0.17 (third-party providers)",
              scout: "~$0.08 (third-party providers)",
              deepseek: "$0.28 (DeepSeek API)",
              gemma4: "$0.13 (direct API)",
              minimax: "$0.30 (MiniMax API)",
              mistral: "$0.15 (Mistral API)",
              qwen: "Varies by provider",
            },
            bestFor: "scout",
          },
          {
            category: "API output price (per 1M tokens)",
            values: {
              maverick: "~$0.60 (third-party providers)",
              scout: "~$0.30 (third-party providers)",
              deepseek: "$0.42 (DeepSeek API)",
              gemma4: "$0.38 (direct API)",
              minimax: "$1.20 (MiniMax API)",
              mistral: "$0.60 (Mistral API)",
              qwen: "Varies by provider",
            },
            bestFor: "scout",
          },
          {
            category: "SWE-bench Verified",
            values: {
              maverick: "Not publicly confirmed",
              scout: "Not publicly confirmed",
              deepseek: "67.8% (V3.2-Speciale)",
              gemma4: "Not confirmed in available benchmarks",
              minimax:
                "80.2% — highest confirmed score among open-weight models",
              mistral: "Not confirmed",
              qwen: "72.4% (27B dense variant, multilingual benchmark)",
            },
            bestFor: "minimax",
          },
          {
            category: "Min. self-hosting GPU",
            values: {
              maverick: "4× H100 80GB (INT4); 8× H100 for production",
              scout: "1× H100 80GB (INT4) — single-GPU deployable",
              deepseek: "8× H100 80GB (FP8); ~5–6× H100 (INT4)",
              gemma4: "1× H100 80GB (BF16, 8K ctx); B200 for full 262K",
              minimax: "2× B200 or 4× H100 minimum",
              mistral: "1× H100 estimated (6B active params)",
              qwen: "8× GPU via vLLM (tensor parallel for full 262K context)",
            },
            bestFor: "gemma4",
          },
          {
            category: "Multimodal support",
            values: {
              maverick: "Yes — text + image input",
              scout: "Yes — text + image input",
              deepseek:
                "No — text/code only (DeepSeek-VL2 is a separate model)",
              gemma4: "Yes — text + image + audio + video (all model sizes)",
              minimax: "No — text/code only",
              mistral: "Yes — text + image (vision-capable)",
              qwen: "Yes — native vision-language across all sizes",
            },
            bestFor: "gemma4",
          },
          {
            category: "EU deployment safe",
            values: {
              maverick:
                "No — Meta license explicitly prohibits EU-domiciled entities",
              scout:
                "No — Meta license explicitly prohibits EU-domiciled entities",
              deepseek:
                "Yes — MIT license; note: Chinese lab (data handling considerations)",
              gemma4: "Yes — Apache 2.0; Google (US-based)",
              minimax: "Yes — Modified MIT; note: Chinese lab",
              mistral: "Yes — Apache 2.0; French company, EU-native",
              qwen: "Yes — Apache 2.0; note: Alibaba / Chinese lab",
            },
            bestFor: "mistral",
          },
          {
            category: "Best for",
            values: {
              maverick:
                "Non-EU teams wanting top open MoE at 1M context with multimodal",
              scout:
                "Non-EU teams needing 10M-token context on a single H100 at minimal API cost",
              deepseek:
                "Cheapest frontier API; MIT license; high-volume coding and reasoning",
              gemma4:
                "Cleanest license (no restrictions); single H100; multimodal incl. video; EU-safe",
              minimax:
                "Highest SWE-bench score (80.2%); 1M in/out context; coding-heavy workloads",
              mistral:
                "EU data residency; Apache 2.0; efficient small model; multimodal; low cost",
              qwen: "201 languages; ~1M context; Apache 2.0; adaptive reasoning; multilingual",
            },
          },
        ],
        useCases: [
          {
            contestant: "maverick",
            reasons: [
              "Best open MoE model at 1M context — strong on multimodal and reasoning",
              "Non-EU teams wanting Meta's strongest open release at $0.17/$0.60",
              "Multimodal applications requiring open-weight models (text + image)",
              "Teams comfortable with 4+ H100 self-hosting requirements",
            ],
          },
          {
            contestant: "scout",
            reasons: [
              "Ultra-long context tasks — 10M tokens on a single H100 (INT4)",
              "Non-EU teams needing the cheapest third-party API ($0.08/$0.30)",
              "Privacy-sensitive workloads requiring single-GPU on-premise deployment",
              "RAG systems with massive document sets exceeding 1M-token limits",
            ],
          },
          {
            contestant: "deepseek",
            reasons: [
              "Cheapest frontier API at $0.28/$0.42 per 1M tokens — ~17× cheaper than Claude",
              "MIT license for maximum commercial flexibility",
              "High-volume coding or reasoning pipelines on a tight budget",
              "Self-hosted deployments (5–6× H100 INT4 or 8× H100 FP8)",
            ],
          },
          {
            contestant: "gemma4",
            reasons: [
              "The only frontier open-weight model with Apache 2.0 and no usage restrictions",
              "EU deployment with no data-residency concerns from a US-based lab",
              "Single H100 80GB self-hosting for teams with limited GPU budget",
              "Multimodal tasks including video and audio — all supported natively",
            ],
          },
          {
            contestant: "minimax",
            reasons: [
              "Highest SWE-bench Verified score of any open-weight model (80.2%)",
              "1M input + 1M output context — unique among open models",
              "Coding-heavy workloads where benchmark quality is the priority",
              "Teams willing to use 2× B200 or 4× H100 for the performance ceiling",
            ],
          },
          {
            contestant: "mistral",
            reasons: [
              "EU data residency — French company with EU-native legal structure",
              "Apache 2.0 with a small resource footprint (~1× H100 estimated)",
              "Multimodal applications on a tight budget ($0.15/$0.60 per 1M)",
              "Multilingual European applications across major EU languages",
            ],
          },
          {
            contestant: "qwen",
            reasons: [
              "Multilingual applications spanning 201 languages",
              "~1M-token context extensibility under an Apache 2.0 license",
              "Adaptive reasoning modes (Thinking, Fast, Auto) in a single model",
              "Asia-Pacific teams integrated with Alibaba / NVIDIA NIM infrastructure",
            ],
          },
        ],
      },
    ],
    verdict:
      "Workload-dependent — Gemma 4 is the most versatile for most teams",
    verdictDetail:
      "For the highest SWE-bench score among open models, MiniMax M2.5 (80.2%) is unmatched — on par with Claude Opus 4.6 at a fraction of the cost. For the cleanest license, Gemma 4 31B (Apache 2.0, single H100) is the standout. For the longest context window, Llama 4 Scout (10M tokens, single H100) wins — but Meta's license bans EU entities. For the cheapest API, DeepSeek V3.2 at $0.28/$0.42 per 1M wins. For EU data residency with Apache 2.0, Mistral Small 4 is the strongest pick from a Western lab. Note: DeepSeek V4 has not been released as of April 2026.",
    references: [
      {
        title: "Meta Llama 4 — Official Blog",
        url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
        note: "Llama 4 Scout (10M context) and Maverick (1M context) released April 5, 2025",
      },
      {
        title: "DeepSeek V3.2 API Docs",
        url: "https://api-docs.deepseek.com/news/news251201",
        note: "Released December 1, 2025; 163,840 context; MIT license",
      },
      {
        title: "Gemma 4 — Google Blog",
        url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/",
        note: "Released April 2, 2026; Apache 2.0; single H100 deployable",
      },
      {
        title: "MiniMax M2.5",
        url: "https://www.minimax.io/news/minimax-m25",
        note: "80.2% SWE-bench Verified — highest confirmed score among open-weight models",
      },
      {
        title: "Mistral Small 4",
        url: "https://mistral.ai/news/mistral-small-4",
        note: "Released March 16, 2026; Apache 2.0; 256K context; vision-capable",
      },
      {
        title: "Qwen3.5-397B — NVIDIA NIM",
        url: "https://build.nvidia.com/qwen/qwen3.5-397b-a17b/modelcard",
        note: "17B active / 397B total MoE; Apache 2.0; 262K native context",
      },
      {
        title: "Open LLM Leaderboard",
        url: "https://llm-stats.com/leaderboards/open-llm-leaderboard",
        note: "Community leaderboard tracking open-weight model benchmarks",
      },
    ],
    faq: [
      {
        question: "Has DeepSeek V4 been released?",
        answer:
          "No. As of April 16, 2026, DeepSeek V4 has not been released. The current latest is DeepSeek V3.2 (December 1, 2025), which achieves 67.8% on SWE-bench Verified at $0.28/$0.42 per 1M tokens under an MIT license.",
      },
      {
        question: "Can EU companies use Llama 4?",
        answer:
          "No. The Meta Llama 4 Community License explicitly prohibits use by EU-domiciled entities. EU teams should use Gemma 4 31B (Apache 2.0, Google), Mistral Small 4 (Apache 2.0, French company), DeepSeek V3.2 (MIT), or Qwen3.5 (Apache 2.0) instead.",
      },
      {
        question: "Which open-weight model has the best SWE-bench score?",
        answer:
          "MiniMax M2.5 leads at 80.2% SWE-bench Verified — the highest confirmed score among any open-weight model as of April 2026, comparable to Claude Opus 4.6 (80.8%). It requires 2× B200 or 4× H100 to self-host and costs $0.30/$1.20 per 1M tokens via the MiniMax API.",
      },
      {
        question:
          "What is the cheapest way to run an open-weight model in production?",
        answer:
          "For API access, Llama 4 Scout via third-party providers (~$0.08/$0.30 per 1M) is the cheapest. For self-hosting, Gemma 4 31B on a single H100 is the most accessible with a fully unrestricted license. DeepSeek V3.2 at $0.28/$0.42 is the cheapest for a direct single-provider API.",
      },
    ],
    relatedSlugs: ["proprietary-llm-comparison", "coding-agent-comparison"],
  },

  // ─── CODING AGENTS ───────────────────────────────────────────────
  {
    slug: "coding-agent-comparison",
    category: "agent",
    title: "AI Coding Agent Comparison 2026",
    tagline:
      "Claude Code, Amazon Q Developer, OpenHands, GitHub Copilot, Cursor, Aider, Windsurf, and Devin 2.0 — SWE-bench scores, pricing, and workflow integration",
    description:
      "A benchmark-backed comparison of the leading AI coding agents in April 2026: Claude Code (Anthropic), Amazon Q Developer (AWS), OpenHands (All Hands AI), GitHub Copilot (Microsoft), Cursor Agent (Anysphere), Aider, Windsurf (Cognition AI), and Devin 2.0. Evaluated on SWE-bench Verified, pricing, model flexibility, IDE integration, and autonomous scope.",
    overview:
      "AI coding agents diverged sharply in 2026. Claude Code with Claude Sonnet 5 achieves 92.4% on SWE-bench Verified — a 40-point lead over Cursor (51.7%) and Copilot (~56%). Amazon Q Developer (66%) is the strongest enterprise pick for AWS teams. OpenHands (53–72%) remains the top open-source agent with full model flexibility. Windsurf, now under Cognition AI, introduces SWE-1.5 running at 950 tokens/sec. Devin 2.0 dropped from $500 to $20/month, repositioning as a browser-automation-first autonomous agent.",
    previewText:
      "Claude Code (92.4%), Amazon Q (66%), OpenHands, Copilot, Cursor, Aider, Windsurf, Devin",
    groups: [
      {
        groupTitle: "Coding Agents",
        groupDescription:
          "AI agents evaluated on SWE-bench Verified (April 2026), pricing, openness, and workflow integration.",
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
            id: "amazonq",
            name: "Amazon Q Developer",
            badge: "AWS",
            color: "#FF9900",
          },
          {
            id: "openhands",
            name: "OpenHands",
            badge: "Open Source",
            color: "#059669",
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
            id: "cursor",
            name: "Cursor Agent",
            badge: "IDE",
            color: "#000000",
            logo: "/logos/ai/cursor_light.svg",
            logoDark: "/logos/ai/cursor_dark.svg",
          },
          {
            id: "aider",
            name: "Aider",
            badge: "Open Source",
            color: "#2563EB",
          },
          {
            id: "windsurf",
            name: "Windsurf",
            badge: "IDE",
            color: "#0EA5E9",
          },
          {
            id: "devin",
            name: "Devin 2.0",
            badge: "Commercial",
            color: "#7C3AED",
          },
        ],
        points: [
          {
            category: "SWE-bench Verified (Apr 2026)",
            values: {
              claudecode: "92.4% (Sonnet 5) / 80.8% (Opus 4.6)",
              amazonq: "66% (Claude Sonnet backend via Bedrock)",
              openhands: "53–72% (CodeAct architecture; varies by model)",
              copilot: "~56% (Copilot Workspace with multi-model routing)",
              cursor: "51.7%",
              aider: "~42% (agent mode on SWE-bench)",
              windsurf: "40.08% (SWE-1.5 at 950 tok/s)",
              devin: "13.86% (2024 baseline; Devin 2.0 not re-published)",
            },
            bestFor: "claudecode",
          },
          {
            category: "Pricing",
            values: {
              claudecode:
                "Free CLI; pay Anthropic API directly. Pro $20/mo or Max $100–$200/mo includes usage",
              amazonq: "Free tier; Pro $19/user/mo",
              openhands:
                "Free / MIT — self-host and pay LLM API costs only (~$0.15–$0.60/task)",
              copilot:
                "Free (2K completions/mo); Pro $10/mo; Pro+ $39/mo; Business $19/user/mo",
              cursor: "Hobby free; Pro $20/mo; Pro+ $40/mo; Teams $40/user/mo",
              aider: "Free / open source — pay LLM API costs only",
              windsurf: "Free tier (SWE-1.5 at 0 credits); Pro ~$20/mo",
              devin: "Core $20/mo; Team $500/mo (250 ACUs)",
            },
            bestFor: "openhands",
          },
          {
            category: "Open source",
            values: {
              claudecode: "No — Anthropic proprietary CLI",
              amazonq: "No — AWS proprietary",
              openhands: "Yes — MIT license (All Hands AI, 70K+ GitHub stars)",
              copilot: "No — GitHub/Microsoft proprietary",
              cursor: "No — proprietary VS Code fork",
              aider: "Yes — Apache 2.0 (39K+ GitHub stars, 4.1M+ installs)",
              windsurf: "No — Cognition AI proprietary (formerly Codeium)",
              devin: "No — Cognition AI proprietary",
            },
            bestFor: "openhands",
          },
          {
            category: "IDE / workflow",
            values: {
              claudecode:
                "Terminal-native; works with any editor via shell; VS Code extension available",
              amazonq:
                "VS Code, JetBrains, Eclipse, Visual Studio + deep AWS console integration",
              openhands: "Web UI + VS Code extension; Daytona integration",
              copilot:
                "VS Code, JetBrains, Neovim, Visual Studio, GitHub.com, Xcode — widest IDE coverage",
              cursor:
                "VS Code fork with native Composer / background agent panel",
              aider: "Terminal-native, git-first workflow; 100+ languages",
              windsurf:
                "VS Code fork with Cascade multi-file agent; cross-session memory",
              devin: "Web UI, Slack, Linear/Jira integration",
            },
            bestFor: "copilot",
          },
          {
            category: "Model flexibility",
            values: {
              claudecode: "Claude only (Anthropic API, Bedrock, Vertex)",
              amazonq:
                "Primarily Claude Sonnet (Bedrock) — not end-user configurable",
              openhands:
                "Any OpenAI-compatible API — Claude, GPT, Gemini, local models",
              copilot: "GPT (default), Claude, Gemini — toggleable in settings",
              cursor:
                "Multi-model bundled (Claude, GPT, Gemini) in subscription",
              aider:
                "75+ providers — optimised for Claude and GPT; full local model support",
              windsurf:
                "SWE-1.5, SWE-1, Claude Sonnet 4.6, GPT-5, Gemini 3.1 Pro",
              devin: "Cognition AI proprietary model — no swap",
            },
            bestFor: "aider",
          },
          {
            category: "Autonomous scope",
            values: {
              claudecode: "Full repo + terminal + bash execution",
              amazonq:
                "Full lifecycle: code, test, debug, Java upgrades, IaC generation, SQL optimisation",
              openhands:
                "Full repo — sandboxed Docker environment; configurable autonomy",
              copilot:
                "Multi-file + GitHub PR workflow (Copilot Workspace plans/writes/tests)",
              cursor:
                "Multi-file + background cloud agents that open PRs while you code",
              aider:
                "Multi-file, git-commit level; auto-runs linters and tests",
              windsurf:
                "Multi-file + Cascade cross-session memory of architectural decisions",
              devin:
                "Full repo + terminal + browser automation + cloud deployments",
            },
            bestFor: "devin",
          },
          {
            category: "Terminal / shell access",
            values: {
              claudecode: "Yes — full bash in your local environment",
              amazonq: "Yes — via IDE terminal integration",
              openhands: "Yes — sandboxed Docker container (isolated, safe)",
              copilot: "Limited — Workspace manages execution internally",
              cursor: "Yes — integrated terminal commands",
              aider: "Yes — runs locally in your shell",
              windsurf: "Yes — via Cascade agent",
              devin: "Yes — full shell + browser automation",
            },
            bestFor: "claudecode",
          },
          {
            category: "Human-in-the-loop",
            values: {
              claudecode:
                "Yes — permission prompts for all destructive actions",
              amazonq: "Yes — multi-turn task confirmation",
              openhands:
                "Configurable — can run fully autonomous or require confirmation",
              copilot: "Yes — PR review workflow enforced",
              cursor: "Yes — review gates before applying diffs",
              aider: "Yes — confirms before each commit",
              windsurf: "Yes — interactive inline review",
              devin: "Minimal — reports back after task completion",
            },
            bestFor: "claudecode",
          },
        ],
        useCases: [
          {
            contestant: "claudecode",
            reasons: [
              "Highest SWE-bench score (92.4% with Sonnet 5) — best raw autonomous coding",
              "Full-repo tasks requiring bash execution alongside code edits",
              "Teams using Anthropic API wanting direct cost control",
              "Projects needing careful permission gates on destructive file operations",
            ],
          },
          {
            contestant: "amazonq",
            reasons: [
              "AWS-native teams: CloudFormation, Lambda, IAM, RDS integration built in",
              "Enterprise Java shops — automated version upgrades and legacy migration",
              "Strong SWE-bench score (66%) at $19/user/mo for AWS-committed teams",
              "GitLab Duo integration for teams not on GitHub",
            ],
          },
          {
            contestant: "openhands",
            reasons: [
              "Full model freedom — run Claude, GPT, Gemini, or local models from one interface",
              "Open-source projects and teams with tight budgets (pay only API costs)",
              "Enterprise environments requiring self-hosted agents with MIT licensing",
              "Developers who want to inspect, fork, and modify the agent's source code",
            ],
          },
          {
            contestant: "copilot",
            reasons: [
              "Teams already on GitHub wanting the tightest PR and issue integration",
              "Widest IDE coverage: VS Code, JetBrains, Neovim, Visual Studio, Xcode",
              "Existing GitHub Enterprise agreements already in place",
              "Developers who want to switch between GPT, Claude, and Gemini models",
            ],
          },
          {
            contestant: "cursor",
            reasons: [
              "VS Code users wanting the best all-in-one IDE experience",
              "Multi-file refactors with background agents and inline review",
              "Fastest autonomous task execution (62.9s avg vs 89.9s competitors)",
              "Subscription that bundles model costs across Claude, GPT, and Gemini",
            ],
          },
          {
            contestant: "aider",
            reasons: [
              "Terminal-first developers who want a git-native, commit-level workflow",
              "Every commit reviewed before merging — confirms before each change",
              "Budget-conscious teams — pay only API costs across 75+ providers",
              "Polyglot projects: 100+ languages with optimised prompts for each",
            ],
          },
          {
            contestant: "windsurf",
            reasons: [
              "SWE-1.5 model at 950 tok/s — zero credits, fast feedback loop",
              "Cross-session architectural memory via Cascade agent",
              "Claude/GPT/Gemini 3.1 Pro as alternative backends",
              "Teams evaluating Devin-style browser automation via Cognition AI's merged stack",
            ],
          },
          {
            contestant: "devin",
            reasons: [
              "Fully autonomous tasks involving browser automation alongside code changes",
              "Cloud deployment and infrastructure changes requiring agent-driven shell + browser",
              "Teams integrating AI agents into Slack / Jira / Linear ticket queues",
              "Core tier now at $20/mo — accessible entry to end-to-end autonomous execution",
            ],
          },
        ],
      },
    ],
    verdict:
      "Claude Code for performance; OpenHands for flexibility; Cursor for IDE experience",
    verdictDetail:
      "Claude Code at 92.4% SWE-bench (Sonnet 5) leads all agents by a wide margin. For teams prioritising open-source and model flexibility, OpenHands (MIT, any LLM) is the strongest pick. Amazon Q Developer (66%) is the best enterprise option for AWS-native teams. Cursor (51.7%) wins on developer experience — fastest execution and the smoothest VS Code workflow. Windsurf and Devin are now both under Cognition AI; their capabilities are converging. Aider remains the best terminal-native git-first option for budget-conscious teams.",
    references: [
      {
        title: "SWE-bench Verified Leaderboard",
        url: "https://www.swebench.com/",
        note: "Canonical benchmark for evaluating coding agents on real GitHub issues",
      },
      {
        title: "Claude Code Documentation",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        note: "Official Anthropic Claude Code docs; 92.4% SWE-bench with Sonnet 5",
      },
      {
        title: "OpenHands — All Hands AI",
        url: "https://openhands.dev/",
        note: "MIT-licensed; v1.6.0 with Kubernetes support; 70K+ GitHub stars",
      },
      {
        title: "GitHub Copilot Docs",
        url: "https://docs.github.com/en/copilot",
        note: "Copilot Workspace GA February 2026; Agent mode with multi-model routing",
      },
      {
        title: "Aider LLM Leaderboard",
        url: "https://aider.chat/docs/leaderboards/",
        note: "Polyglot benchmark results across LLM backends; 75+ providers supported",
      },
      {
        title: "Cognition — Introducing SWE-1.5",
        url: "https://cognition.ai/blog/swe-1-5",
        note: "Windsurf SWE-1.5: 40.08% SWE-bench, 950 tok/s; Cognition acquired Windsurf Dec 2025",
      },
      {
        title: "Amazon Q Developer Pricing",
        url: "https://aws.amazon.com/q/developer/pricing/",
        note: "Free tier + Pro $19/user/mo; 66% SWE-bench Verified",
      },
    ],
    faq: [
      {
        question:
          "Why does Claude Code score so much higher than Cursor or Copilot?",
        answer:
          "Claude Code's 92.4% SWE-bench (Sonnet 5) reflects a terminal-native scaffold that reads full repos, executes bash, and runs tests in your actual environment. Cursor (51.7%) and Copilot (~56%) are optimised for interactive IDE experience — not autonomous end-to-end task completion. The gap reflects different design goals, not product quality.",
      },
      {
        question: "Is Devin still worth it?",
        answer:
          "Devin 2.0 dropped to $20/month (Core). Its historical SWE-bench score (13.86%) has been eclipsed by every other agent here. Devin's current value is its browser automation + cloud deployment capability — unique in the market. For pure code generation, Claude Code or OpenHands are significantly better value.",
      },
      {
        question: "What is SWE-bench Verified?",
        answer:
          "SWE-bench Verified is a curated set of 500 manually verified real GitHub issues where an AI agent must write code, run tests, and produce a passing pull request without human help. It's the most credible public benchmark for autonomous coding capability as of 2026.",
      },
      {
        question: "Can I run OpenHands with a local model?",
        answer:
          "Yes — OpenHands supports any OpenAI-compatible API including locally-hosted models via Ollama, LM Studio, or vLLM. Pairing it with Llama 4 Maverick or DeepSeek V3.2 gives you a fully offline, open-source coding agent stack.",
      },
    ],
    relatedSlugs: [
      "personal-agent-comparison",
      "proprietary-llm-comparison",
      "open-weight-llm-comparison",
    ],
  },

  // ─── PERSONAL / SELF-HOSTED AI AGENTS ───────────────────────────
  {
    slug: "personal-agent-comparison",
    category: "agent",
    title: "Self-Hosted AI Agents 2026",
    tagline:
      "OpenClaw, ZeroClaw, IronClaw, Hermes Agent, NanoClaw, NanoBot, PicoClaw, NullClaw, and QClaw — open-source personal AI assistants compared on RAM, security, integrations, and self-improvement",
    description:
      "A comprehensive comparison of open-source, self-hosted personal AI assistants in April 2026. The Claw ecosystem exploded after OpenClaw went viral with 358,000+ GitHub stars, spawning ZeroClaw (Rust, <5MB), IronClaw (WASM/TEE security), NanoClaw (per-conversation Docker containers), NullClaw (Zig, 678KB), PicoClaw (Go, IoT/RISC-V), and QClaw (knowledge-graph memory). Hermes Agent (Nous Research, 91,000+ stars) adds a self-improving closed learning loop unique in the space.",
    overview:
      "The self-hosted AI assistant ecosystem was transformed between late 2025 and early 2026. OpenClaw launched as 'Clawdbot' in November 2025 and went viral — 358,000 GitHub stars, 24+ messaging integrations, a 5,700+ skill marketplace. A security crisis (CVE-2026-25253 'ClawBleed', one-click RCE; plus 341 malicious ClawHub skills) drove demand for security-first alternatives. ZeroClaw (Rust, <5MB, deny-by-default) and IronClaw (WASM sandbox + hardware TEE) emerged as the security-focused options. NullClaw (678KB Zig binary, <2ms boot) and PicoClaw (Go, <10MB, RISC-V) target extreme resource constraints. Hermes Agent (Nous Research) stands apart: the only personal agent with a genuine closed self-improving loop that adapts from your conversations. The ecosystem also includes MetaClaw (adds RL self-improvement as a proxy to any Claw agent), HiClaw (Alibaba multi-agent orchestration), QwenPaw/CoPaw (China-ecosystem), and Moltis (Rust, enterprise voice + observability).",
    previewText:
      "OpenClaw, ZeroClaw, IronClaw, Hermes Agent, NanoClaw, NanoBot, NullClaw, PicoClaw, QClaw",
    groups: [
      {
        groupTitle: "Self-Hosted Personal AI Assistants",
        groupDescription:
          "Open-source agents designed to run on your own hardware — from Raspberry Pi to enterprise servers. Evaluated on resource footprint, security model, integrations, and unique capabilities.",
        contestants: [
          {
            id: "openclaw",
            name: "OpenClaw",
            badge: "TypeScript",
            color: "#DC2626",
          },
          {
            id: "zeroclaw",
            name: "ZeroClaw",
            badge: "Rust",
            color: "#2563EB",
          },
          {
            id: "ironclaw",
            name: "IronClaw",
            badge: "Rust + WASM",
            color: "#374151",
          },
          {
            id: "hermes",
            name: "Hermes Agent",
            badge: "Python",
            color: "#7C3AED",
          },
          {
            id: "nanoclaw",
            name: "NanoClaw",
            badge: "TypeScript",
            color: "#0EA5E9",
          },
          {
            id: "nanobot",
            name: "NanoBot",
            badge: "Python",
            color: "#16A34A",
          },
          {
            id: "picoclaw",
            name: "PicoClaw",
            badge: "Go",
            color: "#00ADD8",
          },
          {
            id: "nullclaw",
            name: "NullClaw",
            badge: "Zig",
            color: "#F7A41D",
          },
          {
            id: "qclaw",
            name: "QClaw",
            badge: "JavaScript",
            color: "#6B7280",
          },
        ],
        points: [
          {
            category: "Language / runtime",
            values: {
              openclaw: "TypeScript / Node.js 22.16+ (~390MB Node runtime)",
              zeroclaw: "Rust — single static binary, zero runtime dependency",
              ironclaw: "Rust + WebAssembly — all plugins run in WASM sandbox",
              hermes: "Python 3.12+ — flexible, research-grade codebase",
              nanoclaw: "TypeScript / Node.js — ~700 lines, auditable in 8 min",
              nanobot: "Python — ~4,000 lines; academic/hackable",
              picoclaw: "Go — single static binary, RISC-V + ARM + x86",
              nullclaw:
                "Zig — compiled to native machine code; zero VM/interpreter overhead",
              qclaw: "JavaScript / Node.js 20+ — `npm i -g quantumclaw`",
            },
          },
          {
            category: "RAM footprint",
            values: {
              openclaw: "~1.5 GB baseline",
              zeroclaw: "<5 MB — ~300× smaller than OpenClaw",
              ironclaw: "~5 MB estimated (Rust + WASM overhead)",
              hermes: "Flexible — from $5/mo VPS to GPU cluster",
              nanoclaw: "~50–200 MB",
              nanobot: "~191 MB (benchmarked on Raspberry Pi 3B+)",
              picoclaw: "<10 MB (targets <10MB embedded boards)",
              nullclaw: "~1 MB — smallest in the ecosystem",
              qclaw: "Not publicly benchmarked",
            },
            bestFor: "nullclaw",
          },
          {
            category: "Startup time",
            values: {
              openclaw: "~6 seconds",
              zeroclaw: "<10 ms on ARM64 edge nodes",
              ironclaw: "Fast (Rust compiled binary)",
              hermes: "Not benchmarked",
              nanoclaw: "Fast",
              nanobot: "Fast",
              picoclaw: "~1 second",
              nullclaw: "<2 ms on Apple Silicon — fastest in ecosystem",
              qclaw: "Not benchmarked",
            },
            bestFor: "nullclaw",
          },
          {
            category: "Security model",
            values: {
              openclaw:
                "Opt-in Docker sandbox; 5 CVEs in 2026 incl. CVE-2026-25253 ClawBleed (CVSS 8.8, one-click RCE); 341 malicious ClawHub skills in the ClawHavoc campaign",
              zeroclaw:
                "Restrictive-by-default: localhost bind, DM pairing codes, explicit command allowlists, forbidden paths (/etc /root ~/.ssh), AES-encrypted secrets, Landlock/Bubblewrap sandboxing",
              ironclaw:
                "WASM sandbox per tool (capability-based permissions); AES-256-GCM credential vault; credential leak scanning via Aho-Corasick; TEE hardware attestation; endpoint allowlisting",
              hermes:
                "Conservative defaults; Tirith pre-execution terminal scanner; container hardening; prompt injection scanning; no major public CVEs",
              nanoclaw:
                "Per-conversation Docker container — each chat group gets its own isolated filesystem; audit logging; permission gates; OpenTelemetry tracing",
              nanobot:
                "Single Docker container + bwrap sandbox; not per-conversation isolated",
              picoclaw:
                "Minimal (IoT threat model) — embedded-focused, not enterprise-grade",
              nullclaw:
                "ChaCha20-Poly1305 encrypted API keys; multi-layer sandboxing (Landlock + Firejail + Docker); vtable interfaces for all subsystems",
              qclaw:
                "AES-256-GCM encrypted SQLite secrets; immutable VALUES.md trust kernel; AGEX cryptographic agent identity protocol; per-agent isolation",
            },
            bestFor: "ironclaw",
          },
          {
            category: "Messaging channels",
            values: {
              openclaw:
                "24+ — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, LINE, Matrix, Teams, Feishu, WeChat, QQ, and more",
              zeroclaw:
                "25+ — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Matrix, IRC, Email, Bluesky, DingTalk, Lark, Nostr, Reddit, LinkedIn, Twitter, MQTT, QQ, WeChat Work, and more",
              ironclaw:
                "Telegram, Discord (via WASM channels) + HTTP webhooks + web gateway (SSE/WebSocket)",
              hermes:
                "Telegram, Discord, Slack, WhatsApp, Signal, Email (6 channels)",
              nanoclaw:
                "WhatsApp, Telegram, Slack, Discord, Gmail (5 channels — per-conversation isolated)",
              nanobot:
                "Telegram, WhatsApp, Discord, Feishu/Lark (4 channels — strong China platform support)",
              picoclaw: "Telegram, Discord (2 channels — IoT-focused)",
              nullclaw:
                "18–19 channels despite 678KB binary — comparable breadth to ZeroClaw",
              qclaw:
                "Telegram, Discord, WhatsApp, Slack, Email (5 channels) + voice transcription",
            },
            bestFor: "zeroclaw",
          },
          {
            category: "GitHub stars (Apr 2026)",
            values: {
              openclaw:
                "~358,000 — dominant project; moved to independent foundation",
              zeroclaw: "~30,200",
              ironclaw: "~11,500 (Near AI / NEARCON 2026)",
              hermes: "~91,200 — Nous Research; rapidly growing since Feb 2026",
              nanoclaw: "~26,800 — 7,000+ in first week (Jan 31, 2026)",
              nanobot: "~38,400 — HKU Data Science Lab",
              picoclaw: "~13,300 — Sipeed embedded hardware company",
              nullclaw: "~5,300 — March 2026 (MarkTechPost coverage)",
              qclaw: "Small — ALLIN1.APP LTD",
            },
            bestFor: "openclaw",
          },
          {
            category: "Self-improvement / learning loop",
            values: {
              openclaw: "No — static capability set",
              zeroclaw: "No — static capability set",
              ironclaw: "No — static capability set",
              hermes:
                "Yes — closed self-improving loop: creates skills from experience, fine-tunes via Atropos RL, searches past conversations, builds deepening user model (Honcho dialectic)",
              nanoclaw: "No — static capability set",
              nanobot: "No — static capability set",
              picoclaw: "No — static capability set",
              nullclaw: "No — static capability set",
              qclaw:
                "Partial — 3-tier memory (vector search + structured knowledge + optional Cognee knowledge graph); no RL self-improvement",
            },
            bestFor: "hermes",
          },
          {
            category: "LLM providers",
            values: {
              openclaw:
                "All major providers (Anthropic, OpenAI, Google, Ollama, etc.)",
              zeroclaw:
                "22+ providers including Ollama, Groq, Mistral, OpenAI, Anthropic",
              ironclaw:
                "Anthropic, OpenAI, GitHub Copilot, Gemini, MiniMax, Mistral, Ollama, OpenRouter (300+ models), Together AI, Fireworks, vLLM, LiteLLM",
              hermes:
                "Nous Portal, OpenRouter (200+ models), Kimi, MiniMax, GLM, OpenAI, Anthropic, Hugging Face — swap with `hermes model`",
              nanoclaw:
                "Claude-first (Anthropic Agents SDK); expandable via OpenAI-compatible endpoints",
              nanobot:
                "OpenRouter, Anthropic, OpenAI, DeepSeek, Gemini, Groq + local via vLLM/Ollama (8+ providers)",
              picoclaw: "Standard LLM APIs — embedded-optimised",
              nullclaw: "22+ providers; 50+ in test suite",
              qclaw: "5-tier cost routing for automatic model selection",
            },
            bestFor: "ironclaw",
          },
          {
            category: "Best for",
            values: {
              openclaw:
                "Maximum integrations and features; power users; home labs with ample RAM",
              zeroclaw:
                "Edge / IoT devices; $10 single-board computers; deny-by-default security",
              ironclaw:
                "Regulated industries (healthcare, finance, legal); zero-trust; hardware TEE",
              hermes:
                "Users who want an agent that gets smarter over time; research-grade RL pipelines",
              nanoclaw:
                "Compliance-heavy environments; auditable codebase; per-conversation isolation",
              nanobot:
                "Developers who want to read and modify agent code; China-platform integration; Raspberry Pi",
              picoclaw:
                "IoT gateways, routers, IP cameras, RISC-V boards; battery-powered devices",
              nullclaw:
                "Absolute minimalism; <2ms boot; microcontrollers; Zig language preference",
              qclaw:
                "Knowledge-intensive agents with graph-based memory; AGEX agent identity protocol",
            },
          },
        ],
        useCases: [
          {
            contestant: "openclaw",
            reasons: [
              "Feature-richest option with 24+ messaging channels and 5,700+ ClawHub skills",
              "Power users wanting voice wake, live canvas, multi-agent routing out of the box",
              "Home lab setups where 1.5GB RAM is not a constraint",
              "Largest community and ecosystem support (~358K GitHub stars)",
            ],
          },
          {
            contestant: "zeroclaw",
            reasons: [
              "IoT or edge devices with <64MB RAM — <5MB binary, <10ms start",
              "Security-first users who want deny-by-default access controls",
              "Cost-sensitive scaling — same core features as OpenClaw in 300× less RAM",
              "Teams migrating from OpenClaw via built-in `zeroclaw migrate openclaw` command",
            ],
          },
          {
            contestant: "ironclaw",
            reasons: [
              "Regulated industries where credential leaks are unacceptable (WASM + AES-256-GCM vault)",
              "Enterprises requiring hardware-level attestation via TEE (Trusted Execution Environment)",
              "Zero-trust environments where every tool must be explicitly capability-granted",
              "Teams building custom plugins without risking host system access",
            ],
          },
          {
            contestant: "hermes",
            reasons: [
              "Users who want an agent that genuinely improves and personalises over time",
              "Research teams building RL fine-tuning pipelines from agent trajectory data",
              "Developers who switch LLM providers frequently — `hermes model` swaps instantly",
              "Serverless deployments via Modal or Daytona without managing infrastructure",
            ],
          },
          {
            contestant: "nanoclaw",
            reasons: [
              "Compliance-heavy environments needing per-conversation process isolation",
              "Security-conscious teams who want to audit every line (~700 lines total)",
              "Production deployments requiring OpenTelemetry tracing and audit logs",
              "WhatsApp-first workflows with strong multi-group isolation guarantees",
            ],
          },
          {
            contestant: "nanobot",
            reasons: [
              "Developers who want to understand and modify the agent code (~4K Python lines)",
              "Academic / research deployments backed by HKU Data Science Lab",
              "China-platform integration (Feishu/Lark) alongside Western channels",
              "Raspberry Pi 3B+ deployments at ~191MB RAM",
            ],
          },
          {
            contestant: "picoclaw",
            reasons: [
              "IoT gateways, home automation controllers, and network routers (32MB RAM)",
              "RISC-V, ARM, and x86 embedded boards including Sipeed LicheeRV Nano",
              "Battery-powered devices requiring a battery-friendly power profile",
              "GPIO and hardware peripheral control (ESP32, Arduino, Raspberry Pi) alongside LLM",
            ],
          },
          {
            contestant: "nullclaw",
            reasons: [
              "Absolute minimalists who need <2ms boot time and ~1MB RAM footprint",
              "Microcontrollers where even PicoClaw's <10MB is too large",
              "Teams using Zig for their stack who want native language integration",
              "Deployments inside Docker, WASM, or native — same static binary for all targets",
            ],
          },
          {
            contestant: "qclaw",
            reasons: [
              "Knowledge-intensive workflows needing graph-based long-term memory via Cognee",
              "Multi-agent systems using AGEX cryptographic identity for trust and scoped permissions",
              "Voice + media pipelines (Deepgram, Whisper, ElevenLabs) integrated with a personal agent",
              "Teams wanting ClawHub skills (3,286+) in a lighter package than OpenClaw",
            ],
          },
        ],
      },
    ],
    verdict:
      "OpenClaw for max features; ZeroClaw for edge/IoT; IronClaw for regulated industries; Hermes for self-improvement",
    verdictDetail:
      "The Claw ecosystem now has agents for every use case. OpenClaw (358K stars) wins on breadth — 24+ channels, 5,700+ skills, voice wake — but carries real security risk (5 CVEs including ClawBleed). ZeroClaw wins on efficiency (<5MB, <10ms, deny-by-default) and is the natural migration target from OpenClaw. IronClaw (WASM + TEE) is the only agent with hardware-level attestation — the right pick for regulated industries. Hermes Agent stands alone with a genuine self-improving learning loop. NanoClaw's per-conversation Docker isolation is stronger than OpenClaw's optional sandboxing at a fraction of the footprint. NullClaw (678KB Zig, <2ms) serves extreme embedded use cases. Beyond this list: MetaClaw (Python proxy) adds RL self-improvement to any Claw agent; HiClaw (Alibaba) enables multi-agent team orchestration; QwenPaw/CoPaw integrates the Qwen ecosystem for China-first deployments; Moltis (Rust, 44MB) adds enterprise voice I/O, WebAuthn, and Prometheus observability.",
    references: [
      {
        title: "OpenClaw GitHub",
        url: "https://github.com/openclaw/openclaw",
        note: "~358K stars; TypeScript; 24+ messaging integrations; 5,700+ ClawHub skills",
      },
      {
        title: "ZeroClaw GitHub",
        url: "https://github.com/zeroclaw-labs/zeroclaw",
        note: "~30K stars; Rust; <5MB; 25+ channels; built-in OpenClaw migration tool",
      },
      {
        title: "IronClaw GitHub (Near AI)",
        url: "https://github.com/nearai/ironclaw",
        note: "~11.5K stars; Rust + WASM; TEE support; AES-256-GCM credential vault",
      },
      {
        title: "Hermes Agent",
        url: "https://hermes-agent.org",
        note: "~91K stars; Nous Research; closed self-improving learning loop; MCP server mode",
      },
      {
        title: "NanoClaw GitHub",
        url: "https://github.com/qwibitai/nanoclaw",
        note: "~26.8K stars; TypeScript; per-conversation Docker isolation; 700-line codebase",
      },
      {
        title: "NanoBot GitHub",
        url: "https://github.com/HKUDS/nanobot",
        note: "~38K stars; HKU Data Science Lab; Python; ~191MB on Raspberry Pi 3B+",
      },
      {
        title: "PicoClaw GitHub",
        url: "https://github.com/sipeed/picoclaw",
        note: "~13K stars; Sipeed; Go; targets $10 embedded boards and RISC-V",
      },
      {
        title: "NullClaw GitHub",
        url: "https://github.com/nullclaw/nullclaw",
        note: "~5.3K stars; Zig; 678KB binary; <2ms boot; <1MB RAM — smallest in ecosystem",
      },
      {
        title: "QClaw / QuantumClaw GitHub",
        url: "https://github.com/QuantumClaw/QClaw",
        note: "JavaScript; Cognee knowledge graph memory; AGEX cryptographic agent identity",
      },
      {
        title: "EvoAI Labs — Claw Ecosystem Overview",
        url: "https://evoailabs.medium.com/openclaw-nanobot-picoclaw-ironclaw-and-zeroclaw-this-claw-craziness-is-continuing-87c72456e6dc",
        note: "Overview of the Claw ecosystem and its rapid growth in early 2026",
      },
      {
        title: "CVE-2026-25253 — OpenClaw ClawBleed",
        url: "https://nvd.nist.gov/vuln/detail/CVE-2026-25253",
        note: "CVSS 8.8 — cross-site WebSocket hijacking enabling one-click RCE",
      },
    ],
    faq: [
      {
        question: "What is the Claw ecosystem?",
        answer:
          "The Claw ecosystem is a family of open-source, self-hosted personal AI assistants that exploded in popularity in early 2026. It started with OpenClaw (TypeScript, November 2025), which went viral with 358,000+ GitHub stars. A wave of alternatives followed: ZeroClaw (Rust, <5MB), IronClaw (WASM/TEE security), NanoClaw (per-conversation Docker), PicoClaw (Go, IoT), NullClaw (Zig, 678KB), and QClaw (JavaScript, knowledge-graph memory). Hermes Agent (Nous Research) is an independent agent often compared alongside the ecosystem for its unique self-improving capability.",
      },
      {
        question: "Is OpenClaw safe to use after ClawBleed?",
        answer:
          "OpenClaw patched CVE-2026-25253 (ClawBleed), but the platform accumulated 137 total security advisories and 341 confirmed malicious ClawHub skills in the ClawHavoc campaign as of April 2026. For security-sensitive deployments, ZeroClaw (deny-by-default), IronClaw (WASM sandbox + TEE), or NanoClaw (per-conversation container isolation) are more hardened alternatives. OpenClaw remains the best choice for breadth on trusted home networks.",
      },
      {
        question: "Which self-hosted agent can run on a Raspberry Pi?",
        answer:
          "NanoBot (~191MB, benchmarked on Raspberry Pi 3B+) and ZeroClaw (<5MB) both run well on Raspberry Pi. OpenClaw requires a minimum of 4GB RAM (Raspberry Pi 4 or better). PicoClaw and NullClaw target even more constrained hardware — sub-$10 RISC-V and embedded boards.",
      },
      {
        question: "What makes Hermes Agent different from the Claw agents?",
        answer:
          "Hermes Agent (Nous Research) is the only personal AI agent with a genuine closed self-improving learning loop. It creates skills from experience, fine-tunes itself via Atropos RL integration, searches its own past conversations using FTS5 + LLM summarisation, and builds a deepening user model via Honcho dialectic. No Claw agent has this capability natively. MetaClaw (a proxy layer) can add similar self-improvement to any Claw agent as an add-on.",
      },
      {
        question: "Which agent has the most messaging integrations?",
        answer:
          "ZeroClaw supports 25+ channels — slightly more than OpenClaw's 24+ — including WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Matrix, IRC, Email, Bluesky, DingTalk, Lark, Nostr, Reddit, LinkedIn, Twitter, MQTT, QQ, WeChat Work, and more. NullClaw (678KB Zig binary) supports 18–19 channels despite its extreme size constraints. IronClaw has the fewest due to its security-first architecture.",
      },
    ],
    relatedSlugs: ["coding-agent-comparison", "proprietary-llm-comparison"],
  },
];

export function getMultiComparisonBySlug(
  slug: string
): MultiComparisonConfig | undefined {
  return multiCompareConfig.find((c) => c.slug === slug);
}
