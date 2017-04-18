
//首页日历
function ShowCalendar(nYear, nMonth) {
    $.ajax({
        type: "post",
        url: "ashx/ShowCalendar.ashx?nYear=" + escape(nYear) + "&nMonth=" + escape(nMonth),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            if (re != "[object XMLDocument]") {
                //alert(re);
                $("#divCalendar").html(re);
                rili();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            $("#divCalendar").html("数据加载失败");
        }
    });
}

//会员中心日历
function ShowUserCalendar(nYear, nMonth, uId, uName) {
    var ashx_people = $("#ashx_people").val();
    $.ajax({
        type: "post",
        url: "ashx/ShowUserCalendar.ashx?nYear=" + escape(nYear) + "&nMonth=" + escape(nMonth) + "&category_id=" + escape(ashx_people) + "&uId=" + escape(uId) + "&uName=" + escape(uName),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            if (re != "[object XMLDocument]") {
                //alert(re);
                $("#divUserCalendar").html(re);
                rili();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            $("#divUserCalendar").html("数据加载失败");
        }
    });
}

//添加个人会议
function addUserCalendar(_action, _title, _level, _content, nYear, nMonth, _strWhere, _date) {
    var radbtn = $("input[name='" + _level + "']:checked").val();
    var title = $("#" + _title).val();
    var content = $("#" + _content).val();
    if (radbtn == "undefined" || radbtn == undefined) {
        alert("提示：\t\n会议类型必须选择");
        return false;
    }
    if (title == "") {
        alert("提示：\t\n标题不能为空");
        $("#" + _title).focus();
        return false;
    }
    if (content == "") {
        alert("提示：\t\n内容不能为空");
        $("#" + content).focus();
        return false;
    }
    $.ajax({
        type: "post",
        url: "ashx/SetupUserCalendar.ashx?action=" + escape(_action) + "&title=" + escape(title) + "&level=" + escape(radbtn) + "&content=" + escape(content) + "&nYear=" + escape(nYear) + "&nMonth=" + escape(nMonth) + "&strWhere=" + escape(_strWhere) + "&date=" + escape(_date),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "0":
                    alert("提示：\t\n会议添加成功");
                    ShowUserCalendar(nYear, nMonth, '', '');
                    break;
                default:
                    alert("添加失败，请稍后重试");
                    break;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("数据加载失，请稍后重试");
        }
    });
}

//删除个人会议
function delUserCalendar(_btnid, _action, nYear, nMonth, _strWhere) {
    var deletbtn = $("#" + _btnid).parent().parent();
    var checks = deletbtn.find("input[type=checkbox]");

    var number = 0;
    var checkBoxItems = []
    checks.each(function (i) {
        if (checks[i].checked) {
            number++;    //alert(number);
            checkBoxItems.push(checks[i]);
        }
    });


    if (number != 0) {


        var tempid_2 = "";
        for (var j = 0; j < number; j++) {
            var box = $(checkBoxItems[j]).parent().parent();
            var tempid = box.attr('id');

            tempid_2 += tempid + ",";
        }

        sendshanchuForm(tempid_2);

    } else {

        alert("请选择删除内容");
        return false;
    }

    function sendshanchuForm(id) {
        if (window.confirm("提示：您确定要删除选中信息吗？")) {
            $.ajax({
                type: "post",
                url: "ashx/SetupUserCalendar.ashx?action=" + escape(_action) + "&id=" + escape(id) + "&nYear=" + escape(nYear) + "&nMonth=" + escape(nMonth) + "&strWhere=" + escape(_strWhere),
                beforeSend: function (XMLHttpRequest) {
                    //ShowLoading();
                },
                success: function (data, textStatus) {
                    var re = String(data);
                    switch (re) {
                        case "0":
                            alert("提示：\t\n信息删除成功");
                            ShowUserCalendar(nYear, nMonth, '', '');
                            break;
                        default:
                            alert("删除失败，请稍后重试");
                            break;
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    // alert(textStatus);
                },
                error: function () {
                    //请求出错处理
                    alert("数据加载失，请稍后重试");
                }
            });
        }
    }

    //搜索会议
    function SearchUserCalendar() {
        //      var
        //      ShowUserCalendar('','','','');
    }

}

//查询部门人员
function UserSelectPeople() {
    var _did = $("#ashx_department").val();
    var drp1 = document.getElementById("ashx_people");
    while (drp1.options.length > 0) {
        drp1.options.remove(0);
    }
    $.ajax({
        type: "post",
        url: "ashx/UserSelectPeople.ashx?did=" + escape(_did),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var _people = String(data);
            var stringarray = _people.split("|");
            for (var i = 0; i < stringarray.length; i++) {//重写DropDownList
                //拆分内部数组
                var optionarray = stringarray[i].split(",");
                var newoption = document.createElement("option");
                newoption.text = optionarray[0];
                newoption.value = optionarray[1];
                document.getElementById("ashx_people").options.add(newoption);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("数据加载失，请稍后重试");
        }
    });



}


//首页右边日历选项卡JS
$(document).ready(function () {
    var btndl = $('.riliPannel .titleArea dl');
    var btns = $('.riliPannel .titleArea dd');
    var child = $('.riliPannel .contentArea .childField');
    var bgimg = ["url(images/icon_24.gif)", "url(images/icon_23.gif)"];

    btns.each(function (i) {
        this.num = i;
        $(this).click(function () {
            child.removeClass('act');
            $(child[this.num]).addClass('act');
            $(this).parent().css("background-image", bgimg[this.num]);

        });
    })
    $(btndl[0]).addClass('bg_01');
    $(child[0]).addClass('act');
})



//首页右边日历鼠标放上去显示活动JS
function rili() {
    var dayslist = $('.rlPannle .days .hang dl dd ');
    var hideDiv = $('.rlPannle .days .hang dl dd  .hideDiv');

    dayslist.each(function () {

        var editbtn = $(this).find('.hideDiv').find(".edit");
        var editcontent = $(this).find('.hideDiv').find(".bianjiArea");
        var checks = $(this).find('.hideDiv').find("input[type=checkbox]");
        var addbtn = $(this).find('.hideDiv').find(".add");
        var addcontent = $(this).find('.hideDiv').find(".zengjia");
        var cancelBtn = $(this).find('.hideDiv').find(".cancel");
        var timeText = $(this).find('.hideDiv').find("input[type=text]");

        $(this).mouseover(function () {
            $(this).find('a').addClass('on');
            $(this).find('.hideDiv').addClass('act');
            $(this).parent().parent().css("z-index", "2");


            editbtn.click(function () {
                var number = 0;
                var checkBoxItems = []
                checks.each(function (i) {
                    if (checks[i].checked) {
                        number++;
                        checkBoxItems.push(checks[i]);
                    }
                });

                if (number == 1) {

                    editcontent.addClass('show');
                    var box = $(checkBoxItems[0]).parent().parent();
                    var tempId = box.attr('id');
                    var tempName = box.attr('name');
                    var name = tempName.split('|');
                    if (name[0] == 3) {
                        box.parent().find(".bianjiArea").find(".otherMesg2").removeClass("xianshi");
                        box.parent().find(".bianjiArea").find(".ownMesg2").addClass("xianshi");
                        var ownstar = name[1];
                        var ownover = name[2];
                        editcontent.find('.ownstar').val(ownstar);
                        editcontent.find('.ownover').val(ownover);

                    }
                    if (name[0] == 4) {
                        box.parent().find(".bianjiArea").find(".ownMesg2").removeClass("xianshi");
                        box.parent().find(".bianjiArea").find(".otherMesg2").addClass("xianshi");
                        var othercontent = name[3];
                        var othertime = name[1];
                        editcontent.find('.othercontent').val(othercontent);
                        editcontent.find('.othertime').val(othertime);

                    }
                    editcontent.find('.confirm').click(function () {
                        sendbianjiForm(tempId, editcontent.find('.othercontent').val(), editcontent.find('.othertime').val(), '', name[0]);
                        return false;
                    });
                    editcontent.find('.confirm2').click(function () {
                        sendbianjiForm(tempId, '', editcontent.find('.ownstar').val(), editcontent.find('.ownover').val(), name[0]);
                        return false;
                    });


                } else if (number == 0) {

                    alert("请选择编辑内容");

                } else {
                    alert("一次只能编辑一条内容");
                }

            })





            addbtn.click(function () {
                addcontent.addClass('show');

            })



            cancelBtn.click(function () {
                //window.location.reload();
                //ShowUserCalendar('', '', '');
            })





        })
        $(this).mouseout(function () {
            $(this).find('a').removeClass('on');
            $(this).find('.hideDiv').removeClass('act');
            $(this).parent().parent().css("z-index", "1");

            editbtn.unbind();
            addbtn.unbind();
            cancelBtn.unbind();

        });

        timeText.each(function () {
            $(this).focus(function () {
                $(this).parents(".hang").find("dd").unbind("mouseout");
            });
            $(this).blur(function () {
                $(this).parents(".hang").find("dd").bind("mouseout", function () {
                    $(this).parents(".hang").find('a').removeClass('on');
                    $(this).parents(".hang").find('.hideDiv').removeClass('act');

                });
            });


        });



    })

}


//修改个人会议
function sendbianjiForm(_id, _content, _startTime, _endTime, _type) {
    if (_type == 3) {
        if (_startTime == "" || _endTime == "") {
            alert("提示：\t\n开时间和结束时间不能为空");
            return false;
        }
    }
    if (_type == 4) {
        if (_content == "") {
            alert("提示：\t\n内容不能为空");
            return false;
        }
        if (_startTime == "") {
            alert("提示：\t\n时间不能为空");
            return false;
        }
    }
    $.ajax({
        type: "post",
        url: "ashx/SetupUserCalendar.ashx?action=edit&id=" + escape(_id) + "&content=" + escape(_content) + "&startTime=" + escape(_startTime) + "&endTime=" + escape(_endTime),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            var arr = re.split('|');
            switch (arr[0].toString()) {
                case "0":
                    alert("提示：\t\n信息编辑成功");
                    ShowUserCalendar(arr[1].toString(), arr[2].toString(), '', '');
                    break;
                default:
                    alert("编辑失败，请稍后重试");
                    break;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("数据加载失，请稍后重试");
        }
    });
    return false;
}




//=============================================================日历改版============================================================================
//添加其他会议
function addOtherUserCalendar(_action, _title, _level, _content) {
    var radbtn = $("input[name='" + _level + "']:checked").val();
    var startTime = $("#" + _title).val();
    var content = $("#" + _content).val();
    if (content == "") {
        alert("提示：\t\n内容不能为空");
        $("#" + _content).focus();
        return false;
    }
    if (startTime == "") {
        alert("提示：\t\n时间不能为空");
        $("#" + _title).focus();
        return false;
    }
    $.ajax({
        type: "post",
        url: "ashx/SetupUserCalendar.ashx?action=" + escape(_action) + "&startTime=" + escape(startTime) + "&level=" + escape(radbtn) + "&content=" + escape(content),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            var arr = re.split('|');
            switch (arr[0].toString()) {
                case "0":
                    alert("提示：\t\n其它信息添加成功");
                    ShowUserCalendar(arr[1].toString(), arr[2].toString(), '', '');
                    //$("input[name=" + _level + "]:eq(0)").attr("checked", 'checked');
                    $(".addmeetingPannel").removeClass(' addmeetshow');
                    $("#" + _title).val("");
                    $("#" + _content).val("");
                    break;
                default:
                    alert("添加失败，请稍后重试");
                    break;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("数据加载失，请稍后重试");
        }
    });
}

//添加个人会议
function addGeUserCalendar(_action, _title, _level, _content) {
    var radbtn = $("input[name='" + _level + "']:checked").val();
    var startTime = $("#" + _title).val();
    var endTime = $("#" + _content).val();
    if (startTime == "") {
        alert("提示：\t\n开始时间不能为空");
        $("#" + _title).focus();
        return false;
    }
    if (endTime == "") {
        alert("提示：\t\n结束时间不能为空");
        $("#" + _content).focus();
        return false;
    }
    $.ajax({
        type: "post",
        url: "ashx/SetupUserCalendar.ashx?action=" + escape(_action) + "&startTime=" + escape(startTime) + "&level=" + escape(radbtn) + "&endTime=" + escape(endTime),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            var arr = re.split('|');
            switch (arr[0].toString()) {
                case "0":
                    alert("提示：\t\n个人假期添加成功");
                    ShowUserCalendar(arr[1].toString(), arr[2].toString(), '', '');
                    //$("input[name=" + _level + "]:eq(0)").attr("checked", 'checked');
                    $(".addmeetingPannel").removeClass(' addmeetshow');
                    $("#" + _title).val("");
                    $("#" + _content).val("");
                    break;
                default:
                    alert("添加失败，请稍后重试");
                    break;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("数据加载失，请稍后重试");
        }
    });
}