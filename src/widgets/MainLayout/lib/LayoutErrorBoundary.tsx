import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ErrorRobotLottieIcon } from '@/shared/icons/components-icon';

export class LayoutErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box as="main" p={8} textAlign="center">
          <ErrorRobotLottieIcon />
          <Text fontWeight="semibold">Произошла ошибка при загрузке страницы</Text>
          <Text mt={2} color="gray.500">Попробуйте обновить страницу.</Text>
        </Box>
      );
    }
    return this.props.children as React.ReactElement;
  }
}



