import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';

const img = [
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
  '../../public/img/LoginCat.png',
];

const BookMarkModal = ({ onClose }) => {
  const [selectedPost, setSelectedPost] = useState([]);

  const togglePost = (src) => {
    setSelectedPost((prev) => {
      prev.includes(src) ? prev.filter((item) => item !== src) : [...prev, src];
    });
  };

  return (
    <StContainer>
      <StModal>
        <StCloseButton onClick={onClose}>&lt; 저장됨</StCloseButton>
        <StImgGrid>
          {img.map((src, index) => (
            <StCatImg
              key={index}
              src={src}
              alt="postImg"
              onClick={() => togglePost(src)}
              seleted={selectedPost.includes(src)}
            />
          ))}
        </StImgGrid>
      </StModal>
    </StContainer>
  );
};

export default BookMarkModal;

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
