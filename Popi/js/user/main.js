var mapMove = {};
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
        url: 'http://dev.soxcorp.co.kr:21080/popi/home/getOutdoorMap.do',
        data: object,
        dataType: 'json',
        ContentType: 'text',
        success: function (data) {
            addMarker(data);
            console.log(data);
        }
    })
} //지도정보로 진행 중인 행사 마커 표시

//-------------------------건물에서 진행 중인 팝업 정보 불러오기------------------------------//

function getIndoorMap(location) {
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/home/getIndoorMap.do',
        data: location,
        dataType: 'json',
        ContentType: 'text',
        success: function (data) {
            console.log('성공');
            console.log(data);
            infoOpen(data);
        }
    })
}
//--------------------------건물에 진행 중인 팝업 정보 표시-------------------------------
function infoOpen(storeList) {
    let popupInfo = [];
    popupInfo = storeList.resultList;
    const groupedByFloor = groupByFloor(popupInfo);
    const floor = Object.keys(groupedByFloor);
    console.log(groupedByFloor)

    const popupCount = document.querySelector(".main__store--ing");
    const floorContainer = document.querySelector(".main__store--mark-floors");

    popupCount.innerHTML = `<b class="textColorRed">${storeList.count}개</b>의 팝업스토어 진행 중!`
    floorContainer.innerHTML=''; //값 비우기
    floor.forEach((i) => {

        const floorElement = document.createElement('div');
        floorElement.className = 'main__store--information';
        floorElement.innerHTML = `<div class="main__store--information-floor">${i.indexOf("-")?i:i.replace('-','B')}F</div>`;
        const popupElement = document.createElement('div');
        popupElement.className = 'main__store--popup';

        floorContainer.appendChild(floorElement); //floorElement를 자식요소로 추가
        floorElement.appendChild(popupElement);
        console.log(groupedByFloor[i])
        groupedByFloor[i].forEach(popup => {
            const popupDiv = document.createElement('div');
            popupDiv.className = 'main__store--information-img';
            popupDiv.innerHTML = `<a href="/popi/page/popupDetail.do?seq=${popup.seq}"><img src=${popup.title_image} class="img-ex"/>`;

            popupElement.appendChild(popupDiv);
        });
    });
}
//-----------------------------------메뉴 클릭-----------------------------------//
let menuIcon = document.getElementById('menuIcon'); //메뉴 아이콘
let menu = document.getElementById('mainMenu'); //메뉴
const information = document.getElementById('storeInformation'); //같은 건물의 진행중인 팝업 정보

menuIcon.addEventListener('click', function (event) {
    // const target = event.target;
    console.log("메뉴 눌림"); //클릭된게 머게 ~

    //메뉴
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

function markerClickHandler(){
    const markers = document.querySelectorAll('.outdoor_marker'); //마커
    for (const marker of markers){
        marker.addEventListener("click",function(event){
            const object = {
                latitude: marker.getAttribute('data-latitude'),
                longitude: marker.getAttribute('data-longitude')
            }

            // setCenter(object);
            getIndoorMap(object);


            if (information.classList.contains('hidden')) { //information의 클래스 중 hidden이 포함되어 잇으면
                console.log("마커 눌럿서");
                information.classList.add('opend'); //opend 추가-보임
                information.classList.remove('hidden'); //hidden 삭제
                zoomIn();
                setCenter(mapMove);
            } else if (information.classList.contains('opend')) { //information의 클래스 중 opend가 포함되어 잇으면
                getIndoorMap();
                information.classList.add('hidden'); //hidden 추가-숨김
                information.classList.remove('opend'); //opend 삭제
            }
        })
    }

}


function addMarker(storeList) {
    for(let index=0; index<storeList.count; index++){
        const store = storeList.resultList[index];
        var content =
            `<div class="marker_size outdoor_marker" data-latitude="${store.latitude}" data-longitude="${store.longitude}"> 
            <div class="mark--style-count" id="storeCount">${storeList.count}</div>
            <div class="mark--style"> 
                <div class="mark--style-body">
                    <div class="mark--style-body-title">${store.event_name}</div> 
        <div class="mark--style-body-img"><img class="mark--img" src="${storeList.resultList[index].title_image}"></div> 
        </div> 
        <div class="mark--style-under"></div> 
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
    markerClickHandler();
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


function groupByFloor(array) {
    return array.reduce((acc, item) => { //누적값,현재값
        const floor = item.floor;
        console.log(acc[floor]);
        console.log("acc", acc);
        if (!acc[floor]) {
            acc[floor] = [];
        }
        acc[floor].push(item);
        return acc;
    }, {});
}



//----------------------------------마커 클릭 시 지도 확대---------------------------------------//

function zoomIn() { //확대
    // 현재 지도의 레벨을 얻어옵니다
    var level = map.getLevel();
    map.setLevel(level =2);

}

function setCenter(center) { //클릭한 곳으로 이동
    var moveLatLon = new kakao.maps.LatLng(center.Ma,center.La);
    map.setCenter(moveLatLon);
}


kakao.maps.event.addListener(map, 'click', function(mouseEvent) { //클릭한 곳 위치 정보 가져오기
     mapMove= mouseEvent.latLng;
     console.log(mapMove);
    return mapMove;
});

