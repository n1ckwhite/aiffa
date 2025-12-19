import { extractGithubUsername } from "./normalize";

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
    avatarUrl: (data?.avatar_url as string) || '',
  };
};

