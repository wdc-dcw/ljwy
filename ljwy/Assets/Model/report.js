var report = function () {

    //我要保修
    this.addReport = function () {
        var uploader = getUploader(null);
        var isloader=true;
        isLogin();
        uploader.init(); //初始化上传图片
        code();
        
        $("#change").click(function () {
            code();
        });
            //读取页面数据
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
            }
            var data = {
                opt: "getUserInfo",
                secretKey: "mobileSecretKey1234567890",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function (result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    $("#tel").val(result.resultObject.mobile);
                    if(result.resultObject.nickName==null || result.resultObject.nickName==""){
						$("#contacter").val("美丽苑业主");
					}else{
						$("#contacter").val(result.resultObject.nickName); 
					}
                    var roomCodes = result.resultObject.rooms;
                    if (roomCodes.length == 0) {
                        $('<a href="singer_info.html"><span class="squear">选择您要报修的房屋</span></a><div id="choose"></div>').appendTo(".room_choose");
                        $(".tan").show();
                        $(".mask").show();
                    }
                    else {
                        $('<span class="squear">选择您要报修的房屋</span><div id="choose"></div>').appendTo(".room_choose");
                        $.each(roomCodes, function (i, item) {
                            var roomList = this.roomCode.split("-");
                            if (i == 0) {
                                $('<div class="choose"><a class="choose_01 cur" roomCode="' + this.roomCode + '"><span class="squear"><img src="Assets/Images/true.png"/></span> <span class="room">' + roomList[1] + '号' + roomList[2] + '室</span></a></div>').appendTo("#choose");
                            }
                            else {
                                $('<div class="choose"><a class="choose_01" roomCode="' + this.roomCode + '"><span class="squear"><img src="Assets/Images/false.png"/></span> <span class="room">' + roomList[1] + '号' + roomList[2] + '室</span></a></div>').appendTo("#choose");
                            }
                        });
                    }
                                           
                }
            });
            $("#cancel").on("click", function () {
                $(".tan").hide();
                $(".mask").hide();
                getBomBbox("还没有绑定房屋信息哦!");
                $(".submit").attr("onselectstart", "return false");
                $(".submit").attr("ontouchstart", "return false");
            });
            $("#ok").on("click", function () {
                location.href = "singer_info.html"
            });
            //选择地址
            $(".room_choose").delegate(".choose .choose_01", "click", function () {
                var src = $(this).find("img").attr("src");
                $(this).parent().parent().find("a").removeClass("cur");
                if (src == "Assets/Images/false.png") {
                    $(this).parent().parent().parent().children().find("img").attr("src", "Assets/Images/false.png")
                    $(this).find("img").attr("src", "Assets/Images/true.png");
                    $(this).addClass("cur");
                }
                else {
                }
            });

            $(".images").delegate(".delete", "click", function () {
                $(this).parent("a").remove();
                $("#browse").show();
                $(".images div").show();
                uploader.refresh();
            });
            $(".images").delegate(".uploadimg", "click", function () {
                var Smallimg = $(this).attr("src");
                $("#Bigimg img").attr("src", Smallimg);
                $("#Bigimg").show();
            });
            $("#Bigimg").click(function () {
                $("#Bigimg").hide();
            })
        
        //提交
        var index = 1;
        $(".submit a").click(function () {
            isLogin();
            index = 2;
            preCheck("formRepair");
            $("#sub").attr("onselectstart", "return false");
            $("#sub").attr("ontouchstart", "return false");
                if(checkUnNull==true){
                var roomCode= $(".choose a.cur").attr("roomCode");
                var paramsJson = {
                    mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                    repairObject: $("#repairObject").val(),
                    tel: $("#tel").val(),
                    nickName: $("#contacter").val(),
                    title: $("#repairObject").val(),
                    roomCode: roomCode,
                    content: $("#content").val(),
                    images: [],
                    type: "0",
                    verifyCode:$("#verifyCode").val()
                }
                //上传图片的集合
                $.each($(".images").find("img"), function (i, item) {
                    if ($(item).attr("key") != null) {
                        paramsJson.images.push({ "name": $(item).attr("key") });
                    }
                });
                var data = {
                    opt: "repairOrCpln",
                    secretKey: "mobileSecretKey1234567890",
                    params: JSON.stringify(paramsJson)
                }
                $.post(interfaceApi, data, function (result) {
                    var result = JSON.parse(result);
                    if (result.messageCode == 2) {
                        location.href = "login.html";
                    }
                    else if (result.messageCode == 1) {
                            getBomBbox("报修成功");
                            setTimeout(function () {
                                location.href = "repair_property_list.html";
                            }, 1000)
                           
                                
                    } else {
                        index = 1;
                        $("#sub").attr("onselectstart", "");
                        $("#sub").attr("ontouchstart", "");
                        getBomBbox(result.message);
                    }
                })
            }else{
                    index = 1;
                    $("#sub").attr("onselectstart", "");
                    $("#sub").attr("ontouchstart", "");
            }

        });
    }
    //上传图片

    var getUploader = function (uploader) {
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
        uploader.bind('FilesAdded', function (uploader, files) {
            uploader.start();
        });
        return uploader;
    }
    
    
    

    var state = function (stateId) {
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
    var code = function () {
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "createVerifyCode",
            params: JSON.stringify(paramsJson)
        }

        $.post(interfaceApi, data, function (result) {
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