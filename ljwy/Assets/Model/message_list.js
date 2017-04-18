/*消息列表*/
var message=function(){
    /*获取参数*/
    this.messageList=function(){
        //判断是否登录
        isLogin();
        var paramsJson = {
            mobile:JSON.parse(eval($.cookie(managerMemory))).mobile ,
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "myNewMessages",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                if(result.resultObject.length>0){
                    var listhtml="";
                    var linkHtml="";
                    $.each(result.resultObject, function (i, item) {
                        if (item.type == "1") {
                            $(".list").append("<a href='community_detail.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/gonggao.png' /></div><div class='particulars'><p class='title'>物业公告</p><p>"+item.title+"</p></div></div></a>");
                            
                            }else if(item.type=="2"){
                                $(".list").append("<a href='activity_detail.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/huodong.png' /></div><div class='particulars'><p class='title'>物业活动</p><p>" + item.title + "</p></div></div></a>");
                            }else if(item.type=="3"){
                                $(".list").append("<a href='recommend_detail.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/tuijian.png' /></div><div class='particulars'><p class='title'>推荐</p><p>" + item.title + "</p></div></div></a>");
                            } else if(item.type=="4"){
                                $(".list").append("<a href='topic_details.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/notice_01.png' /></div><div class='particulars'><p class='title'>个人话题</p><p>" + item.title + "</p></div></div></a>");
                            }  else if(item.type=="5"){
                                $(".list").append("<a href='personal_activities_details.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/notice_02.png' /></div><div class='particulars'><p class='title'>个人活动</p><p>" + item.title + "</p></div></div></a>");
                            }  else if(item.type=="6"){
                                $(".list").append("<a href='second_mark.html?id=" + item.postId + "'><div class='source'><div class='left'><img src='Assets/Images/singerbg_07.png' /></div><div class='particulars'><p class='title'>二手商品</p><p>" + item.title + "</p></div></div></a>");
                            }        
                    });
                }else{
                    $(".nullimg").show();
                }
                    //var zonghtml= listhtml+"</div>";
                    //$(".list").append(zonghtml);
            }
            else if(result.messageCode==2){
                location.href="login.html";
            }
            else {
                    getBomBbox(result.message);
                    $(".nullimg").show();
            }
        });
    }
}