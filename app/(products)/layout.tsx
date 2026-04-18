import PageContainer from "@/components/page-container";

export default function ProductsGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
