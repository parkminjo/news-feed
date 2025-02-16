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
        <StHeader>
          <Header />
        </StHeader>
      </HeaderProvider>
      <SidebarProvider>
        <StSidebar>
          <Sidebar />
        </StSidebar>
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
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 70px 1fr;
  height: 100vh;
`;

const StHeader = styled.div`
  grid-row: 1;
  grid-column: span 2;
`;

const StSidebar = styled.aside`
  grid-row: 2;
  grid-column: 1;
`;

const StContentWrapper = styled.main`
  grid-row: 2;
  grid-column: 2;
  overflow-y: auto;
`;
