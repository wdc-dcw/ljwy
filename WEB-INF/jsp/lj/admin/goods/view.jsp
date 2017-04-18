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
			<c:if test="${dto.isSecond==1 }">
				<li>生活服务</li>
				<li>></li>
				<li>二手商品管理</li>
			</c:if>
			<c:if test="${dto.isSecond==0 }">
				<li>生活服务</li>
				<li>></li>
				<li>商品管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 1000px;">

			<c:if test="${dto.isSecond==1 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">标题：</label>
					<label>${dto.title }</label>

				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">大类型：</label>
					<label> ${dto.bigGoodsType.nameCn} </label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">小类型：</label>
					<label> ${dto.smallGoodsType.nameCn} </label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">价格：</label>
					<label>${dto.price }</label>

				</p>

				

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">发布时间：</label>
					<label><fmt:formatDate value="${dto.createTime}"
							pattern="yyyy-MM-dd HH:mm:ss" /></label>

				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">发布人：</label>
					<label>${dto.createrId }</label>

				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label> <c:forEach items="${GoodsName }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach>
					</label>
				</p>
			</c:if>

			<c:if test="${dto.isSecond==0 }">

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">商家名：</label>
					<label>${dto.shop.shopName }</label>

				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">商品名：</label>
					<label>${dto.name }</label>

				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">大类型：</label>
					<label> ${dto.bigGoodsType.nameCn} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">小类型：</label>
					<label> ${dto.smallGoodsType.nameCn} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">价格：</label>
					<label>${dto.price }</label>

				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">库存数量：</label>
					<label>${dto.leftCnt }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">商品描述：</label>
					<label>${dto.remark }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label> <c:forEach items="${GoodsName }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach>
					</label>
				</p>
			</c:if>
			<div class="table01">
				<a href="${path}/lj-goods/list.action?dto.isSecond=${dto.isSecond}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>