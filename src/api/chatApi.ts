import database from '@react-native-firebase/database';

const chatApi = database().ref('chats');

export default chatApi;
