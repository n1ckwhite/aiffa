import type { CreatorCardMode } from "../../../types";

export type CreatorCardMetaProps = {
  metaByMode: Record<CreatorCardMode, React.ReactNode>;
  mode: CreatorCardMode;
  metaColor: string;
};


