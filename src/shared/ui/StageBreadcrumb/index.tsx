import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import HorizontalScroll from 'shared/ui/HorizontalScroll';
import { useAppColors } from 'shared/theme/colors';
import { StageBreadcrumbProps } from './types';

const StageBreadcrumb: React.FC<StageBreadcrumbProps> = ({ moduleId, moduleTitle, lessonId, lessonTitle, current = 'lesson', rootCrumb, middleCrumb }) => {
  const theme = useAppColors();
  const crumbBg = theme.blue.chipBg;
  const crumbBorder = theme.blue.chipBorder;
  const breadcrumbColor = theme.blue.accent;

  return (
    <HorizontalScroll mb={4}>
      <HStack as="nav" color={breadcrumbColor} spacing={2} align="center" display="inline-flex">
        <Breadcrumb separator={<ChevronRightIcon boxSize={3.5} />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={rootCrumb?.to ?? `/learn/${moduleId}`}
              fontSize={{ base: 'sm', md: 'sm' }}
              textTransform="uppercase"
              letterSpacing="wider"
              fontWeight="semibold"
              px={{ base: 3, md: 3 }}
              py={{ base: 1.5, md: 1.5 }}
              borderRadius="full"
              bg={crumbBg}
              borderWidth="1px"
              borderColor={crumbBorder}
              whiteSpace="nowrap"
              display="inline-flex"
              alignItems="center"
              flexShrink={0}
              _hover={{ borderColor: 'transparent', boxShadow: 'none', textDecoration: 'none' }}
              _active={{ borderColor: 'transparent', boxShadow: 'none' }}
              _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
              _focusVisible={{ boxShadow: 'none', borderColor: 'transparent' }}
            >
              {rootCrumb?.label ?? moduleTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {middleCrumb && (
            <BreadcrumbItem>
              <BreadcrumbLink
                href={middleCrumb.to}
                fontSize="xs"
                color={breadcrumbColor}
                whiteSpace="nowrap"
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                {middleCrumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem isCurrentPage={current === 'lesson'}>
            {current === 'lesson' ? (
              <Text
                as="span"
                fontSize="xs"
                color={breadcrumbColor}
                whiteSpace="nowrap"
              >
                {lessonTitle}
              </Text>
            ) : (
              <BreadcrumbLink
                href={`/learn/${moduleId}/${lessonId}`}
                fontSize="xs"
                color={breadcrumbColor}
                whiteSpace="nowrap"
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                {lessonTitle}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {current === 'tasks' && (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink fontSize="xs" color={breadcrumbColor} whiteSpace="nowrap" _hover={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>Задачи</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </HStack>
    </HorizontalScroll>
  );
};

export default StageBreadcrumb;


