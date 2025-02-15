import { useState } from 'react';
import { PostContext } from './PostContext';

export const PostProvider = ({ children }) => {
  const [posts] = useState([]); // 전체 게시물 리스트

  const value = { posts };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
