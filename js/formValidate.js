//-----------------------form validate---------------------------------
/**
 * 表单提交前的校验
 */
var isCheck = true;//是否进行表单校验
var dtoId = "";//根据dtoId的值判断是新增还是修改(如果过action中没有dto对象，可为dtoId随便赋值，则表示当前操作为修改操作)
var isAdmin = false;//是否为后台维护(只有后台维护修改页面才会判断表单有没有变化)
var isFormSubmit = true;//是否是提交form(流程则不是提交form)
function preCheck(formId){
	if(dtoId == ""){
		dtoId = $("input[name='dto.id']").val();
		if(dtoId == null)dtoId="";
	}
	// 表单元素变化校验
	if(dtoId != "" && isAdmin){
		Audit.newValueFields = Audit.getValueFields($("#" + formId).find(":input:not(:hidden,:disabled)"));
		Audit.setContents(Audit.oldValueFields, Audit.newValueFields);
		if(Audit.contents.length == 0){
			openMsgWindow(getMessage("CMN0024","提交"));//"信息代码:Msg104,表单没有变化!"
			return false;
		}
	}
	if(isCheck){
		if(formCommonCheck(formId)==false || (typeof otherCheck!=='function' || otherCheck())==false){
			return false;
		}
	}
	
	if(true){
		$("#"+formId+"")[0].submit();
	}else{
		
		//设置信息变更
		Audit.dom = $("#"+formId+"");
		if(isFormSubmit){
			Audit.callServer=function(e){
				$("#"+formId+"")[0].submit();
			};
		}else{
			Audit.setCallServer(formId);
		}
		if(dtoId == ""){
			Audit.content = windowName+"被创建";
			Audit.optType = "CREATE";
			Audit.open('【'+windowName+'】确认');
		}else{
			Audit.content = windowName+"被修改";
			Audit.optType = "UPDATE";
			Audit.open('【'+windowName+'】确认');
		}
	}
}


/**
 * 表单校验
 * 主要判断是否输入或者格式错误
 * formID:表单ID
 * 校验成功返回true，失败返回false
 */
function formCommonCheck(formID){
	var check=true;
	var fields = $('#'+formID).find(':input:not(:hidden,:disabled)');
	if(fields.length>=200) {
		return eachFieldBigPage(fields,false);
	} else {
		return eachField(fields,false);
	}
}

function eachField(fields,flag){
    var check=true;
    if(fields.length==0){
    	return true;
    }
	jQuery.each(fields, function(i,item){
		var id = $(this).attr("id");
		var label = $(this).attr("labelTxt");
		if(label != null){
			if(label.indexOf("ID") >= 0 && label.substring(label.length-2) == "ID"){
				label = label.substring(0,label.length-2);
			}
		}
		var require = $(this).attr("require");
		var format = $(this).attr("format");
		var maxlength = $(this).maxlength;
	     
		var type = $(this).attr("type");
		if(type ==  undefined ){
			type = this.type; 
		}
	     
		if(type == "hidden" ||  $(this).attr("disabled") == "disabled" ||  $(this).attr("disabled") == "true"){
			return true;
		}
		
		if($(this).css("display")=="none"){
			return true;
		}
 
	     var value = $(this).val();
	     if (type=="text" || type=="textarea") {
	    	 	value = $(this).val();
	     } else if(type=="radio") {
	    	 value =  $("input[name='" +  $(this).attr("name") + "']:checked").val();
	     } else if(type=="select-one") {
	    		value = $(this).val();
	    		if(value=="请选择"){
	    			value="";
	    		}
	     } else if(type=="checkbox") {
	    	 	value = "";
	    	 	$("[name='"+$(this).attr("name")+"']").each(function(j,f){
	    	 		if(f.checked == true){
	    	 			value += $(this).val()+",";
	    	 		}
	    	 	});
 
	     } else if(type=="select-multiple") {
	    	 value = $(this).val();
	    	 if(value == null){
	    		 value = "";
	    	 }
	    	 var temp ="";
	    	 for(var i = 0 ;i<value.length;i++){
	    		 temp += value[i];
	    	 }
	    	 value = temp;
	     } 
	     value = $.trim(value);
	     if ($(this).next().length > 0 && $(this).next().children().children().attr("id")=="errInfoTip") {
	    	 $(this).next().remove();
	     }
	     
	    // 是否为空判断
	     if (require == "true" && (value ==null||value=="" || value==0.0)) {
	    	 //alert(label+"不能为空!");
	    	 check = false;
		    	
	    	 if(type=="select-multiple"){
	    		 $(this).addClass("select_04red");
	    	 }else if(type=="textarea"){
	    		 $(this).addClass("textarea_01red");		    		
	    	 }else{
	    		 $(this).addClass("input_06");
	    	 }
		    	
	    	 if(flag==true) {//弹出框的校验
	    		 $(this).after("<div class=\"clear\"><div><span id=\"errInfoTip\" class=\"color_01\">"+label+"不能为空!"+"</span>");
	    	 } else {
	    		 try{
	    			 item.focus();
	    		 }catch(e){
			    			
	    		 }
	    		 if(typeof parent.openMsgWindow==='function'){
	    			 parent.openMsgWindow(getMessage("CMN0001",[label]));//"信息代码:Msg101,"+label+"不能为空!"
	    		 }else{
	    			 openMsgWindow(getMessage("CMN0001",[label]));//"信息代码:Msg101,"+label+"不能为空!"
	    		 }
	    	 }
	    	 return false;
	     } else {		    	
	    	 if(type=="select-multiple"){
	    		 $(this).removeClass("select_04red");
	    	 }else if(type=="textarea"){
	    		 $(this).removeClass("textarea_01red");
	    	 }else{
	    		 $(this).removeClass("input_06");
	    	 }		    	
	    	 check = true;
	     }    
	    
	 	if(value instanceof Array){
	 		
	 	}else{
	 		if (type!="hidden" && maxlength != undefined) {
	 			
	 			maxlength = maxlength/2;
	 			
	 			if(getLength(value)>maxlength){
	 				if(typeof parent.openMsgWindow==='function'){
		    			 parent.openMsgWindow(getMessage("CMN0002",[label,maxlength,maxlength*2]));//"信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
		    		}else{
		    			 openMsgWindow(getMessage("CMN0002",[label,maxlength,maxlength*2]));// "信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
		    		}
	 				item.focus();
	 				check = false;
	 				return false;
	 			}
		    }else{		    	
		    	if(type=="text") {
			    	maxlength = 120;
			    }			    
			    if(type=="textarea") {
			    	maxlength = 1600;
			    }			    
			    if(getLength(value)>maxlength){
			    	
			    	maxlength = maxlength/2;
			    	
			    	if(typeof parent.openMsgWindow==='function'){
		    			 parent.openMsgWindow(getMessage("CMN0002",[label,maxlength,maxlength*2]));//"信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
		    		}else{
		    			openMsgWindow(getMessage("CMN0002",[label,maxlength,maxlength*2]));//"信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
		    		}
		    		item.focus();
		    		check = false;
		    		return false;
	    	    }		    	
		    }
	 	}
	 	// 格式判断
	 	if((value!=null && $.trim(value)!="") && (format!=undefined && format!="")){
	    	var regexpress = eval("regexEnum."+format);
	    	var reg = new RegExp(regexpress);
	    	if(!reg.test(value)){
	    		var aMsg = "";
	    		if(format == "intege"){
	    			aMsg = getMessage("CMN0003",[label]);
	    		} else if(format == "intege1"){
	    			aMsg = getMessage("CMN0004",[label]);
	    		} else if(format == "intege2"){
	    			aMsg = getMessage("CMN0005",[label]);
	    		} else if(format == "num"){
	    			aMsg = getMessage("CMN0006",[label]);
	    		} else if(format == ""){
	    			aMsg = getMessage("Msg119",[label]);
	    		} else if(format == "num1"){
	    			aMsg = getMessage("CMN0007",[label]);
	    		} else if(format == "num2"){
	    			aMsg = getMessage("CMN0008",[label]);
	    		} else if(format == "decmal"){
	    			aMsg = getMessage("CMN0009",[label]);
	    		} else if(format == "decmal1"){
	    			aMsg = getMessage("CMN0010",[label]);
	    		} else if(format == "decmal2"){
	    			aMsg = getMessage("CMN0011",[label]);
	    		} else{
	    			aMsg = getMessage("CMN0025",[label]);
	    		}
	    		
	    		if(typeof parent.openMsgWindow==='function'){
	    			 parent.openMsgWindow(aMsg);//"信息代码:Msg103,"+label+"格式不正确!"
	    		}else{
	    			openMsgWindow(aMsg);//"信息代码:Msg103,"+label+"格式不正确!"
	    		}
	    		item.focus();
	    		check = false;
	    		$(this).addClass("input_06");
	    		return false;
	    	}
	 	} else {
	 		check = true;
	 		$(this).removeClass("input_06");
	 	}
   });
	return check;
}

//超大页面的特殊处理
function eachFieldBigPage(fields,flag){
    var check = true;
    if(fields.length==0){
    	return true;
    }
    
    var _tagTxt = '';
	jQuery.each(fields, function(i,item){
		var id = $(this).attr("id");
		var name = $(this).attr("name");
		var label = $(this).attr("labelTxt");
		if(label && label.substring(label.length-2)=="ID"){
			label = label.substring(0,label.length-2);
		}
		var require = $(this).attr("require");
		var format = $(this).attr("format");
		var maxlength = $(this).maxlength;
		if(!maxlength) {
			maxlength = $(this).attr("maxlength");
		}
		var type = $(this).attr("type");
		if(!type){
			type = this.type;
		}
		
		if (label && label.substring(label.length-6)!='SKIPID' && (type=='text' || type=='textarea' || require=='true')) {
			if(!require) {require = 'false';}
			if(_tagTxt.length>0) {_tagTxt += ',';}
			_tagTxt += name+':'+label+':'+require+':'+type;
		}
	});
	
	$('#recorderForm').find('#S_01_01_TAG_ITEM_TXT').remove();
	$('div[id^=area]:last').append('<input type="hidden" name="S_01_01_TAG_ITEM_TXT" id="S_01_01_TAG_ITEM_TXT" value="'+_tagTxt+'">');
	
	$.ajax({
		type: 'POST',
    	url: $("[name=urlPrefix]").val()+'-ajax.action?method=checkPage&dto.recorderId='+$("[name='dto.recorderId']").val(),
    	data: $('div[id^=area]').find(':input').serializeArray(),
    	dataType: 'json',
    	async:false,
    	success: function(data){
    		if(data.checkResultLength>0) {
    			$.each(data.checkResultList,function(j,checkResult){
    				if(check) {
    					var _results = checkResult.split(':');
    					if(_results[3]=='bigVal') {
    						if(_results[2]=="textarea"){
        						$('[name='+_results[0]+']').addClass("textarea_01red");		    		
        					}else{
        						$('[name='+_results[0]+']').addClass("input_06");
        					}
        					var _maxlength = _results[2]=='textarea' ? 800:60;
        					if(getLength($('[name='+_results[0]+']').val())>_maxlength){
        						
        		 				if(typeof parent.openMsgWindow==='function'){
        		 					parent.openMsgWindow(getMessage("CMN0002",[_results[1],_maxlength,_maxlength*2]));//"信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
        			    		}else{
        			    			openMsgWindow(getMessage("CMN0002",[_results[1],_maxlength,_maxlength*2]));// "信息代码:Msg102,"+label+"的长度不能超过"+(maxlength/2)+"个中文字!"
        			    		}
        		 				$('[name='+_results[0]+']').focus();
        		 				check = false;
        		 			}
        				} else if(_results[3]=='nullVal') {
        					if( _results[2]=="select-multiple"){
        						$('[name='+_results[0]+']').addClass("select_04red");
        					}else if(_results[2]=="textarea"){
        						$('[name='+_results[0]+']').addClass("textarea_01red");		    		
        					}else{
        						$('[name='+_results[0]+']').addClass("input_06");
        					}
    						$('[name='+_results[0]+']').focus();
    						if(typeof parent.openMsgWindow==='function'){
    							parent.openMsgWindow(getMessage("CMN0001",[_results[1]]));//"信息代码:Msg101,"+label+"不能为空!"
    						}else{
    							openMsgWindow(getMessage("CMN0001",[_results[1]]));//"信息代码:Msg101,"+label+"不能为空!"
    						}
    						check = false;
        				} else {
        					if(_results[2]=="select-multiple"){
        						$('[name='+_results[0]+']').removeClass("select_04red");
        					}else if(_results[2]=="textarea"){
        						$('[name='+_results[0]+']').removeClass("textarea_01red");
        					}else{
        						$('[name='+_results[0]+']').removeClass("input_06");
        					}
        				}
    				}
    			});
    		} else {
    			check = true;
    		}
    		$('#recorderForm').find('#S_01_01_TAG_ITEM_TXT').remove();
    	}
	});
	return check;
}

/**
 * 获得字符串实际长度，中文2，英文1
 * @param str 要获得长度的字符
 * @returns {Number}
 */
function getLength(str) {
   var realLength = 0, len = str.length, charCode = -1;
   for (var i = 0; i < len; i++) {
       charCode = str.charCodeAt(i);
       if (charCode >= 0 && charCode <= 128) realLength += 1;
       else realLength += 2;
   }
   return realLength;
}

var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 

function isCardID(sId){ 
		var iSum=0 ;
		var info="" ;
		if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误"; 
		sId=sId.replace(/x$/i,"a"); 
		if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法"; 
		sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
		var d=new Date(sBirthday.replace(/-/g,"/")) ;
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法"; 
		for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		if(iSum%11!=1) return "你输入的身份证号非法"; 
		return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女") 
} 




//短时间，形如 (13:04:06)
function isTime(str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {return false}
	if (a[1]>24 || a[3]>60 || a[4]>60)
	{
		return false;
	}
	return true;
}

//短日期，形如 (2003-12-05)
function isDate(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}

//长时间，形如 (2003-12-05 13:04:06)
function isDateTime(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null) return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

var regexEnum =  {
		intege:"^-?[1-9]\\d*$",					//不为0的整数
		intege1:"^[1-9]\\d*$",					//大于0的正整数
		intege2:"^-[1-9]\\d*$",					//小于0的负整数
		intege3:"^([1-9]\\d{0,1}|100)$",		//大于0小于等于100的整数
		num:"^([+]?)\\d*\\.?\\d+$",			    //大于等于0的数字。
		num1:"^[0-9]\\d*$",					    //大于等于0正整数
		num2:"^-[0-9]\\d*$",					//小于等于0的负整数
		
		decmal:"^([+-]?)\\d*\\.?\\d+$",			//浮点型数字
		decmal1:"^[1-9]\\d*.\\d*|0.?\\d*[1-9]\\d*$",    	//正浮点型数字
		decmal2:"^-([1-9]\\d*.\\d*|0.?\\d*[1-9]\\d*)$",  //负浮点型数字
		
		decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
		decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",     //非负浮点数（正浮点数 + 0）
		decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",    //非正浮点数（负浮点数 + 0）

		email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
		color:"^[a-fA-F0-9]{6}$",				//颜色
		url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
		chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
		ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
		zipcode:"^\\d{6}$",						//邮编
		mobile:"^(13|15|18)[0-9]{9}$",				//手机
		ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
		notempty:"^\\S+$",						//非空
		picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
		rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
		date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
		qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
		tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{1,4}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
		tel1:"(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})",
		username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
		letter:"^[A-Za-z]+$",					//字母
		letter_u:"^[A-Z]+$",					//大写字母
		letter_l:"^[a-z]+$",					//小写字母
		idcard:"^[1-9]([0-9]{14}|[0-9]{17})$"	//身份证
}

//字符串全部替换方法
String.prototype.replaceAll = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}
	 