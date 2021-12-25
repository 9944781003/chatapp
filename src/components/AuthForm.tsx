import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthStackParamList from '../types/authstack-param-list';

type PropsType = {
  formTitle?: string;
  signinBtnTitle?: string;
  onUsernameTextChange?: (text: string) => void;
  onPasswordTextChange?: (text: string) => void;
  usernamePlaceHolder?: string;
  passwordPlaceHolder?: string;
  usernameValue?: string;
  passwordValue?: string;
  onForgetPasswordPress?: () => void;
  onSignIn?: () => void;
};

export default function AuthForm({
  formTitle = 'Login',
  signinBtnTitle = 'Signin',
  usernamePlaceHolder = 'username',
  passwordPlaceHolder = 'password',
  ...props
}: PropsType) {
  const [passEye, togglePassEye] = React.useState<Boolean>(false);
  return (
    <View>
      <Text style={styles.titleText}>{formTitle}</Text>
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
      <Text onPress={props.onForgetPasswordPress} style={styles.forgetPassText}>
        Forget password?
      </Text>
      <TouchableHighlight
        onPress={props.onSignIn}
        style={styles.loginBtn}
        children={
          <Text style={{textTransform: 'uppercase'}}>{signinBtnTitle}</Text>
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
    height: 52,
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
