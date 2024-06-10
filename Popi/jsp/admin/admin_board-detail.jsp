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
        <div class="main__admin--post">
            <div class="main__admin--post--delete">
                <button class="main__admin--post--button">삭제하기</button>
            </div>
            <div class="main__admin--post-title" id="title"></div>

            <div class="main__admin--post-table">
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-title">팝업이름</div>
                    <div class="main__admin--post-table-title-el">이름</div>
                </div>
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-address">장소</div>
                    <div class="main__admin--post-table-address-el">장소</div>
                </div>
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-img">이미지</div>
                    <div class="main__admin--post-table-img-el">
                        <img class="poster">
                        <img class="picture">
                        <img class="picture">
                        <img class="picture">
                    </div>
                </div>
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-email">이메일</div>
                    <div class="main__admin--post-table-email-el">1111@nnnnn.ddd</div>
                </div>
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-etc">기타</div>
                    <div class="main__admin--post-table-etc-el">내용~~~</div>
                </div>
                <div class="main__admin--post-table-option">
                    <div class="main__admin--post-table-current">진행 현황</div>
                    <div class="main__admin--post-table-current-el">
                        <button class="main__admin--post--button">처리 중</button>
                        <button class="main__admin--post--button">완료</button>
                    </div>
                </div>

                <div class="main__admin--post--comment">
                    <input value="처리결과/반려사유" class="main__admin--post--comment-input">
                    <button class="main__admin--post--button">작성</button>
                </div>
                <div class="comment">
                    <div class="comment_box">
                        <div class="comment-deltete">
                            <button class="comment-deltete-button">X</button>
                        </div>
                        <div class="comment_box-text">보내주신 문의에 대한 답변을 이메일로 보내드렸습니다.</div>
                    </div>
                    <div class="admin_circle"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/adminQnADetail.js"></script>
</body>

</html>