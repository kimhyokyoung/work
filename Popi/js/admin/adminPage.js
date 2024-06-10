let totalCount;
function getQnAList(page) {
    $.ajax({
        type: 'post',
        url: 'http://dev.soxcorp.co.kr:21080/popi/admin/getAdminPopList.do',
        data: page,
        dataType: 'json',
        ContentType: 'json',
        success: function (data) {
            console.log(data);
            createList(data);
            totalCount = data.resultMap.totalCount;
        },
        error:function (err){
            console.log(err);
        }
    })
}
let pageParam = {"page" : 1};
getQnAList(pageParam);

function createList(params) {
    let addText ='';
    for (let i=0; i<params.count; i++) {
        let param = params.resultList[i];
        // console.log(pageParam);
             console.log('제보');
             addText += `
             <div class="main__admin--list-Tdata">
             <div class="main__admin--list-Tdata-no">${pageParam.page===1? params.resultMap.totalCount-i:(params.resultMap.totalCount-15*(pageParam.page-1))-i}</div>
                 <div class="main__admin--list-Tdata-title"><a style="color: black" href="/popi/page/adminQnADetail.do?seq=${param.seq}">${param.type==="0" ? '제보합니다.':'문의합니다.'}</a></div>
                 <div class="main__admin--list-Tdata-date">${subDate(params)[i]}</div>
                 <div class="main__admin--list-Tdata-state">${process(params)[i]}</div>
                 ${param.type === '0' ? `  <div class="main__admin--list-Tdata-add">
                                                <a href="/popi/page/adminUploadForm.do?seq=${param.seq}"><button class="main__board--button-set">등록</button></a>
                                           </div>` 
                                        : `<div class="main__admin--list-Tdata-add">
                                           </div>`}
                 <div class="main__admin--list-Tdata-del"><button class="main__board--button-set">삭제</button></div>
             </div>`;

    }
    document.getElementById("listTable").innerHTML = addText;

}


function subDate(params){ //2024-06-04 11:23:02 =>24-06-04로 변경 (날짜 자르기)
    let subDate = [];
    for(let i=0; i<params.count;i++){
        let date = params.resultList[i].logdata;
        let result = date.substring(0, 10);
        subDate.push(result);
    }
    return subDate;
}

function process(params){ //진행 현황
    let subProcess = [];

    for(let i=0; i<params.count;i++){
        let text='';
        switch (params.resultList[i].process*1){
            case 0:
                text="처리 중";
                break;
            case 1:
                text="처리 완료";
                break;
            case 2:
                text="삭제";
                break;
        }
        subProcess.push(text);
    }
    return subProcess;
}

const preButton = document.getElementById("preButton");
const nextButton = document.getElementById("nextButton");

preButton.addEventListener('click',function (){ //이전 버튼
    console.log("이전");

    if (pageParam.page ===1) {
        console.log("1페이지");
    } else {
        pageParam.page--;
        getQnAList(pageParam);
    }
    console.log(pageParam);
})

nextButton.addEventListener('click',function (){ //다음 버튼
    if (pageParam.page === Math.floor(totalCount/15+1)) {
        console.log("마지막 페이지");
    } else {
     pageParam.page++;
     getQnAList(pageParam);
    }
    console.log(pageParam);
})

