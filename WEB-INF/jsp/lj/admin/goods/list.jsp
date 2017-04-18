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
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript">
function doSearch(gotoPage){
	$("#gotoPage").val(gotoPage);
   document.forms[0].submit(); // 提交表单
}

function getSmallGoodsTypeList(bigGoodsType) {
	if (bigGoodsType.value != "") {
		$.ajax({
				type : "POST",
				url : '${path}/lj-goods/lj-goods-ajax.action?method=getSmallGoodsTypeList',
				data : {
					"bigGoodsTypeId" : bigGoodsType.value
				},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data != null) {
						$("#smallGoodsType").empty();
						$("#smallGoodsType").append($("<option value=''>请选择</option>"));
						for (var i = 0; i < data.length; i++) {
							$("#smallGoodsType").append(
									$("<option value='" + data[i].id + "'>"
										+ data[i].nameCn + "</option>"));
							}
						}
					}
				});
	}

}
</script>

</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.isSecond==1 }">
				<li>生活服务</li>
				<li>></li>
				<li>二手商品管理</li>
			</c:if>
			<c:if test="${dto.isSecond==0 }">
				<li>生活服务</li>
				<li>></li>
				<li>商品管理</li>
			</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList" style="width: 100%; height: 100%;">

			<div style="width: 100%;">
				<form name="pageForm" id="pageForm"
					action="${path}/lj-goods/list.action" method="post">
					<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
					<s:hidden name="dto.isSecond" />
					<p style="margin-left: 25px; margin-top: 10px;">
						大类型：<select name="dto.bigGoodsTypeId" id="bigGoodsType"
							class="select_01" onchange="getSmallGoodsTypeList(this)">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="bigGoodsType">
								<option value="${bigGoodsType.id}"
									<c:if test="${bigGoodsType.id==dto.bigGoodsTypeId }">selected</c:if>>${bigGoodsType.nameCn}</option>
							</c:forEach>
						</select>&nbsp;&nbsp;&nbsp; 小类型：<select name="dto.smallGoodsTypeId"
							id="smallGoodsType" class="select_01">
							<option value="">请选择</option>
							<c:forEach items="${smallGoodsTypeList}" var="smallGoodsType">
								<option value="${smallGoodsType.id}"
									<c:if test="${smallGoodsType.id==dto.smallGoodsTypeId }">selected</c:if>>${smallGoodsType.nameCn}</option>
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
			<c:if test="${dto.isSecond==1 }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>标题</th>
						<th>大类型</th>
						<th>小类型</th>
						<th>价格</th>
						<th>发布时间</th>
						<th>发布人</th>
						<th>状态</th>
						<th>操作 <a title="新增"
							href="${path}/lj-goods/entityInit.action?dto.isSecond=${dto.isSecond}"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${goodsList}" var="goodslist">
						<tr>
							<td>${goodslist.title }</td>
							<td>${goodslist.bigGoodsType.nameCn }</td>
							<td>${goodslist.smallGoodsType.nameCn }</td>
							<td>${goodslist.price }</td>
							<td><fmt:formatDate value="${goodslist.createTime}"
									pattern="yyyy-MM-dd HH:mm:ss" /></td>
							<td>${goodslist.createrId }</td>
							<td><c:if test="${goodslist.status == '0'}">失效</c:if> <c:if
									test="${goodslist.status == '1'}">有效</c:if></td>
							<td><a
								href="${path}/lj-goods/view.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">查看</a>
								<c:if test="${goodslist.status == '1'}">
								<a
								href="${path}/lj-goods/entityInit.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">修改</a>
								<a
								href="${path}/lj-goods/deleteGoods.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">失效</a>
								</c:if>
								</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>

			<c:if test="${dto.isSecond==0 }">
				<table
					style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
					<tr>
						<th>商家名</th>
						<th>商品名</th>
						<th>大类型</th>
						<th>小类型</th>
						<th>价格</th>
						<th>库存数量</th>
						<th>状态</th>
						<th>操作 <a title="新增"
							href="${path}/lj-goods/entityInit.action?dto.isSecond=${dto.isSecond}"><img
								src="${path}/mst-images/add.png" /></a>
						</th>
					</tr>
					<c:forEach items="${goodsList}" var="goodslist">
						<tr>
							<td>${goodslist.shop.shopName }</td>
							<td>${goodslist.name }</td>
							<td>${goodslist.bigGoodsType.nameCn }</td>
							<td>${goodslist.smallGoodsType.nameCn }</td>
							<td>${goodslist.price }</td>
							<td>${goodslist.leftCnt }</td>
							<td><c:if test="${goodslist.status == '0'}">失效</c:if> <c:if
									test="${goodslist.status == '1'}">有效</c:if></td>
							<td><a
								href="${path}/lj-goods/view.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">查看</a>
								<c:if test="${goodslist.status == '1'}">
								<a
								href="${path}/lj-goods/entityInit.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">修改</a>
								<a
								href="${path}/lj-goods/deleteGoods.action?dto.id=${goodslist.id}&dto.isSecond=${dto.isSecond}">失效</a>
								</c:if>
								</td>
						</tr>
					</c:forEach>
				</table>
			</c:if>

			<div class="fy" style="margin-right: 50px;">
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