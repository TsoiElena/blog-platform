import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Space } from 'antd';

import Preloader from '../Preloader/Preloader';
import ErrorNotify from '../Notify/ErrorNotify/ErrorNotify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createArticle, createArticleData, editArticle, editArticleData } from '../../redux/slice/articlsList-slice';

import s from './singup.module.scss';

type Inputs = {
  title: string;
  description: string;
  body: string;
  tagList: any[];
};

const ArticleForm = () => {
  const { user } = useAppSelector((state) => state.loginSlice);
  const { isLoading, error } = useAppSelector((state) => state.acticlesListPage);
  const { state } = useLocation();
  let defaultValues = {
    defaultValues: {
      tagList: ['tag', ''],
      title: '',
      description: '',
      body: '',
    },
  };
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (state) {
    defaultValues = {
      defaultValues: {
        tagList: state.tagList?.length ? state.tagList : ['tag'],
        title: state.title,
        description: state.description,
        body: state.body,
      },
    };
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>(defaultValues);

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!user) return;
    if (!params.id) {
      const dataRequest: createArticleData = {
        token: user.token,
        body: {
          article: data,
        },
      };
      dispatch(createArticle(dataRequest));
    }

    if (params.id && state) {
      const dataRequest: editArticleData = {
        token: user.token,
        body: {
          article: data,
        },
        slug: params.id,
      };
      dispatch(editArticle(dataRequest));
    }
    return navigate('/');
  };

  if (isLoading) return <Preloader />;
  if (error) return <ErrorNotify />;

  return (
    <Space direction="vertical" style={{ width: '100%' }} align={'center'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.article}>
        <span className={s['article-title']}>Create new article</span>

        <span className={s.label}>Title</span>
        <input
          placeholder="Title"
          {...register('title', { required: true })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && <span className={s.error}>This field is required</span>}

        <span className={s.label}>Short description</span>
        <input
          placeholder="Title"
          {...register('description', { required: true })}
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        {errors.description && <span className={s.error}>This field is required</span>}

        <span className={s.label}>Text</span>
        <textarea
          placeholder="Text"
          {...register('body', { required: true })}
          aria-invalid={errors.body ? 'true' : 'false'}
        />
        {errors.body && <span className={s.error}>This field is required</span>}

        <span className={s.label}>Tags</span>
        <div className={s.tagList}>
          {fields.map((field, index) => (
            <div key={field.id} className={s['tagList-tag']}>
              <input placeholder="tag" {...register(`tagList.${index}`)} />
              <button className={s['tagList-tag-delete-button']} type="button" onClick={() => remove(index)}>
                Delete
              </button>
              {index === fields.length - 1 && (
                <button className={s['tagList-tag-add-button']} type="button" onClick={() => append('')}>
                  Add tag
                </button>
              )}
            </div>
          ))}
        </div>

        <button className={`${s.button} ${s['button-article']}`} type="submit">
          Save
        </button>
      </form>
    </Space>
  );
};

export default ArticleForm;
