import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../navigation'

type CompleteProfileRouteProp = RouteProp<RootStackParamList, 'CompleteProfile'>

export default function CompleteProfileScreen() {
  const route = useRoute<CompleteProfileRouteProp>()
  const { name, email, profilePicture } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>

      <Image source={{ uri: profilePicture }} style={styles.image} />

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
})
