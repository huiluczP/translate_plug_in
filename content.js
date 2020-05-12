var now = "begin select"
$(document).ready(function(){
    $("div").on("click", selectTrans)
})

function selectTrans(){
    var text = getSelect()
    var textStr = text.toString()
    // 防止因为div太多多次调用
    if(textStr != now && textStr!=""){
        console.log(text.toString())
        now = textStr
        sendRequestToPopup(textStr)
    }   
}

function getSelect(){
    var text = window.getSelection()
    if(text == null){
        return "blank"
    }
    return text
}

function sendRequestToPopup(textStr){
    chrome.extension.sendRequest({'text': textStr}, function(response){
        console.log(response); // 将返回信息打印到控制台里
    });
}