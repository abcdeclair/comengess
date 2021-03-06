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
  measurementId: "G-S4GDG9NSP0",
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
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const db = getFirestore();
const users_ref = collection(db, "users");
const users = await getDocs(users_ref);

// main page

var currentPage = "login";
var start = true;
var alldata = [];
let slot_for_homework = document.createElement("div");
slot_for_homework.id = "slot_for_homework"
let slot_for_navbar = document.createElement("div");
slot_for_navbar.id = "slot_for_navbar"
async function createnavbar(uid) {
  const user_ref = doc(db, `users/${uid}`);
  const user = await getDoc(user_ref)
  let div = document.createElement("div");
  div.id = "navbar";
  let label = document.createElement("paragraph");
  label.id = "tabwork";
  label.innerText = "TabWork";
  let hello = document.createElement("paragraph");
  hello.id = "hello";
  hello.innerText = "HELLO "
  let name = document.createElement("paragraph");
  name.id = "name";
  name.innerText = user.data().firstName;
  let logout = document.createElement("button");
  logout.id = "logout";
  logout.innerText = "logout";
  logout.onclick = function () {
    currentPage = "login";
    document.body.innerHTML = "";
    alldata = []
    datatable = []
    slot_for_homework.innerHTML = ""
    slot_for_timetable.innerHTML = ""
    slot_for_navbar.innerHTML = ""
    initLogin();
  }
  div.appendChild(label);
  div.appendChild(hello);
  div.appendChild(name);
  div.appendChild(logout);
  slot_for_navbar.appendChild(div)
}

function initNavbar(u) {
  createnavbar(u)
  document.body.appendChild(slot_for_navbar);
}

function createheadforhw() {
  let header = document.createElement("h2");
  header.innerText = "WORK";
  header.id = "work";
  slot_for_homework.appendChild(header);
}
function createinputforhw() {
  let title = document.createElement("input");
  title.id = "title";
  let label = document.createElement("label");
  label.id = "labeltitle";
  label.htmlFor = "title";
  label.innerText = "Title:";
  let date = document.createElement("input");
  date.id = "senddate";
  date.type = "date";
  let labeldate = document.createElement("label");
  labeldate.id = "labeldate";
  labeldate.htmlFor = "senddate";
  labeldate.innerText = "Duedate:";
  slot_for_homework.appendChild(label);
  slot_for_homework.appendChild(title);
  slot_for_homework.appendChild(labeldate);
  slot_for_homework.appendChild(date);
}

function createbuttonforhw(uid) {
  let button = document.createElement("button");
  button.innerText = "Add";
  button.id = "addhomework";
  button.onclick = function () {
    additemforhw(uid);
  };
  slot_for_homework.appendChild(button);
}
async function createtableforhw(uid) {
  let table = document.createElement("table");
  table.id = "main-table";
  let thead = document.createElement("thead");
  let row = document.createElement("tr");
  let title = document.createElement("th");
  title.innerText = "Title";
  let duedate = document.createElement("th");
  duedate.innerText = "Duedate";
  let finish = document.createElement("th");
  finish.innerText = "Isfinish";
  let deletecol = document.createElement("th");
  deletecol.innerText = "Delete";
  row.appendChild(title);
  row.appendChild(duedate);
  row.appendChild(finish);
  row.appendChild(deletecol);
  thead.appendChild(row);
  table.appendChild(thead);

  const hw_ref = collection(db, `users/${uid}/homework`);
  const hw = await getDocs(hw_ref);
  hw.docs.forEach(e => {
    alldata.push({
      title: e.data().work,
      senddate: e.data().date,
      isfinish: e.data().isFinish,
      id: e.id
    });
  })
  sortdataforhw();
  //console.log(alldata)
  for (let i = 0; i < alldata.length; i++) {
    let r = document.createElement("tr");
    let d1 = document.createElement("td");
    let d2 = document.createElement("td");
    let d3 = document.createElement("td");
    let d4 = document.createElement("td");
    r.id = alldata[i].id;

    let finishbutton = createfinishbuttonforhw(i, uid, r.id);
    let removebutton = createremovebuttonforhw(i, uid, r.id);

    d1.innerText = "" + alldata[i].title;
    d2.innerText = "" + alldata[i].senddate;
    if (alldata[i].isfinish) {
      d1.className = "finish";
      finishbutton.checked = true;
    } else {
      d1.className = "nfinish";
    }
    d3.appendChild(finishbutton);
    d4.appendChild(removebutton);
    r.appendChild(d1);
    r.appendChild(d2);
    r.appendChild(d3);
    r.appendChild(d4);
    table.appendChild(r);
  }

  slot_for_homework.appendChild(table);
}

function initworkforhw(uid) {
  createheadforhw();
  createinputforhw();
  createbuttonforhw(uid);
  createtableforhw(uid);
  document.body.appendChild(slot_for_homework);
  //resettableforhw(uid)
}
async function additemforhw(uid) {
  const hw_ref = collection(db, `users/${uid}/homework`);
  var title = document.getElementById("title");
  var senddate = document.getElementById("senddate");
  if (senddate.value.length == 0 || title.value.length == 0) {
    alert("please insert title and date");
    return;
  }
  addDoc(hw_ref, {
    work: title.value,
    date: senddate.value,
    isFinish: false
  })
  title.value = "";
  alldata = [];
  resettableforhw(uid);
}
function resettableforhw(uid) {
  const table = document.getElementById("main-table");
  table.remove();
  createtableforhw(uid);
}

function sortdataforhw() {
  alldata.sort(function (a, b) {
    if (a.isfinish && b.isfinish) {
      return 0;
    }
    if (a.isfinish) {
      return 1;
    }
    if (b.isfinish) {
      return -1;
    }
    var dmy = new Date(a.senddate);
    var dmy2 = new Date(b.senddate);
    return dmy - dmy2;
  });
}

function createfinishbuttonforhw(idx, uid, rid) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "isfinishcheckbox";
  checkbox.id = "" + idx;
  checkbox.onclick = async function () {
    alldata[parseInt(checkbox.id)].isfinish =
      !alldata[parseInt(checkbox.id)].isfinish;
    const ref = doc(db, `users/${uid}/homework/${rid}`);
    await updateDoc(ref, {
      isFinish: alldata[parseInt(checkbox.id)].isfinish
    })
    alldata = [];
    resettableforhw(uid);
  };
  return checkbox;
}
function createremovebuttonforhw(idx, uid, rid) {
  let removebutton = document.createElement("button");
  removebutton.innerText = "Bin";
  removebutton.value = idx;
  removebutton.className = "binbutton";
  removebutton.onclick = async function () {
    const ref = doc(db, `users/${uid}/homework/${rid}`)
    await deleteDoc(ref)
    alldata.splice(removebutton.value, 1);
    var row = this.parentNode.parentNode;
    row.remove();
    alldata = [];
    resettableforhw(uid);
  };
  return removebutton;
}
/////////////////////////////////////////////////////////////////////////////////////////
let slot_for_timetable = document.createElement("div");
slot_for_timetable.id = "slot_for_timetable"
var datatable = [];
const alldays = ["MON", "TUE", "WED", "THU", "FRI"];
const Ltime = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14.00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];
/*
 class,id ????????? timetable ??????????????????
    id: 
        timetable   -??????????????????????????????timetable
        subject     - input type text ????????? ????????????????????????
        labelsubject - label????????? subject
        days        - select ?????????????????????????????? ?????????????????? ????????????????????????
        labeldays   -label ????????? days
        start       - select ????????????????????????????????????????????????
        labelstart  - label ????????? start
        end         - select ???????????????????????????????????????
        labelend    - label?????????end
        addsubjectbutton - button ??????????????????????????????????????????????????????????????????????????????????????????
        table       -table ???????????????????????????????????????????????????
    class:
        used        -class ????????? td ???????????????????????????????????????
 */
function createheadforTT() {
  let x = document.createElement("h2");
  x.id = "timetable";
  x.innerText = "Time Table";
  slot_for_timetable.appendChild(x);
}
function createinputforTT(uid) {
  let subject = document.createElement("input");
  subject.id = "subject";

  let label = document.createElement("label");
  label.id = "labelsubject";
  label.htmlFor = "subject";
  label.innerText = "Subject:";

  let inputday = document.createElement("select");
  inputday.id = "days";
  for (let i = 0; i < alldays.length; i++) {
    let input_i = document.createElement("option");
    input_i.innerText = alldays[i];
    input_i.value = i + 1;
    inputday.appendChild(input_i);
  }
  let labelday = document.createElement("label");
  labelday.id = "labeldays";
  labelday.htmlFor = "days";
  labelday.innerText = "Days:";

  let inputstart = document.createElement("select");
  inputstart.id = "start";
  for (let i = 0; i < Ltime.length; i++) {
    let input_i = document.createElement("option");
    input_i.innerText = Ltime[i];
    input_i.value = i + 1;
    inputstart.appendChild(input_i);
  }
  let labelstart = document.createElement("label");
  labelstart.id = "labelstart";
  labelstart.htmlFor = "start";
  labelstart.innerText = "Start:";

  let inputend = document.createElement("select");
  inputend.id = "end";
  for (let i = 0; i < Ltime.length; i++) {
    let input_i = document.createElement("option");
    input_i.innerText = Ltime[i];
    input_i.value = i + 1;
    inputend.appendChild(input_i);
  }
  let labelend = document.createElement("label");
  labelend.id = "labelend";
  labelend.htmlFor = "end";
  labelend.innerText = "End:";

  let buttonfortt = document.createElement("button");
  buttonfortt.id = "addsubjectbutton";
  buttonfortt.onclick = function () {
    additem(uid);
  };
  buttonfortt.innerText = "Add";
  slot_for_timetable.appendChild(label);
  slot_for_timetable.appendChild(subject);
  slot_for_timetable.appendChild(labelday);
  slot_for_timetable.appendChild(inputday);
  slot_for_timetable.appendChild(labelstart);
  slot_for_timetable.appendChild(inputstart);
  slot_for_timetable.appendChild(labelend);
  slot_for_timetable.appendChild(inputend);
  slot_for_timetable.appendChild(buttonfortt);
}

async function gentable(uid) {
  let tablediv = document.createElement("div")
  tablediv.id = "tabdiv"

  let table = document.createElement("table");
  table.id = "table";
  let thead = document.createElement("thead");
  let hr = document.createElement("tr");
  thead.id = "timehead"
  let th1 = document.createElement("th");
  th1.innerText = "DAYS\\TIME";
  hr.appendChild(th1);
  for (let i = 0; i < Ltime.length - 1; i++) {
    let th_i = document.createElement("th");
    th_i.innerText = Ltime[i] + "-" + Ltime[i + 1];
    hr.appendChild(th_i);
  }

  thead.appendChild(hr);
  table.appendChild(thead);

  datatable = []

  const tb_ref = collection(db, `users/${uid}/timetable`);
  const tb = await getDocs(tb_ref);
  tb.docs.forEach(e => {
    datatable.push({
      subject: e.data().subject,
      days: e.data().day,
      start: e.data().start,
      end: e.data().end,
      id: e.id
    });
  })
  sortdata();

  var used = 0;
  for (let i = 1; i <= 5; i++) {
    let counter = 1;
    let row = document.createElement("tr");
    let dayname = document.createElement("td");
    dayname.innerText = alldays[i - 1];
    dayname.id = alldays[i - 1]
    row.appendChild(dayname);
    while (counter <= Ltime.length) {
      let cell_i = document.createElement("td");
      if (
        used < datatable.length &&
        datatable[used].days == i &&
        counter >= datatable[used].start &&
        counter <= datatable[used].end
      ) {
        cell_i.colSpan = datatable[used].end - datatable[used].start;
        cell_i.innerText = datatable[used].subject;
        cell_i.value = used;
        counter += datatable[used].end - datatable[used].start;
        cell_i.className = "used";
        cell_i.id = alldays[i - 1];
        const idc = datatable[used].id
        cell_i.onclick = async function () {
          const ref = doc(db, `users/${uid}/timetable/${idc}`)
          await deleteDoc(ref)
          resettable(uid);
        };
        used++;
      } else {
        counter++;
      }
      row.appendChild(cell_i);
    }
    table.appendChild(row);
  }
  tablediv.appendChild(table)
  slot_for_timetable.appendChild(tablediv);
}
async function additem(uid) {
  var subject = document.getElementById("subject");
  var days = document.getElementById("days");
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  if (subject.value.length == 0) {
    alert("subject mustn't be empty");
    return;
  }
  if (parseInt(start.value) >= parseInt(end.value)) {
    alert("start must come before end");
    return;
  }
  if (find(start.value, end.value, days.value)) {
    alert("already used");
    return;
  }
  const tb_ref = collection(db, `users/${uid}/timetable`);
  addDoc(tb_ref, {
    subject: subject.value,
    day: days.value,
    start: start.value,
    end: end.value
  })
  subject.value = ""
  sortdata();
  resettable(uid);
}

function sortdata() {
  datatable.sort(function (a, b) {
    if (a.days == b.days) {
      return a.end - b.end;
    }
    return a.days - b.days;
  });
}
function resettable(uid) {
  var table = document.getElementById("table");
  table.remove();
  gentable(uid);
}
function find(checkstart, checkend, checkday) {
  for (let i = 0; i < datatable.length; i++) {
    if (
      parseInt(checkday) != parseInt(datatable[i].days) ||
      parseInt(checkstart) >= parseInt(datatable[i].end) ||
      parseInt(checkend) <= parseInt(datatable[i].start)
    ) {
    } else {
      return true;
    }
  }
  return false;
}


function initforTT(u) {
  createheadforTT();
  createinputforTT(u);
  gentable(u);
  document.body.appendChild(slot_for_timetable);
}

function init(u) {
  initNavbar(u);
  initforTT(u);
  initworkforhw(u);
}
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// register page
let slot_for_register = document.createElement("div");
slot_for_register.id = "registerbox";

function createLogoforReg(){
  let logo = document.createElement("img");
  logo.src = "tabwork-logo.png";
  logo.id = "logo";
  slot_for_register.appendChild(logo);
}

function createHeadForRegister() {
  let headReg = document.createElement("h2");
  headReg.id = "headReg";
  headReg.innerText = "Register";
  slot_for_register.appendChild(headReg);
}

async function createFormForRegister() {
  let formReg = document.createElement("form");

  let fName = document.createElement("input");
  fName.id = "firstname";
  fName.name = "firstname";
  fName.placeholder = "First name";
  fName.type = "text";
  fName.required = "true";

  formReg.appendChild(fName);

  let lName = document.createElement("input");
  lName.id = "lastname";
  lName.name = "lastname";
  lName.placeholder = "Last name";
  lName.required = "true";
  lName.type = "text";

  formReg.appendChild(lName);

  let userReg = document.createElement("input");
  userReg.id = "userreg";
  userReg.name = "userreg";
  userReg.placeholder = "Username";
  userReg.type = "text";
  userReg.required = "true";

  formReg.appendChild(userReg);

  let passReg = document.createElement("input");
  passReg.id = "password";
  passReg.name = "password";
  passReg.placeholder = "Password";
  passReg.type = "password";
  passReg.required = "true";

  formReg.appendChild(passReg);

  let regBtn = document.createElement("input");
  regBtn.id = "register";
  regBtn.type = "submit";
  regBtn.value = "REGISTER";
  regBtn.style.cursor = "pointer";
  regBtn.onclick = function () {
    if (fName.value == "" || lName.value == "" || userReg.value == "" || passReg.value == "") {

    }
    else {
      var isValid = false;
      if (users) {
        users.docs.forEach((element) => {
          if (
            userReg.value == element.data().user
          ) {
            isValid = true;
          }
        });
      }
      if(isValid){
        window.alert("This username is already in use.")
      }else{
        addDoc(users_ref, {
          firstName: fName.value,
          lastName: lName.value,
          user: userReg.value,
          pass: passReg.value
        })
        document.body.innerHTML = "";
        initLogin();
      }
      currentPage = "login";
      fName.value = ""
      lName.value = ""
      userReg.value = ""
      passReg.value = ""

    }

  }

  formReg.appendChild(regBtn);
  let backlogin = document.createElement("p");
  backlogin.innerText = "back to login";
  backlogin.style.cursor = "pointer"
  backlogin.onclick = function () {
    currentPage = "login"
    document.body.innerHTML = ""
    initLogin()
  }
  formReg.appendChild(backlogin)

  slot_for_register.appendChild(formReg)

}
createLogoforReg()
//createHeadForRegister()
createFormForRegister()
function initReg() {

  document.body.appendChild(slot_for_register)
}
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

//login page
let slot_for_login = document.createElement("div");
slot_for_login.id = "loginbox";

function createLogo(){
  let logo = document.createElement("img");
  logo.src = "tabwork-logo.png";
  logo.id = "logo";
  slot_for_login.appendChild(logo);
}

function createHeadForLogin() {
  let head = document.createElement("h2");
  head.innerText = "Login";
  head.id = "headLogin";
  slot_for_login.appendChild(head);
}

function createFormForLogin() {
  let form = document.createElement("form");
  let username = document.createElement("input");
  username.id = "username";
  username.name = "username";
  username.placeholder = "Username";
  username.type = "text";
  username.required = "true";

  form.appendChild(username);

  let password = document.createElement("input");
  password.id = "password";
  password.name = "password";
  password.placeholder = "Password";
  password.type = "password";
  password.required = "true";

  form.appendChild(password);

  let checkLogin = document.createElement("input");
  checkLogin.id = "checkpassbox";
  checkLogin.type = "checkbox";
  checkLogin.onclick = function () {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  let br = document.createElement("br");
  form.appendChild(br);
  let br1 = document.createElement("br");
  form.appendChild(br1);

  let labelBox = document.createElement("label");
  labelBox.innerText = "Show password";
  labelBox.htmlFor = "checkLogin";

  form.appendChild(checkLogin);
  form.appendChild(labelBox);

  let login = document.createElement("input");
  login.id = "login";
  login.type = "submit";
  login.value = "LOGIN";
  login.style.cursor = "pointer";
  login.onclick = function () {
    var isTrue = false;
    let user_id;
    if (users) {
      users.docs.forEach((element) => {
        if (
          username.value == element.data().user &&
          password.value == element.data().pass
        ) {
          user_id = element.id;
          isTrue = true;
        }
      });
    }

    if (password.value == "" || username.value == "") {
      //   window.alert('please enter username or password')
    } else if (isTrue) {
      username.value = "";
      password.value = "";
      //window.alert("?????????????????????????????????");
      document.body.innerHTML = "";
      init(user_id);
      currentPage = "main";
    } else {
      window.alert("Username or password incorrect");
    }
  };
  form.appendChild(login);

  let reg = document.createElement("p");
  reg.innerText = "register";
  reg.style.cursor = "pointer"
  reg.onclick = function () {
    currentPage = "register"
    document.body.innerHTML = ""
    initReg()
  }
  form.appendChild(reg);
  slot_for_login.appendChild(form);
}

createLogo()
//createHeadForLogin();
createFormForLogin();
function initLogin() {

  document.body.appendChild(slot_for_login);
}

if (currentPage == "login") {
  initLogin();
  start = false;
}

if (currentPage == "main") {
  init();
}

