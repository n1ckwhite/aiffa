import { useColorModeValue } from '@chakra-ui/react';

export const useMobileMenuColors = () => {
    const bg = useColorModeValue('blue.900', 'blue.600');
    const hoverBg = useColorModeValue('blue.800', 'blue.500');
    return { bg, hoverBg};
};

