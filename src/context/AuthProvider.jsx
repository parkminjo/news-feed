import { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 반환값의 구조에 따라 subscription을 추출합니다.
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsLogin(true);
        setUser(session.user);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    isLogin,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
