export type GitHubConnectProps = {
  value: string;
  onChange: (v: string) => void;
  onImport: () => void;
  isImporting: boolean;
  profileName: string;
  avatarUrl?: string;
  currentGithubUrl?: string;
  parseUsername: (url?: string) => string;
  dividerColor: string;
  hintColor: string;
};


