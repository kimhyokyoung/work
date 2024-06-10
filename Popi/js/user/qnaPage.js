let totalCount;
function getQnAList(page) {
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/board/getQnAList.do',
        data: page,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            align(data);
            divideType(data);
            addList(data);
            totalCount = data.resultMap.totalCount;
        },
        error:function (err){
          console.log(err);
        }
    })
}
let pageParam = {"page" : 1};
getQnAList(pageParam);

const preButton = document.getElementById("preButton");
const nextButton = document.getElementById("nextButton");

preButton.addEventListener('click',function (){ //이전 버튼
    console.log("이전");

    if (pageParam.page ===1) {
        console.log("1페이지");
    } else {
        pageParam.page--;
        getQnAList(pageParam);
    }
    console.log(pageParam);
})

nextButton.addEventListener('click',function (){ //다음 버튼
    if (pageParam.page === Math.floor(totalCount/15+1)) {
        console.log("마지막 페이지");
    } else {
        pageParam.page++;
        getQnAList(pageParam);
    }
    console.log(pageParam);
})


function divideType(params){
    let type = (params.resultList[0].type)*1;
    let textType = '';
    switch (type){
        case 0 :
            textType="제보합니다.";
            break;
        case 1 :
            textType="문의합니다.";
            break;
    }
    return textType;
}

function addList(params){
let addText = '';

for(let i=0; i<params.count;i++){

    addText +=`<div class="main__board--list-Tdata">
                        <div class="main__board--list-Tdata-no">${pageParam.page===1? params.resultMap.totalCount-i:(params.resultMap.totalCount-15*(pageParam.page-1))-i}</div>
                        <div class="main__board--list-Tdata-title"><a style="color: black; text-decoration: none" href="/popi/page/qnaDetail.do?seq=${params.resultList[i].seq}">${type(params)[i]}</a></div>
                        <div class="main__board--list-Tdata-date">${subDate(params)[i]}</div>
                        <div class="main__board--list-Tdata-state">${process(params)[i]}</div>
                    </div>`
}
document.getElementById("boardTable").innerHTML = addText;
}

function subDate(params){ //2024-06-04 11:23:02 =>24-06-04로 변경 (날짜 자르기)
    let subDate = [];
    for(let i=0; i<params.count;i++){
        let date = params.resultList[i].logdata;
        let result = date.substring(2, 10);
        subDate.push(result);
    }
    return subDate;
}

function process(params){ //진행 현황
    let subProcess = [];

    for(let i=0; i<params.count;i++){
        let text='';
    switch (params.resultList[i].process*1){
        case 0:
            text="처리 중";
            break;
        case 1:
            text="처리 완료";
            break;
        case 2:
            text="삭제";
            break;
    }
    subProcess.push(text);
    }
    return subProcess;
}

function type(params){ //제목 문의합ㄴㅣ다/제보합니다.
    let subType = [];

    for(let i=0; i<params.count;i++){
        let text='';
        switch (params.resultList[i].type*1){
            case 0:
                text="제보합니다.";
                break;
            case 1:
                text="문의합니다.";
                break;
        }
        subType.push(text);
    }
    return subType;
}

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


function align(params) {
    params.resultList.sort();
}
