let storeList = {};
let buildingInfo = {};


//-----------------------------------지도 표시-----------------------------------//
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.525800073080276, 126.9285819471187), //지도의 중심좌표 (위도, 경도) ->현재 더현대 서울
    level: 3 //확대/축소 정도
};
var map = new kakao.maps.Map(container, options);


//-------------------------위치 정보 전달 및 팝업 정보 불러오기------------------------------//

function getOutdoorMap(object) {
    $.ajax({
        type: 'post',
        url: 'home/getOutdoorMap.do',
        data: object,
        dataType: 'json',
        ContentType: 'text',
        success: function (data) {
            // storeList = data;
            addMarker(data);
        }
    })
}

//-------------------------건물 정보 전달 및 팝업 정보 불러오기------------------------------//

function getIndoorMap(location) {
    $.ajax({
        type: 'post',
        url: 'home/getIndoorMap.do',
        data: location,
        dataType: 'json',
        ContentType: 'text',
        success: function (data) {
            console.log('성공');
            console.log(data);
        }
    })
}

function infoOpen(storeList) {

    let open= `
            <div class="main__store--ing"><b class="textColorRed">${storeList.count}개</b>의 팝업스토어 진행 중!</div>
            <div class="main__store--information" id="storeInfo">`;

    // for(let i=0; i<storeList.count; i++ ){
    // open += `<div class="main__store--information-floor">${객체.resultList[i].floor}</div>
    //             <div class="main__store--information-img">
    //                 <div class="img-ex">${객체.resultList[i].title_image}</div>
    //             </div>
    //         </div>`;
    // }
    
    document.getElementById("storeInformation").innerHTML = open;
}

//-----------------------------------메뉴 및 건물정보 클릭-----------------------------------//
let menuIcon = document.getElementById('menuIcon'); //메뉴 아이콘
let menu = document.getElementById('mainMenu'); //메뉴
const marker = document.getElementById('marker'); //마커
const information = document.getElementById('storeInformation'); //같은 건물의 진행중인 팝업 정보
const storeInfo = document.getElementById('storeInfo');

document.addEventListener('click', function (event) {
    const target = event.target;
    console.log("클릭 :" + target.id); //클릭된게 머게 ~

    //메뉴
    if (target.id == "menuIcon") { //클릭한 거 id가 menuicon이면
        if (menu.classList.contains('hidden')) { //menu의 클래스 중 hidden이 포함되어 잇으면
            console.log("메뉴 열엇어~");
            menu.classList.add('opend'); //opend 추가-보임
            menu.classList.remove('hidden'); //hidden 삭제
        } else if (menu.classList.contains('opend')) { //menu의 클래스 중 opend가 포함되어 잇으면
            if (target.id == "menuIcon") { //클릭햇을 때 id가 menuicon이면
                menu.classList.add('hidden'); //hidden 추가-숨김
                menu.classList.remove('opend'); //opend 삭제
                console.log('메뉴 눌러서 닫앗어');
            }
        }
    } else if (target.id != 'mainMenu') { //메뉴부분이 아닌 아무 곳을 눌럿으 ㄹ때 id가 mainMenu가 아니면
        if (menu.classList.contains('opend')) { //menu의 클래스 중 opend 상태일 때
            if (target.className === 'main__menu--board' || target.className === 'main__menu--serviceIntroduce') { //게시판 or 서비스 소개 눌럿을 때는
                console.log('메뉴 닫지마');
            } else {
                menu.classList.add('hidden'); //hidden 추가-숨김
                menu.classList.remove('opend'); //opend 삭제
                console.log('다른 곳 눌러서 닫앗어');
            }
        }
    }

    //마커

    if (target.classList.contains("marker")) { //클릭한 거 id가 marker면
        if (information.classList.contains('hidden')) { //information의 클래스 중 hidden이 포함되어 잇으면
            console.log("마커 눌럿서");
            information.classList.add('opend'); //opend 추가-보임
            information.classList.remove('hidden'); //hidden 삭제
        } else if (information.classList.contains('opend')) { //information의 클래스 중 opend가 포함되어 잇으면
            if (target.classList.contains("marker")) { //클릭햇을 때 id가 marker면
                information.classList.add('hidden'); //hidden 추가-숨김
                information.classList.remove('opend'); //opend 삭제
                console.log('마커 눌러서 닫앗어');
            }
        }
    } else if (target.id != 'storeInfo') { //눌럿으 ㄹ때 id가 information이 아니면
        if (information.classList.contains('opend')) { //menu의 클래스 중 opend 상태일 때
            if (target.className === 'main__store--information' || target.className === 'main__store--information-floor' || target.className === 'main__store--information-img' || target.className === 'img-ex' || target.className === 'main__store--ing' || target.classList === 'textColorRed') { //게시판 or 서비스 소개 눌럿을 때는
                console.log('정보 닫지마');
            } else {
                information.classList.add('hidden'); //hidden 추가-숨김
                information.classList.remove('opend'); //opend 삭제
                console.log('다른 곳 눌러서 닫앗어');
            }
        }
    }
})

//-----------------------------------위치 이동-----------------------------------//
let currentLocation = document.getElementById('currentLocation');

currentLocation.addEventListener('click', function () {

    if (navigator.geolocation) {
        console.log('현재위치로 이동');

        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var moveLatLon = new kakao.maps.LatLng(lat, lon); //이동할 위치
            map.setCenter(moveLatLon);     // 지도 이동
        })
    }
})

//-----------------------------------커스텀 오버레이(마커)-----------------------------------//
function addMarker(storeList) {

    for(let index=0; index<storeList.count; index++){
        const store = storeList.resultList[index];
        var content =
        `<div class="marker--style-size marker" id="marker"> 
            <div class="marker--style-count marker">${storeList.count}</div>
            <div class="marker--style marker"> 
                <div class="marker--style-body marker">
                    <div class="marker--style-body-title marker">${store.event_name}</div> 
        <div class="marker--style-body-img"><img class="marker--img marker"></div> 
        </div> 
        <div class="marker--style-under marker"></div> 
        </div>
        </div>`;

        var position = new kakao.maps.LatLng(store.longitude, store.latitude);  //커스텀 오버레이가 표시되는 위치-> 더현대 서울
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            xAnchor: -0.5,
            yAnchor: 0.2
        });
        customOverlay.setMap(map); // 커스텀 오버레이를 지도에 표시
    }
}
//----------------------------------지도 정보 전달---------------------------------------//
function getAndAddOutdoors(){
    var bounds = map.getBounds();
    let object = {"minX": bounds.ha, "minY": bounds.qa, "maxX": bounds.oa, "maxY": bounds.pa};
    getOutdoorMap(object);
}
//----------------------------------지도 이동 이벤트---------------------------------------//
kakao.maps.event.addListener(map, 'dragend',function (){
    getAndAddOutdoors();
})
getAndAddOutdoors();

//---------------------------------------------------------------------------------------//


