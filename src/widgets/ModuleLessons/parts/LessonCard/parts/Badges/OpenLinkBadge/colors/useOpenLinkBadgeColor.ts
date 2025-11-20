import { useColorModeValue } from "@chakra-ui/react";


export const useOpenLinkBadgeColors = () => {
const pillBg = useColorModeValue('blue.50', 'whiteAlpha.100');
    return {
        pillBg,
    }
}
