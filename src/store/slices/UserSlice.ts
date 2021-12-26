import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
type Status = 'fullfilled' | 'rejected' | 'pending';

export type User = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  __v?: number;
};
const value = [] as User[];

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await userApi.get('/');
    return response.data as User[];
  } catch (error) {
    console.log(error);
  }
});
const fetchUserById = createAsyncThunk('users/fetchUserById', async _id => {
  const response = await userApi.get(`/:${_id}`);
  return response.data as User;
});
const createUser = createAsyncThunk('users/createUser', async (prop: User) => {
  const response = await userApi({
    url: '/',
    method: 'POST',
    data: {prop},
  });
  return response.data as User;
});
const patchUserById = createAsyncThunk(
  'users/patchUserById',
  async (_id, data) => {
    const response = await userApi(`/:${_id}`, {
      method: 'PATCH',
      data: data,
    });
    return response.data as User;
  },
);
const putUserById = createAsyncThunk('users/putUserById', async (_id, data) => {
  const response = await userApi(`/:${_id}`, {
    method: 'PUT',
    data: data,
  });
  return response.data as User;
});
const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (_id, data) => {
    const response = await userApi(`/:${_id}`, {
      method: 'DELETE',
      data: data,
    });
    return response.data as User;
  },
);

const UserSlice = createSlice({
  name: 'users',
  initialState: {
    value: value,
    status: 'pending' as Status,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.value = Array.isArray(action.payload) ? action.payload : [];
      state.status = 'fullfilled';
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.value = [action.payload];
      state.status = 'fullfilled';
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.value.push(action.payload);
      state.status = 'fullfilled';
    });
    builder.addCase(patchUserById.fulfilled, (state, action) => {
      state.value.map(item => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
      state.status = 'fullfilled';
    });
    builder.addCase(putUserById.fulfilled, (state, action) => {
      state.value.map(item => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
      state.status = 'fullfilled';
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.value.map(item => {
        if (item._id !== action.payload._id) return item;
      });
      state.status = 'fullfilled';
    });
  },
});

// Action creators are generated for each case reducer function
export {
  fetchUserById,
  fetchUsers,
  createUser,
  patchUserById,
  putUserById,
  deleteUserById,
};

export default UserSlice;
