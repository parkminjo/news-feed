import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { useRef, useState } from 'react';

const PostCreateModal = ({ isOpen, close }) => {
  if (!isOpen) {
    return null; // isOpen이 false면 렌더링하지 않음
  }
  
  const [imgPreview, setImagePreview] = useState(""); // img 파일이 imgPreview 상태에 Base64 문자열로 들어갈 것이기 때문에 기본값이 ""임
  const imgRef = useRef(); //useRef는 컴포넌트 안에서 DOM 요소나 값을 직접 참조!! ==> useState()를 사용할 때와 달리 input태그의 값에 직접 접근할 수 있어 불필요한 리렌더링을 줄일 수 있음

  const handleImgPreview = () => {
    const file = imgRef.current.files[0]  // imgRef.current는 input요소를 참조 => files는 그 input에서 선택한 파일들 => files[0]는 선택된 첫 번째 파일(preview용)
    const reader = new FileReader();  // FileReader 객체 생성 => new FileReader는 컴퓨터에게  "input에 들어가는 파일을 읽어서 JavaScript에서 사용할 수 있는 형태로 변환해줘!"라고 말하는 객체
    reader.readAsDataURL(file);   // .readAsDataURL은 이제 읽는 방식을 "JavaScript에서 사용할 수 있는 형태인 Base64 형식으로 변환해줘!"라고 말하는 거
    reader.onloadend = () => {    // 파일 읽기가 끝나면 실행
      setImagePreview(reader.result);  // 변환된 데이터 URL을 imgFile 상태에 저장 => 상태관리를 하는 것!
    };
  };

  return (
    <StOverlay>
      <StContainer>
        <StWrapper>
          <StForm>
            <h2>모달창</h2>
            <StCloseButton onClick={close}>닫기</StCloseButton>
            <StInputWrapper>
              <Stdiv>
                <img src={imgPreview ? imgPreview : null} />
                <label htmlFor="postImage">이미지 추가</label>
                <input type="file" accept='image/*, video/*' id='postImage' onChange={handleImgPreview} ref={imgRef}/>
              </Stdiv>
              <StTextInputWrapper>
                <StLabel>
                  제목
                  <input type="textarea" />
                </StLabel>
                <StLabel>
                  내용
                  <textarea name="" id=""></textarea>
                </StLabel>
                <StLabel>
                  태그
                  <input type="text" />
                </StLabel>
              </StTextInputWrapper>
            </StInputWrapper>
            <button type="submit">올리기</button>
          </StForm>
        </StWrapper>
      </StContainer>

    </StOverlay>
  );
};

export default PostCreateModal;

// ----------------------------------- styled-components 너무 많아 ㅠㅠㅠㅠㅠㅠ

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 처리 */
  ${flexCenter}
`;

const StContainer = styled.div`
  max-width: 70vw; /* 모달창 최대 크기 설정 */
  height: 90%;
  flex-direction: column;
  ${flexCenter};
  background-color: ${color.white}; /* 모달창 배경색 */
  border-radius: 10px;
  position: relative; /* 위치 설정 */
`;

const StWrapper = styled.div`
  width: 70vw;
  height: 800px;
  ${flexCenter};
  border-radius: 10px;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  ${flexCenter};
  flex-direction: column;

  button {
    padding: 10px 15px;
    background-color: ${color.main};
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const StInputWrapper = styled.div`
  width: 100%;
  ${flexCenter};
`;

const Stdiv = styled.div`
  width: 40%;
  margin: 5%;
  min-height: 500px;
  ${flexCenter};
  border: 5px dotted ${color.gray};
  border-radius: 10px;
  position: relative; /* 추가된 부분 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  label {
    color: ${color.main};
    font-size: ${fontSize.large};
    font-weight: 700;
    cursor: pointer;
    display: ${({imgPreview}) => imgPreview? 'none' : 'block'} // imgPreview 값이 "true"이면 label display를 "none"으로 바꾸기
  };

  input {
    display: none;
  }
`;

const StTextInputWrapper = styled.div`
  width: 50%;
  height: 90%;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: large;
`;

const StLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 700;

  input {
    width: 28vw;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
  }

  textarea {
    min-width: 30vw;
    min-height: 15vh;
  }
`;

const StCloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

// 보통은 branch 기능별로 만들어서 커밋푸시 하긴 한다.
