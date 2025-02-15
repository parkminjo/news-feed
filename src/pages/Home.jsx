import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/features/Home/PostCard';
import { supabase } from '../services/supabaseClient';
import { color } from '../styles/color';

const Home = () => {
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    getPost();
  }, []);

  return (
    <StContainer>
      <StMainWrapper>
        <StContentWrapper>
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
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
