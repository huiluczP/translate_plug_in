var textNow = ""
var afterTrans = ""

$.ajaxSetup({
    async : false
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        textNow = request.text
        sendResponse("send success:" + textNow);
        console.log(textNow)
        trans(textNow)
        // afterTrans = textNow
        chrome.storage.local.set(
            {
                former_result: textNow,
                translate_result: afterTrans
            },function(){
                console.log("store result:"+afterTrans)
            }
        )
    }
)

function trans(text){
    // 调用百度翻译接口
    var query = text.toString()
    var from = "auto"
    var to = "zh"
    var appid = "your id"
    var key = "your key"
    var salt = (new Date).getTime()//取当前时间作为随机数
    var str1 = appid + query + salt + key
    var md5_str = MD5(str1)
    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'json',
        data:{
            appid: appid,
            q: query,
            from: from,
            to: to,
            salt: salt,
            sign: md5_str
        },
        success: function(result){
            console.log(result)
            var res = getTranslateResult(result)
            afterTrans = res
            console.log(res)
            // setResult(res)
        }
    })
}

function getTranslateResult(result){
    // 获取翻译结果
    var resultObj = result
    if(resultObj.error_code != undefined){
        return resultObj.error_code + " " + resultObj.error_msg
    }else{
        var result_array = resultObj.trans_result
        return result_array[0].dst
    }
}