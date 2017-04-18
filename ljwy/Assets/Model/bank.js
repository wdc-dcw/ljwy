/*黄页小类型列表*/
var yellowPageSmall = function() {
	/*加载页面*/
	this.yellowPageSmallList = function() {
		 var isCookie = JSON.parse($.cookie("IsYellowPage"));
        if (isCookie == null) { getBomBbox("↑上拉加载更多"); $.cookie("IsYellowPage", 1, { expires: 3650, path: "/" }); }
		var paramsJson = {
			id: GetQueryString("id"),
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getKbn",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				$("#smallType").text(result.resultObject.nameCn);
				$("#noList").text("亲~附近没有" + result.resultObject.nameCn + "哦");
			} else {
				getBomBbox(result.message);

			}
		})
		var paramsJson = {
			smallTypeId: GetQueryString("id"),
			gotoPage: 1,
			pageSize: 5
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getMerchantList",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				if (result.resultObject.length > 0) {

					$.each(result.resultObject, function(i, item) {
						$('<a href="business_detail.html?id=' + item.id + '&code=' + item.bigType.code + '"><div class="bank"><div class="shop_icon"><img src="' + imageNull(item.image1) + '" /></div><div class="pet_pro"><p>' + item.shopName + '</p><p>' + item.address + '</p></div></div></a>').appendTo(".bank_all");

					});

				} else {
					$(".nullimg").show();
				}
			} else {
				getBomBbox(result.message);
				$(".nullimg").show();
			}
		});



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
								$('<a href="business_detail.html?id=' + item.id + '&code=' + item.bigType.code + '"><div class="bank"><div class="shop_icon"><img src="' + imageNull(item.image1) + '" /></div><div class="pet_pro"><p>' + item.shopName + '</p><p>' + item.address + '</p></div></div></a>').appendTo(".bank_all");

							});
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