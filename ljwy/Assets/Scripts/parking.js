document.getElementById("mobileHtml").style.fontSize = document.body.clientWidth / 3.2 + "px";
//控制字体大小
window.onresize = function () {
    document.getElementById("mobileHtml").style.fontSize = document.body.clientWidth / 3.2 + "px";
};
var imgdomain = "http://139.196.24.123:8080/youthen-web/";
var interfaceApi = "http://139.196.24.123:8080/youthen-web/phoneInterface.do";
var managerMemory = "ManagerMemory";
var nullImage = "/Assets/Images/Null.jpg";
var cookiePath = "/youthen-web";

//获取来源url
function getSourceUrl() {
    var ref = '';
    if (document.referrer.length > 0) {
        ref = document.referrer;
    } try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) { }
    return ref;
}

//吐司
var getBomBbox = function (str) {
    $('<div class="messageBox" ><span>' + str + '</span></div>').appendTo("body");
    $(".messageBox").show();
    setTimeout(function () { $(".messageBox").remove() }, 2000);
}

//返回函数
var GoBack = function () {
    var sourceurl = getSourceUrl();
    var currentUrl = location.href;
    var currentUrlArray = location.pathname.split("/");
    var currentname = currentUrlArray[currentUrlArray.length - 1];
    var currentkey = currentname.split(".")[0];
    switch (currentkey) {
            //停车位
        case "parking":
            location.href = "index.html";
            break;

    }
}

$("#pageBack").click(function () {
    GoBack();
});



//消息条数
var information = function () {
    if (JSON.parse(eval($.cookie(managerMemory))) != null) {
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
        }
        var data = {
            opt: "getUserInfo",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                var currentUrl = location.href;
                var currentUrlArray = location.pathname.split("/");
                var currentname = currentUrlArray[currentUrlArray.length - 1];
                var currentkey = currentname.split(".")[0];
                $("#newMsgCnt").empty();
                if (result.resultObject.newMsgCnt > 0) {
                    $('<div><img src="Assets/Images/footer_04bg.png" /><p>个人</p><img src="Assets/Images/spot.png" class="spot" /></div>').appendTo("#newMsgCnt");
                } else {
                    $('<div><img src="Assets/Images/footer_04bg.png" /><p>个人</p></div>').appendTo("#newMsgCnt");
                }
            }
            else if (result.messageCode == 2) {
                location.href = "login.html";
            }
            else {
                getBomBbox(result.message);
            }
        });
    }
    else {
    }

}