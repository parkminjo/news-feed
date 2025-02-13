import styled from 'styled-components';
import { color } from '../../../styles/color';
import { fontSize } from '../../../styles/fontSize';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  /** UI */
  return (
    <StContainer>
      <StCatImg src="../../../../public/img/LoginCat.png" />
      <StWrapper>
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
          <StSignButton>가입하기</StSignButton>
          <button>비밀번호를 잊으셨나요</button>
        </StLoginWrapper>
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

const StSignUpWrapper = styled(StLoginWrapper)`
  height: 100px;
  gap: 15px;
`;

const StCatImg = styled.img`
  width: 500px;
  object-fit: cover;
`;
