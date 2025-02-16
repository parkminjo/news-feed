import { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../Common/SearchBar';
import { fontSize } from '../../../styles/fontSize';

const SearchForm = () => {
  const searchBarStyle = {
    fontSize: fontSize.medium
  };

  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['제목', '계정', '태그'];

  return (
    <StContainer>
      <SearchBar style={searchBarStyle} />
      <StTabMenu>
        {tabs.map((tab, index) => (
          <StTab key={index} isActive={activeTab === index} onClick={() => setActiveTab(index)}>
            {tab}
          </StTab>
        ))}
      </StTabMenu>
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

const StTab = styled.button`
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
