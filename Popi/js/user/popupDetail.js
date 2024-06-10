const urlParams = new URL(window.location.href).searchParams;
const seq = urlParams.get('seq');
console.log(seq);

let object = {"event_seq" : seq}
getPopDetail(object);

function getPopDetail(object) {
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/list/getPopDetail.do',
        data: object,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            addStoreInfo(data);
        },
        error:function (err){
            console.log(err)
        }
    })
}

function addStoreInfo(info) {
    console.log(info.resultMap);


    let popupInfo = info.resultMap;
    let addText = `
                    <div class="detailInfor__main__information--top">
                        <div class="category-viewCount">(${divideCategory(info)})</div>
                        <div class="detailInfor__main__information--title">${popupInfo.event_name}
                        </div>
                    </div>
                    <div class="viewCount">
                        <div class="category-viewCount">조회수 ${popupInfo.view_count}</div>              
                    </div>

                <div class="detailInfor__main__information--contents--img"><img src="${popupInfo.title_image}" class="information--img"></div>
                <div class="detailInfor__main__information--contents">
                    <div class="detailInfor__main__information--contents--title">일정 :&nbsp;</div>
                    <div class="detailInfor__main__information--contents--form">${popupInfo.startday} ~ ${popupInfo.endday}</div>
                </div>
                <div class="detailInfor__main__information--contents">
                    <div class="detailInfor__main__information--contents--title">운영시간 :&nbsp;</div>
                    <div class="detailInfor__main__information--contents--form">${popupInfo.opening_hours}</div>
                </div>
                <div class="detailInfor__main__information--contents">
                    <div class="detailInfor__main__information--contents--title">위치 :&nbsp;</div>
                    <div class="detailInfor__main__information--contents--form">${popupInfo.address+popupInfo.floor} 층
                        <button value="getLocation" class="user_button">길찾기</button>
                    </div>
                </div>
                <div class="detailInfor__main__information--contents-map">내부지도<img></div>
            </div>
`;
    document.getElementById("storeInfo").innerHTML = addText;
}

function divideCategory(params){
    let category = params.resultMap.category*1;
    let textCategory='';
    console.log(category);
    switch (category) {
        case 0:
            textCategory = "기타";
            break;
        case 1 :
            textCategory = "음식";
            break;
        case 2 :
            textCategory = "캐릭터";
            break;
        case 3 :
            textCategory = "패션";
            break;
    }
    console.log(textCategory);
    return textCategory;
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