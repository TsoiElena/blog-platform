import React from 'react';
import format from 'date-fns/format';
import { message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { articleType, deleteArticle, likeArticle, unlikeArticle } from '../../../redux/slice/articlsList-sliace';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import unLike from '../../../assets/heart 1.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import like from '../../../assets/path4.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './article.module.scss';

type ArticleProps = {
  article: articleType;
  page?: boolean;
};

const Article: React.FC<ArticleProps> = ({ article, page = false }) => {
  const { user } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();
  const date = new Date(article.createdAt);

  const handleLike = () => {
    if (user && !user.token) return alert('Need Auth');
    if (article.favorited && user && user.token) dispatch(unlikeArticle({ slug: article.slug, token: user.token }));
    if (!article.favorited && user && user.token) dispatch(likeArticle({ slug: article.slug, token: user.token }));
  };

  const confirm = () => {
    if (!user) return;
    dispatch(deleteArticle({ token: user.token, slug: article.slug }));
    message.success('Click on Yes');
  };

  const cancel = () => {
    message.error('Click on No');
  };

  return (
    <div className={s.article}>
      <div className={s['article-info']}>
        <div className={s['article-article--info']}>
          <div className={s['article-title-like']}>
            {page ? (
              <div className={s['article-title']}>{article.title}</div>
            ) : (
              <Link to={`/${article.slug}`} className={s['article-title']}>
                {article.title}
              </Link>
            )}
            <div className={s['article-like']}>
              <img src={article.favorited ? like : unLike} alt="" onClick={handleLike} />
              <span className={s['like-text']}>{article.favoritesCount}</span>
            </div>
          </div>
          <div className={s['article-tags']}>
            {article.tagList &&
              article.tagList.map((tag, index) => (
                <div key={index} className={s['article-tag']}>
                  {tag}
                </div>
              ))}
          </div>
        </div>
        <div className={s['article-author']}>
          <div>
            <div className={s.author}>{article.author.username}</div>
            <div className={s['author-date']}>{format(date, 'PP')}</div>
          </div>
          <div>
            <img className={s['author-img']} src={article.author.image} alt="" />
          </div>
        </div>
      </div>
      <div className={s.block}>
        <div className={s['article-desc']}>{article.description}</div>
        {user?.username === article.author.username && page && (
          <div className={s['block-button']}>
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement={'right'}
            >
              <button className={s['block-button-delete']}>Delete</button>
            </Popconfirm>
            <Link to={`/articles/${article.slug}/edit`} state={article} className={s['block-button-edit']}>
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
