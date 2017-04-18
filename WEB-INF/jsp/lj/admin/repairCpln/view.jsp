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
<title>报修详情</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.type==0 }">
				<li>报修管理</li>
				<li>></li>
				<li>报修查看</li>
			</c:if>
			<c:if test="${dto.type==1 }">
				<li>投诉管理</li>
				<li>></li>
				<li>投诉查看</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="overflow-y:scroll;margin: auto;">
			
			<c:if test="${dto.type==0 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">联系人</label>
					<label>${dto.contacter }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">报修物品</label>
					<label>${dto.title }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">报修地址</label>
					<label>${dto.roomCode }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">联系人电话</label>
					<label>${dto.reporterId }</label>
				</p>
				<%-- <p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">联系人</label>
					<label>${dto.contacter }</label>
				</p> --%>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">报修描述</label>
					<label>${dto.theContent }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">报修状态</label>
					<label> <c:if test="${dto.status == '0'}">已报修</c:if> 
							<c:if test="${dto.status == '1'}">处理中</c:if>
							<c:if test="${dto.status == '2'}">已处理</c:if>
							<c:if test="${dto.status == '3'}">已撤销</c:if>
							<c:if test="${dto.status == '4'}">已评价</c:if>
					</label>
				</p>
			</c:if>
			<c:if test="${dto.type==1 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">标题</label>
					<label>${dto.title }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">投诉内容</label>
					<label>${dto.theContent }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">处理状态</label>
					<label> <c:if test="${dto.status == '0'}">已投诉</c:if> <c:if
							test="${dto.status == '1'}">处理中</c:if> <c:if
							test="${dto.status == '2'}">已处理</c:if>
							<c:if test="${dto.status == '3'}">已撤销</c:if>
							<c:if test="${dto.status == '4'}">已评价</c:if>
					</label>
				</p>
			</c:if>
			<c:if test="${dto.status!=0 && dto.status!=2 && dto.status!=3}">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">服务态度</label>
					<label><c:if test="${dto.serviceMark == '0' || dto.serviceMark == '1'}">差</c:if> <c:if
							test="${dto.serviceMark == '2' || dto.serviceMark == '3'}">一般</c:if> <c:if
							test="${dto.serviceMark == '4' || dto.serviceMark == '5'}">好</c:if></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">处理速度</label>
					<label><c:if test="${dto.speedMark == '0' || dto.speedMark == '1'}">慢</c:if> <c:if
							test="${dto.speedMark == '2' || dto.speedMark == '3'}" >一般</c:if> <c:if
							test="${dto.speedMark == '4' || dto.speedMark == '5'}" >快</c:if>
							</label>
				</p>
			</c:if>
			
			<c:if test="${dto.type==0 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">报修时间</label>
					<label><s:date name="dto.reportTime"
							format="yyyy-MM-dd HH:mm:ss" /></label>
				</p>
			</c:if>
			<c:if test="${dto.type==1 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">投诉时间</label>
					<label><s:date name="dto.reportTime"
							format="yyyy-MM-dd HH:mm:ss" /></label>
				</p>
			</c:if>
			<c:if test="${dto.status==2 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">结束时间</label>
					<label><fmt:formatDate value="${dto.finishTime}" pattern="yyyy-MM-dd HH:mm:ss" /> </label>
				</p>
			</c:if>
			
			<p style="margin-left: 50px; margin-top: 20px;">
				<label style="display: block; float: left; width: 120px;">图片详情</label>
				<label> <c:forEach items="${repairCplnName }" var="images">
						<img src="${path}/${images}" width="80" height="80" />
					</c:forEach>
				</label>
			</p>
			<div class="table01">
				<a href="${path}/lj-repair/list.action?dto.type=${dto.type}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>