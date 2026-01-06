import { useColorModeValue } from "@chakra-ui/react";

export const useSectionCardColors = () => {
    const glassBg = useColorModeValue("whiteAlpha.900", "blackAlpha.300");
    const glassBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
    const accent = useColorModeValue("blue.600", "blue.300");
    const headerIconBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
 
    return {
        glassBg,
        glassBorder,
        accent,
        headerIconBg,
    }
}