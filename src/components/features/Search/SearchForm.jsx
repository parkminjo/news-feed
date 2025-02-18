import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../Common/SearchBar';
import { fontSize } from '../../../styles/fontSize';
import { supabase } from '../../../services/supabaseClient';
import SimplePostCard from './SimplePostCard';
import PostDetailModal from '../../modals/PostDetailModal';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState(() => {
    // 로컬 저장소에서 탭 상태를 불러온다. 없으면 기본값 0을 사용
    const savedTab = localStorage.getItem('activeTab');
    return savedTab ? parseInt(savedTab) : 0;
  });

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [postId, setPostId] = useState();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]); // 태그 목록 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    updateItem(searchValue, activeTab);
  }, [searchValue, activeTab]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

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
        setUsers([]);
        setPosts(data);
      } else if (tab === 1) {
        const response = await supabase
          .from('userExtraData')
          .select('*')
          .ilike('nick_name', `%${searchQuery}%`)
          .order('nick_name', { ascending: true });
        data = response.data || [];
        setPosts([]);
        setUsers(data);
      } else if (tab === 2) {
        const { data: tags } = await supabase
          .from('postTags')
          .select('post_id')
          .eq('tag_name', searchQuery) // 정확히 일치하는 값만 찾음
          .order('created_at', { ascending: false });

        const tagData = tags || [];
        const postIds = tagData.map((item) => item.post_id);

        if (postIds.length > 0) {
          const { data: posts, error: postError } = await supabase
            .from('posts')
            .select('*')
            .in('id', postIds)
            .order('created_at', { ascending: false });

          if (postError) throw postError;
          data = posts || [];
        }
        setUsers([]);
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 실행 초기에 db에 enum 타입으로 저장된 tag를 불러온다.
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await supabase.rpc('get_tag_enum_values'); // rpc 함수를 사용해 tag 데이터를 가져온다.
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTabChange = (index) => {
    if (activeTab === index) return;
    setActiveTab(index);
    updateItem(searchValue, index);
  };

  const handleTagClick = (tag) => {
    setSearchValue(tag); // 태그 클릭 시 SearchBar에 텍스트 덮어씌우기
  };

  const renderNoResultsMessage = () => {
    return <StNoResultMessage>일치하는 결과가 없습니다.</StNoResultMessage>;
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
      <SearchBar style={searchBarStyle} value={searchValue} setValue={setSearchValue} readOnly={true} />
      <StTabMenu>
        {tabs.map((tab, index) => (
          <StTab key={index} isActive={activeTab === index} onClick={() => handleTabChange(index)}>
            {tab}
          </StTab>
        ))}
      </StTabMenu>
      {activeTab === 2 ? (
        <StTagTabWrapper>
          <StTagWrapper>
            {tags.map((tag) => (
              <StTagBlock key={tag.tag_name} onClick={() => handleTagClick(tag.tag_name)}>
                {tag.tag_name}
              </StTagBlock>
            ))}
          </StTagWrapper>
        </StTagTabWrapper>
      ) : null}
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
              <StUserItem key={user.user_id} onClick={() => navigate(`/profile/${user.user_id}`)}>
                {user.profile_img ? (
                  <img src={user.profile_img} alt={user.nick_name} />
                ) : (
                  <FaUserCircle size={40} /> // 프로필 이미지가 없으면 기본 아이콘 표시
                )}
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

const StUserItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #cecece;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    min-height: 10px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-weight: bold;
    margin-left: 10px;
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

const StTagTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 50%;
`;

const StTagWrapper = styled.div`
  display: inline-block;
  padding: 10px;
  border: 2px dashed #999999;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const StTagBlock = styled.button`
  margin: 8px;
  padding: 8px 16px;
  background-color: #dddddd;
  border: 1px solid #ccc;
  border-radius: 16px;
  cursor: pointer;
  font-size: ${fontSize.medium};
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }

  &:active {
    background-color: #d0d0d0;
  }
`;
