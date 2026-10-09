import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getNotionClient, publishedImageIds } from "@/lib/notion";

const fetchImageUrl = unstable_cache(
  async (id: string, prop: string): Promise<string | null> => {
    const notion = getNotionClient();
    if (!notion) return null;

    if (prop === "block-image") {
      const block: any = await notion.blocks.retrieve({ block_id: id });
      if (block.type !== "image") return null;
      return block.image?.file?.url || block.image?.external?.url || null;
    }

    const page: any = await notion.pages.retrieve({ page_id: id });

    if (prop === "cover") {
      return (
        page.properties?.Banner?.files?.[0]?.file?.url ||
        page.properties?.Banner?.files?.[0]?.external?.url ||
        page.properties?.Cover?.files?.[0]?.file?.url ||
        page.properties?.Cover?.files?.[0]?.external?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        null
      );
    }

    if (prop === "avatar") {
      const files = page.properties?.["Author Avatar"]?.files;
      return files?.[0]?.file?.url || files?.[0]?.external?.url || null;
    }

    return null;
  },
  ["notion-image-url"],
  { revalidate: 1500 }
);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pageId = searchParams.get("pageId");
  const blockId = searchParams.get("blockId");
  const prop = searchParams.get("prop") || "cover";

  const id = pageId || blockId;
  if (!id)
    return new NextResponse("Missing pageId or blockId", { status: 400 });

  try {
    if (
      !(
        /^[a-fA-F0-9-]{32,36}$/.test(id) &&
        ["cover", "avatar", "block-image"].includes(prop)
      )
    )
      return new NextResponse("Image not found", { status: 404 });
    const published = await publishedImageIds();
    if (
      !(
        prop === "block-image" ? published.blockIds : published.pageIds
      ).includes(id)
    )
      return new NextResponse("Image not found", { status: 404 });
    const url = await fetchImageUrl(id, prop);
    if (!url) return new NextResponse("Image not found", { status: 404 });

    return NextResponse.redirect(url, {
      headers: {
        "Cache-Control": "public, max-age=1500, stale-while-revalidate=300",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch from Notion", { status: 500 });
  }
}
