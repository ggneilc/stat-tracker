import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export const LogScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> log screen ! </Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    color: '#fff',
  }, 

  input: {
    color: '#fff',
    backgroundColor: '#101010',
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
