import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Space } from 'antd';
import { Link } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { singIn } from '../../redux/slice/login-slice';

import { EMAIL_REGEXP } from './SingUp';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './singup.module.scss';

type Inputs = {
  email: string;
  password: string;
};

const SingIn = () => {
  const { isLoading, error } = useAppSelector((state) => state.loginSlice);
  const state = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();

  console.log(state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    dispatch(singIn(userData));
    console.log(data);
  };

  if (isLoading) return <Preloader />;

  return (
    <Space direction="vertical" style={{ width: '100%' }} align={'center'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.singUp}>
        <span className={s['singUp-title']}>Sign In</span>

        <span className={s.label}>Email address</span>
        <input
          placeholder="Email address"
          {...register('email', { required: true, validate: (value) => EMAIL_REGEXP.test(value) })}
          aria-invalid={errors.email || error ? 'true' : 'false'}
        />
        {errors.email && errors.email.type === 'required' && <span className={s.error}>This field is required</span>}
        {errors.email && errors.email.type === 'validate' && <span className={s.error}>Enter valid email</span>}
        {error && <span className={s.error}>email is invalid</span>}

        <span className={s.label}>Password</span>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true, maxLength: 40, minLength: 6 })}
          aria-invalid={errors.password || error ? 'true' : 'false'}
        />
        {error && <span className={s.error}>password is invalid</span>}
        {errors.password && errors.password.type === 'required' && (
          <span className={s.error}>This field is required</span>
        )}
        {errors.password && errors.password.type === 'maxLength' && (
          <span className={s.error}>Your password must be no more than 40 characters.</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className={s.error}>Your password needs to be at least 6 characters.</span>
        )}

        <button className={s.button} type="submit">
          Login
        </button>
        <div className={s.noty}>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </div>
      </form>
    </Space>
  );
};

export default SingIn;
