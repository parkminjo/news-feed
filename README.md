<h1>냥덕을 위한 이 곳은 바로 🐱CATTALE🐱</h1>
<h2>🎙️ 프로젝트 개요</h2>

- 프로젝트명 : 고양이 집사 커뮤니티, **캣테일(CatTale)**!

- 소개 : 무슨무슨 법에 의해서 **고양이 사진**을 3개 이상 올리지 않으면 불법인 거 아세요? 고양이 집사 커뮤니티 캣테일은 고양이와 살아가는 집사들이 자신들의 생활과 고양이 사진을 공유하고 어울릴 수 있는 공간입니다. 고양이를 향한 당신의 사심을 채워보세요!
-
- **캣테일**은 **React**와 **Supabase**를 활용한 서버리스 뉴스피드 웹 애플리케이션입니다. **styled-components** 기반의 컴포넌트 스타일링을 적용하고, React의 **Context API**로 전역 상태 관리를 구현했습니다. **react-router-dom**을 사용해 효율적인 클라이언트 사이드 라우팅을 제공하며, Supabase를 이용하여 백엔드 서비스를 구축했습니다. **Git, GitHub, Vercel**을 활용해 프로젝트 관리 및 배포를 처리했습니다.

<h2>🗂️ 캣테일 미리보기</h2>

- 여기에 미리보기 영상을 넣어주세요..

![링크 여기에]()

<h2>⚙️ 프로젝트 구조</h2>
<h3>🌱 Ideation on Figma</h3>
<img src="https://i.ibb.co/yczJS55t/2025-02-18-10-29-40.png">

<h3>🔨 DB Structure</h3>
<img src="https://i.ibb.co/Kx09x8PS/2025-02-18-10-49-20.png">

<h3>전역 상태 관리 with Context API</h3>
- **설명**: context 구조를 설정하여, 앱 전역과 컴포넌트 전역으로 사용되는 훅을 구분한다.
- **세부사항**:
  - **앱 전역**: 인증, 게시물, 사용자 정보에 대한 context
  - **컴포넌트 전역**: 공통 레이아웃인 `MainLayout`에 대해 context 방식 선제 적용

<h3>🪜 Stacks</h3>

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=redux&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Prettier](https://img.shields.io/badge/prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)

![StyledComponents](https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)
![react-router-dom](https://img.shields.io/badge/react--router--dom-CA4245?style=flat-square&logo=react-router&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Excalidraw](https://img.shields.io/badge/Excalidraw-6965DB?style=flat-square&logo=excalidraw&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-4B32C3?style=flat-square&logo=eslint&logoColor=white)

<h2>⭐ 주요 기능 소개</h2>
<h3>🔨 로그인 / 회원가입 기능 </h3>

<p> - supabase에서 제공하는 회원가입과 로그인 기능을 이용하여 구현</p>

<table border="1" style="table-layout: fixed; width: 100%;">
  <tr>
    <th>C (Create)</th>
    <th>R (Read)</th>
    <th>U (Update)</th>
    <th>D (Delete)</th>
  </tr>
  <tr>
    <td>회원가입</td>
    <td>로그인 및 인증</td>
    <td>-</td>
    <td>-</td>
  </tr>
</table>

<h3>🔨 메인 페이지</h3>

<h4>메인 레이아웃 구성</h4>

- 설명: 앱 내부에 공통으로 사용되는 레이아웃을 구성한다.
- 세부사항:

  - `header` 컴포넌트에는 로고, 알림(미구현), 프로필 요소가 포함
    - 프로필: 로그인/로그아웃 기능 동작 버튼, 개인 페이지로 넘어가는 버튼 존재
  - `sidebar` 컴포넌트에는 홈, 검색, 북마크, 글 작성 탭이 포함
    - 마우스 hover 시, 확장되는 애니메이션 효과 추가

- 작성된 게시글을 최신순으로 표출 / 좋아요와 북마크 기능을 추가

<table border="1" style="table-layout: fixed; width: 100%;">
  <tr>
    <th>C (Create)</th>
    <th>R (Read)</th>
    <th>U (Update)</th>
    <th>D (Delete)</th>
  </tr>
  <tr>
    <td>좋아요 추가<br>북마크 추가</td>
    <td>게시글 작성자 표시<br>업로드 시간 표시<br>게시글 이미지 표시</td>
    <td>-</td>
    <td>좋아요 취소<br>북마크 취소</td>
  </tr>
</table>

<h3>🔨 마이페이지 / 프로필</h3>

<table border="1" style="table-layout: fixed; width: 100%;">
  <tr>
    <th>C (Create)</th>
    <th>R (Read)</th>
    <th>U (Update)</th>
    <th>D (Delete)</th>
  </tr>
  <tr>
    <td>
      - 소개글 작성<br>
    </td>
    <td>
      - 회원가입 시 등록한 사진 가져오기<br>
      - 닉네임 정보 가져오기<br>
      - 게시글 수 가져오기<br>
      - 게시글 가져오기<br>
      - 소개글 가져오기<br>
    </td>
    <td>
      - 소개글 수정<br>
      - 닉네임 수정<br>
    </td>
    <td>
    </td>
  </tr>
</table>

<h3>🔨 북마크 기능</h3>

<h3>🔨 게시글 작성</h3>

<h3>🔨 디테일 페이지</h3>

<table border="1" style="table-layout: fixed; width: 100%;">
  <tr>
    <th>C (Create)</th>
    <th>R (Read)</th>
    <th>U (Update)</th>
    <th>D (Delete)</th>
  </tr>
  <tr>
    <td>댓글 업로드<br>북마크 추가</td>
    <td>포스트 내용 표시<br>댓글 표시<br>포스트 업데이트 시간 표시<br>사진 표시<br>포스트 제목 표시</td>
    <td>내 글 수정</td>
    <td>내 글 삭제<br>내 댓글 삭제<br>북마크 삭제</td>
  </tr>
</table>

<h3>🔨 탐색 탭</h3>

- **설명**: 피드, 사용자를 검색할 수 있는 기능을 구현한다.
- **세부사항**:
  - **컴포넌트 구분**: 검색창 페이지 폼 형태인 `SearchForm`에 대해 `SearchBar`, `SimplePostCard` 두 개의 주요 컴포넌트 분리
    - `SearchBar` 컴포넌트는 다른 곳에서도 사용할 수 있도록 확장성 있게 작성
    - `SimplePostCard` 컴포넌트는 Home에서 피드 표시에 사용하는 `PostCard` 컴포넌트 기반으로 작성
  - **검색 기능**: 검색바에 검색어 입력시 실시간 검색 발생
    - 데이터 query가 완료되어 표시 준비가 끝나면 화면에 표시, 검색 중에는 대체 텍스트 표시
    - 검색 결과가 존재하지 않을 경우 대체 표시 ui 구성
  - **검색 방식 다양화**: 제목, 계정, 태그에 따른 검색 기능
    - `제목`, `태그`의 검색 결과는 게시물 형태로 표시
    - `계정`의 검색 결과는 프로필, 닉네임 포함된 박스 형태로 표시

<h2>🔥 TroubleShooting</h2>
<h4>0️⃣ [React/뉴스피드] 리액트 모달 열고닫기 👉🏻 <a href="https://velog.io/@ye21iin/React%EB%89%B4%EC%8A%A4%ED%94%BC%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%AA%A8%EB%8B%AC-%EC%97%B4%EA%B3%A0%EB%8B%AB%EA%B8%B0">링크</a></h4>
<h4>1️⃣ [React] 리액트 팀에 문의해볼 사람?  👉🏻 <a href="https://velog.io/@ye21iin/React">링크</a></h4>
<h4>2️⃣ [트러블 슈팅] 난 분명 supabaseURL을 작성했는데 왜 콘솔창 너는 없다하는 거야...?  👉🏻 <a href="https://velog.io/@suminlee0409/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%EB%82%9C-%EB%B6%84%EB%AA%85-supabaseURL%EC%9D%84-%EC%9E%91%EC%84%B1%ED%96%88%EB%8A%94%EB%8D%B0-%EC%99%9C-%EC%BD%98%EC%86%94%EC%B0%BD-%EB%84%88%EB%8A%94-%EC%97%86%EB%8B%A4%ED%95%98%EB%8A%94-%EA%B1%B0%EC%95%BC">링크</a></h4>
<h4>3️⃣ TIL 25_02_18 | 트러블슈팅: 로그인했는데 undefined...  👉🏻 <a href="https://velog.io/@shoney02/TIL-250218-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%96%88%EB%8A%94%EB%8D%B0-undefined">링크</a></h4>

<h3>👩‍💻 Developers of CatTale</h3>
<table border="1" style="table-layout: fixed; width: 100%;">
  <tr>
    <td><img src="https://ca.slack-edge.com/T06B9PCLY1E-U081PDNMJUC-89f6d2d0d6f9-512" width="150" height="150" /></td>
    <td><img src="https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F198fd683-95af-47cc-a21f-6097470b26a0%2Fimage.png?table=block&id=03bf68ad-34e5-4ea6-bea3-839b93755324&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=570&userId=&cache=v2" width="150" height="150" /></td>
    <td><img src="https://ca.slack-edge.com/T06B9PCLY1E-U085UV7EFJ8-2d508440fcb7-512" width="150" height="150" /></td>
    <td><img src="https://ca.slack-edge.com/T06B9PCLY1E-U0826AQQD8D-21212b12fa34-512" width="150" height="150" /></td>
    <td><img src="https://ca.slack-edge.com/T06B9PCLY1E-U08091A9WCA-96a193c11de1-512" width="150" height="150" /></td>
    <td><img src="https://ca.slack-edge.com/T06B9PCLY1E-U085TP6610T-d80baf6fe23e-512" width="150" height="150" /></td>
  </tr>
  </tr>
  <tr>
    <td><a href="https://github.com/Sumin-Lee12">이수민</a><br><p>PM</p><p>글 작성 페이지</p></td>
    <td><a href="https://github.com/mbdyjk">고용준</a><br><p>메인 레이아웃</p><p>검색창 페이지</p></td>
    <td><a href="https://github.com/ye21iin">김예린</a><br><p>게시글 디테일 페이지</p></td>
    <td><a href="https://github.com/shoney02">김시헌</a><br><p>북마크 페이지</p></td>
    <td><a href="https://github.com/parkminjo">박민조</a><br><p>로그인&회원가입 페이지</p><p>메인 페이지</p></td>
    <td><a href="https://github.com/woozizi">최종욱</a><br><p>마이 페이지</p><p>프로필 페이지</p></td>
  </tr>
</table>

<h3>🌳 Project Tree</h3>

```
news-feed
├─ .prettierrc
├─ LICENSE
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package.json
├─ public
│  ├─ img
│  │  └─ LoginCat.png
│  └─ vite.svg
├─ src
│  ├─ App.jsx // Router 컴포넌트 렌더링
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ features
│  │  │  ├─ Common
│  │  │  │  └─ SearchBar.jsx // 검색어 입력
│  │  │  ├─ Home
│  │  │  │  └─ PostCard.jsx // 메인 페이지 피드
│  │  │  ├─ Login
│  │  │  │  └─ LoginForm.jsx // 로그인
│  │  │  ├─ Search
│  │  │  │  ├─ SearchForm.jsx // 검색 결과 필터링
│  │  │  │  └─ SimplePostCard.jsx // 탐색 탭 피드
│  │  │  └─ SignUp
│  │  │     └─ SignUpForm.jsx // 회원가입
│  │  ├─ layout // 공통 레이아웃
│  │  │  ├─ Header.jsx
│  │  │  ├─ MainLayout.jsx
│  │  │  └─ SideBar.jsx
│  │  └─ modals
│  │     ├─ BioEditModal.jsx // 소개글 수정
│  │     ├─ BookMarkModal.jsx // 북마크 표시
│  │     ├─ NicknameEditModal.jsx // 닉네임 수정
│  │     ├─ PostCreateModal.jsx // 게시글 작성 모달
│  │     ├─ PostDetailModal.jsx // 게시글 디테일 모달
│  │     └─ PostEditModal.jsx // 게시글 수정 기능
│  ├─ context
│  │  ├─ auth // 사용자 인증
│  │  │  ├─ AuthContext.js
│  │  │  ├─ AuthProvider.jsx
│  │  │  └─ useAuth.js
│  │  └─ components // 공통 컴포넌트
│  │     ├─ header
│  │     │  ├─ HeaderContext.js
│  │     │  ├─ HeaderProvider.jsx
│  │     │  └─ useHeader.js
│  │     └─ sidebar
│  │        ├─ SidebarContext.js
│  │        ├─ SidebarProvider.jsx
│  │        └─ useSidebar.js
│  ├─ hooks
│  │  └─ usePosts.js // DB 포스트 데이터를 가져오는 커스텀 훅
│  ├─ main.jsx // 애플리케이션 엔트리 포인트
│  ├─ pages
│  │  ├─ Home.jsx // 메인 페이지
│  │  ├─ Login.jsx // 로그인
│  │  ├─ MyPage.jsx // 마이페이지
│  │  ├─ ProfilePage.jsx // 프로필 페이지
│  │  ├─ Search.jsx // 검색 페이지
│  │  └─ SignUp.jsx // 회원가입
│  ├─ services
│  │  └─ supabaseClient.js // Supabase 클라이언트 인스턴스
│  ├─ shared
│  │  └─ Router.jsx // 앱 라우팅 로직 관리
│  ├─ styles
│  │  ├─ GlobalStyle.jsx
│  │  ├─ color.js
│  │  ├─ fontSize.js
│  │  └─ profileUistyles.js
│  └─ utils
│     ├─ fetchBookMarkState.js
│     ├─ fetchLikeState.js
│     ├─ fetchUserBookmarks.js
│     ├─ handleBookMarkClick.js
│     ├─ handleLikeClick.js
│     └─ passedTimeText.js
├─ vercel.json
├─ vite.config.js
└─ yarn.lock
```
