import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

let notion: any = null; // Typing as any to support dataSources

export const getNotionClient = () => {
  if (!process.env.NOTION_API_KEY) {
    console.error("❌ NOTION_API_KEY is missing from environment variables!");
  }

  if (!notion) {
    try {
      const client = new Client({
        auth: process.env.NOTION_API_KEY,
      });
      notion = client;
    } catch (e) {
      console.error("Error initializing Notion Client:", e);
    }
  }
  return notion;
};

// Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  authors: { name: string; avatar?: string; slug: string }[];
  tags: string[];
  tagColors?: Record<string, string>;
  cover?: string;
  readingTime: number;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string; // Kept for types but unused in new implementation
  cover?: string;
  lastEdited: string;
  description?: string;
}


export interface NavProduct {
  id: string;
  name: string;
  description: string;
  tagline?: string;
  slug: string;
  emoji?: string;
  url?: string;
  status?: string;
}

// Helper: Extract tags with Notion colors
export function getTagsWithColors(
  page: any
): { name: string; color: string }[] {
  const tagsProperty = page.properties?.Tag;
  if (!tagsProperty) return [];

  // Handle multi_select
  if (tagsProperty.type === "multi_select") {
    return (
      tagsProperty.multi_select?.map((tag: any) => ({
        name: tag.name,
        color: tag.color || "default",
      })) || []
    );
  }

  // Handle select (single tag)
  if (tagsProperty.type === "select" && tagsProperty.select) {
    return [
      {
        name: tagsProperty.select.name,
        color: tagsProperty.select.color || "default",
      },
    ];
  }

  return [];
}

// Helper: Get tag color map for a page
export function getTagColorMap(page: any): Record<string, string> {
  const tags = getTagsWithColors(page);
  const colorMap: Record<string, string> = {};
  tags.forEach((tag) => {
    colorMap[tag.name] = tag.color;
  });
  return colorMap;
}

// Helper: Extract tags as string array
function getTagsAsArray(page: any): string[] {
  const tagsProperty = page.properties?.Tag;
  if (!tagsProperty) return [];

  // Handle multi_select
  if (tagsProperty.type === "multi_select") {
    return tagsProperty.multi_select?.map((tag: any) => tag.name) || [];
  }

  // Handle select (single tag)
  if (tagsProperty.type === "select" && tagsProperty.select) {
    return [tagsProperty.select.name];
  }

  return [];
}

// Helper: Block to Plain Text
export function blockToPlainText(block: any): string {
  if (!block) return "";

  const type = block.type;
  const blockData = block[type];

  if (!blockData) return "";

  switch (type) {
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "bulleted_list_item":
    case "numbered_list_item":
    case "quote":
    case "callout":
      return (
        blockData.rich_text?.map((text: any) => text.plain_text).join("") || ""
      );
    case "code":
      return (
        blockData.rich_text?.map((text: any) => text.plain_text).join("") || ""
      );
    default:
      return "";
  }
}

export function extractReadingTimeFromBlocks(
  blocks: BlockObjectResponse[]
): number {
  const WORDS_PER_MINUTE = 200;
  let wordCount = 0;
  for (const block of blocks) {
    const text = blockToPlainText(block).trim();
    if (text) wordCount += text.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

export function extractHeadingsFromBlocks(
  blocks: BlockObjectResponse[]
): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const block of blocks) {
    if (
      block.type === "heading_1" ||
      block.type === "heading_2" ||
      block.type === "heading_3"
    ) {
      const level = Number(block.type.slice(-1)) as 1 | 2 | 3;
      const text = (block as any)[block.type].rich_text
        .map((t: any) => t.plain_text)
        .join("");
      if (text) headings.push({ id: block.id, text, level });
    }
  }
  return headings;
}

export function extractDescriptionFromBlocks(
  blocks: BlockObjectResponse[],
  maxLength = 160
): string {
  const texts: string[] = [];
  for (const block of blocks) {
    const text = blockToPlainText(block).trim();
    if (text) {
      texts.push(text);
      if (texts.join(" ").length >= maxLength) break;
    }
  }
  const combined = texts.join(" ");
  return combined.length > maxLength
    ? `${combined.slice(0, maxLength).trimEnd()}…`
    : combined;
}

// --- Fetching Logic ---

async function fetchBlockChildren(blockId: string): Promise<any[]> {
  const notion = getNotionClient();
  const allBlocks: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    allBlocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return Promise.all(
    allBlocks.map(async (block) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block.id);
        return { ...block, children };
      }
      return block;
    })
  );
}

async function fetchPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  return fetchBlockChildren(pageId) as Promise<BlockObjectResponse[]>;
}

// Transform Helper
const getRichText = (richText: any[]) =>
  richText?.map((t) => t.plain_text).join("") || "";

const getProperty = (
  page: any,
  prop: string,
  type:
    | "title"
    | "rich_text"
    | "date"
    | "multi_select"
    | "select"
    | "url"
    | "people" = "rich_text"
) => {
  const p = page.properties?.[prop];
  if (!p) return null;

  if (type === "title") return getRichText(p.title);
  if (type === "rich_text") return getRichText(p.rich_text);
  if (type === "date") return p.date?.start || "";
  if (type === "multi_select")
    return p.multi_select?.map((o: any) => o.name) || [];
  if (type === "select") return p.select?.name || "";
  if (type === "url") return p.url || "";
  if (type === "people")
    return (
      p.people
        ?.filter((person: any) => person.name)
        .map((person: any) => ({
          name: person.name,
          avatar: person.avatar_url,
          slug: person.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
        })) || []
    );

  return "";
};

function extractAuthors(page: any): BlogPost["authors"] {
  const name = getProperty(page, "Author Name", "rich_text") as string;
  const slug = getProperty(page, "Author Slug", "rich_text") as string;
  const avatarFiles = page.properties?.["Author Avatar"]?.files;
  const avatar =
    avatarFiles?.[0]?.file?.url || avatarFiles?.[0]?.external?.url || undefined;
  console.log(
    "[extractAuthors] name:",
    name,
    "slug:",
    slug,
    "avatar:",
    avatar,
    "avatarFiles:",
    JSON.stringify(avatarFiles)
  );
  if (!(name && slug)) return [];
  return [{ name, avatar, slug }];
}

// Uncached fetch functions for OG generation script
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

  if (!databaseId) return [];

  try {
    const filter = {
      property: "Status",
      status: { equals: "Published" },
    };
    const sorts = [{ property: "Date", direction: "descending" }];

    const allResults: any[] = [];
    let cursor: string | undefined;

    do {
      let response: any;

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter,
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter,
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      }

      allResults.push(...response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    return allResults
      .map((page: any) => {
        const title =
          getProperty(page, "Title", "title") ||
          getProperty(page, "Name", "title") ||
          "Untitled";

        const tags = getTagsAsArray(page);
        const tagColors = getTagColorMap(page);

        const banner =
          page.properties?.Banner?.files?.[0]?.file?.url ||
          page.properties?.Banner?.files?.[0]?.external?.url ||
          page.properties?.Cover?.files?.[0]?.file?.url ||
          page.properties?.Cover?.files?.[0]?.external?.url ||
          page.cover?.external?.url ||
          page.cover?.file?.url ||
          undefined;

        return {
          id: page.id,
          slug: getProperty(page, "Slug", "rich_text") || "",
          title,
          date: getProperty(page, "Date", "date") || page.created_time,
          description: getProperty(page, "Excerpt", "rich_text") || "",
          authors: extractAuthors(page),
          tags,
          tagColors,
          cover: banner,
          readingTime: 0,
        } as BlogPost;
      })
      .filter((post: BlogPost) => {
        if (!post.slug) return false;
        if (!post.date) return true;
        return post.date.slice(0, 10) <= todayStr;
      });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
};

export const getBlogPosts = unstable_cache(fetchBlogPosts, ["blog-posts"], {
  revalidate: 1800,
});

export const getBlogPost = unstable_cache(
  async (
    slug: string
  ): Promise<{ post: BlogPost | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId =
      process.env.NOTION_DATABASE_ID || process.env.NOTION_BLOG_DATABASE_ID; // Fallback

    if (!databaseId) return { post: null, blocks: [] };

    try {
      // Query logic...
      let response;
      const queryFilter = {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      };

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: queryFilter,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter: queryFilter,
        });
      }

      if (response.results.length === 0) return { post: null, blocks: [] };

      const page: any = response.results[0];

      // Status gate: only Published posts are accessible directly
      const status = getProperty(page, "Status", "select");
      if (status && status !== "Published") return { post: null, blocks: [] };

      // Future date gate: match the listing filter in getBlogPosts
      const postDate = getProperty(page, "Date", "date");
      if (postDate) {
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        if (postDate.slice(0, 10) > todayStr) return { post: null, blocks: [] };
      }

      const title =
        getProperty(page, "Title", "title") ||
        getProperty(page, "Name", "title") ||
        "Untitled";

      const tags = getTagsAsArray(page);
      const tagColors = getTagColorMap(page);

      const banner =
        page.properties?.Banner?.files?.[0]?.file?.url ||
        page.properties?.Banner?.files?.[0]?.external?.url ||
        page.properties?.Cover?.files?.[0]?.file?.url ||
        page.properties?.Cover?.files?.[0]?.external?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        undefined;

      const post: BlogPost = {
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title,
        date: getProperty(page, "Date", "date") || page.created_time,
        description: getProperty(page, "Excerpt", "rich_text") || "",
        authors: extractAuthors(page),
        tags,
        tagColors,
        cover: banner,
        readingTime: 0, // Will be calculated below
      };

      const blocks = await fetchPageBlocks(page.id);
      const readingTime = extractReadingTimeFromBlocks(blocks);

      return { post: { ...post, readingTime }, blocks };
    } catch (error) {
      console.error(`Failed to fetch blog post ${slug}:`, error);
      return { post: null, blocks: [] };
    }
  },
  ["blog-post"],
  { revalidate: 1800 }
);

// Uncached fetch function for pages
export const fetchPages = async (): Promise<Page[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_PAGES_DATABASE_ID;
  if (!databaseId) return [];

  try {
    let response;
    const filter = {
      property: "Status",
      status: {
        equals: "Published",
      },
    };

    if (notion.dataSources) {
      response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter,
      });
    } else {
      response = await notion.databases.query({
        database_id: databaseId,
        filter,
      });
    }

    return response.results
      .map((page: any) => ({
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: getProperty(page, "Title", "title") || "Untitled",
        lastEdited: page.last_edited_time,
        cover: page.cover?.external?.url || page.cover?.file?.url || undefined,
      }))
      .filter((p: Page) => p.slug);
  } catch (e) {
    console.error("Failed to fetch pages", e);
    return [];
  }
};

export const getPages = unstable_cache(fetchPages, ["pages"], {
  revalidate: 1800,
});

export const getPage = unstable_cache(
  async (
    slug: string
  ): Promise<{ page: Page | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PAGES_DATABASE_ID;

    if (!databaseId) return { page: null, blocks: [] };

    try {
      let response;
      const filter = {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      };

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter,
        });
      }

      if (response.results.length === 0) return { page: null, blocks: [] };

      const pageData: any = response.results[0];

      // Status gate: only Published pages are accessible directly
      const status = getProperty(pageData, "Status", "select");
      if (status && status !== "Published") return { page: null, blocks: [] };

      const page: Page = {
        id: pageData.id,
        slug: getProperty(pageData, "Slug", "rich_text") || "",
        title: getProperty(pageData, "Title", "title") || "Untitled",
        lastEdited: pageData.last_edited_time,
        cover:
          pageData.cover?.external?.url ||
          pageData.cover?.file?.url ||
          undefined,
      };

      const blocks = await fetchPageBlocks(pageData.id);
      return { page, blocks };
    } catch (e) {
      console.error(`Failed to fetch page ${slug}`, e);
      return { page: null, blocks: [] };
    }
  },
  ["page"],
  { revalidate: 1800 }
);


// Uncached fetch function for products (nav items)
export const fetchNavProducts = async (): Promise<NavProduct[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_PRODUCTS_DATABASE_ID;

  if (!databaseId) return [];

  try {
    let response;
    const filter = {
      property: "Status",
      status: { equals: "Published" },
    };

    if (notion.dataSources) {
      response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter,
      });
    } else {
      response = await notion.databases.query({
        database_id: databaseId,
        filter,
      });
    }

    return response.results
      .map((page: any) => ({
        id: page.id,
        name:
          getProperty(page, "Title", "title") ||
          getProperty(page, "Name", "title") ||
          "Untitled",
        description: getProperty(page, "Description", "rich_text") || "",
        tagline: getProperty(page, "Tagline", "rich_text") || "",
        slug: getProperty(page, "Slug", "rich_text") || "",
        emoji:
          getProperty(page, "Emoji", "rich_text") || page.icon?.emoji || "",
        url: getProperty(page, "Link", "url") || "",
        status: getProperty(page, "Badge", "select") || "",
      }))
      .filter((p: NavProduct) => p.name && p.slug);
  } catch (e) {
    console.error("Failed to fetch products", e);
    return [];
  }
};

export const getNavProducts = unstable_cache(
  fetchNavProducts,
  ["nav-products"],
  { revalidate: 1800 }
);
