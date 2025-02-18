import styled from 'styled-components';

//전체영역
export const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//헤더
export const StProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 20px;
  max-width: 900px;
  width: 100%;

  border-bottom: 1px dashed black;
  margin-top: 50px;
`;

//이미지
export const StProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

export const StProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//닉네임 영역
export const StNickName = styled.h2`
  font-size: large;
  margin-bottom: 20px;
`;

export const StProfilUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 5px;
  font-size: medium;

  span {
    font-weight: bold;
  }
`;

//게시글
export const StPostGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
`;

export const StFeedPost = styled.div`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  height: 300px;
  cursor: pointer;
`;

export const StPostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StProfileBio = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;
