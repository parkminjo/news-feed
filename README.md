소개글
저희 어플리케이션은 고양이 사진을 3개이상 올리지 않으면 불법이라는 말이 있듯이 웹 애플리케이션입니다. 이 프로젝트는 React를 기반으로 하며, Supabase를 백엔드로 활용하여 사용자 인증, 데이터 관리, 실시간 업데이트 등의 기능을 구현했습니다.

<img src="./경로/이미지파일명.png" alt="대체 텍스트" width="300" />
주요 기능

React Context API를 사용한 프로필 상태 관리 (ProfileContext.js 참고: ProfileContext)
기술 스택
Frontend: React, styled-components
Backend: Supabase (데이터베이스, 인증, 실시간 기능)
Routing: react-router-dom

public
│ ├── img
│ │ └── LoginCat.png
│ └── vite.svg
├── src
│ ├── App.jsx
│ ├── assets
│ │ └── react.svg
│ ├── components
│ │ ├── features
│ │ │ ├── Common
│ │ │ │ └── SearchBar.jsx
│ │ │ ├── Home
│ │ │ │ └── PostCard.jsx
│ │ │ ├── Login
│ │ │ │ └── LoginForm.jsx
│ │ │ ├── Search
│ │ │ │ ├── SearchForm.jsx
│ │ │ │ └── SimplePostCard.jsx
│ │ │ └── SignUp
│ │ │ └── SignUpForm.jsx
│ │ ├── layout
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ ├── MainLayout.jsx
│ │ │ └── SideBar.jsx
│ │ └── modals
│ │ ├── BioEditModal.jsx
│ │ ├── BookMarkModal.jsx
│ │ ├── FollowListModal.jsx
│ │ ├── FollowingListModal.jsx
│ │ ├── NicknameEditModal.jsx
│ │ ├── PassWordSearchModal.jsx
│ │ ├── PostCreateModal.jsx
│ │ ├── PostDetailModal.jsx
│ │ ├── PostEditModal.jsx
│ │ └── PostLikesListModal.jsx
│ ├── constant.js
│ ├── context
│ │ ├── auth
│ │ │ ├── AuthContext.js
│ │ │ ├── AuthProvider.jsx
│ │ │ └── useAuth.js
│ │ ├── components
│ │ │ ├── header
│ │ │ │ ├── HeaderContext.js
│ │ │ │ ├── HeaderProvider.jsx
│ │ │ │ └── useHeader.js
│ │ │ └── sidebar
│ │ │ ├── SidebarContext.js
│ │ │ ├── SidebarProvider.jsx
│ │ │ └── useSidebar.js
│ │ ├── post
│ │ │ ├── PostContext.js
│ │ │ ├── PostProvider.jsx
│ │ │ └── usePost.js
│ │ ├── profile
│ │ │ ├── ProfileContext.js
│ │ │ └── ProfileProvider.jsx
│ │ └── user
│ │ ├── UserContext.js
│ │ ├── UserProvider.jsx
│ │ └── useUser.js
│ ├── main.jsx
│ ├── pages
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── MyPage.jsx
│ │ ├── ProfilePage.jsx
│ │ ├── Search.jsx
│ │ └── SignUp.jsx
│ ├── services
│ │ └── supabaseClient.js
│ ├── shared
│ │ └── Router.jsx
│ ├── styles
│ │ ├── GlobalStyle.jsx
│ │ ├── color.js
│ │ ├── fontSize.js
│ │ └── profileUistyles.js
│ └── utils
│ ├── fetchBookMarkState.js
│ ├── fetchLikeState.js
│ ├── fetchUserBookmarks.js
│ ├── handleBookMarkClick.js
│ ├── handleLikeClick.js
│ └── passedTimeText.js
