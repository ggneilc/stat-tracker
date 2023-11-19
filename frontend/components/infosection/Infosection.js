import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export const Infosection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text> text </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    alignContent: 'stretch',
    borderRadius: '10px',
    backgroundColor: '#101010',
    width: 350
  },

  item: {
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center'
  },


})
