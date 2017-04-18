<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<style type="text/css">
.input_blur{background:#fcc; border:1px solid #ff6a6a; line-height:20px; color:#666;}
</style>
<a href="#messages" rel="modal" class="blue" id="auditWin"></a>
<div id="messages" style="display: none;">
	<div class="nav" style="padding: 0;">
		<img src="${path}/images/topicon10.gif" /> >> <b id="cmtTitle">信息变更确认</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px">
		    <div id="changeDiv"></div>
			<table width="350px" border="0" cellspacing="0" cellpadding="0" class="table_box_ff">
				<c:if test="${lockWorkflow}">
					<tr id="auditHidDiv">
						<td width="100" class="td4">
							<span>解锁日期</span><b><font class="ff6600">*</font></b>
						</td>
						<td>
							<input type="text" id="wfUnlockDate" name="wfUnlockDate" value="<fmt:formatDate value="${dto.expireDate}" pattern="yyyy-MM-dd"/>" 
								class="inputDate" maxlength="120" onclick="WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'});"/>
							<div id="dto.expireDateTip" class="color_01"></div>
						</td>
					</tr>
				</c:if>
				<tr>
					<td width="100" class="td4">
						<span>说明</span><b><font class="ff6600">*</font></b>
					</td>
					<td width="250">
						<textarea id="cntReason" name="dto.cntReason" cols="35" rows="4" class="input_05" maxlength="2000"
							onblur="Audit.check(1);$('#facebox #cntReason').css('background','');" onfocus="$('#facebox #cntReason').css('background','#ffffcc');"></textarea>
						<div id="cntReasonTip" class="color_01"></div>
					</td>
				</tr>
				<tr style="padding-left: 9px; border-top: 0px">
					<td  class="td7" style="padding-left: 9px; border-right: 1px" colspan="2">
						<b>电子签名 ( E-signature)</b>
					</td>
				</tr>
				<tr>
					<td width="100" class="td4">
						 用户名 <b><font class="ff6600">*</font></b>
					</td>
					<td>
						<input name="cntUserId" type="hidden" id="cntUserId" style="width: 220px;" maxlength="50" value="<sec:authentication property="principal.usernm"/>" />
						<input name="keyUserId" type="text" class="input_04" id="keyUserId" style="width: 220px;" onblur="Audit.check(2);" maxlength="50" value="" />
						<div id="cntUserIdTip" class="color_01"></div>
					</td>
				</tr>
				<tr>
					<td class="td4">
					 密码 <b><font class="ff6600">*</font></b>
					</td>
					<td >
						<input name="cntPwd" type="password" class="input_04" id="cntPwd" style="width: 220px;" onblur="Audit.check(3);" onkeydown="onEnterKey()" maxlength="20" value="" />
						<div id="cntPwdTip" class="color_01"></div>
					</td>
				</tr>
			</table>
		</fieldset>
		<input type="hidden" name="cntUsbKey" id="cntUsbKey" />
	</div>
	<p class="text_01">
		<label><input id="checkList" type="checkbox" onclick="$('#facebox').find('#saveBtn').removeAttr('disabled');"/> 我同意遵守此系统使用协议。</label><a href="${pageContext.request.contextPath}/help/xieyi.jsp" target="_blank">查看协议</a>。
	</p>
	<div class="table01" style="padding: 0 0 9px 0;">
		<a id="auditCancel" title="取消修改" href="###" class="gray" onClick="Audit.cancel();return false;">取消</a>
		<a id="saveBtn" title="提交" href="###" class="gray" onClick="Audit.save(this);return false;">提交</a>
		<!-- 	<input type="button" id="saveBtn"  href="###" class="blue" value="提交" onclick="Audit.save(this);return false;"> -->
		 
	</div>
</div>
<script type="text/javascript" charset="UTF-8">
/*****************信息变更确认 开始*****************/
 
var Audit = {};
Audit.oldSerialValue;
Audit.newSerialValue;
Audit.oldValueFields;
Audit.newValueFields;

Audit.dom;//提交表单中的某一个dom (如：form,div)
Audit.callServer;//执行变更的js方法
Audit.contents;//修改的字段信息
Audit.content;//操作做类型(XXX被修改)
Audit.isSessionUser = true;//必须是当前登录用户签名
Audit.userId;//签名用户Id
Audit.roleId;//签名用户较色

Audit.user;
Audit.pwd;
Audit.reason;

/**
 * 打开信息变更确认窗口
 */
Audit.open = function(cmtTitle) {
	if("${workflowPage}" != "editInput") { // 非流程功能
		Audit.newValueFields = Audit.getValueFields($("#" + formId).find(":input:not(:hidden,:disabled)"));
	}
	
	if( typeof(isFlowFlag) != "undefined" && isFlowFlag == false  ) { // 流程修改功能
		Audit.newValueFields = Audit.getValueFields($("#" + formId).find(":input:not(:hidden,:disabled)"));
	}

	$("#auditWin").click();
	if (cmtTitle != null) {
		$("#facebox").find("#cmtTitle").html(cmtTitle);
	}

	Audit.createContent();
};

//校验非sessionUser
Audit.unSessionUserCheck = function(userId){//如果要对签名用户做其它判断,请重写该方法
	return true;
};

/**
 * 校验
 */
 
Audit.reCheckUserMsg = "复核人员";
Audit.check = function(index) {
	Audit.user = $('#facebox').find('#keyUserId').val();
	Audit.pwd = $('#facebox').find('#cntPwd').val();
	Audit.reason = $('#facebox').find('#cntReason').val();

	var check = true;
	if (!Audit.reason || $.trim(Audit.reason) == '') {
		$('#facebox').find('#cntReasonTip').html('请输入说明');
		$('#facebox').find('#cntReason').addClass("input_blur");
		check = false;
	} else {
		$('#facebox').find('#cntReasonTip').html('');
		$('#facebox').find('#cntReason').removeClass("input_blur");
	}
	index--;
 
	if (index == 0)
		return check;
	 
	var userID ="<sec:authentication property="principal.userId"/>".replaceAll("&#95;","_");
	if (!Audit.user || $.trim(Audit.user) == '') {
		$('#facebox').find('#cntUserIdTip').html('请输入用户名');
		$('#facebox').find('#keyUserId').addClass("input_blur");
		check = false;                                       
	} else if (Audit.isSessionUser && $.trim(Audit.user) != userID ) {
		$('#facebox').find('#cntUserIdTip').html('用户名和当前登录用户名不一致');
		$('#facebox').find('#keyUserId').addClass("input_blur");
		check = false;
	} else if(Audit.isSessionUser == false){
		
		if($.trim(Audit.user) == userID){
			$('#facebox').find('#cntUserIdTip').html(Audit.reCheckUserMsg+'不能是当前登录用户');
			$('#facebox').find('#keyUserId').addClass("input_blur");
			check = false;
		}else{
			check = Audit.unSessionUserCheck($.trim(Audit.user));
		}
	}
	if(check){
		$('#facebox').find('#cntUserIdTip').html('');
		$('#facebox').find('#keyUserId').removeClass("input_blur");
	}
	index--;
	if (index == 0)
		return check;
	if (!Audit.pwd || $.trim(Audit.pwd) == '') {
		$('#facebox').find('#cntPwdTip').html('请输入密码');
		$('#facebox').find('#cntPwd').addClass("input_blur");
		check = false;
	} else {
		$('#facebox').find('#cntPwdTip').html('');
		$('#facebox').find('#cntPwd').removeClass("input_blur");
	}
	return check;
};

/**
 * 检查checkbox是否都选中，如果是save按钮有效
 */
Audit.saveEnable = function() {
	var enable = true;
	$.each($('#facebox').find('#checkList'), function(i, obj) {
		if (!obj.checked) {
			enable = false;
			if($(obj).attr("name") == "checkList"){
				alert(getMessage('MST0026'));
			}else{
				alert(getMessage('MST0027'));
			}
			return false;
		}
	});
	if (enable) {
		return true;
	} else {
		return false;
	}
};

/**
 * 设置初始/修改后表单元素信息
 */
Audit.getValueFields = function(fields) {
	var resultArray = new Array();
	 

	jQuery.each(fields, function(i, item) {
		var obj = Object();
		obj.labelTxt = $(this).attr("labelTxt");
		
		if(obj.labelTxt != undefined){
			obj.labelTxt = obj.labelTxt.replace("ID$","");
		}else{
			obj.labelTxt = "N.A.";
		}
		
		obj.value = "";
		obj.key = "";
		obj.oldValue = "";
		obj.oldKey = ""; 

		obj.name = $(this).attr("name");
		obj.id = $(this).attr("id");
		obj.fieldType = this.type;
		
		//隐藏,disabled掉的都不记录
		  if(obj.fieldType == 'radio' || obj.fieldType == 'checkbox' ){
			  if($("#"+obj.name).attr("disabled") =="true" 
					|| $("#"+obj.name).attr("disabled") =="disabled" 
					){
				return true;
			}
		  }else{
			if(obj.fieldType == 'hidden' 
					|| $("#"+obj.id).attr("disabled") =="true" 
					|| $("#"+obj.id).attr("disabled") =="disabled" 
					){
				return true;
			}
		  }

		if (obj.fieldType == "select-multiple") {
			$.each($(this).find("option:selected"), function(k,tmpObj) {
				if (k > 0) {
					obj.value += "、";
					obj.key += "、";
				}
				obj.key += tmpObj.value;
				obj.value += tmpObj.text;
			});
		} else if (obj.fieldType=="select-one") {
			obj.value = $(this).find("option:selected").text();
			if(obj.value=="请选择"||obj.value=="请选择▼" || $.trim(obj.value) == ""){
				obj.value="N.A.";
			}
			
		} else if (obj.fieldType=='radio') {
		    obj.value = $("#" + formId+" input[name='" + obj.name + "']:checked").val();
		} else if (obj.fieldType=='checkbox') {
			 
				obj.value = "";
				$.each($("#" + formId+" input[readonly!=readnoly][disabled!=disabled][name='" + obj.name + "']:checked"),function(j, tmpObj) {
					if (j > 0) {
						obj.value += "、";
						obj.key += "、";
					}
					obj.key += tmpObj.value;
					if(tmpObj.nextSibling != null) {
						obj.value += $.trim(tmpObj.nextSibling.data);
					} else {
						obj.value += tmpObj.value;
					}						
				});
				 
			 
		} else {
			obj.value = $(this).val();
		}
		
		if(obj.value == undefined ){
			obj.value = "";
		}
		
		/**
		 * 处理勾选角色问题
		 */
		if(obj.fieldType=='checkbox'){
			if(obj.value.indexOf("、、")){
				obj.value=obj.value.replace("、、","、");
			}
			if('、'==obj.value.charAt(obj.value.length-1)){
				obj.value=obj.value.substring(0,obj.value.length-1);
			}
		}
		
		if (obj.value != null ) {			
			var aName = "";
			if(obj.fieldType == "radio" || obj.fieldType == "checkbox"){
				aName = obj.name;
			}else{
				aName = obj.id;
			}
			
			if (isInArray(aName, resultArray) == null) {
				resultArray[resultArray.length] = obj;
			}
		}
			 
	});
	return resultArray;
};

/*
 * 判断name是否在数组fields中
 */
function isInArray(name, fields) {
	var result = null;
	jQuery.each(fields, function(j, objItem) {
		if( objItem.fieldType == "radio" || objItem.fieldType == "checkbox" ){
			if (name==objItem.name) {
				result= objItem;
				return false;
			}
		}else{
			if (name==objItem.id) {
				result = objItem;
				return false;
			}
		}
	});
	return result;
}

 
/**
 * 修改记录时，生成具体的修改内容
 */
Audit.createContent = function() {
	var hideDom = '';
	var html = "";
	
	if (NEED_AUDIT) {
		if('${workflowPage}'=='editInput' && typeof(isFlowFlag) ==  "undefined"  ) {
			AuditTmpSetContents(); //流程模块
		} else {
			Audit.setContents(Audit.oldValueFields, Audit.newValueFields); //功能模块
		}
		
		// 修改内容
		var changedContent = "" ;
		
		if (Audit.contents.length > 0) {
			html = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='table_box_td4'><tr><th width='5%'>&nbsp;</th><th width='20%'>项目名称</th><th width='25%'>原值</th><th width='30%'>新值</th><th width='20%'>&nbsp;</th></tr>";
			
			for ( var i = 0; i < Audit.contents.length; i++) {
				var item = Audit.contents[i];
				
				var oldValue = item.oldValue;
				var newValue = item.value;
				
				if(!oldValue || $.trim(oldValue) == ""  || oldValue == undefined || oldValue=="请选择"||oldValue=="请选择▼"){
					oldValue =  "N.A.";
				}
				if(!newValue || $.trim(newValue) == ""  || newValue == undefined || newValue=="请选择"||newValue=="请选择▼"){
					newValue =  "N.A.";
				}
				if(oldValue == newValue){
					continue;
				}
				changedContent += "[项目名称:" + item.labelTxt + "  原值:" + oldValue  +" 新值:" + newValue +"  "+item.status+"]\r\n";
				
				html += "<tr>"
						+ "<td> <input type='checkbox' name='checkList' onclick='$(\"#facebox\").find(\"#saveBtn\").removeAttr(\"disabled\");' id='checkList' /></td>"
						+ "<td> " + item.labelTxt + "</td>";

				html += "<td><div style='width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title='"+ oldValue  +"'>" + oldValue  + "</div></td>";
				html += "<td><div style='width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title='"+ newValue  +"'>" + newValue + "</div></td>";

				html += "<td>" + item.status + "</td>";
				html += "</tr>";
			}
			
			hideDom += '<input type="hidden" name="dto.changedContent" value="' + changedContent + '"/>';

			html += "</table>";
		}
	}
	Audit.content = hideDom;
	$("#facebox").find("#changeDiv").html(html);
};

/* 
 *记录修改信息
 */
Audit.setContents = function(oldValueFields, newValueFields) {
	
	Audit.contents = new Array();
	
	if(oldValueFields == undefined || newValueFields == oldValueFields){
		return;
	}
	
	for ( var i = 0; i < oldValueFields.length; i++) {
		var oldObject = oldValueFields[i];
		var oldName = oldObject.name;
		var oldValue = oldObject.value;
		var objectType = oldObject.fieldType;
	    var oldId = oldObject.id;
	    var labelTxt = oldObject.labelTxt;
	    if(labelTxt != null && labelTxt.length > 1 && labelTxt.substring(labelTxt.length-2)=="ID"){
	    	continue;
	    }
	    if(objectType != "radio" &&  objectType != "checkbox" ){
	    	oldName = oldId;
		} 
		
		var newObject = isInArray(oldName, newValueFields);
	 
		if(isInArray(oldName, Audit.contents) == null){
			// 被删除
			if (!newObject) {
				oldObject.status = "被删除";
				Audit.contents[Audit.contents.length] = oldObject;
			} else {
				
				// 被修改
				if (oldValue!=newObject.value) {
					newObject.status = "被修改";
					newObject.oldKey = oldObject.key;
					newObject.oldValue = oldValue;
					Audit.contents[Audit.contents.length] = newObject;
				}
			}
		
		}
	}

	// 新增情况
	for ( var i = 0; i < newValueFields.length; i++) {
		var newObject = newValueFields[i];
		var newName = newObject.name;
		var newValue = newObject.value;		
		var objectType = newObject.fieldType;
		
		 if(objectType != "radio" &&  objectType != "checkbox" ){
			 newName = newObject.id;
		 } 
		
		var oldObject = isInArray(newName, Audit.oldValueFields);
		if(isInArray(newName, Audit.contents) == null){
			if (!oldObject) {
				newObject.status = "被新增";
				Audit.contents[Audit.contents.length] = newObject;
			}
		}
	}
};

/**
 * 页面修改信息
 */
function AuditTmpSetContents() {
	Audit.contents = new Array();
	var _btnNameEn = $.trim($("input[name='dto.btnNameEn']").val());
	if('${workflowName}'.length>0 && _btnNameEn!='REJECT' && _btnNameEn!='ABNORMAL_CLOSE' && _btnNameEn!='CANCEL' && _btnNameEn!='LOCK') {
		$('#recorderForm').find('#S_01_01_TAG_ITEM_TXT').remove();
		var _tagTxt = '';
		$('div[id^=area]').find(':input').each(function(index){
			if($(this).attr('labelTxt') && !$(this).attr('disabled')) {
				if(_tagTxt.length>0) {_tagTxt += ',';}
				_tagTxt += $(this).attr('name')+':'+$(this).attr('labelTxt');
			}
		});
		$('div[id^=area]:last').append('<input type="hidden" name="S_01_01_TAG_ITEM_TXT" id="S_01_01_TAG_ITEM_TXT" value="'+_tagTxt+'">');
		
		$.ajax({
			type: 'POST',
	    	url: '${path}${namespace}/'+'${workflowName}'.toLowerCase()+'-ajax.action?method=auditTmp&dto.id='+$("[name='dto.id']").val()+'&dto.recorderId='+$("[name='dto.recorderId']").val(),
	    	data: $('div[id^=area]').find(':input').serializeArray(),
	    	dataType: 'json',
	    	async:false,
	    	success: function(data){
	    		if(data.auditTmpLength>0) {
	    			$.each(data.auditTmpList,function(j,auditTmp){
	    				var obj = new Object();
	    				obj.status = auditTmp.optType;
	    				obj.labelTxt = auditTmp.lableTxt;
	    				obj.oldValue = auditTmp.oldValue;
	    				obj.value = auditTmp.newValue;
	    				Audit.contents[Audit.contents.length] = obj;
	    			});
	    		}
	    		$('#recorderForm').find('#S_01_01_TAG_ITEM_TXT').remove();
	    	}
		});
	}
};


/**
 * 提交事件
 */
Audit.save = function(thisTag) {
	if (!Audit.saveEnable()) {
		return false;
	}
	//表单校验
	if (!Audit.check(10)) {
		return;
	}

	//为防止多次提交,提交一次立即禁用掉此按钮
	$(thisTag).attr('disabled', true);

	$("#ifAlert").attr("value", 1);

	$.getJSON("${path}/mst-user/user-ajax.action", {
		userId : Audit.user,
		pwd : Audit.pwd
	}, function(data) {
		if (data.result == true) {
			
			// 创建修改内容
			var reason = '<input type="hidden" name="dto.reason" value="' + $('#facebox').find('#cntReason').val() + '"/>'
					   + '<input type="hidden" name="dto.updId" value="' + $('#facebox').find('#cntUserId').val() + '"/>';
			
			$("#"+formId).append(Audit.content+reason);
			Audit.callServer();
		} else if (data.result == false) {
			alert(data.message);
			$('#facebox').find('#checkList').attr("checked", false);
		} else {
			alert(data.message);
			//关闭
			$.facebox.close();
			//退出系统
			document.location.href = "${path}/login.jsp";
		}
	});
};

/**
 * 取消事件
 */
Audit.cancel = function() {
	//防止页面校验错误
	if($('[name=S_01_01_DATA_CHANGE_STATUS]').length>0) {
		$('[name=S_01_01_DATA_CHANGE_STATUS]').val("${content['S_01_01_DATA_CHANGE_STATUS']}");
	}
	
	//关闭
	$.facebox.close();
};

function onEnterKey() {

}
</script>