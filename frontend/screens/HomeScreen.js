import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

//import function for setting user 
import { useDispatch } from 'react-redux';
import { setUser, setGoals } from '../features/user/userSlice';

import { Navbar } from '../components/navbar/navbar.js';
import { Quest } from '../components/quests/Quest.js';
import { Heatmap } from '../components/heatmap/heatmap.js';
import { Radar } from '../components/radar/radar.js';

export const HomeScreen = () => {
  const [userLoaded, setUserLoaded] = React.useState(false);
  const [id, setId] = React.useState(0);
  const dispatch = useDispatch();
  
  const retrieveUser = async () => {
    try {
      const response = await fetch("http://10.9.243.45:3000/home");
      const result = await response.json();
      console.log("Getting Home: "+result);
      setId(result.ID);
      dispatch(setUser({
        id: result.ID,
        username: result.Username,
        email: result.Email,
        age: result.Age,
        weight: result.Weight,
        height: result.Height,
        healthscore: result.HealthScore
      }));
      setUserLoaded(true);
    } catch (error) {
      console.error('error fetching user data:', error);
    }
  };

  const retrieveGoals = async () => {
    try { 
      const url = "http://10.9.243.45:3000/users/"+id;
      const response = await fetch(url +"/goals");
      const result = await response.json();
      console.log("Goals", JSON.stringify(result, null, 2));
      dispatch(setGoals({
        general: result.GeneralGoal,
        bodyweight: result.BodyweightGoal,
        calorie: result.CalorieGoal,
        protein: result.ProteinGoal,
        water: result.WaterGoal,
        sleep: result.SleepGoal,
      }));
    } catch (error) {
      console.error('error fetching user data:', error);
    }
  }

  React.useEffect(() => {
    if (userLoaded){
      retrieveGoals();
    }
  }, [userLoaded]);

  

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
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    color: '#fff',
  }, 
})
