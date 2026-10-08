import { expect, mock, test } from "bun:test";

process.env.NOTION_API_KEY = "test-only";
process.env.NOTION_BLOG_DATABASE_ID = "blog-db";
process.env.NOTION_PAGES_DATABASE_ID = "pages-db";
let queries = 0;
let blockReads = 0;
let fixture: Record<string, unknown> = {};
let paginated = false;
mock.module("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
mock.module("@notionhq/client", () => ({
  Client: class {
    dataSources = {
      query: async (input: {
        start_cursor?: string;
        filter?: { and?: unknown[]; property?: string };
      }) => {
        queries++;
        if (
          paginated &&
          input.filter?.property === "Status" &&
          !input.start_cursor
        )
          return { results: [], has_more: true, next_cursor: "second-page" };
        return { results: [fixture], has_more: false };
      },
    };
    blocks = {
      children: {
        list: async () => {
          blockReads++;
          return {
            results: [
              {
                id: "published-image",
                type: "image",
                image: { external: { url: "https://example.com/image.png" } },
              },
            ],
            has_more: false,
          };
        },
      },
    };
  },
}));
const { getBlogPost, getPage, publishedImageIds } = await import("./notion");
function page(status: unknown) {
  return {
    id: "page-id",
    properties: {
      Slug: { rich_text: [{ plain_text: "published-slug" }] },
      Title: { title: [{ plain_text: "Title" }] },
      Date: { date: { start: "2026-01-01" } },
      Status: status,
    },
    created_time: "2026-01-01T00:00:00Z",
    last_edited_time: "2026-01-01T00:00:00Z",
  };
}
test("only Published native status or select pages reach block reads", async () => {
  for (const status of [
    { type: "status", status: { name: "Draft" } },
    { type: "select", select: { name: "Draft" } },
    {},
    undefined,
  ]) {
    fixture = page(status);
    blockReads = 0;
    expect((await getBlogPost("published-slug")).post).toBeNull();
    expect((await getPage("published-slug")).page).toBeNull();
    expect(blockReads).toBe(0);
  }
  for (const status of [
    { type: "status", status: { name: "Published" } },
    { type: "select", select: { name: "Published" } },
  ]) {
    fixture = page(status);
    expect((await getBlogPost("published-slug")).post?.id).toBe("page-id");
    expect((await getPage("published-slug")).page?.id).toBe("page-id");
  }
  fixture = {
    ...page({ type: "status", status: { name: "Published" } }),
    archived: true,
  };
  expect((await getPage("published-slug")).page).toBeNull();
  expect((await publishedImageIds()).pageIds).toEqual([]);
});
test("arbitrary identifiers never create detail reads and malformed slugs make no Notion calls", async () => {
  fixture = page({ type: "status", status: { name: "Published" } });
  blockReads = 0;
  expect((await getPage("unknown-id")).page).toBeNull();
  expect((await getBlogPost("unknown-id")).post).toBeNull();
  expect(blockReads).toBe(0);
  queries = 0;
  for (const slug of ["a/b", "..", "x".repeat(201), "a\\b"])
    expect((await getPage(slug)).page).toBeNull();
  expect(queries).toBe(0);
});
test("published pages remain reachable after pagination and legacy blog configuration", async () => {
  fixture = page({ type: "status", status: { name: "Published" } });
  paginated = true;
  expect((await getPage("published-slug")).page?.id).toBe("page-id");
  paginated = false;
  delete process.env.NOTION_BLOG_DATABASE_ID;
  process.env.NOTION_DATABASE_ID = "legacy-blog";
  expect((await getBlogPost("published-slug")).post?.id).toBe("page-id");
  process.env.NOTION_BLOG_DATABASE_ID = "blog-db";
});
