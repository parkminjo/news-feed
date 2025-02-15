import { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [userData] = useState({}); // 전체 게시물 리스트
  const [followers] = useState([]); // 사용자가 팔로우한 사람 목록
  const [following] = useState([]); // 사용자를 팔로우한 사람 목록

  const value = { userData, followers, following };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
