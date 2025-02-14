import { useContext } from 'react';
import { PostContext } from './PostProvider';

export const usePost = () => {
  return useContext(PostContext);
};
