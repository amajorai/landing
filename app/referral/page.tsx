import { generateMetadata } from "@/lib/metadata";
import ReferralContent from "./content";

export const metadata = generateMetadata({
  title: "Referral Program — Earn 5% Commission — A Major",
  description:
    "Refer a client to A Major and earn 5% of the total project cost on completion. Anyone can refer. We bank transfer the fee directly to you.",
  url: "/referral",
  tags: [
    "referral program",
    "refer a client",
    "earn commission",
    "software agency referral",
    "Singapore agency referral",
    "5% commission",
  ],
});

export default function ReferralPage() {
  return <ReferralContent />;
}
