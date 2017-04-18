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
<head>
<meta http-equiv="Content-Type">
	<title>易理家物业后台管理系统</title>
	<link href="../lj-resources/lj-css/lj.css" rel="stylesheet"
		type="text/css" />
	<link type="text/css" rel="stylesheet"
		href="../lj-resources/lj-css/style.css" />
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
</head>
<body>
	<div class="right-nav">
		<ul>
			<li><img src="../lj-resources/lj-images/home.png"></li>
			<li style="margin-left: 25px;">您当前的位置：</li>
			<c:if test="${dto.type==0 }">
				<li>社区公告</li>
				<li>></li>
				<li>公告管理</li>
			</c:if>
			<c:if test="${dto.type==1 }">
				<li>社区公告</li>
				<li>></li>
				<li>活动管理</li>
			</c:if>
			<c:if test="${dto.type==2 }">
				<li>园区社交</li>
				<li>></li>
				<li>话题管理</li>
			</c:if>
			<c:if test="${dto.type==3 }">
				<li>园区社交</li>
				<li>></li>
				<li>用户活动管理</li>
			</c:if>
			<c:if test="${dto.type==4 }">
				<li>投诉管理</li>
				<li>></li>
				<li>意见反馈</li>
			</c:if>
			<c:if test="${dto.type==5 }">
				<li>关于我们 </li>
				<li>></li>
				<li>关于我们详细</li>
			</c:if>
			<c:if test="${dto.type==6 }">
				<li>社区公告</li>
				<li>></li>
				<li>推荐活动管理</li>
			</c:if>
			<c:if test="${dto.type==7 }">
				<li>社区公告</li>
				<li>></li>
				<li>滚动通知</li>
			</c:if>
			<c:if test="${dto.type==8 }">
				<li>社区公告</li>
				<li>></li>
				<li>社区资讯</li>
			</c:if>
			<c:if test="${dto.type==9 }">
					<li>社区公告</li>
					<li>></li>
					<li>推送通知</li>
				</c:if>
		</ul>
	</div>
	<div class="main">
		<div class="glkList">
			<!--  这里写查看的 -->
			<c:if test="${dto.type==0 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">公告名：</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">简单描述：</label>
					<label>${dto.shortDesc }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">公告内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime" format="yyyy-MM-dd" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label> <c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach>
					</label>
				</p>
			</c:if>
			<c:if test="${dto.type==1 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动名：</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">简单描述：</label>
					<label>${dto.shortDesc }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动内容：</label>
					<label>${dto.theContent}</label>
				</p>
				
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">开始时间</label>
					<label><s:date name="dto.startDate" format="yyyy-MM-dd" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">结束时间</label>
					<label><s:date name="dto.endDate" format="yyyy-MM-dd" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label><c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach> </label>
				</p> 
			</c:if>
			<c:if test="${dto.type==2 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">话题名：</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">话题内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label><c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach> </label>
				</p>
			</c:if>
			<c:if test="${dto.type==3 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动名：</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">开始时间</label>
					<label><s:date name="dto.startDate"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">结束时间</label>
					<label><s:date name="dto.endDate" format="yyyy-MM-dd HH:mm" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">实际人数/计划人数</label>
					<label>${dto.infactNum}/${dto.planNum} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">活动地点</label>
					<label>${dto.place} </label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label><c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach> </label>
				</p>
			</c:if>
			<c:if test="${dto.type==4 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建人名称：</label>
					<label>${dto.createrId }</label>
				</p>
				<%-- <p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">意见反馈名：</label>
					<label>${dto.name}</label>
				</p> --%>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">意见反馈内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>

			</c:if>

			<c:if test="${dto.type==5 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">标题</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">发布人：</label>
					<label><sec:authentication property="principal.usernm" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>
			</c:if>
			<c:if test="${dto.type==6 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">推荐活动名：</label>
					<label>${dto.name }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">简单描述：</label>
					<label>${dto.shortDesc }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">开始时间</label>
					<label><s:date name="dto.startDate" format="yyyy-MM-dd" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">结束时间</label>
					<label><s:date name="dto.endDate" format="yyyy-MM-dd" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label><c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach> </label>
				</p>
			</c:if>
			
			<c:if test="${dto.type==7 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建人名称：</label>
					<label><sec:authentication property="principal.usernm" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">滚动通知内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>

			</c:if>
			
			<c:if test="${dto.type==8 }">
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建人名称：</label>
					<label><sec:authentication property="principal.usernm" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">简单描述：</label>
					<label>${dto.shortDesc }</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">社区资讯内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">图片详情</label>
					<label><c:forEach items="${noticeNameList }" var="images">
							<img src="${path}/${images}" width="80" height="80" />
						</c:forEach> </label>
				</p>

			</c:if>
			
			<c:if test="${dto.type==9 }">
			<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">标题</label>
					<label>${dto.name }</label>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建人名称：</label>
					<label><sec:authentication property="principal.usernm" /></label>
				</p>

				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">滚动通知内容：</label>
					<label>${dto.theContent}</label>
				</p>
				<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">创建时间</label>
					<label><s:date name="dto.createTime"
							format="yyyy-MM-dd HH:mm" /></label>
				</p>

			</c:if>
			
			<s:iterator value="comments">
					<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论人</label>
					<label><s:property value="user.name" /></label>
					</p>
					<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论内容</label>
					<label><s:property value="theContent" /></label>
					</p>
					<p style="margin-left: 50px; margin-top: 20px;">
					<label style="display: block; float: left; width: 120px;">评论时间</label>
					<label><s:property value="createTime" /></label>
					</p>
				</s:iterator>

			<div class="table01">
				<a href="${path}/lj-notice/list.action?dto.type=${dto.type}"
					class="gray">返回</a>
			</div>
		</div>
	</div>
</body>
</html>