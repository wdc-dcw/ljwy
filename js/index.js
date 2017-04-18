//导航js
$(document).ready(function () {
    var navmenu = $('#top .header .nav dd ');
    navmenu.each(function () {
        if (navmenu.has('ul')) {
            $(this).hover(function () {
                $(this).find('ul').addClass('act');

            }, function () {
                $(this).find('ul').removeClass('act');
            })
        }
    });
})




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
//$(document).ready(function () {
//    var dayslist = $('.rlPannle .days .hang dl dd ');
//    var hideDiv = $('.rlPannle .days .hang dl dd  .hideDiv');
//
//    dayslist.each(function () {
//
//        var editbtn = $(this).find('.hideDiv').find(".edit");
//        var editcontent = $(this).find('.hideDiv').find(".bianjiArea");
//        var checks = $(this).find('.hideDiv').find("input[type=checkbox]");
//        var cancelBtn = $(this).find('.hideDiv').find(".cancel");
//        var timeText = $(this).find('.hideDiv').find("input[type=text]");
//
//        $(this).mouseover(function () {
//            $(this).find('a').addClass('on');
//            $(this).find('.hideDiv').addClass('act');
//            $(this).parent().parent().css("z-index", "2");
//
//
//            editbtn.click(function () {
//                var number = 0;
//                var checkBoxItems = []
//                checks.each(function (i) {
//                    if (checks[i].checked) {
//                        number++;
//                        checkBoxItems.push(checks[i]);
//                    }
//                });
//
//                if (number == 1) {
//
//                    editcontent.addClass('show');
//                    var box = $(checkBoxItems[0]).parent().parent();
//                    var tempId = box.attr('id');
//                    var tempName = box.attr('name');
//                    var name = tempName.split('|');
//                    if (name[0] == 4) {
//                        box.parent().find(".bianjiArea").find(".otherMesg2").addClass("xianshi");
//                        var othercontent = name[3];
//                        var othertime = name[1];
//						alert(box.parent().find(".othercontent").text());
//                        editcontent.find('.othercontent')[0].innerHTML=othercontent;
//
//                        editcontent.find('.othertime').val(othertime);
//
//                    } else {
//
//                        box.parent().find(".bianjiArea").find(".ownMesg2").addClass("xianshi");
//
//                        var ownstar = name[1];
//                        var ownover = name[2];
//                        editcontent.find('.ownstar').val(ownstar);
//                        editcontent.find('.ownover').val(ownover);
//
//                    }
//
//
//
//
//                    //					editcontent.find('.confirm').click(function(){
//                    //					$(this).parents(".bianjiArea ").removeClass("show");
//                    //						sendbianjiForm(tempName);
//                    //					});
////                    editcontent.find('.confirm').click(function () {
////                        sendbianjiForm(tempId, editcontent.find('.othercontent').val(), editcontent.find('.othertime').val(), '');
////                        return false;
////                    });
////                    editcontent.find('.confirm2').click(function () {
////                        sendbianjiForm(tempId, '', editcontent.find('.ownstar').val(), editcontent.find('.ownover').val());
////                        return false;
////                    });
//
//
//                } else if (number == 0) {
//
//                    alert("请选择编辑内容");
//
//                } else {
//                    alert("一次只能编辑一条内容");
//                }
//
//            })
//
//
//        });
//        $(this).mouseout(function () {
//            $(this).find('a').removeClass('on');
//            $(this).find('.hideDiv').removeClass('act');
//            $(this).parent().parent().css("z-index", "1");
//
//            editbtn.unbind();
//
//        });
//
//        timeText.each(function () {
//            $(this).focus(function () {
//                $(this).parents(".hang").find("dd").unbind("mouseout");
//            });
//            $(this).blur(function () {
//                $(this).parents(".hang").find("dd").bind("mouseout", function () {
//                    $(this).parents(".hang").find('a').removeClass('on');
//                    $(this).parents(".hang").find('.hideDiv').removeClass('act');
//
//                });
//            });
//
//
//        });
//
//
//
//
//
//
//
//    })
//
//
//
//})

//function sendbianjiForm(_id, _content, _startTime, _endTime) {
//    //alert(_content);
//    $.ajax({
//        type: "post",
//        url: "ashx/SetupUserCalendar.ashx?action=edit&id=" + escape(_id) + "&content=" + escape(_content) + "&startTime=" + escape(_startTime) + "&endTime=" + escape(_endTime),
//        beforeSend: function (XMLHttpRequest) {
//            //ShowLoading();
//        },
//        success: function (data, textStatus) {
//            var re = String(data);
//            var arr = re.split('|');
//            switch (arr[0].toString()) {
//                case "0":
//                    alert("提示：\t\n信息编辑成功");
//                    ShowUserCalendar(arr[1].toString(), arr[2].toString(), '', '');
//                    break;
//                default:
//                    alert("编辑失败，请稍后重试");
//                    break;
//            }
//        },
//        complete: function (XMLHttpRequest, textStatus) {
//            // alert(textStatus);
//        },
//        error: function () {
//            //请求出错处理
//            alert("数据加载失，请稍后重试");
//        }
//    });
//    return false;
//}




//添加工作日历
var addbtn = $(".annotation .addmesage");
addbtn.click(function () {
    $(this).parent().parent().find(".addmeetingPannel").addClass('addmeetshow');

})


var otherbtn = $(".addmeetingPannel .addmeetintArea .chooseBtn .other");
var ownbtn = $(".addmeetingPannel .addmeetintArea .chooseBtn .own");
var sendmsgbtn = $(".addmeetingPannel .addmeetintArea .sendMsg");

otherbtn.click(function () {

    if (otherbtn.is(":checked")) {
        $(".addmeetingPannel .addmeetintArea .otherMesg").show();
        $(".addmeetingPannel .addmeetintArea .ownMesg").hide();

    }

})

ownbtn.click(function () {
    if (ownbtn.is(":checked")) {
        $(".addmeetingPannel .addmeetintArea .ownMesg").show();
        $(".addmeetingPannel .addmeetintArea .otherMesg").hide();

    }

})

sendmsgbtn.click(function () {
    $(this).parents(".addmeetingPannel").removeClass("addmeetshow");

})
if (otherbtn.is(":checked")) {
    $(".addmeetingPannel .addmeetintArea .otherMesg").show();
    $(".addmeetingPannel .addmeetintArea .ownMesg").hide();
}

