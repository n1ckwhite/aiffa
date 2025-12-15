import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import FilterBar from "shared/ui/FilterBar";
import { useTimeRangeColors } from "./colors/useTimeRangeColors";
import { TIME_RANGE_ITEMS } from "./data/timeRangeItems";
import type { TimeRangeValue } from "./types";

const TimeRangeSection: React.FC = () => {
  const [activeRange, setActiveRange] = React.useState<TimeRangeValue>("month");
  const { descColor } = useTimeRangeColors();

  return (
    <Box as="section" aria-label="Таб-доска по времени">
      <VStack align="stretch" spacing={3}>
        <Heading as="h2" size="md" letterSpacing="-0.02em">
          Таб‑доска по времени
        </Heading>
        <Text fontSize="sm" color={descColor} lineHeight={1.8}>
          Это мягкий лидерборд: можно смотреть вклад за разные периоды без ощущения, что вы «позади навсегда». По умолчанию выбран месяц — он
          достаточно длинный, чтобы показать динамику, и при этом не давит, как «за всё время».
        </Text>
        <FilterBar<TimeRangeValue> activeValue={activeRange} items={TIME_RANGE_ITEMS} onChange={setActiveRange} ariaLabel="Фильтр по периоду времени" />
      </VStack>
    </Box>
  );
};

export default TimeRangeSection;


