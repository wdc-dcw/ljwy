var community = function () {
    //公告列表
    this.communityList = function () {
        var isCookie = JSON.parse($.cookie("IsCommunityCookie"));
        if (isCookie == null) { getBomBbox("↑上拉加载更多"); $.cookie("IsCommunityCookie", 1, { expires: 3650, path: "/" }); }
        //初次加载
        var paramsJson = {
            type: 0,
            pageSize: 3,
            gotoPage: 1,
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "getNoticeOrActiveList",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                if(result.resultObject.length>0){
                    $.each(result.resultObject, function (i, item) {
                        if (item.image1 == "" || item.image1 == null) {
                            $('<div class="community_list"><a href="community_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner"></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div> ').appendTo(".main_all");
                        }
                        else {
                            $('<div class="community_list"><p id="bt"><a href="community_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="community_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</p></div></div> ').appendTo(".main_all");
                        }

                    });
                }else{
                     $(".nullimg").show();
                }
            }
            else {
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
            loadDownFn: function (me) {
                var paramsJson = {
                    type: 0,
                    pageSize: 3,
                    gotoPage: pageindex,
                }
                var data = {
                    secretKey: "mobileSecretKey1234567890",
                    opt: "getNoticeOrActiveList",
                    params: JSON.stringify(paramsJson)
                }
                //post请求
                $.post(interfaceApi, data, function (result) {
                    var result = JSON.parse(result);
                    if (result.messageCode ==1) {
                        if(result.resultObject.length>0){
                            $.each(result.resultObject, function (i, item) {
                                if (item.image1 == "" || item.image1 == null) {
                                    $('<div class="community_list"><a href="community_detail.html?id=' + item.id + '"><p id="bt">' + item.name + '</p><div class="banner"></div><div class="detail"><p>' + item.shortDesc + '</p></div></a></div> ').appendTo(".main_all");
                                }
                                else {
                                    $('<div class="community_list"><p id="bt"><a href="community_detail.html?id=' + item.id + '">' + item.name + '</a></p><div class="banner"><a href="community_detail.html?id=' + item.id + '"><img src="' + imgdomain + item.image1 + '" /></a></div><div class="detail"><p>' + item.shortDesc + '</p></div></div> ').appendTo(".main_all");
                                }
                  
                            });
                            pageindex++;
                            setTimeout(function () {
                                me.resetload();
                            }, 500);
                        }else {
                            $('.dropload-load').text("没有更多数据了哟");
                                setTimeout(function () {
                                    me.resetload();
                                    //dropload.lock();
                                }, 500);

                        }
                        
                    }
                    
                });
            }
        });
    }

    //公告详情
    this.communityDetail = function () {
        var paramsJson = {
            id: GetQueryString("id")
        }
        var data = {
            opt: "getNoticeOrActiveDetail",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                var datetime = stringToDatetime(result.resultObject.createTime);
                if (result.resultObject.image1 == null || result.resultObject.image1 == "") {
                    $('<div class"list"><div class="title"><p>' + result.resultObject.name + '</p><p>发布时间：' + datetimeToString(datetime, "yyyy") + '年' + datetimeToString(datetime, "MM") + '月' + datetimeToString(datetime, "dd") + '日</p></div><div class="banner"><p>' + result.resultObject.theContent + '</p></div><div class="name"><p>发表人：' + result.resultObject.createrNickName + '</p></div><div>').appendTo(".list");
                }
                else {
                    $('<div class"list"><div class="title"><p>' + result.resultObject.name + '</p><p>发布时间：' + datetimeToString(datetime, "yyyy") + '年' + datetimeToString(datetime, "MM") + '月' + datetimeToString(datetime, "dd") + '日</p></div><div class="banner"><p>' + result.resultObject.theContent + '</p></div><div class="name"><p>发表人：' + result.resultObject.createrNickName + '</p></div><div>').appendTo(".list");
                }
        }
            else {
                getBomBbox(result.message);
            }
        });
    }
    var state = function (stateId) {
        switch (stateId) {
            case 0:
                return "已结束";
                break;
            case 1:
                return "进行中";
                break;
        }
    }
}