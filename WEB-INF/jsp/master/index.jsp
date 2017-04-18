<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
<title><s:text name="systemName" /></title>
</head>

<!--  <script type="text/javascript" src="../js/lanrenzhijia.js"/> -->
<link href="../css/st.css" rel="stylesheet" type="text/css" />
<link href="../mst-css/style.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" type="text/css" href="。。/css/default.css">
	<link rel="stylesheet" href="../jquery-ui-1.11.4/jquery-ui.css">
		<style type="text/css">
body {
	font: 14px/2 'Microsoft YaHei', 'Arial';
}
</style>

		<body>
			<script src="../js/jquery-1.8.3.min.js"></script>
			<script src="../jquery-ui-1.11.4/jquery-ui.js"></script>
			<!--Luara js文件-->
			<script src="../js/jquery.luara.0.0.1.min.js"></script>
			<div class="body_bg1"></div>
			<DIV style="width: 1007px; margin: auto;">
				<div class="auto">
					<%@ include file="/WEB-INF/jsp/master/mst-include/masterHeader.jsp"%>
					<div class="auto2" style="padding-top: 0px;">
						<div id="myTab0_Content_index">
							<div id="main">
								<div class="left">
									<div class="tadyNewsPannel">
										<div class="bg_01">
											<dl></dl>
										</div>
									</div>
									<div class="gonggaoPannel">
										<div class="titleArea">
											<a href="${path}/mst-notice/list.action">公司公告</a>
										</div>
										<div class="contentArea" id="gundong">
											<dl id="gundong1">

												<p>${noticedtoList[0].noticeContent }</p>
												<div class="timeArea">
													<fmt:formatDate value="${noticedtoList[0].createDate }"
														pattern="yyyy-MM-dd" />
												</div>
												<p>${noticedtoList[1].noticeContent }</p>
												<div class="timeArea">
													<fmt:formatDate value="${noticedtoList[1].createDate }"
														pattern="yyyy-MM-dd" />
												</div>
											</dl>
											<div id="gundong2"></div>
										</div>
										<script>
											var speed = 100;
											var gundong = document
													.getElementById('gundong');
											var gundong1 = document
													.getElementById('gundong1');
											var gundong2 = document
													.getElementById('gundong2');
											gundong2.innerHTML = gundong1.innerHTML;
											if (gundong1.offsetHeight < gundong.parentNode.offsetHeight) {
												gundong1.style.height = gundong.parentNode.offsetHeight
														+ 'px';
												gundong2.style.height = gundong.parentNode.offsetHeight
														+ 'px';
											}
											function Marquee2() {
												if (gundong1.offsetHeight
														- gundong.scrollTop <= 0) {
													gundong.scrollTop -= gundong1.offsetHeight;
												} else {
													gundong.scrollTop++
												}
											}
											var MyMar2 = setInterval(Marquee2,
													speed)
											gundong.onmouseover = function() {
												clearInterval(MyMar2)
											}
											gundong.onmouseout = function() {
												MyMar2 = setInterval(Marquee2,
														speed)
											}
										</script>
									</div>
								</div>
								<div class="right">

									<div class="riliArea" id="divUserCalendar"
										style="padding: 30px 0;">
										<div class="biaotiField textleft" style="text-align: center;">公司活动安排</div>
										<div class="bg_yearmonth">
											<div id="datepicker"></div>
											<script>
												$("#datepicker").datepicker();
											</script>
										</div>
										<div class="endchildField"></div>
										<%-- <div class="btn">
											<a href="${path}/mst-personage/activity.action">全年活动</a>
										</div> --%>
									</div>

									<iframe scrolling="no" height="54" frameborder="0"
										style="padding-left: 4px"
										src="http://i.tianqi.com/index.php?c=code&id=42&icon=1&num=3">
									</iframe>
									<div class="weekPannel">
										<a href="${path}/mst-meeting/getWeek.action">一周会议安排</a>
									</div>
									<div class="peixunPannel">
										<div class="titleArea">
											<div class="style_01">
												<a
													href="${path}/mst-article/list.action?dto.bigColumnId=145">更多</a>
												<h2>八面来风</h2>
											</div>
										</div>
										<div class="contentArea">
											<dl>
												<c:forEach items="${eightList}" var="eight"
													varStatus="status">
													<dd>
														<span>[八面来风]</span>
														<c:if test="${!empty eight.title}">
															<a
																href="${path}/mst-article/view.action?dto.id=${eight.id }"
																title="${eight.title }"><ecms:truncate
																	value="${eight.title}" length="30" suffix="..."
																	charBoundary="true" /> </a>
														</c:if>
													</dd>
												</c:forEach>
											</dl>
										</div>
									</div>

								</div>
								<div class="middle">
									<div class="picPannel"
										style="width: 100%; margin: 10px 0 0 -10px">
										<!-- Luara图片切换骨架begin -->
										<div class="example">
											<ul>
											<c:forEach items="${pictureList}" var="picture" varStatus="status">
												<li><img src="${path}/images/${picture.pictureName}" alt="${status.index }" width="100%" /></li>
												</c:forEach>
											</ul>
											<ol>
											<c:forEach items="${pictureList}">
												<li></li>
											</c:forEach>
											</ol>
										</div>
										<!-- Luara图片切换骨架end -->
										<script>
											$(function() {
												$(".example").luara({
													width : "100%",
													height : "280",
													interval : 4000,
													selected : "seleted"
												});

											});
										</script>
									</div>
									<div class="NewsPannel"
										style="padding: 15px 10px 0 0; margin: 10px 0 0 -10px">
										<div class="titleArea">
											<div class="style_01">
												<a
													href="${path}/mst-article/list.action?dto.bigColumnId=144">更多</a>
												<h2>公司新闻</h2>
											</div>
										</div>
										<div class="contentArea">
											<dl>
												<s:iterator value="comList" var="company">
													<dd>
														<span class="time"><s:date name="createTime"
																format="yyyy-MM-dd" /> </span><a
															href="${path}/mst-article/view.action?dto.id=<s:property value="id"/>">
															<s:property value="title" />
														</a>
													</dd>
												</s:iterator>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<%@ include file="/WEB-INF/include/footer.jsp"%>
				</div>
			</DIV>
		</body>
</html>
