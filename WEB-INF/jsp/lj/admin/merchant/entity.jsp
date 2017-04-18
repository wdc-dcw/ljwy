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
			<c:if test="${typeCode=='SQHY' }">
				<li>生活服务</li>
				<li>></li>
				<li>社区黄页管理</li>
			</c:if>
			<c:if test="${typeCode=='JZFW' }">
				<li>生活服务</li>
				<li>></li>
				<li>家政服务管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%;">

			<s:form id="form" name="form"
				action="/lj-merchant/saveMerchant.action" method="post"
				enctype="multipart/form-data">
				<s:hidden name="dto.id" id="id" />
				<s:hidden name="typeCode" />
				<c:if test="${typeCode=='SQHY' }">
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">名称：<b><font
								class="ff6600">*</font></b></label> <input name="dto.shopName" id="shopName"
							type="text" style="width: 200px;" require="true"
							value="${dto.shopName}" labelTxt="名称" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.smallTypeId"
							id="smallType" class="select_01" require="true" labelTxt="类型">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="smallType">
								<option value="${smallType.id}"
									<c:if test="${smallType.id==dto.smallTypeId }">selected</c:if>>${smallType.nameCn}</option>
							</c:forEach>

						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">店铺说明：<b><font
								class="ff6600">*</font></b></label> <input name="dto.shopSpec" id="shopSpec"
							type="text" style="width: 200px;" require="true"
							value="${dto.shopSpec}" labelTxt="店铺说明" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">产品说明：<b><font
								class="ff6600">*</font></b></label> <input name="dto.productSpec"
							id="productSpec" type="text" style="width: 200px;" require="true"
							value="${dto.productSpec}" labelTxt="产品说明" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">地址：<b><font
								class="ff6600">*</font></b></label> <input name="dto.address" id="address"
							type="text" style="width: 200px;" require="true"
							value="${dto.address}" labelTxt="地址" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">联系电话：<b><font
								class="ff6600">*</font></b></label> <input name="dto.tel" id="tel"
							type="text" style="width: 200px;" require="true" format="num1"
							value="${dto.tel}" labelTxt="联系电话" />
					</p>
				</c:if>

				<c:if test="${typeCode=='JZFW' }">
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">商家名称：<b><font
								class="ff6600">*</font></b></label> <input name="dto.shopName" id="shopName"
							type="text" style="width: 200px;" require="true"
							value="${dto.shopName}" labelTxt="名称" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.smallTypeId"
							id="smallType" class="select_01" require="true" labelTxt="类型">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="smallType">
								<option value="${smallType.id}"
									<c:if test="${smallType.id==dto.smallTypeId }">selected</c:if>>${smallType.nameCn}</option>
							</c:forEach>

						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">店铺说明：<b><font
								class="ff6600">*</font></b></label> <input name="dto.shopSpec" id="shopSpec"
							type="text" style="width: 200px;" require="true"
							value="${dto.shopSpec}" labelTxt="店铺说明" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">产品说明：<b><font
								class="ff6600">*</font></b></label> <input name="dto.productSpec"
							id="productSpec" type="text" style="width: 200px;" require="true"
							value="${dto.productSpec}" labelTxt="产品说明" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">地址：<b><font
								class="ff6600">*</font></b></label> <input name="dto.address" id="address"
							type="text" style="width: 200px;" require="true"
							value="${dto.address}" labelTxt="地址" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">价格：<b><font
								class="ff6600">*</font></b></label> <input name="dto.priceRange"
							id="priceRange" type="text" style="width: 200px;" require="true"
							value="${dto.priceRange}" format="num" labelTxt="价格" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">联系电话：<b><font
								class="ff6600">*</font></b></label> <input name="dto.tel" id="tel"
							type="text" style="width: 200px;" require="true" format="num1"
							value="${dto.tel}" labelTxt="联系电话" />
					</p>
				</c:if>

				<table id="purposeTbale"
					style="margin-left: 50px; margin-top: 20px;">
					<tr style="background-color: gray">
						<td style="display: block; float: left; width: 116px;">添加图片</td>
						<td><input type="file" name="img" value="${dto.image1 }"
							class="doc" /></td>
						<td><a href="###" class="button_02"
							onclick="addRow('purposeTbale',-1,'tempRow')">+</a></td>
					</tr>

				</table>
				<table style="display: none; margin-left: 50px; margin-top: 10px;">
					<tr id="tempRow">
						<td style="display: block; float: left; width: 116px;">添加照片</td>
						<td><input type="file" name="img" value="" class="doc" /></td>
						<td><a href="###" class="button_02"
							onclick="delRow(this,'purposeTbale');">-</a></td>
					</tr>
				</table>

			</s:form>
			<div class="table01">
				<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
						key="common.submit.btn" /></a> <a
					href="${path}/lj-merchant/list.action?typeCode=${typeCode}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>