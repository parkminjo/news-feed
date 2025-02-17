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
  gap: 20px;

  li {
    margin-right: 20px;
    font-size: medium;
    cursor: pointer;

    //게시물 수는 커서가 포인터가 아니라 그냥 갯수 카운트만 해주기 때문에 추가
    &:nth-child(1) {
      cursor: default;

      //인스타에서도 숫자들은 bold 처리가 되어 있어서 수정
      span {
        font-weight: bold;
      }
    }
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
  height: 250px;
  cursor: pointer;
`;

export const StPostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
