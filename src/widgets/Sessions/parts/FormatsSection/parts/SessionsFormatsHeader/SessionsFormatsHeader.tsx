"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

type SessionsFormatsHeaderProps = {
  mutedTextColor: string;
};

const SessionsFormatsHeader: React.FC<SessionsFormatsHeaderProps> = ({
  mutedTextColor,
}) => {

  return (
    <Box
      as="header"
      mb={{ base: 4, md: 6 }}
      textAlign="center"
      maxW={{ base: "full", md: "720px" }}
      mx="auto"
    >
      <Heading
        id="sessions-formats-title"
        as="h2"
        fontSize={{ base: "xl", md: "2xl" }}
      >
        Форматы сессий
      </Heading>
      <Text
        mt={3}
        fontSize={{base: "md", md: "lg"}}
        color={mutedTextColor}
      >
        Регулярные форматы, в которых можно разбирать задачи, получать поддержку и
        расширять круг общения.
      </Text>
    </Box>
  );
};

export default SessionsFormatsHeader;


