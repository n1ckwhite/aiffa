"use client";

import React from "react";

export type UseLocalStorageFlagResult = {
  value: boolean;
  set: (next: boolean) => void;
  toggle: () => void;
};

export const useLocalStorageFlag = (storageKey: string): UseLocalStorageFlagResult => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    try {
      setValue(window.localStorage.getItem(storageKey) === "1");
    } catch {
      setValue(false);
    }
  }, [storageKey]);

  const set = React.useCallback(
    (next: boolean) => {
      setValue(() => {
        try {
          window.localStorage.setItem(storageKey, next ? "1" : "0");
        } catch(error) {
          console.error(error);
        }
        return next;
      });
    },
    [storageKey],
  );

  const toggle = React.useCallback(() => {
    setValue((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(storageKey, next ? "1" : "0");
      } catch(error) {
        console.error(error);
      }
      return next;
    });
  }, [storageKey]);

  return { value, set, toggle };
};


