import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { FiAward, FiBookOpen, FiCheckSquare, FiLayers, FiStar, FiTarget, FiUsers } from "react-icons/fi";
import type { CreatorCardMode } from "../types";

type MetaArgs = {
  lessons: number;
  weeklyTasks: number;
  projects: number;
  reviews: number;
  materialsIconColor: string;
  tasksIconColor: string;
  reviewsIconColor: string;
};

const renderProjectsMeta = (projects: number, reviews: number, materialsIconColor: string, reviewsIconColor: string) => (
  <>
    <HStack spacing={2}>
      <Icon as={FiLayers} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
      <Text as="span">
        Участвовал в{" "}
        <Text as="span" fontWeight="semibold">
          {projects} проектах
        </Text>
      </Text>
    </HStack>
    <HStack spacing={2}>
      <Icon as={FiStar} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
      <Text as="span">
        Получил{" "}
        <Text as="span" fontWeight="semibold">
          {reviews} звёзд на проектах
        </Text>
      </Text>
    </HStack>
  </>
);

const renderArticlesMeta = (projects: number, reviews: number, materialsIconColor: string, reviewsIconColor: string) => (
  <>
    <HStack spacing={2}>
      <Icon as={FiLayers} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
      <Text as="span">
        Написал{" "}
        <Text as="span" fontWeight="semibold">
          {projects} статей
        </Text>
      </Text>
    </HStack>
    <HStack spacing={2}>
      <Icon as={FiStar} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
      <Text as="span">
        Получил{" "}
        <Text as="span" fontWeight="semibold">
          {reviews} звёзд на статьях
        </Text>
      </Text>
    </HStack>
  </>
);

const renderHackathonsMeta = (projects: number, reviews: number, tasksIconColor: string, reviewsIconColor: string) => (
  <>
    <HStack spacing={2}>
      <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
      <Text as="span">
        Участвовал в{" "}
        <Text as="span" fontWeight="semibold">
          {projects} хакатонах и проектных спринтах
        </Text>
      </Text>
    </HStack>
    <HStack spacing={2}>
      <Icon as={FiAward} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
      <Text as="span">
        Брал призовые места в{" "}
        <Text as="span" fontWeight="semibold">
          {reviews} хакатонных форматах
        </Text>
      </Text>
    </HStack>
  </>
);

export const buildMetaByMode = ({
  lessons,
  weeklyTasks,
  projects,
  reviews,
  materialsIconColor,
  tasksIconColor,
  reviewsIconColor,
}: MetaArgs): Record<CreatorCardMode, React.ReactNode> => ({
  materials: (
    <>
      <HStack spacing={2}>
        <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
        <Text as="span">
          Поделился{" "}
          <Text as="span" fontWeight="semibold">
            {lessons} материалами
          </Text>
        </Text>
      </HStack>
      <HStack spacing={2}>
        <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
        <Text as="span">
          Придумал{" "}
          <Text as="span" fontWeight="semibold">
            {weeklyTasks} задач для материала
          </Text>
        </Text>
      </HStack>
      <HStack spacing={2}>
        <Icon as={FiUsers} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
        <Text as="span">
          Участвовал в{" "}
          <Text as="span" fontWeight="semibold">
            {reviews} коллаборациях
          </Text>
        </Text>
      </HStack>
    </>
  ),
  weekly: (
    <HStack spacing={2}>
      <Icon as={FiCheckSquare} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
      <Text as="span">
        Придумал{" "}
        <Text as="span" fontWeight="semibold">
          {weeklyTasks} задач недели
        </Text>
      </Text>
    </HStack>
  ),
  articles: renderArticlesMeta(projects, reviews, materialsIconColor, reviewsIconColor),
  projects: renderProjectsMeta(projects, reviews, materialsIconColor, reviewsIconColor),
  hackathons: renderHackathonsMeta(projects, reviews, tasksIconColor, reviewsIconColor),
});


