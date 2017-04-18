var recommend = function() {
	/*推荐列表*/
	this.recommends = function() {
		var isCookie = JSON.parse($.cookie("IsRecommendCookie"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsRecommendCookie", 1, {
				expires: 3650,
				path: "/"
			});
		}
		var paramsJson = {
			type: 6,
			pageSize: 5,
			gotoPage: 1
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getNoticeOrActiveList",
			params: JSON.stringify(paramsJson)
		}
		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				if (result.resultObject.length > 0) {
					$.each(result.resultObject, function(i, item) {
						if (item.image1 != "") {
							$('<div class="community_list"><p id="bt"><a href="recommend_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="recommend_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
						} else {
							$('<div class="community_list"><p id="bt"><a href="recommend_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="recommend_detail.html?id=' + item.id + '"></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
						}
					});
				} else {
					$(".nullimg").show();
				}
			} else {
				getBomBbox(result.message);
				$(".nullimg").show();
			}
		})


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
					type: 6,
					pageSize: 5,
					gotoPage: pageindex,
				}
				var data = {
						secretKey: "mobileSecretKey1234567890",
						opt: "getNoticeOrActiveList",
						params: JSON.stringify(paramsJson)
					}
					//post请求
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						if (result.resultObject.length > 0) {
							$.each(result.resultObject, function(i, item) {
								if (item.image1 != "") {
									$('<div class="community_list"><p id="bt"><a href="recommend_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="recommend_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
								} else {
									$('<div class="community_list"><p id="bt"><a href="recommend_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="recommend_detail.html?id=' + item.id + '"></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
								}

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

					} else {


					}
				});
			}
		});
	}
}