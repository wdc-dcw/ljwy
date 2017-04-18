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
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<script type="text/javascript">
	function doSearch(gotoPage) {
		$("#gotoPage").val(gotoPage);
		document.forms[0].submit(); // 提交表单
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
		<div class="glkList" style="width: 100%; height: 100%;">

			<div style="width: 100%;">
				<form name="pageForm" id="pageForm"
					action="${path}/lj-merchant/list.action" method="post">
					<s:hidden name="typeCode" />
					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
					<p style="margin-left: 25px; margin-top: 10px;"></p>
				</form>
			</div>
			<table
				style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
				<tr>
					<th>类型名</th>
					<th>操作 <a title="新增"
						href="${path}/lj-merchant/typeEntityInit.action?typeCode=${typeCode}"><img
							src="${path}/mst-images/add.png" /></a>
					</th>
				</tr>
				<c:forEach items="${kbnList}" var="kbnlist">
					<tr>
						<td>${kbnlist.nameCn }</td>
						<td><a
							href="${path}/lj-merchant/typeEntityInit.action?kbnTypeDto.id=${kbnlist.id }&typeCode=${typeCode}">修改</a>
							<a
							href="${path}/lj-merchant/deleteTypeMerchant.action?kbnTypeDto.id=${kbnlist.id }&typeCode=${typeCode}">删除</a></td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
</html>