import styled from 'styled-components';
import { fontSize } from '../../styles/fontSize';
import { StCenterWrapper } from '../../styles/GlobalStyle';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../context/components/header/useHeader';
import { useAuth } from '../../context/auth/useAuth';

const Header = () => {
  const { isLoginOpen, setIsLoginOpen, loginModalRef, handleAuthAction } = useHeader();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <StContainer>
      <StLogo>로고</StLogo>
      <StIconsWrapper>
        <StIconWrapper>
          <StBellIcon size={30} />
        </StIconWrapper>
        <StIconWrapper onClick={() => setIsLoginOpen(!isLoginOpen)}>
          <StUserIcon size={30} />
        </StIconWrapper>
      </StIconsWrapper>

      {isLoginOpen && (
        <StModal ref={loginModalRef}>
          <StAccountName>계정</StAccountName>
          <StButton onClick={handleAuthAction}>{isLogin ? '로그아웃' : '로그인'}</StButton>
          <StButton onClick={() => navigate('/mypage')}>프로필</StButton>
        </StModal>
      )}
    </StContainer>
  );
};

export default Header;

/** styled component */
const StContainer = styled.header`
  position: fixed;
  width: 100%;
  background-color: white;
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
