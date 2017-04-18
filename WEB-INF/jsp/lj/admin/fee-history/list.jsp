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
<script type="text/javascript">
function doSearch(gotoPage){
	$("#gotoPage").val(gotoPage);
   document.forms[0].submit(); // 提交表单
}


function urgedPayMoney() {

	$.ajax({
				type : "POST",
				url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=worthOfToAll',
				dataType : "json",
				async : false,
				success : function(msg) {
					alert(msg);
				}
			});
}
</script>
<!-- <link href="../mst-css/style.css" rel="stylesheet" type="text/css" /> -->
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
		<div class="glkList">
			<form name="pageForm" id="pageForm"
				action="${path}/lj-feeHistory/list.action" method="post">
				<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
				<s:hidden name="dto.status"/>
				<p style="margin-left: 25px; margin-top: 10px;">
					用户姓名：<input name="dto.userName" id="userName" type="text"
						style="width: 90px;" value="${dto.userName}" />&nbsp;&nbsp;&nbsp;
					单元编号：<input name="dto.roomCode" id="roomCode" type="text"
						style="width: 90px;" value="${dto.roomCode}" />&nbsp;&nbsp;&nbsp;
					车位号：<input name="dto.parkNo" id="parkNo" type="text"
						style="width: 90px;" <c:if test="${dto.parkNo!=0}">value="${dto.parkNo}"</c:if> 
						/>&nbsp;&nbsp;&nbsp;
					缴费类别：<select name="dto.type" id="type" class="select_01">
						<option value="">请选择</option>
						<option value="0"
							<c:if test="${dto.type== 0 }"> selected </c:if>>物业费</option>
						<option value="1"
							<c:if test="${dto.type== 1 }"> selected </c:if>>停车费</option>
					</select>&nbsp;&nbsp;&nbsp; <input type="submit" value="查询" />
					<a href="###" onclick="urgedPayMoney()">一键催缴</a>
				</p>
			</form>
			<table
				style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
				<tr>
					<th>用户姓名</th>
					<th>缴费类别</th>
					<th>单元代码</th>
					<th>车位号</th>
					<th>最后缴费期别</th>
					<th>缴费日期</th>
					<th>缴费月数</th>
					<th>缴费金额</th>
					<th>操作 <%-- <a title="新增"
						href="${path}/lj-feeHistory/entityInit.action"><img
							src="${path}/mst-images/add.png" /></a> --%>
					</th>
				</tr>
				<s:iterator value="feeHistoryList">
					<tr>
						<td><s:property value="user.name" /></td>
						<td><s:set name="type" value="type" /> <s:if
								test="#type==0 ">物业费</s:if> <s:if test="#type==1 ">停车费</s:if></td>
						<td>
						<s:property value="roomCode" />
						</td>
						<td><s:set name="carType" value="parkNo" /> <s:if
								test="#carType==0"></s:if> <s:if test="#carType!=0">
								<s:property value="parkNo" />
							</s:if></td>
						<td><s:property value="lastPeriod" /></td>
						<td><s:date name="payDate" format="yyyy-MM-dd" /></td>
						<td><s:property value="feeMonth" /></td>
						<td><s:property value="fee" /></td>
						<td><a
							href="${path}/lj-feeHistory/view.action?dto.id=<s:property value="id" />">查看</a>
							<%-- <a
							href="${path}/lj-feeHistory/entityInit.action?dto.id=<s:property value="id" />">修改</a> --%>
							<%-- <a
							href="${path}/lj-feeHistory/deleteFeeHistory.action?dto.id=<s:property value="id" />">删除</a></td> --%>
					</tr>
				</s:iterator>
			</table>
			<div class="fy" style="width: 82%; margin-top: 10px">
				<p>
					第
					<s:property value="dto.gotoPage" />
					页 ,共
					<s:property value="dto.pages" />
					页 ,共
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