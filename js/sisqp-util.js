//大于0的数
function checkOverNum(thisTag){
	var num = $(thisTag).val();
	if(num!=''){
		var reg = new RegExp("^[1-9]\\d*.\\d*|^[0].\\d*|^[1-9]\\d*$");
		if(!reg.test(num)){
			alert("信息代码:Msg004,只能输入大于0的数字;后续操作:请输入大于0的数字.");
			$(thisTag).val('');
			return false;
		}
	}
}

//大于等于0的数
function checkOverAndNum(thisTag){
	var num = $(thisTag).val();
	if(num!=''){
		var reg = new RegExp("^[1-9]\\d*.\\d*|0|^[0].\\d*|^[1-9]\\d*$");
		if(!reg.test(num)){
			alert("信息代码:Msg005,只能输入大于或者等于0的数字;后续操作:请输入大于或者等于0的数字.");
			$(thisTag).val('');
			return false;
		}
	}
}

//是不是数字
function checkIsNum(thisTag){
	var num = $(thisTag).val();
	if(num!=''){
		if(isNaN(num)){
			alert("信息代码:Msg001,只能输入数字;后续操作:请输入数字.");
			$(thisTag).val('');
			return false;
		}
	}
}

//只能输入正整数
function checkPositiveNum(thisTag){
	var num = $(thisTag).val();
	if(num!=''){
		if((isNaN(num)) || parseInt(num)<=0){
			alert("信息代码:Msg002,只能输入正整数;后续操作:请输入正整数.");
			$(thisTag).val('');
			return false;
		}else{
			var abc = /^(\+|-)?\d+$/;
			if(!abc.test(num)||num.indexOf("0")==0){
				alert("信息代码:Msg002,只能输入正整数;后续操作:请输入正整数.");
				$(thisTag).val('');
				return false;
			}
		}	
	}
} 