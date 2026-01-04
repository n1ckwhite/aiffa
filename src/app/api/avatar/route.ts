import { withGithubAvatarSize } from "@/shared/lib/github/withGithubAvatarSize";

const MAX_SIZE = 512;
const DEFAULT_SIZE = 208;
const ALLOWED_HOSTS = new Set(["avatars.githubusercontent.com", "github.com"]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUrl = String(searchParams.get("url") ?? "").trim();
    const sizeParam = Number(searchParams.get("s") ?? DEFAULT_SIZE);
    const size = Number.isFinite(sizeParam) ? Math.min(Math.max(Math.trunc(sizeParam), 16), MAX_SIZE) : DEFAULT_SIZE;

    if (!rawUrl) {
      return new Response("Missing `url`", { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(rawUrl);
    } catch {
      return new Response("Invalid `url`", { status: 400 });
    }

    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      return new Response("Host not allowed", { status: 400 });
    }

    const sizedUrl = withGithubAvatarSize(parsed.toString(), size);
    if (!sizedUrl) {
      return new Response("Invalid `url`", { status: 400 });
    }

    const upstream = await fetch(sizedUrl, {
      // Let Next cache this fetch on the server as well.
      next: { revalidate: 60 * 60 * 24 * 30 }, // 30 days
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Upstream error", { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/png";

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Make Lighthouse happy: long-lived caching for the avatar proxy.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Server error", { status: 500 });
  }
}


