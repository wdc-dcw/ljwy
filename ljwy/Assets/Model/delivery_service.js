/* 获取提交的按钮 */

$("#queryBtn").on("click", function() {
	preCheck("formDelivery");
	if (checkUnNull == true) {
		var code = $(".list_first .kuaidi_code").val();

		var paramsJson = {
			companyCode: code,
			orderNo: $("#orderNo").val()

		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "kuaidiQuery",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(res) {
			var result = JSON.parse(res);
			if (result.messageCode ==1) {
				if (result.resultObject.message == "ok") {
					$(".logistics").show();
					$(".logistics1").hide();
					$("#resultDiv").empty();
					$.each(result.resultObject.data, function(i, item) {
						$("#resultDiv").append("<p>" + item.ftime + " " + item.context + "</p>");
					});

				}else{
					getBomBbox(result.resultObject.message);
				}
			} else if (result.messageCode == 2) {
				location.href = "login.html";

			} else {
				getBomBbox(result.message);
			}
		});
	}
});

$(function() {
	$(".logistics").hide();
	var paramsJson = {}
	var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "kuaidiList",
			params: JSON.stringify(paramsJson)
		}
		//	加载快递列表
	$.post(interfaceApi, data, function(result) {
		var result = JSON.parse(result);
		$.each(result.li, function(i, item) {
			if (i == "0") {
				$(".list_first").append("<span class='delive'><img src='" + imgdomain + item.image + "' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='name'>" + item.objectName + "</span><input type='hidden' class='kuaidi_code' value='" + item.code + "'/>");
			}
			$(".delivery_style").append("<div class='list_child'><span class='delive'><img src='" + imgdomain + item.image + "' /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='name'>" + item.objectName + "</span><input type='hidden' class='kuaidi_code' value='" + item.code + "'/></div>");
			$(".service_list").append("<a href='tel:" + item.remark + "'><img src='" + imgdomain + item.image + "'/></a>");
		});
	});

});