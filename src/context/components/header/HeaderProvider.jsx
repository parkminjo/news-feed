import { useState, useRef, useEffect } from 'react';
import { HeaderContext } from './HeaderContext';
import { useAuth } from '../../auth/useAuth';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const HeaderProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginModalRef = useRef(null);
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    // 모달이 열린 상태에서만 외부 클릭 감지 활성화
    if (isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginOpen]);

  const handleAuthAction = async () => {
    if (isLogin) {
      await supabase.auth.signOut();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const value = { isLoginOpen, setIsLoginOpen, loginModalRef, handleAuthAction };

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};
