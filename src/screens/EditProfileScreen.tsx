import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { auth } from '../services/firebase'
import { firestore, getUserProfile } from '../services/firestore'

export default function EditProfileScreen() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker')

  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser
      if (!user) return

      const profile = await getUserProfile(user.uid)
      if (profile) {
        setName(profile.name)
        setLocation(profile.location)
        setBio(profile.bio)
        setUserType(profile.userType)
      }
    }

    loadData()
  }, [])

  const handleUpdate = async () => {
    const user = auth.currentUser
    if (!user) return

    try {
      await updateDoc(doc(firestore, 'users', user.uid), {
        name,
        location,
        bio,
        userType,
      })

      Alert.alert('Success', 'Profile updated successfully.')
    } catch (error) {
      console.error('Error updating profile:', error)
      Alert.alert('Error', 'Failed to update profile.')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
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
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="User Type (job-seeker or employer)"
        value={userType}
        onChangeText={(value) =>
          setUserType(value === 'employer' ? 'employer' : 'job-seeker')
        }
      />

      <Button title="Update Profile" onPress={handleUpdate} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
