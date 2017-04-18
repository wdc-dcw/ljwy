<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!–[if lte IE 8]>
<meta http-equiv=”x-ua-compatible” content=”ie=7″ />
<![endif]–>
<!–[if IE 9]>
<meta http-equiv=”x-ua-compatible” content=”ie=9″ />
<![endif]–>
<head>
<meta http-equiv="Content-Type">
<title>易理家物业后台管理系统</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.type=='EXPRESS_COMPANY' }">
                <li>生活服务</li>
				<li>></li>
				<li>快递管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
<!-- 		<div class="glkList" style="width: 100%; height: 100%;"> -->
<!-- 			<div style="width: 100%;"> -->
<!-- 				<form name="pageForm" id="pageForm" -->
<%-- 					action="${path}/lj-kuaidi/list.action" method="post"> --%>
<%-- 					<s:hidden name="typeCode" /> --%>
<%-- 					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" /> --%>
<!-- 					<p style="margin-left: 25px; margin-top: 10px;"> -->
<!-- 						快递名称：<input type="text" name="dto.Name_CN"/>&nbsp;&nbsp;&nbsp; -->
<!-- 						 <input type="submit" value="查询" /> -->
<!-- 					</p> -->
<!-- 				</form> -->
<!-- 			</div> -->
			<c:if test="${dto.type=='EXPRESS_COMPANY' }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>名称</th>
						<th>公司编码</th>
						<th>电话</th>
						<th>操作 <a title="新增"
							href="${path}/lj-kuaidi/entityInit.action"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${kbnList}" var="kbnlist">
					<c:if test="${kbnlist.status==1 }">
						<tr>
							<td>${kbnlist.nameCn }</td>
							<td>${kbnlist.code }</td>
							<td>${kbnlist.remark }</td>
							<td>
								<a
								href="${path}/lj-kuaidi/entityInit.action?dto.id=${kbnlist.id}">修改</a>
								<a
								href="${path}/lj-kuaidi/deletekuaidi.action?dto.id=${kbnlist.id}">删除</a>
								</td>
						</tr>
						</c:if>
					</c:forEach>
				</table>
			</c:if>
<!-- 			<div class="fy" style="width: 82%; margin-top: 10px"> -->
<!-- 				<p> -->
<!-- 					第 -->
<%-- 					<s:property value="dto.gotoPage" /> --%>
<!-- 					页 ,共 -->
<%-- 					<s:property value="dto.pages" /> --%>
<!-- 					页 ,共 -->
<%-- 					<s:property value="dto.listSize" /> --%>
<!-- 					条 <a href="#" onclick="doSearch(1)" class="fy_left0"></a> -->
<%-- 					<s:if test="dto.gotoPage-1 > 0 "> --%>
<!-- 						<a href="#" -->
<%-- 							onclick="doSearch(<s:property value="dto.gotoPage-1" />)" --%>
<!-- 							class="fy_left"></a> -->
<%-- 					</s:if> --%>
<%-- 					<s:else> --%>
<!-- 						<a href="#" class="fy_left"></a> -->
<%-- 					</s:else> --%>

<%-- 					<s:if test="dto.gotoPage+1 <= dto.pages "> --%>
<!-- 						<a href="#" -->
<%-- 							onclick="doSearch(<s:property value="dto.gotoPage+1" />)" --%>
<!-- 							class="fy_right"></a> -->
<%-- 					</s:if> --%>
<%-- 					<s:else> --%>
<!-- 						<a href="#" class="fy_right"></a> -->
<%-- 					</s:else> --%>
<%-- 					<a href="#" onclick="doSearch(<s:property value="dto.pages" />)" --%>
<!-- 						class="fy_right0"></a> -->
<!-- 				</p> -->
<!-- 			</div> -->
		</div>
	</div>
</body>
</html>