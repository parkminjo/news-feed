<h1>냥덕을 위한 이 곳은 바로 🐱CATTALE🐱</h1>
<h2>프로젝트 개요</h2>
- 프로젝트명 : 고양이 집사 커뮤니티 - 캣테일(CatTale)
- 소개 : 고양이 집사 커뮤니티는 고양이와 살아가는 집사들이 자신들의 생활과 고양이 사진을 공유하고 어울릴 수 있는 공간입니다.

<h2>프로젝트 구조</h2>
<h3>DB Structure</h3>

<h3>기술스택</h3>
<!-- React -->
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<!-- Vite -->
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<!-- Vercel -->
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<!-- HTML5 -->
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<!-- Styled-Components -->
<img src="https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<!-- React-Router-Dom -->
<img src="https://img.shields.io/badge/React%20Router%20Dom-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<!-- Supabase -->
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
<!-- ESLint -->
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<!-- Prettier -->
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

<h2>주요 기능 소개</h2>
<h3>여기에 주제 추가해 주세요</h3>

<h3>디테일 페이지 구현 사항</h3>
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
    <td><a href="https://github.com/Sumin-Lee12">이수민</a><br><span>PM, 글 작성 페이지</span></td>
    <td><a href="https://github.com/mbdyjk">고용준</a><br><span>메인 레이아웃, 검색창 페이지</span></td>
    <td><a href="https://github.com/ye21iin">김예린</a><br><span>게시글 디테일 페이지</span></td>
    <td><a href="https://github.com/shoney02">김시헌</a><br><span>북마크 페이지</span></td>
    <td><a href="https://github.com/parkminjo">박민조</a><br><span>로그인&회원가입 페이지, 메인 페이지</span></td>
    <td><a href="https://github.com/woozizi">최종욱</a><br><span>마이 페이지, 프로필 수정</span></td>
  </tr>
</table>

<h3>Project Tree</h3>
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

```
