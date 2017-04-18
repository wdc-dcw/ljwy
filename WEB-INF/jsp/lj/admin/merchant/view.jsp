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
			<c:if test="${typeCode=='SQHY' }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">名称：</label>
					<label>${dto.shopName }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">类型：</label>
					<label> ${dto.smallType.nameCn} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">店铺说明：</label>
					<label> ${dto.shopSpec } </label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">产品说明：</label>
					<label>${dto.productSpec }</label>

				</p>

				

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">地址：</label>
					<label>${dto.address }</label>

				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">联系电话：</label>
					<label>${dto.tel }</label>

				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label> <c:forEach items="${merchantImgList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach>
					</label>
				</p>
				
			</c:if>

			<c:if test="${typeCode=='JZFW' }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">名称：</label>
					<label>${dto.shopName }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">类型：</label>
					<label> ${dto.smallType.nameCn} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">店铺说明：</label>
					<label> ${dto.shopSpec } </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">产品说明：</label>
					<label>${dto.productSpec }</label>

				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">地址：</label>
					<label>${dto.address }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">价格：</label>
					<label>${dto.priceRange }</label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">联系电话：</label>
					<label>${dto.tel }</label>
				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label> <c:forEach items="${merchantImgList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach>
					</label>
				</p>
				
			</c:if>
			<div class="table01">
				<a href="${path}/lj-merchant/list.action?typeCode=${typeCode}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>