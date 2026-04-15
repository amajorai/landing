export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 pt-20 pb-16 lg:pt-28">{children}</main>
  );
}
