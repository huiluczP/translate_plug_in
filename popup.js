var textNow = ""

$(document).ready(function(){
    chrome.storage.local.get("translate_result",function(result){
        $("#translate_result").text(result['translate_result'])
        $(".main_screen")
    })
    chrome.storage.local.get("former_result",function(result){
        $("#former_result").text(result['former_result'])
    })
})