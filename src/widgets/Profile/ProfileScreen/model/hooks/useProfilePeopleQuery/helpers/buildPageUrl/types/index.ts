import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export type BuildPageUrlArgs = {
    pathname: string;
    searchParams: ReadonlyURLSearchParams;
    nextMode: ProfilePeopleMode;
  }