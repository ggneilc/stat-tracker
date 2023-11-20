import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

//todo & radar
export const Radar = () => {
  


  return (
    <View style={styles.container}>

      <View  style={[styles.item, styles.todo ]}>
        <Text> todo </Text>
      </View>

      <View style={[styles.item, styles.radar]}>
        <Text> radar chart  </Text>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: 'row',
    borderRadius: '10px',
    backgroundColor: '#111',
    alignContent: 'stretch',
  },

  item: {
    backgroundColor: '#ffffff',
    borderRadius: '10px'
  },

  radar: {
    position: 'relative',
    top: 75,
    left: 15,
    height: 250,
    width: 250
  },

  todo: {
    position: 'relative',
    top: 20,
    left: -35,
    height: 350,
    width: 50
  }

  
})

