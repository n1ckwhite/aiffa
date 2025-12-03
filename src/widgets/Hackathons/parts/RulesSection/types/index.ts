export type RuleCardId = "deadlines" | "format" | "code" | "limits";

export type RuleCard = {
  id: RuleCardId;
  title: string;
  description: string;
};


