"use client";

import * as React from "react";

interface SpeechHighlightContextValue {
  currentCharIndex: number;
  isSpeaking: boolean;
  isPaused: boolean;
  isSeeking: boolean;
  autoScroll: boolean;
  onWordClick?: (absCharIndex: number) => void;
}

const SpeechHighlightContext = React.createContext<SpeechHighlightContextValue>(
  {
    currentCharIndex: -1,
    isSpeaking: false,
    isPaused: false,
    isSeeking: false,
    autoScroll: true,
    onWordClick: undefined,
  }
);

export function useSpeechHighlight() {
  return React.useContext(SpeechHighlightContext);
}

export function SpeechHighlightProvider({
  children,
  currentCharIndex,
  isSpeaking,
  isPaused,
  isSeeking,
  autoScroll,
  onWordClick,
}: {
  children: React.ReactNode;
  currentCharIndex: number;
  isSpeaking: boolean;
  isPaused: boolean;
  isSeeking: boolean;
  autoScroll: boolean;
  onWordClick?: (absCharIndex: number) => void;
}) {
  const value = React.useMemo(
    () => ({
      currentCharIndex,
      isSpeaking,
      isPaused,
      isSeeking,
      autoScroll,
      onWordClick,
    }),
    [currentCharIndex, isSpeaking, isPaused, isSeeking, autoScroll, onWordClick]
  );

  return (
    <SpeechHighlightContext.Provider value={value}>
      {children}
    </SpeechHighlightContext.Provider>
  );
}
