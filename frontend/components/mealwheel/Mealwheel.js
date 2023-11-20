import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Modal, Pressable } from 'react-native';
import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";

import { Svg, Circle } from 'react-native-svg';

import { Plate } from '../plate/Plate'

import { useSelector } from 'react-redux';
import { selectUserMeals } from '../../features/user/userSlice';

export const Mealwheel = () => {
  const userMeals = useSelector(selectUserMeals);
  const [modalVisible, setModalVisidble] = React.useState(false);
  const [totalCals, setTotalCals] = React.useState(0);
  const [totalPro, setTotalPro] = React.useState(0);

  //Calculate total calories
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

  const data = [
    { x: "Eaten", y: totalCals},
    { x: "toEat", y: 1300}
  ]


  return (
    <View style={styles.container}>

      <Pressable
        onPress={() => setModalVisidble(true)}>
        <Svg  width={450} height={450}>
          <Circle cx={225} cy={205} r={60} fill="#101010" stroke={'#DBDBDA'}/>

          <VictoryPie
            width={450}
            innerRadius={100}
            data={data} 
            style={{
              data: { fill: ({ datum }) => datum.x === "Eaten" ? "#72FF78" : "#c43a31"},
              labels: { fill: "#dcdab7"},
              parent: { }
            }}
          />
        </Svg>
      </Pressable>

      <Text style={styles.words}> cals: {totalCals} </Text>

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
    alignContent: 'center',
    borderRadius: '10px',
    backgroundColor: '#101010',
    width: 450,
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
  },

  words: {
    position: 'absolute',
    color: '#DBDBDA',
    fontSize: 22,
    top: 190,
    left: 170
  },


})
