import { Creator } from "@/widgets/Creators/model/types";

export type SupporterAvatar = {
  id: string;
  name: string;
  profileHref: string;
  avatarSrc?: string;
};

export type SupportersFilter = (items: Creator[]) => Creator[];


