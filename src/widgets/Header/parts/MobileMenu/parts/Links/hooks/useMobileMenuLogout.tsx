"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "entities/user";

export type UseMobileMenuLogoutArgs = {
  onClose: () => void;
};

export const useMobileMenuLogout = ({ onClose }: UseMobileMenuLogoutArgs) => {
  const router = useRouter();
  const { resetProfile } = useUserProfile();

  return React.useCallback(() => {
    onClose();
    resetProfile();
    router.push("/");
  }, [onClose, resetProfile, router]);
};
