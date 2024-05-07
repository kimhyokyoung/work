$.ajax ({
    type : 'post',
    url : '/test',
    async : true,
    header : {
        "Content-Type" : "application / json",
        "X-HTTP-Method-Override" : "POST"
    },
    dataType : 'text',
    data : JSON.stringify({
        "no" : no,
        "name" : name1,
        "nick : nick2
    }),
})

