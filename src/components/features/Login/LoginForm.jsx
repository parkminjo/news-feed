import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../../services/supabaseClient';
import { color } from '../../../styles/color';
import { fontSize } from '../../../styles/fontSize';

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    /** 예외상황 처리 */
    if (userInfo.email === '') {
      alert('이메일을 입력해주세요');
    }
    if (userInfo.password === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }

    /** 로그인 정보 확인 */
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: userInfo.password
      });

      if (error) {
        throw error;
      }

      alert('로그인에 성공하였습니다');
      navigate('/');
    } catch (error) {
      alert('로그인 오류가 발생하였습니다');
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        throw error;
      }
      alert('로그인에 성공하였습니다');
    } catch (error) {
      alert('소셜 로그인 중 오류가 발생하였습니다');
      console.error('소셜 로그인 오류: ', error);
    }
  };

  /** UI */
  return (
    <StContainer>
      <StCatImg src="/img/LoginCat.png" alt="고양이 이미지" />
      <StWrapper>
        <form onSubmit={handleLogin}>
          <StLoginWrapper>
            <h2>사이트명</h2>
            <StInput type="email" id="email" placeholder="이메일 입력" value={userInfo.email} onChange={handleChange} />
            <StInput
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              value={userInfo.password}
              onChange={handleChange}
            />
            <StSignButton>로그인하기</StSignButton>
          </StLoginWrapper>
        </form>
        <StSocialLoginWrapper></StSocialLoginWrapper>
        <StSignUpWrapper>
          <p style={{ fontSize: `${fontSize.medium}` }}>아직 계정이 없으신가요?</p>
          <Link to={'/signup'} style={{ color: `${color.main}` }}>
            회원가입 하러 가기
          </Link>
        </StSignUpWrapper>
      </StWrapper>
    </StContainer>
  );
};

export default LoginForm;

/** styled component */
const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StLoginWrapper = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border: 1px solid ${color.gray};
  border-radius: 5px;
`;

const StInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${color.gray};
  padding: 5px 10px 5px 10px;
  font-size: ${fontSize.medium};
  box-sizing: border-box;

  &:hover {
    border: 1px solid #484c50;
  }
`;

const StSignButton = styled.button`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: none;
  font-size: ${fontSize.medium};
  color: ${color.white};
  background-color: ${color.main};
  cursor: pointer;

  &:hover {
    background-color: #cd5200;
  }
`;

const StSocialLoginWrapper = styled(StLoginWrapper)`
  height: 100px;
  gap: 15px;
`;

const StSignUpWrapper = styled(StLoginWrapper)`
  height: 100px;
  gap: 15px;
`;

const StCatImg = styled.img`
  width: 500px;
  object-fit: cover;
`;
