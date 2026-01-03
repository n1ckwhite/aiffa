import { TocItem } from "@/widgets/LessonPageView/types";

export type TocPanelColors = {
  tocTitleColor: string;
  tocItemRadius: string;
  tocItemPxBase: number;
  tocItemPxLg: number;
  tocItemPyBase: number;
  tocItemPyLg: number;
  tocItemGap: number;
  tocItemMinHBase: string;
  tocItemMinHLg: string;
  tocActiveBg: string;
  tocInactiveColor: string;
  linkColor: string;
};

export type TocPanelProps = {
  tocItems: TocItem[];
  activeTocId: string | null;
  setActiveTocId: (id: string) => void;
  isReady: boolean;
  colors: TocPanelColors;
};


