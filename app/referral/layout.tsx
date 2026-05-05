import PageContainer from "@/components/page-container";

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
