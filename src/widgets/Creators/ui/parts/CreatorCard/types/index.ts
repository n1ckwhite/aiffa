import type { Creator } from "../../../../model/types";

export type CreatorCardMode = "materials" | "weekly" | "articles" | "projects" | "hackathons";

export type CreatorCardProps = {
  creator: Creator;
  index: number;
  mode?: CreatorCardMode;
  showRank?: boolean;
};


