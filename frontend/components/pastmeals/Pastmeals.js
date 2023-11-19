import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUserMeals, selectPastDays } from '../../features/user/userSlice';

import {Meal} from '../meal/Meal'

export const Pastmeals = () => {
  const userMeals = useSelector(selectUserMeals);
  const pastdays = useSelector(selectPastDays);

  console.log("Retrieved Pastmeals: "+JSON.stringify(userMeals));
  console.log("Retrieved PastDays: "+JSON.stringify(pastdays));

  const renderMealItem = ({ item }) => (
    <View style={styles.meal}>
      <Text style={styles.Foodname}>{item.FoodName}</Text>
      <Text style={styles.cals}>Calories: {item.Calories}</Text>
      <Text style={styles.protein}>Protein: {item.Protein}</Text>
      {/* Add more details if needed */}
    </View>
  );

  const renderDayItem = ({ item }) => (
    <View style={styles.day}>
      <Text style={styles.text}>Day ID: {item.ID}</Text>
        {userMeals && (
          <FlatList
            data={item.Meals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item.ID.toString()} // Provide a unique key for each item
            horizontal={true}
          />
        )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {pastdays && (
          <FlatList
            data={pastdays}
            renderItem={renderDayItem}
            keyExtractor={(item) => item.ID.toString()} // Provide a unique key for each item
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
 container: {
    flex: 3,
    flexDirection: 'row',
    height: 50, 
    borderRadius: '10px',
    backgroundColor: '#111'
  },

  item: {
    margin: 10,
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: '10px'
  },

  day: {
    margin: 10,
    height: 100,
    width: 350,
    backgroundColor: '#808080',
    borderRadius: 10
  },

  meal: {
    margin: 10,
    width: 150,
    height: 70,
    backgroundColor: '#101010',
    borderRadius: 10
  },

  text: {
    color: '#fff',
    alignSelf: 'center'
    
  },

  Foodname: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    
  },
  cals: {
    color: '#fff'
  },
  protein: {
    color: '#fff'
  },


})
