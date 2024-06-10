let images=[];
const urlParams = new URL(window.location.href).searchParams;
const seq = urlParams.get('seq');

function setPopInfo(eventParam) { //팝업 정보 등록
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/setPopInfo.do',
        data: eventParam,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            // fileUpload (formData);
        }
    })
}

let eventParam = {
    "event_name":"",
    "address": "",
    "space":"",
    "floor":"",
    "startday":"",
    "endday":"",
    "category":"",
    "opening_hours":"",
    "title_image": "",
    "images": "",
    "space_image": ""
};
console.log(eventParam);
const addButton = document.getElementById("addButton");
const popupName = document.getElementById("popupName");
const category = document.getElementById("category");
const startday = document.getElementById("startday");
const endday = document.getElementById("endday");
const floor = document.getElementById("floor");
const space = document.getElementById("space");
const openingHours = document.getElementById("openingHours");
const closingHours =document.getElementById("closingHours");
const address = document.getElementById("address");
const topunder = document.getElementById("topunder");
const ten = document.getElementById("ten");
const one = document.getElementById("one");
const ect = document.getElementById("etc");

addButton.addEventListener('click', function (){ //등록버튼
    floorCal();
    console.log("팝업등록");
    console.log(eventParam);
    // setPopInfo(eventParam);
    // submitUsersContents();
    console.log(eventParam);
})


popupName, startday, endday, address, space.addEventListener('change',function (){ //팝업명,시작일, 종료일, 세부장소
    eventParam.event_name=popupName.value;
    console.log(popupName.value);
    eventParam.startday = startday.value;
    eventParam.endday = endday.value;
    eventParam.address = address.value;
    eventParam.space = space.value;
    return eventParam.event_name,eventParam.startday,eventParam.endday,eventParam.address,eventParam.space;
})
openingHours, closingHours.addEventListener('change', function (){ //운영시간
    eventParam.opening_hours = `${openingHours.value}-${closingHours.value}`;
    return eventParam.opening_hours;
})
category.addEventListener('change',function (){ //카테고리 값
    eventParam.category = category.value;
    console.log(eventParam);
    return eventParam.category;
})
topunder.addEventListener('change',function(){ //지상인지 지하인지
    return topunder.value;
})
ten.addEventListener('change',function (){
    return ten.value;
})
one.addEventListener('change',function (){
    return one.value;
})
function floorCal(){
    if (topunder.value === 'minus'){
        if(ten.value === '0'){
            eventParam.floor = `-${one.value}`
        } else {
            eventParam.floor = `-${ten.value+one.value}`
        }
    } else{
        if(ten.value === '0'){
            eventParam.floor = `${one.value}`
        }else{
            eventParam.floor = `${ten.value+one.value}`
        }
    }
    return eventParam.floor;
} //층수 계산

//----------------------------------------이미지 등록하기-------------------------------------------------------

$(document).ready(function (){

    let imageFiles = [];
    let fileNameList = [];
    let mapFiles =[];

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
                fileNameList.push(data.resultMap);
            },
            error:function (err){
                console.log(err);
            }
        })
    }

//
    $('#imageFileBtn').change(function (e){ //포스터+이미지 3장

        if(imageFiles.length === 4){
            $('#imageFileBtn').val('')
            alert("이미지파일은 4장까지 첨부 가능합니다");
            return;
        }
        const file = e.target.files[0];


        if(file){
            inputFileIntoList(file);
            createFileListEL(file);
        }
    })

    $('#mapImageFileBtn').change(function (e){ //내부지도

        if(mapFiles.length === 1){
            $('#mapImageFileBtn').val('')
            alert("이미지파일은 1장까지 첨부 가능합니다");
            return;
        }
        const file = e.target.files[0];


        if(file){
            inputMapFileIntoList(file);
            createMapFileListEL(file);
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

    function inputMapFileIntoList(file){
        const fileName = file.name.split('.');
        const extension = fileName[fileName.length - 1];

        if (extension !== 'jpeg' && extension !== 'jpg' && extension !== 'png' && extension !== 'gif') {
            alert('확장자를 확인해주세요');

            return;
        }

        mapFiles.push(file);
    }

    function readURL(file, $imgPopup) {
        if (file) {
            const reader = new FileReader();
            console.log(reader);
            reader.onload = function(e) {
                console.log(e.target.result)
                $imgPopup.attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            document.getElementById('preview').src = "";
        }
    }

    function createFileListEL(file){ //포스터+이미지 3장 = 행사 사진 최대 4장

        const $li = $(`<li class="main__admin--img-li"><img src="../images/temporaryLogo.png" class="img__popup setImg main__admin--img-view"><button class="button__no-line">↑삭제↑</button></li>`);
        const $imgPopup = $li.find('.img__popup');
        $(".main__admin--img-align").append($li);
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

    function createMapFileListEL(file){ //내부지도

        const $li = $(`<li style="list-style: none"><img src="../images/temporaryLogo.png" class="img__popup main__admin--img-map"><button class="button__no-line">←삭제</button></li>`);
        const $imgPopup = $li.find('.img__popup');
        $(".main__admin--table-map-button").append($li);
        readURL(file, $imgPopup);

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
        const FileNameList = [];
        imageFiles.forEach((file)=>{
            const formData = new FormData();
            formData.append("file", file);
            fileUpload(formData);
        })
        eventParam.title_image = FileNameList[0];
        eventParam.images = [FileNameList[1],FileNameList[2],FileNameList[3]];

        $.ajax({
            type: 'post',
            url: 'http://dev.soxcorp.co.kr:21080/popi/page/setQnA.do',
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
})




//------------------------------------제보합니다. 정보 불러와서 등록하기-------------------------------------------
function getQnAData(board_seq) { //팝업 정보 등록
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/getQnAData.do',
        data: board_seq,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            loadList(data);
        }
    })
}
let board_seq = {"board_seq" : seq}
getQnAData(board_seq);
console.log(board_seq);

function loadList(list) {
    let text =list.resultMap;
    popupName.value = text.storename;
    address.value = text.location;
    etc.value = text.text;
    console.log(text);
}

//-----------------------------------상태 변경------------------------------------------------
const ingBtn = document.getElementById("ingBtn");
const comBtn = document.getElementById("comBtn");
const delBtn = document.getElementById("delBtn");


function completeQnA(state) { //팝업 정보 등록
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/completeQnA.do',
        data: state,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
}
let state = {"seq" : "", "process": ""};

ingBtn.addEventListener('click',function (){
    state.process = 0;
    console.log(state);
    completeQnA(state);
    alert('처리 중으로 바꼇어');
})

comBtn.addEventListener('click',function (){
    state.process = 1;
    console.log(state);
    completeQnA(state);
    alert('글을 등록햇어');
})

delBtn.addEventListener('click',function (){
    state.process = 2;
    console.log(state);
    completeQnA(state);
    alert('반려햇어');
})

//-----------------------------------댓글 작성------------------------------------------------


function setComment(comment) { //댓글
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/setComment.do',
        data: comment,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            alert("댓글 성공");
        }
    })
}
let param = {"comment": "","board_seq": seq};
console.log(param);

const commentText = document.getElementById("commentText");
const commentSubmit = document.getElementById("commentSubmit");

commentSubmit.addEventListener('click',function (){ //
    param.comment = commentText.value;
    setComment(param);
    commentText.value = '';
})

