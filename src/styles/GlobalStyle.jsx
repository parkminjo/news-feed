import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
`;

export const StCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
