import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import CounterSlice from './slices/CounterSlice';
import UserSlice from './slices/UserSlice';

const store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
    users: UserSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
