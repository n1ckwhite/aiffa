export const getAvatarFromGithub = (url?: string, fallbackUsername: string = 'octocat', size: number = 80) => {
    if (!url) return `https://avatars.githubusercontent.com/${fallbackUsername}?s=${size}`;
    try {
      const m = url.match(/github\.com\/(?:users\/)?([A-Za-z0-9-_.]+)/i);
      const username = m?.[1] || fallbackUsername;
      return `https://avatars.githubusercontent.com/${username}?s=${size}`;
    } catch {
      return `https://avatars.githubusercontent.com/${fallbackUsername}?s=${size}`;
    }
  };