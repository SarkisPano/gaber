import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'
import { getUserProfile } from '../services/firestore'



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>()
  const [profile, setProfile] = useState<any>(null)

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

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser
      if (!user) return
  
      try {
        const data = await getUserProfile(user.uid)
        setProfile(data)
      } catch (error) {
        console.error('Failed to load profile:', error)
      }
    }
  
    fetchProfile()
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {profile ? `Welcome, ${profile.name}!` : 'Loading profile...'}
      </Text>
      <Text style={{ marginBottom: 8 }}>{profile?.email}</Text>
      <Text style={{ marginBottom: 24 }}>{profile?.bio}</Text>

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