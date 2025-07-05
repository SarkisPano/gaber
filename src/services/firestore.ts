import { doc, getDoc, setDoc } from 'firebase/firestore'
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

/**
 * Fetches the user profile document from Firestore
 */
export const getUserProfile = async (uid: string) => {
    try {
      const docRef = doc(firestore, 'users', uid)
      const docSnap = await getDoc(docRef)
  
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        console.warn('User profile not found')
        return null
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }
