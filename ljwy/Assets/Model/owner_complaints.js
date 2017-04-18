// JavaScript Document// JavaScript Document 
//定义一个方法的名称
var owner_complaints = function () {
    /*加载页面*/
    this.ownerComplaintsList = function () {
        /*活动列表*/
        $("#pageBack").click(function () {
            var sourceurl = getSourceUrl();
            if (sourceurl.toLowerCase().indexOf("register") <= 0 &&
                sourceurl.toLowerCase().indexOf("login") <= 0 &&
                sourceurl.toLowerCase().indexOf("forgetpwd") <= 0&&
                sourceurl.toLowerCase().indexOf("i_complaint") <= 0 &&
                sourceurl.toLowerCase().indexOf("complaints_detail.html") <= 0) {
                $.cookie("owner_complaints", sourceurl);
                location.href = $.cookie("owner_complaints");
            };
        })
        getList($("#year").val(), $("#month").val(), $("#state").val());
        
        $("#year").change(function () {
            var year = $("#year").val();
            var month = $("#month").val();
            var state = $("#state").val();
            getList(year, month, state);

        });
        $("#month").change(function () {
            var year = $("#year").val();
            var month = $("#month").val();
            var state = $("#state").val();
            getList(year, month, state);
        });
        $("#state").change(function () {
            var year = $("#year").val();
            var month = $("#month").val();
            var state = $("#state").val();
            getList(year, month, state);

        });

    }

    var getList = function (year, month, state) {
        isLogin();
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

        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 2) { location.href = "login.html"; }
            else if (result.messageCode == 1) {
                $(".choose").remove();
                $.each(result.resultObject, function (i, item) {
                    $('<a class="choose" href="complaints_detail.html?id=' + item.id + '"><div class="middle"><div class="images"><img src="' + imgdomain + item.image1 + '" /></div><div class="content"><p><span>' + item.title + '</span><span class="dealing">' + states(item.status) + '</span></p><p class="detail">' + item.theContent + '</p></div></div></a>').appendTo(".complain_detail");
                });
            }
            else {
                alert(result.message);
            }
        });
    }
    var states = function (stateId) {
        var str;
        switch (stateId) {
            case "": str = "全部"; break;
            case 0: str = "已投诉"; break;
            case 1: str = "处理中"; break;
            case 2: str = "已处理"; break;
        }
        return str;
    }
}