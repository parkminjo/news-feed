import styled from 'styled-components';
import { fontSize } from '../../../styles/fontSize';

const PostCard = ({ post }) => {
  return (
    <StCardContainer>
      <StHeaderWrapper>
        <ContentText></ContentText>
        <ContentText></ContentText>
      </StHeaderWrapper>
      <StImgWrapper></StImgWrapper>
      <StFooterWrapper></StFooterWrapper>
    </StCardContainer>
  );
};

export default PostCard;

const StCardContainer = styled.div`
  width: 90%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StHeaderWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 0 20px 0 20px;
  justify-content: space-between;
  align-items: center;
`;
const StImgWrapper = styled.div`
  flex: 10;
  background-color: black;
`;
const StFooterWrapper = styled.div`
  flex: 1;
`;

const ContentText = styled.div`
  font-size: ${fontSize.medium};
`;
