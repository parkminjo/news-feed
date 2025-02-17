import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { supabase } from '../services/supabaseClient';
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
  StPostImg,
  StProfileBio
} from '../styles/profileUistyles';

const ProfilePage = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);

  const [postsData, setPostsData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  //프로필 정보 가져오기
  useEffect(() => {
    if (!userId) return;
    const getProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('userExtraData')
          .select('nick_name, profile_img, bio')
          .eq('user_id', userId)
          .single();
        if (error) throw error;
        setProfileData(data);
      } catch (error) {
        console.error(error);
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
        console.error(error);
      }
    };
    getPostsData();

    return;
  }, [userId]);

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
            </StProfilUl>
            {profileData?.bio ? (
              <StProfileBio>{profileData.bio}</StProfileBio>
            ) : (
              <StProfileBio>소개글이 없습니다.</StProfileBio>
            )}
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
    </>
  );
};

export default ProfilePage;
