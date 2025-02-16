import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/features/Home/PostCard';
import PostDetailModal from '../components/modals/PostDetailModal';
import { supabase } from '../services/supabaseClient';
import { color } from '../styles/color';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  /** supabase에서 데이터를 가져오는 SELECT 함수 */
  const getPost = async () => {
    try {
      const { data: postData, error } = await supabase.from('posts').select('*');

      if (error) {
        throw error;
      }

      setPosts(postData);
    } catch (error) {
      console.error(error);
    }
  };

  /** 초기 렌더링 시에만 데이터 fetch */
  useEffect(() => {
    getPost();
  }, []);

  /** 디테일 페이지 여는 함수 */
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
  padding-top: 60px;
  gap: 40px;
`;
