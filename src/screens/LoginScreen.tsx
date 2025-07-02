import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation<NavigationProp>()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate('Home')
    } catch (error: any) {
      Alert.alert('Login failed', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Gaber</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
})
