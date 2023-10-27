import * as React from 'react';
import { HomeScreen, SettingsScreen } from './screens/home';
import { MealScreen } from './screens/meals';

import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';


//Scenes (Screens) to render
const renderScene = SceneMap({
  first: SettingsScreen,
  second: MealScreen,
  third: HomeScreen,
  fourth: SettingsScreen,
  fifth: SettingsScreen,
});


export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(2);
  const [routes] = React.useState([
    {key: 'first', title: 'Data'},
    {key: 'second', title: 'Meal'},
    {key: 'third', title: 'Home'},
    {key: 'fourth', title: 'Gym'},
    {key: 'fifth', title: 'Log'},
  ]);

  return (  
    <TabView 
      navigationState={{ index, routes }}
      tabBarPosition='bottom'
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
    />
  );
}

