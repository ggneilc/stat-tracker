import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';

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
      <Image
        style={styles.image}
        source={require('../../assets/food.png')} />
      <View style={{padding: 2, alignSelf: 'center'}}> 
        <Text style={styles.nutrients}>{item.Calories} C</Text>
        <Text style={styles.nutrients}>{item.Protein} P</Text>
      </View>
      {/* Add more details if needed */}
    </View>
  );

  const renderDayItem = ({ item }) => {
    const createdAtDate = new Date(item.CreatedAt);
    // Format the date to show only the day
    const formattedDay = createdAtDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
    
    return (
      <View style={styles.day}>
      <Text style={{color:'#fff', paddingTop: 5, paddingLeft: 5}}>{formattedDay}</Text>
        {userMeals && (
          <FlatList
            data={item.Meals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item.ID.toString()} // Provide a unique key for each item
            horizontal={true}
          />
        )}
    </View>);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}> Recent Days </Text>
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
    borderRadius: '10px',
    padding: 10
  },

  day: {
    margin: 10,
    height: 100,
    width: 335,
    backgroundColor: '#151515',
    borderRadius: 10
  },

  meal: {
    flexDirection: 'row',
    margin: 5,
    width: 100,
    height: 70,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#DBDBDA',
    borderRadius: 10
  },

  text: {
    color: '#DBDBDA',
    alignSelf: 'center',
    fontStyle: 'italic'
  },

  Foodname: {
    margin: 5,
    color: '#DBDBDA',
    alignSelf: 'flex-start',
    fontSize: 14,
    width: 45,
  },

  nutrients: {
    color: '#DBDBDA',
    fontSize: 12,
  },

  image: {
    margin: 5,
    width: 40,
    height: 40,
  },


})
