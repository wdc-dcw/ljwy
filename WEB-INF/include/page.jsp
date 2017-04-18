<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
    
<div class="fy">
     <p>第 <s:property value="dto.gotoPage" /> 页 ,共 <s:property value="dto.pages" /> 页 ,共 <s:property value="dto.listSize" />条
      <a href="#" onclick="doSearch(1)" class="fy_left0"></a>
      <s:if test="dto.gotoPage-1 > 0 "> 
		  <a href="#" onclick="doSearch(<s:property value="dto.gotoPage-1" />)" class="fy_left"></a>
	  </s:if>
	  <s:else> 
		   <a href="#" class="fy_left"></a>
	   </s:else>
		    
	   <s:if test="dto.gotoPage+1 <= dto.pages "> 
			<a href="#" onclick="doSearch(<s:property value="dto.gotoPage+1" />)" class="fy_right"></a>
	   </s:if>
	   <s:else> 
			<a href="#" class="fy_right"></a>
		</s:else>
	    <a  href="#" onclick="doSearch(<s:property value="dto.pages" />)" class="fy_right0"></a></p>
  </div>
    
<script type="text/javascript">
function doSearch( gotoPage ){
	$("#gotoPage").val(gotoPage);
   document.forms[0].submit(); // 提交表单
}
</script>