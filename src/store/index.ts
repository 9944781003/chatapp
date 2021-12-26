import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import UserSlice from './slices/UserSlice';

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    auth: AuthSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
