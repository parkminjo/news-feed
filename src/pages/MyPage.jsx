import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../services/supabaseClient';

const MyPage = () => {
  const [userData, setUserData] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data, error } = await supabase.from('test1').select('*');
        if (error) throw error;
        setUserData(data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error.message);
      }
    };
    getUserData();

    return;
  }, []);

  const handleGotoFollowerList = () => {
    //팔로워 목록 페이지로 이동이거나 모달 열기
    alert('모달로 이동');
    // navigate();
  };

  const handleGotoFollowingList = () => {
    //팔로워 목록 페이지로 이동이거나 모달 열기
    alert('모달로 이동');
    // navigate();
  };

  const handleGotoPostingList = () => {
    //게시물 목록으로 이동
    alert('모달로 이동');
    // navigate();
  };

  const handleGotoDetailPage = () => {
    //게시물 디테일로 이동
    alert('게시물 디테일페이지로 이동');
    // navigate();
  };

  //임시 게시글
  const posts = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src="" alt="" />
        <ProfileInfo>
          <NickName>{userData.length > 0 ? userData[0].nick_name : 'Loading...'}</NickName>
          <ProfileStats>
            <li onClick={handleGotoPostingList}>게시물 1</li>
            <li onClick={handleGotoFollowerList}>팔로워 1</li>
            <li onClick={handleGotoFollowingList}>팔로잉 1</li>
          </ProfileStats>
        </ProfileInfo>
      </ProfileHeader>
      <PostGrid>
        {posts.map((post) => (
          <FeedPost onClick={handleGotoDetailPage} key={post}>
            게시물
          </FeedPost>
        ))}
      </PostGrid>
    </ProfileContainer>
  );
};

export default MyPage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  max-width: 900px;
  width: 100%;

  border: 1px solid black;
  margin-top: 100px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.h2`
  font-size: large;
  margin-bottom: 20px;
`;

const ProfileStats = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;

  li {
    margin-right: 20px;
    font-size: medium;
    cursor: pointer;
  }
`;

const PostGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
`;

const FeedPost = styled.div`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  height: 150px;
`;
