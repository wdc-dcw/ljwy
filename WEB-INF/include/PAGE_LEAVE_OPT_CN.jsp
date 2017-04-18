<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<input type="hidden" id="ifAlert" name="ifAlert" value="" labelTxt="离开页面的提示" class="input_04" size="20" maxlength="120"/>

<script type="text/javascript">
<!--
window.onbeforeunload = function(e){
	if('${workflowPage}'=='editInput') {
		var check = $("#ifAlert").val();
		if(!check || check==0){
			return "";
		}
	}
};

setInterval("sesionIsValid()",1*60*1000);
//进到本页面的时间
var _enterTime = new Date().getTime();

//如果有父级页面，更新父级页面进入本页面时间，防止父级页面session到期
function setEnterTime(curFrame,enterTime){
	curFrame._enterTime = enterTime;
	if(curFrame.top != curFrame.self){
		setEnterTime(curFrame.parent,enterTime);
	}
}
$(document).ready(function(){
	if(top != self){
		setEnterTime(parent,_enterTime);
	}
})

//session超期时间
var _activeTime = <%=session.getMaxInactiveInterval()%>;

/**
 * 提示session是否超期
 */
function sesionIsValid(){
	 //在本页面停留的时间
	var _curTime = new Date().getTime();
	var duration = _activeTime*1000-(_curTime-_enterTime);
	if(duration<=1*60*1000){//小于一分钟
		if(duration<=0){
			alert(getMessage('ACT0010'));
			window.clearInterval();
			window.location.href = '${path}/login.jsp';
		}else{
			alert(getMessage('ACT0011'));
		}
	}
}
//-->
</script>
