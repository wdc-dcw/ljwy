var singer = function () {
    //个人信息
    this.singer_info = function () {
        
        isLogin();
        //验证表单是否改变
        var checkForm=true;
        //真实姓名
        var initNameValue;
        //昵称
        var initNickNameValue;
        //添加房屋的标识
        var addHouseFlag=false;
        //删除房屋的标识
        var deleteHouseFlag=false;
        //加载数据显示到页面
        //添加房屋信息       
        $(".last").click(function () {
            $(this).parent().parent().find("#roomNumber").show();
            var one_main = $(".one_main").val();
            var secend_main = $(".secend_main").val();
            preCheckFormatHouse("formHouse");
            if(checkUnNull==true){
                 $(this).parent().parent().find("#roomNumber").show();
                 $("#roomNumber").append('<div class="post_car room_num" buildingNum="' + one_main + '" roomCode="' + secend_main + '">羽山路383弄' + one_main + '号<a>删除</a><span class="roomnum">' + secend_main + '室</span></div>');
                    addHouseFlag=true;
                    $(".one_main").val("");
                    $(".secend_main").val("");
            }else{
                addHouseFlag=false;
            }
           
            
            
                
                
            
        });
        //删除
        $("#roomNumber").delegate("a", "click", function () {
            $(this).parent(".post_car").remove();
            deleteHouseFlag=true;

        });

        //添加车牌车位信息
        /*$(".lasts").click(function () {
            $(this).parent().parent().find("#carNumber").show();
            var parkNum = $(".parkNum").val();
            var carNum = $(".carNum").val();
                preCheckFormatCar("formCar")
                if(checkUnNull==true){
                    $("#carNumber").append(' <div class="post_car car_color"  carnum="' + carNum + '"parkNum="' + parkNum + '">' + carNum + '<a>删除</a><span class="parknum">' + parkNum + '</span></div>');
                    $(".parkNum").val("");
                    $(".carNum").val("");
                    addCarFlag=true;
                }else{
                    addCarFlag=false;
                }   
            
        });
        //删除
        $("#carNumber").delegate("a", "click", function () {
            $(this).parent(".car_color").remove();
            deleteCarFlag=true;


        });*/
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
                $("#sumscore").text(result.resultObject.score);
                $("#todayscore").text(result.resultObject.todayScore);
                $("#name").val(result.resultObject.name);
                if(result.resultObject.headimgurl!=""){
                	$("#nickName").val(result.resultObject.nickName);
                	$("#headImgDiv").empty().append('<img src="'+result.resultObject.headimgurl+'" >');
                }else{
                	$("#nickName").val("美丽苑业主");
                	$("#headImgDiv").empty().append('<img src="Assets/Images/singer.png" >');
                }
                /*if (result.resultObject.image != "" && result.resultObject.image !=null) {
                }
                window.location.href = "updateimage://" + encodeURI(JSON.stringify({ mobile: JSON.parse(eval($.cookie(managerMemory))).mobile, image: imgdomain + result.resultObject.image }));*/
                $.each(result.resultObject.rooms, function (i, item) {
                    var roomcode = item.roomCode;
                    $('<div class="post_car room_num" buildingNum="' + roomcode.split("-")[1] + '" roomCode="' + roomcode.split("-")[2] + '">羽山路383弄' + roomcode.split("-")[1] + '号<a>删除</a><span class="roomnum">' + roomcode.split("-")[2] + '室</span></div>').appendTo("#roomNumber")
                });
               /* $.each(result.resultObject.parks, function (i, item) {
                    $('<div class="post_car car_color"carnum="' + item.carNo + '"parkNum="' + item.parkNo + '">' + item.carNo + '<a>删除</a><span class="parknum">' + item.parkNo + '</span></div>').appendTo("#carNumber")

                });*/
                initNameValue=result.resultObject.name;
                initNickNameValue=result.resultObject.nickName;
                // $("#click_1").click(function () {
                //     $("#roomNumber").parent().find("#roomNumber").animate({ height: 70 + "px" }, 1000);
                // });
                // $("#click_2").click(function () {
                //     $("#carNumber").parent().find("#carNumber").animate({ height: 70 + "px" }, 1000);
                // });
                
            }
            else {
                if(result.messageCode==2){
                    location.href="login.html";
                }else{
                    getBomBbox(result.message);
                }
                
            }
        });

            //验证表单是否改变
            function checkFormChange (formId){
                var newValues =$("input[type]");
                if(newValues.length==0){
                    checkForm=false;
                    return true;
                }
                  //真实姓名的值
                    newNameValue=$("#name").val();
                    //昵称的值
                    newNickNameValue=$("#nickName").val();
                   
                            if(initNameValue==newNameValue && initNickNameValue == newNickNameValue //
                                && addHouseFlag==false && deleteHouseFlag==false){
                                getBomBbox("亲~你还没做任何改变哟");
                                checkForm=false;
                                return false;
                            }else{
                               checkForm=true;
                               return true; 
                            }
                        
            }

       
        $(".submit").on("click", function () {
            preCheck("formInfo");
            checkFormChange("formInfo");
            if(checkUnNull==true && checkForm==true){
                var paramsJson = {
                    mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                    name: $("#name").val(),
                    nickName: $("#nickName").val(),
                    building: [],
                    image:""
                }
                //房屋信息
                $.each($("#roomNumber .post_car"), function (i, item) {
                    paramsJson.building.push({ "buildingNum": $(this).attr("buildingNum"), "roomCode": $(this).attr("roomCode") });
                })
                $(".images").find("img"), function () {
                    if ($(".images").find("img") != null) {
                        paramsJson.images.push("name");
                    }
                }
                //车辆信息
                /*$.each($("#carNumber .car_color"), function (i, item) {
                    paramsJson.parks.push({ "parkNum": $(this).attr("parkNum"), "carNum": $(this).attr("carnum") });
                })*/
                var data = {
                    secretKey: "mobileSecretKey1234567890",
                    opt: "editUserInfo",
                    params: JSON.stringify(paramsJson)
                }
                $.post(interfaceApi, data, function (result) {
                    var result = JSON.parse(result);
                    if (result.messageCode == 1) {
                        getBomBbox(result.message);
                        setTimeout(function () { location.href = "singer_info.html"; }, 1000)
                        
                    } else {
                        if(result.messageCode==2){
                            location.href="login.html";
                        } else {
                           getBomBbox(result.message); 
                        }
                        
                    }
                });
            }else{

            }
        });

    }
    

}

