import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { articleType } from './articlsList-sliace';

interface articlesSliceState {
  article: articleType | null;
  error: boolean | undefined;
  isLoading: boolean;
}

type articlesResType = {
  article: articleType;
};

export const getArticle = createAsyncThunk<articlesResType, string | undefined, { rejectValue: string }>(
  'acticlePage/getArticle',
  async function (slug, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!res.ok) return rejectWithValue('something went wrong');
    return (await res.json()) as articlesResType;
  }
);

const initialState: articlesSliceState = {
  article: null,
  error: false,
  isLoading: false,
};

const articleSlice = createSlice({
  name: 'acticlePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default articleSlice.reducer;
