import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';
import styled from 'styled-components';

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

const Home = () => {
  return (
    <StContainer>
      <Header />
      <StMainContent>
        <Sidebar />
        <StContentWrapper>
          <div>Home</div>
        </StContentWrapper>
      </StMainContent>
    </StContainer>
  );
};

export default Home;
