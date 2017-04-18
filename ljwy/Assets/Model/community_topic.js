//个人话题
var community_topic = function() {
	this.all_topic = function() {
		var isCookie = JSON.parse($.cookie("IsAllTopic"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsAllTopic", 1, {
				expires: 3650,
				path: "/"
			});
		}
		var paramsJson = {
			type: 2,
			pageSize: 6,
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
				if (result.resultObject.length < 1) {
					$(".nullimg").show();
				}
				$.each(result.resultObject, function(i, item) {
					$('<div class="topic"><a href="topic_details.html?id=' + item.id + '"><div class="topic_img"><img src="' + imageNull(item.createrImage) + '"/></div><div class="topic_content"><p class="title">' + item.name + '</p><p><span class="nickname">' + item.createrNickName + '</span><span class="createtime">' + item.createTime + '</span></p></div></a></div>').appendTo(".list");

				});
			} else {
				getBomBbox(result.message);
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
					type: 2,
					pageSize: 6,
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
								$('<div class="topic"><a href="topic_details.html?id=' + item.id + '"><div class="topic_img"><img src="' + imageNull(item.createrImage) + '"/></div><div class="topic_content"><p class="title">' + item.name + '</p><p><span class="nickname">' + item.createrNickName + '</span><span class="createtime">' + item.createTime + '</span></p></div></a></div>').appendTo(".list");
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

	this.topic_detail = function() {
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
				$('<span><img src="' + imageNull(result.resultObject.createrImage) + '"></span><p class="titlename">' + result.resultObject.name + '</p><p><samp class="nickname">' + result.resultObject.createrNickName + '</samp><samp class="time">' + result.resultObject.createTime + '</samp></p>').appendTo(".title");
				if (result.resultObject.image1 != "") {
					$('<p><a class="picture"><img src="' + imgdomain + result.resultObject.image1 + '" /></a></p>').appendTo(".banner");
				} 
				if (result.resultObject.image2 != "") {
					$('<p><a class="picture"><img src="' + imgdomain + result.resultObject.image2 + '" /></a></p>').appendTo(".banner");
				}
				if (result.resultObject.image3 != "") {
					$('<p><a class="picture"><img src="' + imgdomain + result.resultObject.image3 + '" /></a></p>').appendTo(".banner");
				}
				if (result.resultObject.image4 != "") {
					$('<p><a class="picture"><img src="' + imgdomain + result.resultObject.image4 + '" /></a></p>').appendTo(".banner");
				}
				if (result.resultObject.image5 != "") {
					$('<p><a class="picture"><img src="' + imgdomain + result.resultObject.image5 + '" /></a></p>').appendTo(".banner");
				}

				$('<p>' + result.resultObject.theContent + '</p><p class="interact"><a class="thumbUp"><img src="Assets/Images/praise.png" class="banner_img" /></a><span class="goodNum">' + result.resultObject.goodNum + '</span><a><img src="Assets/Images/discuss.png" class="banner_img" /><span>' + result.resultObject.comments.length + '</span></a></p>').appendTo(".banner");
				if (result.resultObject.comments == "") {
					$(".tourist").hide();
				}
				if (JSON.parse(eval($.cookie(managerMemory))) != null) {
							// 读取数据
							if (result.resultObject.createrId == JSON.parse(eval($.cookie(managerMemory))).mobile) {
								$(".delete_topic").show();
							}else{
								$(".delete_topic").hide();
							}
							}else{
								$(".delete_topic").hide();
							}
				$.each(result.resultObject.comments, function(i, item) {
					$('<div class="tour_pho"><img src="' + imageNull(item.createrImage) + '" /></div><div class="name"><p><a>' + item.createrNickName + '</a><a>' + (i + 1) + '楼</a></p><p class="centent">' + item.theContent + '</p><p class="time">' + item.createTime + '</p></div>').appendTo(".tourist");
				});
			} else {
				getBomBbox(result.message);
			}
		});
		$(".banner").delegate("img", "click", function () {
                    
                   var url = $(this).attr("src");
                    $("#Bigimg img").attr("src", url);
                	$("#Bigimg").show();
                });
                $("#Bigimg").click(function () {
                $("#Bigimg").hide();
            });
        $(".top").delegate(".delete_topic", "click", function() {
				$(".tan1").show();
				$(".mask").show();
			});
		$("#cancel1").on("click", function() {
				$(".tan1").hide();
				$(".mask").hide();
			});
		$("#ok1").on("click", function() {
				delete_topic();

			});
		var delete_topic = function() {
			isLogin();
		var paramsJson = {
			id: GetQueryString("id"),
			mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,

		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "deleteTopicOrActive",
			params: JSON.stringify(paramsJson)
		}
		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				location.href = "community_topic_list.html";
			} else {
				getBomBbox(result.message);
			}
		});
	}       
		$(".banner").delegate(".thumbUp", "click", function() {
			isLogin();
			var paramsJson = {
				id: GetQueryString("id"),
				mobile: JSON.parse(eval($.cookie(managerMemory))).mobile
			}
			var data = {
				opt: "thumbUp",
				secretKey: "mobileSecretKey1234567890",
				params: JSON.stringify(paramsJson)
			}
			$.post(interfaceApi, data, function(result) {
				var result = JSON.parse(result);
				if (result.messageCode == 1) {
					getBomBbox(result.message);
					setTimeout(function() {
						location.href = "topic_details.html?id=" + GetQueryString('id');
					}, 500)

				} else {
					if (result.messageCode == 2) {
						location.href = "login.html";
					} else {
						getBomBbox(result.message);
					}

				}
			});


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
						type: "4"

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
								location.href = "topic_details.html?id=" + GetQueryString('id');
							}, 500)

						} else {
							if (result.messageCode == 2) {
								location.href = "login.html";
							} else {
								index = 1;
								$("#submitBtn").attr("onselectstart", "");
								$("#submitBtn").attr("ontouchstart", "");
								getBomBbox(result.message);
							}

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
		var dropload = $('body').dropload({
			scrollArea: window,
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
				domUpdate: '<div class="dropload-update">↓释放加载</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			},
			loadDownFn: function(me) {
				location.replace(location.href);
			}
		});
	}


	//发布话题
	this.add_topic = function() {
		isLogin();
		var uploader = getUploader(null);
		uploader.init(); //初始化上传图片
		var index = 1;
		$(".submit a").click(function() {
			isLogin();
			index = 2;
			preCheck("formTopic");
			$(".submit a").attr("onselectstart", "return false");
			$(".submit a").attr("ontouchstart", "return false");
			if (checkUnNull == true) {
				var paramsJson = {
						mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
						title: $("#title").val(),
						content: $("#content").val(),
						images: [],
						type: "2"
					}
					//上传图片的集合
				$.each($(".images").find("img"), function(i, item) {
					if ($(item).attr("key") != null) {
						paramsJson.images.push({
							"name": $(item).attr("key")
						});
					}
				});
				var data = {
					opt: "addTopicOrActive",
					secretKey: "mobileSecretKey1234567890",
					params: JSON.stringify(paramsJson)
				}
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 2) {
						location.href = "login.html";
					} else if (result.messageCode == 1) {
						getBomBbox(result.message);
						setTimeout(function() {
							location.href = "community_topic_list.html";
						}, 1000)

					} else {
						index = 1;
						$(".submit a").attr("onselectstart", "");
						$(".submit a").attr("ontouchstart", "");
						getBomBbox(result.message);
					}
				})
			} else {
				index = 1;
				$(".submit a").attr("onselectstart", "");
				$(".submit a").attr("ontouchstart", "");
			}

		});

$(".images").delegate(".delete", "click", function () {
                $(this).parent("a").remove();
                $("#browse").show();
                $(".images div").show();
                uploader.refresh();
            });
            $(".images").delegate(".uploadimg", "click", function () {
                var Smallimg = $(this).attr("src");
                $("#Bigimg img").attr("src", Smallimg);
                $("#Bigimg").show();
            });
            $("#Bigimg").click(function () {
                $("#Bigimg").hide();
            })
		/*$(".images").delegate(".delete", "click", function() {
			$(this).parent("a").remove();
			$("#browse").show();
			uploader.refresh();
		});
		$(".images").delegate(".uploadimg", "click", function() {
			var Smallimg = $(this).attr("src");
			$("#Bigimg img").attr("src", Smallimg);
			$("#Bigimg").show();
		});
		$("#Bigimg").click(function() {
			$("#Bigimg").hide();
		})*/

	}

	var getUploader = function (uploader) {
        uploader = new plupload.Uploader({
            //fileSingleSizeLimit: 1024*1024*1.5,
            browse_button: 'browse', //触发文件选择对话框的按钮，为那个元素id
            url: interfaceApi + '?secretKey=mobileSecretKey1234567890&opt=upload', //服务器端的上传页面地址
            flash_swf_url: 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
            silverlight_xap_url: 'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            multi_selection: false,
            file_data_name: "images",
            filters: {
                mime_types: [ //只允许上传图片和zip文件
                { title: "Image files", extensions: "jpg,gif,png" }
                ],
                max_file_size: uploader_max_file_size,
                prevent_duplicates: true
            },
            resize: {
                width: plupload_width,
                height: plupload_height,
                crop: false,
                quality: plupload_quality,
                preserve_headers: false
            }
        });
        //uploader.bind('error', function (handler) {
        //    if (handler == "Q_EXCEED_NUM_LIMIT") {
        //        alert("超出最大张数");
        //    }
        //    if (handler == "F_DUPLICATE") {
        //        alert("文件重复");
        //    }
        //});
        uploader.bind('FileUploaded', function (uploader, file, responseObject) {
            var imgjson = JSON.parse(responseObject.response);
            $(".images").prepend("<a href='javascript:;'><img  class='uploadimg' src='" + imgdomain + imgjson.resultObject + "' key='" + imgjson.resultObject + "'><img src='Assets/Images/delete.png' class='delete'></a>");
            if ($(".images a").length >= 6) { $("#browse").hide(); isloader = false; $(".images div").hide(); }
            else {
                uploader.refresh();
            }

        });

        uploader.bind('FilesAdded', function (uploader, files) {
            uploader.start();
        });
        return uploader;
    }
	/*var getUploader = function(uploader) {
		uploader = new plupload.Uploader({
			browse_button: 'browse', //触发文件选择对话框的按钮，为那个元素id
			url: interfaceApi + '?secretKey=mobileSecretKey1234567890&opt=upload', //服务器端的上传页面地址
			flash_swf_url: 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
			silverlight_xap_url: 'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
			multi_selection: false,
			file_data_name: "images"
		});
		uploader.bind('FileUploaded', function(uploader, file, responseObject) {
			var imgjson = JSON.parse(responseObject.response);
			$(".images").prepend("<a href='javascript:;'><img class='uploadimg' src='" + imgdomain + imgjson.resultObject + "' key='" + imgjson.resultObject + "'><img src='Assets/Images/delete.png' class='delete'></a>");
			if ($(".images a").length >= 6) {
				$("#browse").hide();
				isloader = false;
			} else {
				uploader.refresh();
			}

		});

		uploader.bind('FilesAdded', function(uploader, files) {
			uploader.start();
		});
		return uploader;
	}*/

	this.my_topic = function() {
		isLogin();
		var isCookie = JSON.parse($.cookie("IsMyTopic"));
		if (isCookie == null) {
			getBomBbox("↑上拉加载更多");
			$.cookie("IsMyTopic", 1, {
				expires: 3650,
				path: "/"
			});
		}
		var paramsJson = {
			mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
			type: 2,
			pageSize: 6,
			gotoPage: 1,
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getUserNoticeOrActiveList",
			params: JSON.stringify(paramsJson)
		}
		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				if (result.resultObject.length < 1) {
					$(".nullimg").show();
				}
				$.each(result.resultObject, function(i, item) {
					$('<div class="topic"><a href="topic_details.html?id=' + item.id + '"><div class="topic_img"><img src="' + imgdomain + item.createrImage + '"/></div><div class="topic_content"><p class="title">' + item.name + '</p><p><span class="nickname">' + item.createrNickName + '</span><span>' + item.createTime + '</span></p></div></a></div>').appendTo(".list");

				});
			} else {
				getBomBbox(result.message);
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
					mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
					type: 2,
					pageSize: 6,
					gotoPage: pageindex,
				}
				var data = {
						secretKey: "mobileSecretKey1234567890",
						opt: "getUserNoticeOrActiveList",
						params: JSON.stringify(paramsJson)
					}
					//post请求
				$.post(interfaceApi, data, function(result) {
					var result = JSON.parse(result);
					if (result.messageCode == 1) {
						if (result.resultObject.length > 0) {
							$.each(result.resultObject, function(i, item) {
								$('<div class="topic"><a href="topic_details.html?id=' + item.id + '"><div class="topic_img"><img src="' + imgdomain + item.createrImage + '"/></div><div class="topic_content"><p class="title">' + item.name + '</p><p><span class="nickname">' + item.createrNickName + '</span><span>' + item.createTime + '</span></p></div></a></div>').appendTo(".list");
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