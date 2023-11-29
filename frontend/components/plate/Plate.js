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

    if (isNaN(numericCals) || isNaN(numericProtein) ) {
      console.error('Invalid input for cals or protein');
      return;
    }

    try {
      const url = "http://10.9.243.45:3000/users/"+user.id+"/meals";
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
      <View style={{flexDirection: 'row',alignSelf:'center'}}>
        <Text style={styles.nutrients}>{item.FoodName}  </Text>
        <Text style={styles.nutrients}>{item.Calories}C  </Text>
        <Text style={styles.nutrients}>{item.Protein}P</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={{fontSize: 28, color: '#fff', textAlign: 'center', }}> Today </Text>

        <View style={styles.inputRow}>
          <TextInput 
            style={styles.FoodInput}
            placeholder='Food Name'
            onChangeText={onChangeFoodName}
            value={foodName}/>
        </View>


        <View style={styles.inputRow}>
          <TextInput 
            style={styles.input}
            placeholder='calories'
            keyboardType='numeric'
            onChangeText={onChangeCalories}
            value={calories}/>


          <TextInput 
            style={styles.input}
            placeholder='protein'
            keyboardType='numeric'
            onChangeText={onChangeProtein}
            value={protein}/>

        <Button
          title="new meal"
          onPress={onSubmit}
        />

        </View>

        <View style={{width: 200, height: 1, backgroundColor: '#dcd', margin: 10,  alignSelf: 'center'}}>
        </View>

        <View style={styles.template}>
          <Image
            style={{width: 30, height: 30, alignSelf: 'center',}}
            source={require('../../assets/plus.png')} />
        </View>

        <View style={{width: 200, height: 1, backgroundColor: '#dcd', margin: 10,  alignSelf: 'center'}}>
        </View>

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
    flexWrap: 'wrap',
    margin: 10,
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: '10px'
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  info: {
    color: '#fff',
    fontSize: 18,
    padding: 10
  },

  FoodInput: {
    marginTop: 10,
    margin: 5,
    color: '#fff',
    backgroundColor: '#101010',
    height: 35,
    width: 275,
    borderWidth: 1,
    padding: 5,
    borderRadius: 2,
  },

  input: {
    margin: 5,
    color: '#fff',
    backgroundColor: '#101010',
    height: 35,
    width: 75,
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
  },




 
  meal: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 5,
    width: 275,
    height: 50,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#DBDBDA',
    borderRadius: 10
  },

  template: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 275,
    height: 50,
    backgroundColor: '#DBDBDA',
    borderWidth: 1,
    borderColor: '#fff',
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
    fontSize: 18,
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
