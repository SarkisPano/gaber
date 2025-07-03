import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function AuthLoadingScreen() {
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        console.log('Auth state changed:', user)
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
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
