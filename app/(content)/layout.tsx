import PageContainer from "@/components/page-container";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <main className="min-h-screen px-6 pt-20 pb-16 lg:pt-30">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
    </PageContainer>
  );
}
