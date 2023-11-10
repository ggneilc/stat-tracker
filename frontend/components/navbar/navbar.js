import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const Infobar = () => {
  const user = useSelector(selectUser);

  return (
    <>
      {user && (
        <View style={styles.container} > 
          <Text style={styles.text}> HealthScore: {user.healthscore} </Text>
          <Text style={styles.text}> Weight: {user.weight}lbs </Text>
        </View>
      )}
    </>
  );
};

export const Navbar = () => {

  return (
    <View style={styles.container}>
      <View style={[styles.item, styles.pfp]}>
      </View>

      <View style={[styles.item, styles.info]}>
        <Infobar />
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

  text: {
    color: '#fff',
    fontSize: 20
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
  },
})
