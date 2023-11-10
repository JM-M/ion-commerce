import { Dispatch, SetStateAction, createContext } from 'react';

interface ContextInterface {
  width: number;
  height: number;
}

const ScreenSizeContext = createContext<ContextInterface>({
  width: 0,
  height: 0,
});

export default ScreenSizeContext;
