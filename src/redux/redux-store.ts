import { configureStore } from '@reduxjs/toolkit';

import acticlesSlice from './slice/articlsList-slice';
import loginSlice from './slice/login-slice';

const store = configureStore({
  reducer: {
    acticlesListPage: acticlesSlice,
    loginSlice: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
