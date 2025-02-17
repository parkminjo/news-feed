import { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';

const BioEditModal = ({ onClose, loginedUser, currentBio, handleBioUpdated }) => {
  const [bio, setBio] = useState(currentBio || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bio.trim().legth === 0) {
      alert('소개글을 입력해주세요.');
      return;
    }

    if (bio === currentBio) {
      alert('변경 사항이 없습니다. 소개글을 수정해주세요.');
      return;
    }

    const { error } = await supabase.from('userExtraData').update({ bio }).eq('user_id', loginedUser.id);
    if (error) throw error;

    handleBioUpdated(bio);
    onClose();
  };

  return (
    <StModalContainer onClick={onClose}>
      <StModalContent onClick={(e) => e.stopPropagation()}>
        <StForm onSubmit={handleSubmit}>
          <StTextarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="새로운 소개글을 입력하세요." />
          <StButtonWrapper>
            <StButton type="submit">변경</StButton>
            <StButton onClick={onClose}>취소</StButton>
          </StButtonWrapper>
        </StForm>
      </StModalContent>
    </StModalContainer>
  );
};

export default BioEditModal;

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

const StTextarea = styled.textarea`
  padding: 10px;
  font-size: medium;
  height: 100px;
  resize: none;
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
