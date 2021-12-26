import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStackParamList} from '../navigators/AuthStackNavigator';
import {RootState} from '../store';
import {AsyncSignin} from '../store/slices/AuthSlice';
import {User} from '../store/slices/UserSlice';
import {navigationRef} from '../utils/navigationRef';

type StateProps = {
  username: string;
  password: string;
};
type Props = NativeStackScreenProps<AuthStackParamList, 'SigninScreen'>;
export default function SigninSceen(props: Props) {
  const [state, setState] = React.useState<StateProps>({
    username: '',
    password: '',
  });
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [passEye, togglePassEye] = React.useState<Boolean>(false);

  const HandleUsernameChange = (username: string) => {
    setState({...state, username});
  };
  const HandlePasswordChange = (password: string) => {
    setState({...state, password});
  };

  const HandleSigninBtnPress = () => {
    if (state.username.length && state.password.length) {
      dispatch(AsyncSignin(state));
    } else {
      ToastAndroid.show('Input required', ToastAndroid.SHORT);
    }
  };

  const HandleSignupBtnPress = () => props.navigation.navigate('SignupScreen');
  const HandleForgetPasswordPress = () =>
    props.navigation.navigate('ResetPassword');

  React.useEffect(() => {
    if (auth.status === 'fullfilled') {
      let auth_user = {...auth.value};
      AsyncStorageLib.setItem('auth_user', JSON.stringify(auth.value)).then(
        () => {
          navigationRef.navigate('app');
        },
      );
    }
  }, [auth]);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.titleText}>{'Login'}</Text>

        <TextInput
          onChangeText={HandleUsernameChange}
          placeholder={'username'}
          value={state.username}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandlePasswordChange}
          placeholder={'password'}
          value={state.password}
          secureTextEntry={!passEye}
          style={styles.inputText}
        />

        <View style={styles.btnGroup}>
          <TouchableHighlight
            onPress={HandleSigninBtnPress}
            style={styles.signinBtn}
            children={
              <Text style={{textTransform: 'uppercase'}}>{'signin'}</Text>
            }
          />
          <TouchableHighlight
            onPress={HandleSignupBtnPress}
            style={{...styles.signinBtn, backgroundColor: '#FFA500'}}
            children={
              <Text style={{textTransform: 'uppercase', color: '#FFFF'}}>
                {'signup'}
              </Text>
            }
          />
        </View>
        <Text onPress={HandleForgetPasswordPress} style={styles.forgetPassText}>
          Forget password?
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 18,
    fontWeight: 'bold',
  },
  forgetPassText: {
    textAlignVertical: 'center',
    textAlign: 'right',
    color: 'red',
    width: 'auto',
    alignSelf: 'flex-end',
    marginRight: 12,
    fontSize: 14,
  },
  signinBtn: {
    height: 40,
    width: 140,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  inputText: {
    fontSize: 18,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 1,
    marginVertical: 4,
  },
});
