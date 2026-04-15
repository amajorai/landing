"use client";
import { useEffect, useRef, useState } from "react";

type Pair = {
  schema: string[];
  sql: string[];
};

const PAIRS: Pair[] = [
  {
    schema: [
      "const users = pgTable('users', {",
      "  id: serial().primaryKey(),",
      "  name: text().notNull(),",
      "  email: text().unique(),",
      "})",
    ],
    sql: [
      "SELECT id, name, email",
      "FROM users",
      "WHERE email = $1",
      "LIMIT 10",
    ],
  },
  {
    schema: [
      "const posts = pgTable('posts', {",
      "  id: serial().primaryKey(),",
      "  title: text().notNull(),",
      "  authorId: integer(),",
      "})",
    ],
    sql: [
      "INSERT INTO posts",
      "  (title, author_id)",
      "VALUES ($1, $2)",
      "RETURNING id",
    ],
  },
];

const CHAR_INTERVAL = 22;
const PAUSE_AFTER = 2000;

export function DrizzleVisualization() {
  const rootRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [pairIdx, setPairIdx] = useState(0);
  const [schemaChars, setSchemaChars] = useState(0);
  const [sqlChars, setSqlChars] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setIsDark(document.documentElement.classList.contains("dark"));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          runningRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const pair = PAIRS[pairIdx];
    const schemaFull = pair.schema.join("\n");
    const sqlFull = pair.sql.join("\n");

    const tick = () => {
      if (!runningRef.current) {
        timer = setTimeout(tick, 80);
        return;
      }
      if (schemaChars < schemaFull.length) {
        setSchemaChars((c) => c + 1);
        timer = setTimeout(tick, CHAR_INTERVAL);
      } else if (sqlChars < sqlFull.length) {
        setSqlChars((c) => c + 1);
        timer = setTimeout(tick, CHAR_INTERVAL);
      } else {
        timer = setTimeout(() => {
          setSchemaChars(0);
          setSqlChars(0);
          setPairIdx((i) => (i + 1) % PAIRS.length);
        }, PAUSE_AFTER);
      }
    };
    timer = setTimeout(tick, CHAR_INTERVAL);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pairIdx, schemaChars, sqlChars]);

  const pair = PAIRS[pairIdx];
  const schemaText = pair.schema.join("\n").slice(0, schemaChars);
  const sqlText = pair.sql.join("\n").slice(0, sqlChars);
  const schemaDone = schemaChars >= pair.schema.join("\n").length;
  const sqlDone = sqlChars >= pair.sql.join("\n").length;

  const schemaColor = "#4ade80";
  const sqlColor = "#86efac";
  const arrowColor = isDark ? "rgba(74,222,128,0.5)" : "rgba(22,163,74,0.4)";
  const textColor = isDark ? "#f0fdf4" : "#14532d";
  const panelBg = isDark ? "rgba(5,46,22,0.6)" : "rgba(240,253,244,0.85)";
  const panelBorder = isDark ? "rgba(74,222,128,0.3)" : "rgba(22,163,74,0.3)";

  return (
    <div
      className="h-[200px] w-full overflow-hidden lg:h-[280px]"
      ref={rootRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        gap: "8px",
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "9px",
        lineHeight: 1.4,
      }}
    >
      <div
        style={{
          flex: 1,
          height: "100%",
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          borderRadius: 6,
          padding: "8px",
          color: schemaColor,
          whiteSpace: "pre",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: 8,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          schema.ts
        </div>
        {schemaText}
        <span style={{ opacity: schemaDone ? 0 : 1 }}>▊</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: textColor,
          fontSize: 8,
          minWidth: 52,
        }}
      >
        <div
          style={{
            fontSize: 7,
            color: schemaColor,
            marginBottom: 2,
            textShadow: `0 0 6px ${arrowColor}`,
          }}
        >
          Drizzle ORM
        </div>
        <svg height="14" viewBox="0 0 48 14" width="48">
          <defs>
            <linearGradient id="drzGrad" x1="0" x2="1">
              <stop offset="0" stopColor={schemaColor} stopOpacity="0.1" />
              <stop offset="1" stopColor={schemaColor} stopOpacity="1" />
            </linearGradient>
          </defs>
          <line
            stroke="url(#drzGrad)"
            strokeWidth="2"
            x1="2"
            x2="40"
            y1="7"
            y2="7"
          />
          <polygon fill={schemaColor} points="40,2 46,7 40,12" />
        </svg>
      </div>

      <div
        style={{
          flex: 1,
          height: "100%",
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          borderRadius: 6,
          padding: "8px",
          color: sqlColor,
          whiteSpace: "pre",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: 8,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          query.sql
        </div>
        {sqlText}
        <span style={{ opacity: schemaDone && !sqlDone ? 1 : 0 }}>▊</span>
      </div>
    </div>
  );
}
