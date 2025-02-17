import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';
import { GrClose } from 'react-icons/gr';
import { color } from '../../styles/color';
import { useAuth } from '../../context/auth/useAuth';
import { passedTimeText } from '../../utils/passedTimeText';
import PostEditModal from './PostEditModal';
import { fetchBookMarkState } from '../../utils/fetchBookMarkState';
import { handleBookMarkClick } from '../../utils/handleBookMarkClick';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { fontSize } from '../../styles/fontSize';

const PostDetailModal = ({ isDetailOpen, setIsDetailOpen, postId }) => {
  const { isLogin, loginedUser } = useAuth();

  const [selectedPost, setSelectedPost] = useState(null);
  const [writerData, setWriterData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isBookMarkClicked, setIsBookMarkClicked] = useState(false);

  useEffect(() => {
    if (postId) {
      getPosts();
    }
  }, [postId]);

  // 현재 사용자가 북마크를 눌렀는지 확인하는 로직
  useEffect(() => {
    if (!loginedUser || !postId) return;

    const checkBookMarkState = async () => {
      const isBookMarkClicked = await fetchBookMarkState(loginedUser.id, postId);
      setIsBookMarkClicked(isBookMarkClicked);
    };

    checkBookMarkState();
  }, [loginedUser?.id, postId]);

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
        .select('nick_name, profile_img')
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

  // state가 null이면 렌더링 방지
  if (selectedPost === null || writerData === null || comments === null) {
    return;
  }

  // 댓글 업로드 핸들러
  const handleUploadComment = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      alert('[Notification] 댓글을 추가하려면 로그인이 필요합니다.');
      return;
    }
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

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    try {
      await supabase.from('comments').delete().match({ id: commentId });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  // 게시글 삭제 핸들러
  const handleDeletePost = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    const deleteTables = ['comments', 'bookmarks', 'posts'];
    try {
      for (const table of deleteTables) {
        await supabase
          .from(table)
          .delete()
          .eq(table === 'posts' ? 'id' : 'post_id', postId);
      }

      alert('[Notification] 게시글이 삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenPostEditModal = () => {
    setIsPostEditModalOpen(true);
  };

  // 변수명 컨트롤
  const { img: img_url, title, content, writer_id, created_at } = selectedPost;

  return (
    <StDetailModalContainer onClick={handleCloseDetailByOutside}>
      <StGrClose onClick={handleCloseDetail} />
      <StModalContentsContainer>
        <StImgWrapper>{img_url ? <StPostImg src={img_url} alt="Post Image" /> : null}</StImgWrapper>
        <StContentsWrapper>
          <StHeader>
            <StWriterWrapper>
              <StProfileImage src={writerData?.profile_img} alt="프로필 이미지" />
              <p>{writerData.nick_name}</p>
            </StWriterWrapper>
            {loginedUser && loginedUser.id === writer_id ? (
              <StBtnWrapper>
                <StBtn onClick={handleOpenPostEditModal}>수정</StBtn>
                <StBtn onClick={handleDeletePost}>삭제</StBtn>
              </StBtnWrapper>
            ) : null}
          </StHeader>
          <StContents>
            <h3>{title}</h3>
            <p>{content}</p>
            <span>{`${passedTimeText(created_at)}, ${new Date(created_at).toLocaleString('ko-KR')}`}</span>
            {comments.map((comment) => (
              <StCommentWrapper key={comment.id}>
                <p>{comment.contents}</p>
                {loginedUser && loginedUser.id === comment.writer_id ? (
                  <StBtn onClick={() => handleDeleteComment(comment.id)}>삭제</StBtn>
                ) : null}
              </StCommentWrapper>
            ))}
          </StContents>
          <StInteraction>
            <StBookmarkWrapper>
              {isBookMarkClicked ? (
                <StBookMarkIcon
                  onClick={(e) =>
                    handleBookMarkClick(e, isLogin, isBookMarkClicked, setIsBookMarkClicked, loginedUser, postId)
                  }
                />
              ) : (
                <StBookMarkEmptyIcon
                  onClick={(e) =>
                    handleBookMarkClick(e, isLogin, isBookMarkClicked, setIsBookMarkClicked, loginedUser, postId)
                  }
                />
              )}
            </StBookmarkWrapper>
            <StCommentsForm onSubmit={handleUploadComment}>
              <StInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="댓글 달기..."
              />
              <StBtn type="submit">업로드</StBtn>
            </StCommentsForm>
          </StInteraction>
        </StContentsWrapper>
        {isPostEditModalOpen && (
          <PostEditModal title={title} contents={content} setter={{ setIsPostEditModalOpen, setSelectedPost }} />
        )}
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
`;

const StHeader = styled.div`
  border: 1px solid ${color.black};
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const StWriterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: ${fontSize.large};
  font-weight: 500;
`;

const StProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const StContents = styled.div`
  border: 1px solid ${color.black};
  border-radius: 5px;
  padding: 20px;
  height: 55%;
  overflow-y: auto;
  h3 {
    font-size: ${fontSize.large};
    line-height: 1.5;
  }
  p {
    font-size: ${fontSize.medium};
    line-height: 1.5;
  }
  span {
    font-size: ${fontSize.small};
    line-height: 2;
  }
`;

const StCommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StInteraction = styled.div`
  border: 1px solid ${color.black};
  border-radius: 5px;
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

const StBookmarkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StBookMarkIcon = styled(IoBookmark)`
  font-size: 30px;
  cursor: pointer;
`;
const StBookMarkEmptyIcon = styled(IoBookmarkOutline)`
  font-size: 30px;
  cursor: pointer;
`;

const StBtn = styled.button`
  border: none;
  border-radius: 3px;
  background-color: gray;
  color: ${color.white};
  cursor: pointer;
`;
