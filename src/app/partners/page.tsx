import React from "react";
import type { Metadata } from "next";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = {
  title: "Партнёрство и спонсорство AIFFA — форматы для брендов",
  description:
    "Коммерческое партнёрство с AIFFA: платные интеграции, Weekly‑задачи, хакатоны и образовательные форматы под задачи вашего бренда. Работаем с компаниями, которым важно взаимодействовать с разработчиками.",
  alternates: {
    canonical: "/partners",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PartnersPage = () => {
  return <PartnersPageClient />;
};

export default PartnersPage;
