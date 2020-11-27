import firebase from 'firebase/app'
import 'firebase/firestore'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE,
    authDomain: 'nauka-af6ed.firebaseapp.com',
    databaseURL: 'https://nauka-af6ed.firebaseio.com',
    projectId: 'nauka-af6ed',
    storageBucket: 'nauka-af6ed.appspot.com',
    messagingSenderId: '772950995216',
    appId: '1:772950995216:web:5f9485ac9da664f811f595',
    measurementId: 'G-ZDYJ8KS105',
  }

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  inject('firebase', firebase)
}
