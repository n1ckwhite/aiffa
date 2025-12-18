import { useAppColors } from "@/shared/theme/colors";

export type BlogWriteCtaSectionProps = {
    theme: ReturnType<typeof useAppColors>;
    cardRadius: string;
  
    writeCtaBorderColor: string;
    writeCtaBoxShadow: string;
    writeCtaBgGradient: string;
    writeCtaIconBg: string;
    writeCtaIconBorderColor: string;
  };