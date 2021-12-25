import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type PropsType = {
  formTitle?: string;
  signupBtnTitle?: string;
  onUsernameTextChange?: (text: string) => void;
  onPasswordTextChange?: (text: string) => void;
  onEmailTextChange?: (text: string) => void;
  onPhoneTextChange?: (text: string) => void;
  onFirstnameTextChange?: (text: string) => void;
  onLastnameTextChange?: (text: string) => void;

  usernamePlaceHolder?: string;
  passwordPlaceHolder?: string;
  emailPlaceHolder?: string;
  phonePlaceHolder?: string;
  firstnamePlaceHolder?: string;
  lastnamePlaceHolder?: string;

  usernameValue?: string;
  passwordValue?: string;
  emailValue?: string;
  phoneValue?: string;
  firstnameValue?: string;
  lastnameValue?: string;
  onForgetPasswordPress?: () => void;
  onSignUp?: () => void;
};

export default function SignupForm({
  formTitle = 'Register',
  signupBtnTitle = 'Signup',
  usernamePlaceHolder = 'username',
  passwordPlaceHolder = 'password',
  emailPlaceHolder = 'email',
  phonePlaceHolder = 'phone number',
  firstnamePlaceHolder = 'firstname',
  lastnamePlaceHolder = 'lastname',

  ...props
}: PropsType) {
  const [passEye, togglePassEye] = React.useState<Boolean>(false);
  return (
    <View>
      <Text style={styles.titleText}>{formTitle}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onFirstnameTextChange}
          placeholder={firstnamePlaceHolder}
          value={props.firstnameValue}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onLastnameTextChange}
          placeholder={lastnamePlaceHolder}
          value={props.lastnameValue}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onUsernameTextChange}
          placeholder={usernamePlaceHolder}
          value={props.usernameValue}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onPasswordTextChange}
          placeholder={passwordPlaceHolder}
          value={props.passwordValue}
          secureTextEntry={!passEye}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onEmailTextChange}
          placeholder={emailPlaceHolder}
          value={props.emailValue}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={props.onPhoneTextChange}
          placeholder={phonePlaceHolder}
          value={props.phoneValue}
          style={styles.inputText}
        />
      </View>
      <TouchableHighlight
        onPress={props.onSignUp}
        style={styles.loginBtn}
        children={
          <Text style={{textTransform: 'uppercase'}}>{signupBtnTitle}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: Colors.primary,
    fontSize: 24,
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 18,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    minWidth: 200,
    height: 38,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  forgetPassText: {
    textAlignVertical: 'center',
    textAlign: 'right',
    color: Colors.primary,
    width: 'auto',
    alignSelf: 'flex-end',
    marginRight: 12,
    fontSize: 14,
  },
  loginBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 18,
  },
  inputText: {
    fontSize: 18,
    color: Colors.white,
  },
});
