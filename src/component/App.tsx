import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserFromlocal } from '../redux/slice/login-slice';

import './App.css';
import Header from './Header/Header';
import ArticlesList from './Articles/ArticlesList';
import ArticlePage from './ArticlePage/ArticlePage';
import SingUp from './forms/SingUp';
import SingIn from './forms/SingIn';
import EditProfile from './forms/EditProfile';
import ArticleForm from './forms/ArticleForm';

function App() {
  const { user } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserFromlocal());
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />}></Route>
        <Route path="/sign-up" element={user ? <Navigate to="/" replace /> : <SingUp />}></Route>
        <Route path="/sign-in" element={user ? <Navigate to="/" replace /> : <SingIn />}></Route>
        <Route path="/profile" element={user ? <EditProfile /> : <Navigate to="/" replace />}></Route>
        <Route path="/new-article" element={user ? <ArticleForm /> : <Navigate to="/" replace />}></Route>
        <Route path="/articles/:id/edit" element={user ? <ArticleForm /> : <Navigate to="/" replace />}></Route>
        <Route path="/:id" element={<ArticlePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
