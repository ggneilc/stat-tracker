import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');


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
  //
  //Screen 
  //  image
  //  { sign in }
  //
  return (
    <View style={styles.container}>


      <View style={styles.bgBlock}> 

      </View>
      <View style={styles.bgBlockBlack}> 

      </View>
      <View style={styles.bgBlockBack}> 

      </View>



      <Text style={styles.welcome}> </Text>

      <View style={styles.imageContainer}> 
        <Image
          style={styles.image}
          source={require('../assets/welcome.png')} />
      </View>


      <View style={styles.signin}>
        <View style={styles.box}>
          <Text style={styles.text}> Welcome </Text>
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
    justifyContent: 'center',
  },


  bgBlock: {
    position: 'absolute',
    top: -145,
    width: 1000,
    height: 400,
    backgroundColor: '#DBDBDA',
    transform: [{ rotate: '-37.976deg'}]
  },

  bgBlockBack: {
    position: 'absolute',
    top: 18,
    right: 15,
    width: 350,
    height: 300,
    backgroundColor: '#DBDBDA',
    transform: [{ rotate: '-37.976deg'}]
  },

  bgBlockBlack: {
    position: 'absolute',
    top: 349,
    width: 850,
    height: 300,
    backgroundColor: '#000',
    transform: [{ rotate: '-37.976deg'}]
  },

  welcome: {
    paddingTop: 25,
    height: 50,
    flex: 1, 
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
  },

  imageContainer: {
    paddingTop: -10,
    flex: 3
  },
  image: {
    width: 250,
    height: 250,
  },

  signin: {
    flex: 5,
    height: 300
  },

  box: {
    alignItems: 'center',
    borderRadius: 2,
    width: 250,
    height: 300,  
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

  text: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 28,
    color: '#fff'
  }
});
