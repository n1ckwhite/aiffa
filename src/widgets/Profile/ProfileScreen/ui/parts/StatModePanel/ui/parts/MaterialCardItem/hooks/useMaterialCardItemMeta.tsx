"use client";

import React from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { formatRuDate } from "shared/functions/formatRuDate";
import { useLocalStorageFlag } from "shared/hooks/useLocalStorageFlag";
import { UseMaterialCardItemMetaArgs, UseMaterialCardItemMetaResult } from "./types";

export const useMaterialCardItemMeta = ({
  to,
  dateIso,
}: UseMaterialCardItemMetaArgs): UseMaterialCardItemMetaResult => {
  const dateLabel = formatRuDate(dateIso);
  const cardIndexLabel = <CheckIcon boxSize={3.5} />;

  const storageKey = React.useMemo(() => `material-starred:${to}`, [to]);
  const { value: isStarred } = useLocalStorageFlag(storageKey);

  return React.useMemo(
    () => ({
      dateLabel,
      cardIndexLabel,
      isStarred: Boolean(isStarred),
    }),
    [dateLabel, cardIndexLabel, isStarred],
  );
};

