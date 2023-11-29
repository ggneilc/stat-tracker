import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUser, selectGoals} from '../../features/user/userSlice';

const Infobar = () => {
  const user = useSelector(selectUser);
  const goals = useSelector(selectGoals);

  return (
    <>
      {user && goals && (
        <View style={styles.container}>

          <View style={styles.hs}>
            <Text style={styles.text}> {user.healthscore} </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.text}>  {user.weight}lbs </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.text}> G:</Text>
            <Text style={{color: '#fff', alignSelf: 'center', fontSize: 18}}> {goals.general}</Text>
          </View>

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
    alignSelf: 'center',
    color: '#fff',
    fontSize: 28
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

  infoItem: { 
    flexDirection: 'row',
    margin: 5,
    width: 110,
    height: 35,
    textAlign: 'center',
    backgroundColor: '#555'
  },

  hs: {
    margin: 5,
    marginRight: 0,
    width: 50,
    height: 35,
    textAlign: 'center',
    backgroundColor: '#000'
  }
})
