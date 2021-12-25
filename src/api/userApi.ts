import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const userApi = axios.create({
  baseURL:
    'https://04af-2401-4900-4c1c-c757-9841-b20-10a1-7cfa.in.ngrok.io/users',
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
