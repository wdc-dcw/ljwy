<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
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
<title>易理家物业后台管理系统</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<!-- *************************富文本********************************************* -->
<script type="text/javascript" href="../ueditor/lang/zh-cn/zh-cn.js"></script>
<!-- 配置文件 -->
<script type="text/javascript" src="${path}/ueditor/ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="${path}/ueditor/ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
	function checkFileExt() {
		var fileName = $(".doc").val();
		var extName = fileName.substring(fileName.lastIndexOf(".") + 1,
				fileName.length);
		if (extName == "jpeg" || extName == "png" || extName == "gif"
			|| extName == "jpg" || extName == "JPEG" || extName==""
				|| extName == "PNG" || extName == "GIF" || extName == "JPG") {
			preCheck('form');
		} else {
			alert("只能上传jpg、png、gif类型的图片");
		}

	}

	function getSmallGoodsTypeList(bigGoodsType) {
		if (bigGoodsType.value != "") {
			$
					.ajax({
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
		<div class="glkList" style="width: 100%;">

			<s:form id="form" name="form" action="/lj-goods/saveGoods.action"
				method="post" enctype="multipart/form-data">
				<s:hidden name="dto.id" id="id" />
				<s:hidden name="dto.isSecond" />
				<c:if test="${dto.isSecond==1 }">
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">标题：<b><font
								class="ff6600">*</font></b></label> <input name="dto.title" id="title"
							type="text" style="width: 200px;" require="true"
							value="${dto.title}" labelTxt="标题" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">大类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.bigGoodsTypeId"
							id="bigGoodsType" class="select_01"
							onchange="getSmallGoodsTypeList(this)" require="true"
							labelTxt="大类型">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="bigGoodsType">
								<option value="${bigGoodsType.id}"
									<c:if test="${bigGoodsType.id==dto.bigGoodsTypeId }">selected</c:if>>${bigGoodsType.nameCn}</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">小类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.smallGoodsTypeId"
							id="smallGoodsType" class="select_01" require="true"
							labelTxt="小类型">
							<option value="">请选择</option>
							<c:forEach items="${smallGoodsTypeList}" var="smallGoodsType">
								<option value="${smallGoodsType.id}"
									<c:if test="${smallGoodsType.id==dto.smallGoodsTypeId }">selected</c:if>>${smallGoodsType.nameCn}</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">价格：<b><font
								class="ff6600">*</font></b></label> <input name="dto.price" id="price"
							type="text" style="width: 200px;" require="true"
							value="${dto.price}" format="num" labelTxt="价格" />
					</p>
				</c:if>

				<c:if test="${dto.isSecond==0 }">

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">商家名：<b><font
								class="ff6600">*</font></b></label> <select name="dto.shopId" id="shopId"
							class="select_01" require="true" labelTxt="商家名"
							style="width: 120px;">
							<option value="">请选择</option>
							<c:forEach items="${shopList}" var="shoplist">
								<option value="${shoplist.id}"
									<c:if test="${shoplist.id==dto.shopId }">selected</c:if>>${shoplist.shopName}</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">商品名：<b><font
								class="ff6600">*</font></b></label> <input name="dto.name" id="name"
							type="text" style="width: 200px;" require="true"
							value="${dto.name}" labelTxt="商品名" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">大类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.bigGoodsTypeId"
							id="bigGoodsType" class="select_01"
							onchange="getSmallGoodsTypeList(this)" require="true"
							labelTxt="大类型">
							<option value="">请选择</option>
							<c:forEach items="${kbnList}" var="bigGoodsType">
								<option value="${bigGoodsType.id}"
									<c:if test="${bigGoodsType.id==dto.bigGoodsTypeId }">selected</c:if>>${bigGoodsType.nameCn}</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">小类型：<b><font
								class="ff6600">*</font></b></label> <select name="dto.smallGoodsTypeId"
							id="smallGoodsType" class="select_01" require="true"
							labelTxt="小类型">
							<option value="">请选择</option>
							<c:forEach items="${smallGoodsTypeList}" var="smallGoodsType">
								<option value="${smallGoodsType.id}"
									<c:if test="${smallGoodsType.id==dto.smallGoodsTypeId }">selected</c:if>>${smallGoodsType.nameCn}</option>
							</c:forEach>
						</select>
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">价格：<b><font
								class="ff6600">*</font></b></label> <input name="dto.price" id="price"
							type="text" style="width: 200px;" require="true"
							value="${dto.price}" format="num" labelTxt="价格" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">库存数量：<b><font
								class="ff6600">*</font></b></label> <input name="dto.leftCnt" id="leftCnt"
							type="text" style="width: 200px;" require="true"
							value="${dto.leftCnt}" format="num1" labelTxt="库存数量" />
					</p>

					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">商品描述：</label>
						<!-- 加载编辑器的容器 -->
						<textarea id="remark" name="dto.remark" require="true"
							labelTxt="商品描述" style="width: 600px; height: 100px;">${dto.remark} </textarea>
					</p>
					<!-- <script type="text/javascript">
						var editor = UE.getEditor('remark', {
							//默认编辑器的高度
							initialFrameHeight : 300
						});
					</script> -->
				</c:if>
				<table id="purposeTbale"
					style="margin-left: 50px; margin-top: 20px;">
					<tr style="background-color: gray">
						<td style="display: block; float: left; width: 116px;">添加图片</td>
						<td><input type="file" name="img" value="${dto.image1 }"
							class="doc" /></td>
						<td><a href="###" class="button_02"
							onclick="addRow('purposeTbale',-1,'tempRow')">+</a></td>
					</tr>

				</table>
				<table style="display: none; margin-left: 50px; margin-top: 10px;">
					<tr id="tempRow">
						<td style="display: block; float: left; width: 116px;">添加照片</td>
						<td><input type="file" name="img" value="" class="doc" /></td>
						<td><a href="###" class="button_02"
							onclick="delRow(this,'purposeTbale');">-</a></td>
					</tr>
				</table>

			</s:form>
			<div class="table01">
				<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
						key="common.submit.btn" /></a><a
					href="${path}/lj-goods/list.action?dto.isSecond=${dto.isSecond}"
					class="gray">返回</a>

			</div>
		</div>
	</div>
</body>
</html>