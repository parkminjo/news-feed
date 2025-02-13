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
              <input type="file" accept="image/*, video/*" id="postImage" onChange={handleImgPreview} ref={imgRef} />
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
  min-height: 500px; // height으로 하면 이미지가 추가되기 전까지 Stdiv내부에 하얀 박스가 생김
  max-height: 500px; // ???? 위에 달린 주석을 이유로 이 코드를 살렸는데.... 진짜 긴 사진 넣으니까 max-height를 넘어버림!!!!!
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
  justify-content: space-around;
  display: flex;
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
  ${BtnStyle}
  position: absolute;
  right: 10px;
  top: 10px;
`;

//-----------------------------------------------------------------------------------------------supabase 연습

////----------------------------------------------------------------연습 1 : 외부데이터 내부로 가져오기 & form

// import { createClient } from '@supabase/supabase-js';
// import React, {useEffect} from 'react';
// import { supabase } from '../../services/supabaseClient';

// // "태그"를 DB에서 가져오는 함수
// const TemporaryFuncName = () => {
//   const [tags, setTags] = useState([]);
//   const [tag, setTag] = useState("");

//   useEffect(() => {
//     // 1. 데이터를 가져오는 함수 (***실패할 수도 있는 요청이니 try catch로 감싸기***)
//     const getTags = async () => {
//       try {
//         const {data, error} = await supabase.from("tags").select("*") //외부(supabase)에서 데이터를 가져옴 (tags테이블에 있는 데이터 모두)
//         if (error) throw error;
//         setTags(data); // 가져온 데이터를 setTags에 넣으므로서 외부데이터를 내부에서 관리 가능한 상태로 만듬
//         } catch (error) {
//         console.log(error);
//       }
//     };
//       // 2. 실행
//       getTags();
//   }, []);

//   // 이 함수를 실행할 떄 status: 401(unauthorized)이 나오면 RLS
//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     await supabase.from("tags").insert({tag});
//    //여기에 동기화 로직!!!!!!을 만들어서 supabase DB에도 들어가는 동.시.에. 화면에도 렌더링 되게 만들어야 함
//     console.log("tags => ", tags);
//     setTags((prev) => [
//       ...prev,
//       {
//         todo: todo,
//         created_at: data[0],
//         writer_id: data[0], // session으로 얻어오는 법?????? 뭐지?????
//         id: data[0].id, // id는 supabase가 자동으로 만들어주는 것!
//       },
//     ]);
//    };

//   // 가져온 외부데이터 내부데이터로 바꿨으니 이제 렌더링 하기
//   return (
//     // form 에 들어갈 "내용" 칸
//         <input
//           type="text"
//           placeholder='태그를 입력하세요'
//           value={tag}
//           onChange={(e) => setTag(e.target.value)}
//         />
//         <button onClick={handleAddTag}>추가</button>

//         <input list="tagList" id="tagsList">
//         <datalist id="tagsList">
//           {tags.map((tag) => {
//             
//            })
// <option value="">
//       
//       {tags.map((tag, index) => (   // 아래 <div>태그 사이 렌더링은 숫자 리스트처럼 렌더링된다. (예시: 1. 왈왈왈)
//         <div key={tag.id}>
//           {index + 1}. {tag.tag}
//         </div> // 특강 영상에서 id와 tag는 실제 데이터 테이블(?)에 있는 열으로 콘솔에서 확인 가능했다.
//         ))}
//     </div>
//   );

// };

// export default TemporaryFuncName;
