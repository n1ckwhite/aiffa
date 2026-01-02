/**
 * Normalizes GitHub avatar URLs to request a specific pixel size.
 *
 * Why: GitHub's `avatar_url` (from the API) defaults to 460×460 which is wasteful
 * for small UI avatars. Adding `s=<size>` makes GitHub return a smaller image.
 */

export const withGithubAvatarSize = (rawUrl?: string, size: number = 96) => {
  const urlString = (rawUrl || "").trim();
  if (!urlString) return undefined;

  // data:, blob:, relative paths etc — keep as-is.
  if (!/^https?:\/\//i.test(urlString)) return urlString;

  try {
    const url = new URL(urlString);

    // GitHub API avatar urls: https://avatars.githubusercontent.com/u/123?v=4
    if (url.hostname === "avatars.githubusercontent.com") {
      if (!url.searchParams.has("s")) url.searchParams.set("s", String(size));
      return url.toString();
    }

    // GitHub username png: https://github.com/<user>.png?size=96
    if (url.hostname === "github.com" && url.pathname.toLowerCase().endsWith(".png")) {
      url.searchParams.set("size", String(size));
      return url.toString();
    }

    return urlString;
  } catch {
    return urlString;
  }
};


