import PageContainer from "@/components/page-container";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
