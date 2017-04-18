<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<!--图片上传添加/删除js-->
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
<meta http-equiv="Content-Type">
<title>易理家后台管理系统</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<script src="${path}/mst-js/ztree/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<script type="text/javascript">
	window.onload = function() {
		oTable = document.getElementById("purposeTbale");//找表格
		aTr = document.getElementsByTagName("tr");//找所有的行
		for (i = 0; i < aTr.length; i++) {
			aTr[i].style.background = "#f6f6f6";
		}
		;
	};
</script>
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.type==0 }">
				<li>社区活动</li>
				<li>></li>
				<li>活动评论</li>
			</c:if>
			<c:if test="${dto.type==1 }">
				<li>二手商品</li>
				<li>></li>
				<li>商品评论</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">
			<s:form id="form" name="form" action="/lj-comment/saveUpdate.action"
				method="post">
				<s:hidden name="dto.id" />
				<s:hidden name="dto.status" />
				<s:hidden name="dto.type" />
				<c:if test="${dto.type==0 }">
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">活动名称：<b><font
								class="ff6600">*</font></b></label> <select name="dto.actionId"
							id="actionId" class="select_01" require="true" labelTxt="活动名称"
							style="width: 200px;">
							<option value="">请选择</option>
							<c:forEach items="${noticeList}" var="noticeList">
								<option value="${noticeList.id}"
									<c:if test="${noticeList.id==dto.actionId }">selected</c:if>>${noticeList.name}</option>
							</c:forEach>
						</select>
					</p>
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">评论人：<b><font
								class="ff6600">*</font></b></label> <select name="dto.createId"
							id="createId" class="select_01" require="true" labelTxt="评论人"
							style="width: 120px">
							<option value="">请选择</option>
							<c:forEach items="${userList }" var="userList">
								<option value="${userList.userId }"
									<c:if test="${userList.userId== dto.createId}">selected</c:if>>${userList.name }</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">回复内容：</label>
						<textarea id="theContent" name="dto.theContent" cols="90" rows="8"
							theme="simple" class="input_05" labelTxt="报修概述">${dto.theContent} </textarea>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">是否点赞<b><font
								class="ff6600">*</font></b></label> <select name="dto.isgood" id="isgood"
							require="true" labelTxt="是否点赞" class="select_01"
							style="width: 100px;">
							<option value="">请选择</option>
							<option value="1"
								<c:if test="${dto.isgood == 1 }"> selected </c:if>>点赞</option>
							<option value="0"
								<c:if test="${dto.isgood == 0 }"> selected </c:if>>未点赞</option>
						</select>
					</p>
				</c:if>
				<div class="table01">
					<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
							key="common.submit.btn" /></a> <a
						href="${path}/lj-comment/list.action?dto.type=${dto.type}"
						class="gray">返回</a>
				</div>
			</s:form>
		</div>
	</div>
</body>
</html>