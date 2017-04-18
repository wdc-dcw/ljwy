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
			<li>生活服务</li>
			<li>></li>
			<li>商品类型管理</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">

			<div style="width: 100%;">
				<form name="pageForm" id="pageForm"
					action="${path}/lj-goods/goodsTypeList.action" method="post">
					<p style="margin-left: 25px; margin-top: 10px;"></p>
				</form>
			</div>
			<table
				style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
				<tr>
					<th>类型名</th>
					<th>父类型名</th>
					<th>操作 <a title="新增"
						href="${path}/lj-goods/goodsTypeEntityInit.action"><img
							src="${path}/mst-images/add.png" /></a>
					</th>
				</tr>
				<c:forEach items="${kbnList}" var="kbnlist">
					<tr>
						<td>${kbnlist.nameCn }</td>
						<td><c:forEach items="${bigKbnList}" var="biglist">
								<c:if test="${kbnlist.parentTypeId==biglist.id }">
						${biglist.nameCn }
						</c:if>
							</c:forEach></td>
						<td><a
							href="${path}/lj-goods/goodsTypeEntityInit.action?kbnDto.id=${kbnlist.id }">修改</a>
							<a
							href="${path}/lj-goods/deleteGoodsType.action?kbnDto.id=${kbnlist.id }">删除</a></td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
</html>