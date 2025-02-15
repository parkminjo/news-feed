import MainLayout from '../components/layout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useEffect, useState } from 'react';
import PostDetailModal from '../components/modals/PostDetailModal';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  // supabase - SELECT 함수 (getPost)
  const getPost = async () => {
    try {
      const { data } = await supabase.from('posts').select();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []); // 초기 렌더링 시에만 데이터 fetch

  // 디테일 열기 핸들러
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  return (
    <MainLayout>
      {posts.map((post) => (
        <div style={{ border: '1px solid black' }} key={post.id} onClick={() => handleOpenDetail(post.id)}>
          <p>{post.title}</p>
        </div>
      ))}
      <PostDetailModal isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} postId={postId} />
    </MainLayout>
  );
};

export default Home;
