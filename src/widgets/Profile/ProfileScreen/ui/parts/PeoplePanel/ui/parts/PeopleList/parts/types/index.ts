import { FiUserMinus, FiUserPlus } from "react-icons/fi";

export type FollowUi = {
  ariaLabel: string;
  tooltip: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
};

export const getFollowUi = (isFollowing: boolean): FollowUi => {
  if (isFollowing) {
    return { ariaLabel: "Отписаться от пользователя", tooltip: "Отписаться", icon: FiUserMinus };
  }
  return { ariaLabel: "Подписаться на пользователя", tooltip: "Подписаться", icon: FiUserPlus };
};

