import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import { AuthProvider } from '../context/AuthProvider';

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
