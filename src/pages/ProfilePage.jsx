import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { supabase } from '../services/supabaseClient';
import FollowListModal from '../components/modals/FollowListModal';
import PostDetailModal from '../components/modals/PostDetailModal';
import { useParams } from 'react-router-dom';
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

const ProfilePage = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);

  const [postsData, setPostsData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  const [followerCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  //모달 On/off
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  //모달 모드가 팔로우인지 팔로워인지
  const [followMode, setFollowMode] = useState('');

  //프로필 정보 가져오기
  useEffect(() => {
    if (!userId) return;
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('userExtraData')
          .select('nick_name, profile_img')
          .eq('user_id', userId)
          .single();
        if (error) throw error;
        setProfileData(data);
      } catch (error) {
        console.error('프로필 데이터 에러:', error.message);
      }
    };
    getProfileData();
  }, [userId]);

  //게시물 포스트 가져오기
  useEffect(() => {
    if (!userId) return;
    const getPostsData = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('writer_id', userId);
        if (error) throw error;

        setPostsData(data);
        setPostCount(data.length);
      } catch (error) {
        console.error('에러:', error.message);
      }
    };
    getPostsData();

    return;
  }, [userId]);

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

  //디테일 페이지 이동
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
  };

  return (
    <>
      <StProfileContainer>
        <StProfileHeader>
          <StProfileImage src={profileData?.profile_img} alt="" />
          <StProfileInfoWrapper>
            <StNickName>{profileData?.nick_name}</StNickName>
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
    </>
  );
};

export default ProfilePage;
