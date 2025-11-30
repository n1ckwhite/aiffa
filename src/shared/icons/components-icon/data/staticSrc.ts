import type {
  RawIconModule,
  RawIconObject,
} from "@/shared/icons/components-icon/data/types/iconModule";

export const getStaticSrcFromModule = (iconModule: RawIconModule): string => {
  if (typeof iconModule === "string") {
    return iconModule;
  }

  if (iconModule && typeof (iconModule as RawIconObject).src === "string") {
    return (iconModule as RawIconObject).src as string;
  }

  if (iconModule && typeof (iconModule as RawIconObject).default === "string") {
    return (iconModule as RawIconObject).default as string;
  }

  return "";
};


