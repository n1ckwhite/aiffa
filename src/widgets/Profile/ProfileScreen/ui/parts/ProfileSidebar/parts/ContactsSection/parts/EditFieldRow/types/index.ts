import type { ComponentType, KeyboardEvent } from "react";

export type EditFieldRowProps = {
  icon: ComponentType<any>;
  iconColor: string;
  id: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  ariaLabel: string;
  onKeyDownCapture: (e: KeyboardEvent) => void;
};


