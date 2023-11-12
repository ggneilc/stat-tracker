import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

//to fetch user id url
import { useSelector } from 'react-redux';
import { selectUser, addMeal } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const Plate = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [foodName, onChangeFoodName] = React.useState('');
  const [calories, onChangeCalories] = React.useState('');
  const [protein, onChangeProtein] = React.useState(''); 
  
  const onSubmit = async () => {

    const numericCals = parseFloat(calories);
    const numericProtein = parseFloat(protein);
    // Check if conversion is successful (not NaN)
    if (isNaN(numericCals) || isNaN(numericProtein) ) {
      // Handle invalid input (e.g., show an error message)
      console.error('Invalid input for cals or protein');
      return;
    }

    try {
      const url = "http://10.9.243.45:3000/users/"+user.id+"/meals";
      //Posts the info to the login to store user obj
      const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodname: foodName,
          calories: numericCals, 
          protein: numericProtein,
        }),
      });
      const result = await response.json();
      if (result.FoodName === foodName){
        dispatch(addMeal(result));
        console.log("successfuly added food");
      }
    } catch (error) {
      console.error("error:", error);
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.item}>

        <Text>Food:</Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          onChangeText={onChangeFoodName}
          value={foodName}/>

        <Text>Calories: </Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          onChangeText={onChangeCalories}
          value={calories}/>

        <Text>Protein:</Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          onChangeText={onChangeProtein}
          value={protein}/>


        <Button
          style={styles.meal}
          title="new meal"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 2,
    flexDirection: 'row',
    height: 50, 
    borderRadius: '10px',
    backgroundColor: '#000000'
  },

  item: {
    position: 'relative',
    margin: 10,
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: '10px'
  },

  input: {
    left: 70,
    top: -18,
    color: '#fff',
    backgroundColor: '#101010',
    height: 20,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },

  meal: {
    left: 100
  }

})
