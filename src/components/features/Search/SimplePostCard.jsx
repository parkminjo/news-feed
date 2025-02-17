import { useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SimplePostCard = ({ post, onClick }) => {
  const { writer_id } = post || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!writer_id) return;

    const getUserNickname = async () => {
      try {
        const { error } = await supabase.from('userExtraData').select('nick_name').eq('user_id', writer_id).single();

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserNickname();
  }, [writer_id]);

  return (
    <StCardContainer onClick={onClick}>
      <StHeaderWrapper>
        <StWrapper
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${writer_id}`);
          }}
        ></StWrapper>
      </StHeaderWrapper>
      <StImgWrapper>
        <StPostImg src={post.img} alt="게시글 이미지" />
      </StImgWrapper>
    </StCardContainer>
  );
};

export default SimplePostCard;

const StCardContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    min-height: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const StHeaderWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
