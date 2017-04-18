var checkUnNull = true; //判断是否为非空
var checkPwd = true; //判断两次密码是否输入一致
//验证两次密码的输入
function prePwd(formId) {
    var fields = $("[class='formValidate']");
    if (fields.length == 0) {
        return true;
    }
    $.each(fields, function(i, item) {
        var pwdValue = $("#pwd1").val();
        var aginPwdValue = $("#pwd2").val();
        if ((pwdValue != undefined && aginPwdValue != undefined) && pwdValue != aginPwdValue && (pwdValue != "" && aginPwdValue != "")) {
            getBomBbox("两次输入的密码不一致");
            checkUnNull = false;
            return false;
        } else {
            checkPwd = true;
            return true;
        }
    });
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
            alert(result.message);
        }
    })

}

//表单提交前的验证(验证房屋)
var isCheck = true; //是否进行表单的校验
var dtoId = ""; //根据dtoId的值判断是新增还是修改(如果过action中没有dto对象，可为dtoId随便赋值，则表示当前操作为修改操作)
var isFormSubmit = true; //是否是提交form(流程则不是提交form)
var checkUnNull = true; //判断是否为非空
function preCheckFormatHouse(formId) {
    //判断验证的页面是新增还是修改
    if (dtoId == "") {
        dtoId = $("input[name='dto.id']").val();
        if (dtoId == null) dtoId = "";
    }

    var fields = $("input[class*='main']");
    if (fields.length == 0) {
        return true;
    }
    $.each(fields, function(i, item) {
        var id = $(this).attr("id");
        var label = $(this).attr("labelTxt");
        var require = $(this).attr("require");
        var format = $(this).attr("format");
        var maxlength = $(this).attr("maxlength");
        var type = $(this).attr("type");

        if (type == undefined) {
            type = this.type;
        }

        if (type == "hidden" || $(this).attr("disabled") == "disabled" || $(this).attr("disabled") == "true") {
            return true;
        }

        if ($(this).css("display") == "none") {
            return true;
        }
        var value = $(this).val();

        if (type == "text" || type == "textarea") {
            value = $(this).val();
        }
        //非空验证和格式判断
        if (require == "true" && (value == null || value == "")) {
            getBomBbox("请输入" + label);
            checkUnNull = false;
            return false;
        } else {

            if ((value != null && $.trim(value) != "") && (format != undefined && format != "")) {
                var regexpress = eval("regexEnum." + format);
                var reg = new RegExp(regexpress);
                if (!reg.test(value)) {
                    if (format == "intege1") {
                        $(this).css({
                            color: 'red'
                        });
                        getBomBbox("亲~只能输入数字哟");
                        checkUnNull = false;
                        return false;
                    } else {
                        checkUnNull = true;
                        return true;
                    }


                } else {
                    $(this).css({
                        color: 'black'
                    });
                    checkUnNull = true;
                    return true;
                }
            } else {
                checkUnNull = true;
                return true;
            }
        }

    });

}

//表单提交前的验证(验证车辆)
var isCheck = true; //是否进行表单的校验
var dtoId = ""; //根据dtoId的值判断是新增还是修改(如果过action中没有dto对象，可为dtoId随便赋值，则表示当前操作为修改操作)
var isFormSubmit = true; //是否是提交form(流程则不是提交form)
var checkUnNull = true; //判断是否为非空
function preCheckFormatCar(formId) {
    //判断验证的页面是新增还是修改
    if (dtoId == "") {
        dtoId = $("input[name='dto.id']").val();
        if (dtoId == null) dtoId = "";
    }

    var fields = $("input[class*='Num']");
    if (fields.length == 0) {
        return true;
    }
    $.each(fields, function(i, item) {
        var id = $(this).attr("id");
        var label = $(this).attr("labelTxt");
        var require = $(this).attr("require");
        var format = $(this).attr("format");
        var maxlength = $(this).attr("maxlength");
        var type = $(this).attr("type");

        if (type == undefined) {
            type = this.type;
        }

        if (type == "hidden" || $(this).attr("disabled") == "disabled" || $(this).attr("disabled") == "true") {
            return true;
        }

        if ($(this).css("display") == "none") {
            return true;
        }
        var value = $(this).val();

        if (type == "text" || type == "textarea") {
            value = $(this).val();
        }
        //非空验证和格式判断
        if (require == "true" && (value == null || value == "")) {
            getBomBbox("请输入" + label);
            checkUnNull = false;
            return false;
        } else {

            if ((value != null && $.trim(value) != "") && (format != undefined && format != "")) {
                $(this).focus();
                 var regexpress = eval("regexEnum." + format);
                var reg = new RegExp(regexpress);
                if (!reg.test(value)) {
                    if (format == "license") {
                        $(this).css({
                            color: 'red'
                        });
                        getBomBbox("亲~您输入的车牌号有误哟");
                        checkUnNull = false;
                        return false;

                    } else {
                        checkUnNull = true;
                        return true;
                    }


                } else {
                    $(this).css({
                        color: 'black'
                    });
                    checkUnNull = true;
                    return true;
                }
            } else {
                checkUnNull = true;
                return true;
            }
        }

    });

}