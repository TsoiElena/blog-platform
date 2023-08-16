import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface articlesSliceState {
  articles: Array<articleType>;
  article: articleType | null;
  page: number;
  error: boolean | undefined;
  isLoading: boolean;
  totalPage: number;
  success: boolean;
}

export type articleType = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Array<string>;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

type articlesResType = {
  articles: Array<articleType>;
  articlesCount: number;
};

type articleResType = {
  article: articleType;
};

type getArticlesData = {
  page: number;
  token?: string;
};

type LikeData = {
  slug: string;
  token: string;
};

export type createArticleData = {
  body: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: any[];
    };
  };
  token: string;
};

export type editArticleData = {
  body: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: any[];
    };
  };
  token: string;
  slug: string;
};

export const getArticles = createAsyncThunk<articlesResType, getArticlesData, { rejectValue: string }>(
  'acticlesListPage/getArticles',
  async function (data, { rejectWithValue }) {
    const offset = data.page === 1 ? '' : `&offset=${data.page * 5 - 5}`;
    if (data.token) {
      const res = await fetch(`https://blog.kata.academy/api/articles?limit=5${offset}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });
      if (!res.ok) return rejectWithValue('something went wrong');
      return (await res.json()) as articlesResType;
    } else {
      const res = await fetch(`https://blog.kata.academy/api/articles?limit=5${offset}`);
      if (!res.ok) return rejectWithValue('something went wrong');
      return (await res.json()) as articlesResType;
    }
  }
);

export const getArticle = createAsyncThunk<articleResType, string | undefined, { rejectValue: string }>(
  'acticlesListPage/getArticle',
  async function (slug, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articleResType;
  }
);

export const likeArticle = createAsyncThunk<articleResType, LikeData, { rejectValue: string }>(
  'acticlesListPage/likeArticle',
  async function (data, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${data.slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${data.token}`,
      },
    });
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articleResType;
  }
);

export const unlikeArticle = createAsyncThunk<articleResType, LikeData, { rejectValue: string }>(
  'acticlesListPage/unlikeArticle',
  async function (data, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${data.slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${data.token}`,
      },
    });
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articleResType;
  }
);

export const createArticle = createAsyncThunk<articleResType, createArticleData, { rejectValue: string }>(
  'acticlesListPage/createArticle',
  async function (data, { rejectWithValue }) {
    const res = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    });
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articleResType;
  }
);

export const editArticle = createAsyncThunk<articleResType, editArticleData, { rejectValue: string }>(
  'acticlesListPage/editArticle',
  async function (data, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${data.slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    });
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articleResType;
  }
);

export const deleteArticle = createAsyncThunk<number, { slug: string; token: string }, { rejectValue: string }>(
  'acticlesListPage/deleteArticle',
  async function (data, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${data.slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${data.token}`,
      },
    });
    if (!res.ok) return rejectWithValue('something went wrong');
    return 1;
  }
);

const initialState: articlesSliceState = {
  articles: [],
  article: null,
  page: 1,
  error: false,
  isLoading: false,
  totalPage: 1,
  success: false,
};

const menuSlice = createSlice({
  name: 'acticlesListPage',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.totalPage = Math.ceil(action.payload.articlesCount / 5);
        state.articles = action.payload.articles.map((article) => ({ ...article, id: uuidv4() }));
        state.isLoading = false;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.isLoading = false;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(likeArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.articles = state.articles.map((article) => {
          if (article.slug === action.payload.article.slug) return action.payload.article;
          return article;
        });
        state.isLoading = false;
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(unlikeArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.articles = state.articles.map((article) => {
          if (article.slug === action.payload.article.slug) return action.payload.article;
          return article;
        });
        state.isLoading = false;
      })
      .addCase(unlikeArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(editArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { changePage } = menuSlice.actions;

export default menuSlice.reducer;
