var complaints = function() {
    //投诉详情
    this.complaints_detail = function() {
            //判断是否登录
            isLogin();
            /*输入验证码*/
            code();
            $(".list").delegate(".images a img", "click", function () {
                var Smallimg = $(this).attr("src");
                $("#Bigimg img").attr("src", Smallimg);
                $("#Bigimg").show();
            });
            $("#Bigimg").click(function () {
                $("#Bigimg").hide();
            })
            $("#change").click(function() {
                code();
            });
            $(".pay").click(function() {
                $(".tan").show();
                $(".mask").show();
            });
            $("#cancel").on("click", function() {
                $(".tan").hide();
                $(".mask").hide();
            })
            $("#ok").on("click", function() {
                repeal();
            })


            var servicetype = "0";
            var speedtype ="0";
            //服务评价
            $("#servie").delegate("span img", "click", function() {
                servicetype = $(this).attr("data-id");
                for (var i = 0; i < servicetype; i++) {
                    $("#servie span img").eq(i).attr("src", "Assets/Images/light.png");
                }
                for (var j = servicetype; j < 5; j++) {
                    $("#servie span img").eq(j).attr("src", "Assets/Images/unlight.png");
                }
                $("#servie .stotal").text(servicetype + "星");
            });
            //速度
            $("#speed").delegate("span img", "click", function() {
                speedtype = $(this).attr("data-id");
                for (var i = 0; i < speedtype; i++) {
                    $("#speed span img").eq(i).attr("src", "Assets/Images/light.png");
                }
                for (var j = speedtype; j < 5; j++) {
                    $("#speed span img").eq(j).attr("src", "Assets/Images/unlight.png");
                }
                $("#speed .stotal").text(speedtype + "星");
            });
            //详情显示
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                id: GetQueryString("id")
            }
            var data = {
                opt: "myRepairOrComplainDetail",
                secretKey: "mobileSecretKey1234567890",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    //读取数据
                    $('<div class="images"><a href="javascript:;" class="img1"><img src="' + imageNull(result.resultObject.image1) + '" /></a><a href="javascript:;" class="img2"><img src="' + imageNull(result.resultObject.image2) + '" /></a><a href="javascript:;" class="img3"><img src="' + imageNull(result.resultObject.image3) + '" /></a><a href="javascript:;" class="img4"><img src="' + imageNull(result.resultObject.image4) + '" /></a><a href="javascript:;" class="img5"><img src="' + imageNull(result.resultObject.image5) + '" /></a></div><div class="titles"><span class="heading">' + result.resultObject.title + '</span><span class="state02">' + detailstate(result.resultObject.status) + '</span></div><div class="content"><p>' + result.resultObject.theContent + '</p></div>').appendTo(".detail");
                    //图片显示
                    if (result.resultObject.image1 == "") {
                        $(".img1").hide();
                    }
                    if (result.resultObject.image2 == "") {
                        $(".img2").hide();
                    }
                    if (result.resultObject.image3 == "") {
                        $(".img3").hide();
                    }
                    if (result.resultObject.image4 == "") {
                        $(".img4").hide();
                    }
                    if (result.resultObject.image5 == "") {
                        $(".img5").hide();
                    }
                    //已处理（页面展示）
                    if (result.resultObject.status == 4 || result.resultObject.status == 3) {
                        $(".submit").remove();
                        //服务评价
                        var imghtml = "";
                        var servicemark = result.resultObject.serviceMark;
                        for (var j = 0; j < servicemark; j++) {
                            imghtml += "<img src='Assets/Images/light.png'  data-id='" + (j + 1) + "' />";
                            $("#servie .stotal").text((j + 1) + "星");
                        }
                        for (var h = servicemark; h < 5; h++) {
                            imghtml += "<img src='Assets/Images/unlight.png'  data-id='" + (h + 1) + "' />";
                        }
                        $("#servie span.startnum").empty();
                        $("#servie span.startnum").append(imghtml);

                        //态度评价
                        var imghtml = "";
                        var speedmark = result.resultObject.speedMark;
                        for (var j = 0; j < speedmark; j++) {
                            imghtml += "<img src='Assets/Images/light.png'  data-id='" + (j + 1) + "' />";
                            $("#speed .stotal").text((j + 1) + "星");
                        }
                        for (var h = speedmark; h < 5; h++) {
                            imghtml += "<img src='Assets/Images/unlight.png'  data-id='" + (h + 1) + "' />";
                        }
                        $("#speed span.startnum").empty();
                        $("#speed span.startnum").append(imghtml);

                        //只展示禁止点击
                        $(".evaluate").attr("onselectstart", "return false");
                        $(".evaluate").attr("ontouchstart", "return false");
                         $("#content").hide();
                        $('<p style="padding: .13rem;font-size: .12rem;">' + result.resultObject.commentContent + '</p></div>').appendTo(".repair_content");
                    
                        /*if (result.resultObject.commentContent == "" || result.resultObject.commentContent == null) {
                            $("#content").val("  ");
                            $(".repair_content").hide();
                        }
                        else {
                            $("#content").val(result.resultObject.commentContent);
                        }*/
                    }else if(result.resultObject.status == 0){
                    	$(".evaluate").hide();
                    	$(".repair_content").hide();
                    }
                    $(".images").delegate("img", "click", function() {
                        //if($(this).hasClass("imgscale")){
                        //$(this).removeClass("imgscale");
                        //$(this).addClass("imgshort");
                        //}else{
                        //$(this).removeClass("imgshort");
                        //$(this).addClass("imgscale");
                        var url = $(this).attr("src");
                        $(".mask1").find("img").attr("src", url);
                        $(".mask1").show();
                    });
                    $(".mask1").click(function() {
                        $(".mask1").hide();
                    });
                    if (result.resultObject.status == 4 || result.resultObject.status == 3 || result.resultObject.status == 0) {
                        $("#cancel").remove();
                        //只展示禁止点击
                        $(".evaluate").attr("onselectstart", "return false");
                        $(".evaluate").attr("ontouchstart", "return false");
                        $("#content").attr("disabled", true);
                        $("#content").css({
                            'background': '#fff'
                        });
                        //提交按钮移除
                        $(".submit").remove();
                        $(".code").remove();
                        $(".pay").hide();
                    }
                } else {
                    if (result.messageCode == 2) {
                        location.href = "login.html";
                    } else {
                        getBomBbox(result.message);
                    }

                }
            });

            //处理中提交评价
            $("#submitBtn").on("click", function() {
                 if(servicetype=="0" || speedtype=="0" ||$("#content").val()=="0"){
                    getBomBbox("请对本次服务态度做出评价哦，亲");
                    if(servicetype=="0"){
                    getBomBbox("请对本次服务态度做出评价哦，亲");
                    }
                    else if(speedtype=="0"){
                        getBomBbox("请对本次处理速度做出评价哦，亲");
                    }
                    else if($("#content").val()=="0"){
                        getBomBbox("请输入对本次投诉做出评价哦，亲");
                    }
                } else{
                
                
                preCheck("formComplaintDetail");
                if (checkUnNull == true) {
                    var paramsJson = {
                        id: GetQueryString("id"),
                        mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                        service: servicetype,
                        speed: speedtype,
                        commentContent: $("#content").val(),
                        verifyCode: $("#verifyCode").val(),
                    }
                    var data = {
                        secretKey: "mobileSecretKey1234567890",
                        opt: "closeMyRepairOrComplain",
                        params: JSON.stringify(paramsJson)
                    }
                    $.post(interfaceApi, data, function(result) {
                        var result = JSON.parse(result);
                        if (result.messageCode == 1) {
                            location.href = "owner_complaints.html";
                        } else {
                            getBomBbox(result.message);
                        }
                    })
                }else {

                }
              }
            })
        }
        //投诉详情状态
    var detailstate = function(stateId) {
            switch (stateId) {
                case 0:
                    return "已投诉";
                    break;
                case 1:
                    return "处理中";
                    break;
                case 2:
                    return "已处理";
                    break;
                case 3:
                    return "已撤销";
                    break;
                case 4:
                    return "已评价";
                    break;
            }
        }
        //投诉列表
    this.ownerComplaintsList = function() {
            isLogin();
            getList($("#year").val(), $("#month").val(), $("#state").val());
            $("#year").change(function() {
                var year = $("#year").val();
                var month = $("#month").val();
                var state = $("#state").val();
                getList(year, month, state);
            });
            $("#month").change(function() {
                var year = $("#year").val();
                var month = $("#month").val();
                var state = $("#state").val();
                getList(year, month, state);
            });
            $("#state").change(function() {
                var year = $("#year").val();
                var month = $("#month").val();
                var state = $("#state").val();
                getList(year, month, state);
            });
            $(".complain_detail").delegate("p.che span", "click", function() {
                var id = $(this).parent().parent().find("a").attr("id");
                $(".tan").show();
                $(".mask").show();
                $(".tan").attr("id", id);
            });
            $("#cancel").on("click", function() {
                $(".tan").hide();
                $(".mask").hide();
            })
            $("#ok").on("click", function() {
                repealList($(this).parent().attr("id"));
                getList($("#year").val(), $("#month").val(), $("#state").val());
            })

            $(".complain_detail").delegate("p.delete span", "click", function() {
                var id = $(this).parent().parent().find("a").attr("id");
                $(".tan1").show();
                $(".mask1").show();
                $(".tan1").attr("id", id);
            });
            $("#ok1").on("click", function() {
                delet($(this).parent().attr("id"));

            });
            $("#cancel1").on("click", function() {
                $(".tan1").hide();
                $(".mask1").hide();
            });
        }
        //投诉列表方法
    var getList = function(year, month, state) {
        var paramsJson = {
            type: "1",
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            year: year,
            month: month,
            status: state,
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "myRepairOrComplainList",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            $(".nullimg").hide();
            if (result.messageCode == 2) {
                location.href = "login.html";
            } else if (result.messageCode == 1) {
                var toptitle;
                toptitle = GetQueryString("toptitle");
                if (toptitle == 1) {
                    $(".top span").html("我的投诉");
                }
                $(".list").remove();
                var statusNum;
                if (result.resultObject.length > 0) {
                    $.each(result.resultObject, function(i, item) {
                        if (item.status == 0 || item.status == "") {
                            $('<div class="list"><a class="choose" href="complaints_detail.html?id=' + item.id + '" id=' + item.id + '><div class="middle"><div class="images"><img src="' + imageNull(item.image1) + '" /></div><div class="content"><p><span class="bt">' + item.title + '</span><span class="dealing">' + states(item.status) + '</span></p><p class="detail">' + item.theContent + '</p><p class="time">' + unixToString(parseInt(item.reportTime.time / 1000)) + '</p></div></div></a><p class="che" ><span>撤销</span></p></div>').appendTo(".complain_detail");
                            statusNum = item.status;
                        }
                        if (item.status == 1 || item.status == 2 || item.status == 4) {
                            $('<div class="list"><a class="choose" href="complaints_detail.html?id=' + item.id + '" id=' + item.id + '><div class="middle"><div class="images"><img src="' + imageNull(item.image1) + '" /></div><div class="content"><p><span class="bt">' + item.title + '</span><span class="dealing">' + states(item.status) + '</span></p><p class="detail">' + item.theContent + '</p><p class="time">' + unixToString(parseInt(item.reportTime.time / 1000)) + '</p></div></div></a></div>').appendTo(".complain_detail");
                            statusNum = item.status;
                        } else if (item.status == 3) {
                            $('<div class="list"><a class="choose" href="complaints_detail.html?id=' + item.id + '" id=' + item.id + '><div class="middle"><div class="images"><img src="' + imageNull(item.image1) + '" /></div><div class="content"><p><span class="bt">' + item.title + '</span><span class="dealing">' + states(item.status) + '</span></p><p class="detail">' + item.theContent + '</p><p class="time">' + unixToString(parseInt(item.reportTime.time / 1000)) + '</p></div></div></a><p class="delete"><span>删除</span></p></div>').appendTo(".complain_detail");
                            statusNum = item.status;


                        }
                    });
                    if (statusNum == 1) {
                        $('.choose').removeAttr('href'); //去掉a标签中的href属性
                    }
                } else {
                    $(".nullimg").show();
                }
            } else if (result.messageCode == 3) {
                getBomBboxyb(result.message);
                setTimeout(function() {
                    location.href = "login.html";
                }, 3000);
            } else {
                $(".nullimg").show();
            }
        });
    }

    //投诉列表状态
    var states = function(stateId) {
        var str;
        switch (stateId) {
            case "":
                str = "全部";
                break;
            case 0:
                str = "已投诉";
                break;
            case 1:
                str = "处理中";
                break;
            case 2:
                str = "已处理";
                break;
            case 3:
                str = "已撤销";
                break;
            case 4:
                str = "已评价";
                break;
        }
        return str;
    }
    var code = function() {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            }
            var data = {
                secretKey: "mobileSecretKey1234567890",
                opt: "createVerifyCode",
                params: JSON.stringify(paramsJson)
            }

            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    $(".imgVerifyCode img").remove();
                    $('<img src="' + imgdomain + result.resultObject + '"/>').appendTo(".imgVerifyCode");
                } else {
                    getBomBbox(result.message);
                }
            })

        }
        //撤销
    var repeal = function() {
        var paramsJson = {
            id: GetQueryString("id"),
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,

        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "cancelRepairOrCpl",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
            getBomBbox(result.message);
            setTimeout(function(){location.href = "owner_complaints.html";},500);
            } else {
                getBomBbox(result.message);
            }
        });
    }
};

//删除
var delet = function(id) {
    var paramsJson = {
        mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
        id: id,
    }
    var data = {
        secretKey: "mobileSecretKey1234567890",
        opt: "delRepariOrCpl",
        params: JSON.stringify(paramsJson)
    }
    $.post(interfaceApi, data, function(result) {
        var result = JSON.parse(result);
        if (result.messageCode == 1) {
            $(".tan1").hide();
            $(".mask1").hide();
            getBomBbox(result.message);
            setTimeout(function(){location.href = "owner_complaints.html";},500);
        } else {
            getBomBbox("删除投诉记录失败");

        }
    });
}

var repealList = function(id) {
    var paramsJson = {
        id: id,
        mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,

    }
    var data = {
        secretKey: "mobileSecretKey1234567890",
        opt: "cancelRepairOrCpl",
        params: JSON.stringify(paramsJson)
    }
    $.post(interfaceApi, data, function(result) {
        var result = JSON.parse(result);
        if (result.messageCode == 1) {
            $(".tan").hide();
            $(".mask").hide();
            getBomBbox("取消投诉成功！");
            setTimeout(function(){location.href = "owner_complaints.html";},500);
        } else {
            getBomBbox(result.message);
        }
    });

};