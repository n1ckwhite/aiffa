import type { IconType } from "react-icons";
import type { Creator } from "../../../../../model/types";

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


