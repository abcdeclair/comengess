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
const users = await getDocs(users_ref);
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

//let form = document.querySelector('#loginForm');

let slot_for_login = document.createElement("div")
slot_for_login.id = "loginbox"

function createHeadForLogin(){
  let head = document.createElement("h2")
  head.innerText = "Login"
  head.id = "headLogin"
  slot_for_login.appendChild(head)

}

// function loginClick() {
//   var x = document.getElementById("password");
//   if (x.type === "password") {
//     x.type = "text";
//   } else {
//     x.type = "password";
//   }
// }

function createFormForLogin(){
  let form = document.createElement("form")
  let username = document.createElement("input")
  username.id = "username"
  username.name = "username"
  username.placeholder = "Username"
  username.type = "text"
  username.required

  form.appendChild(username)

  let password = document.createElement("input")
  password.id = "password"
  password.name = "password"
  password.placeholder = "Password"
  password.type = "password"
  password.required

  form.appendChild(password)

  let checkLogin = document.createElement("input")
  checkLogin.id = "checkpassbox"
  checkLogin.type = "checkbox"
  checkLogin.onclick = function(){
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  form.appendChild(checkLogin)

  let login = document.createElement("input")
  login.id = "login"
  login.type = "submit"
  login.value = "LOGIN"
  login.onclick = function(){
    var isTrue = false;
    if(users){
      users.docs.forEach(element => {
        if(username.value == element.data().user && password.value == element.data().pass){
          isTrue = true
        }
      });
      
    }
    if(password.value == "" || username.value == ""){
      window.alert('please enter username or password')
    }
     else if(isTrue){
      window.alert('รหัสถูกต้อง')
    }
    else{
      window.alert('Username or password incorrect')
    }
    username.value = ""
    password.value = ""
  }
  form.appendChild(login)
  slot_for_login.appendChild(form)









}


function initLogin(){
  createHeadForLogin()
  createFormForLogin()
  document.body.appendChild(slot_for_login)
}

initLogin()
