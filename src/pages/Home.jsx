import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';
import styled from 'styled-components';

import { useState } from 'react';
import BookMarkModal from '../components/modals/BookMarkModal';

const Home = () => {
  return <div>Home</div>;
};

export default Home;

/** styled component */
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StMainContent = styled.main`
  display: flex;
  flex: 1;
`;

const StContentWrapper = styled.div`
  padding: 10px;
`;
