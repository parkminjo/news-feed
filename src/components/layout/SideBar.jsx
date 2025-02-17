import styled from 'styled-components';
import { FiHome, FiSearch, FiHeart } from 'react-icons/fi';
import { FaRegBookmark } from 'react-icons/fa';
import { fontSize } from '../../styles/fontSize';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/components/sidebar/useSidebar';
import { useState } from 'react';
import BookMarkModal from '../modals/BookMarkModal';

const SideBar = () => {
  const { isSidebarExpand, setIsSidebarExpand } = useSidebar();
  const [isBookMarkOpen, setIsBookMarkOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <StContainer
        $isExpand={isSidebarExpand}
        onMouseEnter={() => setIsSidebarExpand(true)}
        onMouseLeave={() => setIsSidebarExpand(false)}
      >
        <StMenu>
          <StMenuItem onClick={() => navigate('/')}>
            <StIconWrapper>
              <FiHome />
            </StIconWrapper>
            <StText $isExpand={isSidebarExpand}>홈</StText>
          </StMenuItem>
          <StMenuItem onClick={() => navigate('/search')}>
            <StIconWrapper>
              <FiSearch />
            </StIconWrapper>
            <StText $isExpand={isSidebarExpand}>검색</StText>
          </StMenuItem>
          <StMenuItem>
            <StIconWrapper>
              <FiHeart />
            </StIconWrapper>
            <StText $isExpand={isSidebarExpand}>좋아요</StText>
          </StMenuItem>
          <StMenuItem onClick={() => setIsBookMarkOpen(true)}>
            <StIconWrapper>
              <FaRegBookmark />
            </StIconWrapper>
            <StText $isExpand={isSidebarExpand}>북마크</StText>
          </StMenuItem>
        </StMenu>
      </StContainer>

      {isBookMarkOpen && <BookMarkModal onClose={() => setIsBookMarkOpen(false)} />}
    </>
  );
};

export default SideBar;

/** styled component */
const StContainer = styled.div`
  width: ${({ $isExpand }) => ($isExpand ? '200px' : '70px')};
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  position: fixed;
  top: 47px;

  transition: width 0.25s ease-in-out;
  overflow: hidden;
  height: 100%;
`;

const StMenu = styled.ul`
  list-style: none;
`;

const StMenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  border-radius: 8px;
  color: #333333;

  &:hover {
    background: #f0f0f0;
  }
`;

const StIconWrapper = styled.span`
  margin-right: 12px;
  color: #555555;
  font-size: ${fontSize.large};
`;

const StText = styled.span`
  display: ${({ $isExpand }) => ($isExpand ? 'inline' : 'none')};
  color: #333333;
  font-size: ${fontSize.medium};
  white-space: nowrap; // 자동 줄바꿈 방지, 한줄로만 표시
`;
