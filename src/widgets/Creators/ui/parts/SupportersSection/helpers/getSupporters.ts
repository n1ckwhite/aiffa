import { Creator } from "@/widgets/Creators/model/types";

export const getSupporters = (items: Creator[] = []) => items.filter((creator) => creator.areas?.includes("support"));


