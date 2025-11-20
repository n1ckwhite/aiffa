export type MenuLinksProps = {
  hoverBg: string;
  onClose: () => void;
  donateBg: string;
  donateHoverBg: string;
  onDonate: () => Promise<void> | void;
};



