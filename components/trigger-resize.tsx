"use client";
import { useEffect } from "react";

export function TriggerResize() {
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    return () => clearTimeout(id);
  }, []);
  return null;
}
