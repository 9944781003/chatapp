import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import chatApi from '../api/chatApi';
import {sendIcon} from '../assets';
import Chat from '../types/Modals/Chat';
import {RootState} from '../store';
import {useSelector} from 'react-redux';
import {AppStackParamList} from '../navigators/AppStackNavigator';
type Props = NativeStackScreenProps<AppStackParamList, 'ChatScreen'>;

const ChatScreen = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [chat, setChat] = React.useState({
    text: '',
    createdAt: Date.now(),
  } as Chat);
  const [myChats, setMyChats] = React.useState<Chat[]>();
  var user_id = '61c54df426dbd9d4453aff0f';

  React.useLayoutEffect(() => {
    setChat({...chat, recipient: props.route.params._id || ''});
  }, []);
  React.useEffect(() => {
    setChat({
      ...chat,
      sender: '61c6d8d544b4f12caca42dc7',
      recipient: props.route.params._id || '',
    });
    const onValueCahnge = chatApi.on('value', snapShot => {
      let data = Object.entries(snapShot.exportVal()['.value'] || {}).map(
        item => item[1],
      ) as Chat[];
      setMyChats(
        data
          .filter(item => {
            if (
              item.sender === props.route.params._id ||
              (item.sender === auth.value._id &&
                item.recipient === props.route.params._id) ||
              item.recipient === auth.value._id
            ) {
              return item;
            }
          })
          .sort((a, b) => a.createdAt - b.createdAt),
      );
    });
    return () => {
      chatApi.off('value', onValueCahnge);
    };
  }, []);

  const HandleSendBtnPress = () => {
    if (chat.text.length > 0) chatApi.push(chat);
    setChat({
      createdAt: 0,
      text: '',
      sender: auth.value._id || '',
      recipient: props.route.params._id || '',
    });
  };
  const HandleChangeText = (text: string) => {
    setChat({...chat, text, createdAt: Date.now()});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={myChats}
        renderItem={({item}) => {
          return (
            <React.Fragment>
              <View
                style={
                  item.sender === user_id
                    ? styles.SenderWrapper
                    : styles.RecipientWrapper
                }>
                <Text
                  style={
                    item.sender === user_id
                      ? styles.SenderText
                      : styles.RecipientText
                  }>
                  {item.text}
                </Text>
              </View>
            </React.Fragment>
          );
        }}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          value={chat.text}
          onChangeText={HandleChangeText}
          multiline
          autoCapitalize={'sentences'}
          style={styles.inputText}
          placeholder={'Your text goes here'}
        />
        <TouchableOpacity onPress={HandleSendBtnPress} style={styles.submitBtn}>
          <Image style={{height: 20, width: 20}} source={{uri: sendIcon.uri}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '95%',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 5,
  },
  accountText: {
    textAlign: 'left',
    flex: 1,
    marginStart: 5,
    textTransform: 'capitalize',
  },
  SenderWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    width: '85%',
    alignSelf: 'flex-start',
    margin: 4,
    borderRadius: 8,
  },
  RecipientWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    width: '85%',
    alignSelf: 'flex-end',
    margin: 4,
    borderRadius: 8,
  },

  SenderText: {color: 'red', fontSize: 18, letterSpacing: 1},
  RecipientText: {color: 'blue', fontSize: 18, letterSpacing: 1},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 8,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  inputText: {flex: 1, fontSize: 18, letterSpacing: 1},
  submitBtn: {width: 48},
});

export default ChatScreen;
