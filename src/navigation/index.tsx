import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from '../screens/LoginScreen'

export type RootStackParamList = {
  Home: undefined
  LinkedInAuth: undefined
  CompleteProfile: {
    name: string
    email: string
    profilePicture: string
  }
  Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

import CompleteProfileScreen from '../screens/CompleteProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import LinkedInAuthScreen from '../screens/LinkedInAuthScreen'

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LinkedInAuth" component={LinkedInAuthScreen} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}