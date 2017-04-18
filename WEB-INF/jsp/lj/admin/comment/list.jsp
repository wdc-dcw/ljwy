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
	<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
		type="text/css" />
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
	</head>
	<script type="text/javascript">
	function doSearch(gotoPage) {
		$("#gotoPage").val(gotoPage);
		document.forms[0].submit(); // 提交表单
	}
</script>
	<body>
		<div class="right-nav">
			<ul>
				<li><img src="../lj-resources/lj-images/home.png"></li>
				<li style="margin-left: 25px;">你当前的位置:</li>
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
				<div style="width: 100%;">
					<form name="pageForm" id="pageForm" method="post"
						action="${path}/lj-comment/list.action">
						<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
						<s:hidden name="dto.createTime" id="createTime" theme="simple" />
						<s:hidden name="dto.type" />
						<p style="margin-left: 25px; margin-top: 10px;">
							<%-- 评论时间： <input id="dto.createTime" name="dto.createTime"
							readonly="readonly"
							value="<s:date name="dto.createTime" format="yyyy-MM-dd" />"
							type="text" class="select"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'});" /> &nbsp;&nbsp;--%>
							活动名 <input name="dto.actionName" id="actionId" type="text"
								style="width: 180px;" value="${dto.actionName}" />&nbsp;&nbsp;&nbsp;
							状态 <select name="dto.status" id="status" class="select_01"
								style="width: 100px;">
								<option value=""
									<c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
								<option value="0"
									<c:if test="${dto.status == 0 }"> selected </c:if>>失效</option>
								<option value="1"
									<c:if test="${dto.status == 1 }"> selected </c:if>>有效</option>
							</select>&nbsp;&nbsp; <a id="gotoPage" href="#" onclick="doSearch(1)"
								class="button_01">查询</a>
						</p>
					</form>
				</div>
				<c:if test="${dto.type==0 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>活动名</th>
							<th>评论人</th>
							<th>评论内容</th>
							<th>是否点赞</th>
							<th>评论时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-comment/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${commentList }" var="comment">
							<tr>
								<td>${comment.action.name }</td>
								<td>${comment.user.name }</td>
								<td><ecms:truncate value="${comment.theContent }"
										length="30" suffix="..." charBoundary="true" /></td>
								<td><c:if test="${comment.isgood == '0'}">未点赞</c:if> <c:if
										test="${comment.isgood == '1'}">点赞</c:if></td>
								<td><fmt:formatDate value="${comment.createTime }"
										pattern="yyyy-MM-dd HH:mm:ss" /></td>
								<td><c:if test="${comment.status == '0'}">失效</c:if> <c:if
										test="${comment.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-comment/view.action?dto.id=${comment.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${comment.status!=0 }">
										<a
											href="${path}/lj-comment/entityInit.action?dto.id=${comment.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-comment/delete.action?dto.id=${comment.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>
				<c:if test="${dto.type==1 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>商品名</th>
							<th>评论人</th>
							<th>评论内容</th>
							<th>是否点赞</th>
							<th>评论时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-comment/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${commentList }" var="comment">
							<tr>
								<td>${comment.action.name }</td>
								<td>${comment.user.name }</td>
								<td><ecms:truncate value="${comment.theContent }"
										length="30" suffix="..." charBoundary="true" /></td>
								<td><c:if test="${comment.isgood == '0'}">未点赞</c:if> <c:if
										test="${comment.isgood == '1'}">点赞</c:if></td>
								<td><fmt:formatDate value="${comment.createTime }"
										pattern="yyyy-MM-dd HH:mm:ss" /></td>
								<td><c:if test="${comment.status == '0'}">失效</c:if> <c:if
										test="${comment.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-comment/view.action?dto.id=${comment.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${comment.status!=0 }">
										<a
											href="${path}/lj-comment/entityInit.action?dto.id=${comment.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-comment/delete.action?dto.id=${comment.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>
				<div class="fy" style="width: 82%; margin-top: 10px">
					<p>
						第
						<s:property value="dto.gotoPage" />
						页 , 共
						<s:property value="dto.pages" />
						页 , 共
						<s:property value="dto.listSize" />
						条 <a href="#" onclick="doSearch(1)" class="fy_left0"></a>
						<s:if test="dto.gotoPage-1 > 0 ">
							<a href="#"
								onclick="doSearch(<s:property value="dto.gotoPage-1" />)"
								class="fy_left"></a>
						</s:if>
						<s:else>
							<a href="#" class="fy_left"></a>
						</s:else>

						<s:if test="dto.gotoPage+1 <= dto.pages ">
							<a href="#"
								onclick="doSearch(<s:property value="dto.gotoPage+1" />)"
								class="fy_right"></a>
						</s:if>
						<s:else>
							<a href="#" class="fy_right"></a>
						</s:else>
						<a href="#" onclick="doSearch(<s:property value="dto.pages" />)"
							class="fy_right0"></a>
					</p>
				</div>
			</div>
		</div>
	</body>
</html>