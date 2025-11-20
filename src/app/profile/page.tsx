import React from "react";
import type { Metadata } from "next";
import ProfilePageClient from "./ProfilePageClient";

export const metadata: Metadata = {
  title: "Профиль — JavaScript Universe",
  description: "Ваш прогресс и достижения в курсе JavaScript Universe"
};

const ProfileRoute = () => {
  return <ProfilePageClient />;
};

export default ProfileRoute;



