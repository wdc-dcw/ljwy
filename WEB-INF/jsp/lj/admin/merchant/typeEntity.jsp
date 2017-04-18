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
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<script>

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
			<c:if test="${typeCode=='SQHY' }">
				<li>生活服务</li>
				<li>></li>
				<li>黄页类型管理</li>
			</c:if>
			<c:if test="${typeCode=='JZFW' }">
				<li>生活服务</li>
				<li>></li>
				<li>家政服务类型管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 90%;">

			<s:form id="form" name="form"
				action="/lj-merchant/saveMerchantType.action" method="post" enctype="multipart/form-data">
				<s:hidden name="kbnTypeDto.id" id="id" />
				<s:hidden name="typeCode" id="code" />
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">类型名：<b><font
							class="ff6600">*</font></b></label> <input name="kbnTypeDto.nameCn"
						id="nameCn" type="text" style="width: 200px;" require="true"
						value="${kbnTypeDto.nameCn}" labelTxt="类型名" />
				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">类型图片：<b><font
							class="ff6600">*</font></b></label> 
					<input type="file" name="img" value="" class="doc" />
				</p>
				
				


			</s:form>
			
			<div class="table01">
				<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
						key="common.submit.btn" /></a> <a
					href="${path}/lj-merchant/typeList.action?typeCode=${typeCode}"
					class="gray">返回</a>
			</div>
			
			
		</div>
	</div>
</body>
</html>