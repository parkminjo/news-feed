import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';
import styled from 'styled-components';
import { color } from '../styles/color';

const Home = () => {
  return (
    <StContainer>
      <Header />
      <Sidebar />
      <StMainWrapper>
        <StContentWrapper></StContentWrapper>
      </StMainWrapper>
    </StContainer>
  );
};

export default Home;

/** styled component */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const StMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StContentWrapper = styled.div`
  width: 60%;
  min-height: 100vh;
  background-color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;
