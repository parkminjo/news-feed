import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import { useAuth } from '../Hooks/useAuth';

const Router = () => {
  const { isLogin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isLogin ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
