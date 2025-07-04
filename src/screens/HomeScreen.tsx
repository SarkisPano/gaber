import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gaber</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LinkedInAuth')}
      >
        <Text style={styles.buttonText}>Continue with LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#888', marginTop: 20 }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0072b1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
})