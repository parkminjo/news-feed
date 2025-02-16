import styled from 'styled-components';
import SearchBar from '../Common/SearchBar';

const SearchForm = () => {
  const searchBarStyle = {
    fontSize: '18px'
  };

  return (
    <StContainer>
      <SearchBar style={searchBarStyle} />
      <StTabMenu>
        <StTab>제목</StTab>
        <StTab>계정</StTab>
        <StTab>태그</StTab>
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
`;

const StTab = styled.button`
  padding: 8px 16px;
  border: none;
  background: #f1f1f1;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #e0e0e0;
  }
`;
