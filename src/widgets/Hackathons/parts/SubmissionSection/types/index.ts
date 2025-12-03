export type SubmissionCardId = "requirements" | "github" | "readme" | "demo";

export type SubmissionCard = {
  id: SubmissionCardId;
  title: string;
  description: string;
};


