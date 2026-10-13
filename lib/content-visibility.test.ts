import { expect, test } from "bun:test";
import { isPublished, validPublicSlug } from "./content-visibility";

const now = new Date(2026, 9, 13, 12);

test("drafts are never published", () => {
  expect(isPublished({ draft: true }, now)).toBe(false);
  expect(isPublished({ draft: true, date: new Date("2026-01-01") }, now)).toBe(
    false
  );
});

test("dated entries go live on their publish date, not before", () => {
  expect(isPublished({ date: new Date("2026-10-12") }, now)).toBe(true);
  expect(isPublished({ date: new Date("2026-10-13") }, now)).toBe(true);
  expect(isPublished({ date: new Date("2026-10-14") }, now)).toBe(false);
});

test("undated, non-draft entries are published", () => {
  expect(isPublished({}, now)).toBe(true);
});

test("malformed slugs are rejected", () => {
  expect(validPublicSlug("published-slug")).toBe(true);
  for (const slug of ["", "a/b", "a\\b", ".", "..", "x".repeat(201), "a\nb"])
    expect(validPublicSlug(slug)).toBe(false);
});
