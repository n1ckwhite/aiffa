export const shouldHandleClientNavigation = (event: React.MouseEvent) => {
    if (event.defaultPrevented) return false;
    if (event.button !== 0) return false;
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return false;
    return true;
  };

export const handleClick = (href: string | undefined, onClick: () => void, event: React.MouseEvent) => {
  if (!href) {
    onClick();
    return;
  }
  if (!shouldHandleClientNavigation(event)) return;
  return;
}