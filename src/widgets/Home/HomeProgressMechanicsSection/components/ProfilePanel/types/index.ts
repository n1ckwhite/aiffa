import type { ToneKey } from "../../../types";

export type ProfilePanelBullet = {
  id: string;
  title: string;
  text: string;
  tone: ToneKey;
};

export type ProfilePanelProps = {
  overline: string;
  title: string;
  description: string;
  bullets: ProfilePanelBullet[];
  titleColor: string;
  textColor: string;
  accentLabel: string;
  tone: Record<ToneKey, { bg: string; fg: string }>;
};
