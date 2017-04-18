var complaint = function() {
    var isloader = true;
    //上传图片
    uploader = new plupload.Uploader({
        browse_button: 'browse', //触发文件选择对话框的按钮，为那个元素id
        url: interfaceApi + '?secretKey=mobileSecretKey1234567890&opt=upload', //服务器端的上传页面地址
        flash_swf_url: 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url: 'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        multi_selection: false,
        file_data_name: "images",
        filters: {
            mime_types: [ //只允许上传图片和zip文件
            { title: "Image files", extensions: "jpg,gif,png" }
            ],
            max_file_size: uploader_max_file_size,
            prevent_duplicates: true
        },
        resize: {
            width: plupload_width,
            height: plupload_height,
            crop: false,
            quality: plupload_quality,
            preserve_headers: false
        }
    });

    uploader.bind('FilesAdded', function(uploader, files) {
        uploader.start();
    });
    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
        var imgjson = JSON.parse(responseObject.response);
        $(".images").prepend("<a href='javascript:;'><img  class='uploadimg' src='" + imgdomain + imgjson.resultObject + "' key='" + imgjson.resultObject + "'><img src='Assets/Images/delete.png' class='delete'></a>");
        if ($(".images a").length >= 6) { $("#browse").hide(); isloader = false; $(".images div").hide(); }
        else {
            uploader.disableBrowse(false);
            uploader.refresh();
        }

    });

    uploader.bind('FileFiltered', function (uploader, file, responseObject) {
        uploader.disableBrowse(true);
        if (uploader.total.uploaded + uploader.files.length == 6) { $("#browse").hide(); isloader = false; $(".images div").hide(); }
    });
    uploader.bind('Error', function (uploader, errObject) {

        if (errObject.code == -600) {
            getBomBbox("上传图片过大！")
        }
        if (errObject.code == -602) {
            getBomBbox("不允许上传重复文件！")
        }
    });
    //我要投诉
    this.i_complaint = function() {
            uploader.init(); //初始化
            isLogin();
            code();

            $("#change").click(function() {
                code();
            });
            $(".images").delegate(".delete", "click", function() {
                $(this).parent("a").remove();
                $("#browse").show();
                $(".images div").show();
                uploader.refresh();

            });
            $(".images").delegate(".uploadimg", "click", function() {
                var Smallimg = $(this).attr("src");
                $("#Bigimg img").attr("src", Smallimg);
                $("#Bigimg").show();
            });
            $("#Bigimg").click(function() {
                $("#Bigimg").hide();
            })
            var index = 1;
            $("#sub").click(function() {
                isLogin();
                index = 2;
                preCheck("formComplaint");
                $("#sub").attr("onselectstart", "return false");
                $("#sub").attr("ontouchstart", "return false");
                if (checkUnNull == true) {
                    var paramsJson = {
                        mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                        content: $("#content").val(),
                        title: $("#title").val(),
                        images: [],
                        type: "1",
                        verifyCode: $("#verifyCode").val()

                    }
                    $.each($(".images").find("img"), function(i, item) {
                        if ($(item).attr("key") != null) {
                            paramsJson.images.push({
                                "name": $(item).attr("key")
                            });
                        }
                    });
                    var data = {
                        opt: "repairOrCpln",
                        secretKey: "mobileSecretKey1234567890",
                        params: JSON.stringify(paramsJson)
                    }
                    $.post(interfaceApi, data, function(result) {
                        var result = JSON.parse(result);
                        if (result.messageCode == 1) {
                            getBomBbox("投诉成功");
                            setTimeout(function() {
                                location.href = "owner_complaints.html";
                            }, 1000)
                        } else if (result.messageCode == 2) {
                            location.href = "login.html";
                        } else if (result.messageCode == 3) {
                            getBomBboxyb(result.message);
                            setTimeout(function() {
                                location.href = "login.html";
                            }, 3000);
                        } else {
                            getBomBboxyb(result.message);
                            index = 1;
                            $("#sub").attr("onselectstart", "");
                            $("#sub").attr("ontouchstart", "");
                        }
                    })
                } else {
                    index = 1;
                    $("#sub").attr("onselectstart", "");
                    $("#sub").attr("ontouchstart", "");
                }
            });
        }
        //我要投诉状态
    var state = function(stateId) {
        switch (stateId) {
            case 0:
                return "已报修";
                break;
            case 1:
                return "处理中";
                break;
            case 2:
                return "已处理";
                break;
        }
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

}