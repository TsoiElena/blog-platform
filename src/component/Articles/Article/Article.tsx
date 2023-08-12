import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { articleType, likeArticke, unlikeArticke } from '../../../redux/slice/articlsList-sliace';
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
    if (article.favorited && user && user.token) dispatch(unlikeArticke({ slug: article.slug, token: user.token }));
    if (!article.favorited && user && user.token) dispatch(likeArticke({ slug: article.slug, token: user.token }));
  };

  console.log(article);

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
      <div className={s['article-desc']}>{article.description}</div>
    </div>
  );
};

export default Article;
