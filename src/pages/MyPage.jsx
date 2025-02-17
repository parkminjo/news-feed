import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../services/supabaseClient';
import NicknameEditModal from '../components/modals/NicknameEditModal';
import BioEditModal from '../components/modals/BioEditModal';
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
  StPostImg,
  StProfileBio
} from '../styles/profileUistyles';

const MyPage = () => {
  const [profileData, setProfileData] = useState(null);

  const [postsData, setPostsData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState();

  const { loginedUser } = useContext(AuthContext);

  //모달 On/off
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  //프로필 정보 가져오기
  useEffect(() => {
    if (!loginedUser?.id) return;
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('userExtraData')
          .select('nick_name, profile_img, bio')
          .eq('user_id', loginedUser.id)
          .single();
        if (error) throw error;

        setProfileData(data);
      } catch (error) {
        console.error('에러:', error.message);
      }
    };
    getProfileData();
  }, [loginedUser?.id]);

  //게시물 포스트 가져오기
  useEffect(() => {
    if (!loginedUser?.id) return;
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
  }, [loginedUser?.id]);

  //디테일 페이지 이동
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  // 닉네임 업데이트
  const handleNicknameUpdated = (newNickname) => {
    setProfileData((prevData) => ({
      ...prevData,
      nick_name: newNickname
    }));
  };

  // 소개글 업데이트
  const handleBioUpdated = (newBio) => {
    setProfileData((prevData) => ({
      ...prevData,
      bio: newBio
    }));
  };

  return (
    <>
      <StProfileContainer>
        <StProfileHeader>
          <StProfileImage src={profileData?.profile_img} alt="프로필 이미지" />
          <StProfileInfoWrapper>
            <StNickName>{profileData?.nick_name || '비로그인'}</StNickName>
            <StProfilUl>
              <li>
                게시물 <span>{postCount}</span>
              </li>
            </StProfilUl>
            {profileData?.bio ? (
              <StProfileBio>{profileData.bio}</StProfileBio>
            ) : (
              <StProfileBio>소개글을 추가해주세요.</StProfileBio>
            )}
            <StButtonWrapper>
              <StProfileEditButton onClick={() => setIsNicknameModalOpen(true)}>닉네임 수정</StProfileEditButton>
              <StProfileEditButton onClick={() => setIsBioModalOpen(true)}>소개글 추가</StProfileEditButton>
            </StButtonWrapper>
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
      {isNicknameModalOpen && (
        <NicknameEditModal
          onClose={() => setIsNicknameModalOpen(false)}
          loginedUser={loginedUser}
          currentNickName={profileData?.nick_name}
          handleNicknameUpdated={handleNicknameUpdated}
        />
      )}

      {isBioModalOpen && (
        <BioEditModal
          onClose={() => setIsBioModalOpen(false)}
          loginedUser={loginedUser}
          currentBio={profileData?.bio}
          handleBioUpdated={handleBioUpdated}
        />
      )}
    </>
  );
};

export default MyPage;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
