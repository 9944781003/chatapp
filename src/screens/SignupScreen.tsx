import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Pressable,
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
import {AsyncSignup} from '../store/slices/AuthSlice';
import {User} from '../store/slices/UserSlice';
import {navigationRef} from '../utils/navigationRef';

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

type Props = NativeStackScreenProps<AuthStackParamList, 'SignupScreen'>;
export default function SignupSceen(props: Props) {
  const [state, setState] = React.useState<Omit<User, '_id'>>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    console.log(auth.status);
    if (auth.status === 'fullfilled') {
      navigationRef.goBack();
    }
  }, [auth]);

  const HandleFirstnameTextChange = (firstname: string) => {
    setState({...state, firstname});
  };
  const HandleLastnameTextChange = (lastname: string) => {
    setState({...state, lastname});
  };
  const HandleUsernameTextChange = (username: string) => {
    setState({...state, username} as Omit<User, '_id'>);
  };
  const HandlePasswordTextChange = (password: string) => {
    setState({...state, password} as Omit<User, '_id'>);
  };
  const HandleEmailTextChange = (email: string) => {
    setState({...state, email} as Omit<User, '_id'>);
  };
  const HandlePhoneTextChange = (phone: string) => {
    setState({...state, phone} as Omit<User, '_id'>);
  };

  const HandleSubmitPress = () => {
    if (
      state.firstname.length > 3 &&
      state.lastname.length &&
      state?.username.length > 4 &&
      emailPattern.test(state.email) &&
      state.phone.length > 9 &&
      state.password.length > 4
    ) {
      dispatch(AsyncSignup(state));
      setState({} as User);
    } else {
      console.log('form invalid', state);
      ToastAndroid.show(
        'Someting went wrong. Please check with input details',
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.titleText}>{'Signup'}</Text>

        <TextInput
          onChangeText={HandleFirstnameTextChange}
          placeholder={'firstname'}
          value={state.firstname}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandleLastnameTextChange}
          placeholder={'lastname'}
          value={state.lastname}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandleUsernameTextChange}
          placeholder={'username'}
          value={state.username}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandlePasswordTextChange}
          placeholder={'password'}
          value={state.password}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandleEmailTextChange}
          placeholder={'email'}
          value={state.email}
          style={styles.inputText}
        />

        <TextInput
          onChangeText={HandlePhoneTextChange}
          placeholder={'phone'}
          value={state.phone}
          style={styles.inputText}
        />
        <TouchableHighlight
          onPress={HandleSubmitPress}
          style={styles.signupBtn}
          children={
            <Text style={{textTransform: 'uppercase'}}>{'signup'}</Text>
          }
        />
      </View>
      <Pressable onPress={() => props.navigation.navigate('SigninScreen')}>
        <Text style={{color: '#FFA500', fontWeight: 'bold'}}>
          Already have an account?
        </Text>
      </Pressable>
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
    width: 'auto',
    alignSelf: 'flex-end',
    marginRight: 12,
    fontSize: 14,
  },
  signupBtn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 18,
    paddingHorizontal: 18,
  },
  inputText: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
    width: Dimensions.get('window').width * 0.8,
  },
});
