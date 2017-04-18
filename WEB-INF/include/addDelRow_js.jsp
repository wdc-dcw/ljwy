<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
	
	// 最大行数
    function isMaxRow(tableId){
    	return true;
		/* var maxRow = ${useList.size()+1};
        var lenth = $("#"+tableId+" tr").length;
	    if(maxRow>lenth){
			return true;
		}else{
			return false;
		} */

	}
	
	function add(tableId, aCount, tempRowId) {
		var trNodes = $("#"+tableId+" tr").get();
		var length = trNodes.length - 1;
		var count = parseInt(aCount);
		
		if (count == length) {
			for (var i = length; i < count; i++) {
				addRow(tableId, -1, tempRowId);
			}
		} else if (count > length) {
			for (var i = length; i < count; i++) {
				addRow(tableId, -1, tempRowId);
			}
		} else {
			for (var i = count; i < length; i++) {
				var k = i + 1;
				$(trNodes[k]).remove();
			}
		}
	}
	
	//添加表格里的行
	function addRow(tableId,rowNum,tempRowId) {

 	    if(isMaxRow(tableId)){
			var srcTrHtml = $("#tempRow").clone(true).removeAttr('id');
			var targetTr = $("#"+tableId+" tr").eq(rowNum);
			if(targetTr.size()==0){
				alert("指定table id或行数不存在");
			}
			
			srcTrHtml.find(":disabled").each(function(i){
				$(this).removeAttr("disabled");
			});
			
			targetTr.after(srcTrHtml);

			renameInput(tableId);
 		}
	}
	
	//删除表格里面的行
	function delRow(obj,tableId) {
		$(obj).parent().parent().remove();
		renameInput(tableId);
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