<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-i</title>
    <link rel="stylesheet" href="./css/mobile_pop-i_style.css" />

</head>
<section>
    <div class="top">
        <div class="top__menu">
            <button class="top__menu--img" id="menuIcon"></button>
        </div>
        <div class="top__logo">
            <a href="#"><img src="./images/temporaryLogo.png" class="top__logo--img"></a>
        </div>
    </div>
</section>

<section>

    <div class="main_map" id="map">

        <div class="main__selete">
            <input type="text" class="main__selete--Input" value="검색">
        </div>
        <div class="main__button--currentLocation" id="currentLocation">
            <img src="./images/currentLocation.png" class="main__button--currentLocation--img">
        </div>
        <div class="main__menu hidden" id="mainMenu">
            <div class="main__menu--board">게시판</div>
            <div class="main__menu--serviceIntroduce">서비스 소개</div>
        </div>

        <div class="main__store--mark hidden" id="storeInformation">
        </div>
    </div>
</section>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=eec61d4f33c5426394591ad1ccb17853"></script>
<script src="./js/mobile_pop-i_function.js"></script>

</body>

</html>