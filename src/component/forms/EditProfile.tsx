import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Space } from 'antd';

import Preloader from '../Preloader/Preloader';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editProfile } from '../../redux/slice/login-slice';

import { EMAIL_REGEXP } from './SingUp';
import s from './singup.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
  image: string;
};

const EditProfile = () => {
  const { isLoading, error, user } = useAppSelector((state) => state.loginSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.values(data).length === Object.values(data).filter((str) => str === '').length) {
      alert('Хоть одно поле должно быть заполнено');
      return;
    }
    const editData = {
      token: user ? user.token : '',
      body: {
        user: {},
      },
    };

    for (const key in data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data[key]) editData.body.user[key] = data[key];
    }
    dispatch(editProfile(editData));
  };

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;

  return (
    <Space direction="vertical" style={{ width: '100%' }} align={'center'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.singUp}>
        <span className={s['singUp-title']}>Edit Profile</span>

        <span className={s.label}>Username</span>
        <input
          placeholder="Username"
          {...register('username', { maxLength: 20, minLength: 3 })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && errors.username.type === 'maxLength' && (
          <span className={s.error}>Your username must be no more than 20 characters.</span>
        )}
        {errors.username && errors.username.type === 'minLength' && (
          <span className={s.error}>Your username needs to be at least 3 characters.</span>
        )}

        <span className={s.label}>Email address</span>
        <input
          placeholder="Email address"
          {...register('email', { validate: (value) => EMAIL_REGEXP.test(value) || value === '' })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && errors.email.type === 'validate' && <span className={s.error}>Enter valid email</span>}

        <span className={s.label}>New password</span>
        <input
          type="password"
          placeholder="New password"
          {...register('password', { maxLength: 40, minLength: 6 })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && errors.password.type === 'maxLength' && (
          <span className={s.error}>Your password must be no more than 40 characters.</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className={s.error}>Your password needs to be at least 6 characters.</span>
        )}

        <span className={s.label}>Avatar image (url)</span>
        <input placeholder="Avatar image" {...register('image')} aria-invalid={errors.image ? 'true' : 'false'} />
        {errors.image && errors.image.type === 'required' && <span className={s.error}>This field is required</span>}

        <button className={s.button} type="submit">
          Save
        </button>
      </form>
    </Space>
  );
};

export default EditProfile;
