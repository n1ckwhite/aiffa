import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Материалы для собеседований",
  description:
    "Материалы по фронтенду для подготовки к собеседованиям: ключевые темы, краткие конспекты и удобная структура.",
};

const HomePage = () => {
  return <HomePageClient />;
};

export default HomePage;



