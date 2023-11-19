import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export const CreateAccount = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const [age, onChangeAge] = React.useState('');
  const [weight, onChangeWeight] = React.useState('');
  const [height, onChangeHeight] = React.useState('');


  const onSubmit = async () => {

    const numericAge = parseInt(age, 10);
    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);


    // Check if conversion is successful (not NaN)
    if (isNaN(numericAge) || isNaN(numericWeight) || isNaN(numericHeight)) {
      // Handle invalid input (e.g., show an error message)
      console.error('Invalid input for age, weight, or height');
      return;
    }

    //Posts the info to the login to store user obj
    const response = await fetch("http://10.9.243.45:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, 
          email, 
          password, 
          age: numericAge,
          weight: numericWeight, 
          height: numericHeight,
        }),
    });


    const result = await response.json();
    if (result.Message === 'success'){
      const loginResponse = await fetch("http://10.9.243.45:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password}),
      });
      const loginSuccess = await loginResponse.json();
      if (loginSuccess.Message === 'success'){
        navigation.navigate('App')
      }
    }

  }

  //Each <TextInput> can become a Component for Login/CreateAccount
  return (
    <View style={styles.container}>
      <View style={styles.bgBlock}> 

      </View>
      <View style={styles.bgBlockBlack}> 

      </View>

      <View style={styles.box}>
      <Text style={styles.text}> Create Account ! </Text>

      <TextInput 
        style={styles.input}
        placeholder='username'
        onChangeText={onChangeUsername}
        value={username}/>
      <TextInput 
        style={styles.input}
        placeholder='email'
        onChangeText={onChangeEmail}
        value={email}/> 

      <TextInput 
        style={styles.input}
        placeholder='password'
        onChangeText={onChangePassword}
        value={password}/> 

      <Text style={styles.text}> Personal Info </Text>
      <TextInput 
        style={styles.input}
        placeholder='Age'
        onChangeText={onChangeAge}
        keyboardType='numeric'
        value={age}/> 
      <TextInput 
        style={styles.input}
        placeholder='Weight'
        onChangeText={onChangeWeight}
        keyboardType='numeric'
        value={weight}/> 
      <TextInput 
        style={styles.input}
        placeholder='Height'
        onChangeText={onChangeHeight}
        keyboardType='numeric'
        value={height}/> 



      <Button
        title="Log in"
        onPress={onSubmit}
      />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  box: {
    marginTop: 75,
    alignItems: 'center',
    borderRadius: 2,
    width: 250,
    height: 500,  
    backgroundColor: 'rgba(22, 21, 30, 0.80)'
  },

  input: {
    color: '#000',
    backgroundColor: '#FAF0F6',

    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,


    shadowOpacity: 0.2,
    shadowColor: '#111',
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
    borderRadius: 2,
  },

  bgBlock: {
    position: 'absolute',
    top: -65,
    left: -100,
    width: 350,
    height: 200,
    backgroundColor: '#DBDBDA',
    transform: [{ rotate: '-37.976deg'}]
  },

  bgBlockBlack: {
    position: 'absolute',
    top: 95,
    width: 800,
    height: 300,
    backgroundColor: '#000',
    transform: [{ rotate: '-37.976deg'}]
  },

  text: {
    paddingTop: 5,
    color: '#fff',
    fontSize: 20
  }
});
