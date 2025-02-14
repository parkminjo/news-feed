import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../services/supabaseClient';
import Header from '../components/layout/Header';
import SideBar from '../components/layout/SideBar';
import FollowListModal from '../components/modals/FollowListModal';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [followData, setFollowData] = useState([]);

  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const navigate = useNavigate();

  //모달 On/off
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  //모달 모드가 팔로우인지 팔로워인지
  const [followMode, setFollowMode] = useState('');

  //게시물 포스트 가져오기
  useEffect(() => {
    const getPostsData = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) throw error;

        setPostsData(data);
        setPostCount(data.length);
      } catch (error) {
        console.error('에러:', error.message);
      }
    };
    getPostsData();

    return;
  }, []);

  //팔로워목록 모달 열기
  const handleGotoFollowerList = () => {
    setFollowMode('follower');
    setIsFollowModalOpen(true);
  };

  //팔로잉 목록 모달 열기
  const handleGotoFollowingList = () => {
    setFollowMode('following');
    setIsFollowModalOpen(true);
  };

  //모달 닫기
  const handleCloseModal = () => {
    setIsFollowModalOpen(false);
  };

  const handleGotoDetailPage = (post) => {
    navigate(`/post/${post.id}`);
  };

  const handleGoToProFileEditPage = () => {
    alert('프로필 수정으로 이동');
  };

  return (
    <>
      <Header />
      <SideBar />
      <StProfileContainer>
        <StProfileHeader>
          <StProfileImage src="" alt="" />
          <StProfileInfoWrapper>
            <StNickName>{userData.length > 0 ? userData[0].nick_name : 'Loading...'}</StNickName>
            <StProfilUl>
              <li>
                게시물 <span>{postCount}</span>
              </li>
              <li onClick={handleGotoFollowerList}>
                팔로워 <span>{followerCount}</span>
              </li>
              <li onClick={handleGotoFollowingList}>
                팔로잉 <span>{followingCount}</span>
              </li>
            </StProfilUl>
            <StProfileEditButton onClick={handleGoToProFileEditPage}>프로필 수정</StProfileEditButton>
          </StProfileInfoWrapper>
        </StProfileHeader>
        <StPostGrid>
          {postsData.map((post) => (
            <StFeedPost onClick={() => handleGotoDetailPage(post)} key={post.id}>
              {post.title}
            </StFeedPost>
          ))}
        </StPostGrid>
      </StProfileContainer>
      {isFollowModalOpen && (
        <FollowListModal
          onClose={handleCloseModal}
          mode={followMode}
          listData={[]} // 데이터 생기면 추가해서 고치기
        />
      )}
    </>
  );
};

export default MyPage;

//전체영역
const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//헤더
const StProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 20px;
  max-width: 900px;
  width: 100%;

  border-bottom: 1px dashed black;
  margin-top: 50px;
`;

//이미지
const StProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

const StProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//닉네임 영역
const StNickName = styled.h2`
  font-size: large;
  margin-bottom: 20px;
`;

const StProfilUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;

  li {
    margin-right: 20px;
    font-size: medium;
    cursor: pointer;

    //게시물 수는 커서가 포인터가 아니라 그냥 갯수 카운트만 해주기 때문에 추가
    &:nth-child(1) {
      cursor: default;

      //인스타에서도 숫자들은 bold 처리가 되어 있어서 수정
      span {
        font-weight: bold;
      }
    }
  }
`;

//프로필수정버튼
const StProfileEditButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  width: 50%;
  background-color: gray;
  color: white;
  cursor: pointer;
`;

//게시글
const StPostGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
`;

const StFeedPost = styled.div`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  height: 250px;
  cursor: pointer;
`;
