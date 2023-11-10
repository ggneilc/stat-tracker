import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

//import function for setting user 
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

import { Navbar } from '../components/navbar/navbar.js';
import { Quest } from '../components/quests/Quest.js';
import { Heatmap } from '../components/heatmap/heatmap.js';
import { Radar } from '../components/radar/radar.js';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const retrieveUser = async () => {
    try {
      const response = await fetch("http://10.9.243.45:3000/home");
      const result = await response.json();
      console.log(result);
      dispatch(setUser({
        id: result.ID,
        username: result.Username,
        email: result.Email,
        age: result.Age,
        weight: result.Weight,
        height: result.Height,
        healthscore: result.HealthScore
      }));
    } catch (error) {
      console.error('error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    retrieveUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <Radar />
      <Heatmap />
      <Quest />
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
})
