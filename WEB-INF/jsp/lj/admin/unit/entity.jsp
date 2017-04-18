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
	<title>易理家物业后台管理系统</title>

	<link type="text/css" rel="stylesheet"
		href="../lj-resources/lj-css/style.css" />
	<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
		type="text/css" />
	<script src="${path}/mst-js/ztree/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
	<!-- *************************富文本********************************************* -->
	<script type="text/javascript" href="../ueditor/lang/zh-cn/zh-cn.js"></script>
	<!-- 配置文件 -->
	<script type="text/javascript" src="${path}/ueditor/ueditor.config.js"></script>
	<!-- 编辑器源码文件 -->
	<script type="text/javascript" src="${path}/ueditor/ueditor.all.js"></script>
	<!-- 实例化编辑器 -->
	<%-- <link href="${path}/mst-css/style.css" rel="stylesheet" type="text/css" /> --%>
	</head>
	<script type="text/javascript">
	  function getTotalPrice(){
	  		$.ajax({
	  			type:"POST",
	  			url:"${path}/lj-room/lj-room-info-ajax.action?method=getTotalPrice",
	  			data:{
	  				"dto.measureOfArea":$("#measureOfArea").val(),
	  				"dto.priceSquareMeter":$("#priceSquareMeter").val()
	  			},
	  			dataType : "text",
	  			async : false,
	  			success : function(data) {
	  				$("#totalPrice").val(data);
	  			}
	  		});
	  }
	
	</script>
	<style>
.edui-default .edui-toolbar {
	width: 700px;
}
</style>

	<bodyoverflow:hidden;">
		<div class="right-nav">
			<ul>
				<li><img src="../lj-resources/lj-images/home.png"></li>
				<li style="margin-left: 25px;">您当前的位置：</li>
					<li>单元管理</li>
					<li>></li>
					<li>新增或修改房间</li>
			</ul>
		</div>
		<div class="main">
			<div class="glkList" style="width: 100%; height: auto;">
				<s:form id="form" name="form" action="/lj-room/saveRoom.action"
					method="post">
					<s:hidden name="dto.id" />
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">所属小区:<b><font
									class="ff6600">*</font></b></label>
							<select name="dto.kbnId" id="kbnId" class="select_01" labelTxt="所属小区" require="true"
								style="width: 100px;">
								<option value="">请选择</option>
									<c:forEach items="${bigColumnList }" var="kbn">
												<option value="${kbn.id }" <c:if test="${dto.kbnId == kbn.id }"> selected </c:if>>
																	${kbn.nameCn }</option>
									</c:forEach>
							</select>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">
								室号:<b><font class="ff6600">*</font></b>
							</label>
							<input id="code" name="dto.code" type="text"
								maxlength="15" value="${dto.code }" labelTxt="室号"
													require="true"/>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">建筑面积:<b><font
									class="ff6600">*</font></b></label>
									<input id="measureOfArea" name="dto.measureOfArea" type="text"
								maxlength="15" value="${dto.measureOfArea }" labelTxt="建筑面积"
												onchange="getTotalPrice()"	require="true"/>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">物业费(元/平米):<b><font
									class="ff6600">*</font></b></label>
									<input id="priceSquareMeter" name="dto.priceSquareMeter" type="text"
								 maxlength="15" onchange="getTotalPrice()" value="${dto.priceSquareMeter }" labelTxt="物业费(元/平米)"
													require="true"/>
						</p>
						
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">物业费(元/月):<b><font
									class="ff6600">*</font></b></label>
									<input id="totalPrice" name="dto.totalPrice" type="text"
								 maxlength="15"  labelTxt="物业费(元/月)"
												value=${dto.totalPrice } require="true"/>
						</p>

						<div class="table01">
							<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
									key="common.submit.btn" /></a> <a
								href="${path}/lj-room/list.action"
								class="gray">返回</a>
						</div>
				</s:form>
			</div>

		</div>

		</body>
</html>