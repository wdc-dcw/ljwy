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
<meta http-equiv="Content-Type">
<title>易理家物业后台管理系统</title>
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>

</head>
<body>

	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<li>生活服务</li>
			<li>></li>
			<li>商品类型管理</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%;">

			<s:form id="form" name="form" action="/lj-goods/saveGoodsType.action"
				method="post">
				<s:hidden name="kbnDto.id" id="id" />
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">类型名：<b><font
							class="ff6600">*</font></b></label> <input name="kbnDto.nameCn" id="nameCn"
						type="text" style="width: 200px;" require="true"
						value="${kbnDto.nameCn}" labelTxt="类型名" />
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">父类型名：<b><font
							class="ff6600">*</font></b></label> <select name="kbnDto.parentTypeId"
						id="parentTypeId" class="select_01" labelTxt="父类型名">
						<option value="">请选择</option>
						<c:forEach items="${bigKbnList}" var="biglist">
							<option value="${biglist.id}"
								<c:if test="${biglist.id==kbnDto.parentTypeId }">selected</c:if>>${biglist.nameCn}</option>
						</c:forEach>
					</select>
				</p>


			</s:form>
			<div class="table01">
				<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
						key="common.submit.btn" /></a> <a
					href="${path}/lj-goods/goodsTypeList.action" class="gray">返回</a>

			</div>
		</div>
	</div>
</body>
</html>