import type { TocItem } from '../../../../types';

export type TocPanelProps = {
  tocItems: TocItem[];
  activeTocId: string | null;
  setActiveTocId: (id: string) => void;
  colors: {
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
};


