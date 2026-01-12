export type PeoplePanelMode = "followers" | "following";

export type PeopleListItem = {
  id: string;
  name: string;
  username: string;
  description?: string;
  avatarUrl?: string;
  badge?: {
    label: string;
    colorScheme: string;
  };
  initialIsFollowing?: boolean;
};

export type PeoplePanelProps = {
  mode: PeoplePanelMode;
};


