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
	<link rel="stylesheet" href="../lj-resources/lj-css/jquery.bigautocomplete.css" type="text/css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/jquery.bigautocomplete.js"></script>
<script type="text/javascript">

	function addressOrCar(){
		
		if($("#type").val()==1){
			$("#build_number").css("display","none");
			$("#car_number").css("display","block");
			$("#unitPrice").removeAttr("readonly"); 
		}else{
			$("#car_number").css("display","none");
			$("#build_number").css("display","block");
			$("#unitPrice").attr({ readonly: 'true' });
		}
		getRoomOrCar();
	}
	
	 function getUserNameList(){
		
		$.ajax({
			type : "POST",
			url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=getUserNameList',
			/* data : {
				"dto.userId" : $("#userid").val()
			}, */
			dataType : "json",
			async : false,
			success : function(json) {
				$("#userName").bigAutocomplete({width:204,data:JSON.parse(json),
				 callback:function(data){
					var userId=data.result;
					userId=userId.substring(11,userId.length-2);
					 $("#userid").val(userId);
					 getRoomOrCar();
				}});
			}
		});
	} 
	
	function getRoomOrCar(){
		$.ajax({
			type : "POST",
			url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=getRoomOrCar',
			data : {
				"dto.userId" : $("#userid").val(),
				"dto.type": $("#type").val()
			},
			dataType : "json",
			async : false,
			success : function(json) {
				if(json[0]!=null){
					alert(json[0]);
				}
				$("#buildingNo").val(json[1]);
				/* $("#unitNoList").val(json[1]); */
				$("#roomNo").val(json[2]);
				$("#parkNo").val(json[3]);
				$("#lastPeriod").val(json[4]);
				getRoomCarMoney();
			}
		});
	}
	
	
	function checkForm() {

		$.ajax({
			type : "POST",
			url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=getMsg',
			data : {
				"dto.fee":$("#fee").val(),
				"dto.id" : $("#id").val(),
				"dto.userId" : $("#userid").val(),
				"dto.type" : $("#type").val(),
				"dto.lastPeriod" : $("#lastPeriod").val(),
				"dto.buildingNo" : $("#buildingNo").val(),
				"dto.roomNo" : $("#roomNo").val(),
				"dto.parkNo":$("#parkNo").val(),
				"month":$("#month").val()
			},
			dataType : "json",
			async : false,
			success : function(msg) {
				if (msg != null) {
					openMsgWindow(getMessage('MST0039', msg));
					alert(msg);
				} else {
					preCheck('form');
				}
			}
		});
	}
	
	function getRoomCarMoney(){
		$.ajax({
			type : "POST",
			url : '${path}/lj-feeHistory/lj-fee-history-ajax.action?method=getRoomCarMoney',
			data : {
				"unitPrice":$("#unitPrice").val(),
				"dto.type" : $("#type").val(),
				"dto.buildingNo" : $("#buildingNo").val(),
				/* "dto.unitNo":$("#unitNoList").val(), */
				"dto.roomNo":$("#roomNo").val(),
				"dto.carCode":$("#carCode").val(),
				"month":$("#month").val()
			},
			dataType : "json",
			async : false,
			success : function(money) {
				$("#unitPrice").val(money[0]);
				$("#fee").val(money[1]);
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
			<li>缴费历史列表</li>
		</ul>
	</div>
	<div class="main">
		<div class="glkList">

			<s:form id="form" name="form"
				action="/lj-feeHistory/saveFeeHistory.action" method="post" autocomplete="off">
				<s:hidden name="dto.id" id="id" />
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">用户姓名：<b><font
							class="ff6600">*</font></b></label>
					
					<input name="dto.userName" id="userName" type="text" style="width: 200px;border:2px #CCCCCC solid;"
						onfocus="getUserNameList()" require="true"  labelTxt="用户名"/>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">用户账号：<b><font
							class="ff6600">*</font></b></label>
					
					<input name="dto.userId" id="userid" type="text" style="width: 200px;border:2px #CCCCCC solid;"
					 	require="true" readonly="readonly"  labelTxt="用户账号"/>
				</p>
				
				
				
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">缴费类别：<b><font
							class="ff6600">*</font></b></label> <select name="dto.type" id="type"
						class="select_01" require="true" labelTxt="缴费类别" onchange="addressOrCar()">
						<option value="">请选择</option>
						<option value="0"
							<c:if test="${dto.type== 0 }"> selected </c:if>>物业费</option>
						<option value="1"
							<c:if test="${dto.type== 1 }"> selected </c:if>>停车费</option>
					</select>
				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;" id="build_number">
					<label style="display: block; float: left; width: 120px;">单元地址：<b><font
							class="ff6600">*</font></b></label>
					楼号：<select name="dto.buildingNo" id="buildingNo" class="select_01"
						require="true" labelTxt="楼号" onchange="getRoomCarMoney()">
						<option value="">请选择</option>
						<c:forEach items="${buildingNoList}" var="buildingNo"
							varStatus="status">
							<option value="${buildingNo }"
								<c:if test="${dto.buildingNo== buildingNo||userBuildingNo== buildingNo }"> selected </c:if>>${buildingNo }</option>
						</c:forEach>
					</select> <%-- 单元号：<select name="dto.unitNo" id="unitNoList" class="select_01"
						require="true" labelTxt="单元号" onchange="getRoomCarMoney()">
						<option value="">请选择</option>
						<c:forEach items="${unitNoList}" var="unitNo" varStatus="status">
							<option value="${unitNo }"
								<c:if test="${dto.unitNo== unitNo||userUnitNo== unitNo }"> selected </c:if>>${unitNo }</option>
						</c:forEach>
					</select> --%> 房间号：<select name="dto.roomNo" id="roomNo" class="select_01"
						require="true" labelTxt="房间号" onchange="getRoomCarMoney()">
						<option value="">请选择</option>
						<c:forEach items="${roomNoList}" var="roomNo" varStatus="status">
							<option value="${roomNo }"
								<c:if test="${dto.roomNo== roomNo||userRoomNo== roomNo }"> selected </c:if>>${roomNo }</option>
						</c:forEach>
					</select>
				</p>
			
				<p style="margin-left: 50px; margin-top: 20px;display:none; ;" id="car_number" >
					<label style="display: block; float: left; width: 120px;">车位号：<b><font
							class="ff6600">*</font></b></label> <select name="dto.parkNo"
						id="parkNo" class="select_01" require="true" labelTxt="车位号">
						<option value="">请选择</option>
						<c:forEach items="${carCodeList}" var="carCode"
							varStatus="status">
							<option value="${carCode }"
								<c:if test="${dto.parkNo== carCode||userParkNo== carCode }"> selected </c:if>>${carCode }</option>
						</c:forEach>
					</select>
				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">最后缴费期别：<b><font
							class="ff6600">*</font></b></label> <input id="lastPeriod" require="true"
						name="dto.lastPeriod" readonly="readonly"
						value="<s:property value="lastPeriod" />" type="text"
						labelTxt="缴费开始时间" style="width: 150px;"  />
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">缴费单价：<b><font
							class="ff6600">*</font></b></label>
					<s:textfield  id="unitPrice" format="num" cssClass="input_04"
						size="10" theme="simple" labelTxt="缴费金额" require="true"
						maxlength="100" readonly="true" onchange="getRoomCarMoney()"></s:textfield>
				</p>
				 <p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">缴费月数：<b><font
							class="ff6600">*</font></b></label> 
					<select name="month"
						id="month" class="select_01" require="true" labelTxt="缴费月数" onchange="getRoomCarMoney()">
						<option value="">请选择</option>
						<c:forEach items="${monthList}" var="month"
							varStatus="status">
							<option value="${month }">${month }</option>
						</c:forEach>
					</select>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">缴费总金额：<b><font
							class="ff6600">*</font></b></label>
					<s:textfield name="dto.fee" id="fee" format="num" cssClass="input_04"
						size="10" theme="simple" labelTxt="缴费总金额" require="true"
						maxlength="100" readonly="true"></s:textfield>
				</p>
			</s:form>
			<div class="table01">
			<a href="###" onclick="checkForm()" class="gray"><fmt:message
						key="common.submit.btn" /></a>
				<a href="${path}/lj-feeHistory/list.action" class="gray">返回</a> 

			</div>
		</div>
	</div>
</body>
</html>