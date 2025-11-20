import type { ComponentWithAs, IconProps } from '@chakra-ui/react';

export type FeatureItem = {
  icon: ComponentWithAs<'svg', IconProps>;
  title: string;
  description: string;
};


