"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Snowfall from "react-snowfall";
import { useWindowSize } from "react-use";

export function SeasonalEffects() {
  const [effect, setEffect] = useState<"snow" | "confetti" | null>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const date = now.getDate(); // 1-31

    // Snowfall: Dec 1st to Dec 30th
    if (month === 11 && date <= 30) {
      setEffect("snow");
    }
    // Confetti: Dec 31st and Jan 1st
    else if ((month === 11 && date === 31) || (month === 0 && date === 1)) {
      setEffect("confetti");
    } else {
      setEffect(null);
    }
  }, []);

  if (!effect) {
    return null;
  }

  if (effect === "confetti") {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <Confetti
          colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
          height={height}
          numberOfPieces={50}
          style={{ pointerEvents: "none" }}
          width={width}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Snowfall
        snowflakeCount={50}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 50,
        }}
      />
    </div>
  );
}
