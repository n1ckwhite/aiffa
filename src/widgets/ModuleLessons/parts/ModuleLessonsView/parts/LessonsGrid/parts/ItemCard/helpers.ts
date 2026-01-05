import type { ItemCardProps } from "./types";
import { formatRuDate } from "shared/functions/formatRuDate";

export const getLessonDateLabel = (lesson: ItemCardProps["lesson"]) => {
  const iso =
    typeof lesson?.updatedAt === "string" && lesson.updatedAt.trim()
      ? lesson.updatedAt.trim()
      : typeof lesson?.createdAt === "string" && lesson.createdAt.trim()
        ? lesson.createdAt.trim()
        : undefined;
  return formatRuDate(iso);
};

export const buildTopBefore = (levelAccent: string) => ({
  content: '""',
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  height: "3px",
  bg: levelAccent,
  transform: "scaleX(0)",
  transformOrigin: "left",
  transition: "transform 0.3s ease-in-out",
});


