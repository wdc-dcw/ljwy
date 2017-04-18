<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/inc.jsp"%>
<!--图片上传添加/删除js-->
<%@ include file="/WEB-INF/jsp/lj/lj-include/addDelRow_js.jsp"%>
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
	<script src="${path}/mst-js/ztree/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../lj-resources/lj-js/menu.js"></script>
	<!-- *************************富文本********************************************* -->
	<script type="text/javascript" href="../ueditor/lang/zh-cn/zh-cn.js"></script>
	<!-- 配置文件 -->
	<script type="text/javascript" src="${path}/ueditor/ueditor.config.js"></script>
	<!-- 编辑器源码文件 -->
	<script type="text/javascript" src="${path}/ueditor/ueditor.all.js"></script>
	<!-- 实例化编辑器 -->
	<%-- <link href="${path}/mst-css/style.css" rel="stylesheet" type="text/css" /> --%>
	</head>
	<!-- *************************图片上传********************************************* -->
	<script type="text/javascript">
		/****表格隔行高亮显示*****/
		window.onload = function() {
			oTable = document.getElementById("purposeTbale");//找表格
			aTr = document.getElementsByTagName("tr");//找所有的行
			for (i = 0; i < aTr.length; i++) {
				aTr[i].style.background = "#f6f6f6";
			}
			;
		};
		//下面用于图片上传预览功能
		function setImagePreview(avalue) {
			//input
			var docObj = document.getElementById("doc");
			//img
			var imgObjPreview = document.getElementById("preview");
			//div
			var divs = document.getElementById("localImag");
			if (docObj.files && docObj.files[0]) {
				//火狐下，直接设img属性
				imgObjPreview.style.display = 'block';

				imgObjPreview.style.width = '200px';
				imgObjPreview.style.height = '200px';
				//imgObjPreview.src = docObj.files[0].getAsDataURL();
				//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
				imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
			} else {
				//IE下，使用滤镜
				docObj.select();
				var imgSrc = document.selection.createRange().text;
				var localImagId = document.getElementById("localImag");
				//必须设置初始大小
				localImagId.style.width = "200px";
				localImagId.style.height = "200px";
				//图片异常的捕捉，防止用户修改后缀来伪造图片
				try {
					localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					localImagId.filters
							.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
				} catch (e) {
					alert("您上传的图片格式不正确，请重新选择!");
					return false;
				}
				imgObjPreview.style.display = 'none';
				document.selection.empty();
			}
			return true;
		}

		function checkFileExt() {
			var fileName = $(".doc").val();
			var extName = fileName.substring(fileName.lastIndexOf(".") + 1,
					fileName.length);
			if (extName == "jpeg" || extName == "png" || extName == "gif"
					|| extName == "jpg" || extName == "JPEG" || extName == ""
					|| extName == "PNG" || extName == "GIF" || extName == "JPG") {
				preCheck('form');
			} else {
				alert("只能上传jpg、png、gif类型的图片");
			}

		}

		//服务态度的选中事件
		function checkRadio() {
			if (dto.serviceMark == 0) {
				document.getElementsByName('dto.serviceMark')[0].checked = true;
			} else if (dto.serviceMark == 1) {
				document.getElementsByName('dto.serviceMark')[1].checked = true;
			} else if (dto.serviceMark == 2) {
				document.getElementsByName('dto.serviceMark')[2].checked = true;
			}

		}
	</script>
	<style>
.edui-default .edui-toolbar {
	width: 700px;
}
</style>

	<bodyoverflow:hidden;">
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
					<li>滚动通知</li>
				</c:if>
				<c:if test="${dto.type==9 }">
					<li>社区公告</li>
					<li>></li>
					<li>推送通知</li>
				</c:if>
			</ul>
		</div>
		<div class="main">
			<div class="glkList" style="width: 100%; height: auto;">
				<s:form id="form" name="form" action="/lj-notice/saveUpdate.action"
					method="post" enctype="multipart/form-data">
					<s:hidden name="dto.id" />
					<s:hidden name="dto.status" />
					<s:hidden name="dto.type" />
					<c:if test="${dto.type==0 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">社区公告名:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="公告名称" require="true" maxlength="18"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 180px;">
								简单描述(只能输入30个字符):<b><font class="ff6600">*</font></b>
							</label>
							<textarea id="shortDesc" name="dto.shortDesc"
								style="width: 700px; height: 100px;" maxlength="30">${dto.shortDesc} </textarea>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">社区公告和内容：</p>
						<script type="text/javascript">
							var editor = UE.getEditor('theContent', {
								//默认编辑器的高度
								initialFrameHeight : 252
							});
						</script>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">社区公告和内容:<b><font
									class="ff6600">*</font></b></label>
							<!-- 加载编辑器的容器 -->
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 200px; margin-top: 10px">${dto.theContent} </textarea>
						</p>
					</c:if>

					<c:if test="${dto.type==1 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">社区活动名:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="社区活动名" require="true"></s:textfield>
						</p>


						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 180px;">
								简单描述(只能输入30个字符):<b><font class="ff6600">*</font></b>
							</label>
							<textarea id="shortDesc" name="dto.shortDesc"
								style="width: 700px; height: 100px;" maxlength="30">${dto.shortDesc} </textarea>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">社区活动内容：</p>
						<script type="text/javascript">
							var editor = UE.getEditor('theContent', {
								//默认编辑器的高度
								initialFrameHeight : 252
							});
						</script>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">社区活动内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 200px;">${dto.theContent} </textarea>
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">开始时间<b><font
									class="ff6600">*</font></b></label> <input id="startDate" require="true"
								name="dto.startDate" readonly="readonly"
								value="<s:date name="dto.startDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="开始时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'});" />
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">结束时间<b><font
									class="ff6600">*</font></b></label> <input id="endDate" require="true"
								name="dto.endDate" readonly="readonly"
								value="<s:date name="dto.endDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="结束时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startDate\')||\'%y-%M-%d\'}'});" />
						</p>
					</c:if>



					<c:if test="${dto.type==2 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">个人话题名:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="个人话题名" require="true"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">个人话题内容：</p>
						<script type="text/javascript">
							var editor = UE.getEditor('theContent', {
								//默认编辑器的高度
								initialFrameHeight : 280
							});
						</script>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">个人话题内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 200px;">${dto.theContent} </textarea>
						</p>
					</c:if>

					<c:if test="${dto.type==3 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">个人活动名:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="个人活动名" require="true"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">个人活动内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 150px; margin-top: 10px">${dto.theContent} </textarea>
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">活动地点:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.place" cssClass="input_04" theme="simple"
								labelTxt="活动地点" require="true"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">计划人数:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.planNum" cssClass="input_04"
								format="intege3" theme="simple" labelTxt="计划人数" require="true"></s:textfield>
							（人数不得超过100）
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">开始时间<b><font
									class="ff6600">*</font></b></label> <input id="startDate" require="true"
								name="dto.startDate" readonly="readonly"
								value="<s:date name="dto.startDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="开始时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'});" />
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">结束时间<b><font
									class="ff6600">*</font></b></label> <input id="endDate" require="true"
								name="dto.endDate" readonly="readonly"
								value="<s:date name="dto.endDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="结束时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startDate\')||\'%y-%M-%d\'}'});" />
						</p>

					</c:if>

					<c:if test="${dto.type==4 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">意见反馈内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 70%; height: 200px;">${dto.theContent} </textarea>
						</p>
					</c:if>

					<c:if test="${dto.type==5 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">标题:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="标题" require="true"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 70%; height: 300px;">${dto.theContent} </textarea>
						</p>
					</c:if>
					<c:if test="${dto.type==6 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">推荐活动名:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="推荐活动名" require="true"></s:textfield>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 180px;">
								简单描述(只能输入30个字符):<b><font class="ff6600">*</font></b>
							</label>
							<textarea id="shortDesc" name="dto.shortDesc"
								style="width: 700px; height: 100px;" maxlength="30">${dto.shortDesc} </textarea>
						</p>

						<p style="margin-left: 50px; margin-top: 20px;">推荐活动内容:</p>
						<script type="text/javascript">
							var editor = UE.getEditor('theContent', {
								//默认编辑器的高度
								initialFrameHeight : 280
							});
						</script>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">推荐活动内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 100px;">${dto.theContent} </textarea>
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">开始时间<b><font
									class="ff6600">*</font></b></label> <input id="startDate" require="true"
								name="dto.startDate" readonly="readonly"
								value="<s:date name="dto.startDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="开始时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'});" />
						</p>
						<p style="margin-left: 50px; margin-top: 10px;">
							<label style="display: block; float: left; width: 120px;">结束时间<b><font
									class="ff6600">*</font></b></label> <input id="endDate" require="true"
								name="dto.endDate" readonly="readonly"
								value="<s:date name="dto.endDate" format="yyyy-MM-dd" />"
								type="text" labelTxt="结束时间" class="inputDate"
								style="width: 150px;"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startDate\')||\'%y-%M-%d\'}'});" />
						</p>
					</c:if>
					
					<c:if test="${dto.type==7 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">滚动通知内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 70%; height: 200px;" labelTxt="滚动通知内容" require="true">${dto.theContent} </textarea>
						</p>
					</c:if>
					
				
					
					<c:if test="${dto.type==8 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">标题:<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="标题" require="true"></s:textfield>
						</p>
						
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 180px;">
								简单描述(只能输入30个字符):<b><font class="ff6600">*</font></b>
							</label>
							<textarea id="shortDesc" name="dto.shortDesc"
								style="width: 700px; height: 100px;" maxlength="30" labelTxt="简单描述" require="true">${dto.shortDesc} </textarea>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">社区资讯内容：</p>
						<script type="text/javascript">
							var editor = UE.getEditor('theContent', {
								//默认编辑器的高度
								initialFrameHeight : 252
							});
						</script>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">社区资讯内容:<b><font
									class="ff6600">*</font></b></label>
							<!-- 加载编辑器的容器 -->
							<textarea id="theContent" name="dto.theContent"
								style="width: 700px; height: 200px; margin-top: 10px">${dto.theContent} </textarea>
						</p>
					</c:if>
					
						<c:if test="${dto.type==9 }">
						<p style="margin-left: 50px; margin-top: 20px;">
							<label
								style="display: block; float: left; width: 120px; margin-top: 5px">标题(仅Android):<b><font
									class="ff6600">*</font></b></label>
							<s:textfield name="dto.name" cssClass="input_04" theme="simple"
								labelTxt="标题" require="true"></s:textfield>
						</p>
						<p style="margin-left: 50px; margin-top: 20px;">
							<label style="display: block; float: left; width: 120px;">推送信息内容:<b><font
									class="ff6600">*</font></b></label>
							<textarea id="theContent" name="dto.theContent"
								style="width: 70%; height: 200px;" cssClass="input_04" labelTxt="推送信息内容" require="true">${dto.theContent} </textarea>
						</p>
					</c:if>

					<c:if test="${dto.type!=4 && dto.type!=5 && dto.type!=7 && dto.type!=9}">
						<table id="purposeTbale"
							style="margin-left: 50px; margin-top: 20px;">
							<tr style="background-color: gray">
								<td style="display: block; float: left; width: 120px;">添加照片<b><font
										class="ff6600">*</font></b></td>
								<td><input type="file" name="img" value="${dto.image1 }"
									class="doc" /></td>
								<td><a href="###" class="button_02"
									onclick="addRow('purposeTbale',-1,'tempRow')">+</a></td>
							</tr>
						</table>
						<table style="display: none; margin-left: 50px; margin-top: 10px;">
							<tr id="tempRow">
								<td style="display: block; float: left; width: 120px;">添加照片<b><font
										class="ff6600">*</font></b></td>
								<td><input type="file" name="img" value="" class="doc" /></td>
								<td><a href="###" class="button_02"
									onclick="delRow(this,'purposeTbale');">-</a></td>
							</tr>
						</table>
					</c:if>
					<c:if test="${dto.type!=4 && dto.type!=5 && dto.type!=7 && dto.type!=9}">
						<div class="table01">
							<a href="###" onclick="checkFileExt()" class="gray"><fmt:message
									key="common.submit.btn" /></a> <a
								href="${path}/lj-notice/list.action?dto.type=${dto.type}"
								class="gray">返回</a>
						</div>
					</c:if>
					<c:if test="${dto.type==4 || dto.type==5 || dto.type==7 || dto.type==9}">
						<div class="table01">
							<a href="###" onclick="preCheck('form')" class="gray"><fmt:message
									key="common.submit.btn" /></a> <a
								href="${path}/lj-notice/list.action?dto.type=${dto.type}"
								class="gray">返回</a>
						</div>
					</c:if>
				</s:form>
			</div>

		</div>

		</body>
</html>