<h3>디테일 페이지 구현 사항</h3>
<table border="1">
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
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ features
│  │  │  ├─ Common
│  │  │  │  └─ SearchBar.jsx
│  │  │  ├─ Home
│  │  │  │  └─ PostCard.jsx
│  │  │  ├─ Login
│  │  │  │  └─ LoginForm.jsx
│  │  │  ├─ Search
│  │  │  │  └─ SearchForm.jsx
│  │  │  └─ SignUp
│  │  │     └─ SignUpForm.jsx
│  │  ├─ layout
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ MainLayout.jsx
│  │  │  └─ SideBar.jsx
│  │  └─ modals
│  │     ├─ BookMarkModal.jsx
│  │     ├─ FollowListModal.jsx
│  │     ├─ FollowingListModal.jsx
│  │     ├─ PassWordSearchModal.jsx
│  │     ├─ PostCreateModal.jsx
│  │     ├─ PostDetailModal.jsx
│  │     ├─ PostEditModal.jsx
│  │     ├─ PostLikesListModal.jsx
│  │     └─ ProfileEditModal.jsx
│  ├─ constant.js
│  ├─ context
│  │  ├─ auth
│  │  │  ├─ AuthContext.js
│  │  │  ├─ AuthProvider.jsx
│  │  │  └─ useAuth.js
│  │  ├─ components
│  │  │  ├─ header
│  │  │  │  ├─ HeaderContext.js
│  │  │  │  ├─ HeaderProvider.jsx
│  │  │  │  └─ useHeader.js
│  │  │  └─ sidebar
│  │  │     ├─ SidebarContext.js
│  │  │     ├─ SidebarProvider.jsx
│  │  │     └─ useSidebar.js
│  │  ├─ post
│  │  │  ├─ PostContext.js
│  │  │  ├─ PostProvider.jsx
│  │  │  └─ usePost.js
│  │  └─ user
│  │     ├─ UserContext.js
│  │     ├─ UserProvider.jsx
│  │     └─ useUser.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyPage.jsx
│  │  ├─ ProfilePage.jsx
│  │  ├─ Search.jsx
│  │  └─ SignUp.jsx
│  ├─ services
│  │  └─ supabaseClient.js
│  ├─ shared
│  │  └─ Router.jsx
│  ├─ styles
│  │  ├─ GlobalStyle.jsx
│  │  ├─ color.js
│  │  └─ fontSize.js
│  └─ utils
│     ├─ fetchBookMarkState.js
│     ├─ fetchLikeState.js
│     ├─ fetchUserBookmarks.js
│     ├─ handleBookMarkClick.js
│     ├─ handleLikeClick.js
│     └─ passedTimeText.js
├─ vite.config.js
└─ yarn.lock

```
