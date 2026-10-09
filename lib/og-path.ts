export function ogFileName(route: string): string {
  if (route === "/") return "index";
  if (!route.startsWith("/") || route.length > 1024)
    throw new Error("Invalid OG route");
  const segments = route.slice(1).split("/");
  if (
    segments.some((segment) => !/^[\p{L}\p{N}\p{M}_-]{1,200}$/u.test(segment))
  )
    throw new Error("Invalid OG route");
  return segments.join("-");
}
