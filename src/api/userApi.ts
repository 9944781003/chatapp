import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://0481-106-222-108-205.in.ngrok.io/users',
});
userApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export default userApi;
