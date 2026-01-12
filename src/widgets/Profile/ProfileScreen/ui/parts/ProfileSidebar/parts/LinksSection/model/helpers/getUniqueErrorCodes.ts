export const getUniqueErrorCodes = <TCode extends string>(codes: readonly TCode[]): TCode[] => {
  return Array.from(new Set(codes));
};

