import { useContext } from 'react';
import ScreenSizeContext from '../contexts/screenSize';

const useScreenSize = () => {
  const screenSize = useContext(ScreenSizeContext);
  const { width } = screenSize;

  const getBreakpoint = () => {
    if (width) {
      if (width >= 1536) return '2xl';
      if (width >= 1280) return 'xl';
      if (width >= 1024) return 'lg';
      if (width >= 768) return 'md';
      if (width >= 640) return 'sm';
    }
    return '';
  };

  let breakpoint = getBreakpoint();

  return { ...screenSize, breakpoint };
};

export default useScreenSize;
