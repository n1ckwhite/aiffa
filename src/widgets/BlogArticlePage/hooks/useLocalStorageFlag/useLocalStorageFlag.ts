"use client";

import React from "react";
import { UseLocalStorageFlagResult } from "./types";

export const useLocalStorageFlag = (storageKey: string): UseLocalStorageFlagResult => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    try {
      setValue(window.localStorage.getItem(storageKey) === "1");
    } catch {
      setValue(false);
    }
  }, [storageKey]);

  const toggle = React.useCallback(() => {
    setValue((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, [storageKey]);

  return { value, toggle };
};


