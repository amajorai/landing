"use client";

import * as React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { TextToSpeechControls } from "./TextToSpeechControls";

interface BlogTextToSpeechProps {
  /** Plain text to read aloud, prepared on the server from the post. */
  text: string;
  children: React.ReactNode;
}

export function BlogTextToSpeech({ text, children }: BlogTextToSpeechProps) {
  const {
    setText,
    speak,
    cancel,
    pause,
    resume,
    seek,
    speaking,
    paused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    volume,
    setVolume,
    isSupported,
    progress,
    elapsedSeconds,
    totalSeconds,
  } = useSpeechSynthesis();

  React.useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  React.useEffect(() => {
    setText(text);
  }, [text, setText]);

  if (!isSupported) {
    return <>{children}</>;
  }

  return (
    <>
      {text && (
        <FadeIn delay={0.15}>
          <TextToSpeechControls
            cancel={cancel}
            elapsedSeconds={elapsedSeconds}
            isSupported={isSupported}
            pause={pause}
            paused={paused}
            progress={progress}
            rate={rate}
            resume={resume}
            seek={seek}
            selectedVoice={selectedVoice}
            setRate={setRate}
            setSelectedVoice={setSelectedVoice}
            setVolume={setVolume}
            speak={() => speak(text)}
            speaking={speaking}
            text={text}
            totalSeconds={totalSeconds}
            voices={voices}
            volume={volume}
          />
        </FadeIn>
      )}
      {children}
    </>
  );
}
