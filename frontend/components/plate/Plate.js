import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, View, Button, TextInput } from 'react-native';

//to fetch user id url
import { useSelector } from 'react-redux';
import { selectUser, selectUserMeals, addMeal } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const Plate = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userMeals = useSelector(selectUserMeals);

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


  const renderMealItem = ({ item }) => (
    <View style={styles.meal}>
      <Text style={styles.text}>{item.FoodName}</Text>
      <Text style={styles.text}>Calories: {item.Calories}</Text>
      <Text style={styles.text}>Protein: {item.Protein}</Text>
      {/* Add more details if needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.item}>

        <View style={styles.inputRow}>
        <Text style={styles.info}>Food:</Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          onChangeText={onChangeFoodName}
          value={foodName}/>
        </View>


        <View style={styles.inputRow}>
        <Text style={styles.info}>Calories: </Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          keyboardType='numeric'
          onChangeText={onChangeCalories}
          value={calories}/>
        </View>


        <View style={styles.inputRow}>
        <Text style={styles.info}>Protein:</Text>
        <TextInput 
          style={styles.input}
          placeholder=''
          keyboardType='numeric'
          onChangeText={onChangeProtein}
          value={protein}/>
        </View>


        <Button
          title="new meal"
          onPress={onSubmit}
        />


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
    backgroundColor: '#000000'
  },

  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: '10px'
  },

  inputRow: {
    flexDirection: 'row',
    width: '100%',
  },

  info: {
    color: '#fff',
    fontSize: 18,
    padding: 10
  },



  input: {
    marginTop: 5,
    color: '#fff',
    backgroundColor: '#101010',
    height: 35,
    width: 150,
    borderWidth: 1,
    padding: 5,
  },
 
  meal: {
    margin: 10,
    width: 100,
    height: 50,
    backgroundColor: '#101010',
  },

  text: {
    color: '#fff'
  }

})
