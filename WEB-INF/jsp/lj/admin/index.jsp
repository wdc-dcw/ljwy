<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!–[if lte IE 8]>
<meta http-equiv=”x-ua-compatible” content=”ie=7″ />
<![endif]–>
<!–[if IE 9]>
<meta http-equiv=”x-ua-compatible” content=”ie=9″ />
<![endif]–>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>易理家物业后台管理系统</title>
<link type="text/css" rel="stylesheet"
	href="../lj-resources/lj-css/style.css" />
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
<script type="text/javascript">
	
</script>
</head>
<body style="overflow-y: auto;">
	<div class="body_bg1"></div>
	<DIV style="width: 100%; margin: auto;">
		<div class="auto">
			<div id="header">
				<div class="logo">易理家物业后台管理系统</div>
				<div class="navigation">
					<ul>
						<li>欢迎您,<a href="#"><sec:authentication
									property="principal.usernm" /></a>!
						</li>
						<li><a onclick="logout()" href="#">退出</a></li>
					</ul>
				</div>
			</div>
			<div id="content">
				<div class="left_menu">
					<ul id="nav_dot">
						<li>
							<h4 class="M1">
								<span></span>社区公告和活动
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=0')">公告管理</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=1')">活动管理</a>

								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=6')">推荐活动管理</a>

								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-comment/list.action?dto.type=0')">活动评论</a>

								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=7')">滚动通知管理</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=8')">社区资讯管理</a>
								<%-- <a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=9')">推送消息管理</a> --%>
							</div>
						</li>
						<li>
							<h4 class="M3">
								<span></span>单元管理
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-room/list.action')">小区管理</a>
								<%-- <a href="#"
									onclick="setMainWorkSpace('${path}/lj-feeHistory/urgedPayMoneyList.action')">欠费情况查看</a> --%>
							</div>
						</li>
						<li>
							<h4 class="M2">
								<span></span>缴费管理
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-feeHistory/list.action')">缴费历史列表</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-feeHistory/urgedPayMoneyList.action')">欠费情况查看</a>
							</div>
						</li>
						<li>
							<h4 class="M4">
								<span></span>报修管理
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-repair/list.action?dto.type=0')">报修查看</a>
								<%-- <a href="#"
									onclick="setMainWorkSpace('${path}/lj-repair/entityInit.action?dto.type=0')">报修登记</a> --%>
							</div>
						</li>
						<li>
							<h4 class="M5">
								<span></span>投诉管理
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-repair/list.action?dto.type=1')">投诉查看</a>
								<%-- <a href="#"
									onclick="setMainWorkSpace('${path}/lj-repair/entityInit.action?dto.type=1')">投诉登记</a> --%>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=4')">意见反馈查看</a>
							</div>
						</li>
						<li>
							<h4 class="M6">
								<span></span>园区社交
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=3')">个人活动</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=2')">个人话题</a>
							</div>
						</li>
						<li>
							<h4 class="M7">
								<span></span>生活服务
							</h4>
							<div class="list-item none">
							    <a href="#" onclick="setMainWorkSpace('${path}/lj-merchant/typeList.action?typeCode=SQHY')">黄页类型</a>
								<a href="#" onclick="setMainWorkSpace('${path}/lj-merchant/list.action?typeCode=SQHY')">黄页</a>
								
								<a href="#" onclick="setMainWorkSpace('${path}/lj-merchant/typeList.action?typeCode=JZFW')">家政服务类型</a>
								<a href="#" onclick="setMainWorkSpace('${path}/lj-merchant/list.action?typeCode=JZFW')">家政服务</a>

                                <a href="#" onclick="setMainWorkSpace('${path}/lj-goods/goodsTypeList.action')">商品类型</a>
                                <a href="#" onclick="setMainWorkSpace('${path}/lj-goods/list.action?dto.isSecond=0')">商品</a>
								<a href="#" onclick="setMainWorkSpace('${path}/lj-goods/list.action?dto.isSecond=1')">二手商品</a>
								
								<a href="#" onclick="setMainWorkSpace('${path}/lj-kuaidi/kuaiDiList.action?dto.type=EXPRESS_COMPANY')">快递公司</a>
							</div>
						</li>
						<%-- <li>
							<h4 class="M8">
								<span></span>折扣计划
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-cuponPlan/list.action?dto.payType=0')">物业费折扣计划</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-cuponPlan/list.action?dto.payType=1')">车位管理费折扣计划</a>
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-cuponPlan/list.action?dto.payType=2')">商品折扣计划</a>
							</div>
						</li> --%>
						<li>
							<h4 class="M10">
								<span></span>关于我们
							</h4>
							<div class="list-item none">
								<a href="#"
									onclick="setMainWorkSpace('${path}/lj-notice/list.action?dto.type=5')">关于我们详细</a>
							</div>
						</li>
						<li>
							<h4 class="M11">
								<span></span><a href="#"
									onclick="setMainWorkSpace('${path}/lj-setting/entityInit.action?dto.type=SYS_CONFIG')">系统设置</a>
							</h4>
						</li>
					</ul>
				</div>
				<div class="m-right">
					<iframe id="mainWorkSpace" src="###" width="80%"
						style="border: 0px;"> </iframe>
				</div>

			</div>
			<sec:authorize ifAnyGranted="ADMIN,OA_DEPT_MGR">
			<script>
			    	navList(12);
					$("#mainWorkSpace")[0].src = "${path}/lj-repair/list.action?dto.type=0";

					function setMainWorkSpace(url) {

						$("#mainWorkSpace")[0].src = url;

					}
				
			</script>
			</sec:authorize>
			
			<%-- <sec:authorize ifAllGranted="ADMIN_02">
			<script>
			    	navList(12);
					$("#mainWorkSpace")[0].src = "${path}/lj-notice/list.action?dto.type=0";

					function setMainWorkSpace(url) {

						$("#mainWorkSpace")[0].src = url;

					}
				
			</script>
			</sec:authorize> --%>

			
		
		</div>

	</DIV>
</body>

</html>