import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCvSWpGTXl8OnudvWEm7D1VuVOOg1eZGJg',
  authDomain: 'wiki-project-67e23.firebaseapp.com',
  databaseURL: 'https://wiki-project-67e23.firebaseio.com',
  projectId: 'wiki-project-67e23',
  storageBucket: 'wiki-project-67e23.appspot.com',
  messagingSenderId: '1038434676123',
}

firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const storage = firebase.storage()
export default firebase
export const storageKey = 'KEY_FOR_LOCAL_STORAGE'

export const isAuthenticated = () => !!auth.currentUser || !!localStorage.getItem(storageKey)
