import React from 'react';

export default function OnePost({ post, deleteHandler }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2>
          {post.title}
        </h2>
        <div>
          author:
          {' '}
          {post.User.login}
        </div>
        <button onClick={() => deleteHandler(post.id)} type="button" className="btn btn-outline-danger">delete</button>
      </div>
    </div>
  );
}
