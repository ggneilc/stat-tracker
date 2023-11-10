import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';


export const Mealwheel = () => {


  return (
    <View style={styles.container}>
      <View style={styles.item}>
          <Text>Food:</Text>
          <Text>Calories:</Text>
          <Text>Protein:</Text>
        <Button 
          title="Submit"
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 5,
    flexDirection: 'row',
    alignContent: 'stretch',
    borderRadius: '10px',
  },


  item: {
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center'
  },

})