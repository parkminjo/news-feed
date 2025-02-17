import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import { useAuth } from '../context/auth/useAuth';
import MainLayout from '../components/layout/MainLayout';
import ProfilePage from '../pages/ProfilePage';

const Router = () => {
  const { isLogin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isLogin ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
