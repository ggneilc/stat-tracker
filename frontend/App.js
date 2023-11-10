import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { MealScreen } from './screens/MealScreen';
import { WeightScreen } from './screens/WeightScreen';
import { DataScreen } from './screens/DataScreen';
import { LogScreen } from './screens/LogScreen';
import { CreateAccount } from './screens/CreateAccount';

import { Provider } from 'react-redux';
import store from './store/store';


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator 
      initialRouteName='Home' 
      tabBarPosition="bottom">
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Meals" component={MealScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Weight" component={WeightScreen} />
      <Tab.Screen name="Logs" component={LogScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
            headerShown: false,
        }}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} />
          <Stack.Screen 
            name="CreateAccount" 
            component={CreateAccount} />
          <Stack.Screen 
            name="App" 
            component={Tabs}
            options={{
              gestureEnabled: false,
                gestureDirection: 'horizontal-inverted', // Disable swipe back gesture
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

