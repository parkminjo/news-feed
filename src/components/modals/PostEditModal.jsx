import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styled from 'styled-components';
import { useAuth } from '../../context/auth/useAuth';

const PostEditModal = ({ title, contents, setter: { setIsPostEditModalOpen, setSelectedPost } }) => {
  const [newTitle, setNewTitle] = useState(title || '');
  const [newContents, setNewContents] = useState(contents || '');
  const { loginedUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title: newTitle, content: newContents })
      .eq('writer_id', loginedUser.id);
    if (error) throw error;
    else {
      handleSubmitPostEdit(newTitle, newContents);
      handleClosePostEditModal();
    }
  };

  // PostEdit 모달 핸들러
  const handleClosePostEditModal = () => {
    setIsPostEditModalOpen(false);
  };

  // 수정된 데이터를 받아서 selectedPost 상태 업데이트
  const handleSubmitPostEdit = (newTitle, newContents) => {
    setSelectedPost((prevPost) => ({
      ...prevPost,
      title: newTitle,
      content: newContents
    }));
  };

  return (
    <StModalContainer onClick={handleClosePostEditModal}>
      <StModalContent onClick={(e) => e.stopPropagation()}>
        <StForm onSubmit={handleSubmit}>
          <label>
            제목
            <StInput
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="제목을 입력해주세요.."
            />
          </label>
          <label>
            내용
            <StInput
              type="text"
              value={newContents}
              onChange={(e) => setNewContents(e.target.value)}
              placeholder="내용을 입력해주세요.."
            />
          </label>
          <StButtonWrapper>
            <StButton type="submit">변경</StButton>
            <StButton
              onClick={(e) => {
                e.preventDefault();
                handleClosePostEditModal();
              }}
            >
              취소
            </StButton>
          </StButtonWrapper>
        </StForm>
      </StModalContent>
    </StModalContainer>
  );
};

export default PostEditModal;

// styled-components - ProfileEditModal 동일
const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const StModalContent = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StInput = styled.input`
  padding: 10px;
  font-size: medium;
  width: 100%; // 추가
`;

const StButton = styled.button`
  flex: 1;
  padding: 5px 10px;
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
