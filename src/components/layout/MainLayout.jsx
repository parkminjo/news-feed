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
      <StMainContent>
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
        <StContentWrapper>
          <Outlet />
        </StContentWrapper>
      </StMainContent>
    </StContainer>
  );
};

export default MainLayout;

/** styled component */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StMainContent = styled.main`
  display: flex;
  flex: 1;
`;

const StContentWrapper = styled.div`
  padding: 10px;
`;
