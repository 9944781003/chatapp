import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

export default function ResetPasswordScreen() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Reset Password Screen</Text>
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
