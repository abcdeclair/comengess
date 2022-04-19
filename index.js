// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBus5Xs8QPbMbXWvQhmkx9rXWu9jwoQIkc",
  authDomain: "comp-eng-ess-group27.firebaseapp.com",
  projectId: "comp-eng-ess-group27",
  storageBucket: "comp-eng-ess-group27.appspot.com",
  messagingSenderId: "697425701371",
  appId: "1:697425701371:web:f69be2e4281cf07221035e",
  measurementId: "G-S4GDG9NSP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';

const db = getFirestore();
const users_ref = collection(db, 'users');

//  Access data test
// const items = await getDocs(users_ref);
// let i;
// items.docs.forEach(element => {
//   console.log(element.data());
//   i = element.id;
// });
// const hw_ref = collection(db,`users/${i}/homework`);
// const hw = await getDocs(hw_ref);
// hw.docs.forEach(e => {
//   console.log(e.data());
// })

let form = document.querySelector('#loginForm');

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

const users = await getDocs(users_ref);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = document.getElementById("username").value; 
  const p = document.getElementById("password").value;
  //console.log(u);
  //console.log(p);
  var isTrue = false;
  if(users){
    users.docs.forEach(element => {
    if(u == element.data().user && p == element.data().pass){
      isTrue = true;
    }
    });
  }
  if(isTrue){
    window.alert('รหัสถูกต้อง');
  }else{
    window.alert('รหัสผิด');
  }
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  
})

window.myFunction = myFunction;