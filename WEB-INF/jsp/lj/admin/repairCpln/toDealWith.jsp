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
		if (extName != "jpeg" && extName != "png" && extName != "gif"
				&& extName != "jpg" && extName != "JPEG" && extName != "PNG"
				&& extName != "GIF" && extName != "JPG") {
			alert("只能上传jpg、png、gif类型的图片");
		} else {
			preCheck('form');
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
			<li style="margin-left: 15px;">您当前的位置：</li>
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
				action="/lj-repair/saveRepairCpln.action" method="post">
				<s:hidden name="dto.id" />
				<s:hidden name="dto.type" />
				<s:hidden name="userBuildingDto.roomInfo.buildingNo" />
				<s:hidden name="userBuildingDto.roomInfo.roomNo" />
				<s:hidden name="dto.status" value="1"/>
				<p style="margin-left: 50px; margin-top: 20px;">
						<label style="display: block; float: left; width: 120px;">处理人<b><font
								class="ff6600">*</font></b></label>
						<s:textfield name="dto.repairMan" cssClass="input_04" theme="simple"
							labelTxt="处理人" require="true" id="repairMan"></s:textfield>
					</p>

				<div class="table01">
					<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
							key="common.submit.btn" /></a> <a
						href="${path}/lj-repair/list.action?dto.type=${dto.type}"
						class="gray">返回</a>
				</div>
			</s:form>
		</div>
	</div>
</body>
</html>