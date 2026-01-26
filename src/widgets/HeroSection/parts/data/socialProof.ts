import { FiActivity, FiAward, FiMessageCircle, FiTarget, FiUsers } from "react-icons/fi";
import type { SocialProofItem } from "../types";

type MetricsInput = {
  participantsValue: string;
  participantsLabel: string;
  weeklyValue: string;
  weeklyLabel: string;
};

export const buildSocialProofItems = ({
  participantsValue,
  participantsLabel,
  weeklyValue,
  weeklyLabel,
}: MetricsInput): SocialProofItem[] => [
  { id: "participants", icon: FiUsers, value: participantsValue, label: participantsLabel },
  { id: "weekly", icon: FiTarget, value: weeklyValue, label: weeklyLabel },
  { id: "progress", icon: FiActivity, value: "Прогресс", label: "виден по действиям" },
  { id: "feedback", icon: FiMessageCircle, value: "Фидбек", label: "и разборы, когда застрял" },
  { id: "achievements", icon: FiAward, value: "XP", label: "и достижения растут вместе с тобой" },
];
