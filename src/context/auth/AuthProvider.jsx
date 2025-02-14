import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  });

  const value = { isLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
