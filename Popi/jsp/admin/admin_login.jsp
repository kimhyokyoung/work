<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pop-i(관리자)</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/pc_pop-i_style.css"/>
</head>

<body>
<section>
    <div class="top">
        <div class="top__logo">
            <img src="../images/temporaryLogo.png" class="top__logo--img">
        </div>
    </div>
</section>

<section>
    <div class="main">
        <div class="main__admin--Login">
            <div class="main__admin--Login-ID">
                <div class="main__admin--Login-IDText">ID</div>
                <input type="text" class="main__admin--Login-ID-input" id="idText">
            </div>
            <div class="main__admin--Login-PW">
                <div class="main__admin--Login-PWText">PW</div>
                <input type="password" class="main__admin--Login-PW-input" id="pwText">
            </div>
        </div>
        <div class="main__admin--Login-submit">
            <button class="main__admin--Login-submit-button" id="submitBtn">Login</button>
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/login.js"></script>
</body>

</html>