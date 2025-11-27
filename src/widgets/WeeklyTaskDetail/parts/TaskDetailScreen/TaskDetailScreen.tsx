import React from 'react';
import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { ArrowBackIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useTaskDetail } from './hooks/useTaskDetail';
import MetaHeader from '../MetaHeader/MetaHeader';
import AuthorNote from '../Author/AuthorNote';
import ExampleBlock from '../Example/Example';
import EditorBlock from '../Editor/Editor';
import ActionsBar from '../Actions/Actions';
import TaskCompletionModal from 'features/TaskCompletionModal';
import SupportBlock from 'widgets/SupportBlock';
import WeeklyTaskDetailSkeleton from 'pages/WeeklyTaskDetailPage/Skeleton';
import { useTaskDetailColors } from './colors/useTaskDetailColors';

type TaskDetailScreenProps = {
  taskId?: string;
};

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ taskId: initialTaskId }) => {
  const {
    navigate,
    taskId,
    task,
    mdMeta,
    meta,
    author,
    authorHref,
    authorAvatar,
    authorNote,
    input,
    setInput,
    result,
    checking,
    congratsAll,
    openVSCode,
    onCheck,
    isOpen,
    onClose,
    externalLinks,
    handleContinueAfterCompletion,
  } = useTaskDetail(initialTaskId);

  const [isEditorReady, setIsEditorReady] = React.useState(false);
  const { errorBg, errorBorder, errorTitleColor, errorTextColor, errorIconColor } = useTaskDetailColors();

  if (!mdMeta) {
    return <WeeklyTaskDetailSkeleton />;
  }

  return (
    <>
      <Box
        w="100%"
        maxW={{ base: "100%", md: "1100px", lg: "1280px" }}
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={{ base: 8, md: 10 }}
      >
        <Box
          borderWidth={0}
          borderRadius="xl"
          p={0}
          bg="transparent"
          boxShadow="none"
          position="relative"
        >
          <MetaHeader
            tag={meta.tag}
            icon={meta.icon}
            color={meta.color}
            title={mdMeta?.title || task.label}
            description={mdMeta?.description || task.description}
            done={!!task.done}
          />
          <Button
            variant="outline"
            colorScheme="blue"
            mt={2}
            mb={4}
            onClick={() => navigate("/weekly")}
            leftIcon={<ArrowBackIcon />}
            borderRadius="full"
            px={5}
            py={2}
            fontWeight="bold"
            alignSelf="flex-start"
            transition="background-color 0.15s ease, transform 0.1s ease"
          >
            К задачам недели
          </Button>
          <HStack spacing={0} my={4}>
            <Divider />
          </HStack>
          <AuthorNote
            name={author.name}
            href={authorHref}
            avatar={authorAvatar}
            note={authorNote}
          />
          <Divider my={4} />
          <ExampleBlock
            code={(mdMeta?.examples?.[0]?.code || meta.placeholder) as string}
            language={
              mdMeta?.examples?.[0]?.lang ||
              (taskId === "weekly-2"
                ? "html"
                : taskId === "weekly-3"
                ? "javascript"
                : "bash")
            }
          />
          <HStack mb={2}>
            <Text fontWeight="semibold">Ваше решение</Text>
          </HStack>
          <EditorBlock
            value={input}
            onChange={setInput}
            language={
              mdMeta?.editorLanguage ||
              (taskId === "weekly-2"
                ? "html"
                : taskId === "weekly-3"
                ? "go"
                : "shell")
            }
            overlay
            onStart={openVSCode}
            onReady={() => setIsEditorReady(true)}
          />
          <ActionsBar
            onCheck={onCheck}
            checking={checking}
            done={!!task.done}
            externalLinks={externalLinks}
            isEditorReady={isEditorReady}
          />
          {result && !result.ok && (
            <Box
              role="alert"
              mt={4}
              borderRadius="md"
              bg={errorBg}
              borderWidth="1px"
              borderColor={errorBorder}
              boxShadow="0 6px 18px rgba(0, 0, 0, 0.18)"
              p={4}
            >
              <HStack align="flex-start" spacing={3}>
                <Box mt={1}>
                  <WarningTwoIcon boxSize={5} color={errorIconColor} />
                </Box>
                <Box>
                  <Text fontWeight="semibold" color={errorTitleColor}>
                    Проверка не прошла
                  </Text>
                  <Text mt={1} fontSize="sm" color={errorTextColor}>
              {result.msg}
                  </Text>
                </Box>
              </HStack>
            </Box>
          )}
          {isOpen && (
            <TaskCompletionModal
              completed={congratsAll}
              context="weekly"
              onClose={onClose}
              onContinue={handleContinueAfterCompletion}
            />
          )}
        </Box>
      </Box>
      <Box px={{ base: 4, md: 6 }} pb={{ base: 8, md: 10 }}>
        <Box maxW={{ base: "100%", md: "900px" }} mx="auto">
          <SupportBlock variant="weekly" />
        </Box>
      </Box>
    </>
  );
};

export default TaskDetailScreen;


