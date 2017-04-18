<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ page import="com.youthen.master.util.SystemConst" %>
<%
    response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires",-10);

    String path = request.getContextPath(); 
	request.setAttribute("path",path);
%>

<style type="text/css">
 @page{
  size:21cm 29.7cm;
   margin:24mm 4mm 10mm 4mm;
  padding:0px 3mm;
  overflow:hidden; 
  background:#ffffff;
  @top-left{content:element(header-left)};
  }
  
 div.header-left {display: none;  }
  div.footer-left {display: none; border-top:1px solid #000000;margin:0px 0px 11mm 0px; border-collapse:collapse;  }
 
#pagenumber:before {
	content: counter(page);
}
#pagecount:before {
	content: counter(pages);
}
.tablemax {
width:736px;
	border-collapse: collapse;
	margin:0px 0px 0px 12px;
	padding:0px 0px 0px 1px;
}
.tablemax td {
	text-align: left;
	border: 1px solid #dbdbdb;	
	line-height: 32px;
	padding:0px 2px;
}
 
@media print {
	div.header-left {
		display: block;
		position: running(header-left);
		margin-left: 0px;
		margin-top: 25px;
		margin-bottom: 0px
	}
	div.footer-left {display: block;position: running(footer-left); }
	
	.div1 {
	width:735px;
 	 overflow:hidden;
	margin:0px;
	padding:0px 0px 22px 0px;border-collapse:collapse; 
 } 
  table{border-collapse:collapse;  word-break:break-all; table-layout: fixed; border-top: 0.3px solid #dbdbdb;	}
 table td {
	border-collapse:collapse;	
	height:32px;
	padding:0px 0px 0px 0px;
	line-height:32px;	 
}
body{background: #ffffff;}
}
</style>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.youthen.org/taglib/ecms" prefix="ecms"%>
<!-- 导入css -->
<link type="text/css" rel="stylesheet" href="${path}/css/datepicker.css"/>
<link type="text/css" rel="stylesheet" href="${path}/css/facebox.css" />
<link type="text/css" rel="stylesheet" href="${path}/css/style.css"/>
<link type="text/css" rel="stylesheet" href="${path}/cms-css/style.css"/>
<!-- 导入js -->
<script type="text/javascript" src="${path}/js/youthen-util.js"></script>
<script type="text/javascript" src="${path}/js/jquery-1.5.2.js"></script>
<script type="text/javascript" src="${path}/cms-js/stripe.js"></script>
<!-- facebox的js -->
<script type="text/javascript" src="${path}/js/simpla.jquery.configuration.js"></script>
<script type="text/javascript" src="${path}/js/facebox.js"></script>
<script type="text/javascript" src="${path}/js/zk.js"></script>

<!-- 离开页面时提示保存、Session超时提前一分钟提示 -->
<%@ include file="/WEB-INF/include/PAGE_LEAVE_OPT_CN.jsp"%>

<!-- 时间控件js -->
<script type="text/javascript" src="${path}/js/datepicker/WdatePicker.js" defer="defer" charset="UTF-8"></script>
<script type="text/javascript" charset="UTF-8">
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
</script>
