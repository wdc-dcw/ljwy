<%@ page language="java" pageEncoding="UTF-8"%>
<a href="#messagesWIN" rel="modal" class="blue" id="msgWin"></a>
<style type="text/css">
div{ font-size:12px;}
table{ font-size:12px;}
table td{vertical-align:middle; line-height:20px;}
</style>
<div id="messagesWIN" style="display: none;">
	<iframe class="IE6_select_bug"></iframe>
	<div class="nav" style="padding: 0;">
		<img src="${pageContext.request.contextPath }/images/topicon10.gif" /> &gt;&gt; <b>信息提示</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px">
			<table width="350px" height="50px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="350px" valign="top" align="center" bgcolor="#fafafa" id="msgTD"></td>
				</tr>
			</table>
		</fieldset>
	</div>
	</br>
	<div style="padding: 0 0 9px 0; text-align: center">
		<a id="msgClose" title="关闭" href="###" class="button_01">关闭</a>
	</div>
</div>

<a href="#messagesWIN2" rel="modal" class="blue" id="msgWin2"></a>
<div id="messagesWIN2" style="display: none;">
	<iframe class="IE6_select_bug"></iframe>
	<div class="nav" style="padding: 0;">
		<img src="${pageContext.request.contextPath }/images/topicon10.gif" /> &gt;&gt; <b>信息提示</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px">
			<table width="350px" height="50px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="350px" valign="top" align="center" bgcolor="#fafafa"  id="msgTD2"></td>
				</tr>
			</table>
		</fieldset>
	</div>
	</br>
	<div style="padding: 0 0 9px 0; text-align: center">
		<a id="msgClose" title="关闭" href="###" class="button_01" onClick="closeMsgWindow2();return false;">关闭</a>
	</div>
</div>

<a href="#messagesWIN3" rel="modal" class="blue" id="msgWin3"></a>
<div id="messagesWIN3" style="display: none;">
	<iframe class="IE6_select_bug"></iframe>
	<div class="nav" style="padding: 0;">
		<img src="${pageContext.request.contextPath }/images/topicon10.gif" /> &gt;&gt; <b>信息提示</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px">
			<table width="350px" height="50px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="350px" valign="top" align="center" bgcolor="#fafafa" id="msgTD3"></td>
				</tr>
			</table>
		</fieldset>
	</div>
	</br>
	<div  style="padding: 0 0 9px 0; text-align: center">
		<a id="msgClose" title="关闭" href="###" class="button_01" onClick="closeMsgWindow3();return false;">关闭</a>
	</div>
</div>

<a href="#messagesWIN4" rel="modal" class="blue" id="msgWin4"></a>
<div id="messagesWIN4" style="display: none;">
	<iframe class="IE6_select_bug"></iframe>
	<div class="nav" style="padding: 0;">
		<img src="${pageContext.request.contextPath }/images/topicon10.gif" /> &gt;&gt; <b>信息提示</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px">
			<table width="350px" height="50px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="350px" valign="top" align="center" bgcolor="#fafafa" id="msgTD4"></td>
				</tr>
			</table>
		</fieldset>
	</div>
	</br>
	<div style="padding: 0 0 9px 0; text-align: center">
		<a id="msgClose" title="关闭" href="###" class="button_01" onClick="closeMsgWindow4();return false;">关闭</a>
	</div>
</div>

<script type="text/javascript">
<!--
 /**
 * 关闭事件
 */
 function closeMsgWindow(){
	//关闭
	$.facebox.close();
}

var homeAction = "${pageContext.request.contextPath }/homeAction.do?method=index";
function openMsgWindow(msg){
	$("#msgWin").click();
	//开始：解决Firefox和Safari不能正确弹出提示信息窗口的Bug
	if($("#facebox").find("#messagesWIN").length==0) {
		$("#facebox").find(".content").append($("#messagesWIN").clone(true).show());
	}
	//结束
	$("#facebox").find("#msgTD").text(msg);
	
	$("#facebox").find("#messagesWIN").find("#msgClose").bind("click",function(){$.facebox.close();});
}

//弹框之后，点击关闭，页面刷新
function openMsgReload(msg){
	$("#msgWin").click();
	//开始：解决Firefox和Safari不能正确弹出提示信息窗口的Bug
	if($("#facebox").find("#messagesWIN").length==0) {
		$("#facebox").find(".content").append($("#messagesWIN").clone(true).show());
	}
	//结束
	$("#facebox").find("#msgTD").text(msg);
	
	$("#facebox").find("#messagesWIN").find("#msgClose").bind("click",function(){location.reload();});
}

/**
 * 关闭事件
 */
 function closeMsgWindow2(){
	//关闭
	$.facebox.close();
	parent.location.href=homeAction;
}

function openMsgWindow2(msg){
	$("#msgWin2").click();
	//开始：解决Firefox和Safari不能正确弹出提示信息窗口的Bug
	if($("#facebox").find("#messagesWIN2").length==0) {
		$("#facebox").find(".content").append($("#messagesWIN2").clone(true).show());
	}
	//结束
	$("#facebox").find("#msgTD2").text(msg);
}

/**
 * 关闭弹出窗口之后，刷新页面
 */
 function closeMsgWindow3(){
	//关闭
	$.facebox.close();
	window.location.reload();
}
function openMsgWindow3(msg){
	$("#msgWin3").click();
	//开始：解决Firefox和Safari不能正确弹出提示信息窗口的Bug
	if($("#facebox").find("#messagesWIN3").length==0) {
		$("#facebox").find(".content").append($("#messagesWIN3").clone(true).show());
	}
	//结束
	$("#facebox").find("#msgTD3").text(msg);
}


var msgTargetUrl = "";
/**
 * 关闭弹出窗口之后，刷新页面
 */
 function closeMsgWindow4(){
	//关闭
	$.facebox.close();
	location.href = msgTargetUrl;
}
function openMsgWindow4(msg,URL){
	$("#msgWin4").click();
	//开始：解决Firefox和Safari不能正确弹出提示信息窗口的Bug
	if($("#facebox").find("#messagesWIN4").length==0) {
		$("#facebox").find(".content").append($("#messagesWIN4").clone(true).show());
	}
	//结束
	$("#facebox").find("#msgTD4").text(msg);
	msgTargetUrl = URL;
}
//-->
</script>
