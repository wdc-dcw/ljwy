
<script type="text/javascript" src="js/jquery-1.5.2.js"></script>
<script type="text/javascript" src="js/simpla.jquery.configuration.js"></script>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt' %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.youthen.master.util.SystemConst" %>

<%
    response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires",-10);

    String path = request.getContextPath(); 
	request.setAttribute("path",path);
	
	String country = request.getLocale().toString().toLowerCase();
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <title>Login</title>
    <style type="text/css">
   	.errorItem {
        height: 20px;
        color: red;
        text-align: left;
        margin-top: 20px;
        margin-left: 40px;
    }
    .errorItemBack{ 
        position: absolute;
        width: 800px;
        height : 20px;
        border: 0px solid #999999;
        filter: alpha(opacity=80);  
        opacity: 0.8;  
        border-radius: 6px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        -moz-box-shadow: 1px 1px 2px #CCC;  
        -webkit-box-shadow: 1px 1px 2px #CCC;　 
    }
    .errorItemMessage {
        width: 790px;
        padding-top: 4px;
        padding-left: 10px;
        position: relative;
    }
   	</style>
   	
    <script type="text/javascript">
		 
	    window.onload = function(){
			document.getElementById("submitBtn").onclick = function(){
				return checkForm();
			}
		} 
	    
		 function checkForm(){
			$("#infTip").text("");
			var userNode = document.getElementById("j_username");
			var pwdNode = document.getElementById("j_password");
				
			if (userNode.value == null || userNode.value == "") {
				//alert("请输入用户名！");
				$("#infTip").text("请输入用户名！");
				userNode.focus();
				return false ;
			} if (pwdNode.value == null || pwdNode.value == "") {
				//alert("请输入密码！");
				$("#infTip").text("请输入密码！");
				pwdNode.focus();
				return false ;
			}  
			return true;
		 }
         
    </script>
   <link rel="shortcut icon" href="images/logo-youthen.png">
</head>
<body>
   
<div class="login_bg1">
  <div class="login_box">
    <div class="login_bg2"></div>
    <div class="login_bg3">
      <div class="login">
       <form name="loginForm" id="loginForm" action="j_spring_security_check" method="post" >
        <p class="login_p1" ><img src="images/logo-<%=SystemConst.CUSTOMER_NAME%>.png"   class="login_logo"/></p>
        <fieldset  style="border:1px solid #dbdbdb"><legend><p class="login_p2"> <s:text name="login.welcome"/><s:text name="systemName"/></p></legend>
        <div class="login_table">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_box_ff">
            <%-- <tr>
              <td class="login_table_span td1"><span class="login_table_span"><s:text name="language"/></span></td>
              <td  >
              	<select name="local" class="input_05">
              	  <option value="EN" 
              	  	<%if(country.toLowerCase().startsWith("en")){%>selected<%}%>>English
              	  </option>
              	  <option value="CN" <%if(country.equalsIgnoreCase("zh")){ %>selected<%}%>>简体中文</option>
              	  <option value="BIG5" <%if(country.endsWith("hk")||country.endsWith("tw")){%>selected<%}%>>繁体中文</option>
              	</select>
              </td>
            </tr> --%>
            <tr>
              <td class="login_table_span td1"><span class="login_table_span"><s:text name="login.userId"/></span></td>
              <td  ><input type="text" class="input_04" name="j_username" style="width: 200px;" value="" id="j_username" /><br/>
              </td>
            </tr>
            <tr>
              <td  class="login_table_span td1"><span class="login_table_span"><s:text name="login.pwd"/></span></td>
              <td><input type="password" class="input_04"  name="j_password" style="width: 200px;" value="" id="j_password" /></td> 
            </tr>
            
          </table>
          <div style="color:red;text-align:center" id="infTip"></div>  
        </div>
        </fieldset>
       <p class="login_p3"></p>
       <input type="submit" id="submitBtn" value="<s:text name="login"/>" class="login_but"  />
       </form>
    </div>
    </div>
    <div class="login_bg4"></div>    
    <%-- Error Message --%>
            <c:if test="${AUTHENTICATION_ERROR_MESSAGE != null}">
               
                <div class="errorItem">
                    <div class="errorItemBack"></div>
                    <div class="errorItemMessage"><c:out value="${AUTHENTICATION_ERROR_MESSAGE}"/></div>
                </div>
                <% session.removeAttribute("AUTHENTICATION_ERROR_MESSAGE"); %>
            </c:if>
  </div>  
</div>
    	<div class="bottom1">
  		<table  border="0" align="center" cellpadding="0" cellspacing="0"  style="margin:0 auto; font-size:10px;  ">  
		 <tr>
  			 <td align="center"> © <s:text name="companyName"/> All Rights Reserved &nbsp;&nbsp;&nbsp;&nbsp;<BR/><img src="images/logo-<%=SystemConst.CUSTOMER_NAME%>.png"  border="0"/></td>
		 </tr>
	</table>
		</div>
</body>
</html>
