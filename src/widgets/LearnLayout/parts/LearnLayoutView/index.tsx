import {useLayoutEffect} from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useOpenModuleId } from '../../hooks/useOpenModuleId';

export const LearnLayoutView: React.FC = () => {
  useOpenModuleId();

  useLayoutEffect(() => {
    try {
      (window.history).scrollRestoration = 'auto';
    } catch (error) {
      console.error('Failed to restore scroll:', error);
    }
  }, []);

  return (
    <Box
      position="relative"
      w="100%"
      sx={{
        minHeight: "100vh",
        "@supports (height: 100dvh)": {
          minHeight: "100dvh",
        },
      }}
    >
      <Flex w="100%" px={{ base: 4, md: 6 }} gap={{ base: 4, md: 8 }} pt={{ base: 8, md: 10 }} pb={{ base: 0, md: 0 }} align="flex-start" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Box flex="1 1 auto" minW={0}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};


