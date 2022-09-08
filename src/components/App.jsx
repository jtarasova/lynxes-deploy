import React, { useState } from 'react';
import Navbar from './Navbar';
import AllRoutes from './Routes/AllRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';

export default function App({ userLogin, allPosts }) {
  const [user, setUser] = useState(userLogin || null);
  const [posts, setPosts] = useState(allPosts || null);

  return (
    <div className="p-2">
      <Navbar user={user} setUser={setUser} />
      {!user
        ? <AllRoutes setUser={setUser} />
        : <PrivateRoutes posts={posts} setPosts={setPosts} /> }
    </div>
  );
}
