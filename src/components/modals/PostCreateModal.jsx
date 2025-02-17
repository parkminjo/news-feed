import styled from 'styled-components';
import { color } from '../../styles/color';
import { fontSize } from '../../styles/fontSize';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import * as React from 'react';

const PostCreateModal = ({ isPostCreateOpen, onClose }) => {
  const [imgPreview, setImagePreview] = useState(''); // img 파일이 imgPreview 상태에 Base64 문자열로 들어갈 것이기 때문에 기본값이 ""임
  const imgRef = useRef(null); // useRef는 컴포넌트 안에서 DOM 요소나 값을 직접 참조!! ==> useState()를 사용할 때와 달리 input태그의 값에 직접 접근할 수 있어 불필요한 리렌더링을 줄일 수 있음
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '', tags: '', img: '' });
  const { title, content } = post;
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const fetchEnumTags = async () => {
      try {
        // Supabase에서 enum 값을 가져오는 쿼리
        const { data, error } = await supabase.rpc('get_enum_values', { enum_name: 'tag_name' });
        if (error) throw error;
        setTagOptions(data); // 가져온 태그 목록을 상태에 저장
      } catch (err) {
        console.error('태그 목록 가져오기 실패:', err);
      }
    };
    fetchEnumTags();
  }, []);

  useEffect(() => {
    // supabase에서 posts 테이블 데이터를 가져오는 함수 (***실패할 수도 있는 요청이니 try catch로 감싸기***)
    const getPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*'); //외부(supabase)에서 데이터를 가져옴 (posts테이블에 있는 데이터 모두)
        if (error) throw error;
        setPosts(data); // 가져온 데이터를 setPosts에 넣으므로서 외부데이터를 내부에서 관리 가능한 상태로 만듬
        // console.log('데이터 확인 ==>', data);
      } catch (error) {
        console.log(error);
      }
    };
    // 2. 실행
    getPosts();
  }, [supabase]);

  // 사용자가 파일을 선택하면 호출되는 함수
  const handleImageChange = (e) => {
    console.log(e.target.files); // 파일 입력에서 첫 번째 파일을 가져와서 image 상태에 저장합니다.
    setImage(e.target.files[0]);
  };



  // postImage업로드 함수
  const handleImgUpload = async () => {
    // 만약 이미지가 선택되지 않았다면 함수를 종료
    if (!image) {
      return;
    }
    const imageExt = image.name.split('.').pop(); // 확장자 추출
    let baseName = image.name.replace(`.${imageExt}`, ''); // 확장자 제거한 파일명
    // 1️⃣ 특수문자, 공백, 한글을 안전한 문자(_)로 변환
    baseName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
    baseName = baseName.replace(/_+/g, '_'); // 연속된 _ 제거
    baseName = baseName.substring(0, 50); // 너무 긴 파일명 제한
    // supabase의 스토리지에 이미지를 업로드
    const { data, error } = await supabase.storage
      .from('post_images') // post_images 버킷에 업로드
      .upload(`public/${baseName}`, image); // `public`폴더에 이미지 이름으로 저장 ==> 이 "이미지 이름이라는 건 뭐지??? 뽀로로대장.jpeg같은걸까???"
    // 업로드 중 오류 발생 시 콘솔에 오류 메시지 출력
    if (error) {
      console.error('이미지 업로드 실패. 에러 발생 ==> ', error.message);
    } else {
      console.log('이미지 업로드 성공:', data); // 업로드 성공 시 자축 메시지 콘솔에 출력
    }
    const postImgUrl = `https://abtgpogydlsfqgmzgunp.supabase.co/storage/v1/object/public/${data.fullPath}`;
    return postImgUrl;
  };

  // 이 함수를 실행할 떄 status: 401(unauthorized)이 나오면 RLS 관련 문제
  const handleAddPost = async (e) => {
    e.preventDefault();
    const { data: userData } = await supabase.auth.getUser(); // supabase에서 세션정보(현재 로그인한 유저의 정보)를 받아와서 그 데이터를 userData라는 이름의 변수로 저장
    const user = userData.user; // getUser 있는 data라는 객체안에 있는 user라는 키워드의 값을 가져와 user라는 이름의 변수로 지정 / ?. <== 이거는 Optional Chaining란 것으로 속성이 없을 떄 undefined를 반환해 오류가 발생하지 않게 함!
    console.log(user);

    const imgUrl = await handleImgUpload(); // handleImgUpload의 반환값을 받아 사용

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title: post.title, content: post.content, img: imgUrl, writer_id: user?.id }]); // 해석: .from('posts') = posts라는 이름의 테이블에서 -> .insert(post) = post라는 이름으로 새로운 게시물 추가 / 여기서 post는 데이터베이스에 추가될 데이터를 담고 있는 자바스크립트 객체의 이름 / .insert대신 비교하고 업데이트와 추가 둘 중 하나를 실행하는 .upsert도 있지만 게시글 추가는 말 그대로 "추가"를 하는 기능이라 보고 .insert를 사용했다.
    if (error) {
      console.log('게시글 추가 중 에러 발생 => ', error);
      return; // return을 사용하여 에러 발생 시 함수를 종료시킨다.
    }

    const { data: selectData, error: selectError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (selectError) {
      console.log('게시글 조회 중 에러 발생 => ', selectError);
      return;
    }

    setPosts((prev) => [...prev, selectData[0]]);
  };

  // isPostCreateOpen이 true일 때만 모달창을 여는 함수
  if (!isPostCreateOpen) {
    return null;
  }

  const handleResetImgPreview = () => {
    setImagePreview('');
  };

  // 게시글 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddPost(e); // handleAddPost가 비동기 함수라 앞에 await가 필요하다.
    alert('폼이 제출되었습니다!');
    handleResetImgPreview();
    onClose();
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
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링을 막는 함수 ==> "이제 내 위로(내 이상의 부모요소로) 이벤트를 보내지마!"
              setPost({ title: '', content: '', tags: '', img: '' });
              handleResetImgPreview();
              onClose();
            }}
          >
            닫기
          </StCloseButton>
          <StInputWrapper>
            <Stdiv imgPreview={imgPreview}>
              {' '}
              {/*imgPreview라 하면 대문자가 있어 React가 해석하지 못함 */}
              <label htmlFor="postImage">이미지 추가</label>
              <img src={imgPreview ? imgPreview : undefined} alt="이미지 미리보기 실패" />{' '}
              {/* undefined와 null중에 뭐가 나을지 잘 모르겠다. null은 빈값으로 오류없이 작동할 확률이 높고, undefined는 오류로 해석될 수 있어 디버깅이 쉽지 않을까? */}
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                id="postImage"
                onChange={(e) => {
                  handleImageChange(e);
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
                <input type="text" required onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))} />
                {/*개별 데이터가 아닌 post를 useState로 관리해주고 있기 때문에 setPost에 기존 데이터를 유지하면서 개별데이터를(title, content 등등) 추가하는 방식으로 작성*/}
              </StLabel>
              <StLabel>
                내용
                <textarea required onChange={(e) => setPost({ ...post, content: e.target.value })}></textarea>
              </StLabel>
              <StLabel>
                태그
                <input type="text" required onChange={(e) => setPost({ ...post, tags: e.target.value })} />
                {/* <input list="post-tags" required onChange={(e) => setPost({ ...post, tags: e.target.value })} />
                <datalist id='post-tags'>
                  {태그이름무언가.map((태그이름) => {
                    return (
                      <option value=""></option>
                    )
                  })}
                </datalist> */}
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

const Stdiv = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'imgPreview' // imgPreview를 사용해 동적으로 스타일링 되므로, 이때 imgPreview가 엉뚱하게 DOM으로 전달되지 않도록 설정
})`
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
    display: ${({ imgPreview }) => (imgPreview ? 'block' : 'none')};
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
    padding: 10px;
  }
`;

const StCloseButton = styled.button`
  ${BtnStyle}
  position: absolute;
  right: 10px;
  top: 10px;
`;
