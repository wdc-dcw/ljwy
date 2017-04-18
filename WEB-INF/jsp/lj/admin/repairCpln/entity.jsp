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
	<title>报修或投诉</title>
	<link type="text/css" rel="stylesheet"
		href="../lj-resources/lj-css/style.css" />
	<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
		type="text/css" />

	<script src="${path}/mst-js/ztree/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
	<script type="text/javascript"
		src="../lj-resources/lj-js/autocomplete.min.js"></script>

	</head>
	<script type="text/javascript">
		/****表格隔行高亮显示*****/
		window.onload = function() {
			oTable = document.getElementById("purposeTbale");//找表格
			aTr = document.getElementsByTagName("tr");//找所有的行
			for (i = 0; i < aTr.length; i++) {
				if (i % 2 == 0) {
					aTr[i].style.background = "#f6f6f6";
				} else {
				}
				;
			}
			;
		};
	</script>
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

		//服务态度的选中事件
		function checkRadio() {
			if (dto.serviceMark == 0) {
				document.getElementsByName('dto.serviceMark')[0].checked = true;
			} else if (dto.serviceMark == 1) {
				document.getElementsByName('dto.serviceMark')[1].checked = true;
			} else if (dto.serviceMark == 2) {
				document.getElementsByName('dto.serviceMark')[2].checked = true;
			}

		}
	</script>
	<script type="text/javascript">
		function getUserNameList() {

			$
					.ajax({
						type : "POST",
						url : '${path}/lj-repair/lj-repair-cpln-ajax.action?method=getRoomInfoList',
						data : {
							"dto.reporterId" : $("#userId").val()
						},
						dataType : "json",
						async : false,
						success : function(json) {
							$("#buildingNoList").val(json[0]);
							/* $("#unitNoList").val(json[1]); */
							$("#roomNoList").val(json[1]);
						}
					});
		}
	</script>

	<script type="text/javascript">
		function getNameList() {
			var data = "Core Selectors Attributes Traversing Manipulation CSS Events Effects Ajax Utilities"
					.split(" ");

			$('#userId').autocomplete(data).result(
					function(event, data, formatted) {
						alert(data);
					});
		}
	</script>
	<body style="overflow: hidden;">

		<div class="right-nav">
			<ul>
				<li><img src="../lj-resources/lj-images/home.png"></li>
				<li style="margin-left: 25px;">您当前的位置：</li>
				<c:if test="${dto.type==0 }">
					<li>报修管理</li>
					<li>></li>
					<li>报修登记</li>
				</c:if>
				<c:if test="${dto.type==1 }">
					<li>投诉管理</li>
					<li>></li>
					<li>投诉登记</li>
				</c:if>
			</ul>
		</div>
		<div class="main" style="overflow: hidden;">
			<div class="glkList">
				<s:form id="form" name="form"
					action="/lj-repair/saveRepairCpln.action" method="post"
					enctype="multipart/form-data">
					<s:hidden name="dto.id" />
					<s:hidden name="dto.type" />
					<%-- <p style="margin-left: 50px;margin-top:20px;"><label style="display:block;float:left;width:120px;">报修人电话<b><font class="ff6600">*</font></b></label>
	                        <s:textfield name="dto.title" cssClass="input_04" size="120" theme="simple" labelTxt="标题" require="true" maxlength="200" id="name"></s:textfield></p> --%>
					<c:if test="${dto.type==0 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">用户名<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.reporterId" cssClass="input_04"
								onchange="getUserNameList()" theme="simple" labelTxt="报修人姓名"
								require="true" id="userId"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">报修物品<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.title" cssClass="input_04" theme="simple"
								labelTxt="报修物品" require="true" id="name"></s:textfield>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">报修地址<b><font
									class="ff6600">*</font></b></label> 楼号<select
								name="userBuildingDto.roomInfo.buildingNo" id="buildingNoList"
								class="select_01" require="true" labelTxt="楼号">
								<option value="">请选择</option>
								<c:forEach items="${buildingNoList}" var="buildingNo"
									varStatus="status">
									<option value="${buildingNo }"
										<c:if test="${buildNos== buildingNo }"> selected </c:if>>${buildingNo }</option>
								</c:forEach>
							</select>
							<%-- 单元号<select name="userBuildingDto.roomInfo.unitNo" id="unitNoList"
							class="select_01" require="true" labelTxt="单元号">
							<option value="">请选择</option>
							<c:forEach items="${unitNoList}" var="unitNo" varStatus="status">
								<option value="${unitNo }"
									<c:if test="${unitNos== unitNo }"> selected </c:if>>${unitNo }</option>
							</c:forEach>
						</select>  --%>
							房间号<select name="userBuildingDto.roomInfo.roomNo" id="roomNoList"
								class="select_01" require="true" labelTxt="房间号">
								<option value="">请选择</option>
								<c:forEach items="${roomNoList}" var="roomNo" varStatus="status">
									<option value="${roomNo }"
										<c:if test="${roomNos== roomNo }"> selected </c:if>>${roomNo }</option>
								</c:forEach>
							</select>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">联系人<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.contacter" cssClass="input_04"
								theme="simple" labelTxt="联系人" require="true" id="contacter"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">联系电话<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.contacterTel" cssClass="input_04"
								theme="simple" labelTxt="报修物品" require="true" id="contacterTel"
								format="mobile"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">报修概述<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent" cols="90"
								rows="8" theme="simple" class="input_05" require="true"
								labelTxt="报修概述">${dto.theContent} </textarea>

						</p>
						<%-- <c:if test="${dto.id!=null}">
							<p style="margin-left: 50px; margin-top: 20px;">
								<label style="display: block; float: left; width: 120px;">报修状态<b><font
										class="ff6600">*</font></b></label> <select name="dto.status" id="status"
									class="select_01" style="width: 100px;">
									<option value=""
										<c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
									<option value="1"
										<c:if test="${dto.status == 1 }"> selected </c:if>>处理中</option>
									<option value="2"
										<c:if test="${dto.status == 2 }"> selected </c:if>>已处理</option>
								</select>
							</p>
							<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">服务态度<b><font
									class="ff6600">*</font></b>
							</label>
							<s:radio name="dto.serviceMark"
								list="%{#{'0':'差','1':'一般','2':'好'}}" onchange="checkRadio()"
								theme="simple" />

						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">处理速度<b><font
									class="ff6600">*</font></b>
							</label>
							<s:radio name="dto.speedMark"
								list="%{#{'0':'慢','1':'一般','2':'快'}}" onchange="checkRadio()"
								theme="simple" />
						</p>
						</c:if> --%>

					</c:if>

					<c:if test="${dto.type==1 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">用户名<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.reporterId" cssClass="input_04"
								theme="simple" labelTxt="用户名" require="true" id="userId"></s:textfield>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">投诉标题<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.title" cssClass="input_04" theme="simple"
								labelTxt="投诉标题" require="true" id="name"></s:textfield>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">投诉内容<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent" cols="90"
								rows="8" theme="simple" class="input_05" require="true"
								labelTxt="投诉内容">${dto.theContent} </textarea>
						</p>

						<%-- <c:if test="${dto.id!=null}">
							<p style="margin-left: 50px; margin-top: 20px;">
								<label style="display: block; float: left; width: 120px;">投诉状态<b><font
										class="ff6600">*</font></b></label> <select name="dto.status"
									id="dto.status" class="select_01" style="width: 100px;">
									<option value=""
										<c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
									<option value="1"
										<c:if test="${dto.status == 1 }"> selected </c:if>>处理中</option>
									<option value="2"
										<c:if test="${dto.status == 2 }"> selected </c:if>>已处理</option>
								</select>
							</p>

							<p style="margin-left: 50px; margin-top: 20px;">
								<label style="display: block; float: left; width: 120px;">服务态度<b><font
										class="ff6600">*</font></b>
								</label>
								<s:radio name="dto.serviceMark"
									list="%{#{'0':'差','1':'一般','2':'好'}}" onchange="checkRadio()"
									theme="simple" />

							</p>
							<p style="margin-left: 50px; margin-top: 20px;">
								<label style="display: block; float: left; width: 120px;">处理速度<b><font
										class="ff6600">*</font></b>
								</label>
								<s:radio name="dto.speedMark"
									list="%{#{'0':'慢','1':'一般','2':'快'}}" onchange="checkRadio()"
									theme="simple" />
							</p>
						</c:if> --%>
					</c:if>
					<%-- <c:if test="${dto.id!=null && dto.status==2}">
					<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">完成时间<b><font
								class="ff6600">*</font></b></label> <input id="finishTime" require="true"
							name="dto.finishTime" readonly="readonly"
							value="${dto.finishTime }" type="text" labelTxt="完成时间"
							class="inputDate" style="width: 150px;"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});" />
					</p>
				</c:if> --%>
					<table id="purposeTbale"
						style="margin-left: 50px; margin-top: 20px;">
						<tr style="background-color: gray">
							<td style="display: block; float: left; width: 116px;">添加照片</td>
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

					<div class="table01">
						<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
								key="common.submit.btn" /></a> <a
							href="${path}/lj-repair/list.action?dto.type=${dto.type}"
							class="gray">返回</a>
					</div>
				</s:form>
			</div>
		</div>
	</body>
</html>