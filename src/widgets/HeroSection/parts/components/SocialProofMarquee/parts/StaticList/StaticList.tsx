import React from "react";
import { HStack } from "@chakra-ui/react";
import MarqueeItem from "../MarqueeItem/MarqueeItem";
import { StaticListProps } from "./types";

const StaticList: React.FC<StaticListProps> = ({ items, colors }) => (
  <HStack spacing={{ base: 2, md: 3 }} flexWrap="wrap" justify="center" pt={1}>
    {items.map((item) => (
      <MarqueeItem key={item.id} item={item} colors={colors} />
    ))}
  </HStack>
);

export default StaticList;
