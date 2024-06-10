<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pop-i(관리자)</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/pc_pop-i_style.css" />
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
                <div class="main__admin--addButton"><button class="main__board--button-set"><a href="../page/adminUploadForm.do" style="color: #727993">신규 등록</a></button></div>
                <div class="admin--listTable">
                    <div class="main__admin--listThead">
                        <div class="main__admin--listThead-no">No.</div>
                        <div class="main__admin--listThead-title">제목</div>
                        <div class="main__admin--listThead-date">날짜</div>
                        <div class="main__admin--listThead-state">진행 현황</div>
                        <div class="main__admin--listThead-add">등록</div>
                        <div class="main__admin--listThead-del">삭제</div>
                    </div>
                    <div id="listTable">
                    </div>
                    <div class="main__board--button">
                        <button class="main__board--button-set" id="preButton">이전</button>
                        <button class="main__board--button-set" id="nextButton">다음</button>
                    </div>
                </div>
            </div>
        </section>

        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        <script src="../js/adminPage.js"></script>
    </body>

    </html>