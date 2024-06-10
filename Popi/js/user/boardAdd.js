$(document).ready(function (){

    let imageFiles = [];
    let fileNameList = [];

    function fileUpload (formData){
        console.log(formData)
        $.ajax({
            async:'false',
            type: 'post',
            url: 'http://dev.soxcorp.co.kr:21080/popi/upload.do',
            data: formData,
            dataType: 'JSON',
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                fileNameList.push(data.resultMap.fileName)
                console.log(fileNameList)
            },
            error:function (err){
                console.log(err);
            }
        })
    }



    $('#imageFileBtn').change(function (e){

        if(imageFiles.length === 4){
            $('#imageFileBtn').val('')
            alert("이미지파일은 4장까지 첨부 가능합니다");
            return;
        }
        const file = e.target.files[0];


        if(file){
            inputFileIntoList(file);
            createFileListEL(file);
            const formData = new FormData();
            formData.append("file", file);
            fileUpload(formData);

        }
    })

    function inputFileIntoList(file){
        const fileName = file.name.split('.');
        const extension = fileName[fileName.length - 1];

        if (extension !== 'jpeg' && extension !== 'jpg' && extension !== 'png' && extension !== 'gif') {
            alert('확장자를 확인해주세요');

            return;
        }

        imageFiles.push(file);

    }

    function readURL(file, $imgPopup) {
        if (file) {
            const reader = new FileReader();
            console.log(reader)
            reader.onload = function(e) {
                console.log(e.target.result)
                $imgPopup.attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            document.getElementById('preview').src = "";
        }
    }

    function createFileListEL(file){

        const $li = $(`<li>${file.name} <button class="button__no-line">x</button><img src="../images/temporaryLogo.png" class="img__popup"></li>`);
        const $imgPopup = $li.find('.img__popup');
        $(".ul__imgFile--list").append($li);
        readURL(file, $imgPopup)

        //addDeleteHandle
        $(".button__no-line").click(function(e){
            const liElement = $(this).closest('li');
            const liText = liElement.text().trim();

            const index = imageFiles.findIndex(file => liText.includes(file.name));
            if (index !== -1) {
                imageFiles.splice(index, 1);
            }

            liElement.remove();

        })
    }

    function submitUsersContents(){

        if($("#type").val() === null || $("#category").val() === null || $("#email").val() === undefined){
            alert("필수 요소들을 입력해주세요")
            return;
        }
        // imageFiles.forEach((file)=>{
        //     const formData = new FormData();
        //     formData.append("file", file);
        //     fileUpload(formData);
        // })
        console.log(fileNameList)

        const object = {
            "type" : $("#type").val(),
            "category" : $("#category").val(),
            "event_name" : $("#event_name").val(),
            "location" : $("#sample2_detailAddress").val(),
            "email" : $("#email").val(),
            "text" : $("#text").val(),
            "images" : JSON.stringify(fileNameList)
        }
console.log(object)
        $.ajax({
            type: 'post',
            url: 'http://dev.soxcorp.co.kr:21080/popi/board/setQnA.do',
            data: object,
            dataType: 'json',
            ContentType: 'json',
            success: function (data) {
                console.log(data);
            },
            error:function (err){
                console.log(err);
            }
        })
    }

    $("#submitBtn").click(function (){
        submitUsersContents();
    })

    $("#recentGPS").click(function () {

        navigator.geolocation.getCurrentPosition((position) => {
            inputRecentGPS(position.coords.latitude, position.coords.longitude);
        }, err => {
            err.code === 1 && alert("위치 정보 접근을 허용해주세요")
        });
    });

    function inputRecentGPS (latitude, longitude){
        $(".div__text--gps-latitude").text(`위도: ${latitude} `);
        $(".div__text--gps-longitude").text(`경도: ${longitude}`);
    };

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