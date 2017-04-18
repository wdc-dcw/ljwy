<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.youthen.org/taglib/ecms" prefix="ecms"%>
<%-- <div class="top_1">
	<c:if test="${sessionScope.user.status.code!='NEW_USER'&&sessionScope.expire!='Y'&&sessionScope.reset!='Y'}">
		<a <c:if test="${ecms:ifLikeGranted('QMS-')}">href="${path}/qms-index/index.action"</c:if> class="icon_qms" title="质量管理系统"></a> 
		<a <c:if test="${ecms:ifLikeGranted('LIMS-')}">href="${path}/lims-index/index.action"</c:if> class="icon_lims" title="实验室信息管理系统"></a> 
		<a <c:if test="${ecms:ifLikeGranted('DMS-')}">href="${path}/dms-index/index.action"</c:if> class="icon_dms" title="文档管理系统"></a> 
		<a <c:if test="${ecms:ifLikeGranted('TMS-')}">href="${path}/tms-index/index.action"</c:if> class="icon_tms" title="培训管理系统"></a> 
		<a <c:if test="${ecms:ifLikeGranted('CMS-')}">href="${path}/cms-index/index.action"</c:if> class="icon_cms" title="仪器设备校准管理系统"></a>
	</c:if>
	<c:if test="${sessionScope.user.status.code=='NEW_USER'||sessionScope.expire=='Y'||sessionScope.reset=='Y'}">
		<a href="javascript:void(0)" class="icon_qms" title="质量管理系统"></a> 
		<a href="javascript:void(0)" class="icon_lims" title="实验室信息管理系统"></a> 
		<a href="javascript:void(0)" class="icon_dms" title="文档管理系统"></a> 
		<a href="javascript:void(0)" class="icon_tms" title="培训管理系统"></a> 
		<a href="javascript:void(0)" class="icon_cms" title="仪器设备校准管理系统"></a>
	</c:if>
</div> --%>