import { useEffect, useRef, useState } from "react";
import type {
  UseLottieVisibilityParams,
  UseLottieVisibilityResult,
} from "../types/lazyLottieIcon";

export const useLottieVisibility: (
  params: UseLottieVisibilityParams
) => UseLottieVisibilityResult = ({ autoplay }) => {
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [isLottieReady, setIsLottieReady] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const fallbackTimeoutId = window.setTimeout(() => {
      setIsLottieVisible((previousValue) => previousValue || true);
    }, 800);

    return () => window.clearTimeout(fallbackTimeoutId);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    if (!isLottieVisible || !isLottieReady || !lottieRef.current) return;

    lottieRef.current.goToAndStop(0, true);
    lottieRef.current.play();
  }, [autoplay, isLottieVisible, isLottieReady]);

  const handleLottieDomLoaded = () => {
    setIsLottieReady(true);
    setIsLottieVisible(true);
  };

  return {
    isLottieVisible,
    handleLottieDomLoaded,
    lottieRef,
  };
};


