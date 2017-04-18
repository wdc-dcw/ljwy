/*公告活动*/
var announcement=function(){
	/*加载页面*/
	this.announcementList=function(){
		var paramsJson={
			pageSize:"4",
			gotoPage:"1"
		}
		var data={
			secretKey:"mobileSecretKey1234567890",
			opt:"noticeAndActive",
			params:JSON.stringify(paramsJson)
		}
		$.post(interfaceApi, data, function (result) {
				var result = JSON.parse(result);
				if(result.messageCode==1){
					if(result.resultObject[0].length>0){
						//$('<a href="community.html">更多</a>').appendTo(".more_notice");
					}
					if(result.resultObject[1].length>0){
						//$('<a href="community_activities.html">更多</a>').appendTo(".more_activity");
					}
					$.each(result.resultObject[0],function(i,item){
						
						//公告的列表
					    $('<a href="community_detail.html?id=' + item.id + '"><div class="announcement"><div class="list_title"><span><img src="Assets/Images/orange.png" />' + item.name + '</span></div><div class="list_release"><span>' + item.createTime + '</span></div></div></a>').appendTo(".announcementList");
									
					});
					$.each(result.resultObject[1],function(i,item){
						//活动的列表
					    $('<a href="activity_detail.html?id=' + item.id + '"><div class="activity"><div class="list_title"><span><img src="Assets/Images/blue.png" />' + item.name + '</span></div><div class="list_release"><span>' + item.createTime + '</span></div></div></a>').appendTo(".activityList");
					});
				}else{
			      getBomBbox(result.message);
				}
		   })
	}
}

