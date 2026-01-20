import { buildTopBefore } from "@/widgets/ModuleLessons/parts/ModuleLessonsView/parts/LessonsGrid/parts/ItemCard/helpers";
import { MaterialStatModePanelItem } from "../../../../../../model";
import { MaterialCardItemColors } from "../../../colors/useMaterialCardItemColors";

export type UseMaterialCardItemStatusArgs = {
    status?: MaterialStatModePanelItem["status"];
    colors: MaterialCardItemColors["colors"];
    levelAccent: string;
    statusBadgeColors: MaterialCardItemColors["statusBadgeColors"];
  };
  
  export type UseMaterialCardItemStatusResult = {
    isCompletedMaterial: boolean;
    isPending: boolean;
    isSuccess: boolean;
    showStatusBadge: boolean;
    statusLabel: string;
    statusBg: string;
    statusBorderColor: string;
    statusTextColor: string;
    statusBorder: string;
    statusBorderHover: string;
    topBefore: ReturnType<typeof buildTopBefore> | undefined;
  };