"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { weeklyTasksMock } from "../../data";
import { STAT_MODE_PANELS_BY_MODE } from "../../data/statModePanels";
import { AchievementsPanel, PeoplePanel, StatModePanel } from "..";
import { StatsModeColumn } from "../StatsModeColumn/StatsModeColumn";
import { ProfileRightColumnProps } from "./types";

export const ProfileRightColumn: React.FC<ProfileRightColumnProps> = ({ mode, achievementItems }) => {
  if (mode === "stats") return <StatsModeColumn />;

  if (mode === "followers") {
    return (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <PeoplePanel mode="followers" />
      </VStack>
    );
  }

  if (mode === "following") {
    return (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <PeoplePanel mode="following" />
      </VStack>
    );
  }

  if (mode === "achievements") {
    return (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <AchievementsPanel items={achievementItems as any} />
      </VStack>
    );
  }

  if (mode === "weekly") {
    return (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Задачи недели"
          description="Список решённых задач недели."
          icon={FiCheckCircle}
          pagination={{ pageSize: 3, ariaLabel: "Пагинация задач недели" }}
          items={weeklyTasksMock}
        />
      </VStack>
    );
  }

  const config = STAT_MODE_PANELS_BY_MODE[mode];
  if (!config) return <StatsModeColumn />;

  return (
    <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
      <StatModePanel title={config.title} description={config.description} icon={config.icon} items={config.items} />
    </VStack>
  );
};

