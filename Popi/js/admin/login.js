function login(comment) { //팝업 정보 등록
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/login.do',
        data: comment,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
}

let idText = document.getElementById("idText");
let pwText = document.getElementById("pwText");
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click',function (){
    if(idText.value === "soxpopi" && pwText.value === "!sox2024"){
        console.log("성공");
    }else{
        console.log("실패");
    }
})