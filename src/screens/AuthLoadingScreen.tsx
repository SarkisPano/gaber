import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'
import { getUserProfile } from '../services/firestore'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function AuthLoadingScreen() {
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user)
  
      if (user) {
        try {
          const profile = await getUserProfile(user.uid)
          
          if (profile && profile.name) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'CompleteProfile', params: {
                name: '',
                email: user.email || '',
                profilePicture: '',
              } }],
            })
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load user profile')
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }
    })
  
    return unsubscribe
  }, [])  

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0072b1" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
