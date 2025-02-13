import styled from 'styled-components';
import { fontSize } from '../../styles/fontSize';
import { CenterWrapper } from '../../styles/GlobalStyle';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';

const StContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: ${fontSize.medium};
`;

const StLogo = styled.div`
  font-weight: bold;
`;

const StIconsWrapper = styled(CenterWrapper)`
  gap: 24px;
`;

const StIconWrapper = styled(CenterWrapper)`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StBellIcon = styled(FaRegBell)`
  color: black;
`;

const StPlusIcon = styled(FaUserCircle)`
  color: gray;
  margin-right: 10px;
`;

const Header = () => {
  return (
    <StContainer>
      <StLogo>로고</StLogo>
      <StIconsWrapper>
        <StIconWrapper>
          <StBellIcon size={30} />
        </StIconWrapper>
        <StIconWrapper>
          <StPlusIcon size={30} />
        </StIconWrapper>
      </StIconsWrapper>
    </StContainer>
  );
};

export default Header;
