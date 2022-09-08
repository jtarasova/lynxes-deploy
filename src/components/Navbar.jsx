import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const response = await fetch('/api/v1/users/logout');
    if (response.ok) {
      setUser(null);
      navigate('/');
    }
  };
  return (

    <nav className="navbar bg-light">
      <div className="container">
        {!user ? (
          <>
            {' '}
            <Link to="/signIn">SignIn</Link>
            <Link to="/signUp">SignUp</Link>
          </>
        ) : (
          <>
            {' '}
            <div>
              Hello,
              {user}
              !
            </div>
            <Link to="/posts">Posts</Link>
            <Link to="/addpost">Add Post</Link>
            <Link to="/fact">Get Fact</Link>
            <a onClick={logoutHandler}>Logout</a>
          </>
        )}

      </div>
    </nav>
  );
}
