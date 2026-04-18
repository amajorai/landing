import { StarMark } from "@/components/ui/star-mark";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative divide-y divide-dashed divide-border border border-border border-dashed">
        <StarMark
          style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
        />
        <StarMark
          style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
        />
        <StarMark
          style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
        />
        <StarMark
          style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
        />
        {children}
      </div>
    </div>
  );
}
