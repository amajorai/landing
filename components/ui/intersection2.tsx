export function Intersection2({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1rem_1fr_1rem] [--pattern-fg:var(--color-gray-950)]/5 dark:bg-transparent dark:[--pattern-fg:var(--color-white)]/10">
      {/* Left vertical hatched border */}
      <div className="-right-px col-start-1 row-span-full border-x bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
      {/* Content */}
      <div className="col-start-2">{children}</div>
      {/* Right vertical hatched border */}
      <div className="-left-px col-start-3 row-span-full border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
    </div>
  );
}
