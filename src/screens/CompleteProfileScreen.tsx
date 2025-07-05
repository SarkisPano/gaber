import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../navigation'
import { auth } from '../services/firebase'
import { saveUserProfile } from '../services/firestore'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CompleteProfile'>

export default function CompleteProfileScreen() {
  const navigation = useNavigation<NavigationProp>()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker')

  const handleContinue = async () => {
    if (!name || !location || !userType) {
      Alert.alert('Please fill all fields.')
      return
    }
  
    const user = auth.currentUser
    if (!user) {
      Alert.alert('No authenticated user.')
      return
    }
  
    try {
      // Save user profile to Firestore
      await saveUserProfile(
        user.uid,
        name,
        user.email || '',
        location,
        bio,
        userType
      )
  
      // Navigate to Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    } catch (error: any) {
      Alert.alert('Failed to save profile', error.message)
    }
  }
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Complete your profile</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
  
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Short bio (optional)"
          value={bio}
          onChangeText={setBio}
          multiline
        />
  
        <View style={styles.tagSelector}>
          <Button
            title="Looking for a job"
            color={userType === 'job-seeker' ? '#0072b1' : '#ccc'}
            onPress={() => setUserType('job-seeker')}
          />
          <Button
            title="Looking for talent"
            color={userType === 'employer' ? '#0072b1' : '#ccc'}
            onPress={() => setUserType('employer')}
          />
        </View>
  
        <Button title="Continue" onPress={handleContinue} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  tagSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
})
