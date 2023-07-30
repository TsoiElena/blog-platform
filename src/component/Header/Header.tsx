import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './header.module.scss';

const Header = () => {
  return (
    <div className={s.header}>
      <Link to="/" className={s['header-text']}>
        <span>Realworld Blog</span>
      </Link>
      <div className={s['header-linkContainer']}>
        <a className={`${s['header-text']}`}>Sign In</a>
        <a className={`${s['header-text']} ${s['header-link--buttonTheme']}`}>Sign Up</a>
      </div>
    </div>
  );
};

export default Header;
