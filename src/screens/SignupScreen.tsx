import React from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {useDispatch} from 'react-redux';
import SignupForm from '../components/SignupForm';
import {asyncSignUp} from '../store/slices/AuthSlice';
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

type StateProps = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
};
export default function SignupSceen() {
  const [state, setState] = React.useState<StateProps>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const HandleFirstnameTextChange = (firstname: string) => {
    setState({...state, firstname});
  };
  const HandleLastnameTextChange = (lastname: string) => {
    setState({...state, lastname});
  };
  const HandleUsernameTextChange = (username: string) => {
    setState({...state, username} as StateProps);
  };
  const HandlePasswordTextChange = (password: string) => {
    setState({...state, password} as StateProps);
  };
  const HandleEmailTextChange = (email: string) => {
    setState({...state, email} as StateProps);
  };
  const HandlePhoneTextChange = (phone: string) => {
    setState({...state, phone} as StateProps);
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
      dispatch(asyncSignUp(state));
      setState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
        phone: '',
      });
    } else {
      console.log('form invalid', state);
      ToastAndroid.show(
        'Someting went wrong. Please check with input details',
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <SignupForm
        onFirstnameTextChange={HandleFirstnameTextChange}
        onLastnameTextChange={HandleLastnameTextChange}
        onUsernameTextChange={HandleUsernameTextChange}
        onPasswordTextChange={HandlePasswordTextChange}
        onEmailTextChange={HandleEmailTextChange}
        onPhoneTextChange={HandlePhoneTextChange}
        onSignUp={HandleSubmitPress}
        firstnameValue={state.firstname}
        lastnameValue={state.lastname}
        usernameValue={state.username}
        passwordValue={state.password}
        emailValue={state.email}
        phoneValue={state.phone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
