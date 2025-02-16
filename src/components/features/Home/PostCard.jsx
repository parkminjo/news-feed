import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../../services/supabaseClient';
import { fontSize } from '../../../styles/fontSize';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { useAuth } from '../../../context/auth/useAuth';

const PostCard = ({ post }) => {
  const { isLogin } = useAuth();
  const { created_at, writer_id } = post || null;
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isBookMarkClicked, setIsBookMarkClicked] = useState(false);

  const [nickname, setNickname] = useState([]); // context에 userInfo 추가되면 수정 필요

  // context에 userInfo 추가되면 수정 필요한 코드
  useEffect(() => {
    if (!writer_id) return;

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
  }, [writer_id]);

  /** 경과 시간을 계산하여 "방금 전", "몇초 전" 등으로 바꿔주는 함수 */
  const writtenDate = useMemo(() => new Date(created_at).getTime(), [created_at]);

  const passedTimeText = useMemo(() => {
    const units = [
      { label: '일', value: 86400 },
      { label: '시간', value: 3600 },
      { label: '분', value: 60 },
      { label: '초', value: 1 }
    ];

    let passedTime = Math.trunc((Date.now() - writtenDate) / 1000); // 글 작성 시간부터 오늘 시간까지 경과된 시간(초 단위)

    if (passedTime < 1) return '방금 전';

    for (const { label, value } of units) {
      const time = Math.trunc(passedTime / value);

      if (time > 0) {
        return `${time}${label} 전`;
      }
    }
  }, [writtenDate]);

  /** 좋아요 Boolean값 변환 함수 */
  const handleLikeClick = async () => {
    if (!isLogin) return; // 로그인하지 않은 유저 좋아요 기능 비활성화

    // 좋아요 취소
    if (isLikeClicked) {
      try {
        const { error } = await supabase.from('likes').delete().eq('send_user_id', user.id).eq('post_id', post.id);

        if (error) {
          throw error;
        }

        setIsLikeClicked(false);
      } catch (error) {
        console.error(error);
      }
    }

    // 좋아요 추가
    if (!isLikeClicked) {
      try {
        const { error } = await supabase.from('likes').insert([{ send_user_id: user.id, post_id: post.id }]);

        if (error) {
          throw error;
        }

        setIsLikeClicked(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** 북마크 Boolean값 변환 함수 */
  const handleBookMarkClick = () => {
    if (!isLogin) return; // 로그인하지 않은 유저 북마크 기능 비활성화
    setIsBookMarkClicked(!isBookMarkClicked);
  };

  return (
    <StCardContainer>
      <StHeaderWrapper>
        <StWrapper>
          <StProfileImg src="/img/LoginCat.png" alt="고양이 이미지" />
          <StContentText>{nickname}</StContentText>
        </StWrapper>
        <StContentText>{passedTimeText}</StContentText>
      </StHeaderWrapper>
      <StImgWrapper>
        <StPostImg src="/img/LoginCat.png" alt="고양이 이미지" />
      </StImgWrapper>
      <StFooterWrapper>
        {isLikeClicked ? <StLikeIcon onClick={handleLikeClick} /> : <StLikeEmptyIcon onClick={handleLikeClick} />}
        {isBookMarkClicked ? (
          <StBookMarkIcon onClick={handleBookMarkClick} />
        ) : (
          <StBookMarkEmptyIcon onClick={handleBookMarkClick} />
        )}
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

const StBookMarkIcon = styled(IoBookmark)`
  font-size: 30px;
  cursor: pointer;
`;
const StBookMarkEmptyIcon = styled(IoBookmarkOutline)`
  font-size: 30px;
  cursor: pointer;
`;
