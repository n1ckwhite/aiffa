import type { BoxProps } from "@chakra-ui/react";

export const useMergedBoxProps: (boxProps?: BoxProps) => BoxProps = (
  boxProps
) => {
  if (!boxProps) {
    return {
      position: "relative",
      overflow: "hidden",
    };
  }

  return {
    position: boxProps.position ?? "relative",
    overflow: boxProps.overflow ?? "hidden",
    ...boxProps,
  };
};


