import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }
`;

export const StCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
