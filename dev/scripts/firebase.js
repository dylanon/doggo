import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyALWamD34pm4LMj-YUxKDDUHEbBqn-390E",
    authDomain: "doglog-fc202.firebaseapp.com",
    databaseURL: "https://doglog-fc202.firebaseio.com",
    projectId: "doglog-fc202",
    storageBucket: "",
    messagingSenderId: "900360389303"
};
firebase.initializeApp(config);

export default firebase;