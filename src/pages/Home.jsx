import MainLayout from '../components/layout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <MainLayout>
      {posts.map((post) => (
        <div style={{ border: '1px solid black' }} key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </MainLayout>
  );
};

export default Home;
