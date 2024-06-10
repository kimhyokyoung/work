<%@ page language="java"  pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-i</title>
    <link rel="stylesheet" href="../css/mobile_pop-i_style.css" />
    <script src="../js/qnaDetail.js" defer></script>
</head>
<body>
<%@include file="../header.jsp" %>
<section>
    <div class="main">
        <div class="main__menu hidden" id="mainMenu">
            <a href="/popi/page/board.do" style="text-decoration: none; color : #B69AC7">
                <div class="main__menu--board">게시판</div>
            </a>
            <a href="/popi/page/service-introduction.do" style="text-decoration: none; color : #B69AC7">
                <div class="main__menu--serviceIntroduce">서비스 소개</div>
            </a>
        </div>
        <div class="boardCheck__main__top">
            <div class="boardCheck__main__top--title">제보합니다</div>
        </div>
        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">팝업명 : <span id="popupName"></span></div>
        </div>
        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">장소 : </div>
            <div class="boardCheck__main__information--contents--form"><span id="popupLocation"></span></div>
        </div>
        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">이미지 : </div>
            <div id="popupImage">

            </div>
        </div>


        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">이메일 : </div>
            <div class="boardCheck__main__information--contents--form"><span id="popupEmail"></span></div>
        </div>
        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">기타 : </div>
            <div class="boardCheck__main__information--contents--form"><span id="popupText"></span></div>
        </div>
        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">진행상황 :</div>
            <div class="boardCheck__main__information--contents--form"><span id="popupProcess"></span></div>
        </div>

        <div class="boardCheck__main__contents">
            <div class="boardCheck__main__information--contents--title">코멘트</div>
            <div id="popupComment">

            </div>
        </div>

    </div>
</section>
<script>console.log("dd")</script>


</body>


</html>