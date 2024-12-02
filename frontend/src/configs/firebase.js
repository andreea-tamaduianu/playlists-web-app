import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAYCwPFLsA62ZKKPI8fEqaqt3FTYHS8r7g',
  authDomain: 'tic-project-10892.firebaseapp.com',
  databaseURL: 'https://tic-project-10892-default-rtdb.firebaseio.com',
  projectId: 'tic-project-10892',
  storageBucket: 'tic-project-10892.appspot.com',
  messagingSenderId: '389076462280',
  appId: '1:389076462280:web:8f5f9e45300ddc240ed3fd'
}

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth, firebase }
