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
<title>报修查看</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
</head>

<script type="text/javascript">
	function doSearch(gotoPage) {
		$("#gotoPage").val(gotoPage);
		document.forms[0].submit(); // 提交表单
	}
	
	function del(id){
		
		if(confirm(getMessage('MST0009'))){
			var url = "${path}/lj-repair/delete.action?dto.id="+id;
			$("#pageForm")[0].action = url;
			preCheck('pageForm'); 

		}else{
			return;
		}
		
	}
	function initYearMonth(){
		var now =  new Date();  
		var currentYear = now.getFullYear();
		
		for(var i = currentYear - 5; i<=currentYear + 5;i++){
			if("${dto.year}" == i){ 
				$("#year").append("<option selected value='"+i+"'>"+i+"</option>");
			}else{
				$("#year").append("<option value='"+i+"'>"+i+"</option>");
			}
			
			
		}
		
		for(var m = 1; m<=12;m++){
			if("${dto.month}" == m){ 
				$("#month").append("<option selected value='"+m+"'>"+m+"</option>");
			}else{
				$("#month").append("<option value='"+m+"'>"+m+"</option>");
			}
		}
		
	}
	
	// 初始化页面数据
	$(document).ready(function() {
		initYearMonth();
	});  
</script>
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
		<div class="glkList" style="width: 100%;>

			<div style="width: 100%;">
				<form name="pageForm" id="pageForm" method="post" action="${path}/lj-repair/list.action">
					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
					<s:hidden name="dto.type" />
				  <p style="margin-left: 25px; margin-top: 10px;">
						年 <select name="dto.year" id="year" class="select_01" style="width: 100px;">
							<option value="" <c:if test="${empty dto.year}"> selected </c:if>>请选择</option>
						</select> 
						月 <select name="dto.month" id="month" class="select_01" style="width: 100px;">
							<option value="" <c:if test="${empty dto.month}"> selected </c:if>>请选择</option>
						</select>
					<c:if test="${dto.type==0 }">
						
							报修地址<input id="dto.roomCode" name="dto.roomCode"
								class="select_01" value="${dto.roomCode }" /> &nbsp;&nbsp; 报修状态
							<select name="dto.status" id="status" class="select_01"
								style="width: 100px;">
								<option value="" <c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
								<option value="0" <c:if test="${dto.status == 0 }"> selected </c:if>>未处理</option>
								<%-- <option value="1" <c:if test="${dto.status == 1 }"> selected </c:if>>已处理</option> --%>
							    <option value="2" <c:if test="${dto.status == 2 }"> selected </c:if>>已处理</option>  
								<option value="3" <c:if test="${dto.status == 3 }"> selected </c:if>>已撤销</option>
								<option value="4" <c:if test="${dto.status == 4 }"> selected </c:if>>已评价</option>
							</select>  
					</c:if>
					<c:if test="${dto.type==1 }">
							投诉状态 <select name="dto.status" id="status" class="select_01"
								style="width: 100px;">
								<option value="" <c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
								<option value="0" <c:if test="${dto.status == 0 }"> selected </c:if>>未处理</option>
								<%-- <option value="1" <c:if test="${dto.status == 1 }"> selected </c:if>>已处理</option> --%>
								<option value="2" <c:if test="${dto.status == 2 }"> selected </c:if>>已处理</option>
								<option value="3" <c:if test="${dto.status == 3 }"> selected </c:if>>已撤销</option>
								<option value="4" <c:if test="${dto.status == 3 }"> selected </c:if>>已处理</option>
							</select> 
					</c:if>
					<a id="gotoPage" href="#" onclick="doSearch(1)" class="button_01">查询</a>
				 </p>
			</div>
			<table
				style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 90%; text-align: center;">
				<tr>
					<th>用户名</th>
					<c:if test="${dto.type==0 }">
						<th>报修物品</th>
						<th>报修地址</th>
						<th>报修状态</th>
						<th>报修时间</th>
					</c:if>
					<c:if test="${dto.type==1 }">
						<th>投诉标题</th>
						<th>处理状态</th>
						<th>投诉时间</th>
					</c:if>
					<th>完成时间</th>
					<th>操作<%-- <a title="新增"
						href="${path}/lj-repair/entityInit.action?dto.type=${dto.type}"><img
							src="${path}/mst-images/add.png" style="width: 10px;" /></a> --%>
					</th>
				</tr>
				<c:forEach items="${repairCplnList }" var="repair">
					<tr>
						<td>${repair.reporterId }</td>
						<td>${repair.title }</td>
						<c:if test="${dto.type==0 }">
							<td>${repair.roomCode }</td>
							<td>
							  <c:if test="${repair.status == '0'}">未处理</c:if>
							 <%--  <c:if test="${repair.status == '1'}">处理中</c:if>  --%>
							  <c:if test="${repair.status == '2'}">已处理</c:if>
							  <c:if test="${repair.status == '3'}">已撤销</c:if>
							   <c:if test="${repair.status == '4'}">已评价</c:if>
							</td>
						</c:if>
						<c:if test="${dto.type==1 }">
							<td>
							   <c:if test="${repair.status == '0'}">未处理</c:if> 
							   <c:if test="${repair.status == '1'}">处理中</c:if> 
							   <c:if test="${repair.status == '2'}">已处理</c:if>
							   <c:if test="${repair.status == '3'}">已撤销</c:if>
							   <c:if test="${repair.status == '4'}">已评价</c:if>
							  
						    </td>
						</c:if>
						<td><fmt:formatDate value="${repair.reportTime }"
								pattern="yyyy-MM-dd HH:mm:ss" /></td>
						<td><fmt:formatDate value="${repair.finishTime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
						<td><a href="${path}/lj-repair/view.action?dto.id=${repair.id}&dto.type=${dto.type}">查看</a>
						<c:if test="${repair.status==2 || repair.status==4}">
							<a href="javascript:del(${repair.id})">删除</a>
						</c:if>
							<%-- 
							<c:if test="${repair.status!=2&&repair.status!=3 }">
								<a href="${path}/lj-repair/entityInit.action?dto.id=${repair.id}&dto.type=${dto.type}">修改</a>
							</c:if>
							 --%>
							<c:if test="${repair.status == '0'}">
							   <a href="${path}/lj-repair/toDealWith.action?dto.id=${repair.id}&dto.type=${dto.type}">已处理</a> 
							</c:if> 
						   
						</td>
					</tr>
				</c:forEach>
			</table>
			</form>
			<div class="fy" style="width: 82%; margin-top: 10px" >
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