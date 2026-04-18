"use client";
import dynamic from "next/dynamic";
export default dynamic(() => import("@/components/Silk"), { ssr: false });
