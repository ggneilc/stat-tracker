import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import { Infosection } from '../components/infosection/Infosection.js';
import { Mealwheel } from '../components/mealwheel/Mealwheel.js';
import { Plate } from '../components/plate/Plate.js';
import { Pastmeals } from '../components/pastmeals/Pastmeals.js';


export const MealScreen = () => {
  return (
    <View style={styles.container}> 
      <Infosection />
      <Mealwheel />
      <Plate />
      <Pastmeals />
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
})
