import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export const Plate = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Button
          title="new meal"
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 3,
    flexDirection: 'row',
    alignContent: 'stretch',
    borderRadius: '10px',
  },


  item: {
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center',
    height: 50,
    width: 100
  },

})
