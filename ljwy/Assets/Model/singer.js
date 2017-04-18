var singer = function() {
    //个人中心
    this.singerCenter = function() {
        isLogin();
        
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
                  information();
                if (result.resultObject.headimgurl != "") {
                    $("#name a img").attr("src", result.resultObject.headimgurl);
                    $("#name").html('<div class="photo">' + '<a class="head_portrait"><img src="' +result.resultObject.headimgurl + '" /></a><a href="singer_info.html"><span>' + result.resultObject.nickName + '</span></a>' + '</div>');

                }else{
                    $("#name").html('<div class="photo">' + '<a class="head_portrait"><img src="' + result.resultObject.headimgurl + '" /></a><a href="singer_info.html"><span>' + "美丽苑业主" + '</span></a>' + '</div>');
                    $("#name a img").attr("src", "Assets/Images/singer.png");
                }
                $("#total").text(result.resultObject.score);
                //消息数
                if (result.resultObject.newMsgCnt != 0) {
                    $("#message").html('<a href="message_list.html"><div class="singer_list" id="hide_message"><div class="list_left"><img src="Assets/Images/singerbg_09.png" />' +
                        '<span> 消息提示</span><b>' + result.resultObject.newMsgCnt + '</b></div><div class="list_right" ><img src="Assets/Images/right.png" /></div></div></a>')
                } else {

                }
                //签到显示
                if (result.resultObject.hasAsigned != 1) {
                    $("#singIn").html("");
                    $("#signs").html("签到");
                    //signs_click();
                } else {
                    $("#singIn").html("<div class=\"sign\"><p>签到成功<a> +" + 10 + "</a>积分</p></div>");
                    $("#signs").html("<a id='signs' style='background-color:#b3b3b3;'>已签到</a>");
                    $("#singIn").remove();

                }
            }
            else if (result.messageCode == 2) {
                location.href = "login.html";
            }
            else if (result.messageCode == 3) {
                getBomBboxyb(result.message);
                setTimeout(function () {
                    location.href = "login.html";
                }, 3000);
            }
            else {
                getBomBbox(result.message);
            }
        });

        $("#name").delegate(".head_portrait", "click", function () {
            var src = $(this).find("img").attr("src");
            $("#Bigimg img").attr("src", src);
            $("#Bigimg").show();
        });
        $("#Bigimg").click(function () {
            $("#Bigimg").hide();
        })
    };
    //个人信息
    this.singer_info = function () {
        //添加房屋信息
        $(".last").click(function() {
            var one_main = $(".one_main").val();
            var secend_main = $(".secend_main").val();
            $(".one_main").val("");
            $(".secend_main").val("");
            if (one_main != "" && secend_main != "") {

                $("#roomNumber").append('<div class="post_car"><span>MLY-' + one_main + '-' + secend_main + '</span><a>删除</a></div>');
            } else {
                getBomBbox("请输入房屋信息")
            }
        });
        //删除
        $("#roomNumber").delegate("a", "click", function() {
            $(this).parent(".post_car").remove();


        });

        //添加车牌车位信息
        $(".lasts").click(function() {
            var parkNum = $(".parkNum").val();
            var carNum = $(".carNum").val();
            $(".parkNum").val("");
            $(".carNum").val("");
            if (parkNum != "" && carNum != "") {
                $("#carNumber").append(' <div class="post_car car_color"><span>' + parkNum + '&nbsp;&nbsp;&nbsp;车牌号' + carNum + '</span><a>删除</a></div>');
            } else {
                getBomBbox("请输入车牌车位信息")
            }
        });
        //删除
        $("#carNumber").delegate("a", "click", function() {
            $(this).parent(".car_color").remove();


        });


        $(".submit a").click(function() {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                name: JSON.parse(eval($.cookie(managerMemory))).name,
                nickName: JSON.parse(eval($.cookie(managerMemory))).nickName,
                buildingNum: [],
                roomCode: [],
                parkNum: $("#parkNum").val(),
                carNum: $("#carNum").val()
            }

            var data = {
                opt: "editUserInfo",
                secretKey: "mobileSecretKey1234567890",
                params: JSON.stringify(paramsJson)
            }

            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    getBomBbox(result.message);
                } else {
                    getBomBbox(result.message);
                }
            })

        });

    }

    //签到
    this.sign = function() {
        isLogin();
        qiandao();
        $(".sub a").click(function() {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            }
            var data = {
                opt: "sign",
                secretKey: "mobileSecretKey1234567890",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    getBomBbox("签到成功！");
                     qiandao();
                    $(".banner a span").html(result.resultObject.days);
                    $(".sub a").html("已签到");
                    $(".sub a").attr("onselectstart", "return false");
                    $(".sub a").attr("ontouchstart", "return false");
                    $("#total").text(result.resultObject.total);
                } else if (result.messageCode == 2) {
                    location.href = "login.html";
                } else {
                    getBomBbox(result.message);
                }
            })
        })
    }


    var qiandao = function() {
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
                $(".banner a span").html(result.resultObject.asignDays);
                if (result.resultObject.hasAsigned != 1) {
                    $(".sub a").html("我要签到");
                } else {
                    $(".sub a").html("已签到");
                    $(".sub a").attr("onselectstart", "return false");
                    $(".sub a").attr("ontouchstart", "return false");
                    $(".sub a").css("background", "#b3b3b3")
                }
            } else {
                getBomBbox(result.message);
            }
        });
    }
}