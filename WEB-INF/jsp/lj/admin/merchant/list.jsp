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
<head>
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
</script>

</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${typeCode=='SQHY' }">
				<li>生活服务</li>
				<li>></li>
				<li>社区黄页管理</li>
			</c:if>
			<c:if test="${typeCode=='JZFW' }">
				<li>生活服务</li>
				<li>></li>
				<li>家政服务管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">
			<div style="width: 100%;">
				<form name="pageForm" id="pageForm"
					action="${path}/lj-merchant/list.action" method="post">
					<s:hidden name="typeCode" />
					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
					<p style="margin-left: 25px; margin-top: 10px;">
						类型：<select name="dto.smallTypeId" id="smallType" class="select_01"
							require="true" labelTxt="类型">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="smallType">
								<option value="${smallType.id}"
									<c:if test="${smallType.id==dto.smallTypeId }">selected</c:if>>${smallType.nameCn}</option>
							</c:forEach>
						</select>&nbsp;&nbsp;&nbsp;
						状态 <select name="dto.status" id="status" class="select_01"
							style="width: 100px;">
							<option value="">请选择</option>
							<option value="0"
								<c:if test="${dto.status == 0 }"> selected </c:if>>失效</option>
							<option value="1"
								<c:if test="${dto.status == 1 }"> selected </c:if>>有效</option></select> &nbsp;&nbsp;
						 <input type="submit" value="查询" />
					</p>
				</form>
			</div>
			<c:if test="${typeCode=='SQHY' }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>名称</th>
						<th>类型</th>
						<th>地址</th>
						<th>联系电话</th>
						<th>状态</th>
						<th>操作 <a title="新增"
							href="${path}/lj-merchant/entityInit.action?typeCode=${typeCode}"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${merchantList}" var="merchantlist">
						<tr>
							<td>${merchantlist.shopName }</td>
							<td>${merchantlist.smallType.nameCn }</td>
							<td>${merchantlist.address }</td>
							<td>${merchantlist.tel }</td>
							<td><c:if test="${merchantlist.status == '0'}">失效</c:if> <c:if
									test="${merchantlist.status == '1'}">有效</c:if></td>
							<td><a
								href="${path}/lj-merchant/view.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">查看</a>
								<c:if test="${merchantlist.status == '1'}">
								<a
								href="${path}/lj-merchant/entityInit.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">修改</a>
								<a
								href="${path}/lj-merchant/deleteMerchant.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">失效</a>
								</c:if>
								</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>

			<c:if test="${typeCode=='JZFW' }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>商家名称</th>
						<th>类型</th>
						<th>地址</th>
						<th>价格</th>
						<th>联系电话</th>
						<th>状态</th>
						<th>操作 <a title="新增"
							href="${path}/lj-merchant/entityInit.action?typeCode=${typeCode}"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${merchantList}" var="merchantlist">
						<tr>
							<td>${merchantlist.shopName }</td>
							<td>${merchantlist.smallType.nameCn }</td>
							<td>${merchantlist.address }</td>
							<td>${merchantlist.priceRange }</td>
							<td>${merchantlist.tel }</td>
							<td><c:if test="${merchantlist.status == '0'}">失效</c:if> <c:if
									test="${merchantlist.status == '1'}">有效</c:if></td>
							<td><a
								href="${path}/lj-merchant/view.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">查看</a>
								<c:if test="${merchantlist.status == '1'}">
								<a
								href="${path}/lj-merchant/entityInit.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">修改</a>
								<a
								href="${path}/lj-merchant/deleteMerchant.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">失效</a>
								</c:if>
								</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>

			<c:if test="${typeCode=='ESSC' }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>标题</th>
						<th>类型</th>
						<th>价格</th>
						<th>发布时间</th>
						<th>发布人</th>
						<th>状态</th>
						<th>操作 <a title="新增"
							href="${path}/lj-merchant/entityInit.action?typeCode=${typeCode}"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${merchantList}" var="merchantlist">
						<tr>
							<td>${merchantlist.productSpec }</td>
							<td>${merchantlist.smallType.nameCn }</td>
							<td>${merchantlist.priceRange }</td>
							<td>${merchantlist.createTime }</td>
							<td>${merchantlist.createrId }</td>
							<td><c:if test="${merchantlist.status == '0'}">失效</c:if> <c:if
									test="${merchantlist.status == '1'}">有效</c:if></td>
							<td><a
								href="${path}/lj-merchant/view.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">查看</a>
								<c:if test="${merchantlist.status == '1'}">
								<a
								href="${path}/lj-merchant/entityInit.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">修改</a>
								<a
								href="${path}/lj-merchant/deleteMerchant.action?dto.id=${merchantlist.id}&typeCode=${typeCode}">失效</a>
								</c:if>
								</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>

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