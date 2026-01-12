import { CustomLinkValidationResult } from "../../../types";

export type EditValidationByIndex = Record<number, CustomLinkValidationResult>;

export type UseLinksEditValidationArgs = {
  isEditing: boolean;
  initialLinks: readonly string[];
};

export type UseLinksEditValidationResult = {
  editValidationByIndex: EditValidationByIndex;
  handleValidateAtIndex: (idx: number, nextValue: string) => void;
};