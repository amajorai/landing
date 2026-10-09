import { expect, test } from "bun:test";
import { serializeJsonLd } from "./json-ld";
import { ogFileName } from "./og-path";

test("JSON-LD cannot terminate its script and preserves JSON values", () => {
  const payload = { title: "</script><script>alert(1)</script> & café" };
  const encoded = serializeJsonLd(payload);
  expect(encoded).not.toContain("<");
  expect(JSON.parse(encoded)).toEqual(payload);
});

test("OG filenames preserve ordinary routes and reject alternate separators", () => {
  expect(ogFileName("/")).toBe("index");
  expect(ogFileName("/blog/hello-world")).toBe("blog-hello-world");
  for (const route of [
    "/blog/../outside",
    "/blog/a\\b",
    "/blog/C:evil",
    "/blog/%2f",
    "/blog//foo",
  ])
    expect(() => ogFileName(route)).toThrow();
});
