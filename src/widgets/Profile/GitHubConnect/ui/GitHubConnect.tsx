import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { GitHubConnectProps } from '../types/GitHubConnect.types';
import { Title, Hint, Form, UserRow } from './parts';

const GitHubConnect: React.FC<GitHubConnectProps> = ({ value, onChange, onImport, isImporting, profileName, avatarUrl, currentGithubUrl, parseUsername, dividerColor, hintColor }) => {
  const GH_PREFIX = 'https://github.com/';
  const username = parseUsername(currentGithubUrl);
  return (
    <Box w="100%" maxW="680px" mt={4} borderWidth="1px" borderColor={dividerColor} borderRadius="xl" p={{ base: 4, md: 5 }}>
      <VStack align="stretch" spacing={3}>
        <Title />
        <Hint color={hintColor} />
        <Form value={value} onChange={onChange} onImport={onImport} isImporting={isImporting} prefix={GH_PREFIX} />
        <UserRow username={username} profileName={profileName} avatarUrl={avatarUrl} />
      </VStack>
    </Box>
  );
};

export default GitHubConnect;


