import { StatModePanelItem } from "../../../model";

export type CardVariant = "weekly" | "material" | "project" | "hackathon" | "session" | "article" | "plain";

export type RenderStatModePanelItemProps = {
    item: StatModePanelItem;
    titleDomId: string;
    mutedColor: string;
    cardBorder: string;
    listIndex: number;
  };