import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';
import styled from 'styled-components';
import { color } from '../styles/color';
import PostCard from '../components/features/Home/PostCard';

const Home = () => {
  return (
    <StContainer>
      <Header />
      <Sidebar />
      <StMainWrapper>
        <StContentWrapper>
          <PostCard />
          <PostCard />
          <PostCard />
        </StContentWrapper>
      </StMainWrapper>
    </StContainer>
  );
};

export default Home;

/** styled component */
const StContainer = styled.div`
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 90px;
  gap: 40px;
`;
