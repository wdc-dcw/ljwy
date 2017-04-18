//========================================================================================================================================
//登录
function checkLogin() {
    var name = $("#txt_uname").val();
    var pass = $("#txt_upass").val();
    if (name == "") {
        alert("提示：\t\n用户账号不能为空");
        $("#txt_uname").focus();
        return false;
    }
    if (pass == "") {
        alert("提示：\t\n登录密码不能为空");
        $("#txt_upass").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//修改员工个人信息
function checkUserInfo() {
    var real_name = $("#txt_real_name").val();
    var department = $("#drop_department").val();
    var post = $("#drop_post").val();
    var phone = $("#txt_phone").val();
    var email = $("#txt_email").val();
    var UserPwd = $("#txtUserPwd").val();
    var UserPwd1 = $("#txtUserPwd1").val();

    if (real_name == "") {
        alert("提示：\t\n姓名不能为空");
        $("#txt_real_name").focus();
        return false;
    }
    if (department == "0") {
        alert("提示：\t\n部门必须选择");
        $("#drop_department").focus();
        return false;
    }
    if (post == "0") {
        alert("提示：\t\n职位必须选择");
        $("#drop_post").focus();
        return false;
    }
    if (phone == "") {
        alert("提示:\t\n手机号码不能为空");
        $("#txt_phone").focus();
        return false;
    }
    else {
        var reg = /^(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})$/;
        if (!reg.test(phone)) {
            alert("提示:\t\n手机号码格式不对");
            $("#txt_phone").focus();
            return false;
        }
    }
    if (email != "") {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(email)) {
            alert("提示：\t\n请输入有效的邮箱地址");
            $("#txt_email").focus();
            return false;
        }
    }
    if (UserPwd == "") {
        alert("提示:\t\n密码不能为空");
        $("#txtUserPwd").focus();
        return false;
    }
    if (UserPwd.length < 5) {
        alert("提示：\t\n密码长度必须5位以上");
        $("#txtUserPwd").focus();
        return false;
    }
    if (UserPwd != UserPwd1) {
        alert("提示:\t\n两次密码不一致");
        $("#txtUserPwd1").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//删除会议信息
function delMeeting(id) {
    if (confirm("提示：\t\n您确定要删除吗？")) {
        $(".zhezhaoPannel").show();
        $.ajax({
            type: "get",
            url: "ashx/SetupMessage.ashx?action=delMeeting&id=" + escape(id),
            beforeSend: function (XMLHttpRequest) {
                //ShowLoading();
            },
            success: function (data, textStatus) {
                var re = String(data);
                switch (re) {
                    case "1":
                        document.location.href = document.location.href;
                        break;
                    case "0":
                        alert("删除失败，请重新操作！");
                        $(".zhezhaoPannel").hide();
                        break;
                    default:
                        alert("操作超时，请重新操作！");
                        $(".zhezhaoPannel").hide();
                        break;
                }

            },
            complete: function (XMLHttpRequest, textStatus) {
                // alert(textStatus);
            },
            error: function () {
                //请求出错处理
                alert("操作超时，请重新操作！");
            }
        });
    }
}

//发布会议
function relMeeting() {
    var title = $("#txt_title").val();
    var meet_level = $("#drop_meet_level").val();
    var meet_time = $("#txt_time").val();
    var Staff = $("#txtStaff").val();
    var meet_level = $("#drop_meet_level").val();
    var Department = $("#txtDepartment").val();
    if (title == "") {
        alert("提示：\t\n会议名称不能为空！");
        $("#txt_title").focus();
        return false;
    }
    if (meet_level == "0") {
        alert("提示：\t\n请选择会议级别！");
        $("#drop_meet_level").focus();
        return false;
    }
    if (meet_time == "") {
        alert("提示：\t\n请选择会议时间！");
        $("#txt_time").focus();
        return false;
    }
    if (meet_level == "2") {
        if (Department == "" || Department == "请选择部门") {
            alert("提示：\t\n添加部门会议，部门必须选择一个！");
            $("#txtDepartment").focus();
            return false;
        }
    }
    if ($("#drop_address").val() == "其他") {
        //alert($("#txtAddress").val());
        if ($("#txtAddress").val() == "") {
            alert("提示：\t\n会议地址必须填写！");
            $("#txtAddress").focus();
            return false;
        }
    }
    if (($("#txtOtherStaff").val() == "" || $("#txtOtherStaff").val() == "请选择人员") && ($("#txtStaff").val() == "" || $("#txtStaff").val() == "请选择人员") && $("#txt_write_content").val() == "") {
        alert("提示：\t\n会议人员不能为空！");
        return false;
    }
    //    if (Department != "" || Department == "请选择部门") {
    //    if()
    //        alert("提示：\t\n请选择会议参与人员！");
    //        $("#txtStaff").focus();
    //        return false;
    //    }
    $(".zhezhaoPannel").show();
}

//选择部门
function SelectDepartment(_action, id) {
    var _department = $("#txtDepartment").val();
    var _hiddepartment = $("#hidDepartment").val();
    var _value = $("#" + id).val();
    var _str = "";
    $('input:checkbox[name="Department"]:checked').each(function () //multiple checkbox的name  
    {
        _str += $(this).val() + "|";
    });
    _str = _str.substr(0, _str.length - 1)
    var _department2 = "";
    var _hiddepartment2 = "";
    var arr = _str.split('|');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split(',');
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] != "" && arr2[j] != null) {
                if (j % 2 == 0) {
                    _department2 += arr2[j] + ",";
                } else {
                    _hiddepartment2 += arr2[1] + ",";
                }
            }
        }
    }
    _department2 = _department2.substr(0, _department2.length - 1)
    $("#txtDepartment").val(_department2);
    _hiddepartment2 = _hiddepartment2.substr(0, _hiddepartment2.length - 1)
    $("#hidDepartment").val(_hiddepartment2);
}

//过滤参会人员
function FilterStaff() {
    if ($("#txtDepartment").val() == "") {
        $("#txtDepartment").val("请选择部门");
        $("#txtStaff").val("请选择人员");
        $("#StaffList").html("");
    }
    var _hiddepartment = $("#hidDepartment").val();
    $.ajax({
        type: "post",
        url: "ashx/SelectStaff.ashx?action=Filter&hiddepartment=" + escape(_hiddepartment),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            if (re != "[object XMLDocument]") {
                $("#StaffList").html(re);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("操作超时，请重新操作！");
        }
    });
}

//全选/取消
function chk_all_checked(obj) {
    if (obj.checked) {
        $("input[name='Staff']").attr("checked", true);
    } else {
        $("input[name='Staff']").attr("checked", false);
    }
}
function chk_other_all_checked(obj) {
    if (obj.checked) {
        $("input[name='otherStaff']").attr("checked", true);
    } else {
        $("input[name='otherStaff']").attr("checked", false);
    }
}

//选择员工
function SelectStaff() {
    var _department = $("#txtStaff").val();
    var _hiddepartment = $("#hidStaff").val();
    var _str = "";
    $('input:checkbox[name="Staff"]:checked').each(function () //multiple checkbox的name  
    {
        _str += $(this).val() + "|";
    });
    _str = _str.substr(0, _str.length - 1)
    var _department2 = "";
    var _hiddepartment2 = "";
    var arr = _str.split('|');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split(',');
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] != "" && arr2[j] != null) {
                if (j % 2 == 0) {
                    _department2 += arr2[j] + ",";
                } else {
                    _hiddepartment2 += arr2[1] + ",";
                }
            }
        }
    }
    _department2 = _department2.substr(0, _department2.length - 1)
    $("#txtStaff").val(_department2);
    _hiddepartment2 = _hiddepartment2.substr(0, _hiddepartment2.length - 1)
    $("#hidStaff").val(_hiddepartment2);
}

//选择员工
function SelectOtherStaff() {
    var _department = $("#txtOtherStaff").val();
    var _hiddepartment = $("#hidOtherStaff").val();
    var _str = "";
    $('input:checkbox[name="otherStaff"]:checked').each(function () //multiple checkbox的name  
    {
        _str += $(this).val() + "|";
    });
    _str = _str.substr(0, _str.length - 1)
    var _department2 = "";
    var _hiddepartment2 = "";
    var arr = _str.split('|');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split(',');
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] != "" && arr2[j] != null) {
                if (j % 2 == 0) {
                    _department2 += arr2[j] + ",";
                } else {
                    _hiddepartment2 += arr2[1] + ",";
                }
            }
        }
    }
    _department2 = _department2.substr(0, _department2.length - 1)
    $("#txtOtherStaff").val(_department2);
    _hiddepartment2 = _hiddepartment2.substr(0, _hiddepartment2.length - 1)
    $("#hidOtherStaff").val(_hiddepartment2);
}

//复选框单选
function chooseOne(cb) {
    //先取得同name的chekcBox的集合物件
    var obj = document.getElementsByName("Department");
    for (i = 0; i < obj.length; i++) {
        //判斷obj集合中的i元素是否為cb，若否則表示未被點選      
        if (obj[i] != cb) obj[i].checked = false;
        //若是 但原先未被勾選 則變成勾選；反之 則變為未勾選      
        else obj[i].checked = cb.checked;
        //若要至少勾選一個的話，則把上面那行else拿掉，換用下面那行      
        // else obj[i].checked = true;
    }
}
function chooseTwo() {
    $("[id = checkParty]:checkbox").attr("checked", false);
    $("[id = checkGroup]:checkbox").attr("checked", false);
    $("[id = checkStaff]:checkbox").attr("checked", false);
}

//过滤部门人员
function select_people(_d_id, _id) {
    var d_id = 0;
    if ($("#" + _d_id).length > 0) {
        d_id = $("#" + _d_id).val();
    }
    if ($("#" + _id).length > 0) {
        var drp1 = document.getElementById(_id);
        while (drp1.options.length > 0) {
            drp1.options.remove(0);
        }
        $.ajax({
            type: "post",
            url: "ashx/SelectDropStaff.ashx?id=" + escape(d_id),
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
                    document.getElementById(_id).options.add(newoption);
                    if ($("#hidpeople").val() != "") {
                        $("#drop_people").attr("value", $("#hidpeople").val());
                    }
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                // alert(textStatus);
            },
            error: function () {
                //请求出错处理
                //alert("操作超时，请稍后重试！");
            }
        });
    }
}

//发布管理卡
function checkTarget() {
    var _title = $("#txtTitle").val();
    var _type = $("#dropType").val();
    var _depar = $("#drop_depar").val();
    var _people = $("#drop_people").val();
    var _Qualitative = $("#txtQualitative").val();
    var _Quantitative = $("#txtQuantitative").val();
    var _Task_target = $("#txtTask_target").val();
    var _T_cost = $("#txtT_cost").val();
    var _T_help = $("#txtT_help").val();
    var _T_coordination = $("#txtT_coordination").val();
    var _T_supervision = $("#txtT_supervision").val();
    var _StarTime = $("#txtStarTime").val();
    var _EndTime = $("#txtEndTime").val();
    if (_title == "") {
        alert("提示：\t\n目标管理卡名称不能为空");
        $("#txtTitle").focus();
        return false;
    }
    if (_type == "") {
        alert("提示：\t\n任务类型必须选择");
        $("#dropType").focus();
        return false;
    }
    if (_type != "4") {
        if (_depar == "") {
            alert("提示：\t\n执行部门必须选择");
            $("#drop_depar").focus();
            return false;
        }
        if (_people == "") {
            alert("提示：\t\n执行人必须选择");
            $("#drop_people").focus();
            return false;
        }
    }
    if (_Qualitative == "") {
        alert("提示：\t\n任务描述，定性不能为空");
        $("#txtQualitative").focus();
        return false;
    }
    if (_Quantitative == "") {
        alert("提示：\t\n任务描述，定量不能为空");
        $("#txtQuantitative").focus();
        return false;
    }
    if (_Task_target == "") {
        alert("提示：\t\n任务目标不能为空");
        $("#txtTask_target").focus();
        return false;
    }
    if (_T_cost == "") {
        alert("提示：\t\n任务费用不能为空");
        $("#txtT_cost").focus();
        return false;
    }
    if (_T_help == "") {
        alert("提示：\t\n任务协助不能为空");
        $("#txtT_help").focus();
        return false;
    }
    if (_T_coordination == "") {
        alert("提示：\t\n任务协调不能为空");
        $("#txtT_coordination").focus();
        return false;
    }
    if (_T_supervision == "") {
        alert("提示：\t\n任务督办不能为空");
        $("#txtT_supervision").focus();
        return false;
    }
    if (_StarTime == "") {
        alert("提示：\t\n任务下达日期必须选择");
        $("#txtStarTime").focus();
        return false;
    }
    if (_EndTime == "") {
        alert("提示：\t\n任务完成日期必须选择");
        $("#txtEndTime").focus();
        return false;
    }
    $("#hidpeople").val($("#drop_people").val());
    $(".zhezhaoPannel").show();
}

//发布管理卡
function checkSaveTarget() {
    var _type = $("#dropType").val();
    var _depar = $("#drop_depar").val();
    var _people = $("#drop_people").val();
    if (_type == "") {
        alert("提示：\t\n任务类型必须选择");
        $("#dropType").focus();
        return false;
    }
    if (_type != "4") {
        if (_depar == "") {
            alert("提示：\t\n执行部门必须选择");
            $("#drop_depar").focus();
            return false;
        }
        if (_people == "") {
            alert("提示：\t\n执行人必须选择");
            $("#drop_people").focus();
            return false;
        }
    }
    $(".zhezhaoPannel").show();
}

//js函数
function OnblurLog() {
    var txtmeg = $("#txtLog").val();
    if (txtmeg == "请填写取消理由" || txtmeg == "") {
        alert("提示：\t\n请填写取消理由");
        $("#txtLog").focus();
        return false;
    }
    if (!confirm("提示：\t\n您确定要取消吗？")) {
        $(".zhezhaoPannel").hide();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//显示/隐藏
function GetShowHide(_id) {
    if ($("#" + _id).is(":hidden")) {
        $("#" + _id).show();
    } else {
        $("#" + _id).hide();
    }
}

function GetShowHide2(_id, _id2) {
    $("#" + _id).show();
    $("#" + _id2).hide();
}

//保存(选项卡①)内容信息
function Save_CMS(_action, _view, _id, _title_id, _content_id, _time_id, _t_id, _u_id) {
    var _title = $("#" + _title_id).val();
    var _content = $("#" + _content_id).val();
    var _titme = $("#" + _time_id).val();
    //    if (_title == "") {
    //        alert("提示：\t\n标题不能为空");
    //        $("#" + _title_id).focus();
    //        return false;
    //    }
    if (_content == "") {
        alert("提示：\t\n内容不能为空");
        $("#" + _content_id).focus();
        return false;
    }
    if (_titme == "") {
        alert("提示：\t\n时间必须选择");
        $("#" + _time_id).focus();
        return false;
    }
    if (_view == "del") {
        if (!confirm("提示：\t\n您确定要删除吗？")) {
            $(".zhezhaoPannel").hide();
            return false;
        }
    }
    $(".zhezhaoPannel").show();
    $.post("ashx/SvaeCMS.ashx", { action: escape(_action), view: escape(_view), id: escape(_id), title: escape(_title), content: escape(_content), time: escape(_titme), t_id: escape(_t_id), u_id: escape(_u_id) }, function (data) {
        var re = String(data);
        switch (re) {
            case "0":
                alert("提交成功！");
                document.location.href = document.location.href;
                break;
            case "1":
                alert("提交失败，请重新提交！");
                break;
            default:
                alert(data);
                break;
        }
    });
}

//=======================================================保存(选项卡②)内容信息======================================
//任务目标达成情况评估
function SaveSelf_Evaluate(_action, _view, _id, _t_id, _u_id) {
    var self_evaluate_time = $("#txtself_evaluate_time").val();
    var radmb = $("input[name='radmb']:checked").val();
    var mbpg_content1 = $("#textmbpg_content1").val();
    var mbpg_content2 = $("#textmbpg_content2").val();
    var radjbgz = $("input[name='radjbgz']:checked").val();
    if (self_evaluate_time == "") {
        alert("提示：\t\n任务完成时间必须选择");
        $("#txtself_evaluate_time").focus();
        return false;
    }
    if (radmb == "undefined" || radmb == undefined) {
        alert("提示：\t\n任务完成进度必须选择");
        return false;
    }
    if (mbpg_content1 == "") {
        alert("提示：\t\n基本工作必须填写");
        $("#textmbpg_content1").focus();
        return false;
    }
    if (radjbgz == "undefined" || radjbgz == undefined) {
        alert("提示：\t\n任务评估等级必须选择");
        return false;
    }
    if (mbpg_content2 == "") {
        alert("提示：\t\n自我评估必须填写");
        $("#textmbpg_content2").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
    $.post("ashx/SvaeSEAS.ashx", { action: escape(_action), view: escape(_view), id: escape(_id), t_id: escape(_t_id), u_id: escape(_u_id), self_evaluate_time: escape(self_evaluate_time), radmb: escape(radmb), mbpg_content1: escape(mbpg_content1), mbpg_content2: escape(mbpg_content2), radjbgz: escape(radjbgz) }, function (data) {
        var re = String(data);
        switch (re) {
            case "0":
                alert("提交成功！");
                document.location.href = document.location.href;
                break;
            case "1":
                alert("提交失败，请重新提交！");
                $(".zhezhaoPannel").hide();
                break;
            default:
                alert(data);
                break;
        }
    });

}
function SaveSelf_Evaluate2(_action, _view, _id, _t_id, _u_id) {
    var self_evaluate_time = $("#txtself_evaluate_time2").val();
    var radmb = $("input[name='radmb2']:checked").val();
    var mbpg_content1 = $("#textmbpg_content3").val();
    var mbpg_content2 = $("#textmbpg_content4").val();
    var radjbgz = $("input[name='radjbgz2']:checked").val();
    if (self_evaluate_time == "") {
        alert("提示：\t\n任务完成时间必须选择");
        $("#txtself_evaluate_time").focus();
        return false;
    }
    if (radmb == "undefined" || radmb == undefined) {
        alert("提示：\t\n任务完成进度必须选择");
        return false;
    }
    if (mbpg_content1 == "") {
        alert("提示：\t\n基本工作必须填写");
        $("#textmbpg_content1").focus();
        return false;
    }
    if (mbpg_content2 == "") {
        alert("提示：\t\n自我评估必须填写");
        $("#textmbpg_content2").focus();
        return false;
    }
    if (radjbgz == "undefined" || radjbgz == undefined) {
        alert("提示：\t\n任务评估等级必须选择");
        return false;
    }
    $(".zhezhaoPannel").show();
    $.post("ashx/SvaeSEAS.ashx", { action: escape(_action), view: escape(_view), id: escape(_id), t_id: escape(_t_id), u_id: escape(_u_id), self_evaluate_time: escape(self_evaluate_time), radmb: escape(radmb), mbpg_content1: escape(mbpg_content1), mbpg_content2: escape(mbpg_content2), radjbgz: escape(radjbgz) }, function (data) {
        var re = String(data);
        switch (re) {
            case "0":
                alert("提交成功！");
                document.location.href = document.location.href;
                break;
            case "1":
                alert("提交失败，请重新提交！");
                break;
            default:
                alert(data);
                break;
        }
    });
}

//目标达成情况的评估确认
function SaveConfirm(_action, _view, _id, _t_id, _u_id, zwpgdj_content, zwpgdj) {
    var zwpgdj_content = $("#" + zwpgdj_content).val();
    var zwpgdj = $("input[name='" + zwpgdj + "']:checked").val();
    if (zwpgdj_content == "") {
        alert("提示：\t\n内容不能为空");
        $("#" + zwpgdj_content).focus();
        return false;
    }
    if (zwpgdj == "undefined" || zwpgdj == undefined) {
        alert("提示：\t\n评估等级必须选择一个");
        return false;
    }
    $(".zhezhaoPannel").show();
    $.post("ashx/SvaeSEAS.ashx", { action: escape(_action), view: escape(_view), id: escape(_id), t_id: escape(_t_id), u_id: escape(_u_id), zwpgdj_content: escape(zwpgdj_content), zwpgdj: escape(zwpgdj) }, function (data) {
        var re = String(data);
        switch (re) {
            case "0":
                alert("提交成功！");
                document.location.href = document.location.href;
                break;
            case "1":
                alert("提交失败，请重新提交！");
                $(".zhezhaoPannel").hide();
                break;
            default:
                alert(data);
                break;
        }
    });

}

//汇签评估
//function SaveExchange(_action, _view, _id, _t_id, _u_id, hqpg_content, hqpg) {
////暂定
//}

function SaveHqPeople(_t_id, _u_id) {
    var drop_depar = $("#drop_depar").val();
    var drop_people = $("#drop_people").val();
    if ($("#checksign").attr("checked") != "checked") {
        alert("提示：\t\n汇签需求必须勾选");
        return false;
    }
    if (drop_depar == "") {
        alert("提示：\t\n汇签部门必须选择");
        return false;
    }
    if (drop_people == "") {
        alert("提示：\t\n汇签人员必须选择");
        return false;
    }
    $(".zhezhaoPannel").show();
    $.ajax({
        type: "post",
        url: "ashx/SvaeSEAS.ashx?action=hqxq&view=add&t_id=" + escape(_t_id) + "&u_id=" + escape(_u_id) + "&self_assess=" + escape(drop_depar) + "&radhqpg=" + escape(drop_people),
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();
        },
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "0":
                    alert("提交成功！");
                    document.location.href = document.location.href;
                    break;
                case "1":
                    alert("会签人与执行人不能是同一个，请重新选择！");
                    $(".zhezhaoPannel").hide();
                    break;
                default:
                    alert("提交失败，请重新提交！");
                    $(".zhezhaoPannel").hide();
                    break;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            // alert(textStatus);
        },
        error: function () {
            //请求出错处理
            alert("操作超时，请重新提交！");
        }
    });
}

//任务目标完成总结
function SaveSummary(_action, _view, _id, _t_id, _u_id, o_performance, inadequacies, i_measures) {
    var _o_performance = $("#" + o_performance).val();
    var _inadequacies = $("#" + inadequacies).val();
    var _i_measures = $("#" + i_measures).val();
    if (_o_performance == "") {
        alert("提示：\t\n绩优表现必须填写");
        $("#" + o_performance).focus();
        return false;
    }
    if (_inadequacies == "") {
        alert("提示：\t\n不足之处必须填写");
        $("#" + inadequacies).focus();
        return false;
    }
    if (_i_measures == "") {
        alert("提示：\t\n改进措施必须填写");
        $("#" + i_measures).focus();
        return false;
    }
    $(".zhezhaoPannel").show();
    $.post("ashx/SvaeSEAS.ashx", { action: escape(_action), view: escape(_view), id: escape(_id), t_id: escape(_t_id), u_id: escape(_u_id), o_performance: escape(_o_performance), inadequacies: escape(_inadequacies), i_measures: escape(_i_measures) }, function (data) {
        var re = String(data);
        switch (re) {
            case "0":
                alert("提交成功！");
                document.location.href = document.location.href;
                break;
            case "1":
                alert("提交失败，请重新提交！");
                $(".zhezhaoPannel").hide();
                break;
            default:
                alert(data);
                break;
        }
    });

}

function ShenQing(_id, _u_id, i_peo) {
    if (confirm("申请后不能修改，您确定要申请吗？")) {
        $(".zhezhaoPannel").show();
        $.ajax({
            type: "post",
            url: "ashx/SvaeSEAS.ashx?action=shenqing&id=" + escape(_id) + "&u_id=" + escape(_u_id) + "&i_peo=" + escape(i_peo),
            beforeSend: function (XMLHttpRequest) {
                //ShowLoading();
            },
            success: function (data, textStatus) {
                var re = String(data);
                switch (re) {
                    case "0":
                        alert("申请成功，请耐心等待领导评估审核！");
                        document.location.href = "target_manage_01.aspx";
                        break;
                    case "1":
                        alert("申请失败，请检查信息是否填写完整！");
                        $(".zhezhaoPannel").hide();
                        break;
                    default:
                        alert("操作超时，请重新申请！");
                        $(".zhezhaoPannel").hide();
                        break;
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                // alert(textStatus);
            },
            error: function () {
                //请求出错处理
                alert("操作超时，请重新申请！");
            }
        });
    }
}

function Tijiao(_id, _u_id) {
    if (confirm("提交后不能修改，您确定要提交吗？")) {
        $(".zhezhaoPannel").show();
        $.ajax({
            type: "post",
            url: "ashx/SvaeSEAS.ashx?action=tijiao&id=" + escape(_id) + "&u_id=" + escape(_u_id),
            beforeSend: function (XMLHttpRequest) {
                //ShowLoading();
            },
            success: function (data, textStatus) {
                var re = String(data);
                switch (re) {
                    case "0":
                        alert("提交成功！");
                        document.location.href = "target_manage_01.aspx";
                        break;
                    case "1":
                        alert("提交失败，请检查信息是否填写完整！");
                        $(".zhezhaoPannel").hide();
                        break;
                    default:
                        alert("操作超时，请重新提交！");
                        $(".zhezhaoPannel").hide();
                        break;
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                // alert(textStatus);
            },
            error: function () {
                //请求出错处理
                alert("操作超时，请重新提交！");
            }
        });
    }
}

//=======================================================================赛场活动=====================================================================
//赛场活动
function checkActivity() {
    var _title = $("#txtTitle").val();
    var _status = $("#dropStatus").val();
    var _starTime = $("#txtStarTime").val();
    var _endtime = $("#txtEndTime").val();
    var _type = $("#dropType").val();
    if (_title == "") {
        alert("提示：\t\n活动名称必须填写");
        $("#txtTitle").focus();
        return false;
    }
    if (_status == "") {
        alert("提示：\t\n活动状态必须选择");
        $("#dropStatus").focus();
        return false;
    }
    if (_starTime == "" || _endtime == "") {
        alert("提示：\t\n活动时间和结束时间不能为空");
        $("#txtStarTime").focus();
        return false;
    }
    if (_type == "") {
        alert("提示：\t\n活动类型必须选择");
        $("#dropType").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//新闻
function checkArticle() {
    var _title = $("#txtTitle").val();
    var _starTime = $("#txtStarTime").val();
    var _content = $("#txtContent").val();
    if (_title == "") {
        alert("提示：\t\n新闻标题不能为空");
        $("#txtTitle").focus();
        return false;
    }
    if (_starTime == "") {
        alert("提示：\t\n新闻发布时间必须选择");
        $("#txtStarTime").focus();
        return false;
    }
    //    if (_content == "") {
    //        alert("提示：\t\n新闻详细不能为空");
    //        $("#txtContent").focus();
    //        return false;
    //    }
    $(".zhezhaoPannel").show();
}

//动态简报
function checkBriefing() {
    var _title = $("#txtTitle").val();
    var _ddlCategoryId = $("#ddlCategoryId").val();
    var _ddlYear = $("#ddlYear").val();
    var _starTime = $("#txtStarTime").val();
    var _imgurl = $("#txtImgUrl").val();
    if (_title == "") {
        alert("提示：\t\n简报标题不能为空");
        $("#txtTitle").focus();
        return false;
    }
    if (_ddlCategoryId == "") {
        alert("提示：\t\n简报分类必须选择");
        $("#ddlCategoryId").focus();
        return false;
    }
    if (_ddlYear == "") {
        alert("提示：\t\n简报年份必须选择");
        $("#ddlYear").focus();
        return false;
    }
    if (_starTime == "") {
        alert("提示：\t\n简报发布时间必须选择");
        $("#txtStarTime").focus();
        return false;
    }
    if (_imgurl == "") {
        alert("提示：\t\n请上传附件或填写附件路径");
        $("#txtImgUrl").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//公司党建
function checkPartyBuilding() {
    var _title = $("#txtTitle").val();
    var _ddlYear = $("#ddlYear").val();
    var _starTime = $("#txtStarTime").val();
    if (_title == "") {
        alert("提示：\t\n党建标题不能为空");
        $("#txtTitle").focus();
        return false;
    }
    //    if (_ddlYear == "") {
    //        alert("提示：\t\n党建年份必须选择");
    //        $("#ddlYear").focus();
    //        return false;
    //    }
    if (_starTime == "") {
        alert("提示：\t\n党建发布时间必须选择");
        $("#txtStarTime").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//规章制度
function checkRegulations() {
    var _title = $("#txtTitle").val();
    var _starTime = $("#txtTime").val();
    if (_title == "") {
        alert("提示：\t\n标题不能为空");
        $("#txtTitle").focus();
        return false;
    }
    if (_starTime == "") {
        alert("提示：\t\n党建发布时间必须选择");
        $("#txtTime").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}

//=========================================================================================================================================
//修改密码
function checkPwd() {
    var oldpwd = $("#txt_old_pwd").val();
    var newpwd = $("#txt_new_pwd").val();
    var eqpwd = $("#txt_eq_pwd").val();
    if (oldpwd == "") {
        alert("提示：\t\n原始密码不能为空");
        $("#txt_old_pwd").focus();
        return false;
    }
    if (newpwd == "") {
        alert("提示：\t\n新密码不能为空");
        $("#txt_new_pwd").focus();
        return false;
    }
    else {
        if (newpwd.length < 6) {
            alert("提示：\t\n新密码长度必须6位以上");
            $("#txt_new_pwd").focus();
            return false;
        }
    }
    if (eqpwd == "") {
        alert("提示：\t\n确认密码不能为空");
        $("#txt_eq_pwd").focus();
        return false;
    } else {
        if (eqpwd != newpwd) {
            alert("提示：\t\n两次密码不一致");
            $("#txt_eq_pwd").focus();
            return false;
        }
    }
    $(".zhezhaoPannel").show();
}

var repeatFlag = false;
function CheckRepeatClick() {
    if (repeatFlag == false) {
        repeatFlag = true;
        return true;
    }
    else {
        alert("数据处理中,请稍候...");
        return false
    }
}

//公告
function checkAd() {
    var content = $("#txtContent").val();
    if (content == "") {
        alert("提示：\t\n公告内容不能为空");
        $("#txtContent").focus();
        return false;
    }
    $(".zhezhaoPannel").show();
}