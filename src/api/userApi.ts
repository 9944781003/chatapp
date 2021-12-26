import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const userApi = axios.create({
  baseURL:
    'http://1de5-2401-4900-4c1c-c644-6c99-27fe-c348-32a.in.ngrok.io/users',
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
