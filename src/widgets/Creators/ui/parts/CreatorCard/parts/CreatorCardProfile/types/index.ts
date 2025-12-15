import type { IconType } from "react-icons";
import { Creator } from "@/widgets/Creators/model/types";

export type CreatorCardProfileProps = {
  name: string;
  avatar?: string;
  avatarBg: string;
  primaryTextColor: string;
  roleBorder: string;
  roleBg: string;
  roleColor: string;
  DirectionIcon: IconType;
  role: Creator["role"];
  direction: string;
};


