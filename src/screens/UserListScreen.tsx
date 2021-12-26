import {useNavigation} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {accountIcon, rightArrowIcon} from '../assets';
import {AppStackParamList} from '../navigators/AppStackNavigator';
import {RootState} from '../store';
import {fetchUsers, User} from '../store/slices/UserSlice';
type AppStackProps = NativeStackScreenProps<
  AppStackParamList,
  'UserListScreen'
>;
type navigtion = AppStackProps['navigation'];
type route = AppStackProps['route'];

export default function UserListScreen(props: {
  navigation: navigtion;
  route: route;
}) {
  const users = useSelector((state: RootState) => state.users);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const HandleArrowPress = (user: User) => {
    props.navigation.navigate('ChatScreen', user);
  };
  React.useEffect(() => {
    dispatch(fetchUsers());
    return () => {};
  }, [auth]);
  return (
    <FlatList
      data={users.value.filter(item => item._id !== auth.value._id)}
      renderItem={({item, index}) => {
        return (
          <View key={index} style={styles.listItem}>
            <Image
              style={{height: 24, width: 24}}
              source={{uri: accountIcon.uri}}
            />
            <Text style={styles.accountText}>
              {item.firstname} {item.lastname}
            </Text>
            <TouchableOpacity onPress={() => HandleArrowPress(item)}>
              <Image
                style={{height: 24, width: 24}}
                source={{uri: rightArrowIcon.uri}}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

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
