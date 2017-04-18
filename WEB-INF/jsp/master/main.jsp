<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!–[if lte IE 8]>
<meta http-equiv=”x-ua-compatible” content=”ie=7″ />
<![endif]–>
<!–[if IE 9]>
<meta http-equiv=”x-ua-compatible” content=”ie=9″ />
<![endif]–>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<html>
<head>
<title><fmt:message key="menu.systemmanage" /></title>
</head>
<link href="${path}/mst-css/style.css" rel="stylesheet" type="text/css" />
<link href="${path}/mst-css/ztree.css" type="text/css" rel="stylesheet" />
<script src="${path}/mst-js/ztree/jquery.ztree.core-3.5.js"></script>
<body>
	<div class="body_bg1"></div>
	<%@ include file="/WEB-INF/include/sysNavBar.jsp"%>
	<DIV style="width: 1007px; margin: auto;">
		<div class="auto">
			<%@ include file="/WEB-INF/jsp/master/mst-include/head.jsp"%>
			<div class="auto2">
				<div class="nav">
					<img src="${path}/images/topicon10.gif" />>><b><fmt:message
							key="menu.systemmanage" /></b>>><b>
						<c:if test="${namespace == 'mst-user'}">
							<fmt:message key="menu.department" />
						</c:if> <c:if test="${namespace == 'mst-loginlog'}">
							<fmt:message key="menu.loginLog" />
						</c:if> <c:if test="${namespace == 'oa-article'}">文章管理 </c:if> <c:if
							test="${namespace == 'oa-aim'}">目标卡管理 </c:if> <c:if
							test="${namespace == 'oa-data'}">资料管理 </c:if> <c:if
							test="${namespace == 'oa-kbn' || namespace == 'oa-room' || namespace == 'cms-mst'}">
							<fmt:message key="menu.mst" />
						</c:if>
					</b>
				</div>
				<!-- 导航栏菜单页面 -->
				<%-- <%@ include file="/WEB-INF/jsp/master/mst-include/relatedHeader.jsp"%> --%>
				<DIV style="width: 1007px; margin: auto;">
					<div class="auto2_1">
						<ul id="myTab0">
							<li ${tabId==2?'class="active"':'class="normal"'}><a
								href="${path}/mst-user/main.action"><span class="span1"></span><span
									class="span2">组织架构管理</span><span class="span3"></span></a></li>
						</ul>
					</div>
				</DIV>
				<div id="myTab0_Content0">
					<div class="table_frame_03">
						<c:if
							test="${namespace != 'mst-maillog' && namespace != 'mst-company' && namespace != 'mst-queryAudittrail'}">
							<div class="left_box_2">
								<ul id="mytree" class="ztree">
								</ul>
							</div>
						</c:if>
						<div
							<c:if test="${namespace != 'mst-maillog' && namespace != 'mst-company' && namespace != 'mst-queryAudittrail'}"> class="right_box_2"</c:if>>
							<iframe id="edit" src="###" width="100%"
								style="overflow-y: auto;" frameborder="0" height="850px"></iframe>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
			<%@ include file="/WEB-INF/include/footer.jsp"%>
		</div>
	</DIV>
</body>
</html>
<%@ include file="/WEB-INF/jsp/master/department/MAIN_JS.jsp"%>