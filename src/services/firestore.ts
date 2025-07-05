import { doc, setDoc } from 'firebase/firestore'
import { firestore } from './firebase'

/**
 * Saves the full user profile to Firestore under 'users/{uid}'
 */
export const saveUserProfile = async (
  uid: string,
  name: string,
  email: string,
  location: string,
  bio: string,
  userType: 'job-seeker' | 'employer',
  profilePicture: string = ''
) => {
  try {
    await setDoc(doc(firestore, 'users', uid), {
      name,
      email,
      location,
      bio,
      userType,
      profilePicture,
      createdAt: new Date().toISOString(),
    })
    console.log('User profile saved to Firestore.')
  } catch (error) {
    console.error('Error saving user profile:', error)
    throw error
  }
}
