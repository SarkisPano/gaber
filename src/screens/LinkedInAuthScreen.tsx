import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../navigation'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LinkedInAuth'>

export default function LinkedInAuthScreen() {
  const navigation = useNavigation<NavigationProp>()

  const handleSimulatedLogin = () => {
    const simulatedData = {
      name: 'Ani Sarkissian',
      email: 'ani@example.com',
      profilePicture: 'https://i.pravatar.cc/300?u=ani',
    }

    navigation.navigate('CompleteProfile', simulatedData)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulating LinkedIn Login</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' }}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.button} onPress={handleSimulatedLogin}>
        <Text style={styles.buttonText}>Continue with LinkedIn</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
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

