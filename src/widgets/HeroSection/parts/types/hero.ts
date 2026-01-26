export type HeroAction = {
  id: string;
  label: string;
  to: string;
  ariaLabel: string;
  kind: "primary" | "secondary";
};
