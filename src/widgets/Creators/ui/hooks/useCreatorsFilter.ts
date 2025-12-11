import React from "react";
import type { IconType } from "react-icons";
import { FiShield, FiFileText, FiTarget, FiUserCheck, FiUsers, FiHeart } from "react-icons/fi";
import type { Creator, CreatorRoleGroup } from "../../model/types";

export type CreatorsRoleFilterValue = "all" | CreatorRoleGroup;

type RoleFilterItem = {
  value: CreatorsRoleFilterValue;
  label: string;
  icon?: IconType;
  accentColor?: string;
};

const ROLE_FILTERS: RoleFilterItem[] = [
  { value: "all", label: "Все роли" },
  { value: "maintainers", label: "Мейнтейнеры", icon: FiShield, accentColor: "#2563EB" },
  { value: "materialsAuthors", label: "Авторы материалов", icon: FiFileText, accentColor: "#EA580C" },
  { value: "weeklyAuthors", label: "Авторы задач недели", icon: FiTarget, accentColor: "#7C3AED" },
  { value: "mentorsReviewers", label: "Менторы и ревьюеры", icon: FiUserCheck, accentColor: "#0D9488" },
  { value: "hackathonParticipants", label: "Участники хакатонов", icon: FiUsers, accentColor: "#F97316" },
  { value: "supporters", label: "Поддерживающие", icon: FiHeart, accentColor: "#E11D48" },
];

export const useCreatorsFilter = (items: Creator[]) => {
  const [roleFilter, setRoleFilter] = React.useState<CreatorsRoleFilterValue>("all");

  const filteredItems = React.useMemo(() => {
    return items.filter((creator) => {
      const byRole =
        roleFilter === "all" || creator.roleGroups?.includes(roleFilter as CreatorRoleGroup);
      return byRole;
    });
  }, [items, roleFilter]);

  return {
    roleFilter,
    setRoleFilter,
    filteredItems,
    roleFilters: ROLE_FILTERS,
  };
};

