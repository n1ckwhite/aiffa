import React from 'react';

export const useExternalLinks = (taskId: string) => {
  return React.useMemo(() => {
    const links: Array<{ label: string; href: string }> = [];
    if (taskId === 'weekly-2') {
      links.push(
        { label: 'StackBlitz', href: 'https://stackblitz.com/edit/web-platform?file=index.html' },
        { label: 'CodePen', href: 'https://codepen.io/pen/' },
        { label: 'CodeSandbox', href: 'https://codesandbox.io/s/new' },
      );
    } else if (taskId === 'weekly-3') {
      links.push(
        { label: 'StackBlitz', href: 'https://stackblitz.com/edit/js?file=index.js' },
        { label: 'CodeSandbox', href: 'https://codesandbox.io/s/new' },
        { label: 'Replit', href: 'https://replit.com/new' },
      );
    } else {
      links.push(
        { label: 'CodeSandbox', href: 'https://codesandbox.io/s/new' },
        { label: 'StackBlitz', href: 'https://stackblitz.com' },
      );
    }
    return links;
  }, [taskId]);
};


