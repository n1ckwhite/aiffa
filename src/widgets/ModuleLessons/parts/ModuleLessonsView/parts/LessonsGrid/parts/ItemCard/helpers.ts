import type { ItemCardProps } from "./types";

export const formatRuDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return `${dd}.${mm}.${yyyy}`;
  }
};

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


