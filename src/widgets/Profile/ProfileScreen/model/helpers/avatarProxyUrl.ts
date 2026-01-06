export const avatarProxyUrl = (rawUrl: string, size: number) => {
  const encoded = encodeURIComponent(rawUrl);
  return `/api/avatar?url=${encoded}&s=${size}`;
};


