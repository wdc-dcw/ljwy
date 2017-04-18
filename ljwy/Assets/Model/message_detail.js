/*消息列表*/
var message=function(){
	/*获取参数*/
	this.messageDetail=function(){
        //判断是否登录
        isLogin();
		var paramsJson = {
            mobile:JSON.parse(eval($.cookie(managerMemory))).mobile ,
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "myNewMessages",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
			  var	listhtml="";
                $.each(result.resultObject, function (i, item) {
					listhtml+="<a href="+imgdomain+"appInterfaceTest/Interface/ssgj/ssgj/property/community_detail.html?id="+item.postId+"><div class=\"source\"><div class=\"particulars\"><p class=\"title\">"+item.title+"</p></div></div></a>";					
			});
					var zonghtml= listhtml+"</div>";
					$(".list").append(zonghtml);
            }
            else if(result.messageCode==2){
                location.href="login.html";
            }
            else {
					alert(result.message);
            }
        });
	}
}