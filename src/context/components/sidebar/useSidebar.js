import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

export const useSidebar = () => {
  return useContext(SidebarContext);
};
