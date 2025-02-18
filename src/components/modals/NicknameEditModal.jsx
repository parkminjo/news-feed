import { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';

const NicknameEditModal = ({ onClose, loginedUser, currentNickName, handleNicknameUpdated }) => {
  const [nickname, setNickname] = useState(currentNickName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickname === currentNickName) {
      alert('변경 사항이 없습니다. 닉네임을 변경해주세요');
      return;
    }
    const { error } = await supabase
      .from('userExtraData')
      .update({ nick_name: nickname })
      .eq('user_id', loginedUser.id);
    if (error) throw error;
    else {
      handleNicknameUpdated(nickname);
      onClose();
    }
  };

  return (
    <StModalContainer onClick={onClose}>
      <StModalContent onClick={(e) => e.stopPropagation()}>
        <StForm onSubmit={handleSubmit}>
          <StInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새 닉네임 입력"
          />
          <StButtonWraaper>
            <StButton type="submit">변경</StButton>
            <StButton onClick={onClose}>취소</StButton>
          </StButtonWraaper>
        </StForm>
      </StModalContent>
    </StModalContainer>
  );
};

export default NicknameEditModal;

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

const StInput = styled.input`
  padding: 10px;
  font-size: medium;
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
