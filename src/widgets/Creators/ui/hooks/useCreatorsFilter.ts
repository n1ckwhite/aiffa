import React from "react";
import type { Creator, CreatorRoleGroup } from "../../model/types";

export type CreatorsRoleFilterValue = "all" | CreatorRoleGroup;

const ROLE_FILTERS: { value: CreatorsRoleFilterValue; label: string }[] = [
  { value: "all", label: "Все роли" },
  { value: "maintainers", label: "Мейнтейнеры" },
  { value: "materialsAuthors", label: "Авторы материалов" },
  { value: "weeklyAuthors", label: "Авторы задач недели" },
  { value: "mentorsReviewers", label: "Менторы и ревьюеры" },
  { value: "hackathonParticipants", label: "Участники хакатонов" },
  { value: "supporters", label: "Поддерживающие" },
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

