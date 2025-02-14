import { HeaderProvider } from '../../context/components/header/HeaderProvider';
import { SidebarProvider } from '../../context/components/sidebar/SidebarProvider';
import Header from './Header';
import Sidebar from './SideBar';
import styled from 'styled-components';

const MainLayout = ({ children }) => {
  return (
    <StContainer>
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <StMainContent>
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
        <StContentWrapper>{children}</StContentWrapper>
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
