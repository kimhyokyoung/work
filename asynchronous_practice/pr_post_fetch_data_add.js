let users = []; //리스트를 담을 배열 생성
let leeButton = document.getElementById("lee");
let kimButton = document.getElementById("kim");
let seoulButton = document.getElementById("seoul");
let nameEmailButton = document.getElementById("nameEmail");
let all = document.getElementById("all");
let inputBox = document.getElementById("inputBox");
let selectBox = document.getElementById("selectBox");
let submit = document.getElementById("submit");
let joinSubmit = document.getElementById("joinSubmit");
let addUsers = []; //추가되는 리스트를 담을 배열
let inputName = document.getElementById("inputName");
let inputId = document.getElementById("inputId");
let inputEmail = document.getElementById("inputEmail");
let inputPhone = document.getElementById("inputPhone");
let inputWebsite = document.getElementById("inputWebsite");
let inputProvince = document.getElementById("inputProvince");
let inputCity = document.getElementById("inputCity");
let inputDistrict = document.getElementById("inputDistrict");
let inputStreet = document.getElementById("inputStreet");
let inputZipcode = document.getElementById("inputZipcode");
let inputCreatedAt = document.getElementById("inputCreatedAt");
let inputUpdatedAt = document.getElementById("inputUpdatedAt");
let test = [];


/*-----------------------------------------리스트 불러오기-----------------------------------------*/
async function loadList() {

    const data = await fetch("https://koreanjson.com/users")
    
    .then(function(response) {
        return response.json()});

    users = data; //불러온 리스트를 users에 넣기
}

/*-----------------------------------------리스트 추가하기-----------------------------------------*/

    async function addUserList() {

    const data1 =  await fetch("https://koreanjson.com/users", {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(addUsers)
    })

    .then(function(response) {
        console.log("111");
        return response.json()})
        console.log(addUsers);
        console.log(data1);

}




/*-----------------------------------------화면에 출력---------------------------------------------*/
function createUserEl(userList) {
    let elText =''; //빈값생성
    userList.forEach((el) => { //받은 파라미터 개수만큼 반복
        elText += `<div>
        <div style="font-weight: 600;">${el.id+"번"}</div>
        <div>이름 : ${el.name}</div>
        <div>id : ${el.username}</div>
        
        <div>email : ${el.email}</div>
        <div>phone : ${el.phone}</div>
        <div>website : ${el.website}</div>
        <div>주소 : ${el.province +" "+el.city  +" "+el.district+" "+ el.street + " ("+el.zipcode+") "}</div>
        <div>createdAt : ${el.createdAt}</div>
        <div>updatedAt : ${el.updatedAt}</div>
        <div>----------------------------------------------------------------------------</div>
        </div>`;
    });
    return elText;
}

/*--------------------------파라미터값이 있으면 받은 값을, 없으면 전체 출력------------------------*/
async function insertUsersEl(user) { 
    await loadList();
    let text =''; //비우기
    if(user === undefined){ //파라미터값이 없으면 전체 리스트를 저장함
        text= createUserEl(users);
    } else { //파라미터값이 있으면 leeButton에서 전달 받은 값들을 저장
        
        text = createUserEl(user);
        
    }
    document.getElementById("listText").innerHTML = text; //저장된 값을 출력
}
insertUsersEl(); //초기 화면 전체 리스트를 보여주기 위해 호출



/*-----------------------------------------성을 구분하는 함수-------------------------------------*/
function filterLastName(lastName) {
    const result = users.filter(user => user.name[0] === lastName) //name의 0번째 글자가 파라미터 값과 동일하면 반환
    // console.log(result);
    return result;
}

/*-----------------------------------------'이'씨만 버튼-----------------------------------------*/
leeButton.addEventListener("click", function () {
    document.getElementById("listText").innerHTML=''; //비우기
    let leeName = filterLastName("이"); //filterLastName 파라미터 값으로 "이" 전달. 해당되는 값들이 변수 leeName에 저장
    insertUsersEl(leeName); //변수 leeName에 저장된 값을 insertUserEl 함수로
});


/*-----------------------------------------'김'씨만 버튼-----------------------------------------*/
kimButton.addEventListener("click", function () {
    document.getElementById("listText").innerHTML=''; 
    let kimName = filterLastName("김"); 
    insertUsersEl(kimName); 
});


/*-------------------------------주소가 서울인 사람을 구분하는 함수-------------------------------*/
function filterArea(area) {
    const result = users.filter(user => user.city.includes('서울')) //'서울'을 포함하는 값
    return result;
}

/*--------------------------------------'서울'거주자만 버튼---------------------------------------*/
seoulButton.addEventListener("click", function () {
    document.getElementById("listText").innerHTML=''; 
    let seoulCheck = filterArea("서울"); 
    insertUsersEl(seoulCheck); 
});

/*---------------------------------'이름,이메일'만 보고싶은 함수----------------------------------*/
function nameAndEmail(userList) {
    let elText ='';
    userList.forEach((el) => { //받은 파라미터 개수만큼 반복
        elText += `<div>
        <div>${el.id+"번"}</div>
        <div>이름 : ${el.name+","}</div>
        <div>email : ${el.email+","}</div>
        <div>----------------------------------------------------------------------------</div>
        </div>`;
    });
    document.getElementById("listText").innerHTML=elText; 
}

/*--------------------------------------'이름,이메일'만 버튼---------------------------------------*/
nameEmailButton.addEventListener("click", function () {
    document.getElementById("listText").innerHTML=''; 
    nameAndEmail(users) ; //함수호출하면 _
});

/*-------------------------------------------'전체' 버튼-------------------------------------------*/
all.addEventListener("click", function () {
    insertUsersEl();
});


/*-----------------------------------------검색 텍스트 박스-----------------------------------------*/
inputBox.addEventListener('click',function() {
    inputBox.value =''; //값 비우기
})

/*-------------------------------------------'검색' 버튼-------------------------------------------*/
submit.addEventListener('click',function() {
    let result = nameIdsearch()
    insertUsersEl(result);

    if(inputBox.value == '' || inputBox.value=='검색') {
        alert('이름 또는 아이디를 입력하세요');
        insertUsersEl();
    }
})

/*-------------------------------------'이름/아이디' 검색 함수---------------------------------------*/
function nameIdsearch() {

    if(selectBox.value =="name"){ //select값이 name(이름)이면
        const search = users.filter(user => user.name == inputBox.value)
        return search;
    } else{
        const search = users.filter(user => user.username == inputBox.value)
        return search;
    }
}

/*-------------------------------------------회원 추가 버튼-------------------------------------------*/
joinSubmit.addEventListener('click', function(){
    addUsers = {
        id:inputId.value,
        name:inputName.value,
        username:inputEmail.value,
        email: inputEmail.value,
        phone:inputPhone.value,
        website:inputWebsite.value,
        province:inputProvince.value,
        district:inputDistrict.value,
        street:inputStreet.value,
        zipcode:inputZipcode.value,
        createdAt:inputCreatedAt.value,
        updatedAt:inputUpdatedAt.value
    }

    console.log(addUsers);
    addUserList();
    users.push(addUsers);
    console.log(users);
    insertUsersEl(users);
})


