import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

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

  return posts;
};

export default usePosts;
