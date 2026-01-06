"use client";

import React from "react";

export type UseLocalStorageFlagResult = {
  value: boolean;
  set: (next: boolean) => void;
  toggle: () => void;
};

export const useLocalStorageFlag = (
  storageKey: string,
  defaultValue: boolean = false,
): UseLocalStorageFlagResult => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw == null) {
        setValue(defaultValue);
        return;
      }
      setValue(raw === "1");
    } catch {
      setValue(defaultValue);
    }
  }, [defaultValue, storageKey]);

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


