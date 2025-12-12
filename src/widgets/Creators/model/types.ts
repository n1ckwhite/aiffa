export type CreatorRole = "author" | "mentor" | "reviewer" | "maintainer";

export type CreatorContributionArea =
  | "materials"
  | "weekly"
  | "projects"
  | "hackathons"
  | "articles"
  | "support";

export type CreatorRoleGroup =
  | "maintainers"
  | "materialsAuthors"
  | "weeklyAuthors"
  | "mentorsReviewers"
  | "hackathonParticipants"
  | "supporters";

export type CreatorBadge = {
  id: string;
  label: string;
};

export type CreatorProfileLink = {
  type: "telegram" | "github" | "x" | "website";
  label: string;
  href: string;
};

export type Creator = {
  id: string;
  name: string;
  role: CreatorRole;
  avatar?: string;
  title: string;
  direction: string;
  contributions: {
    lessons: number;
    weeklyTasks: number;
    projects: number;
    reviews: number;
  };
  areas: CreatorContributionArea[];
  roleGroups: CreatorRoleGroup[];
  profileLinks: CreatorProfileLink[];
};


