import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../Common/SearchBar';
import { fontSize } from '../../../styles/fontSize';
import { supabase } from '../../../services/supabaseClient';

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getPost = async (searchQuery = '') => {
    try {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${searchQuery}%`) // 제목에 검색어 포함된 데이터 가져오기
        .order('created_at', { ascending: false }); // 최신순 정렬
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost(searchValue);
  }, [searchValue]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    // 탭 클릭 시 해당 탭에 맞는 데이터 가져오기
    getPost(searchValue);
  };

  const searchBarStyle = {
    fontSize: fontSize.medium
  };
  const tabs = ['제목', '계정', '태그'];

  return (
    <StContainer>
      <SearchBar style={searchBarStyle} value={searchValue} setValue={setSearchValue} />
      <StTabMenu>
        {tabs.map((tab, index) => (
          <StTab key={index} isActive={activeTab === index} onClick={() => handleTabChange(index)}>
            {tab}
          </StTab>
        ))}
      </StTabMenu>
      <StFeedGrid>
        {posts.map((post) => (
          <StFeedItem key={post.id}>
            <img src={post.image_url} alt={post.title} />
          </StFeedItem>
        ))}
      </StFeedGrid>
    </StContainer>
  );
};

export default SearchForm;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTabMenu = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const StTab = styled.button.withConfig({
  // isActive 속성은 직접 만든 것이므로 HTML 태그가 속성을 인식하지 못해
  // 에러를 유발한다. shouldForwardProp를 사용해 DOM에 전달하지 않도록 한다.
  shouldForwardProp: (prop) => prop !== 'isActive'
})`
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSize.medium};
  color: ${(props) => (props.isActive ? '#000' : '#999')};
  border-bottom: ${(props) => (props.isActive ? '2px solid #000' : 'none')};

  &:hover {
    color: #000;
  }
`;

const StFeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  width: 100%;
  padding: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1800px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const StFeedItem = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  img {
    width: 100%;
    height: auto; // 세로 크기는 이미지 비율에 맞게 자동 조정
    object-fit: cover;
    border-radius: 10px;
  }
`;
