import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { useRef, useState, useEffect} from 'react';
import { supabase } from '../../services/supabaseClient';

const PostCreateModal = ({ isOpen, close }) => {
  const [imgPreview, setImagePreview] = useState(''); // img 파일이 imgPreview 상태에 Base64 문자열로 들어갈 것이기 때문에 기본값이 ""임
  const imgRef = useRef(null); // useRef는 컴포넌트 안에서 DOM 요소나 값을 직접 참조!! ==> useState()를 사용할 때와 달리 input태그의 값에 직접 접근할 수 있어 불필요한 리렌더링을 줄일 수 있음
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '', tags: '', img: '' });
  const { title, content } = post;

  useEffect(() => {
    // supabase에서 posts 테이블 데이터를 가져오는 함수 (***실패할 수도 있는 요청이니 try catch로 감싸기***)
    const getPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*'); //외부(supabase)에서 데이터를 가져옴 (posts테이블에 있는 데이터 모두)
        if (error) throw error;
        setPosts(data); // 가져온 데이터를 setPosts에 넣으므로서 외부데이터를 내부에서 관리 가능한 상태로 만듬
        console.log('데이터 확인 ==>', data);
      } catch (error) {
        console.log(error);
      }
    };
    // 2. 실행
    getPosts();
  }, [supabase]);

  // postImage업로드 함수
  const handleImgUpload = async (e) => {
    const postImgFile = e.target.files[0];
    const fileName = `${Date.now()}_${postImgFile.name}`; // 고유한 파일 이름을 만들기 위해 시간을 추가함
    // supabase storage에 파일 업로드
    const { error } = await supabase.storage.from('post_images').upload(fileName, postImgFile);
    // 에러 발생 시 실행될 기능
    if (error) {
      console.log('포스트 이미지 파일 업로드 중 에러 발생 ==> ', error);
      return;
    }
    // 업로드한 이미지의 public URL 가져오기
    const {data} = supabase.storage.from('post_images').getPublicUrl(fileName); // 이전에 만들어둔 post_images이름의 버켓에서 이미지 파일의 publicUrl을 가져온다
    const publicURL = data.publicUrl;
    // 이미지 url을 posts 테이블에 저장
    setPost((prev) => ({...prev, img: publicURL}));
  }
  

  // 이 함수를 실행할 떄 status: 401(unauthorized)이 나오면 RLS 관련 문제
  const handleAddPost = async (e) => {
    e.preventDefault();

    const { data } = await supabase.auth.getSession(); // supabase에서 세션정보(현재 로그인한 유저의 정보)를 받아와서 그 데이터를 sessionData라는 이름의 변수로 저장
    const user = data.session?.user; // getSession에 있는 data라는 객체안에 있는 session이라 객체안에서 user라는 키워드의 값을 가져와 user라는 이름의 변수로 지정 / ?. <== 이거는 Optional Chaining란 것으로 속성이 없을 떄 undefined를 반환해 오류가 발생하지 않게 함!

    const { data: newPostData, error } = await supabase.from('posts').insert([post]).select(); // 해석: .from('posts') = posts라는 이름의 테이블에서 -> .insert(post) = post라는 이름으로 새로운 게시물 추가 -> .select() = 그렇게 추가한 데이터를 다시 가져옴 & data에 넣음 / 여기서 post는 데이터베이스에 추가될 데이터를 담고 있는 자바스크립트 객체의 이름 / .insert대신 비교하고 업데이트와 추가 둘 중 하나를 실행하는 .upsert도 있지만 게시글 추가는 말 그대로 "추가"를 하는 기능이라 보고 .insert를 사용했다.

    if (error) {
      console.log('게시글 추가 중 에러 발생 => ', error);
      return; // return을 사용하여 에러 발생 시 함수를 종료시킨다.
    }

    setPosts((prev) => [
      //여기에 동기화 로직!을 만들어서 supabase테이블에도 들어가는 동시에 화면에도 렌더링 되게 구현
      ...prev, // ...prev, {...} 의 의미 ==> 기존의 게시글 목록은 그대로 유지하면서, 새로운 게시글을 추가한다는 것!
      {
        id: newPostData[0].id, // id는 supabase가 자동으로 만들어준다!
        created_at: newPostData[0].created_at,
        writer_id: user?.id, // session으로 가져오도록 바꿔주기
        title: newPostData[0].title,
        content: newPostData[0].content,
        img: newPostData[0].img,
        tag: newPostData[0].tags
      }
    ]);
  };

  // isOpen이 true일 때만 모달창을 여는 함수
  if (!isOpen) {
    return null;
  }

  const handleResetImgPreview = () => {
    setImagePreview('');
  };

  // 게시글 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetImgPreview();
    await handleAddPost(); // handleAddPost가 비동기 함수라 앞에 await가 필요하다.
    alert('폼이 제출되었습니다!');
    close();
  };

  // 이미지 미리보기 함수
  const handleImgPreview = (e) => {
    const imgFile = e.target.files[0]; // 1) imgRef.current는 input요소를 참조 => files는 그 input에서 선택한 파일들 => files[0]는 선택된 첫 번째 파일(preview용)
    if (!imgFile) {
      // 이미지 파일이 없으면 함수를 종료
      return;
    }
    const reader = new FileReader(); // 2) FileReader 객체 생성 => new FileReader는 컴퓨터에게  "input에 들어가는 파일을 읽어서 JavaScript에서 사용할 수 있는 형태로 변환해줘!"라고 말하는 객체
    reader.readAsDataURL(imgFile); // 3) .readAsDataURL은 이제 읽는 방식을 "JavaScript에서 사용할 수 있는 형태인 Base64 형식으로 변환해줘!"라고 말하는 거
    reader.onloadend = () => {
      // 파일 읽기가 끝나면 실행
      setImagePreview(reader.result); // 4) 변환된 데이터 URL을 imgFile 상태에 저장 => 상태관리를 하는 것!
    };
  };

  return (
    <StOverlay>
      <StContainer>
        <StForm onSubmit={handleSubmit}>
          <h2>모달창</h2>
          <StCloseButton
            type="button"
            onClick={() => {
              close();
              setPost({ title: '', content: '', tags: '', img: '' });
              handleResetImgPreview();
            }}
          >
            닫기
          </StCloseButton>
          <StInputWrapper>
            <Stdiv imgPreview={imgPreview}>
              <label htmlFor="postImage">이미지 추가</label>
              <img src={imgPreview ? imgPreview : undefined} alt="이미지 미리보기 실패" /> {/* undefined와 null중에 뭐가 나을지 잘 모르겠다. null은 빈값으로 오류없이 작동할 확률이 높고, undefined는 오류로 해석될 수 있어 디버깅이 쉽지 않을까? */}
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                id="postImage"
                onChange={(e) => {
                  handleImgUpload(e);
                  handleImgPreview(e);
                }}
                ref={imgRef}
                required
              />
            </Stdiv>
            <StTextInputWrapper>
              <StLabel>
                제목
                <input type="text" required onChange={(e) => setPost((prev) => ({ ...post, title: e.target.value }))} />
                {/*개별 데이터가 아닌 post를 useState로 관리해주고 있기 때문에 setPost에 기존 데이터를 유지하면서 개별데이터를(title, content 등등) 추가하는 방식으로 작성*/}
              </StLabel>
              <StLabel>
                내용
                <textarea required onChange={(e) => setPost({ ...post, content: e.target.value })}></textarea>
              </StLabel>
              <StLabel>
                태그
                <input type="text" required onChange={(e) => setPost({ ...post, tags: e.target.value })} />
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

// ----------------------------------- styled-components

// 겹치는 디자인이 많은 관계로 디자인용 2 변수를 생성
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
  font-weight: 700;
  color: ${color.white};
`;

const StOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 배경 어둡게 처리
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

  h2 {
    margin: 25px;
    color: ${color.main};
  }
`;

const StSubmitButton = styled.button`
  ${BtnStyle}
  position: absolute;
  bottom: 20px; // 모달 내부에서 하단에 위치하도록 설정
  right: 50%;
  transform: translateX(50%);
`;

const StInputWrapper = styled.div`
  width: 100%;
  ${flexCenter};
`;

const Stdiv = styled.div`
  width: 40%;
  margin: 0 5% 5% 5%;
  height: 500px;
  ${flexCenter}
  border: ${({ imgPreview }) =>
    imgPreview ? 'none' : `5px dotted ${color.gray}`}; // input에 이미지 파일이 들어오지 않았을 때만 테투리 구현
  border-radius: 10px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px; // 이미지 비율 유지하면서 부모요소의 크기에 맞춤
    display: ${({ imgPreview }) => (!imgPreview ? 'none' : 'block')};
  }

  label {
    color: ${color.main};
    cursor: pointer;
    font-size: ${fontSize.medium};
    font-weight: 800;
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
    width: 30vw;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
  }

  textarea {
    min-width: 30vw;
    min-height: 15vh;
    border-radius: 10px;
  }
`;

const StCloseButton = styled.button`
  ${BtnStyle}
  position: absolute;
  right: 10px;
  top: 10px;
`;
