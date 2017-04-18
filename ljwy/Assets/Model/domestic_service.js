/*家政服务小类型*/
var domestic = function() {
	/*加载页面*/
	this.domesticServiceList = function() {
		var isCookie = JSON.parse($.cookie("IsDomesticService"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsDomesticService", 1, {
				expires: 3650,
				path: "/"
			});
		}
		var paramsJson = {
			smallTypeId: GetQueryString("id"),
			gotoPage: 1,
			pageSize: 5
		};
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getMerchantList",
			params: JSON.stringify(paramsJson)
		};

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				if (result.resultObject.length > 0) {
					$.each(result.resultObject, function(i, item) {
						$('<a href="business_detail.html?id=' + item.id + '&code=' + item.bigType.code + '"><div class="pet_shop"><div class="shop_icon"><img src="' + imgdomain + item.image1 + '" /></div><div class="pet_pro"><p>' + item.shopName + '</p><p>' + item.address + '</p></div></div></a>').appendTo(".domestic_service");
						$("#domestic").text(item.smallType.nameCn);
					});

				} else {
					$(".nullimg").show();
				}

			} else {
				getBomBbox(result.message);
				$(".nullimg").show();
			}
		});

		/*var nameCn=unescape(GetQueryString("nameCn"));
		if(nameCn=="保姆服务"){
			$("#domestic").text("保姆服务");
			$("#noList").text("亲~附近没有保姆服务哦")
		}else if(nameCn=="衣物干洗"){
			$("#domestic").text("衣物干洗");
			$("#noList").text("亲~附近没有衣物干洗哦")
		}else if(nameCn=="宠物寄养"){
			$("#domestic").text("宠物寄养");
			$("#noList").text("亲~附近没有宠物寄养哦")
		}else {
			
		}*/

		/* var id=GetQueryString("id");
            if(id==206){
            	$("#domestic").text("保姆服务");
				$("#noList").text("亲~附近没有保姆服务哦");
            }else if(id==215){
            	$("#domestic").text("衣物干洗");
				$("#noList").text("亲~附近没有衣物干洗哦");
            }else if(id==216){
            	$("#domestic").text("宠物寄养");
				$("#noList").text("亲~附近没有宠物寄养哦");
            }*/

		//下拉刷新
		var pageindex = 2;
		var dropload = $('body').dropload({
			scrollArea: window,
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
				domUpdate: '<div class="dropload-update">↓释放加载</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			},
			loadDownFn: function(me) {
				var paramsJson = {
					smallTypeId: GetQueryString("id"),
					gotoPage: pageindex,
					pageSize: 5
				}
				var data = {
						secretKey: "mobileSecretKey1234567890",
						opt: "getMerchantList",
						params: JSON.stringify(paramsJson)
					}
					//post请求
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						if (result.resultObject.length > 0) {
							$.each(result.resultObject, function(i, item) {
								$('<a href="business_detail.html?id=' + item.id + '&code=' + item.bigType.code + '"><div class="pet_shop"><div class="shop_icon"><img src="' + imgdomain + item.image1 + '" /></div><div class="pet_pro"><p>' + item.shopName + '</p><p>' + item.address + '</p></div></div></a>').appendTo(".domestic_service");

							});
							// var page = 2;
							// pageindex = Integer.parse(page);
							pageindex++;
							setTimeout(function() {
								me.resetload();
							}, 500);
						} else {
							$('.dropload-load').text("没有更多数据了哟");
							setTimeout(function() {
								me.resetload();
								//dropload.lock();
							}, 500);

						}

					}

				});
			}
		});

	}
}