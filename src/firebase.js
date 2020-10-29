import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAvValcY1FEKrM1bGBSANGIPm-9yAxQBug",
  authDomain: "ziouan-vite-vite.firebaseapp.com",
  databaseURL: "https://ziouan-vite-vite.firebaseio.com",
  projectId: "ziouan-vite-vite",
  storageBucket: "ziouan-vite-vite.appspot.com",
  messagingSenderId: "658445430000",
  appId: "1:658445430000:web:4791a45c2d091f5b69e635",
  measurementId: "G-5PL34TH3MW"
};

firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth()

export{
  db,
  auth
}