import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OG Image Test | A Major",
  description: "Test page for dynamic OG image generation",
};

export default function OGTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
