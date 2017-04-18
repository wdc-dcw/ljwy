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
			<c:if test="${dto.type==0 }">
				<li>社区公告</li>
				<li>></li>
				<li>活动评论</li>
			</c:if>
			<c:if test="${dto.type==1 }">
				<li>园区社交</li>
				<li>></li>
				<li>二手商品评论</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList">
			<c:if test="${dto.type==0 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动名：</label>
					<label>${dto.action.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论人：</label>
					<label>${dto.user.name}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论时间</label>
					<label><s:date name="dto.createTime" format="yyyy-MM-dd HH:mm:ss" /></label>
				</p>
			</c:if>
			<c:if test="${dto.type==1 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">二手商品名：</label>
					<label>${dto.actionId }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论人：</label>
					<label>${dto.createId}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论时间</label>
					<label><s:date name="dto.createTime" format="yyyy-MM-dd HH:mm:ss" /></label>
				</p>
			</c:if>
			<div class="table01">
				<a href="${path}/lj-comment/list.action?dto.type=${dto.type}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>