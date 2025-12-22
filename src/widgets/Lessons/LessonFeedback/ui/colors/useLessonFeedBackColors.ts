import { useAppColors } from "@/shared/theme/colors";
import { useColorModeValue } from "@chakra-ui/react";

export const useLessonFeedBackColors = () => {
    const theme = useAppColors();
    const cardBg = theme.cardBg;
    const cardShadow = useColorModeValue('0 10px 30px rgba(0,0,0,0.08)', '0 10px 30px rgba(0,0,0,0.5)');
    const border = theme.borderColor;
    const textCol = theme.titleColor;
    const chipBg = theme.controlsBg;
    const chipHover = theme.cardHoverBg;
    const upColor = 'green.500';
    const downColor = 'red.500';
    const thumbIdleColor = theme.descColor;
    const selectedThumbColor = useColorModeValue('gray.900', 'white');
    const thanksColor = 'green.600';

    return {
        cardBg: cardBg,
        cardShadow: cardShadow,
        border: border,
        textCol: textCol,
        chipBg: chipBg,
        chipHover: chipHover,
        upColor: upColor,
        downColor: downColor,
        thumbIdleColor: thumbIdleColor,
        selectedThumbColor: selectedThumbColor,
        thanksColor: thanksColor
    }
}


export default useLessonFeedBackColors;