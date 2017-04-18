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
	function doSearch(gotoPage) {
		$("#gotoPage").val(gotoPage);
		document.forms[0].submit(); // 提交表单
	}

	function urgedPayMoney() {

		$
				.ajax({
					type : "POST",
					url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=urgedPayMoney',
					data : {
						"dto.userName" : $("#userName").val(),
						"dto.gotoPage":$("#gotoPage").val(),
						"dto.feeType" : $("#feeType").val()
					},
					dataType : "json",
					async : false,
					success : function(msg) {
						alert(msg);
					}
				});
	}

	function urgedPayMoneyOnlyOne(userId, feeType, roomCode, carCode, feeTerm) {

		$
				.ajax({
					type : "POST",
					url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=urgedPayMoneyOnlyOne',
					data : {
						"dto.userId" : userId,
						"dto.feeType" : feeType,
						"dto.roomCode" : roomCode,
						"dto.carCode" : carCode,
						"dto.feeTerm" : feeTerm
					},
					dataType : "json",
					async : false,
					success : function(msg) {
						alert(msg);
					}
				});
	}
</script>
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<li>物业缴费</li>
			<li>></li>
			<li>欠费情况查看</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">

			<div style="width: 1000px;">
				<form name="pageForm" id="pageForm"
					action="${path}/lj-feeHistory/urgedPayMoneyList.action"
					method="post">
					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
					<p style="margin-left: 25px; margin-top: 10px;">
						<%-- 缴费期别： <input id="feeTerm" name="dto.feeTerm" readonly="readonly"
							value="${dto.feeTerm}" type="text" class="inputDate"
							style="width: 90px;" onfocus="WdatePicker({dateFmt:'yyyyMM'});" />&nbsp;&nbsp;&nbsp; --%>
						缴费类别：<select name="dto.type" id="type" class="select_01">
							<option value="">全部</option>
							<option value="0"
								<c:if test="${dto.type== 0 }"> selected </c:if>>物业费</option>
							<option value="1"
								<c:if test="${dto.type== 1 }"> selected </c:if>>停车费</option>
						</select>&nbsp;&nbsp;&nbsp; 用户名：<input name="dto.userName" id="userName"
							type="text" style="width: 150px;" value="${dto.userName}" />&nbsp;&nbsp;&nbsp;
						<input type="submit" value="查询" /> <a href="###"
							onclick="urgedPayMoney()">一键催缴</a>
					</p>
				</form>
			</div>
			<table
				style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 90%; text-align: center;">
				<tr>
					<th>用户账号</th>
					<th>用户名</th>
					<th>缴费类别</th>
					<th>单元代码</th>
					<!-- <th>车位号</th>
					<th>欠费期别</th> -->
					<th>欠费金额</th>
					<th>操作</th>
				</tr>
				<%-- <c:forEach items="${feeHistoryList }" var="feeList">
					<tr>
						<input type="hidden" name="dto.userId" value="${feeList.userId }" />
						<td>${feeList.user.name }</td>
						<td><c:if test="${feeList.feeType==0 }">物业费</c:if> <c:if
								test="${feeList.feeType==1 }">停车费</c:if></td>
						<td>${feeList.roomCode }</td>
						<td><c:if test="${feeList.carCode==0 }">无</c:if> <c:if
								test="${feeList.carCode!=0 }">${feeList.carCode }</c:if></td>
						<td>${feeList.feeTerm }</td>
						<td>${feeList.feeMoney }</td>
						<td><a
							onclick="urgedPayMoneyOnlyOne('${feeList.userId}','${feeList.feeType}','${feeList.roomCode}','${feeList.carCode}','${feeList.feeTerm}')"
							href="###">催缴</a></td>
					</tr>
				</c:forEach> --%>

				 <s:iterator value="feeHistoryList">
					<tr>
						<input type="hidden" name="dto.userId"
							value=<s:property value="userId" /> />
						<td><s:property value="userId" /></td>
						<td><s:property value="user.name" /></td>
						<td><s:set name="type" value="type" /> <s:if
								test="#type==0 ">物业费</s:if> <s:if test="#type==1 ">停车费</s:if></td>
						<td>
						<s:property value="roomCode" />
						 </td>
						<%-- <td><s:set name="carType" value="carCode" /> <s:if
								test="#carType==0"></s:if> <s:if test="#carType!=0">
								<s:property value="carCode" />
							</s:if></td>
						<td><s:property value="feeTerm" /></td> --%>
						<td><s:property value="feeMoney" /></td>
						<td><a
							onclick="urgedPayMoneyOnlyOne('<s:property value="userId" />','<s:property value="feeType" />','<s:property value="roomCode" />','<s:property value="carCode" />','<s:property value="feeTerm" />')"
							href="###">催缴</a></td>
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