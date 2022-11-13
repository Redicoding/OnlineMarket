import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import BasketScreen from "./screens/BasketScreen"

import { Provider } from 'react-redux';
import store from "./store";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurants' component={RestaurantsScreen} />
          <Stack.Screen name='Basket' component={BasketScreen} options={{ presentation: 'modal', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App