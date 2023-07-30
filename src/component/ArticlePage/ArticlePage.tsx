import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Space } from 'antd';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getArticle } from '../../redux/slice/article-slice';
import Article from '../Articles/Article/Article';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import Preloader from '../Preloader/Preloader';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './article.module.scss';

const ArticlePage = () => {
  const { id } = useParams();
  const { isLoading, article, error } = useAppSelector((state) => state.acticlePage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;

  console.log(article);

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
