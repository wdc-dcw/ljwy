var communityInformation = function() {
	/*社区资讯列表*/
	this.communityInformationList = function() {
		var isCookie = JSON.parse($.cookie("IsInformationCookie"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsInformationCookie", 1, {
				expires: 3650,
				path: "/"
			});
		}
		var paramsJson = {
			type: 8,
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
								$('<div class="community_list"><p id="bt"><a href="information_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="information_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
							} else {
								$('<div class="community_list"><p id="bt"><a href="information_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="information_detail.html?id=' + item.id + '"></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");

							}
						})
					
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
			type: 8,
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
								$('<div class="community_list"><p id="bt"><a href="information_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="information_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");
							} else {
								$('<div class="community_list"><p id="bt"><a href="information_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="information_detail.html?id=' + item.id + '"></a></div><div class="detail"><p>' + item.shortDesc + '</div></div>').appendTo(".com");

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

//资讯详情
this.informationDetail = function() {
	var paramsJson = {
		id: GetQueryString("id")
	}
	var data = {
		opt: "getNoticeOrActiveDetail",
		secretKey: "mobileSecretKey1234567890",
		params: JSON.stringify(paramsJson)
	}
	$.post(interfaceApi, data, function(result) {
		var result = JSON.parse(result);
		if (result.messageCode == 1) {
			var datetime = stringToDatetime(result.resultObject.createTime);
			//$('<div class"list"><div class="title"><p>' + result.resultObject.name + '</p><p>发布时间：' + datetimeToString(datetime, "yyyy") + '年' + datetimeToString(datetime, "MM") + '月' + datetimeToString(datetime, "dd") + '日</p></div><div class="banner"><a><img src="' + imgdomain + result.resultObject.image1 + '" /></a><p>' + result.resultObject.theContent + '</p></div><div class="name"><p>发表人：' + result.resultObject.createrId + '</p></div><div>').appendTo(".list");
			$('<div class"list"><div class="title"><p>' + result.resultObject.name + '</p><p>发布时间：' + datetimeToString(datetime, "yyyy") + '年' + datetimeToString(datetime, "MM") + '月' + datetimeToString(datetime, "dd") + '日</p></div><div class="banner"><p>' + result.resultObject.theContent + '</p></div><div>').appendTo(".list");
			if(result.resultObject.image1==null || result.resultObject.image1==""){
 					$(".banner a img").hide();
            	}
		} else {
			getBomBbox(result.message);
		}
	});
}
}