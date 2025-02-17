import { useState } from 'react';
import { color } from '../styles/color';
import styled from 'styled-components';
import PostCard from '../components/features/Home/PostCard';
import PostDetailModal from '../components/modals/PostDetailModal';
import usePosts from '../hooks/usePosts';

const Home = () => {
  const posts = usePosts();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  // 디테일 모달 열기 핸들러
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  /** UI */
  return (
    <StContainer>
      <StMainWrapper>
        <StContentWrapper>
          {posts.toReversed().map((post) => {
            return <PostCard key={post.id} post={post} onClick={() => handleOpenDetail(post.id)} />;
          })}
          {isDetailOpen && (
            <PostDetailModal isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} postId={postId} />
          )}
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
  width: 800px;
  min-height: 100vh;
  background-color: ${color.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  gap: 40px;
`;
