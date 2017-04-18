/*社区公告*/
var notice=function(){
  this.notices=function(){ 
	      /*提交要做的事*/

      $(window).on("load", function () {

			var data={
				secretKey:"mobileSecretKey1234567890",
				opt:"getNoticeOrActiveList",
				params: '{"mobile":"' +$("#mobile").val() +'","pageSize":"'+$("#pageSize").val()+'","gotoPage":"'+$("#gotoPage").val()+'","type":"'+$("#type").val()+'"}'};
			$.post(interfaceApi, data, function (result) {
	   if(result.messageCode==1){
		   
		   }
		   else{
			   alert(result.message);
			   }							
					});
			});
	}
  }
