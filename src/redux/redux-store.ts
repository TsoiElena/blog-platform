import { configureStore } from '@reduxjs/toolkit';

import acticlesSlice from './slice/articlsList-sliace';
import articleSlice from './slice/article-slice';

const store = configureStore({
  reducer: {
    acticlesListPage: acticlesSlice,
    acticlePage: articleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
