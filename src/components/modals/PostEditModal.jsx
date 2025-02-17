import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styled from 'styled-components';

const PostEditModal = ({ title, contents, loginedUser, onClose, onSubmit }) => {
  const [newTitle, setNewTitle] = useState(title || '');
  const [newContents, setNewContents] = useState(contents || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title: newTitle, content: newContents })
      .eq('writer_id', loginedUser.id);
    if (error) throw error;
    else {
      onSubmit(newTitle, newContents);
      onClose();
    }
  };

  return (
    <StModalContainer onClick={onClose}>
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
          <StButtonWraaper>
            <StButton type="submit">변경</StButton>
            <StButton
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              취소
            </StButton>
          </StButtonWraaper>
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

const StButtonWraaper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
