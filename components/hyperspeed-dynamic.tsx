"use client";
import dynamic from "next/dynamic";
export default dynamic(() => import("@/components/Hyperspeed"), { ssr: false });
