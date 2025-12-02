import React from "react";
import type { Metadata } from "next";
import HackathonsPageClient from "./HackathonsPageClient";

export const metadata: Metadata = {
  title: "Хакатоны AIFFA — практические командные форматы",
  description:
    "Онлайн‑ и офлайн‑хакатоны AIFFA: реальные продуктовые задачи, командная работа, менторы и разборы решений. Формат, в котором вы прокачиваете навыки и собираете портфолио за несколько дней.",
  alternates: {
    canonical: "/hackathons",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const HackathonsPage: React.FC = () => {
  return <HackathonsPageClient />;
};

export default HackathonsPage;


