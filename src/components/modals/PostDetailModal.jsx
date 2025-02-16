import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';
import { GrClose } from 'react-icons/gr';
import { color } from '../../styles/color';

const PostDetailModal = ({ isDetailOpen, setIsDetailOpen, postId }) => {
  // isDetailOpen이 false일 경우, 모달 숨기기
  if (!isDetailOpen) {
    return null;
  }

  // 모달 닫기 핸들러
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  // 모달 콘텐츠 외부를 클릭하면 모달 닫기
  const handleCloseDetailByOutside = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseDetail();
    }
  };

  const [selectedPost, setSelectedPost] = useState(null);
  const [writerData, setWriterData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  async function getPosts() {
    try {
      // posts
      const { data: postData } = await supabase.from('posts').select('*').eq('id', postId);
      if (postData?.length) {
        setSelectedPost(postData[0]);
      }

      // userExtraData
      const { data: userData } = await supabase
        .from('userExtraData')
        .select('nick_name')
        .eq('user_id', postData[0].writer_id);
      if (userData?.length) {
        setWriterData(userData[0]);
      }

      // // comments
      const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', postData[0].id);
      setComments(commentsData || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (postId) {
      getPosts();
    }
  }, [postId]);

  // state가 null이면 렌더링 방지
  if (selectedPost === null || writerData === null || comments === null) {
    return;
  }

  // 작성일 처리
  const date = new Date(selectedPost.created_at);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // 댓글 업로드
  const handleUploadComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('[Notification] 댓글 내용을 입력하세요.');
      return;
    }

    try {
      const { data } = await supabase
        .from('comments')
        .insert([{ post_id: postId, contents: newComment }])
        .select('*');
      setComments((prev) => [...prev, ...data]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StDetailModalContainer onClick={handleCloseDetailByOutside}>
      <StGrClose onClick={handleCloseDetail} />
      <StModalContentsContainer>
        <StImgWrapper>{selectedPost.img ? <StPostImg src={selectedPost.img} alt="Post Image" /> : null}</StImgWrapper>
        <StContentsWrapper>
          <StHeader>
            <h3>{writerData.nick_name}</h3>
            <StBtnWrapper>
              <button>수정</button>
              <button>삭제</button>
            </StBtnWrapper>
          </StHeader>
          <StContents>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.content}</p>
            <p>{`${year}년 ${month}월 ${day}일 ${hours}:${minutes}`}</p>
            {comments.map((comment) => (
              <p key={comment.id}>{comment.contents}</p>
            ))}
          </StContents>
          <StInteraction>
            <div>좋아요</div>
            <StCommentsForm onSubmit={handleUploadComment}>
              <StInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="댓글 달기..."
              />
              <button type="submit">업로드</button>
            </StCommentsForm>
          </StInteraction>
        </StContentsWrapper>
      </StModalContentsContainer>
    </StDetailModalContainer>
  );
};

export default PostDetailModal;

// Styled-components
const StGrClose = styled(GrClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
`;

const StDetailModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const StModalContentsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 1200px;
  height: 600px;
  background-color: ${color.white};
  border: 1px solid ${color.gray};
  border-radius: 20px;
  padding: 20px;
`;

const StImgWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${color.gray};
`;

const StPostImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: space-between;
  margin-left: 15px;
  padding: 20px;
  width: 50%;
  background-color: ${color.gray};
`;

const StHeader = styled.div`
  border: 1px solid ${color.black};
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const StContents = styled.div`
  border: 1px solid ${color.black};
  padding: 20px;
  height: 50%;
`;

const StInteraction = styled.div`
  border: 1px solid ${color.black};
  padding: 20px;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StCommentsForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const StInput = styled.input`
  width: 85%;
`;
