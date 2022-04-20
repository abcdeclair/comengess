/*
class,id ของ hw ที่ใช้
    id: 
        work        - ตัวหัวข้อ
        title       - เป็นตัวinput type text ที่เอาไว้รับหัวข้อการบ้าน
        labeltitle  - เป็นlabel ของtitle
        senddate    - เป็นตัวinput type date ที่เอาไว้รับวันส่ง
        labeldate   - เป็นlabel ของsenddate
        addhomework - ปุ่มที่เอาไว้ใส่การบ้าน
        main-table  - ตารางของhw
    class: 
        finish      - class ของ แต่ละช่องในmain-table ที่บอกว่าทำเสร็จแล้ว
        nfinish     -class ของ แต่ละช่องในmain-table ที่บอกว่าทำเสร็จแล้ว
        isfinishcheckbox -class ของ checkboxที่บอกว่าทำเสร็จแล้วหรือยัง
        binbutton   -class ของปุ่มที่เอาไว้ลบการบ้าน

class,id ของ timetable ที่ใช้
    id: 
        timetable   -หัวข้อส่วนtimetable
        subject     - input type text รับ ชื่อวิชา
        labelsubject - labelของ subject
        days        - select ส่วนของวัน จันทร์ ถึงศุกร์
        labeldays   -label ของ days
        start       - select ส่วนเวลาเริ่มคาบ
        labelstart  - label ของ start
        end         - select ส่วนเวลาจบคาบ
        labelend    - labelของend
        addsubjectbutton - button ที่เอาไว้เพิ่มวิชาลงตารางเรียน
        table       -table ที่เป็นตารางเรียน
    class:
        used        -class ของ td ที่ถูกใช้แล้ว
        
*/



var alldata = []
let slot_for_homework = document.createElement("div")

function createheadforhw() {
    let header = document.createElement("h2")
    header.innerText = "WORK"
    header.id="work"
    slot_for_homework.appendChild(header)
}
function createinputforhw() {
    let title = document.createElement("input")
    title.id = "title"
    let label = document.createElement("label")
    label.id="labeltitle"
    label.htmlFor="title"
    label.innerText="Title:"
    let date = document.createElement("input")
    date.id = "senddate"
    date.type = "date"
    let labeldate = document.createElement("label")
    labeldate.id="labeldate"
    labeldate.htmlFor="senddate"
    labeldate.innerText="Duedate:"
    slot_for_homework.appendChild(label)
    slot_for_homework.appendChild(title)
    slot_for_homework.appendChild(labeldate)
    slot_for_homework.appendChild(date)
}

function createbuttonforhw() {
    let button = document.createElement("button")
    button.innerText = "Add"
    button.id="addhomework"
    button.onclick = function () {
        additemforhw()
    }
    slot_for_homework.appendChild(button)
}
function createtableforhw() {
    let table = document.createElement("table")
    table.id = "main-table"
    let thead = document.createElement("thead")
    let row = document.createElement("tr")
    let title = document.createElement("th")
    title.innerText = "Title"
    let duedate = document.createElement("th")
    duedate.innerText = "Duedate"
    let finish = document.createElement("th")
    finish.innerText = "Isfinish"
    let deletecol = document.createElement("th")
    deletecol.innerText="Delete"
    row.appendChild(title)
    row.appendChild(duedate)
    row.appendChild(finish)
    row.appendChild(deletecol)
    thead.appendChild(row)
    table.appendChild(thead)

    for (let i = 0; i < alldata.length; i++) {
        let r = document.createElement("tr")
        let d1 = document.createElement("td")
        let d2 = document.createElement("td")
        let d3 = document.createElement("td")
        let d4= document.createElement("td")

        let finishbutton = createfinishbuttonforhw(i)
        let removebutton = createremovebuttonforhw(i)

        d1.innerText = "" + alldata[i].title
        d2.innerText = "" + alldata[i].senddate
        if(alldata[i].isfinish){
            d1.className="finish"
            finishbutton.checked=true
        }else{
            d1.className="nfinish"
        }
        d3.appendChild(finishbutton)
        d4.appendChild(removebutton)
        r.appendChild(d1)
        r.appendChild(d2)
        r.appendChild(d3)
        r.appendChild(d4)
        table.appendChild(r)
    }

    slot_for_homework.appendChild(table)

}
createheadforhw()
createinputforhw()
createbuttonforhw()
createtableforhw()
function initworkforhw() {
    document.body.appendChild(slot_for_homework)
    resettableforhw()
}
function additemforhw() {
    var title = document.getElementById("title")
    var senddate = document.getElementById("senddate")
    if (senddate.value.length == 0 || title.value.length == 0) {
        alert("please insert title and date"); return
    }
    alldata.push({
        "title": title.value,
        "senddate": senddate.value,
        "isfinish": false
    })
    title.value = ""
    sortdataforhw()
    resettableforhw()

}
function resettableforhw() {
    const table = document.getElementById("main-table")
    table.remove()
    createtableforhw()
}

function sortdataforhw() {
    alldata.sort(function (a, b) {
        if (a.isfinish && b.isfinish) {
            return 0
        }
        if (a.isfinish) {
            return 1
        }
        if (b.isfinish) {
            return -1
        }
        var dmy = new Date(a.senddate)
        var dmy2 = new Date(b.senddate)
        return dmy - dmy2

    })
}

function createfinishbuttonforhw(idx) {
   let checkbox = document.createElement("input")
   checkbox.type="checkbox"
   checkbox.className="isfinishcheckbox"
   checkbox.id=""+idx
   checkbox.onclick=function(){
       alldata[parseInt(checkbox.id)].isfinish = !alldata[parseInt(checkbox.id)].isfinish
        sortdataforhw()
        resettableforhw()
   }
    return checkbox
}
function createremovebuttonforhw(idx) {
    let removebutton = document.createElement("button")
    removebutton.innerText = "Bin"
    removebutton.value = idx
    removebutton.className="binbutton"
    removebutton.onclick = function () {
        alldata.splice(removebutton.value, 1)
        var row = this.parentNode.parentNode
        row.remove()
        resettableforhw()
    }
    return removebutton
}
/////////////////////////////////////////////////////////////////////////////////////////
let slot_for_timetable  = document.createElement("div")

var datatable = []
const alldays = ["MON", "TUE", "WED", "THU", "FRI"]
const Ltime = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14.00", "14:30", "15:00", "15:30", "16:00"]
/*
 class,id ของ timetable ที่ใช้
    id: 
        timetable   -หัวข้อส่วนtimetable
        subject     - input type text รับ ชื่อวิชา
        labelsubject - labelของ subject
        days        - select ส่วนของวัน จันทร์ ถึงศุกร์
        labeldays   -label ของ days
        start       - select ส่วนเวลาเริ่มคาบ
        labelstart  - label ของ start
        end         - select ส่วนเวลาจบคาบ
        labelend    - labelของend
        addsubjectbutton - button ที่เอาไว้เพิ่มวิชาลงตารางเรียน
        table       -table ที่เป็นตารางเรียน
    class:
        used        -class ของ td ที่ถูกใช้แล้ว
 */
function createheadforTT(){
    let x = document.createElement("h2")
    x.id="timetable"
    x.innerText="Time Table"
    slot_for_timetable.appendChild(x)
}
function createinputforTT(){
    let subject = document.createElement("input")
    subject.id = "subject"

    let label = document.createElement("label")
    label.id="labelsubject"
    label.htmlFor="subject"
    label.innerText="Subject:"

    let inputday = document.createElement("select")
    inputday.id="days"
    for(let i =0;i<alldays.length;i++){
        let input_i = document.createElement("option")
        input_i.innerText=alldays[i]
        input_i.value=i+1
        inputday.appendChild(input_i)
    }
    let labelday = document.createElement("label")
    labelday.id="labeldays"
    labelday.htmlFor="days"
    labelday.innerText="Days:"

    let inputstart = document.createElement("select")
    inputstart.id="start"
    for(let i =0;i<Ltime.length;i++){
        let input_i = document.createElement("option")
        input_i.innerText=Ltime[i]
        input_i.value=i+1
        inputstart.appendChild(input_i)
    }
    let labelstart = document.createElement("label")
    labelstart.id="labelstart"
    labelstart.htmlFor="start"
    labelstart.innerText="Start:"

    let inputend = document.createElement("select")
    inputend.id="end"
    for(let i =0;i<Ltime.length;i++){
        let input_i = document.createElement("option")
        input_i.innerText=Ltime[i]
        input_i.value=i+1
        inputend.appendChild(input_i)
    }
    let labelend = document.createElement("label")
    labelend.id="labelend"
    labelend.htmlFor="end"
    labelend.innerText="End:"

    let buttonfortt = document.createElement("button")
    buttonfortt.id = "addsubjectbutton"
    buttonfortt.onclick=function(){
        additem()
    }
    buttonfortt.innerText="Add"
    slot_for_timetable.appendChild(label)
    slot_for_timetable.appendChild(subject)
    slot_for_timetable.appendChild(labelday)
    slot_for_timetable.appendChild(inputday)
    slot_for_timetable.appendChild(labelstart)
    slot_for_timetable.appendChild(inputstart)
    slot_for_timetable.appendChild(labelend)
    slot_for_timetable.appendChild(inputend)
    slot_for_timetable.appendChild(buttonfortt)
}



function gentable() {
    let table = document.createElement("table")
    table.id = "table"
    let thead = document.createElement("thead")
    let hr = document.createElement("tr")
    let th1 = document.createElement("th")
    th1.innerText = "DAYS\\TIME"
    hr.appendChild(th1)
    for (let i = 0; i < Ltime.length-1; i++) {
        let th_i = document.createElement("th")
        th_i.innerText = Ltime[i]+"-"+Ltime[i+1]
        hr.appendChild(th_i)
    }

    thead.appendChild(hr)
    table.appendChild(thead)
    

    var used = 0
    for (let i = 1; i <= 5; i++) {
        let counter = 1
        let row = document.createElement("tr")
        let dayname = document.createElement("td")
        dayname.innerText = alldays[i - 1]
        row.appendChild(dayname)
        while (counter <= Ltime.length + 1) {
            let cell_i = document.createElement("td")
            if (used < datatable.length && datatable[used].days == i && counter >= datatable[used].start && counter <= datatable[used].end) {
                cell_i.colSpan = datatable[used].end - datatable[used].start 
                cell_i.innerText = datatable[used].subject
                cell_i.value = used
                counter += datatable[used].end - datatable[used].start 
                cell_i.className = "used"
                cell_i.onclick = function () {
                    datatable.splice(cell_i.value, 1)
                    resettable()
                }
                used++
            } else {
                counter++
            }
            row.appendChild(cell_i)
        }
        table.appendChild(row)
    }
    slot_for_timetable.appendChild(table)

}
function additem() {
    var subject = document.getElementById("subject")
    var days = document.getElementById("days")
    var start = document.getElementById("start")
    var end = document.getElementById("end")
    if(subject.value.length==0){
        alert("subject mustn't be empty")
        return
    }
    if(parseInt(start.value)>=parseInt(end.value)){
        alert("start must come before end")
        return
    }
    if (find(start.value, end.value, days.value)) {
        alert("already used")
        return
    }
    console.log(typeof (start.value))
    datatable.push({
        "subject": subject.value,
        "days": days.value,
        "start": start.value,
        "end": end.value
    })
    sortdata()
    resettable()

}

function sortdata() {
    datatable.sort(function (a, b) {
        if (a.days == b.days) {
            return a.end - b.end
        }
        return a.days - b.days
    })
}
function resettable() {
    var table = document.getElementById("table")
    table.remove()
    gentable()
}
function find(checkstart, checkend, checkday) {
    for (let i = 0; i < datatable.length; i++) {
        if (parseInt(checkday) != parseInt(datatable[i].days) || parseInt(checkstart) >= parseInt(datatable[i].end) || parseInt(checkend) < parseInt(datatable[i].start)) {

        } else {
            return true
        }
    }
    return false
}

createheadforTT()
createinputforTT()
gentable()
function initforTT(){    
    document.body.appendChild(slot_for_timetable)
    resettable() 
}

function init(){
    initforTT()
    initworkforhw()
    
}
init()