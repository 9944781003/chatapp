import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function UserProfileSceen() {
  return (
    <View style={styles.wrapper}>
      <Text>UserProfile Screen</Text>
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
