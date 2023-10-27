import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { useForm, useController } from 'react-hook-form';


const Input = ({name, control}) => {
  const { field } = useController({
    control, 
    defaultValue: '',
    name,
  })
  return (
    <TextInput 
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};


export const Mealwheel = () => {

  const {control, handleSubmit } = useForm();
  const onSubmit = (d) => 
    Alert.alert(JSON.stringify(d));

  return (
    <View style={styles.container}>
      <View style={styles.item}>
          <Text>Food:</Text>
          <Input name="FoodName" control={control}/>
          <Text>Calories:</Text>
          <Input name="Calories" control={control}/>
          <Text>Protein:</Text>
          <Input name="Protein" control={control}/>
        <Button 
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 
  container: {
    flex: 5,
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

})
