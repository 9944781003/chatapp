import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const userApi = axios.create({
  baseURL:
    'http://0d88-2401-4900-4c1c-c644-b4ab-2f1-f1d6-6556.in.ngrok.io/users',
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
