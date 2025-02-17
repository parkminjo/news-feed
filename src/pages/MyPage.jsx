import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../services/supabaseClient';
import FollowListModal from '../components/modals/FollowListModal';
import ProfileEditModal from '../components/modals/ProfileEditModal';
import { AuthContext } from '../context/auth/AuthContext';
import { useContext } from 'react';
import PostDetailModal from '../components/modals/PostDetailModal';
import {
  StProfileContainer,
  StProfileHeader,
  StProfileImage,
  StProfileInfoWrapper,
  StNickName,
  StProfilUl,
  StPostGrid,
  StFeedPost,
  StPostImg
} from '../styles/profileUistyles';

const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  const [followerCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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
          .select('nick_name, profile_img')
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
    if (!loginedUser) return;
    const getPostsData = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('writer_id', loginedUser.id);
        if (error) throw error;

        setPostsData(data);
        setPostCount(data.length);
      } catch (error) {
        console.error('에러:', error.message);
      }
    };
    getPostsData();

    return;
  }, [loginedUser]);

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
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  //프로필 수정
  const handleGoToProFileEdit = () => {
    setIsProfileEditModalOpen(true);
  };

  // 프로필 업데이트 후, 새 닉네임을 반영
  const handleProfileUpdated = (newNickname) => {
    setUserData((prevData) => ({
      ...prevData,
      nick_name: newNickname
    }));
  };

  return (
    <>
      <StProfileContainer>
        <StProfileHeader>
          <StProfileImage src={userData?.profile_img} alt="프로필 이미지" />
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
            <StFeedPost onClick={() => handleOpenDetail(post.id)} key={post.id}>
              <StPostImg src={post.img} alt={post.title} />
            </StFeedPost>
          ))}
          <PostDetailModal isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} postId={postId} />
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
