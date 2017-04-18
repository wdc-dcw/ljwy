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
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
	</head>
	<script type="text/javascript">
	function doSearch(gotoPage) {
		$("#gotoPage").val(gotoPage);
		document.forms[0].submit(); // 提交表单
	}
</script>
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
					<li>个人活动管理</li>
				</c:if>
				<c:if test="${dto.type==4 }">
					<li>投诉管理</li>
					<li>></li>
					<li>意见反馈</li>
				</c:if>

				<c:if test="${dto.type==5 }">
					<li>关于我们</li>
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
					<li>社区</li>
					<li>></li>
					<li>推送消息</li>
				</c:if>

			</ul>
		</div>
		<div class="main">
			<div class="glkList">
				<div>
					<form name="pageForm" id="pageForm" method="post"
						action="${path}/lj-notice/list.action">
						<s:hidden name="dto.gotoPage" id="gotoPage" theme="simple" />
						<s:hidden name="dto.type" />
						<p style="margin-left: 25px; margin-top: 10px;">
							<c:if test="${dto.type==0 }">
						公告名：
					</c:if>
							<c:if test="${dto.type==1 }">
						活动名：
					</c:if>
							<c:if test="${dto.type==2 }">
						话题名：
					</c:if>
							<c:if test="${dto.type==3 }">
						个人活动名：
					</c:if>
							<c:if test="${dto.type==4 }">
						意见反馈：
					</c:if>
							<c:if test="${dto.type==5 }">
						标题：
					</c:if>
							<c:if test="${dto.type==6 }">
						推荐活动名：
					</c:if>
							<c:if test="${dto.type==7 }">
						滚动通知：
					</c:if>
							<c:if test="${dto.type==8 }">
						社区资讯：
					</c:if>
					<c:if test="${dto.type==9 }">
						推送标题:
					</c:if>
					<c:if test="${dto.type!=9 }">
							
						
							状态 <select name="dto.status" id="status" class="select_01"
								style="width: 100px;">
								<option value=""
									<c:if test="${dto.status == null }"> selected </c:if>>请选择</option>
								<option value="0"
									<c:if test="${dto.status == 0 }"> selected </c:if>>失效</option>
								<option value="1"
									<c:if test="${dto.status == 1 }"> selected </c:if>>有效</option>
							</c:if>
							<c:if test="${dto.type==9 }">
							<input name="dto.name" id="name" type="text"
								style="width: 180px;" value="${dto.name}" />&nbsp;&nbsp;&nbsp;
							推送内容:<input name="dto.theContent" id="theContent" type="text"
								style="width: 180px;" value="${dto.theContent}" />&nbsp;&nbsp;&nbsp;
							</c:if>
							</select> &nbsp;&nbsp;&nbsp; <a id="gotoPage" href="#"
								onclick="doSearch(1)" class="button_01">查询</a>
					</form>

					</p>
				</div>
				<c:if test="${dto.type==0 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>公告名</th>
							<th>简单描述</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><ecms:truncate value="${notice.shortDesc }" length="30"
										suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${dto.type==1 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>活动名</th>
							<th>简单描述</th>
							<th>开始时间</th>
							<th>结束时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><ecms:truncate value="${notice.shortDesc }" length="25"
										suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.startDate }"
										pattern="yyyy-MM-dd" /></td>
								<td><fmt:formatDate value="${notice.endDate }"
										pattern="yyyy-MM-dd" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if> <a
									href="${path}/lj-comment/toViewComments.action?dto.actionId=${notice.id}&dto.type=0&url=${path}/lj-notice/list.action?dto.type=1">查看评论</a>
								</td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${dto.type==2 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>话题名</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<%-- <a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a> --%></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd HH:mm" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<%-- <a href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a> --%>
										<a href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if>
									 <a href="${path}/lj-comment/toViewComments.action?dto.actionId=${notice.id}&dto.type=0&url=${path}/lj-notice/list.action?dto.type=2">查看评论</a></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>
				<c:if test="${dto.type==3 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>个人活动名</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<%-- <a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a> --%></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd HH:mm" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<%-- <a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a> --%>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if> <a
									href="${path}/lj-comment/toViewComments.action?dto.actionId=${notice.id}&dto.type=0&url=${path}/lj-notice/list.action?dto.type=3">查看评论</a></td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${dto.type==4 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>反馈内容</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td><ecms:truncate value="${notice.theContent }"
										length="30" suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd HH:mm" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<%-- <a href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a> --%>
										<a href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>

				<c:if test="${dto.type==5 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>标题</th>
							<th>发布人</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><sec:authentication property="principal.usernm" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd HH:mm" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>
				<c:if test="${dto.type==6 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>推荐活动名</th>
							<th>开始时间</th>
							<th>结束时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><fmt:formatDate value="${notice.startDate }"
										pattern="yyyy-MM-dd" /></td>
								<td><fmt:formatDate value="${notice.endDate }"
										pattern="yyyy-MM-dd" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${dto.type==7 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>滚动通知内容</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td><ecms:truncate value="${notice.theContent }"
										length="30" suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd HH:mm" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>
					</table>
				</c:if>
				<c:if test="${dto.type==8 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>资讯名</th>
							<th>简单描述</th>
							<th>发布时间</th>
							<th>状态</th>
							<th>操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" style="width: 10px;" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
								<td>${notice.name }</td>
								<td><ecms:truncate value="${notice.shortDesc }" length="30"
										suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd" /></td>
								<td><c:if test="${notice.status == '0'}">失效</c:if> <c:if
										test="${notice.status == '1'}">有效</c:if></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<a
											href="${path }/lj-notice/delete.action?dto.id=${notice.id}&dto.type=${dto.type}">失效</a>
									</c:if></td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				
				<c:if test="${dto.type==9 }">
					<table
						style="margin-left: 25px; margin-top: 10px; border: 1px solid #808080; width: 96%; text-align: center;">
						<tr>
							<th>推送标题</th>
							<th style="width:50%;">推送消息内容</th>
							<th>发布时间</th>
							<th style="width:20%;">操作<a title="新增"
								href="${path}/lj-notice/entityInit.action?dto.type=${dto.type}"><img
									src="${path}/mst-images/add.png" /></a></th>
						</tr>
						<c:forEach items="${dtoList }" var="notice">
							<tr>
							<td>${notice.name }</td>
							<td><ecms:truncate value="${notice.theContent }"
										length="50" suffix="..." charBoundary="true" /></td>
								<td><fmt:formatDate value="${notice.createTime }"
										pattern="yyyy-MM-dd" /></td>
								<td><a
									href="${path}/lj-notice/view.action?dto.id=${notice.id}&dto.type=${dto.type}">查看</a>
									<c:if test="${notice.status == '1'}">
										<%-- <a
											href="${path}/lj-notice/isTop.action?dto.id=${notice.id}&dto.type=${dto.type}&dto.isTop=${notice.isTop}">
											<c:if test="${notice.isTop=='0' }">置顶</c:if> <c:if
												test="${notice.isTop=='1' }">取消置顶</c:if>
										</a> --%>
										<a
											href="${path}/lj-notice/entityInit.action?dto.id=${notice.id}&dto.type=${dto.type}">修改</a>
										<%-- <a
											href="${path }/lj-notice/pushMessage.action?dto.id=${notice.id}&dto.type=${dto.type}">重新推送</a> --%>
									</c:if></td>
							</tr>
						</c:forEach>

					</table>
				</c:if>

				<div class="fy" style="width: 82%; margin-top: 10px">
					<p>
						第
						<s:property value="dto.gotoPage" />
						页 , 共
						<s:property value="dto.pages" />
						页 , 共
						<s:property value="dto.listSize" />
						条 <a href="#" onclick="doSearch(1)" class="fy_left0"></a>
						<s:if test="dto.gotoPage-1 > 0 ">
							<a href="#"
								onclick="doSearch(<s:property value="dto.gotoPage-1" />)"
								class="fy_left"></a>
						</s:if>
						<s:else>
							<a href="#" class="fy_left"></a>
						</s:else>

						<s:if test="dto.gotoPage+1 <= dto.pages ">
							<a href="#"
								onclick="doSearch(<s:property value="dto.gotoPage+1" />)"
								class="fy_right"></a>
						</s:if>
						<s:else>
							<a href="#" class="fy_right"></a>
						</s:else>
						<a href="#" onclick="doSearch(<s:property value="dto.pages" />)"
							class="fy_right0"></a>
					</p>
				</div>
			</div>
		</div>
	</body>
</html>