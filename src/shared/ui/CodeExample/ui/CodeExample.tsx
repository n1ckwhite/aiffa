import React from 'react';
import { Box } from '@chakra-ui/react';
import { useClipboard } from '@chakra-ui/react';
import { useCodeExampleColors } from './colors/useCodeExampleColors';
import type { CodeExampleProps } from './types/CodeExample.types';
import { prettyLanguage } from '../model/lang';
import { useCodeHighlight } from '../model/useCodeHighlight';
import { HeaderBar, CodeBlock } from './parts';

export const CodeExample: React.FC<CodeExampleProps> = ({ code, languageHint, title, minimal, showLanguageLabel = true }) => {
  const codeRef = React.useRef<HTMLElement | null>(null);
  const [lang, setLang] = React.useState<string | undefined>(undefined);
  const { hasCopied, onCopy } = useClipboard(code);
  const {
    isDark,
    headerBg,
    headerBorder,
    codeBg,
    defaultCodeTextColor,
    langTextColor,
    copyHoverBg,
    copyActiveBg,
  } = useCodeExampleColors(minimal);

  const langDetected = useCodeHighlight({ codeRef, code, languageHint, isDark });
  React.useEffect(() => { if (langDetected) setLang(langDetected); }, [langDetected]);

  const displayLang = prettyLanguage(lang);
  const radius = 14;

  return (
    <Box>
      <HeaderBar
        title={title}
        displayLang={showLanguageLabel ? displayLang : undefined}
        langColor={langTextColor}
        hasCopied={hasCopied}
        onCopy={onCopy}
        headerBg={headerBg}
        headerBorder={headerBorder}
        copyHoverBg={copyHoverBg}
        copyActiveBg={copyActiveBg}
      />
      <CodeBlock
        codeRef={codeRef}
        code={code}
        bg={codeBg}
        borderRadius={radius}
        minimal={minimal}
        defaultCodeTextColor={defaultCodeTextColor}
      />
    </Box>
  );
};

export default CodeExample;


