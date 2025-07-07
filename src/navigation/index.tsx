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
  SignUp: undefined
  AuthLoading: undefined
  EditProfile: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import CompleteProfileScreen from '../screens/CompleteProfileScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import LinkedInAuthScreen from '../screens/LinkedInAuthScreen'
import SignUpScreen from '../screens/SignUpScreen'


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthLoading">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="LinkedInAuth" component={LinkedInAuthScreen} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}