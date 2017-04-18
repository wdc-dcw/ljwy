$(document).ready(function(){
		//Sidebar Accordion Menu:
		$("#main-nav").hide(); // Hide all sub menus
		$("#main-nav li a.current").parent().find("ul").slideToggle("slow"); // Slide down the current menu item's sub menu
		$("#main-nav li a.nav-top-item").click( // When a top menu item is clicked...
			function () {
				$(this).parent().siblings().find("ul").slideUp("normal"); // Slide up all sub menus except the one clicked
				$(this).next().slideDown("normal"); // Slide down the clicked sub menu
				$(this).parent().siblings().find("a:first").attr("class", "nav-top-item");
				$(this).attr("class", $(this).attr("class")+' hover');
				var flag = $(this).attr('flag');
				for(var i=1; i<99; i++){
					if(i == flag){
						$('#area'+i).show("normal");
					}else{
						$('#area'+i).hide("normal");
					}
				}
				return false;
			}
		);		
		$("#main-nav li a.no-submenu").click( // When a menu item with no sub menu is clicked...
			function () {
				window.location.href=(this.href); // Just open the link instead of a sub menu
				return false;
			}
		); 
    // Sidebar Accordion Menu Hover Effect:
				$("#main-nav li .nav-top-item").hover(
			function () {
				$(this).stop().animate({ paddingRight: "25px" }, 200);
			}, 
			function () {
				$(this).stop().animate({ paddingRight: "15px" });
			}
		);

    //Minimize Content Box
		$(".content-box-header h3").css({ "cursor":"s-resize" }); // Give the h3 in Content Box Header a different cursor
		$(".closed-box .content-box-content").hide(); // Hide the content of the header if it has the class "closed"
		$(".closed-box .content-box-tabs").hide(); // Hide the tabs in the header if it has the class "closed"
		$(".content-box-header h3").click( // When the h3 is clicked...
			function () {
			  $(this).parent().next().toggle(); // Toggle the Content Box
			  $(this).parent().parent().toggleClass("closed-box"); // Toggle the class "closed-box" on the content box
			  $(this).parent().find(".content-box-tabs").toggle(); // Toggle the tabs
			}
		);

    // Content box tabs:
		$('.content-box .content-box-content div.tab-content').hide(); // Hide the content divs
		$('ul.content-box-tabs li a.default-tab').addClass('current'); // Add the class "current" to the default tab
		$('.content-box-content div.default-tab').show(); // Show the div with class "default-tab"
		$('.content-box ul.content-box-tabs li a').click( // When a tab is clicked...
			function() { 
				$(this).parent().siblings().find("a").removeClass('current'); // Remove "current" class from all tabs
				$(this).addClass('current'); // Add class "current" to clicked tab
				var currentTab = $(this).attr('href'); // Set variable "currentTab" to the value of href of clicked tab
				$(currentTab).siblings().hide(); // Hide all content divs
				$(currentTab).show(); // Show the content div with the id equal to the id of clicked tab
				return false; 
			}
		);

    //Close button:
		$(".close").click(
			function () {
				$(this).parent().fadeTo(400, 0, function () { // Links with the class "close" will close parent
					$(this).slideUp(400);
				});
				return false;
			}
		);

		//CloseflowImg:
		$(".closeflowImg").click(
			function () {
				$(this).parent().show( function () { // Links with the class "close" will close parent
					$(this).slideUp(400);
				});
				return false;
			}
		);

    // Alternating table rows:
		$('tbody tr:even').addClass("alt-row"); // Add class "alt-row" to even table rows

    // Check all checkboxes when the one in a table head is checked:
		$('.check-all').click(
			function(){
				$(this).parent().parent().parent().parent().find("input[type='checkbox']").attr('checked', $(this).is(':checked'));   
			}
		);
		
		try{
    // Initialise Facebox Modal window:
		$('a[rel*=modal]').facebox(); // Applies modal window to any link with attribute rel="modal"
		} catch(e){}
    // Initialise jQuery WYSIWYG:
		// $(".wysiwyg").wysiwyg(); // Applies WYSIWYG editor to any textarea with the class "wysiwyg"

});
function allOpen(){
	$('#main-nav').slideUp();
	$('#main-nav>li').find('a:first').attr("class", "nav-top-item");
	$('#area1').show();
	$('#area2').show();
	$('#area3').show();
	$('#area4').show();
	$('#area5').show();
	$('#area6').show();
	$('#area7').show();
	$('#area8').show();
	$('#area9').show();
	$('#area10').show();
	for(var i=0; i<99; i++){
		$("#jt"+i).className="jiantou_bottom";
		$("#content"+i).show();
	}
}
function partOpen(){
	if('#main-nav'){
		$('#main-nav li ul').hide();
		$('#main-nav').slideDown();
    }else{
		$('#main-nav li ul').hide();
		$('#main-nav').slideUp();
    }
}
function section1Click(flag){
	//for(i=0; i<=19; i++){
		if($('#content'+flag).css("display")=="none"){
			$("#jt"+flag).addClass("jiantou_bottom");
			$('#content'+flag).show();
		}else{
			$("#jt"+flag).addClass("jiantou_top");
			$("#content"+flag).hide();
		}
		
	//}
}
function section2Click(flag){
	/*for(i=20; i<=39; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section3Click(flag){
	/*for(i=40; i<=49; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}*/	
	section1Click(flag);
}
function section4Click(flag){
	/*for(i=50; i<=59; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section5Click(flag){
	/*for(i=60; i<=64; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section6Click(flag){
	/*for(i=65; i<=69; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section7Click(flag){
	/*for(i=70; i<=74; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section8Click(flag){
	/*for(i=75; i<=79; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}
function section9Click(flag){
	/*for(i=80; i<=84; i++){
		if(flag == i){
			document.getElementById("jt"+i).className="jiantou_bottom";
			document.getElementById("content"+i).style.display="";
		}else{
			document.getElementById("jt"+i).className="jiantou_top";
			document.getElementById("content"+i).style.display="none";
		}
	}	*/
	section1Click(flag);
}

//function section10Click(flag){
//	for(i=85; i<=89; i++){
//		if(flag == i){
//			document.getElementById("jt"+i).className="jiantou_bottom";
//			document.getElementById("content"+i).style.display="";
//		}else{
//			document.getElementById("jt"+i).className="jiantou_top";
//			document.getElementById("content"+i).style.display="none";
//		}
//	}	
//}
function section10Click(flag){
	document.getElementById("jt"+flag).className="jiantou_bottom";
	document.getElementById('content'+flag).style.display="";
}

function showWorkflowImg(){
	theObj = document.getElementById('flow').style;
    if(theObj.display=="none"){
		theObj.display = "block";
		document.getElementById("flowIcon").className="icon_12";
    }else{
	    theObj.display = "none";
		document.getElementById("flowIcon").className="icon_12a";
   }
}