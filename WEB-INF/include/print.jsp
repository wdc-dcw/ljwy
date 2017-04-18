<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<a href="#dialogPrint" rel="modal" class="blue" id="dialogPrintwin"></a>
<div id="dialogPrint" style="display: none;">
	<div class="nav" style="padding: 0;">
		<img src="${path}/images/topicon10.gif" /> >> <b id="cmtTitle">打印</b>
	</div>
	<div class="table_04">
		<fieldset name="audit" id="audit" style="border: 0px;">
		    <div id="changeDiv"></div>
			    <form id="printForm" name="printForm" method="post">
			    <input name="url" type="hidden" id="url" />
			    <input name="printerName" type="hidden" id="printerName" require="true" labelTxt="打印机" />
			    <input name="actionName" type="hidden" id="actionName" labelTxt="操作" />
			    <input name="sectionCode" type="hidden" id="sectionCode" labelTxt="sectionCode" />
			    <input name="printModel" type="hidden" id="printModel" require="true" labelTxt="打印方式"  />
					 <div   style="border:1px solid #ccc;margin:12px; width:92%;">
					  <table width="100%" border="0" cellspacing="0" cellpadding="0"  class="table_box">
						 <tr>
							<td class="td4">打印机类型</td>
							<td>
								<select id="printerTypeSel"  labelTxt="打印机类型" class="select_03"  require="true" onchange="appendPrinter(this);" >
									<option value=''>请选择</option>
								</select>
							</td>
																					
						 </tr>
						 <tr>
							<td class="td4">打印机名称</td>
							<td id="printerNameTd">
								<select id="printerNameSel"  labelTxt="打印机名称" class="select_03"  require="true" onchange="setVal(this);showPrintInfo(this);">
									<option value=''>请选择</option>
								</select>
							</td>
						 </tr>
						 <tr>
							<td class="td4">打印机信息</td>
							<td>
								<label id="printInfo"></label>
							</td>
						 </tr>
						 <!-- <tr>
							<td>打印份数</td>
							<td><input type="text" id="dialogPrinterCount" name="dialogPrinterCount" class="input_04" maxlength="2" onblur="checkForm()"></td>
						 </tr> -->
						 <tr id="reasonId" style="display: none">
							<td class="td4">补打原因</td>
							<td><textarea type="text" id="rpReason" name="rpReason" class="input_05" cols="32" rows="2"></textarea></td>
						 </tr>
					 </table>
					 </div>
					 <div style="margin-left:12px;">
						 <input type="button" id="printBtn" class="button_01" onclick="printPdf()" value="打印"/>
						 <input type="button" id="closeBtn" class="button_01" onclick="closePrint()" value="关闭"/>
					 </div>
				 </form>
		</fieldset>
	</div>
</div>
<script>
		function printInit(nameSpace,url,model){
			url=encodeURI(url);
			dialogPrintInit(nameSpace,url,model);
		}

		function dialogPrintInit(nameSpace,url,model){
			$("#url").val(url);
			if(model==""||model==null||model=="undefined"){
				$("#printModel").val(0);
			}else{
				$("#printModel").val(1);
			}
			printListTypeInit();
			$("[id=printInfo]").text('');
			$("#dialogPrintwin").click();
		}
		
		function closePrint(){
			$("#printForm :input").each(function(){
				if($(this).attr('type')=='hidden'){
					$(this).val('');
				}
			})
			$.facebox.close();
		}
		
		function printListTypeInit(){
				$("[id=printerTypeSel]").find('option:gt(0)').remove();
				var result = getAjaxResult({}, '/mst-print/mst-printer-ajax.action?method=getPrinterType');
				if(result){
					$.each(result,function(index,item){
						$("[id=printerTypeSel]").append("<option value='"+item.code+"'>"+item.nameCn+"</option>");
					});
				}
		}
		
		function appendPrinter(printerType){
			$("[id=printInfo]").text('');
			$("[id=printerNameTd]").html('');
			var result = getAjaxResult({'printType':$(printerType).val()}, '/mst-print/mst-printer-ajax.action?method=getPrinterByType');
			var str="<select id='printerNameSel'  labelTxt='打印机名称' class='select_03'  require='true' onchange='setVal(this);showPrintInfo(this);'><option value=''>请选择</option>";
			if(null!=result){
				$.each(result,function(index,item){
					str+="<option value='"+item.name+"'>"+item.name+"</option>";
				});
			}
			str+="</select>"
			$("[id=printerNameTd]").html(str);
		}
		
		function showPrintInfo(tag){
			$("[id=printInfo]").text('');
			var result = getAjaxResult({'printerName':$(tag).val()}, '/mst-print/mst-printer-ajax.action?method=getPrinterByName');
			if(null!=result){
				$("#facebox").find("[id=printInfo]").text(result);
			}
		}
		
		function getAjaxResult(params,url){
			var result;
			$.ajax ({
				type: "POST",
		    	url: "${pageContext.request.contextPath}" + url,
		    	data: params,
		    	dataType: "json",
		    	async:false,
		    	success: function(data){
		    		result = data;
		    	}
			});
			return result;
		}
		
		 function checkForm(){
			    var printerName = $("#printerName").val(); 
				var printCount = $("#printCount").val(); 
				
				if($.trim(printerName) == ""){
					alert("信息代码:CMT0002,没有选择打印机;后续操作:请选择打印机.");
					//$("#facebox").find("#printBtn").attr("disabled", "true");
					 return false;
				}
				
				/* if(isNaN(printCount)){
					alert("打印份数应该为数字！");
					$("#printBtn").attr("disabled", "true");
					$("#printCount").focus();
					return false;
				}else{
					
					if($.trim(printCount)==""){
						alert("请输入打印份数！");
						$("#printCount").focus();
						$("#printBtn").attr("disabled", "true");
						return false;
					} 
					
					if(printCount<1){
						alert("打印份数应大于0！");
						$("#printBtn").attr("disabled", "true");
						$("#printCount").focus();
						return false;
					} 
				}  */
				//$("#facebox").find("#printBtn").removeAttr("disabled");	
				return true;
			 }
		 
		 
		 function printPdf(){
				if(checkForm() == true){
					$("#facebox").find("#printBtn").attr("disabled", "true"); 
					var aUrl =  "${path}/mst-print/mst-printer-ajax.action?method=printPdf";
					$("#printForm")[0].action = aUrl;
					$.ajax({
					    cache: false,
				        type: "POST",
				    	url: aUrl,
				    	data: $("#printForm :input").serializeArray(),
				    	dataType: "json",
				    	success: function(data){
			    			alert(data);
			    			//$("#facebox").find("#printBtn").removeAttr("disabled"); 
			    			$.facebox.close();
			    			if(typeof doOtherSth==='function'){
			    				doOtherSth(data);
			    			}
				    	}
					});
				}
			}
		function setVal(tag){
			$("[id=printerName]").val($(tag).val());
		} 
</script>