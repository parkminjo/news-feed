import styled from 'styled-components';

const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 300px;
`;

const FollowListModal = ({ onClose, mode, listData }) => {
  return (
    <StModalContainer onClick={onClose}>
      <StModalContent onClick={(e) => e.stopPropagation()}>
        <ul>
          {listData && listData.length > 0 ? (
            listData.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>{mode === 'follower' ? '팔로워가 없습니다.' : '팔로잉 목록이 없습니다.'}</li>
          )}
        </ul>
        <button onClick={onClose}>닫기</button>
      </StModalContent>
    </StModalContainer>
  );
};

export default FollowListModal;
