const query = document.location.search;
const param = new URLSearchParams(query);
const seq = param.get("seq");

function  inputPopupInfo(popup, comment){
    const process = popup.process === '0' ? '접수중' : popup.process === '1' ?  '처리 완료' : popup.process === '2' && '삭제됨'
    console.log(popup)
    $('#popupName').text(popup.storename);
    $('#popupLocation').text(popup.location);
    $('#popupImage').append(`<img src=/${popup.image}/>`);
    $('#popupEmail').text(popup.email);
    $('#popupText').text(popup.text);
    $('#popupProcess').text(process);
    comment.forEach((item)=>$('#popupComment').append(`            <div class="boardCheck__main__bottom--commentbox">
                <div class="boardCheck__main__bottom--commentbox-text">
                    <div class="boardCheck__main__bottom--commentbox">
                        <div class="boardCheck__main__bottom--commentbox-text">${item.comment}</div>
                    </div>
                </div>
            </div>`))

}

function getPostList() {
    const object = {board_seq:seq}

    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/board/getQnADetail.do',
        data: object,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            const result = data.resultMap;
            const comment = data.resultList;
            console.log(data)
            inputPopupInfo(result, comment);
        },
        error: function (err){
            console.log(err)
        }
    })
}
getPostList();

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