import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { useRef, useState } from 'react';
import { BiFontColor } from 'react-icons/bi';

const PostCreateModal = ({ isOpen, close }) => {
  // useState와 useRef가 if문 위에 있어야 경고(?) 코드가 안 뜨지만, 이러면 모달창은 닫았다 열어도 이미지가 그대로 남아있음 (정보는 x)(submit버튼을 눌렀을 땐 이미지도 초기화됨)
  const [imgPreview, setImagePreview] = useState(''); // img 파일이 imgPreview 상태에 Base64 문자열로 들어갈 것이기 때문에 기본값이 ""임
  const imgRef = useRef(null); //useRef는 컴포넌트 안에서 DOM 요소나 값을 직접 참조!! ==> useState()를 사용할 때와 달리 input태그의 값에 직접 접근할 수 있어 불필요한 리렌더링을 줄일 수 있음

  if (!isOpen) {
    return null; // isOpen이 false면 렌더링하지 않음
  }

  const handleImgPreview = () => {
    const file = imgRef.current.files[0]; // imgRef.current는 input요소를 참조 => files는 그 input에서 선택한 파일들 => files[0]는 선택된 첫 번째 파일(preview용)
    const reader = new FileReader(); // FileReader 객체 생성 => new FileReader는 컴퓨터에게  "input에 들어가는 파일을 읽어서 JavaScript에서 사용할 수 있는 형태로 변환해줘!"라고 말하는 객체
    reader.readAsDataURL(file); // .readAsDataURL은 이제 읽는 방식을 "JavaScript에서 사용할 수 있는 형태인 Base64 형식으로 변환해줘!"라고 말하는 거
    reader.onloadend = () => {
      // 파일 읽기가 끝나면 실행
      setImagePreview(reader.result); // 변환된 데이터 URL을 imgFile 상태에 저장 => 상태관리를 하는 것!
    };
  };

  return (
    <StOverlay>
      <StContainer>
          <StForm> 
            <h2>모달창</h2>
            <StCloseButton onClick={close}>닫기</StCloseButton>
            <StInputWrapper>
              <Stdiv imgPreview={imgPreview}>
                <label htmlFor="postImage">이미지 추가</label>
                <img src={imgPreview ? imgPreview : null} />
                <input type="file" accept="image/*, video/*" id="postImage" onChange={handleImgPreview} ref={imgRef} required/>
              </Stdiv>
              <StTextInputWrapper>
                <StLabel>
                  제목
                  <input type="textarea" required/>
                </StLabel>
                <StLabel>
                  내용
                  <textarea required></textarea>
                </StLabel>
                <StLabel>
                  태그
                  <input type="text" required/>
                </StLabel>
              </StTextInputWrapper>
            </StInputWrapper>
            <StSubmitButton type="submit">올리기</StSubmitButton>
          </StForm>
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

const BtnStyle = `
  padding: 10px 15px;
  background-color: ${color.main};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${fontSize.medium};
  color: ${BiFontColor.white};
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
  min-width: 70vw; // 모달창 최대 크기 설정
  height: 90%;
  flex-direction: column;
  ${flexCenter};
  background-color: ${color.white}; // 모달창 배경색
  border-radius: 10px;
  position: relative; // 위치 설정
  box-sizing: border-box;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  ${flexCenter};
  flex-direction: column;
`;

const StSubmitButton = styled.button`
  ${BtnStyle}
  position: absolute;
  bottom: 20px; /* 모달 내부에서 하단에 위치하도록 설정 */
  right: 50%;
  transform: translateX(50%);
`;

const StInputWrapper = styled.div`
  width: 100%;
  ${flexCenter};
`;

const Stdiv = styled.div`
  width: 40%;
  margin: 5%;
  height: 500px;
  ${flexCenter}
  border: ${({ imgPreview }) => (imgPreview ? 'none' : `5px dotted ${color.gray}`)};
  border-radius: 10px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 이미지 비율 유지하면서 부모요소의 크기에 맞춤
    display: ${({ imgPreview }) => (!imgPreview ? 'none' : 'block')};
  }

  label {
    color: ${color.main};
    cursor: pointer;
    display: ${({ imgPreview }) =>
      imgPreview ? 'none' : 'block'}; // imgPreview 값이 "true"이면 label display를 "none"으로 바꾸기
  }

  input {
    display: none;
  }
`;

const StTextInputWrapper = styled.div`
  width: 50%;
  height: 90%;
  flex-direction: column;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  font-size: large;
  gap: 70px;
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
  ${BtnStyle}
  position: absolute;
  right: 10px;
  top: 10px;
`;

