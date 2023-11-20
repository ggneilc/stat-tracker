import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Image, Text, View, Button, TextInput } from 'react-native';

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
            numColumns={3}
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
    flexDirection: 'row',
    margin: 5,
    width: 100,
    height: 70,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#DBDBDA',
    borderRadius: 10
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
  text: {
    color: '#fff'
  }

})
