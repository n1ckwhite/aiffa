import { FiFileText, FiShield, FiUser, FiUserCheck } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Creator } from "../../../../model/types";

export const roleLabelMap: Record<Creator["role"], string> = {
  author: "Автор материалов",
  mentor: "Ментор",
  reviewer: "Ревьюер",
  maintainer: "Мейнтейнер",
};

export const roleIconMap: Record<Creator["role"], IconType> = {
  author: FiFileText,
  mentor: FiUser,
  reviewer: FiUserCheck,
  maintainer: FiShield,
};

export const roleColors: Record<Creator["role"], { light: string; dark: string }> = {
  author: { light: "orange.700", dark: "orange.300" },
  mentor: { light: "teal.700", dark: "teal.300" },
  reviewer: { light: "purple.700", dark: "purple.300" },
  maintainer: { light: "blue.700", dark: "blue.300" },
};


