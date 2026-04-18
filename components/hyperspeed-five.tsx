"use client";
import dynamic from "next/dynamic";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), { ssr: false });

export default function HyperspeedFive() {
  return <Hyperspeed effectOptions={hyperspeedPresets.two} />;
}
