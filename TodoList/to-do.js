
const toDos = [
    { name: "퇴근하기", state: "Incomplete" },
    { name: "집 가기", state: "Incomplete" },
    { name: "로또 당첨", state: "Incomplete" }
];

let inputBox = document.getElementById("inputField"); /*할일입ㄹ력창*/
let addToDo = document.getElementById("addToDo"); /*add 버튼*/
let toDoList = document.getElementById("toDoListUl"); /*할 일 리스트창*/


/*------------------------------------------------*/ 

function listUpdate() {
    let todoList = "";
    for (let i = 0; i < toDos.length; i++) {

        todoList += `<li class='lists'><span class="listText">${toDos[i].name}</span>
                        <button class='comButton'>${toDos[i].state}</button> 
                        <button class='delButton'>Delete</button> 
                    </li>`;
    }
    document.getElementById("toDoListUl").innerHTML = todoList;
}


function calendarCreate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + (today.getDate())).slice(-2);
    document.getElementById("calendar").innerHTML = year + "Y " + month + "M " + day + "D";
}

function modifyNumber(time) {
    if (parseInt(time) < 10) {
        return "0" + time;
    }
    else
        return time;
}
window.onload = function () {
    clockCreate();
    setInterval(clockCreate, 1000);
}


function clockCreate() {
    let dateInfo = new Date();
    let hour = modifyNumber(dateInfo.getHours());
    let min = modifyNumber(dateInfo.getMinutes());
    let sec = modifyNumber(dateInfo.getSeconds());
    document.getElementById("time").innerHTML = hour + "시 " + min + "분 " + sec + "초";
}


/*------------------------------------------------*/ 

listUpdate();
calendarCreate();
clockCreate();

addToDo.addEventListener("click", function () { //add버튼 클릭 시
    if (inputBox.value == '') {
        alert('할 일을 입력하시라');
    } else {
        let obj ={}
        obj['name'] = inputBox.value;
        obj['state'] = "Incomplete";

        toDos.push(obj);
        inputBox.value = null;
        listUpdate();
    }
});


toDoList.addEventListener("click", function (event) {
    //console.log(event);
    const target = event.target;

    
    if (target.classList.contains("comButton")) { /* 완료 or 미완료 */
        const index = [...target.parentNode.parentNode.children].indexOf(
            target.parentNode);

        const listText = document.querySelectorAll('.listText');
        const comBtn = document.querySelectorAll('.comButton');

        listText.forEach(function (text, i) {
            if (index == i) {

                if (toDos[index].state === "Complete") {
                    toDos[index].state = "Incomplete";
                    comBtn[i].textContent = "Incomplete";
                    text.classList.add('ing');
                    text.classList.remove('done');

                } else {
                    toDos[index].state = "Complete";
                    comBtn[i].textContent = "Complete";
                    text.classList.add('done');
                    text.classList.remove('ing');
                }
            }
        });
    }

    
    if (target.classList.contains("delButton")) { /* 삭제 */
        const index = [...target.parentNode.parentNode.children].indexOf(
            target.parentNode);
        console.log(index);
        const liFind = document.querySelectorAll('.lists');

        liFind.forEach(function (element, i) {
            if (index === i) {
                element.remove();
            }
        });
    }
});