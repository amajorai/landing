import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Build your next app in 10 days";
    const subtitle =
      searchParams.get("subtitle") ||
      "consulting · design · development · hosting";
    const tagline =
      searchParams.get("tagline") ||
      "10+ years of experience creating tomorrow's technology";

    // Load the font
    const geistSans = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;600;700&display=swap",
        request.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage: "linear-gradient(to bottom right, white, #f5f5f5)",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Border */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50px",
            right: "50px",
            bottom: "50px",
            border: "2px solid #eaeaea",
            borderRadius: "20px",
            zIndex: 1,
          }}
        />

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: "150px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#f8f8f8",
            border: "1px solid #eaeaea",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "150px",
            right: "150px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "#f8f8f8",
            border: "1px solid #eaeaea",
            zIndex: 0,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              color: "#666",
              marginRight: "8px",
            }}
          >
            base
          </span>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "black",
              margin: "0",
              textAlign: "center",
              lineHeight: "1.1",
              marginBottom: "20px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#666",
              margin: "0",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {subtitle}
          </p>

          <p
            style={{
              fontSize: "24px",
              color: "#888",
              margin: "0",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            {tagline}
          </p>

          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "black",
              margin: "0",
            }}
          >
            base7.com
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist Sans",
            data: geistSans,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
