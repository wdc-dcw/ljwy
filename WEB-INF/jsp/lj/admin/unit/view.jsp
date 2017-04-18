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
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
				<li>单元管理</li>
				<li>></li>
				<li>房间详细</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList">
			<!--  这里写查看的 -->
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">所属小区：</label>
					<label>${dto.kbn.nameCn }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">室号：</label>
					<label>${dto.code }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">建筑面积：</label>
					<label>${dto.measureOfArea}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">物业费(元/平米):</label>
					<label>${dto.priceSquareMeter }</label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">物业费(元/月):</label>
					<label>${dto.totalPrice }</label>
				</p>

			<div class="table01">
				<a href="${path}/lj-room/list.action"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>