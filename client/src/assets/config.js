import firebase from 'firebase'

const host = 'http://localhost:3000'
const setupSize = {
  quality: 0.5,
  maxWidth: 500,
  maxHeight: 500,
  autoRotate: true,
  debug: true
}
const configFirebase = {
  apiKey: "AIzaSyC4Y-lrdiQTjaGapqKCIbttCLywhpjYkZ4",
  authDomain: "blogtivate.firebaseapp.com",
  databaseURL: "https://blogtivate.firebaseio.com",
  projectId: "blogtivate",
  storageBucket: "blogtivate.appspot.com",
  messagingSenderId: "509390343300"
};
const firebaseApp = firebase.initializeApp(configFirebase);
export default {
  host,
  setupSize,
  firebaseApp
}
