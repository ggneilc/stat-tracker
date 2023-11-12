import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { Infosection } from '../components/infosection/Infosection';
import { Mealwheel } from '../components/mealwheel/Mealwheel';
import { Plate } from '../components/plate/Plate';
import { Pastmeals } from '../components/pastmeals/Pastmeals';

//import function for setting user 
import { useDispatch } from 'react-redux';
import { setUserMeals } from '../features/user/userSlice';

import { useSelector } from 'react-redux';
import { selectUser, selectUserMeals } from '../features/user/userSlice';

export const MealScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const userMeals = useSelector(selectUserMeals);

  const retrieveUserMeals = async () => {
    try {
      const url = "http://10.9.243.45:3000/users/"+user.id+"/meals";
      const response = await fetch(url);
      const result = await response.json();
      console.log("result of backend: "+result);
      dispatch(setUserMeals({ meals: result }));
    } catch (error) {
      console.error('error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    if (user !== null){
      retrieveUserMeals();
    }
  }, [user]);

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
