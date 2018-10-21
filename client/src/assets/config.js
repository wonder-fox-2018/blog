import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBEfq9P9Dfya8M9emU1jBEFcC8AVSCAgw8",
    authDomain: "h8blogid.firebaseapp.com",
    databaseURL: "https://h8blogid.firebaseio.com",
    projectId: "h8blogid",
    storageBucket: "h8blogid.appspot.com",
    messagingSenderId: "583280492362"
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp