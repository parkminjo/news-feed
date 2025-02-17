import styled from 'styled-components';
import { fontSize } from '../../styles/fontSize';
import { StCenterWrapper } from '../../styles/GlobalStyle';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useHeader } from '../../context/components/header/useHeader';
import { useAuth } from '../../context/auth/useAuth';

import { useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useState } from 'react';

import { color } from '../../styles/color';


const Header = () => {
  const { isLoginOpen, setIsLoginOpen, loginModalRef, handleAuthAction } = useHeader();
  const { isLogin, loginedUser } = useAuth();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (isLogin && loginedUser) {
      const getProfileImg = async () => {
        try {
          const { data, error } = await supabase
            .from('userExtraData')
            .select('profile_img')
            .eq('user_id', loginedUser.id)
            .single();
          if (error) throw error;
          setProfileImg(data);
        } catch (error) {
          console.error(error);
        }
      };
      getProfileImg();
    }
  }, [isLogin, loginedUser]);
  return (
    <StContainer>
      <StLogo to={'/'}>CATTALE</StLogo>
      <StIconsWrapper>
        <StIconWrapper>
          <StBellIcon size={30} />
        </StIconWrapper>
        <StIconWrapper onClick={() => setIsLoginOpen(!isLoginOpen)}>
          {isLogin && profileImg?.profile_img ? (
            <StProfileImage src={profileImg.profile_img} alt="프로필 사진" />
          ) : (
            <StUserIcon size={30} />
          )}
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

const StLogo = styled(Link)`
  font-family: 'Arvo', serif;
  font-weight: 500;
  color: ${color.black};
  text-decoration: none;
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

const StProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
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
