import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form({ setPosts }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: input }),
    }).then((res) => res.json())
      .then((data) => {
        setPosts((prev) => [...prev, data]);
        navigate('/posts');
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
          <input onChange={changeHandler} value={input} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
