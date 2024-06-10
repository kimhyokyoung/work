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