import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProfilePeopleMode } from "../../types";
import { UseProfilePeopleQueryResult } from "./types";
import { buildPeopleUrl, getPeopleMode } from "./helpers";

export const useProfilePeopleQuery = (): UseProfilePeopleQueryResult => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mode = React.useMemo<ProfilePeopleMode>(() => {
    return getPeopleMode(searchParams);
  }, [searchParams]);

  const setMode = React.useCallback(
    (next: ProfilePeopleMode) => {
      const nextUrl = buildPeopleUrl({ pathname, searchParams, nextMode: next });
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { mode, setMode };
};


