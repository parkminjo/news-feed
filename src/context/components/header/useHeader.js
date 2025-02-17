import { useContext } from 'react';
import { HeaderContext } from './HeaderContext';

export const useHeader = () => {
  return useContext(HeaderContext);
};
