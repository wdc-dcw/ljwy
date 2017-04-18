/*我的积分*/
var integer = function() {
    /*获取参数*/
    this.score_history = function() {
        isLogin();
        // 获取头像和昵称
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
        }
        var data = {
            opt: "getUserInfo",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                if (result.resultObject.headimgurl != "") {
                    $('<span class="bk"><img src="'+ result.resultObject.headimgurl + '" /></span>').appendTo("#name");
                    $("#nick").text(result.resultObject.nickName);
                } else {
                    $('<span class="bk"><img src="Assets/Images/singer.png"/></span>').appendTo("#name");
                    $("#nick").text("美丽苑业主");
                }
                
            } else if (result.messageCode == 2) {
                location.href = "login.html";

            }
        });

        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            year: "2016",
            gotoPage: 1,
            pageSize: 9999
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "myScoreHistory",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $("#totalScore").text(result.resultObject.totalScore);
                $("#todayScore").text(result.resultObject.todayScore);
                $.each(result.resultObject.otherScore, function(i, item) {
                    var item1 = JSON.parse(item);
                    $('<a href="integral.html?type=' + encodeURI(encodeURI(i)) + '"><div class="particulars"><p>' + i + ':<span>' + item + '分</span></p></div></a>').appendTo(".score_detail");
                });
            } else if (result.messageCode == 2) {
                location.href = "login.html";
            } else {
                getBomBbox(result.message);
            }
        });
    }

    // 积分详情
    this.score_detail = function() {
        //积分的类型
        isLogin();
        var isCookie = JSON.parse($.cookie("IsScoreDetail"));
        if (isCookie == null) { getBomBbox("↑上拉加载更多"); $.cookie("IsScoreDetail", 1, { expires: 3650, path: "/" }); }
        var type;
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            type: decodeURI(GetQueryStringCn("type")),
            year: "2016",
            gotoPage: "1",
            pageSize: "7"
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "myScoreHistory",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                var money = 0;
                var listhtml = "";
                $.each(result.resultObject, function(i, item) {
                    listhtml += "<div class=\"source\"><div class=\"particulars\"><p class=\"title\">" + item.gotFrom + "</p><p class=\"integral_text\">" + item.time + "</p></div><div class=\"integral_num\"><p>" + item.score + "</p></div></div>";
                    money += parseInt(item.score);
                });
                var html = "<div class='month_particulars'>";
                var zonghtml = html + listhtml + "</div>";
                $(".list").append(zonghtml);
            } else if (result.messageCode == 2) {
                location.href = "login.html";
            } else {
                getBomBbox(result.message);
            }
        });



        //下拉刷新
        var pageindex = "2";
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
                    type: decodeURI(GetQueryStringCn("type")),
                    year: "2016",
                    gotoPage: pageindex,
                    pageSize: "7"
                }
                var data = {
                        secretKey: "mobileSecretKey1234567890",
                        opt: "myScoreHistory",
                        params: JSON.stringify(paramsJson)
                    }
                    //post请求
                $.post(interfaceApi, data, function(result) {
                    var result = JSON.parse(result);
                    if (result.messageCode == 1) {
                        if (result.resultObject.length > 0) {
                            var money = 0;
                            var listhtml = "";
                            $.each(result.resultObject, function(i, item) {
                                listhtml += "<div class=\"source\"><div class=\"particulars\"><p class=\"title\">" + item.gotFrom + "</p><p class=\"integral_text\">" + item.time + "</p></div><div class=\"integral_num\"><p>" + item.score + "</p></div></div>";
                                money += parseInt(item.score);
                            });
                            var html = "<div class='month_particulars'>";
                            var zonghtml = html + listhtml + "</div>";
                            $(".list").append(zonghtml);
                            var page = parseInt(pageindex);
                            page++;
                            pageindex = page.toString();
                            setTimeout(function() {
                                me.resetload();
                            }, 500);
                        } else {
                            $('.dropload-load').text("没有更多数据了哟");
                            setTimeout(function() {
                                me.resetload();
                                // dropload.lock();
                            }, 500);
                        }
                    } else {
                        if (result.messageCode == 2) {
                            location.href = "login.html";
                        }


                    }

                });
            }
        });
    }
}