function adminQnADetail(param) { //댓글
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/page/adminQnADetail.do',
        data: param,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
}
const urlParams = new URL(window.location.href).searchParams;
const seq = urlParams.get('seq');
console.log(seq);
let param = {"board_seq" : seq}
adminQnADetail(param);

const title = document.getElementById("title");
