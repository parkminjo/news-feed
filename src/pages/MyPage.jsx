import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  max-width: 900px;
  width: 100%;

  border: 1px solid black;
  margin-top: 100px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickName = styled.h2`
  font-size: large;
  margin-bottom: 20px;
`;

const ProfileStats = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;

  li {
    margin-right: 20px;
    font-size: medium;
  }
`;

const PostGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
`;

const PostItem = styled.div`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  height: 150px;
`;

const MyPage = () => {
  useEffect(() => {});

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src="" alt="" />
        <ProfileInfo>
          <NickName>NickName</NickName>
          <ProfileStats>
            <li>게시물 1</li>
            <li>팔로워 1</li>
            <li>팔로잉 1</li>
          </ProfileStats>
        </ProfileInfo>
      </ProfileHeader>
      <PostGrid>
        <PostItem>게시물1</PostItem>
        <PostItem>게시물2</PostItem>
        <PostItem>게시물3</PostItem>
        <PostItem>게시물4</PostItem>
        <PostItem>게시물5</PostItem>
        <PostItem>게시물6</PostItem>
      </PostGrid>
    </ProfileContainer>
  );
};

export default MyPage;
