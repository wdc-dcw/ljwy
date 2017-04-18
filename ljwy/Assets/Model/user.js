var user = function() {

	if (JSON.parse(eval($.cookie(managerMemory))) != null) {
		$("#mobile").val(JSON.parse(eval($.cookie(managerMemory))).mobile);

	}

	//登录
	this.login = function() {

		/*获取登录页面电话号码输入框的id*/
		var mobliex = null;
		if (JSON.parse($.cookie("pwdMessage")) != null) {
			mobliex = JSON.parse($.cookie("pwdMessage")).mobile;
			$("#mobile").attr("moblie", mobliex);
			$("#mobile").val(mobliex.substr(0, 3) + "****" + mobliex.substr(7));
			//$("#mobile").val(mobliex);
			if (JSON.parse($.cookie("pwdMessage")).pwd != "") {
				$("#remember").find("img").attr("src", "Assets/Images/choose01_bg.png");
				$("#pwd").attr("type", "password");
				$("#pwd").val(JSON.parse($.cookie("pwdMessage")).pwd);
			}
		}
		$("#mobile").change(function() {
			$("#mobile").attr("moblie", $("#mobile").val());
		})

		$("#sub").on("click", function() {
			preCheck("formLogin");
			if (checkUnNull == true) {
				var paramsJson = {
					mobile: $("#mobile").attr("moblie"),
					pwd: $("#pwd").val()
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "login",
					params: JSON.stringify(paramsJson)
				}
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						if ($("#remember").find("img").attr("src") == "Assets/Images/choose01_bg.png") {
							var cookiepwd = {
								mobile: $("#mobile").attr("moblie"),
								pwd: $("#pwd").val()
							};
							$.cookie("pwdMessage", JSON.stringify(cookiepwd), {
								expires: 3650,
								path: '/'
							});
						} else if ($("#remember").find("img").attr("src") == "Assets/Images/choose01.png") {
							var cookiepwd = {
								mobile: $("#mobile").attr("moblie"),
								pwd: ""
							};
							$.cookie("pwdMessage", JSON.stringify(cookiepwd), {
								expires: 3650,
								path: '/'
							});
						}
						//$.cookie(managerMemory, JSON.stringify(result.resultObject), { expires: 3650, path: 'cookiePath' });
						//var serviceMan = JSON.parse(eval($.cookie(managerMemory)));
						//serviceMan.Token
						location.href = "index.html";
					} else {
						getBomBbox(result.message);
					}
				})

			}
		});
		$(".icon a").click(function() {
			var type = $(this).attr("type");
			if (type == 1) {
				window.location.href = "thirdlogin://" + encodeURI(JSON.stringify({
					state: "1"
				}));
			}
			if (type == 2) {
				window.location.href = "thirdlogin://" + encodeURI(JSON.stringify({
					state: "2"
				}));
			}
			if (type == 3) {
				window.location.href = "thirdlogin://" + encodeURI(JSON.stringify({
					state: "3"
				}));
			}
		})
		$("#remember").click(function() {
			if ($(this).find("img").attr("src") == "Assets/Images/choose01.png") {
				$(this).find("img").attr("src", "Assets/Images/choose01_bg.png");
			} else {
				$(this).find("img").attr("src", "Assets/Images/choose01.png");
			}
		});
	}

	//注册
	this.register = function() {
		var sourceurl = getSourceUrl();
		var currentUrl = location.href;
		var currentUrlArray = location.pathname.split("/");
		var currentname = currentUrlArray[currentUrlArray.length - 1];
		var currentkey = currentname.split(".")[0];
		var sourceurlArray = sourceurl.split("/");
		var sourcename = sourceurlArray[sourceurlArray.length - 1];
		var sourcekey = sourcename.split(".")[0];
		if (sourcekey == "login") {
			var cookieList = {
				mobile: "",
				code: "",
				pwd1: "",
				pwd2: ""
			};
			$.cookie("userMessage", JSON.stringify(cookieList), { expires: 1, path: '/' });
			$("#mobile").val("");
			$("#pwd1").val("");
			$("#pwd2").val("");
			$("#verifyCode").val("");
		}
		$("#mobile").val("");
		$("#pwd1").val("");
		$("#pwd2").val("");
		$("#verifyCode").val("");

		if (getUserCookie() != null) {
			$("#mobile").val(getUserCookie().mobile);
			$("#pwd1").val(getUserCookie().pwd1);
			$("#pwd2").val(getUserCookie().pwd2);
			$("#verifyCode").val(getUserCookie().code);
		}
		var cur = 0; //判断用户协议的选中状态
		/*找到页面中获取验证码的id*/
		$("#verify").on("click", function() {
			if ($("#mobile").val() == "") {
				getBomBbox("手机号为空");
			} else {
				time(this);
				var paramsJson = {
					mobile: $("#mobile").val(),
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "getVerifyCode",
					params: JSON.stringify(paramsJson)
				};
				/*用post方式提交*/
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						var code = (result.resultObject);
						$("#hideverifycode").attr("verifyCode", JSON.stringify(code));
					} else {
						getBomBbox(result.message);
					}
				});
			}
		});



		//判断用户协议选中的状态
		setUserCookie();
		var src = $(this).find("img").attr("src");
		if (src == "Assets/Images/choose.png") {
			$(this).find("img").attr("src", "Assets/Images/choose_bg.png");
			$(this).find(".agree").attr("cur", "1");
			cur = 0;
		} else {
			$(this).find("img").attr("src", "Assets/Images/choose_bg.png");
			$(this).find(".agree").attr("cur", "0");
			cur = 1;
		}

		/*提交要做的事*/
		$("#sum").click(function() {
			preCheck("formRegister");
			prePwd("formRegister");
			if (checkUnNull == true && checkPwd == true) {
				if (cur == 1) {
					var mobile = $("#mobile").val();
					var sex = $("#sex").val();
					var nickName = $("#nickName").val();
					var headimgurl = $("#headimgurl").val();
					var openId = $("#openId").val();
					var accessToken = $("#accessToken").val();
					var verifyCode =  $("#verifyCode").val();
					var pwd1=$("#pwd1").val();
					var pwd2=$("#pwd2").val();
					var paramsJson = {
						mobile:mobile,
						pwd1: pwd1,
						pwd2: pwd2,
						verifyCode:verifyCode,
						headimgurl:headimgurl,
						sex:sex,
						openId:openId,
						accessToken:accessToken,
						nickName:nickName
					}
					var data = {
						secretKey: "mobileSecretKey1234567890",
						opt: "reg",
						params: JSON.stringify(paramsJson)
					}
					$.post(interfaceApi, data, function(result) {
						var result = JSON.parse(result);
						if (result.messageCode == 1) {
							//$.cookie(managerMemory, JSON.stringify(result.resultObject), { expires: 3650, path: 'cookiePath' });
							//var serviceMan = JSON.parse(eval($.cookie(managerMemory)));
							//serviceMan.Token
							getBomBbox(result.message);
							location.href = "index.html";
						} else {
							getBomBbox(result.message);
						}
					});
				} else {
					getBomBbox("您还未勾选用户协议");
				}

			} else {

			}
		});

	}


	//找回密码
	this.forgetpwd = function() {
		$("#verify").on("click", function() {
			if ($("#mobile").val() == "") {
				getBomBbox("手机号为空");
			} else {
				time(this);
				var paramsJson = {
					mobile: $("#mobile").val(),
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "getVerifyCode",
					params: JSON.stringify(paramsJson)
				}

				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						var code = (result.resultObject);
						$("#hideverifycode").attr("verifyCode", JSON.stringify(code));
					} else {
						getBomBbox(result.message);
					}
				});
			}
		});
		/*提交的方法*/
		$("#sum").on("click", function() {

			preCheck("formForget");
			prePwd("formForget");
			if (checkUnNull == true && checkPwd == true) {
				var paramsJSON = {
					mobile: $("#mobile").val(),
					verifyCode: $("#verifyCode").val(),
					pwd1: $("#pwd1").val(),
					pwd2: $("#pwd2").val(),
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "forgotPwd",
					params: JSON.stringify(paramsJSON)
				}

				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						setTimeout(function() {
							location.href = "login.html"
						}, 500);
						getBomBbox(result.message);
					} else {
						getBomBbox(result.message);
					}
				})
			} else {

			}
		});
	}

	//修改密码
	this.updatepwds = function() {
		//判断是否登录
		isLogin();
		/*提交的方法*/
		$("#sub").on("click", function() {


			preCheck("formPwd");
			prePwd("formPwd");
			if (checkUnNull == true && checkPwd == true) {
				var paramsJSON = {
					mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
					oldPwd: $("#oldPwd").val(),
					pwd1: $("#pwd1").val(),
					pwd2: $("#pwd2").val(),
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "changePwd",
					params: JSON.stringify(paramsJSON)
				}

				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						getBomBbox(result.message);
						setTimeout(function() {
							location.href = "login.html";
						}, 500)

					} else {
						getBomBbox(result.message);
					}
				})
			} else {}
		});
	}

	//绑定手机号
	this.bindmobile = function() {
		//var sourceurl = getSourceUrl();
		//var currentUrl = location.href;
		//var currentUrlArray = location.pathname.split("/");
		//var currentname = currentUrlArray[currentUrlArray.length - 1];
		//var currentkey = currentname.split(".")[0];
		//var sourceurlArray = sourceurl.split("/");
		//var sourcename = sourceurlArray[sourceurlArray.length - 1];
		//var sourcekey = sourcename.split(".")[0];
		//if (sourcekey == "bind_mobile") {
		//    var cookieList = { mobile: "", code: ""};
		//    $.cookie("bindMessage", JSON.stringify(cookieList), { expires: 1, path: '/' });
		//}
		//$("#mobile").val("");
		//$("#pwd1").val("");

		//if (getBindCookie() != null) {
		//    $("#mobile").val(getBindCookie().mobile);
		//    $("#verifyCode").val(getBindCookie().code);
		//}
		//判断用户协议选中的状态
		//var cur = 0;
		//$(".agreement p").click(function () {
		//    getUserCookie();
		//    var src = $(this).find("img").attr("src");
		//    if (src == "Assets/Images/choose.png") {
		//        $(this).find("img").attr("src", "Assets/Images/choose_bg.png");
		//        $(this).find(".agree").attr("cur", "1");
		//        cur = 1;
		//    }
		//    else {
		//        $(this).find("img").attr("src", "Assets/Images/choose.png");
		//        $(this).find(".agree").attr("cur", "0");
		//        cur = 0;
		//    }
		//});
		var formName;
		if (GetQueryString("from") == 1) {
			formName = "微博"
		}
		if (GetQueryString("from") == 2) {
			formName = "QQ"
		}
		if (GetQueryString("from") == 3) {
			formName = "微信"
		}
		var paramsJson = {}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getVerifyCode2",
			params: JSON.stringify(paramsJson)
		}
		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			certifyCodes = result.resultObject;
			var paramsJson = {
				certifyCode: certifyCodes,
				from: formName,
				image: GetQueryString("image"),
				nickName: GetQueryString("nickName"),
				token: GetQueryString("token")
			}
			var data = {
				secretKey: "mobileSecretKey1234567890",
				opt: "thirdLogin",
				params: JSON.stringify(paramsJson)
			}
			$.post(interfaceApi, data, function(result) {
				var result = JSON.parse(result);
				if (result.messageCode == 1) {
					var cookietoken = {
						certifyCode: certifyCodes,
						from: formName,
						image: GetQueryString("image"),
						nickName: GetQueryString("nickName"),
						token: GetQueryString("token")
					};
					$.cookie("tokenMessage", JSON.stringify(cookietoken), {
						expires: 365,
						path: '/'
					});
				} else {
					getBomBbox(result.message);
					setTimeout(function() {
						location.href = "login.html";
					}, 2000);
				}
			});

		});


		$("#verify").on("click", function() {
			if ($("#mobile").val() == "") {
				getBomBbox("手机号为空");
			} else {
				time(this);
				var paramsJson = {
					mobile: $("#mobile").val(),
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "getVerifyCode",
					params: JSON.stringify(paramsJson)
				};
				/*用post方式提交*/
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						var code = (result.resultObject);
						$("#hideverifycode").attr("verifyCode", code);
					} else {
						getBomBbox(result.message);
					}
				});
			}

		});



		$("#sum").click(function() {
			preCheck("formForget");
			if (checkUnNull == true) {
				//if (cur == 1) {
				var paramsJson = {
					mobile: $("#mobile").val(),
					cerifyCode: $("#hideverifycode").attr("verifyCode"),
					from: JSON.parse($.cookie("tokenMessage")).from,
					image: JSON.parse($.cookie("tokenMessage")).image,
					nickName: JSON.parse($.cookie("tokenMessage")).nickName,
					token: JSON.parse($.cookie("tokenMessage")).token,
				}
				var data = {
					secretKey: "mobileSecretKey1234567890",
					opt: "bindMobile",
					params: JSON.stringify(paramsJson)
				}
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						getBomBbox("恭喜您绑定成功");
						setTimeout(function() {
							location.href = "index.html";
						}, 500)

					} else {
						getBomBbox(result.message);
					}
				});
				//}
				//else {
				//    getBomBbox("您还未勾选用户协议");
				//}

			} else {

			}

		})

	}

	var setUserCookie = function() {
		var cookieList = {
			mobile: $("#mobile").val(),
			code: $("#verifyCode").val(),
			pwd1: $("#pwd1").val(),
			pwd2: $("#pwd2").val()
		};
		$.cookie("userMessage", JSON.stringify(cookieList), {
			expires: 1,
			path: '/'
		});
	}

	var getUserCookie = function() {
		var userMessage = JSON.parse($.cookie("userMessage"));
		return userMessage;
	}

	var setBindCookie = function() {
		var cookieList = {
			mobile: $("#mobile").val(),
			code: $("#verifyCode").val()
		};
		$.cookie("bindMessage", JSON.stringify(cookieList), {
			expires: 1,
			path: '/'
		});
	}

	var getBindCookie = function() {
		var bindMessage = JSON.parse($.cookie("userMessage"));
		return bindMessage;
	}

}