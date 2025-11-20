import type { UseToastOptions } from '@chakra-ui/react';

export interface DonateOptions {
  toast: (options: UseToastOptions) => void;
  closeAllToasts?: () => void;
  cardNumber?: string;
  cardHolderName?: string;
  bankName?: string;
  successDescription?: string;
  infoTitle?: string;
}


