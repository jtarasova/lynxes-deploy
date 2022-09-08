import React, { useState } from 'react';

export default function GetFact() {
  const [fact, setFact] = useState('');
  const [todos, setTodos] = useState([]);
  const getFact = () => {
    fetch('/fact').then((res) => res.json()).then((data) => setFact(data.fact.facts));
  };
  const getTodo = () => {
    fetch('http://localhost:3001/api/v1/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data.DB));
  };
  return (
    <>
      {console.log(todos)}
      <div>{fact}</div>
      <button className="btn btn-success" type="button" onClick={getFact}>get</button>
      {todos?.length ? todos.map((el) => <div>{el.title}</div>) : 'No todos'}
      <button className="btn btn-secondary" type="button" onClick={getTodo}>todo</button>
    </>
  );
}
