import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';
import styled from 'styled-components';
import { color } from '../styles/color';
import PostCard from '../components/features/Home/PostCard';
import { supabase } from '../services/supabaseClient';
import { useEffect, useState } from 'react';
import PostDetailModal from '../components/modals/PostDetailModal';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  const getPost = async () => {
    try {
      const { data } = await supabase.from('posts').select('*');
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  // 디테일 열기 핸들러
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  return (
    <StContainer>
      <StMainWrapper>
        <StContentWrapper>
          <PostCard />
          <PostCard />
          <PostCard />
          {/* DB 연동 post 모달 오픈 이벤트핸들러 연결 */}
          {posts.map((post) => (
            <div style={{ border: '1px solid black' }} key={post.id} onClick={() => handleOpenDetail(post.id)}>
              <p>{post.title}</p>
            </div>
          ))}
          <PostDetailModal isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} postId={postId} />
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
