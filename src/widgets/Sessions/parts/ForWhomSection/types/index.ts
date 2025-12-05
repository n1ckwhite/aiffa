export type SessionsForWhomCardId = "start-it" | "own-project" | "people-teams";

export type SessionsForWhomCard = {
  id: SessionsForWhomCardId;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
};


