import { useState } from 'react';
import { SidebarContext } from './SidebarContext';

export const SidebarProvider = ({ children }) => {
  const [isSidebarExpand, setIsSidebarExpand] = useState(false);

  const value = { isSidebarExpand, setIsSidebarExpand };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
