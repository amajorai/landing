export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 pt-30 pb-16">
      <div className="mx-auto max-w-2xl">{children}</div>
    </main>
  );
}
