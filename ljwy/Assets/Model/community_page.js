/*社区黄页列表*/
var communityYellowPage=function(){
	/*加载页面*/
	this.communityYellowPageList=function(){
		information();
		var paramsJson = {
	            code: "SQHY",
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
							 $('<a href="bank.html?id='+item.id+'"><div class="page_list"><p><img src="'+imgdomain+item.image+'" /></p><p>'+item.nameCn+'</p></div></a>').appendTo(".page_main");
			                 
			                });
					}else{
				      getBomBbox(result.message);
				      
					}
			   })
	}
}