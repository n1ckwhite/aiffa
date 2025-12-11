import React from "react";
import type { Metadata } from "next";
import CreatorsPageClient from "./CreatorsPageClient";

export const metadata: Metadata = {
  title: "Создатели AIFFA — люди, которые делают платформу",
  description:
    "Авторы материалов, кураторы Weekly‑задач, ревьюеры и мейнтейнеры, которые развивают AIFFA. Узнайте, кто стоит за платформой и как стать частью команды создателей.",
  alternates: {
    canonical: "/creators",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const CreatorsPage = () => {
  return <CreatorsPageClient />;
};

export default CreatorsPage;


