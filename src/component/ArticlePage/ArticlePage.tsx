import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Space } from 'antd';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getArticle } from '../../redux/slice/articlsList-slice';
import Article from '../Articles/Article/Article';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import Preloader from '../Preloader/Preloader';

import s from './article.module.scss';

const ArticlePage = () => {
  const { id } = useParams();
  const { isLoading, article, error, success } = useAppSelector((state) => state.acticlesListPage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;
  if (success) return <div>Deleted</div>;

  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '26px' }} align={'center'}>
      <div className={s.article}>
        {article && <Article article={article} page={true} />}
        {article && <ReactMarkdown>{article.body}</ReactMarkdown>}
      </div>
    </Space>
  );
};

export default ArticlePage;
