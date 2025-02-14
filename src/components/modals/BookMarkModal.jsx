import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';

// 임시 이미지 데이터
const imgData = [
  { src: '../../public/img/LoginCat.png', id: 1, title: '고양이 1', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 2, title: '고양이 2', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 3, title: '고양이 3', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 4, title: '고양이 4', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 5, title: '고양이 5', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 6, title: '고양이 6', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 7, title: '고양이 7', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 8, title: '고양이 8', comment: '게시물 내용' },
  { src: '../../public/img/LoginCat.png', id: 9, title: '고양이 9', comment: '게시물 내용' }
];

const BookMarkModal = ({ onClose }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <StContainer>
      <StModal>
        {!selectedPost ? (
          // 북마크 리스트 화면
          <>
            <StCloseButton onClick={onClose}>&lt; 저장됨</StCloseButton>
            <StImgGrid>
              {imgData.map((img, index) => (
                <StCatImg key={index} src={img.src} alt="postImg" onClick={() => setSelectedPost(img)} />
              ))}
            </StImgGrid>
          </>
        ) : (
          // 게시물 상세 화면
          <StDetailView>
            <StBackButton onClick={() => setSelectedPost(null)}>&lt; 뒤로가기</StBackButton>
            <img src={selectedPost.src} alt="{seletedPost.title}" />
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.comment}</p>
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

const StCloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 250px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-top: 50px;
`;

const StCatImg = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, border 0.2s;
  border: ${(props) => (props.selected ? `3px solid ${color.main}` : 'none')};

  &:hover {
    transform: scale(1.05);
  }
`;

const StDetailView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StBackButton = styled.button`
  align-self: flex-start;
  margin-bottom: 20px;
  background: none;
  border: none;
  font-size: ${fontSize.medium};
  color: ${color.gray};
  cursor: pointer;

  &:hover {
    color: ${color.black};
  }
`;
