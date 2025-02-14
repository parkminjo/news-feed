import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const StCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
