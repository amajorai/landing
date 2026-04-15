"use client";
import { useEffect, useRef, useState } from "react";

interface Endpoint {
  server: string[];
  client: string[];
}

const ENDPOINTS: Endpoint[] = [
  {
    server: [
      "app.get('/user', () => ({",
      '  name: "Jia Wei",',
      '  role: "admin"',
      "}))",
    ],
    client: [
      "const { data } = await eden",
      "  .user.get()",
      "// data: { name: string,",
      "//         role: string }",
    ],
  },
  {
    server: [
      "app.post('/post', ({ body }) => ({",
      "  id: 42,",
      "  title: body.title",
      "}))",
    ],
    client: [
      "const { data } = await eden",
      "  .post.post({ title })",
      "// data: { id: number,",
      "//         title: string }",
    ],
  },
  {
    server: [
      "app.get('/feed', () => ({",
      "  items: [],",
      "  cursor: null",
      "}))",
    ],
    client: [
      "const { data } = await eden",
      "  .feed.get()",
      "// data: { items: Item[],",
      "//         cursor: string|null }",
    ],
  },
];

type Phase = "typing-server" | "flying-type" | "typing-client" | "holding";

export function ElysiaVisualization() {
  const [endpointIdx, setEndpointIdx] = useState(0);
  const [serverChars, setServerChars] = useState(0);
  const [clientChars, setClientChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing-server");
  const [flyT, setFlyT] = useState(0); // 0..1
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const serverText = ENDPOINTS[endpointIdx].server.join("\n");
  const clientText = ENDPOINTS[endpointIdx].client.join("\n");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const runPhase = () => {
      if (!runningRef.current) return;
      const ep = ENDPOINTS[endpointIdx];
      const sText = ep.server.join("\n");
      const cText = ep.client.join("\n");

      if (phase === "typing-server") {
        setServerChars(0);
        let i = 0;
        intervalRef.current = setInterval(() => {
          if (!runningRef.current) return;
          i += 1;
          setServerChars(i);
          if (i >= sText.length) {
            clearTimers();
            timeoutRef.current = setTimeout(() => setPhase("flying-type"), 300);
          }
        }, 25);
      } else if (phase === "flying-type") {
        setFlyT(0);
        let t = 0;
        intervalRef.current = setInterval(() => {
          if (!runningRef.current) return;
          t += 0.04;
          setFlyT(t);
          if (t >= 1) {
            clearTimers();
            setPhase("typing-client");
          }
        }, 20);
      } else if (phase === "typing-client") {
        setClientChars(0);
        let i = 0;
        intervalRef.current = setInterval(() => {
          if (!runningRef.current) return;
          i += 1;
          setClientChars(i);
          if (i >= cText.length) {
            clearTimers();
            timeoutRef.current = setTimeout(() => setPhase("holding"), 1000);
          }
        }, 20);
      } else if (phase === "holding") {
        timeoutRef.current = setTimeout(() => {
          if (!runningRef.current) return;
          setEndpointIdx((v) => (v + 1) % ENDPOINTS.length);
          setServerChars(0);
          setClientChars(0);
          setFlyT(0);
          setPhase("typing-server");
        }, 500);
      }
    };

    runPhase();
    return () => {
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, endpointIdx]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !runningRef.current) {
            runningRef.current = true;
            setEndpointIdx(0);
            setServerChars(0);
            setClientChars(0);
            setFlyT(0);
            setPhase("typing-server");
          } else if (!entry.isIntersecting && runningRef.current) {
            runningRef.current = false;
            clearTimers();
          }
        }
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(container);

    return () => {
      runningRef.current = false;
      clearTimers();
      observerRef.current?.disconnect();
    };
  }, []);

  const visibleServer = serverText.slice(0, serverChars);
  const visibleClient = clientText.slice(0, clientChars);

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={containerRef}
    >
      <div className="relative flex h-full gap-2">
        {/* LEFT: server */}
        <div className="flex flex-1 flex-col rounded-md border border-fuchsia-600/40 bg-fuchsia-950/30 p-2 dark:bg-fuchsia-950/40">
          <div className="mb-1 font-mono text-[9px] text-fuchsia-600 dark:text-fuchsia-300">
            server.ts
          </div>
          <pre className="whitespace-pre font-mono text-[9px] text-fuchsia-900 leading-[1.3] lg:text-[10px] dark:text-fuchsia-50">
            {visibleServer}
            {phase === "typing-server" && (
              <span className="inline-block h-[1em] w-1 animate-pulse bg-fuchsia-500" />
            )}
          </pre>
        </div>

        {/* RIGHT: client */}
        <div className="flex flex-1 flex-col rounded-md border border-fuchsia-500/40 bg-fuchsia-950/30 p-2 dark:bg-fuchsia-950/40">
          <div className="mb-1 font-mono text-[9px] text-fuchsia-500 dark:text-fuchsia-200">
            client.ts
          </div>
          <pre className="whitespace-pre font-mono text-[9px] text-fuchsia-900 leading-[1.3] lg:text-[10px] dark:text-fuchsia-50">
            {visibleClient}
            {phase === "typing-client" && (
              <span className="inline-block h-[1em] w-1 animate-pulse bg-fuchsia-400" />
            )}
          </pre>
        </div>

        {/* Flying type badge */}
        {phase === "flying-type" && (
          <div
            className="pointer-events-none absolute flex items-center justify-center rounded border border-blue-400 bg-blue-500/90 px-1.5 py-0.5 font-bold font-mono text-[9px] text-white shadow-lg"
            style={{
              left: `calc(${8 + flyT * 80}% - 12px)`,
              top: "50%",
              transform: "translateY(-50%)",
              boxShadow: "0 0 14px rgba(96,165,250,0.8)",
            }}
          >
            type
          </div>
        )}
      </div>
    </div>
  );
}
