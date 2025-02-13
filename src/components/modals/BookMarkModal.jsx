import styled from 'styled-components';
import { color } from '../../styles/color';
// import { fontSize } from '../../styles/fontSize';


const BookMarkModal = ({ onClose }) => {
  return (
    <StContainer>
      <StModal>
        <button onClick={onClose}>
          &lt; 저장됨
        </button>
        <StTitle>북마크 게시물 리스트</StTitle>
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
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StTitle = styled.h2`
  margin-bottom: 20px;
`;


