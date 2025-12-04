import React from "react";
import type { Metadata } from "next";
import SessionsPageClient from "./SessionsPageClient";

export const metadata: Metadata = {
  title: "Сессии AIFFA — встречи, консультации и разборы проектов",
  description:
    "Сессии AIFFA: встречи, консультации, Q&A, AMA, разборы проектов, networking и офлайн‑митапы. Живые форматы, где можно задать вопросы, получить обратную связь и познакомиться с комьюнити.",
  alternates: {
    canonical: "/sessions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SessionsPage: React.FC = () => {
  return <SessionsPageClient />;
};

export default SessionsPage;


