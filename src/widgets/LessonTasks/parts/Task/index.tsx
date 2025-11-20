import React from 'react';
import { Box, Button, Checkbox, HStack, Input, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import type { TaskRendererProps } from './types';
import { TaskMeta } from './parts/TaskMeta';
import { TaskHint } from './parts/TaskHint';
import { useTaskColors } from './colors/useTaskColors';
import { useTaskRenderer } from './hooks/useTaskRenderer';

export const TaskRenderer: React.FC<TaskRendererProps> = ({ task, descColor, onSolvedChange, onValidated }) => {
  const { terminalBg, terminalPlaceholder } = useTaskColors();
  const {
    value,
    checked,
    ok,
    wrongAnimKey,
    handleValueChange,
    handleCheckboxToggle,
    handleValidateTerminal,
    handleValidateMcq,
    handleValidateCheckbox,
    handleValidateText,
    handleInputKeyDown,
  } = useTaskRenderer({ task, onSolvedChange, onValidated });

  if (task.type === 'terminal') {
    return (
      <VStack align="stretch" spacing={2}>
        <Box bg={terminalBg} borderWidth={0} borderRadius="12px" boxShadow="none" transition="outline 0.2s ease">
          <Box display="flex" gap={2} p={2}>
            <Box w="10px" h="10px" borderRadius="full" bg="#ef4444" />
            <Box w="10px" h="10px" borderRadius="full" bg="#f59e0b" />
            <Box w="10px" h="10px" borderRadius="full" bg="#22c55e" />
          </Box>
          <Box px={3} pb={3}>
            <HStack spacing={2}>
              <Text color="#22d3ee">$</Text>
              <Input
                id={`task-${task.id || 'terminal'}-input`}
                name={`task-${task.id || 'terminal'}-input`}
                size="sm"
                variant="unstyled"
                value={value}
                onChange={(event) => handleValueChange(event.target.value)}
                placeholder={task.terminal?.placeholder || 'git ...'}
                color="white"
                _placeholder={{ color: terminalPlaceholder }}
                fontFamily="mono"
                fontSize={{ base: '16px', md: '14px' }}
                borderRadius={0}
                _focus={{ outline: 'none', boxShadow: 'none', borderColor: 'transparent' }}
                onKeyDown={handleInputKeyDown}
                isDisabled={ok === true}
              />
            </HStack>
          </Box>
        </Box>
        <Button
          key={wrongAnimKey}
          alignSelf="flex-start"
          mt={2}
          size="sm"
          variant="solid"
          bg="blue.600"
          color="white"
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          onClick={handleValidateTerminal}
          isDisabled={ok === true}
          leftIcon={<CheckIcon boxSize={3} />}
        >
          Проверить
        </Button>
      </VStack>
    );
  }

  if (task.type === 'mcq') {
    return (
      <Box bg="transparent" borderWidth={0} borderRadius="xl" p={0} boxShadow="none">
        <RadioGroup
          name={`task-${task.id || 'mcq'}-group`}
          onChange={(nextValue) => handleValueChange(nextValue as string)}
          value={value}
          isDisabled={ok === true}
        >
          <Stack direction="column" spacing={2}>
            {task.mcq?.options.map((o: any) => (
              <Radio key={o.id} value={o.id} name={`task-${task.id || 'mcq'}-option`}>{o.label}</Radio>
            ))}
          </Stack>
        </RadioGroup>
        <Button
          key={wrongAnimKey}
          mt={3}
          size="sm"
          variant="solid"
          bg="blue.600"
          color="white"
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          onClick={handleValidateMcq}
          isDisabled={ok === true}
          leftIcon={<CheckIcon boxSize={3} />}
        >
          Проверить
        </Button>
      </Box>
    );
  }

  if (task.type === 'checkbox') {
    const options = task.checkbox?.options || [];
    return (
      <Box bg="transparent" borderWidth={0} borderRadius="xl" p={0} boxShadow="none">
        <VStack align="stretch" spacing={2}>
          {options.map((o: any) => (
            <Checkbox
              key={o.id}
              name={`task-${task.id || 'checkbox'}-${o.id}`}
              isChecked={!!checked[o.id]}
              onChange={(event) => handleCheckboxToggle(o.id, event.target.checked)}
              isDisabled={ok === true}
            >
              {o.label}
            </Checkbox>
          ))}
        </VStack>
        <Button
          key={wrongAnimKey}
          mt={3}
          size="sm"
          variant="solid"
          bg="blue.600"
          color="white"
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          onClick={handleValidateCheckbox}
          isDisabled={ok === true}
          leftIcon={<CheckIcon boxSize={3} />}
        >
          Проверить
        </Button>
      </Box>
    );
  }

  if (task.type === 'text') {
    return (
      <VStack align="stretch" spacing={2}>
        <Box bg={terminalBg} borderWidth={0} borderRadius="12px" boxShadow="none" transition="outline 0.2s ease">
          <Box display="flex" gap={2} p={2}>
            <Box w="10px" h="10px" borderRadius="full" bg="#ef4444" />
            <Box w="10px" h="10px" borderRadius="full" bg="#f59e0b" />
            <Box w="10px" h="10px" borderRadius="full" bg="#22c55e" />
          </Box>
          <Box px={3} pb={3}>
            <HStack spacing={2}>
              <Text color="#22d3ee">$</Text>
              <Input
                id={`task-${task.id || 'text'}-input`}
                name={`task-${task.id || 'text'}-input`}
                size="sm"
                variant="unstyled"
                value={value}
                onChange={(event) => handleValueChange(event.target.value)}
                placeholder={task.text?.placeholder || ''}
                color="white"
                _placeholder={{ color: terminalPlaceholder }}
                fontFamily="mono"
                fontSize={{ base: '16px', md: '14px' }}
                borderRadius={0}
                _focus={{ outline: 'none', boxShadow: 'none', borderColor: 'transparent' }}
                onKeyDown={handleInputKeyDown}
                isDisabled={ok === true}
              />
            </HStack>
          </Box>
        </Box>
        <Button
          key={wrongAnimKey}
          alignSelf="flex-start"
          mt={2}
          size="sm"
          variant="solid"
          bg="blue.600"
          color="white"
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          onClick={handleValidateText}
          isDisabled={ok === true}
          leftIcon={<CheckIcon boxSize={3} />}
        >
          Проверить
        </Button>
      </VStack>
    );
  }

  return <Text fontSize="sm" color={descColor}>Тело задачи отсутствует.</Text>;
};

export { TaskMeta, TaskHint };


