//缴费模块
var payCost = function() {
    //缴费中心
    this.payAdvances = function () {
       if (GetQueryString("type") == 0) {
            $("#type").text("物业管理费");
        }
            isLogin();
            var wyArray; //房屋号
            var index = 1;
            
            var init = function() {
                var paramsJson = {
                    mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                }
                var data = {
                    secretKey: "mobileSecretKey1234567890",
                    opt: "getUserInfo",
                    params: JSON.stringify(paramsJson)
                }
                $.post(interfaceApi, data, function(result) {
                    var result = JSON.parse(result);
                    if (result.messageCode == 1) {
                        wyArray = result.resultObject.rooms;
                        if (getType() == 0) {
                            bindPlace(wyArray, getType());
                        } 

                        updateTotal(getType(), getPlaceArray(getType()), $(".date span[cur='1']").attr("months"), $(".date span[cur='1']").attr("cuponid"));
                        if (getPlaceArray(getType()) == undefined) {
                            $(".tan").show();
                            $(".mask").show();
                        }
                        $("#cancel").on("click", function() {
                            $(".tan").hide();
                            $(".mask").hide();
                            index = 2;
                            $("#sub").attr("onselectstart", "return false");
                            $("#sub").attr("ontouchstart", "return false");
                            getBomBbox("还没有绑定房屋信息哦！");
                        });
                        $("#ok").on("click", function() {
                            location.href = "singer_info.html"
                        });
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
            };
            
            init();

            //绑定缴费位置
            //items:位置数组
            //type:0-车位,1-房屋
            var bindPlace = function(items, type) {
                $(".place").empty();
                if (type == 0) {
                    if(items.length==0){
                        $('<a href="singer_info.html"><span class="title">请选择您要缴费的房屋</span></a>').appendTo(".place");
                    }else{
                        $('<span class="title">请选择您要缴费的房屋</span>').appendTo(".place");
                    }
                    $.each(items, function(i, item) {
                        if (i == 0) {
                            $('<p period="' + item.lastPeriod + '" price="' + item.price + '"><span class="choose_show"><img src="Assets/Images/choose_bg.png"/></span><span class="type" cur="1" roomcode="' + item.roomCode + '">' + item.roomCode.split("-")[1] + "号" + item.roomCode.split("-")[2] + '室</span></p>').appendTo(".place");
                            $(".money_flg .money").text(item.price);
                        } else if (i != 0) {
                            $('<p period="' + item.lastPeriod + '" price="' + item.price + '"><span class="choose_show"><img src="Assets/Images/choose.png"/></span><span class="type" cur="0" roomcode="' + item.roomCode + '">' + item.roomCode.split("-")[1] + "号" + item.roomCode.split("-")[2] + '室</span></p>').appendTo(".place");
                        }
                    });
                } 
            }



            /*缴费位置事件*/
            $(".place").delegate("p", "click", function() {
                var src = $(this).find("img").attr("src");
                if (src == "Assets/Images/choose.png") {
                    $(this).parent().find("img").attr("src", "Assets/Images/choose.png");
                    $(this).parent().find(".type").attr("cur", "0");
                    $(this).find("img").attr("src", "Assets/Images/choose_bg.png");
                    $(this).find(".type").attr("cur", "1");
                    $("#lastPeriod").text($(this).attr("period"));
                    $(".money_flg .money").text($(this).attr("price"));
                } else {}
                updateTotal(getType(), getPlaceArray(getType()), $(".date span[cur='1']").attr("months"), $(".date span[cur='1']").attr("cuponid"));
            });


            //支付时间事件
            $(".pay_style p .choose_sure").click(function() {
                var src = $(this).find("img").attr("src");
                if (src == "Assets/Images/choose.png") {
                    $(this).parent().parent().find("p").attr("cur", "1");
                    $(this).parent().parent().children().find(".choose_sure img").attr("src", "Assets/Images/choose.png")
                    $(this).find("img").attr("src", "Assets/Images/choose_bg.png")
                    $(this).parent("p").attr("cur", "0");
                } else {}

                updateTotal(getType(), getPlaceArray(getType()), $(".date span[cur='1']").attr("months"), $(".date span[cur='1']").attr("cuponid"));
            });
            //缴费时长
            $(".date span").click(function() {
                var src = $(this).find("img").attr("src");
                if (src == "Assets/Images/choose.png") {
                    $(this).parent().children().find("img").attr("src", "Assets/Images/choose.png");
                    $(this).parent().find("span").attr("cur", "0");
                    $(this).find("img").attr("src", "Assets/Images/choose_bg.png");
                    $(this).attr("cur", "1");
                } else {}
                updateTotal(getType(), getPlaceArray(getType()), $(".date span[cur='1']").attr("months"), $(".date span[cur='1']").attr("cuponid"));
            });
            /*获取缴费类型*/
            var getType = function() {
                    return GetQueryString("type");
                }
                /*获取缴费位置*/
            var getPlaceArray = function(type) {
                var placeArray;
                if (type == "0") {
                    placeArray = $(".place").find(".type[cur='1']").attr("roomcode");
                    //$.each($(".place").find(".type[cur='1']"), function (i, item) {
                    //    placeArray.push($(this).attr("roomcode"));
                    //})
                }

                return placeArray;
            }

            //更新价格
            var updateTotal = function(type, placeArray, months, cuponid) {
                var total = "";
                if (type == "0") {
                    if ($(".place").find(".type[cur='1']").attr("roomcode") == placeArray) {
                        var price = $(".place").find(".type[cur='1']").parent().attr("price");
                        total += (parseFloat(price) * parseFloat(months)).toFixed(2);
                    }

                } else if (type == "1") {
                    if ($(".place").find(".type[cur='1']").attr("parkno") == placeArray) {
                        var price = $(".place").find(".type[cur='1']").parent().attr("price");
                        total += (parseFloat(price) * parseFloat(months)).toFixed(2);
                    }
                }
                if (total == "NaN") {
                    total = 0;
                }
                $(".carprice").find("span").empty();
                $(".carprice").find("span").text(total);
            }

            var getParams = function() {
                isLogin();
                var paramsJson = {
                    mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                    type: getType(),
                    payType: "0",
                    months: $(".date span[cur='1']").attr("months"),
                    cuponId: $(".date span[cur='1']").attr("cuponid"),
                    roomCode: getPlaceArray(0),
                    score: 0,
                    total: $(".carprice p span").text()
                }


                return paramsJson;
            };

            /*获取提交按钮*/

            var islight = true;
            
            $("input[type='checkbox']").click(function() {
                if (islight) {
                    $(".submit").removeClass("ok");
                    index = 1;
                    $("#sub").attr("onselectstart", "");
                    $("#sub").attr("ontouchstart", "");
                    islight = false;
                } 
                else {
                    $(".submit").addClass("ok");
                    index = 2;
                    $("#sub").attr("onselectstart", "return false");
                    $("#sub").attr("ontouchstart", "return false");
                    islight = true;
                }
            });
            $("#sub").on("click", function() {
                if (islight == false) {
                    if($(".place p").html() != null){
                        index = 2;
                        $("#sub").attr("onselectstart", "return false");
                        $("#sub").attr("ontouchstart", "return false");
                        var paramsJson = getParams();
                        var data = {
                            secretKey: "mobileSecretKey1234567890",
                            opt: "pay",
                            params: JSON.stringify(paramsJson)
                        }
                        $.post(interfaceApi, data, function(result) {
                            var result = JSON.parse(result);
                            if (result.messageCode == 1) {
                                location.href = result.resultObject;
                            } else {
                                index = 1;
                                $("#sub").attr("onselectstart", "");
                                $("#sub").attr("ontouchstart", "");
                                getBomBbox(result.message);
                            }
                        });
                    }
                    else {
                        index = 2;
                        $("#sub").attr("onselectstart", "return false");
                        $("#sub").attr("ontouchstart", "return false");
                        getBomBbox("请先添加房屋或车位信息");
                    }
                }
                else {
                    getBomBbox("请勾选阅读条款");
                }
            });
        }
        //缴费历史
    this.payment_history = function() {
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


    }

    var getList = function(year, month, state) {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                type: "",
                year: year,
                month: month,
                status: state,
            }
            var data = {
                opt: "myPayHistoryList",
                secretKey: "mobileSecretKey1234567890",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);

                if (result.messageCode == 1) {
                    $(".nullimg").hide();
                    var toptitle;
                    toptitle = GetQueryString("toptitle");
                    if (toptitle == 1) {
                        $(".top span").html("我的缴费");

                    }
                    $(".payment_list").remove();
                    if (result.resultObject> 0) {
                        $.each(result.resultObject, function(i, item) {
                            var allhtml = "";
                            var payhtml = "";
                            switch (item.type) {
                                case 0:
                                    allhtml = "<img src=\"Assets/Images/pay_93.png\" /> <span>" + item.roomCode + "</span> <span>物业管理费</span>";
                                    break;
                                case 1:
                                    allhtml = "<img src=\"Assets/Images/pay_02.png\" /> <span>" + item.parkNo + "</span> <span>车位管理费</span>";
                                    break;
                                case 2:
                                    allhtml = "<img src=\"Assets/Images/flloer.jpg\" /><span>其他</span>";
                                    break;
                            }
                            //switch (item.status) {
                            //    case 0:
                            //        payhtml = "<span class=\"state\">未支付</span>";
                            //        break;
                            //    case 1:
                            //        payhtml = "<span class=\"state stone\">已支付</span>";
                            //        break;
                            //}
                            $(IsState(item.status) + "<div class=\"order\">" + " <p class=\"order_child\">" + allhtml + "<span>缴费期数</span>" + "</p>" + "<p class=\"pay\">" + "<span class=\"price\">" + item.fee + "</span><span class='timeD'>" + ("" + item.lastPeriod).substring(0, 4) + "年" + ("" + item.lastPeriod).substring(4, 6) + "月</span></p>" + "</div>" + "</a>").appendTo(".detail_main");
                        });
                    } else {
                        $(".nullimg").show();
                    }
                } else {
                    if (result.messageCode == 2) {
                        location.href = "login.html";
                    }
                    else if (result.messageCode == 3) {
                        getBomBbox(result.message);
                        setTimeout(function () {
                            location.href = "login.html";
                        }, 500);
                    }
                    else {
                        getBomBbox(result.message);
                    }

                }
            });
        }
        //判断支付状态
    var IsState = function(index) {
        var str = "<a href='payment_mode.html' class='payment_list'>";
        if (index == 1) {
            str = "<a href=\"javascript:;\" class=\"payment_list\">";
        }
        return str;
    }


    //欠费缴费
    this.mode = function() {
        //数据加载
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            status: "0",
        }
        var data = {
            opt: "myPostPay",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                var tempStr = "";
                $.each(result.resultObject.shouldPay, function(i, item) {
                    var html = '<div class="payment_list"><div class="address01">' + '<span>' + i + '</span>' + '<span><img src="Assets/Images/choose.png" /></span>' + '</div>' + '<div class="fees_detail">' + '<h4>缴费明细</h4>' + '</div><div class="pay_date">';
                    tempStr = tempStr + html;
                    $.each(item, function(i, item2) {
                        var html2 = '<div class="pay_detail">' + '<p money="' + item2.money + '" id="' + item2.id + '">' + '<span class="choose_show"><img src="Assets/Images/choose01.png" />' + item2.yearMonth + '</span><span class="type">' + item2.money + '元</span>' + '</p>' + '</div>';
                        tempStr = tempStr + html2;

                    });
                    $("#payDate").appendTo(".pay_date");
                    var html3 = '</div></div>';
                    tempStr = tempStr + html3;
                });
                $("#topDiv").append(tempStr);
                $("#amt").text(totalMoney());
            } else if (result.messageCode == 2) {
                location.href = "login.html";
            } else {
                getBomBbox(result.message);
            }
        });

        //房屋号
        $(".lists").delegate(".address01", "click", function() {
            var src = $(this).find("img").attr("src");
            if (src == "Assets/Images/choose.png") {
                $(this).parent().children().find("img").attr("src", "Assets/Images/choose01_bg.png");
                $(this).find("img").attr("src", "Assets/Images/choose_bg.png");
            } else {
                $(this).parent().children().find("img").attr("src", "Assets/Images/choose01.png");
                $(this).find("img").attr("src", "Assets/Images/choose.png");
            }
            $("#amt").text(totalMoney());
        });
        //缴费年月
        $(".lists").delegate(".pay_detail", "click", function() {
            var src = $(this).find("img").attr("src");
            if (src == "Assets/Images/choose01.png") {
                $(this).find("img").attr("src", "Assets/Images/choose01_bg.png");
                $(this).parent().parent().find(".address01 img").attr("src", "Assets/Images/choose_bg.png");
            } else {
                $(this).find("img").attr("src", "Assets/Images/choose01.png");
                //$.each(, function (i, item) {
                //    if ($(this).parent().parent().find(".pay_detail img").attr("src") != "Assets/Images/choose01_bg.png") {
                //        $(this).parent().parent().find(".address01 img").attr("src", "Assets/Images/choose.png");
                //    }
                //});

            }
            $("#amt").text(totalMoney());
        });
        //支付方式
        $(".pay_style p .choose_sure").click(function() {
            var src = $(this).find("img").attr("src");
            if (src == "Assets/Images/choose.png") {
                $(this).parent().parent().children().find(".choose_sure img").attr("src", "Assets/Images/choose.png")
                $(this).find("img").attr("src", "Assets/Images/choose_bg.png")
            } else {}
        });

        //金额
        var totalMoney = function() {
                var tmoney = 0;
                $.each($(".lists").find(".pay_detail img[src='Assets/Images/choose01_bg.png']"), function(i, item) {
                    tmoney += parseFloat($(this).parent().parent().parent().find("p").attr("money"));
                });
                return tmoney;
            }
            //提交
        $(".submit a").click(function() {
            computePrice();
        });

        //支付
        var computePrice = function() {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                isPrepay: "0",
                payRecorders: [],
            }
            $.each($(".lists").find(".pay_detail img[src='Assets/Images/choose01_bg.png']"), function(i, item) {
                paramsJson.payRecorders.push({
                    "id": $(this).parent().parent().parent().find('p').attr('id'),
                    "money": $(this).parent().parent().parent().find('p').attr('money')
                });
            });
            var data = {
                secretKey: "mobileSecretKey1234567890",
                opt: "pay",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function(result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {

                } else {
                    getBomBbox(result.message);
                }
            });

        }
    }


}