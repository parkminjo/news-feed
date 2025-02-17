import { useEffect, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useAuth } from '../../../context/auth/useAuth';
import { supabase } from '../../../services/supabaseClient';
import { fontSize } from '../../../styles/fontSize';

import { fetchLikeState } from '../../../utils/fetchLikeState';
import { fetchBookMarkState } from '../../../utils/fetchBookMarkState';
import { passedTimeText } from '../../../utils/passedTimeText';
import { handleLikeClick } from '../../../utils/handleLikeClick';
import { handleBookMarkClick } from '../../../utils/handleBookMarkClick';

const PostCard = ({ post, onClick }) => {
  const { isLogin, loginedUser } = useAuth();
  const { created_at, writer_id } = post || null;
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isBookMarkClicked, setIsBookMarkClicked] = useState(false);

  // context에 userInfo 추가되면 수정 필요한 코드
  // 사용자의 닉네임을 가져오는 함수
  const [nickname, setNickname] = useState([]);

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

  // 현재 사용자가 좋아요와 북마크를 눌렀는지 확인하는 로직
  useEffect(() => {
    if (!loginedUser || !post.id) return;

    const checkLikeState = async () => {
      const isLiked = await fetchLikeState(loginedUser.id, post.id);
      setIsLikeClicked(isLiked);
    };

    const checkBookMarkState = async () => {
      const isBookMarkClicked = await fetchBookMarkState(loginedUser.id, post.id);
      setIsBookMarkClicked(isBookMarkClicked);
    };

    checkLikeState();
    checkBookMarkState();
  }, [loginedUser, post.id]);

  return (
    <StCardContainer onClick={onClick}>
      <StHeaderWrapper>
        <StWrapper>
          <StProfileImg src="/img/LoginCat.png" alt="프로필 이미지" />
          <StContentText>{nickname}</StContentText>
        </StWrapper>
        <StContentText>{passedTimeText(created_at)}</StContentText>
      </StHeaderWrapper>
      <StImgWrapper>
        <StPostImg src={post.img} alt="게시글 이미지" />
      </StImgWrapper>
      <StFooterWrapper>
        {isLikeClicked ? (
          <StLikeIcon
            onClick={(e) => handleLikeClick(e, isLogin, isLikeClicked, setIsLikeClicked, loginedUser, post.id)}
          />
        ) : (
          <StLikeEmptyIcon
            onClick={(e) => handleLikeClick(e, isLogin, isLikeClicked, setIsLikeClicked, loginedUser, post.id)}
          />
        )}
        {isBookMarkClicked ? (
          <StBookMarkIcon
            onClick={(e) =>
              handleBookMarkClick(e, isLogin, isBookMarkClicked, setIsBookMarkClicked, loginedUser, post.id)
            }
          />
        ) : (
          <StBookMarkEmptyIcon
            onClick={(e) =>
              handleBookMarkClick(e, isLogin, isBookMarkClicked, setIsBookMarkClicked, loginedUser, post.id)
            }
          />
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
  cursor: pointer;
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
