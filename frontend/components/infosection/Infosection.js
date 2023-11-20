import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export const Infosection = () => {

  const sampleData = [
    { x: 1, y: 200 }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.item}>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    marginTop: 15,
    flex: 1,
    alignContent: 'stretch',
    borderRadius: '10px',
    backgroundColor: '#202020',
    width: 350
  },

  item: {
    height: 80,
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center'
  },


})
