import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import AuthForm from '../components/AuthForm';
import store, {RootState} from '../store';
import {asyncSignin} from '../store/slices/AuthSlice';
import AuthStackParamList from '../types/authstack-param-list';
type StateProps = {
  username: string;
  password: string;
};
type Props = NativeStackScreenProps<AuthStackParamList, 'SigninScreen'>;
type navigation = Props['navigation'];
type route = Props['route'];
export default function SigninSceen(props: Props) {
  const [state, setState] = React.useState<StateProps>({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const HandleUsernameChange = (username: string) => {
    setState({...state, username});
  };
  const HandlePasswordChange = (password: string) => {
    setState({...state, password});
  };

  const HandleSubmitBtnPress = () => {
    if (state.username.length && state.password.length) {
      dispatch(asyncSignin(state));
    } else {
      ToastAndroid.show('Input required', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <AuthForm
        onUsernameTextChange={HandleUsernameChange}
        onPasswordTextChange={HandlePasswordChange}
        onSignIn={HandleSubmitBtnPress}
        formTitle={'Login'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
