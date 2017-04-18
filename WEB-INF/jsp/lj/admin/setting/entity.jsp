<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<%@ include file="/WEB-INF/jsp/lj/lj-include/addDelRow_js.jsp"%>
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
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>

<script type="text/javascript">
	function checkFileExt() {
		var fileName = $(".doc").val();
		var extName = fileName.substring(fileName.lastIndexOf(".") + 1,
				fileName.length);
		if (extName == "jpeg" || extName == "png" || extName == "gif"
			|| extName == "jpg" || extName == "JPEG" || extName==""
				|| extName == "PNG" || extName == "GIF" || extName == "JPG") {
			preCheck('form');
		} else {
			alert("只能上传jpg、png、gif类型的图片");
		}

	}
</script>
</head>
<body>

	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.type=='SYS_CONFIG' }">
				<li>系统设置</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%;">

			<s:form id="form" name="form"
				action="/lj-setting/saveSystem.action" method="post">
				<c:forEach items="${systemList }" var="config">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">${config.nameCn}：<b><font
							class="ff6600">*</font></b></label> <input name="${config.code}"
						id="${config.code}" type="text" style="width: 200px;" require="true"
						value="${config.nameEn }" labelTxt="${config.nameEn}" />
				</p>
				 
				 </c:forEach>
		
				


			</s:form>
			
			<div class="table01">
				<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
						key="common.submit.btn" /></a> <a
					href="${path}/lj-setting/entityInit.action?dto.type=SYS_CONFIG"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>