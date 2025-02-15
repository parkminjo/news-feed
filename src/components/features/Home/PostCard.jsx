import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../../services/supabaseClient';
import { fontSize } from '../../../styles/fontSize';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

const PostCard = ({ post }) => {
  const { created_at, writer_id } = post || null;
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const [nickname, setNickname] = useState([]); // context에 userInfo 추가되면 수정 필요

  // context에 userInfo 추가되면 수정 필요한 코드
  useEffect(() => {
    const getUserNickname = async () => {
      try {
        const { data: userData, error } = await supabase
          .from('userExtraData')
          .select('nick_name')
          .eq('user_id', writer_id)
          .single();

        if (error) {
          throw error;
        }

        setNickname(userData.nick_name);
      } catch (error) {
        console.error(error);
      }
    };

    getUserNickname();
  }, []);

  /** 경과 시간을 계산하여 "방금 전", "몇초 전" 등으로 바꿔주는 함수 */
  const writtenDate = new Date(created_at).getTime();

  const passedTimeText = (date) => {
    const units = [
      { label: '일', value: 86400 },
      { label: '시간', value: 3600 },
      { label: '분', value: 60 },
      { label: '초', value: 1 }
    ];

    let passedTime = Math.trunc((Date.now() - date) / 1000); // 글 작성 시간부터 오늘 시간까지 경과된 시간

    if (passedTime < 1) return '방금 전';

    for (const { label, value } of units) {
      const time = Math.trunc(passedTime / value);
      if (time > 0) return `${time}${label} 전`;
    }
  };

  /** 좋아요 Boolean값 변환 함수 */
  const handleLikeClick = () => {
    setIsLikeClicked(!isLikeClicked);
  };

  return (
    <StCardContainer>
      <StHeaderWrapper>
        <StWrapper>
          <StProfileImg src="/img/LoginCat.png" alt="고양이 이미지" />
          <StContentText>{nickname}</StContentText>
        </StWrapper>
        <StContentText>{passedTimeText(writtenDate)}</StContentText>
      </StHeaderWrapper>
      <StImgWrapper>
        <StPostImg src="/img/LoginCat.png" alt="고양이 이미지" />
      </StImgWrapper>
      <StFooterWrapper>
        {isLikeClicked ? <StLikeIcon onClick={handleLikeClick} /> : <StLikeEmptyIcon onClick={handleLikeClick} />}
      </StFooterWrapper>
    </StCardContainer>
  );
};

export default PostCard;

const StCardContainer = styled.div`
  width: 90%;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StHeaderWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #e4e4e4;
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StContentText = styled.span`
  font-size: ${fontSize.medium};
`;

const StImgWrapper = styled.div`
  flex: 10;
  width: 100%;
  overflow: hidden;
`;

const StPostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StFooterWrapper = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
`;

const StLikeIcon = styled(IoMdHeart)`
  font-size: ${fontSize.xLarge};
  color: #fb4141;
  cursor: pointer;
`;

const StLikeEmptyIcon = styled(IoMdHeartEmpty)`
  font-size: ${fontSize.xLarge};
  cursor: pointer;
`;
