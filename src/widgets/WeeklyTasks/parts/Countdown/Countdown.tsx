import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Label, Time } from './parts';
import { WeeklyTasksCountdownProps } from './types';
import { useCountdownColors } from './colors/useCountdownColors';
import { useWeeklyResetCountdown } from './hooks/useWeeklyResetCountdown';

const Countdown: React.FC<WeeklyTasksCountdownProps> = () => {
  const { labelColor, borderColor, textColor } = useCountdownColors();
  const { days, hours, minutes, seconds } = useWeeklyResetCountdown();

  return (
      
      <HStack spacing={3} wrap="wrap" justify="center" mb={4}>
      <Label color={labelColor} />
      <Time borderColor={borderColor} textColor={textColor} d={days} h={hours} m={minutes} s={seconds} />
    </HStack>
  );
};

export default Countdown;


