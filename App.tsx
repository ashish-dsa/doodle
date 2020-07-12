import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Canvas from './src/screens/canvas/Canvas';
import ImageSelector from './src/screens/main/ImageSelector';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ImageSelector} />
        <Stack.Screen name="Canvas" component={Canvas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
