import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../Common/SearchBar';
import { fontSize } from '../../../styles/fontSize';
import { supabase } from '../../../services/supabaseClient';
import SimplePostCard from './SimplePostCard';
import PostDetailModal from '../../modals/PostDetailModal';

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState(); // 디테일 핸들러 props

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    updateItem(searchValue, activeTab);
  }, [searchValue, activeTab]);

  const updateItem = async (searchQuery = '', tab) => {
    setIsLoading(true);
    try {
      let data = [];
      if (tab === 0) {
        const response = await supabase
          .from('posts')
          .select('*')
          .ilike('title', `%${searchQuery}%`)
          .order('created_at', { ascending: false });
        data = response.data || [];
        setUsers([]); // 계정 탭 데이터를 초기화
        setPosts(data);
      } else if (tab === 1) {
        const response = await supabase
          .from('userExtraData')
          .select('*')
          .ilike('nick_name', `%${searchQuery}%`)
          .order('nick_name', { ascending: true });
        data = response.data || [];
        setPosts([]); // 포스트 데이터를 초기화
        setUsers(data);
      } else if (tab === 2) {
        const { data: tags } = await supabase
          .from('postTags')
          .select('post_id')
          .eq('tag_name', searchQuery) // 정확히 일치하는 값만 찾음
          .order('created_at', { ascending: false });

        const tagData = tags || [];
        console.log(tagData);
        const postIds = tagData.map((item) => item.post_id);
        console.log(postIds);

        if (postIds.length > 0) {
          const { data: posts, error: postError } = await supabase
            .from('posts')
            .select('*')
            .in('id', postIds)
            .order('created_at', { ascending: false });

          if (postError) throw postError;
          data = posts || [];
        }
        setUsers([]); // 계정 탭 데이터를 초기화
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderNoResultsMessage = () => {
    return <StNoResultMessage>일치하는 결과가 없습니다.</StNoResultMessage>;
  };

  const handleTabChange = (index) => {
    if (activeTab === index) return;
    setActiveTab(index);
    updateItem(searchValue, index);
  };

  // 디테일 모달 열기 핸들러
  const handleOpenDetail = (postId) => {
    setIsDetailOpen(true);
    setPostId(postId);
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
      <StFeedWrapper>
        {isLoading ? (
          <StSpinner>Loading...</StSpinner>
        ) : activeTab === 0 ? (
          posts.length === 0 ? (
            renderNoResultsMessage()
          ) : (
            posts.map((post) => <SimplePostCard key={post.id} post={post} onClick={() => handleOpenDetail(post.id)} />)
          )
        ) : activeTab === 1 ? (
          users.length === 0 ? (
            renderNoResultsMessage()
          ) : (
            users.map((user) => (
              <StUserItem key={user.user_id}>
                <img src={user.profile_img} alt={user.nick_name} />
                <span>{user.nick_name}</span>
              </StUserItem>
            ))
          )
        ) : posts.length === 0 ? (
          renderNoResultsMessage()
        ) : (
          posts.map((post) => <SimplePostCard key={post.id} post={post} onClick={() => handleOpenDetail(post.id)} />)
        )}
        {isDetailOpen && (
          <PostDetailModal isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} postId={postId} />
        )}
      </StFeedWrapper>
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

const StFeedWrapper = styled.div`
  column-count: 1;
  column-gap: 16px;
  width: 100%;
  padding: 20px;

  @media (min-width: 600px) {
    column-count: 2;
  }

  @media (min-width: 900px) {
    column-count: 3;
  }

  @media (min-width: 1200px) {
    column-count: 4;
  }

  @media (min-width: 1500px) {
    column-count: 5;
  }

  @media (min-width: 1800px) {
    column-count: 6;
  }
`;

// const StFeedItem = styled.div`
//   width: 100%;
//   margin-bottom: 16px;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

//   img {
//     width: 100%;
//     height: auto;
//     min-height: 100px;
//     object-fit: cover;
//     border-radius: 10px;
//   }
// `;

const StUserItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
    min-height: 10px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  span {
    font-weight: bold;
  }
`;

const StNoResultMessage = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 8px;
  font-size: ${fontSize.medium};
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #f5c6cb;
`;

const StSpinner = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: ${fontSize.large};
  font-weight: bold;
  padding: 20px;
  color: #333;
`;
