import { TocItem } from "@/widgets/LessonPageView/types";
import { TocPanelColors } from "../../../types";

export type TocListProps = {
    tocItems: TocItem[];
    activeTocId: string | null;
    setActiveTocId: (id: string) => void;
    maxH: string;
    scrollSx: Record<string, unknown>;
    tocItemGap: number;
    colors: Pick<
      TocPanelColors,
      'tocItemRadius' | 'tocItemPxBase' | 'tocItemPxLg' | 'tocItemPyBase' | 'tocItemPyLg' | 'tocItemMinHBase' | 'tocItemMinHLg' | 'tocActiveBg' | 'tocInactiveColor' | 'linkColor'
    >;
  };