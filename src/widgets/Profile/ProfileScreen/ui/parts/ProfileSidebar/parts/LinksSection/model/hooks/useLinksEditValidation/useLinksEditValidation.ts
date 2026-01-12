import React from "react";
import { validateCustomLinkValue } from "../../../../../../../../model/helpers";
import { EditValidationByIndex, UseLinksEditValidationArgs, UseLinksEditValidationResult } from "./types";

export const useLinksEditValidation = (args: UseLinksEditValidationArgs): UseLinksEditValidationResult => {
  const { isEditing, initialLinks } = args;
  const initialLinksKey = initialLinks.join("||");

  const [editValidationByIndex, setEditValidationByIndex] = React.useState<EditValidationByIndex>({});

  React.useEffect(() => {
    if (!isEditing) {
      setEditValidationByIndex({});
      return;
    }

    const next: EditValidationByIndex = {};
    for (let i = 0; i < initialLinks.length; i += 1) {
      next[i] = validateCustomLinkValue(initialLinks[i]);
    }
    setEditValidationByIndex(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialLinksKey]);

  const handleValidateAtIndex = React.useCallback((idx: number, nextValue: string) => {
    const next = validateCustomLinkValue(nextValue);
    setEditValidationByIndex((prev) => {
      const prevCode = prev[idx]?.error ?? null;
      const nextCode = next.error ?? null;
      if (prevCode === nextCode) return prev;
      return { ...prev, [idx]: next };
    });
  }, []);

  return { editValidationByIndex, handleValidateAtIndex };
};

