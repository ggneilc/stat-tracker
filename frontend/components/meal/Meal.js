//Meal component to render individual Meals
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


//Meal takes in object of Meal: 
//Foodname, Calories, Protein
export const Meal = ({props}) => {
  return (
    <View style={styles.container}>
      <Text> {props.FoodName}</Text>
      <Text> {props.Calories}</Text>
      <Text> {props.Protein}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 100,
    width: 100,
    backgroundColor: '#DC8b82'

  },

  Food: {
    color: '#fff'
  },

  Cals: {
    color: '#fff'
  },

  Protein: {
    color: '#fff'
  },

})
