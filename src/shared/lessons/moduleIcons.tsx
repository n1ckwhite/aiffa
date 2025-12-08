import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  FaReact,
  FaNodeJs,
  FaNpm,
  FaAccessibleIcon,
  FaLightbulb,
  FaLaptopCode,
} from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5 } from 'react-icons/si';
import { FiTerminal, FiCloud, FiBox } from 'react-icons/fi';

export const moduleIconById: Record<string, React.ReactNode> = {
  'bazovye-komandy': <Icon as={FiTerminal} boxSize="20px" />,
  'html-css': <Icon as={SiHtml5} boxSize="20px" />,
  javascript: <Icon as={SiJavascript} boxSize="20px" />,
  'setevoe-vzaimodeistvie': <Icon as={FiCloud} boxSize="20px" />,
  'fundamentalnye-navyki': <Icon as={FaLightbulb} boxSize="20px" />,
  'inzhenernaya-kultura': <Icon as={FaLaptopCode} boxSize="20px" />,
  npm: <Icon as={FaNpm} boxSize="20px" />,
  'sborka-bundle': <Icon as={FiBox} boxSize="20px" />,
  react: <Icon as={FaReact} boxSize="20px" />,
  'react-native': <Icon as={FaReact} boxSize="20px" />,
  nodejs: <Icon as={FaNodeJs} boxSize="20px" />,
  typescript: <Icon as={SiTypescript} boxSize="20px" />,
  accessibility: <Icon as={FaAccessibleIcon} boxSize="20px" />,
};


