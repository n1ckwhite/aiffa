import React from 'react';
import { Icon } from '@chakra-ui/react';
import type { CourseItem } from './types';
import { FaReact, FaNodeJs, FaNpm, FaAccessibleIcon, FaLightbulb, FaLaptopCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5 } from 'react-icons/si';
import { FiTerminal, FiCloud, FiBox } from 'react-icons/fi';

export const courses: CourseItem[] = [
  { id: 0, moduleId: 'bazovye-komandy', category: 'base', title: 'Базовые команды', description: 'Терминал, Git, npx и базовые инструменты', lessonsCount: 15, studyTime: '3–7 дней', level: 'Начальный',
    icon: (<Icon as={FiTerminal} boxSize="20px" />) },
  { id: 1, moduleId: 'html-css', category: 'frontend', title: 'HTML & CSS', description: 'Создание веб-страниц с красивым дизайном', lessonsCount: 47, studyTime: '2–4 недели', level: 'Начальный',
    icon: (<Icon as={SiHtml5} boxSize="20px" />)
  },
  { id: 2, moduleId: 'javascript', category: 'frontend', title: 'JavaScript', description: 'Изучение языка программирования JavaScript', lessonsCount: 92, studyTime: '5–8 недель', level: 'Начальный',
    icon: (<Icon as={SiJavascript} boxSize="20px" />) },
  { id: 3, moduleId: 'setevoe-vzaimodeistvie', category: 'frontend', title: 'Сетевое взаимодействие', description: 'Работа с API и веб-сетями', lessonsCount: 35, studyTime: '2–3 недели', level: 'Средний',
    icon: (<Icon as={FiCloud} boxSize="20px" />)
  },
  { id: 4, moduleId: 'fundamentalnye-navyki', category: 'base', title: 'Фундаментальные навыки', description: 'Основы алгоритмов и структур данных', lessonsCount: 11, studyTime: '3–5 недель', level: 'Средний',
    icon: (<Icon as={FaLightbulb} boxSize="20px" />)
  },
  { id: 5, moduleId: 'inzhenernaya-kultura', category: 'base', title: 'Инженерная культура', description: 'Принципы и практики современной разработки', lessonsCount: 19, studyTime: '1–2 недели', level: 'Средний',
    icon: (<Icon as={FaLaptopCode} boxSize="20px" />)
  },    
  { id: 6, moduleId: 'npm', category: 'devops', title: 'NPM', description: 'Управление пакетами и зависимостями', lessonsCount: 34, studyTime: '1 неделя', level: 'Средний',
    icon: (<Icon as={FaNpm} boxSize="20px" />)
    },
  { id: 7, moduleId: 'sborka-bundle', category: 'devops', title: 'Сборка bundle', description: 'Современные инструменты сборки проектов', lessonsCount: 14, studyTime: '2–3 недели', level: 'Средний',
    icon: (<Icon as={FiBox} boxSize="20px" />)
  },
  { id: 8, moduleId: 'react', category: 'frontend', title: 'React', description: 'Современная библиотека для создания пользовательских интерфейсов', lessonsCount: 19, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (<Icon as={FaReact} boxSize="20px" />) },
  { id: 9, moduleId: 'react-native', category: 'frontend', title: 'React Native', description: 'Разработка мобильных приложений на React', lessonsCount: 8, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (<Icon as={FaReact} boxSize="20px" />)
  },
  { id: 10, moduleId: 'nodejs', category: 'backend', title: 'Node.js', description: 'JavaScript на сервере', lessonsCount: 13, studyTime: '4–6 недель', level: 'Продвинутый',
    icon: (<Icon as={FaNodeJs} boxSize="20px" />)
  },
  { id: 11, moduleId: 'typescript', category: 'frontend', title: 'TypeScript', description: 'Типизированный JavaScript', lessonsCount: 8, studyTime: '2–4 недели', level: 'Продвинутый',
    icon: (<Icon as={SiTypescript} boxSize="20px" />)
  },
  { id: 12, moduleId: 'accessibility', category: 'frontend', title: 'Accessibility', description: 'Создание доступных веб-приложений', lessonsCount: 26, studyTime: '2–3 недели', level: 'Продвинутый',
    icon: (<Icon as={FaAccessibleIcon} boxSize="20px" />)
  }   
];


