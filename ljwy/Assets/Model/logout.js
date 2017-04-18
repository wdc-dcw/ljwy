/*退出app*/
var logout=function(){
	/*加载页面*/
    this.logouted = function () {
        $("#logout").on("click", function () {
            $(".tan").show();
            $(".mask").show();
        })
        $("#cancel").on("click", function () {
            $(".tan").hide();
            $(".mask").hide();
        })
	    $("#ok").on("click", function () {
	        if (JSON.parse(eval($.cookie(managerMemory))) != null) {
	            var paramsJson = {
	                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
	            }
	            var data = {
	                opt: "logout",
	                secretKey: "mobileSecretKey1234567890",
	                params: JSON.stringify(paramsJson)
	            }
	                $.post(interfaceApi, data, function (result) {
	                    var result = JSON.parse(result);
	                    if (result.messageCode == 1) {
							location.href = "login.html";
	                    }
	                });
	        }
	        else { 
		   }
		})
	}
	
			
}
