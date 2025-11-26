import React from "react";
import type { Metadata } from "next";
import ProfilePageClient from "./ProfilePageClient";

export const metadata: Metadata = {
  title: "Профиль — AIFFA",
  description: "Ваш прогресс и достижения в рамках AIFFA"
};

const ProfileRoute = () => {
  return <ProfilePageClient />;
};

export default ProfileRoute;



