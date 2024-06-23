import { useState } from 'react';

const useCanvas = () => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  const openCanvas = () => {
    setIsCanvasOpen(true);
    const backdropElements = document.getElementsByClassName('offcanvas-backdrop');
    if (backdropElements.length > 0) {
      (backdropElements[0] as HTMLElement).style.opacity = '0.5';
    }
  };

  const closeCanvas = () => {
    setIsCanvasOpen(false);
    const backdropElements = document.getElementsByClassName('offcanvas-backdrop');
    if (backdropElements.length > 0) {
      (backdropElements[0] as HTMLElement).style.opacity = '0';
    }
  };

  return {
    isCanvasOpen,
    openCanvas,
    closeCanvas,
  };
};

export default useCanvas;
