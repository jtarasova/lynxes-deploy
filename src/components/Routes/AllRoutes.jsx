import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

export default function AllRoutes({ setUser }) {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn setUser={setUser} />} />
      <Route path="/signup" element={<SignUp setUser={setUser} />} />
    </Routes>
  );
}
