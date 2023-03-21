import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignupScreen'

const Stack = createStackNavigator()
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='login' component={LoginScreen} />
    <Stack.Screen name='signup' component={SignUpScreen} />
</Stack.Navigator>
  )
}

export default AuthStack

