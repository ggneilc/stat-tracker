import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Modal, Pressable } from 'react-native';

import { Plate } from '../plate/Plate'

import { useSelector } from 'react-redux';
import { selectUserMeals } from '../../features/user/userSlice';

/*
id: result.ID,
          foodname: result.FoodName,
          calories: result.Calories,
          protein: result.Protein,
          dayid: result.DayID,
*/

export const Mealwheel = () => {
  const userMeals = useSelector(selectUserMeals);
  const [modalVisible, setModalVisidble] = React.useState(false);
  const [totalCals, setTotalCals] = React.useState(0);
  const [totalPro, setTotalPro] = React.useState(0);

  //Calculate total calories
  //
  const calcCals = (meals) => {
    let sum = 0;
    let cum = 0;
    meals.forEach(meal => {
      sum += meal.Calories;
      cum += meal.Protein;
    });
    setTotalCals(sum);   
    setTotalPro(cum);
  }

  React.useEffect(() => {
    calcCals(userMeals)
  }, [userMeals])


  return (
    <View style={styles.container}>

      <Pressable
        style={{paddingTop: 50}}
        onPress={() => setModalVisidble(true)}>
        <View style={styles.item}>
            <Text style={styles.words}> cals eaten: {totalCals} </Text>
            <Text style={styles.words}> protein: {totalPro}g </Text>
        </View>
      </Pressable>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisidble(!modalVisible)
        }}>
          <View style={styles.modalView}>
          <Plate />
          <Pressable
            onPress={() => setModalVisidble(!modalVisible)}>
            <Text> Close Modal </Text>
          </Pressable>
          </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 5,
    flexDirection: 'row',
    alignContent: 'stretch',
    borderRadius: '10px',
    backgroundColor: '#000'
  },


  item: {
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center',
    height: 200,
    width: 375
  },

  modalView: {
    marginTop: 50,
    height: 700,
    margin: 20,
    backgroundColor: 'rgba(22, 21, 30, 0.80)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  words: {
    color: '#fff',
    fontSize: 28,
    top: 50,
    left: 80
  }

})
