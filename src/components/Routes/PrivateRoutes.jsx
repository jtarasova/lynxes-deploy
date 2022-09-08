import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Form from '../Form';
import GetFact from '../GetFact';
import Posts from '../Posts';

export default function PrivateRoutes({ posts, setPosts }) {
  return (
    <Routes>
      <Route path="/posts" element={<Posts allPosts={posts} setPosts={setPosts} />} />
      <Route path="/addpost" element={<Form setPosts={setPosts} allPosts={posts} />} />
      <Route path="/fact" element={<GetFact />} />
    </Routes>
  );
}
