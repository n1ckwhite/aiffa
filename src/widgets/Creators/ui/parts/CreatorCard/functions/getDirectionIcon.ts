import { FiCloud, FiCpu, FiLayers, FiMonitor, FiServer, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";

export const getDirectionIcon = (direction: string | null | undefined, fallback: IconType): IconType => {
  const key = (direction || "").toLowerCase();
  if (key.includes("front")) return FiMonitor;
  if (key.includes("back")) return FiServer;
  if (key.includes("machine") || key.includes("ml") || key.includes("data")) return FiCpu;
  if (key.includes("devops") || key.includes("infra")) return FiCloud;
  if (key.includes("fullstack")) return FiLayers;
  if (key.includes("community")) return FiUsers;
  return fallback;
};


