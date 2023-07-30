import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface articlesSliceState {
  articles: Array<articleType>;
  page: number;
  error: boolean | undefined;
  isLoading: boolean;
  totalPage: number;
}

export type articleType = {
  id: string;
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

export const getArticles = createAsyncThunk<articlesResType, number, { rejectValue: string }>(
  'acticlesListPage/getArticles',
  async function (page, { rejectWithValue }) {
    const offset = page === 1 ? '' : `&offset=${page * 5 - 5}`;
    const res = await fetch(`https://blog.kata.academy/api/articles?limit=5${offset}`);
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articlesResType;
  }
);

const initialState: articlesSliceState = {
  articles: [],
  page: 1,
  error: false,
  isLoading: false,
  totalPage: 1,
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
      });
  },
});

export const { changePage } = menuSlice.actions;

export default menuSlice.reducer;
