var activitie = function() {
	//活动列表
	this.activitiesList = function() {
		//活动开始时间
		var startTime;
		//活动结束时间
		var endTime;
		var isCookie = JSON.parse($.cookie("IsActivitieCookie"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsActivitieCookie", 1, {expires: 3650,path: "/"});
		}
		var paramsJson = {
			type: 1,
			pageSize: 2,
			gotoPage: 1,
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
						startTime = item.startDate;
						endTime = item.endDate;
						if (item.image1 == "" || item.image1 == null) {
						    $(' <div class="community_list" id="com_activityId"><a href="activity_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner" style="width:100%;height:.3rem;"><span class="zhuangtai_style style1" style="background-color:rgba(255, 255, 255, 0);top: 0;">' + checkTime() + '</span></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div>').appendTo(".com");
						}
						else {
						    $(' <div class="community_list" id="com_activityId"><a href="activity_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner"><img src="' + imgdomain + item.image1 + '" /><span class="zhuangtai_style style1">' + checkTime() + '</span></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div>').appendTo(".com");
						}
					});
				} else {
					$(".nullimg").show();
				}
			} else {
				getBomBbox(result.message);
				$(".nullimg").show();
			}
		});


		var d = new Date()
		var vYear = d.getFullYear()
		var vMon = d.getMonth() + 1
		var vDay = d.getDate()
		var s = vYear + (vMon < 10 ? "0" + vMon : vMon) + (vDay < 10 ? "0" + vDay : vDay);
		//当前系统时间
		var currentTime = vYear + "-" + vMon + "-" + vDay;


		//比较时间的大小
		function checkTime() {
			var start = new Date(startTime.replace("-", "/").replace("-", "/"));
			var current = new Date(currentTime.replace("-", "/").replace("-", "/"));
			var end = new Date(endTime.replace("-", "/").replace("-", "/"));
			if (start > current) {
				return "未开始";
			} else if (current < end) {
				return "进行中";
			} else {
				return "已结束";
			}
		}

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
					type: 1,
					pageSize: 2,
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
								startTime = item.startDate;
								endTime = item.endDate;
								if (item.image1 == "" || item.image1 == null) {
								    $(' <div class="community_list" id="com_activityId"><a href="activity_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner" style="width:100%;height:.3rem;"><span class="zhuangtai_style style1" style="background-color:rgba(255, 255, 255, 0);top:0">' + checkTime() + '</span></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div>').appendTo(".com");
								}
								else {
								    $(' <div class="community_list" id="com_activityId"><a href="activity_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner"><img src="' + imgdomain + item.image1 + '" /><span class="zhuangtai_style style1">' + checkTime() + '</span></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div>').appendTo(".com");
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
						getBomBbox(result.message);
					}
				});
			}
		});
	}



	//活动详情
	this.activityDetails = function() {
	    var dropload = $('body').dropload({
	        scrollArea: window,
	        domDown: {
	            domClass: 'dropload-down',
	            domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
	            domUpdate: '<div class="dropload-update">↓释放加载</div>',
	            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
	        },
	        loadDownFn: function (me) {
	            location.replace(location.href);  
	        }
	    });

		/*//系统时间的当前年份
        var currentYear = datetimeToString(currentTime,"yyyy");
        //系统时间的当前月份
        var currentMonth = datetimeToString(currentTime,"MM");
         //系统时间的当前日
        var currentMonth = datetimeToString(currentTime,"dd");*/

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
				var starttime = stringToDatetime(result.resultObject.startDate);
				var endtime = stringToDatetime(result.resultObject.endDate);
				// var str = datetime.split(" ");
			    // var strdate = str[0].split("-");
				if (result.resultObject.image1 == "" || result.resultObject.image1 == null) {
				    $('<div class="title"><p>' + result.resultObject.name + '</p><p>开始时间：' + datetimeToString(starttime, "yyyy") + '年' + datetimeToString(starttime, "MM") + '月' + datetimeToString(starttime, "dd") + '日至' + datetimeToString(endtime, "yyyy") + '年' + datetimeToString(endtime, "MM") + '月' + datetimeToString(endtime, "dd") + '</p></div><div class="banner"><p>' + result.resultObject.theContent + '</p></div><div class="name"></div>').appendTo(".activityDetail");
				}
				else {
				    $('<div class="title"><p>' + result.resultObject.name + '</p><p>开始时间：' + datetimeToString(starttime, "yyyy") + '年' + datetimeToString(starttime, "MM") + '月' + datetimeToString(starttime, "dd") + '日至' + datetimeToString(endtime, "yyyy") + '年' + datetimeToString(endtime, "MM") + '月' + datetimeToString(endtime, "dd") + '</p></div><div class="banner"><p>' + result.resultObject.theContent + '</p></div><div class="name"></div>').appendTo(".activityDetail");
				}
				$.each(result.resultObject.comments, function(i, item) {
					$("<div class='tourist'><div class='tour_pho'><img src='" +item.createrImage+ "' /></div><div class='name'><p><a>" + item.createrNickName + "</a><a>" + (i + 1) + "楼</a></p><p class='centent'>" + item.theContent + "</p><p class='time'>" + item.createTime + "</p></div></div>").appendTo(".commentContent");
				})
			} else {
				getBomBbox(result.message);
			}
		});


		var index = 1;
		$("#submitBtn").on("click", function() {
			if (JSON.parse(eval($.cookie(managerMemory))) == null) {
			    $(".tan").show();
			    $(".mask").show();
			} else {
				index = 2;
				preCheck("formComment");
				$("#submitBtn").attr("onselectstart", "return false");
				$("#submitBtn").attr("ontouchstart", "return false");
				if (checkUnNull == true) {
					var paramsJson = {
						mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
						id: GetQueryString("id"),
						content: $("#comment_content").val(),
						type: "0"

					}
					var data = {
						opt: "addComment",
						secretKey: "mobileSecretKey1234567890",
						params: JSON.stringify(paramsJson)
					}

					$.post(interfaceApi, data, function(result) {
						var result = JSON.parse(result);
						if (result.messageCode == 1) {
							$("#submitBtn").attr("onselectstart", "return false");
							$("#submitBtn").attr("ontouchstart", "return false");
							getBomBbox(result.message);
							setTimeout(function() {
								location.href = "activity_detail.html?id=" + GetQueryString('id');
							}, 500)

						} else if (result.messageCode == 2) {
							location.href = "login.html";
						} else {
							index = 1;
							$("#submitBtn").attr("onselectstart", "");
							$("#submitBtn").attr("ontouchstart", "");
							getBomBbox(result.message);

						}
					});

				} else {
					index = 1;
					$("#submitBtn").attr("onselectstart", "");
					$("#submitBtn").attr("ontouchstart", "");

				}
			}

		});
		$("#ok").on("click", function() {
			location.href = "login.html";
		});
		$("#cancel").on("click", function() {
		    $(".tan").hide();
		    $(".mask").hide();
		});
	}
}