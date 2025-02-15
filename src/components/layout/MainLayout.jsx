import { Outlet } from 'react-router-dom';
import { HeaderProvider } from '../../context/components/header/HeaderProvider';
import { SidebarProvider } from '../../context/components/sidebar/SidebarProvider';
import Header from './Header';
import Sidebar from './SideBar';
import styled from 'styled-components';

const MainLayout = () => {
  return (
    <StContainer>
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <StContentWrapper>
        <Outlet />
      </StContentWrapper>
    </StContainer>
  );
};

export default MainLayout;

/** styled component */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StContentWrapper = styled.div`
  padding: 10px;
`;
