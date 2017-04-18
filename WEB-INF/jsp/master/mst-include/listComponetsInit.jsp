<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
 
<script type="text/javascript" charset="UTF-8">
	
	/**
	 * 
	 * 初始化下拉框方法
	 * tableName：表名
	 * queryCondition：查询条件
	 * componetId：控件ID
	 * componetType：控件类型
	 * idCodeName:值是ID或CODE或NAME
	 * labelTxt:label
	 */
	function initSelect(tableName,queryCondition,orderBy,componetId, idCodeName,labelTxt){
		var _url="${path}/comm/message-ajax.action?method=getList";
		var _param = {"tableName":tableName,"queryCondition":queryCondition,"orderBy":orderBy};
		var data = callAjaxMethod(_url,_param);
		$("#"+componetId).append("<option value=\"\">请选择</option>");
		if(data!=undefined && data!=null && data.length > 0){
			for(var i=0;i<data.length;i++){
				if(idCodeName="CODE"){
					$("#"+componetId).append("<option value="+data[i].CODE+">"+data[i].NAME_CN+"</option>");
				}else if(idCodeName = "ID"){
					$("#"+componetId).append("<option value="+data[i].ID+">"+data[i].NAME_CN+"</option>");
				} else{
					$("#"+componetId).append("<option value="+data[i].NAME+">"+data[i].NAME_CN+"</option>");
				}
			}
		}
	}
	
	/**
	 * 
	 * 初始化checkBox方法
	 * tableName：表名
	 * queryCondition：查询条件
	 * idCodeName:值是ID或CODE或NAME
	 * divId：checkBox DIV ID
	 * checkBoxName：控件类型
	 * labelTxt:labelTxt
	 */
	function initCheckBox(tableName,queryCondition,orderBy,idCodeName,divId,checkBoxName,labelTxt){
		var _url="${path}/comm/message-ajax.action?method=getList";
		
		var _param = {"tableName":tableName,"queryCondition":queryCondition,"orderBy":orderBy};
		var data = callAjaxMethod(_url,_param);
		
		if(data!=undefined && data!=null && data.length > 0){
			for(var i=0;i<data.length;i++){
				if(idCodeName="CODE"){
					$("#"+divId).append('<input name="'+checkBoxName+'" id="'+checkBoxName+i+'" labelTxt="'+labelTxt+'" type="checkbox" value="'+data[i].CODE+'" />'+data[i].NAME_CN);
				}else if(idCodeName="ID"){
					$("#"+divId).append('<input name="'+checkBoxName+'" id="'+checkBoxName+i+'" labelTxt="'+labelTxt+'" type="checkbox" value="'+data[i].ID+'" />'+data[i].NAME_CN);
				} else{
					$("#"+divId).append('<input name="'+checkBoxName+'" id="'+checkBoxName+i+'" labelTxt="'+labelTxt+'" type="checkbox" value="'+data[i].NAME_CN+'" />'+data[i].NAME_CN);
				}
			}
		}
	}
 
	
	//动态增加删除行
	function addRow(tableId,rowNum,tempRowId) {
			var srcTrHtml = $("#tempRow").clone(true).removeAttr('id');
			var targetTr = $("#"+tableId+" tr").eq(rowNum);
			if(targetTr.size()==0){
				alert("指定table id不存在");
			}
			
			srcTrHtml.find(":disabled").each(function(i){
				$(this).removeAttr("disabled");
			});
			
			targetTr.after(srcTrHtml);

			renameInput(tableId);
		
	}
	//删除表格里面的行
	function delRow(obj,tableId) {
		$(obj).parent().parent().remove();
		//renameInput(tableId);
	}
	
	//重新计算SUB表的input框的name
	function renameInput(tableId){
		var tableRow = $("#"+tableId+" tr");
		tableRow.each(function(i){
			$(this).find(':input').each(function(){
				var name = $(this).attr("name").replace("{0}",i);
				var reg = /\d+/;
				
				name = name.replace(reg ,i-1); 
				$(this).attr("name",name);
				$(this).attr("id",name);
			});
		});
	}
	
</script>