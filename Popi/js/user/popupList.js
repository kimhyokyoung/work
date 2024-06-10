let totalCount;
//----------------------------------------날짜 설정------------------------------------------
let today = new Date();
let startYear = today.getFullYear();
let startMonth = ('0' + (today.getMonth() + 1)).slice(-2);
let startDay = ('0' + today.getDate()).slice(-2);
let startDate = startYear + '-' + startMonth  + '-' + startDay; //오늘 날짜

let oneWeek = new Date(today.setDate(today.getDate() + 7));
let endYear = oneWeek.getFullYear();
let endMonth = ('0' + (oneWeek.getMonth() + 1)).slice(-2);
let endDay = ('0' + oneWeek.getDate()).slice(-2);
let endDate = endYear + '-' + endMonth  + '-' + endDay; //7일 후 날짜


//-----------------------------------------데이터 호출------------------------------------------
let params = {"startday" : startDate, "endday" : endDate, "location": "", "category": "", page: 1};

function getPostList(object) {
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/list/getPopList.do',
        data: object,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            addStoreList(data);
        }
    })
}
getPostList(params);


//-----------------------------------------지역 및 카테고리 설정------------------------------------------
const region = document.getElementById("region");
const category = document.getElementById("category");
let regionSelect, categorySelect ='';

region.addEventListener('change',function (){
    regionSelect = region.value;
    params.location = regionSelect;
    getPostList(params);
    console.log(params);
})



category.addEventListener('change',function (){
    switch (category.value) {
        case "etc":
            categorySelect = "0";
            break;
        case "food" :
            categorySelect = "1";
            break;
        case "character" :
            categorySelect = "2";
            break;
        case "fashion" :
            categorySelect = "3";
            break;
    }
    params.category = categorySelect;
    getPostList(params)
    console.log(params);
})

//-------------------------------------------날짜 텍스트--------------------------------------------
const dateFilter = document.getElementById("dateFilter");
dateFilter.value = startDate + "  ~  " + endDate;


//-------------------------------------------테이블 생성--------------------------------------------
const storeList =  document.getElementById("storeList");
let addText='';

function addStoreList(list){
    addText ='';
    alignDate(list);
for(let i=0; i<list.count;i++){
    let popupList = list.resultList[i];

addText += `<div class="select__main--storeList">
        <div class="select__main__posterImg">
                <img src=${popupList.title_image} class="img-ex"/>
        </div>
                <div class="select__main__information">
                    <div class="select__main__information--title">${popupList.event_name}</div>
                    <div class="select__main__information--schedule">${popupList.startday} ~ ${popupList.endday}</div>
                    <div class="select__main__information--detail"><a href="/popi/page/popupDetail.do?seq=${popupList.event_seq}">상세정보</a></div>
                </div>
            </div>`;
}
document.getElementById("storeList").innerHTML = addText;
}

function alignDate(list){
    const sorted_list = list.resultList.sort(function (a,b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).reverse();
    return sorted_list;
}


const preButton = document.getElementById("preButton");
const nextButton = document.getElementById("nextButton");

preButton.addEventListener('click',function (){ //이전 버튼
    console.log("이전");

    if (params.page ===1) {
        console.log("1페이지");
    } else {
        params.page--;
        getPostList(params);
    }
    console.log(params);
})

nextButton.addEventListener('click',function (){ //다음 버튼
    if (params.page === Math.floor(totalCount/30+1)) {
        alert("마지막페이지");
    } else {
     params.page++;
     getPostList(params);
    }
    console.log(params);
    console.log("다음");
})

//---------------------메뉴---------------------------
let menuIcon = document.getElementById('menuIcon'); //메뉴 아이콘
let menu = document.getElementById('mainMenu'); //메뉴
const information = document.getElementById('storeInformation'); //같은 건물의 진행중인 팝업 정보

menuIcon.addEventListener('click', function (event) {
    // const target = event.target;
    console.log("메뉴 눌림"); //클릭된게 머게 ~

    if (menuIcon) { //클릭한 거 id가 menuicon이면
        if (menu.classList.contains('hidden')) { //menu의 클래스 중 hidden이 포함되어 잇으면
            console.log("메뉴 열엇어~");
            menu.classList.add('opend'); //opend 추가-보임
            menu.classList.remove('hidden'); //hidden 삭제
        } else if (menu.classList.contains('opend')) { //menu의 클래스 중 opend가 포함되어 잇으면
            if (menuIcon) { //클릭햇을 때 id가 menuicon이면
                menu.classList.add('hidden'); //hidden 추가-숨김
                menu.classList.remove('opend'); //opend 삭제
                console.log('메뉴 눌러서 닫앗어');
            }
        }
    }
})

