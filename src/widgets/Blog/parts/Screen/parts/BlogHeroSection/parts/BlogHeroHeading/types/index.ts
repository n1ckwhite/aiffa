import { useAppColors } from "@/shared/theme/colors";

export type BlogHeroHeadingProps = {
    theme: ReturnType<typeof useAppColors>;
    isEmptyResults: boolean;
  };