import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import { Navbar } from '../components/navbar/navbar.js';
import { Radar } from '../components/radar/radar.js';
import { Heatmap } from '../components/heatmap/heatmap.js';
import { Quest } from '../components/quest/Quest.js';


export const HomeScreen = () => {
  return (
      <View style={styles.container}>
          <Navbar  />
          <Radar />
          <Heatmap />
          <Quest />
      </View>
  );
}

export const SettingsScreen = () => {
  return (
    <View style={styles.container}> 
      <Text> beep boop </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

})
