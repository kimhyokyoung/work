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
        <div class="serviceInfor__main__top">
            <b>뽀빠이</b>는 팝업스토어 위치 정보 제공 서비스입니다.
            <br><br><br><br>
            팝업스토어 제보 및 각종 문의는 <b>'게시판'</b>을 이용해 주시면 감사하겠습니다.
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/service-introduction.js"></script>

</body>

</html>