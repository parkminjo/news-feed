import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { supabase } from '../../services/supabaseClient';
import { fetchUserBookmarks } from '../../utils/fetchUserBookmarks';
import { useAuth } from '../../context/auth/useAuth';

// 임시 게시물 데이터
// const imgData = Array.from({ length: 20 }, (_, i) => ({
//   src: '/img/LoginCat.png',
//   id: i + 1,
//   title: `고양이 ${i + 1}`,
//   comment: '게시물 내용'
// }));

const BookMarkModal = ({ onClose }) => {
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]); // 북마크한 게시물 목록
  const [selectedPost, setSelectedPost] = useState(null);

  /* 북마크 데이터 가져오기 */
  useEffect(() => {
    if (!user) return; // 로그아웃 상태 시 실행 안 함

    const getBookmarks = async () => {
      const postIds = await fetchUserBookmarks(user.id); // 북마크한 게시물 목록 가져오기
      if (postIds.length === 0) return;

      // post_id로 실제 게시글 데이터 가져오기
      const { data, error } = await supabase.from('posts').select('*').in('id', postIds);

      if (error) {
        console.error('북마크 게시물 가져오기 오류:', error);
        return;
      }

      setBookmarkedPosts(data);
    };

    getBookmarks();
  }, [user]);

  return (
    <StContainer>
      <StModal>
        <StBackButton onClick={selectedPost ? () => setSelectedPost(null) : onClose}>
          &lt; {selectedPost ? '뒤로가기' : '저장됨'}
        </StBackButton>
        {!selectedPost ? (
          <StImgGrid>
            {bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post) => (
                <StPostImg key={post.id} src={post.src} alt={post.title} onClick={() => setSelectedPost(post)} />
              ))
            ) : (
              <p>북마크된 게시물이 없습니다.</p>
            )}
          </StImgGrid>
        ) : (
          <StDetailView>
            <StImg src={selectedPost.img} alt={selectedPost.title} />
            <StTextContent>
              <h2>{selectedPost.title}</h2>
              <p>{selectedPost.comment}</p>
            </StTextContent>
          </StDetailView>
        )}
      </StModal>
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

const StImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const StDetailView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 80%;
  gap: 20px;
  margin-top: 50px;
`;

const StImg = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 5px;
`;

const StTextContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  cursor: pointer;
`;
