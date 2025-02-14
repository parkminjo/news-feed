import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../styles/color';
import { fontSize } from '../../../styles/fontSize';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';

const SignUpForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickName: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    /** 예외상황 처리 */
    if (userInfo.email === '') {
      alert('이메일을 입력해주세요');
      return;
    }
    if (userInfo.password === '' || userInfo.passwordCheck === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }
    if (userInfo.nickName === '') {
      alert('닉네임을 입력해주세요');
      return;
    }
    if (userInfo.nickName.length < 2) {
      alert('2글자 이상의 닉네임을 적어주세요');
      return;
    }
    if (userInfo.passwordCheck !== userInfo.password) {
      alert('비밀번호가 동일하지 않습니다');
      return;
    }

    try {
      /** 회원가입 진행*/
      const {
        data: { user: userData },
        error: authError
      } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password
      });

      if (authError) {
        throw authError;
      }

      /** userExtraData(Public)에 닉네임 추가 */
      const { error: userError } = await supabase
        .from('userExtraData')
        .insert({ user_id: userData?.id, nick_name: userInfo.nickName });

      if (userError) {
        throw userError;
      }

      alert('회원가입이 완료되었습니다.');
      setUserInfo({ email: '', password: '', passwordCheck: '', nickName: '' });
      navigate('/login');
    } catch (error) {
      alert('회원가입 중 오류가 발생하였습니다.');
      console.error('회원가입 오류 발생: ', error);
    }
  };

  /** UI */
  return (
    <StContainer>
      <form onSubmit={handleSignUp}>
        <StSignUpWrapper>
          <h2>사이트명</h2>
          <StInput type="email" id="email" placeholder="이메일 입력" value={userInfo.email} onChange={handleChange} />
          <StInput
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={userInfo.password}
            onChange={handleChange}
          />
          <StInput
            type="password"
            id="passwordCheck"
            placeholder="비밀번호 확인"
            value={userInfo.passwordCheck}
            onChange={handleChange}
          />
          <StInput
            type="text"
            id="nickName"
            placeholder="닉네임 입력"
            value={userInfo.nickName}
            onChange={handleChange}
          />
          <StSignButton>가입하기</StSignButton>
        </StSignUpWrapper>
      </form>
      <StLoginWrapper>
        <p style={{ fontSize: `${fontSize.medium}` }}>계정이 있으신가요?</p>
        <Link to={'/login'} style={{ color: `${color.main}` }}>
          로그인 하러 가기
        </Link>
      </StLoginWrapper>
    </StContainer>
  );
};

export default SignUpForm;

/** styled component */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

const StSignUpWrapper = styled.div`
  width: 400px;
  height: 350px;
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

const StLoginWrapper = styled(StSignUpWrapper)`
  height: 100px;
  gap: 15px;
`;
