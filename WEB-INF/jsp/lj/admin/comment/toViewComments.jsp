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
	
	function view(theContent){
		
		alert("评论内容："+theContent);
	}
</script>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">你当前的位置:</li>
			<c:if test="${dto.type==0 }">
				<li>活动评论</li>
				<li>></li>
				<li>${actionName }>评论</li>
			</c:if>
			<c:if test="${dto.type==1 }">
				<li>商品评论</li>
				<li>></li>
				<li>${actionName }>评论</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">
			<div style="width: 100%;">
				<form name="pageForm" id="pageForm" method="post"
					action="${path}/lj-comment/toViewComments.action">
					<s:hidden name="dto.actionId" theme="simple" />
					<s:hidden name="dto.type" />
					<input type="hidden" name="url" value="${url}" />
					<p style="margin-left: 25px; margin-top: 10px;"></p>
				</form>
			</div>
			<c:if test="${dto.type==0 }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>评论人</th>
						<th>评论内容</th>
						<th>评论时间</th>
						<th>操作</th>
					</tr>
					<c:forEach items="${commentList }" var="comment">
						<tr>
							<td>${comment.user.name }</td>
							<td><ecms:truncate value="${comment.theContent }"
									length="30" suffix="..." charBoundary="true" /></td>
							<td><fmt:formatDate value="${comment.createTime }"
									pattern="yyyy-MM-dd" /></td>
							<td><a href="#" onclick="view('${comment.theContent }')">查看详情</a>
							</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>
			<c:if test="${dto.type==1 }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>评论人</th>
						<th>评论内容</th>
						<th>评论时间</th>
						<th>操作</th>
					</tr>
					<c:forEach items="${commentList }" var="comment">
						<tr>
							<td>${comment.user.name }</td>
							<td><ecms:truncate value="${comment.theContent }"
									length="30" suffix="..." charBoundary="true" /></td>
							<td><fmt:formatDate value="${comment.createTime }"
									pattern="yyyy-MM-dd" /></td>
							<td><a href="#" onclick="view('${comment.theContent }')">查看详情</a>
								<a href="${url}" class="gray">返回</a></td>
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
			<div class="table01">
				<a href="${url}" class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>