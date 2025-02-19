import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { fetchUserBookmarks } from '../../utils/fetchUserBookmarks';
import { useAuth } from '../../context/auth/useAuth';
import { supabase } from '../../services/supabaseClient';

const BookMarkModal = ({ onClose }) => {
  const { loginedUser: user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]); // 북마크한 게시물 목록
  const [selectedPost, setSelectedPost] = useState(null);
  const [nickName, setNickName] = useState(null);

  /* 북마크 데이터 가져오기 */
  useEffect(() => {
    if (!user) return; // 로그아웃 상태 시 실행 안 함

    const getBookmarks = async () => {
      const postIds = await fetchUserBookmarks(user.id); // 북마크한 게시물 목록 가져오기
      setBookmarkedPosts(postIds); // 북마크한 게시물 목록 설정
    };

    getBookmarks();
  }, [user]);

  // 선택한 게시물의 작성자 닉네임 가져오기
  useEffect(() => {
    if (!selectedPost) return;

    const fetchNickName = async () => {
      const { data, error } = await supabase
        .from('userExtraData')
        .select('nick_name')
        .eq('user_id', selectedPost.writer_id)
        .single();

      if (!error) setNickName(data?.nick_name);
    };

    fetchNickName();
  }, [selectedPost]);

  return (
    <StContainer>
      {!selectedPost ? (
        <StModal>
          <StBackButton onClick={onClose}>&lt; 저장됨</StBackButton>
          <StImgGrid>
            {bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post) => (
                <StPostWrapper key={post.id} onClick={() => setSelectedPost(post)}>
                  <StPostImg src={post.img} alt={`북마크된 게시물 ${post.id}`} />
                </StPostWrapper>
              ))
            ) : (
              <p>북마크된 게시물이 없습니다.</p>
            )}
          </StImgGrid>
        </StModal>
      ) : (
        <StDetailModal>
          <StBackButton onClick={() => setSelectedPost(null)}>&lt; 뒤로가기</StBackButton>
          <DetailContainer>
            <ImageWrapper>
              <PostImage src={selectedPost.img} alt="게시물 이미지" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle>{selectedPost.title}</PostTitle>
              <PostAuthor>작성자: {nickName || '알 수 없음'}</PostAuthor>
              <PostContent>{selectedPost.content}</PostContent>
            </TextWrapper>
          </DetailContainer>
        </StDetailModal>
      )}
    </StContainer>
  );
};

export default BookMarkModal;

/* styled component */
const StContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModal = styled.div`
  background-color: ${color.white};
  width: 70%;
  height: 90%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 100%;
`;

const StBackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 20px;
  background: none;
  border: none;
  font-size: ${fontSize.medium};
  color: ${color.gray};
  cursor: pointer;

  &:hover {
    color: ${color.black};
  }
`;

const StPostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const StImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const StPostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const StDetailModal = styled(StModal)`
  width: 80%;
  max-width: 900px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  background-color: ${color.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  background-color: ${color.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostTitle = styled.h2`
  font-size: ${fontSize.large};
  color: ${color.black};
  margin-bottom: 10px;
`;

const PostAuthor = styled.p`
  font-size: ${fontSize.medium};
  color: ${color.darkGray};
  margin-bottom: 20px;
`;

const PostContent = styled.p`
  font-size: ${fontSize.medium};
  color: ${color.black};
`;
