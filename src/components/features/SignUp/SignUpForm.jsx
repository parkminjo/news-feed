import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../styles/color';
import { fontSize } from '../../../styles/fontSize';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    nickName: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };
  return (
    <StWrapper>
      <form>
        <StSignUpContainer>
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
            type="text"
            id="nickName"
            placeholder="닉네임 입력"
            value={userInfo.nickName}
            onChange={handleChange}
          />
          <StSignButton>가입하기</StSignButton>
        </StSignUpContainer>
      </form>
      <StLoginBox>
        <p style={{ fontSize: `${fontSize.medium}` }}>계정이 있으신가요?</p>
        <Link to={'/login'} style={{ color: `${color.main}` }}>
          로그인 하러 가기
        </Link>
      </StLoginBox>
    </StWrapper>
  );
};

export default SignUpForm;

/** styled component */
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

const StSignUpContainer = styled.div`
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

const StLoginBox = styled(StSignUpContainer)`
  height: 100px;
  gap: 15px;
`;
