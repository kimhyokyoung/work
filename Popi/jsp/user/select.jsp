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
            <a href="/popi/page/board.do" style="text-decoration: none; color : #B69AC7">
                <div class="main__menu--board">게시판</div>
            </a>
            <a href="/popi/page/service-introduction.do" style="text-decoration: none; color : #B69AC7">
                <div class="main__menu--serviceIntroduce">서비스 소개</div>
            </a>
        </div>
        <div class="select__main__selete--date">
            <input type="text" value="날짜" class="select__main__selete--date__input" id="dateFilter">
        </div>
        <div class="select__main__selete--dropdown">
            <select class="select__main__selete--region" id="region">
                <option value="">지역 전체</option>
                <option value="서울특별시">서울특별시</option>
                <option value="경기도">경기도</option>
            </select>
            <select class="select__main__selete--category" id="category">
                <option value="">카테고리 전체</option>
                <option value="food">음식</option>
                <option value="character">캐릭터</option>
                <option value="fashion">패션</option>
                <option value="etc">기타</option>
            </select>
        </div>

        <div id="storeList"></div>

        <div class="main__board--button">
            <button class="main__board--button-pre" id="preButton">이전</button>
            <button class="main__board--button-next" id="nextButton">다음</button>
        </div>
    </div>
</section>


<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/popupList.js"></script>

</body>

</html>