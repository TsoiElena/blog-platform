import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../redux/slice/login-slice';

import s from './header.module.scss';

const Header = () => {
  const { user } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();
  return (
    <div className={s.header}>
      <Link to="/" className={s['header-text']}>
        <span>Realworld Blog</span>
      </Link>
      {user ? (
        <div className={s['header-profileContainer']}>
          <Link
            to="/new-article"
            className={`${s['header-text']} ${s['header-link--buttonTheme']} ${s['header-create']}`}
          >
            Create article
          </Link>
          <Link to="/profile" className={s['header-profile']}>
            <div className={s['header-profile-username']}>{user.username}</div>
            <img
              className={s['header-profile-avatar']}
              src={user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt=""
            />
          </Link>
          <button
            className={`${s['header-text']} ${s['header-link--buttonTheme']} ${s['header-logout']}`}
            onClick={() => dispatch(logOut())}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className={s['header-linkContainer']}>
          <Link to="/sign-in" className={`${s['header-text']}`}>
            Sign In
          </Link>
          <Link to="/sign-up" className={`${s['header-text']} ${s['header-link--buttonTheme']}`}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
