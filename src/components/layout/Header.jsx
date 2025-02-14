import styled from 'styled-components';
import { fontSize } from '../../styles/fontSize';
import { StCenterWrapper } from '../../styles/GlobalStyle';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    // 모달이 열린 상태에서만 외부 클릭 감지 활성화
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <StContainer>
      <StLogo>로고</StLogo>
      <StIconsWrapper>
        <StIconWrapper>
          <StBellIcon size={30} />
        </StIconWrapper>
        <StIconWrapper onClick={() => setIsModalOpen(!isModalOpen)}>
          <StUserIcon size={30} />
        </StIconWrapper>
      </StIconsWrapper>

      {isModalOpen && (
        <StModal ref={modalRef}>
          <StAccountName>계정</StAccountName>
          <StButton onClick={() => navigate('/login')}>로그인</StButton>
          <StButton onClick={() => navigate('/mypage')}>프로필</StButton>
        </StModal>
      )}
    </StContainer>
  );
};

export default Header;

/** styled component */
const StContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: ${fontSize.medium};
  border-bottom: 1px solid #e0e0e0;
`;

const StLogo = styled.div`
  font-weight: bold;
`;

const StIconsWrapper = styled(StCenterWrapper)`
  gap: 24px;
`;

const StIconWrapper = styled(StCenterWrapper)`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StBellIcon = styled(FaRegBell)`
  color: black;
`;

const StUserIcon = styled(FaUserCircle)`
  color: gray;
  margin-right: 10px;
`;

const StModal = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  width: 180px;
  background: white;
  border: 1px solid #888;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${fontSize.small};
  z-index: 100;
`;

const StAccountName = styled.div`
  font-weight: bold;
  text-align: left;
`;

const StButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #f0f0f0;
  }
`;
