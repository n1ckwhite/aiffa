import { MaterialCardItemColors } from "../../../colors/useMaterialCardItemColors";

export type UseMaterialCardItemLevelArgs = {
    level?: "beginner" | "middle" | "advanced";
    getLevelAccent: MaterialCardItemColors["getLevelAccent"];
    getLevelScheme: MaterialCardItemColors["getLevelScheme"];
  };
  
  export type UseMaterialCardItemLevelResult = {
    levelLabel: string;
    levelScheme: ReturnType<MaterialCardItemColors["getLevelScheme"]>;
    levelAccent: string;
  };