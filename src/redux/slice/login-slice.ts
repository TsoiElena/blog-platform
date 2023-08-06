import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface loginSliceState {
  isLoading: boolean;
  error: boolean | string;
  user: userType | null;
}

export type singUpDataType = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type singInDataType = {
  user: {
    email: string;
    password: string;
  };
};

export interface userType {
  username: string;
  email: string;
  token: string;
  image?: null | string | undefined;
  bio?: string | undefined;
}

export const singUp = createAsyncThunk<{ user: userType }, singUpDataType, { rejectValue: string }>(
  'loginSlice/singUp',
  async function (data, { rejectWithValue }) {
    const res = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return rejectWithValue('ops');
    return (await res.json()) as { user: userType };
  }
);

export const singIn = createAsyncThunk<{ user: userType }, singInDataType, { rejectValue: string }>(
  'loginSlice/singIn',
  async function (data, { rejectWithValue }) {
    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return rejectWithValue('something went wrong');
    }
    return (await res.json()) as { user: userType };
  }
);

const initialState: loginSliceState = {
  isLoading: false,
  error: false,
  user: null,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    getUserFromlocal(state, action: PayloadAction) {
      const user = localStorage.getItem('user');
      state.user = user ? JSON.parse(user) : null;
    },
    logOut(state, action: PayloadAction) {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singUp.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(singUp.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(singUp.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(singIn.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(singIn.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(singIn.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { getUserFromlocal, logOut } = loginSlice.actions;

export default loginSlice.reducer;
