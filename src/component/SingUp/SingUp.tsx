import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Space } from 'antd';

import Preloader from '../Preloader/Preloader';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { singUp } from '../../redux/slice/login-slice';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './singup.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
  RepeatPassword: string;
  agree: boolean;
};

export const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const SingUp = () => {
  const { isLoading, error } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userData = {
      user: {
        username: data.username.toLowerCase(),
        email: data.email,
        password: data.password,
      },
    };
    dispatch(singUp(userData));
  };

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;

  return (
    <Space direction="vertical" style={{ width: '100%' }} align={'center'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.singUp}>
        <span className={s['singUp-title']}>Create new account</span>

        <span className={s.label}>Username</span>
        <input
          placeholder="Username"
          {...register('username', { required: true, maxLength: 20, minLength: 3 })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && errors.username.type === 'required' && (
          <span className={s.error}>This field is required</span>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <span className={s.error}>Your username must be no more than 20 characters.</span>
        )}
        {errors.username && errors.username.type === 'minLength' && (
          <span className={s.error}>Your username needs to be at least 3 characters.</span>
        )}

        <span className={s.label}>Email address</span>
        <input
          placeholder="Email address"
          {...register('email', { required: true, validate: (value) => EMAIL_REGEXP.test(value) })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && errors.email.type === 'required' && <span className={s.error}>This field is required</span>}
        {errors.email && errors.email.type === 'validate' && <span className={s.error}>Enter valid email</span>}

        <span className={s.label}>Password</span>
        <input
          placeholder="Password"
          {...register('password', { required: true, maxLength: 40, minLength: 6 })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && errors.password.type === 'required' && (
          <span className={s.error}>This field is required</span>
        )}
        {errors.password && errors.password.type === 'maxLength' && (
          <span className={s.error}>Your password must be no more than 40 characters.</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className={s.error}>Your password needs to be at least 6 characters.</span>
        )}

        <span className={s.label}>Repeat Password</span>
        <input
          placeholder="Repeat Password"
          {...register('RepeatPassword', {
            required: true,
            validate: (value, formValues) => value === formValues.password,
          })}
          aria-invalid={errors.RepeatPassword ? 'true' : 'false'}
        />
        {errors.RepeatPassword && errors.RepeatPassword.type === 'required' && (
          <span className={s.error}>This field is required</span>
        )}
        {errors.RepeatPassword && errors.RepeatPassword.type === 'validate' && (
          <span className={s.error}>Passwords must match</span>
        )}

        <div>
          <input
            type="checkbox"
            className={s['custom-checkbox']}
            id="check"
            {...register('agree', { required: true })}
          />
          <label htmlFor="check" className={s.not}>
            I agree to the processing of my personal information
          </label>
          {errors.agree && <span className={s.error}>This checkbox is required</span>}
        </div>

        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </Space>
  );
};

export default SingUp;
