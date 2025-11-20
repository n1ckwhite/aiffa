import type { UseToastOptions } from '@chakra-ui/react';
import { copyTextToClipboard } from '../clipboard';
import type { DonateOptions } from './types';

export async function handleDonate(options: DonateOptions): Promise<void> {
  const {
    toast,
    closeAllToasts,
    cardNumber = '2200 1545 4739 2810',
    cardHolderName = 'NIKITA KHIRYANOV',
    bankName = 'Альфа-Банк',
    successDescription = 'Спасибо за поддержку! ❤️ Ваша помощь усиливает сообщество и ускоряет появление новых материалов. Пожалуйста, укажите свой GitHub в комментарии к переводу — так мы сможем отметить ваш вклад.',
    infoTitle = 'Реквизиты',
  } = options;

  try {
    const copied = await copyTextToClipboard(cardNumber);
    if (closeAllToasts) closeAllToasts();
    const details = `${cardNumber} · ${cardHolderName} · ${bankName}`;
    toast({
      id: 'donate-toast',
      title: copied ? 'Реквизиты скопированы' : infoTitle,
      description: copied
        ? (successDescription ? `${successDescription}\n${details}` : details)
        : `${details} — нажмите и удерживайте, чтобы скопировать`,
      status: copied ? 'success' : 'info',
      duration: copied ? 6000 : 6000,
      isClosable: true,
      position: 'top',
    } as UseToastOptions);
  } catch {
    if (closeAllToasts) closeAllToasts();
    const details = `${cardNumber} · ${cardHolderName} · ${bankName}`;
    toast({
      id: 'donate-toast',
      title: infoTitle,
      description: `${details} — нажмите и удерживайте, чтобы скопировать`,
      status: 'info',
      duration: 6000,
      isClosable: true,
      position: 'top',
    } as UseToastOptions);
  }
}


