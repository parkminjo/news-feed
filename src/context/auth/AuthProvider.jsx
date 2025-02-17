import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginedUser, setLoginedUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsLogin(true);
        setLoginedUser(session.user);
      } else {
        setIsLogin(false);
        setLoginedUser(null);
      }
    });
  });

  const value = { isLogin, loginedUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
