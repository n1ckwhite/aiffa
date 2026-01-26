import React from "react";
import { HStack } from "@chakra-ui/react";
import MarqueeItem from "../MarqueeItem/MarqueeItem";
import { MarqueeRowProps } from "./types";

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, rowKey, colors }) => (
  <HStack key={rowKey} spacing={8} pr={8} flex="0 0 auto">
    {items.map((item) => (
      <MarqueeItem key={`${rowKey}-${item.id}`} item={item} colors={colors} />
    ))}
  </HStack>
);

export default MarqueeRow;
