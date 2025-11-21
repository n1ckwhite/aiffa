import React from 'react';
import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useTaskDetail } from './hooks/useTaskDetail';
import MetaHeader from '../MetaHeader/MetaHeader';
import AuthorNote from '../Author/AuthorNote';
import ExampleBlock from '../Example/Example';
import EditorBlock from '../Editor/Editor';
import ActionsBar from '../Actions/Actions';
import TaskCompletionModal from 'features/TaskCompletionModal';
import SupportBlock from 'widgets/SupportBlock';

const TaskDetailScreen: React.FC = () => {
  const {
    navigate, taskId, task, mdMeta, meta,
    author, authorHref, authorAvatar, authorNote,
    input, setInput, result, checking, congratsAll,
    showVsOverlay, openVSCode, onCheck, isOpen, onClose,
    externalLinks,
  } = useTaskDetail();

  return (
    <>
    <Box w="100%" maxW={{ base: '100%', md: '1100px', lg: '1280px' }} mx="auto">
      <Button
        variant="outline"
        colorScheme="blue"
        mb={4}
        onClick={() => navigate('/weekly')}
        leftIcon={<ArrowBackIcon />}
        borderRadius="full"
        px={5}
        py={2}
        fontWeight="bold"
        transition="background-color 0.15s ease, transform 0.1s ease"
      >
        К задачам недели
      </Button>
      <Box borderWidth={0} borderRadius="xl" p={0} bg="transparent" boxShadow="none" position="relative">
        <MetaHeader
          tag={meta.tag}
          icon={meta.icon}
          color={meta.color}
          title={mdMeta?.title || task.label}
          description={mdMeta?.description || task.description}
          done={!!task.done}
        />
        <HStack spacing={0} my={4}><Divider /></HStack>
        <AuthorNote name={author.name} href={authorHref} avatar={authorAvatar} note={authorNote} />
        <Divider my={4} />
        <ExampleBlock code={(mdMeta?.examples?.[0]?.code || meta.placeholder) as string} language={mdMeta?.examples?.[0]?.lang || (taskId === 'weekly-2' ? 'html' : taskId === 'weekly-3' ? 'javascript' : 'bash')} />
        <HStack mb={2}><Text fontWeight="semibold">Ваше решение</Text></HStack>
        <EditorBlock
          value={input}
          onChange={setInput}
          language={mdMeta?.editorLanguage || (taskId === 'weekly-2' ? 'html' : taskId === 'weekly-3' ? 'go' : 'shell')}
          overlay={showVsOverlay}
          onStart={openVSCode}
        />
        <ActionsBar onCheck={onCheck} checking={checking} done={!!task.done} externalLinks={externalLinks} />
        {result && !result.ok && (
          <Box role="alert" mt={3} borderRadius="md" bg="yellow.100" color="black" p={3}>
            {result.msg}
          </Box>
        )}
        {isOpen && (
          <TaskCompletionModal completed={congratsAll} onClose={onClose} onContinue={onClose} />
        )}
      </Box>
    </Box>
    <Box px={{ base: 4, md: 6 }} pb={{ base: 8, md: 10 }}>
      <Box maxW={{ base: '100%', md: '900px' }} mx="auto">
        <SupportBlock variant="weekly" />
      </Box>
    </Box>
    </>
  );
};

export default TaskDetailScreen;


