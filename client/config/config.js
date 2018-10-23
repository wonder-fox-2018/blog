import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBINZU2VsFCGu6TDlHnGDI57TQmKatheMs",
    authDomain: "blog-project-217401.firebaseapp.com",
    databaseURL: "https://blog-project-217401.firebaseio.com",
    projectId: "blog-project-217401",
    storageBucket: "blog-project-217401.appspot.com",
    messagingSenderId: "304158514414"
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp