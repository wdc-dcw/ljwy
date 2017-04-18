<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ page isELIgnored="false"%>
<%
    response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires",-10);

    String path = request.getContextPath(); 
	request.setAttribute("path",path);
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://www.youthen.org/taglib/ecms" prefix="ecms"%>
<!-- 导入css -->
<link type="text/css" rel="stylesheet" href="${path}/css/validator.css"/>
<link type="text/css" rel="stylesheet" href="${path}/css/datepicker.css"/>
<link type="text/css" rel="stylesheet" href="${path}/css/facebox.css" />

<!-- 导入js -->
<script type="text/javascript" src="${path}/js/jquery-1.5.2.js"></script>
<!-- facebox的js -->
<script type="text/javascript" src="${path}/js/simpla.jquery.configuration.js"></script>
<script type="text/javascript" src="${path}/js/facebox.js"></script>
<script type="text/javascript" src="${path}/js/zk.js"></script>

<!-- 时间控件js -->
<script type="text/javascript" src="${path}/js/datepicker/WdatePicker.js" defer="defer" charset="UTF-8"></script>
<!-- facebox -->

<!-- 表单校验开始 -->
<script src="${path}/js/formValidate.js"></script> 
<script type="text/javascript" charset="UTF-8">
	
var formId = "recorderForm";

// 是否要加审查追踪.
var NEED_AUDIT = true;
var isFlowFlag;	
function logout(){
	if(window.confirm(getMessage('ACT0006'))){
		window.location.href = "${path}/j_spring_security_logout";
	}
}
	
function getMessage(key,para){
	var target = "";
	$.ajax({
	    cache: false,
	    async:false,
        type: "POST",
    	url: "${path}/comm/message-ajax.action?method=getResourceBundle",
    	data: {"key":key},
    	dataType: "json",
    	success: function(data){
    		target = data;	
    	}
	});
	
	if(target==""){
		return "";
	}
	if(typeof(para)=='undefined'){
		return target;
	}
	if(typeof(para)=='string'){
		
		target=target.replace(/\{0\}/g,para);
	}
	if(para instanceof Array){
		for(var i in para){
			target=target.replace(eval("/\\{"+i+"\\}/g"),para[i]);
		}
	}
	return target;	
}

/**
 * 调用ajax方法
 */
function callAjaxMethod(_url,_param){
	var result = null;
	$.ajax({
	    cache: false,
        type: "POST",
    	url: _url,
    	async:true,
    	data: _param,
    	dataType: "json",
    	success: function(data){
    		result = data;
    	}
	});
	return result;
}
</script> 


<%-- <%@ include file="/WEB-INF/include/PAGE_LEAVE_OPT_CN.jsp"%>  --%>
<%@ include file="/WEB-INF/include/msg.jsp"%>
<%@ include file="/WEB-INF/jsp/master/mst-include/auditContent.jsp"%>
<!-- 表单校验结束 -->
