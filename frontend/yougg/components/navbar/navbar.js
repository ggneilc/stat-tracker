import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Modal } from 'react-native';
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


const Infobar = ({props}) => {
  return (
    <>
      <Text> user: {props.Username}. Age: {props.Age} </Text>
      <Text> Height: {props.Height}in. Weight: {props.Weight} </Text>
    </>
  );
};


export const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const {control, handleSubmit } = useForm();


  const onSubmit = (d) => {
    //Posts the info to the login to store user obj
    fetch("http://10.9.243.45:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
    });
  }

  //Now GET from home
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://10.9.243.45:3000/home");
      const json = await response.json();
      setData(json);
    } catch(error) {
      console.error('error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const ping = async () => {
    const response = await fetch("http://10.9.243.45:3000/ping")
    const json = await reponse.json();
 }

  useEffect(() => {
    if (!modalVisible) {
      getUser();
    }
  }, [modalVisible]);


  return (
    <View style={styles.container}>
      <View style={[styles.item, styles.pfp]}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed");
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.item,styles.modal]}>
            <Text>Username:</Text>
            <Input name="Username" control={control}/>
            <Text>Password:</Text>
            <Input name="Password" control={control}/>
            <Button 
              title="Submit"
              onPress={handleSubmit(onSubmit)}
            />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text> close Window </Text>
            </Pressable>
          </View>
        </Modal>

        <Pressable 
          onPress={() => setModalVisible(true)}
          hitSlop={15}>
          <Text> Login </Text>
        </Pressable>

      </View>


      <View style={[styles.item, styles.info]}>
        {data ? <Infobar props={data} /> : null}
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
  },

  modal: {
    marginTop: 100,
    width: 300,
    height: 200
  }
 
})
