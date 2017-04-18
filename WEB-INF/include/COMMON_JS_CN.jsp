<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<script language="javascript" type="text/javascript">
var row_id = 0;
var noRight = "变更流程被QA修改，没有权限继续操作！";
var saveCheck = false;

//添加表格里面的行
function addTrOfTables(thisTag,tagId,tableId) {
	row_id++;
	var _tr = $('#'+tagId).clone(true).removeAttr('id').show();
	alert(_tr);
	if(_tr.find('.ROWNUM_TD').length>=1) {
		_tr.find('.ROWNUM_TD').text($(thisTag).parent().parent().parent().find('.ROWNUM_TD').length);
	}
	_tr.find(':input').each(function(){
		$(this).attr('id',($(this).attr('id')+row_id));
		if($(this).attr('src')!='true') {
			if($(this).attr('type')=='radio') {
				
			} else if($(this).attr('type')=='select') {
				if($(this).find('option[value=""]').length>=1) {
					$(this).find('option[value=""]').attr('selected',true);
				}
			} else {
				$(this).val('');
			}
		}
	});
	
	if(!tableId) {
		$(thisTag).parent().parent().parent().append(_tr);
	} else {
		$(thisTag).parents('#'+tableId).append(_tr);
	}
	return false;
}

//添加表格里面的行
function addTrOfTable(thisTag,paramMap) {
	row_id++;
	var _table = $(thisTag).parent().parent().parent();
	var _tr;
	if(paramMap.lastTr) {
		_tr = _table.find('tr:last').clone(true).removeAttr('id').show();
		if($.trim(_tr.find('td:last').text()).length<=0) {
			_tr.find('td:last').append('<a href="###" class="button_02" onclick="$(this).parent().parent().remove();return false;">-</a>');
		}
	} else {
		_tr = $('#'+paramMap.trId).clone(true).removeAttr('id').show();
	}
	if(_tr.find('.ROWNUM_TD').length>=1) {
		_tr.find('.ROWNUM_TD').text(_table.find('.ROWNUM_TD').length);
	}
	//序号
	if(_tr.find('.ROWNUM').length>=1) {
		_tr.find('.ROWNUM').text(_table.find('.ROWNUM').length);
	}
	//自定义编码
	if(paramMap.code){
		if(_tr.find('.ROWNUM_TD').length>=1) {
			var rowNum="";
			if(_table.find('.ROWNUM_TD').length<10){
				rowNum=paramMap.code+'0'+_table.find('.ROWNUM_TD').length
			}else{
				rowNum=paramMap.code+''+_table.find('.ROWNUM_TD').length
			}
			_tr.find('.ROWNUM_TD').text(rowNum);
			if(paramMap.saveTagId){//需要把自定义编号保存隐藏域传入
				var _td=_tr.find('.ROWNUM_TD').next();
				_td.find('[name='+paramMap.saveTagId+']').val(rowNum);
			}
		}
	}
	_tr.find(':input').each(function(){
		$(this).attr('id',($(this).attr('id')+row_id));
		if(!paramMap.lastTr && $(this).attr('src')!='true') {
			if($(this).attr('type')=='radio') {
				$(this).removeAttr('checked');
			} else if($(this).attr('type')=='checkbox') {
				$(this).removeAttr('checked');
			} else if($(this).attr('type')=='select') {
				if($(this).find('option[value=""]').length>=1) {
					$(this).find('option[value=""]').attr('selected',true);
				}
			} else {
				$(this).val('');
			}
		}
	});
	
	if(!paramMap.tableId) {
		_table.append(_tr);
	} else {
		$(thisTag).parents('#'+paramMap.tableId).append(_tr);
	}
	return false;
}
//删除表格里面的行
function deleteTrOfTable(thisTag,level) {
	$(thisTag).parent().parent().parent().find('.ROWNUM_TD').not($(thisTag).parent().parent().find('.ROWNUM_TD')).each(function(index){
		if(level){
			var rowNum;
			if(index<10){
				rowNum=level.code+'0'+index;
			}else{
				rowNum=level.code+''+index;
			}
			$(this).text(rowNum);
			if(level.saveTagId){//需要把自定义编号保存隐藏域传入
				var _td=$(this).next();
				_td.find('[name='+level.saveTagId+']').val(rowNum);
			}
		}else{
			$(this).text(index);
		}
	});
	//1,2,3,4编号
	$(thisTag).parent().parent().parent().find('.ROWNUM').not($(thisTag).parent().parent().find('.ROWNUM')).each(function(index){
		if(level){
			var rowNum;
			rowNum=index;
			$(this).text(rowNum);
		}else{
			$(this).text(index);
		}
	});
	//自定义编码
	if(level){
		$(thisTag).parent().parent().remove();
	}
	if(!level) {
		$(thisTag).parent().parent().remove();
	} else {
		var _parent = $(thisTag);
		for(var i=0; i<level; i++) {
			_parent = _parent.parent();
		}
		_parent.remove();
	}
	return false;
}

//将下拉的显示的值放到隐藏域中:隐藏域的ID的值为下拉框的ID值+"_val"
function changeValue(thisTag) {
	var id = $(thisTag).attr('name')+'_ID';
	var val = $(thisTag).attr('name')+'_VAL';
	idTag = '';
	valTag = '';
	$(thisTag).find('option:selected').each(function(){
		if($(this).text()!='请选择▼'){
			if(valTag.length>0) {valTag += ',';idTag+= ','}
			valTag += $(this).text();
			idTag += $(this).attr("value");
		}
	});
	if($(thisTag).siblings('input[name='+id+']').length > 0){
		$(thisTag).siblings('input[name='+id+']').val(idTag);
	}
	if($(thisTag).siblings('input[name='+val+']').length > 0){
		$(thisTag).siblings('input[name='+val+']').val(valTag);
	}
}

//多Checkbox选中时
function multiCheckbox(thisTag,prefixName) {
	var _td = $(thisTag).parent();
	var _checkbox = $(thisTag).siblings('[name='+prefixName+'_VAL]');
	var _checkbox_val = '';
	var _checedList;
	if(_td.find('[name^='+prefixName+']:radio').length>0) {
		_checedList = _td.find('[name^='+prefixName+']:checked');
	} else {
		_checedList = _td.find('[id^='+prefixName+']:checked')
	}
	_checedList.each(function(ind){
		if(ind==0) {
			_checkbox_val = $(this).val();
		} else {
			_checkbox_val += ','+$(this).val();
		}
	});
	_checkbox.val(_checkbox_val);
}

var WFPage = {};
WFPage.skipAlert = false; //是否跳过alert提示
WFPage.alertMsg; //保存之后alert提示
WFPage.skipRefresh = false; //是否跳过刷新
WFPage.redirectURL; //重定向后的URL
WFPage.elseParam = "";  //保存后附加参数
//保存部分数据
function saveSection(areaId) {
	var thisObj = $("#"+areaId).find("img[title='保存']").parent();
	if(thisObj.attr("disabled") == "disabled"){
		return;
	}
	thisObj.attr("disabled","disabled");
	if($('#skipAlert').length>0) {
		WFPage.skipAlert = ($('#skipAlert').val()=='true');
	}
	if($('#skipRefresh').length>0) {
		WFPage.skipRefresh = ($('#skipRefresh').val()=='true');
	}
	
	$('[name=ifAlert]').val(1);
	if(saveCheck){
		if(formCommonCheck(formId) == false || (typeof otherCheck !=='function' || otherCheck()) == false){
			return;
		}
	}
	if('${workflowPage}'=='editInput') {//流程模块
		Audit.newSerialValue = $('#'+formId).find(':input').not("[name^='dto.btnName'],[name='dto.actionId']").serialize();
	} else {
		Audit.newSerialValue = $('#'+formId).find(':input:not(:hidden,:disabled)').serialize();
	}
	if(Audit.oldSerialValue!=Audit.newSerialValue) {
		$('[name=S_01_01_DATA_CHANGE_STATUS]').val('1');
	}
	
	if(areaId.charAt(0)!='#') {
		areaId = '#'+areaId;
	}
	$.ajax({
		type: 'POST',
    	url: '${path}${namespace}/'+'${dto.workflowName}'.toLowerCase()+'-ajax.action?method=save&dto.id=${dto.id}&dto.recorderId=${dto.recorderId}',
    	data: $(areaId).find(':input').serializeArray(),
    	dataType: "json",
    	success: function(data){
    		if(!WFPage.skipAlert) {
    			if(WFPage.alertMsg != null && WFPage.alertMsg.length > 0){
    				alert(WFPage.alertMsg);
    				WFPage.alertMsg = "";
    			}else{
    				alert(getMessage('CMN0015'));
    			}
    		}
    		thisObj.removeAttr("disabled");
    		if(!WFPage.skipRefresh || $.trim('${dto.id}').length<=0) {
    			window.location.href = '${path}${namespace}/editInput.action?dto.id='+data.id+'&dto.recorderId=${dto.recorderId}'+WFPage.elseParam;
    		}
    		WFPage.skipAlert = false;
    		WFPage.skipRefresh = false;
    		$('#skipAlert').val(WFPage.skipAlert);
    		$('#skipRefresh').val(WFPage.skipRefresh);
        }
    });
}

//重置部分数据
function resetSection(areaId) {
	$('[name=ifAlert]').val(1);
	if('${dto.id}'=='' && '${dto.recorderId}'=='') {
		alert(getMessage('CMN0016'));
		return false;
	}
	if(confirm(getMessage('CMN0017'))) {
		$('[name=S_01_01_DATA_CHANGE_STATUS]').val('0');
		if(areaId.charAt(0)!='#') {
			areaId = '#'+areaId;
		}
		$.ajax({
			type: 'POST',
	    	url: '${path}${namespace}/${fn:toLowerCase(dto.workflowName)}-ajax.action?method=reset&dto.id=${dto.id}&dto.recorderId=${dto.recorderId}',
	    	data: $(areaId).find(':input').serializeArray(),
	    	dataType: "json",
	    	success: function(data){
	    		alert(getMessage('CMN0018'));
	    		if('${dto.recorderId}'.length<=0) {
	    			if(WFPage.redirectURL && WFPage.redirectURL.length>0) {
	    				window.location.href = WFPage.redirectURL;
	    			} else {
	    				window.location.href = '${path}${namespace}/editInput.action?1=1'+WFPage.elseParam;
	    			}
	    		} else {
	    			window.location.href = '${path}${namespace}/editInput.action?dto.id='+data.id+'&dto.recorderId=${dto.recorderId}'+WFPage.elseParam;
	    		}
	        }
	    });
	}
}

//检查数字
function checkNumber(thisTag,digit,defaultVal) {
	if(isNaN($(thisTag).val())) {
		alert(getMessage('CMN0009',$(thisTag).attr("labelTxt")));
	}
	
	var _result = $(thisTag).val().replace(/[^\d.\-]/g,'');
	if(digit==1) {
		_result = Math.round(_result*10)/10;
	} else if(digit==2) {
		_result = Math.round(_result*100)/100;
	}
	
	_result = _result.toString();
	if(digit>0) {
		var rs = _result.split('.');
		if(rs.length<=1) {
			_result += '.00';
		} else if(rs[1].length<=0) {
			_result += '00';
		} else if(rs[1].length<=1) {
			_result += '0';
		} else if(rs[1].length>=2) {
			_result = rs[0]+'.';
			for(var i=0; i<digit; i++) {
				_result += rs[1].charAt(i);
			}
		}
	}
	
	if(!_result && defaultVal) {
		$(thisTag).val(_result);
	} else {
		$(thisTag).val(_result);
	}
}

isFormSubmit = false;
Audit.setCallServer = function(formId){
	<c:if test="${empty namespace}">
		Audit.callServer=function(e){
			$("#"+formId+"")[0].submit();
		};
	</c:if>
	<c:if test="${!empty namespace}">
	Audit.callServer=function(e){
		//取得要保存的数据
		var submitData = Array();
		/**
		 * 杨新伦 2012-11-15 添加
		 */
		$('div[id^=area]').each(function(){
			$.each($(this).find(':input').serializeArray(),function(j,obj){
			    submitData[submitData.length]=obj;
			});
		});
		$.ajax({
			type: "POST",
	    	url: '${path}${namespace}/'+'${dto.workflowName}'.toLowerCase()+'-ajax.action?method=save&dto.id=${dto.id}&dto.recorderId=${dto.recorderId}',
	    	data: submitData,
	    	dataType: "json",
	    	success: function(data){
	    		$("#id").attr("value",data.id);
	    		$("#facebox").find("#id").attr("value",data.id);
	    		
	    		var _stepUrl = '${path}${namespace}/'+'${dto.workflowName}'.toLowerCase()+'-ajax.action?method=processNextStep';
	    		if($("#facebox").find("[name=wfUnlockDate]").length>0) {
	    			_stepUrl += '&dto.expireDate='+$("#facebox").find("[name=wfUnlockDate]").val()+' 23:59:59';
	    		}
				$.ajax({
					type: "POST",
			    	url: _stepUrl,
			    	data: $("#"+formId+" :input").serializeArray(),
			    	dataType: "json",
			    	success: function(data){
			    		if(data.next_step=='nobody') {
			    			openMsgWindow(getMessage('WWF0001'));
			    		} else if(data.errorCode) {
			    			openMsgWindow(data.errorCode);
			    		} else {
			    			var btnName = $("input[name='dto.btnNameEn']:eq(0)").val();
			    			if(btnName) {
			    				//有复核员时,分析员分析完停留在当前页面
			    				if (btnName=='REVIEW' && '${dto.status}'.indexOf('_ING_Review')!=-1) {
				    				openMsgWindow4(getMessage('CMN0020',$("input[name='dto.btnNameCn']").val()),"${path}${namespace}/editInput.action?dto.recorderId=${dto.recorderId}&dto.id=${dto.id}");
				    			}else if(typeof callServerSuccess==='function'){
				    				callServerSuccess();
				    			} else {
				    				openMsgWindow2(getMessage('CMN0020',$("input[name='dto.btnNameCn']").val()));
				    			}
			    			} else {
			    				openMsgWindow2(getMessage('CMN0014'));
			    			}
			    		}				
			    	}
				 });		    		
	        }
	    });
		
	};
	</c:if>
};

//大于0的数
function checkOverNum(thisTag){
	var num = $(thisTag).val();
	if(num!=''){
		var reg = new RegExp("^[1-9]\\d*.\\d*|^[0].\\d*|^[1-9]\\d*$");
		if(!reg.test(num)){
			alert(getMessage('CMN0010',$(thisTag).attr("labelTxt")));
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
			alert(getMessage('CMN0006',$(thisTag).attr("labelTxt")));
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
			alert(getMessage('CMN0009',$(thisTag).attr("labelTxt")));
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
			alert(getMessage('CMN0004',$(thisTag).attr("labelTxt")));
			$(thisTag).val('');
			return false;
		}else{
			var abc = /^(\+|-)?\d+$/;
			if(!abc.test(num)||num.indexOf("0")==0){
				alert(getMessage('CMN0004',$(thisTag).attr("labelTxt")));
				$(thisTag).val('');
				return false;
			}
		}	
	}
}
</script>