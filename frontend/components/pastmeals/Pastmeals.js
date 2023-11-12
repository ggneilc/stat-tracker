import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUserMeals } from '../../features/user/userSlice';

export const Pastmeals = () => {
  const userMeals = useSelector(selectUserMeals);

  console.log("Pastmeals: "+JSON.stringify(userMeals));

  const renderMealItem = ({ item }) => (
    <View style={styles.center}>
      <Text>{item.FoodName}</Text>
      <Text>Calories: {item.Calories}</Text>
      <Text>Protein: {item.Protein}</Text>
      {/* Add more details if needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {userMeals && (
          <FlatList
            data={userMeals}
            renderItem={renderMealItem}
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

  center: {
    alignSelf: 'center',
  }

})
