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
			<li>物业缴费</li>
			<li>></li>
			<li>缴费历史列表</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 1000px;">
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">用户名：</label>
				<label>${dto.user.name }</label>
			</p>
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">缴费类别：</label>
				<label> <c:if test="${ dto.type==0}">物业费</c:if> <c:if
						test="${ dto.type==1}">停车费</c:if>
				</label>
			</p>
			<c:if test="${ dto.type==0}">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">单元地址：</label>
					<label> <label>${dto.roomCode }</label>
					</label>
				</p>
			</c:if>
			<c:if test="${ dto.type==1}">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">车位号：</label>
					<label> <c:if test="${dto.parkNo==0 }">无</c:if> <c:if
							test="${dto.parkNo!=0 }">${dto.parkNo }</c:if>
					</label>
				</p>
			</c:if>
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">最后付费期别：</label>
				<label> ${dto.lastPeriod } </label>
			</p>
			
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">缴费月数：</label>
				<label> ${dto.feeMonth } </label>
			</p>

			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">缴费金额：</label>
				<label>${dto.fee }</label>
			</p>
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">缴费日期：</label>
				<label><fmt:formatDate value="${dto.payDate }"
									pattern="yyyy-MM-dd HH:mm" /></label>
			</p>
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">微信支付单号：</label>
				<label>${dto.payNo }</label>
			</p>
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">交易号：</label>
				<label>${dto.transactionId }</label>
			</p>
			<div class="table01">

				<a href="${path}/lj-feeHistory/list.action" class="gray">返回</a>

			</div>
		</div>
	</div>
</body>
</html>