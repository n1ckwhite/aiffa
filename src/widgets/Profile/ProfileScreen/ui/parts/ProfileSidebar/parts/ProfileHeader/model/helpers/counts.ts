import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";
import { peopleMockCountByMode } from "../../../../../PeoplePanel/data/peopleMockByMode";

type CountMode = Extract<ProfilePeopleMode, "followers" | "following">;

export const getCountToShow = (args: { mode: CountMode; count: number }): number => {
  const { mode, count } = args;
  let next = count;
  const mock = peopleMockCountByMode[mode] ?? 0;
  if (mock > next) next = mock;
  return next;
};

