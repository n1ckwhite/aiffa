import React from "react";
import { VStack } from "@chakra-ui/react";
import type { PeopleListProps } from "../types";
import { PeopleListRow } from "./PeopleListRow";

export const PeopleList: React.FC<PeopleListProps> = ({ items, isFollowingById, onToggleFollowById }) => {
  return (
    <VStack align="stretch" spacing={0}>
      {items.map((item) => (
        <PeopleListRow
          key={item.id}
          item={item}
          isFollowing={!!isFollowingById[item.id]}
          onToggleFollow={onToggleFollowById}
        />
      ))}
    </VStack>
  );
};


