"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import studentAnimation from '@/shared/icons/json-icons/student.json';

const StudentIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "350px" }}
      mx="auto"
    >
      <Lottie
        animationData={studentAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default StudentIcon;


