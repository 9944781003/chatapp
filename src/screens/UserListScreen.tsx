import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function UserListSceen() {
  return (
    <View style={styles.wrapper}>
      <Text>UserList Screen</Text>
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
