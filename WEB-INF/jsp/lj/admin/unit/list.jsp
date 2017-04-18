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
	
	function del(id){
		
		if(confirm(getMessage('MST0009'))){
			var url = "${path}/lj-room/deleteRoom.action?dto.id="+id;
			$("#pageForm")[0].action = url;
			preCheck('pageForm'); 

		}else{
			return;
		}
		
	}
</script>
	<body>
		<div class="right-nav">
			<ul>
				<li><img src="../lj-resources/lj-images/home.png"></li>
				<li style="margin-left: 25px;">您当前的位置：</li>
					<li>单元管理</li>
					<li>></li>
					<li>小区管理</li>
			</ul>
		</div>
		<div class="main">
			<div class="glkList">
				<div>
					<form name="pageForm" id="pageForm" method="post"
						action="${path}/lj-room/list.action">
						<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
						<p style="margin-left: 25px; margin-top: 10px;">
						
							所属小区<select name="dto.kbn.id" id="dto.kbnId" class="select_01"
								style="width: 100px;">
								<option value="">请选择</option>
									<c:forEach items="${bigColumnList }" var="kbn">
												<option value="${kbn.id }"
													<c:if test="${dto.kbnId == kbn.id }"> selected </c:if>>
													${kbn.nameCn }</option>
									</c:forEach>
							</select> &nbsp;&nbsp;&nbsp; 
							室号<input type="text" id="dto.code" name="dto.code" value="${dto.code }"/>
							<a id="gotoPage" href="#"
								onclick="doSearch(1)" class="button_01">查询</a>
					</form>

					</p>
				</div>
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>所属小区</th>
							<th>室号</th>
							<th>建筑面积</th>
							<th>物业费(元/平米)</th>
							<th>物业费(元/月)</th>
							<th>操作<a title="新增"
								href="${path}/lj-room/entityInit.action"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${roomList }" var="room">
							<tr>
								<td>${room.kbn.nameCn}</td>
								<td>${room.code }</td>
								<td>${room.measureOfArea }</td>
								<td>${room.priceSquareMeter }</td>
								<td>${room.totalPrice }</td>
								<td><a
									href="${path}/lj-room/view.action?dto.id=${room.id}">查看</a>
										<a
											href="${path}/lj-room/entityInit.action?dto.id=${room.id}">修改</a>
										<a title="删除" href="javascript:del(${room.id })">删除</a>
								</td>
							</tr>
						</c:forEach>

					</table>

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