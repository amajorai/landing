"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  const [showHat, setShowHat] = useState(false);

  useEffect(() => {
    const now = new Date();
    // Show only in December (Month index 11)
    if (now.getMonth() === 11) {
      setShowHat(true);
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-2",
        className
      )}
    >
      <div className="relative">
        {showHat && (
          <svg
            aria-hidden="true"
            className="absolute -top-3.5 -left-1.5 z-10 h-6 w-6 -rotate-[22deg] transform"
            fill="none"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pom-pom - moved to the drooping tip */}
            <circle className="fill-white" cx="3" cy="11" r="2.5" />
            {/* Hat Body - Drooping to the left */}
            <path
              className="fill-red-600"
              d="M19 17 C20 12 15 2 8 5 C 5 6 3 9 4 11 C 5 12 4 17 4 17 L19 17 Z"
            />
            {/* Brim - unchanged */}
            <path
              className="fill-white"
              d="M2 16C2 15.4477 2.44772 15 3 15H20C20.5523 15 21 15.4477 21 16V18C21 18.5523 20.5523 19 20 19H3C2.44772 19 2 18.5523 2 18V16Z"
            />
          </svg>
        )}
        <Image
          alt="A Major"
          className="mt-0.5 dark:invert"
          height={14}
          priority
          src="/logos/amajor-submark.svg"
          width={14}
        />
      </div>
    </div>
  );
};
