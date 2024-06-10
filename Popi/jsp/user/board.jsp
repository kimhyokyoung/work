<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-i</title>
    <link rel="stylesheet" href="../css/mobile_pop-i_style.css"/>
</head>
<body>
<section>
    <div class="top">
        <div class="top__menu">
            <button class="top__menu--img" id="menuIcon"></button>
        </div>
        <div class="top__logo">
            <a href="/popi/main.do"><img src="../images/temporaryLogo.png" class="top__logo--img"></a>
        </div>
    </div>
</section>

<section>
    <div class="main">
        <div class="main__menu hidden" id="mainMenu">
            <a href="/popi/page/board.do" style="text-decoration: none; color : #B69AC7"><div class="main__menu--board">게시판</div></a>
            <a href="/popi/page/service-introduction.do" style="text-decoration: none; color : #B69AC7"><div class="main__menu--serviceIntroduce">서비스 소개</div></a>
        </div>
        <div class="main__board--box">

            <div class="main__board--title">게시판
                <a href="/popi/page/board-add.do">
                    <button class="main__board--addText" id="addButton">글쓰기</button>
                </a>
            </div>

            <div class="main__board--listTable">
                <div class="main__board--listThead">
                    <div class="main__board--listThead-no">No.</div>
                    <div class="main__board--listThead-title">제목</div>
                    <div class="main__board--listThead-date">날짜</div>
                    <div class="main__board--listThead-state">진행 현황</div>
                </div>
                <div id="boardTable"></div>
            </div>
        </div>
        <div class="main__board--button">
            <button class="main__board--button-pre" id="preButton">이전</button>
            <button class="main__board--button-next" id="nextButton">다음</button>
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/qnaPage.js"></script>
</body>

</html>