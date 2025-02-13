import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';


const BookMarkModal = ({ onClose }) => {
  return (
    <StContainer>
      <StModal>
        <StCloseButton onClick={onClose}>
          &lt; 저장됨
        </StCloseButton>
        <img src='' alt='PostIMG' />
        <img src='' alt='PostIMG' />
        <img src='' alt='PostIMG' />
        <img src='' alt='PostIMG' />
        <img src='' alt='PostIMG' />
        <img src='' alt='PostIMG' />
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
