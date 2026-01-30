import React from 'react';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useFooterColors } from './colors/useFooterColors';
import { Branding, Sections, Support, Community } from './parts';
import { emailHref, telegramHref, githubHref, habrHref, habrCareerHref } from '../model/links';
import { handleDonate as donateHelper } from '../../../utils/donate';

const Footer: React.FC = () => {
  const colors = useFooterColors();
  const toast = useToast();

  const handleDonate = () => donateHelper({ toast, closeAllToasts: toast.closeAll });

  return (
    <Box as="footer" bg={colors.bg} mt={8} borderTop="1px solid" borderColor={colors.borderColor}>
      <Container maxW="1200px" pt={6} pb={3}>
        <SimpleGrid minChildWidth={{ base: "100%", sm: "240px" }} spacing={6} w="full">
          <Branding />
          <Support onDonate={handleDonate} />
          <Community
            telegramHref={telegramHref}
            emailHref={emailHref}
            githubHref={githubHref}
            habrHref={habrHref}
            habrCareerHref={habrCareerHref}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;


