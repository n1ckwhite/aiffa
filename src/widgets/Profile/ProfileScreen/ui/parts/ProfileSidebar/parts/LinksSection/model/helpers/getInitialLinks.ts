export type InitialLinksTuple = [string, string, string, string];

export const getInitialLinks = (editInitial: { links: InitialLinksTuple } | null): InitialLinksTuple => {
  if (editInitial) return editInitial.links;
  return ["", "", "", ""];
};

