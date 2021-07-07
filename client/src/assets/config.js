import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmd9hAyZP3r1pMIYVuPZGXygtexfkfa_E",
    authDomain: "my-global-chat.firebaseapp.com",
    databaseURL: "https://my-global-chat.firebaseio.com",
    projectId: "my-global-chat",
    storageBucket: "my-global-chat.appspot.com",
    messagingSenderId: "725440223544"
};

let database = firebase.initializeApp(config).database()

export default database


