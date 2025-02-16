import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

// 각 element에서 value가 독립적으로 동작
const SearchBar = ({ style, value, setValue }) => {
  return (
    <StContainer>
      <StSearchInputWrapper>
        <StIconWrapper>
          <FaSearch />
        </StIconWrapper>
        <StSearchInput
          type="text"
          placeholder="검색"
          style={style}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </StSearchInputWrapper>
    </StContainer>
  );
};

export default SearchBar;

const StContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 15px;
`;

const StSearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const StIconWrapper = styled.div`
  position: absolute;
  left: 15px;
  color: #999;
  font-size: 18px;
`;

// 외부에서 전달된 style 적용
const StSearchInput = styled.input`
  width: ${(props) => props.style?.width || '100%'};
  padding: ${(props) => props.style?.padding || '10px 10px 10px 40px'};
  font-size: ${(props) => props.style?.fontSize || '12px'};
  border: ${(props) => props.style?.border || '2px solid #ccc'};
  border-radius: ${(props) => props.style?.borderRadius || '30px'};
  background: ${(props) => props.style?.background || '#f8f8f8'};
  outline: none;
  box-shadow: ${(props) => props.style?.boxShadow || '0px 2px 5px rgba(0, 0, 0, 0.1)'};

  &:focus {
    border-color: ${(props) => props.style?.focusBorderColor || '#007bff'};
  }
`;
