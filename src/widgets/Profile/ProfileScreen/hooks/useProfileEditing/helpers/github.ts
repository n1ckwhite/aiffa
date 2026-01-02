import { extractGithubUsername } from "./normalize";
import { withGithubAvatarSize } from "@/shared/lib/github/withGithubAvatarSize";

export type GithubImportResult = {
  githubUrl: string;
  githubUsername: string;
  name: string;
  bio: string;
  avatarUrl: string;
};

export const importGithubProfile = async (rawUrl: string): Promise<GithubImportResult | null> => {
  const githubUrl = (rawUrl || '').trim();
  if (!githubUrl) return null;

  const githubUsername = extractGithubUsername(githubUrl);
  if (!githubUsername) return null;

  const res = await fetch(`https://api.github.com/users/${githubUsername}`);
  if (!res.ok) return null;

  const data = await res.json();
  return {
    githubUrl,
    githubUsername,
    name: (data?.name as string) || githubUsername,
    bio: (data?.bio as string) || '',
    // Prefer a stable URL where we can force size; GitHub API `avatar_url` defaults to 460px.
    avatarUrl:
      withGithubAvatarSize(`https://github.com/${githubUsername}.png`, 96) ||
      withGithubAvatarSize((data?.avatar_url as string) || "", 96) ||
      '',
  };
};

