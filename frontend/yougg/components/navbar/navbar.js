import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';



export const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.item, styles.pfp]}>
        <Text> pfp </Text>
      </View>


      <View style={[styles.item, styles.info]}>
        <Text> infobar </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    borderRadius: '10px',
  },

  item: {
    border: '1px solid rgba(0,0,0, 0.5)',
    backgroundColor: '#3e3e41',
    borderRadius: '10px',
    justifySelf: 'center',
    alignSelf: 'center'
  },

  pfp: {
    position: 'relative',
    left: -10,
    height: 50,
    width: 50,
    backgroundColor: '#3e3e41',
  },

  info: {
    position: 'relative',
    left: 10,
    height: 50,
    width: 300
  }
 
})
