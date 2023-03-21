import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
const Stack = createStackNavigator()

const AppStack = () => {
  return (
    
  <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='home' component={HomeScreen} />
  </Stack.Navigator>
  
  )
}

export default AppStack

