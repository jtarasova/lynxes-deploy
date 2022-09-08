import React from 'react';
import OnePost from './OnePost';

export default function Posts({ allPosts, setPosts }) {
  const deleteHandler = async (id) => {
    const response = await fetch(`/api/v1/posts/${id}`, { method: 'delete' });
    if (response.ok) {
      setPosts((prev) => prev.filter((el) => el.id !== id));
    }
  };
  return (
    <div>
      {allPosts?.length ? allPosts.map((el) => <OnePost key={el.id} post={el} deleteHandler={deleteHandler} />) : 'No posts yet'}
    </div>
  );
}
