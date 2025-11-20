import { 
  StarIcon, 
  SettingsIcon, 
  TimeIcon, 
  ChatIcon,
  UnlockIcon,
  LinkIcon
} from '@chakra-ui/icons';
import type { Highlight } from '../types';

export const highlights: Highlight[] = [
  { label: 'Полностью бесплатно', icon: UnlockIcon },
  { label: 'Без ограничений', icon: TimeIcon },
  { label: 'Открытый код и материалы', icon: StarIcon },
  { label: 'Хакатоны и проекты', icon: SettingsIcon },
  { label: 'Сообщество и менторство', icon: ChatIcon },
  { label: 'GitHub‑профили и вклад', icon: LinkIcon },
];



