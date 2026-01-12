import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";
import { peopleMockCountByMode } from "../../../../../PeoplePanel/data/peopleMockByMode";

export const getCountToShow = (args: { mode: Exclude<ProfilePeopleMode, "stats">; count: number }): number => {
  const { mode, count } = args;
  let next = count;
  const mock = peopleMockCountByMode[mode];
  if (mock > next) next = mock;
  return next;
};

