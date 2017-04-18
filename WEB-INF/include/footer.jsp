
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<DIV style="width:1007px;margin: auto;">
<DIV id="footer">
	<DIV class="bglog">
		<DIV class="fastlink">
			<a href="http://www.youthentech.com"><s:text name="companyName" /></a>
		</DIV>
		<img alt="logo" src="../images/icon_13.png" style="position: absolute;left:23%;">
		<DIV>
		
		<p><span>
			地址：上海市浦东新区羽山路373号3楼</span></p>
		<p><span>
		版权所有：<s:text name="companyName" /></span></p>
		</DIV>
	</DIV>
</DIV>
</DIV>
<html>

<script type="text/javascript" charset="UTF-8">
  function initOldValueFields() {
		if ('${workflowPage}' == 'editInput'
				&& typeof (isFlowFlag) == "undefined") {//流程模块
			Audit.oldSerialValue = $('#' + formId).find(':input').not(
					"[name^='dto.btnName'],[name='dto.actionId']").serialize();
		} else {
			Audit.oldSerialValue = $(
					"#" + formId + " :input:not(:hidden,:disabled)")
					.serialize();
			var initField = $("#" + formId + " :input:not(:hidden,:disabled)");
			Audit.oldValueFields = Audit.getValueFields(initField);
		}
	}
	// 初始化页面数据
	$(document).ready(function() {
		initOldValueFields();
	});  
</script>