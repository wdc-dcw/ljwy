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
			<c:if test="${dto.type=='EXPRESS_COMPANY' }">
				<li>生活服务</li>
				<li>></li>
				<li>快递管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%;">

			<s:form id="form" name="form"
				action="/lj-kuaidi/saveKuaidi.action" method="post" enctype="multipart/form-data">
				<s:hidden name="dto.id" id="id" />
				<s:hidden name="dto.type" id="type" />
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">快递公司名：<b><font
							class="ff6600">*</font></b></label> <input name="dto.nameCn"
						id="nameCn" type="text" style="width: 200px;" require="true"
						value="${dto.nameCn}" labelTxt="快递公司名" />
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">快递公司编码：<b><font
							class="ff6600">*</font></b></label> <input name="dto.code"
						id="code" type="text" style="width: 200px;" require="true"
						value="${dto.code}" labelTxt="快递公司编码" />
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">快递公司电话：<b><font
							class="ff6600">*</font></b></label> <input name="dto.remark"
						id="remark" type="text" style="width: 200px;" require="true"
						value="${dto.remark}" labelTxt="快递公司编码" />
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">快递公司图片：<b><font
							class="ff6600">*</font></b></label> 
					<input type="file" name="img" value="" class="doc" />
				</p>
				
				


			</s:form>
			
			<div class="table01">
				<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
						key="common.submit.btn" /></a> <a
					href="${path}/lj-kuaidi/kuaiDiList.action?dto.type=EXPRESS_COMPANY"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>