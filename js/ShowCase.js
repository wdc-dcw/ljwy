// add by tx
function SingleUpload(action, repath, uppath, displayimg, newfilename, oldfilename, hidfileurl) {
    var submitUrl = "tools/upload_ajax.ashx?action=" + action + "&ReFilePath=" + repath + "&UpFilePath=" + uppath;
    
    //开始提交
    $("#form1").ajaxSubmit({
        beforeSubmit: function (formData, jqForm, options) {
            //隐藏上传按钮
            $("#" + repath).nextAll(".files").eq(0).hide();
            //显示LOADING图片
            $("#" + repath).nextAll(".uploading").eq(0).show();
        },
        success: function (data, textStatus) {
            if (data.msg == 1) {
                $("#" + repath).val(data.msbox);
                $("#" + hidfileurl).val(data.msbox);
                //设置为不可用
                //  $("#"+repath).attr("disabled","disabled");
                //图片赋值
                alert(data.msbox);
                $("#" + displayimg).attr("src", data.msbox);
                $("#" + newfilename).val(data.msnfilename); //新附件名称
                $("#" + oldfilename).val(data.msofilename); //原始附件名称


            } else {
                alert(data.msbox);
            }
            $("#" + repath).nextAll(".files").eq(0).show();
            $("#" + repath).nextAll(".uploading").eq(0).hide();
        },
        error: function (data, status, e) {
            alert("上传失败，错误信息：" + e);
            $("#" + repath).nextAll(".files").eq(0).show();
            $("#" + repath).nextAll(".uploading").eq(0).hide();
        },
        url: submitUrl,
        type: "post",
        dataType: "json",
        timeout: 600000
    });
};


function checkSumbit() {
    var title = $("#txtTitle").val();

    var price = $("#txtPrice").val();
    var bgdj = $("#txtbgjsdj").val();
    var pwls = $("#txtpwls").val();
    var pwjs = $("#txtpwjs").val();

    var num = $("#txtNum").val();
    var pimg = $("#txtImgUrl").val();

    var typeName= $("#ddlTypename ").val();
    
    if (title == "") {
        alert("产品名称不能为空！");
        return false;
    }
    if (title.length > 20) {
        alert("产品名称不能超过20个字符！");
        return false;
    }
    if (typeName == "1") {
        if ($("#ddlbgtype").val() == "0") {
            alert("请选择类型！");
            return false;
        }
        
        if (price == "") {
            alert("置换单价不能为空！");
            return false;
        }
        if (!(/^\d+(\.\d+)?$/.test(price)) || price == 0) {
            alert("置换单价必须为大于0的正数！");
            return false;
        }

        if (bgdj == "") {
            alert("结算单价不能为空！");
            return false;
        }
        if (!(/^\d+(\.\d+)?$/.test(bgdj)) || bgdj == 0) {
            alert("结算单价必须为大于0的正数！");
            return false;
        }
    }

    if (typeName == "2") {
        if ($("#ddlZp").val() == "0") {
            alert("请选择类型！");
            return false;
        }

        if (pwls == "") {
            alert("零售价不能为空！");
            return false;
        }
        if (!(/^\d+(\.\d+)?$/.test(pwls)) || pwls == 0) {
            alert("零售价必须为大于0的正数！");
            return false;
        }

        if (pwjs == "") {
            alert("结算价不能为空！");
            return false;
        }
        if (!(/^\d+(\.\d+)?$/.test(pwjs)) || pwjs == 0) {
            alert("结算价必须为大于0的正数！");
            return false;
        }
    }
    
    
    if (!(/^\d+$/.test(num)) || num == 0) {
        alert("数量必须是正整数！");
        return false;
    }
    $(".zhezhaoPannel").show();
}


function checkCart(obj, typeName) {
    var price = $('p').siblings("#lblzh" + obj).find("label").eq(1).html();
    var retailprice  = $('p').siblings("#lblPrice" + obj).find("label").eq(1).html();
    var totalNum = $('p').siblings("#lblNum" + obj).find("label").eq(1).html();
    var snum = $('p').siblings("#txtNum" + obj).find("input").val(); 
    var cId = $('p').siblings("#lblcId" + obj).find("input").val();
    if (!(/^\d+$/.test(snum)) || snum==0) {
        alert("数量必须是正整数！");
        return false;
    }
    var aurl;
    if (parseInt(snum)- parseInt(totalNum)>0) {
        alert("申请数量必须小于库存数量");
        return false;
    }
    if (typeName == "1") {
        aurl = "showcase_myshopcart_bg.aspx";
    }
    else {
        aurl = "showcase_myshopcart_pw.aspx";
    }
    $.ajax({
        type: "post",
        url: "ashx/showCart.ashx?id=" + escape(obj) + "&num=" + escape(snum) + "&typeName=" + escape(typeName) + "&price=" + escape(price) + "&retailPrice=" + escape(retailprice) + "&cId=" + escape(cId),
        success: function (data, textStatus) {
            var re = String(data).split('|');
            switch (re[0]) {
                case "0":
                    alert("加入购物车失败！");
                    return;
                case "1":
                    alert("加入购物车成功！");
                    $("#lblCardNum").html(re[1]);
                    $("#aUrl").attr("href", aurl);
                    return;
                case "2":
                    alert("系统异常请联系管理员！");
                    return;
                case "3":
                    alert("加入购物车成功！");
                    $("#aUrl").attr("href", aurl);
                    return;
                case "4":
                    alert("不能同时添加不同部门发布的产品！");
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}

//弹出对话框

function showMsgBox(obj) {
   // $('.tanchuPannel').fadeIn();
    $.ajax({
        type: "post",
        url: "ashx/showReplay.ashx?id=" + escape(obj),
        success: function (data, textStatus) {
            var re = String(data).split('|');
            $("#lblTitle").html(re[0]);
            $("#lblUser").html(re[1]);
            $("#lblTime").html(re[2]);
            $("#lblContents").html(re[3]);
            $("#hdfId").val(obj); 
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}

$('.replay').click(function () {
    $('.tanchuPannel').fadeIn();
    $('.tanchuPannel .tanchuArea .tanchuField .titleArea .btn').click(function () {
        $(this).parent().parent().parent().parent().hide();
    })
    $('.send').click(function () {
        var con = $("#txtReplayC").val();
        var id = $("#hdfId").val();
        if (con == "") {
            alert("管理员回复内容不能为空！");
            return false;
        }
        $.ajax({
            type: "post",
            url: "ashx/Replay.ashx?id=" + escape(id) + "&Content=" + escape(con),
            success: function (data, textStatus) {
                var re = String(data);
                switch (re) {
                    case "1":
                        alert("回复成功!");
                        location.reload();
                        break;
                    case "2":
                        alert("回复失败!");
                        break;
                    case "0":
                        alert("系统异常请联系管理员！")
                        break;
                }

            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function () {
                // alert("您输入的字符串包含非法字符，请重新输入！");
            }
        });
        $(this).parents(".tanchuPannel").hide();
        $("#txtReplayC").val("");
    })

})

function chectText() {
    var contents = $("#txtReContent").val();
    if (contents == "") {
        alert("请输入评论内容！")
        return false;
    }
    $(".zhezhaoPannel").show();
}


function CheckNum(obj,id) {
    var snum = $(obj).val();
    var oldnum = $(obj).attr("flag");
    if (!(/^\d+$/.test(snum)) || snum == 0) {
        alert("数量必须是正整数！");
        return false;
    }

    $.ajax({
        type: "post",
        url: "ashx/CheckNum.ashx?id=" + escape(id) + "&num=" + escape(snum),
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "0":
                    alert("数量不足,请重新输入！");
                    $(obj).val(oldnum);
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}



function UpdateNum(obj, id, caseId) {
    var snum = $(obj).val();
    var oldnum = $(obj).attr("flag");
    if (!(/^\d+$/.test(snum)) || snum == 0) {
        alert("数量必须是正整数！");
        return false;
    }
    $.ajax({
        type: "post",
        url: "ashx/UpdateNum.ashx?id=" + escape(id) + "&num=" + escape(snum)+"&showcaseId="+escape(caseId),
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "0":
                    alert("修改失败！");
                    return;
                case "1":
                    //alert("修改成功！");
                    return;
                case "2":
                    alert("系统异常！请联系管理员");
                    return;
                case "3":
                    alert("数量不足,请重新输入！");
                    $(obj).val(oldnum);
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}

function changeStatus(orderId, status,userId) {
    $.ajax({
        type: "post",
        url: "ashx/ChangeStatus.ashx?orderId=" + escape(orderId) + "&status=" + escape(status)+"&userId="+escape(userId),
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "0":
                    alert("数量不足,请检查！");
                    return;
                case "1":
                    location.href = 'showcase_managerorderdetail.aspx';
                    return;
                case "2":
                    alert("系统异常请联系管理员！");
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}

//修改站内信状态
function changeLetter(sId,typeId) {
    $.ajax({
        type: "post",
        url: "ashx/ChangeLetter.ashx?sId=" + escape(sId),
        success: function (data, textStatus) {
            var re = String(data);
            switch (re) {
                case "1":
                    location.href = showUrl(typeId);
                    return;
                case "2":
                    alert("系统异常请联系管理员！");
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
}

function sendTime(sId, typeId,obj) {
//alert(obj)
    $.ajax({
        type: "post",
        url: "ashx/ChangeLetter.ashx?sId=" + escape(sId),
        success: function (data, textStatus) {
            var re = String(data); //alert(re);
            switch (re) {
                case "1":
                    location.href = 'meet_list.aspx?date=' + obj;
                    return;
                case "2":
                    alert("系统异常请联系管理员！");
                    return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //alert("您输入的字符串包含非法字符，请重新输入！");
        }
    });
   // location.href = 'meet_list.aspx?date=' + escape(obj);
    
}

function showUrl(obj) { 
         var url = null;
            switch (obj)
            { 
                case 1:
                    url = "index.aspx";
                    break;
                case 2:
                    url = "meet_list.aspx";
                    break;
                case 3:
                    url = "";
                    break;
                case 4:
                    url = "index.aspx";
                    break;
                case 5:
                    url = "target_manage_01.aspx";
                    break;
                case 6:
                    url = "showcase_myorderdetail.aspx";
                    break;
            }
            return url;
        }

        function checkEmpty() {
            var f=true
            $("input[type=text]").each(function(){
                if ($(this).val() == '') 
                    f= false;
            });
            if (f == false) {
                alert('用途不能为空！');
            }
           return f;
        }

        function checkCompanyAdd() {
            var title = $("#txtTitle").val();
            if (title == "") {
                alert("标题不能为空！");
                return false;
            }
            $(".zhezhaoPannel").show();
        }


        function checkDocumentAdd() {
            var title = $("#txtTitle").val();
            if (title == "") {
                alert("标题不能为空！");
                return false;
            }
            var _imgurl = $("#txtImgUrl").val();
            if (_imgurl == "") {
                alert("提示：\t\n请上传附件或填写附件路径");
                $("#txtImgUrl").focus();
                return false;
            }
            $(".zhezhaoPannel").show();
        }

        function showOfficesubmit() {
            var name = $("#txtName").val();
            var bud = $("#txtBud").val();
            if (name == "") {
                alert("资源用途不能为空！");
                return false;
            }
            if (bud == "") {
                alert("列入预算项目不能为空！");
                return false;
            }
            $(".zhezhaoPannel").show();
        }

        function showPwsubmit() {
            var name = $("#txtName").val();
            var used = $("#txtUsed").val();
            
            if (name == "") {
                alert("推广单位不能为空！");
                return false;
            }
            if (used == "") {
                alert("礼品用途不能为空！");
                return false;
            }

            var ck = '';
            $("input[name=ckBM]:checked").each(function () {
                ck = ck + $(this).val();
            });
            if (ck == "") {
                alert("请选择预算！")
                return false;
            }
            $(".zhezhaoPannel").show();
        }

        
