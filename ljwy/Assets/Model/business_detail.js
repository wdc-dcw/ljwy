/*获取家政服务、社区黄页和商品的详情信息*/
var business = function() {
	/*加载页面*/
    this.businessDetail = function () {
        $(".bank").delegate(".shop_icon img", "click", function () {
            var Smallimg = $(this).attr("src");
            $("#Bigimg img").attr("src", Smallimg);
            $("#Bigimg").show();
        });
        $("#Bigimg").click(function () {
            $("#Bigimg").hide();
        })
		var paramsJson = {
			id: GetQueryString("id")
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getMerchantDetail",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				$(".shop_icon img").attr("src",imageNull(result.resultObject.image1));
				$("#shopDesc").text(result.resultObject.shopName);
				$('<a href="address_location.html?id=' + GetQueryString("id") + '&code=' + GetQueryString("code") + '&address=' + encodeURI(encodeURI(result.resultObject.address)) + '"><p><span class="address"><img src="Assets/Images/business_add.png" /></span><span class="pro_address">' + result.resultObject.address + '</span><img src="Assets/Images/right.png" /></p></a>').appendTo(".shop_address");
				$('<span class="address"><img src="Assets/Images/business_tel.png" /></span><span class="pro"><a href="tel:' + result.resultObject.tel + '">' + result.resultObject.tel + '</a></span>').appendTo("#tel");
				$("#businessShortDesc").text(result.resultObject.shopSpec);
				$("#merchant").attr("href","tel:"+result.resultObject.tel);
				var id = GetQueryString("id");
				var code = GetQueryString("code");
				if (code == "JZFW") {
					$("#back").attr("href","nanny_service.html?id="+ result.resultObject.smallTypeId);
				} else if (code == "SQHY") {
					$("#back").attr("href","bank.html?id="+ result.resultObject.smallTypeId);
				} 
				$(".shop_icon").delegate("img", "click", function () {
                    var url = $(this).attr("src");
                    $(".mask1").find("img").attr("src", url);
                    $(".mask1").show();
                });
                $(".mask1").click(function () {
                    $(".mask1").hide();
                });
			} else {
				getBomBbox(result.message);
			}


		});
	}
}