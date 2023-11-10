import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState('username');
  const [password, onChangePassword] = React.useState('password');


  const onSubmit = async () => {
  //Posts the info to the login to store user obj
    const response = await fetch("http://10.9.243.45:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });

    const result = await response.json();
    console.log(result);
    if (result.Message === 'success'){
      navigation.navigate('App')
    }

  }

  //Each <TextInput> can become a component for Login/CreateAccount
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Login screen ! </Text>
      <TextInput 
        style={styles.input}
        placeholder='username'
        onChangeText={onChangeUsername}
        value={username}/>
      <TextInput 
        style={styles.input}
        placeholder='password'
        onChangeText={onChangePassword}
        value={password}/> 
      <Button
        title="Log in"
        onPress={onSubmit}
      />
      <Button 
        title="No Account?"
        onPress={() => navigation.navigate('CreateAccount')}
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
