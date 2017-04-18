document.getElementById("mobileHtml").style.fontSize = document.body.clientWidth / 3.2 + "px";
//控制字体大小
window.onresize = function() {
    document.getElementById("mobileHtml").style.fontSize = document.body.clientWidth / 3.2 + "px";
};
//图片路径
var imgdomain = "http://www.elinnuan.com/ljwy-web/";
//接口api
var interfaceApi = "http://www.elinnuan.com/ljwy-web/phoneInterface.do";
var managerMemory = "ManagerMemory";
//默认图片
var nullImage = "Assets/Images/Null.png";
var cookiePath = "/ljwy-web";
//上传图片大小
var uploader_max_file_size = "10000kb";
//上传图片时压缩的宽高及质量
var plupload_width = 1280;
var plupload_height = 1280;
var plupload_quality = 50;

Zepto(function($) {
    $(window).resize(function() {
        var height = document.documentElement.clientHeight;
        if (height < 380) {
            $(".footer").attr("style", "bottom:-100px");
        } else {
            $(".footer").attr("style", "bottom:0px");
        }
    });
});

//默认图片方法
var imageNull = function(str) {
        var image = "";
        if (str == null || str == "") {
            image = nullImage;
        } else {
            image = imgdomain + str;
        }
        return image;
    }
    //点击变色
var clickChange = function(element, link) {
    $(element).attr("style", "backgroung-color:#808080;color:#666666;");
    setTimeout(function() {
        location.href = link;
    }, 100)
}

//第三方登录
//from：来源（QQ,微信，微博）
//nickName 用户昵称
//token  用户ID，QQ号、微信号、微博账号
//image  用户头像
var certifyCodes = "";
var thirdlogin = function(from, nickName, token, image) {
    location.href = "bind_mobile.html?from=" + from + "&nickName=" + nickName + "&token=" + token + "&image=" + image;
}

var updateimage = function(state, message, ImageUrl) {
        if (state == 1) {
            $("#browse").attr("src", imgdomain + ImageUrl);
        } else {
            getBomBbox(message);
        }

    }
    //截取状态栏的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//截取状态栏的中文参数
function GetQueryStringCn(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//是否登陆
var isLogin = function() {
    if (JSON.parse(eval($.cookie(managerMemory))) != null) {
        if (JSON.parse(eval($.cookie(managerMemory))).mobile == "") {
            return location.href = "bind_mobile.html";
        } else {
            return JSON.parse(eval($.cookie(managerMemory)))
        }

    } else {
        return location.href = "login.html";
    }
}

//获取来源url
function getSourceUrl() {
    var ref = '';
    if (document.referrer.length > 0) {
        ref = document.referrer;
    }
    try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) {}
    return ref;
}

//吐司
var getBomBbox = function(str) {
    $('<div class="messageBox" ><span>' + str + '</span></div>').appendTo("body");
    $(".messageBox").show();
    setTimeout(function() {
        $(".messageBox").remove()
    }, 1000);
}

var getBomBboxyb = function(str) {
        $('<div class="messageBox" ><span>' + str + '</span></div>').appendTo("body");
        $(".messageBox").show();
        setTimeout(function() {
            $(".messageBox").remove()
        }, 3000);
    }
    //OrderId--订单编号  ,messageCode--支付状态 -1 失败 1 成功
var ReturnPay = function(OrderId, messageCode) {
    location.href = "property.html?OrderId=" + OrderId + "&messageCode=" + messageCode;
}

var saveBack = function() {
    var sourceurl = getSourceUrl();
    var currentUrl = location.href;
    var currentUrlArray = location.pathname.split("/");
    var currentname = currentUrlArray[currentUrlArray.length - 1];
    var currentkey = currentname.split(".")[0];
    var sourceurlArray = sourceurl.split("/");
    var sourcename = sourceurlArray[sourceurlArray.length - 1];
    var sourcekey = sourcename.split(".")[0];
    switch (currentkey) {
        //登陆注册找回密码
        case "login":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("register") <= 0 &&
                sourceurl.toLowerCase().indexOf("forget_password") <= 0 &&
                sourceurl.toLowerCase().indexOf("set_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("bind_mobile") <= 0) {
                $.cookie(currentkey, sourceurl);
            };
            break;
            //缴费
        case "tenement":
            if (sourcekey == "singer_center") {
                $.cookie("tenement", "singer_center.html");
                $.cookie("pay_sort", "tenement.html");
            }
            if (sourcekey == "pay_advance") {
                $.cookie("tenement", "pay_sort.html");
                $.cookie("pay_sort", "index.html");
            }
            break;
        case "pay_sort":
            if (sourcekey == "index") {
                $.cookie("tenement", "pay_sort.html");
                $.cookie("pay_sort", "index.html");
            }
            break;

        case "property":
            if (sourcekey == "pay_advance") {
                $.cookie("property", "tenement.html");
            }
            if (sourcekey == "confirm_order") {
                $.cookie("property", "myorder.html");
            }
            break;
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("register") <= 0 &&
                sourceurl.toLowerCase().indexOf("login") <= 0 &&
                sourceurl.toLowerCase().indexOf("forgetpwd") <= 0) {
                $.cookie("property", sourceurl);
            };
            break;
            //报修
        case "repair_property_list":
            if (sourcekey == "singer_center") {
                $.cookie("repair_property_list", "singer_center.html");
                $.cookie("repair_property_add", "repair_property_list.html");
            }
            break;
        case "repair_property_add":
            if (sourcekey == "index") {
                $.cookie("repair_property_add", "index.html");
                $.cookie("repair_property_list", "repair_property_add.html");
            }else{
            	$.cookie("repair_property_add", "index.html");
                $.cookie("repair_property_list", "repair_property_add.html");
            }
            break;

            //投诉
        case "owner_complaints":
            if (sourcekey == "singer_center") {
                $.cookie("i_complaint", "owner_complaints.html");
                $.cookie("owner_complaints", "singer_center.html");
            }else if(sourcekey =="i_complaint"){
            	$.cookie("i_complaint", "owner_complaints.html");
            	$.cookie("owner_complaints", "i_complaint.html");
            }
            break;
        case "i_complaint":
            if (sourcekey == "index") {
                $.cookie("i_complaint", "index.html");
                $.cookie("owner_complaints", "i_complaint.html");
            }
            break;
            //社区公告
        case "community_detail":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("community_detail", sourceurl);
            };
            break;
        case "activity_detail":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("activity_detail", sourceurl);
            };
            break;
        case "information":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("information_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("community_page") <= 0) {
                $.cookie("information", sourceurl);
            };
            break;
        case "information_detail":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("information_detail", sourceurl);
            };
            break;
        case "singer_info":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("community_page") <= 0) {
                $.cookie("singer_info", sourceurl);
            };
            break;
        case "recommend_detail":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("recommend_detail", sourceurl);
            };
            break;
        case "nanny_service":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("business_detail") <= 0) {
                $.cookie("nanny_service", sourceurl);
            };
            break;
        case "business_detail":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("address_location") <= 0) {
                $.cookie("business_detail", sourceurl);
            };
            break;
        case "shopcar":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("confirm_order") <= 0) {
                $.cookie("shopcar", sourceurl);
            };
            break;
        case "commodity_info":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 00 &&
                sourceurl.toLowerCase().indexOf("confirm_order") <= 0 &&
                sourceurl.toLowerCase().indexOf("shopcar") <= 0) {
                $.cookie("commodity_info", sourceurl);
            };
            break;
        case "address_add":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 00) {
                $.cookie("address_add", sourceurl);
            };
            //if (sourcekey == "address_management") {
            //    $.cookie("address_add", "address_management.html");
            //}
            //if (sourcekey == "confirm_order") {
            //    $.cookie("address_add", "confirm_order.html");
            //}
            break;
        case "address_update":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("address_update", sourceurl);
            };
            break;
        case "address_management":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("address_add") <= 0 &&
                sourceurl.toLowerCase().indexOf("address_update") <= 0) {
                $.cookie("address_management", sourceurl);
            };
            break;
        case "address_location":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0) {
                $.cookie("address_location", sourceurl);
            };
            break;
        case "community_page":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("bank") <= 0) {
                $.cookie("community_page", sourceurl);
            };
            break;
            //话题
        case "my_topic":
            if (sourcekey == "singer_center") {
                $.cookie("my_topic", "singer_center.html");
                $.cookie("topic_release", "my_topic.html");
            }
            break;
        case "topic_release":
            if (sourcekey == "community_topic_list") {
                $.cookie("topic_release", "community_topic_list.html");
                $.cookie("my_topic", "topic_release.html");
            }
            break;
            //活动
        case "my_activities":
            if (sourcekey == "singer_center") {
                $.cookie("my_activities", "singer_center.html");
                $.cookie("personal_activities_release", "my_activities.html");
            }
            break;
        case "personal_activities_release":
            if (sourcekey == "personal_activities_list") {
                $.cookie("personal_activities_release", "personal_activities_list.html");
                $.cookie("my_activities", "personal_activities_release.html");
            }
            break;
            //二手市场
        case "mysecond_list":
            if (sourcekey == "singer_center") {
                $.cookie("secondary_market", "mysecond_list.html");
                $.cookie("mysecond_list", "singer_center.html");
                $.cookie("second_mark", "mysecond_list.html");
            }
            break;
        case "second_list":
            if (sourcekey == "communities") {
                $.cookie("second_list", "communities.html");
                $.cookie("secondary_market", "second_list.html");
                $.cookie("second_mark", "second_list.html");
            }
            break;
        case "confirm_order":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("address_management") <= 0 &&
                sourceurl.toLowerCase().indexOf("address_add") <= 0 &&
                sourceurl.toLowerCase().indexOf("property") <= 0) {
                $.cookie("confirm_order", sourceurl);
            };
            break;
        case "message_list":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("community_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("activity_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("community_page") <= 0 &&
                sourceurl.toLowerCase().indexOf("recommend_detail") <= 0) {
                $.cookie("message_list", sourceurl);
            };
            break;
        case "singer_center":
            if (sourceurl.toLowerCase().indexOf(currentkey) <= 0 &&
                sourceurl.toLowerCase().indexOf("register") <= 0 &&
                sourceurl.toLowerCase().indexOf("login") <= 0 &&
                sourceurl.toLowerCase().indexOf("forgetpwd") <= 0 &&
                sourceurl.toLowerCase().indexOf("tenement") <= 0 &&
                sourceurl.toLowerCase().indexOf("repair_property_list") <= 0 &&
                sourceurl.toLowerCase().indexOf("owner_complaints") <= 0 &&
                sourceurl.toLowerCase().indexOf("my_topic") <= 0 &&
                sourceurl.toLowerCase().indexOf("my_activities") <= 0 &&
                sourceurl.toLowerCase().indexOf("integral_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("information") <= 0 &&
                sourceurl.toLowerCase().indexOf("mysecond_list") <= 0 &&
                sourceurl.toLowerCase().indexOf("myorder") <= 0 &&
                sourceurl.toLowerCase().indexOf("address_management") <= 0 &&
                sourceurl.toLowerCase().indexOf("set_detail") <= 0 &&
                sourceurl.toLowerCase().indexOf("sign") <= 0 &&
                sourceurl.toLowerCase().indexOf("singer_info") <= 0 &&
                sourceurl.toLowerCase().indexOf("message_list") <= 0) {
                $.cookie("singer_center", sourceurl);
            }; 
            break;

    }
}

saveBack();

//返回函数
var GoBack = function() {
    var sourceurl = getSourceUrl();
    var currentUrl = location.href;
    var currentUrlArray = location.pathname.split("/");
    var currentname = currentUrlArray[currentUrlArray.length - 1];
    var currentkey = currentname.split(".")[0];
    switch (currentkey) {
        //用户端
        //首页
        case "index":
            location.href = "signout://";
            break;
            //登陆注册找回密码
        case "login":
            location.href = "signout://";
            break;
        case "register":
            location.href = "login.html";
            break;
        case "user_agreement":
            location.href = "register.html";
            break;
        case "forgetpwd":
            location.href = "login.html";
            break;
        case "bind_mobile":
            location.href = "login.html";
            break;
            //缴费
        case "tenement":
            location.href = $.cookie(currentkey);
            break;
        case "pay_advance":
            location.href = "pay_sort.html";
            break;
        case "property":
            location.href = $.cookie(currentkey);
            break;
        case "pay_sort":
            location.href = $.cookie(currentkey);
            break;

            //保修
        case "repair_property_list":
            location.href = $.cookie(currentkey);
            break;
        case "repair_property_add":
            location.href = $.cookie(currentkey);
            break;
        case "report_details":
            location.href = "repair_property_list.html";
            break;
            //投诉
        case "owner_complaints":
            location.href = $.cookie(currentkey);
            break;
        case "complaints_detail":
            location.href = "owner_complaints.html";
            break;
        case "i_complaint":
            location.href = $.cookie(currentkey);
            break;
            //公告活动
        case "announcement":
            location.href = "index.html";
            break;
        case "community_activities":
            location.href = "announcement.html";
            break;
        case "community":
            location.href = "announcement.html";
            break;
            //停车位
        case "parking":
            location.href = "index.html";
            break;
            //社区
        case "communities":
            location.href = "index.html";
            break;
            //家政服务
        case "home_service":
            location.href = "index.html";
            break;
            //便利店
        case "convenience":
            location.href = "index.html";
            break;
        case "shopcar":
            location.href = $.cookie(currentkey);
            break;
        case "confirm_order":
            location.href = $.cookie(currentkey);
            break;
            //快递
        case "delivery_service":
            location.href = "index.html";
            break;
            //推荐
        case "recommend":
            location.href = "index.html";
            break;
        case "recommend_detail":
            location.href = $.cookie(currentkey);
            break;
            //积分
        case "integral_detail":
            location.href = "singer_center.html";
            break;
        case "integral":
            location.href = "integral_detail.html";
            break;
            //消息
        case "message_list":
            location.href = $.cookie(currentkey);
            break;
        case "community_detail":
            location.href = $.cookie(currentkey);
            break;
        case "activity_detail":
            location.href = $.cookie(currentkey);
            break;
            //设置
        case "set_detail":
            location.href = "singer_center.html";
            break;
            //添加信息
        case "singer_info":
            location.href = $.cookie(currentkey);
            break;
        case "personal_info":
            location.href = "set_detail.html";
            break;
        case "singer_center":
            location.href = $.cookie(currentkey);
            break;

            //修改密码
        case "updatepwd":
            location.href = "set_detail.html";
            break;
            //关于我们
        case "about":
            location.href = "set_detail.html";
            break;
            //意见反馈
        case "feed_back":
            location.href = "set_detail.html";
            break;
            //签到
        case "sign":
            location.href = "singer_center.html";
            break;
            //添加信息
        case "add_car":
            location.href = "singer_center.html";
            break;
        case "addcar_detail":
            location.href = "add_car.html";
            break;
        case "information":
            location.href = $.cookie(currentkey);
            break;
        case "information_detail":
            location.href = $.cookie(currentkey);
            break;
        case "nanny_service":
            location.href = $.cookie(currentkey);
            break;
        case "community_page":
            location.href = $.cookie(currentkey);
            break;
        case "bank":
            location.href = "community_page.html";
            break;
        case "business_detail":
            location.href = $.cookie(currentkey);
            break;
        case "commodity_info":
            location.href = $.cookie(currentkey);
            break;
        case "conve_list":
            location.href = "convenience.html";
            break;
        case "address_add":
            location.href = $.cookie(currentkey);
            break;
        case "address_update":
            location.href = $.cookie(currentkey);
            break;
        case "address_management":
            location.href = $.cookie(currentkey);
            break;
        case "address_location":
            location.href = $.cookie(currentkey);
            break;
            //社区
        case "community_topic_list":
            location.href = "communities.html";
            break;
        case "topic_details":
            location.href = "community_topic_list.html";
            break;
        case "personal_activities_list":
            location.href = "communities.html";
            break;
        case "personal_activities_details":
            location.href = "personal_activities_list.html";
            break;
        case "second_list":
            location.href = $.cookie(currentkey);
            break;
        case "my_topic":
            location.href = $.cookie(currentkey);
            break;
        case "topic_release":
            location.href = $.cookie(currentkey);
            break;

        case "my_activities":
            location.href = $.cookie(currentkey);
            break;
        case "personal_activities_release":
            location.href = $.cookie(currentkey);
            break;
        case "mysecond_list":
            location.href = "singer_center.html";
            break;
        case "secondary_market":
            location.href = $.cookie(currentkey);
            break;
        case "second_mark":
            location.href = $.cookie(currentkey);
            break;
        case "mysecond_mark":
            location.href = "second_list.html";
            break;
        case "myorder":
            location.href = "singer_center.html";
            break;
        case "shop_location":
            location.href = "convenience.html";
            break;
        case "order_detail":
            location.href = "myorder.html";
            break;

    }
}

$("#pageBack").click(function() {
    GoBack();
});



//消息条数
var information = function() {
    if (JSON.parse(eval($.cookie(managerMemory))) != null) {
        var paramsJson = {
            mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
        }
        var data = {
            opt: "getUserInfo",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function(result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                var currentUrl = location.href;
                var currentUrlArray = location.pathname.split("/");
                var currentname = currentUrlArray[currentUrlArray.length - 1];
                var currentkey = currentname.split(".")[0];
                if (result.resultObject.newMsgCnt > 0) {
                    $("#newMsgCnt").empty();
                    if (currentkey == "index") {
                        $(".top").empty();
                        $('<img src="Assets/Images/index_01.png" /><a href="message_list.html"><img src="Assets/Images/massageli.png" /><img src="Assets/Images/spot.png" class="spot" /></a>').appendTo(".top");
                        $('<div><img src="Assets/Images/footer_04bg.png" /><p>个人</p><img src="Assets/Images/spot.png" class="spot" /></div>').appendTo("#newMsgCnt");
                    } else if (currentkey == "singer_center" || currentkey == "tenement" || currentkey == "repair_property_list" || currentkey == "owner_complaints" || currentkey == "integral" || currentkey == "message_list" || currentkey == "set_detail" || currentkey == "singer_info" || currentkey == "updatepwd" || currentkey == "about" || currentkey == "feed_back" || currentkey == "integral_detail") {
                        $('<div><img src="Assets/Images/footerbg_04.png" /><p style="color:#ff8600;">个人</p><img src="Assets/Images/spot.png" class="spot" /></div>').appendTo("#newMsgCnt");
                    } else {
                        $('<div><img src="Assets/Images/footer_04bg.png" /><p>个人</p><img src="Assets/Images/spot.png" class="spot" /></div>').appendTo("#newMsgCnt");
                    }

                }
            } else if (result.messageCode == 2) {
                location.href = "login.html";
            } else {
                getBomBbox(result.message);
            }
        });
    } else {}

}



//表单提交前的验证
var isCheck = true; //是否进行表单的校验
var dtoId = ""; //根据dtoId的值判断是新增还是修改(如果过action中没有dto对象，可为dtoId随便赋值，则表示当前操作为修改操作)
var isFormSubmit = true; //是否是提交form(流程则不是提交form)
var checkUnNull = true; //判断是否为非空
function preCheck(formId) {
    //判断验证的页面是新增还是修改
    if (dtoId == "") {
        dtoId = $("input[name='dto.id']").val();
        if (dtoId == null) dtoId = "";
    }

    var fields = $("[class='formValidate']");
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

        var mobile = $(this).attr("moblie");


        if (type == "text" || type == "date" || type == "textarea" || type=="password") {
            value = $(this).val();
        }
        if (type == "text" || type == "date") {
            if (value.indexOf("\"") > 0 || value.indexOf("{") > 0 || value.indexOf("}") > 0 || value.indexOf("[") > 0 || value.indexOf("]") > 0 || value.indexOf("(⊙o⊙)哦") > 0 || value.indexOf("<") > 0 || value.indexOf(">") > 0 || value.indexOf("$") > 0 || value.indexOf("#") > 0 || value.indexOf("&") > 0 || value.indexOf("(") > 0 || value.indexOf(")") > 0 || value.indexOf("【") > 0 || value.indexOf("】") > 0) {
                $(this).css({
                    color: 'red'
                });
                getBomBbox("亲~你输入的内容包含非法字符哟");
                checkUnNull = false;
                return false;

            } else {
                $(this).css({
                    color: 'black'
                });

            }

        }

        function filterText(sText) {
            var reBadWords = /阿扁|办理文凭|办理证件|暴力拆迁|藏独|陈水扁|成人电影|成人片|出售假币|出售枪支|出售手枪|春药|催情药|达赖|大法|大纪元|大学骚乱|戴海静|帝国之梦|第五代领导|赌博|短信群发器|对日强硬|恶搞晚会|我是小狗|反共|反华|反民主|反政府|高干子弟|高干子女|高校暴乱|高校群体事件|高校骚乱|古方迷香|官商勾结|鬼村|胡耀邦|换妻|黄色小电影|昏药|激情小电影|佳静安定片|监听王|江必新|疆独|近親相姦|禁书|军长发威|黎阳平|李洪志|六合彩|六四事件|卢跃刚|轮奸|麻醉钢枪|麻醉枪|麻醉药|麻醉乙醚|买卖枪支|毛一鲜|蒙汗药粉|迷昏药|迷奸药|迷药|拍肩神药|盘古乐队|前门地区改造|枪决女犯|枪决现场|枪支弹药|强奸|强效失意药|强硬发言|窃听器|窃听器材|肉棍|三唑仑|色情服务|色情小电影|身份证生成器|升达毕业证|十七届常委|手机复制|四川大学江安校区|宋平一句话|台独|特码|天安门事件|天鹅之旅|通货膨胀|投毒杀人|透视眼镜|退党|无界浏览器|西藏天葬|西山会议|小穴|新唐人|血腥图片|摇头丸|乙醚|淫靡|淫水|远程偷拍|张小平|赵紫阳|侦探设备|真善忍|政治风波|中共高干|中共激烈内斗|中共近期权力斗争|中共权力斗争|中共十七布局|中共十七常委名单|中共十七人选|中共心中最大的恐惧|中国储君|中国改革年代政治斗争|中国高层权力斗争|中国高层人事变动解读|中国三大流氓职业|中国太子|中国政坛“明日之星”|中国政坛“清华帮”盛极而衰|中南海波澜起伏|中南海大决战|中南海的权力游戏|中南海斗争|中南海高层权力斗争|中南海惊现东宫小朝廷|中南海秘闻|中南海内斗|中南海浓云密布|中南海权力斗争|中央警卫局大换血|中央派系斗争|中央十七|中央团系|中央政治局推荐人选|子女任职名单|自杀手册|自杀指南|自制手枪|总书记的红人|物价上涨|性药品|性病|胡锦涛|吴邦国|温家宝|贾庆林|罗干|李长春|习近平|李克强|贺国强|周永康|李鹏|朱镕基|张德江|汪洋|黄华华|刘玉浦|朱明国|黄龙云|胡泽君|朱小丹|肖志恒|辛国荣|林雄|梁伟发|周镇宏|许宗衡|白天|谭国箱|李意珍|王穗明|崔晓汉|戴北方|李锋|王京生|刘应力|吕锐锋|王毅|毛主席复活|先烈的电话|江姐问|董存瑞问|杨子荣问|被阿扁推翻了|杨白劳问|自由门|无界浏览|加密浏览|代理上网|游行|示威|进京上访|自杀|爆炸|炸毁|放弃早期承诺|声明|中央军委扩大会议|专业快速深户咨询|快速办理深户咨询|深圳红印户口咨询|针孔摄像头|针孔摄像机|枪支|蒙汗药|爆炸物|雷制造技术|炸药制作方法|核弹制作方法|核武器制作方法|收视卡|电子解码器|发帖机|信息群发器|代办证件|办证|电视解密|电视共享|针孔|窃听|透视|隐型耳机|群发器|枪|弓弩|迷情粉|催情|迷昏|迷魂|迷幻|迷情|迷魂药|钢珠枪|弩枪|强力弩枪|麻醉抢|仿真手枪|刚珠枪|猎枪|雷管制造|炸弹|火药|炸弹物|代开发票|假币|代开增值税|手机改号软件|手枪|蒙独|高句丽|渤海国|九评|法轮|法一轮|太比力克|国际公法|國際公法|解放军301医院|最后的兵团|猎头者|保姆日记|双面女友|动画-小羊肖恩|笑笑羊|实际神|大法洪传|弘法会|灵修团体|五套法|宇宙最高法理|珐论大珐|世纪大案|世纪血腥|伊波拉|绝世遗言|独臂老人|睁开慧眼|百志|双面胶|功友|法轮功|大陆同修|法?轮?功|洗瑙|李大师|.江浙民.|法正人间|法正乾坤|正法时期|海外护法|洪法交流|老虎机|赌|扑克|赌球|赌马|三公|外围|赌恒指|庄家|赔率|盘口|下盘|肖中特|香港六合彩总公司|香港六合彩|香港赛马会|香港赛马会六合网|香港赛马会大型六合彩资讯网|香港皇马科技有限公司|香港捷通3C科技有限公司|香港华典数码3C集团|香港恒海国际科技有限公司|香港永和电子国际科技有限公司|香港新通豪科技有限公司|蚁力神|春运|呼尔浩特枪击|王志平|关六如|转让火车票|潮州性奴|钱东镇|四川猎杀大熊猫案|国家英语四级试题|国家英语六级试题|全国人民代表大会|人大常委|人大代表|人大会议|新生网|天安门|共产主义|共产党|中共|反革命|盗取|绕过封锁|新疆独立|西藏独立|民运分子|打倒|推翻|多党执政|专制|国民党|六四19周年|广场上的热血|历史的伤口|大跃进50周年|知识青年上山下乡运动40周年|改革开放30周年|出售K粉|冰毒|海洛因|麻古|毒品配方|麻古制作方法|麻古制作工艺|麻古制作技术|冰毒制作方法|冰毒制作工艺|冰毒制作技术|冰毒配方讲解光盘|吗啡|4号|红K|鸦片|甲基苯丙胺（冰毒）|大麻|可卡因|曲马多|异丙嗪|丁丙诺啡|地西泮|二乙酰吗啡|LSD|醋酸酐|麻黄素|罂粟|罂粟籽|冰毒片|甲基安非他明|唠嗑药|抢劫药|强奸药|马药|麻药|疯药|广古|缅古|丙酮|氯胺酮|Ketamine|盐酸氯胺酮|盐酸|氨水|无水乙醇|活性碳|盐酸羟亚胺|MDMA|氢氧化钠|赤磷|去氧麻黄碱|甲基苯丙胺|盐酸去氧麻黄碱|我们自杀吧|渊盖苏文|大祚荣|太王四神记|朱蒙|朱蒙IN英语|VOA采访热比娅|完全自杀手册|淫荡|催眠|叫床|女优|好色|妓女|小杜|小电影|屄|应召女郎|应招|情爱|情网|情色|成人教育|成人网站|风流|阴户|阴唇|阴茎|阴蒂|激情图片|激情电影|成人小说|口交|乱伦|手淫|做鸡|裸体|麻醉|中国领导人的最强阵容|锦涛和阿扁的对联|日本的言论|福娃变换角度|毛主席和小平的对话|自制固体火箭全过程|我希望中国能有这样一道测试题|中国是全球唯一绝对不能惹的国家|刘德华与胡哥的对话|性教育,A级片毛片下载男男影院,男男激情,看片区|性图片区艳情小说古装情欲力作男女激情片下载|免费艳情淫秽小说淫秽bt电影淫秽图片|日好色女成人网bt色情电影色情小电影|各类枪枝及防身器|制作原子弹的方法|香港强效迷幻GHB水|致人大代表的信|透视中国现代民谣|邓小平的预言|CT透视器银行卡复制器|手机追踪|西藏暴动|手枪的制作工艺流程|卖炸药|《神灯》|奥运五福娃邪恶版|四大怪事|文盲|大规模反中游行|英语四六八级|讨薪|共产党说反腐|《马前课》|李庆善|邓善红|官商暴利|《花木兰》|集资骗局|林龙飞|孙悟空与阿西娜的故事|《仙笛》|曾国华|淫浪|阴部|蚁力神公司|养殖蚂蚁|李玉书|环三亚甲基三硝氨|大乌拉尔|炸弹遥控器|毒素|万里大造林|四大扯蛋|奥运会徽车祸版|张思卿|大陆高干子女名单|G点|杨汝岱|集体静坐|加油机干扰器|袭击|秘密串联|雷管|黑社会|SARS|南通儿童福利院|张衡生冻毙|新疆克拉玛依火灾|李其炎|突厥革命|灭亡中国|出海保钓|制式54式|张宗海|邓小平讲英语|小口径步枪|军用枪支|巴西预言家|酣乐欣|手机跟踪定位器|岳岐峰|黄菊|恐怖分子|倒卖土地|推翻共产党|《推背图》|CT透视器|陈慕华|李泽民|床戏|李纪周|沪霸天|布赫|李锡铭|厕所男女标识|南京大屠杀|奥运火炬吹灭|假钞|燃烧弹|广州火车站|双管猎枪|暴政|独裁|万能钥匙|古方化骨水|差额选举|监听器|银行卡复制器|万能开锁器|手表式作弊器|定制消失笔|高低压三箭|瘟假报|胡紧掏|奥运火炬传递|吉瑟利努|呼和浩特市委副书记|出售迷魂药|上岛保钓|《九jiu评》|血本无归|基地组织|暴动|流感大变种|抗议|陶驷驹|中国断交|叶选平|二氧化碳|动力气枪|地磅干扰器|无线影音发射器|奥运会开幕式|手机截听器|总输记|屏蔽器|声明退出中国少先队|十七大人大代表|李灏|邪恶中共|空军会议|赵志浩|王忍之|大地震|奶头|炸药的合成|卢瑞华|早泄|八大谎言|三反五反杀地主|藏字石|恐怖袭击|奥运吉祥物|迷昏香烟|强震海啸|三朝天子|李贵鲜|淫欲|电子地磅解码器|讲话摘录|《梅花诗》|内蒙古|五大原则|厉有为|二手老虎机|手机窃听器|恽代英|先烈来电|三个三代表|无线监听工具|邪党|陈敏章|七大谎言|上访|无耻语录排行榜|廖晖|全树仁|中-国-共-产-党-亡|《圣经启示录》|毛主席复活后|自制固体火箭|李伯勇|氰化钠|伍绍祖|葛洪升|苦难的中国|陈相贵|制造炸弹|遥控炸弹|沙菲片|邵奇惠|氰化钾|硝酸甘油炸药制造|改革六大成绩|监视器偷拍|中国平安|私下肮脏的交易|平安保险|中国国际战略研究网|两会十大废话议案|C4|鸿泰数码科技|张鼎丞|张国堂|《玛雅预言》|魔鬼政治词典|摘取器官|本.拉登|胡主席|赌博透视器|杀知识分子|文革杀资产阶级|麻醉手枪|钢珠手枪|手雷|手榴弹|乳房|炸药配方|毒残酷迫|中共解体|徐其耀|简易炸蛋制作方法|老胡|李子彬|田纪云|五连猎枪|乳头|政府说为人民服务|老温|导弹DIY|钱冠林|64杀学生|吴国庆|自愿想退出“少先队员|团员|党员”|蚁力神非法集资案|刑讯逼供|全国二奶大赛揭晓|九评|秋香版|宋平|声明退出|太子党名单|代考上网文凭|毛致用|代考|国外文凭|电视剧《朱蒙》|社保基金案|《诸世纪》|两性淫乱|公安部春节晚会|清明节|杀手|工字牌气枪|胡乔木|陈锦华|王汉斌|朱森林|十大无耻发言|外蒙古|宁波办证|毛主席|女税务干部|2008全球春节晚会|隐身装备|代办全国毕业学历|十大丑陋语录|激情下载|陈冠希|畲祥林冤案|包尔汉|六大成绩|杜导斌|精典黄色短信|荒唐禁令|全自动步枪|吕绣莲|麻姑|全套艳照门|高压麻醉枪|福娃变乌龟|共残拳|骚乱|包娼包赌|黑索今|杨枫|邓宝驹|讨要工钱|GHB|浩宇高等教育学历|地震海啸|亡国亡党|彭定鼎|“中国印”|射精|迷药防身药水|朱学勤|税务代理|免费淫奸黄色电影|黄色妹妹a级大片|弹簧压气|温云松|原子弹|挤踏身亡|香港GHB水|色粉|按摩女|王子淫传|美妹|阴囊|操|枪械|子弹|香港保钓会|定时炸弹|毛远新|卢嘉锡|曾庆红|刘少奇|做爱|毛新宇|吕秀莲|温总理|股灾空难|入联公投|《九剑》|迷香|最强领导人|地下的先烈们|友邦正通学历|无线窃听器|曾道人|服务中心代办|迷幻药|钓鱼岛|赌博作弊工具|黑色11月|天线宝宝马报/gi;
                return sText.replace(reBadWords, "****");
        }

        if(type=="text"||type=="textarea"){
            $(this).val(filterText(value));
        }

        //非空验证和格式判断
        if (require == "true" && (value == null || value == "")) {
            getBomBbox("请输入" + label);
            checkUnNull = false;
            return false;
        } else {
            if (((value != null || mobile != null) && ($.trim(value) != "" || $.trim(mobile) != "")) && (format != undefined && format != "")) {
                var regexpress = eval("regexEnum." + format);
                var reg = new RegExp(regexpress);
                if (!reg.test(value)) {
                    if (reg.test(mobile)) {
                        checkUnNull = true;
                        return true;
                    } else {
                        if (format == "mobile") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("手机号格式不正确");
                            checkUnNull = false;
                            return false;
                        } else if (format == "num1") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("亲~只能输入数字哟");
                            checkUnNull = false;
                            return false;
                        } else if (format == "intege1") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("亲~只能输入大于0的整数哟");
                            checkUnNull = false;
                            return false;
                        } else if (format == "date") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("亲~日期格式不对哟");
                            checkUnNull = false;
                            return false;
                        } else if (format == "num") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("亲~只能输入大于0的数字哟");
                            checkUnNull = false;
                            return false;
                        } else if (format == "zipcode") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("亲~您输入的邮编格式不对哟");
                            checkUnNull = false;
                            return false;
                        } else if (format == "tels") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("联系电话格式不正确");
                            checkUnNull = false;
                            return false;
                        } else if (format == "courier") {
                            $(this).css({
                                color: 'red'
                            });
                            getBomBbox("快递订单号格式不正确");
                            checkUnNull = false;
                            return false;
                        } else {
                            $(this).css({
                                color: 'balck'
                            });
                            checkUnNull = true;
                            return true;
                        }

                    }

                } else {
                    $(this).css({
                        color: 'balck'
                    });
                    checkUnNull = true;

                    return true;
                }


            } else {
                $(this).css({
                    color: 'balck'
                });
                checkUnNull = true;
                return true;

            }



        }

    });

}


//jQuery.post扩展加Token
$.postToken = function(url, data, success, finish) {
        //$.loading(true);
        if (success == undefined) {
            //$.loading(false);
            var param = {
                Token: $.cookie(managerMemory)
            }
            $.post(url, param, function(result) {
                if (result.ResultCode < 0) {
                    if (result.ResultCode == -999) {
                        location.href = homeUrl;
                    } else {

                        data(result);
                    }
                } else {
                    data(result);
                }
            }, 'json');
        } else {
            data.Token = $.cookie(managerMemory);
            $.post(url, data, function(result) {
                if (result.ResultCode < 0) {
                    //$.loading(false);
                    if (result.ResultCode == -999) {
                        location.href = homeUrl;
                    } else {
                        success(result);
                        if (finish != undefined) finish(result);

                    }
                } else {
                    //$.loading(false);
                    success(result);
                    if (finish != undefined) finish(result);

                }
            }, 'json');
        }
    }
    //jQuery.get扩展加Token
$.getToken = function(url, data, success, finish) {
        //$.loading(true);
        if (success == undefined) {
            //$.loading(false);
            var param = {
                Token: $.cookie(managerMemory)
            }
            $.get(url, param, function(result) {
                if (result.ResultCode < 0) {
                    if (result.ResultCode == -999) {
                        location.href = homeUrl;
                    } else {
                        data(result);
                    }
                } else {
                    data(result);
                }
            }, 'json');
        } else {
            data.Token = $.cookie(managerMemory);
            $.get(url, data, function(result) {
                if (result.ResultCode < 0) {
                    //$.loading(false);
                    if (result.ResultCode == -999) {
                        location.href = homeUrl;
                    } else {
                        success(result);
                        if (finish != undefined) finish(result);

                    }
                } else {
                    //$.loading(false);
                    success(result);
                    if (finish != undefined) finish(result);

                }
            }, 'json');
        }
    }
    //jQuery.getJSON扩展加Token
$.getJsonToken = function(url, data, success, finish) {
    //$.loading(true);
    if (success == undefined) {
        //$.loading(false);
        var param = {
            Token: $.cookie(managerMemory)
        }
        $.getJSON(url, param, function(result) {
            if (result.ResultCode < 0) {
                if (result.ResultCode == -999) {
                    location.href = homeUrl;
                } else {
                    data(result);
                }
            } else {
                data(result);
            }
        }, 'json');
    } else {
        data.Token = $.cookie(managerMemory);
        $.getJSON(url, data, function(result) {
            if (result.ResultCode < 0) {
                //$.loading(false);
                if (result.ResultCode == -999) {
                    location.href = homeUrl;
                } else {
                    success(result);
                    if (finish != undefined) finish(result);

                }
            } else {
                //$.loading(false);
                success(result);
                if (finish != undefined) finish(result);

            }
        }, 'json');
    }
}

//如果为null返回空
var formatNull = function(item) {
    if (item == null || item == 'undefined') {
        return '';
    } else {
        return item;
    }
};

var clearControl = function() {
    $("input[type='text']").val("");
    $("input[type='number']").val("");
    $("input[type='password']").val("");
    $("input[type='email']").val("");
    $("input[type='url']").val("");
    $("input[type='color']").val("");
    $("textarea").val("");
    $("#onlyArea").attr('src', '../Assets/Images/Null.jpg');
    $("select option:first").attr("selected", "selected");
    //$("#tagList").select2('data', []);

};

/**
 * 加载select项
 * @method
 * @param {selector} DOM对象
 * @param {dataSource} 数据源（json格式）
 * @param {datajson} 默认值
 * @return 无
 */
var loadTypeSelect = function(selector, dataSource, datajson) {
    $("<option value=''>请选择</option>").appendTo(selector);
    $.each(dataSource, function(i, item) {
        $("<option value='" + i + "'>" + dataSource[i] + "</option>").appendTo(selector);
    });
    if (datajson != undefined) {
        $(selector).val(datajson);
    }
};
/**
 * 加载radio列表
 * @method
 * @param {selector} DOM外框对象
 * @param {name} radio字段名
 * @param {dataSource} 数据源（json格式）
 * @param {datajson} 默认值
 * @return 无
 */
var loadTypeRadio = function(selector, name, dataSource, datajson) {
    $.each(dataSource, function(i, item) {
        $("<label for='type_" + i + "'><input type='radio' id='" + name + "_" + i + "' name='" + name + "' value='" + i + "' />" + item + "</label>").appendTo(selector);
    });
    if (datajson != undefined) {
        $("#" + name + "_" + datajson).prop("checked", true);
    }
};

//七牛封装单图

var initQiniuOnly = function(selector, datajson, isperson) {
    var btn = $(selector + " .btn-success");
    var img = $(selector + " img");
    var del = $(selector + " .btn-danger");
    var settimetip = null;
    if (isperson) {
        btn = $(selector).parent();
    }
    //单图上传
    var onlyQiniu = new QiniuJsSDK();
    var onlyUploader = onlyQiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: btn[0], //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '10mb', //最大文件体积限制
        flash_swf_url: '../Assets/Plugins/plupload/Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '1mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function(up, file, info) {
                var domain = up.getOption('domain');
                var res = $.parseJSON(info);
                var sourceLink = domain + res.key;
                if (isperson) {
                    $(selector).find("input").val(res.key);
                } else {
                    img.attr("src", sourceLink);
                    img.attr("key", res.key);
                }
                window.clearInterval(settimetip);
                $(selector + " .loading").html("");

                if ($(selector + " .hiddenimg") != undefined) {
                    $(selector + " .hiddenimg").val(res.key);
                }
            },
            'BeforeUpload': function(up, file) {
                var tip = $(selector + " .loading");
                tip.html("文件上传中请等待");
                settimetip = window.setInterval(function() {
                    if (tip.html().length < 20) {
                        tip.html(tip.html() + ">");
                    } else {
                        tip.html('文件上传中请等待');
                    }
                }, 300);
                tip.show();
            },
            'Error': function(up, err, errTip) {
                alert(err);
            },
        }
    });

    if (datajson == null || datajson == "") {
        if (!isperson) {
            img.attr("src", nullImage);
            img.attr("key", "");
        }
    } else {
        img.attr("src", qiniudomain + datajson);
        img.attr("key", datajson);
    }

    //单图上传清空按钮
    //del.unbind("click");
    del.on("click", function() {
        if (img.attr("key") == '') return;
        img.attr('src', nullImage);
        img.attr("key", '');
        $(selector + ' .hiddenimg').val('');
    });
};

//七牛封装多图
var initQiniuMuch = function(selector, fileUploaded, loaded) {
    var btn = $(selector + " .btn-success");
    var del = $(selector + " .btn-danger");
    var settimetip = null;
    var muchQiniu = new QiniuJsSDK();
    var muchUploader = muchQiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: btn[0], //上传选择的点选按钮，**必需**
        uptoken_url: '/Qiniu/GetUptoken?bucket=' + qiniubucket,
        unique_names: true,
        domain: qiniudomain,
        max_file_size: '100mb', //最大文件体积限制
        flash_swf_url: '/Assets/Plugins/plupload/Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '10mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FileUploaded': function(up, file, info) {
                window.clearInterval(settimetip);
                $(selector + " .loading").html("");
                fileUploaded(up, file, $.parseJSON(info), selector);
            },
            'BeforeUpload': function(up, file) {
                var tip = $(selector + " .loading");
                tip.html("文件上传中请等待");
                settimetip = window.setInterval(function() {
                    if (tip.html().length < 20) {
                        tip.html(tip.html() + ">");
                    } else {
                        tip.html('文件上传中请等待');
                    }
                }, 300);
                tip.show();
            },
            'Error': function(up, err, errTip) {
                alert(err);
            },
        }
    });

    if (loaded != undefined) {
        loaded(selector);
    }

    $(selector).delegate("li .btn-danger", "click", function() {
        $(this).parent().parent().remove();
    });

    del.on("click", function() {
        $(this).parent().find("ul li").remove();
    });
};

//标签
var initTagList = function(selector, datajson) {

    if (datajson != null) {
        var tagsJsonList = [];
        var tagsJsoIDs = [];
        $.each(datajson, function(i, field) {
            tagsJsonList[i] = {
                id: field.TagId,
                text: field.Name
            };
            tagsJsoIDs[i] = field.TagId;
        });
        $(selector).select2({
            data: tagsJsonList
        });
        $(selector).val(tagsJsoIDs).trigger("change");
    }

    $(selector).select2({
        ajax: {
            url: "/Tag/GetTagList",
            dataType: 'json',
            delay: 250,
            multiple: true,
            data: function(params) {
                return {
                    name: params.term, // search term
                    pageIndex: 0,
                    pageSize: 10,
                    Token: $.cookie(adminToken)
                };
            },
            processResults: function(data, params) {
                return {
                    results: $.map(data.TagPageList.Items, function(item) {
                        return {
                            id: item.TagId,
                            text: item.Name
                        }
                    })
                };
            },
            cache: false
        },
        tags: true
    });

};

//优酷视频获取
var initVideo = function(id, datajson) {
    $("#" + id + "Btn").on("click", function() {
        var playUrl = $("#" + id + "Url").val();
        $.get("https://openapi.youku.com/v2/videos/show_basic.json?client_id=76df41e5da94c99f&video_url=" + playUrl,
            function(basicdata) {
                if (basicdata != null) {
                    $("#" + id + "Key").val(basicdata.id);
                    $("#" + id + "Url").val(basicdata.link);
                    $("#" + id + "Duration").val(basicdata.duration);

                    $.get("https://openapi.youku.com/v2/videos/show.json?client_id=76df41e5da94c99f&video_id=" + basicdata.id,
                        function(showdata) {
                            $("#" + id + "Thumbnail").val(showdata.bigThumbnail);
                            $("#" + id + "Img").attr("src", showdata.bigThumbnail);
                        });
                }
            });
    });
    if (datajson != null) {
        $("#" + id + "ID").val(datajson.ID);
        $("#" + id + "Key").val(datajson.Key);
        $("#" + id + "Url").val(datajson.Link);
        $("#" + id + "Thumbnail").val(datajson.Thumbnail);
        $("#" + id + "Duration").val(datajson.Duration);
        $("#" + id + "Img").attr("src", datajson.BigThumbnail);
    }
};
//加树的下拉框
var addTreeNode = function(id, parentId, allitems, curId, deleteId) {
    var items = $.grep(allitems, function(item) {
        return item.ParentId == parentId;
    });

    $.each(items, function(i, item) {
        if (item.ArticleCategoryId != deleteId) {
            item.Name = getLevelEmpty(item.Level) + item.Name;
            var style = '';
            if (item.Level % 2 == 1) {
                style = " style='background-color:#efefef;'";
            }
            if (item.ArticleCategoryId == curId) {
                $("<option selected='selected' value='" + item.ArticleCategoryId + "'" + style + " >" + item.Name + "</option>").appendTo("#" + id);
            } else {
                $("<option value='" + item.ArticleCategoryId + "'" + style + " >" + item.Name + "</option>").appendTo("#" + id);
            }
            addTreeNode(id, item.ArticleCategoryId, allitems, curId, deleteId);
        }
    });
};

var getLevelPx = function(level) {
    var withpx = 0;
    if (level > 1) //判断节点深度 大于1就是表示它是子节点
    {
        withpx = (level - 1) * 14; //注意这里是个全角空格
    }
    return withpx;
};

var getLevelEmpty = function(level) {
    var empty = '';
    if (level > 0) //判断节点深度 大于1就是表示它是子节点
    {
        for (var i = 1; i < level; i++) {
            empty += "　"; //全角空格
        }
    }
    return empty;
};

//左侧菜单选中 sidebar-menu
var sidebarMenu = function() {
    $(".sidebar-menu > li").removeClass("active");
    $(".treeview-menu li").removeClass("active");
    $(".treeview-menu li a span").each(function(index) {
        var name;
        if ($(".breadcrumb li").eq(2).find("a").length == 0) {
            name = $(".breadcrumb li").eq(2).html();
        } else {
            name = $(".breadcrumb li").eq(2).find("a").html();
        }
        if ($(this).html() == name) {
            $(this).parent().parent().toggleClass("active");
            $(this).parent().parent().parent().parent().toggleClass("active");
        }
    });
};
sidebarMenu();

//排序事件
var tableSort = function(mark, complete) {
    $(".table-custom thead th[class]").on("click", function() {
        if ($(this).attr("class") === "sorting") {
            $(".table-custom thead th[class]").attr("class", "sorting");
            mark.updateList({
                "propertyName": $(this).attr("propertyName"),
                "ascending": true
            });
            $(this).attr("class", "sorting_asc");
        } else if ($(this).attr("class") === "sorting_asc") {
            mark.updateList({
                "propertyName": $(this).attr("propertyName"),
                "ascending": false
            });
            $(this).attr("class", "sorting_desc");
        } else if ($(this).attr("class") === "sorting_desc") {
            mark.updateList({
                "propertyName": $(this).attr("propertyName"),
                "ascending": true
            });
            $(this).attr("class", "sorting_asc");
        }
        complete();
    });
}

//输入框的格式验证
var regexEnum = {
    intege: "^-?[1-9]\\d*$", //不为0的整数
    intege1: "^[1-9]\\d*$", //大于0的正整数
    intege2: "^-[1-9]\\d*$", //小于0的负整数
    intege3: "^([1-9]\\d{0,1}|100)$", //大于0小于等于100的整数
    num: "^([+]?)\\d*\\.?\\d+$", //大于等于0的数字。
    num1: "^[0-9]\\d*$", //大于等于0正整数
    num2: "^-[0-9]\\d*$", //小于等于0的负整数

    decmal: "^([+-]?)\\d*\\.?\\d+$", //浮点型数字
    decmal1: "^[1-9]\\d*.\\d*|0.?\\d*[1-9]\\d*$", //正浮点型数字
    decmal2: "^-([1-9]\\d*.\\d*|0.?\\d*[1-9]\\d*)$", //负浮点型数字

    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）

    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    color: "^[a-fA-F0-9]{6}$", //颜色
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", //仅中文
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    zipcode: "^\\d{6}$", //邮编
    mobile: "^(13|15|18|17)[0-9]{9}$", //手机
    tels: "^(13|15|18|17)[0-9]{9}$", //手机
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
    notempty: "^\\S+$", //非空
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
    rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
    date: "^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$", //日期
    qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{1,4}))?$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
    tel1: "(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})",
    username: "^\\w+$", //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
    letter: "^[A-Za-z]+$", //字母
    letter_u: "^[A-Z]+$", //大写字母
    letter_l: "^[a-z]+$", //小写字母
    idcard: "^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
    courier: "^[0-9]{9,12}$", //快递订单号
    license: "/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/", //车牌号
    illega: "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'、？%null]" //非法字符
}

//字符串全部替换方法
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}