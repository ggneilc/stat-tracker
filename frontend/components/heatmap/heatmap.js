
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';



export const Heatmap = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.item]}>
        <Text> boxes here ! </Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    height: 50, 
    borderRadius: '10px',
    backgroundColor: '#000000'
  },

  item: {
    margin: 10,
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: '10px'
  }

})
