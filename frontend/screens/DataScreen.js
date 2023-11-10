import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

//import functions for displaying user
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice'

export const DataScreen = () => {
  const user = useSelector(selectUser);
  console.log(user)

  return (
    <View style={styles.container}>
      <Text style={styles.text}> data screen ! </Text>
      {user && (
        <View > 
          <Text style={styles.text}> Hello, {user.username}.</Text> 
          <Text style={styles.text}> Age: {user.age} HealthScore: {user.healthscore} </Text>
          <Text style={styles.text}> Height: {user.height}in </Text>
          <Text style={styles.text}> Weight: {user.weight}lbs </Text>
        </View>
      )}
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
