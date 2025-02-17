import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../services/supabaseClient';
import FollowListModal from '../components/modals/FollowListModal';
import ProfileEditModal from '../components/modals/ProfileEditModal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { useContext } from 'react';

const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const navigate = useNavigate();
  const { loginedUser } = useContext(AuthContext);

  //모달 On/off
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  //모달 모드가 팔로우인지 팔로워인지
  const [followMode, setFollowMode] = useState('');

  //프로필 정보 가져오기
  useEffect(() => {
    if (!loginedUser) return;
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('userExtraData')
          .select('nick_name')
          .eq('user_id', loginedUser.id)
          .single();
        if (error) throw error;

        setUserData(data);
      } catch (error) {
        console.error('에러:', error.message);
      }
    };
    getProfileData();
    return;
  }, [loginedUser]);

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
  const handleCloseFollowModal = () => {
    setIsFollowModalOpen(false);
  };

  //모달 닫기
  const handleCloseProfileEditModal = () => {
    setIsProfileEditModalOpen(false);
  };

  //디테일 페이지 이동
  const handleGotoDetailPage = (post) => {
    navigate(`/post/${post.id}`);
  };

  //프로필 수정
  const handleGoToProFileEdit = () => {
    setIsProfileEditModalOpen(true);
  };

  // 프로필 업데이트 후, 새 닉네임을 반영
  const handleProfileUpdated = (newNickname) => {
    setUserData({ nick_name: newNickname });
  };

  return (
    <>
      <StProfileContainer>
        <StProfileHeader>
          <StProfileImage src="" alt="" />
          <StProfileInfoWrapper>
            <StNickName>{userData?.nick_name || '비로그인'}</StNickName>
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
            <StProfileEditButton onClick={handleGoToProFileEdit}>닉네임 수정</StProfileEditButton>
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
          onClose={handleCloseFollowModal}
          followmode={followMode}
          listData={[]} // 데이터 생기면 추가해서 고치기
        />
      )}
      {isProfileEditModalOpen && (
        <ProfileEditModal
          onClose={handleCloseProfileEditModal}
          loginedUser={loginedUser}
          currentNickName={userData?.nick_name}
          handleProfileUpdated={handleProfileUpdated}
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
