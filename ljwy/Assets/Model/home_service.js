/*家政服务*/
var home_service=function(){
	/*加载页面*/
	this.homeServiceList=function(){
		information();
		var paramsJson = {
	            code: "JZFW",
	        }
			var data={
					secretKey:"mobileSecretKey1234567890",
					opt:"getKbnList",
					params: JSON.stringify(paramsJson)
				}

			$.post(interfaceApi, data, function (result) {
					var result = JSON.parse(result);
					if(result.messageCode==1){
						 $.each(result.resultObject, function (i, item) {
							 $('<a href="nanny_service.html?id='+item.id+'"><div class="server"><div class="server_left"><img src="'+imgdomain+item.image+'" />'+item.nameCn+'</div><div class="server_right"><img src="Assets/Images/right.png" /></div></div></a>').appendTo(".home");
			                    
			                });
	                    
					}else{
				      getBomBbox(result.message);
					}
			   });
	}
}