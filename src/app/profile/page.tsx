import React from "react";
import type { Metadata } from "next";
import ProfilePageClient from "./ProfilePageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Профиль — AIFFA",
  description: "Ваш прогресс и достижения в рамках AIFFA",
  alternates: {
    canonical: `${SITE_URL}/profile`,
  },
};

const ProfileRoute = () => {
  return <ProfilePageClient />;
};

export default ProfileRoute;



