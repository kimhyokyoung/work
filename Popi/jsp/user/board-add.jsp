<%@ page language="java"  pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-i</title>
    <link rel="stylesheet" href="../css/mobile_pop-i_style.css" />
    <script src="../js/boardAdd.js" defer></script>
</head>
<body>
<%@include file="../header.jsp" %>

<section>
    <div class="main">
        <div class="main__addText--box">
            <div class="main__addText--title">
                <select class="main__addText--title--dropdown" id="type">
                    <option value="0">제보합니다.</option>
                    <option value="1">문의합니다.</option>
                </select>
            </div>
            <div class="notice">*은 필수 항목입니다. 게시물은 수정/삭제가 불가능합니다.</div>
            <div class="main__addText--table">
                <div class="main__addText--table-title">팝업명</div>
                <div class="main__addText--table-title-input">
                    <input placeholder="팝업명" class="main__addText-input-opt" id="event_name">
                </div>
            </div>
            <div class="main__addText--table">
                <div class="main__addText--table--cartegory">* 카테고리 선택</div>
                <select class="main__addText--table--cartegory-select" id="category">
                    <option value="" selected disabled hidden>선택</option>
                    <option value="1">음식</option>
                    <option value="2">캐릭터</option>
                    <option value="3">패션</option>
                    <option value="0">기타</option>
                </select>
            </div>
            <div class="main__addText--table">
                <div class="main__addText--table-address">장소</div>
                <div class="main__addText--table-address-input">
                    <input type="text" id="sample2_postcode" disabled placeholder="우편번호">
                    <input type="button" onclick="sample2_execDaumPostcode()" value="우편번호 찾기"><br>
                    <input type="text" id="sample2_address" disabled placeholder="주소" style="width: 100%"><br>
                    <input type="text" id="sample2_detailAddress" placeholder="상세주소">
                    <input type="text" id="sample2_extraAddress" disabled placeholder="참고항목">
                    <div class="main__addText--table-address-option">
                        <button class="main__addText-button-location" id="recentGPS">현재 위치</button>
                        <div class="div__text--gps-latitude"></div>
                        <div class="div__text--gps-longitude"></div>
                    </div>

                </div>
                <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
                </div>
            </div>

            <div class="main__addText--table">
                <div class="main__addText--table-img">관련 이미지<br>(최대 4장)</div>
                <div class="main__addText--table-img-button">
                    <label for="imageFileBtn">
                        <div class="main__addText-button-img">이미지 선택하기</div>
                        <input type="file" id="imageFileBtn"
                               accept="image/gif, image/jpg, image/png, image/jped, image/svg" style="display: none">
                    </label>
                </div>
            </div>
            <div class="main__addText--table">
                <div class="main__addText--table-img"></div>
                <div class="main__addText--table-img-button">
                    <ul class="ul__imgFile--list">
                    </ul>
                </div>
            </div>

            <div class="main__addText--table">
                <div class="main__addText--table-email">* 이메일</div>
                <div class="main__addText--table-email-input">
                    <input placeholder="이메일" class="main__addText-input-opt" id="email">
                </div>
            </div>
            <div class="main__addText--table">
                <div class="main__addText--table-etc">기타</div>
                <div class="main__addText--table-etc-input">
                    <input placeholder="기타사항" class="main__addText-input-opt" id="text">
                </div>
            </div>
            <div class="main__addText--submit">
                <button class="main__addText-button" id="submitBtn">제출하기</button>
            </div>
        </div>

    </div>
</section>


</body>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    // 우편번호 찾기 화면을 넣을 element
    var element_layer = document.getElementById('layer');

    function closeDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_layer.style.display = 'none';
    }

    function sample2_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample2_extraAddress").value = extraAddr;

                } else {
                    document.getElementById("sample2_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample2_postcode').value = data.zonecode;
                document.getElementById("sample2_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample2_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_layer.style.display = 'none';
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);

        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        initLayerPosition();
    }

    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
    function initLayerPosition(){
        var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 5; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';

        $(".div__text--gps").text(``);
    }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>


</html>