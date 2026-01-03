import { TocItem } from "@/widgets/LessonPageView/types";
import { TocPanelColors } from "../../../types";

export type TocListItemProps = {
    item: TocItem;
    isActive: boolean;
    setActiveTocId: (id: string) => void;
    colors: Pick<
      TocPanelColors,
      'tocItemRadius' | 'tocItemPxBase' | 'tocItemPxLg' | 'tocItemPyBase' | 'tocItemPyLg' | 'tocItemMinHBase' | 'tocItemMinHLg' | 'tocActiveBg' | 'tocInactiveColor' | 'linkColor'
    >;
  };