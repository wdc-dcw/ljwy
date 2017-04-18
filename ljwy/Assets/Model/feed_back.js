/*意见反馈*/
var feedBack = function() {
	this.feedBacks = function() {
		//判断是否登录
		isLogin();
		code();
		//输入验证码
		$("#change").click(function() {
			code();
		});

		/*获取提交的按钮*/
		$("#sub").on("click", function() {
			preCheck("formFeed");
			if (checkUnNull == true) {
				var paramsJson = {
					mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
					content: $("#content").val(),
					verifyCode: $("#verifyCode").val()

				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "feedBack",
					params: JSON.stringify(paramsJson)
				}


				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						getBomBbox(result.message);
						setTimeout(function() {
							location.href = "index.html";
						}, 500)

					} else if (result.messageCode == 2) {
						location.href = "login.html";

					} else {
						getBomBbox(result.message);
					}
				})
			} else {

			}
		})
	}

	var code = function() {
		var paramsJson = {
			mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "createVerifyCode",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				$(".imgVerifyCode img").remove();
				$('<img src="' + imgdomain + result.resultObject + '"/>').appendTo(".imgVerifyCode");
			} else {
				getBomBbox(result.message);
			}
		})

	}

}