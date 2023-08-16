import React, { useEffect } from 'react';
import { Pagination, Space } from 'antd';

import { changePage, getArticles } from '../../redux/slice/articlsList-sliace';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import Preloader from '../Preloader/Preloader';

import Article from './Article/Article';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './arcticlesList.module.scss';

const ArticlesList = () => {
  const { page, totalPage, error, articles, isLoading } = useAppSelector((state) => state.acticlesListPage);
  const { user } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.token) {
      dispatch(getArticles({ page: page, token: user.token }));
    } else {
      dispatch(getArticles({ page: page }));
    }
  }, [page]);

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;

  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '26px' }} align={'center'}>
      <div className={s.article}>
        {articles.length &&
          articles.map((article) => (
            <div key={article.slug} className={s['cont-art']}>
              <Article article={article} />
            </div>
          ))}
      </div>
      <Pagination
        current={page}
        total={totalPage}
        onChange={(p) => dispatch(changePage(p))}
        showSizeChanger={false}
        defaultPageSize={1}
        className="center"
        hideOnSinglePage={true}
      />
    </Space>
  );
};

export default ArticlesList;
