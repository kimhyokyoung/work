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
        <div class="main__admin__add">
            <div class="main__admin__add__tablegather">
                <div class="main__admin__add__table">
                    <div class="main__admin--table-title">팝업 이름</div>
                    <div class="main__admin--table-title-input">
                        <input class="main__admin--table-input" id="popupName">
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-img">관련 이미지</div>
                    <div class="main__admin--table-img-button">
                        <label for="imageFileBtn"><div class="main__admin--img-button">이미지 선택하기</div>
                        <input type="file" name="file" id="imageFileBtn" style="display: none">
                        </label>
                        <div class="main__admin--img-align">
                        </div>
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-date">일정</div>
                    <div class="main__admin--table-date-input">
                        <input class="main__admin--table-dateset" id="startday"> ~
                        <input class="main__admin--table-dateset" id="endday">
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-date">운영시간</div>
                    <div class="main__admin--table-date-input">
                        <input class="main__admin--table-dateset" id="openingHours"> ~
                        <input class="main__admin--table-dateset" id="closingHours">
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-date">카테고리</div>
                    <div class="main__admin--table-date-input">
                        <select class="main__admin--table-input" id="category">
                            <option value="0">기타</option>
                            <option value="1">음식</option>
                            <option value="2">캐릭터</option>
                            <option value="3">패션</option>

                        </select>
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-address">장소</div>
                    <div class="main__admin--table-address-input">
                        <input class="main__admin--table-input" id="address">
                        <input value="세부장소" id="space">
                        <select id="topunder">
                            <option value="plus">+</option>
                            <option value="minus">-</option>
                        </select>
                        <select id="ten">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                        </select>
                        <select id="one">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                        </select>층
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-map">내부지도</div>
                    <div class="main__admin--table-map-button">
                        <label for="mapImageFileBtn"><div class="main__admin--img-button">이미지 선택하기</div>
                            <input type="file" name="file" id="mapImageFileBtn" style="display: none">
                        </label>
                    </div>
                </div>
                <div class="main__admin__add__table">
                    <div class="main__admin--table-etc">기타</div>
                    <div class="main__admin--table-etc-input">
                        <input value="기타"  class="main__admin--table-input" id="etc">
                    </div>
                </div>
                <div class="main__admin--submit">
                    <button class="main__admin--submit-button" id="addButton">등록하기</button>
                </div>
            </div>
        </div>
    </div>
</section>

<section>
    <div class="main__admin-state_bk">
        <div class="main__admin-state">
            <div class="main__admin-state-comment">
                <div class="main__admin-state-comment_set">
                    <div>진행 현황 &nbsp;
                        <button class="main__admin-state-comment-button" id="ingBtn">처리 중</button>
                        <button class="main__admin-state-comment-button" id="comBtn">등록</button>
                        <button class="main__admin-state-comment-button" id="delBtn">반려</button>
                    </div>
                </div>
                <div>
                    <input class="main__admin-state-comment-input" id="commentText">
                    <button
                            class="main__admin-state-comment-button" id="commentSubmit">작성
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="../js/adminUploadForm.js"></script>
</body>

</html>