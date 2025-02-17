import { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3897f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProfileEditModal = ({ onClose, loginedUser, currentNickName, onProfileUpdated }) => {
  const [nickname, setNickname] = useState(currentNickName || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 업데이트 쿼리: userExtraData 테이블에서 해당 사용자의 닉네임 업데이트
    const { error } = await supabase
      .from('userExtraData')
      .update({ nick_name: nickname })
      .eq('user_id', loginedUser.id);
    if (error) {
      console.error('프로필 업데이트 오류:', error.message);
    } else {
      // 업데이트 성공하면 부모에게 알림
      onProfileUpdated(nickname);
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>프로필 수정</h3>
        <Form onSubmit={handleSubmit}>
          <label>
            닉네임:
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="새 닉네임 입력"
            />
          </label>
          <Button type="submit">저장</Button>
        </Form>
        <Button onClick={onClose} style={{ marginTop: '10px', backgroundColor: 'gray' }}>
          취소
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
