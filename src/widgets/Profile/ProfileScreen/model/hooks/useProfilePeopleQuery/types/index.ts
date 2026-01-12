import { ProfilePeopleMode } from "../../../types";

export type QueryEntry = readonly [key: string, value: string | null];

export type UseProfilePeopleQueryResult = {
  mode: ProfilePeopleMode;
  setMode: (next: ProfilePeopleMode) => void;
};