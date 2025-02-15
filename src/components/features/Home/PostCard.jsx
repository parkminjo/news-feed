import styled from 'styled-components';
import { supabase } from '../../../services/supabaseClient';
import { use, useEffect, useState } from 'react';
import { fontSize } from '../../../styles/fontSize';

const PostCard = ({ post }) => {
  const { created_at, writer_id } = post || null;
  const [nickname, setNickname] = useState([]); // context에 userInfo 추가되면 수정 필요

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

  return (
    <StCardContainer>
      <StHeaderWrapper>
        <ContentText>{nickname}</ContentText>
        <ContentText>{post.created_at}</ContentText>
      </StHeaderWrapper>
      <StImgWrapper>
        <PostImg src="/img/LoginCat.png" alt="고양이 이미지" />
      </StImgWrapper>
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

const ContentText = styled.div`
  font-size: ${fontSize.medium};
`;

const StImgWrapper = styled.div`
  flex: 10;
`;

const PostImg = styled.img`
  object-fit: cover;
  width: 100%;
`;

const StFooterWrapper = styled.div`
  flex: 1;
`;
