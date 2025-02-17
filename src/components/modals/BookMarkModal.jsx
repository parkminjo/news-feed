import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';

// 임시 게시물 데이터
const imgData = Array.from({ length: 20 }, (_, i) => ({
  src: '/img/LoginCat.png',
  id: i + 1,
  title: `고양이 ${i + 1}`,
  comment: '게시물 내용',
}));


const BookMarkModal = ({ onClose }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <StContainer>
      <StModal>
        <StBackButton onClick={selectedPost ? () => setSelectedPost(null) : onClose}>
          &lt; {selectedPost ? '뒤로가기' : '저장됨'}
        </StBackButton>
        {!selectedPost ? (
          <StImgGrid>
            {imgData.map((img) => (
              <StCatImg key={img.id} src={img.src} alt="postImg" onClick={() => setSelectedPost(img)} />
            ))}
          </StImgGrid>
        ) : (
          <StDetailView>
            <StImg src={selectedPost.src} alt={selectedPost.title} />
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
  &:hover {
    transform: scale(1.05);
  }
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
