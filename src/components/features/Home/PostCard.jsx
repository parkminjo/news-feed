import styled from 'styled-components';

const PostCard = () => {
  return (
    <StCardContainer>
      <StHeaderWrapper></StHeaderWrapper>
      <StImgWrapper></StImgWrapper>
      <StFooterWrapper></StFooterWrapper>
    </StCardContainer>
  );
};

export default PostCard;

const StCardContainer = styled.div`
  width: 90%;
  height: 700px;
  background-color: beige;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StHeaderWrapper = styled.div``;
const StImgWrapper = styled.div``;
const StFooterWrapper = styled.div``;
