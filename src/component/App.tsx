import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import ArticlesList from './Articles/ArticlesList';
import ArticlePage from './ArticlePage/ArticlePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />}></Route>
        <Route path="/:id" element={<ArticlePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
