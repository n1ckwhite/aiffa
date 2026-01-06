import type { ComponentType, KeyboardEvent } from "react";
import type { EditFieldRowProps } from "../parts/EditFieldRow/types";

export type ContactsSectionProps = {
  isEditing: boolean;
  workplace: string;
  locationLabel: string;
  emailValue: string;

  editInitial: { workplace: string; location: string } | null;
  handleStopHotkeys: (e: KeyboardEvent) => void;
};

export type FieldKey = "workplace" | "location";
export type FieldDef = {
  key: FieldKey;
  icon: ComponentType<any>;
  iconColor: string;
  viewValue: string;
  edit: Omit<EditFieldRowProps, "icon" | "iconColor" | "onKeyDownCapture">;
};